import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { categories, menuItems } from "@/data/menuData";
import MenuItemCard from "@/components/MenuItemCard";
import CartDrawer from "@/components/CartDrawer";
import heroWaffle from "@/assets/hero-waffle.jpg";
import cafeLogo from "@/assets/cafe-logo.png";

const MenuPage = () => {
  const [searchParams] = useSearchParams();
  const tableFromQR = searchParams.get("table");
  const [activeCategory, setActiveCategory] = useState<string>("waffle-special");
  const [heroOffset, setHeroOffset] = useState(0);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Parallax effect on hero
  useEffect(() => {
    const handleScroll = () => {
      setHeroOffset(window.scrollY * 0.4);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    // Smooth scroll to top of grid
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero with parallax */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <img
          src={heroWaffle}
          alt="Waffle Cafe"
          width={1280}
          height={720}
          className="w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${heroOffset}px) scale(1.1)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/10 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-10">
          <img
            src={cafeLogo}
            alt="Waffle Cafe Logo"
            className="w-20 h-20 mb-2 drop-shadow-2xl float-animation"
          />
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
            Waffle Cafe
          </h1>
          <p className="text-muted-foreground mt-1 font-medium text-sm tracking-wide">
            Taze & Lezzetli • Beşiktaş ✨
          </p>
        </div>
      </div>

      {/* Category tabs - sticky with blur */}
      <div className="sticky top-0 z-40 glass-strong border-b border-border/50 px-3 py-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-lg mx-auto pb-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-heading font-medium text-[13px] transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat.id
                  ? "gradient-warm text-primary-foreground shadow-md scale-105"
                  : "bg-muted text-muted-foreground hover:bg-secondary hover:scale-105"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category title */}
      <div className="max-w-lg mx-auto px-4 mt-6 mb-4">
        <h2 className="font-heading font-bold text-xl text-foreground animate-fade-in">
          {categories.find((c) => c.id === activeCategory)?.emoji}{" "}
          {categories.find((c) => c.id === activeCategory)?.label}
        </h2>
        <p className="text-muted-foreground text-sm mt-0.5">
          {filteredItems.length} ürün
        </p>
      </div>

      {/* Menu grid */}
      <div className="max-w-lg mx-auto px-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map((item, i) => (
            <MenuItemCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      <CartDrawer tableFromQR={tableFromQR} />
    </div>
  );
};

export default MenuPage;
