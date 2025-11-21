import { useEffect, useState } from "react";
import Axios from "../../config/axiosConfig";
import type { CommentType } from "../../types/commentTypes";
import CommentCard from "../../components/admin/Comments/CommentCard";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

const Comments = () => {
  const [comments, setComments] = useState<CommentType[]>([]);

  const fetchComments = async () => {
    try {
      const res = await Axios("/api/comments");
      setComments(res.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="p-0.5 h-screen overflow-y-auto pb-25">
      <div>
        <p className="text-base text-neutral-800 font-semibold">
          Comments Overview
        </p>
        <p className="text-sm text-neutral-800 font-light">
          Browse, review, and moderate user responses.
        </p>
      </div>

      <div className="flex flex-col gap-y-5 p-2 mt-10">
        {comments.length > 0 &&
          comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              fetchComments={fetchComments}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
