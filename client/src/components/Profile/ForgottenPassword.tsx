import { Eye, EyeOff, Fingerprint, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import BtnLoadingSpinner from "../common/BtnLoadingSpinner";
import Axios from "../../config/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const ForgottenPassword = ({
  closePasswordEdit,
}: {
  closePasswordEdit: () => void;
}) => {
  const { user, fetchUser } = useAuth();
  const [password, setPassword] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      if (!password) return;
      if (confirmPassword !== password)
        return toast.error("password does not match");

      if (password) formData.append("password", password);

      await Axios.put(`/api/users/update/${user?._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Password updated");
      fetchUser();
      closePasswordEdit();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err.response?.data?.message ||
          "Something went wrong while updating your profile."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <p
        onClick={closePasswordEdit}
        className="flex items-center justify-end cursor-pointer"
      >
        <span className="bg-neutral-50/10 backdrop-blur-xl w-9 h-9 flex items-center justify-center rounded-full">
          <X className="inline text-neutral-100" size={19} />
        </span>
      </p>
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="w-full bg-white/10 backdrop-blur-md flex items-center gap-x-3 py-2 px-1 rounded-full">
          <span className="bg-neutral-100 p-2 rounded-full">
            <Fingerprint className="text-neutral-950" size={19} />
          </span>
          <input
            type={viewPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-sm text-neutral-900 outline-0"
          />
          <span
            onClick={() => setViewPassword(!viewPassword)}
            className="bg-neutral-100 p-2 cursor-pointer rounded-full transition-all ease-in-out  duration-300"
          >
            {viewPassword ? (
              <EyeOff className="text-neutral-600" size={15} />
            ) : (
              <Eye className="text-neutral-600" size={15} />
            )}
          </span>
        </div>

        <div className="w-full bg-white/10 backdrop-blur-md flex items-center gap-x-3 py-2 px-1 rounded-full mt-3">
          <span className="bg-neutral-100 p-2 rounded-full">
            <Fingerprint className="text-neutral-950" size={19} />
          </span>
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full text-sm text-neutral-900 outline-0"
          />
        </div>

        <button
          disabled={loading}
          className={`bg-neutral-900 px-4 py-3 rounded-lg text-sm text-neutral-200 mt-5
          ${(loading || !password) && "opacity-50 cursor-not-allowed"}`}
        >
          {loading ? (
            <span className="flex items-center gap-x-2">
              <BtnLoadingSpinner /> Saving
            </span>
          ) : (
            <span>Save changes</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgottenPassword;
