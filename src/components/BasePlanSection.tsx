import { Card } from "@/components/ui/card";
import basePlanImage from "@/assets/base-plan.jpg";

const BasePlanSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-center">
          {/* Image on left */}
          <Card className="overflow-hidden rounded-2xl border-border/50 shadow-2xl animate-fade-in bg-card/80 backdrop-blur">
            <div className="relative">
              <img
                src={basePlanImage}
                alt="План базы отдыха Строгановские Просторы"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
          </Card>

          {/* Text on right */}
          <div className="flex flex-col justify-center animate-fade-in lg:order-last" style={{ animationDelay: '200ms' }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary mb-6 leading-tight">
              План базы отдыха
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
              Откройте для себя место, где каждый уголок создан для незабываемых моментов
            </p>
            <p className="text-base text-muted-foreground/80 leading-relaxed">
              Уютные домики среди вековых сосен, живописная набережная реки Камы, 
              зоны для активного отдыха и тихие уголки для уединения — 
              всё расположено так, чтобы ваш отдых стал по-настоящему особенным
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasePlanSection;
