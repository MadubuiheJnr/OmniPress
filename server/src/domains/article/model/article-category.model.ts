import { model, Schema } from "mongoose";
import type { IArticleCategoryDocument } from "../types/category.types.js";

const ArticleCategorySchema = new Schema<IArticleCategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: [2, "Characters must be at least two"],
      maxlength: [50, "Characters must not exceed 50"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: [2, "Characters must be at least two"],
      maxlength: [50, "Characters must not exceed 50"],
    },
    description: { type: String, default: "" },
    articlesCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const ArticleCategoryModel = model<IArticleCategoryDocument>(
  "ArticleCategory",
  ArticleCategorySchema,
);
