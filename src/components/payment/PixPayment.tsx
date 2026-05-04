import { useState, useEffect } from "react";
import { Copy, Check, QrCode, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PIX_CODE =
  "00020126580014BR.GOV.BCB.PIX0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540199.905802BR5913PAGUE AQUI LTDA6009SAO PAULO62070503***6304A1B2";

export const PixPayment = ({ amount }: { amount: number }) => {
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(15 * 60);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const copy = async () => {
    await navigator.clipboard.writeText(PIX_CODE);
    setCopied(true);
    toast.success("Código Pix copiado!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full min-w-0">
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold text-foreground">Pague com Pix</h3>
        <p className="text-sm text-muted-foreground">
          Aponte a câmera do seu app do banco para o QR Code
        </p>
      </div>

      <div className="relative mx-auto w-fit">
        <div className="absolute inset-0 gradient-pix rounded-3xl blur-2xl opacity-30" />
        <div className="relative bg-white p-3 sm:p-5 rounded-3xl shadow-card border-2 border-primary/30">
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 grid grid-cols-[repeat(25,1fr)] grid-rows-[repeat(25,1fr)] gap-0">
            {Array.from({ length: 625 }).map((_, i) => {
              const row = Math.floor(i / 25);
              const col = i % 25;
              const corner =
                (row < 7 && col < 7) || (row < 7 && col > 17) || (row > 17 && col < 7);
              const seed = (row * 31 + col * 17 + row * col) % 7;
              const fill = corner ? false : seed < 3;
              return <div key={i} className={fill ? "bg-slate-900" : "bg-white"} />;
            })}
            {/* Position markers */}
            {[
              "top-0 left-0",
              "top-0 right-0",
              "bottom-0 left-0",
            ].map((pos) => (
              <div
                key={pos}
                className={`absolute ${pos} w-[28%] h-[28%] border-[6px] border-slate-900 rounded-lg flex items-center justify-center bg-white`}
              >
                <div className="w-[45%] h-[45%] bg-slate-900 rounded" />
              </div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <div className="gradient-pix p-2 rounded">
                  <QrCode className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/30 pulse-ring" />
          <div className="relative h-2 w-2 rounded-full bg-primary" />
        </div>
        <span className="text-muted-foreground">Aguardando pagamento</span>
        <span className="mx-1 text-border">•</span>
        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="font-mono font-semibold text-foreground">
          {mm}:{ss}
        </span>
      </div>

      <div className="space-y-2 w-full min-w-0">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Pix Copia e Cola
        </label>
        <div className="flex gap-2 w-full min-w-0">
          <div className="flex-1 min-w-0 bg-muted rounded-xl px-3 sm:px-4 py-3 font-mono text-[11px] sm:text-xs text-muted-foreground truncate border border-border">
            {PIX_CODE}
          </div>
          <Button
            onClick={copy}
            variant={copied ? "default" : "secondary"}
            className="shrink-0 h-auto transition-smooth"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Valor a pagar</span>
          <span className="font-bold text-lg text-primary">
            R$ {amount.toFixed(2).replace(".", ",")}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Confirmação em segundos após o pagamento</span>
        </div>
      </div>
    </div>
  );
};
