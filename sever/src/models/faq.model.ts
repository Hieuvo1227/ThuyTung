import mongoose, { Schema, Document } from "mongoose";
import { EStatus } from "../utils/types/enum.js";

interface IFAQDocument extends Document {
  question?: string;
  answer?: string;
  category?: string;
  status?: EStatus;
  imageUrl?: string;
}

const schema: Schema<IFAQDocument> = new Schema(
  {
    question: String,
    answer: String,
    category: String,
    imageUrl: {
      type: String,
      default: "/images/placeholder-program.jpg",
    },
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

export const FAQ = mongoose.models.FAQ || mongoose.model<IFAQDocument>("FAQ", schema);