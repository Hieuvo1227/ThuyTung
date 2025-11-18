import { NextFunction, Request, Response } from "express";
import cors from "cors";
import { CLIENT_URL } from "../constants.js";

interface IAuthenticatedRequest extends Request {
  isAuth?: boolean;
  userId?: string;
  cookies: { [key: string]: string };
}

/**
 * Kiểm tra injection trong NoSQL query
 */
const checkInjectionForNoSQL = (value: any): boolean => {
  if (typeof value === "object" && value !== null) {
    for (const key in value) {
      if (key.startsWith("$")) {
        return true;
      }
      if (typeof value[key] === "object") {
        if (checkInjectionForNoSQL(value[key])) return true;
      }
    }
  }
  return false;
};

/**
 * Kiểm tra đệ quy tất cả các trường trong object
 */
const deepCheck = (obj: any): boolean => {
  if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (checkInjectionForNoSQL(obj[key])) {
        return true;
      }
      if (typeof obj[key] === "object") {
        if (deepCheck(obj[key])) return true;
      }
    }
  }
  return false;
};

/**
 * Middleware bảo vệ khỏi các injection attack
 */
export const injectionGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hasInjection =
    deepCheck(req.body) || deepCheck(req.query) || deepCheck(req.params);
  if (hasInjection) {
    return res
      .status(400)
      .json({ message: "Blocked: Suspicious input detected." });
  }

  next();
};

/**
 * Danh sách domain frontend được phép kết nối
 */
const ALLOWED_ORIGINS: string[] = [
  "http://localhost:3000",   // Dev
  "http://localhost:4040",  // Dev API
  "https://www.thuytung.edu.vn",  // Production frontend
  "https://api.thuytung.edu.vn",  // Production API
  CLIENT_URL,                     // Lấy từ .env
].filter(Boolean); // loại bỏ undefined/null


/**
 * Middleware CORS Guard
 */
export const CORSGuard = cors({
  origin: (origin, callback) => {
    console.log("=".repeat(60));
    console.log("🔍 CORS Check - Origin received:", origin);
    console.log("📋 Allowed origins:", ALLOWED_ORIGINS);
    
    if (!origin) {
      // Cho phép Postman / curl / server-side request
      console.log("✅ No origin header - allowing request (Postman/server-side)");
      return callback(null, true);
    }

    if (ALLOWED_ORIGINS.includes(origin)) {
      console.log("✅ Origin allowed:", origin);
      return callback(null, true);
    } else {
      console.error("❌❌❌ BLOCKED BY CORS:", origin);
      console.error("🚫 This origin is NOT in allowed list");
      console.error("📊 Available origins:", ALLOWED_ORIGINS);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});