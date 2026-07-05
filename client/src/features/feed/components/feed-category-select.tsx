import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { feedCategories } from "../constants/feed-categories";
import { cn } from "@/shared/lib/utils";

export function FeedCategorySelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSlug = searchParams.get("category");

  const active = feedCategories.find((c) => c.slug === currentSlug);
  const ActiveIcon = active?.icon ?? LayoutGrid;

  const handleSelect = (slug: string) => {
    setSearchParams((prev) => {
      if (slug === "all" || prev.get("category") === slug) {
        prev.delete("category");
      } else {
        prev.set("category", slug);
      }
      return prev;
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-9 w-9 p-0",
            active && active.slug !== "all" && "border-foreground/30",
          )}
        >
          <ActiveIcon size={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 p-1" sideOffset={6}>
        <DropdownMenuLabel className="text-[11px] text-primary font-normal px-2 py-1">
          Category
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        {feedCategories.map((category) => {
          const Icon = category.icon;
          const isActive =
            currentSlug === category.slug ||
            (!currentSlug && category.slug === "all");

          return (
            <DropdownMenuItem
              key={category.slug}
              onClick={() => handleSelect(category.slug)}
              className={cn(
                "flex text-xs items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer",
                isActive && "font-medium text-accent",
              )}
            >
              <Icon size={12} className="shrink-0 text-inherit" />
              {category.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
