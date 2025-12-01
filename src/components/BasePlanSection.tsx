import { Card } from "@/components/ui/card";
import basePlanImage from "@/assets/base-plan.jpg";

const BasePlanSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            План базы отдыха
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ознакомьтесь с расположением всех объектов и инфраструктуры на территории "Строгановских Просторов"
          </p>
        </div>

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

        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            На территории базы расположены домики для проживания, развлекательные и спортивные объекты, 
            зоны отдыха у воды, бани и многое другое для вашего комфортного отдыха
          </p>
        </div>
      </div>
    </section>
  );
};

export default BasePlanSection;
