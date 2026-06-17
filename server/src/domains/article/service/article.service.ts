import type { ArticleRepository as IArticleRepository } from "../repository/article.repository.js";

export class ArticleService {
  constructor(private readonly articleRepository: IArticleRepository) {}
}
