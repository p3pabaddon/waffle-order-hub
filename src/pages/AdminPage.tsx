import { useEffect, useRef, useState } from "react";
import { useOrders, statusLabels, type OrderStatus } from "@/context/OrderContext";
import { Clock, ChefHat, Package, PartyPopper, Volume2, VolumeX } from "lucide-react";

const statusFlow: OrderStatus[] = ["received", "preparing", "almost-ready", "ready"];

const nextStatus = (current: OrderStatus): OrderStatus | null => {
  const idx = statusFlow.indexOf(current);
  return idx < statusFlow.length - 1 ? statusFlow[idx + 1] : null;
};

const statusIcon: Record<OrderStatus, React.ElementType> = {
  received: Clock,
  preparing: ChefHat,
  "almost-ready": Package,
  ready: PartyPopper,
};

const statusBadgeClasses: Record<OrderStatus, string> = {
  received: "bg-muted text-muted-foreground",
  preparing: "bg-accent/20 text-accent-foreground",
  "almost-ready": "gradient-warm text-primary-foreground",
  ready: "bg-green-100 text-green-700",
};

const AdminPage = () => {
  const { orders, updateOrderStatus, newOrderFlag } = useOrders();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const prevOrderCount = useRef(orders.length);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playDing = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } catch {}
  };

  useEffect(() => {
    if (orders.length > prevOrderCount.current) {
      playDing();
    }
    prevOrderCount.current = orders.length;
  }, [newOrderFlag]);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-strong sticky top-0 z-40 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
              🧇 Sipariş Paneli
            </h1>
            <p className="text-muted-foreground text-sm">
              {orders.length} toplam sipariş
            </p>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-primary" />
            ) : (
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilter("all")}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-heading font-medium transition-all ${
              filter === "all" ? "gradient-warm text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            Tümü ({orders.length})
          </button>
          {statusFlow.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-heading font-medium transition-all ${
                filter === s ? "gradient-warm text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {statusLabels[s]} ({orders.filter((o) => o.status === s).length})
            </button>
          ))}
        </div>
      </div>

      {/* Orders */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Clock className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="font-heading text-lg">Henüz sipariş yok</p>
            <p className="text-sm mt-1">Yeni siparişler burada görünecek</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((order) => {
              const Icon = statusIcon[order.status];
              const next = nextStatus(order.status);
              return (
                <div key={order.id} className="glass rounded-2xl p-5 card-hover animate-fade-in">
                  {/* Order header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-heading font-bold text-foreground">{order.id}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {order.customerName} • {order.tableNumber === "Paket" ? "Paket" : `Masa ${order.tableNumber}`}
                      </p>
                    </div>
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-medium ${statusBadgeClasses[order.status]}`}>
                      <Icon className="w-3.5 h-3.5" />
                      {statusLabels[order.status]}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-1 mb-3">
                    {order.items.map((ci) => (
                      <div key={ci.item.id} className="flex justify-between text-sm">
                        <span className="text-foreground">{ci.quantity}x {ci.item.name}</span>
                        <span className="text-muted-foreground">₺{ci.item.price * ci.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">
                        {order.paymentMethod === "online" ? "💳 Online" : "💵 Nakit"} • ₺{order.total}
                      </span>
                    </div>
                    {next && (
                      <button
                        onClick={() => updateOrderStatus(order.id, next)}
                        className="gradient-warm text-primary-foreground text-sm font-heading font-medium px-4 py-2 rounded-lg hover:shadow-md hover:scale-105 active:scale-95 transition-all"
                      >
                        → {statusLabels[next]}
                      </button>
                    )}
                    {order.status === "ready" && (
                      <span className="text-green-600 font-heading font-medium text-sm flex items-center gap-1">
                        <PartyPopper className="w-4 h-4" /> Tamamlandı
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
