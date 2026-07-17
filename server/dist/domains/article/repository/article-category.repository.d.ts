import type { Types } from "mongoose";
import type { IArticleCategory } from "../types/category.types.js";
export declare class ArticleCategoryRepository {
    createCategory(data: Pick<IArticleCategory, "name" | "description" | "slug">): Promise<import("mongoose").Document<unknown, {}, import("../types/category.types.js").IArticleCategoryDocument, {}, {}> & import("../types/category.types.js").IArticleCategoryDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findOneBySlug(slug: string): Promise<(import("mongoose").Document<unknown, {}, import("../types/category.types.js").IArticleCategoryDocument, {}, {}> & import("../types/category.types.js").IArticleCategoryDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findOneByName(name: string): Promise<(import("mongoose").Document<unknown, {}, import("../types/category.types.js").IArticleCategoryDocument, {}, {}> & import("../types/category.types.js").IArticleCategoryDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    incArticleCount(id: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, import("../types/category.types.js").IArticleCategoryDocument, {}, {}> & import("../types/category.types.js").IArticleCategoryDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
//# sourceMappingURL=article-category.repository.d.ts.map