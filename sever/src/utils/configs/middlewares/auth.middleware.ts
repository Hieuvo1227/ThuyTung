import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../constants.js";
import { JwtPayload } from "jsonwebtoken";

interface IDecodedToken extends JwtPayload {
    id: string;
    role?: string;
}

/**
 * Middleware kiểm tra xác thực người dùng qua JWT
 */
export const isAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log("🔐 isAuth middleware - checking authentication...");
        console.log("🍪 Cookies received:", req.cookies);
        
        const token = req.cookies?.token;
        console.log("🎫 Token from cookies:", token ? token.substring(0, 20) + "..." : "[NONE]");

        if (!token) {
            console.log("❌ No token found in cookies - authentication failed");
            res.status(403).json({
                message: "Please login",
            });
            return;
        }
        
        console.log("🎫 Token found, verifying...");

        const decodedValue = jwt.verify(
            token,
            PRIVATE_KEY
        ) as IDecodedToken;
        
        console.log("🔓 Decoded token:", decodedValue);

        if (!decodedValue || !decodedValue.id) {
            console.log("❌ Token verification failed - invalid token");
            return res.status(403).json({
                message: "Token is invalid",
            });
        }
        
        console.log("✅ Token verified successfully, user ID:", decodedValue.id);

        req.userId = decodedValue.id;
        req.isAuth = true;
        next();
    } catch (error) {
        console.log("❌ Token verification error:", error);
        res.status(403).json({
            message: "Please login",
        });
    }
};

/**
 * Danh sách các route công khai không cần xác thực
 * Note: Paths are relative to the /api/v1 mount point
 */
const PUBLIC_ROUTES = [
    '/auth/login',
    '/auth/register',
    '/auth/send-otp',
    '/auth/verify-otp',
    '/auth/forgot-password',
    '/programs',
    '/jobs',
    '/faqs',
    '/blogs',  // Public blog listing
];

/**
 * Middleware kiểm tra xem route hiện tại có cần xác thực không
 */
export const checkPublicRoute = (req: Request, res: Response, next: NextFunction) => {
    console.log("🔍 checkPublicRoute - Path:", req.path, "| URL:", req.url);
    console.log("📋 Public routes list:", PUBLIC_ROUTES);
    
    // Normalize path by removing trailing slash and /api/v1 prefix if present
    let normalizedPath = req.path.replace(/\/$/, ''); // Remove trailing slash
    
    // Handle duplicated /api/v1 prefixes
    while (normalizedPath.startsWith('/api/v1/api/v1')) {
        normalizedPath = normalizedPath.replace('/api/v1/api/v1', '/api/v1');
    }
    
    // Remove /api/v1 prefix
    if (normalizedPath.startsWith('/api/v1')) {
        normalizedPath = normalizedPath.substring(8); // Remove '/api/v1' prefix (8 characters)
    }
    
    // Ensure the path starts with a slash
    if (!normalizedPath.startsWith('/') && normalizedPath.length > 0) {
        normalizedPath = '/' + normalizedPath;
    }
    
    // Handle root path
    if (normalizedPath === '') {
        normalizedPath = '/';
    }
    
    console.log("🔧 Normalized path:", normalizedPath);
    
    // Kiểm tra xem đường dẫn hiện tại có nằm trong danh sách công khai không
    const isPublic = PUBLIC_ROUTES.some(route => {
        const normalizedRoute = route.replace(/\/$/, '');
        console.log("🔄 Checking route:", normalizedPath, "against public route:", normalizedRoute);
        return normalizedPath === normalizedRoute || normalizedPath.startsWith(normalizedRoute + '/');
    });
    
    console.log("📊 Is public route:", isPublic);
    
    if (isPublic) {
        console.log("✅ Public route - skipping authentication");
        return next();
    }
    
    console.log("🔒 Protected route - checking authentication");
    isAuth(req, res, next);
}