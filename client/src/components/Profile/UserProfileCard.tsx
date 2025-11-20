import { ChevronLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import profileIMG from "/profile_bg.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UpdateUserForm from "./UpdateUserForm";
import UserDetailsCard from "./UserDetailsCard";
import ForgottenPassword from "./ForgottenPassword";

const UserProfileCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  return (
    <div
      style={{ backgroundImage: `url(${user?.avatar || profileIMG})` }}
      className={`w-full h-screen bg-center bg-cover bg-no-repeat overflow-auto`}
    >
      <div
        className="w-full h-full flex flex-wrap
      lg:w-[80%] lg:mx-auto"
      >
        <div className="cursor-pointer p-2">
          <p
            onClick={() => navigate(-1)}
            className="py-1.5 pl-0.5 pr-5  rounded-full flex items-center bg-black/5 backdrop-blur-xs"
          >
            <ChevronLeft className="text-neutral-50 inline" size={30} />
            <span className="text-neutral-50">Back</span>
          </p>
        </div>
        <div
          className="self-end w-full p-5 rounded-t-4xl bg-white/5 backdrop-blur-xs border-t border-white/50 text-neutral-50
        lg:border lg:border-b-0"
        >
          {!editProfile && !editPassword && (
            <div>
              <UserDetailsCard
                user={user}
                openEdit={() => setEditProfile(true)}
                openEditPassword={() => setEditPassword(true)}
              />
            </div>
          )}

          {editProfile && !editPassword && (
            <div>
              <UpdateUserForm closeEdit={() => setEditProfile(false)} />
            </div>
          )}

          {editPassword && !editProfile && (
            <div>
              <ForgottenPassword
                closePasswordEdit={() => setEditPassword(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
