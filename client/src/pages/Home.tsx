import Newsletter from "../components/common/NewsLetter/Newsletter";
import ArtsSection from "../components/Home/ArtsSection";
import HealthSection from "../components/Home/HealthSection";
import Hero from "../components/Home/Hero/Hero";
import PoliticsSection from "../components/Home/PoliticsSection";
import ScienceSection from "../components/Home/ScienceSection";
import TopStories from "../components/Home/TopStories/TopStories";
import WorldSection from "../components/Home/WorldSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <HealthSection />
      <TopStories />
      <WorldSection />
      <Newsletter />
      <div className="lg:w-[90%] mx-auto lg:flex items-center gap-x-10 ">
        <ScienceSection />
        <PoliticsSection />
      </div>
      <ArtsSection />
    </div>
  );
};

export default Home;
