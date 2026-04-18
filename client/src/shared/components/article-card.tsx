import { cva, type VariantProps } from "class-variance-authority";
import { Bookmark, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import type { Article } from "@/shared/types/article.types";
import { cn } from "../lib/utils";

const cardWrapper = cva(
  "group relative flex overflow-hidden border border-border bg-card transition-colors hover:bg-muted",
  {
    variants: {
      variant: {
        hero: "flex-col rounded-xl h-[400px]",
        list: "flex-row rounded-lg h-[100px] items-center gap-3 p-3",
        compact: "flex-col rounded-lg p-3 gap-1",
      },
    },
    defaultVariants: {
      variant: "list",
    },
  },
);

const cardThumbnail = cva("shrink-0 overflow-hidden bg-muted", {
  variants: {
    variant: {
      hero: "absolute inset-0 w-full h-full",
      list: "w-[90px] h-full rounded-md",
      compact: "hidden",
    },
  },
  defaultVariants: {
    variant: "list",
  },
});

const cardTitle = cva(
  "font-medium leading-snug tracking-tight text-foreground line-clamp-2",
  {
    variants: {
      variant: {
        hero: "text-xl text-primary-foreground",
        list: "text-sm",
        compact: "text-sm",
      },
    },
    defaultVariants: {
      variant: "list",
    },
  },
);

const cardCategory = cva("text-xs font-medium uppercase tracking-widest", {
  variants: {
    variant: {
      hero: "text-primary-foreground/50",
      list: "text-muted-foreground",
      compact: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "list",
  },
});

interface ArticleCardProps extends VariantProps<typeof cardWrapper> {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, variant, className }: ArticleCardProps) {
  const {
    slug,
    title,
    thumbnail,
    category,
    author,
    readingTime,
    views,
    bookmarked,
  } = article;

  const isHero = variant === "hero";

  return (
    <Link
      to={`/articles/${slug}`}
      className={cn(cardWrapper({ variant }), className)}
    >
      {/* Thumbnail */}
      <div className={cardThumbnail({ variant })}>
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isHero && (
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex flex-col justify-end gap-1 relative z-10",
          isHero && "absolute bottom-0 left-0 right-0 py-4 px-2",
          !isHero && "flex-1 min-w-0",
        )}
      >
        {/* Category */}
        <span className={cardCategory({ variant })}>{category.name}</span>

        {/* Title */}
        <h3 className={cardTitle({ variant })}>{title}</h3>

        {/* Meta row */}
        <div
          className={cn(
            "flex items-center gap-2 text-xs mt-1",
            isHero ? "text-white/60" : "text-muted-foreground",
          )}
        >
          <span>{author.name}</span>
          <span>·</span>
          <Clock size={11} className="shrink-0" />
          <span>{readingTime}</span>
          <Eye size={11} className="shrink-0" />
          <span>{views.toLocaleString()}</span>

          {/* Bookmark */}
          <Bookmark
            size={13}
            className={cn(
              "ml-auto shrink-0 transition-colors",
              bookmarked
                ? "fill-current text-foreground"
                : "text-muted-foreground",
            )}
          />
        </div>
      </div>
    </Link>
  );
}
