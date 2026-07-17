import { Router } from "express";
import { validateBody } from "middlewares/validate.middleware.js";
import { createArticleCategorySchema } from "../dto/create-article-category.dto.js";
export function CreateArticleCategoryRouter(articleCategoryController, authMiddleware) {
    const router = Router();
    router.post("/", authMiddleware.authenticate, validateBody(createArticleCategorySchema), (req, res, next) => articleCategoryController.createCategory(req, res, next));
    return router;
}
//# sourceMappingURL=article-category.routes.js.map