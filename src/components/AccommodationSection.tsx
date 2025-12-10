import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Users } from "lucide-react";
import cottageImage from "@/assets/cottage-exterior.jpg";
import cottageInterior from "@/assets/cottage-interior.jpg";
import modularImage from "@/assets/modular-house.jpg";
import banyaImage from "@/assets/banya-exterior.jpg";

type AccommodationType = "cottages" | "modular" | null;

interface AccommodationItem {
  name: string;
  description: string;
  capacity: string;
  capacityNum: number;
  area: number;
  priceFrom: number;
  images: string[];
}

// Image carousel component with cursor position switching
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || images.length <= 1) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const sectionWidth = rect.width / images.length;
    const newIndex = Math.min(Math.floor(x / sectionWidth), images.length - 1);
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(0);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Фото ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      
      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-4 bg-white' 
                  : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const AccommodationSection = () => {
  const [selectedType, setSelectedType] = useState<AccommodationType>(null);
  const [showContent, setShowContent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const cottageCardRef = useRef<HTMLDivElement>(null);
  const modularCardRef = useRef<HTMLDivElement>(null);

  const cottages: AccommodationItem[] = [
    {
      name: "Дом Кузнеца",
      description: "2 смежные и 2 изолированные спальни, просторная кухня-гостиная, санузел",
      capacity: "До 11 человек",
      capacityNum: 11,
      area: 120,
      priceFrom: 10000,
      images: [cottageImage, cottageInterior, banyaImage]
    },
    {
      name: "Дом Лесника",
      description: "3 изолированные спальни, большая терраса с видом на лес, камин",
      capacity: "До 8 человек",
      capacityNum: 8,
      area: 95,
      priceFrom: 8500,
      images: [cottageImage, cottageInterior, banyaImage]
    },
    {
      name: "Дом Охотника",
      description: "2 спальни, уютная гостиная с камином, мангальная зона",
      capacity: "До 6 человек",
      capacityNum: 6,
      area: 75,
      priceFrom: 6500,
      images: [cottageImage, cottageInterior, banyaImage]
    }
  ];

  const modularHouses: AccommodationItem[] = [
    {
      name: "Модуль Панорама",
      description: "Панорамные окна с видом на реку, современный минималистичный интерьер",
      capacity: "До 2 человек",
      capacityNum: 2,
      area: 25,
      priceFrom: 4500,
      images: [modularImage, cottageInterior, banyaImage]
    },
    {
      name: "Модуль Комфорт",
      description: "Увеличенная площадь, дополнительная спальная зона, терраса",
      capacity: "До 4 человек",
      capacityNum: 4,
      area: 35,
      priceFrom: 5500,
      images: [modularImage, cottageInterior, banyaImage]
    },
    {
      name: "Модуль Премиум",
      description: "Максимальный комфорт, джакузи, камин, панорамный вид на лес",
      capacity: "До 4 человек",
      capacityNum: 4,
      area: 40,
      priceFrom: 7500,
      images: [modularImage, cottageInterior, banyaImage]
    }
  ];

  useEffect(() => {
    if (selectedType) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setShowContent(true), 800);
    } else {
      document.body.style.overflow = 'unset';
      setShowContent(false);
    }
  }, [selectedType]);

  const handleTypeClick = (type: AccommodationType) => {
    if (selectedType) return;
    
    const cardRef = type === "cottages" ? cottageCardRef : modularCardRef;
    const rect = cardRef.current?.getBoundingClientRect();
    
    if (rect) {
      // Set CSS variables for animation start position
      document.documentElement.style.setProperty('--card-top', `${rect.top}px`);
      document.documentElement.style.setProperty('--card-left', `${rect.left}px`);
      document.documentElement.style.setProperty('--card-width', `${rect.width}px`);
      document.documentElement.style.setProperty('--card-height', `${rect.height}px`);
    }
    
    setSelectedType(type);
  };

  const handleClose = () => {
    setShowContent(false);
    setIsClosing(true);
    
    // Wait for content to fade out, then collapse card
    setTimeout(() => {
      setSelectedType(null);
      setIsClosing(false);
    }, 1000); // Total animation time
  };

  return (
    <section className="py-20 bg-background">
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
            ref={cottageCardRef}
            className={`relative overflow-hidden cursor-pointer hover:shadow-2xl group ${
              selectedType === "cottages" && !isClosing ? "!invisible !transition-none" : 
              selectedType === "cottages" && isClosing ? "opacity-0 transition-opacity duration-700" :
              selectedType ? "opacity-30 pointer-events-none transition-opacity duration-300" : 
              "hover:scale-[1.02] transition-all duration-300"
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
            ref={modularCardRef}
            className={`relative overflow-hidden cursor-pointer hover:shadow-2xl group ${
              selectedType === "modular" && !isClosing ? "!invisible !transition-none" : 
              selectedType === "modular" && isClosing ? "opacity-0 transition-opacity duration-700" :
              selectedType ? "opacity-30 pointer-events-none transition-opacity duration-300" : 
              "hover:scale-[1.02] transition-all duration-300"
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
              className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-700 ${
                showContent && !isClosing ? "opacity-100" : "opacity-0"
              }`}
              onClick={handleClose}
            />
            
            {/* Animated Expanding Card */}
            <div 
              className={`fixed z-50 bg-background rounded-2xl shadow-2xl overflow-hidden
                ${isClosing ? 'accommodation-popup-collapsing' : showContent ? 'accommodation-popup-expanded' : 'accommodation-popup-expanding'}`}
            >
              {/* Hero Image - Shows only during opening */}
              <div 
                className={`absolute inset-0 transition-opacity duration-500 ${
                  showContent || isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <img
                  src={selectedType === "cottages" ? cottageImage : modularImage}
                  alt={selectedType === "cottages" ? "Коттеджи" : "Модульные дома"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-3">
                    {selectedType === "cottages" ? "Коттеджи" : "Модульные дома"}
                  </h3>
                  <p className="text-white/90 text-lg">
                    {selectedType === "cottages" 
                      ? "Традиционные деревянные дома с террасами и мангальными зонами"
                      : "Современные дома с панорамными окнами и стильным интерьером"}
                  </p>
                </div>
              </div>

              {/* Popup Content - Visible during closing */}
              <div 
                className={`relative w-full h-full flex flex-col transition-opacity duration-300 ${
                  showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Header with Close Button */}
                <div className="flex-shrink-0 bg-background/95 backdrop-blur border-b border-border/50 p-4 flex justify-between items-center">
                  <h3 className="text-2xl md:text-3xl font-serif text-primary">
                    {selectedType === "cottages" ? "Коттеджи" : "Модульные дома"}
                  </h3>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {(selectedType === "cottages" ? cottages : modularHouses).map((item) => (
                        <Card 
                          key={item.name}
                          className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-[#f5f2ed] border-0 rounded-2xl"
                        >
                          {/* Image Carousel Section */}
                          <div className="relative h-52 m-3 rounded-xl overflow-hidden">
                            <ImageCarousel images={item.images} />
                          </div>
                          
                          {/* Info Section */}
                          <div className="px-4 pb-4">
                            {/* Title, Price, Capacity Row */}
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <h4 className="text-lg font-semibold text-foreground">{item.name}</h4>
                              <div className="flex items-center gap-3 text-sm">
                                <span className="font-medium text-foreground">₽ {item.priceFrom.toLocaleString()}</span>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Users className="w-4 h-4" />
                                  <span>до {item.capacityNum} чел</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Description and Book Button Row */}
                            <div className="flex items-end justify-between gap-4">
                              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                {item.description}
                              </p>
                              <Button 
                                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap"
                              >
                                забронировать
                              </Button>
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
