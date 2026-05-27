import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAulasSession } from "@/hooks/useAulasSession";
import { getAulasToken, SUPPORT_WHATSAPP_URL } from "@/lib/aulasAuth";
import { AulasHeader } from "@/components/aulas/AulasHeader";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles, BookOpen, Lock, Loader2, X } from "lucide-react";
import enoqueData from "@/data/enoque.json";
import coverImg from "@/assets/enoque-cover.png";

const ENOQUE_SLUG = "os-segredos-do-livro-de-enoque";

type Verse = { n: number; t: string };
type Chapter = { n: number; verses: Verse[] };
const BOOK = enoqueData as { title: string; subtitle: string; sourceNote: string; chapters: Chapter[] };

function useEnoqueAccess() {
  const { session, loading } = useAulasSession();
  // We don't know curso_id here; access checked via allowed_curso_ids includes the Enoque curso.
  // Admin always has access. Otherwise: there must be at least one access entry — we let the edge function gate explanation calls;
  // For the page itself, we mirror CourseCard logic using slug lookup via /aulas data isn't loaded — so we rely on backend.
  // Simplest: allow page render if logged in; show lock state only if user has no allowed cursos at all.
  const hasAccess = !!session && (session.is_admin || (session.allowed_curso_ids?.length ?? 0) > 0);
  return { loading, logged: !!session, hasAccess, isAdmin: !!session?.is_admin };
}

export function AulasEnoqueIntro() {
  const navigate = useNavigate();
  const { loading, logged, hasAccess } = useEnoqueAccess();

  useEffect(() => {
    if (!loading && !logged) navigate("/aulas/login");
  }, [loading, logged, navigate]);

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
              <Sparkles className="h-3 w-3" /> Portal exclusivo
            </p>
            <h1 className="font-montserrat text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                O Livro de Enoque
              </span>
            </h1>
            <p className="mt-2 text-sm font-medium text-amber-200/80 sm:text-base">
              Guia definitivo e completo — Enoque Etíope, com mini-exegese versículo a versículo.
            </p>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/75">
              <p>
                Bem-vindo a um dos textos mais misteriosos da tradição judaico-cristã.
                O <b className="text-white">Livro de Enoque</b> é um escrito apócrifo atribuído ao patriarca antediluviano
                <i> Enoque, sétimo desde Adão</i> (Gn 5:18-24; Jd 1:14), homem que “andou com Deus, e já não foi
                achado, porque Deus o tomou para si”.
              </p>
              <p>
                Citado diretamente pela <b className="text-white">Epístola de Judas</b> e ecoado em Hebreus e 2 Pedro,
                permaneceu no centro da espiritualidade da Igreja primitiva por séculos. Após a consolidação da Vulgata
                (séc. V), foi gradualmente esquecido pelo Ocidente, sobrevivendo apenas em manuscritos etíopes — daí seu nome
                <i> Enoque Etíope</i>.
              </p>
              <p>
                Nele você encontrará a queda dos <b className="text-white">Vigilantes</b> (Sentinelas), a origem dos
                gigantes (Nefilim), a viagem de Enoque pelos céus, parábolas messiânicas, segredos cósmicos das luminárias
                e visões proféticas do Juízo Final. Trata-se de literatura apocalíptica em estado puro — chave de leitura
                de Gênesis 6 e do imaginário angelológico bíblico.
              </p>
              <p className="text-white/60">
                Cada versículo desta edição é acompanhado de uma <b className="text-amber-200">mini-explicação teológica</b>
                gerada sob demanda — basta tocar no versículo para revelar sentido, contexto e aplicação.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {hasAccess ? (
                <Button
                  onClick={() => navigate("/aulas/enoque/ler/1")}
                  className="h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 text-base font-bold text-black shadow-[0_10px_30px_-10px_rgba(245,158,11,0.65)] hover:from-amber-400 hover:to-amber-500"
                >
                  <BookOpen className="mr-2 h-5 w-5" /> Iniciar leitura
                </Button>
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

export function AulasEnoqueReader() {
  const navigate = useNavigate();
  const { chapter: chParam } = useParams<{ chapter: string }>();
  const { loading, logged, hasAccess } = useEnoqueAccess();
  const ch = Math.max(1, Math.min(BOOK.chapters.length, parseInt(chParam ?? "1", 10) || 1));
  const chapter = useMemo(() => BOOK.chapters.find((c) => c.n === ch) ?? BOOK.chapters[0], [ch]);
  const [activeVerse, setActiveVerse] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !logged) navigate("/aulas/login");
  }, [loading, logged, navigate]);

  useEffect(() => {
    setActiveVerse(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [ch]);

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
        <div className="mb-6 flex items-center justify-between">
          <Link to="/aulas/enoque" className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white">
            <ChevronLeft className="h-3 w-3" /> Voltar
          </Link>
          <ChapterPicker current={ch} onPick={(n) => navigate(`/aulas/enoque/ler/${n}`)} />
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
            <VerseRow key={v.n} chapter={chapter.n} verse={v}
              active={activeVerse === v.n}
              onToggle={() => setActiveVerse((cur) => (cur === v.n ? null : v.n))} />
          ))}
        </article>

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

function VerseRow({ chapter, verse, active, onToggle }: { chapter: number; verse: Verse; active: boolean; onToggle: () => void }) {
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
    <div className={`group rounded-xl border px-4 py-3 transition-colors sm:px-5 sm:py-4 ${active ? "border-amber-500/30 bg-amber-500/[0.04]" : "border-transparent hover:border-white/5 hover:bg-white/[0.02]"}`}>
      <button onClick={onToggle} className="flex w-full items-start gap-3 text-left">
        <span className={`mt-0.5 inline-flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 font-montserrat text-[11px] font-bold tabular-nums ring-1 transition ${active ? "bg-amber-500 text-black ring-amber-400" : "bg-white/5 text-amber-300/90 ring-white/10 group-hover:bg-amber-500/15"}`}>
          {verse.n}
        </span>
        <p className="font-['Cormorant_Garamond',serif] text-[19px] leading-[1.7] text-white/90 sm:text-[21px]">
          {verse.t}
        </p>
      </button>
      {active && (
        <div className="mt-3 ml-10 rounded-lg border border-amber-500/20 bg-black/40 p-3 sm:p-4">
          <div className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
            <Sparkles className="h-3 w-3" /> Mini-explicação
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Loader2 className="h-4 w-4 animate-spin text-amber-400" /> Revelando o sentido…
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

export default AulasEnoqueIntro;
