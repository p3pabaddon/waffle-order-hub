import { useEffect, useRef, useState } from "react";
import { useOrders, statusLabels, type OrderStatus } from "@/context/OrderContext";
import { Clock, ChefHat, Package, PartyPopper, Volume2, VolumeX, LogOut, QrCode, Settings, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "@/components/AdminLogin";
import { supabase } from "@/integrations/supabase/client";

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
  preparing: "bg-accent/30 text-foreground",
  "almost-ready": "gradient-warm text-primary-foreground",
  ready: "bg-green-100 text-green-700",
};

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem("cafe-admin-auth") === "true");
  const { orders, updateOrderStatus, newOrderFlag, loadingOrders } = useOrders();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [showSettings, setShowSettings] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [pinSaved, setPinSaved] = useState(false);
  const prevOrderCount = useRef(orders.length);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const navigate = useNavigate();

  const playDing = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
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
    if (orders.length > prevOrderCount.current) playDing();
    prevOrderCount.current = orders.length;
  }, [newOrderFlag]);

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("cafe-admin-auth");
    supabase.auth.signOut();
    setAuthenticated(false);
  };

  const handleSavePin = async () => {
    if (!newPin || newPin.length < 4) return;
    await supabase.from("settings").update({ value: newPin }).eq("key", "admin_pin");
    setPinSaved(true);
    setTimeout(() => { setPinSaved(false); setShowSettings(false); setNewPin(""); }, 1500);
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const handleStatusUpdate = async (orderCode: string, status: OrderStatus) => {
    await updateOrderStatus(orderCode, status);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="glass-strong sticky top-0 z-40 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">🧇 Sipariş Paneli</h1>
            <p className="text-muted-foreground text-sm">{orders.length} toplam sipariş</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/admin/qr")} title="QR Kodlar"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors">
              <QrCode className="w-5 h-5 text-muted-foreground" />
            </button>
            <button onClick={() => setShowSettings(!showSettings)} title="Ayarlar"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
            <button onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors">
              {soundEnabled ? <Volume2 className="w-5 h-5 text-primary" /> : <VolumeX className="w-5 h-5 text-muted-foreground" />}
            </button>
            <button onClick={handleLogout}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/10 transition-colors">
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 animate-fade-in">
          <div className="glass rounded-2xl p-5 space-y-4">
            <h3 className="font-heading font-semibold text-foreground">⚙️ Ayarlar</h3>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground font-heading mb-1 block">Admin PIN Kodunu Değiştir</label>
                <input
                  type="text"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Yeni PIN kodu (min 4 hane)"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <button onClick={handleSavePin} disabled={!newPin || newPin.length < 4}
                className="gradient-warm text-primary-foreground px-4 py-3 rounded-xl font-heading font-medium text-sm flex items-center gap-2 hover:shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-40">
                {pinSaved ? "✓ Kaydedildi" : <><Save className="w-4 h-4" /> Kaydet</>}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <button onClick={() => setFilter("all")}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-heading font-medium transition-all ${filter === "all" ? "gradient-warm text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            Tümü ({orders.length})
          </button>
          {statusFlow.map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-heading font-medium transition-all ${filter === s ? "gradient-warm text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {statusLabels[s]} ({orders.filter((o) => o.status === s).length})
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
        {loadingOrders ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground font-heading">Siparişler yükleniyor...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Clock className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="font-heading text-lg">Henüz sipariş yok</p>
            <p className="text-sm mt-1">Yeni siparişler burada görünecek</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((order) => {
              const Icon = statusIcon[order.status];
              const next = nextStatus(order.status);
              return (
                <div key={order.id} className="glass rounded-2xl p-5 card-hover animate-fade-in">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-heading font-bold text-foreground text-sm">{order.orderCode}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {order.customerName} • {order.tableNumber === "Paket" ? "Paket" : `Masa ${order.tableNumber}`}
                      </p>
                    </div>
                    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-heading font-medium ${statusBadgeClasses[order.status]}`}>
                      <Icon className="w-3 h-3" />
                      {statusLabels[order.status]}
                    </span>
                  </div>
                  <div className="space-y-1 mb-3">
                    {order.items.map((ci: any) => (
                      <div key={ci.item.id} className="flex justify-between text-xs">
                        <span className="text-foreground">{ci.quantity}x {ci.item.name}</span>
                        <span className="text-muted-foreground">₺{ci.item.price * ci.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {order.paymentMethod === "online" ? "💳 Online" : "💵 Nakit"} • <span className="font-semibold text-foreground">₺{order.total}</span>
                    </span>
                    {next ? (
                      <button onClick={() => handleStatusUpdate(order.orderCode, next)}
                        className="gradient-warm text-primary-foreground text-xs font-heading font-medium px-3 py-1.5 rounded-lg hover:shadow-md hover:scale-105 active:scale-95 transition-all">
                        → {statusLabels[next]}
                      </button>
                    ) : (
                      <span className="text-primary font-heading font-medium text-xs flex items-center gap-1">
                        <PartyPopper className="w-3.5 h-3.5" /> Tamamlandı
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
