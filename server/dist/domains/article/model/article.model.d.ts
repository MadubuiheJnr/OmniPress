import type { IArticleDocument, IArticlePost, IArticleReel } from "../types/article.types.js";
export declare const ArticleModel: import("mongoose").Model<IArticleDocument, {}, {}, {}, import("mongoose").Document<unknown, {}, IArticleDocument, {}, {}> & IArticleDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>;
export declare const ArticlePostModel: import("mongoose").Model<IArticlePost, {}, {}, {}, import("mongoose").Document<unknown, {}, IArticlePost, {}, {}> & IArticlePost & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>;
export declare const ArticleReelModel: import("mongoose").Model<IArticleReel, {}, {}, {}, import("mongoose").Document<unknown, {}, IArticleReel, {}, {}> & IArticleReel & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=article.model.d.ts.map