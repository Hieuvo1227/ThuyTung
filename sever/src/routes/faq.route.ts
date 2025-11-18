import express from "express";
import {
  getFAQs,
  createFAQ,
  updateFAQ,
  getFAQById,
} from "../controllers/faq.controller.js";
import { isAuth } from "../utils/configs/middlewares/auth.middleware.js";

const faqRoute = express.Router();

// GET /api/v1/faqs - get all FAQs (supports category query param)
faqRoute.get("/", getFAQs);

// GET /api/v1/faqs/:id - get a specific FAQ by ID
faqRoute.get("/:id", getFAQById);

// POST /api/v1/faqs - create new FAQ
faqRoute.post("/", isAuth, createFAQ);

// PATCH /api/v1/faqs/:id - update existing FAQ
faqRoute.patch("/:id", isAuth, updateFAQ);

export default faqRoute;