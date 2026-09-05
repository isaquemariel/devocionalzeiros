// ============================================================================
// RPG Boss — o desafio final de CADA livro (pixel art procedural)
// ----------------------------------------------------------------------------
// O "chefe" é enfrentado ao ler o último capítulo do livro. Cada livro tem o
// seu, coerente com o conteúdo: a Serpente no Éden (Gênesis), o Gigante Golias
// (1 Samuel), o Grande Peixe (Jonas), o Dragão (Apocalipse)... Aqui ficam os
// dados (nome, emoji, cor, provocação e a silhueta a desenhar) e o desenho
// pixel do monstro por arquétipo. Puramente visual.
// ============================================================================

// Arquétipos de silhueta — dão variedade visual sem 66 sprites únicos.
export type BossShape =
  | "serpent"   // serpente ergida
  | "giant"     // humanoide colossal com clava
  | "beast"     // fera quadrúpede (leão/lobo)
  | "leviathan" // criatura do mar / grande peixe
  | "storm"     // nuvem de tempestade com raios
  | "dragon"    // dragão alado com chifres
  | "wall"      // muralha/fortaleza com portão
  | "shadow"    // vulto encapuzado com olhos brilhantes
  | "swarm"     // enxame (gafanhotos/pragas)
  | "flame"     // pilar de fogo
  | "horseman"  // cavaleiro / exército
  | "idol"      // ídolo/estátua
  | "tempter"   // o tentador: vulto chifrudo com serpente
  | "death"     // a morte: caveira com foice e manto
  | "chains"    // cárcere: massa acorrentada / grilhões
  | "legion"    // legião: massa com muitos olhos
  | "crown"     // rei soberbo: figura com coroa e cetro
  | "accuser"   // o adversário da corte celestial: asas escuras, dedo apontado
  | "chariot"   // carro de guerra atrelado (o exército do Faraó)
  | "siege"     // torre de assalto e aríete (o cerco)
  | "decree";   // o edito que manda cessar a obra (uma carta como inimigo)

export interface BossInfo {
  name: string;
  emoji: string;
  color: string; // cor de destaque (olhos/aura)
  taunt: string; // fala de abertura
  shape: BossShape;
}

// Um chefe por livro (chave = id do livro em rpgBibleData).
export const BOSS_BY_BOOK: Record<string, BossInfo> = {
  // — Antigo Testamento —
  genesis:      { name: "A Antiga Serpente", emoji: "🐍", color: "#63b84a", shape: "serpent",  taunt: "Será que Deus disse mesmo...?" },
  exodus:       { name: "O Exército do Faraó", emoji: "🛞", color: "#c23a3a", shape: "chariot", taunt: "Ninguém escapa do meu Egito!" },
  leviticus:    { name: "O Fogo do Altar", emoji: "🔥", color: "#ff8a3a", shape: "flame",    taunt: "Quem se aproximará do Santo?" },
  numbers:      { name: "As Serpentes Ardentes", emoji: "🐍", color: "#d1503a", shape: "serpent", taunt: "O deserto será o seu túmulo." },
  deuteronomy:  { name: "Os Gigantes de Anaque", emoji: "🗿", color: "#b98a4a", shape: "giant", taunt: "Quem enfrenta os filhos de Anaque?" },
  joshua:       { name: "Os Muros de Jericó", emoji: "🏰", color: "#c58a4a", shape: "wall",   taunt: "Nenhum exército passará por aqui!" },
  judges:       { name: "As Nações Opressoras", emoji: "⚔️", color: "#a05030", shape: "horseman", taunt: "Israel se curvará outra vez." },
  ruth:         { name: "A Sombra da Perda", emoji: "🥀", color: "#7a8bb0", shape: "shadow",  taunt: "Não te resta ninguém, Noemi." },
  "1samuel":    { name: "O Gigante Golias", emoji: "🗡️", color: "#e0c24a", shape: "giant",   taunt: "Envia-me um homem, para lutarmos!" },
  "2samuel":    { name: "A Revolta de Absalão", emoji: "👑", color: "#b04a6a", shape: "crown",  taunt: "O trono de teu pai será meu!" },
  "1kings":     { name: "Os Profetas de Baal", emoji: "🗿", color: "#c08a3a", shape: "idol",   taunt: "Onde está o teu Deus, Elias?" },
  "2kings":     { name: "O Cerco da Assíria", emoji: "🏯", color: "#8a5a3a", shape: "siege",   taunt: "Nenhum deus livrou sua cidade de mim." },
  "1chronicles":{ name: "As Guerras do Reino", emoji: "⚔️", color: "#c0955a", shape: "horseman", taunt: "O trono se ergue sobre sangue." },
  "2chronicles":{ name: "O Fogo da Babilônia", emoji: "🔥", color: "#e0542a", shape: "flame",  taunt: "Sua cidade santa arderá." },
  ezra:         { name: "Os Adversários da Obra", emoji: "📜", color: "#d0a04a", shape: "decree", taunt: "Este templo jamais se levantará." },
  nehemiah:     { name: "A Zombaria de Sambalate", emoji: "🧱", color: "#8a9a6a", shape: "wall", taunt: "Uma raposa derruba esse muro!" },
  esther:       { name: "Hamã, o Perseguidor", emoji: "👑", color: "#b04a8a", shape: "crown", taunt: "Nenhum judeu restará no império." },
  job:          { name: "O Acusador", emoji: "👁️", color: "#8a6ac0", shape: "accuser", taunt: "Tira a mão sobre tudo o que ele tem!" },
  psalms:       { name: "O Vale da Sombra", emoji: "🌑", color: "#6a7ab0", shape: "shadow", taunt: "Nenhuma canção te salva no vale." },
  proverbs:     { name: "A Voz da Insensatez", emoji: "🍷", color: "#b06ab0", shape: "tempter", taunt: "As águas roubadas são doces." },
  ecclesiastes: { name: "A Vaidade", emoji: "🌪️", color: "#8a8a9a", shape: "storm", taunt: "Tudo é correr atrás do vento." },
  songofsolomon:{ name: "As Raposas da Vinha", emoji: "🦊", color: "#c07a4a", shape: "beast", taunt: "Estragaremos a vinha florida." },
  isaiah:       { name: "O Rei da Babilônia", emoji: "👑", color: "#c0a04a", shape: "crown", taunt: "Subirei acima das mais altas nuvens." },
  jeremiah:     { name: "O Leão do Norte", emoji: "🦁", color: "#d0a03a", shape: "beast", taunt: "Subiu o leão da sua ramada." },
  lamentations: { name: "A Ruína de Sião", emoji: "🔥", color: "#c04a3a", shape: "flame", taunt: "Como jaz solitária a cidade!" },
  ezekiel:      { name: "Gogue, de Magogue", emoji: "⚔️", color: "#6a8a9a", shape: "horseman", taunt: "Subirei como tempestade sobre a terra." },
  daniel:       { name: "A Cova dos Leões", emoji: "🦁", color: "#e0a24a", shape: "beast", taunt: "Ninguém sai daqui com vida." },
  // — Profetas Menores —
  hosea:        { name: "A Infidelidade", emoji: "🗿", color: "#b06a8a", shape: "idol", taunt: "Israel esqueceu o seu Criador." },
  joel:         { name: "O Enxame de Gafanhotos", emoji: "🦗", color: "#9aae3a", shape: "swarm", taunt: "Devoraremos tudo o que restou." },
  amos:         { name: "O Rugido do Juízo", emoji: "🦁", color: "#d0902a", shape: "beast", taunt: "O leão rugiu; quem não temerá?" },
  obadiah:      { name: "O Orgulho de Edom", emoji: "🦅", color: "#a07a5a", shape: "beast", taunt: "Quem me derrubará das alturas?" },
  jonah:        { name: "O Grande Peixe", emoji: "🐋", color: "#4a9ae0", shape: "leviathan", taunt: "As profundezas te engolirão." },
  micah:        { name: "O Invasor Assírio", emoji: "⚔️", color: "#7a6a5a", shape: "horseman", taunt: "Pisaremos os seus palácios." },
  nahum:        { name: "O Covil de Nínive", emoji: "🦁", color: "#c04a3a", shape: "beast", taunt: "Ninguém assusta os leões de Nínive." },
  habakkuk:     { name: "Os Caldeus Violentos", emoji: "🏹", color: "#8a7a9a", shape: "horseman", taunt: "Nossa lei sai de nós mesmos." },
  zephaniah:    { name: "O Dia da Ira", emoji: "⚡", color: "#d0803a", shape: "storm", taunt: "Consumirei tudo sobre a terra." },
  haggai:       { name: "A Casa em Ruínas", emoji: "🏚️", color: "#8a8a6a", shape: "wall", taunt: "Não é tempo de edificar." },
  zechariah:    { name: "O Adversário", emoji: "😈", color: "#7aa08a", shape: "tempter", taunt: "Estas vestes estão imundas." },
  malachi:      { name: "O Fogo Refinador", emoji: "🔥", color: "#ff9a3a", shape: "flame", taunt: "Quem suportará o dia da minha vinda?" },
  // — Novo Testamento —
  matthew:      { name: "O Tentador no Deserto", emoji: "😈", color: "#9a5aa0", shape: "tempter", taunt: "Tudo isto te darei, se te prostrares." },
  mark:         { name: "A Legião", emoji: "👹", color: "#6a6a8a", shape: "legion", taunt: "Somos muitos!" },
  luke:         { name: "A Grande Tempestade", emoji: "⛈️", color: "#5a90c0", shape: "storm", taunt: "As ondas cobrirão o barco!" },
  john:         { name: "A Sombra da Morte", emoji: "💀", color: "#5a6a8a", shape: "death", taunt: "Já são quatro dias no túmulo." },
  acts:         { name: "As Correntes da Prisão", emoji: "⛓️", color: "#c0803a", shape: "chains", taunt: "Nenhuma palavra sairá desta cela." },
  romans:       { name: "O Poder do Pecado", emoji: "🐍", color: "#8a5aa0", shape: "serpent", taunt: "Ninguém é justo, nem um sequer." },
  "1corinthians":{ name: "O Aguilhão da Morte", emoji: "💀", color: "#6a7a8a", shape: "death", taunt: "Onde está, ó morte, a tua vitória?" },
  "2corinthians":{ name: "O Espinho na Carne", emoji: "🌵", color: "#7a8a6a", shape: "shadow", taunt: "Este espinho jamais te deixará." },
  galatians:    { name: "O Jugo da Lei", emoji: "⛓️", color: "#9a7a4a", shape: "chains", taunt: "Volte para debaixo do jugo." },
  ephesians:    { name: "As Hostes das Trevas", emoji: "👹", color: "#5a5a8a", shape: "legion", taunt: "Tua luta não é contra carne e sangue." },
  philippians:  { name: "As Cadeias de Roma", emoji: "⛓️", color: "#7a8aa0", shape: "chains", taunt: "A prisão calará o teu louvor." },
  colossians:   { name: "As Filosofias Vãs", emoji: "📜", color: "#7a6a9a", shape: "shadow", taunt: "Enredarei tua mente em vãs sutilezas." },
  "1thessalonians":{ name: "O Ladrão da Noite", emoji: "🌙", color: "#4a5a7a", shape: "shadow", taunt: "Virei quando menos esperas." },
  "2thessalonians":{ name: "O Homem da Iniquidade", emoji: "😈", color: "#8a3a4a", shape: "tempter", taunt: "Sentarei no templo como deus." },
  "1timothy":   { name: "O Amor ao Dinheiro", emoji: "💰", color: "#e0c24a", shape: "idol", taunt: "Por mim muitos se desviaram da fé." },
  "2timothy":   { name: "A Boca do Leão", emoji: "🦁", color: "#d0902a", shape: "beast", taunt: "Ninguém escapa da boca do leão." },
  titus:        { name: "Os Falsos Mestres", emoji: "🎭", color: "#8a7a5a", shape: "shadow", taunt: "Enganaremos casas inteiras." },
  philemon:     { name: "A Dívida do Passado", emoji: "⛓️", color: "#9a8a7a", shape: "chains", taunt: "Ele te deve; jamais será livre." },
  hebrews:      { name: "O Peso que Assedia", emoji: "🏋️", color: "#8a6a5a", shape: "shadow", taunt: "Você não terminará a corrida." },
  james:        { name: "O Fogo da Língua", emoji: "🔥", color: "#ff7a3a", shape: "flame", taunt: "Uma faísca incendeia toda a floresta." },
  "1peter":     { name: "O Leão que Ruge", emoji: "🦁", color: "#d08a2a", shape: "beast", taunt: "Ando buscando a quem devorar." },
  "2peter":     { name: "Os Escarnecedores", emoji: "🎭", color: "#7a7a6a", shape: "shadow", taunt: "Onde está a promessa da sua vinda?" },
  "1john":      { name: "O Espírito do Anticristo", emoji: "😈", color: "#8a4a6a", shape: "tempter", taunt: "Nego o Pai e o Filho." },
  "2john":      { name: "O Enganador", emoji: "🎭", color: "#8a5a6a", shape: "shadow", taunt: "Muitos enganadores saíram pelo mundo." },
  "3john":      { name: "Diótrefes, o Soberbo", emoji: "👑", color: "#9a6a5a", shape: "crown", taunt: "Ninguém terá lugar senão eu." },
  jude:         { name: "Os Intrusos Ímpios", emoji: "👹", color: "#6a5a7a", shape: "legion", taunt: "Infiltramo-nos entre vós." },
  revelation:   { name: "O Dragão", emoji: "🐉", color: "#ff4a6a", shape: "dragon", taunt: "Farei guerra contra os santos!" },
};

const FALLBACK: BossInfo = { name: "O Guardião", emoji: "⚔️", color: "#c0552f", shape: "shadow", taunt: "Você não passará." };

export function getBoss(bookId: string): BossInfo {
  return BOSS_BY_BOOK[bookId] ?? FALLBACK;
}

// ============================================================================
// Desenho
// ============================================================================

type G = CanvasRenderingContext2D;
type Rect = (x: number, y: number, w: number, h: number, c: string) => void;

const OUT = "#08060a";
const BODY = "#241826";
const BODY_L = "#3a2a3e";
const GOLD = "#e0b24a";
const GOLD_H = "#ffd889";
const BONE = "#d8d2c2";
const BONE_D = "#a8a090";
const IRON = "#6a6e78";
const IRON_L = "#9aa0aa";

const mkRect = (g: G): Rect => (x, y, w, h, c) => {
  g.fillStyle = c;
  g.fillRect(Math.round(x), Math.round(y), Math.max(1, Math.round(w)), Math.max(1, Math.round(h)));
};

// blob vertical (contorno + corpo) centrado em (cx,cy), meia-largura HW / meia-altura HH
function blob(R: Rect, cx: number, cy: number, HW: number, HH: number, body = BODY) {
  const wAt = (ry: number) => Math.round(Math.pow(Math.max(0, 1 - Math.pow(Math.abs(ry) / HH, 2.2)), 1 / 2.2) * HW);
  for (let ry = -HH; ry <= HH; ry++) { const w = wAt(ry); if (w > 0) R(cx - w - 1, cy + ry, w * 2 + 3, 1, OUT); }
  for (let ry = -HH + 1; ry <= HH - 1; ry++) { const w = wAt(ry); if (w > 0) R(cx - w, cy + ry, w * 2 + 1, 1, body); }
}

// blob horizontal — meia-largura HW / meia-altura HH
function hblob(R: Rect, cx: number, cy: number, HW: number, HH: number, body = BODY) {
  const hAt = (rx: number) => Math.round(Math.pow(Math.max(0, 1 - Math.pow(Math.abs(rx) / HW, 2.2)), 1 / 2.2) * HH);
  for (let rx = -HW; rx <= HW; rx++) { const h = hAt(rx); if (h > 0) R(cx + rx, cy - h - 1, 1, h * 2 + 3, OUT); }
  for (let rx = -HW + 1; rx <= HW - 1; rx++) { const h = hAt(rx); if (h > 0) R(cx + rx, cy - h, 1, h * 2 + 1, body); }
}

// olhos brilhantes (piscam de vez em quando)
function eyes(R: Rect, cx: number, cy: number, spread: number, color: string, t: number, reduce: boolean) {
  const blink = !reduce && Math.floor(t / 90) % 22 === 0;
  if (blink) { R(cx - spread, cy, 3, 1, OUT); R(cx + spread - 2, cy, 3, 1, OUT); return; }
  for (const sx of [-spread, spread - 3]) { R(cx + sx, cy, 3, 2, color); R(cx + sx + 1, cy, 1, 1, "#fff"); }
}

// ---- silhuetas por arquétipo (bx = centro, feetY = base no chão) ----

function drawSerpent(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  blob(R, bx, feetY - 5, 15, 6); // rosca da base
  const H = 30;
  const sway = (i: number) => Math.round(Math.sin(i * 0.35 + (reduce ? 0 : t * 0.004)) * 4);
  for (let i = 0; i < H; i++) {
    const y = feetY - 8 - i, off = sway(i), w = 4 - Math.floor(i / 14);
    R(bx + off - w - 1, y, (w + 1) * 2 + 1, 1, OUT);
    R(bx + off - w, y, w * 2 + 1, 1, BODY);
  }
  const hy = feetY - 8 - H, hoff = sway(H);
  blob(R, bx + hoff, hy, 7, 5, BODY_L);
  eyes(R, bx + hoff - 2, hy - 1, 4, color, t, reduce);
  R(bx + hoff + 6, hy, 4, 1, "#c0304a"); // língua bífida
  R(bx + hoff + 9, hy - 2, 3, 1, "#c0304a");
  R(bx + hoff + 9, hy + 1, 3, 1, "#c0304a");
}

function drawGiant(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  R(bx - 8, feetY - 15, 6, 15, BODY); R(bx + 2, feetY - 15, 6, 15, BODY); // pernas
  R(bx - 9, feetY - 1, 8, 2, OUT); R(bx + 1, feetY - 1, 8, 2, OUT);       // pés
  R(bx - 10, feetY - 34, 20, 20, BODY);                                   // tronco (bloco largo)
  R(bx - 11, feetY - 35, 22, 1, OUT); R(bx - 11, feetY - 34, 1, 20, OUT); R(bx + 10, feetY - 34, 1, 20, OUT);
  R(bx - 6, feetY - 30, 12, 11, BODY_L);                                  // peitoral
  R(bx - 16, feetY - 33, 5, 18, BODY); R(bx - 17, feetY - 17, 6, 4, BODY_L); // braço esq + punho
  R(bx + 11, feetY - 40, 5, 15, BODY);                                    // braço dir (erguido)
  R(bx + 12, feetY - 49, 3, 11, BODY);                                    // cabo da clava
  R(bx + 7, feetY - 57, 13, 1, OUT); R(bx + 8, feetY - 56, 11, 8, BODY_L); // cabeça da clava
  R(bx - 3, feetY - 40, 6, 4, BODY);                                      // pescoço
  blob(R, bx, feetY - 46, 7, 6, BODY_L);                                  // cabeça
  eyes(R, bx - 2, feetY - 47, 4, color, t, reduce);
  R(bx - 4, feetY - 41, 9, 2, OUT);                                       // barba
}

function drawBeast(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  for (const lx of [-15, -8, 4, 12]) R(bx + lx, feetY - 13, 4, 13, BODY); // 4 patas
  R(bx - 16, feetY - 1, 6, 2, OUT); R(bx + 11, feetY - 1, 6, 2, OUT);     // patas no chão
  hblob(R, bx - 1, feetY - 18, 15, 8, BODY);                              // dorso
  R(bx + 12, feetY - 26, 6, 3, BODY); R(bx + 16, feetY - 31, 3, 9, BODY); R(bx + 15, feetY - 33, 5, 4, BODY_L); // cauda + tufo
  const hx = bx - 20, hy = feetY - 20;                                    // cabeça à frente
  for (let a = 0; a < 12; a++) { const an = a * (6.283 / 12); R(hx + Math.round(Math.cos(an) * 11) - 1, hy + Math.round(Math.sin(an) * 11) - 1, 3, 3, BODY); } // juba (anel)
  blob(R, hx, hy, 8, 8, BODY_L);
  eyes(R, hx - 3, hy - 2, 4, color, t, reduce);
  R(hx - 8, hy + 1, 6, 4, BODY);                                          // focinho
  R(hx - 9, hy + 4, 9, 2, OUT);                                           // boca
  for (let i = 0; i < 3; i++) R(hx - 8 + i * 3, hy + 4, 1, 2, "#e8e0d0"); // dentes
}

function drawLeviathan(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const bob = reduce ? 0 : Math.round(Math.sin(t * 0.004) * 1.5);
  const cy = feetY - 15 - bob;
  hblob(R, bx, cy, 18, 9, BODY);
  R(bx - 8, cy + 2, 18, 4, BODY_L);                                       // ventre
  R(bx + 16, cy - 11, 4, 4, OUT); R(bx + 18, cy - 13, 5, 9, BODY_L);      // nadadeira/cauda
  R(bx - 19, cy + 1, 9, 2, OUT);                                          // boca
  eyes(R, bx - 13, cy - 3, 4, color, t, reduce);
  if (!reduce && Math.floor(t / 150) % 3 === 0) { R(bx - 3, cy - 15, 2, 7, "#9fd0f0"); R(bx - 5, cy - 17, 6, 2, "#9fd0f0"); } // esguicho
}

function drawStorm(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const bob = reduce ? 0 : Math.round(Math.sin(t * 0.004) * 1.5);
  const cy = feetY - 26 - bob;
  hblob(R, bx, cy, 20, 8, BODY);                                          // nuvem
  R(bx - 14, cy - 3, 12, 8, BODY); R(bx + 3, cy - 5, 13, 10, BODY_L);
  eyes(R, bx - 4, cy - 2, 5, color, t, reduce);
  const flash = reduce ? true : Math.floor(t / 200) % 3 !== 0;
  if (flash) { const y0 = cy + 8; R(bx - 1, y0, 3, 6, "#ffe86a"); R(bx - 4, y0 + 5, 5, 4, "#ffe86a"); R(bx, y0 + 8, 3, 7, "#fff2a0"); }
  if (!reduce) for (let i = 0; i < 5; i++) R(bx - 15 + i * 8, cy + 10 + ((t / 40 + i * 7) % 14), 1, 3, "#8fb8e0");
}

function drawDragon(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const bob = reduce ? 0 : Math.round(Math.sin(t * 0.004) * 1.5);
  const cy = feetY - 20 - bob;
  const flap = reduce ? 0 : Math.round(Math.sin(t * 0.006) * 3);
  const g = R;
  for (const s of [-1, 1]) {                                              // asas
    for (let k = 0; k < 3; k++) {
      const yy = cy - 12 + k * 8 - flap;
      R(bx + s * 9, yy, s > 0 ? 16 : -16, 5, k === 1 ? BODY_L : BODY);
    }
  }
  blob(R, bx, cy, 16, 14);                                                // corpo
  R(bx - 5, cy + 2, 10, 8, BODY_L);                                       // ventre
  R(bx - 10, cy - 18, 3, 6, OUT); R(bx + 7, cy - 18, 3, 6, OUT);          // chifres
  eyes(R, bx - 6, cy - 6, 5, color, t, reduce);
  R(bx - 5, cy - 1, 11, 2, OUT);                                          // boca com dentes
  for (let i = 0; i < 4; i++) g(bx - 4 + i * 3, cy - 1, 1, 2, "#e8e0d0");
}

function drawWall(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const top = feetY - 34;
  R(bx - 20, top, 40, 34, BODY_L);
  R(bx - 21, top - 1, 42, 1, OUT); R(bx - 21, feetY - 1, 42, 1, OUT);
  R(bx - 21, top - 1, 1, 36, OUT); R(bx + 20, top - 1, 1, 36, OUT);
  for (let i = 0; i < 5; i++) { R(bx - 20 + i * 9, top - 4, 5, 4, BODY_L); R(bx - 21 + i * 9, top - 5, 7, 1, OUT); } // ameias
  for (let ry = 6; ry < 34; ry += 6) R(bx - 20, top + ry, 40, 1, OUT);    // fiadas
  for (let ry = 0; ry < 34; ry += 12) R(bx, top + ry, 1, 6, OUT);
  for (let ry = 6; ry < 34; ry += 12) { R(bx - 10, top + ry, 1, 6, OUT); R(bx + 10, top + ry, 1, 6, OUT); }
  R(bx - 6, feetY - 16, 12, 16, OUT);                                     // portão escuro
  eyes(R, bx - 4, feetY - 10, 5, color, t, reduce);                       // olhos no portão
}

function drawShadow(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const bob = reduce ? 0 : Math.round(Math.sin(t * 0.004) * 1.5);
  const H = 30, topY = feetY - 32 - bob;
  const raise = reduce ? 0 : Math.round(Math.sin(t * 0.005) * 2);
  // garras compridas com pontas
  R(bx - 21, topY + 10 - raise, 6, 14, BODY); R(bx - 24, topY + 8 - raise, 6, 5, BODY_L);
  R(bx - 26, topY + 7 - raise, 3, 2, OUT);
  R(bx + 15, topY + 10 + raise, 6, 14, BODY); R(bx + 18, topY + 8 + raise, 6, 5, BODY_L);
  R(bx + 23, topY + 7 + raise, 3, 2, OUT);
  for (let i = 0; i <= H; i++) {                                          // manto em sino
    const y = topY + i, p = i / H;
    const w = Math.round(4 + p * 15 + Math.sin(p * Math.PI) * 2);
    R(bx - w - 1, y, w * 2 + 3, 1, OUT);
    R(bx - w, y, w * 2 + 1, 1, BODY);
    if (p > 0.25 && p < 0.85) R(bx - w + 1, y, 2, 1, BODY_L);             // dobra iluminada
  }
  for (let i = 0; i < 7; i++) { const fx = bx - 18 + i * 6, h = 4 + (i % 2 ? 3 : 0); R(fx, feetY - 2, 5, h, BODY); R(fx, feetY - 3 + h, 5, 1, OUT); } // barra esfarrapada (dentes)
  R(bx - 7, topY + 2, 14, 13, OUT);                                       // capuz (vazio)
  R(bx - 6, topY + 3, 12, 2, BODY);                                       // aba do capuz
  eyes(R, bx - 4, topY + 8, 4, color, t, reduce);
  if (!reduce) { const wy = topY - ((t / 30) % 8); R(bx - 1, wy, 2, 3, BODY_L); } // fumaça subindo
}

// um gafanhoto reconhecível (corpo, cabeça, antena, asa, perna traseira dobrada)
function locust(R: Rect, x: number, y: number, color: string) {
  R(x - 4, y - 1, 7, 1, "#c8d69a");     // asa (clara, translúcida)
  R(x - 3, y, 6, 2, "#6b7a2a");         // corpo alongado
  R(x - 3, y, 6, 1, "#8aa03a");         // dorso claro
  R(x + 3, y - 1, 3, 3, "#7a8a30");     // cabeça/tórax
  R(x + 5, y - 3, 1, 2, "#5a6a20"); R(x + 6, y - 4, 1, 1, "#5a6a20"); // antena
  R(x + 4, y, 1, 1, color);             // olho
  R(x - 4, y + 2, 4, 1, "#5a6a20");     // fêmur traseiro (o "salto")
  R(x - 1, y + 2, 1, 3, "#5a6a20");     // tíbia dobrada
  R(x - 5, y + 3, 2, 1, "#5a6a20");
}
function drawSwarm(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  hblob(R, bx, feetY - 22, 7, 5, "#6b7a2a");                              // gafanhoto-rainha (núcleo)
  eyes(R, bx - 3, feetY - 23, 4, color, t, reduce);
  R(bx + 5, feetY - 25, 2, 3, "#5a6a20"); R(bx + 7, feetY - 28, 1, 3, "#5a6a20"); // antenas grandes
  const n = 11;
  for (let i = 0; i < n; i++) {                                          // enxame ao redor
    const a = i * (6.283 / n) + (reduce ? 0 : t * 0.0018);
    const rad = 14 + (i % 3) * 8 + (reduce ? 0 : Math.sin(t * 0.004 + i) * 3);
    const ix = bx + Math.round(Math.cos(a) * rad * 1.3);
    const iy = feetY - 22 + Math.round(Math.sin(a) * rad * 0.8);
    locust(R, ix, iy, color);
  }
}

function drawFlame(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const H = 34;
  for (let i = 0; i <= H; i++) {                                          // chama externa (cor do boss)
    const y = feetY - i, p = i / H;
    const wob = reduce ? 0 : Math.round(Math.sin(p * 6 + t * 0.02) * 2 * p);
    const w = Math.round((1 - p) * 12 + Math.sin(p * Math.PI) * 3);
    if (w > 0) R(bx - w + wob, y, w * 2, 1, color);
  }
  for (let i = 0; i <= H - 10; i++) {                                     // núcleo claro
    const y = feetY - i, p = i / (H - 10), w = Math.round((1 - p) * 7);
    if (w > 0) R(bx - w, y, w * 2, 1, "#ffe08a");
  }
  eyes(R, bx - 4, feetY - 18, 4, "#2a0a00", t, reduce);                   // olhos escuros dentro do fogo
}

function drawHorseman(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const gy = reduce ? 0 : Math.round(Math.abs(Math.sin(t * 0.02)) * 2);
  const b = feetY - gy;
  hblob(R, bx, b - 14, 16, 7, BODY);                                      // corpo do cavalo
  for (const lx of [-13, -6, 5, 12]) R(bx + lx, b - 8, 3, 8, BODY);       // patas
  R(bx - 16, b - 24, 5, 12, BODY); blob(R, bx - 16, b - 26, 5, 5, BODY_L); // pescoço + cabeça
  R(bx - 20, b - 27, 4, 2, OUT);
  eyes(R, bx - 18, b - 27, 3, color, t, reduce);
  R(bx + 15, b - 17, 5, 11, BODY_L);                                      // cauda
  R(bx - 2, b - 27, 6, 11, BODY_L); blob(R, bx + 1, b - 29, 4, 4, BODY);  // cavaleiro
  R(bx + 2, b - 42, 1, 20, BODY_L); R(bx + 1, b - 43, 3, 3, color);       // lança
}

function drawIdol(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  R(bx - 12, feetY - 6, 24, 6, BODY); R(bx - 13, feetY - 7, 26, 1, OUT);  // pedestal
  R(bx - 8, feetY - 30, 16, 24, BODY_L); R(bx - 9, feetY - 31, 18, 1, OUT); // corpo rígido
  R(bx - 14, feetY - 26, 6, 4, BODY_L); R(bx + 8, feetY - 26, 6, 4, BODY_L); // braços abertos
  R(bx - 8, feetY - 18, 16, 1, OUT);                                      // gravação
  blob(R, bx, feetY - 36, 6, 6, BODY);                                    // cabeça
  R(bx - 6, feetY - 43, 2, 5, color); R(bx + 4, feetY - 43, 2, 5, color); // chifres/coroa
  eyes(R, bx - 3, feetY - 37, 3, color, t, reduce);                       // olhos-joia
}

// o TENTADOR — vulto chifrudo, sorriso maligno e uma serpente no braço
function drawTempter(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const bob = reduce ? 0 : Math.round(Math.sin(t * 0.004) * 1.5);
  const H = 26, topY = feetY - 40 - bob;
  for (let i = 0; i <= H; i++) { // manto (sino)
    const y = topY + 12 + i, p = i / H, w = Math.round(6 + p * 13);
    R(bx - w - 1, y, w * 2 + 3, 1, OUT); R(bx - w, y, w * 2 + 1, 1, BODY);
    if (p > 0.2 && p < 0.85) R(bx - w + 1, y, 2, 1, BODY_L);
  }
  R(bx - 15, topY + 12, 7, 4, BODY_L); R(bx + 8, topY + 12, 7, 4, BODY_L); // ombros
  R(bx - 17, topY + 11, 3, 2, OUT); R(bx + 14, topY + 11, 3, 2, OUT);
  blob(R, bx, topY + 6, 8, 8, BODY_L); // cabeça
  for (let k = 0; k < 4; k++) { R(bx - 7 - k, topY + 1 - k, 2, 2, BODY); R(bx + 6 + k, topY + 1 - k, 2, 2, BODY); } // chifres
  R(bx - 11, topY - 3, 2, 2, OUT); R(bx + 10, topY - 3, 2, 2, OUT);
  eyes(R, bx - 4, topY + 5, 4, color, t, reduce);
  R(bx - 4, topY + 10, 9, 1, OUT); R(bx - 3, topY + 11, 1, 1, color); R(bx + 3, topY + 11, 1, 1, color); // sorriso maligno
  const sway = reduce ? 0 : Math.round(Math.sin(t * 0.006) * 2); // serpente no braço
  R(bx + 13, topY + 16, 5, 2, color); R(bx + 16, topY + 13, 2, 4, color);
  R(bx + 17 + sway, topY + 10, 3, 2, color); R(bx + 19 + sway, topY + 9, 2, 1, "#c0304a");
}

// a MORTE — caveira, manto e foice
function drawDeath(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const bob = reduce ? 0 : Math.round(Math.sin(t * 0.004) * 1.5);
  const H = 28, topY = feetY - 38 - bob;
  for (let i = 0; i <= H; i++) { const y = topY + 10 + i, p = i / H, w = Math.round(5 + p * 14); R(bx - w - 1, y, w * 2 + 3, 1, OUT); R(bx - w, y, w * 2 + 1, 1, BODY); }
  for (let i = 0; i < 6; i++) R(bx - 16 + i * 6, feetY - 2, 5, 4, BODY); // barra
  blob(R, bx, topY + 5, 7, 7, BONE); // caveira
  R(bx - 6, topY + 3, 12, 1, BONE_D);
  R(bx - 5, topY + 6, 4, 4, OUT); R(bx + 1, topY + 6, 4, 4, OUT); // órbitas
  R(bx - 4, topY + 7, 2, 2, color); R(bx + 2, topY + 7, 2, 2, color); // brilho
  R(bx - 1, topY + 9, 2, 2, OUT); // nasal
  R(bx - 4, topY + 12, 9, 1, BONE_D); for (let d = 0; d < 4; d++) R(bx - 3 + d * 2, topY + 12, 1, 2, OUT); // dentes
  for (let k = 0; k < 20; k++) R(bx + 14 + Math.round(k * 0.15), feetY - 2 - k * 2, 2, 2, "#5f4021"); // cabo da foice
  const tx = bx + 17, ty = feetY - 42; // lâmina curva
  R(tx, ty, 2, 3, IRON_L); R(tx - 3, ty - 1, 4, 2, IRON_L); R(tx - 6, ty, 4, 2, IRON_L); R(tx - 8, ty + 3, 3, 2, IRON_L);
  R(tx - 4, ty - 2, 3, 1, "#e8eef4");
}

// o CÁRCERE — massa acorrentada, grilhão e correntes
function drawChains(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  blob(R, bx, feetY - 17, 15, 17, BODY); // massa central
  R(bx - 7, feetY - 24, 14, 8, BODY_L);
  eyes(R, bx - 4, feetY - 23, 4, color, t, reduce);
  R(bx - 5, feetY - 15, 11, 1, OUT); // boca barrada
  const gx = bx, gy = feetY - 6; // grilhão (anel de ferro)
  for (let a = 0; a < 12; a++) { const an = a * (6.283 / 12); R(gx + Math.round(Math.cos(an) * 7) - 1, gy + Math.round(Math.sin(an) * 5) - 1, 2, 2, IRON); }
  R(gx - 8, gy - 6, 4, 4, IRON_L); R(gx - 7, gy - 5, 2, 2, OUT); // cadeado
  const sw = reduce ? 0 : Math.round(Math.sin(t * 0.005) * 2); // correntes penduradas
  for (const s of [-1, 1]) for (let k = 0; k < 4; k++) {
    const ox = bx + s * 15 + (s > 0 ? sw : -sw);
    R(ox, feetY - 28 + k * 6, 3, 4, IRON); R(ox + 1, feetY - 26 + k * 6, 1, 2, IRON_L);
  }
}

// a LEGIÃO — massa amorfa com muitos olhos
function drawLegion(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const puffs: [number, number, number, number][] = [[0, -18, 15, 15], [-12, -12, 9, 9], [12, -14, 9, 9], [-6, -27, 8, 8], [7, -25, 8, 8]];
  for (const [dx, dy, hw, hh] of puffs) { const wob = reduce ? 0 : Math.round(Math.sin(t * 0.004 + dx) * 1.5); blob(R, bx + dx, feetY + dy + wob, hw, hh, dy < -22 ? BODY_L : BODY); }
  const spots: [number, number][] = [[-6, -22], [4, -24], [-11, -14], [9, -12], [0, -13], [-3, -30], [8, -28], [-9, -24]];
  spots.forEach(([dx, dy], i) => {
    const blink = !reduce && Math.floor((t + i * 137) / 90) % 20 === 0;
    if (blink) { R(bx + dx - 1, feetY + dy, 4, 1, OUT); return; }
    R(bx + dx - 1, feetY + dy, 2, 2, color); R(bx + dx + 2, feetY + dy, 2, 2, color);
    R(bx + dx, feetY + dy, 1, 1, "#fff"); R(bx + dx + 3, feetY + dy, 1, 1, "#fff");
  });
}

// o REI SOBERBO — figura com coroa dourada e cetro
// O ACUSADOR (Jó 1-2): NÃO é uma tempestade. O redemoinho de Jó 38 é a voz do
// SENHOR, e desenhá-lo como o inimigo punha Deus no lugar do adversário — o
// contrário da regra fixa do projeto. Aqui ele é o que o texto diz: um vulto da
// corte celestial, de asas escuras e sem auréola, com o dedo apontado — "veio
// também Satanás entre eles" —, igual ao que a cena viva desenha em Jó 1:6.
function drawAccuser(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const bob = reduce ? 0 : Math.round(Math.sin(t * 0.0035) * 1.5);
  const topY = feetY - 44 - bob;
  const flap = reduce ? 0 : Math.round(Math.sin(t * 0.005) * 4);
  // ASAS: dois leques que sobem e abrem, para a silhueta ser de figura ALADA e
  // não de vulto encapuzado (que é o arquétipo `shadow`, e saía igual).
  for (const sg of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      const dx = 7 + i * 5;
      const yTop = topY + 2 - i * 3 - flap + Math.round(i * i * 0.35);
      const len = 20 - i * 2;
      R(bx + sg * dx - (sg < 0 ? 5 : 0), yTop, 5, len, i % 2 ? BODY_L : BODY);
      R(bx + sg * dx - (sg < 0 ? 5 : 0), yTop - 1, 5, 1, OUT);
      R(bx + sg * dx - (sg < 0 ? 5 : 0), yTop + len, 5, 1, OUT);
    }
  }
  // manto ESTREITO, para as asas dominarem
  for (let i = 0; i <= 30; i++) {
    const y = topY + 10 + i, pr = i / 30;
    const w = Math.round(3 + pr * 8);
    R(bx - w - 1, y, w * 2 + 3, 1, OUT); R(bx - w, y, w * 2 + 1, 1, BODY);
  }
  R(bx - 8, topY + 40, 17, 2, OUT);
  blob(R, bx, topY + 5, 6, 6, BODY_L);                                    // cabeça, SEM auréola
  R(bx - 7, topY + 10, 15, 2, OUT);                                       // gola
  eyes(R, bx - 4, topY + 4, 4, color, t, reduce);
  // O DEDO QUE APONTA — é o que ele faz no livro inteiro ("porventura teme Jó a
  // Deus debalde?"). Braço horizontal, longo, contra o corpo escuro.
  const ap = reduce ? 0 : Math.round(Math.sin(t * 0.004) * 2);
  R(bx + 9, topY + 17 + ap, 16, 4, BODY_L); R(bx + 8, topY + 16 + ap, 18, 1, OUT);
  R(bx + 25, topY + 17 + ap, 6, 2, BODY_L); R(bx + 31, topY + 17 + ap, 3, 2, color);
}

// O DECRETO (Ed 4): o inimigo de Esdras não é um exército nem uma muralha — é
// uma CARTA. "Então cessou a obra da casa de Deus, que estava em Jerusalém."
// Um rolo aberto e enorme, com o selo do rei e a escrita que manda parar.
function drawDecree(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const bob = reduce ? 0 : Math.round(Math.sin(t * 0.003) * 1.5);
  const topY = feetY - 48 - bob, H = 40, W = 17;
  for (const sg of [-1, 1]) {                                             // hastes enroladas
    const rx = bx + sg * (W + 4);
    R(rx - 4, topY - 3, 9, H + 8, BODY_L); R(rx - 5, topY - 4, 11, 1, OUT);
    R(rx - 5, topY + H + 4, 11, 1, OUT); R(rx - 2, topY - 1, 3, H + 4, BODY);
  }
  R(bx - W, topY, W * 2, H, BONE);                                        // folha
  R(bx - W - 1, topY - 1, W * 2 + 2, 1, OUT); R(bx - W - 1, topY + H, W * 2 + 2, 1, OUT);
  for (let i = 0; i < 7; i++) {                                           // linhas de escrita
    const w = i % 3 === 2 ? W : W * 1.6;
    R(bx - W + 3, topY + 5 + i * 4, w, 1, BONE_D);
  }
  const p = reduce ? 1 : 0.6 + Math.abs(Math.sin(t * 0.004)) * 0.4;       // selo de lacre
  R(bx - 6, topY + H - 12, 13, 12, "#8a2030");
  R(bx - 7, topY + H - 13, 15, 1, OUT); R(bx - 4, topY + H - 10, 8, 7, "#b03040");
  eyes(R, bx - 4, topY + H - 9, 4, color, t, reduce);
  if (!reduce) { R(bx - 7, topY + H - 13, 15, 1, p > 0.85 ? color : OUT); }
}

// O CARRO DE GUERRA (Êx 14): o exército do Faraó é CARRO, não cavaleiro solto —
// "tomou seiscentos carros escolhidos". Roda, timão, cavalo atrelado e o auriga.
function drawChariot(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const gy = reduce ? 0 : Math.round(Math.abs(Math.sin(t * 0.018)) * 2);
  const b = feetY - gy;
  hblob(R, bx - 20, b - 14, 11, 5, BODY);                                 // cavalo (atrás, menor)
  for (const lx of [-28, -22, -16, -10]) R(bx + lx, b - 9, 3, 9, BODY);
  R(bx - 33, b - 23, 4, 10, BODY); blob(R, bx - 33, b - 25, 4, 4, BODY_L);
  eyes(R, bx - 35, b - 26, 3, color, t, reduce);
  R(bx - 10, b - 17, 20, 3, BODY_L);                                      // timão
  R(bx + 6, b - 30, 20, 16, BODY); R(bx + 5, b - 31, 22, 1, OUT);         // caixa do carro
  R(bx + 8, b - 28, 16, 2, BODY_L);
  const ang = reduce ? 0 : (t / 90) % 6.283;                              // roda com raios
  const wx = bx + 16, wy = b - 8, rr = 8;
  for (let i = 0; i < 6; i++) {
    const a = ang + (i * Math.PI) / 3;
    R(wx + Math.cos(a) * rr * 0.6 - 1, wy + Math.sin(a) * rr * 0.6 - 1, 2, 2, IRON_L);
  }
  for (let a = 0; a < 6.283; a += 0.22) R(wx + Math.cos(a) * rr, wy + Math.sin(a) * rr, 2, 2, IRON);
  R(bx + 13, b - 40, 6, 15, BODY_L); blob(R, bx + 16, b - 42, 4, 4, BODY); // auriga
  R(bx + 21, b - 52, 2, 26, BODY_L); R(bx + 20, b - 54, 4, 4, color);      // lança erguida
}

// O CERCO (2Rs 18-19; 2Cr 32): torre de assalto e aríete contra a muralha — o
// inimigo de Ezequias não é um cavaleiro, é uma máquina que não pára de vir.
function drawSiege(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const push = reduce ? 0 : Math.round(Math.sin(t * 0.004) * 3);
  const b = feetY;
  R(bx - 18 + push, b - 46, 34, 46, BODY); R(bx - 19 + push, b - 47, 36, 1, OUT); // torre
  for (let i = 0; i < 4; i++) R(bx - 16 + push, b - 42 + i * 11, 30, 1, BODY_L);   // andares
  for (const mx of [-14, -6, 2, 10]) R(bx + mx + push, b - 50, 5, 4, BODY);        // ameias
  eyes(R, bx - 6 + push, b - 38, 6, color, t, reduce);
  R(bx + 14 + push, b - 22, 22, 6, IRON);                                          // aríete
  R(bx + 34 + push, b - 24, 7, 10, IRON_L); R(bx + 33 + push, b - 25, 9, 1, OUT);  // cabeça de ferro
  for (const wx of [bx - 12 + push, bx + 8 + push]) {                              // rodas
    for (let a = 0; a < 6.283; a += 0.3) R(wx + Math.cos(a) * 6, b - 6 + Math.sin(a) * 6, 2, 2, IRON);
  }
}

function drawCrown(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  const bob = reduce ? 0 : Math.round(Math.sin(t * 0.004));
  const cy = feetY - 34 - bob;
  for (let i = 0; i <= 26; i++) { const y = cy + 8 + i, p = i / 26, w = Math.round(7 + p * 14); R(bx - w - 1, y, w * 2 + 3, 1, OUT); R(bx - w, y, w * 2 + 1, 1, BODY); } // manto
  R(bx - 10, cy + 8, 20, 3, BODY_L); // gola
  R(bx - 11, cy + 8, 4, 17, "#5a1428"); R(bx + 7, cy + 8, 4, 17, "#5a1428"); // faixas púrpura
  blob(R, bx, cy, 7, 7, BODY_L); // cabeça
  eyes(R, bx - 4, cy - 1, 4, color, t, reduce);
  R(bx - 3, cy + 4, 7, 1, OUT); // boca dura
  R(bx - 8, cy - 8, 16, 3, GOLD); R(bx - 8, cy - 8, 16, 1, GOLD_H); // aro da coroa
  for (let k = -2; k <= 2; k++) { R(bx + k * 4 - 1, cy - 12, 2, 4, GOLD); R(bx + k * 4 - 1, cy - 13, 2, 1, GOLD_H); } // pontas
  R(bx - 1, cy - 7, 2, 2, "#c0304a"); // joia
  R(bx + 13, cy + 2, 2, 20, GOLD); R(bx + 12, cy, 4, 3, GOLD_H); // cetro
}

const RENDER: Record<BossShape, (R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) => void> = {
  serpent: drawSerpent, giant: drawGiant, beast: drawBeast, leviathan: drawLeviathan,
  storm: drawStorm, dragon: drawDragon, wall: drawWall, shadow: drawShadow,
  accuser: drawAccuser, chariot: drawChariot, siege: drawSiege, decree: drawDecree,
  swarm: drawSwarm, flame: drawFlame, horseman: drawHorseman, idol: drawIdol,
  tempter: drawTempter, death: drawDeath, chains: drawChains, legion: drawLegion, crown: drawCrown,
};

/**
 * Desenha o chefe do livro `bookId`: silhueta pixel do arquétipo, com sombra no
 * chão e uma aura pulsante na cor do chefe. `bx` centro, `feetY` base.
 */
// Porte de cada arquétipo na câmera da batalha (multiplica a arte de ~45 px).
// Não é enfeite: é o que separa "um ícone no canto" de "um chefe".
const BOSS_SCALE: Partial<Record<BossShape, number>> = {
  giant: 2.2, wall: 2.15, dragon: 2.1, leviathan: 2.0, serpent: 1.95,
  storm: 1.9, legion: 1.9, flame: 1.85, death: 1.85, idol: 1.8,
  crown: 1.75, tempter: 1.75, horseman: 1.7, beast: 1.7, chains: 1.7,
  shadow: 1.7, swarm: 1.6, accuser: 1.8, chariot: 1.75, siege: 2.05, decree: 1.9,
};

export function drawBoss(g: G, bookId: string, bx: number, feetY: number, t: number, reduce: boolean): void {
  const info = getBoss(bookId);
  const R = mkRect(g);
  const cx = Math.round(bx);

  // PRESENÇA DO CHEFE. A arte foi desenhada numa grade de ~45 px de altura, e a
  // câmera da batalha tem 360×200 com o chão em 150: o chefe saía do tamanho do
  // herói (que é desenhado a 0,9), e uma batalha de chefe em que o chefe não
  // domina o quadro não é uma batalha de chefe. Cada arquétipo tem o seu porte:
  // o gigante e a muralha TOWERAM, a serpente ergue-se, o enxame espalha-se.
  const K = BOSS_SCALE[info.shape] ?? 1.7;
  const sombraW = 20 * K, auraW = 28 * K, auraH = 26 * K;

  // sombra no chão
  g.globalAlpha = 0.3;
  g.fillStyle = "#000";
  g.beginPath();
  g.ellipse(cx, feetY + 3, sombraW, 4 + K, 0, 0, 6.29);
  g.fill();
  g.globalAlpha = 1;

  // aura pulsante (cor do chefe)
  if (!reduce) {
    g.globalAlpha = 0.1 + Math.abs(Math.sin(t * 0.005)) * 0.12;
    g.fillStyle = info.color;
    g.beginPath();
    g.ellipse(cx, feetY - 22 * K, auraW, auraH, 0, 0, 6.29);
    g.fill();
    g.globalAlpha = 1;
  }

  g.save();
  g.translate(cx, feetY);
  g.scale(K, K);
  g.translate(-cx, -feetY);
  (RENDER[info.shape] ?? drawShadow)(R, cx, Math.round(feetY), t, reduce, info.color);
  g.restore();
}

// Miniatura estática do chefe (mesma arte da cena) para o nó do mapa — assim o
// ícone do mapa BATE com o boss da batalha. Memoizada por livro+tamanho.
const thumbCache: Record<string, string> = {};
export function bossThumbnail(bookId: string, size = 64): string {
  const key = `${bookId}:${size}`;
  if (thumbCache[key]) return thumbCache[key];
  if (typeof document === "undefined") return "";
  const cv = document.createElement("canvas");
  cv.width = size; cv.height = size;
  const g = cv.getContext("2d");
  if (!g) return "";
  g.imageSmoothingEnabled = false;
  // A caixa da arte cresce com o PORTE do arquétipo (BOSS_SCALE), senão o chefe
  // aumentado na batalha sai cortado no nó do mapa — o ícone tem de ser a mesma
  // figura, inteira.
  const K = BOSS_SCALE[getBoss(bookId).shape] ?? 1.7;
  const s = size / (74 * K);
  g.save();
  g.translate(size / 2, size * 0.09);
  g.scale(s, s);
  drawBoss(g, bookId, 0, 64 * K, 900, true); // reduce=true → estático, sem aura/animação
  g.restore();
  const url = cv.toDataURL();
  thumbCache[key] = url;
  return url;
}
