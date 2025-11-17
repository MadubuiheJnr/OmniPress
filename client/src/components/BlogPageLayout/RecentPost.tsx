import { NavLink } from "react-router-dom";
import type { BlogType } from "../../types/blogTypes";

const RecentPost = ({ recentBlogs }: { recentBlogs: BlogType[] }) => {
  return (
    <div>
      <p className="text-xl font-semibold text-neutral-900">Recent Posts</p>
      <div className="flex flex-col gap-y-5 mt-5">
        {recentBlogs.slice(0, 7).map((blog) => (
          <NavLink
            to={`/blog/${blog._id}`}
            className={`line-clamp-1 cursor-pointer text-sm text-red-600`}
          >
            {blog.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default RecentPost;
