import { useState } from "react";
import { PixPayment } from "@/components/payment/PixPayment";
import { CardPayment } from "@/components/payment/CardPayment";
import { BoletoPayment } from "@/components/payment/BoletoPayment";
import { Shield, Lock, ShoppingBag, Zap, CreditCard, FileText } from "lucide-react";

type Method = "pix" | "card" | "boleto";

const PRODUCT = {
  name: "Plano Pro Anual",
  description: "Acesso completo por 12 meses",
  amount: 199.9,
  installments: "ou 12x de R$ 16,66 sem juros",
};

const methods: { id: Method; label: string; sub: string; icon: React.ReactNode; badge?: string }[] = [
  { id: "pix", label: "Pix", sub: "Aprovação instantânea", icon: <Zap className="h-5 w-5" />, badge: "5% off" },
  { id: "card", label: "Cartão", sub: "Crédito em até 12x", icon: <CreditCard className="h-5 w-5" /> },
  { id: "boleto", label: "Boleto", sub: "Vence em 3 dias", icon: <FileText className="h-5 w-5" /> },
];

const Index = () => {
  const [method, setMethod] = useState<Method>("pix");
  const amount = method === "pix" ? PRODUCT.amount * 0.95 : PRODUCT.amount;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero">
        <div className="container max-w-5xl py-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <div className="h-9 w-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center font-bold">
              P
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              PagueAqui
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/90 text-xs md:text-sm">
            <Lock className="h-3.5 w-3.5" />
            <span>Pagamento seguro</span>
          </div>
        </div>
      </header>

      <div className="container max-w-5xl py-8 md:py-12">
        <h1 className="sr-only">Finalize seu pagamento</h1>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">
          {/* LEFT — Payment */}
          <section className="bg-card rounded-3xl shadow-card p-6 md:p-8 border border-border">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Como você quer pagar?
              </h2>
              <p className="text-sm text-muted-foreground">Escolha a forma que preferir abaixo</p>
            </div>

            {/* Method selector */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-8">
              {methods.map((m) => {
                const active = method === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`relative group p-3 md:p-4 rounded-2xl border-2 text-left transition-smooth ${
                      active
                        ? "border-primary bg-primary/5 shadow-glow"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    {m.badge && (
                      <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                        {m.badge}
                      </span>
                    )}
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center mb-2 transition-smooth ${
                        active ? "gradient-hero text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {m.icon}
                    </div>
                    <div className="font-semibold text-sm text-foreground">{m.label}</div>
                    <div className="text-[11px] text-muted-foreground hidden md:block">{m.sub}</div>
                  </button>
                );
              })}
            </div>

            <div key={method}>
              {method === "pix" && <PixPayment amount={amount} />}
              {method === "card" && <CardPayment amount={amount} />}
              {method === "boleto" && <BoletoPayment amount={amount} />}
            </div>
          </section>

          {/* RIGHT — Summary */}
          <aside className="space-y-4">
            <div className="bg-card rounded-3xl shadow-card border border-border p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Resumo do pedido
                </span>
              </div>

              <div className="flex gap-3 pb-4 border-b border-border">
                <div className="h-16 w-16 rounded-xl gradient-accent shrink-0 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                  P
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground">{PRODUCT.name}</div>
                  <div className="text-xs text-muted-foreground">{PRODUCT.description}</div>
                  <div className="text-sm font-bold text-foreground mt-1">
                    R$ {PRODUCT.amount.toFixed(2).replace(".", ",")}
                  </div>
                </div>
              </div>

              <div className="space-y-2 py-4 text-sm border-b border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>R$ {PRODUCT.amount.toFixed(2).replace(".", ",")}</span>
                </div>
                {method === "pix" && (
                  <div className="flex justify-between text-primary font-medium">
                    <span>Desconto Pix (5%)</span>
                    <span>− R$ {(PRODUCT.amount * 0.05).toFixed(2).replace(".", ",")}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxas</span>
                  <span>Grátis</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-4">
                <span className="text-sm text-muted-foreground">Total</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    R$ {amount.toFixed(2).replace(".", ",")}
                  </div>
                  {method === "card" && (
                    <div className="text-[11px] text-muted-foreground">{PRODUCT.installments}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-foreground">Compra protegida</div>
                  <div className="text-[11px] text-muted-foreground">
                    Reembolso garantido em até 7 dias
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-foreground">Criptografia ponta a ponta</div>
                  <div className="text-[11px] text-muted-foreground">
                    Padrão bancário PCI-DSS Level 1
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} PagueAqui · Todos os pagamentos são processados em ambiente seguro
        </footer>
      </div>
    </main>
  );
};

export default Index;
