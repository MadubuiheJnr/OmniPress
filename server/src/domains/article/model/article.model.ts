import { Schema, model } from "mongoose";
import type {
  IArticleDocument,
  IArticlePost,
  IArticleReel,
} from "../types/article.types.js";

const ArticleSchema = new Schema<IArticleDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likesCount: { type: Number, default: 0 },
    dislikesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 },
    bookmarksCount: { type: Number, default: 0 },
    sharesCount: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    discriminatorKey: "contentType",
  },
);

ArticleSchema.index({ category: 1, isPublished: 1 });
ArticleSchema.index({ author: 1 });

const ArticlePostSchema = new Schema<IArticlePost>({
  thumbnail: { type: String, required: true },
  contentJson: { type: Schema.Types.Mixed, required: true },
  contentHtml: { type: String, required: true },
  readingTime: { type: String, required: true },
});

const ArticleReelSchema = new Schema<IArticleReel>({
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true },
  playsCount: { type: Number, default: 0 },
});

export const ArticleModel = model<IArticleDocument>("Article", ArticleSchema);
export const ArticlePostModel = ArticleModel.discriminator<IArticlePost>(
  "POST",
  ArticlePostSchema,
);
export const ArticleReelModel = ArticleModel.discriminator<IArticleReel>(
  "REEL",
  ArticleReelSchema,
);
