import {
  Blocks,
  LayoutDashboard,
  MessagesSquare,
  Notebook,
  Settings,
  Users,
} from "lucide-react";

type NavListDataType = {
  id: string;
  name: string;
  slug: string;
  icon: React.ElementType;
};

const NavListData: NavListDataType[] = [
  {
    id: "1",
    name: "Dashboard",
    slug: "/admin",
    icon: LayoutDashboard,
  },
  {
    id: "2",
    name: "Blog",
    slug: "/blogs",
    icon: Notebook,
  },
  {
    id: "3",
    name: "Users",
    slug: "/users",
    icon: Users,
  },
  {
    id: "4",
    name: "Comments",
    slug: "/comments",
    icon: MessagesSquare,
  },
  {
    id: "5",
    name: "Categories",
    slug: "/categories",
    icon: Blocks,
  },
  {
    id: "6",
    name: "Settings",
    slug: "/settings",
    icon: Settings,
  },
];

export default NavListData;
