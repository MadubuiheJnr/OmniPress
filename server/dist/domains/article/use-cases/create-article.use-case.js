import { Types } from "mongoose";
import { BadRequestError, NotFoundError } from "shared/errors/http.error.js";
export class CreateArticleUseCase {
    articleService;
    articleCategoryService;
    userService;
    constructor(articleService, articleCategoryService, userService) {
        this.articleService = articleService;
        this.articleCategoryService = articleCategoryService;
        this.userService = userService;
    }
    async orchestrate(data, userId) {
        const { category, ...rest } = data;
        if (!Types.ObjectId.isValid(userId))
            throw new BadRequestError("Invalid user ID");
        const objectId = new Types.ObjectId(userId);
        const articleCategory = await this.articleCategoryService.findCategoryBySlug(category);
        if (!articleCategory)
            throw new NotFoundError("Category not found", "Please select a valid category and try again");
        if (data.contentType === "POST") {
            return await this.articleService.create({
                ...rest,
                author: objectId,
                category: articleCategory._id,
                contentJson: data.content,
            });
        }
        return await this.articleService.create({
            ...rest,
            author: objectId,
            category: articleCategory._id,
        });
    }
}
//# sourceMappingURL=create-article.use-case.js.map