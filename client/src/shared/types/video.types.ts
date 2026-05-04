export interface VideoAuthor {
  name: string;
}

export interface VideoCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface Video {
  _id: string;
  slug: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  author: VideoAuthor;
  category: VideoCategory;
  views: number;
  likesCount: number;
  isFeatured: boolean;
  bookmarked: boolean;
  createdAt: string;
  updatedAt: string;
}
