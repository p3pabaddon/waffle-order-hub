import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, User, Phone, Lock, CheckCircle } from "lucide-react";
import { useOrders } from "@/context/OrderContext";

const CheckoutPage = () => {
  const { cart, cartTotal, placeOrder } = useOrders();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [mockSuccess, setMockSuccess] = useState(false);

  if (cart.length === 0) {
    navigate("/");
    return null;
  }

  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
  const isFormValid = firstName.trim() && lastName.trim() && phone.trim().length >= 10 && cardNumber.length >= 16;

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setProcessing(true);

    // Mock payment processing
    await new Promise((r) => setTimeout(r, 2000));
    setMockSuccess(true);
    await new Promise((r) => setTimeout(r, 1000));

    try {
      const orderCode = await placeOrder(fullName, phone, "online");
      navigate(`/order/${orderCode}`);
    } catch {
      setProcessing(false);
      setMockSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="glass-strong sticky top-0 z-40 px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="font-heading font-bold text-lg text-foreground">Sipariş Özeti</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {/* Order summary */}
        <div className="glass rounded-2xl p-4 space-y-2.5 animate-fade-in">
          <h2 className="font-heading font-semibold text-foreground text-sm">📦 Paket Sipariş</h2>
          {cart.map((ci) => (
            <div key={ci.item.id + (ci.customizations?.join(",") || "")} className="flex justify-between items-start text-sm">
              <div className="flex-1">
                <span className="text-foreground">{ci.quantity}x {ci.item.name}</span>
                {ci.customizations && ci.customizations.length > 0 && (
                  <p className="text-muted-foreground text-xs mt-0.5">{ci.customizations.join(", ")}</p>
                )}
              </div>
              <span className="font-semibold text-primary ml-2">₺{ci.item.price * ci.quantity}</span>
            </div>
          ))}
          <div className="border-t border-border pt-2.5 flex justify-between">
            <span className="font-heading font-semibold text-foreground">Toplam</span>
            <span className="font-heading font-bold text-lg text-primary">₺{cartTotal}</span>
          </div>
        </div>

        {/* Customer info */}
        <div className="glass rounded-2xl p-4 space-y-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="font-heading font-semibold text-foreground text-sm">Bilgileriniz</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Adınız" value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Soyadınız" value={lastName} onChange={(e) => setLastName(e.target.value)} required
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
            </div>
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="tel" placeholder="Telefon Numarası (05XX XXX XXXX)" value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))} required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
          </div>
        </div>

        {/* Online Payment (mock) */}
        <div className="glass rounded-2xl p-4 space-y-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-semibold text-foreground text-sm">Online Ödeme</h2>
            <span className="ml-auto bg-primary/10 text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full">MOCK</span>
          </div>

          {mockSuccess ? (
            <div className="flex items-center justify-center gap-2 py-6 text-green-600">
              <CheckCircle className="w-8 h-8" />
              <span className="font-heading font-semibold">Ödeme Başarılı!</span>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Kart Numarası"
                  value={formatCardNumber(cardNumber)}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all tracking-wider" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="AA/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                  className="w-full px-3 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" placeholder="CVV" value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
              </div>
              <p className="text-muted-foreground text-[10px] text-center">🔒 Test modu: herhangi bir kart numarası girebilirsiniz</p>
            </div>
          )}
        </div>

        <button type="submit" disabled={processing || !isFormValid}
          className="w-full gradient-warm text-primary-foreground font-heading font-bold text-base py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              {mockSuccess ? "Sipariş oluşturuluyor..." : "Ödeme işleniyor..."}
            </span>
          ) : (
            `Ödemeyi Tamamla — ₺${cartTotal}`
          )}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
