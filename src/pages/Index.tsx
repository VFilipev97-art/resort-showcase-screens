import HeroSection from "@/components/HeroSection";
import GalleryStatsSection from "@/components/GalleryStatsSection";
import PeacefulRestSection from "@/components/PeacefulRestSection";
import ActiveRestSection from "@/components/ActiveRestSection";
import BasePlanSection from "@/components/BasePlanSection";
import AccommodationSection from "@/components/AccommodationSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <GalleryStatsSection />
      <PeacefulRestSection />
      <ActiveRestSection />
      <BasePlanSection />
      <AccommodationSection />
    </div>
  );
};

export default Index;
