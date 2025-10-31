import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
} from "../controllers/user.controller.js";
import { isAuth } from "../utils/configs/middlewares/auth.middleware.js";

const userRoute = express.Router();

// GET /api/v1/faqs - get all FAQs (supports category query param)
userRoute.get("/", getAllUsers);

// GET /api/v1/faqs/:id - get a specific user by ID
userRoute.get("/:id", getUserById);

// POST /api/v1/faqs - create new user
userRoute.post("/", isAuth, createUser);

// PATCH /api/v1/faqs/:id - update existing user
userRoute.patch("/:id", isAuth, updateUser);

export default userRoute;