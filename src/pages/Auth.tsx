import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Lock, User, Loader2, Eye, EyeOff, MessageCircle,
  Phone, Sparkles, BookOpen, Sword, Shield, Star, Scroll,
  ChevronRight, Heart
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { z } from "zod";
import logoOfficial from "@/assets/logo-icon.png";

const emailSchema = z.string().email("Email inválido");
const passwordSchema = z.string().min(6, "Senha deve ter pelo menos 6 caracteres");
const nameSchema = z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo");
const phoneSchema = z.string().min(10, "Número inválido").max(15, "Número inválido");

const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

// ─── Animated particles / embers ───────────────────────────────────────────
const Particle = ({ delay, left, size, isGold }: { delay: number; left: string; size: number; isGold: boolean }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left,
      bottom: "-4px",
      width: size,
      height: size,
      background: isGold ? "rgba(251,191,36,0.95)" : "rgba(245,158,11,0.7)",
      boxShadow: isGold ? "0 0 6px 2px rgba(251,191,36,0.5)" : "none",
    }}
    animate={{
      y: [0, -700],
      opacity: [0, 1, 0.8, 0],
      x: [0, (Math.random() > 0.5 ? 25 : -25)],
    }}
    transition={{ duration: 9 + delay * 0.4, delay, repeat: Infinity, ease: "easeIn" }}
  />
);

// ─── Floating RPG icon ──────────────────────────────────────────────────────
const FloatingIcon = ({ Icon, left, delay, size, opacity }: { Icon: React.ElementType; left: string; delay: number; size: number; opacity: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left, bottom: "-60px", opacity }}
    animate={{ y: [0, -900], opacity: [0, opacity, opacity * 0.8, 0] }}
    transition={{ duration: 20 + delay, delay, repeat: Infinity, ease: "linear" }}
  >
    <Icon style={{ width: size, height: size, color: "#f59e0b" }} />
  </motion.div>
);

// ─── Pulsing top torch glow ─────────────────────────────────────────────────
const TorchGlow = () => (
  <motion.div
    className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
    style={{ width: 600, height: 340, background: "radial-gradient(ellipse, rgba(217,119,6,0.3) 0%, transparent 70%)" }}
    animate={{ opacity: [0.5, 1, 0.5], scaleX: [1, 1.1, 1] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
  />
);

// ─── Left panel animated identity ──────────────────────────────────────────
const IdentityPanel = () => {
  const features = [
    { icon: BookOpen, text: "Leitura bíblica diária" },
    { icon: Sword, text: "RPG Jornada Bíblica" },
    { icon: Star, text: "Quiz & conquistas" },
    { icon: Heart, text: "Devocionais personalizados" },
  ];

  return (
    <div className="relative h-full flex flex-col items-center justify-center px-8 lg:px-12 py-12 overflow-hidden text-white">
      {/* BG layers */}
      <div className="absolute inset-0 bg-[#040810]" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(120,70,10,0.5) 0%, transparent 65%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 10% 100%, rgba(20,50,100,0.35) 0%, transparent 60%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 45% at 90% 80%, rgba(70,10,90,0.25) 0%, transparent 60%)" }} />
      <TorchGlow />

      {/* Particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <Particle key={i} delay={i * 0.5} left={`${(i / 18) * 100}%`} size={i % 3 === 0 ? 2 : 1} isGold={i % 4 === 0} />
      ))}
      {[Sword, Shield, Star, Scroll, BookOpen].map((Icon, i) => (
        <FloatingIcon key={i} Icon={Icon} left={`${10 + i * 17}%`} delay={i * 2.5} size={26 + (i % 2) * 14} opacity={0.05 + (i % 3) * 0.015} />
      ))}

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(217,119,6,0.2), rgba(245,158,11,0.4), rgba(217,119,6,0.2), transparent)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-xs">
        {/* Logo orb */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 180 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)", transform: "scale(1.8)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-amber-800/80 to-amber-950 flex items-center justify-center border-2 border-amber-500/40 shadow-2xl shadow-amber-500/30">
            <img src={logoOfficial} alt="Devocionalzeiros" className="w-18 h-18 object-contain drop-shadow-xl" style={{ width: 72, height: 72 }} />
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2"
            style={{ background: "linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Devocionalzeiros
          </h1>
          <p className="text-amber-200/50 text-sm font-medium tracking-widest uppercase">
            Sua jornada com a Palavra
          </p>
        </motion.div>

        {/* Feature list */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="space-y-2.5 w-full">
          {features.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-amber-500/10 bg-white/[0.04] backdrop-blur-sm"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-sm text-amber-100/80 text-left">{text}</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-500/40 ml-auto shrink-0" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bible verse */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-xs text-amber-200/35 italic leading-relaxed px-2"
        >
          "Lâmpada para os meus pés é a tua palavra e luz para os meus caminhos."
          <span className="block mt-0.5 not-italic font-semibold text-amber-400/50">— Salmos 119:105</span>
        </motion.p>
      </div>
    </div>
  );
};

// ─── Common country codes ───────────────────────────────────────────────────
const countryCodes = [
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+351", country: "PT", flag: "🇵🇹" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+54", country: "AR", flag: "🇦🇷" },
  { code: "+56", country: "CL", flag: "🇨🇱" },
  { code: "+57", country: "CO", flag: "🇨🇴" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+595", country: "PY", flag: "🇵🇾" },
  { code: "+598", country: "UY", flag: "🇺🇾" },
];

// ─── Shared input styles ────────────────────────────────────────────────────
const inputBase =
  "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all placeholder:text-white/25 text-white " +
  "bg-white/[0.06] border border-white/10 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 focus:bg-white/[0.08]";

const inputErr = "border-red-500/50";

// ─── Main component ─────────────────────────────────────────────────────────
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRecovery, setIsRecovery] = useState(false);
  const [isSettingNewPassword, setIsSettingNewPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+55");
  const [referralSource, setReferralSource] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isReady, setIsReady] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const { user, loading, signIn, signUp, resetPassword, updatePassword } = useAuth();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsSettingNewPassword(true);
        setIsLogin(true);
        setIsRecovery(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user && !loading && !isSettingNewPassword) navigate("/home");
  }, [user, loading, navigate, isSettingNewPassword]);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 80);
    return () => clearTimeout(t);
  }, []);

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

    if (!isRecovery) {
      const pr = passwordSchema.safeParse(password);
      if (!pr.success) errs.password = pr.error.errors[0].message;

      if (!isLogin) {
        const nr = nameSchema.safeParse(fullName);
        if (!nr.success) errs.name = nr.error.errors[0].message;
        const cleanPhone = whatsappNumber.replace(/\D/g, "");
        if (!cleanPhone) {
          errs.phone = "WhatsApp é obrigatório";
        } else {
          const phr = phoneSchema.safeParse(cleanPhone);
          if (!phr.success) errs.phone = phr.error.errors[0].message;
        }
        if (!referralSource) errs.referral = "Selecione como nos conheceu";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsappNumber(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      if (isSettingNewPassword) {
        const { error } = await updatePassword(newPassword);
        if (error) { toast.error("Erro ao atualizar senha. Tente novamente."); return; }
        toast.success("Senha alterada com sucesso!");
        setIsSettingNewPassword(false);
        setNewPassword(""); setConfirmPassword("");
        navigate("/home");
        return;
      }

      if (isRecovery) {
        const { error } = await resetPassword(email);
        if (error) { toast.error("Erro ao enviar email de recuperação."); return; }
        toast.success("Email de recuperação enviado!");
        setIsRecovery(false); setEmail("");
      } else if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message.includes("Invalid login credentials") ? "Email ou senha incorretos" : "Erro ao fazer login.");
          return;
        }
        toast.success("Bem-vindo de volta!");
      } else {
        const { error, data } = await signUp(email, password, fullName);
        if (error) {
          toast.error(error.message.includes("already registered") ? "Este email já está cadastrado" : "Erro ao criar conta.");
          return;
        }
        if (data?.user?.id) {
          const cleanPhone = whatsappNumber.replace(/\D/g, "");
          await supabase.from("profiles").update({
            whatsapp_phone: `${countryCode.replace("+", "")}${cleanPhone}`,
            referral_source: referralSource,
          }).eq("user_id", data.user.id);
        }
        toast.success("Conta criada com sucesso!");
      }
    } catch {
      toast.error("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
      if (error) { toast.error("Erro ao entrar com Google."); console.error(error); }
    } catch (err) {
      toast.error("Erro ao conectar com Google."); console.error(err);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040810] flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
            <BookOpen className="w-9 h-9 text-amber-400" />
          </motion.div>
          <p className="text-amber-200/50 text-sm">Carregando...</p>
        </motion.div>
      </div>
    );
  }

  const referralOptions = [
    { value: "instagram", label: "Instagram" },
    { value: "threads", label: "Threads" },
    { value: "tiktok", label: "TikTok" },
    { value: "kwai", label: "Kwai" },
    { value: "anuncios", label: "Anúncios" },
    { value: "indicacao", label: "Indicação" },
  ];

  const modeTitle = isSettingNewPassword
    ? "Nova senha"
    : isRecovery
    ? "Recuperar senha"
    : isLogin
    ? "Bem-vindo de volta"
    : "Criar sua conta";

  const modeSubtitle = isSettingNewPassword
    ? "Defina uma senha segura para sua conta"
    : isRecovery
    ? "Enviaremos um link para o seu email"
    : isLogin
    ? "Entre para continuar sua jornada"
    : "Junte-se à comunidade Devocionalzeiros";

  return (
    <div className="min-h-screen bg-[#040810] flex overflow-hidden">
      {/* ── LEFT PANEL (desktop only) ─────────────────────────── */}
      <div className="hidden lg:block lg:w-[46%] xl:w-[44%] shrink-0 relative">
        <IdentityPanel />
        {/* Right edge fade */}
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent, #040810)" }} />
      </div>

      {/* ── RIGHT PANEL (form) ────────────────────────────────── */}
      <div className="flex-1 relative flex flex-col items-center justify-center overflow-y-auto">
        {/* Mobile-only background */}
        <div className="absolute inset-0 lg:hidden">
          <div className="absolute inset-0 bg-[#040810]" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 50% at 50% 0%, rgba(120,70,10,0.45) 0%, transparent 60%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 90% 90%, rgba(60,10,90,0.25) 0%, transparent 60%)" }} />
          {Array.from({ length: 12 }).map((_, i) => (
            <Particle key={i} delay={i * 0.7} left={`${(i / 12) * 100}%`} size={i % 3 === 0 ? 2 : 1} isGold={i % 4 === 0} />
          ))}
        </div>

        {/* Desktop subtle right-panel bg */}
        <div className="absolute inset-0 hidden lg:block"
          style={{ background: "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(30,20,5,0.6) 0%, transparent 80%)" }} />

        <div className="relative z-10 w-full max-w-md px-5 py-10 sm:py-14 lg:px-10 lg:py-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">

          {/* Mobile logo */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : -12 }}
            transition={{ duration: 0.3 }}
            className="flex lg:hidden items-center justify-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-800/50 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-900/40">
              <img src={logoOfficial} alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-lg font-bold" style={{ background: "linear-gradient(135deg,#fbbf24,#fef3c7,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Devocionalzeiros
            </span>
          </motion.div>

          {/* Mode header */}
          <motion.div
            key={modeTitle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 12 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mb-6 lg:mb-8"
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-2xl lg:text-3xl font-bold text-white">{modeTitle}</h2>
            </div>
            <p className="text-sm text-white/40 pl-6">{modeSubtitle}</p>
          </motion.div>

          {/* ─── FORM CARD ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 18, scale: isReady ? 1 : 0.97 }}
            transition={{ duration: 0.35, delay: 0.1, type: "spring", stiffness: 180, damping: 22 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(245,158,11,0.15)",
              boxShadow: "0 0 60px rgba(245,158,11,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)" }} />

            <div className="p-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* ── NEW PASSWORD MODE ── */}
                {isSettingNewPassword ? (
                  <AnimatePresence>
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 text-white/60 uppercase tracking-wider">Nova senha</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`${inputBase} pr-10 ${errors.newPassword ? inputErr : ""}`}
                            placeholder="Mínimo 6 caracteres"
                            disabled={isSubmitting}
                          />
                          <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.newPassword && <p className="text-xs text-red-400 mt-1">{errors.newPassword}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1.5 text-white/60 uppercase tracking-wider">Confirmar senha</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`${inputBase} pr-10 ${errors.confirmPassword ? inputErr : ""}`}
                            placeholder="Repita a nova senha"
                            disabled={isSubmitting}
                          />
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
                    {/* ── SIGNUP EXTRA FIELDS ── */}
                    <AnimatePresence>
                      {!isLogin && !isRecovery && (
                        <motion.div
                          key="signup-fields"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-4 overflow-hidden"
                        >
                          {/* Name */}
                          <div>
                            <label className="block text-xs font-semibold mb-1.5 text-white/60 uppercase tracking-wider">Nome completo</label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                              <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className={`${inputBase} ${errors.name ? inputErr : ""}`}
                                placeholder="Seu nome"
                                disabled={isSubmitting}
                              />
                            </div>
                            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                          </div>

                          {/* WhatsApp */}
                          <div>
                            <label className="block text-xs font-semibold mb-1.5 text-white/60 uppercase tracking-wider">
                              WhatsApp <span className="text-red-400">*</span>
                            </label>
                            <div className="flex gap-2">
                              <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="py-2.5 pl-2 pr-1 rounded-xl bg-white/[0.06] border border-white/10 focus:border-amber-500/50 outline-none text-white text-xs appearance-none cursor-pointer min-w-[85px]"
                                disabled={isSubmitting}
                              >
                                {countryCodes.map((c) => (
                                  <option key={c.code} value={c.code} className="bg-[#0d1117] text-white">
                                    {c.flag} {c.code}
                                  </option>
                                ))}
                              </select>
                              <div className="relative flex-1">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input
                                  type="tel"
                                  value={whatsappNumber}
                                  onChange={handlePhoneChange}
                                  className={`${inputBase} ${errors.phone ? inputErr : ""}`}
                                  placeholder="(84) 99999-9999"
                                  disabled={isSubmitting}
                                />
                              </div>
                            </div>
                            {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                          </div>

                          {/* Referral */}
                          <div>
                            <label className="block text-xs font-semibold mb-1.5 text-white/60 uppercase tracking-wider">
                              Como nos conheceu? <span className="text-red-400">*</span>
                            </label>
                            <div className="grid grid-cols-3 gap-1.5">
                              {referralOptions.map((opt) => (
                                <motion.button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => setReferralSource(opt.value)}
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                                    referralSource === opt.value
                                      ? "bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-sm shadow-amber-500/20"
                                      : "bg-white/[0.04] border border-white/[0.08] text-white/50 hover:border-amber-500/25 hover:text-white/70"
                                  }`}
                                  disabled={isSubmitting}
                                >
                                  {opt.label}
                                </motion.button>
                              ))}
                            </div>
                            {errors.referral && <p className="text-xs text-red-400 mt-1">{errors.referral}</p>}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 text-white/60 uppercase tracking-wider">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`${inputBase} ${errors.email ? inputErr : ""}`}
                          placeholder="seu@email.com"
                          disabled={isSubmitting}
                          autoComplete="email"
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    {!isRecovery && (
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 text-white/60 uppercase tracking-wider">Senha</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${inputBase} pr-10 ${errors.password ? inputErr : ""}`}
                            placeholder="••••••••"
                            disabled={isSubmitting}
                            autoComplete={isLogin ? "current-password" : "new-password"}
                          />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
                      </div>
                    )}

                    {/* Submit */}
                    <SubmitButton
                      isSubmitting={isSubmitting}
                      label={isRecovery ? "Enviar email" : isLogin ? "Entrar" : "Criar conta"}
                      icon={<BookOpen className="w-4 h-4" />}
                      loadingLabel={isRecovery ? "Enviando..." : isLogin ? "Entrando..." : "Criando conta..."}
                    />

                    {/* Forgot password */}
                    {isLogin && !isRecovery && (
                      <button
                        type="button"
                        onClick={() => { setIsRecovery(true); setErrors({}); }}
                        className="w-full text-xs text-white/30 hover:text-amber-400/70 transition-colors"
                        disabled={isSubmitting}
                      >
                        Esqueceu sua senha?
                      </button>
                    )}
                  </>
                )}
              </form>
            </div>

            {/* Bottom section */}
            {!isSettingNewPassword && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-3 border-t border-white/[0.06] pt-4">
                {/* Toggle login/signup */}
                <p className="text-center text-sm text-white/40">
                  {isRecovery ? "Lembrou a senha?" : isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
                  {" "}
                  <button
                    onClick={() => { isRecovery ? setIsRecovery(false) : setIsLogin(!isLogin); setErrors({}); }}
                    className="font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isRecovery ? "Voltar ao login" : isLogin ? "Cadastre-se" : "Entrar"}
                  </button>
                </p>

                {/* Divider */}
                {!isRecovery && (
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/[0.07]" />
                    <span className="text-xs text-white/20 uppercase tracking-wider">ou</span>
                    <div className="flex-1 h-px bg-white/[0.07]" />
                  </div>
                )}

                {/* Google */}
                {!isRecovery && (
                  <motion.button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting || isGoogleLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-sm font-medium transition-all text-white/50 hover:text-white/80 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/[0.14] disabled:opacity-40"
                  >
                    {isGoogleLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                    <span>{isGoogleLoading ? "Conectando..." : "Continuar com Google"}</span>
                  </motion.button>
                )}

                {/* Support */}
                <div className="text-center">
                  <motion.button
                    onClick={() => window.open("https://wa.me/+5584999488698?text=Oii%2C%20equipe.%20Preciso%20de%20suporte.%20", "_blank")}
                    className="inline-flex items-center gap-1.5 text-[11px] text-white/20 hover:text-white/40 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
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
  );
};

// ─── Reusable animated submit button ───────────────────────────────────────
const SubmitButton = ({ isSubmitting, label, icon, loadingLabel }: {
  isSubmitting: boolean;
  label: string;
  icon: React.ReactNode;
  loadingLabel: string;
}) => (
  <motion.button
    type="submit"
    disabled={isSubmitting}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className="w-full py-3 rounded-xl font-semibold text-sm relative overflow-hidden disabled:opacity-50"
    style={{
      background: "linear-gradient(135deg, rgba(217,119,6,0.9) 0%, rgba(245,158,11,0.95) 50%, rgba(234,179,8,0.9) 100%)",
      boxShadow: "0 4px 24px rgba(217,119,6,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
      color: "#1a0a00",
    }}
  >
    {/* Shimmer */}
    <motion.div
      className="absolute inset-0"
      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }}
      initial={{ x: "-100%" }}
      animate={{ x: "200%" }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
    />
    <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
      {isSubmitting ? (
        <><Loader2 className="w-4 h-4 animate-spin" />{loadingLabel}</>
      ) : (
        <>{icon}{label}</>
      )}
    </span>
  </motion.button>
);

export default Auth;
