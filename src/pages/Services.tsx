import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroNav from "@/components/HeroNav";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&h=1080&fit=crop",
    title: "Зимние развлечения",
    subtitle: "Снегоходы, лыжи и катание на коньках"
  },
  {
    image: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=1920&h=1080&fit=crop",
    title: "Летний отдых",
    subtitle: "Квадроциклы, рыбалка и прогулки"
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop",
    title: "Банные процедуры",
    subtitle: "Традиционная русская баня на дровах"
  }
];

const winterServices = [
  {
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
    name: "Катание на снегоходах"
  },
  {
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&h=400&fit=crop",
    name: "Лыжные прогулки"
  },
  {
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&h=400&fit=crop",
    name: "Катание на коньках"
  },
  {
    image: "https://images.unsplash.com/photo-1482066490729-6f26115b60dc?w=600&h=400&fit=crop",
    name: "Тюбинг"
  }
];

const summerServices = [
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    name: "Квадротуры"
  },
  {
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop",
    name: "Рыбалка"
  },
  {
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
    name: "Пешие прогулки"
  },
  {
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    name: "Водные прогулки"
  }
];

const activePrices = [
  { name: "настольный теннис", price: "200" },
  { name: "прокат лыж (1 час)", price: "150" },
  { name: "прокат коньков (1 час)", price: "150" },
  { name: "входной билет", price: "250" },
  { name: "аренда квадроцикла (30 мин)", price: "1600" },
  { name: "аренда квадроцикла (1 час)", price: "3200" },
  { name: "аренда снегохода (30 мин)", price: "1600" },
  { name: "аренда снегохода (1 час)", price: "3200" },
  { name: "доплата за пассажира", price: "20%" },
  { name: "прицепные санки к снегоходу (не более 4-х человек)", price: "40%" }
];

const banyaPrices = [
  { name: "баня на дровах (2 часа/пихтовый веник/травяной чай)", price: "2400" },
  { name: "веник берёзовый", price: "150" },
  { name: "банное полотенце", price: "50" },
  { name: "халат", price: "150" },
  { name: "тапочки", price: "50" },
  { name: "чан (2 часа до 6 человек)", price: "3000" }
];

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Slider */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/60" />
          </div>
        ))}

        {/* Navigation */}
        <HeroNav />

        {/* Slide Content */}
        <div className="absolute bottom-24 left-0 right-0 z-10">
          <div className="container mx-auto px-6 md:px-8">
            <div className="max-w-2xl">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute"
                  }`}
                >
                  {index === currentSlide && (
                    <>
                      <h1 className="font-display text-5xl md:text-7xl text-primary-foreground mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl text-primary-foreground/90 font-light">
                        {slide.subtitle}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
            <div className="flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-12 h-1 transition-all duration-300 ${
                    index === currentSlide ? "bg-primary-foreground" : "bg-primary-foreground/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-12 h-12 border border-primary-foreground/50 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 border border-primary-foreground/50 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Winter Services */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-12">Зима</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {winterServices.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-primary-foreground text-lg md:text-xl font-medium">
                    {service.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summer Services */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-12">Лето</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {summerServices.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-primary-foreground text-lg md:text-xl font-medium">
                    {service.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-16">услуги</h2>
          
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* Active Rest Prices */}
            <div>
              <h3 className="text-xl md:text-2xl text-primary font-medium mb-8">Активный отдых</h3>
              <div className="space-y-0">
                {activePrices.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-baseline py-4 border-b border-border"
                  >
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-foreground font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Banya Prices */}
            <div>
              <h3 className="text-xl md:text-2xl text-primary font-medium mb-8">Банные процедуры</h3>
              <div className="space-y-0">
                {banyaPrices.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-baseline py-4 border-b border-border"
                  >
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-foreground font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">
            Готовы отдохнуть?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Свяжитесь с нами для бронирования или получения консультации
          </p>
          <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            Связаться с нами
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
