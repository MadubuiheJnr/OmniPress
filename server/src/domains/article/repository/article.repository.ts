import type { Types } from "mongoose";
import {
  ArticleModel,
  ArticlePostModel,
  ArticleReelModel,
} from "../model/article.model.js";
import type {
  IArticle,
  IArticlePost,
  IArticleReel,
} from "../types/article.types.js";

type CounterField =
  | "likesCount"
  | "dislikesCount"
  | "commentsCount"
  | "viewsCount"
  | "bookmarksCount"
  | "sharesCount";

export class ArticleRepository {
  async createPost(
    articleData: Pick<
      IArticlePost,
      | "title"
      | "contentJson"
      | "thumbnail"
      | "excerpt"
      | "category"
      | "author"
      | "slug"
      | "readingTime"
      | "contentHtml"
    >,
  ) {
    const article = new ArticlePostModel(articleData);
    return article.save();
  }
  async createReel(
    articleData: Pick<
      IArticleReel,
      | "title"
      | "author"
      | "excerpt"
      | "category"
      | "duration"
      | "videoUrl"
      | "slug"
    >,
  ) {
    const article = new ArticleReelModel(articleData);
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

  async getAllSlugs(): Promise<string[]> {
    const docs = await ArticleModel.find({}, { slug: 1, _id: 0 }).lean().exec();
    return (docs as Array<{ slug?: string }>)
      .map((d) => d.slug!)
      .filter(Boolean);
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
