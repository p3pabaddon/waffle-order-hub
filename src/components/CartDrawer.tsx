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
      {/* Floating cart button */}
      {cartCount > 0 && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 gradient-warm text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform animate-scale-in"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-cafe-rose text-primary-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce-subtle">
            {cartCount}
          </span>
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md glass-strong shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-heading font-bold text-xl text-foreground">
              Sepetim ({cartCount})
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <ShoppingCart className="w-16 h-16 mb-4 opacity-30" />
                <p className="font-heading text-lg">Sepetiniz boş</p>
                <p className="text-sm mt-1">Menüden ürün ekleyin</p>
              </div>
            ) : (
              cart.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="flex items-center gap-4 glass rounded-xl p-3 animate-fade-in"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-medium text-sm text-foreground truncate">
                      {cartItem.item.name}
                    </h4>
                    <p className="text-primary font-semibold text-sm mt-0.5">
                      ₺{cartItem.item.price * cartItem.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-medium text-sm w-6 text-center">{cartItem.quantity}</span>
                    <button
                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-border space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Toplam</span>
                <span className="font-heading font-bold text-2xl text-primary">₺{cartTotal}</span>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/checkout");
                }}
                className="w-full gradient-warm text-primary-foreground font-heading font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Siparişi Tamamla
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
