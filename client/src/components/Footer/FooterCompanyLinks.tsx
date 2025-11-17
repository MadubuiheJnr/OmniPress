import { NavLink } from "react-router-dom";
import { NavData } from "../Navbar/data";

const FooterCompanyLinks = () => {
  return (
    <div className="text-neutral-50 flex flex-col items-center gap-y-2">
      <NavLink to="/" className={`text-base font-semibold`}>
        Home
      </NavLink>
      {NavData.slice(7, 9).map((data) => (
        <NavLink to={data.slug} className={`text-sm font-semibold`}>
          {data.name}
        </NavLink>
      ))}
    </div>
  );
};

export default FooterCompanyLinks;
