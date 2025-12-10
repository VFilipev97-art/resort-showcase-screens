import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

const StatsSection = () => {
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

  const stats = [
    { number: "20", label: "гектаров природы", description: "Пространство для качественного отдыха и чистая природа" },
    { number: "200", label: "человек вместимость", description: "Номерной фонд для больших компаний" },
    { number: "500", label: "м² для мероприятий", description: "Свадьбы, юбилеи, корпоративы, B2B мероприятия" },
    { number: "5", label: "звёзд на Яндексе", description: "Средняя оценка наших гостей" },
    { number: "365", label: "дней развлечений", description: "Активности на каждое время года" },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-8">
        <h3
          className={`text-3xl md:text-4xl font-serif text-primary mb-10 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Цифры и факты
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`p-6 text-center bg-stats-card border-none transform transition-all duration-700 hover:scale-105 hover:shadow-xl group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${200 + index * 100}ms` : "0ms",
              }}
            >
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-stats-card-foreground">{stat.number}</div>
                <div className="text-sm md:text-base text-stats-card-foreground/90 font-semibold">{stat.label}</div>
                <div className="text-xs text-stats-card-foreground/70 leading-relaxed">{stat.description}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
