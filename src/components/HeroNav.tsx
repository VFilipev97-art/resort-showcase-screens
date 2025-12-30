import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const HeroNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { href: "/", label: "дома" },
    { href: "/services", label: "услуги" },
    { href: "/quadtours", label: "квадротуры" },
    { href: "#", label: "как добраться" },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 p-6 md:p-8 animate-fade-in">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img
              src={logo}
              alt="Строгановские Просторы"
              className="h-12 md:h-16 hover:scale-105 transition-transform duration-300"
            />
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-primary-foreground hover:text-primary-foreground/80 transition-all duration-300 hover:translate-y-[-2px] ${
                currentPath === link.href ? "border-b border-primary-foreground" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a
            href="tel:+79991234567"
            className="text-primary-foreground hover:text-primary-foreground/80 transition-all duration-300 hover:scale-110"
          >
            <Phone className="w-5 h-5" />
          </a>
          <Button
            variant="outline"
            className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 hover:scale-105"
          >
            забронировать
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default HeroNav;
