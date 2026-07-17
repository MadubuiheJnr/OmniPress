import type { AuthMiddleware as IAuthMiddleware } from "middlewares/auth.middleware.js";
import type { ArticleController as IArticleController } from "../controllers/article.controller.js";
import { Router } from "express";
export declare function createArticleRouter(articleController: IArticleController, authMiddleware: IAuthMiddleware): Router;
//# sourceMappingURL=article.routes.d.ts.map