import { useState } from "react";
import Logo from "../common/Logo";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import NavLinks from "./NavLinks";
import LoginButton from "../common/LoginButton";
import { useAuth } from "../../context/AuthContext";
import ProfileIcon from "../common/ProfileIcon";

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="">
      <div
        className="w-full flex justify-between items-center shadow-sm border-b border-gray-50 px-3 py-4
      lg:px-30 lg:py-6"
      >
        <div className="hidden lg:inline-block">Sociials</div>

        <Logo
          styles=" h-full cursor-pointer w-35 text-2xl font-semibold
        lg:text-3xl"
        />

        <div>
          {user ? (
            <ProfileIcon />
          ) : user.role === "admin" ? (
            "Dashboard"
          ) : (
            <LoginButton />
          )}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className=" border border-red-600 p-2 rounded-sm transition-all ease-in-out duration-300 cursor-pointer lg:hidden"
        >
          {open ? (
            <X className="text-red-600" size={20} />
          ) : (
            <Menu className="text-red-600" size={20} />
          )}
        </button>
      </div>
      <div
        className="
      lg:p-6 lg:border-b border-zinc-600 p-5"
      >
        {(open || isLargeScreen) && <NavLinks />}
      </div>
    </div>
  );
};

export default Navbar;
