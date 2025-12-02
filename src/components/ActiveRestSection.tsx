import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import snowmobileImage from "@/assets/active-snowmobile.jpg";
import skatingImage from "@/assets/active-skating.jpg";
import skiingImage from "@/assets/active-skiing.jpg";
import skatingVideo from "@/assets/active-skating-video.mp4";

const ActiveRestSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activities = [
    {
      image: snowmobileImage,
      title: "Снегоходы",
      description: "Зимние приключения на скоростных снегоходах"
    },
    {
      image: skatingImage,
      video: skatingVideo,
      title: "Коньки",
      description: "Катание на коньках на открытом катке"
    },
    {
      image: skiingImage,
      title: "Лыжи",
      description: "Лыжные прогулки по живописным трассам"
    }
  ];

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    if (activities[index].video && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setHoveredIndex(null);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Активный отдых
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Почувствуйте прилив адреналина и испытайте незабываемые эмоции среди уральской природы
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden rounded-2xl border-border/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {activity.video && (
                  <video
                    ref={index === 1 ? videoRef : undefined}
                    src={activity.video}
                    muted
                    loop
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
                      hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    {activity.title}
                  </h3>
                  <p className="text-white/90 transform transition-all duration-300 group-hover:translate-y-[-4px]">
                    {activity.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActiveRestSection;
