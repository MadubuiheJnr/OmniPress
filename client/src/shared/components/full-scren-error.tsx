import { cva, type VariantProps } from "class-variance-authority";
import { type LucideIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "../lib/utils";

const wrapper = cva("flex items-center justify-center w-full px-4", {
  variants: {
    variant: {
      fullscreen: "min-h-screen",
      contained: "min-h-[320px]",
    },
  },
  defaultVariants: {
    variant: "fullscreen",
  },
});

interface FullScreenErrorProps extends VariantProps<typeof wrapper> {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    isLoading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  icon: LucideIcon;
  className?: string;
}

export function FullScreenError({
  title,
  description,
  primaryAction,
  secondaryAction,
  icon: Icon,
  variant,
  className,
}: FullScreenErrorProps) {
  return (
    <div className={cn(wrapper({ variant }), className)}>
      <div className="flex flex-col items-center text-center gap-4 max-w-sm">
        <div className="size-11 rounded-full bg-destructive/10 flex items-center justify-center">
          <Icon size={22} className="text-destructive/50" />
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col gap-2 w-full mt-1">
            {primaryAction && (
              <Button
                variant="outline"
                onClick={primaryAction.onClick}
                disabled={primaryAction.isLoading}
              >
                {primaryAction.isLoading ? "Sending..." : primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button variant="ghost" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
