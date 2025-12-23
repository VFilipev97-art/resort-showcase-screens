import { useState, useEffect } from "react";
import { X, Utensils, Soup, Salad, Cake, Wine, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Menu categories with items
const menuCategories = [
  {
    id: "starters",
    name: "Закуски",
    icon: Salad,
    items: [
      { name: "Сырная тарелка", description: "Ассорти из фермерских сыров с мёдом и орехами", price: 850 },
      { name: "Брускетта с лососем", description: "Хрустящий хлеб с авокадо и слабосолёным лососем", price: 620 },
      { name: "Тартар из говядины", description: "С каперсами, корнишонами и перепелиным яйцом", price: 780 },
      { name: "Карпаччо из телятины", description: "С рукколой, пармезаном и трюфельным маслом", price: 890 },
    ],
    image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=300&fit=crop"
  },
  {
    id: "soups",
    name: "Супы",
    icon: Soup,
    items: [
      { name: "Крем-суп из белых грибов", description: "С трюфельным маслом и гренками", price: 480 },
      { name: "Уха по-царски", description: "Из трёх видов рыбы с расстегаем", price: 650 },
      { name: "Борщ домашний", description: "С говядиной, сметаной и пампушками", price: 420 },
    ],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
  },
  {
    id: "mains",
    name: "Основные блюда",
    icon: Utensils,
    items: [
      { name: "Стейк рибай", description: "400г, на гриле с травами и картофелем", price: 2400 },
      { name: "Филе судака", description: "На пару с овощами и соусом берблан", price: 1200 },
      { name: "Утиная грудка", description: "С вишнёвым соусом и печёной грушей", price: 1450 },
      { name: "Томлёная баранина", description: "С розмарином и овощами гриль", price: 1680 },
      { name: "Ризотто с белыми грибами", description: "Кремовое ризотто с пармезаном", price: 780 },
    ],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop"
  },
  {
    id: "desserts",
    name: "Десерты",
    icon: Cake,
    items: [
      { name: "Чизкейк Нью-Йорк", description: "Классический с ягодным соусом", price: 380 },
      { name: "Тирамису", description: "Традиционный итальянский рецепт", price: 420 },
      { name: "Крем-брюле", description: "С ванилью и карамельной корочкой", price: 350 },
      { name: "Яблочный штрудель", description: "Тёплый, с ванильным мороженым", price: 390 },
    ],
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop"
  },
  {
    id: "drinks",
    name: "Напитки",
    icon: Wine,
    items: [
      { name: "Морс клюквенный", description: "Домашний, 0.5л", price: 250 },
      { name: "Лимонад облепиховый", description: "С мёдом и имбирём, 0.5л", price: 280 },
      { name: "Чай травяной", description: "Сбор уральских трав", price: 320 },
      { name: "Кофе капучино", description: "На фермерском молоке", price: 280 },
    ],
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop"
  },
];

// Decorative SVG components
const BranchDecoration = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M100 280 C100 280, 100 150, 100 80 M100 200 C100 200, 60 180, 40 160 M100 160 C100 160, 140 140, 160 120 M100 120 C100 120, 70 100, 50 80 M100 80 C100 80, 130 60, 150 40 M40 160 C40 160, 30 140, 35 120 M160 120 C160 120, 170 100, 165 80 M50 80 C50 80, 40 60, 45 40 M150 40 C150 40, 160 20, 155 5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="35" cy="120" r="4" fill="currentColor" opacity="0.6"/>
    <circle cx="165" cy="80" r="3" fill="currentColor" opacity="0.5"/>
    <circle cx="45" cy="40" r="5" fill="currentColor" opacity="0.4"/>
    <circle cx="155" cy="5" r="3" fill="currentColor" opacity="0.6"/>
    <circle cx="100" cy="80" r="4" fill="currentColor" opacity="0.5"/>
  </svg>
);

const LeafDecoration = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M50 140 C50 140, 50 80, 50 20 M50 100 C50 100, 30 90, 20 70 M50 70 C50 70, 70 60, 80 40 M50 40 C50 40, 35 30, 25 15" 
      stroke="currentColor" 
      strokeWidth="1.2" 
      strokeLinecap="round"
    />
    <ellipse cx="20" cy="70" rx="12" ry="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
    <ellipse cx="80" cy="40" rx="10" ry="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    <ellipse cx="25" cy="15" rx="8" ry="5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
  </svg>
);

const PlateDecoration = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="50" rx="50" ry="20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <ellipse cx="60" cy="45" rx="35" ry="12" stroke="currentColor" strokeWidth="1" opacity="0.6" fill="none"/>
    <path d="M30 30 C30 30, 40 20, 60 20 C80 20, 90 30, 90 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    <circle cx="60" cy="35" r="2" fill="currentColor" opacity="0.5"/>
    <circle cx="50" cy="40" r="1.5" fill="currentColor" opacity="0.4"/>
    <circle cx="70" cy="38" r="1.5" fill="currentColor" opacity="0.4"/>
  </svg>
);

const MenuModal = ({ isOpen, onClose }: MenuModalProps) => {
  const [activeCategory, setActiveCategory] = useState("starters");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen && !isAnimating) return null;

  const currentCategory = menuCategories.find(c => c.id === activeCategory);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300",
        isAnimating && isOpen ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div 
        className={cn(
          "absolute inset-0 bg-background transition-transform duration-500 ease-out overflow-hidden",
          isAnimating && isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Decorative elements */}
        <BranchDecoration className="absolute top-20 right-8 w-32 h-48 text-primary/20 hidden lg:block" />
        <LeafDecoration className="absolute bottom-20 left-8 w-24 h-36 text-primary/15 hidden lg:block" />
        <PlateDecoration className="absolute top-1/2 right-12 w-32 h-20 text-primary/10 hidden xl:block" />
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h2 className="font-apoc text-2xl md:text-3xl text-primary">Меню ресторана</h2>
              <p className="text-muted-foreground text-sm mt-1">Свежие продукты от местных фермеров</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="rounded-full w-10 h-10 hover:bg-primary/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Category Navigation */}
          <div className="container mx-auto px-4 pb-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {menuCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300",
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100vh-140px)] overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            {currentCategory && (
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Photo Column */}
                <div className="lg:col-span-4 order-2 lg:order-1">
                  <div className="sticky top-8">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[3/4]">
                      <img 
                        src={currentCategory.image} 
                        alt={currentCategory.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-apoc text-2xl text-white">{currentCategory.name}</h3>
                      </div>
                    </div>
                    
                    {/* Decorative line art under image */}
                    <div className="mt-6 hidden lg:block">
                      <svg className="w-full h-16 text-primary/30" viewBox="0 0 300 60" fill="none">
                        <path 
                          d="M0 30 Q75 10, 150 30 T300 30" 
                          stroke="currentColor" 
                          strokeWidth="1"
                          fill="none"
                        />
                        <circle cx="75" cy="20" r="3" fill="currentColor" opacity="0.5"/>
                        <circle cx="150" cy="30" r="4" fill="currentColor" opacity="0.6"/>
                        <circle cx="225" cy="20" r="3" fill="currentColor" opacity="0.5"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Menu Items Column */}
                <div className="lg:col-span-8 order-1 lg:order-2">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-primary font-apoc text-lg uppercase tracking-wider">
                      {currentCategory.name}
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <div className="space-y-1">
                    {currentCategory.items.map((item, index) => (
                      <div 
                        key={index}
                        className="group py-4 border-b border-border/50 last:border-0 hover:bg-muted/30 -mx-4 px-4 transition-colors duration-200 rounded-lg"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-lato font-medium text-foreground group-hover:text-primary transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-muted-foreground text-sm mt-1">
                              {item.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="font-lato font-semibold text-primary text-lg">
                              {item.price}
                            </span>
                            <span className="text-muted-foreground text-sm ml-1">₽</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Decorative footer for category */}
                  <div className="mt-8 pt-8 border-t border-border/30">
                    <div className="flex items-center gap-6 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-primary/60" />
                        <span className="text-sm">Свежий кофе</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-border" />
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Фермерские продукты</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-border" />
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Сезонное меню</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
