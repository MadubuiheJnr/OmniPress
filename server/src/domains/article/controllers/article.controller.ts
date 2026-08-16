import { asyncHandler } from "../../../shared/utils/async-handler.util.js";
import type { CreateArticleUseCase as ICreateArticleUseCase } from "../use-cases/create-article.use-case.js";
import type { Request, Response } from "express";
import { HttpCode, UnauthorizedError } from "../../../shared/errors/http.error.js";
import { buildSuccess } from "../../../shared/utils/response.util.js";

export class ArticleController {
  constructor(private readonly articleService: ICreateArticleUseCase) {}

  createArticle = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new UnauthorizedError();

    const result = await this.articleService.orchestrate(
      req.body,
      req.user._id,
    );

    res
      .status(HttpCode.CREATED)
      .json(buildSuccess(result, "You have successfully created an Article"));
  });
}
