import type { Document, Types } from "mongoose";

export interface IBaseArticle {
  _id: Types.ObjectId;
  title: string;
  slug: string;
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

export interface IArticleReel extends IBaseArticle {
  videoUrl: string;
  duration: number;
  playsCount: number;
  description: string;
  contentType: "REEL";
}

export interface IArticlePost extends IBaseArticle {
  thumbnail: string;
  content: string;
  excerpt: string;
  readingTime: string;
  contentType: "POST";
}

export type IArticle = IArticleReel | IArticlePost;

export interface IArticleDocument extends Omit<IArticle, "_id">, Document {}
