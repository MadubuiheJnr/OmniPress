import type { ArticleCategoryService as IArticleCategoryService } from "../service/article-category.service.js";
import type { Request, Response } from "express";
export declare class ArticleCategoryController {
    private readonly articleCategoryService;
    constructor(articleCategoryService: IArticleCategoryService);
    createCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=article-category.controller.d.ts.map