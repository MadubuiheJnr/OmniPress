import { Router } from "express";
import type { ArticleCategoryController as IArticleCategoryController } from "../controllers/article-category.controller.js";
import type { AuthMiddleware as IAuthMiddleware } from "../../../middlewares/auth.middleware.js";
import { validateBody } from "../../../middlewares/validate.middleware.js";
import { createArticleCategorySchema } from "../dto/create-article-category.dto.js";

export function CreateArticleCategoryRouter(
  articleCategoryController: IArticleCategoryController,
  authMiddleware: IAuthMiddleware,
) {
  const router = Router();

  router.post(
    "/",
    authMiddleware.authenticate,
    validateBody(createArticleCategorySchema),
    (req, res, next) =>
      articleCategoryController.createCategory(req, res, next),
  );

  return router;
}
