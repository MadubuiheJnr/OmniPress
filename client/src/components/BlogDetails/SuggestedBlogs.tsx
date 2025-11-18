import type { BlogType } from "../../types/blogTypes";
import SuggestedBlogCard from "./SuggestedBlogCard";

const SuggestedBlogs = ({ suggestedBlogs }: { suggestedBlogs: BlogType[] }) => {
  console.log(suggestedBlogs);

  return (
    <div
      className="grid grid-cols-1 gap-3
    lg:grid-cols-3 lg:gap-x-7"
    >
      {suggestedBlogs.map((blog) => (
        <SuggestedBlogCard blog={blog} />
      ))}
    </div>
  );
};

export default SuggestedBlogs;
