import BlogCommentCard from "./BlogCommentCard";
import type { CommentType } from "../../types/commentTypes";

const BlogComments = ({
  comments,
  loading,
  closeSelected,
  selected,
  setSelected,
  refetchComments,
}: {
  comments: CommentType[];
  loading: boolean;
  selected: string | null;
  setSelected: (e: string) => void;
  refetchComments: () => void;
  closeSelected: () => void;
}) => {
  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="flex flex-col gap-y-5">
          {comments.map((comment) => (
            <BlogCommentCard
              key={comment._id}
              comment={comment}
              closeSelected={closeSelected}
              refetchComments={refetchComments}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogComments;
