export interface ArticleAuthor {
  name: string;
  social?: {
    x?: string;
    ig?: string;
    fb?: string;
    yt?: string;
    medium?: string;
  };
}

export interface ArticleCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface Article {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  tags: string[];
  author: ArticleAuthor;
  category: ArticleCategory;
  readingTime: string;
  views: number;
  likesCount: number;
  isFeatured: boolean;
  bookmarked: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ArticleCardVariant = "hero" | "list" | "compact";
