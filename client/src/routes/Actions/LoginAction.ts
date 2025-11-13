import { redirect, type ActionFunctionArgs } from "react-router-dom";
import Axios from "../../config/axiosConfig";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const LoginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const identifier = formData.get("identifier");
  const password = formData.get("password");

  const dataObj = { identifier, password };

  try {
    if (!identifier) {
      toast.error("Email or username is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }
    const res = await Axios.post("api/auth/login", dataObj, {
      headers: { "Content-Type": "application/json" },
    });
    localStorage.setItem("token", res.data.token);
    return redirect("/");
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const backendMessage =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";

    toast.error(backendMessage);
    return null; // prevent redirect
  }
};
