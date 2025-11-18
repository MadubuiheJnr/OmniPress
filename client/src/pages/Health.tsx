import { Stethoscope } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import BlogPageLayout from "../components/BlogPageLayout/BlogPageLayout";

const Health = () => {
  const { blogs, recentBlogs } = useLoaderData();
  return (
    <div className="lg:w-[90%] lg:mx-auto">
      <div className="p-5">
        <p className="flex items-center gap-x-1 text-lg font-semibold text-neutral-900">
          <Stethoscope className="inline" />
          <span>Health</span>
        </p>
        <p className="text-sm text-neutral-900 mt-1">
          Wellness, medical insights, and practical tips for everyday living.
        </p>
      </div>
      <BlogPageLayout blogs={blogs} recentBlogs={recentBlogs} />
    </div>
  );
};

export default Health;
