import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  BookOpen, 
  Heart, 
  MessageCircle, 
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Quote,
  Feather,
  Share2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useGameSounds } from "@/hooks/useGameSounds";
import { triggerConfetti } from "@/utils/confetti";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AppHeader } from "@/components/shared/AppHeader";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ShareOptionsModal } from "@/components/devocional/ShareOptionsModal";
import { Devotional } from "@/data/devotionals";
import { toPng } from "html-to-image";

const VerseDevotional = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { playSound } = useGameSounds();
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const bookName = searchParams.get('book') || '';
  const bookId = searchParams.get('bookId') || '';
  const chapter = parseInt(searchParams.get('chapter') || '0');
  const verse = parseInt(searchParams.get('verse') || '0');
  const verseText = searchParams.get('text') || '';
  const commentary = searchParams.get('commentary') || '';

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  }, []);

  const formattedDate = useMemo(() => {
    return format(today, "d 'de' MMMM, yyyy", { locale: ptBR });
  }, [today]);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Generate devotional on mount
  useEffect(() => {
    const generateDevotional = async () => {
      if (!bookName || !chapter || !verse || !verseText) {
        setError('Parâmetros inválidos');
        setLoading(false);
        return;
      }

      try {
        const { data, error: fnError } = await supabase.functions.invoke('verse-devotional-generator', {
          body: {
            bookName,
            bookId,
            chapter,
            verseNumber: verse,
            verseText,
            commentary,
          },
        });

        if (fnError) throw fnError;
        if (data.error) throw new Error(data.error);

        setDevotional({
          id: 0,
          ...data,
        });
      } catch (err) {
        console.error('Error generating devotional:', err);
        setError('Não foi possível gerar o devocional. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      generateDevotional();
    }
  }, [user, bookName, chapter, verse, verseText, commentary]);

  // Generate shareable image
  const generateImage = async () => {
    if (!cardRef.current) return;
    setIsGeneratingImage(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        width: 1080,
        height: 1440,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      });
      setImagePreview(dataUrl);
    } catch (err) {
      console.error('Error generating image:', err);
      toast.error('Erro ao gerar imagem');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const downloadImage = async () => {
    if (!imagePreview) return;
    
    const link = document.createElement('a');
    link.download = `devocional-${bookName}-${chapter}-${verse}.png`;
    link.href = imagePreview;
    link.click();
    
    toast.success('Imagem baixada!');
  };

  const shareToWhatsApp = async () => {
    if (!imagePreview || !devotional) return;
    
    const text = `*${devotional.title}*\n\n"${devotional.verse.text}"\n— ${devotional.verse.reference}\n\n✨ Devocional gerado na Bíblia de Estudo - Devocionalzeiros`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  const handleComplete = async () => {
    if (!user || isCompleted) return;

    const dateStr = format(today, "yyyy-MM-dd");
    // Create a unique identifier for verse devotionals to avoid duplicates
    const verseDevotionalDate = `verse-${bookId}-${chapter}-${verse}-${dateStr}`;

    try {
      // Check if already completed today for this specific verse
      const { data: existing } = await supabase
        .from("devotional_completions")
        .select("id")
        .eq("user_id", user.id)
        .eq("devotional_date", verseDevotionalDate)
        .single();

      if (!existing) {
        // Save to devotional_completions to earn points
        const { error } = await supabase.from("devotional_completions").insert({
          user_id: user.id,
          devotional_date: verseDevotionalDate,
        });

        if (error) throw error;
      }

      setIsCompleted(true);
      playSound("achievement");
      triggerConfetti("celebration");
      toast.success("Devocional concluído! +10 pontos");
    } catch (error) {
      console.error("Error completing devotional:", error);
      toast.error("Erro ao marcar como concluído");
    }
  };

  const handleOpenShareModal = async () => {
    setShowShareModal(true);
    if (!imagePreview) {
      await generateImage();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Gerando devocional personalizado...</p>
          <p className="text-xs text-muted-foreground/60">Isso pode levar alguns segundos</p>
        </div>
      </div>
    );
  }

  if (error || !devotional) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Erro ao carregar devocional'}</p>
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        {/* Header */}
        <AppHeader
          userId={user?.id}
          userEmail={user?.email}
          showBack={true}
          showLogo={true}
        />

        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para o Estudo</span>
        </motion.button>

        {/* Generated Badge */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            Devocional gerado por IA
          </span>
        </motion.div>

        {/* Notebook Page Container */}
        <div className="animate-page-turn">
          <div className="notebook-page relative">
            {/* Paper texture background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-50/90 via-yellow-50/70 to-orange-50/50 dark:from-stone-900/80 dark:via-amber-950/40 dark:to-stone-900/60" />
            
            {/* Notebook lines */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="notebook-lines h-full w-full" />
            </div>

            {/* Red margin line */}
            <div className="absolute left-10 sm:left-14 top-0 bottom-0 w-[1px] bg-red-300/40 dark:bg-red-500/20" />

            {/* Content */}
            <div className="relative z-10 p-6 sm:p-8 pl-12 sm:pl-20 space-y-8">
            
              {/* Header */}
              <div className="text-center pb-6 border-b border-amber-200/50 dark:border-amber-800/30">
                <motion.div 
                  className="inline-flex items-center gap-2 text-amber-600/70 dark:text-amber-400/60 mb-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Feather className="w-4 h-4" />
                  <span className="text-sm font-medium tracking-wider uppercase">{formattedDate}</span>
                </motion.div>
                
                <motion.h1 
                  className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 dark:text-amber-100 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {devotional.title}
                </motion.h1>
                
                {isCompleted && (
                  <motion.div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.4 }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Leitura Concluída</span>
                  </motion.div>
                )}
              </div>

              {/* Verse Section */}
              <motion.section 
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <BookOpen className="w-4 h-4" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Versículo</h2>
                </div>
                <blockquote className="font-serif text-lg sm:text-xl text-stone-700 dark:text-stone-300 italic leading-relaxed">
                  "{devotional.verse.text}"
                </blockquote>
                <cite className="block text-sm text-amber-600 dark:text-amber-500 font-medium not-italic">
                  — {devotional.verse.reference}
                </cite>
              </motion.section>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent dark:via-amber-700/30" />
                <span className="text-amber-400 dark:text-amber-600">✦</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent dark:via-amber-700/30" />
              </div>

              {/* Meditation Section */}
              <motion.section 
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <Heart className="w-4 h-4" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Meditação</h2>
                </div>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line">
                  {devotional.meditation}
                </p>
              </motion.section>

              {/* Prayer Section */}
              <motion.section 
                className="space-y-3 p-4 sm:p-5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-400 dark:border-blue-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
              >
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <MessageCircle className="w-4 h-4" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Oração</h2>
                </div>
                <p className="font-serif italic text-stone-600 dark:text-stone-400 leading-relaxed">
                  {devotional.prayer}
                </p>
              </motion.section>

              {/* Phrase of the Day */}
              <motion.section 
                className="space-y-4 text-center py-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-500">
                  <Quote className="w-4 h-4" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Frase do Dia</h2>
                </div>
                <blockquote className="font-serif text-xl sm:text-2xl text-stone-700 dark:text-stone-300 italic leading-relaxed max-w-lg mx-auto">
                  "{devotional.phraseOfDay.text}"
                </blockquote>
                <p className="text-sm text-stone-500 dark:text-stone-500">
                  — {devotional.phraseOfDay.author}
                </p>
              </motion.section>

              {/* Application */}
              <motion.section 
                className="space-y-3 p-4 sm:p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Aplicação</h2>
                </div>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  {devotional.application}
                </p>
              </motion.section>

              {/* Actions */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {!isCompleted ? (
                  <Button
                    onClick={handleComplete}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-6 rounded-xl"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Concluir Leitura
                  </Button>
                ) : (
                  <div className="flex-1 flex items-center justify-center py-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Devocional Concluído!</span>
                  </div>
                )}

                <Button
                  onClick={handleOpenShareModal}
                  className="flex-1 relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-6 rounded-xl animate-pulse"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartilhar
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden shareable card for image generation - same design as /devocional */}
      <div className="fixed -left-[9999px]">
        <div
          ref={cardRef}
          style={{
            width: "1080px",
            height: "1440px",
            background: "linear-gradient(to bottom, #f5f0e1, #ebe5d5)",
            padding: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            fontFamily: "'Georgia', 'Times New Roman', serif",
          }}
        >
          {/* Notebook lines effect */}
          <div
            style={{
              position: "absolute",
              top: "60px",
              left: "60px",
              right: "60px",
              bottom: "60px",
              backgroundImage: "repeating-linear-gradient(transparent, transparent 47px, #d4c4a8 48px)",
              pointerEvents: "none",
            }}
          />

          {/* Red margin line */}
          <div
            style={{
              position: "absolute",
              top: "60px",
              left: "120px",
              bottom: "60px",
              width: "2px",
              background: "rgba(220, 38, 38, 0.3)",
            }}
          />

          {/* Content container */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              paddingLeft: "80px",
              justifyContent: "center",
            }}
          >
            {/* Date */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span
                style={{
                  fontSize: "28px",
                  color: "#92400e",
                  textTransform: "uppercase",
                  letterSpacing: "4px",
                  fontWeight: "600",
                }}
              >
                {formattedDate}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "bold",
                color: "#1f2937",
                textAlign: "center",
                marginBottom: "50px",
                lineHeight: "1.2",
              }}
            >
              ✦ {devotional.title}
            </h1>

            {/* Divider */}
            <div
              style={{
                width: "60%",
                height: "2px",
                background: "linear-gradient(to right, transparent, #d4a574, transparent)",
                margin: "0 auto 50px auto",
              }}
            />

            {/* Verse */}
            <div style={{ marginBottom: "50px", textAlign: "center" }}>
              <p
                style={{
                  fontSize: "32px",
                  fontStyle: "italic",
                  color: "#374151",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                }}
              >
                "{devotional.verse.text}"
              </p>
              <p style={{ fontSize: "24px", color: "#92400e", fontWeight: "600" }}>
                — {devotional.verse.reference}
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                width: "40%",
                height: "1px",
                background: "linear-gradient(to right, transparent, #d4a574, transparent)",
                margin: "0 auto 50px auto",
              }}
            />

            {/* Meditation - full text with dynamic font size */}
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <p
                style={{
                  fontSize: devotional.meditation.length > 600 ? "22px" : devotional.meditation.length > 400 ? "24px" : "28px",
                  color: "#4b5563",
                  lineHeight: devotional.meditation.length > 600 ? "1.6" : "1.8",
                  textAlign: "justify",
                  whiteSpace: "pre-line",
                }}
              >
                {devotional.meditation}
              </p>
            </div>

            {/* Footer */}
            <div
              style={{
                marginTop: "40px",
                paddingTop: "40px",
                borderTop: "2px solid rgba(212, 165, 116, 0.3)",
              }}
            >
              <p style={{ fontSize: "26px", textAlign: "center", fontWeight: "600", letterSpacing: "2px" }}>
                <span style={{ color: "#1f2937" }}>Acesse: </span>
                <span style={{ color: "#2563eb" }}>devocionalzeiros.com.br</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareOptionsModal
        isOpen={showShareModal}
        onClose={() => { setShowShareModal(false); setImagePreview(null); }}
        imagePreview={imagePreview}
        isGenerating={isGeneratingImage}
        onShareWhatsApp={shareToWhatsApp}
        onDownload={downloadImage}
      />
    </div>
  );
};

export default VerseDevotional;
