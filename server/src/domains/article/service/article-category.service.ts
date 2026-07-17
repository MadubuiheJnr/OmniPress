import { NotFoundError } from "shared/errors/http.error.js";
import type { ArticleCategoryRepository as IArticleCategoryRepository } from "../repository/article-category.repository.js";

export class ArticleCategoryService {
  constructor(
    private readonly articleCategoryRepository: IArticleCategoryRepository,
  ) {}

  async findCategoryBySlug(slug: string) {
    const category = await this.articleCategoryRepository.findOneBySlug(slug);
    if (!category)
      throw new NotFoundError(
        "Category not found",
        "Please select a valid category and try again",
      );
    return category;
  }
}
