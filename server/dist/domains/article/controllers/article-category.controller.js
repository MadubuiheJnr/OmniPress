import { HttpCode, UnauthorizedError } from "shared/errors/http.error.js";
import { asyncHandler } from "shared/utils/async-handler.util.js";
import { buildSuccess } from "shared/utils/response.util.js";
export class ArticleCategoryController {
    articleCategoryService;
    constructor(articleCategoryService) {
        this.articleCategoryService = articleCategoryService;
    }
    createCategory = asyncHandler(async (req, res) => {
        if (!req.user)
            throw new UnauthorizedError();
        const result = await this.articleCategoryService.createCategory(req.body);
        res
            .status(HttpCode.CREATED)
            .json(buildSuccess(result, "You have successfully created an article category"));
    });
}
//# sourceMappingURL=article-category.controller.js.map