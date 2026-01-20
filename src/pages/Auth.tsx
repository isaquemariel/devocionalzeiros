import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Loader2, Eye, EyeOff, MessageCircle, Phone, Sparkles, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import logoOfficial from "@/assets/logo-official.png";
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

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-amber-400/60"
          initial={{
            x: Math.random() * 100 + "%",
            y: "110%",
            opacity: 0,
          }}
          animate={{
            y: "-10%",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
};

// Light rays animation
const LightRays = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
        style={{
          background: "conic-gradient(from 180deg at 50% 0%, transparent 40%, rgba(251, 191, 36, 0.1) 50%, transparent 60%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRecovery, setIsRecovery] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string; phone?: string; referral?: string }>({});
  const [isBookOpen, setIsBookOpen] = useState(false);

  const navigate = useNavigate();
  const { user, loading, signIn, signUp, resetPassword } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  // Trigger book opening animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsBookOpen(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string; phone?: string; referral?: string } = {};

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
        const { data: authorized, error: authCheckError } = await supabase
          .rpc('check_email_authorized', { email_input: email.toLowerCase() });
        
        if (authCheckError || !authorized) {
          toast.error("Este email não está autorizado. Adquira um plano para criar sua conta.", {
            duration: 5000,
          });
          setTimeout(() => {
            window.location.href = "/#planos";
          }, 2000);
          return;
        }
        
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
          await supabase
            .from("profiles")
            .update({ 
              whatsapp_number: cleanPhone,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <BookOpen className="w-12 h-12 text-amber-400" />
          </motion.div>
          <p className="text-amber-200/80 text-sm">Carregando...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Epic Background */}
      <div className="absolute inset-0">
        <motion.img
          src={authBackground}
          alt=""
          className="w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Light rays */}
      <LightRays />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Logo with glow effect */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          className="mb-6 relative"
        >
          {/* Glow behind logo */}
          <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full scale-150" />
          <img 
            src={logoOfficial} 
            alt="Devocionalzeiros" 
            className="h-24 sm:h-32 w-auto relative z-10 drop-shadow-2xl"
          />
        </motion.div>

        {/* Title with shimmer effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              Devocionalzeiros
            </span>
          </h1>
          <p className="text-amber-100/60 text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            {isRecovery ? "Recupere sua senha" : isLogin ? "Entre na sua conta" : "Crie sua conta"}
            <Sparkles className="w-4 h-4 text-amber-400" />
          </p>
        </motion.div>

        {/* 3D Book Card Container */}
        <motion.div
          initial={{ 
            opacity: 0, 
            rotateX: 90,
            perspective: 1000,
            transformStyle: "preserve-3d"
          }}
          animate={{ 
            opacity: isBookOpen ? 1 : 0, 
            rotateX: isBookOpen ? 0 : 90,
          }}
          transition={{ 
            duration: 1,
            delay: 0.5,
            type: "spring",
            stiffness: 60,
            damping: 15
          }}
          className="w-full max-w-md"
          style={{ perspective: 1000 }}
        >
          {/* Book-like card with leather texture effect */}
          <div className="relative">
            {/* Book spine shadow */}
            <div className="absolute -left-2 top-4 bottom-4 w-4 bg-gradient-to-r from-amber-900/50 to-transparent rounded-l-lg" />
            <div className="absolute -right-2 top-4 bottom-4 w-4 bg-gradient-to-l from-amber-900/50 to-transparent rounded-r-lg" />
            
            {/* Main card */}
            <motion.div 
              className="relative p-6 sm:p-8 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(30, 20, 10, 0.95) 0%, rgba(20, 15, 8, 0.98) 100%)",
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.8),
                  0 0 0 1px rgba(180, 120, 60, 0.2),
                  inset 0 1px 0 rgba(255, 200, 100, 0.1),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.5)
                `,
              }}
              whileHover={{ 
                boxShadow: `
                  0 30px 60px -15px rgba(0, 0, 0, 0.9),
                  0 0 0 1px rgba(180, 120, 60, 0.3),
                  0 0 40px rgba(180, 120, 60, 0.1),
                  inset 0 1px 0 rgba(255, 200, 100, 0.15),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.5)
                `
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Inner decorative border */}
              <div className="absolute inset-3 border border-amber-700/20 rounded-xl pointer-events-none" />
              
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-amber-600/30 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-amber-600/30 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-amber-600/30 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-amber-600/30 rounded-br-lg" />

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <AnimatePresence mode="wait">
                  {!isLogin && !isRecovery && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2 text-amber-200/80">Nome completo</label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600/60 group-focus-within:text-amber-400 transition-colors" />
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/40 border ${
                              errors.name ? "border-red-500/50" : "border-amber-700/30"
                            } focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-amber-50 placeholder:text-amber-200/30`}
                            placeholder="Seu nome"
                            disabled={isSubmitting}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-amber-200/80">
                          WhatsApp <span className="text-red-400">*</span>
                        </label>
                        <div className="relative group">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600/60 group-focus-within:text-amber-400 transition-colors" />
                          <input
                            type="tel"
                            value={whatsappNumber}
                            onChange={handlePhoneChange}
                            className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/40 border ${
                              errors.phone ? "border-red-500/50" : "border-amber-700/30"
                            } focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-amber-50 placeholder:text-amber-200/30`}
                            placeholder="(84) 99999-9999"
                            disabled={isSubmitting}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-amber-200/80">
                          Por onde você nos conheceu? <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: "instagram", label: "Instagram" },
                            { value: "threads", label: "Threads" },
                            { value: "tiktok", label: "TikTok" },
                            { value: "kwai", label: "Kwai" },
                            { value: "anuncios", label: "Anúncios" },
                            { value: "indicacao", label: "Indicação" },
                          ].map((option) => (
                            <motion.button
                              key={option.value}
                              type="button"
                              onClick={() => setReferralSource(option.value)}
                              className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                                referralSource === option.value
                                  ? "bg-gradient-to-r from-amber-600 to-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20"
                                  : "bg-black/40 border-amber-700/30 text-amber-200/80 hover:border-amber-500/50 hover:bg-amber-900/20"
                              }`}
                              disabled={isSubmitting}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {option.label}
                            </motion.button>
                          ))}
                        </div>
                        {errors.referral && (
                          <p className="text-xs text-red-400 mt-1">{errors.referral}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-200/80">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600/60 group-focus-within:text-amber-400 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/40 border ${
                        errors.email ? "border-red-500/50" : "border-amber-700/30"
                      } focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-amber-50 placeholder:text-amber-200/30`}
                      placeholder="seu@email.com"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                {!isRecovery && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-amber-200/80">Senha</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600/60 group-focus-within:text-amber-400 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-11 pr-12 py-3.5 rounded-xl bg-black/40 border ${
                          errors.password ? "border-red-500/50" : "border-amber-700/30"
                        } focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-amber-50 placeholder:text-amber-200/30`}
                        placeholder="••••••••"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600/60 hover:text-amber-400 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-400 mt-1">{errors.password}</p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-black relative overflow-hidden group disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{isRecovery ? "Enviando..." : isLogin ? "Entrando..." : "Criando conta..."}</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-5 h-5" />
                        <span>{isRecovery ? "Enviar email de recuperação" : isLogin ? "Entrar" : "Criar conta"}</span>
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
                    className="w-full text-sm text-amber-400/70 hover:text-amber-400 transition-colors"
                    disabled={isSubmitting}
                  >
                    Esqueceu sua senha?
                  </button>
                )}
              </form>

              {/* Toggle Login/Signup */}
              <div className="mt-6 text-center relative z-10">
                <p className="text-sm text-amber-200/50">
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
                    className="ml-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                    disabled={isSubmitting}
                  >
                    {isRecovery ? "Voltar ao login" : isLogin ? "Cadastre-se" : "Entrar"}
                  </button>
                </p>
              </div>

              {/* WhatsApp Support */}
              <div className="mt-4 text-center relative z-10">
                <motion.button
                  onClick={() => window.open("https://wa.me/+5584999488698?text=Oii%2C%20equipe.%20Preciso%20de%20suporte.%20", "_blank")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-all"
                  style={{
                    background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Problemas de acesso? Fale conosco</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom verse */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 text-center text-amber-200/40 text-xs italic max-w-sm"
        >
          "Lâmpada para os meus pés é a tua palavra e luz para os meus caminhos." — Salmos 119:105
        </motion.p>
      </div>
    </div>
  );
};

export default Auth;
