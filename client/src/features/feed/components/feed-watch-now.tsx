import { VideoCard } from "@/shared/components/video-card";
import { mockWatchNow } from "../data/mock-watch-now";

const FeedWatchNow = () => {
  return (
    <section className="w-full mt-8 scrollbar-none">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-foreground">Watch now</h2>
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          See all
        </button>
      </div>

      {/* Horizontal scroll row */}
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex gap-3 w-max">
          {mockWatchNow.map((video) => (
            <VideoCard key={video._id} video={video} className="w-[260px]" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedWatchNow;
