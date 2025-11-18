import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NODE_ENV, PRIVATE_KEY, SALT_ROUNDS, TOTAL_MS_IN_DAY } from "../utils/configs/constants.js";
import { ErrorCustom, RequestHandlerCustom } from "../utils/configs/custom.js";
import { redisClient } from "../utils/libs/database.js";
import { handleGetUserByEmail, handleUpdateUserPasswordByEmail, handleUpdateUserStatusByEmail } from "../repositories/user.repository.js";
import { EUserStatus } from "../utils/types/enum.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { generateRandomPassword, handleCreateAndStoreOTP } from "../services/auth.service.js";
import { EmailTemplate, sendMail } from "../utils/libs/mailer.js";

export const verifyOTP = RequestHandlerCustom(async (req, res, next) => {
    console.log("✅ verifyOTP called");
    const data = parseRequestData(req);
    const { email, otp } = data;
    
    console.log("📧 Verifying OTP for email:", email);

    const otpKey = `otp:${email}`;
    const storedOTP = await redisClient.get(otpKey);
    
    console.log("🔢 Stored OTP:", storedOTP, "Provided OTP:", otp);

    if (storedOTP !== otp) {
        console.log("❌ Invalid OTP provided");
        return next(new ErrorCustom(400, "Invalid OTP"));
    }

    const user = await handleGetUserByEmail({ email });

    if (!user) {
        console.log("❌ User not found for OTP verification");
        return next(new ErrorCustom(404, "User not found"));
    }

    await handleUpdateUserStatusByEmail({ email, status: EUserStatus.ACTIVE });
    console.log("✅ User status updated to ACTIVE");

    await redisClient.del(otpKey);
    console.log("🧹 OTP cleared from Redis");

    res.status(200).json({
        success: true,
        message: "OTP verified"
    });
});

export const sendOTP = RequestHandlerCustom(async (req, res, next) => {
    console.log("📧 sendOTP called");
    const data = parseRequestData(req);
    const { email } = data;
    
    console.log("📤 Sending OTP to email:", email);

    // Tạo OTP và lưu trong Redis
    const otpResult = await handleCreateAndStoreOTP(email);
    console.log("🔢 OTP generated:", otpResult);
    
    if ("error" in otpResult) {
        const errorStatus = (otpResult as { status?: number }).status || 500;
        console.log("❌ Error generating OTP:", otpResult?.error);
        return next(new ErrorCustom(errorStatus, String(otpResult?.error) || "Internal server error"));
    }

    // Lấy thông tin user nếu đã đăng ký
    const userName = email.split('@')[0];

    // Lấy năm hiện tại
    const currentYear = new Date().getFullYear();

    // Chuẩn bị dữ liệu cho template email
    const templateData = {
        logoUrl: "https://example.com/logo2.png", // Thay thế bằng URL thực của logo
        title: "Xác thực tài khoản của bạn",
        greeting: "Xin chào",
        name: userName,
        message: "Cảm ơn bạn đã đăng ký tài khoản với ThuyTung. Vui lòng sử dụng mã OTP dưới đây để xác thực tài khoản của bạn.",
        otp: otpResult.otp,
        expiry: "5", // OTP hết hạn sau 5 phút (được cài đặt trong handleCreateAndStoreOTP)
        contactEmail: "ThuyTung@gmail.com",
        year: currentYear.toString(),
        address: "123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh, Việt Nam",
    };

    // Gửi email
    await sendMail(
        email,
        "Mã xác thực OTP từ ThuyTung",
        EmailTemplate.SEND_OTP,
        templateData
    );
    console.log("📧 OTP email sent successfully");

    res.status(200).json({
        success: true,
        message: "OTP sent successfully"
    });
});

export const login = RequestHandlerCustom(async (req, res, next) => {
    console.log("🔐 === LOGIN ATTEMPT ===");
    console.log("📍 Request Method:", req.method);
    console.log("📍 Request Path:", req.path);
    console.log("📍 Request URL:", req.url);
    console.log("🌐 Origin Header:", req.headers.origin);
    console.log("🌐 Referer Header:", req.headers.referer);
    console.log("🌐 Host Header:", req.headers.host);
    console.log("🔑 Content-Type:", req.headers['content-type']);
    console.log("🍪 Cookies:", req.cookies);
    console.log("📦 Request Body:", req.body);
    
    const data = parseRequestData(req);
    const { email, password } = data;
    
    console.log("✉️ Email from parsed data:", email);
    console.log("🔒 Password received:", password ? "[PRESENT]" : "[MISSING]");

    if (!email || !password) {
        console.log("❌ Missing email or password");
        return next(new ErrorCustom(400, "Please input full information"));
    }

    console.log("🔍 Looking up user with email:", email);
    const user = await handleGetUserByEmail({ email });

    if (!user) {
        console.log("❌ User not found in database:", email);
        return next(new ErrorCustom(404, "User not found"));
    }
    
    console.log("✅ User found:", user._id, "Status:", user.status, "Email:", user.email);

    console.log("🔐 Comparing passwords...");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password comparison result:", isMatch);
    
    if (!isMatch) {
        console.log("❌ Password mismatch for user:", email);
        return next(new ErrorCustom(403, "Invalid credential"));
    }
    console.log("✅ Password matched");

    const isInactive = await user.status === EUserStatus.INACTIVE;
    if (isInactive) {
        console.log("❌ User is inactive:", email);
        return next(new ErrorCustom(402, "User is not active"));
    }

    const isPending = await user.status === EUserStatus.PENDING;
    if (isPending) {
        console.log("❌ User is pending:", email);
        return next(new ErrorCustom(401, "User is pending"));
    }
    
    console.log("✅ User status check passed");

    console.log("🎫 Generating JWT token...");
    const token = jwt.sign(
        {
            id: user._id,
        },
        PRIVATE_KEY,
        {
            expiresIn: "7d",
            algorithm: "HS256",
        }
    );
    
    console.log("🎫 Token generated:", token.substring(0, 20) + "...");
    console.log("🍪 Setting cookie with options:", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * TOTAL_MS_IN_DAY
    });

    res.cookie("token", token as string, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "lax", // Changed from "strict" to "lax" for localhost cross-port requests
        maxAge: 7 * TOTAL_MS_IN_DAY
    });

    const { password: pass, ...userWithoutPassword } = user.toObject();
    
    console.log("✅ Login successful for user:", email);
    console.log("📤 Sending response with user data");

    res.status(200).json({
        success: true,
        message: "Login successful",
        user: userWithoutPassword,
        isActive: true,
    });
    
    console.log("🔐 === LOGIN COMPLETE ===");

});

export const logout = RequestHandlerCustom(async (req, res, next) => {
    console.log("🚪 Logout called");
    if (!req.userId) {
        console.log("❌ Not authenticated for logout");
        return next(new ErrorCustom(403, "Not authenticated"));
    }

    // Clear cookie regardless of Redis status
    res.clearCookie("token", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "lax", // Changed from "strict" to "lax"
    });
    console.log("🧹 Token cookie cleared");

    res.status(200).json({
        success: true,
        message: "Logout successful"
    });
});

// API 1: Reset Password
export const resetPassword = RequestHandlerCustom(async (req, res, next) => {
    console.log("🔄 resetPassword called");
    const data = parseRequestData(req);
    const { email } = data;
    
    console.log("🔄 Resetting password for email:", email);

    const user = await handleGetUserByEmail({ email });

    if (!user) {
        console.log("❌ User not found for password reset");
        return next(new ErrorCustom(404, "User not found"));
    }

    const newPassword = generateRandomPassword();
    console.log("🔑 New password generated");

    // Hash mật khẩu mới
    const salt = parseInt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log("🔐 New password hashed");

    // Cập nhật mật khẩu mới trong database
    await handleUpdateUserPasswordByEmail({ email, password: hashedPassword });
    console.log("💾 Password updated in database");

    // Lấy thông tin user
    const userName = email.split('@')[0];

    // Lấy năm hiện tại
    const currentYear = new Date().getFullYear();

    // Chuẩn bị dữ liệu cho template email
    const templateData = {
        logoUrl: "https://example.com/logo2.png",
        name: userName,
        password: newPassword,
        contactEmail: "ThuyTung@gmail.com",
        year: currentYear.toString(),
        address: "123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh, Việt Nam",
    };

    // Gửi email với mật khẩu mới
    await sendMail(
        email,
        "Mật khẩu mới của bạn - ThuyTung",
        EmailTemplate.SEND_PASSWORD,
        templateData
    );
    console.log("📧 New password email sent");

    res.status(200).json({
        success: true,
        message: "Password has been reset. New password sent to email."
    });
});

// API 2: Forgot Password
export const forgotPassword = RequestHandlerCustom(async (req, res, next) => {
    console.log("🔑 forgotPassword called");
    const data = parseRequestData(req);
    const { email, password, confirmPassword } = data;
    
    console.log("🔑 Changing password for email:", email);

    // Kiểm tra xem user có tồn tại không
    const user = await handleGetUserByEmail({ email });
    if (!user) {
        console.log("❌ User not found for password change");
        return next(new ErrorCustom(404, "User not found"));
    }

    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
    if (password !== confirmPassword) {
        console.log("❌ Passwords do not match");
        return next(new ErrorCustom(400, "Passwords do not match"));
    }

    // Kiểm tra độ mạnh của mật khẩu nếu cần
    if (password.length < 6) {
        console.log("❌ Password too short");
        return next(new ErrorCustom(400, "Password must be at least 6 characters long"));
    }

    // Hash mật khẩu mới
    const salt = parseInt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🔐 New password hashed");

    // Cập nhật mật khẩu
    await handleUpdateUserPasswordByEmail({ email, password: hashedPassword });
    console.log("💾 Password updated in database");

    res.status(200).json({
        success: true,
        message: "Password has been reset successfully"
    });
});

// API 3: Change Password
export const changePassword = RequestHandlerCustom(async (req, res, next) => {
    console.log("🔐 changePassword called");
    const data = parseRequestData(req);
    const { email, oldPassword, newPassword, confirmPassword } = data;
    
    console.log("🔐 Changing password for email:", email);

    // Kiểm tra xem user có tồn tại không
    const user = await handleGetUserByEmail({ email });
    if (!user) {
        console.log("❌ User not found for password change");
        return next(new ErrorCustom(404, "User not found"));
    }

    // Kiểm tra oldPassword có khớp với mật khẩu hiện tại không
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    console.log("🔑 Old password comparison result:", isMatch);
    
    if (!isMatch) {
        console.log("❌ Current password is incorrect");
        return next(new ErrorCustom(400, "Current password is incorrect"));
    }

    // Kiểm tra newPassword và confirmPassword có khớp không
    if (newPassword !== confirmPassword) {
        console.log("❌ New passwords do not match");
        return next(new ErrorCustom(400, "New passwords do not match"));
    }

    // Kiểm tra độ mạnh của mật khẩu mới nếu cần
    if (newPassword.length < 6) {
        console.log("❌ New password too short");
        return next(new ErrorCustom(400, "New password must be at least 6 characters long"));
    }

    // Hash mật khẩu mới
    const salt = parseInt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log("🔐 New password hashed");

    // Cập nhật mật khẩu
    await handleUpdateUserPasswordByEmail({ email, password: hashedPassword });
    console.log("💾 Password updated in database");

    res.status(200).json({
        success: true,
        message: "Password changed successfully"
    });
});