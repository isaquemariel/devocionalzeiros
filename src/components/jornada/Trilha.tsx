import { memo, useId, useMemo } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * O MUNDO DA JORNADA: uma trilha que amanhece.
 *
 * Não existe barra de progresso. O progresso é o céu: começa numa aurora
 * lilás e pêssego e termina em dia claro, com o sol subindo junto. E é a
 * trilha: a cada passo o Devocionalzeiro anda, e o mundo desliza em camadas —
 * montanha longe devagar, capim perto rápido. No fim aparece o destino no
 * horizonte. "Lâmpada para os meus pés é tua palavra, e luz para o meu
 * caminho" (Sl 119:105).
 *
 * Vista LATERAL de propósito: é a mesma linguagem das salas e da cena viva do
 * app, então a jornada já apresenta o jogo que a pessoa vai encontrar depois.
 *
 * O SVG tem 400×800 unidades e cobre a tela com `slice` ancorado embaixo. A
 * linha da trilha fica em y = TRILHA_Y; `posicaoDaTrilha()` converte isso para
 * pixels, e é por ela que a página põe os pés do mascote exatamente no chão.
 */

export const VB_L = 400;
export const VB_A = 800;
export const TRILHA_Y = 452;
/** quanto o chão perto anda por etapa, em unidades do SVG */
const PASSO = 118;

/**
 * Largura do quadro em unidades: 400 no celular em pé; numa tela mais larga que
 * 1:2 o quadro ALARGA (o mundo continua para os lados) em vez de a escala
 * crescer pela largura — que, num computador, empurrava a trilha para fora da
 * tela por cima e deixava só capim à vista.
 */
export const larguraDoQuadro = (l: number, a: number) => Math.max(VB_L, (VB_A * l) / Math.max(1, a));

/** y da trilha em pixels, numa tela de largura l e altura a */
export function posicaoDaTrilha(l: number, a: number): number {
  const escala = Math.max(l / larguraDoQuadro(l, a), a / VB_A);
  return a - (VB_A - TRILHA_Y) * escala;
}

// ─── cor ────────────────────────────────────────────────────────────────────
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mistura = (a: string, b: string, t: number) => {
  const [x, y] = [hex(a), hex(b)];
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("")}`;
};
/** cor num ponto do dia, entre três paradas: aurora (0), nascer (0,45), dia (1) */
const doDia = (p: number, aurora: string, nascer: string, dia: string) =>
  p < 0.45 ? mistura(aurora, nascer, p / 0.45) : mistura(nascer, dia, (p - 0.45) / 0.55);

// ─── cenário procedural, com semente fixa (não muda a cada montagem) ────────
function aleatorio(semente: number) {
  let s = semente;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const CENARIO = (() => {
  const rnd = aleatorio(11);
  const flores: { x: number; y: number; c: string; r: number }[] = [];
  const capim: { x: number; y: number; h: number }[] = [];
  const pedras: { x: number; y: number; r: number }[] = [];
  const arvores: { x: number; y: number; s: number }[] = [];
  const marcos: number[] = [];
  const cores = ["#FF8FB1", "#FFD35C", "#FFFFFF", "#B69CFF", "#FF9E6B"];
  for (let x = -700; x < 3300; x += 9 + rnd() * 16) {
    const y = TRILHA_Y + 26 + rnd() * 70;
    if (rnd() < 0.42) flores.push({ x, y, c: cores[(rnd() * cores.length) | 0], r: 1.8 + rnd() * 1.6 });
    else capim.push({ x, y, h: 6 + rnd() * 8 });
  }
  for (let x = -700; x < 3300; x += 70 + rnd() * 140) pedras.push({ x, y: TRILHA_Y + 18 + rnd() * 10, r: 3 + rnd() * 5 });
  for (let x = -600; x < 2200; x += 60 + rnd() * 90) arvores.push({ x, y: 392 + rnd() * 14, s: 0.7 + rnd() * 0.6 });
  // um marco de pedra a cada etapa: a pessoa vê que avançou
  for (let i = 1; i < 14; i++) marcos.push(200 + i * PASSO + 34);
  return { flores, capim, pedras, arvores, marcos };
})();

/** serra/colina como um caminho ondulado entre x0 e x1 */
function relevo(x0: number, x1: number, base: number, amp: number, freq: number, fase: number, fundo = VB_A): string {
  let d = `M${x0} ${fundo} L${x0} ${base}`;
  for (let x = x0; x <= x1; x += 12) {
    const y = base - amp * (0.55 * Math.sin(x * freq + fase) + 0.3 * Math.sin(x * freq * 2.3 + fase * 1.7) + 0.15 * Math.sin(x * freq * 5.1));
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d + ` L${x1} ${fundo} Z`;
}
/** estrelas da madrugada, espalhadas também pelos lados (tela larga) */
const ESTRELAS: [number, number][] = (() => {
  const rnd = aleatorio(5);
  const l: [number, number][] = [[40, 70], [96, 130], [150, 50], [230, 96], [300, 40], [352, 120], [70, 200], [330, 210], [190, 170]];
  for (let i = 0; i < 26; i++) l.push([-700 + rnd() * 1800, 20 + rnd() * 220]);
  return l;
})();

const SERRA = relevo(-900, 1500, 318, 42, 0.012, 0.6);
const COLINAS = relevo(-800, 2200, 392, 20, 0.02, 2.1);
const CHAO = relevo(-800, 3400, 432, 6, 0.018, 0.3);

interface Props {
  /** 0..1 — quanto do caminho já foi feito */
  progresso: number;
  /** índice da etapa: é ele que move o mundo */
  passo: number;
  /** o destino aparece no horizonte (fim da jornada) */
  destino?: boolean;
  /** largura/altura da caixa em pixels — ver `larguraDoQuadro` */
  proporcao?: number;
}

export const Trilha = memo(function Trilha({ progresso, passo, destino, proporcao = 0.5 }: Props) {
  const reduzir = useReducedMotion();
  // ids únicos por instância: com id fixo, duas trilhas na mesma página
  // dividiriam o mesmo degradê e o céu de uma pintaria a outra
  const uid = useId().replace(/:/g, "");
  const idCeu = `ceu-${uid}`, idSol = `sol-${uid}`, idLuz = `luz-${uid}`;
  const p = Math.max(0, Math.min(1, progresso));

  const cor = useMemo(() => ({
    ceuTopo: doDia(p, "#8F7BE0", "#76A6F2", "#5DB6FF"),
    ceuMeio: doDia(p, "#E9A1C9", "#FFB9A0", "#A9DDFF"),
    ceuBase: doDia(p, "#FFCFA3", "#FFE3AE", "#E8F8FF"),
    sol: doDia(p, "#FF9E6B", "#FFC977", "#FFF3C4"),
    serra: doDia(p, "#9A86D6", "#9B9ED9", "#8EB5E4"),
    colinas: doDia(p, "#7C79C0", "#78A58F", "#6CBE75"),
    chao: doDia(p, "#6E9A7E", "#6FB075", "#62C067"),
    chaoEscuro: doDia(p, "#5B8570", "#5C9A62", "#4FA855"),
    trilha: doDia(p, "#E2BD9E", "#EBCB9F", "#F2DCAA"),
    trilhaBorda: doDia(p, "#C79E84", "#D2AE82", "#D9BD87"),
    arvore: doDia(p, "#5F7FA0", "#4E8F68", "#3FA05A"),
    nuvem: doDia(p, "#FFD8E6", "#FFF0E0", "#FFFFFF"),
  }), [p]);

  // o sol nasce: sai de trás da serra e sobe
  const solY = 380 - p * 250;
  const estrelas = 1 - Math.min(1, p / 0.3);
  const dur = reduzir ? "0ms" : "950ms";
  const vbl = Math.max(VB_L, VB_A * proporcao);
  const x0 = -(vbl - VB_L) / 2 - 10;
  const camada = (fator: number) => ({
    transform: `translateX(${-passo * PASSO * fator}px)`,
    transition: `transform ${dur} cubic-bezier(.45,.05,.3,1)`,
  });

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`${(-(vbl - VB_L) / 2).toFixed(1)} 0 ${vbl.toFixed(1)} ${VB_A}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={idCeu} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cor.ceuTopo} />
          <stop offset="48%" stopColor={cor.ceuMeio} />
          <stop offset="100%" stopColor={cor.ceuBase} />
        </linearGradient>
        <radialGradient id={idSol}>
          <stop offset="0%" stopColor={cor.sol} stopOpacity="0.95" />
          <stop offset="35%" stopColor={cor.sol} stopOpacity="0.45" />
          <stop offset="100%" stopColor={cor.sol} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={idLuz}>
          <stop offset="0%" stopColor="#FFD86B" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFD86B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x={x0} width={vbl + 20} height={VB_A} fill={`url(#${idCeu})`} style={{ transition: "fill 900ms" }} />

      {/* estrelas da madrugada: somem com o dia */}
      {estrelas > 0 && (
        <g opacity={estrelas * 0.8}>
          {ESTRELAS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.6 : 1.1} fill="#FFFFFF">
              {!reduzir && <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + (i % 4) * 0.7}s`} repeatCount="indefinite" />}
            </circle>
          ))}
        </g>
      )}

      {/* o sol e o seu halo */}
      <circle cx="286" cy={solY} r="120" fill={`url(#${idSol})`} style={{ transition: `cy ${dur}` }} />
      <circle cx="286" cy={solY} r="26" fill={cor.sol} style={{ transition: `cy ${dur}` }} />

      {/* nuvens: derivam sozinhas e ainda andam um pouco com a trilha */}
      <g style={camada(0.08)}>
        {[[-560, 120, 1.1], [-300, 175, 0.9], [40, 150, 1], [250, 110, 1.3], [420, 180, 0.9], [640, 130, 1.1], [860, 160, 1.2], [1100, 120, 1]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity="0.9">
            <g>
              {!reduzir && <animateTransform attributeName="transform" type="translate" values={`0 0; ${18 + i * 4} 0; 0 0`} dur={`${26 + i * 5}s`} repeatCount="indefinite" />}
              <ellipse cx="0" cy="0" rx="34" ry="12" fill={cor.nuvem} />
              <ellipse cx="-14" cy="-8" rx="18" ry="12" fill={cor.nuvem} />
              <ellipse cx="12" cy="-10" rx="20" ry="14" fill={cor.nuvem} />
            </g>
          </g>
        ))}
      </g>

      {/* serra ao longe */}
      <g style={camada(0.18)}>
        <path d={SERRA} fill={cor.serra} />
      </g>

      {/* colinas com árvores e, no fim, o destino */}
      <g style={camada(0.42)}>
        <path d={COLINAS} fill={cor.colinas} />
        {CENARIO.arvores.map((a, i) => (
          <g key={i} transform={`translate(${a.x} ${a.y}) scale(${a.s})`}>
            <rect x="-1.6" y="-4" width="3.2" height="10" fill="#6B4A36" opacity="0.8" />
            <ellipse cx="0" cy="-10" rx="9" ry="10" fill={cor.arvore} />
            <ellipse cx="-3" cy="-13" rx="4" ry="4" fill="#FFFFFF" opacity="0.12" />
          </g>
        ))}
        {/* o destino: uma cidade no alto, com luz nas janelas */}
        <g
          transform="translate(772 378)"
          style={{ opacity: destino ? 1 : 0, transition: "opacity 1200ms ease 400ms" }}
        >
          <path d="M-46 14 L-46 -6 L-34 -6 L-34 -18 L-22 -18 L-22 -4 L-10 -4 L-10 -30 L-2 -38 L6 -30 L6 -2 L20 -2 L20 -14 L34 -14 L34 14 Z" fill="#8C6FB8" opacity="0.9" />
          {[[-40, 0], [-28, -10], [-6, -20], [2, -20], [-6, -8], [26, -6], [12, 4]].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="3.4" height="4.4" rx="0.8" fill="#FFE39A" />
          ))}
          <circle cx="-2" cy="-44" r="16" fill="#FFE39A" opacity="0.25" />
        </g>
      </g>

      {/* o chão perto, com a trilha, flores, capim, pedras e os marcos */}
      <g style={camada(1)}>
        <path d={CHAO} fill={cor.chao} />
        <rect x="-800" y={TRILHA_Y + 40} width="4200" height="400" fill={cor.chaoEscuro} opacity="0.35" />
        {/* a trilha: uma faixa de terra batida com borda mais escura */}
        <path
          d={`M-800 ${TRILHA_Y - 8} L-80 ${TRILHA_Y - 8} C200 ${TRILHA_Y - 14} 600 ${TRILHA_Y - 2} 1000 ${TRILHA_Y - 9} S1700 ${TRILHA_Y - 6} 2100 ${TRILHA_Y - 10} L3400 ${TRILHA_Y - 9} L3400 ${TRILHA_Y + 14} L2100 ${TRILHA_Y + 14} C1600 ${TRILHA_Y + 18} 1000 ${TRILHA_Y + 10} 600 ${TRILHA_Y + 16} S100 ${TRILHA_Y + 12} -80 ${TRILHA_Y + 16} L-800 ${TRILHA_Y + 16} Z`}
          fill={cor.trilha}
          stroke={cor.trilhaBorda}
          strokeWidth="1.4"
        />
        {CENARIO.pedras.map((pd, i) => (
          <ellipse key={i} cx={pd.x} cy={pd.y} rx={pd.r} ry={pd.r * 0.62} fill={cor.trilhaBorda} opacity="0.7" />
        ))}
        {/* lamparinas: uma por etapa, e ACENDEM quando ele passa. (Eram marcos
            de pedra com uma cruz — na beira de uma trilha, liam-se como lápides.) */}
        {CENARIO.marcos.map((x, i) => {
          const acesa = i < passo;
          return (
            <g key={i} transform={`translate(${x} ${TRILHA_Y - 4})`}>
              {acesa && <circle cx="0" cy="-26" r="15" fill={`url(#${idLuz})`} />}
              <rect x="-1.3" y="-20" width="2.6" height="22" rx="1" fill="#7A5A44" />
              <path d="M-5.5 -20 L5.5 -20 L4 -30 L-4 -30 Z" fill={acesa ? "#FFE7A8" : "#C9B9A6"} stroke="#7A5A44" strokeWidth="1" />
              <path d="M-4.5 -30 L0 -35 L4.5 -30 Z" fill="#7A5A44" />
              {acesa && (
                <path d="M0 -21.5 C2.2 -23.5 2 -26 0 -28.5 C-2 -26 -2.2 -23.5 0 -21.5 Z" fill="#FF9E3D">
                  {!reduzir && <animateTransform attributeName="transform" type="scale" values="1 1;0.9 1.12;1 1" dur="0.7s" additive="sum" repeatCount="indefinite" />}
                </path>
              )}
            </g>
          );
        })}
        {CENARIO.capim.map((c, i) => (
          <path key={i} d={`M${c.x} ${c.y} q-2 ${-c.h * 0.6} -3 ${-c.h} M${c.x} ${c.y} q1 ${-c.h * 0.7} 3 ${-c.h * 0.9} M${c.x} ${c.y} l0 ${-c.h * 0.8}`}
            stroke={cor.chaoEscuro} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        ))}
        {CENARIO.flores.map((f, i) => (
          <g key={i}>
            <line x1={f.x} y1={f.y} x2={f.x} y2={f.y + 6} stroke={cor.chaoEscuro} strokeWidth="1" />
            <circle cx={f.x} cy={f.y} r={f.r} fill={f.c} />
            <circle cx={f.x} cy={f.y} r={f.r * 0.35} fill="#FFE27A" />
          </g>
        ))}
      </g>
    </svg>
  );
});
