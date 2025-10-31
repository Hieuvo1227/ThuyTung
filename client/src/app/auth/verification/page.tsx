"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/utils/stores/authStore";
import type React from "react";
import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

// Bọc component chính trong Suspense để useSearchParams hoạt động
const VerificationPageWithSuspense: React.FC = () => (
  <Suspense fallback={<div>Đang tải...</div>}>
    <VerificationPage />
  </Suspense>
);

const VerificationPage: React.FC = () => {
  // CẢI TIẾN 4: Lấy hàm từ hook ở cấp cao nhất
  const { isLoading, verifyOTP, sendOTP } = useAuthStore();
  const router = useRouter();
  
  // CẢI TIẾN 3: Sử dụng useSearchParams để lấy params từ URL
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const isPasswordReset = searchParams.get("isPasswordReset") === "true";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // SỬA LỖI 1: Gộp logic timer vào một useEffect duy nhất
  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(0, 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((digit) => digit === "")) {
      toast.error("Vui lòng nhập đủ 6 chữ số.");
      return;
    }
    if (timeLeft <= 0) {
      toast.error("Mã OTP đã hết hạn. Vui lòng gửi lại mã mới.");
      return;
    }

    const response = await verifyOTP(email, otp.join(""));

    if (response?.success) {
      if (isPasswordReset) {
        router.push(`/auth/reset-password/?email=${encodeURIComponent(email)}`);
      } else {
        toast.success("Xác thực tài khoản thành công!");
        router.push("/auth/login");
      }
    } else {
      // Lỗi đã được xử lý và toast đã được hiển thị từ authStore
      setOtp(Array(6).fill("")); // Xóa OTP cũ khi có lỗi
      inputRefs.current[0]?.focus(); // Focus lại ô đầu tiên
    }
  };
  
  // SỬA LỖI 2 & CẢI TIẾN 5
  const handleResend = async () => {
    if (!email) return;
    const response = await sendOTP(email);
    if (response?.success) {
      toast.success("Mã OTP mới đã được gửi!"); // Sửa toast.done thành toast.success
      setTimeLeft(300); // Reset lại bộ đếm
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="rounded-lg p-8">
      <h1 className="text-primary text-2xl font-bold text-center mb-6">
        Nhập mã xác thực
      </h1>
      <p className="text-gray-400 text-sm mb-2 text-center">
        Chúng tôi đã gửi mã OTP đến email <span className="font-bold text-primary">{email}</span>.
        <br />
        Vui lòng nhập mã đó để {isPasswordReset ? "đặt lại mật khẩu" : "xác thực tài khoản"}.
      </p>
      <div className="text-center mb-6">
        <p className={`text-sm ${timeLeft > 0 ? 'text-primary-400' : 'text-red-500'}`}>
          {timeLeft > 0 ? `Mã hết hạn trong: ${formatTime(timeLeft)}` : "Mã OTP đã hết hạn!"}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mb-6 space-y-6">
        <div className="flex justify-center gap-2 sm:gap-4 mb-6">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-12 h-12 text-center text-xl font-bold bg-[#282828] text-white border ${
                timeLeft <= 0 ? "border-red-500" : "border-[#3E3E3E]"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-[#1877F2] focus:border-[#1877F2]`}
              maxLength={1}
              disabled={isLoading || timeLeft <= 0}
            />
          ))}
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
          disabled={isLoading || timeLeft <= 0}
        >
          {isLoading ? "Đang xác thực..." : "Xác thực"}
        </Button>
      </form>
      <div className="text-center">
        <p className="text-gray-400 text-sm">
          Không nhận được mã?{" "}
          <button
            onClick={handleResend}
            disabled={isLoading}
            className="text-primary-500 hover:text-primary-700 underline cursor-pointer disabled:opacity-50"
          >
            Gửi lại mã
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerificationPageWithSuspense; // Export component đã được bọc