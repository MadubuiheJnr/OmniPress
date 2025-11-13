import { type LoaderFunctionArgs } from "react-router-dom";
import Axios from "../../config/axiosConfig";

export const BlogDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const res = await Axios(`/api/blogs/${id}`);
  if (res.status !== 200) throw new Response(res.data.message);

  const data = res.data;

  return data;
};
