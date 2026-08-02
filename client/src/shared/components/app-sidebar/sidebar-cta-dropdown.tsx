import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import type { SidebarCtas } from "./constants";

interface SidebarCtaDropdownProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: SidebarCtas[];
}

export const SidebarCtaDropdown = ({
  isOpen,
  onOpenChange,
  items,
}: SidebarCtaDropdownProps) => {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem key={item.id}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
