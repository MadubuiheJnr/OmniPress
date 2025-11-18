import { NavLink } from "react-router-dom";
import { NavData } from "./data";

const NavLinks = ({ setOpen }: { setOpen: () => void }) => {
  return (
    <div
      className="w-full flex flex-col  gap-y-2 
    lg:flex-row justify-center lg:gap-x-5  lg:font-semibold"
    >
      {NavData.map((item) => (
        <NavLink
          to={item.slug}
          key={item.id}
          onClick={setOpen}
          className={({ isActive }) =>
            `text-base text-neutral-800 hover:text-red-800 transition-all duration-300 ease-in-out
          ${isActive && "text-red-800"}`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
