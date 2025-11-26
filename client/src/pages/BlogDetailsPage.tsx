import { useParams } from "react-router-dom";
import BlogDetails from "../components/BlogDetails/BlogDetails";
import type { BlogDetailResponse, BlogType } from "../types/blogTypes";
import SuggestedBlogs from "../components/BlogDetails/SuggestedBlogs";
import { PenTool } from "lucide-react";
import Axios from "../config/axiosConfig";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import SearchPageLoadingUI from "../components/common/SearchPageLoadingUI";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlogs] = useState<BlogType | null>();
  const [suggestedBlogs, setSuggestedBlogs] = useState<BlogType[] | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const res = await Axios<BlogDetailResponse>(`/api/blogs/${id}`);
      setBlogs(res.data.blog);
      setSuggestedBlogs(res.data.suggestedBlogs);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  if (loading) return <SearchPageLoadingUI />;

  return (
    <div className="p-5 lg:w-[80%] lg:mx-auto">
      {blog && <BlogDetails blog={blog} />}

      {suggestedBlogs && suggestedBlogs.length > 0 && (
        <div className="mt-20">
          <p className="text-lg text-neutral-800 font-semibold mb-5 flex items-center gap-x-1">
            <PenTool className="inline rotate-180" />
            <span>Related Blogs</span>
          </p>
          <SuggestedBlogs suggestedBlogs={suggestedBlogs} />
        </div>
      )}
    </div>
  );
};

export default BlogDetailsPage;
