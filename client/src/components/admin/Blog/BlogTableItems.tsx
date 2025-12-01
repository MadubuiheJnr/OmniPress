import { AlertTriangle, Check, Star, StarOff } from "lucide-react";
import type { BlogType } from "../../../types/blogTypes";
import BlogActions from "./BlogActions";

const BlogTableItems = ({
  blog,
  index,
  selected,
  setSelected,
  closeSelected,
  refetchBlogs,
}: {
  blog: BlogType;
  index: number;
  selected: string | null;
  setSelected: (e: string) => void;
  refetchBlogs: () => void;
  closeSelected: () => void;
}) => {
  return (
    <tr className="text-xs border-b border-neutral-200 cursor-pointer">
      <td className="px-6 py-3">{index}</td>
      <td className="px-6 py-3 truncate">{blog.title.slice(0, 45)} ...</td>
      <td className="px-6 py-3 text-center">{blog.category.name}</td>
      <td className="px-3 py-3 text-center">
        {blog.isPublished ? (
          <Check className="inline text-emerald-600" size={15} />
        ) : (
          <AlertTriangle className="inline text-yellow-600" size={15} />
        )}
      </td>
      <td className="px-3 py-3 text-center">
        {blog.isFeatured ? (
          <Star className="inline text-emerald-600" size={15} />
        ) : (
          <StarOff className="inline text-red-600" size={15} />
        )}
      </td>
      <td className="px-6 py-3">
        {new Date(blog.createdAt).toLocaleDateString("en-US", {
          year: "2-digit",
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="px-6 py-3 ">
        <BlogActions
          blog={blog}
          refetchBlogs={refetchBlogs}
          setSelected={setSelected}
          closeSelected={closeSelected}
          selected={selected}
        />
      </td>
    </tr>
  );
};

export default BlogTableItems;
