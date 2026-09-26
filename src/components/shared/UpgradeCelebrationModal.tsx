import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Devocionalzeiro, type Expressao, type Gesto } from "@/components/devocionalzeiro/Devocionalzeiro";
import { Balao } from "@/components/jornada/Balao";
import { diferencas, resumo, type ChavePlano } from "@/lib/planos";

interface UpgradeCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

/**
 * O PARABÉNS DA ASSINATURA — uma cena do Devocionalzeiro, não um cartão com
 * confete.
 *
 * A coreografia (≈ 4 s, e o botão já responde antes):
 * 1. ele sobe no palco, sob o céu de Jerusalém;
 * 2. a COROA do plano aparece lá no alto, brilhando — ele olha para cima,
 *    surpreso;
 * 3. ela desce e pousa na cabeça dele — e a chama se apaga, que é a regra do
 *    personagem: o que vai na cabeça toma o lugar dela;
 * 4. ele dá uma pirueta no ar com a chama no máximo e diz, na caixa de
 *    diálogo do RPG, o que o plano abriu;
 * 5. os itens liberados acendem um por um, como as lamparinas da jornada.
 *
 * A coroa, depois de pousar, é desenhada DENTRO do boneco (`naCabeca`): pula,
 * gira e inclina junto com ele. Se a pessoa usa algo na cabeça no RPG, a
 * coroa toma o lugar — o resto do visual dela continua.
 */

type Chave = "gold" | "premium" | "embaixador";

const PLANO: Record<Chave, {
  nome: string; cor: string; fala: string; coroa: "ouro" | "purpura" | "louro";
  itens: { nome: string; valor: string }[];
}> = {
  gold: {
    nome: "Gold", cor: "#ffd889", coroa: "ouro",
    fala: "Coroa de ouro! Agora são 10 fases por dia no RPG, as salas dos livros e muito mais.",
    itens: [],
  },
  premium: {
    nome: "Premium", cor: "#c084fc", coroa: "purpura",
    fala: "Premium! Sem limite no RPG, no quiz e no chat — e a Sala Global aberta pra você.",
    itens: [],
  },
  embaixador: {
    nome: "Embaixador", cor: "#7fd0a0", coroa: "louro",
    fala: "Embaixador! Agora é espalhar a Palavra com o seu link — e ganhar com cada indicação.",
    itens: [
      { nome: "Link de indicação", valor: "o seu" },
      { nome: "Comissão", valor: "10% por assinatura" },
      { nome: "Tudo do Premium", valor: "incluso" },
    ],
  },
};

/** o que cada plano abriu, direto do catálogo (a vitrine e o parabéns falam igual) */
function itensDo(chave: Chave) {
  if (chave === "embaixador") return PLANO.embaixador.itens;
  const de: ChavePlano = chave === "premium" ? "gold" : "free";
  return diferencas(de, chave).slice(0, 4).map((r) => ({ nome: r.curto, valor: resumo(r[chave]) }));
}

type Tempo = "entra" | "coroa" | "pousa" | "festa" | "fala";

export const UpgradeCelebrationModal = ({ isOpen, onClose, planName }: UpgradeCelebrationModalProps) => {
  const k = planName.toLowerCase();
  const chave: Chave = k === "premium" || k === "admin" ? "premium" : k === "embaixador" ? "embaixador" : "gold";
  const p = PLANO[chave];
  const itens = itensDo(chave);
  const reduzir = useReducedMotion();
  const [tempo, setTempo] = useState<Tempo>("entra");
  const [pulso, setPulso] = useState(0);
  const [falando, setFalando] = useState(false);

  useEffect(() => {
    if (!isOpen) { setTempo("entra"); return; }
    if (reduzir) { setTempo("fala"); return; }
    const ts = [
      window.setTimeout(() => setTempo("coroa"), 900),
      window.setTimeout(() => { setTempo("pousa"); setPulso((n) => n + 1); }, 1750),
      window.setTimeout(() => setTempo("festa"), 1950),
      window.setTimeout(() => setTempo("fala"), 3300),
    ];
    return () => ts.forEach(clearTimeout);
  }, [isOpen, reduzir]);

  const naCabeca = tempo === "pousa" || tempo === "festa" || tempo === "fala";
  const expressao: Expressao = tempo === "coroa" ? "surpreso" : tempo === "festa" ? "radiante" : "feliz";
  const gesto: Gesto = tempo === "festa" ? "pirueta" : tempo === "fala" ? "vitoria" : "parado";
  const chama = tempo === "festa" ? 1 : naCabeca ? 0.7 : 0.4;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="parabens"
          className="rpg-root fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto px-4 py-6"
          style={{ background: "rgba(5,7,12,0.9)", backdropFilter: "blur(4px)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          role="dialog"
          aria-label={`Parabéns! Plano ${p.nome}`}
        >
          <motion.div
            className="w-full max-w-[360px]"
            initial={{ scale: 0.92, y: 24, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <p className="rpg-eyebrow mb-2 text-center text-[11px] font-extrabold uppercase tracking-[0.24em]" style={{ color: "#ffd889" }}>
              Parabéns!
            </p>

            {/* ── o palco ─────────────────────────────────────────────── */}
            <div
              className="relative h-[270px] overflow-hidden rounded-[18px]"
              style={{
                border: "2px solid #e8b04b",
                boxShadow: "0 0 0 2px #0b0805, 0 24px 60px -20px #000",
                background: "linear-gradient(180deg, #141233 0%, #2c2554 42%, #5a4a7e 74%, #8a6a74 100%)",
              }}
            >
              <Estrelas />
              {/* a luz que se abre quando a coroa pousa */}
              <div className="pointer-events-none absolute left-1/2 top-[58%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="h-full w-full"
                style={{
                  background: `conic-gradient(from 0deg, transparent 0 7%, ${p.cor}30 9% 12%, transparent 14% 24%, ${p.cor}26 26% 29%, transparent 31% 41%, ${p.cor}30 43% 46%, transparent 48% 58%, ${p.cor}26 60% 63%, transparent 65% 75%, ${p.cor}30 77% 80%, transparent 82% 92%, ${p.cor}26 94% 97%, transparent 99%)`,
                  maskImage: "radial-gradient(circle, #000 14%, transparent 64%)",
                  WebkitMaskImage: "radial-gradient(circle, #000 14%, transparent 64%)",
                }}
                animate={{ opacity: naCabeca ? 1 : 0, rotate: reduzir ? 0 : 50 }}
                transition={{ opacity: { duration: 0.5 }, rotate: { duration: 8, ease: "linear" } }}
              />
              </div>
              <Cidade />
              {/* o chão de pedra */}
              <div className="absolute inset-x-0 bottom-0 h-[46px]" style={{ background: "linear-gradient(#6b5a52, #3e3230)", borderTop: "2px solid #8a7466" }} />

              {/* ele, e a coroa caindo exatamente onde fica a cabeça dele */}
              <div className="absolute bottom-[26px] left-1/2 -translate-x-1/2" style={{ width: 150, height: (150 * 229) / 205 }}>
                <motion.div
                  initial={reduzir ? false : { y: 90, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.3 }}
                >
                  <Devocionalzeiro
                    tamanho={150}
                    expressao={expressao}
                    gesto={gesto}
                    chama={chama}
                    pulso={pulso}
                    falando={falando}
                    olhar={tempo === "coroa" ? { x: 0, y: -1 } : null}
                    naCabeca={naCabeca ? <Coroa tipo={p.coroa} /> : undefined}
                  />
                </motion.div>
                <AnimatePresence>
                  {tempo === "coroa" && (
                    <motion.svg
                      key="coroa-caindo"
                      viewBox="0 -24 205 229"
                      width={150}
                      height={(150 * 229) / 205}
                      className="pointer-events-none absolute inset-0"
                      style={{ overflow: "visible", filter: `drop-shadow(0 0 10px ${p.cor})` }}
                      initial={{ y: -240, rotate: -18, opacity: 0 }}
                      animate={{ y: 0, rotate: 0, opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.05 } }}
                      transition={{ y: { duration: 0.85, ease: [0.5, 0, 0.75, 0.3] }, rotate: { duration: 0.85, ease: "easeOut" }, opacity: { duration: 0.2 } }}
                    >
                      <Coroa tipo={p.coroa} />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ── a caixa de diálogo do RPG ─────────────────────────────── */}
            <div className="relative mt-3 min-h-[96px]">
              <div className="mb-2 flex justify-center">
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em]"
                  style={{ background: "#1c1509", color: p.cor, boxShadow: `inset 0 0 0 2px ${p.cor}` }}
                >
                  Plano {p.nome}
                </span>
              </div>
              <AnimatePresence>
                {tempo === "fala" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <Balao texto={p.fala} onFalando={setFalando} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── o que abriu: acende um por um ─────────────────────────── */}
            <div className="mt-5 grid grid-cols-2 gap-1.5">
              {itens.map((it, i) => (
                <motion.div
                  key={it.nome}
                  className="flex items-center gap-2 rounded-[9px] px-2 py-1.5"
                  style={{ background: "#20180d", boxShadow: "inset 0 0 0 1.5px #3a2c18" }}
                  initial={{ opacity: 0.25 }}
                  animate={{ opacity: tempo === "fala" ? 1 : 0.25 }}
                  transition={{ delay: tempo === "fala" ? 0.5 + i * 0.22 : 0 }}
                >
                  <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full" style={{ background: p.cor }}>
                    <Check className="h-2.5 w-2.5" strokeWidth={4} style={{ color: "#0b0805" }} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[11.5px] font-extrabold leading-tight" style={{ color: "#ece0c6" }}>{it.nome}</span>
                    <span className="block truncate text-[10px] leading-tight" style={{ color: "#9c8b68" }}>{it.valor}</span>
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.button
              type="button"
              onClick={onClose}
              className="rpg-btn mt-5 w-full py-3.5 text-[14px] uppercase tracking-[0.12em]"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduzir ? 0 : 1 }}
            >
              Começar a explorar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * As coroas, em unidades do rig (viewBox 0 -24 205 229). A cabeça dele é
 * redonda à direita (o bojo do D): o aro desce de 68 a 81 e se abre de 57 a
 * 141, que é a largura da cabeça nessa altura. Com ela na cabeça, a chama
 * some (a regra vale para todo acessório de cabeça).
 */
function Coroa({ tipo }: { tipo: "ouro" | "purpura" | "louro" }): ReactNode {
  if (tipo === "louro") {
    // grinalda de louros: dois ramos que se encontram na frente
    const folhas = Array.from({ length: 11 }, (_, i) => {
      const u = i / 10;
      const x = 58 + u * 82;
      const y = 76 - Math.sin(u * Math.PI) * 7;
      return { x, y, a: -60 + u * 120 + (i % 2 ? 28 : -28) };
    });
    return (
      <g>
        <path d="M57 78 Q99 64 141 78" fill="none" stroke="#4d7a3a" strokeWidth="3.4" strokeLinecap="round" />
        {folhas.map((f, i) => (
          <ellipse key={i} cx={f.x} cy={f.y} rx="4.2" ry="9" fill={i % 2 ? "#6fb35a" : "#8fd07a"} stroke="#3c6a2e" strokeWidth="1" transform={`rotate(${f.a} ${f.x} ${f.y})`} />
        ))}
        <circle cx="99" cy="72" r="3.4" fill="#ffd889" stroke="#8a6416" strokeWidth="1" />
      </g>
    );
  }
  const ouro = tipo === "ouro";
  const id = ouro ? "coroa-ouro" : "coroa-purpura";
  const pontas = [62, 80, 99, 118, 136];
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff0b8" />
          <stop offset="45%" stopColor="#f0c14f" />
          <stop offset="100%" stopColor="#a8701c" />
        </linearGradient>
      </defs>
      {!ouro && (
        // o veludo púrpura dentro do aro
        <path d="M60 70 Q70 44 99 42 Q128 44 138 70 Q99 60 60 70 Z" fill="#6d2a9c" stroke="#3e1560" strokeWidth="1.4" />
      )}
      {pontas.map((x, i) => (
        <g key={x}>
          <path d={`M${x - 7} 70 L${x} ${i === 2 ? 40 : 46} L${x + 7} 70 Z`} fill={`url(#${id})`} stroke="#8a5a14" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx={x} cy={i === 2 ? 38 : 44} r="3" fill={ouro ? "#fff6e0" : "#e9d5ff"} stroke="#8a5a14" strokeWidth="0.8" />
        </g>
      ))}
      {/* o aro, curvo como a cabeça */}
      <path d="M56 82 Q99 72 142 82 L140 69 Q99 59 58 69 Z" fill={`url(#${id})`} stroke="#8a5a14" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M58 83.5 Q99 74 141 83.5" fill="none" stroke="#000" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" />
      {/* as pedras */}
      <ellipse cx="99" cy="73" rx="5" ry="4.2" fill={ouro ? "#e8455a" : "#a855f7"} stroke="#5a1020" strokeWidth="0.8" />
      <circle cx="78" cy="75" r="2.8" fill="#3f8cff" stroke="#10306e" strokeWidth="0.7" />
      <circle cx="120" cy="75" r="2.8" fill="#3f8cff" stroke="#10306e" strokeWidth="0.7" />
      <path d="M66 70 Q76 67 86 66.5" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

/** o céu: estrelas fixas que piscam devagar */
function Estrelas() {
  const estrelas = [
    [18, 22], [44, 12], [70, 30], [120, 16], [160, 36], [205, 14], [240, 28], [276, 18], [300, 40], [96, 50], [226, 56], [30, 60],
  ];
  return (
    <svg className="pointer-events-none absolute inset-x-0 top-0 h-[90px] w-full" viewBox="0 0 320 90" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      {estrelas.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 ? 0.9 : 1.4} fill="#fff6d8" opacity={0.5 + (i % 4) * 0.12}>
          <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2.4 + (i % 5) * 0.6}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

/** Jerusalém no horizonte: muralha, torres e o Templo, em silhueta */
function Cidade() {
  return (
    <svg className="pointer-events-none absolute inset-x-0 bottom-[44px] h-[70px] w-full" viewBox="0 0 320 70" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path
        d="M0 70 V44 H18 V36 H26 V44 H60 V30 H70 V22 H80 V30 H92 V44 H128 V26 H136 V18 L150 10 L164 18 V26 H172 V44 H210 V34 H220 V26 H230 V34 H240 V44 H276 V32 H286 V40 H320 V70 Z"
        fill="#2a2140"
      />
      {/* o Templo, com a luz de ouro no alto */}
      <rect x="138" y="20" width="24" height="6" fill="#e8b04b" opacity="0.85" />
      {[40, 74, 104, 188, 224, 262, 300].map((x) => (
        <rect key={x} x={x} y="50" width="2.2" height="3" fill="#ffd889" opacity="0.8" />
      ))}
    </svg>
  );
}
