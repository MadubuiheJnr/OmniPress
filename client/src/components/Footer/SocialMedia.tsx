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
const SocialMedia = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      {SocialMediaData.map((item) => (
        <Link
          to={item.slug}
          key={item.id}
          className="flex items-center gap-2 group"
        >
          <item.icon
            className="text-neutral-50 group-hover:text-red-800 transition-all duration-300 ease-in-out"
            size={20}
          />
          <span className="text-neutral-50 text-sm font-semibold group-hover:text-red-800 transition-all duration-300 ease-in-out">
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default SocialMedia;
