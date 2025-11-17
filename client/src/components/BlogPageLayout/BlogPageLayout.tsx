import type { BlogType } from "../../types/blogTypes";
import BlogList from "./BlogList";
import RecentPost from "./RecentPost";

const BlogPageLayout = ({
  blogs,
  recentBlogs,
}: {
  blogs: BlogType[];
  recentBlogs: BlogType[];
}) => {
  return (
    <div
      className="min-h-screen p-4 grid grid-cols-1
    lg:grid-cols-4 lg:gap-x-10"
    >
      <div className="lg:col-span-3">
        <BlogList blogs={blogs} />
      </div>

      <div className="mt-20 mb-10 lg:mt-0 lg:mb-0 lg:border-l border-neutral-400 lg:pl-9">
        <RecentPost recentBlogs={recentBlogs} />
      </div>
    </div>
  );
};

export default BlogPageLayout;
