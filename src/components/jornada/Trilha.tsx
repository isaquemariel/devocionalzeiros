import { memo, useId, useMemo } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * O MUNDO DA JORNADA: a estrada romana que sobe para Jerusalém, ao amanhecer.
 *
 * Não existe barra de progresso. O progresso é o céu — começa na madrugada
 * azul-escura e termina em dia claro, com o sol subindo junto — e é a estrada:
 * a cada passo o Devocionalzeiro anda, e o mundo desliza em camadas.
 *
 * A paisagem é a Jerusalém do primeiro século, a dos Evangelhos, sob Roma:
 * - a ESTRADA é uma via romana calçada de lajes, com meio-fio, e trechos de
 *   COLUNATA na beira, como o Cardo das cidades romanas;
 * - os MARCOS são miliários romanos (a coluna baixa que media as milhas), e
 *   cada um leva uma lamparina de barro que ACENDE quando ele passa — "Lâmpada
 *   para os meus pés é tua palavra, e luz para o meu caminho" (Sl 119:105);
 * - atrás, a MURALHA herodiana de pedra clara, com torres, ameias e uma porta
 *   em arco; o AQUEDUTO romano de arcos; a Fortaleza ANTÔNIA com as suas
 *   torres; e o casario de teto chato subindo o monte;
 * - no alto da esplanada, o TEMPLO, branco e dourado, que se acende no fim.
 * Tudo em pedra de Jerusalém — o calcário dourado —, sem flores nem tons pastel.
 *
 * Vista LATERAL de propósito: é a mesma linguagem das salas e da cena viva do
 * RPG, então a jornada já apresenta o jogo que a pessoa vai encontrar depois.
 *
 * O SVG tem 400×800 unidades e cobre a tela com `slice` ancorado embaixo. A
 * linha da estrada fica em y = TRILHA_Y; `posicaoDaTrilha()` converte isso
 * para pixels, e é por ela que a página põe os pés do mascote no chão.
 */

export const VB_L = 400;
export const VB_A = 800;
export const TRILHA_Y = 452;
/** quanto o chão perto anda por etapa, em unidades do SVG */
const PASSO = 118;

/**
 * Largura do quadro em unidades: 400 no celular em pé; numa tela mais larga que
 * 1:2 o quadro ALARGA (o mundo continua para os lados) em vez de a escala
 * crescer pela largura — que, num computador, empurrava a estrada para fora da
 * tela por cima e deixava só chão à vista.
 */
export const larguraDoQuadro = (l: number, a: number) => Math.max(VB_L, (VB_A * l) / Math.max(1, a));

/** y da estrada em pixels, numa tela de largura l e altura a */
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
/** cor num ponto do dia, entre três paradas: madrugada (0), nascer (0,45), dia (1) */
const doDia = (p: number, madrugada: string, nascer: string, dia: string) =>
  p < 0.45 ? mistura(madrugada, nascer, p / 0.45) : mistura(nascer, dia, (p - 0.45) / 0.55);

// ─── cenário procedural, com semente fixa (não muda a cada montagem) ────────
function aleatorio(semente: number) {
  let s = semente;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const CENARIO = (() => {
  const rnd = aleatorio(11);
  // casario distante subindo o monte: blocos de teto chato, alguns mais altos
  const casario: { x: number; y: number; l: number; a: number }[] = [];
  for (let x = -900; x < 1700; x += 7 + rnd() * 9) {
    const monte = 348 - 14 * Math.sin(x * 0.006 + 1.2);
    casario.push({ x, y: monte, l: 8 + rnd() * 10, a: 6 + rnd() * (rnd() < 0.12 ? 22 : 11) });
  }
  // casas logo atrás da muralha
  const casas: { x: number; l: number; a: number }[] = [];
  for (let x = -900; x < 2300; x += 12 + rnd() * 14) casas.push({ x, l: 11 + rnd() * 12, a: 8 + rnd() * 14 });
  // pedrinhas e fragmentos no chão abaixo da estrada
  const cascalho: { x: number; y: number; r: number }[] = [];
  for (let x = -700; x < 3300; x += 16 + rnd() * 26) cascalho.push({ x, y: TRILHA_Y + 26 + rnd() * 70, r: 1.4 + rnd() * 2.4 });
  const tufos: { x: number; y: number; h: number }[] = [];
  for (let x = -700; x < 3300; x += 38 + rnd() * 60) tufos.push({ x, y: TRILHA_Y + 30 + rnd() * 60, h: 4 + rnd() * 5 });
  // um miliário com lamparina a cada etapa: a pessoa vê que avançou
  const marcos: number[] = [];
  for (let i = 1; i < 14; i++) marcos.push(200 + i * PASSO + 34);
  return { casario, casas, cascalho, tufos, marcos };
})();

/** estrelas da madrugada, espalhadas também pelos lados (tela larga) */
const ESTRELAS: [number, number][] = (() => {
  const rnd = aleatorio(5);
  const l: [number, number][] = [[40, 70], [96, 130], [150, 50], [230, 96], [300, 40], [352, 120], [70, 200], [330, 210], [190, 170]];
  for (let i = 0; i < 26; i++) l.push([-700 + rnd() * 1800, 20 + rnd() * 220]);
  return l;
})();

/** relevo ondulado entre x0 e x1 */
function relevo(x0: number, x1: number, base: number, amp: number, freq: number, fase: number, fundo = VB_A): string {
  let d = `M${x0} ${fundo} L${x0} ${base}`;
  for (let x = x0; x <= x1; x += 12) {
    const y = base - amp * (0.55 * Math.sin(x * freq + fase) + 0.3 * Math.sin(x * freq * 2.3 + fase * 1.7) + 0.15 * Math.sin(x * freq * 5.1));
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d + ` L${x1} ${fundo} Z`;
}
// o Monte das Oliveiras ao longe, e o monte onde a cidade se assenta
const OLIVEIRAS = relevo(-900, 1500, 312, 26, 0.008, 0.6);
const MONTE = relevo(-900, 1700, 356, 14, 0.006, 1.2);

/** muralha com ameias entre x0 e x1, topo em y */
function muralha(x0: number, x1: number, y: number): string {
  let d = `M${x0} 440 L${x0} ${y}`;
  for (let x = x0; x < x1; x += 8) d += ` L${x} ${y - 4} L${x + 4.5} ${y - 4} L${x + 4.5} ${y} L${Math.min(x + 8, x1)} ${y}`;
  return d + ` L${x1} 440 Z`;
}
// trechos de muralha (o vão entre eles é o do aqueduto)
const MURALHA = [muralha(-900, 420, 392), muralha(610, 2300, 392)].join(" ");
const TORRES = [-760, -540, -300, -90, 150, 330, 680, 900, 1110, 1330, 1560, 1800, 2050];

// ─── peças do cenário ───────────────────────────────────────────────────────

type Pedra = { clara: string; media: string; escura: string };

/** torre quadrada herodiana, com ameias e seteiras */
function Torre({ x, cor, alta = 30 }: { x: number; cor: Pedra; alta?: number }) {
  const topo = 392 - alta;
  return (
    <g>
      <rect x={x - 10} y={topo} width="20" height={440 - topo} fill={cor.clara} />
      <rect x={x + 3} y={topo} width="7" height={440 - topo} fill={cor.media} />
      {[-10, -4.5, 1, 6.5].map((dx) => <rect key={dx} x={x + dx} y={topo - 4} width="3.6" height="4" fill={cor.clara} />)}
      <rect x={x - 2} y={topo + 7} width="2" height="5" fill={cor.escura} />
      <rect x={x - 2} y={topo + 18} width="2" height="5" fill={cor.escura} />
    </g>
  );
}

/** coluna romana: base, fuste com caneluras e capitel */
function Coluna({ x, base, altura, cor }: { x: number; base: number; altura: number; cor: Pedra }) {
  const topo = base - altura;
  return (
    <g>
      <rect x={x - 5} y={base - 3} width="10" height="3" fill={cor.media} />
      <rect x={x - 3.2} y={topo + 3} width="6.4" height={altura - 6} fill={cor.clara} />
      <rect x={x + 0.8} y={topo + 3} width="1" height={altura - 6} fill={cor.media} opacity="0.7" />
      <rect x={x - 1.8} y={topo + 3} width="0.8" height={altura - 6} fill={cor.media} opacity="0.5" />
      <rect x={x - 5} y={topo} width="10" height="3.4" fill={cor.media} />
    </g>
  );
}

/** trecho de colunata (como o Cardo): colunas com a arquitrave por cima */
function Colunata({ x0, n, cor }: { x0: number; n: number; cor: Pedra }) {
  const base = TRILHA_Y - 9, altura = 50, vao = 26;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => <Coluna key={i} x={x0 + i * vao} base={base} altura={altura} cor={cor} />)}
      <rect x={x0 - 8} y={base - altura - 7} width={(n - 1) * vao + 16} height="7" fill={cor.clara} />
      <rect x={x0 - 8} y={base - altura - 1.6} width={(n - 1) * vao + 16} height="1.6" fill={cor.media} />
      <rect x={x0 - 9} y={base - altura - 9} width={(n - 1) * vao + 18} height="2.2" fill={cor.media} />
    </g>
  );
}

interface Props {
  /** 0..1 — quanto do caminho já foi feito */
  progresso: number;
  /** índice da etapa: é ele que move o mundo */
  passo: number;
  /** o Templo se ilumina no alto (fim da jornada) */
  destino?: boolean;
  /** largura/altura da caixa em pixels — ver `larguraDoQuadro` */
  proporcao?: number;
}

export const Trilha = memo(function Trilha({ progresso, passo, destino, proporcao = 0.5 }: Props) {
  const reduzir = useReducedMotion();
  // ids únicos por instância: com id fixo, duas trilhas na mesma página
  // dividiriam o mesmo degradê e o céu de uma pintaria a outra
  const uid = useId().replace(/:/g, "");
  const idCeu = `ceu-${uid}`, idSol = `sol-${uid}`, idLuz = `luz-${uid}`, idGloria = `glo-${uid}`, idLajes = `laj-${uid}`;
  const p = Math.max(0, Math.min(1, progresso));

  const cor = useMemo(() => {
    // pedra de Jerusalém: azulada de madrugada, rosada no nascer, dourada de dia
    const pedra = (m: string, n: string, d: string) => doDia(p, m, n, d);
    return {
      ceuTopo: doDia(p, "#26356A", "#3E5D93", "#4FA3E6"),
      ceuMeio: doDia(p, "#5B5A8C", "#D98F63", "#9ED3F2"),
      ceuBase: doDia(p, "#B98A86", "#F2C07A", "#EEE6CF"),
      sol: doDia(p, "#F29B55", "#FFC46B", "#FFF1C0"),
      oliveiras: doDia(p, "#46496E", "#8A6D6A", "#B79E77"),
      monte: doDia(p, "#54557A", "#A07F6A", "#C8AD80"),
      casario: doDia(p, "#66668A", "#B8906F", "#D9BE8D"),
      janela: doDia(p, "#FFC96B", "#6E4E36", "#6B4E34"),
      muro: { clara: pedra("#7A7898", "#D2A57C", "#E6CC98"), media: pedra("#646282", "#B88A62", "#CBAA72"), escura: pedra("#3E3D58", "#6E4E36", "#7A5A3A") },
      casa: pedra("#737392", "#C79C77", "#DFC593"),
      casaSombra: pedra("#5E5E7C", "#AC845F", "#C6A673"),
      telha: pedra("#5A4150", "#A4583C", "#B5623E"),
      coluna: { clara: pedra("#8A89A6", "#E0B98F", "#EFDDB2"), media: pedra("#6C6B8A", "#C39A70", "#D2B585"), escura: pedra("#48476A", "#7A5A3E", "#86663F") },
      chao: doDia(p, "#5A5566", "#9B7F5E", "#B89C6C"),
      chaoEscuro: doDia(p, "#4A4656", "#846A4C", "#9C8157"),
      laje: pedra("#8A879E", "#CBAE88", "#DCC49A"),
      lajeJunta: pedra("#66647C", "#9C7F5E", "#A88C63"),
      meioFio: pedra("#76748E", "#B39370", "#C4A67A"),
      cipreste: doDia(p, "#1F2A34", "#3B4E3A", "#3E5B3E"),
      nuvem: doDia(p, "#7C789C", "#F4D7B0", "#FFFFFF"),
      templo: pedra("#8A89A6", "#F1DFC2", "#F8EEDA"),
      ouro: doDia(p, "#B8913F", "#E8B04B", "#F2C35A"),
    };
  }, [p]);

  const solY = 380 - p * 250;
  const estrelas = 1 - Math.min(1, p / 0.35);
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
          <stop offset="55%" stopColor={cor.ceuMeio} />
          <stop offset="100%" stopColor={cor.ceuBase} />
        </linearGradient>
        <radialGradient id={idSol}>
          <stop offset="0%" stopColor={cor.sol} stopOpacity="0.95" />
          <stop offset="35%" stopColor={cor.sol} stopOpacity="0.4" />
          <stop offset="100%" stopColor={cor.sol} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={idLuz}>
          <stop offset="0%" stopColor="#FFC56B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFC56B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={idGloria}>
          <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFE9A8" stopOpacity="0" />
        </radialGradient>
        {/* lajes da via romana: fiadas desencontradas */}
        <pattern id={idLajes} width="28" height="12" patternUnits="userSpaceOnUse" y={TRILHA_Y - 8}>
          <rect width="28" height="12" fill={cor.laje} />
          <path d="M0 0.5 H28 M0 6.5 H28 M0.5 0 V6 M14.5 6 V12" stroke={cor.lajeJunta} strokeWidth="1" />
        </pattern>
      </defs>

      <rect x={x0} width={vbl + 20} height={VB_A} fill={`url(#${idCeu})`} />

      {/* estrelas da madrugada: somem com o dia */}
      {estrelas > 0 && (
        <g opacity={estrelas * 0.9}>
          {ESTRELAS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 1} fill="#FFFFFF">
              {!reduzir && <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + (i % 4) * 0.7}s`} repeatCount="indefinite" />}
            </circle>
          ))}
        </g>
      )}

      {/* o sol e o seu halo */}
      <circle cx="286" cy={solY} r="120" fill={`url(#${idSol})`} style={{ transition: `cy ${dur}` }} />
      <circle cx="286" cy={solY} r="24" fill={cor.sol} style={{ transition: `cy ${dur}` }} />

      {/* nuvens finas e altas, de céu seco */}
      <g style={camada(0.08)}>
        {[[-560, 120, 1.1], [-300, 175, 0.9], [40, 150, 1], [250, 110, 1.3], [420, 180, 0.9], [640, 130, 1.1], [860, 160, 1.2], [1100, 120, 1]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity="0.75">
            <g>
              {!reduzir && <animateTransform attributeName="transform" type="translate" values={`0 0; ${18 + i * 4} 0; 0 0`} dur={`${26 + i * 5}s`} repeatCount="indefinite" />}
              <ellipse cx="0" cy="0" rx="42" ry="5" fill={cor.nuvem} />
              <ellipse cx="-8" cy="-4" rx="20" ry="5" fill={cor.nuvem} />
            </g>
          </g>
        ))}
      </g>

      {/* o Monte das Oliveiras */}
      <g style={camada(0.12)}>
        <path d={OLIVEIRAS} fill={cor.oliveiras} />
      </g>

      {/* o monte da cidade, com o casario de teto chato subindo */}
      <g style={camada(0.24)}>
        <path d={MONTE} fill={cor.monte} />
        {CENARIO.casario.map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={c.y - c.a} width={c.l} height={c.a + 30} fill={cor.casario} />
            {i % 4 === 0 && <rect x={c.x + c.l * 0.35} y={c.y - c.a * 0.6} width="1.8" height="2.4" fill={cor.janela} />}
          </g>
        ))}
      </g>

      {/* muralha, torres, aqueduto, Fortaleza Antônia e, no alto, o Templo */}
      <g style={camada(0.42)}>
        {/* o Templo na esplanada — sempre ali; no fim, a glória o acende */}
        <g transform="translate(790 0)">
          <circle cx="0" cy="318" r="80" fill={`url(#${idGloria})`} style={{ opacity: destino ? 1 : 0, transition: "opacity 1400ms ease 300ms" }} />
          {/* a esplanada: o muro de arrimo de blocos herodianos */}
          <rect x="-90" y="352" width="180" height="40" fill={cor.muro.media} />
          {[358, 366, 374, 382].map((y) => <path key={y} d={`M-90 ${y} H90`} stroke={cor.muro.escura} strokeWidth="0.7" opacity="0.5" />)}
          {/* o pórtico real: colunata ao longo da esplanada */}
          <rect x="-84" y="340" width="168" height="12" fill={cor.coluna.clara} />
          {Array.from({ length: 22 }, (_, i) => <rect key={i} x={-82 + i * 7.8} y="342" width="2.4" height="10" fill={cor.coluna.media} />)}
          <rect x="-86" y="337" width="172" height="3.4" fill={cor.telha} />
          {/* o santuário: o pórtico alto na frente, dourado no topo */}
          <rect x="-22" y="296" width="44" height="44" fill={cor.templo} />
          <rect x="-34" y="306" width="12" height="34" fill={cor.templo} />
          <rect x="22" y="306" width="12" height="34" fill={cor.templo} />
          <rect x="-24" y="292" width="48" height="5" fill={cor.ouro} />
          <rect x="-36" y="303" width="72" height="3.4" fill={cor.ouro} />
          {Array.from({ length: 9 }, (_, i) => <rect key={i} x={-23 + i * 5.6} y="289" width="1.6" height="3.4" fill={cor.ouro} />)}
          <path d="M-7 340 V318 Q0 311 7 318 V340 Z" fill={cor.muro.escura} />
          <rect x="-7" y="318" width="14" height="22" fill={cor.ouro} opacity={destino ? 0.55 : 0.2} style={{ transition: "opacity 1400ms" }} />
        </g>

        {/* a Fortaleza Antônia, colada à esplanada, com as torres */}
        <g transform="translate(662 0)">
          <rect x="-26" y="344" width="52" height="48" fill={cor.muro.clara} />
          <rect x="8" y="344" width="18" height="48" fill={cor.muro.media} />
          {[-26, 18].map((x) => (
            <g key={x}>
              <rect x={x} y="326" width="10" height="22" fill={cor.muro.clara} />
              {[0, 5.5].map((d) => <rect key={d} x={x + d} y="323" width="3.4" height="3.4" fill={cor.muro.clara} />)}
            </g>
          ))}
          {[-26, -20, -14, -8, -2, 4, 10, 16, 22].map((x) => <rect key={x} x={x} y="341" width="3.4" height="3.4" fill={cor.muro.clara} />)}
          {[-16, -4, 8].map((x) => <rect key={x} x={x} y="356" width="2" height="4" fill={cor.muro.escura} />)}
        </g>

        {/* casas logo atrás da muralha, algumas com telhado romano */}
        {CENARIO.casas.map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={392 - c.a} width={c.l} height={c.a} fill={i % 3 ? cor.casa : cor.casaSombra} />
            {i % 7 === 0 && <path d={`M${c.x - 1} ${392 - c.a} L${c.x + c.l / 2} ${388 - c.a - 5} L${c.x + c.l + 1} ${392 - c.a} Z`} fill={cor.telha} />}
          </g>
        ))}
        {/* ciprestes junto do muro */}
        {[-420, -180, 250, 470, 590, 1000, 1420].map((x) => (
          <path key={x} d={`M${x} 360 C${x + 5} 372 ${x + 5.5} 386 ${x + 3.5} 394 L${x - 3.5} 394 C${x - 5.5} 386 ${x - 5} 372 ${x} 360 Z`} fill={cor.cipreste} />
        ))}

        {/* a muralha, as torres e a porta */}
        <path d={MURALHA} fill={cor.muro.clara} />
        {[400, 408, 416, 424].map((y) => <path key={y} d={`M-900 ${y} H420 M610 ${y} H2300`} stroke={cor.muro.media} strokeWidth="0.8" opacity="0.6" />)}
        {TORRES.map((x) => <Torre key={x} x={x} cor={cor.muro} alta={x === 900 ? 40 : 30} />)}
        {/* a porta da cidade, em arco */}
        <g transform="translate(40 0)">
          <rect x="-20" y="370" width="40" height="70" fill={cor.muro.clara} />
          {[-20, -14.5, -9, -3.5, 2, 7.5, 13].map((x) => <rect key={x} x={x} y="366" width="3.6" height="4" fill={cor.muro.clara} />)}
          <path d="M-9 440 V398 Q0 386 9 398 V440 Z" fill={cor.muro.escura} />
          <path d="M-11 398 Q0 383 11 398" stroke={cor.muro.media} strokeWidth="2" fill="none" />
        </g>

        {/* o aqueduto romano, em duas fileiras de arcos, no vão da muralha */}
        <g>
          <rect x="420" y="372" width="190" height="6" fill={cor.coluna.clara} />
          {Array.from({ length: 8 }, (_, i) => {
            const x = 420 + i * 24;
            return (
              <g key={i}>
                <path d={`M${x} 378 V386 Q${x + 12} 380 ${x + 24} 386 V378 Z`} fill={cor.coluna.clara} />
                <rect x={x - 3} y="386" width="6" height="54" fill={cor.coluna.clara} />
                <path d={`M${x + 3} 408 Q${x + 12} 400 ${x + 21} 408 V404 H${x + 3} Z`} fill={cor.coluna.clara} />
              </g>
            );
          })}
          <rect x="609" y="386" width="6" height="54" fill={cor.coluna.clara} />
        </g>
      </g>

      {/* o chão perto: a via romana, a colunata, os miliários */}
      <g style={camada(1)}>
        <rect x="-800" y="428" width="4200" height="400" fill={cor.chao} />
        <rect x="-800" y={TRILHA_Y + 40} width="4200" height="400" fill={cor.chaoEscuro} opacity="0.45" />
        {/* trechos de colunata na beira da estrada */}
        {[-200, 330, 860, 1390, 1920].map((x) => <Colunata key={x} x0={x} n={6} cor={cor.coluna} />)}
        {/* a via: lajes, com meio-fio dos dois lados */}
        <rect x="-800" y={TRILHA_Y - 8} width="4200" height="24" fill={`url(#${idLajes})`} />
        <rect x="-800" y={TRILHA_Y - 11} width="4200" height="3.4" fill={cor.meioFio} />
        <rect x="-800" y={TRILHA_Y + 15} width="4200" height="3.6" fill={cor.meioFio} />
        <rect x="-800" y={TRILHA_Y + 18.4} width="4200" height="1.4" fill={cor.chaoEscuro} opacity="0.6" />
        {/* miliários romanos com lamparina de barro: ACENDEM quando ele passa */}
        {CENARIO.marcos.map((x, i) => {
          const acesa = i < passo;
          return (
            <g key={i} transform={`translate(${x} ${TRILHA_Y - 10})`}>
              {acesa && <circle cx="1" cy="-26" r="14" fill={`url(#${idLuz})`} />}
              <rect x="-6.5" y="-2.6" width="13" height="2.6" fill={cor.coluna.media} />
              <rect x="-4.6" y="-19" width="9.2" height="16.6" rx="1.2" fill={cor.coluna.clara} />
              <rect x="1.6" y="-19" width="3" height="16.6" fill={cor.coluna.media} />
              <path d="M-2.4 -14 H2.4 M-2.4 -11 H2.4 M-2.4 -8 H1.4" stroke={cor.coluna.escura} strokeWidth="0.7" />
              <rect x="-5.6" y="-20.6" width="11.2" height="2" fill={cor.coluna.media} />
              {/* a lamparina: bojo de barro com bico */}
              <path d="M-5 -20.6 Q-4.6 -25 0 -25 Q3.6 -25 4.6 -23 L7.6 -24 Q6.6 -21 3.2 -20.6 Z" fill={acesa ? "#B8683A" : "#8E6E58"} />
              <circle cx="-0.4" cy="-24" r="0.9" fill="#5A3420" />
              {acesa && (
                <path d="M7.2 -24.4 C9.2 -26.4 9 -29 7.2 -31.6 C5.4 -29 5.2 -26.4 7.2 -24.4 Z" fill="#FF9E3D">
                  {!reduzir && <animateTransform attributeName="transform" type="scale" values="1 1;0.9 1.14;1 1" dur="0.7s" additive="sum" repeatCount="indefinite" />}
                </path>
              )}
            </g>
          );
        })}
        {CENARIO.cascalho.map((c, i) => (
          <ellipse key={i} cx={c.x} cy={c.y} rx={c.r} ry={c.r * 0.6} fill={i % 2 ? cor.laje : cor.lajeJunta} opacity="0.8" />
        ))}
        {CENARIO.tufos.map((c, i) => (
          <path key={i} d={`M${c.x} ${c.y} q-2 ${-c.h * 0.6} -3 ${-c.h} M${c.x} ${c.y} q1 ${-c.h * 0.7} 3 ${-c.h * 0.9} M${c.x} ${c.y} l0 ${-c.h * 0.8}`}
            stroke={cor.chaoEscuro} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
});
