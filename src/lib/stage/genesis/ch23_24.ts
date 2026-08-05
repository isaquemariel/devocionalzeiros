// ============================================================================
// GÊNESIS 23–24 — roteiro do modo CENA VIVA (força-tarefa AT, onda 2).
//
// Gn 23 — A MORTE DE SARA: o luto de Abraão em Hebrom (a única vida de mulher
// contada em anos na Torá), a negociação oriental na PORTA da cidade — as
// mesuras alternadas ("ouve-me, meu senhor") com os filhos de Hete e Efrom,
// os quatrocentos siclos PESADOS diante de todos — e a cova de MACPELA:
// o primeiro pedaço da terra prometida que Abraão de fato POSSUI, comprado
// para sepultar a esposa. Arco: noite do luto → dia do negócio → glória
// solene da possessão.
//
// Gn 24 — REBECA: o conto mais longo do livro (67 vv), em ritmo de novela e
// QUATRO sets: (1) o juramento na tenda (a mão debaixo da coxa); (2) a viagem
// e a oração junto ao poço de Naor (o teste da água); (3) Rebeca aparece,
// Labão acolhe, o servo reconta TUDO à luz da fogueira, e a decisão numa só
// palavra — "Irei." (v.58); (4) o encontro no campo ao entardecer: Isaque
// meditava, ela desce do camelo, o véu — "e amou-a" (v.67), o primeiro amor
// narrado da Bíblia, na tenda de Sara.
//
// DEUS NUNCA É DESENHADO: a voz do SENHOR é narração pura (sem `by`); a sua
// presença e bênção são GLÓRIA no ambiente.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// O ACAMPAMENTO DE ABRAÃO (Hebrom / Gn 23:1–2 e Gn 24:1–9): tendas do
// patriarca, árvore de sombra. (corredor de extras dx -100..-190 LIVRE)
const ACAMPAMENTO: StagePropSpec[] = [
  P("tent", 190, 1.2, undefined, 0.1),     // a tenda de Abraão
  P("tent", 274, 0.95, undefined, 0.32),   // tenda menor do acampamento
  P("tree", -40, 1.15, undefined, 0.06),   // a árvore de sombra
  P("rock", -240, 0.9, undefined, 0.55),
  P("rock", 84, 0.55, undefined, 0.25),
  P("bush", -300, 0.9, undefined, 0.4),
  P("bush", 132, 0.85, undefined, 0.62),
  P("grass", -62, 0.9, undefined, 0.82),
  P("grass", 58, 1, undefined, 0.78),
  P("grass", -272, 1, undefined, 0.72),
];

// ---------------------------------------------------------------------------
// A PORTA DA CIDADE (Gn 23:3–16): onde se faz negócio no mundo antigo — a
// grande porta, a torre, a banca de comércio, mercadoria empilhada.
const PORTA: StagePropSpec[] = [
  P("door", 150, 1.3, undefined, 0.08),    // A PORTA da cidade (o tribunal antigo)
  P("tower", 250, 1.15, undefined, 0.05),  // a muralha de Quiriate-Arba
  P("stall", -300, 1, undefined, 0.2),     // o comércio à porta
  P("well", 320, 1, undefined, 0.12),
  P("amphora", 196, 0.85, undefined, 0.55),
  P("crate", -256, 1, undefined, 0.5),
  P("crate", -228, 0.8, undefined, 0.66),
  P("tree", -60, 0.9, undefined, 0.06),
  P("bush", 290, 0.85, undefined, 0.45),
  P("grass", -40, 1, undefined, 0.85),
  P("grass", 208, 1, undefined, 0.8),
];
// a PRATA pesada diante das testemunhas (v.16) — vaga dos extras
const PORTA_PRATA: StagePropSpec[] = [...PORTA, P("crate", -140, 0.85, undefined, 0.35)];

// ---------------------------------------------------------------------------
// MACPELA (Gn 23:17–20): a CAVERNA — rocha grande em destaque — "e todo o
// arvoredo que no campo havia, em todo o seu contorno ao redor".
const MACPELA: StagePropSpec[] = [
  P("rock", -145, 1.55, undefined, 0.25),  // A CAVERNA de Macpela (vaga dos extras)
  P("tree", -300, 1.2, undefined, 0.08),   // o arvoredo ao redor…
  P("tree", -230, 1.0, undefined, 0.45),
  P("tree", 150, 1.15, undefined, 0.1),
  P("tree", 250, 0.95, undefined, 0.48),
  P("rock", 300, 0.9, undefined, 0.6),
  P("bush", 90, 0.85, undefined, 0.3),
  P("bush", -260, 0.85, undefined, 0.62),
  P("grass", 20, 0.9, undefined, 0.85),
  P("grass", 200, 0.85, undefined, 0.7),
  P("grass", -60, 0.9, undefined, 0.78),
];

// ---------------------------------------------------------------------------
// O POÇO DE NAOR (Gn 24:10–31): fora da cidade (torre ao longe), o poço onde
// as moças saem a tirar água pela tarde. Deserto de Padã: mato ralo, pedras.
const NAOR_POCO: StagePropSpec[] = [
  { ...P("well", 130, 1.15, undefined, 0.15), tag: "poco-rebeca" },   // O POÇO — o palco do teste
  P("tower", 300, 1.2, undefined, 0.05),   // a cidade de Naor ao longe
  P("rock", -250, 0.95, undefined, 0.5),
  P("rock", 200, 0.7, undefined, 0.7),
  P("amphora", 170, 0.85, undefined, 0.5), // cântaros junto ao poço
  P("bush", -300, 0.8, undefined, 0.35),
  P("bush", 240, 0.8, undefined, 0.5),
  P("grass", -50, 0.8, undefined, 0.85),
  P("grass", 148, 0.75, undefined, 0.8),
  P("grass", -280, 0.85, undefined, 0.7),
];
// o CÂNTARO de Rebeca sobre o ombro (v.15) — destacado na vaga dos extras
const NAOR_CANTARO: StagePropSpec[] = [...NAOR_POCO, P("amphora", -150, 0.9, undefined, 0.3)];

// ---------------------------------------------------------------------------
// A CASA DE BETUEL (Gn 24:32–61): a tenda-casa da família, a fogueira do
// relato noturno, palha e pasto para os camelos.
const CASA: StagePropSpec[] = [
  P("tent", 170, 1.25, undefined, 0.08),   // a casa de Betuel
  P("tent", 268, 0.9, undefined, 0.3),
  P("campfire", -20, 0.95, 1, 0.75),       // a fogueira do relato
  P("tree", -50, 1.1, undefined, 0.06),
  P("amphora", 220, 0.85, undefined, 0.55),
  P("crate", 252, 0.8, undefined, 0.65),   // palha e pasto (v.32)
  P("crate", -260, 0.9, undefined, 0.5),
  P("rock", -230, 0.85, undefined, 0.66),
  P("bush", -300, 0.85, undefined, 0.4),
  P("grass", -90, 0.9, undefined, 0.85),
  P("grass", 60, 1, undefined, 0.8),
  P("grass", 300, 0.9, undefined, 0.68),
];
// a comida posta diante do servo (v.33) — vaga dos extras
const CASA_MESA: StagePropSpec[] = [
  ...CASA,
  P("crate", -140, 0.85, undefined, 0.42),
  P("amphora", -176, 0.8, undefined, 0.56),
];

// ---------------------------------------------------------------------------
// O CAMPO DO ENCONTRO (Gn 24:62–67): a terra do sul ao ENTARDECER — e o poço
// de Beer-Laai-Rói na vaga dos extras (v.62). A tenda de Sara entra no final.
const CAMPO: StagePropSpec[] = [
  { ...P("well", -140, 1.05, undefined, 0.22), tag: "poco-agar" },  // o poço de Beer-Laai-Rói (v.62)
  P("tree", 180, 1.2, undefined, 0.08),
  P("tree", -280, 1.0, undefined, 0.3),
  P("rock", 120, 0.6, undefined, 0.65),
  P("bush", 250, 0.9, undefined, 0.5),
  P("bush", -40, 0.85, undefined, 0.3),
  P("grass", 60, 1, undefined, 0.8),
  P("grass", -220, 0.95, undefined, 0.75),
  P("grass", 300, 0.9, undefined, 0.65),
];
// a TENDA DE SARA (v.67): para onde Isaque a leva — o luto vira consolo
const CAMPO_TENDA: StagePropSpec[] = [...CAMPO, P("tent", 300, 1.15, undefined, 0.08)];

// ---------------------------------------------------------------------------
// A rodinha do RELATO na casa de Betuel (Gn 24:34–58): o servo conta tudo;
// Labão, Betuel, a mãe e Rebeca ouvem à luz da fogueira.
const RELATO = (servoPose = "stand"): CastPlacement[] => [
  C("servo", -40, servoPose, { dy: 0.52, facing: 1 }),
  C("patriarca", 56, "stand", { dy: 0.5, facing: -1, id: "labao" }),
  C("patriarca", 116, "stand", { dy: 0.48, facing: -1, id: "betuel" }),
  C("mulherComum", 172, "stand", { dy: 0.54, facing: -1, id: "mae" }),
  C("rebeca", 226, "stand", { dy: 0.5, facing: -1 }),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 23
  // A MORTE DE SARA: noite do luto junto à tenda → o dia claro do negócio na
  // porta da cidade (mesuras alternadas, 400 siclos) → a glória SOLENE de
  // Macpela: o primeiro chão da promessa que Abraão possui.
  23: {
    start: { terrain: "field", night: 0.45, glory: 0.15, storm: 0, fire: 0 },
    beats: [
      b(1, { cast: [C("sara", -12, "stand", { dy: 0.46 })], props: ACAMPAMENTO, env: { glory: 0.3 } }), // a vida de Sara: 127 anos
      b(2, { cast: [C("sara", -44, "lie", { dy: 0.4 }), C("abraao", 16, "bow", { dy: 0.5, facing: -1 })], env: { night: 0.55, glory: 0.1 } }), // morre em Hebrom: lamento e choro
      b(3, { set: "porta", cast: [C("abraao", -60, "stand", { dy: 0.52, facing: 1 }), C("homem", 30, "stand", { dy: 0.5, facing: -1, id: "heteu1" }), C("homem", 92, "stand", { dy: 0.56, facing: -1, id: "heteu2" })], props: PORTA, env: { terrain: "city", night: 0.2, glory: 0.15 } }), // levanta-se: fala aos filhos de Hete
      b(4, { by: "abraao" }),                                                        // "estrangeiro e peregrino sou entre vós"
      b(5, { cast: [C("abraao", -60, "stand", { dy: 0.52, facing: 1 }), C("homem", 30, "point", { dy: 0.5, facing: -1, id: "heteu1" }), C("homem", 92, "stand", { dy: 0.56, facing: -1, id: "heteu2" })] }), // os filhos de Hete respondem
      b(6, { by: "homem" }),                                                         // "príncipe poderoso és no meio de nós"
      b(7, { cast: [C("abraao", -60, "bow", { dy: 0.52, facing: 1 }), C("homem", 30, "stand", { dy: 0.5, facing: -1, id: "heteu1" }), C("homem", 92, "stand", { dy: 0.56, facing: -1, id: "heteu2" })] }), // a MESURA diante do povo da terra
      b(8, { by: "abraao", q: "dizendo: ", cast: [C("abraao", -60, "stand", { dy: 0.52, facing: 1 }), C("homem", 30, "stand", { dy: 0.5, facing: -1, id: "heteu1" }), C("homem", 92, "stand", { dy: 0.56, facing: -1, id: "heteu2" })] }), // "falai por mim a Efrom, filho de Zoar"
      b(9, { by: "abraao" }),                                                        // a cova de Macpela, pelo devido preço
      b(10, { cast: [C("abraao", -66, "stand", { dy: 0.52, facing: 1 }), C("patriarca", 30, "stand", { dy: 0.48, facing: -1, id: "efrom" }), C("homem", 104, "stand", { dy: 0.54, facing: -1, id: "heteu1" }), C("homem", 156, "stand", { dy: 0.58, facing: -1, id: "heteu2" })] }), // EFROM responde à porta da cidade
      b(11, { by: "patriarca" }),                                                    // "o campo te dou… sepulta a tua morta"
      b(12, { cast: [C("abraao", -66, "bow", { dy: 0.52, facing: 1 }), C("patriarca", 30, "stand", { dy: 0.48, facing: -1, id: "efrom" }), C("homem", 104, "stand", { dy: 0.54, facing: -1, id: "heteu1" }), C("homem", 156, "stand", { dy: 0.58, facing: -1, id: "heteu2" })] }), // segunda mesura diante do povo
      b(13, { by: "abraao", q: "dizendo: ", cast: [C("abraao", -66, "stand", { dy: 0.52, facing: 1 }), C("patriarca", 30, "stand", { dy: 0.48, facing: -1, id: "efrom" }), C("homem", 104, "stand", { dy: 0.54, facing: -1, id: "heteu1" }), C("homem", 156, "stand", { dy: 0.58, facing: -1, id: "heteu2" })] }), // "o preço do campo o darei"
      b(14, { cast: [C("abraao", -66, "stand", { dy: 0.52, facing: 1 }), C("patriarca", 30, "point", { dy: 0.48, facing: -1, id: "efrom" }), C("homem", 104, "stand", { dy: 0.54, facing: -1, id: "heteu1" }), C("homem", 156, "stand", { dy: 0.58, facing: -1, id: "heteu2" })] }), // Efrom responde a Abraão
      b(15, { by: "patriarca" }),                                                    // "quatrocentos siclos… que é isto?"
      b(16, { cast: [C("abraao", -60, "point", { dy: 0.52, facing: -1 }), C("patriarca", 30, "stand", { dy: 0.48, facing: -1, id: "efrom" }), C("homem", 104, "stand", { dy: 0.54, facing: -1, id: "heteu1" }), C("homem", 156, "stand", { dy: 0.58, facing: -1, id: "heteu2" })], props: PORTA_PRATA, env: { glory: 0.3 } }), // Abraão PESA os 400 siclos
      b(17, { set: "macpela", cast: [C("abraao", -20, "stand", { dy: 0.52, facing: -1 })], props: MACPELA, env: { terrain: "field", night: 0.15, glory: 0.4 } }), // o campo, a cova, todo o arvoredo
      b(18, { env: { glory: 0.5 } }),                                                // confirmado a Abraão em POSSESSÃO
      b(19, { cast: [C("abraao", -92, "bow", { dy: 0.48, facing: -1 })], env: { night: 0.35, glory: 0.4 } }), // sepulta Sara na cova de Macpela
      b(20, { cast: [C("abraao", -60, "stand", { dy: 0.5, facing: -1 })], env: { night: 0.25, glory: 0.55 } }), // o primeiro chão da promessa É SEU
    ],
  },

  // ------------------------------------------------------------------ Gn 24
  // REBECA: o juramento na tenda (glória da bênção) → a tarde no poço de Naor
  // (a oração e o teste) → Rebeca CORRE (glória crescente) → a noite do
  // relato à fogueira → "Irei." (pico) → o entardecer dourado do encontro:
  // "e amou-a" — o luto de Isaque vira consolo na tenda de Sara.
  24: {
    start: { terrain: "field", night: 0.15, glory: 0.5, storm: 0, fire: 0 },
    beats: [
      b(1, { cast: [C("abraao", -16, "stand", { dy: 0.5 })], props: ACAMPAMENTO, env: { glory: 0.5 } }), // Abraão velho: abençoado EM TUDO
      b(2, { by: "abraao", q: "possuía: ", cast: [C("abraao", -16, "stand", { dy: 0.5, facing: 1 }), C("servo", 44, "kneel", { dy: 0.55, facing: -1 })] }), // a mão debaixo da coxa: o encargo
      b(3, { by: "abraao", env: { glory: 0.6 } }),                                   // o JURAMENTO: não das filhas de Canaã
      b(4, { by: "abraao" }),                                                        // "irás à minha terra e à minha parentela"
      b(5, { by: "servo", q: "o servo: ", cast: [C("abraao", -16, "stand", { dy: 0.5, facing: 1 }), C("servo", 44, "stand", { dy: 0.55, facing: -1 })] }), // e se a mulher não quiser vir?
      b(6, { by: "abraao", q: "lhe disse: " }),                                      // "não faças lá tornar o meu filho"
      b(7, { by: "abraao", env: { glory: 0.7 } }),                                   // o SENHOR enviará o seu ANJO adiante
      b(8, { by: "abraao" }),                                                        // se ela não vier, livre és
      b(9, { cast: [C("abraao", -16, "stand", { dy: 0.5, facing: 1 }), C("servo", 44, "kneel", { dy: 0.55, facing: -1 })], env: { glory: 0.6, night: 0.2 } }), // o servo JURA sobre este negócio
      b(10, { set: "poco-naor", cast: [C("servo", -60, "walk", { dy: 0.52 }), C("rebanho", -170, "walk", { dy: 0.42, id: "camelos" })], props: NAOR_POCO, env: { terrain: "desert", night: 0.1, glory: 0.3 } }), // dez camelos: rumo à Mesopotâmia
      b(11, { cast: [C("servo", -30, "stand", { dy: 0.52, facing: 1 }), C("rebanho", -130, "kneel", { dy: 0.42, id: "camelos" })], env: { night: 0.25 } }), // ajoelha os camelos no poço, à TARDE
      b(12, { by: "servo", q: "E disse: ", cast: [C("servo", -30, "raise", { dy: 0.52, facing: 1 }), C("rebanho", -130, "kneel", { dy: 0.42, id: "camelos" })], env: { glory: 0.4 } }), // a oração: "dá-me hoje bom encontro"
      b(13, { by: "servo" }),                                                        // "em pé junto à fonte" — as moças saem
      b(14, { by: "servo", env: { glory: 0.45 } }),                                  // o SINAL pedido: o teste da água
      b(15, { cast: [C("servo", -30, "stand", { dy: 0.52, facing: 1 }), C("rebanho", -130, "kneel", { dy: 0.42, id: "camelos" }), C("rebeca", 220, "walk", { dy: 0.5, facing: -1 })], props: NAOR_CANTARO, env: { glory: 0.5 } }), // antes de acabar: REBECA e o cântaro
      b(16, { cast: [C("servo", -30, "stand", { dy: 0.52, facing: 1 }), C("rebanho", -130, "kneel", { dy: 0.42, id: "camelos" }), C("rebeca", 120, "bow", { dy: 0.5, facing: 1 })] }), // formosa; desce, enche o cântaro, sobe
      b(17, { by: "servo", q: "e disse: ", cast: [C("servo", 40, "walk", { dy: 0.52, facing: 1 }), C("rebanho", -130, "kneel", { dy: 0.42, id: "camelos" }), C("rebeca", 120, "stand", { dy: 0.5, facing: -1 })] }), // corre-lhe ao encontro: "deixa-me beber"
      b(18, { cast: [C("servo", 40, "stand", { dy: 0.52, facing: 1 }), C("rebanho", -130, "kneel", { dy: 0.42, id: "camelos" }), C("rebeca", 96, "bow", { dy: 0.5, facing: -1 })] }), // "Bebe, meu senhor": abaixa o cântaro
      b(19, { by: "rebeca", q: "disse: " }),                                         // "tirarei também para os teus camelos"
      b(20, { cast: [C("servo", 40, "stand", { dy: 0.52, facing: -1 }), C("rebanho", -130, "stand", { dy: 0.42, id: "camelos" }), C("rebeca", -60, "walk", { dy: 0.5, facing: -1 })], env: { glory: 0.55 } }), // ela CORRE ao poço; tira para todos
      b(21, { cast: [C("servo", 40, "stand", { dy: 0.52, facing: -1 }), C("rebanho", -130, "stand", { dy: 0.42, id: "camelos" }), C("rebeca", -84, "stand", { dy: 0.5, facing: 1 })] }), // o homem admirado, calando-se
      b(22, { env: { glory: 0.6 } }),                                                // o pendente de ouro e as pulseiras
      b(23, { by: "servo", q: "E disse: " }),                                        // "de quem és filha? há pousada?"
      b(24, { by: "rebeca", q: "lhe disse: " }),                                     // "sou filha de Betuel"
      b(25, { by: "rebeca", q: "Disse-lhe mais: " }),                                // palha, pasto e lugar para a noite
      b(26, { cast: [C("servo", 40, "kneel", { dy: 0.52, facing: -1 }), C("rebanho", -130, "stand", { dy: 0.42, id: "camelos" }), C("rebeca", -84, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.7 } }), // o servo se inclina e ADORA
      b(27, { by: "servo", q: "E disse: ", env: { glory: 0.78 } }),                  // "bendito o SENHOR… me guiou no caminho"
      b(28, { cast: [C("servo", 40, "stand", { dy: 0.52, facing: 1 }), C("rebanho", -130, "stand", { dy: 0.42, id: "camelos" }), C("rebeca", 290, "walk", { dy: 0.5, facing: 1 })], env: { glory: 0.6 } }), // a donzela CORRE à casa da mãe
      b(29, { cast: [C("servo", 40, "stand", { dy: 0.52, facing: 1 }), C("rebanho", -130, "stand", { dy: 0.42, id: "camelos" }), C("patriarca", 240, "walk", { dy: 0.5, facing: -1, id: "labao" })] }), // LABÃO corre à fonte ao encontro
      b(30, { cast: [C("servo", 40, "stand", { dy: 0.52, facing: 1 }), C("rebanho", -130, "stand", { dy: 0.42, id: "camelos" }), C("patriarca", 130, "point", { dy: 0.5, facing: -1, id: "labao" })] }), // vê as joias; acha-o junto aos camelos
      b(31, { by: "patriarca", q: "E disse: " }),                                    // "entra, bendito do SENHOR"
      b(32, { set: "casa-betuel", cast: [C("servo", -40, "stand", { dy: 0.52, facing: 1 }), C("patriarca", 56, "stand", { dy: 0.5, facing: -1, id: "labao" }), C("homem", -104, "stand", { dy: 0.6, id: "criado" }), C("rebanho", 300, "stand", { dy: 0.38, id: "camelos" })], props: CASA, env: { terrain: "field", night: 0.3, glory: 0.35 } }), // desatam os camelos; água aos pés
      b(33, { by: "patriarca", q: "E ele disse: ", props: CASA_MESA }),              // comida posta: "não comerei" — "Fala"
      b(34, { by: "servo", q: "Então disse: ", cast: RELATO(), env: { night: 0.35 } }), // "eu sou o SERVO DE ABRAÃO"
      b(35, { by: "servo", env: { glory: 0.45 } }),                                  // o SENHOR engrandeceu o meu senhor
      b(36, { by: "servo" }),                                                        // Sara deu o filho; tudo é dele
      b(37, { by: "servo" }),                                                        // o juramento: não mulher de Canaã
      b(38, { by: "servo" }),                                                        // "irás à casa de meu pai"
      b(39, { by: "servo", cast: RELATO("point") }),                                 // "e se a mulher não me seguir?"
      b(40, { by: "servo", env: { glory: 0.55 } }),                                  // "o SENHOR enviará o seu anjo contigo"
      b(41, { by: "servo" }),                                                        // livre do juramento se não a derem
      b(42, { by: "servo", env: { night: 0.4 } }),                                   // "hoje cheguei à fonte, e disse…"
      b(43, { by: "servo" }),                                                        // o sinal recontado: a donzela, o cântaro
      b(44, { by: "servo" }),                                                        // "bebe tu, e também aos camelos"
      b(45, { by: "servo", env: { glory: 0.6 } }),                                   // antes de acabar no coração: REBECA
      b(46, { by: "servo" }),                                                        // apressou-se e deu de beber a todos
      b(47, { by: "servo" }),                                                        // "de quem és filha?" — o pendente
      b(48, { by: "servo", cast: RELATO("kneel"), env: { glory: 0.7 } }),            // "inclinando-me, adorei ao SENHOR"
      b(49, { by: "servo", cast: RELATO(), env: { night: 0.45, glory: 0.5 } }),      // "fazei-mo saber… direita ou esquerda"
      b(50, { by: "patriarca", q: "e disseram: ", env: { glory: 0.65 } }),           // "do SENHOR procedeu este negócio"
      b(51, { by: "patriarca", env: { glory: 0.75 } }),                              // "eis Rebeca diante de ti: toma-a"
      b(52, { cast: RELATO("bow"), env: { glory: 0.8 } }),                           // o servo inclina-se À TERRA
      b(53, { cast: [C("servo", -20, "point", { dy: 0.52, facing: 1 }), C("patriarca", 56, "stand", { dy: 0.5, facing: -1, id: "labao" }), C("patriarca", 116, "stand", { dy: 0.48, facing: -1, id: "betuel" }), C("mulherComum", 172, "stand", { dy: 0.54, facing: -1, id: "mae" }), C("rebeca", 96, "stand", { dy: 0.56, facing: -1 })], env: { glory: 0.7 } }), // joias de prata e ouro; vestidos
      b(54, { by: "servo", q: "e disse: ", cast: RELATO(), env: { night: 0.1, glory: 0.5 } }), // a noite passa; manhã: "deixai-me ir"
      b(55, { by: "patriarca", q: "sua mãe: " }),                                    // "fique a donzela ao menos dez dias"
      b(56, { by: "servo", q: "lhes disse: " }),                                     // "não me detenhais: o SENHOR prosperou"
      b(57, { by: "patriarca", q: "E disseram: " }),                                 // "chamemos a donzela e perguntemos"
      b(58, { by: "rebeca", q: "Ela respondeu: ", cast: [C("rebeca", 10, "stand", { dy: 0.46 }), C("servo", -80, "stand", { dy: 0.54, facing: 1 }), C("patriarca", 90, "stand", { dy: 0.5, facing: -1, id: "labao" }), C("patriarca", 146, "stand", { dy: 0.48, facing: -1, id: "betuel" }), C("mulherComum", 200, "stand", { dy: 0.54, facing: -1, id: "mae" })], env: { glory: 0.85 } }), // "IREI." — uma palavra muda a história
      b(59, { cast: [C("rebeca", -40, "walk", { dy: 0.48 }), C("mulherComum", 6, "walk", { dy: 0.54, id: "ama" }), C("servo", -96, "walk", { dy: 0.52 }), C("patriarca", 90, "raise", { dy: 0.5, facing: -1, id: "labao" }), C("mulherComum", 200, "stand", { dy: 0.54, facing: -1, id: "mae" })], env: { glory: 0.7 } }), // despedem Rebeca e a sua ama
      b(60, { by: "patriarca", q: "disseram-lhe: ", env: { glory: 0.9 } }),          // a bênção: "mãe de milhares de milhares"
      b(61, { cast: [C("rebanho", -240, "walk", { dy: 0.4, id: "camelos" }), C("rebeca", -60, "walk", { dy: 0.48 }), C("mulherComum", 0, "walk", { dy: 0.54, id: "mocas" }), C("servo", -130, "walk", { dy: 0.52 })], env: { glory: 0.6, night: 0.15 } }), // sobem nos camelos e seguem o homem
      b(62, { set: "campo-encontro", cast: [C("isaque", 60, "walk", { dy: 0.52 })], props: CAMPO, env: { terrain: "field", night: 0.3, glory: 0.4 } }), // Isaque vem de Beer-Laai-Rói
      b(63, { cast: [C("isaque", 60, "kneel", { dy: 0.52, facing: -1 }), C("rebanho", -260, "walk", { dy: 0.4, id: "camelos" }), C("servo", -170, "walk", { dy: 0.5 }), C("rebeca", -110, "walk", { dy: 0.48 })], env: { night: 0.35, glory: 0.5 } }), // meditava no campo À TARDE: camelos vêm
      b(64, { cast: [C("isaque", 60, "stand", { dy: 0.52, facing: -1 }), C("rebanho", -240, "stand", { dy: 0.4, id: "camelos" }), C("servo", -110, "stand", { dy: 0.5, facing: 1 }), C("rebeca", -40, "stand", { dy: 0.5, facing: 1 })] }), // ela o vê e DESCE do camelo
      b(65, { cast: [C("isaque", 60, "stand", { dy: 0.52, facing: -1 }), C("rebanho", -240, "stand", { dy: 0.4, id: "camelos" }), C("servo", -110, "point", { dy: 0.5, facing: 1 }), C("rebeca", -40, "bow", { dy: 0.5, facing: 1 })], env: { glory: 0.55 } }), // "quem é aquele homem?" — o VÉU
      b(66, { cast: [C("isaque", 70, "stand", { dy: 0.52, facing: -1 }), C("rebanho", -240, "stand", { dy: 0.4, id: "camelos" }), C("servo", 10, "stand", { dy: 0.54, facing: 1 }), C("rebeca", -60, "stand", { dy: 0.5, facing: 1 })] }), // o servo conta a Isaque tudo
      b(67, { cast: [C("isaque", 34, "stand", { dy: 0.5, facing: -1 }), C("rebeca", -12, "stand", { dy: 0.5, facing: 1 }), C("rebanho", -240, "stand", { dy: 0.4, id: "camelos" })], props: CAMPO_TENDA, env: { night: 0.4, glory: 0.55 } }), // a tenda de Sara: "E AMOU-A" — consolado
    ],
  },
};
