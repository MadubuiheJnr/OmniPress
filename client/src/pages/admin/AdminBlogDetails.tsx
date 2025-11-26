import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../config/axiosConfig";
import type { BlogDetailResponse, BlogType } from "../../types/blogTypes";
import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  AlertTriangle,
  CheckCircle2,
  MessageCircleMore,
  Pen,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import type { CommentType } from "../../types/commentTypes";
import BtnLoadingSpinner from "../../components/common/BtnLoadingSpinner";

const AdminBlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlogs] = useState<BlogType | null>();
  const [blogComments, setBlogComments] = useState<CommentType[]>([]);
  const [loadingFeature, setLoadingFeature] = useState<boolean>(false);
  const [loadingPublish, setLoadingPublish] = useState<boolean>(false);

  const fetchBlogDetails = async () => {
    try {
      const res = await Axios<BlogDetailResponse>(`/api/blogs/${id}`);
      setBlogs(res.data.blog);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };
  const getBlogComments = async () => {
    try {
      const res = await Axios(`/api/comments/blog/${id}`);
      setBlogComments(res.data);
      console.log(res);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    }
  };

  const toggleIsFeatured = async () => {
    setLoadingFeature(true);
    try {
      const res = await Axios.put(`/api/blogs/toggle/featured/${id}`);
      toast.success(res.data.message);
      fetchBlogDetails();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    } finally {
      setLoadingFeature(false);
    }
  };

  const toggleIsPublished = async () => {
    setLoadingPublish(true);
    try {
      const res = await Axios.put(`/api/blogs/toggle/published/${id}`);
      toast.success(res.data.message);
      fetchBlogDetails();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    } finally {
      setLoadingPublish(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
    getBlogComments();
  }, []);

  return (
    <>
      {blog && (
        <div
          className=" w-full p-3 h-screen overflow-y-auto pb-45
        lg:w-[70%] lg:mx-auto"
        >
          <img src={blog.thumbnail} alt="" className="rounded-2xl" />

          <div className="mt-3 text-neutral-800">
            <div className="flex items-center justify-between">
              <p>
                {blog.isPublished ? (
                  <span className="bg-emerald-200 text-emerald-900 font-bold text-xs inline-flex items-center gap-x-1 p-1">
                    <CheckCircle2 size={17} /> Published
                  </span>
                ) : (
                  <span className="bg-yellow-200/50 text-yellow-900 font-bold text-xs inline-flex items-center gap-x-1 p-1">
                    <AlertTriangle size={17} /> Unpublished
                  </span>
                )}
              </p>
              <span
                className={`h-8 w-8 rounded-full inline-flex items-center justify-center capitalize bg-neutral-100 text-neutral-800 text-sm font-semibold cursor-pointer`}
              >
                <Pen size={16} />
              </span>
            </div>
            <p
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="font-semibold text-sm line-clamp-2 cursor-pointer mt-3"
            >
              {blog.title}
            </p>
            <p
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="line-clamp-5 text-xs mt-1"
            />

            <div className="mt-5 flex items-center gap-x-5 text-neutral-800 font-semibold cursor-not-allowed">
              <span className="flex items-center gap-0.5">
                <ThumbsUp size={17} /> {blog.likesCount}
              </span>
              <span className="flex items-center gap-0.5 cursor-not-allowed">
                <ThumbsDown size={17} /> {blog.dislikesCount}
              </span>
              <span className="flex items-center gap-0.5 cursor-not-allowed">
                <MessageCircleMore size={17} /> {blogComments.length}
              </span>
              <button onClick={toggleIsFeatured} className="cursor-pointer">
                {loadingFeature && (
                  <span
                    className={`flex items-center gap-0.5 font-semibold text-sm border border-neutral-400 px-2 py-1 rounded-md
                  ${loadingFeature && " text-neutral-100 bg-neutral-800"}`}
                  >
                    <BtnLoadingSpinner /> updating...
                  </span>
                )}
                {!loadingFeature && (
                  <span className="flex items-center gap-0.5 font-semibold text-sm border border-neutral-400 px-2 py-1 rounded-md">
                    <Sparkles size={17} />{" "}
                    {blog.isFeatured ? "UnFeature" : "Feature"}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-x-5">
            <button className="text-sm text-neutral-800 border border-neutral-300 font-semibold px-5 py-2 rounded-sm cursor-pointer">
              Delete
            </button>
            <button onClick={toggleIsPublished} className=" cursor-pointer">
              {loadingPublish && (
                <span className="flex items-center gap-x-2 font-semibold text-sm text-neutral-100 bg-neutral-800 px-5 py-2 rounded-md">
                  <BtnLoadingSpinner /> updating...
                </span>
              )}
              {!loadingPublish && (
                <span className="text-sm text-neutral-100 bg-neutral-800 font-semibold px-5 py-2 rounded-sm cursor-pointer">
                  {blog.isPublished ? "Unpublish" : "Publish"}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminBlogDetails;
