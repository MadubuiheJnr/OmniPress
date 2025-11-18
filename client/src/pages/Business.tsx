import { LineChart } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import BlogPageLayout from "../components/BlogPageLayout/BlogPageLayout";

const Business = () => {
  const { blogs, recentBlogs } = useLoaderData();
  return (
    <div className="lg:w-[90%] lg:mx-auto">
      <div className="p-5">
        <p className="flex items-center gap-x-1 text-lg font-semibold text-neutral-900">
          <LineChart className="inline" />
          <span>Business</span>
        </p>
        <p className="text-sm text-neutral-900 mt-1">
          Markets, ideas, and the people building tomorrow's companies.
        </p>
      </div>
      <BlogPageLayout blogs={blogs} recentBlogs={recentBlogs} />
    </div>
  );
};

export default Business;
