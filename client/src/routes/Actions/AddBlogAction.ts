import { redirect, type ActionFunctionArgs } from "react-router-dom";
import Axios from "../../config/axiosConfig";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const AddBlogAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const image = formData.get("image");
  const category = formData.get("category");
  const content = formData.get("content");
  const tags = formData.get("tags");
  const readingTime = formData.get("readingTime");
  const sentiment = formData.get("sentiment");
  const isPublished = formData.get("isPublished");
  const isFeatured = formData.get("isFeatured");
  const authorName = formData.get("name");
  const authorMedium = formData.get("medium");
  const authorX = formData.get("x");
  const authorFB = formData.get("fb");
  const authorIG = formData.get("ig");
  const authorYT = formData.get("yt");

  const authorObj = {
    name: authorName,
    social: {
      x: authorX,
      ig: authorIG,
      fb: authorFB,
      yt: authorYT,
      medium: authorMedium,
    },
  };

  const formDataToSend = new FormData();

  formDataToSend.append("title", title as string);
  formDataToSend.append("image", image as File);
  formDataToSend.append("category", category as string);
  formDataToSend.append("content", content as string);
  formDataToSend.append("tags", tags as string);
  formDataToSend.append("readingTime", readingTime as string);
  formDataToSend.append("sentiment", sentiment as string);
  formDataToSend.append("isPublished", isPublished as string);
  formDataToSend.append("isFeatured", isFeatured as string);
  formDataToSend.append("author", JSON.stringify(authorObj));

  try {
    const res = await Axios.post("/api/blogs/create", formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.status === 201) toast.success(res.data.message);
    return redirect("/admin");
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const backendMessage =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";

    toast.error(backendMessage);
    return null; // prevent redirect
  }
};
