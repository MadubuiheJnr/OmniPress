import { ThumbsDown, ThumbsUp } from "lucide-react";
import Axios from "../../config/axiosConfig";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../common/AuthModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { BlogDetailResponse } from "../../types/blogTypes";

const LikeAndDislikeBtn = ({ blogID }: { blogID: string }) => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [dislikesCount, setDislikesCount] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const navigate = useNavigate();

  const getPublicCounts = async () => {
    try {
      const res = await Axios<BlogDetailResponse>(`/api/blogs/${blogID}`);
      setLikesCount(res.data.blog.likesCount);
      setDislikesCount(res.data.blog.dislikesCount);
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
      const res = await Axios(`/api/like/reaction/${blogID}?targetType=blog`);
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
      const res = await Axios.post("/api/like", {
        targetId: blogID,
        targetType: "blog",
        type,
      });

      toast.success(res.data.message);
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
    <div className="mt-3 inline-flex items-center gap-x-5 bg-gray-100 px-5 py-2.5 rounded-full">
      <p
        onClick={() => {
          handleLike("like");
        }}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        {liked ? (
          <ThumbsUp className="text-zinc-900" size={20} fill="black" />
        ) : (
          <ThumbsUp className="text-zinc-900" size={20} />
        )}
        <span className="text-base font-semibold text-zinc-900">
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
          <ThumbsDown className="text-zinc-900" size={20} fill="black" />
        ) : (
          <ThumbsDown className="text-zinc-900" size={20} />
        )}
        <span className="text-base font-semibold text-zinc-900">
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

export default LikeAndDislikeBtn;
