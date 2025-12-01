import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import heroImage from "@/assets/hero-cottages.jpg";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Коттеджи базы отдыха Строгановские Просторы зимой"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/70" />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-6 md:p-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <img src={logo} alt="Строгановские Просторы" className="h-12 md:h-16" />
            <a href="#" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors">
              дома
            </a>
            <a href="#" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors">
              услуги
            </a>
            <a href="#" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors">
              как добраться
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+79991234567" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors">
              <Phone className="w-5 h-5" />
            </a>
            <Button variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              забронировать
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-8 z-10 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Description */}
          <div className="space-y-6 animate-fade-in">
            <p className="text-3xl md:text-4xl text-primary-foreground/90 font-light leading-relaxed">
              уютные коттеджи
              <br />
              и глэмпинг в хвойном лесу
              <br />
              на берегу камского моря
            </p>
          </div>

          {/* Right Side - Description */}
          <div className="bg-primary-foreground/10 backdrop-blur-md p-8 rounded-2xl border border-primary-foreground/20 animate-slide-in-right">
            <p className="text-primary-foreground text-lg leading-relaxed">
              Уединенный отдых в уютном историческом месте Пермского края. Наслаждитесь первозданной природой и европейским уровнем комфорта размещения в уютных коттеджах и номерах. Зарядитесь эмоциями от прогулки на квадроциклах, а после отдохните душой и телом в традиционной русской бане.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
