import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cafeLogo from "@/assets/cafe-logo.png";

const QRCodePage = () => {
  const navigate = useNavigate();
  const [tableCount, setTableCount] = useState(10);
  const baseUrl = window.location.origin;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - hidden on print */}
      <div className="glass-strong sticky top-0 z-40 px-4 py-4 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/admin")} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-heading font-bold text-xl text-foreground">QR Kod Oluşturucu</h1>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground font-heading">Masa Sayısı:</label>
          <input
            type="number"
            min={1}
            max={50}
            value={tableCount}
            onChange={(e) => setTableCount(Math.min(50, Math.max(1, Number(e.target.value))))}
            className="w-16 px-2 py-1.5 rounded-lg bg-muted border border-border text-foreground text-center font-heading text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button onClick={handlePrint} className="gradient-warm text-primary-foreground px-4 py-2 rounded-xl font-heading font-medium text-sm flex items-center gap-2 hover:shadow-md hover:scale-105 active:scale-95 transition-all">
            <Printer className="w-4 h-4" />
            Yazdır
          </button>
        </div>
      </div>

      {/* QR Cards */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 print:grid-cols-3 print:gap-2">
          {Array.from({ length: tableCount }, (_, i) => {
            const tableNum = i + 1;
            const qrUrl = `${baseUrl}/?table=${tableNum}`;
            return (
              <div key={tableNum} className="glass rounded-2xl p-5 flex flex-col items-center text-center card-hover print:break-inside-avoid print:rounded-lg print:p-3 print:shadow-none print:border print:border-border">
                <div className="bg-background rounded-xl p-3 mb-3">
                  <QRCodeSVG
                    value={qrUrl}
                    size={140}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: cafeLogo,
                      height: 28,
                      width: 28,
                      excavate: true,
                    }}
                  />
                </div>
                <h3 className="font-heading font-bold text-foreground text-lg">Masa {tableNum}</h3>
                <p className="text-muted-foreground text-xs mt-1">Menüyü görüntülemek için tarayın</p>
                <p className="text-primary font-heading font-semibold text-xs mt-2">🧇 Waffle Cafe</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
