import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const NewsSection = () => {
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

  const news = [
    {
      id: 1,
      title: "Открытие зимнего сезона на базе отдыха",
      date: "15 декабря 2024",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Новые маршруты для снегоходов",
      date: "10 декабря 2024",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Праздничные программы на Новый год",
      date: "5 декабря 2024",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      title: "Обновление номерного фонда коттеджей",
      date: "1 декабря 2024",
      image: "/placeholder.svg",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex justify-between items-center mb-10">
          <h3
            className={`text-3xl md:text-4xl font-serif text-primary transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Новости
          </h3>
          <Button
            variant="outline"
            className={`border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Все новости
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, index) => (
            <Card
              key={item.id}
              className={`overflow-hidden border-none bg-card cursor-pointer transform transition-all duration-700 hover:scale-105 hover:shadow-xl group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${200 + index * 100}ms` : "0ms",
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground">{item.date}</p>
                <h4 className="text-base font-medium text-primary leading-tight line-clamp-2">
                  {item.title}
                </h4>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
