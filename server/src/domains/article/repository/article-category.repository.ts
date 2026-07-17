import type { Types } from "mongoose";
import { ArticleCategoryModel } from "../model/article-category.model.js";

export class ArticleCategoryRepository {
  async findOneBySlug(slug: string) {
    return ArticleCategoryModel.findOne({ slug });
  }
  async incArticleCount(id: Types.ObjectId) {
    return ArticleCategoryModel.findByIdAndUpdate(
      id,
      { $inc: { articlesCount: 1 } },
      { new: true },
    );
  }
}
