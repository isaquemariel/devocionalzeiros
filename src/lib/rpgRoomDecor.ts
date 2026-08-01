// ============================================================================
// CENOGRAFIA DAS SALAS — objetos bíblicos que DEFINEM cada livro, com
// profundidade real: os props entram no MESMO z-sort dos jogadores (a pessoa
// anda na frente E atrás dos objetos). Cada livro tem uma ASSINATURA própria
// (o barco de Jonas, o vaso do oleiro de Jeremias, as 12 pedras de Josué…)
// sobre uma base regional com variação semeada — nenhuma sala fica igual.
// ============================================================================

import type { RPGRegion } from "@/lib/rpgBibleData";
import { drawPropHD } from "@/lib/rpgStageHD";

export interface RoomProp {
  kind: string;
  fx: number;      // fração da largura (0..1)
  d: number;       // profundidade no chão: 0 = fundo, 1 = frente (jogadores andam em 0.08..0.88); >1 = primeiro plano
  scale?: number;
  fire?: number;
}

type ScenicRegion = RPGRegion | "heaven";

const P = (kind: string, fx: number, d: number, scale = 1, fire?: number): RoomProp =>
  ({ kind, fx, d, scale, ...(fire != null ? { fire } : {}) });

// ---------------------------------------------------------------------------
// BASE por região: laterais e fundo mobiliados, centro livre para o convívio,
// e 1–2 itens de PRIMEIRO PLANO (d > 1) nos cantos — profundidade de verdade.
// ---------------------------------------------------------------------------
const REGION_BASE: Record<ScenicRegion, RoomProp[]> = {
  creation: [
    P("tree", 0.09, 0.05, 1), P("bush", 0.2, 0.3, 0.9), P("rock", 0.88, 0.22, 0.9),
    P("grass", 0.3, 0.5, 1), P("grass", 0.72, 0.35, 1), P("grass", 0.14, 0.75, 1.1),
    P("campfire", 0.82, 0.55, 0.9), P("bush", 0.05, 1.06, 1.5), P("grass", 0.95, 1.04, 1.6),
  ],
  desert: [
    P("tent", 0.1, 0.08, 0.95), P("palm", 0.92, 0.06, 0.65), P("rock", 0.78, 0.3, 0.9),
    P("amphora", 0.22, 0.42, 0.9), P("campfire", 0.85, 0.6, 0.9), P("grass", 0.35, 0.7, 0.9),
    P("rock", 0.06, 1.07, 1.5), P("grass", 0.94, 1.05, 1.4),
  ],
  conquest: [
    P("tent", 0.9, 0.07, 0.9), P("altar", 0.12, 0.1, 0.85), P("rock", 0.3, 0.32, 0.8),
    P("grass", 0.68, 0.45, 1), P("crate", 0.82, 0.4, 0.9), P("grass", 0.2, 0.65, 1),
    P("bush", 0.05, 1.06, 1.4), P("rock", 0.95, 1.05, 1.4),
  ],
  kingdom: [
    P("well", 0.1, 0.1, 0.9), P("stall", 0.9, 0.08, 0.85), P("lampstand", 0.24, 0.28, 0.7, 1),
    P("amphora", 0.8, 0.4, 0.9), P("crate", 0.86, 0.5, 0.85), P("grass", 0.32, 0.6, 0.9),
    P("crate", 0.05, 1.06, 1.4), P("amphora", 0.95, 1.04, 1.3),
  ],
  exile: [
    P("tower", 0.08, 0.04, 0.55), P("crate", 0.86, 0.28, 0.9), P("crate", 0.9, 0.42, 0.8),
    P("amphora", 0.18, 0.36, 0.9), P("rock", 0.7, 0.55, 0.8), P("grass", 0.28, 0.7, 0.8),
    P("rock", 0.05, 1.06, 1.4), P("crate", 0.95, 1.05, 1.3),
  ],
  wisdom: [
    P("tree", 0.9, 0.05, 0.95), P("scroll", 0.12, 0.14, 1), P("well", 0.8, 0.32, 0.85),
    P("grass", 0.25, 0.45, 1), P("bush", 0.16, 0.62, 0.9), P("grass", 0.68, 0.68, 1),
    P("bush", 0.05, 1.06, 1.5), P("grass", 0.95, 1.04, 1.5),
  ],
  prophets: [
    P("altar", 0.88, 0.08, 0.95), P("rock", 0.14, 0.25, 0.9), P("campfire", 0.2, 0.55, 0.9),
    P("tree", 0.06, 0.04, 0.75), P("grass", 0.7, 0.5, 0.9), P("amphora", 0.78, 0.35, 0.85),
    P("rock", 0.05, 1.07, 1.5), P("bush", 0.95, 1.05, 1.3),
  ],
  minor_prophets: [
    P("boat", 0.88, 0.1, 0.95), P("well", 0.1, 0.12, 0.85), P("rock", 0.24, 0.4, 0.85),
    P("grass", 0.7, 0.55, 0.9), P("amphora", 0.16, 0.62, 0.85), P("crate", 0.8, 0.42, 0.8),
    P("rock", 0.05, 1.06, 1.5), P("grass", 0.95, 1.04, 1.5),
  ],
  gospels: [
    P("boat", 0.1, 0.08, 0.95), P("tree", 0.92, 0.04, 0.85), P("well", 0.84, 0.3, 0.85),
    P("amphora", 0.2, 0.4, 0.9), P("grass", 0.32, 0.62, 1), P("grass", 0.7, 0.5, 1),
    P("bush", 0.05, 1.06, 1.5), P("amphora", 0.95, 1.05, 1.3),
  ],
  acts: [
    P("church", 0.09, 0.03, 0.55), P("lampstand", 0.86, 0.18, 0.7, 1), P("stall", 0.92, 0.06, 0.8),
    P("crate", 0.2, 0.4, 0.9), P("amphora", 0.26, 0.55, 0.9), P("grass", 0.7, 0.6, 0.9),
    P("crate", 0.05, 1.06, 1.4), P("amphora", 0.95, 1.04, 1.3),
  ],
  epistles: [
    P("scroll", 0.1, 0.12, 1), P("lampstand", 0.88, 0.1, 0.75, 1), P("amphora", 0.2, 0.38, 0.9),
    P("crate", 0.82, 0.35, 0.85), P("crate", 0.86, 0.5, 0.75), P("grass", 0.3, 0.65, 0.9),
    P("crate", 0.05, 1.06, 1.4), P("bush", 0.95, 1.05, 1.3),
  ],
  revelation: [
    P("lampstand", 0.08, 0.08, 0.85, 1), P("lampstand", 0.92, 0.08, 0.85, 1),
    P("star", 0.5, 0.02, 0.55), P("rock", 0.2, 0.4, 0.85), P("grass", 0.75, 0.55, 0.9),
    P("rock", 0.05, 1.07, 1.4), P("grass", 0.95, 1.05, 1.5),
  ],
  heaven: [
    P("tree", 0.5, 0.02, 1.05), P("lampstand", 0.1, 0.1, 0.8, 1), P("lampstand", 0.9, 0.1, 0.8, 1),
    P("star", 0.22, 0.03, 0.5), P("star", 0.8, 0.04, 0.45),
    P("grass", 0.3, 0.5, 1.1), P("grass", 0.68, 0.6, 1.1), P("bush", 0.16, 0.68, 1),
    P("bush", 0.05, 1.06, 1.5), P("grass", 0.95, 1.04, 1.6),
  ],
};

// ---------------------------------------------------------------------------
// ASSINATURA por LIVRO — o objeto que conta a história daquele livro.
// (posições pensadas para completar a base sem tampar o centro)
// ---------------------------------------------------------------------------
const BOOK_SIG: Record<string, RoomProp[]> = {
  genesis: [P("tree", 0.5, 0.03, 1.15), P("star", 0.68, 0.02, 0.5)],           // Éden + "olha para as estrelas"
  exodus: [P("altar", 0.5, 0.05, 0.9), P("tent", 0.78, 0.16, 0.75)],           // Sinai: altar + acampamento
  leviticus: [P("altar", 0.5, 0.04, 1.2)],                                     // as ofertas
  numbers: [P("tent", 0.36, 0.05, 0.7), P("tent", 0.62, 0.06, 0.8)],           // arraial por tribos
  deuteronomy: [P("scroll", 0.5, 0.08, 1.1)],                                  // "estas palavras…"
  joshua: [P("rock", 0.44, 0.07, 0.7), P("rock", 0.5, 0.05, 0.8), P("rock", 0.56, 0.08, 0.65)], // 12 pedras do Jordão
  judges: [P("campfire", 0.5, 0.06, 1.1), P("tent", 0.3, 0.1, 0.7)],
  ruth: [P("grass", 0.44, 0.1, 1.4), P("grass", 0.52, 0.06, 1.3), P("grass", 0.6, 0.12, 1.4)],  // campo de cevada
  "1samuel": [P("tent", 0.5, 0.05, 0.9), P("altar", 0.7, 0.14, 0.7)],
  "2samuel": [P("tower", 0.5, 0.02, 0.55)],                                    // cidade de Davi
  "1kings": [P("church", 0.5, 0.02, 0.6)],                                     // o Templo
  "2kings": [P("tower", 0.5, 0.03, 0.55), P("campfire", 0.68, 0.14, 0.8)],     // carros de fogo
  "1chronicles": [P("scroll", 0.5, 0.07, 1.05)],
  "2chronicles": [P("church", 0.5, 0.02, 0.6)],
  ezra: [P("church", 0.5, 0.02, 0.5), P("crate", 0.64, 0.12, 0.9)],            // reconstrução
  nehemiah: [P("tower", 0.36, 0.03, 0.45), P("tower", 0.64, 0.03, 0.45)],      // os muros
  esther: [P("stall", 0.5, 0.05, 0.9), P("amphora", 0.64, 0.14, 1)],           // o banquete
  job: [P("campfire", 0.5, 0.08, 0.9, 0.25), P("rock", 0.6, 0.14, 0.9)],       // cinzas
  psalms: [P("campfire", 0.5, 0.07, 1), P("star", 0.34, 0.02, 0.5)],           // louvor sob as estrelas
  proverbs: [P("scroll", 0.5, 0.08, 1.1), P("lampstand", 0.62, 0.14, 0.6, 1)],
  ecclesiastes: [P("scroll", 0.5, 0.08, 1), P("amphora", 0.62, 0.15, 0.9)],
  songofsolomon: [P("bush", 0.44, 0.08, 1.1), P("bush", 0.56, 0.06, 1), P("tree", 0.68, 0.03, 0.8)], // o jardim
  isaiah: [P("altar", 0.5, 0.05, 1)],                                          // a brasa do altar
  jeremiah: [P("amphora", 0.5, 0.08, 1.35)],                                   // a casa do oleiro
  lamentations: [P("rock", 0.46, 0.08, 1), P("rock", 0.56, 0.1, 0.8), P("campfire", 0.66, 0.14, 0.7, 0.2)],
  ezekiel: [P("star", 0.5, 0.02, 0.6), P("scroll", 0.62, 0.12, 0.9)],          // visões + o rolo comido
  daniel: [P("lampstand", 0.5, 0.06, 0.8, 1), P("star", 0.64, 0.02, 0.5)],
  hosea: [P("grass", 0.46, 0.1, 1.3), P("amphora", 0.58, 0.1, 0.85)],
  joel: [P("grass", 0.46, 0.08, 1.2), P("grass", 0.56, 0.11, 1.2)],
  amos: [P("tree", 0.5, 0.03, 0.9), P("grass", 0.62, 0.12, 1.1)],              // o pastor de Tecoa
  obadiah: [P("rock", 0.5, 0.06, 1.1)],                                        // as rochas de Edom
  jonah: [P("boat", 0.5, 0.05, 1.15)],                                         // o barco para Társis
  micah: [P("tower", 0.5, 0.03, 0.5)],
  nahum: [P("rock", 0.48, 0.07, 0.95), P("rock", 0.58, 0.1, 0.75)],
  habakkuk: [P("tower", 0.5, 0.03, 0.45)],                                     // a torre de vigia
  zephaniah: [P("campfire", 0.5, 0.07, 0.9)],
  haggai: [P("church", 0.5, 0.02, 0.5), P("crate", 0.62, 0.12, 0.85)],         // "edificai a casa"
  zechariah: [P("lampstand", 0.5, 0.05, 0.95, 1)],                             // a visão do castiçal
  malachi: [P("altar", 0.5, 0.05, 0.95)],
  matthew: [P("scroll", 0.5, 0.08, 1.05), P("star", 0.62, 0.02, 0.5)],         // a estrela do oriente
  mark: [P("boat", 0.5, 0.05, 1.05)],
  luke: [P("well", 0.5, 0.07, 1), P("amphora", 0.62, 0.13, 0.95)],
  john: [P("boat", 0.5, 0.05, 1), P("campfire", 0.66, 0.14, 0.85)],            // as brasas de Jo 21
  acts: [P("lampstand", 0.5, 0.06, 0.8, 1), P("campfire", 0.34, 0.1, 0.8)],    // línguas de fogo
  romans: [P("scroll", 0.5, 0.08, 1.1)],
  "1corinthians": [P("stall", 0.5, 0.05, 0.85)],                               // a ágora de Corinto
  "2corinthians": [P("amphora", 0.5, 0.09, 1.1)],                              // tesouro em vasos de barro
  galatians: [P("scroll", 0.5, 0.08, 1)],
  ephesians: [P("lampstand", 0.5, 0.06, 0.85, 1)],
  philippians: [P("campfire", 0.5, 0.08, 0.85)],                               // alegria na prisão
  colossians: [P("scroll", 0.5, 0.08, 1)],
  "1thessalonians": [P("star", 0.5, 0.02, 0.55)],                              // a esperança da volta
  "2thessalonians": [P("star", 0.5, 0.02, 0.5)],
  "1timothy": [P("scroll", 0.5, 0.08, 1)],
  "2timothy": [P("scroll", 0.5, 0.08, 1), P("lampstand", 0.62, 0.13, 0.6, 1)],
  titus: [P("scroll", 0.5, 0.08, 0.95)],
  philemon: [P("scroll", 0.5, 0.08, 0.95)],
  hebrews: [P("altar", 0.5, 0.05, 1.05)],                                      // o sumo sacerdote
  james: [P("well", 0.5, 0.07, 0.95), P("grass", 0.62, 0.13, 1.1)],
  "1peter": [P("boat", 0.5, 0.05, 1)],
  "2peter": [P("boat", 0.5, 0.05, 0.9), P("scroll", 0.66, 0.13, 0.85)],
  "1john": [P("lampstand", 0.5, 0.06, 0.85, 1)],                               // Deus é luz
  "2john": [P("scroll", 0.5, 0.08, 0.9)],
  "3john": [P("scroll", 0.5, 0.08, 0.9)],
  jude: [P("star", 0.5, 0.02, 0.5)],
  revelation: [P("lampstand", 0.4, 0.05, 0.8, 1), P("lampstand", 0.6, 0.05, 0.8, 1), P("door", 0.5, 0.01, 0.55)], // castiçais + a porta aberta
};

const hashStr = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};

/** Decoração completa da sala: base regional (com variação semeada pelo id
 *  do livro: espelhamento + jitter) + assinatura do livro. Ordenada por
 *  profundidade para entrar no z-sort junto com os jogadores. */
export function getRoomDecor(bookId: string, region: ScenicRegion): RoomProp[] {
  const base = REGION_BASE[region] ?? REGION_BASE.creation;
  const sig = BOOK_SIG[bookId] ?? [];
  let seed = (hashStr(bookId) % 100000) + 7;
  const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  const mirror = hashStr(bookId) % 2 === 1;
  const jittered = base.map((p) => {
    const fx0 = mirror ? 1 - p.fx : p.fx;
    return {
      ...p,
      fx: Math.min(0.97, Math.max(0.03, fx0 + (rnd() - 0.5) * 0.05)),
      d: Math.max(0.01, p.d + (rnd() - 0.5) * 0.06),
      scale: (p.scale ?? 1) * (0.92 + rnd() * 0.16),
    };
  });
  return [...jittered, ...sig].sort((a, b) => a.d - b.d);
}

/** Desenha um prop da sala com escala por profundidade (mesma lógica dos
 *  jogadores: fundo menor, frente maior). */
export function drawRoomProp(
  g: CanvasRenderingContext2D,
  p: RoomProp,
  dims: { W: number; H: number; GROUND: number },
  t: number,
  reduce: boolean,
): void {
  const { W, H, GROUND } = dims;
  const fy = GROUND + Math.min(1.12, p.d) * (H - GROUND);
  const depth = 0.55 + Math.min(1.12, Math.max(0, p.d)) * 0.55;
  const s = depth * (p.scale ?? 1);
  drawPropHD(g, p.kind, p.fx * W, fy, { scale: s, t, reduce, fire: p.fire });
}

/** fy de um prop (para o z-sort com os jogadores). */
export function roomPropFy(p: RoomProp, dims: { H: number; GROUND: number }): number {
  return dims.GROUND + Math.min(1.12, p.d) * (dims.H - dims.GROUND);
}
