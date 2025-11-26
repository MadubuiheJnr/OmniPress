import {
  Facebook,
  Instagram,
  Sparkles,
  SunMedium,
  Twitter,
  Youtube,
} from "lucide-react";
import type { BlogType } from "../../types/blogTypes";
import AddComment from "./AddComment";
import LikeAndDislikeBtn from "./LikeAndDislikeBtn";
import AiSummary from "../Search/AiSummary";
import { useEffect, useState } from "react";
import Axios from "../../config/axiosConfig";
import BtnLoadingSpinner from "../common/BtnLoadingSpinner";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import BlogComments from "./BlogComments";
import type { CommentType } from "../../types/commentTypes";
import CommentGuideline from "./CommentGuideline";

const BlogDetails = ({ blog }: { blog: BlogType | null }) => {
  const [aiSummary, setAiSummary] = useState<string>("");
  const [aiSummaryLoading, setAiSummaryLoading] = useState<boolean>(false);
  const [blogComments, setBlogComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showGuidelines, setShowGuidelines] = useState<boolean>(true);

  const getAiSummary = async (prompt: string) => {
    try {
      setAiSummaryLoading(true);
      const res = await Axios.post("/api/ai/generate/search/summary", {
        prompt,
      });

      if (res.status === 200) return setAiSummary(res.data);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setAiSummaryLoading(false);
    }
  };

  const handleClose = () => {
    setAiSummary("");
  };

  const getBlogComments = async () => {
    try {
      setLoading(true);
      const res = await Axios(`/api/comments/blog/${blog?._id}`);
      setBlogComments(res.data);
      console.log(res);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogComments();
  }, []);
  return (
    <div className=" relative">
      <div>
        <p className="text-xl font-bold text-zinc-900">{blog?.title}</p>
        <div className="mt-2 flex gap-x-2">
          <span className="text-lg font-light text-zinc-700s">
            By {blog?.author.name} <span>|</span>
          </span>
          <div className="flex items-center gap-x-3">
            <span className="group">
              {blog?.author.social?.medium ? (
                <SunMedium className="transition-transform duration-300 group-hover:scale-110 text-zinc-900" />
              ) : null}
            </span>
            <span className="group">
              {blog?.author.social?.x ? (
                <Twitter className="transition-transform duration-300 group-hover:scale-110 text-zinc-900" />
              ) : null}
            </span>
            <span className="group">
              {blog?.author.social?.fb ? (
                <Facebook className="transition-transform duration-300 group-hover:scale-110 text-zinc-900" />
              ) : null}
            </span>
            <span className="group">
              {blog?.author.social?.ig ? (
                <Instagram className="transition-transform duration-300 group-hover:scale-110 text-zinc-900" />
              ) : null}
            </span>
            <span className="group">
              {blog?.author.social?.yt ? (
                <Youtube className="transition-transform duration-300 group-hover:scale-110 text-zinc-900" />
              ) : null}
            </span>
          </div>
        </div>

        <p className="text-sm font-normal text-zinc-600 mt-2">
          {blog?.createdAt &&
            new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </p>

        {!aiSummary && blog?.content && (
          <button
            disabled={aiSummaryLoading}
            onClick={() => getAiSummary(blog.content)}
            className={`bg-neutral-800 text-zinc-50 text-sm font-semibold px-3 py-1.5 mt-5 rounded-lg 
              ${aiSummaryLoading && "opacity-50 cursor-not-allowed"}`}
          >
            {aiSummaryLoading ? (
              <p className="flex items-center gap-x-2">
                <BtnLoadingSpinner />
                <span>
                  Summarizing <Sparkles className="inline ml-1" size={15} />
                </span>
              </p>
            ) : (
              <p>
                Summarize <Sparkles className="inline ml-1" size={20} />
              </p>
            )}
          </button>
        )}
      </div>

      {/* AI Summary */}
      {aiSummary && (
        <div className="mt-5">
          <AiSummary summary={aiSummary} handleClose={handleClose} />
        </div>
      )}

      <div className="mt-15">
        <img src={blog?.thumbnail} alt="" className="w-full object-cover" />

        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-3 text-xs">
          {blog?.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-neutral-200 py-0.5 px-2 text-neutral-600 cursor-pointer font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        {blog?.content && (
          <p
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="mt-5 text-zinc-800"
          ></p>
        )}
      </div>

      {blog?._id && (
        <div className="mt-3">
          <LikeAndDislikeBtn blogID={blog._id} />
        </div>
      )}

      {/* Community guidelines */}
      {showGuidelines && (
        <div className="mt-7">
          <CommentGuideline handleClose={() => setShowGuidelines(false)} />
        </div>
      )}

      {/* Blog Comments */}
      {blogComments.length > 0 && (
        <div className={`mt-10 `}>
          <BlogComments comments={blogComments} loading={loading} />
        </div>
      )}

      {/* Add Comment */}
      {blog?._id && (
        <div className="mt-10">
          <AddComment blogID={blog._id} fetchComments={getBlogComments} />
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
