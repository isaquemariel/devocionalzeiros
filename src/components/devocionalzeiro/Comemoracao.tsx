import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Devocionalzeiro, type Expressao, type Gesto } from "./Devocionalzeiro";
import { Balao } from "@/components/jornada/Balao";
import { EVENTO_CELEBRAR, type MotivoCelebracao, type PedidoCelebracao } from "@/lib/celebrar";

/**
 * A COMEMORAÇÃO DO DEVOCIONALZEIRO — o que substituiu o confete no app todo.
 *
 * Três tamanhos, conforme o peso do que aconteceu:
 * - PEQUENA (um capítulo lido): ele espia do canto de baixo, dá um pulo, diz
 *   uma palavra e volta — rápido, para não atrapalhar a leitura;
 * - MÉDIA (plano traçado, conquista): sobe no rodapé, comemora com a chama
 *   crescendo e diz a frase inteira;
 * - GRANDE (a leitura do dia, o devocional): a tela escurece, uma luz dourada
 *   abre atrás dele, ele dá uma pirueta no ar e a chama sobe alta.
 *
 * A coreografia é a mesma nos três, em quatro tempos: CHEGA (sobe com mola e
 * aterrissa amassando), SE SURPREENDE, COMEMORA (o gesto do motivo, a chama no
 * máximo) e SE DESPEDE (acena e desce). Nada de papel picado: a festa é ele.
 *
 * Não bloqueia a tela nas pequenas e médias — só o cartão recebe o toque (que
 * encerra na hora). A grande tem fundo, e qualquer toque fecha.
 */

type Tamanho = "pequena" | "media" | "grande";

interface Cena {
  tamanho: Tamanho;
  /** o gesto da festa */
  gesto: Gesto;
  falas: string[];
  /** a linha de cima, na grande */
  titulo?: string;
  /** quanto tempo fica, em ms */
  dura: number;
}

const CENAS: Record<MotivoCelebracao, Cena> = {
  capitulo: {
    tamanho: "pequena", gesto: "comemorar", dura: 2300,
    falas: ["Mais um capítulo!", "Capítulo lido!", "A chama cresceu!", "Isso! Mais um passo."],
  },
  "leitura-do-dia": {
    tamanho: "grande", gesto: "pirueta", dura: 5200, titulo: "Leitura do dia completa",
    falas: [
      "Leitura do dia feita! Hoje a chama ardeu bonito.",
      "Dia cumprido! Lâmpada para os meus pés é tua palavra.",
      "Tudo lido por hoje! Amanhã tem mais estrada.",
    ],
  },
  "plano-criado": {
    tamanho: "media", gesto: "vitoria", dura: 3800,
    falas: ["Plano traçado! Bora caminhar juntos.", "Caminho escolhido. Eu levo a lamparina!"],
  },
  devocional: {
    tamanho: "grande", gesto: "comemorar", dura: 5000, titulo: "Devocional concluído",
    falas: [
      "Amém! Tempo bem gasto com Deus.",
      "Devocional feito! Coração aquecido pro dia.",
      "Que bom começar assim. A chama tá forte!",
    ],
  },
  conquista: {
    tamanho: "media", gesto: "vitoria", dura: 3600,
    falas: ["Conquista resgatada! Tá brilhando, hein?", "Mais uma conquista na bagagem!"],
  },
};

const PESO: Record<Tamanho, number> = { pequena: 0, media: 1, grande: 2 };
const sortear = (l: string[]) => l[Math.floor(Math.random() * l.length)];

interface Ativa { id: number; motivo: MotivoCelebracao; fala: string }

export function Comemoracao() {
  const [ativa, setAtiva] = useState<Ativa | null>(null);
  const fila = useRef<Ativa[]>([]);
  const seq = useRef(0);

  useEffect(() => {
    const ouvir = (e: Event) => {
      const p = (e as CustomEvent<PedidoCelebracao>).detail;
      if (!p || !CENAS[p.motivo]) return;
      const nova: Ativa = { id: ++seq.current, motivo: p.motivo, fala: p.fala || sortear(CENAS[p.motivo].falas) };
      setAtiva((atual) => {
        if (!atual) return nova;
        // O capítulo que fecha o dia dispara "capítulo" e, logo depois,
        // "leitura do dia": a maior toma o lugar da menor em vez de esperar.
        if (PESO[CENAS[nova.motivo].tamanho] > PESO[CENAS[atual.motivo].tamanho]) return nova;
        if (nova.motivo === atual.motivo) return atual; // o mesmo, em sequência: um só
        if (fila.current.length < 2) fila.current.push(nova);
        return atual;
      });
    };
    window.addEventListener(EVENTO_CELEBRAR, ouvir);
    return () => window.removeEventListener(EVENTO_CELEBRAR, ouvir);
  }, []);

  const encerrar = useCallback(() => {
    setAtiva(null);
    // a próxima da fila entra depois que esta saiu de cena
    window.setTimeout(() => { const p = fila.current.shift(); if (p) setAtiva(p); }, 350);
  }, []);

  return (
    <AnimatePresence>
      {ativa && <Palco key={ativa.id} motivo={ativa.motivo} fala={ativa.fala} onFim={encerrar} />}
    </AnimatePresence>
  );
}

type Tempo = "chega" | "surpresa" | "festa" | "tchau";

function Palco({ motivo, fala, onFim }: { motivo: MotivoCelebracao; fala: string; onFim: () => void }) {
  const cena = CENAS[motivo];
  const reduzir = useReducedMotion();
  const [tempo, setTempo] = useState<Tempo>("chega");
  const [pulso, setPulso] = useState(0);
  const [falando, setFalando] = useState(false);
  const fim = useRef(onFim);
  fim.current = onFim;

  useEffect(() => {
    const d = cena.dura;
    const ts = [
      window.setTimeout(() => { setPulso((p) => p + 1); setTempo("surpresa"); }, reduzir ? 0 : 380), // aterrissa
      window.setTimeout(() => setTempo("festa"), reduzir ? 0 : 700),
      window.setTimeout(() => setTempo("tchau"), d - 1000),
      window.setTimeout(() => fim.current(), d),
    ];
    return () => ts.forEach(clearTimeout);
  }, [cena.dura, reduzir]);

  const expressao: Expressao = tempo === "chega" ? "feliz" : tempo === "surpresa" ? "surpreso" : tempo === "festa" ? "radiante" : "feliz";
  const gesto: Gesto = tempo === "festa" ? cena.gesto : tempo === "tchau" ? "acenar" : "parado";
  // a chama é o placar da festa: sobe no auge e assenta na despedida
  const chama = tempo === "festa" ? (cena.tamanho === "grande" ? 1 : 0.85) : tempo === "tchau" ? 0.55 : 0.4;
  const mostrarBalao = tempo !== "chega";

  const boneco = (tamanho: number) => (
    <Devocionalzeiro tamanho={tamanho} expressao={expressao} gesto={gesto} chama={chama} pulso={pulso} falando={falando} olhar={tempo === "surpresa" ? { x: 0, y: -0.6 } : null} />
  );
  const entrada = reduzir ? { opacity: 0 } : { y: "115%" };
  const noLugar = reduzir ? { opacity: 1 } : { y: 0 };
  const mola = { type: "spring" as const, stiffness: 380, damping: 17 };

  if (cena.tamanho === "grande") {
    return (
      <motion.div
        className="rpg-root fixed inset-0 z-[200] flex items-center justify-center px-6"
        style={{ background: "rgba(5,7,12,0.82)", backdropFilter: "blur(3px)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }}
        onClick={() => fim.current()}
        role="status"
      >
        <div className="relative flex w-full max-w-[340px] flex-col items-center">
          {/* a luz que abre atrás dele: raios dourados girando devagar */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[46%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent 0 6%, #ffd88933 8% 11%, transparent 13% 22%, #ffd88926 24% 27%, transparent 29% 38%, #ffd88933 40% 43%, transparent 45% 55%, #ffd88926 57% 60%, transparent 62% 71%, #ffd88933 73% 76%, transparent 78% 88%, #ffd88926 90% 93%, transparent 95%)",
              maskImage: "radial-gradient(circle, #000 18%, transparent 68%)",
              WebkitMaskImage: "radial-gradient(circle, #000 18%, transparent 68%)",
            }}
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{ opacity: tempo === "festa" || tempo === "tchau" ? 1 : 0.4, scale: 1, rotate: reduzir ? 0 : 60 }}
            transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.8 }, rotate: { duration: 6, ease: "linear" } }}
          />
          <div
            className="pointer-events-none absolute left-1/2 top-[48%] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, #5b9bff55 0%, #ffd88922 40%, transparent 70%)" }}
          />

          {cena.titulo && (
            <motion.p
              className="rpg-eyebrow relative mb-3 text-center text-[11px] font-extrabold uppercase tracking-[0.2em]"
              style={{ color: "#ffd889" }}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: mostrarBalao ? 1 : 0, y: 0 }} transition={{ delay: 0.3 }}
            >
              {cena.titulo}
            </motion.p>
          )}

          <div className="relative min-h-[92px] w-full">
            <AnimatePresence>
              {mostrarBalao && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 24 }}
                  style={{ transformOrigin: "20% 100%" }}
                >
                  <Balao texto={fala} onFalando={setFalando} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div className="relative mt-3" initial={reduzir ? { opacity: 0 } : { y: 260, scale: 0.8 }} animate={reduzir ? { opacity: 1 } : { y: 0, scale: 1 }} transition={mola}>
            {boneco(172)}
          </motion.div>

          <motion.p
            className="relative mt-4 text-[10.5px] font-bold uppercase tracking-[0.14em]"
            style={{ color: "#9c8b68" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          >
            Toque para continuar
          </motion.p>
        </div>
      </motion.div>
    );
  }

  const pequena = cena.tamanho === "pequena";
  return (
    <div
      className="rpg-root pointer-events-none fixed inset-x-0 z-[200] flex justify-center px-3"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 76px)", background: "transparent" }}
      role="status"
    >
      <motion.div
        className={`pointer-events-auto flex w-full items-end gap-1 ${pequena ? "max-w-[440px] flex-row-reverse" : "max-w-[440px]"}`}
        initial={entrada} animate={noLugar} exit={reduzir ? { opacity: 0 } : { y: "130%", transition: { duration: 0.35, ease: "easeIn" } }}
        transition={mola}
        onClick={() => fim.current()}
      >
        {/* ele, com uma luz azul atrás que cresce junto com a chama */}
        <div className="relative shrink-0">
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[30%] h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, #5b9bff66 0%, #5b9bff00 62%)" }}
            animate={{ opacity: tempo === "festa" ? 1 : 0.35, scale: tempo === "festa" ? 1.1 : 0.85 }}
            transition={{ duration: 0.5 }}
          />
          {boneco(pequena ? 84 : 118)}
        </div>
        <div className={`min-w-0 ${pequena ? "max-w-[220px]" : "flex-1"}`} style={{ marginBottom: pequena ? 70 : 96 }}>
          <AnimatePresence>
            {mostrarBalao && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
                style={{ transformOrigin: pequena ? "90% 100%" : "10% 100%" }}
              >
                <Balao texto={fala} onFalando={setFalando} rabicho={pequena ? "direita" : "esquerda"} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
