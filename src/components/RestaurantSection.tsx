import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Coffee, Sun, Moon } from "lucide-react";

// Placeholder images for restaurant - replace with real images
const restaurantImages = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || images.length <= 1) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const sectionWidth = rect.width / images.length;
    const newIndex = Math.min(Math.floor(x / sectionWidth), images.length - 1);
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(0);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Интерьер ресторана ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      
      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-4 bg-white' 
                  : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const mealTypes = [
  {
    icon: Coffee,
    title: "Завтрак",
    description: "Плотный завтрак с 8:00",
  },
  {
    icon: Sun,
    title: "Обед",
    description: "Домашние обеды с 12:00",
  },
  {
    icon: Moon,
    title: "Ужин",
    description: "Атмосферные ужины с 18:00",
  },
];

const benefits = [
  "Завтрак, обед и ужин на территории базы",
  "Комбо-предложения для гостей",
  "Меню à la carte с основными блюдами, закусками и десертами",
  "Подходит для гостей с детьми и компаний",
];

const RestaurantSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeMeal, setActiveMeal] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-background"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-lato text-3xl md:text-4xl font-light text-primary mb-4">
            Ресторан на территории базы
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Гости могут питаться на базе без выезда в город — завтрак, обед и ужин. 
            Доступны готовые комбо-наборы и выбор блюд из основного меню.
          </p>
        </div>

        {/* Main Content */}
        <div
          className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Photo Section with Carousel */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="aspect-[4/3]">
              <ImageCarousel images={restaurantImages} />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            {/* Description */}
            <div>
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                На базе работает ресторан: полноценные завтраки, обеды и ужины для гостей. 
                Доступны готовые комбо-наборы и блюда из основного меню.
              </p>
              
              {/* Benefits List */}
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                    <span className="text-foreground/70">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Meal Type Icons */}
            <div className="flex flex-wrap gap-3">
              {mealTypes.map((meal, index) => {
                const Icon = meal.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveMeal(activeMeal === index ? null : index)}
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 ${
                      activeMeal === index
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-left">
                      <p className="font-medium text-sm">{meal.title}</p>
                      <p className={`text-xs ${activeMeal === index ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {meal.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="rounded-xl px-8"
              >
                Посмотреть меню
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-xl px-8 border-primary/30 hover:bg-primary/5"
              >
                Комбо-предложения
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;
