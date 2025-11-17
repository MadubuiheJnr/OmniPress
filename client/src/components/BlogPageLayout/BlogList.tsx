import type { BlogType } from "../../types/blogTypes";
import BlogCard from "../common/BlogCard";

const BlogList = ({ blogs }: { blogs: BlogType[] }) => {
  return (
    <div
      className="grid grid-cols-1 gap-y-10
    lg:grid-cols-3 lg:gap-x-5"
    >
      {blogs.map((blog) => (
        <BlogCard blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
