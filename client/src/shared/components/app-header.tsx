import { SidebarTrigger } from "./ui/sidebar";

interface AppHeaderProps {
  actions?: React.ReactNode;
}
const AppHeader = ({ actions }: AppHeaderProps) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center">
        <SidebarTrigger />
      </div>

      {actions && <div className="mt-2">{actions}</div>}
    </div>
  );
};

export default AppHeader;
