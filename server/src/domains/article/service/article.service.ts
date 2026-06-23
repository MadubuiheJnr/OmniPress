import type { ArticleRepository as IArticleRepository } from "../repository/article.repository.js";
import type { IArticle } from "../types/article.types.js";

export class ArticleService {
  constructor(private readonly articleRepository: IArticleRepository) {}

  async create(data: IArticle) {}
}
