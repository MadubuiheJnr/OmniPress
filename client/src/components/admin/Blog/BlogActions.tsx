import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useState } from "react";
import Axios from "../../../config/axiosConfig";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { BlogType } from "../../../types/blogTypes";

const BlogActions = ({
  blog,
  closeSelected,
  selected,
  setSelected,
  refetchBlogs,
}: {
  blog: BlogType;
  selected: string | null;
  setSelected: (e: string) => void;
  refetchBlogs: () => void;
  closeSelected: () => void;
}) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const deleteBlog = async () => {
    try {
      const res = await Axios.delete(`/api/blogs/delete/${blog._id}`);
      toast.success(res.data.message);
      refetchBlogs();
      closeSelected();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    } finally {
      setModalOpen(false);
    }
  };

  const toggleIsPublished = async () => {
    try {
      const res = await Axios.put(`/api/blogs/toggle/published/${blog._id}`);
      toast.success(res.data.message);
      refetchBlogs();
      closeSelected();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    } finally {
      setModalOpen(false);
    }
  };

  const toggleIsFeatured = async () => {
    try {
      const res = await Axios.put(`/api/blogs/toggle/featured/${blog._id}`);
      toast.success(res.data.message);
      refetchBlogs();
      closeSelected();
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
    <>
      <div className="relative">
        <p
          onClick={() => setSelected(blog._id)}
          className={`text-neutral-600 px-1 transition-all duration-300 ease-in-out
            lg:w-7
             ${
               selected === blog._id && "border border-neutral-200 rounded-lg"
             }`}
        >
          <MoreHorizontal size={18} />
        </p>
        {selected === blog._id && (
          <div className="w-38  absolute top-6 -right-4 z-20 bg-white border border-neutral-200 rounded-lg ">
            <div className="p-1">
              <p className="text-sm font-semibold text-neutral-900 p-2 ">
                Actions
              </p>
              <p
                onClick={toggleIsPublished}
                className="p-2 rounded-sm text-xs text-neutral-900 hover:bg-neutral-100"
              >
                {blog.isPublished ? "Move to draft" : "Publish"}
              </p>
              <p
                onClick={toggleIsFeatured}
                className="p-2 rounded-sm text-xs text-neutral-900 hover:bg-neutral-100"
              >
                {blog.isFeatured ? "Remove feature" : "Feature"}
              </p>
            </div>

            <p className="p-1 border-t border-neutral-200 text-neutral-900">
              <p
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="p-2 rounded-sm text-xs hover:bg-neutral-100"
              >
                Read blog
              </p>
              <p
                onClick={() => navigate(`/admin/blog/${blog._id}`)}
                className="p-2 rounded-sm text-xs hover:bg-neutral-100"
              >
                View blog details
              </p>
              <p
                onClick={() => setModalOpen(true)}
                className="p-2 rounded-sm text-xs hover:bg-neutral-100"
              >
                Delete blog
              </p>
            </p>
          </div>
        )}
      </div>
      {modalOpen && (
        <ConfirmationModal
          title="Confirm user deletion"
          subText="Deleting this account cannot be undone. Proceed with caution."
          onAffirmText="Delete"
          onAffirmStyles="text-red-800 bg-red-200"
          onAffirm={deleteBlog}
          onClose={() => setModalOpen(false)}
          open={modalOpen}
        />
      )}
    </>
  );
};

export default BlogActions;
