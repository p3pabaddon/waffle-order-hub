import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const ADMIN_PIN = "1234";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem("cafe-admin-auth", "true");
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setPin("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="glass rounded-3xl p-8 w-full max-w-sm animate-scale-in">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 gradient-warm rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-foreground">Personel Girişi</h1>
          <p className="text-muted-foreground text-sm mt-1">Yönetim paneline erişmek için PIN girin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPin ? "text" : "password"}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="PIN Kodu"
              maxLength={6}
              className={`w-full px-4 py-4 rounded-xl bg-muted border-2 text-foreground text-center text-2xl tracking-[0.5em] font-heading placeholder:text-muted-foreground placeholder:tracking-normal placeholder:text-base focus:outline-none transition-all ${
                error ? "border-destructive animate-shake" : "border-border focus:border-primary"
              }`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <p className="text-destructive text-sm text-center font-medium animate-fade-in">
              Yanlış PIN kodu. Tekrar deneyin.
            </p>
          )}

          <button
            type="submit"
            disabled={pin.length < 4}
            className="w-full gradient-warm text-primary-foreground font-heading font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40"
          >
            Giriş Yap
          </button>
        </form>

        <p className="text-muted-foreground text-xs text-center mt-6">
          Varsayılan PIN: 1234
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
