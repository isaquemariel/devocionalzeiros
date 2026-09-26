import { useEffect, useRef, useState } from "react";
import { useOcuparPalco } from "@/lib/devocionalzeiro/palco";
import { AnimatePresence, motion } from "framer-motion";
import { Devocionalzeiro } from "@/components/devocionalzeiro/Devocionalzeiro";
import { Balao } from "@/components/jornada/Balao";
import { Medalha } from "./Medalha";
import { RARIDADES, faltam, type Conquista } from "@/lib/conquistas";

/**
 * A CENA DE UMA CONQUISTA — o Devocionalzeiro apresenta a medalha.
 *
 * Pronta para resgate, ele a mostra animado e o botão resgata; ao resgatar,
 * a medalha ganha o selo, ele comemora com a chama alta e diz os pontos. Se
 * ainda está bloqueada, ele diz quanto falta ("faltam 12 capítulos"); se já é
 * da pessoa, ele lembra por quê. O balão sai dele, como no RPG.
 */
export function CenaConquista({
  conquista, onFechar, onResgatar,
}: {
  conquista: Conquista;
  onFechar: () => void;
  onResgatar: (id: string) => Promise<boolean>;
}) {
  const r = RARIDADES[conquista.raridade];
  const [resgatando, setResgatando] = useState(false);
  const [resgatou, setResgatou] = useState(false);
  const [falando, setFalando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const caixa = useRef<HTMLDivElement>(null);
  // a cena é o palco enquanto está aberta: um aviso (o erro do resgate) sai
  // do balão DELE aqui, não de um segundo boneco por cima do modal
  useOcuparPalco((a) => { setAviso(a.texto); return true; });
  useEffect(() => { if (!aviso) return; const t = window.setTimeout(() => setAviso(null), 5000); return () => window.clearTimeout(t); }, [aviso]);
  // Esc fecha; o foco entra no diálogo (teclado e leitor de tela ficam nele)
  useEffect(() => {
    caixa.current?.focus();
    const tecla = (e: KeyboardEvent) => { if (e.key === "Escape" && !resgatando) onFechar(); };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [onFechar, resgatando]);
  const pronta = conquista.desbloqueada && !conquista.resgatada && !resgatou;
  const estado = resgatou || conquista.resgatada ? "resgatada" : conquista.desbloqueada ? "resgatavel" : "bloqueada";

  const fala = aviso ? aviso : resgatou
    ? `Resgatada! +${conquista.pontos} pontos no seu placar.`
    : pronta
      ? `Olha só o que você conquistou! ${conquista.descricao}. Resgata os ${conquista.pontos} pontos!`
      : conquista.resgatada
        ? `Essa já é sua: ${conquista.descricao.charAt(0).toLowerCase()}${conquista.descricao.slice(1)}.`
        : `${conquista.descricao}. Faltam ${faltam(conquista)} — bora!`;

  // resgatou: um tempinho para a festa e fecha sozinho
  useEffect(() => {
    if (!resgatou) return;
    const id = window.setTimeout(onFechar, 2600);
    return () => window.clearTimeout(id);
  }, [resgatou, onFechar]);

  const resgatar = async () => {
    if (resgatando) return;
    setResgatando(true);
    const ok = await onResgatar(conquista.id);
    setResgatando(false);
    if (ok) setResgatou(true);
  };

  return (
    <motion.div
      className="rpg-root fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-4"
      style={{ background: "rgba(5,7,12,0.86)", backdropFilter: "blur(3px)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={resgatando ? undefined : onFechar}
      role="dialog"
      aria-modal="true"
      aria-label={conquista.titulo}
    >
      <motion.div
        className="w-full max-w-[400px] rounded-t-3xl px-5 pb-6 pt-4 outline-none sm:rounded-3xl"
        style={{ background: "linear-gradient(180deg, #241b10, #140f08)", border: `2px solid ${r.cor}`, boxShadow: `0 0 0 2px #0b0805, 0 -10px 60px -20px ${r.brilho}` }}
        initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: 60 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        ref={caixa}
        tabIndex={-1}
      >
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10.5px] font-extrabold uppercase tracking-[0.2em]" style={{ color: r.cor }}>
            Conquista {r.nome}
          </span>
          <span className="rounded-full px-2 py-0.5 text-[11px] font-extrabold" style={{ background: "#1c1509", color: "#ffd889", boxShadow: "inset 0 0 0 1.5px #3a2c18" }}>
            +{conquista.pontos} pts
          </span>
        </div>
        <h2 className="text-[19px] font-extrabold leading-tight" style={{ color: "#ece0c6" }}>{conquista.titulo}</h2>

        {/* o palco: ele e a medalha, o balão saindo dele */}
        <div className="relative mt-3 flex items-end justify-between">
          <div className="flex flex-col items-start">
            <div className="relative w-[250px] max-w-[62vw]" style={{ marginBottom: -12 }}>
              <AnimatePresence mode="wait">
                <motion.div key={fala} initial={{ opacity: 0, scale: 0.7, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} style={{ transformOrigin: "60px 100%" }}>
                  <Balao texto={fala} onFalando={setFalando} rabicho="esquerda" ponta={57} />
                </motion.div>
              </AnimatePresence>
            </div>
            <Devocionalzeiro
              tamanho={110}
              expressao={resgatou ? "radiante" : pronta ? "feliz" : conquista.resgatada ? "orgulhoso" : "pensativo"}
              gesto={resgatou ? "comemorar" : pronta ? "apontar" : "parado"}
              chama={resgatou ? 1 : pronta ? 0.6 : 0.34}
              falando={falando}
              olhar={pronta ? { x: 1, y: 0 } : null}
            />
          </div>
          <motion.div
            className="mb-6 mr-2"
            animate={resgatou ? { scale: [1, 1.25, 1], rotate: [0, -8, 0] } : pronta ? { y: [0, -6, 0] } : {}}
            transition={resgatou ? { duration: 0.6 } : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Medalha icone={conquista.icone} raridade={conquista.raridade} estado={estado} tamanho={84} />
          </motion.div>
        </div>

        {!conquista.desbloqueada && (
          <div className="mt-2">
            <div className="h-2 overflow-hidden rounded-full" style={{ background: "#20180d", boxShadow: "inset 0 0 0 1px #3a2c18" }}>
              <div className="h-full rounded-full" style={{ width: `${(conquista.progresso / conquista.meta) * 100}%`, background: `linear-gradient(90deg, #b9822c, ${r.cor})` }} />
            </div>
            <p className="mt-1 text-right text-[11px] font-bold" style={{ color: "#9c8b68" }}>{conquista.progresso} / {conquista.meta}</p>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          {pronta ? (
            <button type="button" onClick={resgatar} disabled={resgatando} className="rpg-btn flex-1 py-3 text-[13px] uppercase tracking-[0.1em]">
              {resgatando ? "Resgatando…" : `Resgatar +${conquista.pontos} pontos`}
            </button>
          ) : (
            <button type="button" onClick={onFechar} className="rpg-btn-ghost flex-1 py-3 text-[13px] uppercase tracking-[0.1em]">
              {resgatou ? "Fechar" : "Voltar"}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
