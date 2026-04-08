import { useState } from "react";
import { ShoppingCart, X, Minus, Plus, ArrowRight } from "lucide-react";
import { useOrders } from "@/context/OrderContext";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const [open, setOpen] = useState(false);
  const { cart, cartTotal, cartCount, removeFromCart, updateQuantity } = useOrders();
  const navigate = useNavigate();

  return (
    <>
      {cartCount > 0 && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 gradient-warm text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform animate-scale-in"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-cafe-rose text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce-subtle">
            {cartCount}
          </span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm glass-strong shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-heading font-bold text-lg text-foreground">Sepetim ({cartCount})</h2>
            <button onClick={() => setOpen(false)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <ShoppingCart className="w-14 h-14 mb-3 opacity-30" />
                <p className="font-heading text-base">Sepetiniz boş</p>
                <p className="text-xs mt-1">Menüden ürün ekleyin</p>
              </div>
            ) : (
              cart.map((cartItem, idx) => (
                <div key={cartItem.item.id + "-" + idx + (cartItem.customizations?.join(",") || "")} className="flex items-center gap-3 glass rounded-xl p-2.5 animate-fade-in">
                  <img src={cartItem.item.image} alt={cartItem.item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-medium text-xs text-foreground truncate">{cartItem.item.name}</h4>
                    {cartItem.customizations && cartItem.customizations.length > 0 && (
                      <p className="text-muted-foreground text-[10px] truncate">{cartItem.customizations.join(", ")}</p>
                    )}
                    <p className="text-primary font-semibold text-xs mt-0.5">₺{cartItem.item.price * cartItem.quantity}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-medium text-xs w-5 text-center">{cartItem.quantity}</span>
                    <button onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-5 border-t border-border space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium text-sm">Toplam</span>
                <span className="font-heading font-bold text-xl text-primary">₺{cartTotal}</span>
              </div>
              <button
                onClick={() => { setOpen(false); navigate("/checkout"); }}
                className="w-full gradient-warm text-primary-foreground font-heading font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98] transition-all"
              >
                Siparişi Tamamla
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
