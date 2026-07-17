import { Types } from "mongoose";
import type { CreateArticleDto } from "../dto/create-article.dto.js";
import type { ArticleService as IArticleService } from "../service/article.service.js";
import type { UserService } from "domains/user/service/user.service.js";
import type { ArticleCategoryService as IArticleCategoryService } from "../service/article-category.service.js";
export declare class CreateArticleUseCase {
    private readonly articleService;
    private readonly articleCategoryService;
    private readonly userService;
    constructor(articleService: IArticleService, articleCategoryService: IArticleCategoryService, userService: UserService);
    orchestrate(data: CreateArticleDto, userId: string): Promise<Types.ObjectId>;
}
//# sourceMappingURL=create-article.use-case.d.ts.map