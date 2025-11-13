import { Link } from "react-router-dom";
import logo from "/logo.png";

const Logo = ({ styles }: { styles: string }) => {
  return (
    <Link to="/">
      {/* <img src={logo} alt="" className={styles} /> */}
      <p className={styles}>
        <span className="text-red-800">Omni</span>
        <span className="text-zinc-900">Press</span>
      </p>
    </Link>
  );
};

export default Logo;
