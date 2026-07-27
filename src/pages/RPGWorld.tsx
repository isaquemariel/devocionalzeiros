import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Globe, MapPin, Wifi, WifiOff, Crown, Lock } from "lucide-react";
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
 * Fase 0 (protótipo) das SALAS SOCIAIS. Rota fechada de teste (/mundo): quem
 * está logado entra, anda, e vê os outros (nome + traje/pet/montaria) em tempo
 * real. Sem chat ainda, sem gravar nada no banco — só Presence + Broadcast.
 * Cada livro tem seu cenário; a global é fixa.
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
                style={{ top: "max(0.75rem, env(safe-area-inset-top))" }} aria-label="Voltar">
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
                style={{ top: "max(0.75rem, env(safe-area-inset-top))" }} aria-label="Voltar">
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
      {/* Top bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-[#241a10] bg-[#0b0a12]/95"
           style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top))" }}>
        <button onClick={() => navigate("/rpg")} className="p-2 rounded-lg hover:bg-white/10" aria-label="Sair">
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {sel.type === "global" ? <Globe className="w-3.5 h-3.5 text-[#8fd3ff]" /> : <MapPin className="w-3.5 h-3.5 text-[#e8b04b]" />}
            <span className="text-[13px] font-black truncate">{roomLabel}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/50">
            <span className="inline-flex items-center gap-1">
              <Users className="w-3 h-3" /> {count} online
            </span>
            <span className="inline-flex items-center gap-1">
              {connected ? <Wifi className="w-3 h-3 text-emerald-400" /> : <WifiOff className="w-3 h-3 text-amber-400" />}
              {connected ? "conectado" : "conectando…"}
            </span>
          </div>
        </div>

        {/* Seletor de sala (teste): livro + Global */}
        <select
          value={sel.type === "global" ? "global" : String(sel.bookIndex)}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "global") { if (canGlobal) setSel((s) => ({ ...s, type: "global" })); } // só Premium+
            else setSel({ type: "book", bookIndex: parseInt(v, 10) });
          }}
          className="max-w-[44%] text-[12px] bg-[#141020] border border-[#e8b04b55] rounded-lg px-2 py-1.5 text-white outline-none"
          aria-label="Escolher sala"
        >
          <optgroup label="Livros">
            {RPG_BIBLE_BOOKS.map((b, i) => {
              const locked = !isAdmin && i > currentBookIndex; // desbloqueia conforme avança
              return (
                <option key={b.id} value={i} disabled={locked}>
                  {locked ? "🔒 " : ""}{b.name}{i === currentBookIndex ? " • seu livro" : ""}
                </option>
              );
            })}
          </optgroup>
          <optgroup label="Todos">
            <option value="global" disabled={!canGlobal}>
              {canGlobal ? "🌍 Sala Global" : "🔒 Sala Global (Premium)"}
            </option>
          </optgroup>
        </select>
      </div>

      {/* Sala */}
      <div className="relative flex-1 min-h-0">
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
        {/* Dica de controle + selo de protótipo (topo, p/ não cobrir o chat) */}
        <div className="absolute top-2 left-2 right-2 pointer-events-none flex items-center justify-between gap-2">
          <span className="text-[9px] font-black uppercase tracking-wide text-[#ffd889] bg-black/55 border border-[#e8b04b55] rounded px-1.5 py-0.5">
            Protótipo · teste
          </span>
          <span className="text-[10px] text-white/70 bg-black/55 border border-white/15 rounded-full px-2.5 py-1">
            Toque no chão p/ andar · WASD no PC
          </span>
        </div>
      </div>
    </div>
  );
};

export default RPGWorld;
