import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

interface AppHeaderProps {
  breadcrumb: string;
  actions?: React.ReactNode;
}
const AppHeader = ({ breadcrumb, actions }: AppHeaderProps) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="ml-1 mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>
                {breadcrumb === "/" ? "Feed" : breadcrumb}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {actions && <div className="">{actions}</div>}
    </div>
  );
};

export default AppHeader;
