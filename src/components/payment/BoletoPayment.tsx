import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, FileText, Calendar, Download } from "lucide-react";
import { toast } from "sonner";

const BOLETO = "23793.39001 60083.123456 78901.234567 8 95470000019990";

export const BoletoPayment = ({ amount }: { amount: number }) => {
  const [copied, setCopied] = useState(false);
  const due = new Date();
  due.setDate(due.getDate() + 3);
  const dueStr = due.toLocaleDateString("pt-BR");

  const copy = async () => {
    await navigator.clipboard.writeText(BOLETO);
    setCopied(true);
    toast.success("Linha digitável copiada!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold text-foreground">Boleto Bancário</h3>
        <p className="text-sm text-muted-foreground">
          Pague em qualquer banco, lotérica ou app
        </p>
      </div>

      {/* Boleto preview */}
      <div className="bg-card border-2 border-dashed border-border rounded-2xl p-4 sm:p-5 space-y-4 shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg gradient-hero flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm text-foreground">PagueAqui</div>
              <div className="text-[10px] text-muted-foreground">Banco 237 — Bradesco</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {/* fake barcode */}
            <div className="flex h-7 gap-px">
              {Array.from({ length: 38 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-900"
                  style={{ width: i % 3 === 0 ? 3 : i % 5 === 0 ? 1 : 2 }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="text-muted-foreground uppercase text-[10px] tracking-wide">Vencimento</div>
            <div className="font-bold text-foreground flex items-center gap-1 mt-0.5">
              <Calendar className="h-3.5 w-3.5" />
              {dueStr}
            </div>
          </div>
          <div className="text-right">
            <div className="text-muted-foreground uppercase text-[10px] tracking-wide">Valor</div>
            <div className="font-bold text-primary text-base">
              R$ {amount.toFixed(2).replace(".", ",")}
            </div>
          </div>
        </div>

        <div>
          <div className="text-muted-foreground uppercase text-[10px] tracking-wide mb-1">
            Linha digitável
          </div>
          <div className="font-mono text-[11px] md:text-xs text-foreground break-all bg-muted rounded-lg p-3">
            {BOLETO}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button onClick={copy} variant={copied ? "default" : "secondary"} className="h-12 transition-smooth">
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied ? "Copiado" : "Copiar código"}
        </Button>
        <Button
          onClick={() => toast.info("Boleto gerado em PDF (simulação)")}
          variant="outline"
          className="h-12"
        >
          <Download className="h-4 w-4 mr-2" />
          Baixar PDF
        </Button>
      </div>

      <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 text-xs text-primary">
        ⚠️ A compensação do boleto leva até 3 dias úteis após o pagamento.
      </div>
    </div>
  );
};
