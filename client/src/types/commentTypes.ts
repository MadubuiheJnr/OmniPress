export interface CommentType {
  blog: string;
  user: string;
  content: string;
  likes: string[];
  likesCount: number;
  dislikesCount: number;
  isApproved: boolean;
}
