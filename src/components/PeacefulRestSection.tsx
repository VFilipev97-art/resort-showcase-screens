import { Card } from "@/components/ui/card";
import forestWalkImage from "@/assets/peaceful-forest-walk.jpg";
import windowViewImage from "@/assets/peaceful-window-view.jpg";
import banyaImage from "@/assets/peaceful-banya.jpg";

const PeacefulRestSection = () => {
  const activities = [
    {
      image: forestWalkImage,
      title: "Прогулки по лесу",
      description: "Хвойный лес и живописные тропы"
    },
    {
      image: windowViewImage,
      title: "Тишина и уединение",
      description: "Отключитесь от городской суеты"
    },
    {
      image: banyaImage,
      title: "Традиционная баня",
      description: "Русская баня с видом на Камское море"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Спокойный отдых
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Здесь время течет медленнее, даря вам возможность восстановить силы и обрести гармонию с природой
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden rounded-2xl border-border/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
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

export default PeacefulRestSection;
