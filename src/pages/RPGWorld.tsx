import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Globe, MapPin, Wifi, WifiOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useRPGProgress } from "@/hooks/useRPGProgress";
import { RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";
import { MascotLoader } from "@/components/shared/FloatingMascot";
import { getEquippedLookOwned, syncCosmeticsFromDB } from "@/lib/rpgRewards";
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
  const { stats, getBookProgress, loading: rpgLoading } = useRPGProgress(user?.id);

  const [, setCosmeticsReady] = useState(0);
  const [count, setCount] = useState(1);
  const [connected, setConnected] = useState(false);

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
  const me = user && equippedLook ? { userId: user.id, name, look: equippedLook } : null;

  const book = RPG_BIBLE_BOOKS[sel.bookIndex] || RPG_BIBLE_BOOKS[0];
  const roomId = sel.type === "global" ? "global" : `book:${book.id}`;
  const region = sel.type === "global" ? GLOBAL_REGION : book.region;
  const roomLabel = sel.type === "global" ? "Sala Global" : book.name;

  if (authLoading || (user && rpgLoading) || !me) return <MascotLoader />;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[#07060c] text-white">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-[#241a10] bg-[#0b0a12]/95"
           style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top))" }}>
        <button onClick={() => navigate("/home")} className="p-2 rounded-lg hover:bg-white/10" aria-label="Sair">
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
            if (v === "global") setSel((s) => ({ ...s, type: "global" }));
            else setSel({ type: "book", bookIndex: parseInt(v, 10) });
          }}
          className="max-w-[44%] text-[12px] bg-[#141020] border border-[#e8b04b55] rounded-lg px-2 py-1.5 text-white outline-none"
          aria-label="Escolher sala"
        >
          <optgroup label="Livros">
            {RPG_BIBLE_BOOKS.map((b, i) => (
              <option key={b.id} value={i}>{b.name}{i === currentBookIndex ? " • seu livro" : ""}</option>
            ))}
          </optgroup>
          <optgroup label="Todos">
            <option value="global">🌍 Sala Global</option>
          </optgroup>
        </select>
      </div>

      {/* Sala */}
      <div className="relative flex-1 min-h-0">
        <RPGWorldRoom
          key={roomId}
          roomId={roomId}
          region={region}
          me={me}
          onCount={setCount}
          onConnected={setConnected}
        />
        {/* Dica de controle */}
        <div className="absolute left-0 right-0 pointer-events-none flex justify-center"
             style={{ bottom: "max(0.6rem, env(safe-area-inset-bottom))" }}>
          <span className="text-[11px] text-white/70 bg-black/55 border border-white/15 rounded-full px-3 py-1">
            Toque no chão para andar · setas/WASD no computador
          </span>
        </div>
        {/* Selo de protótipo */}
        <div className="absolute top-2 left-2 pointer-events-none">
          <span className="text-[9px] font-black uppercase tracking-wide text-[#ffd889] bg-black/55 border border-[#e8b04b55] rounded px-1.5 py-0.5">
            Protótipo · teste
          </span>
        </div>
      </div>
    </div>
  );
};

export default RPGWorld;
