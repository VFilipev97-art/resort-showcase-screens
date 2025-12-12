import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Coffee, Sun, Moon } from "lucide-react";

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
          {/* Photo Section */}
          <div className="space-y-4">
            {/* Main Photo */}
            <div className="relative overflow-hidden rounded-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <UtensilsCrossed className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                  <p className="text-primary/60 text-sm">Фото интерьера ресторана</p>
                </div>
              </div>
            </div>
            
            {/* Mini Gallery */}
            <div className="grid grid-cols-3 gap-3">
              {["Утренний зал", "Обеденный зал", "Вечерняя атмосфера"].map((label, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl aspect-square bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                >
                  <p className="text-primary/50 text-xs text-center px-2">{label}</p>
                </div>
              ))}
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
