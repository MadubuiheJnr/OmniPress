import { Landmark } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import BlogPageLayout from "../components/BlogPageLayout/BlogPageLayout";

const Politics = () => {
  const { blogs, recentBlogs } = useLoaderData();
  return (
    <div className="lg:w-[90%] lg:mx-auto">
      <div className="p-5">
        <p className="flex items-center gap-x-1 text-lg font-semibold text-neutral-900">
          <Landmark className="inline" />
          <span>Politics</span>
        </p>
        <p className="text-sm text-neutral-900 mt-1">
          Catch up on what's happening across continents - fast, clear, and
          meaningful.
        </p>
      </div>
      <BlogPageLayout blogs={blogs} recentBlogs={recentBlogs} />
    </div>
  );
};

export default Politics;
