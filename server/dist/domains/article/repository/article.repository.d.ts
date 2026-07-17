import type { Types } from "mongoose";
import type { IArticle, IArticlePost, IArticleReel } from "../types/article.types.js";
type CounterField = "likesCount" | "dislikesCount" | "commentsCount" | "viewsCount" | "bookmarksCount" | "sharesCount";
export declare class ArticleRepository {
    createPost(articleData: Pick<IArticlePost, "title" | "contentJson" | "thumbnail" | "excerpt" | "category" | "author" | "slug" | "readingTime" | "contentHtml">): Promise<import("mongoose").Document<unknown, {}, IArticlePost, {}, {}> & IArticlePost & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    createReel(articleData: Pick<IArticleReel, "title" | "author" | "excerpt" | "category" | "duration" | "videoUrl" | "slug">): Promise<import("mongoose").Document<unknown, {}, IArticleReel, {}, {}> & IArticleReel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(articleId: Types.ObjectId, articleData: Partial<Omit<IArticle, "_id" | "createdAt" | "updatedAt" | "contentType">>): Promise<(import("mongoose").Document<unknown, {}, import("../types/article.types.js").IArticleDocument, {}, {}> & import("../types/article.types.js").IArticleDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findById(articleId: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, import("../types/article.types.js").IArticleDocument, {}, {}> & import("../types/article.types.js").IArticleDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findBySlug(slug: string, includeUnpublished?: boolean): Promise<(import("mongoose").Document<unknown, {}, import("../types/article.types.js").IArticleDocument, {}, {}> & import("../types/article.types.js").IArticleDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getAllSlugs(): Promise<string[]>;
    findAll(page: number, limit: number, categoryId?: Types.ObjectId): Promise<{
        articles: (import("mongoose").Document<unknown, {}, import("../types/article.types.js").IArticleDocument, {}, {}> & import("../types/article.types.js").IArticleDocument & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        totalItems: number;
    }>;
    findByAuthor(authorId: Types.ObjectId, page: number, limit: number): Promise<{
        articles: (import("mongoose").Document<unknown, {}, import("../types/article.types.js").IArticleDocument, {}, {}> & import("../types/article.types.js").IArticleDocument & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        totalItems: number;
    }>;
    incrementCounter(articleId: Types.ObjectId, field: CounterField, amount?: 1 | -1): Promise<(import("mongoose").Document<unknown, {}, import("../types/article.types.js").IArticleDocument, {}, {}> & import("../types/article.types.js").IArticleDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    setPublishStatus(articleId: Types.ObjectId, isPublished: boolean): Promise<(import("mongoose").Document<unknown, {}, import("../types/article.types.js").IArticleDocument, {}, {}> & import("../types/article.types.js").IArticleDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    setArchiveStatus(articleId: Types.ObjectId, isArchived: boolean): Promise<(import("mongoose").Document<unknown, {}, import("../types/article.types.js").IArticleDocument, {}, {}> & import("../types/article.types.js").IArticleDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    delete(articleId: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, import("../types/article.types.js").IArticleDocument, {}, {}> & import("../types/article.types.js").IArticleDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
export {};
//# sourceMappingURL=article.repository.d.ts.map