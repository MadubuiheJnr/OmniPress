import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Axios from "../../config/axiosConfig";
import type { CommentType } from "../../types/commentTypes";
import AuthModal from "../common/AuthModal";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const CommentLikesAndDislikeBtn = ({ commentID }: { commentID: string }) => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [dislikesCount, setDislikesCount] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const navigate = useNavigate();

  const getPublicCounts = async () => {
    try {
      const res = await Axios<CommentType>(`/api/comments/${commentID}`);
      setLikesCount(res.data.likesCount);
      setDislikesCount(res.data.dislikesCount);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.log(err);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  const getUserReaction = async () => {
    try {
      const res = await Axios(
        `/api/like/reaction/${commentID}?targetType=comment`
      );
      const reaction: string | null = res.data.reaction;

      setLiked(false);
      setDisliked(false);

      if (reaction === "like") setLiked(true);
      if (reaction === "dislike") setDisliked(true);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.log(err);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  useEffect(() => {
    getPublicCounts();

    // only logged-in users get userReaction
    if (user) getUserReaction();
  }, []);

  const handleLike = async (type: string) => {
    try {
      if (!user) return setModalOpen(true);

      // local optimistic update
      if (type === "like") {
        if (disliked) setDisliked(false);
        setLiked(!liked);
      }

      if (type === "dislike") {
        if (liked) setLiked(false);
        setDisliked(!disliked);
      }

      // CALL API
      await Axios.post("/api/like", {
        targetId: commentID,
        targetType: "comment",
        type,
      });
      getPublicCounts();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );

      // revert optimistic change
      if (type === "like") setLiked(!liked);
      if (type === "dislike") setDisliked(!disliked);
    }
  };
  return (
    <div className="mt-3 inline-flex items-center gap-x-2 bg-gray-100 px-3 py-1 rounded-full">
      <p
        onClick={() => {
          handleLike("like");
        }}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        {liked ? (
          <ThumbsUp className="text-zinc-900" size={15} fill="black" />
        ) : (
          <ThumbsUp className="text-zinc-900" size={15} />
        )}
        <span className="text-sm font-semibold text-zinc-900">
          {likesCount}
        </span>
      </p>
      <span className="w-px h-5 bg-gray-400" />
      <p
        onClick={() => {
          handleLike("dislike");
        }}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        {disliked ? (
          <ThumbsDown className="text-zinc-900" size={15} fill="black" />
        ) : (
          <ThumbsDown className="text-zinc-900" size={15} />
        )}
        <span className="text-sm font-semibold text-zinc-900">
          {dislikesCount}
        </span>
      </p>

      <AuthModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onLogin={() => {
          setModalOpen(false);
          navigate("/login");
        }}
      />
    </div>
  );
};

export default CommentLikesAndDislikeBtn;
