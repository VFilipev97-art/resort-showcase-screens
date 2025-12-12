import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import PeacefulRestSection from "@/components/PeacefulRestSection";
import ActiveRestSection from "@/components/ActiveRestSection";
import BasePlanSection from "@/components/BasePlanSection";
import StatsSection from "@/components/StatsSection";
import AccommodationSection from "@/components/AccommodationSection";
import EventsSection from "@/components/EventsSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <GallerySection />
      <BasePlanSection />
      <StatsSection />
      <PeacefulRestSection />
      <ActiveRestSection />
      <AccommodationSection />
      <EventsSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Index;
