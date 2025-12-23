import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, ArrowLeft, Users, Calendar, MapPin, Utensils, Music, Sparkles, Send, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

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
    accommodation: { name: "Проживание гостей (за дом)", price: 6000 },
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

const EventCalculator = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Form state
  const [guestCount, setGuestCount] = useState(50);
  const [eventDate, setEventDate] = useState("");
  const [catering, setCatering] = useState<string>("premium");
  const [entertainment, setEntertainment] = useState<string[]>([]);
  const [additional, setAdditional] = useState<string[]>([]);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

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
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Дата мероприятия
                  </Label>
                  <Input 
                    id="date"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
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

            {/* Section 3: Catering */}
            <div className="space-y-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium">3</span>
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

            {/* Section 4: Additional Services */}
            <div className="space-y-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium">4</span>
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

            {/* Section 5: Total and Contact */}
            <div className="space-y-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium">5</span>
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
