import { Types } from "mongoose";
import type { CreateArticleDto } from "../dto/create-article.dto.js";
import type { ArticleService as IArticleService } from "../service/article.service.js";
import type { UserService } from "../../user/service/user.service.js";
import {
  BadRequestError,
  NotFoundError,
} from "../../../shared/errors/http.error.js";
import type { ArticleCategoryService as IArticleCategoryService } from "../service/article-category.service.js";
import type { IArticlePost, IArticleReel } from "../types/article.types.js";

export class CreateArticleUseCase {
  constructor(
    private readonly articleService: IArticleService,
    private readonly articleCategoryService: IArticleCategoryService,
    private readonly userService: UserService,
  ) {}

  async orchestrate(
    data: CreateArticleDto,
    userId: string,
  ): Promise<Types.ObjectId> {
    const { category, ...rest } = data;
    if (!Types.ObjectId.isValid(userId))
      throw new BadRequestError("Invalid user ID");
    const objectId = new Types.ObjectId(userId);

    const articleCategory =
      await this.articleCategoryService.findCategoryBySlug(category);

    if (!articleCategory)
      throw new NotFoundError(
        "Category not found",
        "Please select a valid category and try again",
      );

    if (data.contentType === "POST") {
      return await this.articleService.create({
        ...rest,
        author: objectId,
        category: articleCategory._id,
        contentJson: data.content,
      } as Omit<
        IArticlePost,
        | "_id"
        | "slug"
        | "createdAt"
        | "updatedAt"
        | "likesCount"
        | "dislikesCount"
        | "commentsCount"
        | "viewsCount"
        | "bookmarksCount"
        | "sharesCount"
        | "isPublished"
        | "isFeatured"
        | "isArchived"
        | "contentHtml"
        | "readingTime"
      >);
    }

    return await this.articleService.create({
      ...rest,
      author: objectId,
      category: articleCategory._id,
    } as Omit<
      IArticleReel,
      | "_id"
      | "slug"
      | "createdAt"
      | "updatedAt"
      | "likesCount"
      | "dislikesCount"
      | "commentsCount"
      | "viewsCount"
      | "bookmarksCount"
      | "sharesCount"
      | "isPublished"
      | "isFeatured"
      | "isArchived"
    >);
  }
}
