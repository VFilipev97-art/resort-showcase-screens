import HeroSection from "@/components/HeroSection";
import GalleryStatsSection from "@/components/GalleryStatsSection";
import PeacefulRestSection from "@/components/PeacefulRestSection";
import ActiveRestSection from "@/components/ActiveRestSection";
import BasePlanSection from "@/components/BasePlanSection";
import AccommodationSection from "@/components/AccommodationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <GalleryStatsSection />
      <PeacefulRestSection />
      <ActiveRestSection />
      <BasePlanSection />
      <AccommodationSection />
      <Footer />
    </div>
  );
};

export default Index;
