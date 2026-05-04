import { useState } from "react";
import { CreditCardPreview } from "./CreditCardPreview";
import { CardBrandIcon, detectBrand } from "./CardBrandIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const CardPayment = ({ amount }: { amount: number }) => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [installments, setInstallments] = useState(1);
  const [flipped, setFlipped] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");

  const handleNumber = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    setNumber((digits.match(/.{1,4}/g) || []).join(" "));
  };
  const handleExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    setExpiry(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
  };

  const valid =
    number.replace(/\s/g, "").length === 16 &&
    name.trim().length >= 3 &&
    expiry.length === 5 &&
    cvv.length >= 3;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      toast.error("Preencha todos os dados do cartão");
      return;
    }
    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
      toast.success("Pagamento aprovado!");
    }, 2200);
  };

  if (status === "success") {
    return (
      <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12 text-primary" strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Pagamento aprovado!</h3>
        <p className="text-muted-foreground">
          Você pagou <span className="font-semibold text-foreground">R$ {amount.toFixed(2).replace(".", ",")}</span> em {installments}x
        </p>
        <div className="text-xs text-muted-foreground font-mono pt-2">
          Transação #{Math.random().toString(36).slice(2, 10).toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5 animate-in fade-in duration-500">
      <CreditCardPreview number={number} name={name} expiry={expiry} cvv={cvv} flipped={flipped} />

      <div className="flex items-center gap-2 justify-center pt-1">
        <span className="text-xs text-muted-foreground">Aceitamos:</span>
        {(["visa", "mastercard", "elo", "amex", "hipercard"] as const).map((b) => (
          <CardBrandIcon key={b} brand={b} size="sm" />
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="cnum" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Número do cartão
          </Label>
          <div className="relative">
            <Input
              id="cnum"
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              value={number}
              onChange={(e) => handleNumber(e.target.value)}
              onFocus={() => setFlipped(false)}
              className="h-12 pr-14 font-mono tracking-wider text-base"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <CardBrandIcon brand={detectBrand(number)} size="md" />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cname" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Nome impresso no cartão
          </Label>
          <Input
            id="cname"
            placeholder="Como está no cartão"
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            onFocus={() => setFlipped(false)}
            className="h-12 uppercase tracking-wide"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="exp" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Validade
            </Label>
            <Input
              id="exp"
              inputMode="numeric"
              placeholder="MM/AA"
              value={expiry}
              onChange={(e) => handleExpiry(e.target.value)}
              onFocus={() => setFlipped(false)}
              className="h-12 font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cvv" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              CVV
            </Label>
            <Input
              id="cvv"
              inputMode="numeric"
              placeholder="123"
              maxLength={4}
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
              onFocus={() => setFlipped(true)}
              onBlur={() => setFlipped(false)}
              className="h-12 font-mono"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Parcelamento
          </Label>
          <select
            value={installments}
            onChange={(e) => setInstallments(Number(e.target.value))}
            className="w-full h-12 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const n = i + 1;
              const v = (amount / n).toFixed(2).replace(".", ",");
              return (
                <option key={n} value={n}>
                  {n}x de R$ {v} {n === 1 ? "(à vista)" : "sem juros"}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={status === "processing"}
        className="w-full h-14 text-base font-bold gradient-hero text-white hover:opacity-95 shadow-glow transition-smooth"
      >
        {status === "processing" ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4 mr-2" />
            Pagar R$ {amount.toFixed(2).replace(".", ",")}
          </>
        )}
      </Button>

      <p className="text-[11px] text-center text-muted-foreground">
        🔒 Seus dados são criptografados com padrão PCI-DSS
      </p>
    </form>
  );
};
