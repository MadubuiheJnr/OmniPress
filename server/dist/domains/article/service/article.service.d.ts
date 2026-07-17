import type { ArticleRepository as IArticleRepository } from "../repository/article.repository.js";
import type { IArticle } from "../types/article.types.js";
import type { Types } from "mongoose";
export declare class ArticleService {
    private readonly articleRepository;
    constructor(articleRepository: IArticleRepository);
    create(data: Omit<IArticle, "_id" | "slug" | "likesCount" | "dislikesCount" | "commentsCount" | "viewsCount" | "bookmarksCount" | "sharesCount" | "isPublished" | "isFeatured" | "isArchived" | "createdAt" | "updatedAt" | "contentHtml" | "readingTime">): Promise<Types.ObjectId>;
    private createArticlePost;
    private createArticleReel;
}
//# sourceMappingURL=article.service.d.ts.map