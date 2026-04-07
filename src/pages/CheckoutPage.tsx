import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, CreditCard, Banknote, User, MapPin } from "lucide-react";
import { useOrders } from "@/context/OrderContext";

const CheckoutPage = () => {
  const { cart, cartTotal, placeOrder } = useOrders();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableFromQR = searchParams.get("table");
  const [name, setName] = useState("");
  const [tableNumber, setTableNumber] = useState(tableFromQR || "");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("cash");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [processing, setProcessing] = useState(false);

  if (cart.length === 0) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !tableNumber.trim()) return;
    setProcessing(true);
    try {
      const orderCode = await placeOrder(name, tableNumber, paymentMethod);
      navigate(`/order/${orderCode}`);
    } catch {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="glass-strong sticky top-0 z-40 px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="font-heading font-bold text-xl text-foreground">Sipariş Özeti</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Order summary */}
        <div className="glass rounded-2xl p-5 space-y-3 animate-fade-in">
          <h2 className="font-heading font-semibold text-foreground">Ürünler</h2>
          {cart.map((ci) => (
            <div key={ci.item.id} className="flex justify-between items-center text-sm">
              <span className="text-foreground">{ci.quantity}x {ci.item.name}</span>
              <span className="font-semibold text-primary">₺{ci.item.price * ci.quantity}</span>
            </div>
          ))}
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-heading font-semibold text-foreground">Toplam</span>
            <span className="font-heading font-bold text-xl text-primary">₺{cartTotal}</span>
          </div>
        </div>

        {/* Customer info */}
        <div className="glass rounded-2xl p-5 space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="font-heading font-semibold text-foreground">Bilgileriniz</h2>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="text" placeholder="Adınız" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="text" placeholder="Masa No veya 'Paket'" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} required
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
          </div>
        </div>

        {/* Payment method */}
        <div className="glass rounded-2xl p-5 space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-heading font-semibold text-foreground">Ödeme Yöntemi</h2>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setPaymentMethod("online")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${paymentMethod === "online" ? "border-primary bg-primary/5" : "border-border bg-muted hover:border-primary/30"}`}>
              <CreditCard className={`w-6 h-6 ${paymentMethod === "online" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`font-heading font-medium text-sm ${paymentMethod === "online" ? "text-primary" : "text-muted-foreground"}`}>Online Ödeme</span>
            </button>
            <button type="button" onClick={() => setPaymentMethod("cash")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${paymentMethod === "cash" ? "border-primary bg-primary/5" : "border-border bg-muted hover:border-primary/30"}`}>
              <Banknote className={`w-6 h-6 ${paymentMethod === "cash" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`font-heading font-medium text-sm ${paymentMethod === "cash" ? "text-primary" : "text-muted-foreground"}`}>Nakit</span>
            </button>
          </div>
          {paymentMethod === "online" && (
            <div className="space-y-3 animate-fade-in">
              <input type="text" placeholder="Kart Numarası" value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all tracking-widest" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="AA/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                <input type="text" placeholder="CVV" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
              </div>
            </div>
          )}
        </div>

        <button type="submit" disabled={processing || !name.trim() || !tableNumber.trim()}
          className="w-full gradient-warm text-primary-foreground font-heading font-bold text-lg py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              İşleniyor...
            </span>
          ) : (
            `Siparişi Onayla — ₺${cartTotal}`
          )}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
