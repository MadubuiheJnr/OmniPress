import type { Document, Types } from "mongoose";
export interface IArticleCategory {
    _id: Types.ObjectId;
    name: string;
    slug: string;
    description: string;
    articlesCount: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface IArticleCategoryDocument extends Omit<IArticleCategory, "_id">, Document {
}
//# sourceMappingURL=category.types.d.ts.map