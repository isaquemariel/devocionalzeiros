// ============================================================================
// ÊXODO 31–32 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 31 — OS ARTÍFICES E O SÁBADO: Deus chama pelo nome a Bezalel e Aoliabe,
// enchendo-os do seu Espírito para toda a obra do santuário; reafirma o sábado
// como sinal perpétuo; e dá a Moisés as duas TÁBUAS do testemunho, escritas pelo
// dedo de Deus.
//
// Êx 32 — O BEZERRO DE OURO: enquanto Moisés tarda no monte, o povo faz um
// bezerro de fundição e o adora. Deus se ira; Moisés intercede, desce, quebra as
// tábuas ao pé do monte, queima o ídolo — e os filhos de Levi se põem do lado do
// Senhor. Moisés torna a subir para pedir perdão pelo povo.
//
// A VOZ DE DEUS (regra do projeto): sem mediador visível, Deus fala do céu a
// Moisés — `by: "deus"`, glória no ambiente, SEM figura. O bezerro é ídolo
// (altar-bezerro); Faraó não entra aqui; Arão e o povo respondem por si.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// O MONTE (Sinai em glória e fogo) e a oficina dos modelos santos.
const MONTE: StagePropSpec[] = [
  { ...P("rock", 0, 1.75, undefined, 0.24), tag: "monte-sinai" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("bush", -150, 0.75, undefined, 0.44),
  P("grass", -40, 0.78, undefined, 0.82),
];
const OFICINA: StagePropSpec[] = [
  { ...P("menorah", 100, 1.05, undefined, 0.44), tag: "candelabro-ouro" },
  { ...P("ark", -90, 0.85, undefined, 0.46), tag: "arca-testemunho" },
  P("rock", 0, 1.7, undefined, 0.24),
  P("rock", -320, 1, undefined, 0.5),
  P("rock", 320, 0.95, undefined, 0.52),
];
const TABUAS: StagePropSpec[] = [
  { ...P("scroll", 50, 0.85, undefined, 0.5), tag: "tabuas-testemunho" },
  P("rock", 0, 1.7, undefined, 0.24),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];

// ---------------------------------------------------------------------------
// O ARRAIAL ao pé do monte e o ALTAR do bezerro de ouro (o ídolo de fundição).
const ARRAIAL: StagePropSpec[] = [
  P("tent", -240, 1.1, undefined, 0.14),
  P("tent", -160, 0.95, undefined, 0.24),
  P("tent", 200, 1.05, undefined, 0.16),
  P("tent", 280, 0.9, undefined, 0.3),
  P("palm", 60, 0.9, undefined, 0.12),
  P("rock", -320, 0.9, undefined, 0.5),
  P("grass", -40, 0.85, undefined, 0.8),
];
const BEZERRO: StagePropSpec[] = [
  { ...P("altar", 0, 1.2, 0.6, 0.42), tag: "altar-bezerro" },
  P("tent", -230, 1, undefined, 0.2),
  P("tent", 230, 1, undefined, 0.22),
  P("palm", 130, 0.85, undefined, 0.14),
  P("rock", -320, 0.9, undefined, 0.5),
  P("grass", -70, 0.8, undefined, 0.8),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 31
  // Bezalel e Aoliabe cheios do Espírito para a obra → o sábado como sinal perpétuo
  // → e as duas tábuas do testemunho, escritas pelo dedo de Deus.
  31: {
    start: { terrain: "mountain", night: 0.18, glory: 0.82, storm: 0, fire: 0.5, verdure: 0.2 },
    beats: [
      b(1, { set: "oficina", cast: [C("moises", -140, "kneel", { dy: 0.5, facing: 1 }), C("homem", 40, "stand", { dy: 0.5, id: "bezalel", facing: -1 })], props: OFICINA, env: { terrain: "mountain", glory: 0.85, fire: 0.5, night: 0.16 } }), // o Senhor fala a Moisés
      b(2, { by: "deus", env: { glory: 0.88 } }), // "tenho chamado por nome a Bezalel, filho de Uri, da tribo de Judá"
      b(3, { by: "deus", env: { glory: 0.92 } }), // "e o enchi do Espírito de Deus, de sabedoria e entendimento, em todo o lavor"
      b(4, { by: "deus" }), // "para elaborar projetos e trabalhar em ouro, prata e cobre"
      b(5, { by: "deus" }), // "e em lapidar pedras, e em entalhes de madeira, para todo o lavor"
      b(6, { by: "deus", cast: [C("homem", 40, "stand", { dy: 0.5, id: "bezalel", facing: -1 }), C("homem", 120, "stand", { dy: 0.5, id: "aoliabe", facing: -1 }), C("moises", -140, "stand", { dy: 0.5, facing: 1 })] }), // "pus com ele a Aoliabe, e dei sabedoria a todos os hábeis"
      b(7, { by: "deus" }), // "para fazerem a tenda, a arca, o propiciatório e todos os pertences"
      b(8, { by: "deus" }), // "a mesa, o candelabro de ouro e o altar do incenso"
      b(9, { by: "deus" }), // "o altar do holocausto, com os utensílios, e a pia com a sua base"
      b(10, { by: "deus" }), // "as vestes do ministério e as vestes sagradas de Arão e seus filhos"
      b(11, { by: "deus", env: { glory: 0.88 } }), // "o azeite da unção e o incenso aromático: farão conforme a tudo o que mandei"
      b(12, { set: "monte", cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], props: MONTE, env: { terrain: "mountain", glory: 0.85, fire: 0.45, night: 0.16 } }), // o Senhor fala a Moisés
      b(13, { by: "deus", env: { glory: 0.9 } }), // "guardareis os meus sábados: é sinal entre mim e vós, que eu sou o Senhor que vos santifica"
      b(14, { by: "deus" }), // "guardareis o sábado, porque santo é; quem o profanar certamente morrerá"
      b(15, { by: "deus" }), // "seis dias se trabalhará; o sétimo é o sábado do descanso, santo ao Senhor"
      b(16, { by: "deus" }), // "os filhos de Israel guardarão o sábado por aliança perpétua"
      b(17, { by: "deus", env: { glory: 0.92 } }), // "é sinal para sempre; porque em seis dias fez o Senhor os céus e a terra, e ao sétimo descansou"
      b(18, { set: "tabuas", cast: [C("moises", -30, "raise", { dy: 0.5, facing: 1 })], props: TABUAS, env: { terrain: "mountain", glory: 0.95, fire: 0.55, night: 0.14 } }), // deu a Moisés as duas tábuas do testemunho, escritas pelo dedo de Deus
    ],
  },

  // ------------------------------------------------------------------ Êx 32
  // O bezerro que o povo exige e Arão faz → a festa e a corrupção → a ira do
  // Senhor e a intercessão de Moisés → a descida, as tábuas quebradas, o ídolo
  // destruído → os filhos de Levi ao lado do Senhor → e o novo clamor por perdão.
  32: {
    start: { terrain: "desert", night: 0.28, glory: 0.4, storm: 0, fire: 0, verdure: 0.35 },
    beats: [
      b(1, { by: "multidao", q: "e disse-lhe: ", set: "arraial", cast: [C("arao", 60, "stand", { dy: 0.5, facing: -1 }), C("multidao", -40, "point", { dy: 0.5 }), C("multidao", -140, "stand", { scale: 0.9, dy: 0.54, id: "povo2" })], props: ARRAIAL, env: { terrain: "desert", glory: 0.25, night: 0.24 } }), // "faze-nos deuses que vão adiante de nós; não sabemos o que sucedeu a Moisés"
      b(2, { by: "arao", q: "E Arão lhes disse: ", cast: [C("arao", 60, "point", { dy: 0.5, facing: -1 }), C("multidao", -40, "stand", { dy: 0.5 })] }), // "arrancai os pendentes de ouro das vossas mulheres e filhos, e trazei-mos"
      b(3, { cast: [C("multidao", -40, "raise", { dy: 0.5 }), C("multidao", 20, "stand", { scale: 0.9, dy: 0.54, id: "povo2" }), C("arao", 90, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.2 } }), // o povo arranca os pendentes de ouro e os traz a Arão
      b(4, { by: "multidao", q: "Então disseram: ", set: "bezerro", cast: [C("arao", 40, "stand", { dy: 0.5, facing: -1 }), C("multidao", -60, "raise", { dy: 0.5 }), C("multidao", -160, "point", { scale: 0.9, dy: 0.54, id: "povo2" })], props: BEZERRO, env: { terrain: "desert", glory: 0.12, night: 0.3, fire: 0.35 } }), // Arão funde o bezerro: "Este é teu deus, ó Israel, que te tirou do Egito"
      b(5, { by: "arao", q: "e disse: ", cast: [C("arao", 30, "raise", { dy: 0.5, facing: 1 }), C("multidao", -80, "stand", { dy: 0.5 })], env: { fire: 0.4 } }), // Arão edifica um altar diante dele: "Amanhã será festa ao Senhor"
      b(6, { cast: [C("multidao", -60, "raise", { dy: 0.5 }), C("multidao", 20, "raise", { scale: 0.9, dy: 0.54, id: "povo2" }), C("multidao", 120, "kneel", { scale: 0.85, dy: 0.6, id: "povo3" })], env: { fire: 0.5, glory: 0.1, night: 0.28 } }), // madrugam, oferecem, comem, bebem e levantam-se a folgar
      b(7, { by: "deus", q: "Então disse o Senhor a Moisés: ", set: "monte", cast: [C("moises", -20, "stand", { dy: 0.5, facing: 1 })], props: MONTE, env: { terrain: "mountain", glory: 0.7, fire: 0.6, night: 0.24 } }), // "vai, desce; o teu povo se tem corrompido"
      b(8, { by: "deus", env: { fire: 0.7, storm: 0.3 } }), // "fizeram para si um bezerro de fundição e se inclinaram a ele"
      b(9, { by: "deus", q: "Disse mais o Senhor a Moisés: " }), // "tenho visto este povo, e eis que é de dura cerviz"
      b(10, { by: "deus", env: { fire: 0.85, storm: 0.45, glory: 0.6 } }), // "deixa-me, para que o meu furor o consuma; e farei de ti uma grande nação"
      b(11, { by: "moises", q: "Moisés, porém, suplicou ao Senhor seu Deus e disse: ", cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], env: { glory: 0.65, fire: 0.6, storm: 0.25 } }), // "ó Senhor, por que se acende o teu furor contra o teu povo?"
      b(12, { by: "moises", env: { glory: 0.7 } }), // "torna-te do furor da tua ira, e arrepende-te deste mal contra o teu povo"
      b(13, { by: "moises", env: { glory: 0.75 } }), // "lembra-te de Abraão, Isaque e Israel, e do juramento da descendência como as estrelas"
      b(14, { env: { glory: 0.82, fire: 0.4, storm: 0 } }), // o Senhor arrependeu-se do mal que dissera que faria ao seu povo
      b(15, { set: "descida", cast: [C("moises", -60, "walk", { dy: 0.44, facing: 1 })], props: TABUAS, env: { terrain: "mountain", glory: 0.6, fire: 0.4, night: 0.22 } }), // Moisés desce do monte com as duas tábuas escritas de ambos os lados
      b(16, { env: { glory: 0.7 } }), // as tábuas eram obra de Deus, e a escritura era a escritura de Deus
      b(17, { by: "homem", q: "disse a Moisés: ", cast: [C("homem", 40, "stand", { dy: 0.5, id: "josue", facing: -1 }), C("moises", -60, "walk", { dy: 0.46, facing: 1 })], env: { glory: 0.55 } }), // Josué ouve o alarido: "Alarido de guerra há no arraial"
      b(18, { by: "moises", q: "Porém ele respondeu: ", cast: [C("moises", -40, "stand", { dy: 0.5, facing: 1 }), C("homem", 30, "stand", { dy: 0.5, id: "josue", facing: -1 })] }), // "não é alarido de guerra, mas o alarido dos que cantam, eu ouço"
      b(19, { set: "bezerro", cast: [C("moises", -60, "raise", { dy: 0.5, facing: 1 }), C("multidao", 60, "raise", { dy: 0.5 }), C("multidao", 150, "raise", { scale: 0.9, dy: 0.54, id: "povo2" }), C("arao", 20, "stand", { dy: 0.5, facing: 1 })], props: BEZERRO, env: { terrain: "desert", storm: 0.5, fire: 0.5, glory: 0.3, night: 0.3 } }), // Moisés vê o bezerro e as danças, e arremessa as tábuas, quebrando-as ao pé do monte
      b(20, { cast: [C("moises", -20, "point", { dy: 0.5, facing: 1 }), C("multidao", 90, "bow", { dy: 0.5 })], env: { fire: 0.75, storm: 0.4, glory: 0.35 } }), // toma o bezerro, queima-o, mói-o em pó, e o dá a beber ao povo
      b(21, { by: "moises", q: "E Moisés perguntou a Arão: ", cast: [C("moises", -50, "point", { dy: 0.5, facing: 1 }), C("arao", 30, "bow", { dy: 0.5, facing: 1 })], env: { fire: 0.4, storm: 0.2 } }), // "que te tem feito este povo, que sobre ele trouxeste tamanho pecado?"
      b(22, { by: "arao", q: "Então respondeu Arão: ", cast: [C("arao", 30, "point", { dy: 0.5, facing: 1 }), C("moises", -50, "stand", { dy: 0.5, facing: 1 })] }), // "não se acenda a ira do meu senhor; tu sabes que este povo é inclinado ao mal"
      b(23, { by: "arao" }), // "eles me disseram: faze-nos um deus que vá adiante de nós"
      b(24, { by: "arao", q: "Então eu lhes disse: " }), // "quem tem ouro, arranque-o; lancei-o no fogo, e saiu este bezerro"
      b(25, { cast: [C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("multidao", 40, "stand", { dy: 0.5 }), C("multidao", 130, "walk", { scale: 0.9, dy: 0.54, id: "povo2" })], env: { storm: 0.3, glory: 0.25, night: 0.32 } }), // Moisés vê o povo desenfreado, para vergonha entre os inimigos
      b(26, { by: "moises", q: "e disse: ", set: "porta-arraial", cast: [C("moises", -70, "raise", { dy: 0.5, facing: 1 }), C("homem", 20, "stand", { dy: 0.5, id: "levita1", facing: 1 }), C("homem", 90, "stand", { dy: 0.52, id: "levita2", facing: 1 }), C("multidao", 180, "stand", { scale: 0.9, dy: 0.5, id: "povo2" })], props: ARRAIAL, env: { terrain: "desert", glory: 0.45, storm: 0.2, night: 0.28 } }), // Moisés na porta do arraial: "Quem é do Senhor, venha a mim"; os filhos de Levi se ajuntam
      b(27, { by: "moises", q: "E disse-lhes: Assim diz o Senhor Deus de Israel: ", cast: [C("moises", -70, "point", { dy: 0.5, facing: 1 }), C("homem", 10, "raise", { dy: 0.5, id: "levita1", facing: 1 }), C("homem", 80, "raise", { dy: 0.52, id: "levita2", facing: 1 })], env: { storm: 0.35, glory: 0.4 } }), // "cada um ponha a espada sobre a coxa, e passai pelo arraial de porta em porta"
      b(28, { cast: [C("homem", 10, "raise", { dy: 0.5, id: "levita1", facing: 1 }), C("homem", 90, "stand", { dy: 0.52, id: "levita2", facing: 1 }), C("multidao", 160, "lie", { scale: 0.9, dy: 0.56, id: "povo2" })], env: { storm: 0.45, night: 0.4, glory: 0.25 } }), // os filhos de Levi fazem conforme a palavra; caem uns três mil homens
      b(29, { by: "moises", q: "Porquanto Moisés tinha dito: ", cast: [C("moises", -40, "raise", { dy: 0.5, facing: 1 }), C("homem", 40, "stand", { dy: 0.5, id: "levita1", facing: 1 })], env: { storm: 0.2, glory: 0.4 } }), // "consagrai hoje as vossas mãos ao Senhor, para que vos conceda uma bênção"
      b(30, { by: "moises", q: "Moisés disse ao povo: ", cast: [C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("multidao", 40, "bow", { dy: 0.5 })], env: { glory: 0.45, night: 0.3, storm: 0 } }), // "vós cometestes grande pecado; subirei ao Senhor, para fazer propiciação"
      b(31, { by: "moises", q: "e disse: ", set: "monte", cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], props: MONTE, env: { terrain: "mountain", glory: 0.6, fire: 0.4, night: 0.2 } }), // Moisés torna ao Senhor: "este povo cometeu grande pecado, fazendo deuses de ouro"
      b(32, { by: "moises", env: { glory: 0.65 } }), // "perdoa o seu pecado; se não, risca-me, peço-te, do teu livro"
      b(33, { by: "deus", q: "Então disse o Senhor a Moisés: ", env: { glory: 0.7 } }), // "aquele que pecar contra mim, a este riscarei do meu livro"
      b(34, { by: "deus", env: { glory: 0.68, fire: 0.4 } }), // "conduze este povo; o meu anjo irá adiante de ti; mas visitarei neles o seu pecado"
      b(35, { env: { storm: 0.35, glory: 0.3, night: 0.34, fire: 0.3 } }), // o Senhor feriu o povo, por causa do bezerro que Arão formara
    ],
  },
};
