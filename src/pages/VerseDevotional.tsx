import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Heart,
  MessageCircle,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Quote,
  Feather,
  Share2,
  Wand2
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

  // Check if already completed this verse devotional
  useEffect(() => {
    const checkCompletion = async () => {
      if (!user || !bookId || !chapter || !verse) return;
      
      const verseKey = `verse-${bookId}-${chapter}-${verse}`;
      const { data } = await supabase
        .from("devotional_completions")
        .select("id")
        .eq("user_id", user.id)
        .eq("notes", verseKey)
        .maybeSingle();
      
      if (data) {
        setIsCompleted(true);
      }
    };
    
    checkCompletion();
  }, [user, bookId, chapter, verse]);

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

  // Generate shareable image — retorna o dataUrl para uso direto
  const generateImage = async (): Promise<string | null> => {
    if (!cardRef.current) return null;
    setIsGeneratingImage(true);
    try {
      // Delay + rAF garante renderização completa no mobile antes da captura
      await new Promise((r) => setTimeout(r, 200));
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
        width: 1080,
        height: 1920,
        style: { opacity: "1" },
      });
      setImagePreview(dataUrl);
      return dataUrl;
    } catch (err) {
      console.error('Error generating image:', err);
      toast.error('Erro ao gerar imagem');
      return null;
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const downloadImage = async () => {
    let dataUrl = imagePreview;
    if (!dataUrl) dataUrl = await generateImage();
    if (!dataUrl) return;
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.download = `devocional-${bookName}-${chapter}-${verse}.png`;
      link.href = blobUrl;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => { document.body.removeChild(link); URL.revokeObjectURL(blobUrl); }, 100);
      toast.success('Imagem baixada! Poste nos Stories 📸');
    } catch (err) {
      toast.error('Erro ao baixar imagem');
    }
  };

  const shareToWhatsApp = async () => {
    let dataUrl = imagePreview;
    if (!dataUrl) dataUrl = await generateImage();
    if (!dataUrl || !devotional) return;

    const shareText = "Confira meu devocional do versículo! 🙏\n\nAcesse: devocionalzeiros.com.br";

    // Web Share API com arquivo — funciona no mobile (WhatsApp, Instagram, etc.)
    if (navigator.share && navigator.canShare) {
      try {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], "devocional.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: devotional.title, text: shareText });
          toast.success("Compartilhado com sucesso!");
          return;
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") console.error(err);
      }
    }

    // Fallback: baixa a imagem como blob e abre WhatsApp
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.style.display = "none";
      link.download = `devocional-${bookName}-${chapter}-${verse}.png`;
      link.href = blobUrl;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
        toast.success("Imagem baixada! Anexe no WhatsApp 📱");
      }, 500);
    } catch (err) {
      console.error("Share error:", err);
      toast.error("Erro ao compartilhar");
    }
  };

  const handleComplete = async () => {
    if (!user || isCompleted) return;

    // Create a unique identifier for this verse devotional
    const verseKey = `verse-${bookId}-${chapter}-${verse}`;

    try {
      // Check if already completed this specific verse devotional
      const { data: existing } = await supabase
        .from("devotional_completions")
        .select("id")
        .eq("user_id", user.id)
        .eq("notes", verseKey)
        .maybeSingle();

      if (existing) {
        // Already completed, just update UI
        setIsCompleted(true);
        toast.info("Devocional já foi concluído anteriormente!");
        return;
      }

      // Create a truly unique date using a hash-like approach
      // Use bookId hash + chapter + verse to create unique combinations
      const bookHash = bookId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const year = 1900 + (bookHash % 100);
      const month = (chapter % 12) + 1;
      const day = (verse % 28) + 1;
      const uniqueDateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Save to devotional_completions to earn points
      const { error } = await supabase.from("devotional_completions").insert({
        user_id: user.id,
        devotional_date: uniqueDateStr,
        notes: verseKey,
      });

      if (error) {
        // If unique constraint error, means already exists
        if (error.code === '23505') {
          setIsCompleted(true);
          toast.info("Devocional já foi concluído!");
          return;
        }
        throw error;
      }

      setIsCompleted(true);
      playSound("achievement");
      triggerConfetti("celebration");
      toast.success("Devocional concluído! +1 ponto");
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
          <div className="relative">
            <Wand2 className="w-10 h-10 text-primary animate-pulse" />
            <Loader2 className="w-6 h-6 animate-spin text-primary absolute -bottom-1 -right-1" />
          </div>
          <p className="text-muted-foreground font-medium">Preparando seu devocional...</p>
          <p className="text-xs text-muted-foreground/60 text-center max-w-xs">
            Estamos criando uma reflexão personalizada para você
          </p>
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
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 pb-24">
        {/* Header */}
        <AppHeader
          userId={user?.id}
          userEmail={user?.email}
          showBack={true}
          showLogo={true}
        />

        {/* Back Button */}
        <motion.button
          onClick={() => {
            // Try to go back, fallback to study bible if no history
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate('/biblia-estudo');
            }
          }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          whileHover={{ x: -4 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para o Estudo</span>
        </motion.button>

        {/* Generated Badge */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
            <Wand2 className="w-3 h-3" />
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
                  transition={{ duration: 0.25, delay: 0.05 }}
                >
                  <Feather className="w-4 h-4" />
                  <span className="text-sm font-medium tracking-wider uppercase">{formattedDate}</span>
                </motion.div>
                
                <motion.h1 
                  className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 dark:text-amber-100 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                >
                  {devotional.title}
                </motion.h1>
                
                {isCompleted && (
                  <motion.div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.3, delay: 0.1 }}
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
                transition={{ duration: 0.25, delay: 0.1 }}
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
                transition={{ duration: 0.25, delay: 0.15 }}
              >
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <Heart className="w-4 h-4" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Meditação</h2>
                </div>
                <p className="font-serif text-lg sm:text-xl text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                  {devotional.meditation}
                </p>

              </motion.section>

              {/* Prayer Section */}
              <motion.section 
                className="space-y-3 p-4 sm:p-5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-400 dark:border-blue-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.2 }}
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
                transition={{ duration: 0.25, delay: 0.25 }}
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
                transition={{ duration: 0.25, delay: 0.3 }}
              >
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Wand2 className="w-4 h-4" />
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
                transition={{ duration: 0.25, delay: 0.35 }}
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

      {/* Hidden shareable card for image generation - ruled paper 9:16 */}
      <div style={{ position: "fixed", top: 0, left: 0, opacity: 0.001, pointerEvents: "none", zIndex: -9999 }}>
        {(() => {
          const cream = "#fbf6e9";
          const ink = "#1e293b";
          const blue = "#1d4ed8";
          const gold = "#b8860b";
          const ruleColor = "rgba(29, 78, 216, 0.18)";
          const med = devotional.meditation || "";
          const baseFontSize = med.length > 900 ? 26 : med.length > 600 ? 28 : 30;
          const phrase = (devotional as any).phraseOfDay;
          return (
            <div
              ref={cardRef}
              style={{
                width: "1080px",
                height: "1920px",
                background: cream,
                position: "relative",
                fontFamily: "'DM Sans', 'Karla', system-ui, sans-serif",
                overflow: "hidden",
                color: ink,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 63px, ${ruleColor} 63px, ${ruleColor} 64px)`,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "90px",
                  width: "2px",
                  background: "rgba(184, 134, 11, 0.45)",
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  paddingLeft: "120px",
                  paddingRight: "80px",
                  paddingTop: "100px",
                  paddingBottom: "80px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  gap: "28px",
                }}
              >
                {/* Header centralized */}
                <div style={{ textAlign: "center" }}>
                  <h1
                    style={{
                      fontSize: "62px",
                      fontWeight: 500,
                      color: blue,
                      lineHeight: 1.05,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      letterSpacing: "8px",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    Devocional do Versículo
                  </h1>
                  <div style={{ margin: "20px auto 0", width: "120px", height: "1px", background: gold }} />
                  <p
                    style={{
                      marginTop: "16px",
                      fontSize: "20px",
                      color: gold,
                      letterSpacing: "5px",
                      fontWeight: 400,
                      textTransform: "uppercase",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {formattedDate}
                  </p>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontSize: "42px",
                    fontWeight: 500,
                    color: ink,
                    lineHeight: 1.2,
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    margin: "10px 0 0 0",
                    textAlign: "center",
                  }}
                >
                  {devotional.title}
                </h2>

                {/* Reference + verse text */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                    <div style={{ width: "60px", height: "1px", background: gold, flexShrink: 0 }} />
                    <span
                      style={{
                        fontSize: "30px",
                        color: blue,
                        fontWeight: 500,
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        letterSpacing: "4px",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {bookName} {chapter}:{verse}
                    </span>
                  </div>
                  {verseText && (
                    <p
                      style={{
                        fontSize: `${baseFontSize}px`,
                        lineHeight: 1.65,
                        color: "#334155",
                        fontWeight: 400,
                        fontStyle: "italic",
                        margin: "20px 0 0 0",
                      }}
                    >
                      “{verseText}”
                    </p>
                  )}
                </div>

                {/* Meditation */}
                <div style={{ marginTop: "12px" }}>
                  <p
                    style={{
                      fontSize: "32px",
                      color: blue,
                      fontWeight: 500,
                      letterSpacing: "5px",
                      textTransform: "uppercase",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      margin: "0 0 20px 0",
                    }}
                  >
                    Meditação
                  </p>
                  <p
                    style={{
                      fontSize: `${baseFontSize}px`,
                      color: "#334155",
                      fontWeight: 400,
                      lineHeight: 1.65,
                      margin: 0,
                      textAlign: "justify",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {devotional.meditation}
                  </p>
                </div>

                {/* Frase do dia - destaque */}
                {phrase?.text && (
                  <div
                    style={{
                      marginTop: "auto",
                      padding: "32px 36px",
                      background: "rgba(29, 78, 216, 0.06)",
                      borderLeft: `3px solid ${gold}`,
                      borderRadius: "4px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "22px",
                        color: gold,
                        fontWeight: 500,
                        letterSpacing: "5px",
                        textTransform: "uppercase",
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        margin: "0 0 14px 0",
                      }}
                    >
                      Frase do Dia
                    </p>
                    <p
                      style={{
                        fontSize: "30px",
                        lineHeight: 1.45,
                        color: ink,
                        fontWeight: 400,
                        fontStyle: "italic",
                        margin: 0,
                      }}
                    >
                      “{phrase.text}”
                    </p>
                  </div>
                )}

                {/* CTA Footer */}
                <div
                  style={{
                    borderTop: `1px solid ${gold}`,
                    paddingTop: "26px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "20px",
                      color: ink,
                      fontWeight: 400,
                      letterSpacing: "5px",
                      textTransform: "uppercase",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      margin: 0,
                    }}
                  >
                    Acesse a plataforma completa
                  </p>
                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "30px",
                      color: blue,
                      fontWeight: 500,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    devocionalzeiros.com.br
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
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
