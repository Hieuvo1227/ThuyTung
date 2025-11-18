import express from "express";

import { changePassword, forgotPassword, login, logout, resetPassword, sendOTP, verifyOTP } from "../controllers/auth.controller.js";
import { isAuth } from "../utils/configs/middlewares/auth.middleware.js";

const authRoute = express.Router();

// Temporary test to verify route is loaded
console.log("🔷🔷🔷 AUTH ROUTE MODULE LOADED 🔷🔷🔷");

// Add logging middleware for auth routes
authRoute.use((req, res, next) => {
    console.log(`🔹 Auth Route Handler - ${req.method} ${req.path}`);
    next();
});

authRoute.post("/login", (req, res, next) => {
    console.log("🔸🔸🔸 LOGIN ROUTE HANDLER CALLED 🔸🔸🔸");
    next();
}, login);
authRoute.post("/logout", isAuth, logout);
authRoute.post("/verify-otp", verifyOTP);
authRoute.post("/send-otp", sendOTP);
authRoute.post("/reset-password", isAuth, resetPassword);
authRoute.patch("/forgot-password", forgotPassword);
authRoute.patch("/change-password", isAuth, changePassword);

export default authRoute;