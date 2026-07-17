import type { Types } from "mongoose";
import { ArticleCategoryModel } from "../model/article-category.model.js";
import type { IArticleCategory } from "../types/category.types.js";

export class ArticleCategoryRepository {
  async createCategory(
    data: Pick<IArticleCategory, "name" | "description" | "slug">,
  ) {
    const category = new ArticleCategoryModel(data);
    return category.save();
  }
  async findOneBySlug(slug: string) {
    return ArticleCategoryModel.findOne({ slug });
  }
  async findOneByName(name: string) {
    return ArticleCategoryModel.findOne({ name });
  }
  async incArticleCount(id: Types.ObjectId) {
    return ArticleCategoryModel.findByIdAndUpdate(
      id,
      { $inc: { articlesCount: 1 } },
      { new: true },
    );
  }
}
