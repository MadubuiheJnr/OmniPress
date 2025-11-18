export interface BlogType {
  _id: string;
  title: string;
  thumbnail: string;
  content: string;
  tags: string[];
  author: {
    name: string;
    social?: {
      x?: string;
      ig?: string;
      fb?: string;
      yt?: string;
      medium?: string;
    };
  };
  category: {
    name: string;
    slug: string;
  };
  likes: string[];
  views: number;
  isFeatured: boolean;
  readingTime: string;
  isPublished: boolean;
  sentiment: string;
  likesCount: number;
  dislikesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogResponse {
  total: number;
  blogs: BlogType[];
}

export type BlogDetailResponse = {
  message?: string;
  suggestedBlogs: BlogType[];
  blog: BlogType;
};
