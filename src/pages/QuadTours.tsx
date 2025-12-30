import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, ArrowLeft, Clock, MapPin, Users, ChevronDown, X, Check } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

// Tour data
const tours = [
  {
    id: "discovery",
    title: "Знакомство",
    subtitle: "Идеально для новичков",
    duration: "2 часа",
    distance: "15 км",
    groupSize: "1-6 человек",
    price: "3 500",
    priceUnit: "₽ / чел",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    highlights: ["Обучение вождению", "Живописные тропы", "Фото-остановки"],
    description: "Познакомьтесь с миром квадротуров в безопасной и комфортной обстановке. Идеальный вариант для тех, кто впервые садится за руль квадроцикла.",
    fullDescription: "Этот тур создан специально для тех, кто хочет попробовать себя в управлении квадроциклом. Наши опытные инструкторы проведут подробный инструктаж, научат основам управления и сопроводят вас по живописным тропам через хвойный лес.",
    includes: [
      "Инструктаж и обучение (30 мин)",
      "Квадроцикл и защитная экипировка",
      "Сопровождение инструктора",
      "Горячий чай на привале",
      "Фото на маршруте"
    ],
    route: [
      "Старт от базы",
      "Лесная тропа «Еловая»",
      "Смотровая площадка",
      "Возвращение на базу"
    ]
  },
  {
    id: "adventure",
    title: "Приключение",
    subtitle: "Самый популярный",
    duration: "4 часа",
    distance: "35 км",
    groupSize: "1-4 человека",
    price: "6 500",
    priceUnit: "₽ / чел",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
    highlights: ["Разнообразный рельеф", "Привал с обедом", "Панорамные виды"],
    popular: true,
    description: "Полноценное приключение с разнообразными маршрутами, включая лесные тропы, холмы и берег Камского моря.",
    fullDescription: "Это настоящее приключение для тех, кто хочет получить максимум впечатлений. Маршрут проходит через различные типы местности: густой лес, холмистую местность и живописный берег Камского моря. На привале вас ждёт вкусный обед на свежем воздухе.",
    includes: [
      "Инструктаж и обучение",
      "Квадроцикл и полная экипировка",
      "Сопровождение инструктора",
      "Обед на привале",
      "Горячие напитки",
      "Фото и видео с дрона",
      "Сертификат участника"
    ],
    route: [
      "Старт от базы",
      "Лесной массив «Сосновый бор»",
      "Переправа через ручей",
      "Холмы «Три сестры»",
      "Привал с обедом",
      "Берег Камского моря",
      "Смотровая «Орлиное гнездо»",
      "Возвращение на базу"
    ]
  },
  {
    id: "extreme",
    title: "Экстрим",
    subtitle: "Для опытных",
    duration: "6 часов",
    distance: "60 км",
    groupSize: "1-4 человека",
    price: "9 500",
    priceUnit: "₽ / чел",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop",
    highlights: ["Сложные участки", "Ночёвка у костра", "Экстремальные спуски"],
    description: "Тур для тех, кто ищет адреналин. Сложные маршруты, крутые подъёмы и спуски, грязевые участки.",
    fullDescription: "Экстремальный тур для опытных райдеров, готовых к настоящим испытаниям. Маршрут включает сложные участки с крутыми подъёмами, спусками, грязевыми ваннами и водными преградами. Это незабываемый опыт для тех, кто хочет проверить свои навыки.",
    includes: [
      "Расширенный инструктаж",
      "Мощный квадроцикл (700cc)",
      "Профессиональная экипировка",
      "Сопровождение двух инструкторов",
      "Полноценный обед",
      "Перекус и напитки",
      "Фото и видео съёмка",
      "Сертификат экстремала",
      "Памятные сувениры"
    ],
    route: [
      "Старт от базы",
      "Разминочный участок",
      "«Чёртов овраг» — крутые спуски",
      "Грязевая трасса «Болотный дракон»",
      "Привал с обедом",
      "Горный участок «Каменные ворота»",
      "Водная переправа",
      "Экстремальный спуск «Адреналин»",
      "Финишный участок",
      "Возвращение на базу"
    ]
  }
];

const QuadTours = () => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [isDetailAnimating, setIsDetailAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTourSelect = (tourId: string) => {
    if (selectedTour === tourId) {
      setIsDetailAnimating(false);
      setTimeout(() => setSelectedTour(null), 300);
    } else {
      setSelectedTour(tourId);
      setIsDetailAnimating(true);
      // Scroll to detail section
      setTimeout(() => {
        document.getElementById("tour-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const selectedTourData = tours.find(t => t.id === selectedTour);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop"
            alt="Квадротур в лесу"
            className="w-full h-full object-cover transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-20 p-6 md:p-8">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link to="/">
                <img 
                  src={logo} 
                  alt="Строгановские Просторы" 
                  className="h-12 md:h-16 hover:scale-105 transition-transform duration-300" 
                />
              </Link>
              <Link to="/" className="text-primary-foreground hover:text-primary-foreground/80 transition-all duration-300 hover:translate-y-[-2px] flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                на главную
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+79991234567" className="text-primary-foreground hover:text-primary-foreground/80 transition-all duration-300 hover:scale-110">
                <Phone className="w-5 h-5" />
              </a>
              <Button variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                записаться
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-primary-foreground font-light mb-6 animate-fade-in">
            Квадротуры
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 font-light max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Откройте для себя природу Пермского края с нового ракурса — за рулём мощного квадроцикла
          </p>
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <ChevronDown className="w-10 h-10 text-primary-foreground/60 mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* Tours Cards Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-foreground font-light mb-4">
              Выберите свой тур
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Три уникальных маршрута для любого уровня подготовки
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tours.map((tour, index) => (
              <div
                key={tour.id}
                className={cn(
                  "group relative bg-card rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500",
                  "hover:shadow-2xl hover:-translate-y-2",
                  selectedTour === tour.id && "ring-2 ring-primary shadow-2xl -translate-y-2"
                )}
                onClick={() => handleTourSelect(tour.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Popular Badge */}
                {tour.popular && (
                  <div className="absolute top-4 right-4 z-10 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Хит продаж
                  </div>
                )}

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl text-foreground font-medium mb-1">{tour.title}</h3>
                      <p className="text-sm text-muted-foreground">{tour.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl text-primary font-medium">{tour.price}</p>
                      <p className="text-xs text-muted-foreground">{tour.priceUnit}</p>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {tour.distance}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {tour.groupSize}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tour.highlights.map((highlight, i) => (
                      <span key={i} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {tour.description}
                  </p>

                  {/* CTA */}
                  <Button 
                    className={cn(
                      "w-full transition-all duration-300",
                      selectedTour === tour.id 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    )}
                    variant={selectedTour === tour.id ? "default" : "outline"}
                  >
                    {selectedTour === tour.id ? "Выбрано" : "Подробнее"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Section */}
      {selectedTourData && (
        <section 
          id="tour-detail"
          className={cn(
            "bg-primary text-primary-foreground py-24 transition-all duration-500",
            isDetailAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="container mx-auto px-6">
            {/* Close button */}
            <button
              onClick={() => handleTourSelect(selectedTourData.id)}
              className="absolute right-8 top-8 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Left - Info */}
              <div>
                <div className="mb-8">
                  <p className="text-primary-foreground/60 text-sm uppercase tracking-wider mb-2">
                    {selectedTourData.subtitle}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-light mb-4">
                    Тур «{selectedTourData.title}»
                  </h2>
                  <p className="text-lg text-primary-foreground/80 leading-relaxed">
                    {selectedTourData.fullDescription}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-primary-foreground/60" />
                    <p className="text-2xl font-medium">{selectedTourData.duration}</p>
                    <p className="text-xs text-primary-foreground/60">Длительность</p>
                  </div>
                  <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <MapPin className="w-6 h-6 mx-auto mb-2 text-primary-foreground/60" />
                    <p className="text-2xl font-medium">{selectedTourData.distance}</p>
                    <p className="text-xs text-primary-foreground/60">Маршрут</p>
                  </div>
                  <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 text-primary-foreground/60" />
                    <p className="text-2xl font-medium">{selectedTourData.groupSize}</p>
                    <p className="text-xs text-primary-foreground/60">Группа</p>
                  </div>
                </div>

                {/* What's included */}
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4">Что включено</h3>
                  <ul className="space-y-2">
                    {selectedTourData.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-primary-foreground/80">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & CTA */}
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-sm text-primary-foreground/60 mb-1">Стоимость</p>
                      <p className="text-4xl font-medium">{selectedTourData.price} ₽</p>
                      <p className="text-sm text-primary-foreground/60">за человека</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button className="flex-1 bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg py-6">
                      Записаться
                    </Button>
                    <Button variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                      <Phone className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right - Route & Image */}
              <div>
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden mb-8 h-72">
                  <img
                    src={selectedTourData.image}
                    alt={selectedTourData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                </div>

                {/* Route */}
                <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-xl font-medium mb-6">Маршрут</h3>
                  <div className="relative">
                    {/* Route line */}
                    <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-primary-foreground/20" />
                    
                    <ul className="space-y-4">
                      {selectedTourData.route.map((point, i) => (
                        <li key={i} className="flex items-start gap-4 relative">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10",
                            i === 0 ? "bg-secondary" : 
                            i === selectedTourData.route.length - 1 ? "bg-secondary" : 
                            "bg-primary-foreground/20"
                          )}>
                            <span className="text-xs font-medium">
                              {i === 0 ? "→" : i === selectedTourData.route.length - 1 ? "✓" : i}
                            </span>
                          </div>
                          <span className="text-primary-foreground/80 pt-0.5">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl text-foreground font-light mb-4">
            Остались вопросы?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Свяжитесь с нами, и мы поможем выбрать идеальный тур для вас и вашей компании
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Получить консультацию
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Phone className="w-5 h-5 mr-2" />
              +7 (999) 123-45-67
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-6 text-center">
          <Link to="/">
            <img src={logo} alt="Строгановские Просторы" className="h-12 mx-auto mb-4" />
          </Link>
          <p className="text-primary-foreground/60">
            © 2024 Строгановские Просторы. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default QuadTours;
