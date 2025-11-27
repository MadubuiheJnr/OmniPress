import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../config/axiosConfig";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import type { UserType } from "../../types";
import user_icon from "/user_icon.svg";
import { BadgeInfo, Mail, PenBoxIcon, UserSquare2 } from "lucide-react";
import BtnLoadingSpinner from "../../components/common/BtnLoadingSpinner";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getUser = async () => {
    // setLoading(false);
    try {
      const res = await Axios(`/api/users/${id}`);
      setUser(res.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    } finally {
      // setLoading(false);
    }
  };

  const toggleIsAdmin = async () => {
    setLoadingUpdate(true);
    try {
      const res = await Axios.put(`/api/users/toggle/admin/${id}`);
      toast.success(res.data.message);
      getUser();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    } finally {
      setLoadingUpdate(false);
    }
  };

  const deleteUser = async () => {
    setLoadingUpdate(true);
    try {
      const res = await Axios.delete(`/api/users/delete/${id}`);
      toast.success(res.data.message);
      navigate("/admin/users");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    } finally {
      setLoadingUpdate(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user && (
        <div className="p-3 h-screen overflow-y-auto">
          <div className="relative">
            <img
              src={user?.avatar || user_icon}
              alt=""
              className="w-full rounded-2xl h-75 object-cover"
            />

            <span
              className={`inline-block capitalize bg-black/15 backdrop-blur-xs text-neutral-100 px-3 py-1 text-sm font-semibold mt-1 absolute top-2 left-2`}
            >
              {user?.role}
            </span>
            <span
              className={`h-8 w-8 rounded-full inline-flex items-center justify-center capitalize bg-black/20 backdrop-blur-xs text-neutral-100 text-sm font-semibold mt-1 absolute top-2 right-2 cursor-pointer`}
            >
              <PenBoxIcon size={16} />
            </span>
          </div>
          <div>
            <p className="mt-5 flex items-center gap-x-2">
              <UserSquare2 className="text-neutral-700" size={20} />
              <span className="text-base font-semibold text-neutral-700">
                {user?.userName}
              </span>
            </p>
            <p className="mt-0.5 flex items-center gap-x-2">
              <Mail className="text-neutral-700" size={20} />
              <span className="text-sm font-light text-neutral-700">
                {user?.email}
              </span>
            </p>

            <p className="mt-1.5 grid grid-cols-11 items-start gap-x-2">
              <BadgeInfo className="text-neutral-700" size={20} />
              <span className=" text-sm font-light text-neutral-700 col-span-10">
                {user?.bio}
              </span>
            </p>

            <div className="mt-5">
              <p className="flex items-center gap-x-1">
                <span className="text-xs font-bold text-neutral-800">
                  Creation Date:{" "}
                </span>
                <span className="inline-block text-neutral-400 text-xs">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "--"}
                </span>
              </p>
              <p className="flex items-center gap-x-1 mt-0.5">
                <span className="text-xs font-bold text-neutral-800">
                  Last Update:{" "}
                </span>
                <span className="inline-block text-neutral-400 text-xs">
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "--"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-x-5 transition-all duration-300 ease-in-out">
              {!loadingUpdate && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-5 text-sm text-neutral-900 px-2 py-1  border border-neutral-300 font-semibold outline-0 cursor-pointer"
                >
                  Delete
                </button>
              )}
              <button
                onClick={toggleIsAdmin}
                className={`mt-5 text-sm bg-neutral-900 text-neutral-100 px-2 py-1 font-semibold outline-0 cursor-pointer transition-all duration-300 ease-in-out
                ${loadingUpdate && "opacity-50 cursor-not-allowed"}`}
              >
                {loadingUpdate && (
                  <span className="flex items-center gap-x-1">
                    <BtnLoadingSpinner /> updating...
                  </span>
                )}
                {!loadingUpdate && (
                  <span>
                    {user?.role == "user" ? "Make Admin" : "Make user"}
                  </span>
                )}
              </button>
            </div>
          </div>

          {modalOpen && (
            <ConfirmationModal
              title="Confirm user deletion"
              subText="Deleting this account cannot be undone. Proceed with caution."
              onAffirmText="Delete"
              onAffirmStyles="text-red-800 bg-red-200"
              onAffirm={deleteUser}
              onClose={() => setModalOpen(false)}
              open={modalOpen}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserDetails;
