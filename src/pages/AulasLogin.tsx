import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { aulasAuth, SUPPORT_WHATSAPP_URL } from "@/lib/aulasAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LifeBuoy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import logoOfficial from "@/assets/logo-icon.png";

export default function AulasLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const requestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await aulasAuth.requestOtp(email);
      toast.success("Código enviado! Verifique seu e-mail.");
      setStep("code");
    } catch (err: any) {
      toast.error(err.message);
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
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-white/5 p-8">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-2xl font-black text-black">
            D
          </div>
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
            <button type="button" onClick={() => { setStep("email"); setCode(""); }}
              className="block w-full text-center text-xs text-white/50 hover:text-white">
              Voltar e usar outro e-mail
            </button>
          </form>
        )}

        <div className="border-t border-white/10 pt-4">
          <a
            href={SUPPORT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-500"
          >
            <MessageCircle className="h-4 w-4" />
            Suporte via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
