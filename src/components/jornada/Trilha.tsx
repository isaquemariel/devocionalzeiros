import { memo, useId, useMemo } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * O MUNDO DA JORNADA: uma estrada da Judeia que amanhece.
 *
 * Não existe barra de progresso. O progresso é o céu: começa numa aurora
 * lilás e pêssego e termina em dia claro, com o sol subindo junto. E é a
 * estrada: a cada passo o Devocionalzeiro anda, e o mundo desliza em camadas —
 * os montes longe devagar, o chão perto rápido. No fim, Jerusalém aparece no
 * alto, com o Templo — "Alegrei-me quando me disseram: Vamos á casa do
 * SENHOR" (Sl 122:1, com a grafia da ARC).
 *
 * A paisagem é a da terra da Bíblia, e não um prado qualquer: montes de
 * calcário cor de areia, oliveiras de copa prateada e tronco torto, ciprestes,
 * tamareiras, socalcos de pedra nas encostas, uma aldeia de casas de teto
 * chato com o seu poço, a tenda de pelo de cabra de um pastor e o rebanho, e
 * as anêmonas vermelhas — os "lírios do campo" de Mt 6:28 — na beira do
 * caminho. Os marcos da estrada levam lamparinas de barro que ACENDEM quando
 * ele passa: "Lâmpada para os meus pés é tua palavra, e luz para o meu
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
 * tela por cima e deixava só chão à vista.
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

type Arvore = { x: number; y: number; s: number; tipo: "oliveira" | "cipreste" | "tamareira" };

const CENARIO = (() => {
  const rnd = aleatorio(11);
  const flores: { x: number; y: number; c: string; r: number }[] = [];
  const tufos: { x: number; y: number; h: number }[] = [];
  const pedras: { x: number; y: number; r: number }[] = [];
  const arvores: Arvore[] = [];
  const marcos: number[] = [];
  // anêmona vermelha é a maioria; no meio, margaridas e uma ou outra lilás
  const cores = ["#D83A34", "#E2483F", "#D83A34", "#F4EFE2", "#F2C94C", "#B58AD8"];
  for (let x = -700; x < 3300; x += 11 + rnd() * 18) {
    const y = TRILHA_Y + 26 + rnd() * 70;
    if (rnd() < 0.38) flores.push({ x, y, c: cores[(rnd() * cores.length) | 0], r: 1.9 + rnd() * 1.5 });
    else tufos.push({ x, y, h: 5 + rnd() * 7 });
  }
  // as pedras da beira da estrada, dos dois lados
  for (let x = -700; x < 3300; x += 14 + rnd() * 26) {
    pedras.push({ x, y: TRILHA_Y - 9 + rnd() * 2, r: 2 + rnd() * 2.6 });
    if (rnd() < 0.6) pedras.push({ x: x + 7, y: TRILHA_Y + 15 + rnd() * 2, r: 2.2 + rnd() * 3 });
  }
  for (let x = -600; x < 2200; x += 34 + rnd() * 70) {
    const r = rnd();
    // deixa o vão das aldeias, da tenda e do rebanho sem árvore
    if ([[290, 380], [640, 720], [540, 620], [1200, 1300], [740, 820]].some(([a, b]) => x > a && x < b)) continue;
    arvores.push({ x, y: 396 + rnd() * 16, s: 0.7 + rnd() * 0.5, tipo: r < 0.55 ? "oliveira" : r < 0.82 ? "cipreste" : "tamareira" });
  }
  // um marco de pedra com lamparina a cada etapa: a pessoa vê que avançou
  for (let i = 1; i < 14; i++) marcos.push(200 + i * PASSO + 34);
  return { flores, tufos, pedras, arvores, marcos };
})();

/** estrelas da madrugada, espalhadas também pelos lados (tela larga) */
const ESTRELAS: [number, number][] = (() => {
  const rnd = aleatorio(5);
  const l: [number, number][] = [[40, 70], [96, 130], [150, 50], [230, 96], [300, 40], [352, 120], [70, 200], [330, 210], [190, 170]];
  for (let i = 0; i < 26; i++) l.push([-700 + rnd() * 1800, 20 + rnd() * 220]);
  return l;
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
/** a linha de cima de um relevo, para desenhar o socalco de pedra que o acompanha */
function linhaDe(x0: number, x1: number, base: number, amp: number, freq: number, fase: number): string {
  let d = "";
  for (let x = x0; x <= x1; x += 12) {
    const y = base - amp * (0.55 * Math.sin(x * freq + fase) + 0.3 * Math.sin(x * freq * 2.3 + fase * 1.7) + 0.15 * Math.sin(x * freq * 5.1));
    d += `${d ? " L" : "M"}${x} ${y.toFixed(1)}`;
  }
  return d;
}
// os montes da Judeia: arredondados e baixos, um atrás do outro
const MONTES_LONGE = relevo(-900, 1500, 306, 34, 0.009, 0.6);
const MONTES = relevo(-900, 1500, 340, 26, 0.013, 2.4);
const COLINAS = relevo(-800, 2200, 394, 16, 0.017, 2.1);
const SOCALCO_1 = linhaDe(-800, 2200, 408, 12, 0.017, 2.3);
const SOCALCO_2 = linhaDe(-800, 2200, 420, 8, 0.017, 2.5);
const CHAO = relevo(-800, 3400, 432, 5, 0.018, 0.3);

// ─── peças do cenário ───────────────────────────────────────────────────────

function Oliveira({ cor }: { cor: { folha: string; folhaClara: string; tronco: string } }) {
  return (
    <g>
      {/* tronco torto e grosso, que se abre em dois */}
      <path d="M-2.5 6 C-3 1 -1 -2 -4 -7 M1.5 6 C2 1 0.5 -2 4 -8" stroke={cor.tronco} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* copa larga, baixa, em tufos prateados */}
      <ellipse cx="-6" cy="-11" rx="8" ry="5.5" fill={cor.folha} />
      <ellipse cx="5" cy="-12" rx="8.5" ry="6" fill={cor.folha} />
      <ellipse cx="0" cy="-16" rx="8" ry="5.5" fill={cor.folha} />
      <ellipse cx="-3" cy="-17" rx="4" ry="2.4" fill={cor.folhaClara} />
      <ellipse cx="6" cy="-13" rx="3.4" ry="2" fill={cor.folhaClara} />
    </g>
  );
}

function Cipreste({ cor }: { cor: string }) {
  return (
    <g>
      <rect x="-1" y="0" width="2" height="6" fill="#6B4A36" />
      <path d="M0 -30 C5 -20 5.5 -6 3.5 1 L-3.5 1 C-5.5 -6 -5 -20 0 -30 Z" fill={cor} />
      <path d="M0 -26 C2 -18 2.5 -8 1.5 -2" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="1.2" fill="none" />
    </g>
  );
}

function Tamareira({ cor }: { cor: { folha: string; tronco: string } }) {
  return (
    <g>
      <path d="M0 6 C1 -6 3 -16 1 -26" stroke={cor.tronco} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* as palmas caindo em arco para os lados */}
      {[[-14, -20], [-12, -30], [-3, -36], [8, -34], [14, -24], [11, -18]].map(([x, y], i) => (
        <path key={i} d={`M1 -26 Q${(x * 0.5).toFixed(1)} ${y - 6} ${x} ${y}`} stroke={cor.folha} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      ))}
      <circle cx="0" cy="-24" r="1.6" fill="#B06A2A" />
      <circle cx="2.4" cy="-23.4" r="1.4" fill="#B06A2A" />
    </g>
  );
}

/** casa de pedra de teto chato, com o parapeito do terraço e a porta em arco */
function Casa({ x, y, l, a, cor }: { x: number; y: number; l: number; a: number; cor: { pedra: string; sombra: string; porta: string } }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-l / 2} y={-a} width={l} height={a} fill={cor.pedra} />
      <rect x={l / 2 - l * 0.28} y={-a} width={l * 0.28} height={a} fill={cor.sombra} />
      <rect x={-l / 2 - 1} y={-a - 2} width={l + 2} height="2.4" fill={cor.sombra} />
      <path d={`M${-l * 0.12} 0 L${-l * 0.12} ${-a * 0.42} Q0 ${-a * 0.58} ${l * 0.12} ${-a * 0.42} L${l * 0.12} 0 Z`} fill={cor.porta} />
      <rect x={-l * 0.36} y={-a * 0.78} width="2.2" height="2.6" fill={cor.porta} />
    </g>
  );
}

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
  const idCeu = `ceu-${uid}`, idSol = `sol-${uid}`, idLuz = `luz-${uid}`, idCidade = `cid-${uid}`;
  const p = Math.max(0, Math.min(1, progresso));

  const cor = useMemo(() => ({
    ceuTopo: doDia(p, "#8F7BE0", "#76A6F2", "#5DB6FF"),
    ceuMeio: doDia(p, "#E9A1C9", "#FFB9A0", "#A9DDFF"),
    ceuBase: doDia(p, "#FFCFA3", "#FFE3AE", "#F4F4E4"),
    sol: doDia(p, "#FF9E6B", "#FFC977", "#FFF3C4"),
    // calcário: lilás na aurora, rosado no nascer, cor de areia de dia
    montesLonge: doDia(p, "#A792D2", "#C9A7B5", "#D8C3A0"),
    montes: doDia(p, "#9580C2", "#BC9A8C", "#CDB184"),
    colinas: doDia(p, "#8C84B5", "#A8A27A", "#B8AE72"),
    socalco: doDia(p, "#7A71A2", "#91895F", "#9C9058"),
    chao: doDia(p, "#7F8C72", "#93A267", "#A3B266"),
    chaoEscuro: doDia(p, "#6C7A62", "#7D8C55", "#8A9A52"),
    trilha: doDia(p, "#D9BC9C", "#E7CB9E", "#EED8A8"),
    trilhaBorda: doDia(p, "#BC9B80", "#C9A77C", "#CDAE7E"),
    pedra: doDia(p, "#B9A6A6", "#D6C3A2", "#E6D7B6"),
    pedraSombra: doDia(p, "#9C8C95", "#B9A283", "#C9B48E"),
    oliveira: doDia(p, "#6F7F8C", "#7F9270", "#8FA37A"),
    oliveiraClara: doDia(p, "#95A2B0", "#A7B593", "#B9C8A0"),
    cipreste: doDia(p, "#4F5F78", "#46684E", "#3F6B4A"),
    palma: doDia(p, "#5F7582", "#5E8252", "#5E9150"),
    tronco: doDia(p, "#6A5560", "#77583F", "#7C5A3E"),
    casa: doDia(p, "#C7B3C0", "#E5CFB0", "#EFDDB8"),
    casaSombra: doDia(p, "#A994AE", "#CBB08F", "#D6BD93"),
    porta: doDia(p, "#5E4A66", "#6B4B38", "#6B4A32"),
    tenda: doDia(p, "#3E3446", "#4A3A34", "#4B3A30"),
    ovelha: doDia(p, "#E4DAE8", "#F4EDE2", "#FBF7EE"),
    nuvem: doDia(p, "#FFD8E6", "#FFF0E0", "#FFFFFF"),
  }), [p]);

  // o sol nasce: sai de trás dos montes e sobe
  const solY = 370 - p * 240;
  const estrelas = 1 - Math.min(1, p / 0.3);
  const dur = reduzir ? "0ms" : "950ms";
  const vbl = Math.max(VB_L, VB_A * proporcao);
  const x0 = -(vbl - VB_L) / 2 - 10;
  const camada = (fator: number) => ({
    transform: `translateX(${-passo * PASSO * fator}px)`,
    transition: `transform ${dur} cubic-bezier(.45,.05,.3,1)`,
  });
  const casa = { pedra: cor.casa, sombra: cor.casaSombra, porta: cor.porta };

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
          <stop offset="0%" stopColor="#FFC56B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFC56B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={idCidade}>
          <stop offset="0%" stopColor="#FFF1C2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFF1C2" stopOpacity="0" />
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

      {/* nuvens finas e altas, de céu seco */}
      <g style={camada(0.08)}>
        {[[-560, 120, 1.1], [-300, 175, 0.9], [40, 150, 1], [250, 110, 1.3], [420, 180, 0.9], [640, 130, 1.1], [860, 160, 1.2], [1100, 120, 1]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity="0.85">
            <g>
              {!reduzir && <animateTransform attributeName="transform" type="translate" values={`0 0; ${18 + i * 4} 0; 0 0`} dur={`${26 + i * 5}s`} repeatCount="indefinite" />}
              <ellipse cx="0" cy="0" rx="38" ry="8" fill={cor.nuvem} />
              <ellipse cx="-12" cy="-6" rx="18" ry="8" fill={cor.nuvem} />
              <ellipse cx="12" cy="-7" rx="20" ry="9" fill={cor.nuvem} />
            </g>
          </g>
        ))}
        {/* andorinhas, só de dia */}
        {p > 0.35 && [[120, 90], [140, 100], [520, 80]].map(([x, y], i) => (
          <path key={i} d={`M${x - 5} ${y} Q${x - 2} ${y - 3} ${x} ${y} Q${x + 2} ${y - 3} ${x + 5} ${y}`} stroke="#4A4A5A" strokeWidth="1.2" fill="none" opacity={Math.min(1, (p - 0.35) * 3)}>
            {!reduzir && <animateTransform attributeName="transform" type="translate" values={`0 0; ${30 + i * 10} ${-6 + i * 3}; 0 0`} dur={`${14 + i * 3}s`} repeatCount="indefinite" />}
          </path>
        ))}
      </g>

      {/* os montes longe, em duas cristas */}
      <g style={camada(0.14)}>
        <path d={MONTES_LONGE} fill={cor.montesLonge} />
      </g>
      <g style={camada(0.22)}>
        <path d={MONTES} fill={cor.montes} />
      </g>

      {/* as encostas: socalcos de pedra, oliveiras, aldeia, tenda, rebanho e, no fim, Jerusalém */}
      <g style={camada(0.42)}>
        <path d={COLINAS} fill={cor.colinas} />
        <path d={SOCALCO_1} stroke={cor.socalco} strokeWidth="1.6" strokeDasharray="4 1.6" fill="none" opacity="0.75" />
        <path d={SOCALCO_2} stroke={cor.socalco} strokeWidth="1.6" strokeDasharray="3 2" fill="none" opacity="0.6" />

        {/* Jerusalém: muralha com torres e porta, e o Templo no alto */}
        <g transform="translate(772 388) scale(1.45)" style={{ opacity: destino ? 1 : 0, transition: "opacity 1200ms ease 400ms" }}>
          <circle cx="0" cy="-34" r="44" fill={`url(#${idCidade})`} />
          {/* casario atrás da muralha */}
          {[[-34, -18, 10, 10], [-22, -22, 9, 14], [18, -20, 10, 12], [30, -16, 9, 9]].map(([x, y, l, a], i) => (
            <rect key={i} x={x} y={y} width={l} height={a} fill={cor.casa} />
          ))}
          {/* o Templo, branco e dourado */}
          <rect x="-13" y="-40" width="26" height="22" fill="#F4E6C4" />
          <rect x="-13" y="-40" width="26" height="3" fill="#E7B84A" />
          <rect x="-7" y="-47" width="14" height="8" fill="#F8EDD2" />
          <rect x="-7" y="-47" width="14" height="2" fill="#E7B84A" />
          {[-9, -4, 1, 6].map((x) => <rect key={x} x={x} y="-35" width="2" height="15" fill="#D9C397" />)}
          {/* muralha com ameias */}
          <path d="M-46 2 L-46 -12 L46 -12 L46 2 Z" fill="#D8C08F" />
          {Array.from({ length: 16 }, (_, i) => <rect key={i} x={-46 + i * 6} y="-15" width="3.6" height="3.4" fill="#D8C08F" />)}
          <rect x="-50" y="-22" width="10" height="24" fill="#CFB582" />
          <rect x="40" y="-22" width="10" height="24" fill="#CFB582" />
          <path d="M-5 2 L-5 -5 Q0 -10 5 -5 L5 2 Z" fill="#6B4A32" />
          {[[-26, -8], [-14, -8], [14, -8], [26, -8]].map(([x, y], i) => <rect key={i} x={x} y={y} width="2.4" height="3" fill="#FFE39A" />)}
        </g>

        {/* aldeia com poço */}
        <g>
          <Casa x={318} y={404} l={16} a={12} cor={casa} />
          <Casa x={336} y={406} l={13} a={10} cor={casa} />
          <Casa x={352} y={403} l={15} a={15} cor={casa} />
          <g transform="translate(372 408)">
            <ellipse cx="0" cy="0" rx="6" ry="2" fill={cor.pedraSombra} />
            <rect x="-6" y="-5" width="12" height="5" fill={cor.pedra} />
            <path d="M-5 -5 L-5 -12 M5 -5 L5 -12 M-6 -12 L6 -12" stroke={cor.tronco} strokeWidth="1.3" />
          </g>
          <Casa x={1228} y={404} l={15} a={12} cor={casa} />
          <Casa x={1246} y={406} l={17} a={14} cor={casa} />
          <Casa x={1266} y={404} l={12} a={9} cor={casa} />
        </g>

        {/* a tenda de pelo de cabra do pastor */}
        <g transform="translate(680 410)">
          <path d="M-20 0 L-16 -11 Q-8 -15 0 -12 Q8 -15 16 -11 L20 0 Z" fill={cor.tenda} />
          <path d="M-4 0 L-4 -9 L4 -9 L4 0 Z" fill="#2A2230" opacity="0.8" />
          <path d="M-16 -11 L-24 2 M16 -11 L24 2" stroke={cor.tronco} strokeWidth="0.9" />
        </g>

        {/* o rebanho pastando */}
        {[[548, 414], [560, 418], [573, 413], [586, 419], [598, 415], [611, 420], [566, 424]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${i % 2 ? -1 : 1} 1)`}>
            <ellipse cx="0" cy="0" rx="5" ry="3.4" fill={cor.ovelha} />
            <ellipse cx="4.6" cy="-0.6" rx="1.9" ry="1.6" fill="#3A3238" />
            <path d="M-2.5 3 L-2.5 5 M2.5 3 L2.5 5" stroke="#3A3238" strokeWidth="0.9" />
          </g>
        ))}

        {CENARIO.arvores.map((a, i) => (
          <g key={i} transform={`translate(${a.x} ${a.y}) scale(${a.s})`}>
            {a.tipo === "oliveira" ? (
              <Oliveira cor={{ folha: cor.oliveira, folhaClara: cor.oliveiraClara, tronco: cor.tronco }} />
            ) : a.tipo === "cipreste" ? (
              <Cipreste cor={cor.cipreste} />
            ) : (
              <Tamareira cor={{ folha: cor.palma, tronco: cor.tronco }} />
            )}
          </g>
        ))}
      </g>

      {/* o chão perto, com a estrada, as pedras da beira, as anêmonas e os marcos */}
      <g style={camada(1)}>
        <path d={CHAO} fill={cor.chao} />
        <rect x="-800" y={TRILHA_Y + 40} width="4200" height="400" fill={cor.chaoEscuro} opacity="0.35" />
        {/* a estrada de terra batida */}
        <path
          d={`M-800 ${TRILHA_Y - 8} L-80 ${TRILHA_Y - 8} C200 ${TRILHA_Y - 14} 600 ${TRILHA_Y - 2} 1000 ${TRILHA_Y - 9} S1700 ${TRILHA_Y - 6} 2100 ${TRILHA_Y - 10} L3400 ${TRILHA_Y - 9} L3400 ${TRILHA_Y + 14} L2100 ${TRILHA_Y + 14} C1600 ${TRILHA_Y + 18} 1000 ${TRILHA_Y + 10} 600 ${TRILHA_Y + 16} S100 ${TRILHA_Y + 12} -80 ${TRILHA_Y + 16} L-800 ${TRILHA_Y + 16} Z`}
          fill={cor.trilha}
          stroke={cor.trilhaBorda}
          strokeWidth="1.2"
        />
        {/* sulcos das rodas e dos pés */}
        <path d={`M-800 ${TRILHA_Y + 2} L3400 ${TRILHA_Y + 2}`} stroke={cor.trilhaBorda} strokeWidth="0.8" strokeDasharray="10 14" opacity="0.5" />
        {CENARIO.pedras.map((pd, i) => (
          <ellipse key={i} cx={pd.x} cy={pd.y} rx={pd.r} ry={pd.r * 0.64} fill={i % 3 ? cor.pedra : cor.pedraSombra} />
        ))}
        {/* marcos de pedra com lamparina de barro: ACENDEM quando ele passa */}
        {CENARIO.marcos.map((x, i) => {
          const acesa = i < passo;
          return (
            <g key={i} transform={`translate(${x} ${TRILHA_Y - 5})`}>
              {acesa && <circle cx="0" cy="-22" r="14" fill={`url(#${idLuz})`} />}
              {/* o marco: pedra talhada, mais larga embaixo */}
              <path d="M-5 0 L-4 -16 Q0 -18 4 -16 L5 0 Z" fill={cor.pedra} />
              <path d="M1.5 0 L2 -16.6 Q3.4 -16.4 4 -16 L5 0 Z" fill={cor.pedraSombra} />
              {/* a lamparina: bojo de barro com bico */}
              <path d="M-5.5 -17 Q-5 -21.5 0 -21.5 Q4 -21.5 5 -19.5 L8 -20.5 Q7 -17.5 3.5 -17 Z" fill={acesa ? "#B8683A" : "#9D7A62"} />
              <circle cx="-0.5" cy="-20.6" r="1" fill="#5A3420" />
              {acesa && (
                <path d="M7.6 -21 C9.6 -23 9.4 -25.6 7.6 -28.2 C5.8 -25.6 5.6 -23 7.6 -21 Z" fill="#FF9E3D">
                  {!reduzir && <animateTransform attributeName="transform" type="scale" values="1 1;0.9 1.14;1 1" dur="0.7s" additive="sum" repeatCount="indefinite" />}
                </path>
              )}
            </g>
          );
        })}
        {CENARIO.tufos.map((c, i) => (
          <path key={i} d={`M${c.x} ${c.y} q-2 ${-c.h * 0.6} -3 ${-c.h} M${c.x} ${c.y} q1 ${-c.h * 0.7} 3 ${-c.h * 0.9} M${c.x} ${c.y} l0 ${-c.h * 0.8}`}
            stroke={cor.chaoEscuro} strokeWidth="1.3" fill="none" strokeLinecap="round" />
        ))}
        {CENARIO.flores.map((f, i) => (
          <g key={i}>
            <line x1={f.x} y1={f.y} x2={f.x} y2={f.y + 6} stroke={cor.chaoEscuro} strokeWidth="1" />
            <circle cx={f.x} cy={f.y} r={f.r} fill={f.c} />
            <circle cx={f.x} cy={f.y} r={f.r * 0.38} fill={f.c === "#F4EFE2" || f.c === "#F2C94C" ? "#E0A020" : "#2A1C22"} />
          </g>
        ))}
      </g>
    </svg>
  );
});
