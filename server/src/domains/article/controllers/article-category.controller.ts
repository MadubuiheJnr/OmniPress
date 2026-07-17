import { HttpCode, UnauthorizedError } from "shared/errors/http.error.js";
import type { ArticleCategoryService as IArticleCategoryService } from "../service/article-category.service.js";
import { asyncHandler } from "shared/utils/async-handler.util.js";
import { buildSuccess } from "shared/utils/response.util.js";
import type { Request, Response } from "express";

export class ArticleCategoryController {
  constructor(
    private readonly articleCategoryService: IArticleCategoryService,
  ) {}

  createCategory = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new UnauthorizedError();

    const result = await this.articleCategoryService.createCategory(req.body);

    res
      .status(HttpCode.CREATED)
      .json(
        buildSuccess(
          result,
          "You have successfully created an article category",
        ),
      );
  });
}
