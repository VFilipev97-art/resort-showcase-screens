import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-cottages.jpg";
import HeroNav from "./HeroNav";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Коттеджи базы отдыха Строгановские Просторы зимой"
          className="w-full h-full object-cover transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${scrollY * 0.5}px) scale(1.1)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/70" />
      </div>

      {/* Navigation */}
      <HeroNav />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-12 md:pb-16">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-end">
            {/* Left Side - Tagline */}
            <div className="animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}>
              <p className="text-2xl md:text-3xl text-primary-foreground font-light leading-relaxed">
                уютные коттеджи и глэмпинг
                <br />
                на берегу камского моря
              </p>
            </div>

            {/* Right Side - Short Description */}
            <div 
              className="bg-primary-foreground/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-primary-foreground/20 animate-slide-in-right hover:bg-primary-foreground/15 transition-all duration-500"
              style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
            >
              <p className="text-primary-foreground text-base md:text-lg leading-relaxed">
                Уединённый отдых в хвойном лесу с европейским уровнем комфорта. Квадроциклы, традиционная баня и первозданная природа Пермского края.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
