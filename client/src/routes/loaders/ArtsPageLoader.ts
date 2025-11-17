import Axios from "../../config/axiosConfig";
import type { BlogType } from "../../types/blogTypes";

export const ArtsPageLoader = async () => {
  const blogs = await Axios<BlogType[]>("/api/blogs?category=Arts");
  const recentBlogs = await Axios<BlogType[]>("/api/blogs");

  return {
    blogs: blogs.data,
    recentBlogs: recentBlogs.data,
  };
};
