import Axios from "../../config/axiosConfig";
import type { BlogType } from "../../types/blogTypes";

export const BusinessPageLoader = async () => {
  const blogs = await Axios<BlogType[]>("/api/blogs?category=Business");
  const recentBlogs = await Axios<BlogType[]>("/api/blogs");

  return {
    blogs: blogs.data,
    recentBlogs: recentBlogs.data,
  };
};
