import { type LoaderFunctionArgs } from "react-router-dom";
import Axios from "../../config/axiosConfig";
import type { BlogDetailResponse } from "../../types/blogTypes";

export const BlogDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const res = await Axios<BlogDetailResponse>(`/api/blogs/${id}`);
  if (res.status !== 200) throw new Response(res.data.message);

  const blog = res.data.blog;
  const suggestedBlogs = res.data.suggestedBlogs;

  return { blog, suggestedBlogs };
};
