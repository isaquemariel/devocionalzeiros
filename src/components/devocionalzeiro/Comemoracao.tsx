import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Devocionalzeiro, type Expressao, type Gesto } from "./Devocionalzeiro";
import { Balao } from "@/components/jornada/Balao";
import { EVENTO_CELEBRAR, type MotivoCelebracao, type PedidoCelebracao } from "@/lib/celebrar";
import { EVENTO_AVISO, type PedidoAviso, type TipoAviso } from "@/lib/avisos";

/**
 * O PALCO DO DEVOCIONALZEIRO — o único lugar onde ele aparece por conta
 * própria no app. É ele quem COMEMORA (no lugar do confete, `lib/celebrar`) e
 * quem AVISA (no lugar dos toasts, `lib/avisos`).
 *
 * O balão SEMPRE sai dele: fica logo acima da cabeça, com o rabicho apontando
 * para a chama — como os balões das pessoas na cena viva do RPG. Nada de caixa
 * solta no canto da tela.
 *
 * Tamanhos da comemoração, conforme o peso do que aconteceu:
 * - PEQUENA (um capítulo lido) e MÉDIA (plano traçado, conquista): ele sobe no
 *   rodapé, comemora e diz a frase;
 * - GRANDE (a leitura do dia, o devocional): a tela escurece, uma luz dourada
 *   abre atrás dele, ele dá uma pirueta e a chama sobe alta.
 *
 * Os avisos usam o mesmo rodapé, com a cara do que aconteceu: sorri e vibra no
 * sucesso, coça a cabeça no erro, aponta na dica, se espanta no alerta.
 *
 * Um aviso de sucesso que chega junto de uma comemoração (o "+1 ponto!
 * Gênesis 2 marcado como lido" do capítulo) vira a FALA dela — um personagem
 * só, dizendo a coisa certa, em vez de dois balões brigando.
 */

type Tamanho = "pequena" | "media" | "grande";

interface Cena {
  tamanho: Tamanho;
  gesto: Gesto;
  falas: string[];
  titulo?: string;
  dura: number;
}

const CENAS: Record<MotivoCelebracao, Cena> = {
  capitulo: {
    tamanho: "pequena", gesto: "comemorar", dura: 2600,
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

/** a cara e o gesto de cada tipo de aviso */
const JEITO: Record<TipoAviso, { expressao: Expressao; gesto: Gesto; depois: Gesto; chama: number }> = {
  sucesso: { expressao: "feliz", gesto: "vitoria", depois: "parado", chama: 0.6 },
  erro: { expressao: "pensativo", gesto: "cocar", depois: "parado", chama: 0.22 },
  info: { expressao: "feliz", gesto: "apontar", depois: "parado", chama: 0.4 },
  alerta: { expressao: "surpreso", gesto: "parado", depois: "parado", chama: 0.4 },
};

const PESO: Record<Tamanho, number> = { pequena: 0, media: 1, grande: 2 };
const sortear = (l: string[]) => l[Math.floor(Math.random() * l.length)];
/** quanto tempo o aviso fica: dá para ler com calma, sem ficar para sempre */
const tempoDeLeitura = (texto: string, detalhe?: string, acao?: boolean) =>
  Math.max(acao ? 6500 : 3000, Math.min(8000, 2400 + (texto.length + (detalhe?.length ?? 0)) * 48));

type Festa = { id: number; tipo: "festa"; motivo: MotivoCelebracao; fala: string; detalhe?: string; desde: number };
type Aviso = { id: number; tipo: "aviso"; aviso: TipoAviso; fala: string; detalhe?: string; acao?: PedidoAviso["acao"]; dura: number; desde: number };
type Item = Festa | Aviso;

export function Comemoracao() {
  const [ativo, setAtivo] = useState<Item | null>(null);
  const fila = useRef<Item[]>([]);
  const seq = useRef(0);

  useEffect(() => {
    const aoCelebrar = (e: Event) => {
      const p = (e as CustomEvent<PedidoCelebracao>).detail;
      if (!p || !CENAS[p.motivo]) return;
      const cena = CENAS[p.motivo];
      setAtivo((a) => {
        const nova: Festa = { id: ++seq.current, tipo: "festa", motivo: p.motivo, fala: p.fala || sortear(cena.falas), desde: Date.now() };
        if (!a) return nova;
        // o aviso de sucesso que acabou de chegar vira a fala da festa
        if (a.tipo === "aviso" && a.aviso === "sucesso" && !a.acao && Date.now() - a.desde < 1200) {
          return cena.tamanho === "grande" ? { ...nova, detalhe: a.fala } : { ...nova, fala: a.fala, detalhe: a.detalhe };
        }
        if (a.tipo === "aviso") { fila.current.unshift(nova); return a; }
        // o capítulo que fecha o dia dispara "capítulo" e, logo depois,
        // "leitura do dia": a maior toma o lugar da menor
        if (PESO[cena.tamanho] > PESO[CENAS[a.motivo].tamanho]) return nova;
        if (p.motivo === a.motivo) return a;
        if (fila.current.length < 3) fila.current.push(nova);
        return a;
      });
    };
    const aoAvisar = (e: Event) => {
      const p = (e as CustomEvent<PedidoAviso>).detail;
      if (!p?.texto) return;
      const novo: Aviso = {
        id: ++seq.current, tipo: "aviso", aviso: p.tipo, fala: p.texto, detalhe: p.detalhe, acao: p.acao,
        dura: p.duracao ? Math.min(12000, Math.max(2500, p.duracao)) : tempoDeLeitura(p.texto, p.detalhe, !!p.acao),
        desde: Date.now(),
      };
      setAtivo((a) => {
        if (!a) return novo;
        // o sucesso que chega junto da festa vira a fala dela
        // (um aviso com botão — "Resgatar" — nunca se funde: o botão sumiria)
        if (a.tipo === "festa" && p.tipo === "sucesso" && !p.acao && Date.now() - a.desde < 1200) {
          return CENAS[a.motivo].tamanho === "grande" ? { ...a, detalhe: p.texto } : { ...a, fala: p.texto, detalhe: p.detalhe };
        }
        // aviso sobre aviso: o mais novo é o que importa agora
        if (a.tipo === "aviso") return novo;
        if (fila.current.length < 3) fila.current.push(novo);
        return a;
      });
    };
    window.addEventListener(EVENTO_CELEBRAR, aoCelebrar);
    window.addEventListener(EVENTO_AVISO, aoAvisar);
    return () => {
      window.removeEventListener(EVENTO_CELEBRAR, aoCelebrar);
      window.removeEventListener(EVENTO_AVISO, aoAvisar);
    };
  }, []);

  const encerrar = useCallback(() => {
    setAtivo(null);
    // o próximo entra depois que este saiu de cena
    window.setTimeout(() => {
      const p = fila.current.shift();
      if (p) setAtivo({ ...p, desde: Date.now() });
    }, 350);
  }, []);

  return (
    <AnimatePresence>
      {/* quando o aviso vira a fala da festa, o mesmo palco segue e o balão reescreve */}
      {ativo && <Palco key={ativo.id} item={ativo} onFim={encerrar} />}
    </AnimatePresence>
  );
}

type Tempo = "chega" | "reage" | "festa" | "tchau";

function Palco({ item, onFim }: { item: Item; onFim: () => void }) {
  const reduzir = useReducedMotion();
  const festa = item.tipo === "festa" ? CENAS[item.motivo] : null;
  const dura = item.tipo === "festa" ? CENAS[item.motivo].dura : item.dura;
  const [tempo, setTempo] = useState<Tempo>("chega");
  const [pulso, setPulso] = useState(0);
  const [falando, setFalando] = useState(false);
  const fim = useRef(onFim);
  fim.current = onFim;

  useEffect(() => {
    const ts = [
      window.setTimeout(() => { setPulso((p) => p + 1); setTempo("reage"); }, reduzir ? 0 : 380), // aterrissa
      window.setTimeout(() => setTempo("festa"), reduzir ? 0 : festa ? 700 : 1500),
      window.setTimeout(() => setTempo("tchau"), dura - 900),
      window.setTimeout(() => fim.current(), dura),
    ];
    return () => ts.forEach(clearTimeout);
  }, [dura, reduzir, festa]);

  let expressao: Expressao, gesto: Gesto, chama: number;
  if (festa) {
    expressao = tempo === "chega" ? "feliz" : tempo === "reage" ? "surpreso" : tempo === "festa" ? "radiante" : "feliz";
    gesto = tempo === "festa" ? festa.gesto : tempo === "tchau" ? "acenar" : "parado";
    // a chama é o placar da festa: sobe no auge e assenta na despedida
    chama = tempo === "festa" ? (festa.tamanho === "grande" ? 1 : 0.85) : tempo === "tchau" ? 0.55 : 0.4;
  } else {
    const j = JEITO[(item as Aviso).aviso];
    expressao = j.expressao;
    gesto = tempo === "reage" ? j.gesto : tempo === "tchau" ? "acenar" : j.depois;
    chama = j.chama;
  }
  const mostrarBalao = tempo !== "chega";
  const acao = item.tipo === "aviso" ? item.acao : undefined;

  /** o boneco, com o balão SAINDO dele: logo acima da cabeça, rabicho na chama */
  const falaComBoneco = (tamanho: number, centro: boolean) => {
    const H = (tamanho * 229) / 205;
    // a ponta do rabicho (15 px abaixo do balão) mira ~22% abaixo do topo da
    // caixa dele — a chama e o alto da cabeça
    // (na festa grande a chama sobe alta: o balão fica um pouco mais acima)
    const sobre = Math.round(H * (centro ? 0.1 : 0.22));
    return (
      <div className={`flex flex-col ${centro ? "items-center" : "items-start"}`}>
        <div
          className={`relative w-full ${centro ? "max-w-[340px]" : "max-w-[min(330px,calc(100vw-24px))]"}`}
          style={{ marginBottom: -sobre + 15, minHeight: 1 }}
        >
          <AnimatePresence>
            {mostrarBalao && (
              <motion.div
                initial={reduzir ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
                style={{ transformOrigin: centro ? "50% 100%" : `${Math.round(tamanho * 0.52)}px 100%` }}
              >
                <Balao
                  texto={item.fala}
                  detalhe={item.detalhe}
                  acao={acao ? { rotulo: acao.rotulo, onClick: () => { acao.onClick(); fim.current(); } } : undefined}
                  onFalando={setFalando}
                  onAvancar={() => fim.current()}
                  rabicho={centro ? "centro" : "esquerda"}
                  ponta={centro ? undefined : Math.round(tamanho * 0.517)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative">
          {/* uma luz azul atrás dele, que cresce com a chama */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[34%] h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, #5b9bff55 0%, #5b9bff00 62%)" }}
            animate={{ opacity: tempo === "festa" ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
          />
          <Devocionalzeiro
            tamanho={tamanho} expressao={expressao} gesto={gesto} chama={chama} pulso={pulso} falando={falando}
            olhar={tempo === "reage" && festa ? { x: 0, y: -0.6 } : null}
          />
        </div>
      </div>
    );
  };

  if (festa?.tamanho === "grande") {
    return (
      <motion.div
        className="rpg-root fixed inset-0 z-[200] flex items-center justify-center px-6"
        style={{ background: "rgba(5,7,12,0.82)", backdropFilter: "blur(3px)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }}
        onClick={() => fim.current()}
        role="status"
      >
        <div className="relative flex w-full max-w-[340px] flex-col items-center">
          {/* a luz que abre atrás dele (o giro fica no filho: o framer-motion
              reescreve o transform e apagaria o translate que centra) */}
          <div className="pointer-events-none absolute left-1/2 top-[68%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="h-full w-full rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent 0 6%, #ffd88933 8% 11%, transparent 13% 22%, #ffd88926 24% 27%, transparent 29% 38%, #ffd88933 40% 43%, transparent 45% 55%, #ffd88926 57% 60%, transparent 62% 71%, #ffd88933 73% 76%, transparent 78% 88%, #ffd88926 90% 93%, transparent 95%)",
                maskImage: "radial-gradient(circle, #000 18%, transparent 68%)",
                WebkitMaskImage: "radial-gradient(circle, #000 18%, transparent 68%)",
              }}
              initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
              animate={{ opacity: tempo === "festa" || tempo === "tchau" ? 1 : 0.4, scale: 1, rotate: reduzir ? 0 : 60 }}
              transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.8 }, rotate: { duration: 6, ease: "linear" } }}
            />
          </div>

          {festa.titulo && (
            <motion.p
              className="relative mb-3 text-center text-[11px] font-extrabold uppercase tracking-[0.2em]"
              style={{ color: "#ffd889" }}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: mostrarBalao ? 1 : 0, y: 0 }} transition={{ delay: 0.3 }}
            >
              {festa.titulo}
            </motion.p>
          )}

          <motion.div
            className="relative w-full"
            initial={reduzir ? { opacity: 0 } : { y: 260, scale: 0.8 }}
            animate={reduzir ? { opacity: 1 } : { y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 17 }}
          >
            {falaComBoneco(172, true)}
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

  const tamanho = festa ? (festa.tamanho === "pequena" ? 92 : 112) : 100;
  return (
    <div
      className="rpg-root pointer-events-none fixed inset-x-0 z-[200] flex justify-center px-3"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 76px)", background: "transparent" }}
      role="status"
    >
      <motion.div
        className="pointer-events-auto w-full max-w-[440px]"
        initial={reduzir ? { opacity: 0 } : { y: "115%" }}
        animate={reduzir ? { opacity: 1 } : { y: 0 }}
        exit={reduzir ? { opacity: 0 } : { y: "130%", transition: { duration: 0.35, ease: "easeIn" } }}
        transition={{ type: "spring", stiffness: 380, damping: 17 }}
        onClick={() => fim.current()}
      >
        {falaComBoneco(tamanho, false)}
      </motion.div>
    </div>
  );
}
