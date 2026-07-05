import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { feedModes } from "../constants/feed-mode";
import { cn } from "@/shared/lib/utils";

export function FeedModeSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentMode = searchParams.get("mode") ?? "latest";

  const allOptions = feedModes.flatMap((group) => group.options);
  const active =
    allOptions.find((o) => o.value === currentMode) ?? allOptions[0]!;
  const ActiveIcon = active.icon;

  const handleSelect = (value: string) => {
    setSearchParams((prev) => {
      prev.set("mode", value);
      return prev;
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 h-9 shadow-none">
          <ActiveIcon size={14} />
          <span className="text-sm">{active.label}</span>
          <ChevronDown size={12} className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 shadow-none border border-border"
      >
        {feedModes.map((group, index) => (
          <div key={group.groupValue}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-primary font-normal">
                {group.groupLabel}
              </DropdownMenuLabel>
              {group.options.map((option) => {
                const Icon = option.icon;
                return (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "gap-2 text-xs",
                      currentMode === option.value && "font-medium text-accent",
                    )}
                  >
                    <Icon size={12} className="text-inherit" />
                    <span>{option.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
