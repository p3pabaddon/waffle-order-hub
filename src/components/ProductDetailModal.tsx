import { useState } from "react";
import { X, Plus, Minus, Check, ShoppingCart } from "lucide-react";
import type { MenuItem } from "@/data/menuData";
import { customizationOptions, type CustomizationOption } from "@/data/menuData";
import { useOrders } from "@/context/OrderContext";

interface ProductDetailModalProps {
  item: MenuItem;
  onClose: () => void;
}

const ProductDetailModal = ({ item, onClose }: ProductDetailModalProps) => {
  const { addToCart, addCustomToCart } = useOrders();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Kendin Yarat state
  const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
  const [selectedChocolates, setSelectedChocolates] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const fruits = customizationOptions.filter((o) => o.category === "meyve");
  const chocolates = customizationOptions.filter((o) => o.category === "cikolata");
  const toppings = customizationOptions.filter((o) => o.category === "susleme");

  const toggleFruit = (id: string) => {
    setSelectedFruits((prev) => {
      if (prev.includes(id)) return prev.filter((f) => f !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  const toggleChocolate = (id: string) => {
    setSelectedChocolates((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const getSelectedNames = () => {
    const allOptions = customizationOptions;
    const names = [
      ...selectedFruits.map((id) => allOptions.find((o) => o.id === id)?.name),
      ...selectedChocolates.map((id) => allOptions.find((o) => o.id === id)?.name),
      ...selectedToppings.map((id) => allOptions.find((o) => o.id === id)?.name),
    ].filter(Boolean);
    return names as string[];
  };

  const handleAdd = () => {
    if (item.isCustomizable) {
      if (selectedFruits.length === 0 && selectedChocolates.length === 0 && selectedToppings.length === 0) return;
      const customizations = getSelectedNames();
      for (let i = 0; i < quantity; i++) {
        addCustomToCart(item, customizations);
      }
    } else {
      for (let i = 0; i < quantity; i++) {
        addToCart(item);
      }
    }
    setAdded(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const canAdd = item.isCustomizable
    ? selectedFruits.length > 0 || selectedChocolates.length > 0 || selectedToppings.length > 0
    : true;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md max-h-[90vh] bg-background rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col animate-slide-up z-10">
        {/* Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
          {item.popular && (
            <span className="absolute top-4 left-4 gradient-warm text-primary-foreground text-xs font-heading font-semibold px-3 py-1.5 rounded-full shadow-lg">
              ⭐ Popüler
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <div className="flex items-start justify-between mb-2">
            <h2 className="font-heading font-bold text-xl text-foreground">{item.name}</h2>
            <span className="font-heading font-bold text-xl text-primary ml-3 flex-shrink-0">₺{item.price}</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.description}</p>

          {/* Ingredients badges */}
          {item.ingredients && item.ingredients.length > 0 && !item.isCustomizable && (
            <div className="mb-4">
              <h3 className="font-heading font-semibold text-sm text-foreground mb-2">İçindekiler</h3>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing) => (
                  <span key={ing} className="bg-muted text-muted-foreground text-xs px-2.5 py-1 rounded-full">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Kendin Yarat Customization */}
          {item.isCustomizable && (
            <div className="space-y-4">
              {/* Fruits - max 2 */}
              <div>
                <h3 className="font-heading font-semibold text-sm text-foreground mb-2">
                  🍓 Meyveler <span className="text-muted-foreground font-normal">(max 2 adet)</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {fruits.map((opt) => (
                    <OptionChip
                      key={opt.id}
                      option={opt}
                      selected={selectedFruits.includes(opt.id)}
                      onToggle={() => toggleFruit(opt.id)}
                      disabled={!selectedFruits.includes(opt.id) && selectedFruits.length >= 2}
                    />
                  ))}
                </div>
              </div>

              {/* Chocolates - unlimited */}
              <div>
                <h3 className="font-heading font-semibold text-sm text-foreground mb-2">
                  🍫 Çikolatalar <span className="text-muted-foreground font-normal">(sınırsız)</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {chocolates.map((opt) => (
                    <OptionChip
                      key={opt.id}
                      option={opt}
                      selected={selectedChocolates.includes(opt.id)}
                      onToggle={() => toggleChocolate(opt.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Toppings - unlimited */}
              <div>
                <h3 className="font-heading font-semibold text-sm text-foreground mb-2">
                  ✨ Süslemeler <span className="text-muted-foreground font-normal">(sınırsız)</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {toppings.map((opt) => (
                    <OptionChip
                      key={opt.id}
                      option={opt}
                      selected={selectedToppings.includes(opt.id)}
                      onToggle={() => toggleTopping(opt.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-5 border-t border-border bg-background">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-3 bg-muted rounded-xl px-3 py-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-heading font-semibold text-lg w-6 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="font-heading font-bold text-lg text-primary ml-auto">₺{item.price * quantity}</span>
          </div>

          <button
            onClick={handleAdd}
            disabled={!canAdd || added}
            className={`w-full py-3.5 rounded-xl font-heading font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
              added
                ? "bg-green-500/90 text-primary-foreground scale-95"
                : canAdd
                ? "gradient-warm text-primary-foreground hover:shadow-lg active:scale-95"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {added ? (
              <>
                <Check className="w-5 h-5" /> Sepete Eklendi!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" /> Sepete Ekle
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const OptionChip = ({
  option,
  selected,
  onToggle,
  disabled,
}: {
  option: CustomizationOption;
  selected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) => (
  <button
    type="button"
    onClick={onToggle}
    disabled={disabled}
    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
      selected
        ? "gradient-warm text-primary-foreground border-transparent scale-105"
        : disabled
        ? "bg-muted/50 text-muted-foreground/50 border-border/50 cursor-not-allowed"
        : "bg-muted text-foreground border-border hover:border-primary/50"
    }`}
  >
    {selected && <Check className="w-3 h-3 inline mr-1" />}
    {option.name}
  </button>
);

export default ProductDetailModal;
