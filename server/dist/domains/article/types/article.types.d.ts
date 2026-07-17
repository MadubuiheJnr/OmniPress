import type { JSONContent } from "@tiptap/core";
import type { Document, Types } from "mongoose";
export interface TipTapDocument {
    type: "doc";
    content: JSONContent[];
}
export interface IBaseArticle {
    _id: Types.ObjectId;
    title: string;
    slug: string;
    excerpt: string;
    category: Types.ObjectId;
    author: Types.ObjectId;
    likesCount: number;
    dislikesCount: number;
    commentsCount: number;
    viewsCount: number;
    bookmarksCount: number;
    sharesCount: number;
    isPublished: boolean;
    isFeatured: boolean;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface IArticlePost extends IBaseArticle {
    thumbnail: string;
    contentJson: TipTapDocument;
    contentHtml: string;
    readingTime: string;
    contentType: "POST";
}
export interface IArticleReel extends IBaseArticle {
    videoUrl: string;
    duration: number;
    playsCount: number;
    contentType: "REEL";
}
export type IArticle = IArticleReel | IArticlePost;
export interface IArticleDocument extends Omit<IArticle, "_id">, Document {
}
//# sourceMappingURL=article.types.d.ts.map