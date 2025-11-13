import { NavLink } from "react-router-dom";
import { NavData } from "./data";

const NavLinks = () => {
  return (
    <div
      className="w-full flex flex-col  gap-y-2 bg-white text-zinc-950 text-base 
    lg:flex-row justify-center lg:gap-x-5  lg:font-semibold"
    >
      {NavData.map((item) => (
        <NavLink to={item.slug} key={item.id}>
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
