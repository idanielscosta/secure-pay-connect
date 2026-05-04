import { useState } from "react";
import { Lock, Shield, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface NavbarProps {
  amount: number;
  productName: string;
  productDescription: string;
  onUpdate: (data: { amount: number; name: string; description: string }) => void;
}

const ADMIN_PASSWORD = "admin123";

export const Navbar = ({ amount, productName, productDescription, onUpdate }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [draftAmount, setDraftAmount] = useState(amount.toFixed(2));
  const [draftName, setDraftName] = useState(productName);
  const [draftDesc, setDraftDesc] = useState(productDescription);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setDraftAmount(amount.toFixed(2));
      setDraftName(productName);
      setDraftDesc(productDescription);
    } else {
      toast.error("Senha incorreta");
    }
  };

  const handleSave = () => {
    const parsed = parseFloat(draftAmount.replace(",", "."));
    if (isNaN(parsed) || parsed <= 0) {
      toast.error("Valor inválido");
      return;
    }
    onUpdate({ amount: parsed, name: draftName.trim() || "Produto", description: draftDesc });
    toast.success("Link de pagamento atualizado!");
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="container max-w-5xl px-4 py-3 md:py-4 flex items-center justify-between gap-2">
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

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground text-xs bg-muted/60 px-2.5 py-1.5 rounded-full">
            <Lock className="h-3.5 w-3.5" />
            <span>Pagamento seguro</span>
          </div>

          <Dialog
            open={open}
            onOpenChange={(o) => {
              setOpen(o);
              if (!o) {
                setAuthed(false);
                setPassword("");
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1.5 rounded-full border-primary/30 hover:border-primary hover:bg-primary/5"
              >
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="font-semibold">Admin</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              {!authed ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Acesso administrativo
                    </DialogTitle>
                    <DialogDescription>
                      Digite a senha para editar o link de pagamento.
                      <br />
                      <span className="text-[11px] text-muted-foreground">
                        (demo: <code className="font-mono">admin123</code>)
                      </span>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2 py-2">
                    <Label htmlFor="pwd">Senha</Label>
                    <Input
                      id="pwd"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      placeholder="••••••••"
                      autoFocus
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleLogin} className="w-full">
                      Entrar
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Editar link de pagamento
                    </DialogTitle>
                    <DialogDescription>
                      Atualize as informações cobradas neste link.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="pname">Nome do produto</Label>
                      <Input
                        id="pname"
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pdesc">Descrição</Label>
                      <Input
                        id="pdesc"
                        value={draftDesc}
                        onChange={(e) => setDraftDesc(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pamount">Valor (R$)</Label>
                      <Input
                        id="pamount"
                        inputMode="decimal"
                        value={draftAmount}
                        onChange={(e) => setDraftAmount(e.target.value.replace(/[^\d.,]/g, ""))}
                        className="font-mono text-base"
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Use ponto ou vírgula como separador decimal
                      </p>
                    </div>
                  </div>
                  <DialogFooter className="gap-2 sm:gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
                      Cancelar
                    </Button>
                    <Button onClick={handleSave} className="flex-1 gradient-hero text-white">
                      Salvar
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};
