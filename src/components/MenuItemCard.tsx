import { useState } from "react";
import { Plus, Check, Eye } from "lucide-react";
import type { MenuItem } from "@/data/menuData";
import { useOrders } from "@/context/OrderContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ProductDetailModal from "./ProductDetailModal";

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
}

const MenuItemCard = ({ item, index }: MenuItemCardProps) => {
  const { addToCart } = useOrders();
  const [added, setAdded] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.isCustomizable) {
      setShowDetail(true);
      return;
    }
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <>
      <div
        ref={ref}
        onClick={() => setShowDetail(true)}
        className={`glass rounded-2xl overflow-hidden card-hover transition-all duration-700 cursor-pointer ${
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
            <span className="absolute top-2 left-2 gradient-warm text-primary-foreground text-[10px] font-heading font-semibold px-2 py-1 rounded-full shadow-lg">
              ⭐ Popüler
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2 right-2">
            <span className="glass-strong font-heading font-bold text-sm px-2.5 py-1 rounded-full text-foreground">
              ₺{item.price}
            </span>
          </div>
          {/* Detail peek icon */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="glass w-7 h-7 rounded-full flex items-center justify-center">
              <Eye className="w-3.5 h-3.5 text-foreground" />
            </span>
          </div>
        </div>

        <div className="p-3 flex flex-col gap-1">
          <h3 className="font-heading font-semibold text-foreground text-[13px] leading-tight line-clamp-1">
            {item.name}
          </h3>
          <p className="text-muted-foreground text-[11px] leading-relaxed line-clamp-2">
            {item.description}
          </p>
          <button
            onClick={handleAdd}
            className={`mt-1.5 flex items-center justify-center gap-1 w-full py-2 rounded-xl text-xs font-heading font-medium transition-all duration-300 ${
              added
                ? "bg-green-500/90 text-primary-foreground scale-95"
                : "gradient-warm text-primary-foreground hover:shadow-lg hover:scale-[1.02] active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Eklendi!
              </>
            ) : item.isCustomizable ? (
              <>
                <Plus className="w-3.5 h-3.5" />
                Özelleştir
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                Sepete Ekle
              </>
            )}
          </button>
        </div>
      </div>

      {showDetail && (
        <ProductDetailModal item={item} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
};

export default MenuItemCard;
