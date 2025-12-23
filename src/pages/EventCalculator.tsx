import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Phone, ArrowLeft, Users, Calendar as CalendarIcon, MapPin, Utensils, Music, Sparkles, Send, RotateCcw, Home, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { format, differenceInDays } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import cottageImage from "@/assets/cottage-exterior.jpg";
import cottageInterior from "@/assets/cottage-interior.jpg";
import modularImage from "@/assets/modular-house.jpg";
import banyaImage from "@/assets/banya-exterior.jpg";

// Event types data
const eventTypes = [
  {
    id: "wedding",
    title: "Свадьба",
    description: "Романтическая церемония и банкет в живописном месте на берегу Камского моря",
    image: "/placeholder.svg",
  },
  {
    id: "anniversary",
    title: "Юбилей",
    description: "Уютный банкетный зал, украшение под ваш сценарий и программы с ведущими",
    image: "/placeholder.svg",
  },
  {
    id: "corporate",
    title: "Корпоратив",
    description: "Тимбилдинг на природе, конференц-зона, банкет и активный отдых круглый год",
    image: "/placeholder.svg",
  },
  {
    id: "graduation",
    title: "Выпускной",
    description: "Безопасная закрытая территория и программы для школьников и студентов",
    image: "/placeholder.svg",
  },
];

// Accommodation data
interface AccommodationItem {
  id: string;
  name: string;
  description: string;
  capacityNum: number;
  area: number;
  pricePerNight: number;
  images: string[];
}

const cottages: AccommodationItem[] = [
  {
    id: "cottage-1",
    name: "Дом Кузнеца",
    description: "2 смежные и 2 изолированные спальни, просторная кухня-гостиная",
    capacityNum: 11,
    area: 120,
    pricePerNight: 10000,
    images: [cottageImage, cottageInterior, banyaImage]
  },
  {
    id: "cottage-2",
    name: "Дом Лесника",
    description: "3 изолированные спальни, большая терраса с видом на лес",
    capacityNum: 8,
    area: 95,
    pricePerNight: 8500,
    images: [cottageImage, cottageInterior, banyaImage]
  },
  {
    id: "cottage-3",
    name: "Дом Охотника",
    description: "2 спальни, уютная гостиная с камином, мангальная зона",
    capacityNum: 6,
    area: 75,
    pricePerNight: 6500,
    images: [cottageImage, cottageInterior, banyaImage]
  }
];

const modularHouses: AccommodationItem[] = [
  {
    id: "modular-1",
    name: "Модуль Панорама",
    description: "Панорамные окна с видом на реку, современный интерьер",
    capacityNum: 2,
    area: 25,
    pricePerNight: 4500,
    images: [modularImage, cottageInterior, banyaImage]
  },
  {
    id: "modular-2",
    name: "Модуль Комфорт",
    description: "Увеличенная площадь, дополнительная спальная зона",
    capacityNum: 4,
    area: 35,
    pricePerNight: 5500,
    images: [modularImage, cottageInterior, banyaImage]
  },
  {
    id: "modular-3",
    name: "Модуль Премиум",
    description: "Максимальный комфорт, джакузи, камин",
    capacityNum: 4,
    area: 40,
    pricePerNight: 7500,
    images: [modularImage, cottageInterior, banyaImage]
  }
];

// Pricing data
const pricing = {
  venueBase: 25000,
  guestPrice: 3500,
  cateringOptions: {
    basic: { name: "Базовое меню", price: 2500 },
    premium: { name: "Премиум меню", price: 4500 },
    luxury: { name: "Люкс меню", price: 7000 },
  },
  entertainment: {
    dj: { name: "DJ и звук", price: 15000 },
    band: { name: "Живая музыка", price: 35000 },
    host: { name: "Ведущий", price: 20000 },
    photo: { name: "Фотограф", price: 25000 },
    video: { name: "Видеограф", price: 30000 },
  },
  additional: {
    decoration: { name: "Декор и оформление", price: 15000 },
    flowers: { name: "Цветочные композиции", price: 12000 },
    fireworks: { name: "Салют и пиротехника", price: 25000 },
    transfer: { name: "Трансфер гостей", price: 8000 },
  },
};

// 3D Flip Card Component
const FlipCard = ({ 
  event, 
  isFlipped, 
  onHover, 
  onLeave, 
  onClick,
  isMobile 
}: { 
  event: typeof eventTypes[0];
  isFlipped: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  isMobile: boolean;
}) => {
  const handleClick = () => {
    if (isMobile) {
      // Toggle flip on mobile
      if (isFlipped) {
        onClick();
      } else {
        onHover();
      }
    } else {
      onClick();
    }
  };

  return (
    <div 
      className="group h-80 md:h-96 perspective-1000 cursor-pointer"
      onMouseEnter={!isMobile ? onHover : undefined}
      onMouseLeave={!isMobile ? onLeave : undefined}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      tabIndex={0}
      role="button"
      aria-label={`Выбрать ${event.title}`}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-lg">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <h3 className="text-2xl md:text-3xl font-light text-primary-foreground">
              {event.title}
            </h3>
          </div>
          {isMobile && (
            <div className="absolute top-4 right-4">
              <RotateCcw className="w-5 h-5 text-primary-foreground/70" />
            </div>
          )}
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-primary shadow-lg">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-2xl md:text-3xl font-light text-primary-foreground mb-4">
              {event.title}
            </h3>
            <p className="text-primary-foreground/80 text-sm md:text-base leading-relaxed mb-6">
              {event.description}
            </p>
            <Button 
              variant="outline" 
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              Рассчитать стоимость
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Photo Slider Modal Component
const PhotoSliderModal = ({ 
  images, 
  isOpen, 
  onClose, 
  houseName 
}: { 
  images: string[]; 
  isOpen: boolean; 
  onClose: () => void; 
  houseName: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (!isOpen) setCurrentIndex(0);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background">
        <div className="relative">
          <img 
            src={images[currentIndex]} 
            alt={`${houseName} - фото ${currentIndex + 1}`}
            className="w-full h-[60vh] object-cover"
          />
          
          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex ? "bg-primary w-6" : "bg-primary/40"
                )}
              />
            ))}
          </div>
        </div>
        
        <div className="p-4 text-center">
          <h3 className="font-medium text-foreground">{houseName}</h3>
          <p className="text-sm text-muted-foreground">Фото {currentIndex + 1} из {images.length}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Compact House Card Component
const HouseCard = ({ 
  house, 
  isSelected, 
  onToggle,
  onPhotoClick 
}: { 
  house: AccommodationItem; 
  isSelected: boolean; 
  onToggle: () => void;
  onPhotoClick: () => void;
}) => {
  return (
    <div 
      className={cn(
        "flex gap-4 p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer",
        isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
      )}
      onClick={onToggle}
    >
      {/* Photo thumbnail */}
      <div 
        className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-zoom-in"
        onClick={(e) => {
          e.stopPropagation();
          onPhotoClick();
        }}
      >
        <img 
          src={house.images[0]} 
          alt={house.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {house.images.length > 1 && (
          <div className="absolute bottom-1 right-1 bg-background/80 rounded px-1.5 py-0.5 text-xs">
            +{house.images.length - 1}
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-foreground truncate">{house.name}</h4>
          <Checkbox 
            checked={isSelected}
            onCheckedChange={onToggle}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        
        {/* Capacity - main focus */}
        <div className="flex items-center gap-1.5 mt-1 text-primary font-medium">
          <Users className="w-4 h-4" />
          <span>до {house.capacityNum} чел</span>
        </div>
        
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{house.description}</p>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium text-foreground">{house.pricePerNight.toLocaleString()} ₽/сутки</span>
          <span className="text-xs text-muted-foreground">{house.area} м²</span>
        </div>
      </div>
    </div>
  );
};

const EventCalculator = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Form state
  const [guestCount, setGuestCount] = useState(50);
  const [eventDate, setEventDate] = useState<Date | undefined>();
  const [catering, setCatering] = useState<string>("premium");
  const [entertainment, setEntertainment] = useState<string[]>([]);
  const [additional, setAdditional] = useState<string[]>([]);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  
  // Accommodation state
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [selectedHouses, setSelectedHouses] = useState<string[]>([]);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [activeHousePhotos, setActiveHousePhotos] = useState<{ images: string[]; name: string } | null>(null);

  const nightsCount = checkInDate && checkOutDate 
    ? Math.max(0, differenceInDays(checkOutDate, checkInDate))
    : 0;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEventSelect = (eventId: string) => {
    setSelectedEvent(eventId);
    setFlippedCard(null);
    
    // Smooth scroll to calculator
    setTimeout(() => {
      calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const toggleEntertainment = (id: string) => {
    setEntertainment(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const toggleAdditional = (id: string) => {
    setAdditional(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const toggleHouse = (id: string) => {
    setSelectedHouses(prev => 
      prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]
    );
  };

  const openPhotoModal = (house: AccommodationItem) => {
    setActiveHousePhotos({ images: house.images, name: house.name });
    setPhotoModalOpen(true);
  };

  // Calculate accommodation total
  const calculateAccommodationTotal = () => {
    const allHouses = [...cottages, ...modularHouses];
    return selectedHouses.reduce((sum, houseId) => {
      const house = allHouses.find(h => h.id === houseId);
      return sum + (house ? house.pricePerNight * nightsCount : 0);
    }, 0);
  };

  // Calculate total
  const calculateTotal = () => {
    let total = pricing.venueBase;
    total += guestCount * pricing.guestPrice;
    
    if (catering && pricing.cateringOptions[catering as keyof typeof pricing.cateringOptions]) {
      total += guestCount * pricing.cateringOptions[catering as keyof typeof pricing.cateringOptions].price;
    }
    
    entertainment.forEach(id => {
      if (pricing.entertainment[id as keyof typeof pricing.entertainment]) {
        total += pricing.entertainment[id as keyof typeof pricing.entertainment].price;
      }
    });
    
    additional.forEach(id => {
      if (pricing.additional[id as keyof typeof pricing.additional]) {
        total += pricing.additional[id as keyof typeof pricing.additional].price;
      }
    });

    // Add accommodation
    total += calculateAccommodationTotal();
    
    return total;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/">
              <img 
                src={logo} 
                alt="Строгановские Просторы" 
                className="h-10 md:h-12 hover:scale-105 transition-transform duration-300" 
              />
            </Link>
            <Link 
              to="/" 
              className="hidden md:flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              На главную
            </Link>
          </div>
          <a 
            href="tel:+79991234567" 
            className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="hidden md:inline">+7 (999) 123-45-67</span>
          </a>
        </div>
      </nav>

      {/* Hero Section with Cards */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-3xl md:text-5xl font-light text-foreground mb-4">
              Проведите незабываемое мероприятие на природе
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Свадьбы, юбилеи, корпоративы и выпускные на базе отдыха с проживанием и питанием
            </p>
          </div>

          {/* Event Cards Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {eventTypes.map((event) => (
              <FlipCard
                key={event.id}
                event={event}
                isFlipped={flippedCard === event.id}
                onHover={() => setFlippedCard(event.id)}
                onLeave={() => setFlippedCard(null)}
                onClick={() => handleEventSelect(event.id)}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section ref={calculatorRef} className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className={`text-center mb-12 transition-all duration-700 ${selectedEvent ? 'opacity-100 translate-y-0' : 'opacity-50'}`}>
            <h2 className="text-2xl md:text-4xl font-light text-foreground mb-4">
              Рассчитайте стоимость вашего мероприятия
            </h2>
            <p className="text-muted-foreground">
              Выберите опции и получите предварительный расчёт
            </p>
          </div>

          <div className="bg-card rounded-3xl shadow-lg p-6 md:p-10 space-y-8">
            {/* Section 1: Basic Parameters */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium">1</span>
                </div>
                <h3 className="text-xl font-light">Основные параметры</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="eventType" className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Тип мероприятия
                  </Label>
                  <Select value={selectedEvent || ""} onValueChange={setSelectedEvent}>
                    <SelectTrigger id="eventType">
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map(event => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests" className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Количество гостей
                  </Label>
                  <Input 
                    id="guests"
                    type="number" 
                    min={10} 
                    max={200}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    Дата мероприятия
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !eventDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {eventDate ? format(eventDate, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-background z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={eventDate}
                        onSelect={setEventDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Section 2: Venue */}
            <div className="space-y-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium">2</span>
                </div>
                <h3 className="text-xl font-light">Локация</h3>
              </div>

              <div className="bg-muted/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground mb-2">База отдыха «Строгановские Просторы»</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Живописная территория на берегу Камского моря, банкетный зал до 100 человек, 
                      открытая площадка для церемоний, комфортное размещение гостей.
                    </p>
                    <p className="text-primary font-medium">
                      Аренда площадки: {formatPrice(pricing.venueBase)} ₽
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Accommodation */}
            <div className="space-y-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium">3</span>
                </div>
                <h3 className="text-xl font-light">Размещение гостей</h3>
              </div>

              {/* Date Pickers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    Дата заезда
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkInDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkInDate ? format(checkInDate, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-background z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={checkInDate}
                        onSelect={setCheckInDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    Дата выезда
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkOutDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOutDate ? format(checkOutDate, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-background z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        initialFocus
                        disabled={(date) => date < (checkInDate || new Date())}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Nights count */}
              {nightsCount > 0 && (
                <div className="text-center py-2 px-4 bg-primary/10 rounded-lg">
                  <span className="text-primary font-medium">
                    Количество ночей: {nightsCount}
                  </span>
                </div>
              )}

              {/* Tabs for house types */}
              <Tabs defaultValue="cottages" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cottages" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Коттеджи
                  </TabsTrigger>
                  <TabsTrigger value="modular" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Модульные
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="cottages" className="mt-4 space-y-3">
                  {cottages.map((house) => (
                    <HouseCard
                      key={house.id}
                      house={house}
                      isSelected={selectedHouses.includes(house.id)}
                      onToggle={() => toggleHouse(house.id)}
                      onPhotoClick={() => openPhotoModal(house)}
                    />
                  ))}
                </TabsContent>
                
                <TabsContent value="modular" className="mt-4 space-y-3">
                  {modularHouses.map((house) => (
                    <HouseCard
                      key={house.id}
                      house={house}
                      isSelected={selectedHouses.includes(house.id)}
                      onToggle={() => toggleHouse(house.id)}
                      onPhotoClick={() => openPhotoModal(house)}
                    />
                  ))}
                </TabsContent>
              </Tabs>

              {/* Accommodation summary */}
              {selectedHouses.length > 0 && nightsCount > 0 && (
                <div className="bg-primary/5 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Выбрано домов:</span>
                    <span className="font-medium text-foreground">{selectedHouses.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Стоимость размещения:</span>
                    <span className="font-medium text-primary">{formatPrice(calculateAccommodationTotal())} ₽</span>
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Catering */}
            <div className="space-y-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium">4</span>
                </div>
                <h3 className="text-xl font-light">Кейтеринг и развлечения</h3>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-primary" />
                  Меню
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(pricing.cateringOptions).map(([key, option]) => (
                    <div 
                      key={key}
                      onClick={() => setCatering(key)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        catering === key 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <h4 className="font-medium text-foreground">{option.name}</h4>
                      <p className="text-sm text-primary">{formatPrice(option.price)} ₽/чел</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-primary" />
                  Развлечения и персонал
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(pricing.entertainment).map(([key, option]) => (
                    <div 
                      key={key}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-all"
                    >
                      <Checkbox 
                        id={key}
                        checked={entertainment.includes(key)}
                        onCheckedChange={() => toggleEntertainment(key)}
                      />
                      <Label htmlFor={key} className="flex-1 cursor-pointer">
                        <span className="block text-foreground">{option.name}</span>
                        <span className="text-sm text-primary">{formatPrice(option.price)} ₽</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 5: Additional Services */}
            <div className="space-y-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium">5</span>
                </div>
                <h3 className="text-xl font-light">Дополнительные услуги</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(pricing.additional).map(([key, option]) => (
                  <div 
                    key={key}
                    className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-all"
                  >
                    <Checkbox 
                      id={`add-${key}`}
                      checked={additional.includes(key)}
                      onCheckedChange={() => toggleAdditional(key)}
                    />
                    <Label htmlFor={`add-${key}`} className="flex-1 cursor-pointer">
                      <span className="block text-foreground">{option.name}</span>
                      <span className="text-sm text-primary">{formatPrice(option.price)} ₽</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6: Total and Contact */}
            <div className="space-y-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium">6</span>
                </div>
                <h3 className="text-xl font-light">Итог и заявка</h3>
              </div>

              {/* Total Display */}
              <div className="bg-primary rounded-2xl p-6 md:p-8 text-center">
                <p className="text-primary-foreground/80 mb-2">Предварительная стоимость</p>
                <p className="text-4xl md:text-5xl font-light text-primary-foreground mb-4">
                  {formatPrice(calculateTotal())} ₽
                </p>
                <p className="text-sm text-primary-foreground/60">
                  Окончательная стоимость будет рассчитана менеджером с учётом всех деталей
                </p>
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Оставьте контакты, и мы свяжемся с вами для уточнения деталей
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input 
                      id="name"
                      placeholder="Иван Иванов"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full md:w-auto mx-auto flex items-center gap-2 px-8"
                >
                  <Send className="w-4 h-4" />
                  Отправить заявку
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Slider Modal */}
      {activeHousePhotos && (
        <PhotoSliderModal
          images={activeHousePhotos.images}
          houseName={activeHousePhotos.name}
          isOpen={photoModalOpen}
          onClose={() => {
            setPhotoModalOpen(false);
            setActiveHousePhotos(null);
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-primary py-8 px-6">
        <div className="container mx-auto text-center">
          <Link to="/" className="inline-block mb-4">
            <img src={logo} alt="Строгановские Просторы" className="h-10 mx-auto" />
          </Link>
          <p className="text-primary-foreground/60 text-sm">
            © 2024 База отдыха «Строгановские Просторы». Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EventCalculator;
