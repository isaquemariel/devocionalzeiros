import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { aulasAuth, SUPPORT_WHATSAPP_URL } from "@/lib/aulasAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, HelpCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import logoOfficial from "@/assets/logo-icon.png";
import bgDesktop from "@/assets/aulas-login-hero.png";
import bgMobile from "@/assets/aulas-login-bg-mobile.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const NO_ACCESS_WHATSAPP_URL =
  "https://wa.me/5584999488698?text=" +
  encodeURIComponent(
    "Olá! Não estou conseguindo acessar meu produto na Área de Membros. Pode me ajudar?"
  );


export default function AulasLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [noAccessOpen, setNoAccessOpen] = useState(false);
  const [noAccessEmail, setNoAccessEmail] = useState("");

  const startCooldown = (seconds: number) => {
    setResendCooldown(seconds);
    const interval = setInterval(() => {
      setResendCooldown((s) => {
        if (s <= 1) { clearInterval(interval); return 0; }
        return s - 1;
      });
    }, 1000);
  };

  const resendCode = async () => {
    if (resendCooldown > 0 || resending) return;
    setResending(true);
    try {
      await aulasAuth.requestOtp(email);
      toast.success("Novo código enviado! Verifique seu e-mail (e a caixa de spam).");
      setCode("");
      startCooldown(45);
    } catch (err: any) {
      if (err?.code === "no_access" || err?.status === 403) {
        setNoAccessEmail(email);
        setNoAccessOpen(true);
      } else {
        toast.error(err.message);
      }
    } finally { setResending(false); }
  };

  const requestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await aulasAuth.requestOtp(email);
      toast.success("Código enviado! Verifique seu e-mail.");
      setStep("code");
      startCooldown(45);
    } catch (err: any) {
      if (err?.code === "no_access" || err?.status === 403) {
        setNoAccessEmail(email);
        setNoAccessOpen(true);
      } else {
        toast.error(err.message);
      }
    } finally { setLoading(false); }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await aulasAuth.verifyOtp(email, code);
      toast.success("Entrou!");
      navigate("/aulas");
    } catch (err: any) {
      toast.error(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-white">
      <picture className="pointer-events-none absolute inset-0">
        <source media="(min-width: 768px)" srcSet={bgDesktop} />
        <img src={bgMobile} alt="" className="h-full w-full object-cover" />
      </picture>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-md">
        <div className="text-center">
          <img src={logoOfficial} alt="Devocionalzeiros" className="mx-auto mb-3 h-14 w-14 rounded-2xl object-contain" />
          <h1 className="font-montserrat text-2xl font-bold">Área de Membros</h1>
          <p className="mt-1 text-sm text-white/60">Acesse com o e-mail da sua compra</p>
        </div>

        {step === "email" ? (
          <form onSubmit={requestCode} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@dominio.com"
                className="mt-1.5 bg-white/5"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-amber-500 text-black hover:bg-amber-400">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Receber código"}
            </Button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="space-y-4">
            <p className="text-sm text-white/70">
              Enviamos um código para <span className="font-medium text-white">{email}</span>
            </p>
            <div>
              <Label htmlFor="code">Código (6 dígitos)</Label>
              <Input
                id="code" inputMode="numeric" pattern="\d{6}" maxLength={6} required value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="mt-1.5 bg-white/5 text-center font-mono text-2xl tracking-[0.5em]"
              />
            </div>
            <Button type="submit" disabled={loading || code.length !== 6} className="w-full bg-amber-500 text-black hover:bg-amber-400">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
            </Button>
            <div className="flex flex-col items-center gap-2 pt-1">
              <button
                type="button"
                onClick={resendCode}
                disabled={resending || resendCooldown > 0}
                className="text-xs font-medium text-amber-400 hover:text-amber-300 disabled:cursor-not-allowed disabled:text-white/30"
              >
                {resending
                  ? "Reenviando..."
                  : resendCooldown > 0
                    ? `Reenviar código em ${resendCooldown}s`
                    : "Não recebi o código — reenviar"}
              </button>
              <button type="button" onClick={() => { setStep("email"); setCode(""); }}
                className="text-xs text-white/50 hover:text-white">
                Voltar e usar outro e-mail
              </button>
            </div>
          </form>
        )}

        <div className="flex justify-center border-t border-white/10 pt-4">
          <a
            href={SUPPORT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/5 hover:text-white"
          >
            <HelpCircle className="h-4 w-4" />
            Preciso de Ajuda
          </a>
        </div>
      </div>

      <Dialog open={noAccessOpen} onOpenChange={setNoAccessOpen}>
        <DialogContent className="border-white/10 bg-zinc-950 text-white">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
              <AlertCircle className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center font-montserrat text-xl">
              Não estou conseguindo acessar meu produto
            </DialogTitle>
            <DialogDescription className="text-center text-white/70">
              Não encontramos uma compra ativa para{" "}
              <span className="font-medium text-white">{noAccessEmail}</span>.
              Pode ser que você tenha comprado com outro e-mail ou que o
              pagamento ainda não tenha sido confirmado. Fale com o nosso
              suporte para resolver agora.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              asChild
              className="w-full bg-amber-500 text-black hover:bg-amber-400"
            >
              <a
                href={NO_ACCESS_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com o suporte no WhatsApp
              </a>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setNoAccessOpen(false)}
              className="w-full text-white/70 hover:bg-white/5 hover:text-white"
            >
              Tentar com outro e-mail
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
