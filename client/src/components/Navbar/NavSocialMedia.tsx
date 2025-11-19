import {
  Book,
  Facebook,
  Instagram,
  Linkedin,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

type SocialMediaDataTypes = {
  id: string;
  name: string;
  icon: LucideIcon;
  slug: string;
};
const SocialMediaData: SocialMediaDataTypes[] = [
  {
    id: "1",
    name: "Instagram",
    icon: Instagram,
    slug: "",
  },
  {
    id: "2",
    name: "Facebook",
    icon: Facebook,
    slug: "",
  },
  {
    id: "3",
    name: "LinkedIn",
    icon: Linkedin,
    slug: "",
  },
  {
    id: "4",
    name: "Medium",
    icon: Book,
    slug: "",
  },
];
const NavSocialMedia = () => {
  return (
    <div className="flex items-center gap-3">
      {SocialMediaData.map((item) => (
        <Link to={item.slug} key={item.id} className="flex items-center gap-2 ">
          <item.icon
            className="text-neutral-950 hover:text-red-800"
            size={20}
          />
        </Link>
      ))}
    </div>
  );
};

export default NavSocialMedia;
