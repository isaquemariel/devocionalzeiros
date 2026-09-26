import type { Expressao, Gesto } from "@/lib/jornada/tipos";

/**
 * A GEOMETRIA DO DEVOCIONALZEIRO — a fonte ÚNICA do desenho dele.
 *
 * O app já teve cinco Devocionalzeiros diferentes: um SVG com óculos dourados
 * e chama laranja (o `Mascot3D`), PNGs, o herói "HD" do RPG, um boneco em
 * pixel art e o rig da jornada. Cada tela mostrava um personagem. Agora há um
 * só, e ele mora aqui: as medidas, os contornos (em sintaxe de path SVG, que o
 * canvas também lê por `Path2D`), as cores, as bocas, as sobrancelhas e os
 * braços. Quem desenha — o rig em SVG (`components/devocionalzeiro`) e o
 * desenho em canvas do RPG (`lib/devocionalzeiro/canvas`) — lê daqui, e por
 * isso os dois saem idênticos.
 *
 * Unidades: as do viewBox `0 -24 205 229` (a arte oficial de 1024 px, a 1:5).
 * Os pés tocam o chão em y ≈ 196; o centro do corpo fica em x ≈ 106.
 */

export type { Expressao, Gesto };

export const VIEWBOX = { x: 0, y: -24, w: 205, h: 229 } as const;
/** onde ficam o chão e o meio dele, para quem posiciona pelos pés */
export const CHAO = { x: 106, y: 196 } as const;

// ─── geometria (viewBox 0 -24 205 229) ──────────────────────────────────────
// Medidas tiradas da arte oficial (1024 px) na escala de 1:5.
export const OLHO_E = { x: 94, y: 97 };
export const OLHO_D = { x: 129, y: 97 };
export const OMBRO_E = { x: 71, y: 134 };
export const OMBRO_D = { x: 153, y: 138 };
export const BASE_CHAMA = { x: 104, y: 72 };

// Cantos macios à esquerda (a arte não tem quina viva) e o bojo do D inteiro.
export const CORPO_FRENTE = "M74 63 L100 63 A57 57 0 0 1 100 177 L74 177 Q67 177 67 170 L67 70 Q67 63 74 63 Z";
export const CORPO_LADO = "M58 69 Q58 66 62 65 L68 63.5 L68 176.5 L62 175 Q58 174 58 171 Z";
// Na barriga, SÓ a chama. Havia uma faixa neon em D em volta dela (um D
// menor dentro do D), que se lia como um círculo, uma moldura de botão.

/** línguas de fogo: deslocamento x, altura relativa, meia-largura, fase */
export type Lingua = { dx: number; h: number; hw: number; f: number };
// As bases ficam JUNTAS e as pontas se espalham: é isso que faz uma gota de
// fogo. Com as bases espalhadas numa linha, a primeira versão parecia uma
// coroa de espinhos.
export const CAMADAS: { cor: string; linguas: Lingua[] }[] = [
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
export const N_BRASAS = 12;
/**
 * Labaredas soltas: gotinhas de fogo que se desprendem da ponta das línguas e
 * sobem encolhendo. É o detalhe que separa fogo de "desenho de fogo" — sem
 * elas, a chama é um recorte que balança.
 */
export const N_LABAREDAS = 5;
export const gota = (x: number, y: number, r: number) =>
  `M${x} ${y - r * 2.2} C${x + r * 0.9} ${y - r * 0.9} ${x + r} ${y + r * 0.6} ${x} ${y + r} ` +
  `C${x - r} ${y + r * 0.6} ${x - r * 0.9} ${y - r * 0.9} ${x} ${y - r * 2.2} Z`;

/**
 * Uma língua de fogo: gota que sobe e CURVA a ponta para o lado em que está
 * balançando (`curva`). Ponta reta e simétrica é espinho; fogo enrola.
 */
export function lingua(cx: number, by: number, hw: number, tx: number, ty: number, curva: number): string {
  const h = by - ty;
  return `M${cx - hw} ${by} ` +
    `C${cx - hw * 1.08} ${by - h * 0.5} ${tx - hw * 0.62 + curva} ${ty + h * 0.46} ${tx} ${ty} ` +
    `C${tx + hw * 0.3 + curva * 0.4} ${ty + h * 0.32} ${cx + hw * 1.06} ${by - h * 0.52} ${cx + hw} ${by} ` +
    `Q${cx} ${by + hw * 0.55} ${cx - hw} ${by} Z`;
}

// ─── bocas ──────────────────────────────────────────────────────────────────
export type Boca = { d: string; cheia: boolean; lingua?: boolean };
export const BOCAS: Record<Expressao | "falaAberta" | "falaMeia", Boca> = {
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
export const SOBRANCELHA: Record<Expressao, { e: [number, number]; d: [number, number] }> = {
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
export const apontarPara = (dx: number, dy: number) => (Math.atan2(-dx, dy) * 180) / Math.PI;
export const BRACO_REPOUSO = 25;
/**
 * Ângulo de repouso de cada braço. O esquerdo nasce junto da lateral escura
 * do livro: a 16° a mão ficava por cima do próprio corpo, da mesma cor, e o
 * braço só aparecia quando subia para tapar os olhos. Aberto a 44°, a mão
 * sai para fora da silhueta, como a direita.
 */
export const REPOUSO_E = 44;
export const REPOUSO_D = -30;
/** do ombro ao centro da mão: o retângulo nasce 6 acima e termina num meio-círculo de 10,5 */
export const ALCANCE_MAO = 6 + 10.5;

export function alvoBracos(g: Gesto, t: number): { e: number; d: number; le: number; ld: number } {
  switch (g) {
    case "acenar":
      return { e: REPOUSO_E, d: -150 + Math.sin(t * 9) * 24, le: BRACO_REPOUSO, ld: 32 };
    case "comemorar":
      return { e: 152 + Math.sin(t * 7) * 8, d: -152 - Math.sin(t * 7) * 8, le: 32, ld: 32 };
    case "pensar":
      return { e: REPOUSO_E, d: apontarPara(110 - OMBRO_D.x, 112 - OMBRO_D.y), le: BRACO_REPOUSO, ld: 38 };
    case "apontar":
      return { e: REPOUSO_E, d: -58 + Math.sin(t * 3) * 3, le: BRACO_REPOUSO, ld: 34 };
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
      return { e: REPOUSO_E, d: -150 + Math.sin(t * 22) * 7, le: BRACO_REPOUSO, ld: 34 };
    case "pirueta":
      // braços abertos para o alto, como quem gira de alegria
      return { e: 128 + Math.sin(t * 9) * 10, d: -128 - Math.sin(t * 9) * 10, le: 30, ld: 30 };
    case "vitoria":
      // o punho direito sobe e desce; o esquerdo, na cintura
      return { e: 14, d: -160 + Math.sin(t * 6) * 16, le: 22, ld: 34 };
    case "andar":
      return { e: REPOUSO_E + Math.sin(t * 8) * 14, d: REPOUSO_D + Math.sin(t * 8) * 14, le: BRACO_REPOUSO, ld: BRACO_REPOUSO };
    default:
      return { e: REPOUSO_E + Math.sin(t * 1.3) * 2, d: REPOUSO_D - Math.sin(t * 1.3 + 1) * 2, le: BRACO_REPOUSO, ld: BRACO_REPOUSO };
  }
}

// ─── cores ──────────────────────────────────────────────────────────────────
export const CORES = {
  corpo: ["#23376F", "#152452", "#0A1231"] as const, // radial: luz, meio, borda
  lado: ["#060B1F", "#0E1838"] as const,
  iris: ["#8FD8FF", "#2F8BFF", "#0E3FB3"] as const,
  fogoExt: ["#1740D8", "#2F7BFF", "#7FD2FF"] as const, // de baixo para cima
  fogoMed: ["#3AA2FF", "#A6E8FF"] as const,
  fogoNuc: ["#F2FDFF", "#C4F1FF"] as const,
  brasa: "#A8EAFF",
  pe: "#0D1636",
  sombra: "#1A1440",
  braco: "#15224C",
  bracoContorno: "#2F4589",
  esclera: "#F4F8FF",
  pupila: "#06112E",
  contornoOlho: "#050A1E",
  sobrancelha: "#050A1E",
  traco: "#0A0F24",
  bocaCheia: "#1B0B1E",
  lingua: "#FF7A9C",
  bochecha: "#5CB6FF",
  olhoFechado: "#EAF3FF",
} as const;

// ─── partes fixas ───────────────────────────────────────────────────────────
/** a chama da barriga (desenhada com scale 1,55 em torno de 112,148) */
export const EMBLEMA =
  "M112 139 C117.5 144.5 118.5 151 114.8 155.3 C113.2 157 110.8 157 109.2 155.3 C105.5 151.5 107.8 145.5 110 143.3 C110.5 145.5 111.6 146.6 112.7 146.6 C112.1 144 111.6 141.3 112 139 Z";
export const EMBLEMA_CENTRO = { x: 112, y: 148, escala: 1.55 } as const;
export const PE_E = { cx: 88, cy: 187, rx: 15, ry: 9.5 } as const;
export const PE_D = { cx: 127, cy: 187, rx: 15, ry: 9.5 } as const;
export const SOMBRA = { cx: 106, cy: 196, rx: 44, ry: 6 } as const;
export const OLHO_RAIO = { rx: 12.4, ry: 13.4 } as const;
/** olhos de alegria (^ ^) e fechados */
export const OLHO_FELIZ_E = "M83 101 Q94 88 105 101";
export const OLHO_FELIZ_D = "M118 101 Q129 88 140 101";
export const OLHO_FECHADO_E = "M85 98 Q94 104 103 98";
export const OLHO_FECHADO_D = "M120 98 Q129 104 138 98";
export const SOBRANCELHA_E = "M86.5 80 Q94 76.5 101.5 79.5";
export const SOBRANCELHA_D = "M121.5 79.5 Q129 76.5 136.5 80";
export const BOCHECHA_E = { cx: 85, cy: 113, rx: 6.5, ry: 3.6 } as const;
export const BOCHECHA_D = { cx: 139, cy: 113, rx: 6.5, ry: 3.6 } as const;
export const LINGUA = { cx: 112, cy: 119, rx: 4.2, ry: 2.5 } as const;
/** a cabeça: o bojo do D é um arco de raio 57 com centro em (100, 120) */
export const ARCO = { cx: 100, cy: 120, r: 57 } as const;
/** a borda direita do corpo numa altura y (para roupa e acessórios assentarem) */
export function bordaDireita(y: number): number {
  const d = y - ARCO.cy;
  return Math.abs(d) >= ARCO.r ? ARCO.cx : ARCO.cx + Math.sqrt(ARCO.r * ARCO.r - d * d);
}
/** a borda esquerda (a lombada, com a espessura do livro) */
export const BORDA_ESQUERDA = 58;
export const TOPO = 63;
export const BASE = 177;
