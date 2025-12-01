import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import cottageImage from "@/assets/cottage-exterior.jpg";
import modularImage from "@/assets/modular-house.jpg";

type AccommodationType = "cottages" | "modular" | null;

const AccommodationSection = () => {
  const [selectedType, setSelectedType] = useState<AccommodationType>(null);

  const cottages = [
    {
      name: "Коттедж Классик",
      description: "Уютный деревянный коттедж с красной крышей, террасой и мангальной зоной. Идеально подходит для семейного отдыха.",
      capacity: "До 6 человек",
      features: ["Терраса", "Мангал", "2 спальни", "Кухня"]
    },
    {
      name: "Коттедж Делюкс",
      description: "Просторный коттедж премиум-класса с панорамными окнами и современными удобствами.",
      capacity: "До 8 человек",
      features: ["Камин", "Сауна", "3 спальни", "Кухня-гостиная"]
    },
    {
      name: "Коттедж Уют",
      description: "Компактный коттедж для небольшой компании с полным набором удобств.",
      capacity: "До 4 человек",
      features: ["Веранда", "Барбекю", "1 спальня", "Кухня"]
    }
  ];

  const modularHouses = [
    {
      name: "Модульный дом Стандарт",
      description: "Современный модульный дом с панорамными окнами и стильным интерьером. Теплый и комфортный в любое время года.",
      capacity: "До 2 человек",
      features: ["Панорамные окна", "Отопление", "Душевая", "Мини-кухня"]
    },
    {
      name: "Модульный дом Комфорт",
      description: "Увеличенный модульный дом с дополнительной спальной зоной.",
      capacity: "До 4 человек",
      features: ["Терраса", "Отопление", "Душ", "Кухонная зона"]
    },
    {
      name: "Модульный дом Премиум",
      description: "Модульный дом премиум-класса с максимальным комфортом.",
      capacity: "До 4 человек",
      features: ["Джакузи", "Камин", "Кухня", "Панорамный вид"]
    }
  ];

  const handleTypeClick = (type: AccommodationType) => {
    setSelectedType(selectedType === type ? null : type);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Проживание
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите подходящий для вас вариант размещения
          </p>
        </div>

        {/* Split Screen Selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Cottages Section */}
          <Card 
            className={`relative overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl group ${
              selectedType === "cottages" ? "ring-2 ring-primary shadow-2xl" : ""
            }`}
            onClick={() => handleTypeClick("cottages")}
          >
            <div className="relative h-[400px]">
              <img
                src={cottageImage}
                alt="Коттеджи"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-3">
                  Коттеджи
                </h3>
                <p className="text-white/90 text-lg mb-4">
                  Традиционные деревянные дома с террасами и мангальными зонами
                </p>
                <div className="flex items-center text-white/80">
                  <span className="text-sm">Нажмите, чтобы узнать больше</span>
                  <ChevronDown 
                    className={`ml-2 w-5 h-5 transition-transform duration-500 ${
                      selectedType === "cottages" ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Modular Houses Section */}
          <Card 
            className={`relative overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl group ${
              selectedType === "modular" ? "ring-2 ring-primary shadow-2xl" : ""
            }`}
            onClick={() => handleTypeClick("modular")}
          >
            <div className="relative h-[400px]">
              <img
                src={modularImage}
                alt="Модульные дома"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-3">
                  Модульные дома
                </h3>
                <p className="text-white/90 text-lg mb-4">
                  Современные дома с панорамными окнами и стильным интерьером
                </p>
                <div className="flex items-center text-white/80">
                  <span className="text-sm">Нажмите, чтобы узнать больше</span>
                  <ChevronDown 
                    className={`ml-2 w-5 h-5 transition-transform duration-500 ${
                      selectedType === "modular" ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Expanded Details - Cottages */}
        <div 
          className={`overflow-hidden transition-all duration-700 ${
            selectedType === "cottages" ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {cottages.map((cottage, index) => (
              <Card 
                key={cottage.name}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48">
                  <img
                    src={cottageImage}
                    alt={cottage.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-xl font-semibold text-white">{cottage.name}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{cottage.description}</p>
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-primary">{cottage.capacity}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cottage.features.map((feature) => (
                      <span 
                        key={feature}
                        className="px-3 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Expanded Details - Modular Houses */}
        <div 
          className={`overflow-hidden transition-all duration-700 ${
            selectedType === "modular" ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {modularHouses.map((house, index) => (
              <Card 
                key={house.name}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48">
                  <img
                    src={modularImage}
                    alt={house.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-xl font-semibold text-white">{house.name}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{house.description}</p>
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-primary">{house.capacity}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {house.features.map((feature) => (
                      <span 
                        key={feature}
                        className="px-3 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;
