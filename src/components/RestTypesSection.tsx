import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trees, Wind, Waves, Mountain, Bike, Footprints } from "lucide-react";

const RestTypesSection = () => {
  const [activeTab, setActiveTab] = useState("peaceful");

  const peacefulActivities = [
    {
      icon: Trees,
      title: "Хвойный лес",
      description: "Прогулки по живописным тропам среди сосен и елей"
    },
    {
      icon: Wind,
      title: "Тишина и уединение",
      description: "Отключитесь от городской суеты в атмосфере покоя"
    },
    {
      icon: Waves,
      title: "Традиционная баня",
      description: "Насладитесь русской баней с видом на Камское море"
    }
  ];

  const activeActivities = [
    {
      icon: Bike,
      title: "Квадроциклы",
      description: "Покорите лесные тропы на мощных квадроциклах"
    },
    {
      icon: Mountain,
      title: "Снегоходы",
      description: "Зимние приключения на скоростных снегоходах"
    },
    {
      icon: Footprints,
      title: "Активные маршруты",
      description: "Пешие походы и экстремальные развлечения"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Отдых для души
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            На базе "Строгановские Просторы" каждый найдет свой идеальный отдых
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full max-w-4xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2 mb-12 h-14 bg-card/50 backdrop-blur">
            <TabsTrigger 
              value="peaceful" 
              className="text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Спокойный отдых
            </TabsTrigger>
            <TabsTrigger 
              value="active" 
              className="text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Активный отдых
            </TabsTrigger>
          </TabsList>

          <TabsContent 
            value="peaceful" 
            className="animate-fade-in"
          >
            <Card className="p-8 md:p-12 bg-card/80 backdrop-blur border-border/50">
              <div className="grid md:grid-cols-3 gap-8">
                {peacefulActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={index}
                      className="text-center space-y-4 transform transition-all duration-500 hover:scale-105"
                      style={{ 
                        animationDelay: `${index * 150}ms`,
                        opacity: 0,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-300 hover:bg-primary/20">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {activity.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-12 text-center">
                <p className="text-lg text-muted-foreground italic">
                  "Здесь время течет медленнее, даря вам возможность восстановить силы и обрести гармонию с природой"
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent 
            value="active" 
            className="animate-fade-in"
          >
            <Card className="p-8 md:p-12 bg-card/80 backdrop-blur border-border/50">
              <div className="grid md:grid-cols-3 gap-8">
                {activeActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={index}
                      className="text-center space-y-4 transform transition-all duration-500 hover:scale-105"
                      style={{ 
                        animationDelay: `${index * 150}ms`,
                        opacity: 0,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-300 hover:bg-primary/20">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {activity.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-12 text-center">
                <p className="text-lg text-muted-foreground italic">
                  "Почувствуйте прилив адреналина и испытайте незабываемые эмоции среди уральской природы"
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default RestTypesSection;
