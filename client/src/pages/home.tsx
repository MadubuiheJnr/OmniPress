import { FeedSortSelect } from "@/features/feed";
import FeedCategoryTabs from "@/features/feed/components/feed-category-tabs";
import FeedHero from "@/features/feed/components/feed-hero";
import FeedTrending from "@/features/feed/components/feed-trending";
import FeedWatchNow from "@/features/feed/components/feed-watch-now";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { setHeaderActions } = useOutletContext<{
    setHeaderActions: (node: React.ReactNode) => void;
  }>();

  useEffect(() => {
    setHeaderActions(<FeedSortSelect />);
    return () => setHeaderActions(null); // cleanup on unmount
  }, []);
  return (
    <div className="p-2 min-w-0 overflow-x-hidden">
      <FeedCategoryTabs />
      <FeedHero />
      <FeedTrending />
      <FeedWatchNow />
    </div>
  );
};

export default Home;
