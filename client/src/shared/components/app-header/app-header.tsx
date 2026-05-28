import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { AppBreadcrumb } from "./app-breadcrumb";

interface AppHeaderProps {
  actions?: React.ReactNode;
}
const AppHeader = ({ actions }: AppHeaderProps) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="ml-1 mr-2 data-[orientation=vertical]:h-4"
        />
        <AppBreadcrumb />
      </div>

      {actions && <div className="">{actions}</div>}
    </div>
  );
};

export default AppHeader;
