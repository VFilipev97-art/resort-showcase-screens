import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import PeacefulRestSection from "@/components/PeacefulRestSection";
import ActiveRestSection from "@/components/ActiveRestSection";
import BasePlanSection from "@/components/BasePlanSection";
import StatsSection from "@/components/StatsSection";
import AccommodationSection from "@/components/AccommodationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <GallerySection />
      <PeacefulRestSection />
      <ActiveRestSection />
      <AccommodationSection />
      <BasePlanSection />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;
