// ============================================================================
// 1 SAMUEL 7–9 — CENA VIVA. EBEN-EZER ("até aqui nos ajudou o Senhor"), o
// PEDIDO DE UM REI, e o moço QUIS PROCURAVA JUMENTAS E ACHOU UM REINO.
//
// 1Sm 7 — A arca volta do país dos filisteus e para em QUIRIATE-JEARIM: os
// homens da cidade a sobem ao OUTEIRO, à casa de ABINADABE, e consagram a
// ELEAZAR, seu filho, para guardá-la. Ali ela fica VINTE ANOS, e toda a casa de
// Israel LAMENTA pelo SENHOR — um luto longo, sem batalha e sem profeta em
// cena. Então SAMUEL fala: se de todo o coração vos converterdes, TIRAI DENTRE
// VÓS OS DEUSES ESTRANHOS E OS ASTAROTES. E Israel tira os baalins e os
// astarotes e serve só ao SENHOR. Samuel congrega o povo em MIZPÁ; ali tiram
// água e a DERRAMAM PERANTE O SENHOR, jejuam e confessam: "pecamos contra o
// Senhor". Os maiorais dos filisteus ouvem e sobem; o povo se apavora e pede
// que Samuel não cesse de clamar. Samuel toma um CORDEIRO DE MAMA e o sacrifica
// INTEIRO em holocausto — e enquanto sacrifica, ⭐ O SENHOR TROVEJA com grande
// estrondo sobre os filisteus e os confunde. Israel os persegue até abaixo de
// Bete-Car. Samuel levanta uma PEDRA entre Mizpá e Sem e lhe chama EBENÉZER:
// "ATÉ AQUI NOS AJUDOU O SENHOR". As cidades tomadas são restituídas, de Ecrom
// a Gate, e há paz com os amorreus. Samuel julga Israel toda a vida, rodeando
// de ano em ano BETEL, GILGAL e MIZPÁ — e voltando sempre a RAMÁ, onde estava a
// sua casa e onde edificou um ALTAR ao SENHOR.
//
// 1Sm 8 — Samuel envelhece e põe os filhos por juízes: JOEL e ABIAS, lá no
// extremo sul, em BERSEBA. Eles não andam pelos caminhos do pai: inclinam-se à
// AVAREZA, aceitam SUBORNO e PERVERTEM O DIREITO. Então todos os anciãos de
// Israel se congregam e vêm a Samuel, a Ramá: "constitui-nos agora um rei sobre
// nós, para que ele nos julgue, COMO O TÊM TODAS AS NAÇÕES". A palavra parece
// mal aos olhos de Samuel, e ele ora. A resposta é o coração do capítulo: ⭐
// "NÃO TE TÊM REJEITADO A TI, ANTES A MIM ME TÊM REJEITADO, PARA EU NÃO REINAR
// SOBRE ELES" — ouve a voz do povo, mas PROTESTA-LHES solenemente. E Samuel
// enumera o COSTUME DO REI: tomará os vossos filhos para os carros e para
// correrem adiante deles, as vossas filhas para perfumistas, cozinheiras e
// padeiras, o melhor das vossas terras, vinhas e olivais, o dízimo das sementes
// e do rebanho — E VÓS LHE SEREIS POR SERVOS; e naquele dia clamareis por causa
// do vosso rei, MAS O SENHOR NÃO VOS OUVIRÁ. O povo não quer ouvir: "não, mas
// haverá sobre nós um rei". Samuel repete tudo aos ouvidos do SENHOR, e o
// SENHOR manda constituí-lo; e cada um volta à sua cidade.
//
// 1Sm 9 — Em Benjamim há um homem poderoso, QUIS, e o seu filho SAUL: moço, e
// tão belo que DESDE OS OMBROS PARA CIMA sobressaía a todo o povo. Perdem-se as
// JUMENTAS de Quis, e Saul sai com um moço a procurá-las: a montanha de Efraim,
// Salisa, Saalim, a terra de Benjamim — nada. Já na terra de Zufe Saul quer
// voltar, mas o moço lembra: há nesta cidade um HOMEM DE DEUS, e tudo quanto
// diz sucede infalivelmente. Falta presente; o moço tem na mão UM QUARTO DE UM
// SICLO DE PRATA. (O narrador explica de passagem: ao profeta de hoje,
// antigamente se chamava VIDENTE.) Sobem, e umas MOÇAS que saem a tirar água
// lhes dizem que se apressem, porque hoje há SACRIFÍCIO NO ALTO e o vidente
// abençoa antes de comerem. No meio da cidade Samuel lhes sai ao encontro — e
// já sabia: um dia antes o SENHOR lhe revelara "AMANHÃ A ESTAS HORAS TE ENVIAREI
// UM HOMEM DA TERRA DE BENJAMIM", e ao vê-lo: "eis aqui o homem de quem eu te
// falei". Saul pergunta pela casa do vidente e ouve: ⭐ "EU SOU O VIDENTE" — as
// jumentas já se acharam, e "para quem é todo o desejo de Israel?". Saul se
// encolhe: sou filho de Benjamim, DA MENOR DAS TRIBOS. Samuel o leva à CÂMARA,
// acima dos trinta convidados, e manda o cozinheiro trazer a ESPÁDUA guardada de
// propósito. À noite falam sobre o EIRADO; de madrugada saem os dois, e na
// extremidade da cidade o moço passa adiante — porque o que vem a seguir só
// Saul pode ouvir.
//
// A VOZ DE DEUS (regra do projeto): nestes três capítulos o SENHOR fala SEM
// MEDIADOR VISÍVEL — é oráculo, e por isso `by:"deus"` com `env.glory` alto e
// NENHUMA figura dourada em cena: 8:7-9 (a resposta à oração de Samuel), 8:22
// (dá ouvidos à sua voz) e 9:15-17 (a revelação da véspera e o "eis aqui o
// homem"). Onde a palavra do SENHOR passa pela BOCA DE SAMUEL — 7:3,5,12;
// 8:11-18; 9:19-20,23-24,26-27 — o balão é DE SAMUEL (`by:"patriarca"`), nunca
// voz do céu. Em 7:10 o SENHOR responde sem falar: TROVEJA — isso é
// `env.storm` no auge (0.95) com `glory` alto, não prop nenhum. E o único fogo
// desenhado do trecho é o `altar` com `fire` do cordeiro de mama em Mizpá e o
// `campfire` da câmara do alto: `env.fire` é só ambiência.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------- SETS 1Sm 7

// QUIRIATE-JEARIM — a "cidade dos bosques": o OUTEIRO onde subiram a arca, a
// casa de Abinadabe no alto e a arca guardada à sua porta por vinte anos.
const QUIRIATE: StagePropSpec[] = [
  P("rock", -20, 1.5, undefined, 0.52),
  { ...P("church", 120, 1.15, undefined, 0.26), tag: "casa-de-abinadabe" },
  { ...P("ark", -150, 1.0, undefined, 0.44), tag: "arca-do-concerto" },
  P("door", 40, 0.9, undefined, 0.34),
  P("tree", 285, 1.15, undefined, 0.2),
  P("grass", -280, 0.78, undefined, 0.72),
];

// OS ASTAROTES — o chão de Israel entre os ídolos que Samuel manda tirar: o
// bezerro de metal e a coluna de pedra do culto estranho, plantados no campo.
const IDOLOS: StagePropSpec[] = [
  { ...P("calf", -170, 1.15, undefined, 0.46), tag: "astarotes-e-baalins" },
  P("column", 150, 1.2, undefined, 0.36),
  P("tree", -300, 1.05, undefined, 0.22),
  P("rock", 255, 0.95, undefined, 0.58),
  P("grass", 20, 0.78, undefined, 0.74),
];

// O CAMPO LIMPO — o mesmo lugar depois de tirados os baalins: ficou o campo, a
// árvore e a pedra; o pedestal do ídolo sumiu do quadro.
const LIMPO: StagePropSpec[] = [
  P("tree", -300, 1.05, undefined, 0.22),
  P("bush", 120, 0.95, undefined, 0.44),
  P("rock", 255, 0.95, undefined, 0.58),
  P("grass", -40, 0.82, undefined, 0.74),
  { ...P("sun", 60, 1.1, undefined, 0.62), sky: true },
];

// MIZPÁ — a ATALAIA onde Israel se congrega: a torre do alto, o poço de onde
// tiraram água e a talha da água DERRAMADA perante o Senhor.
const MIZPA: StagePropSpec[] = [
  P("tower", -235, 1.3, undefined, 0.26),
  P("well", 120, 1.0, undefined, 0.42),
  { ...P("amphora", 30, 0.85, undefined, 0.62), tag: "agua-derramada-em-mizpa" },
  P("bush", -120, 0.9, undefined, 0.36),
  P("rock", 265, 1.0, undefined, 0.56),
  P("grass", -40, 0.78, undefined, 0.74),
];

// O HOLOCAUSTO DE MIZPÁ — o altar em chama com o cordeiro de mama oferecido
// INTEIRO, enquanto os filisteus já chegam à peleja. (fogo desenhado: altar+fire)
const MIZPA_ALTAR: StagePropSpec[] = [
  { ...P("altar", -30, 1.2, 1, 0.5), tag: "cordeiro-de-mama" },
  P("tower", -255, 1.25, undefined, 0.26),
  P("well", 150, 0.95, undefined, 0.4),
  P("rock", 285, 1.0, undefined, 0.58),
  P("grass", 60, 0.76, undefined, 0.74),
];

// BETE-CAR — a descida por onde Israel persegue os filisteus derrotados: encosta
// aberta, mato ralo e a atalaia de Mizpá já pequena, lá atrás.
const BETE_CAR: StagePropSpec[] = [
  P("rock", -255, 1.2, undefined, 0.34),
  P("tower", -60, 1.0, undefined, 0.22),
  P("bush", 150, 0.95, undefined, 0.48),
  P("tree", 300, 1.1, undefined, 0.2),
  P("grass", 60, 0.76, undefined, 0.74),
];

// EBEN-EZER — o campo entre Mizpá e Sem, com a PEDRA levantada por Samuel para
// marcar o lugar até onde o socorro chegou. Sol aberto: é memorial, não batalha.
const EBEN_EZER: StagePropSpec[] = [
  { ...P("rock", 0, 1.5, undefined, 0.5), tag: "eben-ezer" },
  P("tower", -285, 1.15, undefined, 0.26),
  P("bush", 200, 0.95, undefined, 0.42),
  P("tree", 300, 1.1, undefined, 0.2),
  { ...P("sun", 60, 1.1, undefined, 0.62), sky: true },
  P("grass", -120, 0.8, undefined, 0.72),
];

// AS CIDADES RESTITUÍDAS — de Ecrom até Gate: as praças que voltaram à mão de
// Israel, com o curral outra vez cheio e a palmeira da paz com os amorreus.
const CIDADES: StagePropSpec[] = [
  P("tower", -200, 1.2, undefined, 0.28),
  P("church", -40, 1.1, undefined, 0.34),
  P("tower", 180, 1.1, undefined, 0.24),
  P("stall", -320, 0.9, undefined, 0.36),
  P("palm", 300, 1.05, undefined, 0.18),
  P("grass", 60, 0.76, undefined, 0.74),
];

// O CIRCUITO — o giro anual do juiz: a pedra de Betel, a tenda de Gilgal e a
// torre de Mizpá enfileiradas no caminho que Samuel refaz de ano em ano.
const CIRCUITO: StagePropSpec[] = [
  P("rock", -265, 1.15, undefined, 0.36),
  P("tent", -80, 1.05, undefined, 0.3),
  P("tower", 120, 1.1, undefined, 0.26),
  P("bush", 210, 0.9, undefined, 0.44),
  P("tree", 300, 1.1, undefined, 0.2),
  P("grass", 0, 0.78, undefined, 0.74),
];

// RAMÁ — a casa de Samuel, para onde ele SEMPRE VOLTA, e o altar que ali
// edificou ao SENHOR. É o único lugar do livro que é casa dele.
const RAMA: StagePropSpec[] = [
  P("church", -150, 1.2, undefined, 0.28),
  P("door", -60, 0.9, undefined, 0.38),
  { ...P("altar", 110, 1.1, undefined, 0.48), tag: "altar-de-rama" },
  P("amphora", 205, 0.75, undefined, 0.62),
  P("tree", 285, 1.15, undefined, 0.2),
  P("grass", 20, 0.78, undefined, 0.74),
];

// ---------------------------------------------------------------- SETS 1Sm 8

// BERSEBA — o extremo sul, longe dos olhos do pai: o POÇO DO JURAMENTO, a
// tamareira do deserto, a cadeira do juízo e o caixote onde entra o suborno.
const BERSEBA: StagePropSpec[] = [
  { ...P("well", -120, 1.15, undefined, 0.46), tag: "poco-de-berseba" },
  P("throne", 40, 0.95, undefined, 0.4),
  P("tent", 145, 1.1, undefined, 0.28),
  P("palm", -300, 1.1, undefined, 0.16),
  P("crate", 225, 0.8, undefined, 0.52),
  P("rock", 285, 0.95, undefined, 0.62),
];

// A PRAÇA DE RAMÁ — onde Samuel protesta ao povo o COSTUME DO REI: chão pisado
// entre a casa e a torre, os caixotes do mercado e as talhas do dia a dia. É a
// vida comum que o rei virá dizimar.
const PRACA: StagePropSpec[] = [
  P("church", -260, 1.15, undefined, 0.26),
  P("tower", 260, 1.15, undefined, 0.24),
  P("crate", 120, 0.85, undefined, 0.58),
  P("amphora", -160, 0.8, undefined, 0.62),
  P("rock", -60, 1.0, undefined, 0.56),
  P("grass", 30, 0.74, undefined, 0.74),
];

// ---------------------------------------------------------------- SETS 1Sm 9

// GIBEÁ DE BENJAMIM — a casa de Quis, homem poderoso: a tenda grande, a porta,
// o CURRAL de onde as jumentas se perderam e os caixotes da fazenda.
const GIBEA: StagePropSpec[] = [
  P("tent", -170, 1.2, undefined, 0.26),
  P("door", -60, 0.9, undefined, 0.38),
  P("stall", 130, 1.1, undefined, 0.34),
  P("crate", 40, 0.8, undefined, 0.62),
  P("tree", 290, 1.1, undefined, 0.2),
  P("grass", 220, 0.78, undefined, 0.72),
];

// A ESTRADA DAS JUMENTAS — a montanha de Efraim e as terras de Salisa, Saalim e
// Benjamim: pedra, mato e caminho, e nenhuma jumenta em lugar nenhum.
const ESTRADA: StagePropSpec[] = [
  P("rock", -290, 1.25, undefined, 0.3),
  P("tree", -120, 1.05, undefined, 0.22),
  P("bush", 60, 0.95, undefined, 0.52),
  P("rock", 250, 1.15, undefined, 0.38),
  P("grass", 160, 0.76, undefined, 0.74),
];

// A TERRA DE ZUFE — o fim da busca: a cidade do vidente já aparece na encosta,
// com a torre e o telhado por cima do caminho de terra.
const ZUFE: StagePropSpec[] = [
  P("tower", 250, 1.2, undefined, 0.26),
  P("church", 160, 1.0, undefined, 0.32),
  P("palm", -320, 1.05, undefined, 0.18),
  P("bush", -80, 0.9, undefined, 0.48),
  P("rock", -240, 1.05, undefined, 0.52),
  P("grass", 40, 0.76, undefined, 0.74),
];

// A FONTE DA SUBIDA — onde as moças saem a tirar água na entrada da cidade: o
// poço da encosta, as talhas no chão e a cidade logo acima.
const FONTE: StagePropSpec[] = [
  { ...P("well", -40, 1.15, undefined, 0.5), tag: "fonte-das-mocas-de-zufe" },
  P("amphora", 60, 0.85, undefined, 0.64),
  P("church", 200, 1.05, undefined, 0.3),
  P("tower", 320, 1.1, undefined, 0.24),
  P("palm", -260, 1.05, undefined, 0.2),
  P("grass", -150, 0.76, undefined, 0.72),
];

// A PORTA DA CIDADE — o meio da cidade, onde Samuel sai ao encontro de Saul a
// caminho do alto: o portão largo, a torre e as casas da rua.
const PORTA: StagePropSpec[] = [
  P("door", 0, 1.25, undefined, 0.4),
  P("tower", -190, 1.25, undefined, 0.26),
  P("church", 180, 1.1, undefined, 0.3),
  P("crate", 265, 0.85, undefined, 0.58),
  P("rock", -285, 0.95, undefined, 0.6),
  P("grass", 90, 0.74, undefined, 0.74),
];

// A VÉSPERA EM RAMÁ — a noite de um dia antes, quando o SENHOR revelou aos
// OUVIDOS de Samuel quem viria: casa, altar, estrelas e ninguém mais.
const VESPERA: StagePropSpec[] = [
  P("church", -170, 1.15, undefined, 0.28),
  P("altar", 120, 1.05, undefined, 0.46),
  { ...P("starfield", 0, 1.1, undefined, 0.82), sky: true },
  { ...P("moon", 205, 0.95, undefined, 0.6), sky: true },
  P("rock", -290, 0.95, undefined, 0.58),
  P("grass", 40, 0.74, undefined, 0.74),
];

// A CÂMARA DO ALTO — o cenáculo do sacrifício, com os trinta convidados, a mesa
// posta, o altar do alto lá fora e a ESPÁDUA guardada de propósito.
const CAMARA: StagePropSpec[] = [
  { ...P("church", -230, 1.2, undefined, 0.28), tag: "camara-do-alto" },
  P("crate", -40, 0.9, undefined, 0.6),
  { ...P("bowl", 45, 0.85, undefined, 0.64), tag: "espadua-reservada" },
  P("amphora", 130, 0.8, undefined, 0.6),
  P("altar", 240, 1.05, undefined, 0.42),
  P("campfire", 310, 0.95, undefined, 0.52),
];

// O EIRADO — o terraço da casa, onde Samuel fala com Saul de noite: o telhado
// alto, a talha de água, a cidade escura e o céu estrelado por cima.
const EIRADO: StagePropSpec[] = [
  { ...P("church", -80, 1.35, undefined, 0.3), tag: "eirado-de-samuel" },
  P("amphora", 150, 0.8, undefined, 0.62),
  P("tower", 280, 1.05, undefined, 0.26),
  { ...P("starfield", -20, 1.1, undefined, 0.84), sky: true },
  { ...P("moon", 165, 0.9, undefined, 0.62), sky: true },
  P("grass", -260, 0.72, undefined, 0.74),
];

// A EXTREMIDADE DA CIDADE — ao subir da alva: a última casa para trás, o campo
// aberto adiante e o sol ainda rente ao horizonte.
const EXTREMIDADE: StagePropSpec[] = [
  P("tower", -270, 1.15, undefined, 0.26),
  P("bush", 90, 0.9, undefined, 0.46),
  P("rock", 220, 1.05, undefined, 0.52),
  P("palm", 310, 1.05, undefined, 0.18),
  { ...P("sun", -60, 1.0, undefined, 0.14), sky: true },
  P("grass", -140, 0.76, undefined, 0.74),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ----------------------------------------------------------------- 1Sm 7
  7: {
    start: { terrain: "field", night: 0.36, glory: 0.3, storm: 0, fire: 0, water: 0, verdure: 0.3 },
    beats: [
      // v.1 — os homens de Quiriate-Jearim SOBEM a arca ao outeiro, à casa de
      // Abinadabe, e consagram ELEAZAR para guardá-la. Os dois que a carregam
      // vêm da esquerda; pai e filho a recebem à porta.
      b(1, { q: "e a trouxeram à casa de Abinadabe, no outeiro", set: "quiriate", props: QUIRIATE,
        env: { terrain: "field", night: 0.3, glory: 0.52, verdure: 0.3 }, cast: [
        C("homem", -250, "walk", { dy: 0.56, facing: 1, id: "homem-de-quiriate-jearim1" }),
        C("homem", -180, "walk", { dy: 0.64, facing: 1, id: "homem-de-quiriate-jearim2" }),
        C("anciao", 60, "stand", { dy: 0.5, facing: -1, id: "abinadabe" }),
        C("homem", 155, "stand", { dy: 0.44, facing: -1, id: "eleazar-de-abinadabe", glow: 0.35 }),
      ] }),
      // v.2 — VINTE ANOS parados: a arca fica, Eleazar guarda, e toda a casa de
      // Israel LAMENTA pelo Senhor. Luto longo — figuras individuais curvadas,
      // nunca multidão (que o motor desenha sempre comemorando). Noite alta.
      b(2, { q: "lamentava toda a casa de Israel pelo Senhor",
        env: { night: 0.55, glory: 0.2, verdure: 0.22 }, cast: [
        C("homem", -120, "stand", { dy: 0.44, facing: 1, id: "eleazar-de-abinadabe", glow: 0.3 }),
        C("anciao", 250, "bow", { dy: 0.5, facing: -1, id: "abinadabe" }),
        C("homem", 90, "bow", { dy: 0.6, facing: -1, id: "israelita-que-suspira1" }),
        C("mulherComum", 180, "kneel", { dy: 0.66, facing: -1, id: "israelita-que-suspira2" }),
      ] }),
      // v.3 — SAMUEL aparece pela primeira vez como juiz do povo (patriarca, não
      // mais o menino de Siló) e aponta para os ídolos: TIRAI OS DEUSES
      // ESTRANHOS E OS ASTAROTES. O bezerro e a coluna ainda estão no campo.
      b(3, { by: "patriarca", q: "tirai dentre vós os deuses estranhos e os astarotes",
        set: "idolos", props: IDOLOS,
        env: { terrain: "field", night: 0.4, glory: 0.5, verdure: 0.28 }, cast: [
        C("patriarca", -60, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.55 }),
        C("homem", 120, "stand", { dy: 0.56, facing: -1, id: "israelita-idolatra1" }),
        C("mulherComum", 220, "stand", { dy: 0.62, facing: -1, id: "israelita-idolatra2" }),
        C("anciao", 300, "bow", { dy: 0.48, facing: -1, id: "anciao-de-israel1" }),
      ] }),
      // v.4 — obedecem: os baalins e os astarotes SAEM DO QUADRO (o set troca
      // para o campo limpo) e Israel serve só ao Senhor. Os dois que carregavam
      // o ídolo saem de cena pela direita; a glória sobe.
      b(4, { q: "tiraram dentre si aos baalins e aos astarotes, e serviram só ao Senhor",
        set: "limpo", props: LIMPO,
        env: { night: 0.26, glory: 0.66, verdure: 0.38 }, cast: [
        C("patriarca", -230, "raise", { dy: 0.48, facing: 1, id: "samuel", glow: 0.6 }),
        C("homem", -40, "walk", { dy: 0.6, facing: -1, id: "israelita-idolatra1" }),
        C("mulherComum", 70, "walk", { dy: 0.66, facing: -1, id: "israelita-idolatra2" }),
        C("anciao", 230, "stand", { dy: 0.5, facing: 1, id: "anciao-de-israel1" }),
      ] }),
      // v.5 — a convocação: CONGREGAI A TODO O ISRAEL EM MIZPÁ, e orarei por
      // vós. Samuel fala ao centro, o ancião já se põe a caminho.
      b(5, { by: "patriarca", q: "Disse mais Samuel:",
        env: { glory: 0.7 }, cast: [
        C("patriarca", -100, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.65 }),
        C("anciao", 120, "walk", { dy: 0.54, facing: 1, id: "anciao-de-israel1" }),
        C("homem", 240, "walk", { dy: 0.6, facing: 1, id: "israelita-idolatra1" }),
      ] }),
      // v.6 — MIZPÁ: tiram água e a DERRAMAM perante o Senhor, jejuam e
      // confessam "pecamos contra o Senhor". Confissão é cena de dobrar joelho:
      // figuras individuais em kneel/bow, e a talha da água em cena.
      b(6, { q: "e tiraram água, e a derramaram perante o Senhor", set: "mizpa", props: MIZPA,
        env: { terrain: "field", night: 0.42, glory: 0.46, water: 0.16, verdure: 0.24 }, cast: [
        C("patriarca", -180, "raise", { dy: 0.46, facing: 1, id: "samuel", glow: 0.62 }),
        C("homem", 40, "kneel", { dy: 0.6, facing: 1, id: "homem-de-israel-em-mizpa1" }),
        C("mulherComum", 150, "bow", { dy: 0.66, facing: -1, id: "mulher-de-israel-em-mizpa" }),
        C("anciao", 250, "kneel", { dy: 0.52, facing: -1, id: "anciao-de-israel1" }),
      ] }),
      // v.7 — os MAIORAIS DOS FILISTEUS ouvem e sobem contra Israel; o povo
      // TEME. A tempestade da guerra entra pela direita; ninguém do lado
      // opressor recebe glow.
      b(7, { q: "subiram os maiorais dos filisteus contra Israel",
        env: { night: 0.54, glory: 0.26, storm: 0.4 }, cast: [
        C("rei", 265, "walk", { dy: 0.4, facing: -1, id: "maioral-filisteu1" }),
        C("homem", 185, "walk", { dy: 0.48, facing: -1, id: "filisteu-de-mizpa1" }),
        C("homem", -60, "bow", { dy: 0.62, facing: 1, id: "homem-de-israel-em-mizpa1" }),
        C("patriarca", -235, "stand", { dy: 0.46, facing: 1, id: "samuel", glow: 0.5 }),
      ] }),
      // v.8 — o povo pede: NÃO CESSES DE CLAMAR AO SENHOR POR NÓS. Quem fala é
      // um homem de Israel — por isso ele é o PRIMEIRO `homem` do elenco.
      b(8, { by: "homem", q: "disseram os filhos de Israel a Samuel:",
        env: { night: 0.56, glory: 0.3, storm: 0.45 }, cast: [
        C("homem", -80, "kneel", { dy: 0.62, facing: 1, id: "homem-de-israel-em-mizpa1" }),
        C("patriarca", -240, "stand", { dy: 0.46, facing: 1, id: "samuel", glow: 0.55 }),
        C("anciao", 20, "bow", { dy: 0.56, facing: 1, id: "anciao-de-israel1" }),
        C("rei", 285, "stand", { dy: 0.38, facing: -1, id: "maioral-filisteu1" }),
      ] }),
      // v.9 — o CORDEIRO DE MAMA sacrificado INTEIRO em holocausto, e Samuel
      // clama — e o Senhor LHE DEU OUVIDOS. Aqui o fogo é real: `altar` com
      // fire (env.fire sozinho não desenha chama nenhuma).
      b(9, { q: "tomou Samuel um cordeiro de mama, e sacrificou-o inteiro em holocausto ao Senhor",
        set: "mizpa-altar", props: MIZPA_ALTAR,
        env: { water: 0, night: 0.5, glory: 0.76, storm: 0.5, fire: 0.4 }, cast: [
        C("patriarca", -110, "kneel", { dy: 0.56, facing: 1, id: "samuel", glow: 0.75 }),
        C("homem", -240, "bow", { dy: 0.58, facing: 1, id: "homem-de-israel-em-mizpa1" }),
        C("rei", 290, "walk", { dy: 0.4, facing: -1, id: "maioral-filisteu1" }),
      ] }),
      // v.10 — ⭐ E TROVEJOU O SENHOR AQUELE DIA COM GRANDE ESTRONDO. A resposta
      // não é fala: é RAÍDO — `storm` no auge com glória alta. Os filisteus caem
      // confundidos (individuais em `lie`, jamais multidão festiva).
      b(10, { q: "e trovejou o Senhor aquele dia com grande estrondo sobre os filisteus",
        props: [
          { ...P("altar", -30, 1.2, 1, 0.5), tag: "cordeiro-de-mama" },
          P("tower", -255, 1.25, undefined, 0.26),
          P("well", 150, 0.95, undefined, 0.4),
          P("rock", 285, 1.0, undefined, 0.58),
          P("grass", 60, 0.76, undefined, 0.74),
        ],
        env: { night: 0.6, glory: 0.88, storm: 0.95, fire: 0.32 }, cast: [
        C("patriarca", -145, "raise", { dy: 0.54, facing: 1, id: "samuel", glow: 0.95 }),
        C("rei", 210, "lie", { dy: 0.5, id: "maioral-filisteu1" }),
        C("homem", 110, "lie", { dy: 0.62, id: "filisteu-de-mizpa1" }),
        C("homem", 295, "bow", { dy: 0.42, facing: 1, id: "filisteu-de-mizpa2" }),
      ] }),
      // v.11 — a perseguição: os homens de Israel SAEM de Mizpá e ferem os
      // filisteus até abaixo de BETE-CAR. Todo mundo em movimento para a
      // direita; a torre de Mizpá já é pequena ao fundo.
      b(11, { q: "e perseguiram os filisteus, e os feriram até abaixo de Bete-Car",
        set: "bete-car", props: BETE_CAR,
        env: { water: 0, terrain: "field", night: 0.48, glory: 0.6, storm: 0.5, fire: 0.1, verdure: 0.26 }, cast: [
        C("homem", -140, "walk", { dy: 0.58, facing: 1, id: "homem-de-israel-em-mizpa1" }),
        C("homem", -30, "walk", { dy: 0.66, facing: 1, id: "homem-de-israel-em-mizpa2" }),
        C("homem", 200, "walk", { dy: 0.52, facing: 1, id: "filisteu-de-mizpa2" }),
        C("rei", 295, "walk", { dy: 0.44, facing: 1, id: "maioral-filisteu1" }),
      ] }),
      // v.12 — ⭐ a PEDRA entre Mizpá e Sem, chamada EBENÉZER: "ATÉ AQUI NOS
      // AJUDOU O SENHOR". Memorial, não batalha — sol aberto, storm zerado.
      b(12, { by: "patriarca", q: "e disse:", set: "eben-ezer", props: EBEN_EZER,
        env: { water: 0, terrain: "field", night: 0.2, glory: 0.82, storm: 0, fire: 0, verdure: 0.34 }, cast: [
        C("patriarca", -70, "raise", { dy: 0.54, facing: 1, id: "samuel", glow: 0.85 }),
        C("homem", 150, "stand", { dy: 0.6, facing: -1, id: "homem-de-israel-em-mizpa1" }),
        C("anciao", 245, "bow", { dy: 0.5, facing: -1, id: "anciao-de-israel1" }),
      ] }),
      // v.13 — os filisteus ABATIDOS: nunca mais vieram aos termos de Israel,
      // porque a MÃO DO SENHOR esteve contra eles todos os dias de Samuel. O
      // filisteu aparece pequeno e de costas, saindo do quadro.
      b(13, { q: "nunca mais vieram aos termos de Israel",
        env: { night: 0.24, glory: 0.7, verdure: 0.36 }, cast: [
        C("patriarca", -30, "stand", { dy: 0.52, facing: 1, id: "samuel", glow: 0.7 }),
        C("homem", 250, "walk", { dy: 0.36, facing: 1, id: "filisteu-de-mizpa2", scale: 0.8 }),
        C("homem", -220, "stand", { dy: 0.6, facing: 1, id: "homem-de-israel-em-mizpa1" }),
      ] }),
      // v.14 — as cidades RESTITUÍDAS, de Ecrom até Gate, e PAZ com os amorreus.
      // Aqui a multidão cabe: é festa de povo, e o motor a desenha comemorando.
      b(14, { q: "houve paz entre Israel e entre os amorreus", set: "cidades", props: CIDADES,
        env: { water: 0, terrain: "city", night: 0.24, glory: 0.68, verdure: 0.3 }, cast: [
        C("multidao", 110, "stand", { dy: 0.6, id: "povo-de-israel-restituido" }),
        C("patriarca", -180, "stand", { dy: 0.48, facing: 1, id: "samuel", glow: 0.6 }),
        C("homem", 265, "stand", { dy: 0.44, facing: -1, id: "amorreu-em-paz" }),
      ] }),
      // v.15 — SAMUEL JULGOU A ISRAEL TODOS OS DIAS DA SUA VIDA: a cena vira
      // tribunal de estrada — dois que litigam diante dele, no caminho.
      b(15, { q: "E Samuel julgou a Israel todos os dias da sua vida",
        set: "circuito", props: CIRCUITO,
        env: { water: 0, terrain: "field", night: 0.3, glory: 0.55, verdure: 0.34 }, cast: [
        C("patriarca", -170, "stand", { dy: 0.5, facing: 1, id: "samuel", glow: 0.58 }),
        C("homem", 30, "bow", { dy: 0.6, facing: 1, id: "litigante-de-israel1" }),
        C("mulherComum", 140, "kneel", { dy: 0.64, facing: -1, id: "litigante-de-israel2" }),
      ] }),
      // v.16 — o CIRCUITO ANUAL: Betel, Gilgal e Mizpá. Samuel caminha entre os
      // três marcos do set (a pedra, a tenda e a torre), e em cada um há gente
      // esperando o juiz chegar.
      b(16, { q: "rodeava a Betel, e a Gilgal, e a Mizpá",
        env: { night: 0.26, glory: 0.6, verdure: 0.36 }, cast: [
        C("patriarca", -30, "walk", { dy: 0.56, facing: 1, id: "samuel", glow: 0.6 }),
        C("anciao", -250, "stand", { dy: 0.5, facing: 1, id: "anciao-de-betel" }),
        C("homem", 90, "stand", { dy: 0.62, facing: -1, id: "homem-de-gilgal" }),
        C("homem", 210, "stand", { dy: 0.46, facing: -1, id: "homem-de-israel-em-mizpa1" }),
      ] }),
      // v.17 — mas VOLTAVA A RAMÁ, porque estava ali a sua casa; e ali edificou
      // um ALTAR ao Senhor. O capítulo fecha em casa, com o altar aceso pela
      // glória e não pela guerra.
      b(17, { q: "e edificou ali um altar ao Senhor", set: "rama", props: RAMA,
        env: { water: 0, terrain: "field", night: 0.24, glory: 0.74, verdure: 0.4 }, cast: [
        C("patriarca", 30, "kneel", { dy: 0.56, facing: 1, id: "samuel", glow: 0.8 }),
        C("homem", -220, "stand", { dy: 0.54, facing: 1, id: "litigante-de-israel1" }),
      ] }),
    ],
  },

  // ----------------------------------------------------------------- 1Sm 8
  8: {
    start: { terrain: "field", night: 0.34, glory: 0.34, storm: 0, fire: 0, water: 0, verdure: 0.32 },
    beats: [
      // v.1 — Samuel ENVELHECEU e constitui os filhos por juízes. Em Ramá, o pai
      // de pé diante dos dois moços — o mesmo erro de Eli começando de novo.
      b(1, { q: "tendo Samuel envelhecido, constituiu a seus filhos por juízes sobre Israel",
        set: "rama", props: RAMA,
        env: { terrain: "field", night: 0.32, glory: 0.48, verdure: 0.36 }, cast: [
        C("patriarca", -120, "stand", { dy: 0.5, facing: 1, id: "samuel", glow: 0.5 }),
        C("homem", 60, "stand", { dy: 0.54, facing: -1, id: "joel-filho-samuel" }),
        C("homem", 165, "stand", { dy: 0.6, facing: -1, id: "abias-filho-samuel" }),
      ] }),
      // v.2 — JOEL e ABIA, juízes em BERSEBA: o extremo sul, longe do pai. Poço
      // do juramento, tamareira e a cadeira do juízo — outro mundo, outro set.
      b(2, { q: "e foram juízes em Berseba", set: "berseba", props: BERSEBA,
        env: { terrain: "desert", night: 0.3, glory: 0.3, verdure: 0.1 }, cast: [
        C("homem", -30, "stand", { dy: 0.5, facing: 1, id: "joel-filho-samuel" }),
        C("homem", 95, "stand", { dy: 0.58, facing: -1, id: "abias-filho-samuel" }),
        C("servo", 235, "stand", { dy: 0.62, facing: -1, id: "servo-de-berseba" }),
      ] }),
      // v.3 — a AVAREZA: aceitam SUBORNO e PERVERTEM O DIREITO. O que paga se
      // curva com o caixote atrás; a que devia ser ouvida fica de joelhos do
      // lado oposto, sem ninguém olhar para ela. Glória em baixa.
      b(3, { q: "antes se inclinaram à avareza, e aceitaram suborno, e perverteram o direito",
        env: { night: 0.5, glory: 0.14, verdure: 0.08 }, cast: [
        C("homem", -20, "point", { dy: 0.5, facing: 1, id: "joel-filho-samuel" }),
        C("homem", 105, "stand", { dy: 0.56, facing: -1, id: "abias-filho-samuel" }),
        C("homem", 255, "bow", { dy: 0.62, facing: -1, id: "subornador-de-berseba" }),
        C("mulherComum", -230, "kneel", { dy: 0.66, facing: 1, id: "litigante-de-berseba" }),
      ] }),
      // v.4 — TODOS OS ANCIÃOS de Israel se congregam e vêm a Samuel, A RAMÁ.
      // Três anciãos nomeados chegam pela direita; nada de figurante anônimo.
      b(4, { q: "os anciãos de Israel se congregaram, e vieram a Samuel, a Ramá",
        set: "rama", props: RAMA,
        env: { terrain: "field", night: 0.34, glory: 0.42, verdure: 0.34 }, cast: [
        C("anciao", 90, "walk", { dy: 0.5, facing: -1, id: "anciao-de-israel1" }),
        C("anciao", 185, "walk", { dy: 0.58, facing: -1, id: "anciao-de-israel2" }),
        C("anciao", 265, "walk", { dy: 0.44, facing: -1, id: "anciao-de-israel3" }),
        C("patriarca", -140, "stand", { dy: 0.48, facing: 1, id: "samuel", glow: 0.45 }),
      ] }),
      // v.5 — o pedido: CONSTITUI-NOS AGORA UM REI SOBRE NÓS, COMO O TÊM TODAS
      // AS NAÇÕES. Fala o ancião (primeiro `anciao` do elenco), apontando para
      // Samuel; os outros dois fecham o semicírculo.
      b(5, { by: "anciao", q: "E disseram-lhe:",
        env: { night: 0.36, glory: 0.4 }, cast: [
        C("anciao", 70, "point", { dy: 0.52, facing: -1, id: "anciao-de-israel1" }),
        C("anciao", 175, "stand", { dy: 0.6, facing: -1, id: "anciao-de-israel2" }),
        C("anciao", 255, "stand", { dy: 0.44, facing: -1, id: "anciao-de-israel3" }),
        C("patriarca", -150, "stand", { dy: 0.48, facing: 1, id: "samuel", glow: 0.45 }),
      ] }),
      // v.6 — a palavra PARECEU MAL aos olhos de Samuel — e ele não responde ao
      // povo: ORA AO SENHOR. Samuel de joelhos ao centro, os anciãos recuados.
      b(6, { q: "Porém esta palavra pareceu mal aos olhos de Samuel",
        env: { night: 0.34, glory: 0.58 }, cast: [
        C("patriarca", -60, "kneel", { dy: 0.56, facing: 1, id: "samuel", glow: 0.6 }),
        C("anciao", 175, "stand", { dy: 0.5, facing: -1, id: "anciao-de-israel1" }),
        C("anciao", 265, "stand", { dy: 0.42, facing: -1, id: "anciao-de-israel2" }),
      ] }),
      // v.7 — ⭐ VOZ DO CÉU, sem mediador: "NÃO TE TÊM REJEITADO A TI, ANTES A
      // MIM ME TÊM REJEITADO". Nenhuma figura para Deus — só glória alta e
      // Samuel sozinho, de joelhos, ouvindo.
      b(7, { by: "deus", q: "E disse o Senhor a Samuel:",
        env: { night: 0.18, glory: 0.9 }, cast: [
        C("patriarca", 0, "kneel", { dy: 0.56, facing: 1, id: "samuel", glow: 0.55 }),
      ] }),
      // v.8 — a queixa antiga: desde o Egito ME DEIXARAM E A OUTROS DEUSES
      // SERVIRAM. O bezerro entra no canto do quadro como lembrança do que eles
      // sempre fizeram — e Samuel se curva ao ouvir.
      b(8, { by: "deus", q: "a mim me deixaram, e a outros deuses serviram",
        props: [
          P("church", -150, 1.2, undefined, 0.28),
          P("door", -60, 0.9, undefined, 0.38),
          { ...P("altar", 110, 1.1, undefined, 0.48), tag: "altar-de-rama" },
          { ...P("calf", 265, 0.95, undefined, 0.6), tag: "astarotes-e-baalins" },
          P("tree", 300, 1.15, undefined, 0.2),
          P("grass", 20, 0.78, undefined, 0.74),
        ],
        env: { night: 0.22, glory: 0.84 }, cast: [
        C("patriarca", -20, "bow", { dy: 0.58, facing: 1, id: "samuel", glow: 0.5 }),
      ] }),
      // v.9 — a ordem dupla: OUVE À SUA VOZ, PORÉM PROTESTA-LHES SOLENEMENTE e
      // declara o COSTUME DO REI. Samuel se levanta para ir cumpri-la.
      b(9, { by: "deus", q: "declara-lhes qual será o costume do rei que houver de reinar sobre eles",
        env: { night: 0.18, glory: 0.92 }, cast: [
        C("patriarca", -40, "stand", { dy: 0.52, facing: 1, id: "samuel", glow: 0.62 }),
      ] }),
      // v.10 — Samuel FALA TODAS AS PALAVRAS DO SENHOR ao povo que lhe pedia um
      // rei. Muda o lugar: a praça de Ramá, com o povo reunido diante dele.
      b(10, { q: "E falou Samuel todas as palavras do Senhor ao povo", set: "praca", props: PRACA,
        env: { terrain: "city", night: 0.32, glory: 0.6, verdure: 0.18 }, cast: [
        C("patriarca", -170, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.62 }),
        C("multidao", 80, "stand", { dy: 0.6, id: "povo-que-pede-rei" }),
        C("anciao", 255, "stand", { dy: 0.44, facing: -1, id: "anciao-de-israel1" }),
      ] }),
      // v.11 — o COSTUME DO REI começa pelos FILHOS: para os carros, para
      // cavaleiros, para CORREREM ADIANTE dos seus carros. O cavaleiro do rei
      // entra em cena e o moço já vai correndo à frente dele.
      b(11, { by: "patriarca", q: "E disse:",
        env: { night: 0.36, glory: 0.5 }, cast: [
        C("patriarca", -205, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.6 }),
        C("cavaleiro", 155, "stand", { dy: 0.4, facing: -1, id: "cavaleiro-do-rei" }),
        C("servo", 20, "walk", { dy: 0.64, facing: -1, id: "filho-tomado-pelo-rei" }),
        C("multidao", 290, "stand", { dy: 0.56, id: "povo-que-pede-rei" }),
      ] }),
      // v.12 — chefes de mil e de cinquenta; e os mesmos filhos LAVRANDO,
      // SEGANDO e fabricando armas. O feixe da sega entra no quadro e o moço
      // aparece carregado de trabalho, não de honra.
      b(12, { by: "patriarca", q: "E os porá por chefes de mil, e de cinqüenta",
        props: [
          P("church", -260, 1.15, undefined, 0.26),
          P("tower", 260, 1.15, undefined, 0.24),
          P("sheaf", 100, 0.95, undefined, 0.6),
          P("crate", 175, 0.85, undefined, 0.54),
          P("rock", -60, 1.0, undefined, 0.56),
          P("grass", 30, 0.74, undefined, 0.74),
        ],
        env: { night: 0.38, glory: 0.46 }, cast: [
        C("patriarca", -200, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.58 }),
        C("servo", 40, "bow", { dy: 0.64, facing: 1, id: "filho-tomado-pelo-rei" }),
        C("cavaleiro", 215, "stand", { dy: 0.4, facing: -1, id: "cavaleiro-do-rei" }),
      ] }),
      // v.13 — e as FILHAS: perfumistas, cozinheiras e PADEIRAS. A cena vira
      // cozinha do palácio — o forno aceso (campfire desenha chama de verdade),
      // as tigelas e as talhas, e duas moças de Israel presas ao serviço.
      b(13, { by: "patriarca", q: "E tomará as vossas filhas para perfumistas, cozinheiras e padeiras",
        props: [
          P("church", -260, 1.15, undefined, 0.26),
          P("campfire", 150, 1.0, undefined, 0.5),
          P("bowl", 60, 0.85, undefined, 0.64),
          P("amphora", -40, 0.8, undefined, 0.62),
          P("crate", 245, 0.85, undefined, 0.56),
          P("grass", 300, 0.74, undefined, 0.74),
        ],
        env: { night: 0.4, glory: 0.44, fire: 0.24 }, cast: [
        C("patriarca", -205, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.58 }),
        C("mulherComum", 30, "kneel", { dy: 0.66, facing: -1, id: "filha-padeira-do-rei" }),
        C("mulherComum", 200, "stand", { dy: 0.58, facing: -1, id: "filha-perfumista-do-rei" }),
      ] }),
      // v.14 — e as TERRAS: o melhor dos campos, das VINHAS e dos OLIVAIS,
      // dado aos seus servos. O parreiral e a oliveira entram, e quem colhe já
      // não é o dono — é o servo do rei.
      b(14, { by: "patriarca", q: "E tomará o melhor das vossas terras, e das vossas vinhas, e dos vossos olivais",
        props: [
          P("grapes", 60, 1.15, undefined, 0.44),
          P("tree", 210, 1.15, undefined, 0.22),
          P("tree", -290, 1.05, undefined, 0.2),
          P("crate", 150, 0.85, undefined, 0.6),
          P("rock", 300, 0.95, undefined, 0.62),
          P("grass", -60, 0.8, undefined, 0.74),
        ],
        env: { terrain: "field", night: 0.36, glory: 0.46, fire: 0, verdure: 0.42 }, cast: [
        C("patriarca", -200, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.58 }),
        C("servo", 120, "bow", { dy: 0.64, facing: -1, id: "servo-do-rei-que-colhe" }),
        C("homem", 265, "stand", { dy: 0.5, facing: -1, id: "lavrador-de-israel" }),
      ] }),
      // v.15 — o DÍZIMO das sementes e das vinhas, para os oficiais e os servos
      // do rei. Os feixes e os caixotes se empilham de um lado só do quadro: o
      // lado de quem recebe.
      b(15, { by: "patriarca", q: "E as vossas sementes, e as vossas vinhas dizimará",
        props: [
          P("sheaf", 90, 1.0, undefined, 0.58),
          P("sheaf", 160, 0.95, undefined, 0.66),
          P("grapes", -80, 1.1, undefined, 0.42),
          P("crate", 230, 0.9, undefined, 0.56),
          P("tower", 300, 1.1, undefined, 0.24),
          P("grass", -250, 0.78, undefined, 0.74),
        ],
        env: { night: 0.4, glory: 0.42, verdure: 0.36 }, cast: [
        C("patriarca", -200, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.56 }),
        C("servo", 30, "bow", { dy: 0.66, facing: -1, id: "servo-do-rei-que-colhe" }),
        C("homem", 265, "stand", { dy: 0.46, facing: -1, id: "oficial-do-rei" }),
      ] }),
      // v.16 — e os SERVOS, as SERVAS, os melhores moços e os JUMENTOS: tudo
      // levado para o trabalho do rei. O curral e a récua entram em cena — é o
      // mesmo jumento que abrirá o capítulo 9, agora na conta do rei.
      b(16, { by: "patriarca", q: "e os vossos melhores moços, e os vossos jumentos tomará",
        props: [
          P("stall", 140, 1.15, undefined, 0.34),
          P("crate", 40, 0.85, undefined, 0.6),
          P("church", -270, 1.1, undefined, 0.26),
          P("rock", 280, 0.95, undefined, 0.6),
          P("grass", -60, 0.78, undefined, 0.74),
        ],
        env: { night: 0.42, glory: 0.38, verdure: 0.24 }, cast: [
        C("patriarca", -200, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.55 }),
        C("rebanho", 190, "walk", { dy: 0.52, facing: -1, id: "jumentos-tomados-pelo-rei" }),
        C("servo", 20, "walk", { dy: 0.66, facing: -1, id: "filho-tomado-pelo-rei" }),
        C("mulherComum", 100, "walk", { dy: 0.6, facing: -1, id: "serva-tomada-pelo-rei" }),
      ] }),
      // v.17 — o fim da conta: DIZIMARÁ O VOSSO REBANHO, E VÓS LHE SEREIS POR
      // SERVOS. O povo que pediu senhor recebe senhorio: as duas figuras de
      // Israel curvadas diante do rebanho que já não é delas.
      b(17, { by: "patriarca", q: "Dizimará o vosso rebanho, e vós lhe servireis de servos",
        env: { night: 0.48, glory: 0.3, verdure: 0.2 }, cast: [
        C("patriarca", -200, "raise", { dy: 0.5, facing: 1, id: "samuel", glow: 0.55 }),
        C("rebanho", 210, "stand", { dy: 0.5, facing: -1, id: "rebanho-dizimado-pelo-rei" }),
        C("servo", 20, "bow", { dy: 0.66, facing: -1, id: "filho-tomado-pelo-rei" }),
        C("homem", 110, "bow", { dy: 0.58, facing: -1, id: "lavrador-de-israel" }),
      ] }),
      // v.18 — ⭐ "NAQUELE DIA CLAMAREIS POR CAUSA DO VOSSO REI... MAS O SENHOR
      // NÃO VOS OUVIRÁ". Cena de lamento: noite alta, glória em baixa e figuras
      // individuais clamando — multidão festiva aqui seria mentira.
      b(18, { by: "patriarca", q: "mas o Senhor não vos ouvirá naquele dia",
        props: [
          P("church", -270, 1.15, undefined, 0.26),
          P("tower", 250, 1.2, undefined, 0.24),
          P("rock", 60, 1.05, undefined, 0.58),
          P("amphora", -110, 0.78, undefined, 0.64),
          P("grass", 150, 0.72, undefined, 0.76),
        ],
        env: { terrain: "city", night: 0.62, glory: 0.14, storm: 0.22, verdure: 0.12 }, cast: [
        C("patriarca", -210, "raise", { dy: 0.5, facing: 1, id: "samuel", glow: 0.5 }),
        C("homem", 40, "raise", { dy: 0.6, facing: 1, id: "lavrador-de-israel" }),
        C("mulherComum", 150, "kneel", { dy: 0.66, facing: 1, id: "serva-tomada-pelo-rei" }),
        C("anciao", 255, "bow", { dy: 0.46, facing: 1, id: "anciao-de-israel1" }),
      ] }),
      // v.19 — o povo NÃO QUIS OUVIR: "NÃO, MAS HAVERÁ SOBRE NÓS UM REI". Fala
      // um homem do povo — primeiro `homem` do elenco —, com a multidão atrás
      // dele e Samuel calado do outro lado.
      b(19, { by: "homem", q: "e disseram:", set: "praca", props: PRACA,
        env: { terrain: "city", night: 0.5, glory: 0.24, storm: 0.1, verdure: 0.16 }, cast: [
        C("homem", 60, "raise", { dy: 0.6, facing: -1, id: "homem-de-israel-que-pede-rei" }),
        C("multidao", 190, "stand", { dy: 0.54, id: "povo-que-pede-rei" }),
        C("anciao", 290, "stand", { dy: 0.44, facing: -1, id: "anciao-de-israel1" }),
        C("patriarca", -200, "stand", { dy: 0.5, facing: 1, id: "samuel", glow: 0.42 }),
      ] }),
      // v.20 — a razão inteira, dita na cara: SEREMOS COMO TODAS AS OUTRAS
      // NAÇÕES, e o nosso rei SAIRÁ ADIANTE DE NÓS e fará as nossas guerras. O
      // homem aponta para fora do quadro, para a guerra que ainda não veio.
      b(20, { by: "homem", q: "E nós também seremos como todas as outras nações",
        env: { night: 0.52, glory: 0.22, storm: 0.16 }, cast: [
        C("homem", 40, "point", { dy: 0.62, facing: -1, id: "homem-de-israel-que-pede-rei" }),
        C("multidao", 175, "stand", { dy: 0.52, id: "povo-que-pede-rei" }),
        C("anciao", 285, "point", { dy: 0.44, facing: -1, id: "anciao-de-israel1" }),
        C("patriarca", -215, "bow", { dy: 0.52, facing: 1, id: "samuel", glow: 0.4 }),
      ] }),
      // v.21 — Samuel ouve tudo e REPETE AOS OUVIDOS DO SENHOR. Volta a Ramá, ao
      // altar dele: o juiz não discute com o povo, leva o caso para cima.
      b(21, { q: "as repetiu aos ouvidos do Senhor", set: "rama", props: RAMA,
        env: { terrain: "field", night: 0.3, glory: 0.66, storm: 0, verdure: 0.34 }, cast: [
        C("patriarca", 40, "kneel", { dy: 0.56, facing: 1, id: "samuel", glow: 0.68 }),
      ] }),
      // v.22 — a última palavra é do céu: DÁ OUVIDOS À SUA VOZ, E CONSTITUI-LHES
      // REI. Voz do céu (sem figura), glória no auge — e o povo já se dispersa,
      // cada um para a sua cidade, enquanto Samuel continua de joelhos.
      b(22, { by: "deus", q: "Dá ouvidos à sua voz, e constitui-lhes rei",
        env: { night: 0.2, glory: 0.94, verdure: 0.36 }, cast: [
        C("patriarca", -40, "kneel", { dy: 0.56, facing: 1, id: "samuel", glow: 0.6 }),
        C("homem", 160, "walk", { dy: 0.62, facing: -1, id: "homem-de-israel-que-pede-rei" }),
        C("anciao", 265, "walk", { dy: 0.48, facing: -1, id: "anciao-de-israel1" }),
      ] }),
    ],
  },

  // ----------------------------------------------------------------- 1Sm 9
  9: {
    start: { terrain: "field", night: 0.3, glory: 0.32, storm: 0, fire: 0, water: 0, verdure: 0.32 },
    beats: [
      // v.1 — a casa de QUIS, em Benjamim: HOMEM PODEROSO. A tenda grande, o
      // curral cheio e o dono de pé no seu pátio — a genealogia inteira do
      // versículo cabe nesta casa de fazenda.
      b(1, { q: "E havia um homem de Benjamim, cujo nome era Quis", set: "gibea", props: GIBEA,
        env: { terrain: "field", night: 0.28, glory: 0.36, verdure: 0.34 }, cast: [
        C("anciao", -60, "stand", { dy: 0.5, facing: 1, id: "quis" }),
        C("servo", 130, "stand", { dy: 0.6, facing: -1, id: "moco-de-saul" }),
      ] }),
      // v.2 — SAUL: moço, o mais belo de Israel, e DESDE OS OMBROS PARA CIMA
      // SOBRESSAÍA A TODO O POVO — por isso entra com `scale` maior que todos os
      // outros do quadro. Ainda não é rei: é `homem`.
      b(2, { q: "desde os ombros para cima sobressaía a todo o povo",
        env: { night: 0.24, glory: 0.44, verdure: 0.36 }, cast: [
        C("homem", 30, "stand", { dy: 0.5, facing: -1, id: "saul", scale: 1.3 }),
        C("anciao", -150, "stand", { dy: 0.52, facing: 1, id: "quis" }),
        C("homem", 205, "stand", { dy: 0.62, facing: -1, id: "benjamita-de-gibea" }),
        C("servo", 285, "stand", { dy: 0.66, facing: -1, id: "moco-de-saul" }),
      ] }),
      // v.3 — perdem-se as JUMENTAS e Quis manda: TOMA CONTIGO UM DOS MOÇOS E
      // VAI PROCURAR AS JUMENTAS. Quem fala é Quis (`anciao`), apontando para o
      // curral vazio — nenhum animal em cena, é essa a falta que move tudo.
      b(3, { by: "anciao", q: "por isso disse Quis a Saul, seu filho:",
        env: { night: 0.32, glory: 0.34, verdure: 0.3 }, cast: [
        C("anciao", -110, "point", { dy: 0.52, facing: 1, id: "quis" }),
        C("homem", 60, "stand", { dy: 0.54, facing: -1, id: "saul", scale: 1.3 }),
        C("servo", 190, "stand", { dy: 0.62, facing: -1, id: "moco-de-saul" }),
      ] }),
      // v.4 — a busca inteira num beat: a MONTANHA DE EFRAIM, Salisa, Saalim e a
      // terra de Benjamim — e nada. Terreno de montanha (céu fechado), os dois
      // andando de pedra em pedra, cansados.
      b(4, { q: "Passaram, pois, pela montanha de Efraim", set: "estrada", props: ESTRADA,
        env: { terrain: "mountain", night: 0.42, glory: 0.24, verdure: 0.2 }, cast: [
        C("homem", -80, "walk", { dy: 0.56, facing: 1, id: "saul", scale: 1.3 }),
        C("servo", -190, "walk", { dy: 0.62, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.5 — na TERRA DE ZUFE, Saul quer desistir: VEM, E VOLTEMOS, para que
      // meu pai não se aflija por causa de nós. A cidade do vidente já aparece
      // na encosta à direita — e Saul está virado para o lado contrário.
      b(5, { by: "homem", q: "Saul disse para o seu moço, com quem ele ia:",
        set: "zufe", props: ZUFE,
        env: { terrain: "field", night: 0.38, glory: 0.3, verdure: 0.26 }, cast: [
        C("homem", -60, "stand", { dy: 0.56, facing: -1, id: "saul", scale: 1.3 }),
        C("servo", 80, "stand", { dy: 0.62, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.6 — o MOÇO é quem sabe: HÁ NESTA CIDADE UM HOMEM DE DEUS, e tudo
      // quanto diz sucede infalivelmente. Ele aponta para a cidade; Saul se
      // volta. O criado vira o guia da história.
      b(6, { by: "servo", q: "Porém ele lhe disse:",
        env: { night: 0.34, glory: 0.42 }, cast: [
        C("servo", 60, "point", { dy: 0.62, facing: 1, id: "moco-de-saul" }),
        C("homem", -80, "stand", { dy: 0.56, facing: 1, id: "saul", scale: 1.3 }),
      ] }),
      // v.7 — a objeção de Saul: O PÃO DOS NOSSOS ALFORJES SE ACABOU e presente
      // nenhum temos. Ele abre as mãos vazias — o alforje é o que não há.
      b(7, { by: "homem", q: "Então Saul disse ao seu moço:",
        env: { night: 0.36, glory: 0.36 }, cast: [
        C("homem", -50, "raise", { dy: 0.58, facing: 1, id: "saul", scale: 1.3 }),
        C("servo", 100, "stand", { dy: 0.62, facing: -1, id: "moco-de-saul" }),
      ] }),
      // v.8 — o moço mostra o que tem na mão: UM QUARTO DE UM SICLO DE PRATA.
      // Ele estende a mão (point) para o alto da cidade; a glória sobe um pouco
      // — o pouco que ele tem é o que abre a porta.
      b(8, { by: "servo", q: "ainda se acha na minha mão um quarto de um siclo de prata",
        env: { night: 0.32, glory: 0.48 }, cast: [
        C("servo", 40, "point", { dy: 0.62, facing: 1, id: "moco-de-saul" }),
        C("homem", -90, "stand", { dy: 0.56, facing: 1, id: "saul", scale: 1.3 }),
      ] }),
      // v.9 — a NOTA DO NARRADOR entre parênteses: antigamente, ao profeta se
      // chamava VIDENTE. O rolo entra no quadro como marca da glosa; os dois
      // ficam parados no caminho enquanto o narrador explica.
      b(9, { q: "porque ao profeta de hoje, antigamente se chamava vidente",
        props: [
          P("scroll", -30, 0.95, undefined, 0.6),
          P("tower", 250, 1.2, undefined, 0.26),
          P("church", 160, 1.0, undefined, 0.32),
          P("palm", -320, 1.05, undefined, 0.18),
          P("rock", -230, 1.05, undefined, 0.52),
          P("grass", 60, 0.76, undefined, 0.74),
        ],
        env: { night: 0.3, glory: 0.5 }, cast: [
        C("homem", -120, "stand", { dy: 0.56, facing: 1, id: "saul", scale: 1.3 }),
        C("servo", 30, "stand", { dy: 0.64, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.10 — BEM DIZES; VEM, POIS, VAMOS. Saul aceita e os dois sobem para a
      // cidade: os dois andando juntos para a direita, rumo à torre.
      b(10, { by: "homem", q: "Então disse Saul ao moço:", set: "zufe", props: ZUFE,
        env: { night: 0.26, glory: 0.56, verdure: 0.28 }, cast: [
        C("homem", -40, "walk", { dy: 0.56, facing: 1, id: "saul", scale: 1.3 }),
        C("servo", -140, "walk", { dy: 0.62, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.11 — a SUBIDA da cidade: acham umas MOÇAS que saíam a tirar água, e
      // perguntam ESTÁ AQUI O VIDENTE? Quem fala é Saul (primeiro `homem` do
      // elenco); as moças estão no poço com as talhas.
      b(11, { by: "homem", q: "e disseram-lhes:", set: "fonte", props: FONTE,
        env: { terrain: "field", night: 0.26, glory: 0.54, water: 0.18, verdure: 0.3 }, cast: [
        C("homem", -190, "walk", { dy: 0.58, facing: 1, id: "saul", scale: 1.3 }),
        C("servo", -270, "walk", { dy: 0.64, facing: 1, id: "moco-de-saul" }),
        C("mulherComum", 30, "stand", { dy: 0.56, facing: -1, id: "moca-de-zufe1" }),
        C("mulherComum", 130, "kneel", { dy: 0.64, facing: -1, id: "moca-de-zufe2" }),
      ] }),
      // v.12 — as moças respondem: APRESSA-TE, porque HOJE VEIO À CIDADE e o
      // povo TEM HOJE SACRIFÍCIO NO ALTO. A que fala é a primeira `mulherComum`
      // do elenco, apontando morro acima.
      b(12, { by: "mulherComum", q: "E elas lhes responderam, e disseram:",
        env: { glory: 0.6 }, cast: [
        C("mulherComum", 30, "point", { dy: 0.56, facing: -1, id: "moca-de-zufe1" }),
        C("mulherComum", 130, "stand", { dy: 0.64, facing: -1, id: "moca-de-zufe2" }),
        C("homem", -170, "stand", { dy: 0.58, facing: 1, id: "saul", scale: 1.3 }),
        C("servo", -260, "stand", { dy: 0.64, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.13 — o detalhe que só quem mora ali sabe: O POVO NÃO COMERÁ ATÉ QUE
      // ELE VENHA, PORQUE ELE É O QUE ABENÇOA O SACRIFÍCIO. A segunda moça toma
      // a palavra — por isso ela vem primeiro no elenco agora.
      b(13, { by: "mulherComum", q: "porque ele é o que abençoa o sacrifício",
        env: { glory: 0.64 }, cast: [
        C("mulherComum", 120, "point", { dy: 0.62, facing: -1, id: "moca-de-zufe2" }),
        C("mulherComum", 20, "stand", { dy: 0.56, facing: -1, id: "moca-de-zufe1" }),
        C("homem", -170, "walk", { dy: 0.58, facing: 1, id: "saul", scale: 1.3 }),
        C("servo", -260, "walk", { dy: 0.64, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.14 — no MEIO DA CIDADE, à porta, SAMUEL LHES SAI AO ENCONTRO para
      // subir ao alto. Os dois caminhos se cruzam exatamente no portão.
      b(14, { q: "eis que Samuel lhes saiu ao encontro, para subir ao alto",
        set: "porta", props: PORTA,
        env: { terrain: "city", night: 0.26, glory: 0.66, water: 0, verdure: 0.16 }, cast: [
        C("patriarca", 150, "walk", { dy: 0.5, facing: -1, id: "samuel", glow: 0.7 }),
        C("homem", -140, "walk", { dy: 0.58, facing: 1, id: "saul", scale: 1.3 }),
        C("servo", -240, "walk", { dy: 0.64, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.15 — recuo de UM DIA: o SENHOR revelara isto AOS OUVIDOS DE SAMUEL na
      // véspera. Voz do céu sem mediador — nenhuma figura para Deus, só a noite
      // de Ramá, o altar e Samuel sozinho ouvindo.
      b(15, { by: "deus", q: "o Senhor revelara isto aos ouvidos de Samuel, um dia antes que Saul viesse",
        set: "vespera", props: VESPERA,
        env: { terrain: "field", night: 0.7, glory: 0.72, verdure: 0.24 }, cast: [
        C("patriarca", -30, "stand", { dy: 0.54, facing: 1, id: "samuel", glow: 0.6 }),
      ] }),
      // v.16 — ⭐ "AMANHÃ A ESTAS HORAS TE ENVIAREI UM HOMEM DA TERRA DE
      // BENJAMIM, O QUAL UNGIRÁS POR CAPITÃO" — porque O SEU CLAMOR CHEGOU A
      // MIM. Glória no auge da noite; Samuel de joelhos, sem figura dourada.
      b(16, { by: "deus", q: "Amanhã a estas horas te enviarei um homem da terra de Benjamim",
        env: { night: 0.62, glory: 0.95 }, cast: [
        C("patriarca", -10, "kneel", { dy: 0.56, facing: 1, id: "samuel", glow: 0.65 }),
      ] }),
      // v.17 — de volta à porta: quando Samuel VÊ Saul, o SENHOR lhe responde —
      // EIS AQUI O HOMEM DE QUEM EU TE FALEI. Voz do céu outra vez, com os dois
      // frente a frente e Saul ainda sem saber de nada.
      b(17, { by: "deus", q: "Eis aqui o homem de quem eu te falei", set: "porta", props: PORTA,
        env: { terrain: "city", night: 0.22, glory: 0.88, verdure: 0.16 }, cast: [
        C("patriarca", 120, "stand", { dy: 0.5, facing: -1, id: "samuel", glow: 0.8 }),
        C("homem", -90, "stand", { dy: 0.58, facing: 1, id: "saul", scale: 1.3 }),
        C("servo", -230, "stand", { dy: 0.64, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.18 — Saul se chega NO MEIO DA PORTA e pergunta ao próprio vidente onde
      // mora o vidente. Ele fala (primeiro `homem`), curvado em cortesia, sem
      // reconhecer quem tem diante de si.
      b(18, { by: "homem", q: "e disse:",
        env: { glory: 0.8 }, cast: [
        C("homem", -50, "bow", { dy: 0.6, facing: 1, id: "saul", scale: 1.3 }),
        C("patriarca", 110, "stand", { dy: 0.5, facing: -1, id: "samuel", glow: 0.82 }),
        C("servo", -200, "stand", { dy: 0.64, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.19 — ⭐ "EU SOU O VIDENTE" — a palavra é do SENHOR, mas sai da BOCA DE
      // SAMUEL: `by:"patriarca"`, nunca voz do céu. E logo o convite: sobe
      // diante de mim ao alto, e comei hoje comigo.
      b(19, { by: "patriarca", q: "Eu sou o vidente",
        env: { glory: 0.9, night: 0.2 }, cast: [
        C("patriarca", 90, "point", { dy: 0.5, facing: -1, id: "samuel", glow: 0.9 }),
        C("homem", -70, "stand", { dy: 0.6, facing: 1, id: "saul", scale: 1.3 }),
        C("servo", -210, "stand", { dy: 0.64, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.20 — as jumentas JÁ SE ACHARAM (o assunto do capítulo inteiro resolvido
      // de passagem) e a pergunta que muda tudo: E PARA QUEM É TODO O DESEJO DE
      // ISRAEL? Samuel aponta para Saul; Saul recua um passo.
      b(20, { by: "patriarca", q: "E para quem é todo o desejo de Israel?",
        env: { glory: 0.92 }, cast: [
        C("patriarca", 80, "point", { dy: 0.5, facing: -1, id: "samuel", glow: 0.92 }),
        C("homem", -110, "stand", { dy: 0.62, facing: 1, id: "saul", scale: 1.3 }),
        C("servo", -240, "stand", { dy: 0.66, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.21 — Saul se encolhe: FILHO DE BENJAMIM, DA MENOR DAS TRIBOS, e a
      // minha família a menor de todas. O maior de ombros do capítulo 2 é o que
      // se ajoelha aqui — a pose desmente o tamanho.
      b(21, { by: "homem", q: "Então respondeu Saul, e disse:",
        env: { glory: 0.86 }, cast: [
        C("homem", -80, "kneel", { dy: 0.64, facing: 1, id: "saul", scale: 1.3 }),
        C("patriarca", 100, "stand", { dy: 0.5, facing: -1, id: "samuel", glow: 0.88 }),
        C("servo", -230, "bow", { dy: 0.66, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.22 — a CÂMARA do alto: Samuel dá a Saul e ao moço o LUGAR ACIMA DE
      // TODOS OS CONVIDADOS, que eram uns TRINTA HOMENS. Banquete: aqui a
      // multidão cabe, e ela é justamente os trinta.
      b(22, { q: "e os levou à câmara; e deu-lhes lugar acima de todos os convidados",
        set: "camara", props: CAMARA,
        env: { terrain: "city", night: 0.4, glory: 0.74, fire: 0.28, verdure: 0.14 }, cast: [
        C("patriarca", -130, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.78 }),
        C("homem", -20, "stand", { dy: 0.56, facing: -1, id: "saul", scale: 1.3 }),
        C("servo", 90, "stand", { dy: 0.62, facing: -1, id: "moco-de-saul" }),
        C("multidao", 220, "stand", { dy: 0.5, id: "trinta-convidados-do-alto" }),
      ] }),
      // v.23 — Samuel manda ao COZINHEIRO: dá aqui a porção QUE TE DEI, de que
      // te disse PÕE-NA À PARTE CONTIGO. A ordem é antiga — a espádua já estava
      // reservada antes de Saul chegar à cidade.
      b(23, { by: "patriarca", q: "Então disse Samuel ao cozinheiro:",
        env: { glory: 0.78, fire: 0.3 }, cast: [
        C("patriarca", -130, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.8 }),
        C("servo", 140, "walk", { dy: 0.58, facing: -1, id: "cozinheiro-do-alto" }),
        C("homem", -20, "stand", { dy: 0.58, facing: -1, id: "saul", scale: 1.3 }),
        C("multidao", 250, "stand", { dy: 0.48, id: "trinta-convidados-do-alto" }),
      ] }),
      // v.24 — a ESPÁDUA posta diante de Saul: EIS QUE O QUE FOI RESERVADO ESTÁ
      // DIANTE DE TI. GUARDOU-SE PARA TI PARA ESTA OCASIÃO. O prato marcado
      // (`bowl` com tag) fica entre os dois; Saul come com Samuel aquele dia.
      b(24, { by: "patriarca", q: "Eis que o que foi reservado está diante de ti",
        env: { glory: 0.86, fire: 0.26 }, cast: [
        C("patriarca", -110, "raise", { dy: 0.52, facing: 1, id: "samuel", glow: 0.85 }),
        C("homem", 100, "kneel", { dy: 0.62, facing: -1, id: "saul", scale: 1.3 }),
        C("servo", 190, "bow", { dy: 0.56, facing: -1, id: "cozinheiro-do-alto" }),
        C("multidao", 285, "stand", { dy: 0.46, id: "trinta-convidados-do-alto" }),
      ] }),
      // v.25 — descem do alto para a cidade, e Samuel FALA COM SAUL SOBRE O
      // EIRADO. Noite fechada, estrelas em cima, os dois sozinhos no terraço:
      // é a conversa que o texto não conta.
      b(25, { q: "e falou com Saul sobre o eirado", set: "eirado", props: EIRADO,
        env: { terrain: "city", night: 0.78, glory: 0.4, fire: 0, verdure: 0.1 }, cast: [
        C("patriarca", -40, "stand", { dy: 0.48, facing: 1, id: "samuel", glow: 0.6 }),
        C("homem", 110, "stand", { dy: 0.54, facing: -1, id: "saul", scale: 1.3 }),
      ] }),
      // v.26 — QUASE AO SUBIR DA ALVA Samuel chama Saul ao eirado: LEVANTA-TE, E
      // DESPEDIR-TE-EI. A lua sai do quadro e o sol nasce rente ao horizonte; a
      // noite cede.
      b(26, { by: "patriarca", q: "chamou Samuel a Saul ao eirado, dizendo:",
        props: [
          { ...P("church", -80, 1.35, undefined, 0.3), tag: "eirado-de-samuel" },
          P("amphora", 150, 0.8, undefined, 0.62),
          P("tower", 280, 1.05, undefined, 0.26),
          { ...P("sun", 20, 1.0, undefined, 0.16), sky: true },
          P("grass", -260, 0.72, undefined, 0.74),
        ],
        env: { night: 0.44, glory: 0.66 }, cast: [
        C("patriarca", -30, "point", { dy: 0.48, facing: 1, id: "samuel", glow: 0.72 }),
        C("homem", 120, "stand", { dy: 0.56, facing: -1, id: "saul", scale: 1.3 }),
      ] }),
      // v.27 — na EXTREMIDADE DA CIDADE, o moço PASSA ADIANTE (e passou) — e
      // Saul fica: "TE FAREI OUVIR A PALAVRA DE DEUS". O criado sai do quadro
      // pela direita; a glória sobe sobre os dois que ficam. O capítulo termina
      // na véspera exata da unção.
      b(27, { by: "patriarca", q: "porém tu espera agora, e te farei ouvir a palavra de Deus",
        set: "extremidade", props: EXTREMIDADE,
        env: { terrain: "field", night: 0.32, glory: 0.9, verdure: 0.26 }, cast: [
        C("patriarca", -70, "raise", { dy: 0.52, facing: 1, id: "samuel", glow: 0.95 }),
        C("homem", 60, "stand", { dy: 0.58, facing: 1, id: "saul", scale: 1.3 }),
        C("servo", 240, "walk", { dy: 0.64, facing: 1, id: "moco-de-saul" }),
      ] }),
    ],
  },
};
