import { useNavigate } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { sidebarCTAs, type SidebarCtas } from "./constants";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronRight } from "lucide-react";

interface AppSidebarCTAProps {
  setOpen: (open: boolean) => void;
  state: "expanded" | "collapsed";
  isMobile: boolean;
}
export const AppSidebarCTA = ({
  isMobile,
  setOpen,
  state,
}: AppSidebarCTAProps) => {
  const navigate = useNavigate();
  const handleClick = (item: SidebarCtas) => {
    if (item.path) {
      navigate(item.path);
    }
    if (!isMobile && state === "collapsed") {
      setOpen(true);
    }
  };
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {sidebarCTAs.map((item) => (
            <SidebarMenuItem key={item.id}>
              {item.children && item.children.length > 0 ? (
                <Collapsible className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.label}
                      onClick={() => handleClick(item)}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((child) => (
                        <SidebarMenuSubItem
                          key={child.id}
                          onClick={() => handleClick(child)}
                          className="text-xs"
                        >
                          <SidebarMenuSubButton className="hover:bg-muted-foreground/5">
                            <span>{child.label}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  tooltip={item.label}
                  onClick={() => handleClick(item)}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
