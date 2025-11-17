import { Send } from "lucide-react";
import Axios from "../../config/axiosConfig";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../common/AuthModal";
import { useNavigate } from "react-router-dom";

const AddComment = ({ blogID }: { blogID: string }) => {
  const [content, setContent] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const addComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!user) return setModalOpen(true);
      const res = await Axios.post("/api/comments/add", {
        blog: blogID,
        content,
      });

      if (res.status === 201) {
        setContent("");
        return toast.success(res.data.message);
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form method="POST" action={``}>
      <div className="w-full border border-gray-400 rounded-2xl flex items-end p-3">
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="share your thoughts..."
          onInput={(e) => {
            const textarea = e.currentTarget;
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
          }}
          className="flex-1 outline-none resize-none overflow-y-auto max-h-40 text-sm text-zinc-800"
        />
        <button
          type="button"
          onClick={(e) => addComment(e)}
          className="p-2 bg-zinc-900 flex items-center justify-center rounded-full"
        >
          <Send className="inline text-zinc-50" size={16} />
        </button>
      </div>

      <AuthModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onLogin={() => {
          setModalOpen(false);
          navigate("/login");
        }}
      />
    </form>
  );
};

export default AddComment;
