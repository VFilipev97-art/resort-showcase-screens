import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const EventsSection = () => {
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

  const events = [
    {
      id: 1,
      title: "Свадьбы",
      description: "Загородная церемония, банкетный зал, фотозоны и размещение гостей на базе отдыха.",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Юбилеи",
      description: "Уютный банкетный зал, украшение под ваш сценарий и программы с ведущими.",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Корпоративы",
      description: "Тимбилдинг на природе, конференц-зона, банкет и активный отдых круглый год.",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      title: "Выпускные вечера",
      description: "Безопасная закрытая территория, зал для выпускного вечера и программы для школьников и студентов.",
      image: "/placeholder.svg",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h3
            className={`text-3xl md:text-4xl font-serif text-primary mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Праздники под ключ на природе
          </h3>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Проведите свадьбу, юбилей, корпоратив или выпускной с проживанием и питанием на нашей базе отдыха
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`group relative h-80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
              }}
            >
              {/* Background Image */}
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Title - moves up on hover */}
                <h4 className="text-xl md:text-2xl font-semibold text-white transition-all duration-500 ease-out group-hover:-translate-y-24">
                  {event.title}
                </h4>
                
                {/* Description & Button - appears on hover */}
                <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                  <p className="text-sm text-white/90 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white text-white bg-transparent hover:bg-white hover:text-primary transition-colors"
                  >
                    Узнать условия
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
