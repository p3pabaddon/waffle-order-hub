import { useState, useEffect } from "react";
import { categories, menuItems } from "@/data/menuData";
import MenuItemCard from "@/components/MenuItemCard";
import CartDrawer from "@/components/CartDrawer";
import heroWaffle from "@/assets/hero-waffle.jpg";
import cafeLogo from "@/assets/cafe-logo.png";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("waffle-special");
  const [heroOffset, setHeroOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setHeroOffset(window.scrollY * 0.4);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    window.scrollTo({ top: 260, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img
          src={heroWaffle}
          alt="Shabby Waffele"
          width={1280} height={720}
          className="w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${heroOffset}px) scale(1.1)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/10 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
          <img src={cafeLogo} alt="Shabby Waffele Logo" className="w-16 h-16 mb-1.5 drop-shadow-2xl float-animation" />
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight">
            Shabby Waffele
          </h1>
          <p className="text-muted-foreground mt-0.5 font-medium text-xs tracking-wide">
            Paket Sipariş • Beşiktaş ✨
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-0 z-40 glass-strong border-b border-border/50 px-2 py-2.5">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar max-w-lg mx-auto pb-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full font-heading font-medium text-[11px] transition-all duration-300 whitespace-nowrap ${
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
      <div className="max-w-lg mx-auto px-4 mt-4 mb-3">
        <h2 className="font-heading font-bold text-lg text-foreground animate-fade-in">
          {categories.find((c) => c.id === activeCategory)?.emoji}{" "}
          {categories.find((c) => c.id === activeCategory)?.label}
        </h2>
        <p className="text-muted-foreground text-xs mt-0.5">{filteredItems.length} ürün</p>
      </div>

      {/* Menu grid */}
      <div className="max-w-lg mx-auto px-3">
        <div className="grid grid-cols-2 gap-2.5">
          {filteredItems.map((item, i) => (
            <MenuItemCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      <CartDrawer />
    </div>
  );
};

export default MenuPage;
