import type { Types } from "mongoose";
import {
  ArticleModel,
  ArticlePostModel,
  ArticleReelModel,
} from "../model/article.model.js";
import type { IArticle } from "../types/article.types.js";

type CounterField =
  | "likesCount"
  | "dislikesCount"
  | "commentsCount"
  | "viewsCount"
  | "bookmarksCount"
  | "sharesCount";

export class ArticleRepository {
  async create(
    articleData: Omit<IArticle, "_id" | "createdAt" | "updatedAt">,
    type: "POST" | "REEL",
  ) {
    const article =
      type === "POST"
        ? new ArticlePostModel(articleData)
        : new ArticleReelModel(articleData);
    return article.save();
  }

  async update(
    articleId: Types.ObjectId,
    articleData: Partial<
      Omit<IArticle, "_id" | "createdAt" | "updatedAt" | "contentType">
    >,
  ) {
    return ArticleModel.findByIdAndUpdate(articleId, articleData, {
      new: true,
    });
  }

  async findById(articleId: Types.ObjectId) {
    return ArticleModel.findById(articleId);
  }

  async findBySlug(slug: string, includeUnpublished = false) {
    const query = includeUnpublished ? { slug } : { slug, isPublished: true };
    return ArticleModel.findOne(query);
  }

  async findAll(page: number, limit: number, categoryId?: Types.ObjectId) {
    const skip = (page - 1) * limit;
    const query = categoryId
      ? { category: categoryId, isPublished: true }
      : { isPublished: true };

    const [articles, totalItems] = await Promise.all([
      ArticleModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ArticleModel.countDocuments(query),
    ]);

    return { articles, totalItems };
  }

  async findByAuthor(authorId: Types.ObjectId, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const query = { author: authorId };

    const [articles, totalItems] = await Promise.all([
      ArticleModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ArticleModel.countDocuments(query),
    ]);

    return { articles, totalItems };
  }

  async incrementCounter(
    articleId: Types.ObjectId,
    field: CounterField,
    amount: 1 | -1 = 1,
  ) {
    return ArticleModel.findByIdAndUpdate(
      articleId,
      { $inc: { [field]: amount } },
      { new: true },
    );
  }

  async setPublishStatus(articleId: Types.ObjectId, isPublished: boolean) {
    return ArticleModel.findByIdAndUpdate(
      articleId,
      { $set: { isPublished } },
      { new: true },
    );
  }

  async setArchiveStatus(articleId: Types.ObjectId, isArchived: boolean) {
    return ArticleModel.findByIdAndUpdate(
      articleId,
      { $set: { isArchived } },
      { new: true },
    );
  }

  async delete(articleId: Types.ObjectId) {
    return ArticleModel.findByIdAndDelete(articleId);
  }
}
