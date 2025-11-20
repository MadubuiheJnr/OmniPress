import { Plus, X } from "lucide-react";
import user_icon from "/user_icon.png";
import { useState, type FormEvent } from "react";
import BtnLoadingSpinner from "../common/BtnLoadingSpinner";
import Axios from "../../config/axiosConfig";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useAuth } from "../../context/AuthContext";

const UpdateUserForm = ({ closeEdit }: { closeEdit: () => void }) => {
  const { user, fetchUser } = useAuth();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      if (!avatar || !userName || !bio || !email) return;

      if (avatar) formData.append("image", avatar); // multer field name MUST match

      if (userName) formData.append("userName", userName);
      if (email) formData.append("email", email);
      if (bio) formData.append("bio", bio);

      const res = await Axios.put(`/api/users/update/${user?._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message || "User updated successfully!");
      fetchUser();
      closeEdit();
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
        onClick={closeEdit}
        className="flex items-center justify-end cursor-pointer"
      >
        <span className="bg-neutral-50/10 backdrop-blur-xl w-9 h-9 flex items-center justify-center rounded-full">
          <X className="inline text-neutral-100" size={19} />
        </span>
      </p>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="avatar"
          className="w-30 h-30 inline-flex items-center justify-center bg-neutral-50/10 backdrop-blur-xl rounded-full relative cursor-pointer"
        >
          <img
            src={
              avatar
                ? URL.createObjectURL(avatar)
                : user?.avatar
                ? user.avatar
                : user_icon
            }
            alt=""
            className={`object-cover ${
              avatar || user?.avatar ? "w-30 h-30 rounded-full" : "w-10"
            }`}
          />
          <input
            type="file"
            id="avatar"
            hidden
            onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
          />
          <span
            className={`w-8 h-8 inline-flex items-center justify-center absolute bg-neutral-700 rounded-full top-3 right-0`}
          >
            <Plus className="inline text-neutral-300" size={17} />
          </span>
        </label>

        <div className="flex flex-col mt-5">
          <span className="text-base text-neutral-300 font-semibold">
            Username
          </span>
          <input
            type="text"
            placeholder={user?.userName}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full h-9 border border-neutral-400 rounded-lg p-2 text-sm text-neutral-50 outline-0"
          />
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-base text-neutral-300 font-semibold">
            email
          </span>
          <input
            type="text"
            placeholder={user?.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-9 border border-neutral-400 rounded-lg p-2 text-sm text-neutral-50 outline-0"
          />
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-base text-neutral-300 font-semibold">Bio</span>
          <textarea
            placeholder={user?.bio || "enter bio"}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full h-25 border border-neutral-400 rounded-xl p-2 text-sm text-neutral-50 outline-0 resize-none"
          />
        </div>

        <div className="mt-10 flex items-center-safe justify-center gap-x-5">
          {!loading && (
            <button
              onClick={closeEdit}
              className="border border-neutral-300 px-4 py-2 rounded-lg text-sm text-neutral-200 tracking-wider cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            disabled={loading}
            className={`bg-neutral-900 px-4 py-2 rounded-lg text-sm text-neutral-200 cursor-pointer
          ${loading && "opacity-50 cursor-not-allowed"}`}
          >
            {loading ? (
              <span className="flex items-center gap-x-2">
                <BtnLoadingSpinner /> Saving
              </span>
            ) : (
              <span>Save changes</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;
