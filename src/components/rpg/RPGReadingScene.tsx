import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertTriangle, Heart, Highlighter, Wand2, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getBookById } from "@/lib/studyBibleData";
import { RPG_BIBLE_BOOKS, type RPGRegion } from "@/lib/rpgBibleData";
import { useUsageLimits } from "@/hooks/useUsageLimits";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useAuth } from "@/hooks/useAuth";
import { useVerseFavorites } from "@/hooks/useVerseFavorites";
import { UsageLimitModal } from "@/components/shared/UsageLimitModal";
import { BibleTranslation } from "@/lib/bibleService";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { drawMascot, DEFAULT_LOOK } from "@/lib/rpgMascot";

interface Verse {
  number: number;
  text: string;
}

interface VerseStudyData {
  commentary: string;
  keyWords: { word: string; original?: string; meaning?: string }[];
  crossReferences: string[];
  source: string;
}

interface RPGReadingSceneProps {
  bookName: string;
  bookId: string;
  chapter: number;
  verses: Verse[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  userId: string;
  reviewMode?: boolean;
  isAdmin?: boolean;
  translation?: BibleTranslation;
}

const DEFAULT_HIGHLIGHT = "yellow";

// Scene canvas logical resolution (retro), matching the concept mockup.
const SCENE_W = 256;
const SCENE_H = 168;
const GROUND = 132;
const DIMS: SceneDims = { W: SCENE_W, H: SCENE_H, GROUND };

const regionForBook = (bookId: string): RPGRegion =>
  RPG_BIBLE_BOOKS.find((b) => b.id === bookId)?.region || "creation";

/**
 * Leitura Viva — a leitura do capítulo como cena pixel-art: o herói fica no
 * cenário da região e os versículos surgem um a um numa caixa de diálogo (toque
 * ou teclado para avançar). Preserva 100% das ações da Bíblia de Estudo por
 * versículo (estudar com IA, favoritar, grifar) e a tradução unificada.
 */
const RPGReadingScene = ({
  bookName,
  bookId,
  chapter,
  verses,
  isLoading,
  error,
  onRetry,
  userId,
  reviewMode = false,
  isAdmin = false,
  translation,
}: RPGReadingSceneProps) => {
  const { user } = useAuth();
  const { planType } = useUserPlan(user?.email || undefined);
  const { checkLimit, incrementUsage } = useUsageLimits(userId, planType);
  const { isFavorite, getHighlightColor, toggleFavorite, setHighlight } = useVerseFavorites(userId);

  const [idx, setIdx] = useState(0); // verso atual
  const [typedLen, setTypedLen] = useState(0);
  const [typing, setTyping] = useState(true);
  const [studyOpen, setStudyOpen] = useState(false);
  const [verseStudy, setVerseStudy] = useState<VerseStudyData | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);
  const [usageLimitModal, setUsageLimitModal] = useState<
    { isOpen: boolean; featureName: string; currentUsage: number; limit: number; isBlocked: boolean } | null
  >(null);
  // force re-render of favorite/highlight badges after toggle
  const [, forceTick] = useState(0);

  const region = regionForBook(bookId);
  const current = verses[idx];
  const total = verses.length;
  const allRead = idx >= total - 1 && !typing;

  // reset when the chapter/verses change
  useEffect(() => {
    setIdx(0);
    setTypedLen(0);
    setTyping(true);
    setStudyOpen(false);
    setVerseStudy(null);
  }, [bookId, chapter, verses.length]);

  // ----- typewriter -----
  const fullText = current?.text || "";
  useEffect(() => {
    setTypedLen(0);
    setTyping(!!fullText);
  }, [idx, fullText]);

  useEffect(() => {
    if (!typing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTypedLen(fullText.length);
      setTyping(false);
      return;
    }
    const iv = setInterval(() => {
      setTypedLen((n) => {
        if (n >= fullText.length) {
          clearInterval(iv);
          setTyping(false);
          return n;
        }
        return n + 1;
      });
    }, 22);
    return () => clearInterval(iv);
  }, [typing, fullText]);

  const advance = useCallback(() => {
    if (typing) {
      setTypedLen(fullText.length);
      setTyping(false);
      return;
    }
    if (idx < total - 1) {
      setStudyOpen(false);
      setVerseStudy(null);
      setIdx((i) => i + 1);
    }
  }, [typing, fullText.length, idx, total]);

  // keyboard: → / Enter / Space advance
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (studyOpen) {
        if (e.key === "Escape") setStudyOpen(false);
        return;
      }
      if (["ArrowRight", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, studyOpen]);

  // ----- canvas scene -----
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = canvas.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // deterministic seed (no Math.random dependency for SSR safety is unnecessary here,
    // but keep particles stable per mount)
    let seed = 1;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    const particles: Particle[] = seedParticles(region, DIMS, rand);
    let t = 0;
    let last = 0;
    let raf = 0;
    let mounted = true;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16);
      last = now;
      t += dt;
      g.clearRect(0, 0, SCENE_W, SCENE_H);
      drawScene(g, { region, dims: DIMS, particles, t, scroll: 0, reduce });
      drawMascot(g, Math.round(SCENE_W * 0.31), GROUND, DEFAULT_LOOK, { t, reduce });
      if (reduce) return; // single static frame
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [region]);

  // ----- per-verse actions (Study Bible integration) -----
  const openStudy = useCallback(async () => {
    if (!current) return;
    if (verseStudy && studyOpen) {
      setStudyOpen(false);
      return;
    }
    if (!isAdmin && !reviewMode) {
      const limit = checkLimit("rpg_verse_explanation");
      if (!limit.canUse) {
        setUsageLimitModal({
          isOpen: true,
          featureName: "Explicação de Versículo (RPG)",
          currentUsage: limit.currentUsage,
          limit: limit.limit,
          isBlocked: limit.isBlocked,
        });
        return;
      }
      await incrementUsage("rpg_verse_explanation");
    }
    setStudyOpen(true);
    setVerseStudy(null);
    setStudyLoading(true);
    try {
      const book = getBookById(bookId);
      const { data, error: fnError } = await supabase.functions.invoke("verse-study", {
        body: {
          bookId,
          bookName: book?.name || bookName,
          chapter,
          verseNumber: current.number,
          verseText: current.text,
          testament: book?.testament || "old",
        },
      });
      if (fnError) throw fnError;
      if (data?.commentary) setVerseStudy(data as VerseStudyData);
    } catch (err) {
      console.error("Error fetching verse study:", err);
      setVerseStudy({
        commentary: "Não foi possível carregar a explicação. Tente novamente.",
        keyWords: [],
        crossReferences: [],
        source: "Erro",
      });
    } finally {
      setStudyLoading(false);
    }
  }, [current, verseStudy, studyOpen, isAdmin, reviewMode, checkLimit, incrementUsage, bookId, bookName, chapter]);

  const onFavorite = useCallback(async () => {
    if (!current) return;
    await toggleFavorite(bookId, chapter, current.number, current.text);
    forceTick((n) => n + 1);
  }, [current, toggleFavorite, bookId, chapter]);

  const onHighlight = useCallback(async () => {
    if (!current) return;
    const c = getHighlightColor(bookId, chapter, current.number);
    await setHighlight(bookId, chapter, current.number, c ? null : DEFAULT_HIGHLIGHT);
    forceTick((n) => n + 1);
  }, [current, getHighlightColor, setHighlight, bookId, chapter]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-12 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
        <p className="text-white/50 text-sm">Carregando capítulo...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-12 gap-4">
        <AlertTriangle className="w-8 h-8 text-red-400" />
        <p className="text-red-400 text-sm">{error}</p>
        <Button onClick={onRetry} variant="outline" size="sm" className="border-white/20 text-white">
          Tentar novamente
        </Button>
      </div>
    );
  }

  const fav = current ? isFavorite(bookId, chapter, current.number) : false;
  const highlighted = current ? !!getHighlightColor(bookId, chapter, current.number) : false;

  return (
    <div className="flex-1 overflow-y-auto p-3">
      {/* Scene */}
      <div
        className="relative rounded-lg overflow-hidden border-2 border-black/60 select-none"
        style={{ boxShadow: "inset 0 0 40px #000", cursor: "pointer", touchAction: "manipulation" }}
        onClick={advance}
        role="button"
        aria-label="Avançar versículo"
      >
        <canvas
          ref={canvasRef}
          width={SCENE_W}
          height={SCENE_H}
          className="block w-full h-auto"
          style={{ imageRendering: "pixelated" }}
          aria-hidden="true"
        />
        {/* scanlines + vignette for the retro feel */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-multiply"
          style={{ background: "repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.16) 2px 3px)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(130% 100% at 50% 45%, transparent 55%, rgba(0,0,0,.5) 100%)" }}
        />

        {/* HUD: verse counter */}
        <div className="absolute top-2 right-2 text-[10px] font-bold text-white/80 bg-black/50 border border-white/20 rounded-lg px-2 py-0.5">
          {total > 0 ? `${idx + 1}/${total}` : ""}
        </div>
        {translation && (
          <div className="absolute top-2 left-2 text-[9px] font-bold text-amber-200/90 bg-black/50 border border-amber-500/30 rounded-lg px-2 py-0.5">
            {translation}
          </div>
        )}

        {/* Dialogue box */}
        <div className="absolute left-2 right-2 bottom-2 rounded-md border-2 border-amber-500/80 bg-gradient-to-b from-[#141c30ee] to-[#0b1120ee] px-3 py-2 shadow-[0_0_0_2px_#0b0805]">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-amber-300 mb-0.5">
            <span>{bookName}</span>
            <span className="text-white/40">
              {bookName} {chapter}:{current?.number ?? ""}
            </span>
          </div>
          <p className="text-[13px] leading-snug text-blue-50 min-h-[2.7em]">
            {fullText.slice(0, typedLen)}
            {typing && <span className="text-amber-300 animate-pulse">▌</span>}
          </p>
          <div className="mt-0.5 text-right text-[9px] text-white/40">
            {typing ? "toque para completar" : allRead ? "capítulo lido ✓" : "toque para continuar ▶"}
          </div>
        </div>
      </div>

      {/* Action row for the CURRENT verse — Study Bible features preserved */}
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={openStudy}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-colors"
        >
          <Wand2 className="w-3.5 h-3.5" /> Estudar versículo
        </button>
        <button
          onClick={onHighlight}
          title={highlighted ? "Remover grifo" : "Grifar"}
          className={`p-2 rounded-lg border transition-colors ${
            highlighted
              ? "text-yellow-300 bg-yellow-400/15 border-yellow-400/40"
              : "text-white/50 border-white/15 hover:text-yellow-300 hover:bg-white/5"
          }`}
        >
          <Highlighter className="w-4 h-4" />
        </button>
        <button
          onClick={onFavorite}
          title={fav ? "Remover dos favoritos" : "Favoritar"}
          className={`p-2 rounded-lg border transition-colors ${
            fav ? "text-red-400 bg-red-500/15 border-red-500/40" : "text-white/50 border-white/15 hover:text-red-300 hover:bg-white/5"
          }`}
        >
          <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
        </button>
      </div>

      <p className="mt-2 text-center text-[10px] text-emerald-300/60">
        Favoritos e grifos sincronizados com a Bíblia de Estudo
      </p>

      {/* Centered study overlay */}
      <AnimatePresence>
        {studyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70"
            onClick={() => setStudyOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md max-h-[80vh] overflow-y-auto rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#141c30] to-[#0b1120] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-black text-amber-400">
                  📖 {bookName} {chapter}:{current?.number}
                </h3>
                <button onClick={() => setStudyOpen(false)} className="text-white/40 hover:text-white text-lg leading-none">
                  ✕
                </button>
              </div>
              {studyLoading ? (
                <div className="flex items-center gap-2 py-6 justify-center">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span className="text-xs text-white/50">Carregando explicação...</span>
                </div>
              ) : verseStudy ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-amber-400 uppercase mb-1">Comentário</p>
                    <p className="text-xs text-white/70 leading-relaxed">{verseStudy.commentary}</p>
                  </div>
                  {verseStudy.keyWords?.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">🔤 Palavras-chave</p>
                      <div className="flex flex-wrap gap-1.5">
                        {verseStudy.keyWords.map((kw, i) => (
                          <span key={i} className="text-[10px] bg-blue-500/15 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/20">
                            {typeof kw === "string" ? kw : kw.word}
                            {typeof kw !== "string" && kw.original && <span className="text-blue-400/60 ml-1">({kw.original})</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {verseStudy.crossReferences?.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-green-400 uppercase mb-1">🔗 Referências Cruzadas</p>
                      <div className="flex flex-wrap gap-1.5">
                        {verseStudy.crossReferences.map((ref, i) => (
                          <span key={i} className="text-[10px] bg-green-500/15 text-green-300 px-2 py-0.5 rounded-full border border-green-500/20">
                            {ref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {verseStudy.source && <p className="text-[9px] text-white/30 italic">Fonte: {verseStudy.source}</p>}
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Usage Limit Modal */}
      {usageLimitModal && (
        <UsageLimitModal
          isOpen={usageLimitModal.isOpen}
          onClose={() => setUsageLimitModal(null)}
          featureName={usageLimitModal.featureName}
          currentUsage={usageLimitModal.currentUsage}
          limit={usageLimitModal.limit}
          isBlocked={usageLimitModal.isBlocked}
          planType={planType || "free"}
        />
      )}

      {/* subtle hint when the whole chapter has been read */}
      {allRead && (
        <div className="mt-2 flex items-center justify-center gap-1 text-[11px] text-amber-300/80">
          <ChevronRight className="w-3.5 h-3.5" />
          Você leu o capítulo — avance para o desafio abaixo
        </div>
      )}
    </div>
  );
};

export default RPGReadingScene;
