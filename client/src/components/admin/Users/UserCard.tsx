import { Clock } from "lucide-react";
import type { UserType } from "../../../types";
import profile_bg from "/profile_bg.jpg";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }: { user: UserType }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/admin/user/${user._id}`)}
      style={{ backgroundImage: `url(${user.avatar || profile_bg})` }}
      className="w-full h-70 bg-center bg-cover bg-no-repeat p-2 flex rounded-xl cursor-pointer"
    >
      <div className="w-full bg-black/20 backdrop-blur-xs p-3 self-end rounded-md">
        <p className=" text-sm font-semibold text-neutral-100">
          {user.userName}
        </p>

        <p className="flex items-center gap-x-1">
          <Clock className="text-neutral-200" size={15} />
          <span className="inline-block text-neutral-200 text-xs">
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
