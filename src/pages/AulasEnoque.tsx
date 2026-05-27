import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAulasSession } from "@/hooks/useAulasSession";
import { getAulasToken, SUPPORT_WHATSAPP_URL } from "@/lib/aulasAuth";
import { AulasHeader } from "@/components/aulas/AulasHeader";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Lock,
  Loader2,
  X,
  Star,
  Highlighter,
  Feather,
  Scroll,
  Bookmark,
  MessageSquareQuote,
  Headphones,
  Play,
  Pause,
  Video,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import enoqueData from "@/data/enoque.json";
import coverImg from "@/assets/enoque-cover.png";

const ENOQUE_SLUG = "os-segredos-do-livro-de-enoque";

type Verse = { n: number; t: string };
type Chapter = { n: number; verses: Verse[] };
const BOOK = enoqueData as { title: string; subtitle: string; sourceNote: string; chapters: Chapter[] };

// ───────────────── Local persistence (per-device, keyed by aulas email) ─────────────────
type MarksState = { favorites: string[]; highlights: string[] }; // "ch:v"
const KEY = (email: string | null | undefined) => `enoque:marks:${(email || "anon").toLowerCase()}`;

function loadMarks(email?: string | null): MarksState {
  try {
    const raw = localStorage.getItem(KEY(email));
    if (!raw) return { favorites: [], highlights: [] };
    const p = JSON.parse(raw);
    return { favorites: Array.isArray(p.favorites) ? p.favorites : [], highlights: Array.isArray(p.highlights) ? p.highlights : [] };
  } catch {
    return { favorites: [], highlights: [] };
  }
}
function saveMarks(email: string | null | undefined, state: MarksState) {
  try { localStorage.setItem(KEY(email), JSON.stringify(state)); } catch {}
}

// Last reading position
const LAST_KEY = (email: string | null | undefined) => `enoque:last:${(email || "anon").toLowerCase()}`;
function loadLastChapter(email?: string | null): number | null {
  try {
    const raw = localStorage.getItem(LAST_KEY(email));
    if (!raw) return null;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch { return null; }
}
function saveLastChapter(email: string | null | undefined, ch: number) {
  try { localStorage.setItem(LAST_KEY(email), String(ch)); } catch {}
}

function useMarks(email?: string | null) {
  const [marks, setMarks] = useState<MarksState>(() => loadMarks(email));
  useEffect(() => { setMarks(loadMarks(email)); }, [email]);

  const toggleFavorite = useCallback((ch: number, v: number) => {
    const id = `${ch}:${v}`;
    setMarks((prev) => {
      const has = prev.favorites.includes(id);
      const next = { ...prev, favorites: has ? prev.favorites.filter((x) => x !== id) : [...prev.favorites, id] };
      saveMarks(email, next);
      return next;
    });
  }, [email]);

  const toggleHighlight = useCallback((ch: number, v: number) => {
    const id = `${ch}:${v}`;
    setMarks((prev) => {
      const has = prev.highlights.includes(id);
      const next = { ...prev, highlights: has ? prev.highlights.filter((x) => x !== id) : [...prev.highlights, id] };
      saveMarks(email, next);
      return next;
    });
  }, [email]);

  const isFavorite = useCallback((ch: number, v: number) => marks.favorites.includes(`${ch}:${v}`), [marks]);
  const isHighlighted = useCallback((ch: number, v: number) => marks.highlights.includes(`${ch}:${v}`), [marks]);

  return { marks, toggleFavorite, toggleHighlight, isFavorite, isHighlighted };
}

function useEnoqueAccess() {
  const { session, loading } = useAulasSession();
  const hasAccess = !!session && (session.is_admin || (session.allowed_curso_ids?.length ?? 0) > 0);
  return { loading, logged: !!session, hasAccess, isAdmin: !!session?.is_admin, email: session?.email ?? null };
}

// ───────────────── Intro ─────────────────
export function AulasEnoqueIntro() {
  const navigate = useNavigate();
  const { loading, logged, hasAccess, email } = useEnoqueAccess();
  const lastCh = useMemo(() => loadLastChapter(email), [email]);

  useEffect(() => {
    if (!loading && !logged) navigate("/aulas/login");
  }, [loading, logged, navigate]);

  // Prefetch reader chunk + first chapter data on mount for fluid open
  useEffect(() => {
    if (hasAccess) {
      const ric = (window as any).requestIdleCallback || ((cb: any) => setTimeout(cb, 200));
      ric(() => { import("@/pages/AulasEnoque").catch(() => {}); });
    }
  }, [hasAccess]);

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <AulasHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 pb-24 sm:px-6 sm:py-12">
        <Link to="/aulas" className="mb-6 inline-flex items-center gap-1 text-xs text-white/50 hover:text-white">
          <ChevronLeft className="h-3 w-3" /> Voltar à área de membros
        </Link>

        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:gap-10">
          <div className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl ring-1 ring-amber-500/30 shadow-[0_30px_80px_-30px_rgba(245,158,11,0.55)]">
            <img src={coverImg} alt="Os Segredos do Livro de Enoque" className="block w-full" />
          </div>

          <div>
            <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300 ring-1 ring-amber-500/30">
              <Scroll className="h-3 w-3" /> Edição de estudo
            </p>
            <h1 className="font-montserrat text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                O Livro de Enoque
              </span>
            </h1>
            <p className="mt-2 text-sm font-medium text-amber-200/80 sm:text-base">
              Enoque Etíope — texto integral com comentário versículo a versículo.
            </p>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/75">
              <p>
                O <b className="text-white">Livro de Enoque</b> é um dos mais importantes escritos da literatura
                judaica do Segundo Templo. Atribuído ao patriarca antediluviano <i>Enoque, sétimo desde Adão</i>
                {" "}(Gn 5,18-24), o homem que “andou com Deus, e já não foi achado, porque Deus o tomou”.
              </p>
              <p>
                Foi lido e citado no cristianismo primitivo — basta abrir a <b className="text-white">Epístola de Judas</b>
                {" "}(Jd 14-15), com ecos em 2 Pedro 2,4 e Hebreus 11,5. Preservado integralmente apenas em
                manuscritos etíopes (Ge'ez), por isso é também chamado de <i>Enoque Etíope</i>.
              </p>
              <p>
                Você encontrará a queda dos <b className="text-white">Vigilantes</b>, a origem dos Nefilim,
                a ascensão de Enoque pelos céus, parábolas messiânicas, segredos das luminárias e visões do
                Juízo. Chave de leitura para Gênesis 6 e para a angelologia bíblica.
              </p>
              <p className="text-white/60">
                Cada versículo traz um <b className="text-amber-200">comentário breve</b> com referências bíblicas.
                Use os botões para abrir o <b className="text-amber-200">comentário</b>, <b className="text-amber-200">favoritar</b> ou
                <b className="text-amber-200"> grifar</b> trechos para revisitar depois.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {hasAccess ? (
                <>
                  <Button
                    onClick={() => navigate(`/aulas/enoque/ler/${lastCh ?? 1}`)}
                    className="h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 text-base font-bold text-black shadow-[0_10px_30px_-10px_rgba(245,158,11,0.65)] hover:from-amber-400 hover:to-amber-500"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    {lastCh && lastCh > 1 ? `Continuar (cap. ${lastCh})` : "Iniciar leitura"}
                  </Button>
                  {lastCh && lastCh > 1 && (
                    <Button
                      variant="ghost"
                      onClick={() => navigate("/aulas/enoque/ler/1")}
                      className="h-12 rounded-full bg-white/5 px-5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
                    >
                      Recomeçar
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/aulas/enoque/favoritos")}
                    className="h-12 rounded-full bg-white/5 px-5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
                  >
                    <Bookmark className="mr-2 h-4 w-4 text-amber-300" /> Favoritos
                  </Button>
                </>
              ) : (
                <a
                  href={SUPPORT_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-white/5 px-7 text-base font-semibold text-white ring-1 ring-white/15 hover:bg-white/10"
                >
                  <Lock className="h-4 w-4" /> Adquirir acesso
                </a>
              )}
              <div className="flex items-center gap-3 text-xs text-white/40">
                <span>{BOOK.chapters.length} capítulos</span>
                <span>•</span>
                <span>{BOOK.chapters.reduce((a, c) => a + c.verses.length, 0)} versículos</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ───────────────── Reader ─────────────────
export function AulasEnoqueReader() {
  const navigate = useNavigate();
  const { chapter: chParam } = useParams<{ chapter: string }>();
  const { loading, logged, hasAccess, email } = useEnoqueAccess();
  const ch = Math.max(1, Math.min(BOOK.chapters.length, parseInt(chParam ?? "1", 10) || 1));
  const chapter = useMemo(() => BOOK.chapters.find((c) => c.n === ch) ?? BOOK.chapters[0], [ch]);
  const [activeVerse, setActiveVerse] = useState<number | null>(null);
  const marks = useMarks(email);

  useEffect(() => {
    if (!loading && !logged) navigate("/aulas/login");
  }, [loading, logged, navigate]);

  useEffect(() => {
    setActiveVerse(null);
    saveLastChapter(email, ch);
    // Restore scroll if returning to same chapter, else scroll to top
    const scrollKey = `enoque:scroll:${(email || "anon").toLowerCase()}:${ch}`;
    const saved = parseInt(sessionStorage.getItem(scrollKey) || "0", 10);
    if (saved > 0) {
      window.scrollTo({ top: saved, behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    const onScroll = () => {
      try { sessionStorage.setItem(scrollKey, String(window.scrollY)); } catch {}
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ch, email]);

  const prev = ch > 1 ? ch - 1 : null;
  const next = ch < BOOK.chapters[BOOK.chapters.length - 1].n ? ch + 1 : null;

  if (!hasAccess && !loading) {
    return (
      <div className="min-h-screen bg-[#070707] text-white">
        <AulasHeader />
        <div className="mx-auto max-w-md px-4 py-20 text-center">
          <Lock className="mx-auto mb-4 h-8 w-8 text-amber-400" />
          <h2 className="font-montserrat text-xl font-bold">Acesso exclusivo</h2>
          <p className="mt-2 text-sm text-white/60">Adquira o Portal de Enoque para liberar a leitura.</p>
          <a href={SUPPORT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
             className="mt-6 inline-flex h-11 items-center rounded-full bg-amber-500 px-6 text-sm font-bold text-black">Adquirir</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0907] via-[#070707] to-black text-white">
      <AulasHeader />
      <main className="mx-auto max-w-3xl px-4 pb-32 pt-6 sm:px-6 sm:pt-10">
        <div className="mb-6 flex items-center justify-between gap-2">
          <Link to="/aulas/enoque" className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white">
            <ChevronLeft className="h-3 w-3" /> Voltar
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/aulas/enoque/videos")}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 ring-1 ring-white/10 hover:bg-white/10"
            >
              <Video className="h-3.5 w-3.5 text-amber-300" /> Vídeos
            </button>
            <button
              onClick={() => navigate("/aulas/enoque/favoritos")}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 ring-1 ring-white/10 hover:bg-white/10"
            >
              <Bookmark className="h-3.5 w-3.5 text-amber-300" /> Favoritos
            </button>
            <ChapterPicker current={ch} onPick={(n) => navigate(`/aulas/enoque/ler/${n}`)} />
          </div>
        </div>

        <header className="mb-8 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-300/80">Enoque Etíope</p>
          <h1 className="mt-2 font-montserrat text-4xl font-black leading-none sm:text-5xl">
            Capítulo <span className="bg-gradient-to-br from-amber-200 to-amber-500 bg-clip-text text-transparent">{chapter.n}</span>
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
        </header>

        <article className="space-y-5">
          {chapter.verses.map((v) => (
            <VerseRow
              key={v.n}
              chapter={chapter.n}
              verse={v}
              active={activeVerse === v.n}
              onToggle={() => setActiveVerse((cur) => (cur === v.n ? null : v.n))}
              favorite={marks.isFavorite(chapter.n, v.n)}
              highlighted={marks.isHighlighted(chapter.n, v.n)}
              onToggleFavorite={() => marks.toggleFavorite(chapter.n, v.n)}
              onToggleHighlight={() => marks.toggleHighlight(chapter.n, v.n)}
            />
          ))}
        </article>

        <ChapterAudioPlayer chapter={chapter} />



        <nav className="mt-12 flex items-center justify-between gap-3">
          <Button variant="ghost" disabled={!prev} onClick={() => prev && navigate(`/aulas/enoque/ler/${prev}`)}
            className="text-white/70 hover:bg-white/5 hover:text-white disabled:opacity-30">
            <ChevronLeft className="mr-1 h-4 w-4" /> Capítulo anterior
          </Button>
          <span className="text-xs text-white/30">{ch} / {BOOK.chapters[BOOK.chapters.length - 1].n}</span>
          <Button disabled={!next} onClick={() => next && navigate(`/aulas/enoque/ler/${next}`)}
            className="bg-amber-500 text-black hover:bg-amber-400 disabled:opacity-30">
            Próximo <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </nav>
      </main>
    </div>
  );
}

// ───────────────── Favorites tab ─────────────────
export function AulasEnoqueFavoritos() {
  const navigate = useNavigate();
  const { loading, logged, hasAccess, email } = useEnoqueAccess();
  const { marks, toggleFavorite } = useMarks(email);

  useEffect(() => {
    if (!loading && !logged) navigate("/aulas/login");
  }, [loading, logged, navigate]);

  const items = useMemo(() => {
    return marks.favorites
      .map((id) => {
        const [ch, vn] = id.split(":").map(Number);
        const c = BOOK.chapters.find((x) => x.n === ch);
        const v = c?.verses.find((x) => x.n === vn);
        return v && c ? { ch, v } : null;
      })
      .filter((x): x is { ch: number; v: Verse } => !!x)
      .sort((a, b) => a.ch - b.ch || a.v.n - b.v.n);
  }, [marks.favorites]);

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <AulasHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 pb-24 sm:px-6 sm:py-12">
        <Link to="/aulas/enoque" className="mb-6 inline-flex items-center gap-1 text-xs text-white/50 hover:text-white">
          <ChevronLeft className="h-3 w-3" /> Voltar
        </Link>

        <h1 className="font-montserrat text-2xl font-black sm:text-3xl">
          <span className="bg-gradient-to-br from-amber-200 to-amber-500 bg-clip-text text-transparent">
            Versículos favoritos
          </span>
        </h1>
        <p className="mt-1 text-sm text-white/50">
          {items.length === 0 ? "Você ainda não favoritou nenhum versículo." : `${items.length} versículo${items.length === 1 ? "" : "s"} salvos.`}
        </p>

        {!hasAccess && !loading && (
          <p className="mt-6 text-sm text-amber-300/80">Adquira o Portal de Enoque para acessar a leitura.</p>
        )}

        <ul className="mt-8 space-y-3">
          {items.map(({ ch, v }) => (
            <li key={`${ch}:${v.n}`} className="rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={() => hasAccess && navigate(`/aulas/enoque/ler/${ch}`)}
                  className="text-left"
                >
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300/80">
                    Capítulo {ch} · v. {v.n}
                  </p>
                  <p className="font-['Cormorant_Garamond',serif] text-[18px] leading-[1.6] text-white/90 sm:text-[20px]">
                    {v.t}
                  </p>
                </button>
                <button
                  onClick={() => toggleFavorite(ch, v.n)}
                  className="flex-shrink-0 rounded-full p-1.5 text-amber-400 hover:bg-amber-500/10"
                  aria-label="Remover dos favoritos"
                >
                  <Star className="h-4 w-4 fill-current" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

// ───────────────── Pieces ─────────────────
function ChapterPicker({ current, onPick }: { current: number; onPick: (n: number) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 ring-1 ring-white/10 hover:bg-white/10">
        <BookOpen className="h-3.5 w-3.5 text-amber-300" /> Capítulos
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-[#0d0d0d] p-4 ring-1 ring-white/10 sm:rounded-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-montserrat text-sm font-bold">Selecione um capítulo</h3>
              <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white"><X className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
              {BOOK.chapters.map((c) => (
                <button key={c.n} onClick={() => { onPick(c.n); setOpen(false); }}
                  className={`h-10 rounded-lg text-sm font-semibold ring-1 transition ${c.n === current ? "bg-amber-500 text-black ring-amber-400" : "bg-white/5 text-white/80 ring-white/10 hover:bg-white/10"}`}>
                  {c.n}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function VerseRow({
  chapter, verse, active, onToggle,
  favorite, highlighted, onToggleFavorite, onToggleHighlight,
}: {
  chapter: number; verse: Verse; active: boolean; onToggle: () => void;
  favorite: boolean; highlighted: boolean;
  onToggleFavorite: () => void; onToggleHighlight: () => void;
}) {
  const [exp, setExp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!active || exp || loading) return;
    setLoading(true); setErr(null);
    (async () => {
      try {
        const FN_BASE = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1`;
        const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const token = getAulasToken();
        const res = await fetch(`${FN_BASE}/enoque-verse-explanation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: ANON, Authorization: `Bearer ${ANON}`,
            ...(token ? { "x-aulas-token": token } : {}),
          },
          body: JSON.stringify({ chapter, verse: verse.n, text: verse.t }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Falha");
        setExp(data.explanation);
      } catch (e: any) { setErr(e?.message || "Erro"); }
      finally { setLoading(false); }
    })();
  }, [active, chapter, verse, exp, loading]);

  return (
    <div
      className={`group rounded-xl border px-4 py-3 transition-colors sm:px-5 sm:py-4 ${
        active
          ? "border-amber-500/30 bg-amber-500/[0.04]"
          : highlighted
          ? "border-amber-400/25 bg-amber-300/[0.06]"
          : "border-transparent hover:border-white/5 hover:bg-white/[0.02]"
      }`}
    >
      <div className="flex w-full items-start gap-3">
        <span
          className={`mt-0.5 inline-flex h-7 min-w-7 select-none items-center justify-center rounded-full px-1.5 font-montserrat text-[11px] font-bold tabular-nums ring-1 transition ${
            active ? "bg-amber-500 text-black ring-amber-400" : "bg-white/5 text-amber-300/90 ring-white/10"
          }`}
          aria-label={`Versículo ${verse.n}`}
        >
          {verse.n}
        </span>
        <p
          className={`flex-1 font-['Cormorant_Garamond',serif] text-[19px] leading-[1.7] sm:text-[21px] ${
            highlighted ? "rounded bg-amber-300/15 px-1 text-amber-50" : "text-white/90"
          }`}
        >
          {verse.t}
        </p>
      </div>

      {/* Action bar */}
      <div className="mt-2 ml-10 flex flex-wrap items-center gap-1">
        <button
          onClick={onToggle}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 transition ${
            active
              ? "bg-amber-500/20 text-amber-200 ring-amber-500/50"
              : "bg-white/[0.03] text-white/50 ring-white/10 hover:bg-white/[0.06] hover:text-white/80"
          }`}
          aria-label="Ver comentário"
        >
          <MessageSquareQuote className="h-3 w-3" /> {active ? "Fechar" : "Comentário"}
        </button>
        <button
          onClick={onToggleFavorite}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 transition ${
            favorite
              ? "bg-amber-500/15 text-amber-300 ring-amber-500/40"
              : "bg-white/[0.03] text-white/50 ring-white/10 hover:bg-white/[0.06] hover:text-white/80"
          }`}
          aria-label="Favoritar versículo"
        >
          <Star className={`h-3 w-3 ${favorite ? "fill-current" : ""}`} /> {favorite ? "Favorito" : "Favoritar"}
        </button>
        <button
          onClick={onToggleHighlight}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 transition ${
            highlighted
              ? "bg-amber-400/15 text-amber-200 ring-amber-400/40"
              : "bg-white/[0.03] text-white/50 ring-white/10 hover:bg-white/[0.06] hover:text-white/80"
          }`}
          aria-label="Grifar versículo"
        >
          <Highlighter className="h-3 w-3" /> {highlighted ? "Grifado" : "Grifar"}
        </button>
      </div>

      {active && (
        <div className="mt-3 ml-10 rounded-lg border border-amber-500/20 bg-black/40 p-3 sm:p-4">
          <div className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
            <Feather className="h-3 w-3" /> Comentário
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Loader2 className="h-4 w-4 animate-spin text-amber-400" /> Consultando as escrituras…
            </div>
          )}
          {err && <p className="text-sm text-red-400">{err}</p>}
          {exp && (
            <div className="whitespace-pre-wrap text-[14px] leading-relaxed text-white/80">{exp}</div>
          )}
        </div>
      )}
    </div>
  );
}


// ───────────────── Chapter audio player ─────────────────
function ChapterAudioPlayer({ chapter }: { chapter: Chapter }) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  // Reset when chapter changes
  useEffect(() => {
    setUrl(null); setErr(null); setPlaying(false);
    if (audioEl) { audioEl.pause(); }
  }, [chapter.n]); // eslint-disable-line react-hooks/exhaustive-deps

  const buildChapterText = useCallback(() => {
    const intro = `Capítulo ${chapter.n}.`;
    const body = chapter.verses.map((v) => `Versículo ${v.n}. ${v.t}`).join(" ");
    return `${intro} ${body}`;
  }, [chapter]);

  const fetchAndPlay = useCallback(async () => {
    setLoading(true); setErr(null);
    try {
      const FN_BASE = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1`;
      const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const token = getAulasToken();
      const res = await fetch(`${FN_BASE}/enoque-chapter-audio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: ANON, Authorization: `Bearer ${ANON}`,
          ...(token ? { "x-aulas-token": token } : {}),
        },
        body: JSON.stringify({ chapter: chapter.n, text: buildChapterText() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Falha");
      setUrl(data.url);
    } catch (e: any) {
      setErr(e?.message || "Erro ao carregar áudio");
    } finally {
      setLoading(false);
    }
  }, [chapter.n, buildChapterText]);

  const toggle = useCallback(async () => {
    if (!url) { await fetchAndPlay(); return; }
    if (!audioEl) return;
    if (audioEl.paused) { audioEl.play(); } else { audioEl.pause(); }
  }, [url, audioEl, fetchAndPlay]);

  // Auto-play once URL is set
  useEffect(() => {
    if (url && audioEl) {
      audioEl.playbackRate = rate;
      audioEl.play().catch(() => {});
    }
  }, [url, audioEl]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (audioEl) audioEl.playbackRate = rate; }, [rate, audioEl]);

  return (
    <div className="mt-10 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.06] to-transparent p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          disabled={loading}
          className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-black shadow-[0_8px_24px_-8px_rgba(245,158,11,0.7)] transition hover:bg-amber-400 disabled:opacity-60"
          aria-label={playing ? "Pausar" : "Ouvir capítulo"}
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-[1px]" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
            <Headphones className="h-3 w-3" /> Narração do capítulo
          </p>
          <p className="mt-0.5 truncate text-sm text-white/70">
            {loading ? "Preparando áudio…" : url ? (playing ? "Tocando agora" : "Pronto para ouvir") : "Toque para ouvir este capítulo"}
          </p>
        </div>
        {url && (
          <div className="flex flex-shrink-0 items-center gap-1 rounded-full bg-white/5 p-1 ring-1 ring-white/10">
            {[1, 1.25, 1.5].map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums transition ${rate === r ? "bg-amber-500 text-black" : "text-white/60 hover:text-white"}`}
              >
                {r}x
              </button>
            ))}
          </div>
        )}
      </div>
      {err && <p className="mt-3 text-xs text-red-400">{err}</p>}
      {url && (
        <audio
          ref={setAudioEl}
          src={url}
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="mt-3 w-full"
          controls
        />
      )}
    </div>
  );
}

export default AulasEnoqueIntro;
