import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Trash2, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Exclusao() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "confirm" | "loading" | "success">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Por favor, informe seu e-mail.");
      return;
    }
    setStep("confirm");
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.error("Por favor, informe sua senha para confirmar.");
      return;
    }

    setIsLoading(true);
    setStep("loading");

    try {
      // Sign in with provided credentials
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (signInError || !signInData.session) {
        toast.error("E-mail ou senha incorretos. Verifique e tente novamente.");
        setStep("confirm");
        setIsLoading(false);
        return;
      }

      // Call delete-account edge function
      const { error: deleteError } = await supabase.functions.invoke("delete-account", {
        headers: {
          Authorization: `Bearer ${signInData.session.access_token}`,
        },
      });

      if (deleteError) {
        toast.error("Erro ao excluir conta. Tente novamente.");
        setStep("confirm");
        setIsLoading(false);
        return;
      }

      // Sign out locally
      await supabase.auth.signOut();
      setStep("success");
    } catch (error) {
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
      setStep("confirm");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <Trash2 className="w-8 h-8 text-destructive" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Excluir Conta</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Devocionalzeiros
          </p>
        </div>

        {/* Step: email */}
        {step === "email" && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-6 p-4 bg-destructive/5 border border-destructive/20 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
              <div className="text-sm text-foreground">
                <p className="font-semibold mb-1">Esta ação é irreversível</p>
                <p className="text-muted-foreground leading-relaxed">
                  Ao excluir sua conta, todos os seus dados serão permanentemente apagados, incluindo progresso de leitura, pontos, conquistas e histórico de devocionais.
                </p>
              </div>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Seu e-mail cadastrado</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <Button type="submit" variant="destructive" className="w-full">
                Continuar com a exclusão
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancelar e voltar
              </Button>
            </form>
          </div>
        )}

        {/* Step: confirm */}
        {step === "confirm" && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Solicitação para:</p>
            <p className="font-semibold text-foreground mb-5">{email}</p>

            <div className="flex items-start gap-3 mb-6 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Confirme sua senha para prosseguir com a <strong className="text-foreground">exclusão permanente</strong> de todos os seus dados.
              </p>
            </div>

            <form onSubmit={handleDelete} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha da conta</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" variant="destructive" className="w-full gap-2">
                <Trash2 className="w-4 h-4" />
                Sim, excluir minha conta definitivamente
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep("email")}
              >
                Voltar
              </Button>
            </form>
          </div>
        )}

        {/* Step: loading */}
        {step === "loading" && (
          <div className="bg-card border border-border rounded-2xl p-10 shadow-sm flex flex-col items-center gap-4 text-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="font-semibold text-foreground">Excluindo sua conta...</p>
            <p className="text-sm text-muted-foreground">Removendo todos os dados. Aguarde.</p>
          </div>
        )}

        {/* Step: success */}
        {step === "success" && (
          <div className="bg-card border border-border rounded-2xl p-10 shadow-sm flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="font-bold text-xl text-foreground">Conta excluída</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Todos os seus dados foram removidos permanentemente. Sentiremos sua falta! 🙏
            </p>
            <Button
              onClick={() => navigate("/auth")}
              className="mt-2 w-full"
            >
              Ir para o login
            </Button>
          </div>
        )}

        {/* Footer links */}
        {step === "email" && (
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Tem dúvidas?{" "}
            <a
              href="mailto:devocionalzeiros@gmail.com"
              className="underline hover:text-foreground transition-colors"
            >
              devocionalzeiros@gmail.com
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
