import { Flag, MoreHorizontal } from "lucide-react";
import Axios from "../../config/axiosConfig";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { CommentType } from "../../types/commentTypes";
import { useAuth } from "../../context/AuthContext";

const CommentsActions = ({
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
  const { user } = useAuth();

  const deleteComment = async () => {
    try {
      const res = await Axios.delete(`/api/comments/${comment._id}/delete`);
      toast.success(res.data.message);
      refetchComments();
      closeSelected();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    }
  };

  return (
    <>
      <div className="relative">
        <p
          onClick={() => setSelected(comment._id)}
          className={`text-neutral-600 px-1 transition-all duration-300 ease-in-out
            lg:w-7
             ${
               selected === comment._id &&
               "border border-neutral-200 rounded-lg"
             }`}
        >
          <MoreHorizontal size={18} />
        </p>
        {selected === comment._id && (
          <div className="w-38  absolute top-6 -right-4 z-20 bg-white border border-neutral-200 rounded-lg ">
            <div className="p-1">
              <p className="text-sm font-semibold text-neutral-900 p-2 ">
                Actions
              </p>
            </div>

            <p className="p-1 border-t border-neutral-200 text-neutral-900">
              <p className="p-2 rounded-sm text-xs text-neutral-900 hover:bg-neutral-100">
                <Flag className="inline text-neutral-900" size={15} /> Report
              </p>
              {user?._id === comment.user._id && (
                <p
                  onClick={deleteComment}
                  className="p-2 rounded-sm text-xs hover:bg-neutral-100"
                >
                  Delete comment
                </p>
              )}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentsActions;
