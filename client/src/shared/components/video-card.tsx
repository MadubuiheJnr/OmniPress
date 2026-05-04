import { Bookmark, Play } from "lucide-react";
import { Link } from "react-router-dom";
import type { Video } from "@/shared/types/video.types";
import { cn } from "../lib/utils";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface VideoCardProps {
  video: Video;
  className?: string;
}

export function VideoCard({ video, className }: VideoCardProps) {
  const {
    slug,
    title,
    thumbnail,
    duration,
    author,
    category,
    views,
    bookmarked,
  } = video;

  return (
    <Link
      to={`/watch/${slug}`}
      className={cn("group flex flex-col gap-2", className)}
    >
      <Card className="overflow-hidden border-border p-0">
        <CardContent className="p-0">
          {/* Media block */}
          <div className="relative w-full aspect-video bg-muted">
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

            {/* Bottom row */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2">
              <Badge
                variant="secondary"
                className="bg-black/50 text-white/90 hover:bg-black/50 text-xs px-2 py-0.5"
              >
                {duration}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-transform group-hover:scale-110"
              >
                <Play size={13} className="text-white fill-white ml-0.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Below media */}
      <div className="flex flex-col gap-1 px-0.5">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          {category.name}
        </span>

        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
          <span>{author.name}</span>
          <span>·</span>
          <span>{views.toLocaleString()} views</span>
          <Bookmark
            size={12}
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
