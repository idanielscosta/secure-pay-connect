import { useState } from "react";
import { PixPayment } from "@/components/payment/PixPayment";
import { CardPayment } from "@/components/payment/CardPayment";
import { BoletoPayment } from "@/components/payment/BoletoPayment";
import { Shield, Lock, ShoppingBag, Zap, CreditCard, FileText, ChevronDown } from "lucide-react";

type Method = "pix" | "card" | "boleto";

const PRODUCT = {
  name: "Plano Pro Anual",
  description: "Acesso completo por 12 meses",
  amount: 199.9,
  installments: "ou 12x de R$ 16,66 sem juros",
};

const methods: { id: Method; label: string; sub: string; icon: React.ReactNode; badge?: string }[] = [
  { id: "pix", label: "Pix", sub: "Instantâneo", icon: <Zap className="h-5 w-5" />, badge: "-5%" },
  { id: "card", label: "Cartão", sub: "Até 12x", icon: <CreditCard className="h-5 w-5" /> },
  { id: "boleto", label: "Boleto", sub: "3 dias", icon: <FileText className="h-5 w-5" /> },
];

const Index = () => {
  const [method, setMethod] = useState<Method>("pix");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const amount = method === "pix" ? PRODUCT.amount * 0.95 : PRODUCT.amount;

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* Decorative gradient background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, hsl(var(--primary) / 0.18), transparent 70%), radial-gradient(50% 40% at 0% 30%, hsl(var(--accent) / 0.15), transparent 70%)",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="container max-w-5xl px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl gradient-hero flex items-center justify-center font-bold text-white shadow-glow">
              P
            </div>
            <span
              className="font-bold text-base md:text-lg text-foreground"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              PagueAqui
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] md:text-sm bg-muted/60 px-2.5 py-1.5 rounded-full">
            <Lock className="h-3 w-3 md:h-3.5 md:w-3.5" />
            <span className="hidden xs:inline">Pagamento seguro</span>
            <span className="xs:hidden">Seguro</span>
          </div>
        </div>
      </header>

      <div className="container max-w-5xl px-3 md:px-6 py-4 md:py-10">
        <h1 className="sr-only">Finalize seu pagamento</h1>

        {/* MOBILE compact summary card (top) */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setSummaryOpen((o) => !o)}
            className="w-full bg-card rounded-2xl shadow-card border border-border p-4 flex items-center gap-3 text-left transition-smooth active:scale-[0.99]"
          >
            <div className="h-12 w-12 rounded-xl gradient-accent shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-md">
              P
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-muted-foreground uppercase tracking-wide">Você está pagando</div>
              <div className="font-semibold text-foreground text-sm truncate">{PRODUCT.name}</div>
            </div>
            <div className="text-right">
              <div
                className="text-lg font-bold text-foreground leading-none"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                R$ {amount.toFixed(2).replace(".", ",")}
              </div>
              <div className="text-[10px] text-muted-foreground mt-1 flex items-center justify-end gap-1">
                Detalhes <ChevronDown className={`h-3 w-3 transition-transform ${summaryOpen ? "rotate-180" : ""}`} />
              </div>
            </div>
          </button>

          {summaryOpen && (
            <div className="mt-2 bg-card rounded-2xl border border-border p-4 space-y-2 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
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
              <div className="flex justify-between font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span>R$ {amount.toFixed(2).replace(".", ",")}</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">
          {/* LEFT — Payment */}
          <section className="bg-card rounded-2xl md:rounded-3xl shadow-card p-4 sm:p-6 md:p-8 border border-border">
            <div className="mb-5 md:mb-6">
              <h2
                className="text-xl md:text-2xl font-bold text-foreground mb-1"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Como você quer pagar?
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                Escolha a forma que preferir abaixo
              </p>
            </div>

            {/* Method selector — modern segmented */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6 md:mb-8">
              {methods.map((m) => {
                const active = method === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`relative group p-2.5 sm:p-3 md:p-4 rounded-2xl border-2 text-left transition-smooth active:scale-95 ${
                      active
                        ? "border-primary bg-primary/5 shadow-glow"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    {m.badge && (
                      <span className="absolute -top-2 -right-2 gradient-accent text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-md">
                        {m.badge}
                      </span>
                    )}
                    <div
                      className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center mb-1.5 sm:mb-2 transition-smooth ${
                        active ? "gradient-hero text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {m.icon}
                    </div>
                    <div className="font-semibold text-xs sm:text-sm text-foreground">{m.label}</div>
                    <div className="text-[10px] sm:text-[11px] text-muted-foreground">{m.sub}</div>
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

          {/* RIGHT — Summary (desktop only) */}
          <aside className="hidden lg:block space-y-4">
            <div className="bg-card rounded-3xl shadow-card border border-border p-6 sticky top-24">
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
                  <div
                    className="text-2xl font-bold text-foreground"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
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

        {/* Mobile trust badges */}
        <div className="lg:hidden mt-4 grid grid-cols-2 gap-2">
          <div className="bg-card rounded-xl border border-border p-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary shrink-0" />
            <div className="text-[10px] font-semibold text-foreground leading-tight">
              Compra <br />protegida
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-3 flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary shrink-0" />
            <div className="text-[10px] font-semibold text-foreground leading-tight">
              Criptografia <br />PCI-DSS
            </div>
          </div>
        </div>

        <footer className="mt-8 md:mt-10 text-center text-[10px] md:text-xs text-muted-foreground px-4">
          © {new Date().getFullYear()} PagueAqui · Todos os pagamentos são processados em ambiente seguro
        </footer>
      </div>
    </main>
  );
};

export default Index;
