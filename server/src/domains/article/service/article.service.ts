import { BadRequestError } from "shared/errors/http.error.js";
import type { ArticleRepository as IArticleRepository } from "../repository/article.repository.js";
import type { IArticle, IArticlePost } from "../types/article.types.js";

export class ArticleService {
  constructor(private readonly articleRepository: IArticleRepository) {}

  private async createArticlePost(data: Omit<IArticle, "_id">) {
    const {
      title,
      content,
      thumbnail,
      excerpt,
      readingTime,
      category,
      author,
    } = data;
  }

  private async createArticleReel(data: Omit<IArticle, "_id">) {}
  async create(data: Omit<IArticle, "_id">) {
    const { contentType } = data;
    switch (contentType) {
      case "POST":
        return this.createArticlePost(data);
      case "REEL":
        return this.createArticleReel(data);
      default:
        throw new BadRequestError("Invalid content type");
    }
  }
}
