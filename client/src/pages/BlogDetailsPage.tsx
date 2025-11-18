import { useLoaderData } from "react-router-dom";
import BlogDetails from "../components/BlogDetails/BlogDetails";
import type { BlogDetailResponse } from "../types/blogTypes";
import SuggestedBlogs from "../components/BlogDetails/SuggestedBlogs";
import { PenTool } from "lucide-react";

const BlogDetailsPage = () => {
  const { blog, suggestedBlogs } = useLoaderData<BlogDetailResponse>();

  return (
    <div className="p-5 lg:w-[80%] lg:mx-auto">
      <BlogDetails blog={blog} />

      {suggestedBlogs.length > 0 && (
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
