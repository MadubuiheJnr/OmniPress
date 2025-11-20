import { Eye, EyeOff, Fingerprint, Mail, User2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import BtnLoadingSpinner from "../../common/BtnLoadingSpinner";
import type { AxiosError } from "axios";
import Axios from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email) return toast.error("Email required");
      if (!username) return toast.error("Username required");
      if (!password) return toast.error("password required");
      if (confirmPassword !== password)
        return toast.error("password does not match");

      const res = await Axios.post(
        "/api/auth/register",
        {
          email,
          userName: username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 201) {
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);

      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
      <div className="w-full bg-white/10 backdrop-blur-md flex items-center gap-x-3 py-2 px-1 rounded-full">
        <span className="bg-neutral-100 p-2 rounded-full">
          <Mail className="text-neutral-950" size={19} />
        </span>
        <input
          type="text"
          placeholder="e-mail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-sm text-neutral-200 outline-0"
        />
      </div>
      <div className="w-full bg-white/10 backdrop-blur-md flex items-center gap-x-3 py-2 px-1 rounded-full">
        <span className="bg-neutral-100 p-2 rounded-full">
          <User2 className="text-neutral-950" size={19} />
        </span>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full text-sm text-neutral-200 outline-0"
        />
      </div>
      <div className="w-full bg-white/10 backdrop-blur-md flex items-center gap-x-3 py-2 px-1 rounded-full">
        <span className="bg-neutral-100 p-2 rounded-full">
          <Fingerprint className="text-neutral-950" size={19} />
        </span>
        <input
          type={viewPassword ? "text" : "password"}
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-sm text-neutral-200 outline-0"
        />
        <span
          onClick={() => setViewPassword(!viewPassword)}
          className="bg-neutral-100 p-2 rounded-full transition-all ease-in-out  duration-300"
        >
          {viewPassword ? (
            <EyeOff className="text-neutral-600" size={15} />
          ) : (
            <Eye className="text-neutral-600" size={15} />
          )}
        </span>
      </div>
      <div className="w-full bg-white/10 backdrop-blur-md flex items-center gap-x-3 py-2 px-1 rounded-full">
        <span className="bg-neutral-100 p-2 rounded-full">
          <Fingerprint className="text-neutral-950" size={19} />
        </span>
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full text-sm text-neutral-200 outline-0"
        />
      </div>

      <button
        disabled={loading}
        className={`p-3 bg-neutral-950 text-neutral-100 text-base rounded-full 
        ${loading && "cursor-not-allowed opacity-50"}`}
      >
        {loading ? (
          <p className="flex items-center justify-center gap-x-2">
            <BtnLoadingSpinner /> Registering
          </p>
        ) : (
          <span>Sign Up</span>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
