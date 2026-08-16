import type { AuthMiddleware as IAuthMiddleware } from "../../../middlewares/auth.middleware.js";
import type { ArticleController as IArticleController } from "../controllers/article.controller.js";
import { Router } from "express";
import { validateBody } from "../../../middlewares/validate.middleware.js";
import { createArticleDtoSchema } from "../dto/create-article.dto.js";

export function createArticleRouter(
  articleController: IArticleController,
  authMiddleware: IAuthMiddleware,
): Router {
  const router = Router();

  router.post(
    "/",
    authMiddleware.authenticate,
    validateBody(createArticleDtoSchema),
    (req, res, next) => articleController.createArticle(req, res, next),
  );

  return router;
}
