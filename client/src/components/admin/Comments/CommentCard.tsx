import { useState } from "react";
import type { CommentType } from "../../../types/commentTypes";
import user_icon from "/user_icon.png";
import Axios from "../../../config/axiosConfig";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import BtnLoadingSpinner from "../../common/BtnLoadingSpinner";
import { useNavigate } from "react-router-dom";
import { BadgeAlert, BadgeCheck } from "lucide-react";
import ConfirmationModal from "../../common/ConfirmationModal";

const CommentCard = ({
  comment,
  fetchComments,
}: {
  comment: CommentType;
  fetchComments: () => void;
}) => {
  const navigate = useNavigate();
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleApproved = async () => {
    try {
      setLoading(true);
      const res = await Axios.put("/api/comments/toggle/approved", {
        id: comment._id,
      });
      toast.success(res.data.message);
      fetchComments();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async () => {
    try {
      const res = await Axios.delete(`/api/comments/${comment._id}/delete`);
      toast.success(res.data.message);
      fetchComments();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <div
      className="grid grid-cols-6 items-start
    lg:grid-cols-20"
    >
      <img
        src={comment.user?.avatar || user_icon}
        alt="user avatar"
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
      />

      <div className="col-span-5 lg:col-span-18">
        <div className="grid grid-cols-7 items-start">
          <p
            onClick={() => navigate(`/blog/${comment.blog._id}`)}
            className="flex flex-wrap text-xs gap-x-2 text-neutral-800 col-span-6 cursor-pointer"
          >
            <span className="font-semibold cursor-pointer">
              @{comment.user?.userName}
            </span>
            <span className="cursor-pointer text-xs">commented on</span>
            <span className="line-clamp-1 cursor-pointer">
              {comment.blog.title}
            </span>
          </p>
          <p
            className={` h-2.5 w-2.5 rounded-full ml-2 lg:hidden 
            ${comment.isApproved ? "bg-emerald-600" : " bg-yellow-600"}`}
          />
          <div
            className={`w-25 px-2 py-0.5 rounded-2xl hidden lg:inline-block ${
              comment.isApproved
                ? "bg-emerald-200 text-emerald-800"
                : " bg-yellow-200 text-yellow-800"
            }`}
          >
            {comment.isApproved ? (
              <p className="flex items-center gap-x-1 text-xs  font-bold">
                <BadgeCheck size={17} /> Approved
              </p>
            ) : (
              <p className="flex items-center gap-x-1 text-xs font-bold">
                <BadgeAlert size={17} /> <span>Pending</span>
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-xs mt-1 text-neutral-500">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
            })}
          </p>
        </div>

        <div
          onClick={() => setViewMore(!viewMore)}
          className={`bg-neutral-100 p-2 rounded-sm text-xs font-light capitalize text-neutral-900 w-full mt-3 leading-4 cursor-pointer truncate
            ${viewMore && "whitespace-normal"}`}
        >
          {comment.content}
        </div>

        <div className="flex items-center-safe gap-x-5 mt-3">
          <button
            onClick={() => setModalOpen(true)}
            className={`text-xs text-neutral-900 border border-neutral-300 py-1 px-3 rounded-md font-semibold cursor-pointer
            ${loading && "opacity-50 cursor-not-allowed"}`}
          >
            Delete
          </button>
          <button
            onClick={toggleApproved}
            className={`text-xs text-neutral-100 bg-neutral-900 py-1 px-3 rounded-md font-semibold transition-all duration-500 ease-in-out cursor-pointer
                ${loading && "opacity-50 cursor-not-allowed"}`}
          >
            {loading ? (
              <span className="flex items-center gap-x-2">
                <BtnLoadingSpinner />
                {comment.isApproved ? "Disapproving" : "Approving"}
              </span>
            ) : (
              <span>{comment.isApproved ? "Disapprove" : "Approve"}</span>
            )}
          </button>
        </div>
      </div>

      {modalOpen && (
        <ConfirmationModal
          title="Delete Comment"
          subText="Are you sure you want to permanently remove this comment? This action cannot be undone"
          onAffirmText="Delete"
          onAffirmStyles="text-red-800 bg-red-200"
          onAffirm={deleteComment}
          onClose={() => setModalOpen(false)}
          open={modalOpen}
        />
      )}
    </div>
  );
};

export default CommentCard;
