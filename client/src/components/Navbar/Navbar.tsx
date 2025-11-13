import { useState } from "react";
import Logo from "../common/Logo";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import NavLinks from "./NavLinks";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const navigate = useNavigate();

  return (
    <div className="">
      <div
        className="w-full flex justify-between items-center border-b border-zinc-600 p-3
      lg:px-30 lg:py-6"
      >
        <div className="hidden lg:inline-block">Sociials</div>

        <Logo
          styles=" h-full cursor-pointer w-35 text-2xl font-semibold
        lg:text-3xl"
        />

        <div>
          <button
            onClick={() => navigate("/login")}
            className="text-sm bg-linear-to-r from-5% from-red-800 to-zinc-950 rounded-sm text-zinc-50 py-2 px-6 font-semibold ml-15
            lg:px-10 lg:text-base lg:rounded-none
            "
          >
            Login
          </button>
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
        className="pl-5 pt-2 transition-normal 
      lg:p-6 lg:border-b border-zinc-600 p-3"
      >
        {(open || isLargeScreen) && <NavLinks />}
      </div>
    </div>
  );
};

export default Navbar;
