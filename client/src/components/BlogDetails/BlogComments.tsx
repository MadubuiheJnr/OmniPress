import BlogCommentCard from "./BlogCommentCard";
import type { CommentType } from "../../types/commentTypes";

const BlogComments = ({
  comments,
  loading,
}: {
  comments: CommentType[];
  loading: boolean;
}) => {
  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="flex flex-col gap-y-5">
          {comments.map((comment) => (
            <BlogCommentCard key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogComments;
