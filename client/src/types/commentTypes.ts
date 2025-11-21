export interface CommentType {
  _id: string;
  content: string;
  likesCount: number;
  dislikesCount: number;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  blog: {
    _id: string;
    title: string;
    category: {
      name: string;
      slug: string;
    };
  };
  user: {
    email: string;
    role: string;
    _id: string;
    avatar: string;
    userName: string;
  };
  likes: string[];
}
