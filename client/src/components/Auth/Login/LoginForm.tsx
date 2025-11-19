import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { useAuth } from "../../../context/AuthContext";
import BtnLoadingSpinner from "../../common/BtnLoadingSpinner";
import Axios from "../../../config/axiosConfig";

const LoginForm = () => {
  const { fetchUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!identifier) {
        return toast.error("Please provide email/username");
      }
      if (!password) {
        return toast.error("Password is required");
      }
      const res = await Axios.post(
        "api/auth/login",
        { identifier, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.setItem("token", res.data.token);
      fetchUser();

      toast.success(res.data.message || "Logged in");
      return navigate("/");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full lg:h-185 lg:bg-gray-200/70 lg:p-10 lg:rounded-xl">
      <div className="text-center lg:w-[70%] lg:mx-auto">
        <img src="/favicon.png" alt="" className="w-20 mx-auto" />
        <p className="font-bold text-zinc-900 text-lg">
          Welcome back to OmniPress
        </p>
        <p className="text-sm py-2 px-5 text-zinc-600">
          Sign in to keep exploring the stories you love. Like, comment, and
          stay connected with every conversation.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-5 flex flex-col gap-y-5 lg:w-[70%] lg:mx-auto"
      >
        <label
          className="bg-gray-100 rounded-xl relative flex items-center w-full h-13 p-5
        lg:border border-gray-200"
        >
          <input
            name="identifier"
            type="text"
            placeholder="E-mail or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full h-full pl-9 py-3 outline-0 text-zinc-700 text-sm"
          />
          <Mail className="absolute text-zinc-900" />
        </label>
        <label
          className="bg-gray-100 rounded-xl relative flex items-center w-full h-13 p-5
        lg:border border-gray-200"
        >
          <input
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-full pl-9 py-3 outline-0 text-zinc-700 text-sm"
          />
          <LockKeyhole className="absolute text-zinc-900" />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </span>
        </label>

        <button
          disabled={loading}
          className="bg-linear-to-r from-5% from-red-800 to-zinc-950 p-2 rounded-xl text-zinc-50 text-sm font-bold mt-5 cursor-pointer flex items-center justify-center"
        >
          {loading ? (
            <span className="flex items-center gap-x-2">
              <BtnLoadingSpinner /> Logging in
            </span>
          ) : (
            <span>Continue</span>
          )}
        </button>
      </form>

      <div>
        <div className="p-5 lg:w-[70%] lg:mx-auto">
          <div className="flex items-center justify-between">
            <p className="bg-zinc-400 h-px w-1/7 lg:w-1/5" />
            <p className="w-auto text-zinc-600">Don't have an account yet?</p>
            <p className="bg-zinc-400 h-px w-1/7 lg:w-1/5" />
          </div>
        </div>

        <div className="p-5 lg:w-[70%] lg:mx-auto">
          <button
            onClick={() => navigate("/register")}
            className="text-red-700 w-full bg-gray-200 p-3 rounded-xl font-semibold lg:bg-gray-100 cursor-pointer"
          >
            {" "}
            Create an account
          </button>
        </div>

        <p className="p-5 text-center text-zinc-800 text-sm lg:w-[70%] lg:mx-auto">
          By clicking "Continue" i have agreed with the{" "}
          <Link to="/" className="border-b text-red-700">
            Terms Sheet, Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
