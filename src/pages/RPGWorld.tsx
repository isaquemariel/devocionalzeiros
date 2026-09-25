import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Globe, MapPin, Wifi, WifiOff, Crown, Lock, Check, ChevronsUpDown, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useRPGProgress } from "@/hooks/useRPGProgress";
import { RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";
import { MascotLoader } from "@/components/shared/FloatingMascot";
import { getEquippedLookOwned, syncCosmeticsFromDB } from "@/lib/rpgRewards";
import { fetchMyBlockStatus, SUPPORT_WHATSAPP, type BlockStatus } from "@/lib/roomModeration";
import RPGWorldRoom from "@/components/rpg/RPGWorldRoom";

// Cenário fixo da Sala Global (céu estrelado — praça central/universal)
const GLOBAL_REGION = "creation" as const;

/**
 * SALAS SOCIAIS — em RETRATO.
 *
 * Elas nasceram deitadas (a página inteira girava 90° por CSS, como a cena
 * viva). Em pé o celular é a forma natural de conversar: o polegar alcança o
 * teclado, o texto lê-se em coluna e o mundo fica acima da conversa em vez de
 * brigar com ela. A rotação saiu; a sala é mundo em cima + gaveta de conversa
 * embaixo, e é a gaveta que decide quanto cada um ocupa.
 *
 * Quem está logado entra, anda, conversa e vê os outros (nome + nível +
 * traje/pet/montaria) em tempo real por Presence + Broadcast. Cada livro tem o
 * seu cenário; a Sala Global é fixa (o Céu) e é do Premium.
 */
const RPGWorld = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const { isAdmin } = useAdminCheck();
  const { planType, hasAccessTo, loading: planLoading } = useUserPlan(user?.email);
  const { stats, getBookProgress, loading: rpgLoading } = useRPGProgress(user?.id);

  // Salas dos livros: GOLD+ (chat). Sala Global: só PREMIUM+ (e admin).
  const canEnter = isAdmin || hasAccessTo("chat");
  const canGlobal = isAdmin || planType === "premium" || planType === "embaixador";

  const [, setCosmeticsReady] = useState(0);
  const [count, setCount] = useState(1);
  const [connected, setConnected] = useState(false);
  // folha de troca de sala (substitui o <select> apertado do cabeçalho)
  const [picker, setPicker] = useState(false);
  // dica de controle: some sozinha depois do primeiro passeio
  const [dica, setDica] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setDica(false), 7000);
    return () => window.clearTimeout(t);
  }, []);

  // Bloqueio de moderação: quem está bloqueado não entra na sala (vê suporte).
  const [block, setBlock] = useState<BlockStatus | null>(null);
  const [blockChecked, setBlockChecked] = useState(false);
  useEffect(() => {
    if (!user || !canEnter) { setBlockChecked(true); return; }
    setBlockChecked(false); // segura a sala até o fetch REAL resolver (senão o banido entra por instantes)
    let alive = true;
    fetchMyBlockStatus().then((st) => { if (alive) { setBlock(st); setBlockChecked(true); } });
    return () => { alive = false; };
  }, [user, canEnter]);
  // expulsão ao vivo (denúncia/bloqueio enquanto está na sala)
  const [dup, setDup] = useState(false); // sessão aberta em outro lugar
  const handleKicked = (reason: "blocked" | "duplicate") => {
    if (reason === "duplicate") { setDup(true); return; }
    setBlock({ blocked: true }); fetchMyBlockStatus().then(setBlock);
  };

  useEffect(() => {
    if (user?.id) syncCosmeticsFromDB(user.id).then(() => setCosmeticsReady((v) => v + 1));
  }, [user?.id]);
  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  // Livro atual = primeiro não concluído (onde a pessoa está de fato)
  const currentBookIndex = useMemo(() => {
    for (let i = 0; i < RPG_BIBLE_BOOKS.length; i++) if (getBookProgress(i).percent < 100) return i;
    return RPG_BIBLE_BOOKS.length - 1;
  }, [getBookProgress]);

  // sala selecionada: por padrão o livro atual; teste permite trocar / ir p/ global
  const [sel, setSel] = useState<{ type: "book" | "global"; bookIndex: number }>({ type: "book", bookIndex: 0 });
  const [selInit, setSelInit] = useState(false);
  useEffect(() => {
    if (!selInit && !rpgLoading) { setSel({ type: "book", bookIndex: currentBookIndex }); setSelInit(true); }
  }, [selInit, rpgLoading, currentBookIndex]);

  const equippedLook = user ? getEquippedLookOwned(user.id, getBookProgress, isAdmin) : undefined;
  const name = stats?.characterName || profile?.full_name || "Viajante";
  const me = user && equippedLook ? { userId: user.id, name, look: equippedLook, isAdmin, level: stats?.currentLevel ?? 0 } : null;

  const book = RPG_BIBLE_BOOKS[sel.bookIndex] || RPG_BIBLE_BOOKS[0];
  const roomId = sel.type === "global" ? "global" : `book:${book.id}`;
  const region = sel.type === "global" ? GLOBAL_REGION : book.region;
  const roomLabel = sel.type === "global" ? "Sala Global" : book.name;

  if (authLoading || (user && (rpgLoading || planLoading)) || !me || (canEnter && !blockChecked)) return <MascotLoader />;

  // Sessão aberta em outro dispositivo/aba: para não duplicar, esta cede.
  if (dup) {
    return (
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 px-6 text-center bg-[#07060c] text-white">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-sky-500 to-blue-700 shadow-lg shadow-sky-900/40">
          <Users className="w-9 h-9 text-white" />
        </div>
        <div className="space-y-1.5 max-w-xs">
          <h1 className="text-xl font-black">Sala aberta em outro lugar</h1>
          <p className="text-sm text-white/70 leading-relaxed">
            Você entrou na sala em outro dispositivo ou aba. Para não duplicar seu personagem, mantemos só uma sessão ativa por vez.
          </p>
        </div>
        <button onClick={() => { setDup(false); window.location.reload(); }}
          className="mt-1 px-6 py-3 rounded-full font-black text-white bg-sky-600 hover:bg-sky-500 active:scale-95 transition">
          Usar a sala aqui
        </button>
        <button onClick={() => navigate("/rpg")} className="text-sm text-white/50 hover:text-white/75 transition">Voltar ao RPG</button>
      </div>
    );
  }

  // Bloqueado pela moderação: não entra; fala com o suporte.
  if (canEnter && block?.blocked) {
    const tempMsg = !block.permanent && block.until
      ? `Bloqueio temporário até ${new Date(block.until).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}.`
      : null;
    return (
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 px-6 text-center bg-[#07060c] text-white">
        <button onClick={() => navigate("/rpg")} className="absolute top-3 left-3 p-2 rounded-lg hover:bg-white/10"
                style={{ top: "max(0.75rem, var(--safe-area-inset-top,env(safe-area-inset-top,0px)))" }} aria-label="Voltar">
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-rose-500 to-red-700 shadow-lg shadow-rose-900/40">
          <Lock className="w-9 h-9 text-white" />
        </div>
        <div className="space-y-1.5 max-w-xs">
          <h1 className="text-xl font-black">Acesso às salas bloqueado</h1>
          <p className="text-sm text-white/70 leading-relaxed">
            {block.permanent
              ? "Seu acesso às salas de bate-papo foi bloqueado. Para revisar seu caso, fale com o nosso suporte."
              : "Você recebeu um bloqueio temporário nas salas de bate-papo."}
          </p>
          {tempMsg && <p className="text-xs text-amber-300 font-semibold">{tempMsg}</p>}
        </div>
        {block.permanent && (
          <a href={SUPPORT_WHATSAPP} target="_blank" rel="noopener noreferrer"
             className="mt-1 px-6 py-3 rounded-full font-black text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition inline-flex items-center gap-2">
            Falar com o suporte
          </a>
        )}
        <button onClick={() => navigate("/rpg")} className="text-sm text-white/50 hover:text-white/75 transition">Voltar ao início</button>
      </div>
    );
  }

  // Trava GOLD: quem não é assinante vê um convite pra fazer upgrade.
  if (!canEnter) {
    return (
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 px-6 text-center bg-[#07060c] text-white">
        <button onClick={() => navigate("/rpg")} className="absolute top-3 left-3 p-2 rounded-lg hover:bg-white/10"
                style={{ top: "max(0.75rem, var(--safe-area-inset-top,env(safe-area-inset-top,0px)))" }} aria-label="Voltar">
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#e8b04b] to-[#b8781f] shadow-lg shadow-[#e8b04b33]">
          <Lock className="w-9 h-9 text-[#1a1206]" />
        </div>
        <div className="space-y-1.5 max-w-xs">
          <h1 className="text-xl font-black inline-flex items-center gap-1.5 justify-center">
            <Crown className="w-5 h-5 text-[#e8b04b]" /> Salas exclusivas GOLD
          </h1>
          <p className="text-sm text-white/70 leading-relaxed">
            As salas de cada livro (Gênesis a Apocalipse) são um benefício
            <span className="text-[#ffd889] font-bold"> GOLD</span>. A <span className="text-purple-300 font-bold">Sala Global</span> (o Céu) é exclusiva do <span className="text-purple-300 font-bold">Premium</span>. Converse e explore o mundo com outros viajantes em tempo real.
          </p>
        </div>
        <button
          onClick={() => navigate("/escolher-plano")}
          className="mt-1 px-6 py-3 rounded-full font-black text-[#1a1206] bg-[#e8b04b] active:scale-95 transition inline-flex items-center gap-2"
        >
          <Crown className="w-4 h-4" /> Fazer upgrade
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[#07060c] text-white">
      {/* ---- Cabeçalho ---------------------------------------------------
          Em pé sobra largura: o nome da sala respira, e trocar de sala deixa
          de ser um <select> apertado para virar uma folha com os livros,
          os cadeados e o "seu livro" bem visíveis. */}
      <header
        className="flex items-center gap-2 border-b border-[#241a10] bg-[#0b0a12]/95 px-2 py-2"
        style={{ paddingTop: "max(0.5rem, var(--safe-area-inset-top,env(safe-area-inset-top,0px)))" }}
      >
        <button onClick={() => navigate("/rpg")} className="rounded-xl p-2 transition hover:bg-white/10" aria-label="Sair da sala">
          <ArrowLeft className="h-5 w-5 text-white/80" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {sel.type === "global"
              ? <Globe className="h-4 w-4 shrink-0 text-[#8fd3ff]" />
              : <MapPin className="h-4 w-4 shrink-0 text-[#e8b04b]" />}
            <span className="truncate text-[15px] font-black">{roomLabel}</span>
          </div>
          <div className="mt-0.5 flex items-center gap-2.5 text-[11px] text-white/45">
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3" /> {count} online
            </span>
            <span className="inline-flex items-center gap-1">
              {connected
                ? <><Wifi className="h-3 w-3 text-emerald-400" /> conectado</>
                : <><WifiOff className="h-3 w-3 text-amber-400" /> conectando…</>}
            </span>
          </div>
        </div>

        <button
          onClick={() => setPicker(true)}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#e8b04b55] bg-[#141020] px-3 py-2 text-[12px] font-bold text-white/85 transition active:scale-95"
        >
          Trocar <ChevronsUpDown className="h-3.5 w-3.5 text-[#e8b04b]" />
        </button>
      </header>

      {/* ---- Sala --------------------------------------------------------- */}
      <main className="relative min-h-0 flex-1">
        <RPGWorldRoom
          key={roomId}
          roomId={roomId}
          region={region}
          variantKey={sel.type === "global" ? "global" : book.id}
          me={me}
          onCount={setCount}
          onConnected={setConnected}
          onKicked={handleKicked}
        />

        {/* Dica de controle: aparece na chegada e SAI sozinha. Instrução que
            fica para sempre na tela vira sujeira — depois do primeiro passeio
            ninguém mais lê. */}
        {dica && (
          <div className="pointer-events-none absolute left-2 right-2 top-2 flex items-start justify-between gap-2">
            <span className="rounded bg-black/55 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-[#ffd889] ring-1 ring-[#e8b04b55]">
              Protótipo
            </span>
            <span className="rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white/75 ring-1 ring-white/15">
              Toque para andar · segure e arraste = joystick
            </span>
          </div>
        )}
      </main>

      {/* ---- Folha de troca de sala --------------------------------------- */}
      {picker && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/65 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setPicker(false); }}
        >
          <div
            className="flex max-h-[78dvh] w-full flex-col rounded-t-3xl border-t border-[#e8b04b55] bg-[#0b0a12]"
            style={{ paddingBottom: "max(0.75rem, var(--safe-area-inset-bottom,env(safe-area-inset-bottom,0px)))" }}
          >
            <div className="flex items-center justify-between px-4 pb-2 pt-3">
              <h2 className="text-[15px] font-black">Escolher sala</h2>
              <button onClick={() => setPicker(false)} className="rounded-lg p-1.5 hover:bg-white/10" aria-label="Fechar">
                <X className="h-4 w-4 text-white/60" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-2">
              <p className="px-1 pb-1.5 pt-1 text-[11px] font-black uppercase tracking-wide text-white/35">Todos os viajantes</p>
              <button
                disabled={!canGlobal}
                onClick={() => { setSel((s) => ({ ...s, type: "global" })); setPicker(false); }}
                className="mb-3 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-left transition active:scale-[0.99] disabled:opacity-45"
              >
                <Globe className="h-5 w-5 shrink-0 text-[#8fd3ff]" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-black">Sala Global</span>
                  <span className="block text-[11px] text-white/45">
                    {canGlobal ? "A praça do Céu — todos os livros juntos" : "Exclusiva do plano Premium"}
                  </span>
                </span>
                {!canGlobal ? <Lock className="h-4 w-4 shrink-0 text-white/35" />
                  : sel.type === "global" ? <Check className="h-4 w-4 shrink-0 text-emerald-400" /> : null}
              </button>

              <p className="px-1 pb-1.5 text-[11px] font-black uppercase tracking-wide text-white/35">Livros</p>
              <div className="space-y-1.5">
                {RPG_BIBLE_BOOKS.map((b, i) => {
                  const locked = !isAdmin && i > currentBookIndex;
                  const atual = sel.type === "book" && sel.bookIndex === i;
                  return (
                    <button
                      key={b.id}
                      disabled={locked}
                      onClick={() => { setSel({ type: "book", bookIndex: i }); setPicker(false); }}
                      className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-left transition active:scale-[0.99] disabled:opacity-40"
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-[#e8b04b]" />
                      <span className="min-w-0 flex-1 truncate text-[14px] font-bold">{b.name}</span>
                      {i === currentBookIndex && !locked && (
                        <span className="shrink-0 rounded-full bg-[#e8b04b] px-2 py-[2px] text-[10px] font-black text-[#1a1206]">
                          seu livro
                        </span>
                      )}
                      {locked && <Lock className="h-4 w-4 shrink-0 text-white/35" />}
                      {atual && <Check className="h-4 w-4 shrink-0 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default RPGWorld;
