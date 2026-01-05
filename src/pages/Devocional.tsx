import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  BookOpen, 
  Heart, 
  MessageCircle, 
  CheckCircle2,
  ArrowLeft,
  Flame,
  Calendar,
  Trophy,
  Star,
  Loader2,
  ChevronLeft,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useGameSounds } from "@/hooks/useGameSounds";
import { triggerConfetti } from "@/utils/confetti";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Sample devotionals - in production this would come from a CMS or API
const devotionals = [
  {
    id: 1,
    title: "A Paz que Excede o Entendimento",
    verse: {
      text: "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará os seus corações e as suas mentes em Cristo Jesus.",
      reference: "Filipenses 4:6-7",
    },
    reflection: `Em meio às turbulências da vida, Paulo nos convida a uma postura transformadora: ao invés de nos entregarmos à ansiedade, devemos levar todas as nossas preocupações a Deus em oração.

A promessa é extraordinária: uma paz que ultrapassa nossa capacidade de compreensão. Não é uma paz que vem da ausência de problemas, mas uma paz sobrenatural que guarda nossos corações mesmo em meio às tempestades.

Hoje, que possamos praticar essa entrega confiante, depositando cada preocupação nas mãos do Pai e permitindo que Sua paz inunde nossa alma.`,
    prayer: "Senhor, ajuda-me a não me entregar à ansiedade, mas a confiar todas as minhas preocupações a Ti. Que a Tua paz, que excede todo entendimento, guarde meu coração e minha mente em Cristo Jesus. Amém.",
    application: [
      "Liste três preocupações que você pode entregar a Deus hoje",
      "Reserve um momento para uma oração de gratidão",
      "Memorize o versículo de hoje",
    ],
  },
  {
    id: 2,
    title: "Força na Fraqueza",
    verse: {
      text: "Mas ele me disse: Minha graça é suficiente para você, pois o meu poder se aperfeiçoa na fraqueza. Portanto, eu me gloriarei ainda mais alegremente em minhas fraquezas, para que o poder de Cristo repouse em mim.",
      reference: "2 Coríntios 12:9",
    },
    reflection: `Paulo descobriu um paradoxo divino: é justamente em nossa fraqueza que o poder de Deus se manifesta com mais clareza.

Quando reconhecemos nossas limitações, abrimos espaço para a graça de Deus operar. Não precisamos fingir ser fortes ou ter todas as respostas. Nossa vulnerabilidade não é motivo de vergonha, mas uma porta para experimentar o cuidado de Deus.

Hoje, que possamos descansar na suficiência da graça divina, encontrando força não em nós mesmos, mas nAquele que é poderoso para fazer infinitamente mais.`,
    prayer: "Pai, reconheço minhas fraquezas diante de Ti. Ajuda-me a não confiar em minhas próprias forças, mas a depender completamente de Tua graça. Que o poder de Cristo repouse sobre mim hoje. Amém.",
    application: [
      "Identifique uma área onde você precisa da graça de Deus",
      "Agradeça a Deus por Sua força em sua fraqueza",
      "Compartilhe este versículo com alguém que precisa de encorajamento",
    ],
  },
  {
    id: 3,
    title: "O Bom Pastor",
    verse: {
      text: "O Senhor é o meu pastor; nada me faltará. Ele me faz repousar em pastos verdejantes. Leva-me para junto das águas de descanso.",
      reference: "Salmos 23:1-2",
    },
    reflection: `Davi, que conhecia bem a vida de um pastor, usa essa metáfora poderosa para descrever o cuidado de Deus por nós.

Um bom pastor conhece cada ovelha pelo nome, provê alimento, água e proteção. Ele caminha à frente, guiando o rebanho por caminhos seguros. Da mesma forma, Deus nos conhece intimamente e cuida de cada aspecto de nossas vidas.

Hoje, que possamos descansar na certeza de que o nosso Pastor nos guia, provê e protege. Sob Seus cuidados, nada nos faltará.`,
    prayer: "Senhor, Tu és meu Pastor. Ajuda-me a confiar em Tua provisão e descansar em Teu cuidado. Guia-me pelos caminhos que devo seguir e restaura minha alma. Amém.",
    application: [
      "Reflita sobre uma área onde Deus tem provido para você",
      "Reserve um tempo de silêncio para descansar na presença de Deus",
      "Leia todo o Salmo 23 meditando em cada versículo",
    ],
  },
];

const Devocional = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { playSound } = useGameSounds();
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDevotionalIndex, setSelectedDevotionalIndex] = useState(0);
  const [stats, setStats] = useState({
    totalCompleted: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  // Get today's date in Brazil timezone
  const today = useMemo(() => {
    const now = new Date();
    const brazilTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
    return brazilTime.toISOString().split("T")[0];
  }, []);

  const formattedDate = useMemo(() => {
    const date = new Date(today + "T12:00:00");
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [today]);

  // Get today's devotional index based on day of year
  const todayDevotionalIndex = useMemo(() => {
    const dayOfYear = Math.floor((new Date(today).getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return dayOfYear % devotionals.length;
  }, [today]);

  // Initialize with today's devotional
  useEffect(() => {
    setSelectedDevotionalIndex(todayDevotionalIndex);
  }, [todayDevotionalIndex]);

  // Current selected devotional
  const devotional = devotionals[selectedDevotionalIndex];

  const goToPreviousDevotional = () => {
    setSelectedDevotionalIndex((prev) => (prev === 0 ? devotionals.length - 1 : prev - 1));
  };

  const goToNextDevotional = () => {
    setSelectedDevotionalIndex((prev) => (prev === devotionals.length - 1 ? 0 : prev + 1));
  };

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Load completion status and stats
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        // Check if today's devotional is completed
        const { data: todayCompletion } = await supabase
          .from("devotional_completions")
          .select("id")
          .eq("user_id", user.id)
          .eq("devotional_date", today)
          .single();

        setIsCompleted(!!todayCompletion);

        // Get all completions for stats
        const { data: completions } = await supabase
          .from("devotional_completions")
          .select("devotional_date")
          .eq("user_id", user.id)
          .order("devotional_date", { ascending: false });

        if (completions) {
          const totalCompleted = completions.length;

          // Calculate streaks
          let currentStreak = 0;
          let bestStreak = 0;
          let tempStreak = 0;
          let lastDate: Date | null = null;

          // Sort dates in ascending order for streak calculation
          const sortedDates = completions
            .map((c) => new Date(c.devotional_date))
            .sort((a, b) => a.getTime() - b.getTime());

          sortedDates.forEach((date) => {
            if (!lastDate) {
              tempStreak = 1;
            } else {
              const diff = Math.floor((date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
              if (diff === 1) {
                tempStreak++;
              } else {
                tempStreak = 1;
              }
            }
            bestStreak = Math.max(bestStreak, tempStreak);
            lastDate = date;
          });

          // Check if current streak is active (includes today or yesterday)
          const todayDate = new Date(today);
          const yesterdayDate = new Date(today);
          yesterdayDate.setDate(yesterdayDate.getDate() - 1);

          if (lastDate) {
            const lastDateStr = lastDate.toISOString().split("T")[0];
            if (lastDateStr === today || lastDateStr === yesterdayDate.toISOString().split("T")[0]) {
              currentStreak = tempStreak;
            }
          }

          setStats({ totalCompleted, currentStreak, bestStreak });
        }
      } catch (error) {
        console.error("Error loading devotional data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, today]);

  const handleComplete = async () => {
    if (!user || isCompleted) return;

    try {
      const { error } = await supabase.from("devotional_completions").insert({
        user_id: user.id,
        devotional_date: today,
      });

      if (error) throw error;

      setIsCompleted(true);
      setStats((prev) => ({
        ...prev,
        totalCompleted: prev.totalCompleted + 1,
        currentStreak: prev.currentStreak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
      }));

      playSound("achievement");
      triggerConfetti("celebration");
      toast.success("Devocional concluído! 🎉");
    } catch (error) {
      console.error("Error completing devotional:", error);
      toast.error("Erro ao marcar como concluído");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando devocional...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        {/* Header */}
        <motion.header 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Voltar</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open("https://wa.me/+5584998982478?text=Oii%2C%20equipe.%20Preciso%20de%20suporte.%20", "_blank")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors"
              title="Suporte via WhatsApp"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Suporte</span>
            </button>

          {/* Streak Badge */}
            {stats.currentStreak > 0 && (
              <motion.div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Flame className="w-4 h-4 text-orange-500" />
                </motion.div>
                <span className="font-semibold text-sm text-orange-400">{stats.currentStreak} dias</span>
              </motion.div>
            )}
          </div>
        </motion.header>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-3 gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold">{stats.totalCompleted}</p>
            <p className="text-xs text-muted-foreground">Devocionais</p>
          </div>
          <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold">{stats.currentStreak}</p>
            <p className="text-xs text-muted-foreground">Sequência</p>
          </div>
          <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold">{stats.bestStreak}</p>
            <p className="text-xs text-muted-foreground">Recorde</p>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Title Card with Navigation */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-10">
              <Sparkles className="w-24 h-24" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Devocional</h1>
                  <p className="text-sm text-muted-foreground capitalize">{formattedDate}</p>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={goToPreviousDevotional}
                  className="p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <span className="text-sm text-muted-foreground px-2">
                  {selectedDevotionalIndex + 1}/{devotionals.length}
                </span>
                <motion.button
                  onClick={goToNextDevotional}
                  className="p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.h2 
                key={devotional.id}
                className="text-2xl sm:text-3xl font-bold text-center mt-6 mb-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {devotional.title}
              </motion.h2>
            </AnimatePresence>
            
            {isCompleted && selectedDevotionalIndex === todayDevotionalIndex && (
              <motion.div 
                className="flex items-center justify-center gap-2 mt-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Concluído hoje!</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Verse */}
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Versículo Base</h3>
                <p className="text-sm text-muted-foreground">Medite nesta palavra</p>
              </div>
            </div>
            <blockquote className="text-lg leading-relaxed mb-4 italic border-l-4 border-primary/30 pl-4">
              "{devotional.verse.text}"
            </blockquote>
            <cite className="text-sm text-accent font-medium">— {devotional.verse.reference}</cite>
          </div>

          {/* Reflection */}
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold">Reflexão</h3>
                <p className="text-sm text-muted-foreground">Deixe a Palavra falar ao seu coração</p>
              </div>
            </div>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {devotional.reflection}
            </div>
          </div>

          {/* Prayer */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Oração</h3>
                <p className="text-sm text-muted-foreground">Converse com Deus</p>
              </div>
            </div>
            <p className="text-muted-foreground italic leading-relaxed">
              {devotional.prayer}
            </p>
          </div>

          {/* Application */}
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold">Aplicação Prática</h3>
                <p className="text-sm text-muted-foreground">Coloque em prática</p>
              </div>
            </div>
            <ul className="space-y-3">
              {devotional.application.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/5 border border-border/30"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Complete Button */}
          <motion.button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
              isCompleted
                ? "bg-accent/20 text-accent cursor-default"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
            }`}
            whileHover={!isCompleted ? { scale: 1.01 } : {}}
            whileTap={!isCompleted ? { scale: 0.99 } : {}}
          >
            {isCompleted ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Devocional Concluído
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Marcar como Concluído
              </span>
            )}
          </motion.button>

          {/* Achievement Hint */}
          {!isCompleted && (
            <motion.p 
              className="text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Complete devocionais diários para aumentar sua sequência! 🔥
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Devocional;
