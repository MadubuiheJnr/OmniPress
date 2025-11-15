import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { LogIn, PencilLine, User2, type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type UserProfileDataType = {
  id: string;
  name: string;
  icon: LucideIcon;
  slug: string;
};

const userProfileData: UserProfileDataType[] = [
  {
    id: "1",
    name: "View Profile",
    icon: User2,
    slug: "/profile",
  },
  {
    id: "2",
    name: "Edit Details",
    icon: PencilLine,
    slug: "",
  },
];

const UserProfileIcon = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = (slug: string) => {
    navigate(slug);
    setOpen(false);
  };
  return (
    <div>
      <div onClick={() => setOpen(!open)}>
        <img src={user?.avatar || "/user_icon.svg"} alt="" className="w-8" />
      </div>

      {open && (
        <div className="w-60 absolute right-3 top-20 z-10 bg-blue-700/5 backdrop-blur-sm rounded-2xl transition-all duration-300 ease-in-out">
          <div className="w-full bg-neutral-900/10 backdrop-blur-6xl rounded-2xl px-2 py-3 flex flex-col">
            <div className="flex flex-col gap-y-1">
              {userProfileData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleClick(`${item.slug}`)}
                  className="flex items-center gap-x-5 py-2 px-4 rounded-full hover:bg-neutral-50/5 cursor-pointer hover:backdrop-blur-lg"
                >
                  <item.icon className="text-neutral-50" />
                  <p className="text-neutral-50 text-base font-semibold">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-50/50 mt-5 justify-self-end">
              <button className=" flex items-center gap-x-5 py-2 px-4 ">
                <LogIn className="inline text-neutral-50" />
                <span className="text-neutral-50 text-base font-semibold">
                  Log out
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileIcon;
