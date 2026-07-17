import { Router } from "express";
import { validateBody } from "middlewares/validate.middleware.js";
import { createArticleDtoSchema } from "../dto/create-article.dto.js";
export function createArticleRouter(articleController, authMiddleware) {
    const router = Router();
    router.post("/", authMiddleware.authenticate, validateBody(createArticleDtoSchema), (req, res, next) => articleController.createArticle(req, res, next));
    return router;
}
//# sourceMappingURL=article.routes.js.map