import { BadgeQuestionMarkIcon, ChevronLeft, Mail, User2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import profileIMG from "/profile_bg.jpg";
import { useNavigate } from "react-router-dom";

const UserProfileCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: `url(${user?.avatar || profileIMG})` }}
      className={`w-full h-screen bg-position-[100%] bg-cover bg-no-repeat`}
    >
      <div className="w-full h-full flex flex-wrap">
        <div className="cursor-pointer p-2">
          <p
            onClick={() => navigate(-1)}
            className="py-1.5 pl-0.5 pr-5  rounded-full flex items-center bg-black/5 backdrop-blur-xs"
          >
            <ChevronLeft className="text-neutral-50 inline" size={30} />
            <span className="text-neutral-50">Back</span>
          </p>
        </div>
        <div className="self-end w-full p-5 rounded-t-4xl bg-white/5 backdrop-blur-xs border-t border-white/50 text-neutral-50">
          <p className="flex items-center flex-wrap gap-x-3">
            <User2 className="inline text-neutral-50" />
            <span className="font-semibold text-lg text-neutral-50">
              {user?.userName}
            </span>
          </p>
          <p className="flex items-center flex-wrap gap-x-3 mt-2">
            <Mail className="inline text-neutral-50" />
            <span className="text-neutral-50">{user?.email}</span>
          </p>
          <p className="mt-5 flex items-center flex-wrap gap-x-3">
            <BadgeQuestionMarkIcon />
            <span>{user?.bio ?? "No Bio"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
