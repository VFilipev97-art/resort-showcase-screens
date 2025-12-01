import { Card } from "@/components/ui/card";
import cottageExterior from "@/assets/cottage-exterior.jpg";
import cottageInterior from "@/assets/cottage-interior.jpg";
import banyaExterior from "@/assets/banya-exterior.jpg";
import kamaRiverView from "@/assets/kama-river-view.jpg";

const GalleryStatsSection = () => {
  const stats = [
    { number: "12", label: "уютных коттеджей" },
    { number: "50+", label: "гектаров леса" },
    { number: "24/7", label: "сервис и поддержка" },
    { number: "100%", label: "экологичность" },
  ];

  const images = [
    { src: cottageExterior, alt: "Коттедж снаружи" },
    { src: cottageInterior, alt: "Интерьер коттеджа" },
    { src: banyaExterior, alt: "Русская баня" },
    { src: kamaRiverView, alt: "Вид на Камское море" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-8">
        {/* Gallery Grid */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-12 text-center">
            Наша база отдыха
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {images.map((image, index) => (
              <Card
                key={index}
                className="overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <Card className="bg-card p-10 md:p-16 mb-16 border-border/50">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-serif text-primary mb-6">
              Погрузитесь в атмосферу уединения
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Строгановские Просторы — это место, где вы сможете отдохнуть от городской суеты, насладиться тишиной хвойного леса и величием Камского моря. Наши коттеджи оборудованы всем необходимым для комфортного проживания, а территория базы предлагает множество активностей на любой вкус.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Мы создали пространство, где современный комфорт гармонично сочетается с природной красотой Пермского края. Каждый элемент продуман для вашего максимального удобства и релаксации.
            </p>
          </div>
        </Card>

        {/* Stats Grid */}
        <div>
          <h3 className="text-3xl md:text-4xl font-serif text-primary mb-10 text-center">
            Цифры и факты
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-8 text-center bg-gradient-to-br from-secondary to-accent border-none transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-3">
                  <div className="text-5xl md:text-6xl font-bold text-primary-foreground">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-primary-foreground/90 font-medium">
                    {stat.label}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryStatsSection;
