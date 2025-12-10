import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import windowView from "@/assets/gallery-window-view.jpg";
import pierWinter from "@/assets/gallery-pier-winter.jpg";
import rabbitImage from "@/assets/gallery-rabbit.jpg";
import tubingImage from "@/assets/gallery-tubing.jpg";
import forestWalk from "@/assets/gallery-forest-walk.jpg";
import goatImage from "@/assets/gallery-goat.jpg";
import skiingImage from "@/assets/gallery-skiing.jpg";

const GalleryStatsSection = () => {
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

  const leftColumn = [
    { src: windowView, alt: "Вид из окна на зимний лес" },
    { src: tubingImage, alt: "Катание на тюбинге" },
  ];
  pierWinter;
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
        {/* Gallery Grid - 3 Columns */}
        <div className="mb-16">
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

        {/* Info Section */}
        <Card
          className={`bg-card p-10 md:p-16 mb-16 border-border/50 transition-all duration-1000 hover:shadow-xl ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-serif text-primary mb-6">Погрузитесь в атмосферу уединения</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Строгановские Просторы — это место, где вы сможете отдохнуть от городской суеты, насладиться тишиной
              хвойного леса и величием Камского моря. Наши коттеджи оборудованы всем необходимым для комфортного
              проживания, а территория базы предлагает множество активностей на любой вкус.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Мы создали пространство, где современный комфорт гармонично сочетается с природной красотой Пермского
              края. Каждый элемент продуман для вашего максимального удобства и релаксации.
            </p>
          </div>
        </Card>

        {/* Stats Grid */}
        <div>
          <h3
            className={`text-3xl md:text-4xl font-serif text-primary mb-10 text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: isVisible ? "800ms" : "0ms" }}
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
                  transitionDelay: isVisible ? `${1000 + index * 100}ms` : "0ms",
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
      </div>
    </section>
  );
};

export default GalleryStatsSection;
