import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const loaderWrapper = cva(
  "flex flex-col items-center justify-center gap-5 w-full",
  {
    variants: {
      variant: {
        fullscreen: "min-h-screen",
        contained: "min-h-[320px]",
      },
    },
    defaultVariants: {
      variant: "fullscreen",
    },
  },
);

interface FullScreenLoaderProps extends VariantProps<typeof loaderWrapper> {
  title: string;
  description?: string;
  className?: string;
}

export function FullScreenLoader({
  title,
  description,
  variant,
  className,
}: FullScreenLoaderProps) {
  return (
    <div className={cn(loaderWrapper({ variant }), className)}>
      <div className="size-7 rounded-full border-2 border-border border-t-foreground animate-spin" />
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
