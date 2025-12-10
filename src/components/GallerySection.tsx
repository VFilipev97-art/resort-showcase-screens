import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import windowView from "@/assets/gallery-window-view.jpg";
import pierWinter from "@/assets/gallery-pier-winter.jpg";
import rabbitImage from "@/assets/gallery-rabbit.jpg";
import tubingImage from "@/assets/gallery-tubing.jpg";
import forestWalk from "@/assets/gallery-forest-walk.jpg";
import goatImage from "@/assets/gallery-goat.jpg";
import skiingImage from "@/assets/gallery-skiing.jpg";

const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const leftColumn = [
    { src: windowView, alt: "Вид из окна на зимний лес" },
    { src: tubingImage, alt: "Катание на тюбинге" },
  ];

  const centerColumn = [
    { src: rabbitImage, alt: "Контактный зоопарк - кролики", position: "center" },
    { src: pierWinter, alt: "Зимний причал", position: "center" },
    { src: forestWalk, alt: "Прогулка по зимнему лесу", position: "bottom" },
  ];

  const rightColumn = [
    { src: goatImage, alt: "Контактный зоопарк - козлик" },
    { src: skiingImage, alt: "Лыжные прогулки" },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Left Column - 2 photos */}
          <div className="flex flex-col gap-3">
            {leftColumn.map((image, index) => (
              <Card
                key={`left-${index}`}
                className={`overflow-hidden group cursor-pointer transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl border-border/50 rounded-sm ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                }}
              >
                <div className="relative h-[450px] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Card>
            ))}
          </div>

          {/* Center Column - 3 photos */}
          <div className="flex flex-col gap-3">
            {centerColumn.map((image, index) => (
              <Card
                key={`center-${index}`}
                className={`overflow-hidden group cursor-pointer transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl border-border/50 rounded-sm ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${(index + 2) * 150}ms` : "0ms",
                }}
              >
                <div className="relative h-[296px] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: image.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Card>
            ))}
          </div>

          {/* Right Column - 2 photos */}
          <div className="flex flex-col gap-3">
            {rightColumn.map((image, index) => (
              <Card
                key={`right-${index}`}
                className={`overflow-hidden group cursor-pointer transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl border-border/50 rounded-sm ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${(index + 5) * 150}ms` : "0ms",
                }}
              >
                <div className="relative h-[450px] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
