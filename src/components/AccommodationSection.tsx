import { useState } from "react";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import cottageImage from "@/assets/cottage-exterior.jpg";
import modularImage from "@/assets/modular-house.jpg";

type AccommodationType = "cottages" | "modular" | null;

const AccommodationSection = () => {
  const [selectedType, setSelectedType] = useState<AccommodationType>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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
    if (isAnimating || selectedType) return;
    
    setIsAnimating(true);
    setSelectedType(type);
    
    // Wait for animation to complete
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const handleClose = () => {
    if (isAnimating) return;
    
    setIsClosing(true);
    
    // Wait for closing animation
    setTimeout(() => {
      setSelectedType(null);
      setIsClosing(false);
    }, 600);
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
        <div className="grid md:grid-cols-2 gap-4 mb-8 relative">
          {/* Cottages Section */}
          <Card 
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl group ${
              selectedType ? "opacity-0 pointer-events-none" : "hover:scale-[1.02]"
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
                </div>
              </div>
            </div>
          </Card>

          {/* Modular Houses Section */}
          <Card 
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl group ${
              selectedType ? "opacity-0 pointer-events-none" : "hover:scale-[1.02]"
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
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Expanding Card Animation + Popup */}
        {selectedType && (
          <>
            {/* Backdrop */}
            <div 
              className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 ${
                isClosing ? "opacity-0" : "opacity-100"
              }`}
              onClick={handleClose}
            />
            
            {/* Animated Card to Popup */}
            <div 
              className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
                isClosing ? "animate-popup-close" : "animate-popup-open"
              }`}
            >
              <div 
                className="bg-background rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Hero Image Header - fades to show content */}
                <div 
                  className={`relative overflow-hidden transition-all duration-500 ${
                    isAnimating ? "h-[400px]" : "h-0"
                  }`}
                >
                  <img
                    src={selectedType === "cottages" ? cottageImage : modularImage}
                    alt={selectedType === "cottages" ? "Коттеджи" : "Модульные дома"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Close Button & Title */}
                <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border/50 p-4 flex justify-between items-center">
                  <h3 className={`text-2xl md:text-3xl font-serif text-primary transition-opacity duration-300 ${
                    isAnimating ? "opacity-0" : "opacity-100 delay-300"
                  }`}>
                    {selectedType === "cottages" ? "Коттеджи" : "Модульные дома"}
                  </h3>
                  <button
                    onClick={handleClose}
                    className={`p-2 rounded-full hover:bg-secondary/80 transition-all duration-300 ${
                      isAnimating ? "opacity-0" : "opacity-100 delay-300"
                    }`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content - appears after animation */}
                <div 
                  className={`overflow-y-auto transition-opacity duration-300 ${
                    isAnimating ? "opacity-0" : "opacity-100 delay-400"
                  }`}
                >
                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {(selectedType === "cottages" ? cottages : modularHouses).map((item, index) => (
                        <Card 
                          key={item.name}
                          className="overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                          <div className="relative h-48">
                            <img
                              src={selectedType === "cottages" ? cottageImage : modularImage}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                              <h4 className="text-xl font-semibold text-white">{item.name}</h4>
                            </div>
                          </div>
                          <div className="p-6">
                            <p className="text-muted-foreground mb-4">{item.description}</p>
                            <div className="mb-4">
                              <span className="text-sm font-semibold text-primary">{item.capacity}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {item.features.map((feature) => (
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
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AccommodationSection;
