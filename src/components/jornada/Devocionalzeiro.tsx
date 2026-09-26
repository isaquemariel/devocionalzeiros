import { useEffect, useId, useRef } from "react";
import type { Expressao, Gesto } from "@/lib/jornada/tipos";

/**
 * O DEVOCIONALZEIRO, como boneco de jogo.
 *
 * A primeira versão da jornada usava as artes em PNG — e PNG não se mexe: a
 * chama ficava parada, ele não sorria, não piscava, não olhava para nada. Aqui
 * ele é um RIG vetorial, redesenhado a partir da arte oficial, com cada parte
 * separada e animada à parte: corpo, olhos, pálpebras, íris, sobrancelhas,
 * boca, bochechas, braços, pés e a chama.
 *
 * Um único laço de `requestAnimationFrame` escreve direto nos atributos do SVG
 * por refs. Nada disto passa pelo React a cada quadro: as props mudam o ALVO
 * (expressão, gesto, tamanho da chama, para onde olhar) e o laço persegue o
 * alvo com molas — é isso que dá peso ao movimento, em vez de trocar de pose
 * num estalo.
 *
 * Princípios de animação aplicados, porque são eles que separam "boneco" de
 * "desenho que troca de figura":
 * - antecipação e esmagamento/esticamento no pulo;
 * - ação secundária: a chama tremula sozinha e se inclina contra o movimento;
 * - piscar em intervalo IRREGULAR (regular denuncia a máquina);
 * - o olhar vagueia quando ninguém dá um alvo.
 */

export type { Expressao, Gesto };

interface Props {
  expressao?: Expressao;
  gesto?: Gesto;
  /** 0..1 — o tamanho da chama. É a barra de progresso da jornada. */
  chama?: number;
  /** a boca acompanha a fala enquanto o balão escreve */
  falando?: boolean;
  /** para onde olhar, em -1..1 (x para a direita, y para baixo); `null` = vagueia */
  olhar?: { x: number; y: number } | null;
  /** muda → pulinho de reação */
  pulso?: number;
  /** muda → aceno curto de cabeça (uma letra digitada, um toque) */
  toque?: number;
  /** largura em px */
  tamanho?: number;
  className?: string;
}

// ─── geometria (viewBox 0 -24 205 229) ──────────────────────────────────────
// Medidas tiradas da arte oficial (1024 px) na escala de 1:5.
const OLHO_E = { x: 94, y: 97 };
const OLHO_D = { x: 129, y: 97 };
const OMBRO_E = { x: 71, y: 134 };
const OMBRO_D = { x: 153, y: 138 };
const BASE_CHAMA = { x: 104, y: 72 };

// Cantos macios à esquerda (a arte não tem quina viva) e o bojo do D inteiro.
const CORPO_FRENTE = "M74 63 L100 63 A57 57 0 0 1 100 177 L74 177 Q67 177 67 170 L67 70 Q67 63 74 63 Z";
const CORPO_LADO = "M58 69 Q58 66 62 65 L68 63.5 L68 176.5 L62 175 Q58 174 58 171 Z";
// A faixa neon emoldura a BARRIGA — um D menor dentro do D. Na primeira
// versão ela cruzava a altura da boca e, em "pensar", lia-se como uma
// segunda boca.
const FAIXA_NEON = "M84 130 L124 130 A20 20 0 0 1 124 170 L84 170";
const BOLSO = "M84 130 L124 130 A20 20 0 0 1 124 170 L84 170 Z";

/** línguas de fogo: deslocamento x, altura relativa, meia-largura, fase */
type Lingua = { dx: number; h: number; hw: number; f: number };
// As bases ficam JUNTAS e as pontas se espalham: é isso que faz uma gota de
// fogo. Com as bases espalhadas numa linha, a primeira versão parecia uma
// coroa de espinhos.
const CAMADAS: { cor: string; linguas: Lingua[] }[] = [
  { cor: "externa", linguas: [
    { dx: -13, h: 0.6, hw: 15, f: 0.0 }, { dx: -5, h: 0.92, hw: 17, f: 1.7 },
    { dx: 3, h: 1.0, hw: 18, f: 3.1 }, { dx: 10, h: 0.74, hw: 15, f: 4.6 }, { dx: 15, h: 0.5, hw: 11, f: 2.3 },
  ] },
  { cor: "media", linguas: [
    { dx: -6, h: 0.62, hw: 12, f: 0.9 }, { dx: 3, h: 0.78, hw: 13, f: 2.8 }, { dx: 10, h: 0.52, hw: 10, f: 5.1 },
  ] },
  { cor: "nucleo", linguas: [
    { dx: -1, h: 0.4, hw: 9, f: 1.3 }, { dx: 6, h: 0.46, hw: 8, f: 3.9 },
  ] },
];
const N_BRASAS = 12;
/**
 * Labaredas soltas: gotinhas de fogo que se desprendem da ponta das línguas e
 * sobem encolhendo. É o detalhe que separa fogo de "desenho de fogo" — sem
 * elas, a chama é um recorte que balança.
 */
const N_LABAREDAS = 5;
const gota = (x: number, y: number, r: number) =>
  `M${x} ${y - r * 2.2} C${x + r * 0.9} ${y - r * 0.9} ${x + r} ${y + r * 0.6} ${x} ${y + r} ` +
  `C${x - r} ${y + r * 0.6} ${x - r * 0.9} ${y - r * 0.9} ${x} ${y - r * 2.2} Z`;

/**
 * Uma língua de fogo: gota que sobe e CURVA a ponta para o lado em que está
 * balançando (`curva`). Ponta reta e simétrica é espinho; fogo enrola.
 */
function lingua(cx: number, by: number, hw: number, tx: number, ty: number, curva: number): string {
  const h = by - ty;
  return `M${cx - hw} ${by} ` +
    `C${cx - hw * 1.08} ${by - h * 0.5} ${tx - hw * 0.62 + curva} ${ty + h * 0.46} ${tx} ${ty} ` +
    `C${tx + hw * 0.3 + curva * 0.4} ${ty + h * 0.32} ${cx + hw * 1.06} ${by - h * 0.52} ${cx + hw} ${by} ` +
    `Q${cx} ${by + hw * 0.55} ${cx - hw} ${by} Z`;
}

// ─── bocas ──────────────────────────────────────────────────────────────────
type Boca = { d: string; cheia: boolean; lingua?: boolean };
const BOCAS: Record<Expressao | "falaAberta" | "falaMeia", Boca> = {
  neutro: { d: "M104 113Q112 119.5 120 113", cheia: false },
  feliz: { d: "M103 111.5Q112 125 121 111.5Q112 115.5 103 111.5Z", cheia: true, lingua: true },
  radiante: { d: "M100.5 110Q112 130 123.5 110Q112 114.5 100.5 110Z", cheia: true, lingua: true },
  surpreso: { d: "M112 111C116.5 111 117 122 112 122C107 122 107.5 111 112 111Z", cheia: true },
  pensativo: { d: "M106 116.5Q111.5 114.5 118 117", cheia: false },
  triste: { d: "M104.5 119Q112 112 119.5 119", cheia: false },
  orgulhoso: { d: "M104 114.5Q113.5 119 121 111", cheia: false },
  dormindo: { d: "M108.5 115.5Q112 118.5 115.5 115.5", cheia: false },
  falaAberta: { d: "M105 112Q112 124 119 112Q112 114.5 105 112Z", cheia: true, lingua: true },
  falaMeia: { d: "M106 113Q112 118.5 118 113Q112 114.5 106 113Z", cheia: true },
};

// sobrancelhas: deslocamento vertical e inclinação (graus) por expressão
const SOBRANCELHA: Record<Expressao, { e: [number, number]; d: [number, number] }> = {
  neutro: { e: [0, 0], d: [0, 0] },
  feliz: { e: [-2, -4], d: [-2, 4] },
  radiante: { e: [-3.5, -6], d: [-3.5, 6] },
  surpreso: { e: [-5.5, -2], d: [-5.5, 2] },
  pensativo: { e: [-3.5, -10], d: [1, 6] },
  triste: { e: [-1, 14], d: [-1, -14] },
  orgulhoso: { e: [-1, -8], d: [-3, 8] },
  dormindo: { e: [2, 4], d: [2, -4] },
};

// ─── braços: ângulo alvo (graus) e comprimento ──────────────────────────────
/** ângulo que aponta o eixo do braço (local +y) na direção (dx, dy) */
const apontarPara = (dx: number, dy: number) => (Math.atan2(-dx, dy) * 180) / Math.PI;
const BRACO_REPOUSO = 25;
/** do ombro ao centro da mão: o retângulo nasce 6 acima e termina num meio-círculo de 10,5 */
const ALCANCE_MAO = 6 + 10.5;

function alvoBracos(g: Gesto, t: number): { e: number; d: number; le: number; ld: number } {
  switch (g) {
    case "acenar":
      return { e: 16, d: -150 + Math.sin(t * 9) * 24, le: BRACO_REPOUSO, ld: 32 };
    case "comemorar":
      return { e: 152 + Math.sin(t * 7) * 8, d: -152 - Math.sin(t * 7) * 8, le: 32, ld: 32 };
    case "pensar":
      return { e: 18, d: apontarPara(110 - OMBRO_D.x, 112 - OMBRO_D.y), le: BRACO_REPOUSO, ld: 38 };
    case "apontar":
      return { e: 18, d: -58 + Math.sin(t * 3) * 3, le: BRACO_REPOUSO, ld: 34 };
    case "tampar":
      return {
        e: apontarPara(OLHO_E.x - OMBRO_E.x, OLHO_E.y - OMBRO_E.y),
        d: apontarPara(OLHO_D.x - OMBRO_D.x, OLHO_D.y - OMBRO_D.y),
        // o braço começa 6 acima do ombro e a mão é a ponta arredondada (raio
        // 10,5): para a MÃO cair sobre o olho, o braço passa do olho nisso
        le: Math.hypot(OLHO_E.x - OMBRO_E.x, OLHO_E.y - OMBRO_E.y) + ALCANCE_MAO,
        ld: Math.hypot(OLHO_D.x - OMBRO_D.x, OLHO_D.y - OMBRO_D.y) + ALCANCE_MAO,
      };
    case "espiar":
      // a mão direita desce um pouco — um olho aparece
      return {
        e: apontarPara(OLHO_E.x - OMBRO_E.x, OLHO_E.y - OMBRO_E.y),
        d: apontarPara(OLHO_D.x - OMBRO_D.x, OLHO_D.y + 16 - OMBRO_D.y),
        le: Math.hypot(OLHO_E.x - OMBRO_E.x, OLHO_E.y - OMBRO_E.y) + ALCANCE_MAO,
        ld: Math.hypot(OLHO_D.x - OMBRO_D.x, OLHO_D.y + 16 - OMBRO_D.y) + ALCANCE_MAO - 4,
      };
    case "espreguicar":
      // braços lá no alto, bem esticados, balançando devagar
      return { e: 168 + Math.sin(t * 2) * 6, d: -168 - Math.sin(t * 2) * 6, le: 36, ld: 36 };
    case "cocar":
      // a mão direita coça o lado da cabeça, rapidinho
      return { e: 16, d: -150 + Math.sin(t * 22) * 7, le: BRACO_REPOUSO, ld: 34 };
    case "andar":
      return { e: 16 + Math.sin(t * 8) * 14, d: -16 + Math.sin(t * 8) * 14, le: BRACO_REPOUSO, ld: BRACO_REPOUSO };
    default:
      return { e: 16 + Math.sin(t * 1.3) * 2, d: -16 - Math.sin(t * 1.3 + 1) * 2, le: BRACO_REPOUSO, ld: BRACO_REPOUSO };
  }
}

export function Devocionalzeiro({
  expressao = "neutro", gesto = "parado", chama = 0.3, falando = false, olhar = null,
  pulso = 0, toque = 0, tamanho = 180, className,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const ids = {
    corpo: `c-${uid}`, lado: `l-${uid}`, iris: `i-${uid}`, fogoExt: `fe-${uid}`, fogoMed: `fm-${uid}`,
    fogoNuc: `fn-${uid}`, brilho: `b-${uid}`, brilhoForte: `bf-${uid}`, recorte: `r-${uid}`, neon: `n-${uid}`,
  };

  // alvos lidos pelo laço (props → ref, sem reiniciar o laço)
  const alvo = useRef({ expressao, gesto, chama, falando, olhar, pulso, toque });
  alvo.current = { expressao, gesto, chama, falando, olhar, pulso, toque };

  const r = {
    raiz: useRef<SVGGElement>(null), corpo: useRef<SVGGElement>(null), rosto: useRef<SVGGElement>(null),
    olhoE: useRef<SVGGElement>(null), olhoD: useRef<SVGGElement>(null),
    irisE: useRef<SVGGElement>(null), irisD: useRef<SVGGElement>(null),
    felizE: useRef<SVGPathElement>(null), felizD: useRef<SVGPathElement>(null),
    fechadoE: useRef<SVGPathElement>(null), fechadoD: useRef<SVGPathElement>(null),
    sobE: useRef<SVGPathElement>(null), sobD: useRef<SVGPathElement>(null),
    boca: useRef<SVGPathElement>(null), lingua: useRef<SVGEllipseElement>(null),
    bochE: useRef<SVGEllipseElement>(null), bochD: useRef<SVGEllipseElement>(null),
    bracoE: useRef<SVGGElement>(null), bracoD: useRef<SVGGElement>(null),
    bracoEForma: useRef<SVGRectElement>(null), bracoDForma: useRef<SVGRectElement>(null),
    peE: useRef<SVGEllipseElement>(null), peD: useRef<SVGEllipseElement>(null),
    sombra: useRef<SVGEllipseElement>(null), chama: useRef<SVGGElement>(null),
    emblema: useRef<SVGPathElement>(null), estrelas: useRef<SVGGElement>(null),
  };
  const linguas = useRef<SVGPathElement[][]>([[], [], []]);
  const linguasBrilho = useRef<SVGPathElement[]>([]);
  const brasas = useRef<SVGCircleElement[]>([]);
  const labaredas = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const reduzir = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t0 = performance.now();

    // estado das molas
    const s = {
      bracoE: 16, bracoD: -16, lenE: BRACO_REPOUSO, lenD: BRACO_REPOUSO,
      gazeX: 0, gazeY: 0, chama: alvo.current.chama,
      pulsoVisto: alvo.current.pulso, pulsoEm: -10,
      toqueVisto: alvo.current.toque, toqueEm: -10,
      proximaPiscada: 1.2 + Math.random() * 2, piscandoEm: -10, piscadaDupla: false,
      vagarX: 0, vagarY: 0, proximoVagar: 2,
      alturaAnt: 0, inclinacao: 0,
      bocaAtual: "", sobAtual: "", expAtual: "" as string,
      brasas: Array.from({ length: N_BRASAS }, () => ({ x: 0, y: 0, vx: 0, vy: 0, vida: 0, dur: 1 })),
      labaredas: Array.from({ length: N_LABAREDAS }, () => ({ x: 0, y: 0, vx: 0, vy: 0, vida: 0, dur: 1, r: 2 })),
      pontas: [] as { x: number; y: number }[],
    };
    const mola = (atual: number, alvoV: number, k: number, dt: number) => atual + (alvoV - atual) * (1 - Math.exp(-k * dt));
    let ultimo = t0;

    const quadro = (agora: number) => {
      const t = (agora - t0) / 1000;
      const dt = Math.min(0.05, (agora - ultimo) / 1000);
      ultimo = agora;
      const a = alvo.current;

      // ── pulo (reação) ────────────────────────────────────────────────────
      if (a.pulso !== s.pulsoVisto) { s.pulsoVisto = a.pulso; s.pulsoEm = t; }
      let altura = 0, sx = 1, sy = 1;
      const pulando = (tt: number, alturaMax: number) => {
        if (tt < 0.09) { const u = tt / 0.09; sy = 1 - 0.13 * u; sx = 1 + 0.09 * u; }            // antecipação
        else if (tt < 0.49) { const u = (tt - 0.09) / 0.4; altura = alturaMax * 4 * u * (1 - u); // voo
          sy = 1 + 0.11 * (1 - u); sx = 1 - 0.07 * (1 - u); }
        else if (tt < 0.64) { const u = (tt - 0.49) / 0.15; const k = Math.sin(Math.PI * u);     // pouso
          sy = 1 - 0.14 * k; sx = 1 + 0.1 * k; }
      };
      if (!reduzir) {
        if (a.gesto === "comemorar") pulando((t % 1.05), 22);
        else if (t - s.pulsoEm < 0.64) pulando(t - s.pulsoEm, 18);
      }
      // andar: quique curto, alternando os pés
      let peEy = 0, peDy = 0, peEx = 0, peDx = 0;
      if (a.gesto === "andar" && !reduzir) {
        const f = t * 9;
        altura += Math.abs(Math.sin(f)) * 3.2;
        peEy = -Math.max(0, Math.sin(f)) * 5; peDy = -Math.max(0, -Math.sin(f)) * 5;
        peEx = Math.sin(f) * 3; peDx = -Math.sin(f) * 3;
      }
      // aceno curto: amassa e volta, em 0,22 s
      if (a.toque !== s.toqueVisto) { s.toqueVisto = a.toque; s.toqueEm = t; }
      const tq = t - s.toqueEm;
      let aceno = 0;
      if (!reduzir && tq < 0.22) { const k = Math.sin((Math.PI * tq) / 0.22); sy *= 1 - 0.05 * k; sx *= 1 + 0.03 * k; aceno = 4 * k; }
      // respiração: dormindo é mais funda e mais lenta
      const dorme = a.expressao === "dormindo";
      const resp = reduzir ? 0 : dorme ? Math.sin(t * 1.25) * 0.028 : Math.sin(t * 2.1) * 0.012;
      sy *= 1 + resp; sx *= 1 - resp * 0.5;
      // espreguiçar estica o corpo inteiro
      if (a.gesto === "espreguicar" && !reduzir) { const k = 0.5 + 0.5 * Math.sin(t * 2); sy *= 1 + 0.06 * k; sx *= 1 - 0.035 * k; }
      // inclinação da chama contra o movimento (ação secundária)
      const velY = (altura - s.alturaAnt) / Math.max(dt, 0.001);
      s.alturaAnt = altura;
      s.inclinacao = mola(s.inclinacao, Math.max(-1, Math.min(1, velY / 120)), 10, dt);

      // cabeça inclinada ao pensar
      // (dormindo, a cabeça pende devagar; andando, ele se inclina para a frente)
      const tilt = (a.gesto === "pensar" ? -6
        : dorme ? 5 + Math.sin(t * 0.6) * (reduzir ? 0 : 2.5)
        : a.gesto === "andar" ? 4
        : a.expressao === "surpreso" ? 0 : Math.sin(t * 0.9) * (reduzir ? 0 : 1.2)) + aceno;
      r.corpo.current?.setAttribute(
        "transform",
        `translate(102 188) translate(0 ${-altura}) rotate(${tilt}) scale(${sx} ${sy}) translate(-102 -188)`,
      );
      const hs = Math.max(0.55, 1 - altura / 55);
      r.sombra.current?.setAttribute("transform", `translate(106 196) scale(${hs} 1) translate(-106 -196)`);
      r.sombra.current?.setAttribute("opacity", String(0.28 * hs));
      r.peE.current?.setAttribute("transform", `translate(${peEx} ${peEy - altura * 0.85})`);
      r.peD.current?.setAttribute("transform", `translate(${peDx} ${peDy - altura * 0.85})`);

      // ── olhar ───────────────────────────────────────────────────────────
      if (!a.olhar && t > s.proximoVagar) {
        const olharPraGente = Math.random() < 0.45;
        s.vagarX = olharPraGente ? 0 : (Math.random() - 0.5) * 1.6;
        s.vagarY = olharPraGente ? 0 : (Math.random() - 0.5) * 0.9;
        s.proximoVagar = t + 1.6 + Math.random() * 3.4;
      }
      const gx = a.olhar ? a.olhar.x : s.vagarX;
      const gy = a.olhar ? a.olhar.y : s.vagarY;
      s.gazeX = mola(s.gazeX, Math.max(-1, Math.min(1, gx)), a.olhar ? 14 : 7, dt);
      s.gazeY = mola(s.gazeY, Math.max(-1, Math.min(1, gy)), a.olhar ? 14 : 7, dt);
      const irisT = `translate(${s.gazeX * 3.3} ${s.gazeY * 2.8})`;
      r.irisE.current?.setAttribute("transform", irisT);
      r.irisD.current?.setAttribute("transform", irisT);
      // o rosto inteiro acompanha um pouco o olhar (parallax de cabeça)
      r.rosto.current?.setAttribute("transform", `translate(${s.gazeX * 1.6} ${s.gazeY * 1.1})`);

      // ── piscar: intervalo irregular, às vezes duplo ─────────────────────
      if (!reduzir && t > s.proximaPiscada) {
        s.piscandoEm = t;
        s.piscadaDupla = Math.random() < 0.18;
        s.proximaPiscada = t + 2.2 + Math.random() * 3.8;
      }
      let fechar = 0;
      const tp = t - s.piscandoEm;
      if (tp < 0.15) fechar = Math.sin((Math.PI * tp) / 0.15);
      else if (s.piscadaDupla && tp > 0.22 && tp < 0.37) fechar = Math.sin((Math.PI * (tp - 0.22)) / 0.15);
      const exp = a.expressao;
      const bocejo = a.gesto === "espreguicar";
      const olhosFechados = dorme || bocejo;
      const olhosFelizes = !olhosFechados && (exp === "radiante" || a.gesto === "comemorar");
      const surpreso = exp === "surpreso";
      const escalaOlho = surpreso ? 1.12 : exp === "triste" ? 0.92 : 1;
      const abertura = Math.max(0.06, 1 - fechar) * escalaOlho;
      for (const [el, c] of [[r.olhoE.current, OLHO_E], [r.olhoD.current, OLHO_D]] as const) {
        el?.setAttribute("transform", `translate(${c.x} ${c.y}) scale(${escalaOlho} ${abertura}) translate(${-c.x} ${-c.y})`);
        el?.setAttribute("opacity", olhosFelizes || olhosFechados ? "0" : "1");
      }
      r.fechadoE.current?.setAttribute("opacity", olhosFechados ? "1" : "0");
      r.fechadoD.current?.setAttribute("opacity", olhosFechados ? "1" : "0");
      r.felizE.current?.setAttribute("opacity", olhosFelizes ? "1" : "0");
      r.felizD.current?.setAttribute("opacity", olhosFelizes ? "1" : "0");

      // ── sobrancelhas ────────────────────────────────────────────────────
      if (s.sobAtual !== exp) {
        s.sobAtual = exp;
        const b = SOBRANCELHA[exp];
        r.sobE.current?.setAttribute("transform", `translate(0 ${b.e[0]}) rotate(${b.e[1]} 94 79)`);
        r.sobD.current?.setAttribute("transform", `translate(0 ${b.d[0]}) rotate(${b.d[1]} 129 79)`);
      }

      // ── boca: expressão, ou fala ────────────────────────────────────────
      let boca: Boca = bocejo ? BOCAS.surpreso : BOCAS[exp];
      if (a.falando && !reduzir) {
        const f = Math.sin(t * 17) + Math.sin(t * 11.3) * 0.6;
        boca = f > 0.55 ? BOCAS.falaAberta : f > -0.2 ? BOCAS.falaMeia : BOCAS[exp === "triste" ? "triste" : "neutro"];
      }
      if (s.bocaAtual !== boca.d) {
        s.bocaAtual = boca.d;
        const el = r.boca.current;
        el?.setAttribute("d", boca.d);
        el?.setAttribute("fill", boca.cheia ? "#1B0B1E" : "none");
        el?.setAttribute("stroke", boca.cheia ? "none" : "#0A0F24");
        r.lingua.current?.setAttribute("opacity", boca.lingua ? "1" : "0");
      }
      const blush = exp === "radiante" || exp === "feliz" ? 0.55 : exp === "orgulhoso" ? 0.4 : 0.22;
      r.bochE.current?.setAttribute("opacity", String(blush));
      r.bochD.current?.setAttribute("opacity", String(blush));

      // ── braços (mola) ───────────────────────────────────────────────────
      const ab = alvoBracos(reduzir && a.gesto !== "tampar" && a.gesto !== "espiar" ? "parado" : a.gesto, t);
      const kb = a.gesto === "acenar" || a.gesto === "comemorar" || a.gesto === "andar" ? 18 : 11;
      s.bracoE = mola(s.bracoE, ab.e, kb, dt); s.bracoD = mola(s.bracoD, ab.d, kb, dt);
      s.lenE = mola(s.lenE, ab.le, 12, dt); s.lenD = mola(s.lenD, ab.ld, 12, dt);
      r.bracoE.current?.setAttribute("transform", `translate(${OMBRO_E.x} ${OMBRO_E.y}) rotate(${s.bracoE})`);
      r.bracoD.current?.setAttribute("transform", `translate(${OMBRO_D.x} ${OMBRO_D.y}) rotate(${s.bracoD})`);
      r.bracoEForma.current?.setAttribute("height", String(s.lenE));
      r.bracoDForma.current?.setAttribute("height", String(s.lenD));

      // ── chama ───────────────────────────────────────────────────────────
      const excit = a.gesto === "comemorar" ? 0.18 : t - s.pulsoEm < 0.9 ? 0.12 : 0;
      s.chama = mola(s.chama, Math.max(0, Math.min(1, a.chama)) + excit, 2.6, dt);
      const H = 17 + 58 * s.chama;
      const tremor = reduzir ? 0.25 : 1;
      const lean = -s.inclinacao * 9;
      CAMADAS.forEach((cam, ci) => {
        cam.linguas.forEach((l, li) => {
          const el = linguas.current[ci][li];
          if (!el) return;
          // As línguas grandes lambem devagar e largo; as pequenas tremem
          // rápido e curto. Tudo na mesma frequência parece um mola, não fogo.
          const lento = 1 - l.h * 0.55;
          const fl = 1 + tremor * (0.12 * Math.sin(t * (4.2 + lento * 5) + l.f) + 0.07 * Math.sin(t * (12.7 + ci * 1.3) + l.f * 2.1));
          const sway = tremor * ((2.2 + l.h * 4.2) * Math.sin(t * (1.9 + lento * 3.2) + l.f) + 1.3 * Math.sin(t * (8.9 + li) + l.f))
            + lean * (0.6 + l.h * 0.6);
          const cx = BASE_CHAMA.x + l.dx * (0.7 + s.chama * 0.4);
          const hw = l.hw * (0.62 + s.chama * 0.46);
          const ty = BASE_CHAMA.y - H * l.h * fl;
          // as pontas se abrem para fora e a chama toda tomba um pouco para a direita, como na arte
          const abre = l.dx * 0.35 * (0.5 + s.chama);
          const tx = cx + sway + abre + 2.5 * l.h;
          const d = lingua(cx, BASE_CHAMA.y, hw, tx, ty, sway * 1.6);
          el.setAttribute("d", d);
          if (ci === 0) s.pontas[li] = { x: tx, y: ty };
          if (ci === 0) linguasBrilho.current[li]?.setAttribute("d", d);
        });
      });
      // brasas: nascem na chama, sobem, somem
      const taxa = reduzir ? 0 : 0.6 + s.chama * 2.2 + (a.gesto === "comemorar" ? 3 : 0);
      s.brasas.forEach((b, i) => {
        const el = brasas.current[i];
        if (!el) return;
        b.vida -= dt;
        if (b.vida <= 0) {
          if (Math.random() < taxa * dt * 2) {
            b.x = BASE_CHAMA.x + (Math.random() - 0.5) * (16 + s.chama * 22);
            b.y = BASE_CHAMA.y - H * (0.3 + Math.random() * 0.5);
            b.vx = (Math.random() - 0.5) * 14 + lean * 1.4;
            b.vy = -(18 + Math.random() * 24) * (0.7 + s.chama * 0.5);
            b.dur = b.vida = 0.7 + Math.random() * 0.9;
          } else { el.setAttribute("opacity", "0"); return; }
        }
        b.x += b.vx * dt + Math.sin(t * 7 + i) * 0.25;
        b.y += b.vy * dt;
        const k = b.vida / b.dur;
        el.setAttribute("cx", b.x.toFixed(2));
        el.setAttribute("cy", b.y.toFixed(2));
        el.setAttribute("r", (0.6 + 1.3 * k).toFixed(2));
        el.setAttribute("opacity", (k * 0.95).toFixed(2));
      });
      // labaredas: nascem numa ponta da camada externa e sobem encolhendo
      const taxaLab = reduzir ? 0 : 1.4 + s.chama * 3.2 + (a.gesto === "comemorar" ? 4 : 0);
      s.labaredas.forEach((b, i) => {
        const el = labaredas.current[i];
        if (!el) return;
        b.vida -= dt;
        if (b.vida <= 0) {
          const p = s.pontas[(Math.random() * s.pontas.length) | 0];
          if (p && Math.random() < taxaLab * dt) {
            b.x = p.x; b.y = p.y + 2;
            b.vx = (Math.random() - 0.5) * 10 + lean;
            b.vy = -(26 + Math.random() * 22) * (0.6 + s.chama * 0.5);
            b.r = 1.6 + Math.random() * 1.6 + s.chama * 1.2;
            b.dur = b.vida = 0.28 + Math.random() * 0.3;
          } else { el.setAttribute("opacity", "0"); return; }
        }
        b.x += b.vx * dt; b.y += b.vy * dt;
        const k = Math.max(0, b.vida / b.dur);
        el.setAttribute("d", gota(b.x, b.y, b.r * (0.35 + 0.65 * k)));
        el.setAttribute("opacity", (0.95 * k).toFixed(2));
      });

      // o emblema da barriga pulsa junto
      r.emblema.current?.setAttribute(
        "transform",
        `translate(112 149) scale(${1 + (reduzir ? 0 : Math.sin(t * 5.3) * 0.05)} ${1 + (reduzir ? 0 : Math.sin(t * 6.1) * 0.08)}) translate(-112 -149)`,
      );
      // algumas estrelas do corpo cintilam
      const est = r.estrelas.current?.children;
      if (est && !reduzir) for (let i = 0; i < est.length; i += 3) {
        (est[i] as SVGElement).setAttribute("opacity", (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * (1.7 + i * 0.13) + i))).toFixed(2));
      }

      raf = requestAnimationFrame(quadro);
    };
    raf = requestAnimationFrame(quadro);
    return () => cancelAnimationFrame(raf);
    // Um laço só, a vida inteira do boneco: ele lê as props por `alvo` e os
    // elementos por refs (estáveis) — reiniciar a cada prop zeraria as molas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // estrelas do corpo: posições estáveis (semente fixa), dentro do D
  const estrelas = ESTRELAS;

  return (
    <svg
      viewBox="0 -24 205 229"
      width={tamanho}
      height={(tamanho * 229) / 205}
      className={className}
      role="img"
      aria-label="Devocionalzeiro"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id={ids.corpo} cx="62%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#23376F" />
          <stop offset="55%" stopColor="#152452" />
          <stop offset="100%" stopColor="#0A1231" />
        </radialGradient>
        <linearGradient id={ids.lado} x1="0" x2="1">
          <stop offset="0%" stopColor="#060B1F" />
          <stop offset="100%" stopColor="#0E1838" />
        </linearGradient>
        <radialGradient id={ids.iris} cx="45%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#8FD8FF" />
          <stop offset="45%" stopColor="#2F8BFF" />
          <stop offset="100%" stopColor="#0E3FB3" />
        </radialGradient>
        <linearGradient id={ids.fogoExt} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1740D8" />
          <stop offset="45%" stopColor="#2F7BFF" />
          <stop offset="100%" stopColor="#7FD2FF" />
        </linearGradient>
        <linearGradient id={ids.fogoMed} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#3AA2FF" />
          <stop offset="100%" stopColor="#A6E8FF" />
        </linearGradient>
        <linearGradient id={ids.fogoNuc} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#F2FDFF" />
          <stop offset="100%" stopColor="#C4F1FF" />
        </linearGradient>
        <filter id={ids.brilho} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5.5" />
        </filter>
        <filter id={ids.neon} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id={ids.recorte}><path d={CORPO_FRENTE} /></clipPath>
      </defs>

      {/* sombra no chão */}
      <ellipse ref={r.sombra} cx="106" cy="196" rx="44" ry="6" fill="#1A1440" opacity="0.28" />

      {/* pés (fora do corpo: ficam no chão quando ele pula menos que o corpo) */}
      <ellipse ref={r.peE} cx="88" cy="187" rx="15" ry="9.5" fill="#0D1636" />
      <ellipse ref={r.peD} cx="127" cy="187" rx="15" ry="9.5" fill="#0D1636" />

      <g ref={r.corpo}>
        {/* chama ATRÁS do corpo: a base some dentro da cabeça */}
        <g ref={r.chama}>
          <g filter={`url(#${ids.brilho})`} opacity="0.75">
            {CAMADAS[0].linguas.map((_, i) => (
              <path key={i} ref={(el) => { if (el) linguasBrilho.current[i] = el; }} fill="#3E8BFF" />
            ))}
          </g>
          {CAMADAS.map((cam, ci) => (
            <g key={cam.cor} opacity={ci === 0 ? 0.96 : 1}>
              {cam.linguas.map((_, li) => (
                <path
                  key={li}
                  ref={(el) => { if (el) linguas.current[ci][li] = el; }}
                  fill={`url(#${ci === 0 ? ids.fogoExt : ci === 1 ? ids.fogoMed : ids.fogoNuc})`}
                />
              ))}
            </g>
          ))}
          <g>
            {Array.from({ length: N_LABAREDAS }, (_, i) => (
              <path key={i} ref={(el) => { if (el) labaredas.current[i] = el; }} fill={`url(#${ids.fogoMed})`} opacity="0" />
            ))}
          </g>
          <g>
            {Array.from({ length: N_BRASAS }, (_, i) => (
              <circle key={i} ref={(el) => { if (el) brasas.current[i] = el; }} r="1" fill="#A8EAFF" opacity="0" />
            ))}
          </g>
        </g>

        {/* corpo em D, com espessura à esquerda */}
        <path d={CORPO_LADO} fill={`url(#${ids.lado})`} />
        <path d={CORPO_FRENTE} fill={`url(#${ids.corpo})`} />
        <g clipPath={`url(#${ids.recorte})`}>
          {/* borda de luz da chama sobre o topo da cabeça */}
          <ellipse cx="104" cy="62" rx="42" ry="11" fill="#3E8BFF" opacity="0.22" filter={`url(#${ids.brilho})`} />
          <g ref={r.estrelas}>
            {estrelas.map((e, i) => <circle key={i} cx={e.x} cy={e.y} r={e.r} fill={e.c} opacity={e.o} />)}
          </g>
        </g>

        {/* faixa neon e emblema de chama na barriga */}
        <path d={BOLSO} fill="#2A66FF" opacity="0.16" />
        <path d={FAIXA_NEON} fill="none" stroke="#39B8FF" strokeWidth="2.3" strokeLinecap="round" filter={`url(#${ids.neon})`} opacity="0.95" />
        <path
          ref={r.emblema}
          d="M112 139 C117.5 144.5 118.5 151 114.8 155.3 C113.2 157 110.8 157 109.2 155.3 C105.5 151.5 107.8 145.5 110 143.3 C110.5 145.5 111.6 146.6 112.7 146.6 C112.1 144 111.6 141.3 112 139 Z"
          fill="#4FC3FF"
          filter={`url(#${ids.neon})`}
        />

        {/* rosto: acompanha o olhar */}
        <g ref={r.rosto}>
          <ellipse ref={r.bochE} cx="85" cy="113" rx="6.5" ry="3.6" fill="#5CB6FF" opacity="0.22" />
          <ellipse ref={r.bochD} cx="139" cy="113" rx="6.5" ry="3.6" fill="#5CB6FF" opacity="0.22" />

          {[{ c: OLHO_E, olho: r.olhoE, iris: r.irisE }, { c: OLHO_D, olho: r.olhoD, iris: r.irisD }].map(({ c, olho, iris }, i) => (
            <g key={i} ref={olho}>
              <ellipse cx={c.x} cy={c.y} rx="12.4" ry="13.4" fill="#F4F8FF" />
              <g ref={iris}>
                <circle cx={c.x + 0.5} cy={c.y + 1.2} r="10.4" fill={`url(#${ids.iris})`} />
                <circle cx={c.x + 0.5} cy={c.y + 1.4} r="5" fill="#06112E" />
                <circle cx={c.x - 3.2} cy={c.y - 3.4} r="3.5" fill="#FFFFFF" />
                <circle cx={c.x + 3.4} cy={c.y + 4} r="1.4" fill="#FFFFFF" opacity="0.9" />
              </g>
              {/* contorno fino do olho */}
              <ellipse cx={c.x} cy={c.y} rx="12.4" ry="13.4" fill="none" stroke="#050A1E" strokeWidth="1.2" opacity="0.6" />
            </g>
          ))}
          {/* olhos de alegria (^ ^) */}
          <path ref={r.felizE} d="M83 101 Q94 88 105 101" fill="none" stroke="#EAF3FF" strokeWidth="3" strokeLinecap="round" opacity="0" />
          <path ref={r.felizD} d="M118 101 Q129 88 140 101" fill="none" stroke="#EAF3FF" strokeWidth="3" strokeLinecap="round" opacity="0" />
          {/* olhos fechados (dormindo, bocejando): a curva para baixo, com cílios */}
          <path ref={r.fechadoE} d="M84 97 Q94 105 104 97 M87 101 L85 104 M94 103 L94 106.5 M101 101 L103 104" fill="none" stroke="#EAF3FF" strokeWidth="2.6" strokeLinecap="round" opacity="0" />
          <path ref={r.fechadoD} d="M119 97 Q129 105 139 97 M122 101 L120 104 M129 103 L129 106.5 M136 101 L138 104" fill="none" stroke="#EAF3FF" strokeWidth="2.6" strokeLinecap="round" opacity="0" />

          <path ref={r.sobE} d="M86.5 80 Q94 76.5 101.5 79.5" fill="none" stroke="#050A1E" strokeWidth="2.2" strokeLinecap="round" />
          <path ref={r.sobD} d="M121.5 79.5 Q129 76.5 136.5 80" fill="none" stroke="#050A1E" strokeWidth="2.2" strokeLinecap="round" />

          <path ref={r.boca} d={BOCAS.neutro.d} fill="none" stroke="#0A0F24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse ref={r.lingua} cx="112" cy="119" rx="4.2" ry="2.5" fill="#FF7A9C" opacity="0" />
        </g>

        {/* braços: na frente do corpo — é o que deixa ele tapar os olhos */}
        <g ref={r.bracoE} transform={`translate(${OMBRO_E.x} ${OMBRO_E.y}) rotate(16)`}>
          <rect ref={r.bracoEForma} x="-10.5" y="-6" width="21" height={BRACO_REPOUSO} rx="10.5" fill="#111D42" />
        </g>
        <g ref={r.bracoD} transform={`translate(${OMBRO_D.x} ${OMBRO_D.y}) rotate(-16)`}>
          <rect ref={r.bracoDForma} x="-10.5" y="-6" width="21" height={BRACO_REPOUSO} rx="10.5" fill="#111D42" />
        </g>
      </g>
    </svg>
  );
}

/** estrelas do corpo — semente fixa, para não mudarem a cada montagem */
const ESTRELAS = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const lista: { x: number; y: number; r: number; c: string; o: number }[] = [];
  for (let i = 0; i < 34; i++) {
    const x = 70 + rnd() * 84, y = 66 + rnd() * 108;
    // dentro do D (o recorte cuida da borda; aqui só evita a região dos olhos)
    if (Math.hypot(x - 111, y - 99) < 30) continue;
    lista.push({ x, y, r: 0.35 + rnd() * 0.9, c: rnd() > 0.7 ? "#8FD3FF" : "#E8F2FF", o: 0.35 + rnd() * 0.6 });
  }
  return lista;
})();
