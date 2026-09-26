import { useCallback, useEffect, useMemo, useState } from "react";
import { useOcuparPalco } from "@/lib/devocionalzeiro/palco";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Devocionalzeiro } from "@/components/devocionalzeiro/Devocionalzeiro";
import { Balao } from "@/components/jornada/Balao";
import { Medalha } from "./Medalha";
import { CenaConquista } from "./CenaConquista";
import { useAchievements } from "@/hooks/useAchievements";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { CATEGORIAS, CONQUISTAS, RARIDADES, faltam, type Conquista } from "@/lib/conquistas";
import { toast } from "@/lib/avisos";

const ehNativo = () => {
  const w = window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } };
  try { return !!w.Capacitor?.isNativePlatform?.(); } catch { return false; }
};

/**
 * AS CONQUISTAS, no padrão do RPG — a página `/conquistas` e a aba da Bíblia.
 *
 * - no alto, o Devocionalzeiro (com o visual do RPG) diz como a pessoa está e
 *   quanto há para resgatar, e o botão resgata tudo de uma vez;
 * - se o navegador ainda não pode avisar, ele pergunta se pode — é assim que a
 *   notificação de "conquista desbloqueada" chega com o app fechado;
 * - "Para resgatar" vem primeiro; depois cada categoria, com medalhas de metal
 *   na cor da raridade;
 * - tocar numa medalha abre a cena dela; `?resgatar=<id>` (o link do aviso e
 *   da notificação) abre direto a cena de resgate.
 */
export function PainelConquistas({ userId }: { userId?: string }) {
  const { conquistas, loading, erro, totalClaimablePoints, claimAchievement, claimAllAchievements, refetch } = useAchievements(userId);
  // O painel tem o personagem em cena: é o palco. Aviso sai do balão DELE, e a
  // festa do "resgatar tudo" é ele mesmo quem faz (sem subir um segundo boneco).
  const [aviso, setAviso] = useState<string | null>(null);
  const [festa, setFesta] = useState<string | null>(null);
  useOcuparPalco((a) => { setAviso(a.texto); return true; });
  useEffect(() => { if (!aviso) return; const t = window.setTimeout(() => setAviso(null), 5000); return () => window.clearTimeout(t); }, [aviso]);
  useEffect(() => { if (!festa) return; const t = window.setTimeout(() => setFesta(null), 3200); return () => window.clearTimeout(t); }, [festa]);
  const fecharCena = useCallback(() => setAberta(null), []);
  const [params, setParams] = useSearchParams();
  const [aberta, setAberta] = useState<Conquista | null>(null);
  const [resgatandoTudo, setResgatandoTudo] = useState(false);
  const [falando, setFalando] = useState(false);
  const push = usePushNotifications();

  const resgataveis = conquistas.filter((c) => c.desbloqueada && !c.resgatada);
  const feitas = conquistas.filter((c) => c.resgatada).length;
  const pontosGanhos = conquistas.filter((c) => c.resgatada).reduce((s, c) => s + c.pontos, 0);
  const proxima = useMemo(
    () => conquistas.filter((c) => !c.desbloqueada).sort((a, b) => b.progresso / b.meta - a.progresso / a.meta)[0],
    [conquistas],
  );

  // o link do aviso / da notificação: abre a cena daquela conquista
  useEffect(() => {
    const id = params.get("resgatar");
    if (!id || loading || !conquistas.length) return;
    const c = conquistas.find((x) => x.id === id);
    if (c) setAberta(c);
    params.delete("resgatar");
    setParams(params, { replace: true });
  }, [params, loading, conquistas, setParams]);

  const resgatar = useCallback(async (id: string) => {
    const r = await claimAchievement(id);
    if (!r.success) { toast.error("Não consegui resgatar agora. Tenta de novo?"); return false; }
    window.dispatchEvent(new CustomEvent("achievement-claimed"));
    return true;
  }, [claimAchievement]);

  const resgatarTudo = async () => {
    if (resgatandoTudo) return;
    setResgatandoTudo(true);
    const r = await claimAllAchievements();
    setResgatandoTudo(false);
    if (!r.success) { toast.error("Não consegui resgatar agora. Tenta de novo?"); return; }
    window.dispatchEvent(new CustomEvent("achievement-claimed"));
    setFesta(r.totalPoints > 0 ? `+${r.totalPoints} pontos resgatados! Tá brilhando, hein?` : "Tudo resgatado!");
  };

  const fala = aviso ?? festa ?? (loading
    ? "Deixa eu ver suas conquistas…"
    : erro
      ? "Não consegui carregar suas conquistas agora. Toca em Tentar de novo?"
    : resgataveis.length
      ? `Você tem ${resgataveis.length === 1 ? "uma conquista" : `${resgataveis.length} conquistas`} para resgatar — ${totalClaimablePoints} pontos!`
      : proxima
        ? `${feitas} de ${CONQUISTAS.length}. A próxima é "${proxima.titulo}": faltam ${faltam(proxima)}.`
        : "Todas as conquistas são suas. Que caminhada!");

  const pedirAvisos = !ehNativo() && push.isSupported && push.permission === "default" && !push.isSubscribed;

  return (
    <div className="rpg-root rounded-2xl px-3 pb-6 pt-4 sm:px-5" style={{ fontFamily: "var(--rpg-mono)" }}>
      {/* ── ele, dizendo como a pessoa está: o balão sai da cabeça dele ── */}
      <div className="relative" style={{ marginBottom: -Math.round(((104 * 229) / 205) * 0.22 - 15) }}>
        <Balao key={fala} texto={fala} onFalando={setFalando} rabicho="esquerda" ponta={Math.round(104 * 0.517)} />
      </div>
      <div className="flex items-end gap-3">
        <div className="shrink-0">
          <Devocionalzeiro
            tamanho={104}
            expressao={festa ? "radiante" : erro ? "pensativo" : resgataveis.length ? "radiante" : "feliz"}
            gesto={festa ? "comemorar" : erro ? "cocar" : resgataveis.length ? "apontar" : "parado"}
            chama={festa ? 1 : resgataveis.length ? 0.7 : 0.45}
            falando={falando}
          />
        </div>

        {/* o placar, ao lado dele */}
        <div className="rpg-panel mb-1 min-w-0 flex-1 rounded-xl p-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="rpg-eyebrow text-[10px]">Conquistas</span>
            <span className="text-[11px] font-extrabold" style={{ color: "#ffd889" }}>{pontosGanhos} pts</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[20px] font-extrabold leading-none" style={{ color: "#ece0c6" }}>{feitas}<span className="text-[12px]" style={{ color: "#9c8b68" }}>/{CONQUISTAS.length}</span></span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full" style={{ background: "#20180d", boxShadow: "inset 0 0 0 1px #3a2c18" }}>
              <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #b9822c, #ffd889)" }} initial={{ width: 0 }} animate={{ width: `${(feitas / CONQUISTAS.length) * 100}%` }} transition={{ duration: 0.8 }} />
            </div>
          </div>
        </div>
      </div>
      {resgataveis.length > 0 && (
        <button type="button" onClick={resgatarTudo} disabled={resgatandoTudo} className="rpg-btn mt-3 w-full py-2.5 text-[12.5px] uppercase tracking-[0.1em]">
          {resgatandoTudo ? "Resgatando…" : `Resgatar tudo · +${totalClaimablePoints} pts`}
        </button>
      )}

      {/* ── posso te avisar? ──────────────────────────────────────────── */}
      {pedirAvisos && (
        <div className="mt-3 flex items-center gap-3 rounded-xl p-3" style={{ background: "#141c30", boxShadow: "inset 0 0 0 2px #e8b04b" }}>
          <p className="flex-1 text-[12px] leading-snug" style={{ color: "#dfe7ff" }}>
            Quer que eu te avise quando desbloquear uma conquista, mesmo com o app fechado?
          </p>
          <button type="button" onClick={() => push.subscribe()} disabled={push.isLoading} className="rpg-btn shrink-0 px-3 py-2 text-[11px] uppercase">
            {push.isLoading ? "…" : "Avisar"}
          </button>
        </div>
      )}

      {/* ── para resgatar ─────────────────────────────────────────────── */}
      {resgataveis.length > 0 && (
        <Secao titulo="Para resgatar" frase="Toque para pegar os pontos" contagem={`${resgataveis.length}`} destaque>
          {resgataveis.map((c) => <Cartao key={c.id} c={c} onAbrir={setAberta} />)}
        </Secao>
      )}

      {/* ── as categorias ─────────────────────────────────────────────── */}
      {loading
        ? <p className="mt-6 text-center text-[12px]" style={{ color: "#9c8b68" }}>Carregando…</p>
        : erro
          ? <div className="mt-6 text-center"><button type="button" onClick={() => void refetch()} className="rpg-btn px-4 py-2 text-[12px] uppercase tracking-[0.1em]">Tentar de novo</button></div>
          : CATEGORIAS.map((cat) => {
            const lista = conquistas.filter((c) => c.categoria === cat.id);
            if (!lista.length) return null;
            return (
              <Secao key={cat.id} titulo={cat.nome} frase={cat.frase} contagem={`${lista.filter((c) => c.resgatada).length}/${lista.length}`}>
                {lista.map((c) => <Cartao key={c.id} c={c} onAbrir={setAberta} />)}
              </Secao>
            );
          })}

      <AnimatePresence>
        {aberta && (
          <CenaConquista
            key={aberta.id}
            conquista={conquistas.find((c) => c.id === aberta.id) ?? aberta}
            onFechar={fecharCena}
            onResgatar={resgatar}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Secao({ titulo, frase, contagem, destaque, children }: { titulo: string; frase: string; contagem: string; destaque?: boolean; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <div className="mb-2 flex items-end justify-between border-b pb-1.5" style={{ borderColor: destaque ? "#e8b04b66" : "#3a2c18" }}>
        <div>
          <h3 className="text-[13px] font-extrabold uppercase tracking-[0.14em]" style={{ color: destaque ? "#ffd889" : "#ece0c6" }}>{titulo}</h3>
          <p className="text-[10.5px]" style={{ color: "#9c8b68" }}>{frase}</p>
        </div>
        <span className="text-[11px] font-extrabold" style={{ color: destaque ? "#ffd889" : "#b8a67f" }}>{contagem}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{children}</div>
    </section>
  );
}

function Cartao({ c, onAbrir }: { c: Conquista; onAbrir: (c: Conquista) => void }) {
  const r = RARIDADES[c.raridade];
  const estado = c.resgatada ? "resgatada" : c.desbloqueada ? "resgatavel" : "bloqueada";
  return (
    <motion.button
      type="button"
      onClick={() => onAbrir(c)}
      whileTap={{ scale: 0.97 }}
      className="flex flex-col items-center rounded-xl px-2 pb-2.5 pt-3 text-center"
      style={{
        background: estado === "bloqueada" ? "#15100a" : `linear-gradient(180deg, ${r.fundo}, #15100a)`,
        boxShadow: `inset 0 0 0 ${estado === "resgatavel" ? 2 : 1.5}px ${estado === "bloqueada" ? "#2e2416" : estado === "resgatavel" ? r.cor : `${r.cor}66`}`,
      }}
    >
      <Medalha icone={c.icone} raridade={c.raridade} estado={estado} tamanho={52} />
      <span className="mt-1.5 line-clamp-2 text-[11.5px] font-extrabold leading-tight" style={{ color: estado === "bloqueada" ? "#8a7a5c" : "#ece0c6" }}>{c.titulo}</span>
      <span className="mt-0.5 line-clamp-2 text-[9.5px] leading-snug" style={{ color: "#8a7a5c" }}>{c.descricao}</span>
      {estado === "resgatavel" ? (
        <span className="rpg-btn mt-2 px-2.5 py-1 text-[10px] uppercase">Resgatar +{c.pontos}</span>
      ) : estado === "resgatada" ? (
        <span className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.1em]" style={{ color: "#93d453" }}>Sua · +{c.pontos}</span>
      ) : (
        <div className="mt-2 w-full px-1">
          <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "#20180d" }}>
            <div className="h-full rounded-full" style={{ width: `${(c.progresso / c.meta) * 100}%`, background: r.cor, opacity: 0.8 }} />
          </div>
          <span className="mt-0.5 block text-[9.5px] font-bold" style={{ color: "#8a7a5c" }}>{c.progresso}/{c.meta}</span>
        </div>
      )}
    </motion.button>
  );
}
