import mongoose, { Schema, Document } from "mongoose";
import { EStatus } from "../utils/types/enum.js";

interface IBlogDocument extends Document {
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  publishedAt?: string;
  imageUrl?: string;
  category?: string;
  slug?: string;
  status?: EStatus;
}

const schema: Schema<IBlogDocument> = new Schema(
  {
    title: String,
    excerpt: String,
    content: String,
    author: String,
    publishedAt: String,
    imageUrl: String,
    category: String,
    slug: String,
    status: {
      type: String,
      enum: Object.values(EStatus),
      default: EStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.models.Blog || mongoose.model<IBlogDocument>("Blog", schema);