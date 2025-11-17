import { useLoaderData } from "react-router-dom";
import BlogPageLayout from "../components/BlogPageLayout/BlogPageLayout";
import { Atom } from "lucide-react";

const Science = () => {
  const { blogs, recentBlogs } = useLoaderData();
  return (
    <div className="lg:w-[90%] lg:mx-auto">
      <div className="p-5">
        <p className="flex items-center gap-x-1 text-lg font-semibold text-neutral-900">
          <Atom className="inline" />
          <span>Science</span>
        </p>
        <p className="text-sm text-neutral-900 mt-1">
          Stories and discoveries shaping the future
        </p>
      </div>
      <BlogPageLayout blogs={blogs} recentBlogs={recentBlogs} />
    </div>
  );
};

export default Science;
