import { useLoaderData } from "react-router-dom";
import BlogDetails from "../components/BlogDetails/BlogDetails";
import type { BlogDetailResponse } from "../types/blogTypes";

const BlogDetailsPage = () => {
  const data = useLoaderData<BlogDetailResponse>();
  console.log(data);

  return (
    <div className="p-5">
      <BlogDetails data={data.blog} />
    </div>
  );
};

export default BlogDetailsPage;
