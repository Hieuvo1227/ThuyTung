import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { ErrorCustom } from "../custom.js";
import { ENABLE_QPS_LOGGING } from "../constants.js";

/**
 * Middleware ghi log các request
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log("\n" + "=".repeat(80));
    console.log(`🔵 [${timestamp}] ${req.method} ${req.path}`);
    console.log("=".repeat(80));
    console.log("🌐 Origin:", req.headers.origin || "(none)");
    console.log("🌐 Referer:", req.headers.referer || "(none)");
    console.log("🌐 Host:", req.headers.host);
    console.log("🌐 User-Agent:", req.headers['user-agent']?.substring(0, 50) + "...");
    console.log("🔑 Content-Type:", req.headers['content-type'] || "(none)");
    console.log("🍪 Cookies:", Object.keys(req.cookies || {}).length > 0 ? Object.keys(req.cookies) : "(none)");
    console.log("📦 Query:", Object.keys(req.query).length > 0 ? req.query : "(none)");
    if (req.body && Object.keys(req.body).length > 0) {
        const sanitizedBody = { ...req.body };
        if (sanitizedBody.password) sanitizedBody.password = "[HIDDEN]";
        console.log("📦 Body:", sanitizedBody);
    } else {
        console.log("📦 Body: (none)");
    }
    console.log("=".repeat(80) + "\n");
    next();
};

/**
 * Middleware xử lý và trả về lỗi
 */
export const errorResponse: ErrorRequestHandler = (err: ErrorCustom, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    console.log("\n" + "❌".repeat(40));
    console.log("❌❌❌ ERROR OCCURRED ❌❌❌");
    console.log("❌".repeat(40));
    console.log("🚨 Path:", req.method, req.path);
    console.log("🚨 Status:", status);
    console.log("🚨 Message:", message);
    console.log("🚨 Error Details:", err);
    console.log("🚨 Request Origin:", req.headers.origin || "(none)");
    console.log("🚨 Request Body:", req.body);
    console.log("❌".repeat(40) + "\n");

    return res.status(status).json({
        success: false,
        status,
        message,
    });
};

/**
 * Biến đếm số lượng request
 */
let requests = 0;

/**
 * Đặt interval để đếm QPS (Queries Per Second)
 * Chỉ hiển thị log khi có request (QPS > 0)
 * và khi biến môi trường ENABLE_QPS_LOGGING=true
 */

// Chỉ tạo interval nếu tính năng logging được bật
if (ENABLE_QPS_LOGGING === 'true') {
    setInterval(() => {
        if (requests > 0) {
            console.log(`QPS: ${requests}`);
        }
        requests = 0;
    }, 1000);
}

/**
 * Middleware đếm và ghi nhận số lượng request
 */
export const checkQPS = (req: Request, res: Response, next: NextFunction) => {
    requests++;
    next();
};