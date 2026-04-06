import { useState } from "react";
import { Plus, Check } from "lucide-react";
import type { MenuItem } from "@/data/menuData";
import { useOrders } from "@/context/OrderContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
}

const MenuItemCard = ({ item, index }: MenuItemCardProps) => {
  const { addToCart } = useOrders();
  const [added, setAdded] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      ref={ref}
      className={`glass rounded-2xl overflow-hidden card-hover transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="relative overflow-hidden aspect-[4/3] group">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={640}
          height={480}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {item.popular && (
          <span className="absolute top-3 left-3 gradient-warm text-primary-foreground text-xs font-heading font-semibold px-3 py-1.5 rounded-full shadow-lg">
            ⭐ Popüler
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 right-3">
          <span className="glass-strong font-heading font-bold text-base px-3 py-1.5 rounded-full text-foreground">
            ₺{item.price}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="font-heading font-semibold text-foreground text-[15px] leading-tight">
          {item.name}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
          {item.description}
        </p>
        <button
          onClick={handleAdd}
          className={`mt-2 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-heading font-medium transition-all duration-300 ${
            added
              ? "bg-green-500/90 text-primary-foreground scale-95"
              : "gradient-warm text-primary-foreground hover:shadow-lg hover:scale-[1.02] active:scale-95"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Eklendi!
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Sepete Ekle
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
