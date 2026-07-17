import type { ArticleCategoryRepository as IArticleCategoryRepository } from "../repository/article-category.repository.js";
import type { IArticleCategory } from "../types/category.types.js";
export declare class ArticleCategoryService {
    private readonly articleCategoryRepository;
    constructor(articleCategoryRepository: IArticleCategoryRepository);
    createCategory(data: Pick<IArticleCategory, "name" | "description" | "slug">): Promise<import("mongoose").Document<unknown, {}, import("../types/category.types.js").IArticleCategoryDocument, {}, {}> & import("../types/category.types.js").IArticleCategoryDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findCategoryBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, import("../types/category.types.js").IArticleCategoryDocument, {}, {}> & import("../types/category.types.js").IArticleCategoryDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
//# sourceMappingURL=article-category.service.d.ts.map