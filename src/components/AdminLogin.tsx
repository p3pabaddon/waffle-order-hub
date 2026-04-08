import { useState } from "react";
import { Lock, Eye, EyeOff, Mail, KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [mode, setMode] = useState<"pin" | "email">("pin");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke("verify-pin", {
        body: { pin },
      });
      if (fnError || !data?.valid) {
        setError("Yanlış PIN kodu. Tekrar deneyin.");
        setTimeout(() => setError(""), 2000);
        setPin("");
      } else {
        sessionStorage.setItem("cafe-admin-auth", "true");
        onLogin();
      }
    } catch {
      setError("Bir hata oluştu. Tekrar deneyin.");
    }
    setLoading(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        setError(authError.message === "Invalid login credentials" ? "Geçersiz e-posta veya şifre." : "Giriş başarısız.");
        setLoading(false);
        return;
      }
      if (data.user) {
        sessionStorage.setItem("cafe-admin-auth", "true");
        onLogin();
      }
    } catch {
      setError("Bir hata oluştu. Tekrar deneyin.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="glass rounded-3xl p-8 w-full max-w-sm animate-scale-in">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 gradient-warm rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-foreground">Personel Girişi</h1>
          <p className="text-muted-foreground text-sm mt-1">Yönetim paneline erişmek için giriş yapın</p>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setMode("pin"); setError(""); }}
            className={`flex-1 py-2.5 rounded-xl font-heading font-medium text-sm transition-all ${mode === "pin" ? "gradient-warm text-primary-foreground shadow-md" : "bg-muted text-muted-foreground"}`}
          >
            <KeyRound className="w-4 h-4 inline mr-1.5" />
            PIN ile Giriş
          </button>
          <button
            onClick={() => { setMode("email"); setError(""); }}
            className={`flex-1 py-2.5 rounded-xl font-heading font-medium text-sm transition-all ${mode === "email" ? "gradient-warm text-primary-foreground shadow-md" : "bg-muted text-muted-foreground"}`}
          >
            <Mail className="w-4 h-4 inline mr-1.5" />
            E-posta
          </button>
        </div>

        {mode === "pin" ? (
          <form onSubmit={handlePinSubmit} className="space-y-4">
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

            {error && <p className="text-destructive text-sm text-center font-medium animate-fade-in">{error}</p>}

            <button
              type="submit"
              disabled={pin.length < 4 || loading}
              className="w-full gradient-warm text-primary-foreground font-heading font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Doğrulanıyor...
                </span>
              ) : "Giriş Yap"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresi"
              className="w-full px-4 py-3.5 rounded-xl bg-muted border-2 border-border text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:border-primary transition-all"
              autoFocus
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre"
                className="w-full px-4 py-3.5 rounded-xl bg-muted border-2 border-border text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && <p className="text-destructive text-sm text-center font-medium animate-fade-in">{error}</p>}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full gradient-warm text-primary-foreground font-heading font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  İşleniyor...
                </span>
              ) : "Giriş Yap"}
            </button>
          </form>
        )}

        <p className="text-muted-foreground text-xs text-center mt-6">
          {mode === "pin" ? "Yönetici PIN kodunu girin" : "Personel e-postanız ile giriş yapın"}
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
