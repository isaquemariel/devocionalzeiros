// ============================================================================
// ÊXODO 25–26 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 25–26 — O MODELO DO SANTUÁRIO: no alto do monte, na glória, Deus mostra a
// Moisés o "modelo" do tabernáculo e dita cada peça — a oferta voluntária, a
// ARCA do testemunho com os querubins e o propiciatório (de onde Ele falará), a
// MESA dos pães, o CANDELABRO de ouro de sete lâmpadas; e depois as cortinas, as
// tábuas, o VÉU que separa o santo do santíssimo, e a porta da tenda.
//
// A VOZ DE DEUS (regra do projeto): Moisés está no monte, na nuvem e no fogo; a
// ordem vem do céu, SEM figura — `by: "deus"`, com glória alta. Cada peça aparece
// como um "modelo" revelado no cume (ark, lampstand, tenda, querubins), à medida
// que a voz a descreve.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// Modelos revelados no cume (na glória). Cada seção troca o objeto central.
const OFERTAS: StagePropSpec[] = [
  { ...P("crate", -40, 0.9, undefined, 0.55), tag: "oferta-alcada" },
  P("amphora", 40, 0.85, undefined, 0.58),
  P("crate", 120, 0.8, undefined, 0.5),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("grass", -120, 0.78, undefined, 0.82),
];
const ARCA: StagePropSpec[] = [
  { ...P("ark", 0, 1.15, undefined, 0.42), tag: "arca-testemunho" },
  { ...P("cherub", -66, 0.8, undefined, 0.34) },
  { ...P("cherub", 66, 0.8, undefined, 0.34) },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const MESA: StagePropSpec[] = [
  { ...P("stall", 0, 1.1, undefined, 0.44), tag: "mesa-proposicao" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("grass", -40, 0.78, undefined, 0.82),
];
const CANDELABRO: StagePropSpec[] = [
  { ...P("menorah", 0, 1.35, undefined, 0.42), tag: "candelabro-ouro" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const TABERNACULO: StagePropSpec[] = [
  { ...P("tent", 0, 1.55, undefined, 0.36), tag: "tabernaculo" },
  P("tent", -150, 1.05, undefined, 0.5),
  P("tent", 150, 1.05, undefined, 0.5),
  P("rock", -320, 1, undefined, 0.5),
  P("rock", 320, 0.95, undefined, 0.52),
];
const VEU: StagePropSpec[] = [
  { ...P("tent", 0, 1.55, undefined, 0.36), tag: "tabernaculo" },
  { ...P("door", 60, 1, undefined, 0.44), tag: "veu-santissimo" },
  { ...P("ark", -70, 0.7, undefined, 0.5), tag: "arca-testemunho" },
  P("rock", -320, 1, undefined, 0.5),
  P("rock", 320, 0.95, undefined, 0.52),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 25
  // A oferta voluntária → a arca do testemunho e os querubins → a mesa dos pães →
  // e o candelabro de ouro de sete lâmpadas. Tudo conforme o modelo do monte.
  25: {
    start: { terrain: "mountain", night: 0.22, glory: 0.8, storm: 0, fire: 0.5, verdure: 0.2 },
    beats: [
      b(1, { set: "monte", cast: [C("moises", -140, "kneel", { dy: 0.5, facing: 1 })], props: OFERTAS, env: { terrain: "mountain", glory: 0.82, fire: 0.5, night: 0.2 } }), // o Senhor fala a Moisés
      b(2, { by: "deus", env: { glory: 0.8 } }), // "que me tragam uma oferta alçada, de todo o que tiver coração voluntário"
      b(3, { by: "deus" }), // "ouro, e prata, e cobre"
      b(4, { by: "deus" }), // "azul, púrpura, carmesim, linho fino e pêlos de cabras"
      b(5, { by: "deus" }), // "peles de carneiros e de texugos, e madeira de acácia"
      b(6, { by: "deus" }), // "azeite para a luz, especiarias para a unção e para o incenso"
      b(7, { by: "deus" }), // "pedras de ônix para o éfode e para o peitoral"
      b(8, { by: "deus", env: { glory: 0.9 } }), // "e me farão um santuário, e habitarei no meio deles"
      b(9, { by: "deus", env: { glory: 0.85 } }), // "conforme ao modelo do tabernáculo que eu te mostrar, assim o fareis"
      b(10, { by: "deus", props: ARCA, env: { glory: 0.9, fire: 0.4 } }), // "farão uma arca de madeira de acácia"
      b(11, { by: "deus" }), // "cobri-la-ás de ouro puro, com uma coroa de ouro ao redor"
      b(12, { by: "deus" }), // "fundirás quatro argolas de ouro para os seus quatro cantos"
      b(13, { by: "deus" }), // "farás varas de acácia cobertas de ouro"
      b(14, { by: "deus" }), // "porás as varas nas argolas, para se levar a arca"
      b(15, { by: "deus" }), // "as varas ficarão nas argolas, não se tirarão dela"
      b(16, { by: "deus", env: { glory: 0.92 } }), // "porás na arca o testemunho que eu te darei"
      b(17, { by: "deus" }), // "farás um propiciatório de ouro puro"
      b(18, { by: "deus", env: { glory: 0.95 } }), // "farás dois querubins de ouro batido nas extremidades do propiciatório"
      b(19, { by: "deus" }), // "um querubim numa extremidade e o outro na outra, de uma só peça"
      b(20, { by: "deus", env: { glory: 0.96 } }), // "os querubins cobrirão com as asas o propiciatório, face a face"
      b(21, { by: "deus" }), // "porás o propiciatório sobre a arca, com o testemunho dentro"
      b(22, { by: "deus", env: { glory: 1 } }), // "ali virei a ti e falarei contigo de cima do propiciatório, entre os querubins"
      b(23, { by: "deus", props: MESA, env: { glory: 0.85, fire: 0.4 } }), // "farás uma mesa de madeira de acácia"
      b(24, { by: "deus" }), // "cobri-la-ás de ouro puro, com uma coroa de ouro ao redor"
      b(25, { by: "deus" }), // "farás uma moldura ao redor, com uma coroa de ouro"
      b(26, { by: "deus" }), // "farás quatro argolas de ouro nos seus quatro pés"
      b(27, { by: "deus" }), // "as argolas serão lugares para os varais, para se levar a mesa"
      b(28, { by: "deus" }), // "farás os varais de acácia cobertos de ouro"
      b(29, { by: "deus" }), // "farás os seus pratos, colheres, cobertas e tigelas de ouro puro"
      b(30, { by: "deus", env: { glory: 0.9 } }), // "sobre a mesa porás o pão da proposição perante a minha face perpetuamente"
      b(31, { by: "deus", props: CANDELABRO, env: { glory: 0.9, fire: 0.55 } }), // "farás um candelabro de ouro puro batido"
      b(32, { by: "deus" }), // "dos seus lados sairão seis hastes, três de cada lado"
      b(33, { by: "deus" }), // "em cada haste, três copos a modo de amêndoas, um botão e uma flor"
      b(34, { by: "deus" }), // "no candelabro haverá quatro copos a modo de amêndoas, com botões e flores"
      b(35, { by: "deus" }), // "um botão debaixo de cada par de hastes que dele saem"
      b(36, { by: "deus" }), // "tudo de uma só peça, obra batida de ouro puro"
      b(37, { by: "deus", env: { glory: 0.95, fire: 0.7 } }), // "farás sete lâmpadas, para iluminar defronte dele"
      b(38, { by: "deus" }), // "os espevitadores e apagadores serão de ouro puro"
      b(39, { by: "deus" }), // "de um talento de ouro puro os farás, com todos estes vasos"
      b(40, { by: "deus", env: { glory: 0.92 } }), // "atenta que o faças conforme ao modelo que te foi mostrado no monte"
    ],
  },

  // ------------------------------------------------------------------ Êx 26
  // As dez cortinas e a tenda → as tábuas e as bases → o véu que separa o santo do
  // santíssimo (a arca dentro) → e a cortina da porta da tenda.
  26: {
    start: { terrain: "mountain", night: 0.22, glory: 0.82, storm: 0, fire: 0.45, verdure: 0.2 },
    beats: [
      b(1, { set: "monte", cast: [C("moises", -140, "kneel", { dy: 0.5, facing: 1 })], props: TABERNACULO, env: { terrain: "mountain", glory: 0.85, fire: 0.45, night: 0.2 } }), // "o tabernáculo farás de dez cortinas de linho fino, azul, púrpura e carmesim, com querubins"
      b(2, { by: "deus" }), // "cada cortina de vinte e oito côvados de comprimento e quatro de largura"
      b(3, { by: "deus" }), // "cinco cortinas se enlaçarão umas às outras, e as outras cinco também"
      b(4, { by: "deus" }), // "farás laçadas de azul na orla de cada cortina, na juntura"
      b(5, { by: "deus" }), // "cinqüenta laçadas em cada cortina, presas uma à outra"
      b(6, { by: "deus", env: { glory: 0.8 } }), // "farás cinqüenta colchetes de ouro, e será um só tabernáculo"
      b(7, { by: "deus" }), // "farás cortinas de pêlos de cabras para tenda sobre o tabernáculo: onze"
      b(8, { by: "deus" }), // "cada cortina de trinta côvados de comprimento e quatro de largura"
      b(9, { by: "deus" }), // "juntarás cinco à parte e seis à parte, dobrando a sexta à frente"
      b(10, { by: "deus" }), // "farás cinqüenta laçadas na borda de cada cortina, na juntura"
      b(11, { by: "deus" }), // "farás cinqüenta colchetes de cobre, e ajuntarás a tenda para que seja uma"
      b(12, { by: "deus" }), // "o que sobejar das cortinas penderá às costas do tabernáculo"
      b(13, { by: "deus" }), // "um côvado de cada lado penderá aos lados, para cobri-lo"
      b(14, { by: "deus" }), // "farás uma coberta de peles de carneiro tintas de vermelho, e outra de texugo"
      b(15, { by: "deus", env: { glory: 0.8 } }), // "farás as tábuas para o tabernáculo, de acácia, postas verticalmente"
      b(16, { by: "deus" }), // "cada tábua de dez côvados de comprimento e um e meio de largura"
      b(17, { by: "deus" }), // "cada tábua terá dois encaixes travados um com o outro"
      b(18, { by: "deus" }), // "vinte tábuas para o lado meridional, para o sul"
      b(19, { by: "deus" }), // "quarenta bases de prata debaixo das vinte tábuas"
      b(20, { by: "deus" }), // "vinte tábuas ao outro lado, para o norte"
      b(21, { by: "deus" }), // "com as suas quarenta bases de prata"
      b(22, { by: "deus" }), // "ao lado do ocidente farás seis tábuas"
      b(23, { by: "deus" }), // "duas tábuas para os cantos do tabernáculo, de ambos os lados"
      b(24, { by: "deus" }), // "por baixo e por cima se ajuntarão numa argola"
      b(25, { by: "deus" }), // "serão oito tábuas com dezesseis bases de prata"
      b(26, { by: "deus" }), // "farás cinco travessas de acácia para as tábuas de um lado"
      b(27, { by: "deus" }), // "e cinco travessas para cada um dos outros lados, para o ocidente"
      b(28, { by: "deus" }), // "a travessa central passará de uma extremidade à outra"
      b(29, { by: "deus", env: { glory: 0.85 } }), // "cobrirás de ouro as tábuas, as argolas e as travessas"
      b(30, { by: "deus", env: { glory: 0.88 } }), // "levantarás o tabernáculo conforme ao modelo que te foi mostrado no monte"
      b(31, { by: "deus", props: VEU, env: { glory: 0.92, fire: 0.4 } }), // "farás um véu de azul, púrpura, carmesim e linho, com querubins"
      b(32, { by: "deus" }), // "colocá-lo-ás sobre quatro colunas de acácia cobertas de ouro"
      b(33, { by: "deus", env: { glory: 0.95 } }), // "o véu vos fará separação entre o santuário e o lugar santíssimo"
      b(34, { by: "deus" }), // "porás o propiciatório sobre a arca no lugar santíssimo"
      b(35, { by: "deus" }), // "a mesa fora do véu, e o candelabro defronte dela, ao sul"
      b(36, { by: "deus", env: { glory: 0.85 } }), // "farás para a porta da tenda uma cortina de azul, púrpura e carmesim"
      b(37, { by: "deus" }), // "farás cinco colunas de acácia cobertas de ouro, com cinco bases de cobre"
    ],
  },
};
