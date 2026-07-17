import { asyncHandler } from "shared/utils/async-handler.util.js";
import { HttpCode, UnauthorizedError } from "shared/errors/http.error.js";
import { buildSuccess } from "shared/utils/response.util.js";
export class ArticleController {
    articleService;
    constructor(articleService) {
        this.articleService = articleService;
    }
    createArticle = asyncHandler(async (req, res) => {
        if (!req.user)
            throw new UnauthorizedError();
        const result = await this.articleService.orchestrate(req.body, req.user._id);
        res
            .status(HttpCode.CREATED)
            .json(buildSuccess(result, "You have successfully created an Article"));
    });
}
//# sourceMappingURL=article.controller.js.map