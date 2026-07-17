import type { CreateArticleUseCase as ICreateArticleUseCase } from "../use-cases/create-article.use-case.js";
import type { Request, Response } from "express";
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ICreateArticleUseCase);
    createArticle: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=article.controller.d.ts.map