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
