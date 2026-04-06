import { useState } from "react";
import { categories, menuItems } from "@/data/menuData";
import MenuItemCard from "@/components/MenuItemCard";
import CartDrawer from "@/components/CartDrawer";
import heroWaffle from "@/assets/hero-waffle.jpg";
import cafeLogo from "@/assets/cafe-logo.png";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("waffle");

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={heroWaffle}
          alt="Waffle Cafe"
          width={1280}
          height={720}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
          <img src={cafeLogo} alt="Waffle Cafe Logo" className="w-20 h-20 mb-2 drop-shadow-lg" />
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Waffle Cafe
          </h1>
          <p className="text-muted-foreground mt-1 font-medium text-sm">
            Taze & Lezzetli ✨
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-0 z-40 glass-strong px-4 py-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-lg mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full font-heading font-medium text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? "gradient-warm text-primary-foreground shadow-md scale-105"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu grid */}
      <div className="max-w-lg mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
