import { MoreHorizontal } from "lucide-react";
import type { UserType } from "../../../types";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useState } from "react";
import Axios from "../../../config/axiosConfig";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

const UserActions = ({
  user,
  closeSelected,
  selected,
  setSelected,
  refetchUsers,
}: {
  user: UserType;
  selected: string | null;
  setSelected: (e: string) => void;
  refetchUsers: () => void;
  closeSelected: () => void;
}) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const deleteUser = async () => {
    try {
      const res = await Axios.delete(`/api/users/delete/${user._id}`);
      toast.success(res.data.message);
      refetchUsers();
      closeSelected();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    } finally {
      setModalOpen(false);
    }
  };

  const toggleIsAdmin = async () => {
    try {
      const res = await Axios.put(`/api/users/toggle/admin/${user._id}`);
      toast.success(res.data.message);
      refetchUsers();
      closeSelected();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    }
  };
  return (
    <>
      <div className="relative">
        <p
          onClick={() => setSelected(user._id)}
          className={`text-neutral-600 px-1 transition-all duration-300 ease-in-out ${
            selected === user._id && "border border-neutral-200 rounded-lg"
          }`}
        >
          <MoreHorizontal size={18} />
        </p>
        {selected === user._id && (
          <div className="w-38  absolute top-6 -right-4 z-20 bg-white border border-neutral-200 rounded-lg ">
            <div className="p-1">
              <p className="text-sm font-semibold text-neutral-900 p-2 ">
                Actions
              </p>
              <p
                onClick={toggleIsAdmin}
                className="p-2 rounded-sm text-xs text-neutral-900 hover:bg-neutral-100"
              >
                {user.role === "admin" ? "Make user" : "Make admin"}
              </p>
            </div>

            <p className="p-1 border-t border-neutral-200 text-neutral-900">
              <p
                onClick={() => navigate(`/admin/user/${user._id}`)}
                className="p-2 rounded-sm text-xs hover:bg-neutral-100"
              >
                View user details
              </p>
              <p
                onClick={() => setModalOpen(true)}
                className="p-2 rounded-sm text-xs hover:bg-neutral-100"
              >
                Delete user
              </p>
            </p>
          </div>
        )}
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
    </>
  );
};

export default UserActions;
