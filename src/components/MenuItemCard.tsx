import { useState } from "react";
import { Plus, Check } from "lucide-react";
import type { MenuItem } from "@/data/menuData";
import { useOrders } from "@/context/OrderContext";

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
}

const MenuItemCard = ({ item, index }: MenuItemCardProps) => {
  const { addToCart } = useOrders();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      className="glass rounded-2xl overflow-hidden card-hover slide-up opacity-0"
      style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "forwards" }}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={640}
          height={480}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {item.popular && (
          <span className="absolute top-3 left-3 gradient-warm text-primary-foreground text-xs font-heading font-semibold px-3 py-1 rounded-full">
            ⭐ Popüler
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent pointer-events-none" />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-heading font-semibold text-foreground text-base leading-tight">
          {item.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-heading font-bold text-lg text-primary">
            ₺{item.price}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              added
                ? "bg-green-500 text-primary-foreground scale-95"
                : "gradient-warm text-primary-foreground hover:shadow-lg hover:scale-105 active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Eklendi
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Ekle
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
