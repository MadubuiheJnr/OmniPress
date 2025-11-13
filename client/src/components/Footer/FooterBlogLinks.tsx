import { NavLink } from "react-router-dom";
import { NavData } from "../Navbar/data";

const FooterBlogLinks = () => {
  return (
    <div className="text-neutral-50 flex flex-col items-center gap-y-2">
      {NavData.slice(0, 7).map((data) => (
        <NavLink to={data.slug} className={`text-base font-semibold`}>
          {data.name}
        </NavLink>
      ))}
    </div>
  );
};

export default FooterBlogLinks;
