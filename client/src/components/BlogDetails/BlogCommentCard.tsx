import type { CommentType } from "../../types/commentTypes";
import user_icon from "/user_icon.png";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import CommentLikesAndDislikeBtn from "./CommentLikesAndDislikeBtn";
import CommentsActions from "./CommentsActions";

const BlogCommentCard = ({
  comment,
  closeSelected,
  selected,
  setSelected,
  refetchComments,
}: {
  comment: CommentType;
  selected: string | null;
  setSelected: (e: string) => void;
  refetchComments: () => void;
  closeSelected: () => void;
}) => {
  const { isAuthenticated } = useAuth();
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <div
      className="grid grid-cols-7
     lg:grid-cols-15"
    >
      <img
        src={comment.user.avatar || user_icon}
        alt="user avatar"
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
      />

      <div className="col-span-6 lg:col-span-14">
        <div className="flex items-center justify-between">
          <p>
            <span className="text-base text-neutral-800 font-semibold">
              {comment.user.userName}
            </span>
          </p>
          {isAuthenticated && (
            <CommentsActions
              comment={comment}
              closeSelected={closeSelected}
              refetchComments={refetchComments}
              selected={selected}
              setSelected={setSelected}
            />
          )}
        </div>
        <p
          onClick={() => setShowMore(!showMore)}
          className={`text-sm text-neutral-800 line-clamp-3 ${
            showMore && "line-clamp-none"
          }`}
        >
          {comment.content}
        </p>

        <div className=" mt-2">
          <CommentLikesAndDislikeBtn commentID={comment._id} />
        </div>
      </div>
    </div>
  );
};

export default BlogCommentCard;
