import express from "express";
import dotenv from "dotenv";

import { PORT } from "./utils/configs/constants.js";
import connectDatabase from "./utils/libs/database.js";
import apiRoutes from "./routes/routes.js";
import { errorResponse } from "./utils/configs/middlewares/logging.middleware.js";
import { applyMiddlewares } from "./utils/configs/middlewares/middlewares.js";
import { CORSGuard } from "./utils/configs/middlewares/security.middleware.js";

dotenv.config();

const app = express();

console.log("🔴🔴🔴 INDEX.TS - App created");
console.log("🔴 apiRoutes imported:", typeof apiRoutes);
console.log("🔴 apiRoutes is:", apiRoutes);

console.log("\n" + "=".repeat(80));
console.log("🚀 STARTING BACKEND SERVER");
console.log("=".repeat(80));
console.log("🌐 Environment:", process.env.NODE_ENV || "development");
console.log("🌐 Client URL:", process.env.CLIENT_URL || "not set");
console.log("🔌 Port:", PORT || "4040");
console.log("🔑 Private Key:", process.env.PRIVATE_KEY ? "[SET]" : "[NOT SET]");
console.log("📁 Database URL:", process.env.DATABASE_MONGO_URL ? "[SET]" : "[NOT SET]");
console.log("=".repeat(80) + "\n");

// Áp dụng middleware chung
applyMiddlewares(app);

// Kết nối DB
connectDatabase();

// Routes
app.use("/api/v1", apiRoutes);

// Error handler (đặt sau routes)
app.use(errorResponse);

// --- Khởi động server ---
const port = PORT ? Number(PORT) : 4040;

// ❗ Quan trọng: chỉ cần listen nội bộ (localhost)
// IIS sẽ reverse proxy tới đây, không cần public trực tiếp ra internet
app.listen(port, "127.0.0.1", () => {
  console.log("\n" + "=".repeat(80));
  console.log("✅ USER SERVICE STARTED SUCCESSFULLY");
  console.log("=".repeat(80));
  console.log(`🚀 Running internally at: http://127.0.0.1:${port}`);
  console.log(`🌐 API Base URL: http://127.0.0.1:${port}/api/v1`);
  console.log(`🔒 Ready to accept requests from: ${process.env.CLIENT_URL}`);
  console.log("=".repeat(80) + "\n");
});