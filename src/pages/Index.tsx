import HeroSection from "@/components/HeroSection";
import GalleryStatsSection from "@/components/GalleryStatsSection";
import PeacefulRestSection from "@/components/PeacefulRestSection";
import ActiveRestSection from "@/components/ActiveRestSection";
import BasePlanSection from "@/components/BasePlanSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <GalleryStatsSection />
      <PeacefulRestSection />
      <ActiveRestSection />
      <BasePlanSection />
    </div>
  );
};

export default Index;
