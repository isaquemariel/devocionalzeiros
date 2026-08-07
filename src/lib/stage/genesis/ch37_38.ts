// ============================================================================
// GÊNESIS 37–38 — roteiro do modo CENA VIVA (força-tarefa AT, onda 2).
//
// Gn 37 — A TÚNICA E A CISTERNA. O capítulo em que uma família se quebra por
// causa de um casaco. (1) O PASTOREIO (v.1-2): Jacó habita a terra das
// peregrinações, e o menino de dezessete anos vai ao campo com os irmãos —
// e volta com "más notícias deles a seu pai": o palco já nasce torto.
// (2) A TÚNICA (v.3-4): o amor preferido do velho vira tecido, e o tecido
// vira ódio — José recebe glow 0.2 (o favorito brilha) enquanto a noite sobe
// a 0.2 e os irmãos "não podiam falar com ele pacificamente". (3) OS MOLHOS
// (v.5-8): quatro FEIXES entram no corredor de extras e, no beat 7, o palco
// FADE para dentro do sonho — o molho de José em pé no centro, os outros
// pequenos e curvados ao redor. (4) O SOL, A LUA E ONZE ESTRELAS (v.9-11):
// noite 0.55 e o céu inteiro se inclinando; até Jacó repreende — mas
// "guardava este negócio no seu coração". (5) A ESTRADA DE DOTÃ (v.12-17):
// deserto, José sozinho, "andava errante pelo campo", e um desconhecido
// aponta o caminho da própria desgraça. (6) A CONSPIRAÇÃO (v.18-20): "Eis lá
// vem o sonhador-mor!" — night 0.35, storm 0.2, e a COVA (well) entra no
// corredor de extras. (7) RÚBEN (v.21-22): a única voz que segura a mão do
// irmão. (8) A CISTERNA (v.23-25): a túnica arrancada, José no fundo do poço
// SECO ("não havia água nela") em dy baixo — e o beat mais cruel da Bíblia:
// eles ASSENTAM-SE A COMER PÃO ao lado do buraco onde o irmão grita.
// (9) VINTE MOEDAS DE PRATA (v.25-28): a caravana de Gileade, os camelos, o
// menino levado ao Egito. (10) O DESESPERO DE RÚBEN (v.29-30): a cova vazia,
// as vestes rasgadas, "e eu aonde irei?". (11) A TÚNICA ENSANGUENTADA
// (v.31-35): night 0.6, Jacó em pose bow, saco sobre os lombos, luto
// inconsolável — "com choro hei de descer ao meu filho". (12) O EGITO
// (v.36): a cidade, o rio, Potifar — e uma fresta de glória 0.15, porque a
// história não acabou.
//
// Gn 38 — JUDÁ E TAMAR. Capítulo delicado, encenado com DECORO ABSOLUTO: o
// que o texto narra, o palco NÃO encena. Nos versículos íntimos (9, 14-19)
// o elenco fica IMÓVEL e sóbrio — a dramaturgia é só ambiente (a noite
// sobe). A força do capítulo é moral: Judá desce, casa, gera três filhos;
// Er e Onã morrem; Tamar é despachada para a casa do pai e ESQUECIDA. À
// ENTRADA DAS DUAS FONTES (Enaim) ela cobre o rosto — e o penhor (o SELO, o
// CORDÃO e o CAJADO, aqui scroll + crate no corredor de extras) sai da mão
// de Judá para a mão dela. Vem a hipocrisia: "Tirai-a fora para que seja
// queimada" (storm 0.4, night 0.5, o fogo já aceso no palco) — e vem a
// REVIRAVOLTA: ela devolve as provas e o homem que sentenciou reconhece:
// "Mais justa é ela do que eu" (o fogo APAGA nos props, storm cai a 0,
// glory 0.3 — justiça é luz). Fecha no parto dos gêmeos e no FIO ENCARNADO:
// Perez, de quem vem Davi — e o Cristo (glory 0.45).
//
// DEUS NUNCA É DESENHADO: em 38:7,10 "o Senhor o matou" — nada se encena,
// nenhuma figura; o ator apenas SAI de cena e o ambiente escurece. A
// providência de 37 (o sonho que se cumprirá) é glória contida, nunca vulto.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------- Gn 37: sets
// CANAÃ (37:1-2) — a terra das peregrinações do pai: pasto largo, tendas ao
// fundo, o poço da aguada e o horizonte aberto para onde o rebanho anda.
// Corredor de extras (dx -100..-190) LIVRE, como manda o padrão de palco.
const CANAA: StagePropSpec[] = [
  P("tent", -300, 1.05, undefined, 0.08),
  P("tent", 268, 0.9, undefined, 0.05),
  P("tree", -250, 1.2, undefined, 0.3),
  P("tree", 200, 1.1, undefined, 0.14),
  P("palm", 316, 1.0, undefined, 0.32),
  P("well", 96, 1.0, undefined, 0.62),
  P("rock", -60, 0.6, undefined, 0.5),
  P("rock", 250, 0.9, undefined, 0.6),
  P("bush", -290, 0.9, undefined, 0.55),
  P("bush", 150, 0.85, undefined, 0.72),
  P("grass", -220, 1, undefined, 0.8),
  P("grass", -20, 1.05, undefined, 0.72),
  P("grass", 60, 1, undefined, 0.86),
  P("grass", 300, 0.95, undefined, 0.68),
];

// A CASA DE ISRAEL (37:3-14) — o acampamento do velho: a tenda grande do pai
// no centro do fundo, a fogueira da família, os cântaros e os fardos.
const TENDAS: StagePropSpec[] = [
  P("tent", -40, 1.3, undefined, 0.06),      // a tenda de Israel (a maior)
  P("tent", 210, 1.0, undefined, 0.1),
  P("campfire", 60, 1.0, 1, 0.66),
  P("tree", -280, 1.15, undefined, 0.2),
  P("tree", 300, 1.0, undefined, 0.42),
  P("crate", 240, 0.9, undefined, 0.6),
  P("amphora", 275, 0.85, undefined, 0.72),
  P("amphora", -300, 0.8, undefined, 0.62),
  P("bush", 140, 0.9, undefined, 0.3),
  P("rock", -70, 0.55, undefined, 0.52),
  P("grass", -210, 1, undefined, 0.82),
  P("grass", 20, 1, undefined, 0.85),
  P("grass", 180, 0.95, undefined, 0.75),
];

// OS MOLHOS DO SONHO entrando no acampamento (37:6) — o feixe de José grande
// e em pé; os outros menores, mais fundos, "rodeando".
const MOLHOS: StagePropSpec[] = [
  P("sheaf", -120, 1.25, undefined, 0.14),   // o meu molho — em pé
  P("sheaf", -158, 0.85, undefined, 0.3),
  P("sheaf", -186, 0.8, undefined, 0.46),
  P("sheaf", -92, 0.8, undefined, 0.28),
];

// DENTRO DO SONHO DOS MOLHOS (37:7) — campo de ceifa: o molho de José
// ENORME no centro; os quatro molhos dos irmãos pequenos e curvados.
const SONHO_MOLHOS: StagePropSpec[] = [
  P("sheaf", 0, 1.55, undefined, 0.2),       // o meu molho se levantava e ficava em pé
  P("sheaf", -112, 0.75, undefined, 0.44),   // e os vossos molhos o rodeavam…
  P("sheaf", -52, 0.7, undefined, 0.62),
  P("sheaf", 74, 0.7, undefined, 0.58),
  P("sheaf", 126, 0.75, undefined, 0.4),
  P("tree", -300, 1.15, undefined, 0.1),
  P("tree", 292, 1.05, undefined, 0.16),
  P("grass", -240, 1, undefined, 0.8),
  P("grass", 196, 0.95, undefined, 0.84),
  P("bush", 250, 0.9, undefined, 0.66),
];

// DENTRO DO SONHO DOS ASTROS (37:9) — "o sol, e a lua, e onze estrelas se
// inclinavam a mim". O céu INTEIRO se curva sobre o menino: o SOL e a LUA
// como discos reais no alto (props de CÉU, sky:true → dy é ALTURA: 0 horizonte
// → 1 zênite) e um campo de estrelas cintilando, com onze faróis maiores
// (as estrelas dos irmãos) descendo em arco na direção de José.
const SONHO_ASTROS: StagePropSpec[] = [
  { kind: "sun", dx: -156, scale: 1.25, dy: 0.82, sky: true },     // o sol (o pai)
  { kind: "moon", dx: 172, scale: 1.1, dy: 0.74, sky: true },      // a lua (a mãe)
  { kind: "starfield", dx: 0, dy: 0.88, scale: 1.2, sky: true },   // o firmamento noturno
  { kind: "star", dx: -262, scale: 0.66, dy: 0.58, sky: true },    // …e ONZE estrelas
  { kind: "star", dx: -196, scale: 0.58, dy: 0.72, sky: true },
  { kind: "star", dx: -108, scale: 0.7, dy: 0.6, sky: true },
  { kind: "star", dx: -52, scale: 0.6, dy: 0.86, sky: true },
  { kind: "star", dx: 44, scale: 0.72, dy: 0.64, sky: true },
  { kind: "star", dx: 108, scale: 0.58, dy: 0.9, sky: true },
  { kind: "star", dx: 236, scale: 0.66, dy: 0.6, sky: true },
  { kind: "star", dx: 300, scale: 0.56, dy: 0.78, sky: true },
  // chão do sonho: um campo aberto sob o céu que se inclina
  P("tree", 306, 1.0, undefined, 0.34),
  P("bush", -300, 0.85, undefined, 0.6),
  P("grass", -212, 0.95, undefined, 0.82),
  P("grass", 40, 0.9, undefined, 0.86),
  P("grass", 200, 0.95, undefined, 0.72),
];

// A ESTRADA DE DOTÃ (37:15-31) — deserto de pedra, mato ralo, uma tenda
// distante. O corredor -100..-190 fica vazio de propósito: é ali que a COVA
// se abre no v.20 e engole o menino no v.24.
const DOTA: StagePropSpec[] = [
  P("rock", -270, 1.1, undefined, 0.2),
  P("rock", -55, 0.6, undefined, 0.5),
  P("rock", 230, 1.0, undefined, 0.3),
  P("rock", 312, 1.2, undefined, 0.62),
  P("palm", 268, 1.1, undefined, 0.08),
  P("tent", 40, 0.9, undefined, 0.03),       // Dotã ao longe
  P("bush", -304, 0.85, undefined, 0.5),
  P("bush", 130, 0.9, undefined, 0.7),
  P("grass", -228, 0.95, undefined, 0.8),
  P("grass", 76, 0.9, undefined, 0.85),
  P("grass", 190, 0.95, undefined, 0.72),
];

// A COVA do deserto: poço SECO, "não havia água nela".
const COVA: StagePropSpec = { ...P("well", -140, 1.15, undefined, 0.18), tag: "cisterna-jose" };
// o pão dos irmãos ao lado do buraco (v.25)
const PAO = P("campfire", 60, 1.0, 1, 0.6);

// O EGITO (37:36) — a cidade grande do Nilo: torres, palmeiras, o rio, a
// feira. José entra por esta porta e o capítulo fecha em suspense.
const EGITO: StagePropSpec[] = [
  P("river", 0, 1.1, undefined, 0.16),       // o Nilo cortando o fundo
  P("tower", -232, 1.2, undefined, 0.1),
  P("tower", 214, 1.3, undefined, 0.06),
  P("palm", -292, 1.2, undefined, 0.14),
  P("palm", 300, 1.05, undefined, 0.36),
  P("stall", -66, 1.0, undefined, 0.62),
  P("crate", 252, 0.95, undefined, 0.55),
  P("amphora", 278, 0.85, undefined, 0.7),
  P("bush", 140, 0.85, undefined, 0.34),
  P("grass", -206, 1, undefined, 0.8),
  P("grass", 60, 0.95, undefined, 0.86),
];

// ---------------------------------------------------------------- Gn 38: sets
// ADULÃO (38:1-10) — a cidade cananeia onde Judá "desceu": porta de casa,
// torre, feira, o poço. Terreno de cidade, luz baixa de fim de tarde.
const ADULAO: StagePropSpec[] = [
  P("tower", 220, 1.25, undefined, 0.08),
  P("door", 60, 1.05, undefined, 0.3),       // a casa de Hira, o adulamita
  P("palm", -280, 1.15, undefined, 0.14),
  P("palm", 300, 1.0, undefined, 0.36),
  P("stall", -240, 1.0, undefined, 0.56),
  P("crate", -292, 0.9, undefined, 0.7),
  P("amphora", 252, 0.85, undefined, 0.62),
  P("well", 150, 1.0, undefined, 0.66),
  P("bush", -62, 0.85, undefined, 0.42),
  P("grass", -210, 1, undefined, 0.8),
  P("grass", 20, 0.95, undefined, 0.85),
  P("grass", 190, 0.95, undefined, 0.76),
];

// A CASA DO PAI DE TAMAR (38:11) — a tenda da viuvez: quieta, sem fogo,
// esperando um noivo que nunca é enviado.
const CASA_TAMAR: StagePropSpec[] = [
  P("tent", -30, 1.25, undefined, 0.08),
  P("tent", 230, 0.95, undefined, 0.06),
  P("tree", -272, 1.15, undefined, 0.24),
  P("tree", 292, 1.0, undefined, 0.44),
  P("amphora", -64, 0.85, undefined, 0.66),
  P("crate", 210, 0.9, undefined, 0.6),
  P("bush", 132, 0.85, undefined, 0.34),
  P("rock", 306, 0.9, undefined, 0.66),
  P("grass", -220, 1, undefined, 0.82),
  P("grass", 40, 1, undefined, 0.86),
  P("grass", 170, 0.95, undefined, 0.74),
];

// TIMNA (38:12) — a tosquia das ovelhas: barraca dos tosquiadores, aguada e
// o rebanho de Judá. É festa de homens; a viúva não foi convidada.
const TIMNA: StagePropSpec[] = [
  P("stall", -250, 1.0, undefined, 0.55),
  P("tent", 240, 1.0, undefined, 0.06),
  P("tree", -292, 1.2, undefined, 0.16),
  P("tree", 300, 1.05, undefined, 0.4),
  P("well", 80, 1.0, undefined, 0.64),
  P("rock", -50, 0.6, undefined, 0.5),
  P("bush", 152, 0.9, undefined, 0.3),
  P("grass", -212, 1, undefined, 0.8),
  P("grass", 20, 0.95, undefined, 0.86),
  P("grass", 200, 0.95, undefined, 0.7),
];

// ENAIM (38:13-23) — "a entrada das duas fontes que estão no caminho de
// Timna": DOIS poços em pontas opostas do palco e a porta do caminho.
// Corredor -100..-190 LIVRE: é a vaga do PENHOR no v.18.
const ENAIM: StagePropSpec[] = [
  P("well", -230, 1.05, undefined, 0.24),    // a primeira fonte
  P("well", 200, 1.0, undefined, 0.5),       // a segunda fonte
  P("door", 40, 1.15, undefined, 0.3),       // a entrada do caminho
  P("palm", 262, 1.15, undefined, 0.1),
  P("rock", -282, 1.0, undefined, 0.6),
  P("rock", -50, 0.6, undefined, 0.52),
  P("rock", 306, 1.1, undefined, 0.66),
  P("bush", -312, 0.85, undefined, 0.44),
  P("bush", 120, 0.9, undefined, 0.72),
  P("grass", -210, 0.95, undefined, 0.82),
  P("grass", 70, 0.9, undefined, 0.86),
  P("grass", 162, 0.95, undefined, 0.68),
];

// O PENHOR: o selo e o cordão (scroll) e o cajado (crate) — as três provas
// que voltarão para condenar quem as deu. Vaga de extras, bem visíveis.
const PENHOR: StagePropSpec[] = [
  P("scroll", -112, 1.05, undefined, 0.14),  // o teu selo, e o teu cordão
  P("crate", -178, 0.9, undefined, 0.4),     // e o cajado que está em tua mão
];

// A PRAÇA DO JULGAMENTO (38:24-26) — Adulão outra vez, mas de noite e com
// FOGO aceso no corredor de extras: a sentença de Judá antes da verdade.
const FOGUEIRA = P("campfire", -146, 1.2, 1, 0.24);

// O PARTO DOS GÊMEOS (38:27-30) — a tenda, a lamparina da noite e o
// nascimento de onde sairá a linhagem do Messias.
const PARTO: StagePropSpec[] = [
  P("tent", -20, 1.3, undefined, 0.06),
  P("tent", 240, 0.95, undefined, 0.08),
  P("campfire", 90, 1.0, 1, 0.62),
  P("tree", -280, 1.15, undefined, 0.2),
  P("tree", 300, 1.0, undefined, 0.42),
  P("amphora", -62, 0.85, undefined, 0.66),
  P("crate", 200, 0.9, undefined, 0.58),
  P("bush", 140, 0.85, undefined, 0.32),
  P("grass", -220, 1, undefined, 0.82),
  P("grass", 30, 0.95, undefined, 0.86),
  P("grass", 170, 0.95, undefined, 0.72),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ----------------------------------------------------------------- Gn 37
  // Arco de env: manhã de Canaã (night 0.12, glory 0.2) → a noite do ódio
  // (0.2 → 0.35 → 0.5) → a cova (0.5, storm 0.25) → o luto (0.6, glória 0) →
  // o Egito (0.32) com uma fresta de glória: a promessa desceu com o menino.
  37: {
    start: { terrain: "field", night: 0.12, glory: 0.2, storm: 0, fire: 0 },
    beats: [
      b(1, { props: CANAA, cast: [                                             // Jacó habitou na terra de Canaã
        C("jaco", -30, "stand", { glow: 0.25, dy: 0.5 }),
      ] }),
      b(2, { env: { night: 0.16, glory: 0.15 }, cast: [                        // José, 17 anos, apascentava; más notícias
        C("jose", -30, "walk", { dy: 0.52, facing: 1 }),
        C("jaco", -92, "stand", { glow: 0.2, dy: 0.5 }),
        C("homem", 60, "stand", { dy: 0.5 }),
        C("homem", 150, "stand", { dy: 0.46, id: "irmao-b" }),
        C("rebanho", 240, "stand", { dy: 0.34 }),
      ] }),
      b(3, { set: "casaDeIsrael", props: TENDAS, env: { night: 0.1, glory: 0.3 }, cast: [ // A TÚNICA DE VÁRIAS CORES
        C("jaco", -46, "stand", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("jose", 16, "stand", { glow: 0.2, dy: 0.52, facing: -1 }),
      ] }),
      b(4, { env: { night: 0.2, glory: 0.14 }, cast: [                         // odiaram-no; não falavam pacificamente
        C("jaco", -60, "stand", { dy: 0.5 }),
        C("jose", 8, "stand", { glow: 0.2, dy: 0.52, facing: 1 }),
        C("homem", 108, "stand", { dy: 0.5, facing: -1 }),
        C("homem", 162, "stand", { dy: 0.46, facing: -1, id: "irmao-b" }),
        C("homem", 214, "stand", { dy: 0.42, facing: -1, id: "irmao-c" }),
      ] }),
      b(5, { env: { night: 0.26 }, cast: [                                     // teve um sonho: odiaram-no ainda mais
        C("jose", -18, "stand", { glow: 0.2, dy: 0.52, facing: 1 }),
        C("homem", 88, "stand", { dy: 0.5, facing: -1 }),
        C("homem", 148, "stand", { dy: 0.46, facing: -1, id: "irmao-b" }),
        C("homem", 206, "stand", { dy: 0.42, facing: -1, id: "irmao-c" }),
      ] }),
      b(6, { by: "jose", q: "disse-lhes: ", props: [...TENDAS, ...MOLHOS] }),   // "Ouvi este sonho que tenho sonhado"
      b(7, { by: "jose", set: "sonhoMolhos", props: SONHO_MOLHOS, env: { night: 0.2, glory: 0.35 }, cast: [ // DENTRO DO SONHO: os molhos se inclinam
        C("jose", -196, "stand", { glow: 0.3, dy: 0.56 }),
        C("homem", 208, "bow", { dy: 0.5, id: "irmaos-sonho" }),
      ] }),
      b(8, { by: "homem", q: "disseram seus irmãos: ", set: "casaDeIsrael", props: TENDAS, env: { night: 0.32, glory: 0.1 }, cast: [ // "Deveras reinarás sobre nós?"
        C("jose", -30, "stand", { glow: 0.2, dy: 0.52, facing: 1 }),
        C("homem", 76, "point", { dy: 0.5, facing: -1 }),
        C("homem", 138, "stand", { dy: 0.46, facing: -1, id: "irmao-b" }),
        C("homem", 198, "stand", { dy: 0.42, facing: -1, id: "irmao-c" }),
      ] }),
      b(9, { by: "jose", q: "e disse: ", set: "sonhoAstros", props: SONHO_ASTROS, env: { night: 0.55, glory: 0.3 }, cast: [ // o sol, a lua e onze estrelas
        C("jose", 0, "raise", { glow: 0.35, dy: 0.5 }),
      ] }),
      b(10, { by: "jaco", q: "disse-lhe: ", set: "casaDeIsrael", props: TENDAS, env: { night: 0.34, glory: 0.1 }, cast: [ // o pai o REPREENDE
        C("jaco", -56, "point", { dy: 0.5, facing: 1 }),
        C("jose", 14, "stand", { dy: 0.52, facing: -1 }),
        C("homem", 120, "stand", { dy: 0.48, facing: -1 }),
        C("homem", 180, "stand", { dy: 0.44, facing: -1, id: "irmao-b" }),
      ] }),
      b(11, { env: { night: 0.3, glory: 0.16 }, cast: [                         // invejavam-no; o pai guardava no coração
        C("jaco", -56, "stand", { glow: 0.2, dy: 0.5 }),
        C("jose", 14, "stand", { dy: 0.52 }),
        C("homem", 130, "stand", { dy: 0.48, facing: -1 }),
        C("homem", 192, "stand", { dy: 0.44, facing: -1, id: "irmao-b" }),
      ] }),
      b(12, { env: { night: 0.18 }, cast: [                                     // os irmãos vão apascentar junto de Siquém
        C("jaco", -56, "stand", { dy: 0.5 }),
        C("jose", -12, "stand", { dy: 0.52 }),
        C("homem", 232, "walk", { dy: 0.42, facing: 1 }),
        C("homem", 286, "walk", { dy: 0.38, facing: 1, id: "irmao-b" }),
        C("rebanho", 320, "walk", { dy: 0.3, facing: 1 }),
      ] }),
      b(13, { by: "jaco", q: "Israel a José: ", cast: [                          // "Vem, e enviar-te-ei a eles" / "Eis-me aqui"
        C("jaco", -46, "point", { glow: 0.2, dy: 0.5, facing: 1 }),
        C("jose", 20, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(14, { by: "jaco", q: "lhe disse: ", env: { night: 0.15 }, cast: [        // enviado do vale de Hebrom a Siquém
        C("jaco", -64, "raise", { dy: 0.5, facing: 1 }),
        C("jose", 92, "walk", { glow: 0.2, dy: 0.52, facing: 1 }),
      ] }),
      b(15, { by: "homem", q: "dizendo: ", set: "dota", props: DOTA, env: { terrain: "desert", night: 0.2, glory: 0.08 }, cast: [ // errante pelo campo: "Que procuras?"
        C("jose", -24, "walk", { dy: 0.52, facing: 1 }),
        C("homem", 72, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(16, { by: "jose", q: "E ele disse: ", cast: [                            // "Procuro meus irmãos"
        C("jose", -10, "stand", { dy: 0.52, facing: 1 }),
        C("homem", 66, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(17, { by: "homem", q: "aquele homem: ", cast: [                          // "Vamos a Dotã" — e os achou em Dotã
        C("homem", 60, "point", { dy: 0.5, facing: 1 }),
        C("jose", -4, "walk", { dy: 0.52, facing: 1 }),
      ] }),
      b(18, { env: { night: 0.35, storm: 0.2, glory: 0 }, cast: [                // viram-no de longe e CONSPIRARAM
        C("jose", -62, "walk", { dy: 0.54, facing: 1 }),
        C("homem", 150, "stand", { dy: 0.48, facing: -1 }),
        C("homem", 204, "stand", { dy: 0.44, facing: -1, id: "irmao-b" }),
        C("homem", 254, "stand", { dy: 0.4, facing: -1, id: "irmao-c" }),
      ] }),
      b(19, { by: "homem", q: "um ao outro: " }),                                // "Eis lá vem o sonhador-mor!"
      b(20, { by: "homem", props: [...DOTA, COVA], env: { night: 0.42, storm: 0.26 }, cast: [ // "matemo-lo e lancemo-lo numa destas covas"
        C("jose", -46, "stand", { dy: 0.54, facing: 1 }),
        C("homem", 96, "point", { dy: 0.5, facing: -1 }),
        C("homem", 152, "stand", { dy: 0.46, facing: -1, id: "irmao-b" }),
        C("homem", 208, "stand", { dy: 0.42, facing: -1, id: "irmao-c" }),
      ] }),
      b(21, { by: "homem", q: "e disse: ", env: { storm: 0.2 }, cast: [           // RÚBEN: "Não lhe tiremos a vida"
        C("jose", -40, "stand", { dy: 0.54 }),
        C("homem", 72, "raise", { dy: 0.5, facing: -1 }),
        C("homem", 148, "stand", { dy: 0.46, facing: -1, id: "irmao-b" }),
        C("homem", 206, "stand", { dy: 0.42, facing: -1, id: "irmao-c" }),
      ] }),
      b(22, { by: "homem", q: "disse Rúben: ", env: { night: 0.44 } }),           // "Não derrameis sangue; lançai-o nesta cova"
      b(23, { env: { night: 0.48, storm: 0.3 }, cast: [                           // TIRARAM A TÚNICA DE VÁRIAS CORES
        C("jose", -26, "kneel", { dy: 0.5 }),
        C("homem", 44, "stand", { dy: 0.5, facing: -1 }),
        C("homem", 96, "stand", { dy: 0.46, facing: -1, id: "irmao-b" }),
        C("homem", 142, "stand", { dy: 0.42, facing: -1, id: "irmao-c" }),
      ] }),
      b(24, { env: { night: 0.52, storm: 0.24 }, cast: [                          // lançaram-no na cova: vazia, sem água
        C("jose", -106, "lie", { dy: 0.2 }),
        C("homem", 30, "stand", { dy: 0.5, facing: -1 }),
        C("homem", 88, "stand", { dy: 0.46, facing: -1, id: "irmao-b" }),
        C("homem", 140, "stand", { dy: 0.42, facing: -1, id: "irmao-c" }),
      ] }),
      b(25, { props: [...DOTA, COVA, PAO], env: { night: 0.4, storm: 0.12 }, cast: [ // ASSENTARAM-SE A COMER PÃO; vêm os ismaelitas
        C("jose", -106, "lie", { dy: 0.2 }),
        C("homem", 0, "kneel", { dy: 0.52 }),
        C("homem", 58, "kneel", { dy: 0.48, id: "irmao-b" }),
        C("rebanho", 254, "walk", { dy: 0.3, facing: -1 }),
        C("homem", 296, "walk", { dy: 0.36, facing: -1, id: "mercador-a" }),
        C("homem", 318, "walk", { dy: 0.3, facing: -1, id: "mercador-b" }),
      ] }),
      b(26, { by: "homem", q: "aos seus irmãos: ", env: { night: 0.44 }, cast: [   // JUDÁ: "Que proveito haverá…?"
        C("jose", -106, "lie", { dy: 0.2 }),
        C("homem", 4, "point", { dy: 0.52, facing: 1 }),
        C("homem", 62, "stand", { dy: 0.48, id: "irmao-b" }),
        C("rebanho", 240, "stand", { dy: 0.3 }),
        C("homem", 286, "stand", { dy: 0.36, facing: -1, id: "mercador-a" }),
      ] }),
      b(27, { by: "homem" }),                                                      // "Vendamo-lo a estes ismaelitas"
      b(28, { env: { night: 0.4, storm: 0.1 }, cast: [                              // VENDIDO POR VINTE MOEDAS DE PRATA
        C("jose", 186, "walk", { dy: 0.34, facing: 1 }),
        C("homem", 244, "walk", { dy: 0.3, facing: 1, id: "mercador-a" }),
        C("rebanho", 300, "walk", { dy: 0.28, facing: 1 }),
        C("homem", -40, "stand", { dy: 0.52, facing: 1 }),
        C("homem", 20, "stand", { dy: 0.48, facing: 1, id: "irmao-b" }),
      ] }),
      b(29, { env: { night: 0.5, storm: 0.22, glory: 0 }, cast: [                   // RÚBEN acha a cova VAZIA e rasga as vestes
        C("homem", -98, "bow", { dy: 0.28 }),
      ] }),
      b(30, { by: "homem", q: "e disse: ", env: { night: 0.52 }, cast: [            // "O menino não está; e eu aonde irei?"
        C("homem", -24, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 78, "stand", { dy: 0.48, facing: -1, id: "irmao-b" }),
      ] }),
      b(31, { env: { night: 0.54, storm: 0.18 }, cast: [                            // mataram um cabrito e tingiram a túnica
        C("homem", -8, "kneel", { dy: 0.52 }),
        C("homem", 62, "stand", { dy: 0.48, id: "irmao-b" }),
        C("rebanho", 180, "stand", { dy: 0.36 }),
      ] }),
      b(32, { by: "homem", q: "e disseram: ", set: "lutoDeIsrael", props: TENDAS, env: { terrain: "field", night: 0.46, storm: 0, glory: 0.04 }, cast: [ // "Conhece agora se é a túnica de teu filho"
        C("jaco", -34, "stand", { glow: 0.18, dy: 0.5, facing: 1 }),
        C("homem", 56, "stand", { dy: 0.5, facing: -1 }),
        C("homem", 112, "stand", { dy: 0.46, facing: -1, id: "irmao-b" }),
      ] }),
      b(33, { by: "jaco", q: "e disse: ", env: { night: 0.52 }, cast: [             // "É a túnica de meu filho; uma fera o comeu"
        C("jaco", -22, "kneel", { dy: 0.5 }),
        C("homem", 66, "stand", { dy: 0.5, facing: -1 }),
        C("homem", 120, "stand", { dy: 0.46, facing: -1, id: "irmao-b" }),
      ] }),
      b(34, { env: { night: 0.6, storm: 0.14 }, cast: [                             // rasgou as vestes, saco sobre os lombos
        C("jaco", -14, "bow", { dy: 0.5 }),
        C("homem", 84, "stand", { dy: 0.48, facing: -1 }),
        C("homem", 138, "stand", { dy: 0.44, facing: -1, id: "irmao-b" }),
      ] }),
      b(35, { by: "jaco", q: "e disse: ", env: { night: 0.6, glory: 0 }, cast: [    // "com choro hei de descer ao meu filho"
        C("jaco", 0, "bow", { dy: 0.5 }),
        C("homem", 74, "kneel", { dy: 0.48 }),
        C("mulherComum", -72, "kneel", { dy: 0.5 }),
        C("mulherComum", 124, "kneel", { dy: 0.44, id: "filha-b" }),
      ] }),
      b(36, { set: "egito", props: EGITO, env: { terrain: "city", night: 0.32, storm: 0, glory: 0.15 }, cast: [ // vendido a POTIFAR, capitão da guarda
        C("jose", -18, "walk", { glow: 0.2, dy: 0.5, facing: 1 }),
        C("homem", 88, "stand", { id: "potifar", glow: 0.15, dy: 0.48, facing: -1 }),
        C("servo", 146, "stand", { dy: 0.44, facing: -1 }),
      ] }),
    ],
  },

  // ----------------------------------------------------------------- Gn 38
  // Arco de env: a descida (night 0.15) → as duas mortes (0.45, storm 0.25) →
  // a viuvez esquecida (0.4) → Enaim ao crepúsculo (0.35 → 0.45, palco
  // IMÓVEL) → a fogueira da sentença (night 0.5, storm 0.4, fire 0.15) → a
  // verdade (fogo APAGA, storm 0, glory 0.3) → o parto (glory 0.45).
  38: {
    start: { terrain: "city", night: 0.15, glory: 0.1, storm: 0, fire: 0 },
    beats: [
      b(1, { props: ADULAO, cast: [                                              // Judá DESCEU de entre seus irmãos, a Adulão
        C("homem", -30, "walk", { dy: 0.52, facing: 1 }),
        C("homem", 62, "stand", { dy: 0.5, facing: -1, id: "hira" }),
      ] }),
      b(2, { env: { night: 0.18 }, cast: [                                        // viu a filha de Sua e tomou-a por mulher
        C("homem", -22, "stand", { dy: 0.52, facing: 1 }),
        C("mulherComum", 44, "stand", { dy: 0.5, facing: -1, id: "sua" }),
        C("homem", 118, "stand", { dy: 0.46, facing: -1, id: "hira" }),
      ] }),
      b(3, { env: { glory: 0.16, night: 0.16 }, cast: [                           // deu à luz um filho: ER
        C("homem", -34, "stand", { dy: 0.52, facing: 1 }),
        C("mulherComum", 36, "kneel", { dy: 0.5, id: "sua" }),
      ] }),
      b(4, { env: { night: 0.2 }, cast: [                                         // e outro filho: ONÃ
        C("homem", -40, "stand", { dy: 0.52 }),
        C("mulherComum", 30, "kneel", { dy: 0.5, id: "sua" }),
      ] }),
      b(5, { env: { night: 0.24, glory: 0.1 }, cast: [                            // e SELÁ; Judá estava em Quezibe
        C("homem", -96, "walk", { dy: 0.5, facing: -1 }),
        C("mulherComum", 30, "kneel", { dy: 0.5, id: "sua" }),
      ] }),
      b(6, { env: { night: 0.22, glory: 0.12 }, cast: [                            // TAMAR, mulher de Er, o primogênito
        C("homem", -48, "stand", { dy: 0.52, facing: 1 }),
        C("mulherComum", 26, "stand", { dy: 0.5, facing: -1 }),
        C("homem", 92, "stand", { dy: 0.46, facing: -1, id: "er" }),
      ] }),
      b(7, { env: { night: 0.36, storm: 0.15, glory: 0 }, cast: [                   // Er era mau: o Senhor o matou (nada se encena)
        C("homem", -48, "stand", { dy: 0.52 }),
        C("mulherComum", 26, "stand", { dy: 0.5 }),
      ] }),
      b(8, { by: "homem", q: "a Onã: ", env: { night: 0.32 }, cast: [               // "Toma a mulher do teu irmão…"
        C("homem", -52, "point", { dy: 0.52, facing: 1 }),
        C("mulherComum", 14, "stand", { dy: 0.5 }),
        C("homem", 76, "stand", { dy: 0.46, facing: -1, id: "ona" }),
      ] }),
      b(9, { env: { night: 0.42, storm: 0.2 } }),                                   // DECORO: palco imóvel, só a noite sobe
      b(10, { env: { night: 0.46, storm: 0.26 }, cast: [                            // era mau aos olhos do Senhor: também o matou
        C("homem", -52, "stand", { dy: 0.52 }),
        C("mulherComum", 14, "stand", { dy: 0.5 }),
      ] }),
      b(11, { by: "homem", q: "sua nora: ", set: "casaDeTamar", props: CASA_TAMAR, env: { terrain: "field", night: 0.4, storm: 0.05, glory: 0 }, cast: [ // "Fica-te viúva na casa de teu pai"
        C("homem", -58, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 26, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(12, { set: "timna", props: TIMNA, env: { night: 0.3, storm: 0, glory: 0.08 }, cast: [ // morreu a filha de Sua; Judá sobe aos tosquiadores
        C("homem", -24, "walk", { dy: 0.5, facing: 1 }),
        C("homem", 66, "walk", { dy: 0.46, facing: 1, id: "hira" }),
        C("rebanho", 210, "stand", { dy: 0.36 }),
      ] }),
      b(13, { by: "homem", q: "dizendo: ", set: "enaim", props: ENAIM, env: { terrain: "desert", night: 0.28, glory: 0.06 }, cast: [ // deram aviso a Tamar: "o teu sogro sobe a Timna"
        C("mulherComum", -20, "stand", { dy: 0.52 }),
        C("homem", 64, "point", { dy: 0.5, facing: -1 }),
      ] }),
      b(14, { env: { night: 0.35 }, cast: [                                          // tirou os vestidos da viuvez; VELADA, assentou-se
        C("mulherComum", 8, "kneel", { dy: 0.5 }),
      ] }),
      b(15, { env: { night: 0.4 }, cast: [                                           // Judá a vê e não a reconhece
        C("mulherComum", 8, "kneel", { dy: 0.5 }),
        C("homem", -74, "walk", { dy: 0.52, facing: 1 }),
      ] }),
      b(16, { env: { night: 0.42, storm: 0.08 } }),                                   // DECORO: o texto narra; o palco não se move
      b(17, { by: "homem", q: "E ele disse: ", cast: [                                // "Eu te enviarei um cabrito" / "Dar-me-ás penhor?"
        C("mulherComum", 12, "stand", { dy: 0.5 }),
        C("homem", -52, "stand", { dy: 0.52, facing: 1 }),
      ] }),
      b(18, { props: [...ENAIM, ...PENHOR], env: { night: 0.45 } }),                   // O SELO, O CORDÃO E O CAJADO dados em penhor
      b(19, { props: ENAIM, env: { night: 0.4 }, cast: [                               // ela se levanta e volta aos vestidos da viuvez
        C("mulherComum", -36, "walk", { dy: 0.5, facing: -1 }),
      ] }),
      b(20, { env: { night: 0.34, storm: 0 }, cast: [                                  // o cabrito enviado: porém não a achou
        C("homem", 40, "walk", { dy: 0.5, facing: -1, id: "hira" }),
        C("rebanho", 150, "stand", { dy: 0.34 }),
      ] }),
      b(21, { by: "homem", q: "dizendo: ", env: { night: 0.34, storm: 0.1 }, cast: [   // Hira pergunta aos homens do lugar: ninguém esteve ali
        C("homem", 46, "point", { dy: 0.5, facing: 1, id: "hira" }),
        C("homem", -26, "stand", { dy: 0.52, id: "morador" }),
      ] }),
      b(22, { by: "homem", q: "e disse: ", env: { night: 0.36 }, cast: [               // Hira volta a Judá: "Não a achei"
        C("homem", 46, "stand", { dy: 0.48, facing: -1, id: "hira" }),
        C("homem", -28, "stand", { dy: 0.52, facing: 1 }),
        C("rebanho", 146, "stand", { dy: 0.34 }),
      ] }),
      b(23, { by: "homem", q: "disse Judá: ", env: { night: 0.4 }, cast: [              // "Deixa-a ficar com o penhor" (medo do desprezo)
        C("homem", -28, "point", { dy: 0.52, facing: 1 }),
        C("homem", 46, "stand", { dy: 0.48, facing: -1, id: "hira" }),
      ] }),
      b(24, { by: "homem", q: "Então disse Judá: ", set: "julgamento", props: [...ADULAO, FOGUEIRA], env: { terrain: "city", night: 0.5, storm: 0.4, fire: 0.15, glory: 0 }, cast: [ // "TIRAI-A FORA PARA QUE SEJA QUEIMADA"
        C("homem", -44, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 38, "stand", { dy: 0.52 }),
        C("homem", 112, "stand", { dy: 0.46, facing: -1, id: "aviso" }),
      ] }),
      b(25, { by: "mulherComum", q: "a seu sogro: ", props: [...ADULAO, FOGUEIRA, ...PENHOR], env: { night: 0.45, storm: 0.3, glory: 0.1 }, cast: [ // ela devolve as PROVAS: "Conhece de quem é este selo…"
        C("homem", -44, "stand", { dy: 0.5, facing: 1 }),
        C("mulherComum", 30, "raise", { dy: 0.52, facing: -1 }),
        C("homem", 112, "stand", { dy: 0.46, facing: -1, id: "aviso" }),
      ] }),
      b(26, { by: "homem", q: "e disse: ", props: [...ADULAO, ...PENHOR], env: { night: 0.22, storm: 0, fire: 0, glory: 0.3 }, cast: [ // "MAIS JUSTA É ELA DO QUE EU" — o fogo apaga
        C("homem", -30, "bow", { dy: 0.5, facing: 1 }),
        C("mulherComum", 44, "stand", { glow: 0.2, dy: 0.5, facing: -1 }),
      ] }),
      b(27, { set: "parto", props: PARTO, env: { terrain: "field", night: 0.2, glory: 0.2 }, cast: [ // ao tempo de dar à luz: GÊMEOS no ventre
        C("mulherComum", -10, "lie", { dy: 0.5, id: "tamar" }),
        C("mulherComum", 58, "kneel", { dy: 0.52 }),
      ] }),
      b(28, { by: "mulherComum", q: "dizendo: ", env: { glory: 0.28 } }),                // o FIO ENCARNADO: "Este saiu primeiro"
      b(29, { by: "mulherComum", q: "e ela disse: ", env: { night: 0.14, glory: 0.36 }, cast: [ // "sobre ti é a rotura": PEREZ
        C("mulherComum", -10, "kneel", { dy: 0.5, id: "tamar" }),
        C("mulherComum", 52, "raise", { dy: 0.52 }),
      ] }),
      b(30, { env: { night: 0.1, glory: 0.45 }, cast: [                                  // ZERÁ, o do fio — e a linhagem segue
        C("mulherComum", -16, "stand", { glow: 0.2, dy: 0.5, id: "tamar" }),
        C("mulherComum", 46, "raise", { dy: 0.52 }),
      ] }),
    ],
  },
};
