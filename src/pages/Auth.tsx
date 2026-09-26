import { useState, useEffect } from "react";
import { aplicarJornada } from "@/lib/jornada/aplicar";
import { lerRascunho } from "@/lib/jornada/motor";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Lock, Loader2, Eye, EyeOff, MessageCircle,
  BookOpen, Sword, Star, Heart,
  ChevronRight, X
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "@/lib/avisos";
import { z } from "zod";
import { MascotLoader } from "@/components/shared/FloatingMascot";
import TelaInicial from "@/components/inicio/TelaInicial";
import { FundoDoDia } from "@/components/inicio/FundoDoDia";
import { NomeDoApp } from "@/components/inicio/NomeDoApp";
import { PersonagemQueFala } from "@/components/inicio/PersonagemQueFala";

const emailSchema = z.string().email("Email inválido");
const passwordSchema = z.string()
  .min(8, "A senha deve ter pelo menos 8 caracteres")
  .regex(/[A-Za-z]/, "Inclua ao menos uma letra")
  .regex(/[0-9]/, "Inclua ao menos um número");

const CONFIRMATION_RESEND_COOLDOWN_MS = 60_000;
const CONFIRMATION_RESEND_STORAGE_KEY = "confirmation_resend_attempted_at";

const getRateLimitWaitSeconds = (message: string): number | null => {
  const match = message.match(/after\s+(\d+)\s+seconds?/i);
  return match ? Number(match[1]) : null;
};


// ─── Left panel (desktop only) ────────────────────────────────────────────────
const IdentityPanel = ({ registrar }: { registrar: boolean }) => {
  const features = [
    { icon: BookOpen, text: "Leitura bíblica diária" },
    { icon: Sword, text: "RPG Jornada Bíblica" },
    { icon: Star, text: "Quiz & conquistas" },
    { icon: Heart, text: "Devocionais personalizados" },
  ];
  return (
    <div className="relative h-full flex flex-col items-center justify-center px-8 lg:px-12 py-12 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center gap-5 max-w-xs">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <PersonagemQueFala tamanho={190} registrar={registrar} largura={320} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <h1 className="mb-2"><NomeDoApp tamanho="clamp(28px, 2.6vw, 40px)" /></h1>
          <p className="rpg-eyebrow" style={{ color: "#ffd889", textShadow: "0 1px 0 #0b0805, 0 0 8px rgba(0,0,0,.6)" }}>Sua jornada com a Palavra</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="space-y-2 w-full">
          {features.map(({ icon: Icon, text }, i) => (
            <motion.div key={text} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-[10px]" style={{ background: "rgba(28,21,9,0.82)", border: "2px solid #3a2c18" }}>
              <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: "#20180d", border: "1px solid #6e4e18" }}>
                <Icon className="w-3.5 h-3.5" style={{ color: "#e8b04b" }} />
              </div>
              <span className="text-[13px] text-left" style={{ color: "#ece0c6" }}>{text}</span>
              <ChevronRight className="w-3.5 h-3.5 ml-auto shrink-0" style={{ color: "#6e4e18" }} />
            </motion.div>
          ))}
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }} className="text-[12px] italic leading-relaxed px-3 py-2 rounded-[10px]" style={{ color: "#ece0c6", background: "rgba(20,15,8,0.72)", border: "1px solid #3a2c18" }}>
          “Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.”
          <span className="block mt-0.5 not-italic font-bold" style={{ color: "#e8b04b" }}>— Salmos 119:105</span>
        </motion.p>
      </div>
    </div>
  );
};


// ─── Input styles ──────────────────────────────────────────────────────────────
const inputBase =
  "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all placeholder:text-white/25 text-white " +
  "bg-white/[0.06] border border-white/10 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 focus:bg-white/[0.08]";
const inputErr = "border-red-500/50";

// ─── Submit button ─────────────────────────────────────────────────────────────
const SubmitButton = ({ isSubmitting, label, icon, loadingLabel }: {
  isSubmitting: boolean; label: string; icon: React.ReactNode; loadingLabel: string;
}) => (
  <button type="submit" disabled={isSubmitting} className="rpg-btn dz-brilho-auth w-full py-3 text-[13px] uppercase tracking-[0.12em] relative overflow-hidden">
    <span className="relative z-10 flex items-center justify-center gap-2">
      {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />{loadingLabel}</> : <>{icon}{label}</>}
    </span>
  </button>
);

const ESTILO_AUTH = `
@keyframes dz-brilho-auth { 0% { transform: translateX(-120%) skewX(-18deg) } 60%,100% { transform: translateX(260%) skewX(-18deg) } }
.dz-brilho-auth::after {
  content: ""; position: absolute; inset: 0 auto 0 0; width: 40%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent);
  animation: dz-brilho-auth 3.2s ease-in-out 1.4s infinite;
}
@media (prefers-reduced-motion: reduce) { .dz-brilho-auth::after { animation: none; display: none; } }
`;

// ─── Main component ────────────────────────────────────────────────────────────
/** `?entrar=1` pula o splash e abre o login (a jornada manda para cá quando o e-mail já tem conta). */
const querEntrarDireto = () => {
  try { return new URLSearchParams(window.location.search).get("entrar") === "1"; } catch { return false; }
};

const Auth = () => {
  const [showSplash, setShowSplash] = useState(() => !querEntrarDireto());
  const [isRecovery, setIsRecovery] = useState(false);
  const [isSettingNewPassword, setIsSettingNewPassword] = useState(false);
  // A jornada manda o e-mail pelo estado da navegação (nunca pela URL).
  const location = useLocation();
  const [email, setEmail] = useState(() => {
    const e = (location.state as { email?: unknown } | null)?.email;
    return typeof e === "string" && e.length <= 120 ? e : "";
  });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  // A tela de entrada é FIXA: numa tela baixa tudo aperta um pouco (e, bem
  // baixa, o personagem cede o lugar) para caber sem rolagem.
  const [alturaTela, setAlturaTela] = useState(() => window.innerHeight);
  useEffect(() => {
    const medir = () => setAlturaTela(window.innerHeight);
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);
  // o cadastro tem mais campos: aperta já numa tela de celular comum
  const compacto = alturaTela < 760;
  // no computador quem fala é o boneco do painel ao lado; no celular, o do alto
  const [desktop, setDesktop] = useState(() => window.matchMedia?.("(min-width: 1024px)").matches ?? false);
  useEffect(() => {
    const mq = window.matchMedia?.("(min-width: 1024px)");
    if (!mq) return;
    const mudar = () => setDesktop(mq.matches);
    mq.addEventListener?.("change", mudar);
    return () => mq.removeEventListener?.("change", mudar);
  }, []);
  const apertado = alturaTela < 620;
  const campo = compacto ? inputBase.replace("py-2.5", "py-2") : inputBase;
  const rotulo = `block text-xs font-semibold ${compacto ? "mb-1" : "mb-1.5"} text-white/60 uppercase tracking-wider`;

  const navigate = useNavigate();
  const { user, loading, signIn, resetPassword, updatePassword } = useAuth();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsSettingNewPassword(true);
        setIsRecovery(false);
        setShowSplash(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Pré-carrega a jornada enquanto o splash está na tela: o toque em "Começar
  // Jornada" não pode ficar esperando o download da página.
  useEffect(() => {
    if (!showSplash) return;
    const carregar = () => { void import("./Jornada"); };
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(carregar);
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(carregar, 1200);
    return () => window.clearTimeout(t);
  }, [showSplash]);

  // Redirect target after successful auth — supports ?redirect=/loja etc.
  const getRedirectTarget = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const r = params.get("redirect");
      if (r && r.startsWith("/")) return r;
      const pending = localStorage.getItem("post_signup_redirect");
      if (pending && pending.startsWith("/")) {
        localStorage.removeItem("post_signup_redirect");
        return pending;
      }
    } catch {}
    return "/home";
  };

  useEffect(() => {
    if (user && !loading && !isSettingNewPassword) {
      // Check if admin forced a password reset — if so, keep user on this screen
      (async () => {
        const { data } = await supabase
          .from("profiles")
          .select("must_change_password")
          .eq("user_id", user.id)
          .maybeSingle();
        if (data?.must_change_password) {
          setIsSettingNewPassword(true);
          setShowSplash(false);
          toast.info("Defina uma nova senha para continuar.");
        } else {
          // Rede de segurança da jornada: quem chegou à etapa da conta e entrou
          // por AQUI (link de confirmação, ou "Já tenho conta" no meio da
          // jornada) também leva as respostas. O retorno do Google fica de fora
          // de propósito — esse é da própria jornada, que mostra a celebração;
          // aplicar aqui apagaria o rascunho antes de ela o ler.
          const rascunho = lerRascunho();
          if (rascunho && !rascunho.aguardandoGoogle && ["salvar", "email", "senha"].includes(rascunho.etapa)) {
            await aplicarJornada(user.id, rascunho);
          }
          navigate(getRedirectTarget());
        }
      })();
    }
  }, [user, loading, navigate, isSettingNewPassword]);

  const validateForm = () => {
    const errs: Record<string, string | undefined> = {};
    if (isSettingNewPassword) {
      const r = passwordSchema.safeParse(newPassword);
      if (!r.success) errs.newPassword = r.error.errors[0].message;
      if (newPassword !== confirmPassword) errs.confirmPassword = "As senhas não coincidem";
      setErrors(errs);
      return Object.keys(errs).length === 0;
    }
    const er = emailSchema.safeParse(email);
    if (!er.success) errs.email = er.error.errors[0].message;
    if (!isRecovery && !password.trim()) errs.password = "Digite sua senha";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      if (isSettingNewPassword) {
        try {
          const { error } = await supabase.auth.updateUser({ password: newPassword });
          if (error) {
            const status = (error as any)?.status;
            const msg = (error as any)?.message ?? "";
            if (status === 422 || msg.toLowerCase().includes("different") || msg.toLowerCase().includes("same")) {
              toast.error("A nova senha deve ser diferente da senha atual.");
            } else if (status === 401 || msg.toLowerCase().includes("expired") || msg.toLowerCase().includes("invalid")) {
              toast.error("Link de recuperação expirado. Solicite um novo link de redefinição.");
            } else {
              toast.error("Erro ao atualizar senha. Tente novamente.");
            }
            return;
          }
          // Clear forced-reset flag if it was set by admin
          try {
            const { data: { user: u } } = await supabase.auth.getUser();
            if (u?.id) {
              await supabase
                .from("profiles")
                .update({ must_change_password: false })
                .eq("user_id", u.id);
            }
          } catch (_) {}
          toast.success("Senha alterada com sucesso!");
          setIsSettingNewPassword(false);
          setNewPassword(""); setConfirmPassword("");
          navigate(getRedirectTarget());
        } catch {
          toast.error("Erro ao atualizar senha. Tente novamente.");
        }
        return;
      }
      if (isRecovery) {
        const { error } = await resetPassword(email);
        if (error) { toast.error("Erro ao enviar email de recuperação."); return; }
        toast.success("Email de recuperação enviado!");
        setIsRecovery(false); setEmail("");
      } else {
        const { data, error } = await signIn(email, password);
        if (error) {
          const msg = (error.message ?? "").toLowerCase();
          const status = (error as any)?.status;
          if (msg.includes("invalid login credentials")) {
            toast.error("Não conseguimos entrar. Confira o email e a senha. Se você acabou de se cadastrar, confirme seu email pelo link que enviamos (veja também o spam). Esqueceu a senha? Use 'Esqueci minha senha'.", { duration: 9000 });
          } else if (msg.includes("email not confirmed") || msg.includes("email_not_confirmed")) {
            const now = Date.now();
            const previousAttempt = Number(sessionStorage.getItem(CONFIRMATION_RESEND_STORAGE_KEY) ?? 0);
            const cooldownRemaining = Math.ceil((CONFIRMATION_RESEND_COOLDOWN_MS - (now - previousAttempt)) / 1000);

            if (previousAttempt > 0 && cooldownRemaining > 0) {
              toast.error(`Confirme seu email antes de entrar. Aguarde ${cooldownRemaining}s para solicitar outro link e verifique a caixa de entrada e o spam.`, { duration: 10000 });
              return;
            }

            sessionStorage.setItem(CONFIRMATION_RESEND_STORAGE_KEY, String(now));
            try {
              const { error: resendError } = await supabase.auth.resend({ type: "signup", email: email.trim().toLowerCase(), options: { emailRedirectTo: `${window.location.origin}/` } });
              if (resendError) {
                const resendMessage = resendError.message ?? "";
                const waitSeconds = getRateLimitWaitSeconds(resendMessage);
                if (resendError.status === 429 || resendMessage.toLowerCase().includes("rate limit") || resendMessage.toLowerCase().includes("over_email_send_rate_limit")) {
                  toast.error(waitSeconds
                    ? `Confirme seu email antes de entrar. Aguarde ${waitSeconds}s para solicitar outro link.`
                    : "Confirme seu email antes de entrar. Aguarde um minuto para solicitar outro link.", { duration: 10000 });
                } else {
                  console.error("[confirmation resend] error", resendError);
                  toast.error("Confirme seu email antes de entrar. Não foi possível reenviar o link agora; tente novamente em instantes.");
                }
                return;
              }
              toast.error(`Confirme seu email antes de entrar. Reenviamos o link para ${email}. Verifique a caixa de entrada e o spam.`, { duration: 10000 });
            } catch {
              toast.error("Confirme seu email antes de entrar. Não foi possível reenviar o link agora; tente novamente em instantes.");
            }
          } else if (msg.includes("rate limit") || status === 429) {
            toast.error("Muitas tentativas de login. Aguarde alguns minutos e tente novamente.");
          } else {
            console.error("[login] error", error);
            toast.error("Erro ao fazer login. Tente novamente.");
          }
          return;
        }
        // as boas-vindas são da tela de DENTRO: entram na fila já, sobem quando
        // ela terminar de abrir (depois do carregamento), e o boneco pequeno
        // do canto só aparece quando elas descerem
        if (data?.session?.user) {
          toast.success("Bem-vindo de volta!", { naProximaTela: true });
          navigate(getRedirectTarget(), { replace: true });
        }
      }
    } catch {
      toast.error("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // Login com Google liberado em qualquer ambiente (navegador, PWA e app nativo).
    setIsGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.redirected) {
        // Navegador vai redirecionar para o Google. Não mostrar erro.
        return;
      }
      if (result.error) {
        console.error("Google OAuth error:", result.error);
        toast.error("Não foi possível entrar com Google. Tente novamente ou use email/senha.");
        setIsGoogleLoading(false);
        return;
      }
      // Sessão criada com sucesso
      navigate(getRedirectTarget(), { replace: true });
    } catch (err) {
      console.error("Google sign-in exception:", err);
      toast.error("Erro ao conectar com Google. Tente novamente.");
      setIsGoogleLoading(false);
    }
  };

  if (loading) return <MascotLoader />;

  const modeTitle = isSettingNewPassword ? "Nova senha"
    : isRecovery ? "Recuperar senha"
    : "Bem-vindo de volta";

  const modeSubtitle = isSettingNewPassword ? "Defina uma senha segura para sua conta"
    : isRecovery ? "Enviaremos um link para o seu email"
    : "Entre para continuar sua jornada";

  return (
    <div className="h-[100dvh] overflow-hidden">
    <AnimatePresence mode="wait">
      {showSplash && !isSettingNewPassword ? (
        /* ── SPLASH ── */
        <motion.div key="splash" initial={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
          {loading || user ? (
            // já tem sessão (voltou do Google, ou abriu o app logado): vai para
            // dentro — sem a tela inicial piscar com o personagem no meio
            <div className="relative h-[100dvh] overflow-hidden"><FundoDoDia veu="rgba(6,8,16,0.25)" /></div>
          ) : (
          <TelaInicial
            onSignup={() => navigate("/jornada")}
            onLogin={() => setShowSplash(false)}
          />
          )}
        </motion.div>
      ) : (
        /* ── FORM PAGE ── */
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="rpg-root relative h-[100dvh] flex overflow-hidden"
          style={{ background: "#040810" }}
        >
          <style>{ESTILO_AUTH}</style>
          {/* a mesma Jerusalém da tela inicial, na hora de agora — sem véu que
              escureça o dia: de dia é dia, de noite é noite. Só as sombras no
              alto e embaixo, como na tela inicial, para o texto ler. */}
          <FundoDoDia veu="linear-gradient(180deg, rgba(6,8,16,0.32) 0%, rgba(6,8,16,0) 30%, rgba(6,8,16,0) 70%, rgba(6,8,14,0.3) 100%)" />
          {/* Desktop left panel */}
          <div className="hidden lg:block lg:w-[46%] xl:w-[44%] shrink-0 relative">
            <IdentityPanel registrar={desktop} />
          </div>

          {/* Right / full panel */}
          <div className="flex-1 relative h-full overflow-hidden">
            {/* ── X button — top-right corner ── */}
            {!isSettingNewPassword && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setShowSplash(true)}
                className="absolute right-3 z-30 w-9 h-9 rounded-full flex items-center justify-center text-[#ece0c6] hover:text-white transition-all"
                style={{ top: "max(12px, env(safe-area-inset-top))", background: "rgba(12,10,6,0.55)", border: "1px solid #3a2c18" }}
                aria-label="Voltar"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}

            {/* ── uma tela fixa: tudo cabe, centrado na altura. A rolagem só existe
                como último recurso (teclado aberto num celular baixo). ── */}
            <div
              className="relative z-10 h-full overflow-y-auto overscroll-none flex flex-col items-center"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
              <div className={`w-full max-w-md min-h-full px-5 flex flex-col items-center justify-center [&>*]:shrink-0 ${compacto ? "gap-2.5 py-3" : "gap-3.5 py-5"}`}
                style={{ paddingTop: "max(14px, env(safe-area-inset-top))", paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>

                {/* ele recebe quem chega (no computador, ele já está no painel ao lado;
                    no cadastro, que tem mais campos, ele cede o espaço) */}
                {!apertado && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative lg:hidden"
                  >
                    <PersonagemQueFala tamanho={compacto ? 78 : 112} registrar={!desktop} largura={Math.min(340, window.innerWidth - 40)} />
                  </motion.div>
                )}

                {/* Mode header — splash-style lettering */}
                <motion.div
                  key={modeTitle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 }}
                  className="text-center"
                >
                  {isRecovery || isSettingNewPassword ? (
                    <>
                      <h2 className="rpg-title text-2xl mb-1">{modeTitle}</h2>
                      <p className="text-[12.5px]" style={{ color: "#ece0c6", textShadow: "0 1px 2px #000" }}>{modeSubtitle}</p>
                    </>
                  ) : (
                    <>
                      <p className="rpg-eyebrow mb-2" style={{ color: "#ffd889", textShadow: "0 1px 0 #0b0805" }}>Seja bem-vindo(a)</p>
                      <h2 className="leading-none">
                        <NomeDoApp tamanho={compacto ? "clamp(22px, 7.4vw, 30px)" : "clamp(24px, 8vw, 34px)"} />
                      </h2>
                      <p className="text-[12px] mt-2" style={{ color: "#ece0c6", textShadow: "0 1px 2px #000" }}>{modeSubtitle}</p>
                    </>
                  )}
                </motion.div>

                {/* Form card */}
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.12, type: "spring", stiffness: 180, damping: 22 }}
                  className="relative rounded-2xl overflow-hidden w-full"
                  style={{
                    background: "linear-gradient(rgba(43,33,20,0.9), rgba(20,16,10,0.94))",
                    border: "2px solid #3a2c18",
                    boxShadow: "0 24px 60px -24px #000, inset 0 1px 0 #4a3820",
                  }}
                >

                  <div className={compacto ? "p-4" : "p-5"}>
                    <form onSubmit={handleSubmit} className={compacto ? "space-y-2.5" : "space-y-3.5"}>

                      {/* NEW PASSWORD MODE */}
                      {isSettingNewPassword ? (
                        <AnimatePresence>
                          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3.5">
                            <div>
                              <label className={rotulo}>Nova senha</label>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={`${campo} pr-10 ${errors.newPassword ? inputErr : ""}`} placeholder="Mínimo 8 caracteres" disabled={isSubmitting} />
                                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                              {errors.newPassword && <p className="text-xs text-red-400 mt-1">{errors.newPassword}</p>}
                            </div>
                            <div>
                              <label className={rotulo}>Confirmar senha</label>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${campo} pr-10 ${errors.confirmPassword ? inputErr : ""}`} placeholder="Repita a nova senha" disabled={isSubmitting} />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                              {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword}</p>}
                            </div>
                            <SubmitButton isSubmitting={isSubmitting} label="Salvar nova senha" icon={<Lock className="w-4 h-4" />} loadingLabel="Salvando..." />
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <>
                          {/* Email */}
                          <div>
                            <label className={rotulo}>Email</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                              <input type="email" inputMode="email" autoCapitalize="none" autoCorrect="off" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)} className={`${campo} ${errors.email ? inputErr : ""}`} placeholder="seu@email.com" disabled={isSubmitting} autoComplete="email" />
                            </div>
                            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                          </div>

                          {/* Password */}
                          {!isRecovery && (
                            <div>
                              <label className={rotulo}>Senha</label>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`${campo} pr-10 ${errors.password ? inputErr : ""}`} placeholder="••••••••" disabled={isSubmitting} autoComplete="current-password" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
                            </div>
                          )}

                          <SubmitButton isSubmitting={isSubmitting} label={isRecovery ? "Enviar email" : "Entrar"} icon={<BookOpen className="w-4 h-4" />} loadingLabel={isRecovery ? "Enviando..." : "Entrando..."} />

                          {!isRecovery && (
                            <button type="button" onClick={() => { setIsRecovery(true); setErrors({}); }} className="w-full text-xs text-white/30 hover:text-amber-400/70 transition-colors" disabled={isSubmitting}>
                              Esqueceu sua senha?
                            </button>
                          )}
                        </>
                      )}
                    </form>
                  </div>

                  {/* Bottom section */}
                  {!isSettingNewPassword && (
                    <div className={`border-t border-white/[0.06] ${compacto ? "px-4 pb-3.5 pt-3 space-y-2.5" : "px-5 pb-5 pt-4 space-y-3"}`}>
                      <p className="text-center text-sm text-white/40">
                        {isRecovery ? "Lembrou a senha?" : "Não tem uma conta?"}{" "}
                        {/* conta nova só nasce na jornada de boas-vindas: não há mais
                            formulário de cadastro aqui */}
                        <button onClick={() => { if (isRecovery) { setIsRecovery(false); setErrors({}); } else navigate("/jornada"); }} className="font-bold text-amber-400 hover:text-amber-300 transition-colors" disabled={isSubmitting}>
                          {isRecovery ? "Voltar ao login" : "Cadastre-se"}
                        </button>
                      </p>
                      {!isRecovery && (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-white/[0.07]" />
                            <span className="text-xs text-white/20 uppercase tracking-wider">ou</span>
                            <div className="flex-1 h-px bg-white/[0.07]" />
                          </div>
                          <motion.button type="button" onClick={handleGoogleSignIn} disabled={isSubmitting || isGoogleLoading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                            className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-sm font-medium transition-all text-white/50 hover:text-white/80 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/[0.14] disabled:opacity-40">
                            {isGoogleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                              <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                              </svg>
                            )}
                            <span>{isGoogleLoading ? "Conectando..." : "Continuar com Google"}</span>
                          </motion.button>
                        </>
                      )}
                      <div className="text-center">
                        <motion.button onClick={() => window.open("https://wa.me/+5584999488698?text=Oii%2C%20equipe.%20Preciso%20de%20suporte.%20", "_blank")} className="inline-flex items-center gap-1.5 text-[11px] text-white/20 hover:text-white/40 transition-colors" whileHover={{ scale: 1.02 }}>
                          <MessageCircle className="w-3 h-3" />
                          Problemas de acesso?
                        </motion.button>
                      </div>
                    </div>
                  )}
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
};

export default Auth;
