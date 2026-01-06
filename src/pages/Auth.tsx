import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Mail, Lock, User, Loader2, Eye, EyeOff, MessageCircle, ShoppingCart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import logoWhiteLarge from "@/assets/logo-white-large.png";
import logoBlack from "@/assets/logo-black.png";

const emailSchema = z.string().email("Email inválido");
const passwordSchema = z.string().min(6, "Senha deve ter pelo menos 6 caracteres");
const nameSchema = z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo");

// Check if email is authorized using secure RPC function (only returns boolean, no data exposure)
const checkEmailAuthorized = async (email: string): Promise<{ authorized: boolean }> => {
  const { data, error } = await supabase
    .rpc('check_email_authorized', { email_input: email });

  if (error) {
    console.error('Error checking email authorization:', error);
    return { authorized: false };
  }

  return { authorized: !!data };
};

const Auth = () => {
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [isRecovery, setIsRecovery] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});

  const navigate = useNavigate();
  const { user, loading, signIn, signUp, resetPassword } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};

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
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        // Check if email is authorized before allowing signup (secure RPC - no data exposure)
        const { authorized } = await checkEmailAuthorized(email);
        
        if (!authorized) {
          toast.error(
            "Este email não possui uma compra ativa. Adquira seu plano para criar sua conta.",
            { duration: 5000 }
          );
          // Redirect to pricing section after a short delay
          setTimeout(() => {
            window.location.href = "/#planos";
          }, 2000);
          return;
        }

        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("Este email já está cadastrado");
          } else {
            toast.error("Erro ao criar conta. Tente novamente.");
          }
          return;
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img 
            src={theme === "dark" ? logoWhiteLarge : logoBlack} 
            alt="CLUBE HD" 
            className="h-32 sm:h-40 w-auto mb-4"
          />
          <p className="text-sm text-muted-foreground">
            {isRecovery ? "Recupere sua senha" : isLogin ? "Entre na sua conta" : "Crie sua conta"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && !isRecovery && (
              <div>
                <label className="block text-sm font-medium mb-2">Nome completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-muted/10 border ${
                      errors.name ? "border-destructive" : "border-border/50"
                    } focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors`}
                    placeholder="Seu nome"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl bg-muted/10 border ${
                    errors.email ? "border-destructive" : "border-border/50"
                  } focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors`}
                  placeholder="seu@email.com"
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            {!isRecovery && (
              <div>
                <label className="block text-sm font-medium mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-11 pr-12 py-3 rounded-xl bg-muted/10 border ${
                      errors.password ? "border-destructive" : "border-border/50"
                    } focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors`}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">{errors.password}</p>
                )}
              </div>
            )}

            <motion.button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{isRecovery ? "Enviando..." : isLogin ? "Entrando..." : "Criando conta..."}</span>
                </>
              ) : (
                <span>{isRecovery ? "Enviar email de recuperação" : isLogin ? "Entrar" : "Criar conta"}</span>
              )}
            </motion.button>

            {/* Forgot Password Link */}
            {isLogin && !isRecovery && (
              <button
                type="button"
                onClick={() => {
                  setIsRecovery(true);
                  setErrors({});
                }}
                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
                disabled={isSubmitting}
              >
                Esqueceu sua senha?
              </button>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
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
                className="ml-1 text-primary hover:underline font-medium"
                disabled={isSubmitting}
              >
                {isRecovery ? "Voltar ao login" : isLogin ? "Cadastre-se" : "Entrar"}
              </button>
            </p>
          </div>

          {/* WhatsApp Support */}
          <div className="mt-4 text-center">
            <motion.button
              onClick={() => window.open("https://wa.me/+5584998982478?text=Oii%2C%20equipe.%20Preciso%20de%20suporte.%20", "_blank")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors shadow-lg shadow-green-600/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  "0 10px 15px -3px rgba(22, 163, 74, 0.2)",
                  "0 10px 25px -3px rgba(22, 163, 74, 0.4)",
                  "0 10px 15px -3px rgba(22, 163, 74, 0.2)"
                ]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Problemas de acesso? Fale conosco</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
