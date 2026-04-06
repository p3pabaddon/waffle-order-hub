import { useParams, useNavigate } from "react-router-dom";
import { useOrders, statusLabels, type OrderStatus } from "@/context/OrderContext";
import { ArrowLeft, CheckCircle2, Clock, ChefHat, Package, PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";

const statusSteps: { status: OrderStatus; icon: React.ElementType; label: string }[] = [
  { status: "received", icon: Clock, label: "Sipariş Alındı" },
  { status: "preparing", icon: ChefHat, label: "Hazırlanıyor" },
  { status: "almost-ready", icon: Package, label: "Çıkmak Üzere" },
  { status: "ready", icon: PartyPopper, label: "Sipariş Hazır" },
];

const statusIndex = (s: OrderStatus) => statusSteps.findIndex((st) => st.status === s);

const OrderTrackingPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder } = useOrders();
  const navigate = useNavigate();
  const [, setTick] = useState(0);

  // Poll for updates
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  const order = orderId ? getOrder(orderId) : undefined;

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <p className="font-heading text-xl text-foreground mb-4">Sipariş bulunamadı</p>
        <button onClick={() => navigate("/")} className="gradient-warm text-primary-foreground px-6 py-3 rounded-xl font-heading font-medium">
          Menüye Dön
        </button>
      </div>
    );
  }

  const currentStepIdx = statusIndex(order.status);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-strong sticky top-0 z-40 px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="font-heading font-bold text-lg text-foreground">Sipariş Takibi</h1>
          <p className="text-muted-foreground text-xs">{order.id}</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Status animation */}
        {order.status === "ready" && (
          <div className="text-center animate-scale-in">
            <div className="w-24 h-24 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-3">
              <PartyPopper className="w-12 h-12 text-green-500 float-animation" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-foreground">Siparişiniz Hazır! 🎉</h2>
            <p className="text-muted-foreground mt-1">Tezgahtan alabilirsiniz</p>
          </div>
        )}

        {/* Progress */}
        <div className="glass rounded-2xl p-6 animate-fade-in">
          <div className="space-y-0">
            {statusSteps.map((step, i) => {
              const Icon = step.icon;
              const isComplete = i <= currentStepIdx;
              const isCurrent = i === currentStepIdx;

              return (
                <div key={step.status} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isComplete
                          ? "gradient-warm text-primary-foreground shadow-md"
                          : "bg-muted text-muted-foreground"
                      } ${isCurrent ? "scale-110 pulse-dot" : ""}`}
                    >
                      {isComplete && i < currentStepIdx ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    {i < statusSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-10 transition-colors duration-500 ${
                          i < currentStepIdx ? "bg-primary" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pt-2">
                    <p className={`font-heading font-medium text-sm ${isComplete ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-primary mt-0.5 animate-fade-in">Şu an burada</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order details */}
        <div className="glass rounded-2xl p-5 space-y-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h3 className="font-heading font-semibold text-foreground">Sipariş Detayı</h3>
          <div className="text-sm space-y-1.5 text-muted-foreground">
            <p>👤 {order.customerName}</p>
            <p>📍 {order.tableNumber === "Paket" ? "Paket Sipariş" : `Masa ${order.tableNumber}`}</p>
            <p>💳 {order.paymentMethod === "online" ? "Online Ödeme" : "Nakit Ödeme"}</p>
          </div>
          <div className="border-t border-border pt-3">
            {order.items.map((ci) => (
              <div key={ci.item.id} className="flex justify-between text-sm py-1">
                <span className="text-foreground">{ci.quantity}x {ci.item.name}</span>
                <span className="text-primary font-semibold">₺{ci.item.price * ci.quantity}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-2 flex justify-between">
              <span className="font-heading font-semibold text-foreground">Toplam</span>
              <span className="font-heading font-bold text-primary">₺{order.total}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-muted text-foreground font-heading font-medium py-3 rounded-xl hover:bg-secondary transition-colors"
        >
          Yeni Sipariş Ver
        </button>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
