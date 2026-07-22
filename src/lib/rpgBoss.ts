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
  | "idol";     // ídolo/estátua

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
  exodus:       { name: "O Exército do Faraó", emoji: "🐎", color: "#c23a3a", shape: "horseman", taunt: "Ninguém escapa do meu Egito!" },
  leviticus:    { name: "O Fogo do Altar", emoji: "🔥", color: "#ff8a3a", shape: "flame",    taunt: "Quem se aproximará do Santo?" },
  numbers:      { name: "As Serpentes Ardentes", emoji: "🐍", color: "#d1503a", shape: "serpent", taunt: "O deserto será o seu túmulo." },
  deuteronomy:  { name: "Os Gigantes de Anaque", emoji: "🗿", color: "#b98a4a", shape: "giant", taunt: "Quem enfrenta os filhos de Anaque?" },
  joshua:       { name: "Os Muros de Jericó", emoji: "🏰", color: "#c58a4a", shape: "wall",   taunt: "Nenhum exército passará por aqui!" },
  judges:       { name: "As Nações Opressoras", emoji: "⚔️", color: "#a05030", shape: "horseman", taunt: "Israel se curvará outra vez." },
  ruth:         { name: "A Sombra da Perda", emoji: "🥀", color: "#7a8bb0", shape: "shadow",  taunt: "Não te resta ninguém, Noemi." },
  "1samuel":    { name: "O Gigante Golias", emoji: "🗡️", color: "#e0c24a", shape: "giant",   taunt: "Envia-me um homem, para lutarmos!" },
  "2samuel":    { name: "A Revolta de Absalão", emoji: "👑", color: "#b04a6a", shape: "horseman", taunt: "O trono de teu pai será meu!" },
  "1kings":     { name: "Os Profetas de Baal", emoji: "🔥", color: "#ff6a3a", shape: "flame",  taunt: "Onde está o teu Deus, Elias?" },
  "2kings":     { name: "O Cerco da Assíria", emoji: "🏹", color: "#8a5a3a", shape: "horseman", taunt: "Nenhum deus livrou sua cidade de mim." },
  "1chronicles":{ name: "As Guerras do Reino", emoji: "⚔️", color: "#c0955a", shape: "horseman", taunt: "O trono se ergue sobre sangue." },
  "2chronicles":{ name: "O Fogo da Babilônia", emoji: "🔥", color: "#e0542a", shape: "flame",  taunt: "Sua cidade santa arderá." },
  ezra:         { name: "Os Adversários da Obra", emoji: "🧱", color: "#9a7a4a", shape: "wall", taunt: "Este templo jamais se levantará." },
  nehemiah:     { name: "A Zombaria de Sambalate", emoji: "🧱", color: "#8a9a6a", shape: "wall", taunt: "Uma raposa derruba esse muro!" },
  esther:       { name: "Hamã, o Perseguidor", emoji: "🎭", color: "#b04a8a", shape: "shadow", taunt: "Nenhum judeu restará no império." },
  job:          { name: "O Acusador", emoji: "🌪️", color: "#6aa0c0", shape: "storm",  taunt: "Tira a mão sobre tudo o que ele tem!" },
  psalms:       { name: "O Vale da Sombra", emoji: "🌑", color: "#6a7ab0", shape: "shadow", taunt: "Nenhuma canção te salva no vale." },
  proverbs:     { name: "A Voz da Insensatez", emoji: "🍷", color: "#b06ab0", shape: "shadow", taunt: "As águas roubadas são doces." },
  ecclesiastes: { name: "A Vaidade", emoji: "⏳", color: "#8a8a9a", shape: "shadow", taunt: "Tudo é correr atrás do vento." },
  songofsolomon:{ name: "As Raposas da Vinha", emoji: "🦊", color: "#c07a4a", shape: "beast", taunt: "Estragaremos a vinha florida." },
  isaiah:       { name: "O Rei da Babilônia", emoji: "⭐", color: "#c0a04a", shape: "shadow", taunt: "Subirei acima das mais altas nuvens." },
  jeremiah:     { name: "O Leão do Norte", emoji: "🦁", color: "#d0a03a", shape: "beast", taunt: "Subiu o leão da sua ramada." },
  lamentations: { name: "A Ruína de Sião", emoji: "🔥", color: "#c04a3a", shape: "flame", taunt: "Como jaz solitária a cidade!" },
  ezekiel:      { name: "Gogue, de Magogue", emoji: "⚔️", color: "#6a8a9a", shape: "horseman", taunt: "Subirei como tempestade sobre a terra." },
  daniel:       { name: "A Cova dos Leões", emoji: "🦁", color: "#e0a24a", shape: "beast", taunt: "Ninguém sai daqui com vida." },
  // — Profetas Menores —
  hosea:        { name: "A Infidelidade", emoji: "💔", color: "#b06a8a", shape: "shadow", taunt: "Israel esqueceu o seu Criador." },
  joel:         { name: "O Enxame de Gafanhotos", emoji: "🦗", color: "#9aae3a", shape: "swarm", taunt: "Devoraremos tudo o que restou." },
  amos:         { name: "O Rugido do Juízo", emoji: "🦁", color: "#d0902a", shape: "beast", taunt: "O leão rugiu; quem não temerá?" },
  obadiah:      { name: "O Orgulho de Edom", emoji: "🦅", color: "#a07a5a", shape: "beast", taunt: "Quem me derrubará das alturas?" },
  jonah:        { name: "O Grande Peixe", emoji: "🐋", color: "#4a9ae0", shape: "leviathan", taunt: "As profundezas te engolirão." },
  micah:        { name: "O Invasor Assírio", emoji: "⚔️", color: "#7a6a5a", shape: "horseman", taunt: "Pisaremos os seus palácios." },
  nahum:        { name: "O Covil de Nínive", emoji: "🦁", color: "#c04a3a", shape: "beast", taunt: "Ninguém assusta os leões de Nínive." },
  habakkuk:     { name: "Os Caldeus Violentos", emoji: "🏹", color: "#8a7a9a", shape: "horseman", taunt: "Nossa lei sai de nós mesmos." },
  zephaniah:    { name: "O Dia da Ira", emoji: "⚡", color: "#d0803a", shape: "storm", taunt: "Consumirei tudo sobre a terra." },
  haggai:       { name: "A Casa em Ruínas", emoji: "🏚️", color: "#8a8a6a", shape: "wall", taunt: "Não é tempo de edificar." },
  zechariah:    { name: "O Adversário", emoji: "👁️", color: "#7aa08a", shape: "shadow", taunt: "Estas vestes estão imundas." },
  malachi:      { name: "O Fogo Refinador", emoji: "🔥", color: "#ff9a3a", shape: "flame", taunt: "Quem suportará o dia da minha vinda?" },
  // — Novo Testamento —
  matthew:      { name: "O Tentador no Deserto", emoji: "😈", color: "#9a5aa0", shape: "shadow", taunt: "Tudo isto te darei, se te prostrares." },
  mark:         { name: "A Legião", emoji: "👹", color: "#6a6a8a", shape: "shadow", taunt: "Somos muitos!" },
  luke:         { name: "A Grande Tempestade", emoji: "⛈️", color: "#5a90c0", shape: "storm", taunt: "As ondas cobrirão o barco!" },
  john:         { name: "A Sombra da Morte", emoji: "💀", color: "#5a6a8a", shape: "shadow", taunt: "Já são quatro dias no túmulo." },
  acts:         { name: "As Correntes da Prisão", emoji: "⛓️", color: "#c0803a", shape: "shadow", taunt: "Nenhuma palavra sairá desta cela." },
  romans:       { name: "O Poder do Pecado", emoji: "🐍", color: "#8a5aa0", shape: "serpent", taunt: "Ninguém é justo, nem um sequer." },
  "1corinthians":{ name: "O Aguilhão da Morte", emoji: "💀", color: "#6a7a8a", shape: "shadow", taunt: "Onde está, ó morte, a tua vitória?" },
  "2corinthians":{ name: "O Espinho na Carne", emoji: "🌵", color: "#7a8a6a", shape: "shadow", taunt: "Este espinho jamais te deixará." },
  galatians:    { name: "O Jugo da Lei", emoji: "⛓️", color: "#9a7a4a", shape: "shadow", taunt: "Volte para debaixo do jugo." },
  ephesians:    { name: "As Hostes das Trevas", emoji: "🌑", color: "#5a5a8a", shape: "shadow", taunt: "Tua luta não é contra carne e sangue." },
  philippians:  { name: "As Cadeias de Roma", emoji: "⛓️", color: "#7a8aa0", shape: "shadow", taunt: "A prisão calará o teu louvor." },
  colossians:   { name: "As Filosofias Vãs", emoji: "📜", color: "#7a6a9a", shape: "shadow", taunt: "Enredarei tua mente em vãs sutilezas." },
  "1thessalonians":{ name: "O Ladrão da Noite", emoji: "🌙", color: "#4a5a7a", shape: "shadow", taunt: "Virei quando menos esperas." },
  "2thessalonians":{ name: "O Homem da Iniquidade", emoji: "👤", color: "#8a3a4a", shape: "shadow", taunt: "Sentarei no templo como deus." },
  "1timothy":   { name: "O Amor ao Dinheiro", emoji: "💰", color: "#e0c24a", shape: "idol", taunt: "Por mim muitos se desviaram da fé." },
  "2timothy":   { name: "A Boca do Leão", emoji: "🦁", color: "#d0902a", shape: "beast", taunt: "Ninguém escapa da boca do leão." },
  titus:        { name: "Os Falsos Mestres", emoji: "🎭", color: "#8a7a5a", shape: "shadow", taunt: "Enganaremos casas inteiras." },
  philemon:     { name: "A Dívida do Passado", emoji: "⛓️", color: "#9a8a7a", shape: "shadow", taunt: "Ele te deve; jamais será livre." },
  hebrews:      { name: "O Peso que Assedia", emoji: "🏋️", color: "#8a6a5a", shape: "shadow", taunt: "Você não terminará a corrida." },
  james:        { name: "O Fogo da Língua", emoji: "🔥", color: "#ff7a3a", shape: "flame", taunt: "Uma faísca incendeia toda a floresta." },
  "1peter":     { name: "O Leão que Ruge", emoji: "🦁", color: "#d08a2a", shape: "beast", taunt: "Ando buscando a quem devorar." },
  "2peter":     { name: "Os Escarnecedores", emoji: "🎭", color: "#7a7a6a", shape: "shadow", taunt: "Onde está a promessa da sua vinda?" },
  "1john":      { name: "O Espírito do Anticristo", emoji: "👤", color: "#8a4a6a", shape: "shadow", taunt: "Nego o Pai e o Filho." },
  "2john":      { name: "O Enganador", emoji: "🎭", color: "#8a5a6a", shape: "shadow", taunt: "Muitos enganadores saíram pelo mundo." },
  "3john":      { name: "Diótrefes, o Soberbo", emoji: "👤", color: "#9a6a5a", shape: "shadow", taunt: "Ninguém terá lugar senão eu." },
  jude:         { name: "Os Intrusos Ímpios", emoji: "👹", color: "#6a5a7a", shape: "shadow", taunt: "Infiltramo-nos entre vós." },
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
  R(bx - 21, topY + 10 - raise, 6, 14, BODY); R(bx - 23, topY + 8 - raise, 5, 6, BODY_L); // garra esq
  R(bx + 15, topY + 10 + raise, 6, 14, BODY); R(bx + 18, topY + 8 + raise, 5, 6, BODY_L); // garra dir
  for (let i = 0; i <= H; i++) {                                          // manto em sino
    const y = topY + i, p = i / H;
    const w = Math.round(4 + p * 14 + Math.sin(p * Math.PI) * 2);
    R(bx - w - 1, y, w * 2 + 3, 1, OUT);
    R(bx - w, y, w * 2 + 1, 1, BODY);
  }
  for (let i = 0; i < 6; i++) R(bx - 16 + i * 6, feetY - 3 + (i % 2 ? 2 : 0), 5, 5, BODY); // barra esfarrapada
  R(bx - 6, topY + 3, 12, 11, OUT);                                       // capuz (vazio)
  eyes(R, bx - 4, topY + 7, 4, color, t, reduce);
}

function drawSwarm(R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) {
  hblob(R, bx, feetY - 22, 8, 6, BODY);                                   // núcleo denso
  eyes(R, bx - 3, feetY - 24, 4, color, t, reduce);
  const n = 15;
  for (let i = 0; i < n; i++) {
    const a = i * (6.283 / n) + (reduce ? 0 : t * 0.002);
    const rad = 11 + (i % 3) * 7 + (reduce ? 0 : Math.sin(t * 0.005 + i) * 3);
    const ix = bx + Math.round(Math.cos(a) * rad * 1.35), iy = feetY - 22 + Math.round(Math.sin(a) * rad);
    R(ix - 2, iy, 4, 2, BODY);
    R(ix - 3, iy - 1, 1, 1, BODY_L); R(ix + 2, iy - 1, 1, 1, BODY_L);     // asinhas
    if (i % 4 === 0) R(ix, iy, 1, 1, color);
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

const RENDER: Record<BossShape, (R: Rect, bx: number, feetY: number, t: number, reduce: boolean, color: string) => void> = {
  serpent: drawSerpent, giant: drawGiant, beast: drawBeast, leviathan: drawLeviathan,
  storm: drawStorm, dragon: drawDragon, wall: drawWall, shadow: drawShadow,
  swarm: drawSwarm, flame: drawFlame, horseman: drawHorseman, idol: drawIdol,
};

/**
 * Desenha o chefe do livro `bookId`: silhueta pixel do arquétipo, com sombra no
 * chão e uma aura pulsante na cor do chefe. `bx` centro, `feetY` base.
 */
export function drawBoss(g: G, bookId: string, bx: number, feetY: number, t: number, reduce: boolean): void {
  const info = getBoss(bookId);
  const R = mkRect(g);
  const cx = Math.round(bx);

  // sombra no chão
  g.globalAlpha = 0.3;
  g.fillStyle = "#000";
  g.beginPath();
  g.ellipse(cx, feetY + 3, 20, 4, 0, 0, 6.29);
  g.fill();
  g.globalAlpha = 1;

  // aura pulsante (cor do chefe)
  if (!reduce) {
    g.globalAlpha = 0.1 + Math.abs(Math.sin(t * 0.005)) * 0.12;
    g.fillStyle = info.color;
    g.beginPath();
    g.ellipse(cx, feetY - 22, 28, 26, 0, 0, 6.29);
    g.fill();
    g.globalAlpha = 1;
  }

  (RENDER[info.shape] ?? drawShadow)(R, cx, Math.round(feetY), t, reduce, info.color);
}
