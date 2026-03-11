import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Loader2, Eye, EyeOff, MessageCircle, Phone, Sparkles, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { z } from "zod";
import logoOfficial from "@/assets/logo-icon.png";
import authBackground from "@/assets/auth-bible-background.jpg";

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

// Optimized floating particles - reduced count and simplified animation
const FloatingParticles = () => {
  const particles = useMemo(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      duration: Math.random() * 6 + 8,
      isGold: Math.random() > 0.5,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-1 h-1 rounded-full ${particle.isGold ? 'bg-amber-400/50' : 'bg-primary/50'}`}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "-10%", opacity: [0, 0.8, 0.8, 0] }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
          style={{ left: particle.left }}
        />
      ))}
    </div>
  );
};

// Simplified light rays - less complex animation
const LightRays = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-40"
      style={{
        background: "conic-gradient(from 180deg at 50% 0%, transparent 35%, hsl(var(--primary) / 0.15) 50%, transparent 65%)",
      }}
    />
  </div>
);

// Common country codes for DDI selector
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
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string; phone?: string; referral?: string; newPassword?: string; confirmPassword?: string }>({});
  const [isReady, setIsReady] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const { user, loading, signIn, signUp, resetPassword, updatePassword } = useAuth();

  // Detect PASSWORD_RECOVERY event from Supabase
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setIsSettingNewPassword(true);
          setIsLogin(true);
          setIsRecovery(false);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Don't redirect if user is setting new password
    if (user && !loading && !isSettingNewPassword) {
      navigate("/home");
    }
  }, [user, loading, navigate, isSettingNewPassword]);

  // Fast entry animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string; phone?: string; referral?: string; newPassword?: string; confirmPassword?: string } = {};

    // Validation for setting new password mode
    if (isSettingNewPassword) {
      const newPasswordResult = passwordSchema.safeParse(newPassword);
      if (!newPasswordResult.success) {
        newErrors.newPassword = newPasswordResult.error.errors[0].message;
      }
      
      if (newPassword !== confirmPassword) {
        newErrors.confirmPassword = "As senhas não coincidem";
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    if (!isRecovery) {
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        newErrors.password = passwordResult.error.errors[0].message;
      }

      if (!isLogin) {
        const nameResult = nameSchema.safeParse(fullName);
        if (!nameResult.success) {
          newErrors.name = nameResult.error.errors[0].message;
        }
        
        const cleanPhone = whatsappNumber.replace(/\D/g, "");
        if (!cleanPhone) {
          newErrors.phone = "WhatsApp é obrigatório";
        } else {
          const phoneResult = phoneSchema.safeParse(cleanPhone);
          if (!phoneResult.success) {
            newErrors.phone = phoneResult.error.errors[0].message;
          }
        }
        
        if (!referralSource) {
          newErrors.referral = "Selecione como nos conheceu";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setWhatsappNumber(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Handle new password submission
      if (isSettingNewPassword) {
        const { error } = await updatePassword(newPassword);
        if (error) {
          toast.error("Erro ao atualizar senha. Tente novamente.");
          return;
        }
        toast.success("Senha alterada com sucesso!");
        setIsSettingNewPassword(false);
        setNewPassword("");
        setConfirmPassword("");
        navigate("/home");
        return;
      }

      if (isRecovery) {
        const { error } = await resetPassword(email);
        if (error) {
          toast.error("Erro ao enviar email de recuperação. Tente novamente.");
          return;
        }
        toast.success("Email de recuperação enviado! Verifique sua caixa de entrada.");
        setIsRecovery(false);
        setEmail("");
      } else if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Email ou senha incorretos");
          } else {
            toast.error("Erro ao fazer login. Tente novamente.");
          }
          return;
        }
        toast.success("Bem-vindo de volta!");
      } else {
        // Cadastro gratuito permitido para plano START
        
        const { error, data } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("Este email já está cadastrado");
          } else {
            toast.error("Erro ao criar conta. Tente novamente.");
          }
          return;
        }
        
        if (data?.user?.id) {
          const cleanPhone = whatsappNumber.replace(/\D/g, "");
          const fullPhoneNumber = `${countryCode.replace("+", "")}${cleanPhone}`;
          await supabase
            .from("profiles")
            .update({ 
              whatsapp_phone: fullPhoneNumber,
              referral_source: referralSource 
            })
            .eq("user_id", data.user.id);
        }
        
        toast.success("Conta criada com sucesso!");
      }
    } catch (error) {
      toast.error("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      
      if (error) {
        toast.error("Erro ao entrar com Google. Tente novamente.");
        console.error("Google sign-in error:", error);
      }
    } catch (error) {
      toast.error("Erro ao conectar com Google.");
      console.error("Google sign-in error:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <BookOpen className="w-10 h-10 text-primary" />
          </motion.div>
          <p className="text-muted-foreground text-sm">Carregando...</p>
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.img
          src={authBackground}
          alt=""
          className="w-full h-full object-cover"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        {/* Overlay with brand colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-accent/5" />
      </div>

      <FloatingParticles />
      <LightRays />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : -20 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="mb-4 sm:mb-6 relative flex items-center justify-center"
        >
          <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full scale-150" />
          <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center shadow-2xl shadow-primary/30 border border-white/20">
            <img 
              src={logoOfficial} 
              alt="Devocionalzeiros" 
              className="w-16 h-16 sm:w-22 sm:h-22 object-contain drop-shadow-xl"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 15 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="text-center mb-4 sm:mb-6"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
            <span className="text-gradient">
              Devocionalzeiros
            </span>
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
            {isSettingNewPassword ? "Defina sua nova senha" : isRecovery ? "Recupere sua senha" : isLogin ? "Entre na sua conta" : "Crie sua conta"}
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ 
            opacity: isReady ? 1 : 0, 
            y: isReady ? 0 : 20,
            scale: isReady ? 1 : 0.95 
          }}
          transition={{ duration: 0.3, delay: 0.15, type: "spring", stiffness: 200, damping: 25 }}
          className="w-full max-w-[340px] sm:max-w-md"
        >
          <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl overflow-hidden bg-card/95 backdrop-blur-xl border border-border/50 shadow-2xl">
            {/* Decorative gradient border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/10 pointer-events-none" />
            
            {/* Inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 relative z-10">
              {/* New Password Form - shown when user clicks recovery link */}
              {isSettingNewPassword ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 sm:space-y-4"
                >
                  {/* New Password input */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground/80">Nova senha</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={`w-full pl-10 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-xl bg-background/60 border ${
                          errors.newPassword ? "border-destructive/50" : "border-border"
                        } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50 text-sm sm:text-base`}
                        placeholder="Mínimo 6 caracteres"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                    {errors.newPassword && <p className="text-xs text-destructive mt-1">{errors.newPassword}</p>}
                  </div>

                  {/* Confirm Password input */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground/80">Confirmar senha</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full pl-10 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-xl bg-background/60 border ${
                          errors.confirmPassword ? "border-destructive/50" : "border-border"
                        } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50 text-sm sm:text-base`}
                        placeholder="Repita a nova senha"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
                  </div>

                  {/* Submit Button for new password */}
                  <motion.button
                    type="submit"
                    className="w-full py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base relative overflow-hidden group disabled:opacity-50 bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isSubmitting}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          <span>Salvando...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>Salvar nova senha</span>
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <AnimatePresence mode="wait">
                    {!isLogin && !isRecovery && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3 sm:space-y-4"
                      >
                        {/* Name input */}
                        <div>
                          <label className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground/80">Nome completo</label>
                          <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-xl bg-background/60 border ${
                                errors.name ? "border-destructive/50" : "border-border"
                              } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50 text-sm sm:text-base`}
                              placeholder="Seu nome"
                              disabled={isSubmitting}
                            />
                          </div>
                          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                        </div>

                        {/* WhatsApp input with DDI */}
                        <div>
                          <label className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground/80">
                            WhatsApp <span className="text-destructive">*</span>
                          </label>
                          <div className="flex gap-2">
                            {/* DDI Selector */}
                            <div className="relative">
                              <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="h-full py-2.5 sm:py-3 pl-2 pr-1 rounded-xl bg-background/60 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground text-xs sm:text-sm appearance-none cursor-pointer min-w-[85px]"
                                disabled={isSubmitting}
                              >
                                {countryCodes.map((country) => (
                                  <option key={country.code} value={country.code}>
                                    {country.flag} {country.code}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {/* Phone input */}
                            <div className="relative group flex-1">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                              <input
                                type="tel"
                                value={whatsappNumber}
                                onChange={handlePhoneChange}
                                className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-xl bg-background/60 border ${
                                  errors.phone ? "border-destructive/50" : "border-border"
                                } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50 text-sm sm:text-base`}
                                placeholder="(84) 99999-9999"
                                disabled={isSubmitting}
                              />
                            </div>
                          </div>
                          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                        </div>

                        {/* Referral source */}
                        <div>
                          <label className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground/80">
                            Por onde você nos conheceu? <span className="text-destructive">*</span>
                          </label>
                          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                            {referralOptions.map((option) => (
                              <motion.button
                                key={option.value}
                                type="button"
                                onClick={() => setReferralSource(option.value)}
                                className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                                  referralSource === option.value
                                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                    : "bg-background/60 border-border text-foreground/70 hover:border-primary/50 hover:bg-primary/5"
                                }`}
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {option.label}
                              </motion.button>
                            ))}
                          </div>
                          {errors.referral && <p className="text-xs text-destructive mt-1">{errors.referral}</p>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email input */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground/80">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-xl bg-background/60 border ${
                          errors.email ? "border-destructive/50" : "border-border"
                        } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50 text-sm sm:text-base`}
                        placeholder="seu@email.com"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>

                  {/* Password input */}
                  {!isRecovery && (
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground/80">Senha</label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`w-full pl-10 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-xl bg-background/60 border ${
                            errors.password ? "border-destructive/50" : "border-border"
                          } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50 text-sm sm:text-base`}
                          placeholder="••••••••"
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="w-full py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base relative overflow-hidden group disabled:opacity-50 bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isSubmitting}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          <span>{isRecovery ? "Enviando..." : isLogin ? "Entrando..." : "Criando conta..."}</span>
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>{isRecovery ? "Enviar email" : isLogin ? "Entrar" : "Criar conta"}</span>
                        </>
                      )}
                    </span>
                  </motion.button>

                  {/* Forgot Password */}
                  {isLogin && !isRecovery && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsRecovery(true);
                        setErrors({});
                      }}
                      className="w-full text-xs sm:text-sm text-primary/70 hover:text-primary transition-colors"
                      disabled={isSubmitting}
                    >
                      Esqueceu sua senha?
                    </button>
                  )}

                </>
              )}
            </form>

            {/* Toggle Login/Signup - hide when setting new password */}
            {!isSettingNewPassword && (
              <div className="mt-4 sm:mt-6 text-center relative z-10">
                <p className="text-base sm:text-lg text-muted-foreground">
                  {isRecovery ? "Lembrou a senha?" : isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
                  <button
                    onClick={() => {
                      if (isRecovery) {
                        setIsRecovery(false);
                      } else {
                        setIsLogin(!isLogin);
                      }
                      setErrors({});
                    }}
                    className="ml-1 text-amber-500 hover:text-amber-400 font-bold transition-colors"
                    disabled={isSubmitting}
                  >
                    {isRecovery ? "Voltar ao login" : isLogin ? "Cadastre-se" : "Entrar"}
                  </button>
                </p>
              </div>
            )}

            {/* Google Sign In - Smaller, below signup toggle */}
            {!isRecovery && !isSettingNewPassword && (
              <div className="mt-3 text-center relative z-10">
                <motion.button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground bg-background/60 border border-border/50 hover:border-border hover:bg-muted/30 transition-all disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || isGoogleLoading}
                >
                  {isGoogleLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  <span>{isGoogleLoading ? "Conectando..." : "Entrar com Google"}</span>
                </motion.button>
              </div>
            )}

            {/* WhatsApp Support */}
            <div className="mt-3 sm:mt-4 text-center relative z-10">
              <motion.button
                onClick={() => window.open("https://wa.me/+5584999488698?text=Oii%2C%20equipe.%20Preciso%20de%20suporte.%20", "_blank")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground text-[10px] sm:text-xs font-medium transition-all bg-muted/20 hover:bg-muted/40 border border-border/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-3 h-3" />
                <span>Problemas de acesso?</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom verse */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-6 sm:mt-8 text-center text-muted-foreground/60 text-[10px] sm:text-xs italic max-w-xs sm:max-w-sm px-4"
        >
          "Lâmpada para os meus pés é a tua palavra e luz para os meus caminhos." — Salmos 119:105
        </motion.p>
      </div>
    </div>
  );
};

export default Auth;
