import type { Document, Types } from "mongoose";

export interface TipTapNode {
  type: string;
  content?: TipTapNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  attrs?: Record<string, unknown>;
}

export interface TipTapDocument {
  type: "doc";
  content: TipTapNode[];
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
  contentJson: TipTapDocument; // for edit operations and mobile
  contentHtml: string; // for web read operations
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

export interface IArticleDocument extends Omit<IArticle, "_id">, Document {}
