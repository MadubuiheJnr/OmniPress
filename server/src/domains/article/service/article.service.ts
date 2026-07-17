import { BadRequestError } from "shared/errors/http.error.js";
import type { ArticleRepository as IArticleRepository } from "../repository/article.repository.js";
import type {
  IArticle,
  IArticlePost,
  IArticleReel,
} from "../types/article.types.js";
import { ARTICLE_UTILS } from "../article.utils.js";
import type { Types } from "mongoose";

export class ArticleService {
  constructor(private readonly articleRepository: IArticleRepository) {}

  async create(
    data: Omit<
      IArticle,
      | "_id"
      | "slug"
      | "likesCount"
      | "dislikesCount"
      | "commentsCount"
      | "viewsCount"
      | "bookmarksCount"
      | "sharesCount"
      | "isPublished"
      | "isFeatured"
      | "isArchived"
      | "createdAt"
      | "updatedAt"
      | "contentHtml"
      | "readingTime"
    >,
  ): Promise<Types.ObjectId> {
    const existingSlugs = await this.articleRepository.getAllSlugs();
    const { contentType } = data;
    switch (contentType) {
      case "POST":
        return this.createArticlePost(data as IArticlePost, existingSlugs);
      case "REEL":
        return this.createArticleReel(data as IArticleReel, existingSlugs);
      default: {
        const _exhaustive: never = contentType;
        throw new BadRequestError("Invalid content type");
      }
    }
  }

  private async createArticlePost(
    data: Pick<
      IArticlePost,
      "title" | "contentJson" | "thumbnail" | "excerpt" | "category" | "author"
    >,
    existingSlugs: string[],
  ): Promise<Types.ObjectId> {
    const { title, contentJson, thumbnail, excerpt, category, author } = data;

    const slug = ARTICLE_UTILS.slugify_title(title, existingSlugs);
    const readingTime = ARTICLE_UTILS.calc_read_time(contentJson);
    const HTML = ARTICLE_UTILS.generate_html(contentJson);
    const sanitizedHTML = ARTICLE_UTILS.sanitize_html(HTML);

    const newArticlePost = await this.articleRepository.createPost({
      title,
      slug,
      contentJson,
      readingTime,
      contentHtml: sanitizedHTML,
      thumbnail,
      excerpt,
      category,
      author,
    });

    return newArticlePost._id;
  }

  private async createArticleReel(
    data: Pick<
      IArticleReel,
      "title" | "author" | "excerpt" | "category" | "duration" | "videoUrl"
    >,
    existingSlugs: string[],
  ): Promise<Types.ObjectId> {
    const { title, author, excerpt, category, duration, videoUrl } = data;

    const slug = ARTICLE_UTILS.slugify_title(title, existingSlugs);

    const newArticleReel = await this.articleRepository.createReel({
      title,
      slug,
      excerpt,
      category,
      author,
      duration,
      videoUrl,
    });

    return newArticleReel._id;
  }
}
