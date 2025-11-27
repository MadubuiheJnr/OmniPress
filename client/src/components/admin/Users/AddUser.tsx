import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import Axios from "../../../config/axiosConfig";
import type { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import BtnLoadingSpinner from "../../common/BtnLoadingSpinner";

const AddUser = ({
  open,
  handleClose,
  fetchUsers,
}: {
  open: boolean;
  handleClose: () => void;
  fetchUsers: () => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
        fetchUsers();
        handleClose();
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm  flex items-center justify-center z-50">
      <div className="bg-neutral-50  p-5 pt-7 pb-9 text-center rounded-3xl w-[90%] shadow-xl border border-neutral-200">
        <div>
          <p className="text-base font-bold text-neutral-700">
            Register New user
          </p>
          <p className="text-sm text-neutral-700 font-light">
            Create a new account with required details. All fields must be
            accurate
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10">
          <div className="flex flex-wrap items-center justify-start">
            <p className="pl-1.5 text-neutral-800 text-sm font-bold">
              Username
            </p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="w-full text-xs text-neutral-900 outline-0 border border-neutral-200 rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex flex-wrap items-center justify-start mt-3">
            <p className="pl-1.5 text-neutral-800 text-sm font-bold">Email</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username"
              className="w-full text-xs text-neutral-900 outline-0 border border-neutral-200 rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex flex-wrap items-center justify-start mt-3">
            <p className="pl-1.5 text-neutral-900 text-sm font-bold">
              Password
            </p>
            <div className="w-full border border-neutral-200 rounded-lg px-3 py-2 flex items-center">
              <input
                type={viewPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs text-neutral-800 outline-0 "
              />
              <span onClick={() => setViewPassword(!viewPassword)}>
                {viewPassword ? (
                  <EyeOff className="inline text-neutral-700" />
                ) : (
                  <Eye className="inline text-neutral-700" />
                )}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-start mt-3">
            <p className="pl-1.5 text-neutral-900 text-sm font-bold">
              Confirm Password
            </p>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full text-xs text-neutral-800 outline-0 border border-neutral-200 rounded-lg px-3 py-2"
            />
          </div>

          <div className="mt-5 flex items-center justify-between transition-all duration-300 ease-in-out">
            {!loading && (
              <button
                type="button"
                onClick={handleClose}
                className="border border-neutral-300 px-5 py-1.5 rounded-xl text-sm text-neutral-700 font-bold cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className={`bg-neutral-900 px-5 py-1.5 rounded-xl text-sm text-neutral-100 font-bold 
                ${
                  loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
            >
              {loading ? (
                <span className="flex items-center gap-x-2">
                  <BtnLoadingSpinner /> creating...
                </span>
              ) : (
                <span>Create</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
