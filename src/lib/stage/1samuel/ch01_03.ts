// ============================================================================
// 1 SAMUEL 1–3 — CENA VIVA. ANA em Siló, o menino PEDIDO ao SENHOR, e a noite
// em que a palavra rara tornou a falar em Israel.
//
// 1Sm 1 — Em RAMATAIM-ZOFIM, na montanha de Efraim, um homem chamado ELCANA
// tem DUAS MULHERES: Penina, cheia de filhos, e ANA, a quem o SENHOR cerrara a
// madre. De ano em ano a casa inteira SOBE a SILÓ para adorar e sacrificar ao
// Senhor dos Exércitos, onde estão HOFNI e FINÉIAS, os dois filhos de Eli. No
// dia do sacrifício Elcana reparte porções — e a Ana dá uma PARTE EXCELENTE,
// porque a amava; e todo ano a RIVAL a provoca até ela chorar e não comer.
// "Não te sou eu melhor do que dez filhos?", pergunta o marido, sem entender.
// Então Ana se levanta. ELI está assentado numa CADEIRA junto a um PILAR do
// templo, e ali, com AMARGURA DE ALMA, ela ora e faz o VOTO: um filho homem
// dado ao SENHOR todos os dias da sua vida, e sobre a sua cabeça NÃO PASSARÁ
// NAVALHA — o nazireado. Ela fala no coração: só os LÁBIOS se movem, a voz não
// se ouve, e o velho sacerdote a julga bêbada. Corrigido, ele a despede: "Vai
// em paz". O semblante dela já não era triste. Nasce SAMUEL — "o tenho pedido
// ao Senhor". Ana não sobe mais até desmamá-lo; e quando o desmama, leva-o com
// TRÊS BEZERROS, UM EFA DE FARINHA e UM ODRE DE VINHO, degola o bezerro e
// entrega o menino a Eli: "também ao Senhor eu o entreguei, por todos os dias
// que viver".
//
// 1Sm 2 — O CÂNTICO DE ANA (vv.1-10) não é quadro parado: é um hino de
// REVIRAVOLTA, e a cena vira com ele. O arco dos fortes QUEBRADO e o que
// tropeçava CINGIDO DE FORÇA; os fartos alugados por pão e os famintos
// fartos; a ESTÉRIL com SETE FILHOS e a de muitos filhos enfraquecida; o
// SENHOR que faz descer à sepultura e faz TORNAR A SUBIR; que levanta o POBRE
// DO PÓ e o assenta ENTRE OS PRÍNCIPES; que TROVEJA DESDE OS CÉUS sobre os que
// com Ele contendem — e no último verso, sem que haja rei em Israel ainda,
// aparecem O SEU REI e O SEU UNGIDO. Elcana volta a Ramá; o menino FICA
// SERVINDO. E o capítulo desce: os filhos de Eli são FILHOS DE BELIAL, o moço
// do sacerdote vem com o GARFO DE TRÊS DENTES à caldeira, e antes de queimarem
// a gordura já exigem a carne CRUA, por força — pecado MUITO GRANDE perante o
// SENHOR. No meio disso, o menino ministra vestido com o ÉFODE DE LINHO, e a
// mãe lhe traz a TÚNICA PEQUENA de ano em ano. Eli abençoa Elcana, e Ana tem
// mais três filhos e duas filhas. O velho ouve tudo o que os filhos fazem à
// porta da tenda e só sabe dizer "não, filhos meus" — repreensão fraca demais.
// Então vem um HOMEM DE DEUS com a sentença sobre a casa: o braço cortado, o
// aperto da morada, o SINAL dos dois filhos mortos NO MESMO DIA — e, no fim,
// o SACERDOTE FIEL que Deus há de suscitar.
//
// 1Sm 3 — A palavra do SENHOR era de muita valia naqueles dias: NÃO HAVIA
// VISÃO MANIFESTA. De noite, antes que a LÂMPADA DE DEUS se apagasse no templo
// ONDE ESTAVA A ARCA, o menino está deitado; Eli, com os olhos escurecendo, no
// seu lugar. TRÊS VEZES o SENHOR chama pelo nome, três vezes o menino corre a
// Eli — até que o velho entende quem chama e o ensina a responder: "FALA,
// SENHOR, PORQUE O TEU SERVO OUVE". Então veio o SENHOR, e pôs-se ali: a
// palavra que fará RETINIR AMBOS OS OUVIDOS de quem a ouvir, a sentença sobre
// a casa de Eli que nem sacrifício nem oferta expiarão. De manhã Samuel abre
// as portas da casa do SENHOR e TEME contar a visão; Eli o obriga, e recebe a
// sentença inteira: "Ele é o Senhor; faça o que bem parecer aos seus olhos".
// E Samuel cresce, e nenhuma das suas palavras cai em terra, e TODO O ISRAEL,
// DESDE DÃ ATÉ BERSEBA, soube que ele estava confirmado por PROFETA.
//
// A VOZ DE DEUS (regra do projeto): nestes três capítulos o SENHOR fala de
// duas maneiras distintas, e a cena as separa.
//   • SEM MEDIADOR — 1Sm 3:4,6,8,10,11,12,13,14: o chamado noturno e a
//     sentença. É `by: "deus"`, VOZ DO CÉU: nenhuma figura é desenhada para
//     Ele, nem mesmo em 3:10 ("veio o Senhor, e pôs-se ali") — a presença é
//     LUZ (`env.glory` alto sobre a noite), nunca corpo.
//   • POR MEDIADOR VISÍVEL — 2:27-36: "veio um homem de Deus a Eli". A palavra
//     é do SENHOR, mas a boca é humana: `by: "homem"`, id `homem-de-deus`,
//     PRIMEIRO homem do cast, `glow` alto. Não é voz do céu.
//   • Em 2:1-10 quem fala é ANA (`by: "mulherComum"`, `ana` primeira do seu
//     papel): é oração de gente, não oráculo.
// FOGO: só `altar` com `fire` e `campfire` desenham chama de verdade (a
// caldeira do pátio de Siló, o holocausto do bezerro) — `env.fire` é ambiência.
// MULHERES: Ana e Penina são SEMPRE `mulherComum` (o papel `mulher` é figura
// de glória, ignora pose e não serve para ninguém deste livro).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ------------------------------------------------------------------ SETS

// RAMÁ (Ramataim-Zofim), na montanha de Efraim — a CASA DE ELCANA: a tenda-
// morada da família, a porta do pátio, o poço, o curral e a oliveira. É casa
// cheia (Penina e os filhos) e, ao mesmo tempo, a casa onde falta um filho.
const RAMA: StagePropSpec[] = [
  P("tent", -150, 1.2, undefined, 0.24),
  P("door", 20, 0.95, undefined, 0.34),
  P("tree", 250, 1.15, undefined, 0.2),
  P("stall", -300, 0.95, undefined, 0.3),
  P("well", 130, 0.9, undefined, 0.5),
  P("amphora", 190, 0.7, undefined, 0.62),
  P("rock", 320, 0.95, undefined, 0.58),
  P("grass", -60, 0.8, undefined, 0.74),
];

// A SUBIDA A SILÓ — o caminho que a casa de Elcana faz "de ano em ano": a
// estrada de terra pela serra de Efraim, as palmeiras do vale e, ao longe, o
// telhado da casa do SENHOR já à vista. Cenário de MARCHA, não de parada.
const CAMINHO: StagePropSpec[] = [
  P("palm", -280, 1.1, undefined, 0.16),
  P("church", 120, 1.05, undefined, 0.26),
  P("tree", 300, 1.1, undefined, 0.2),
  P("rock", 200, 1.1, undefined, 0.52),
  P("bush", -140, 0.9, undefined, 0.44),
  P("grass", 60, 0.8, undefined, 0.74),
  { ...P("sun", -60, 1.15, undefined, 0.62), sky: true },
];

// SILÓ — o arraial ao redor da CASA DO SENHOR: o santuário no alto do adro, o
// umbral, as tendas dos que sobem para o sacrifício anual, a palmeira do pátio.
const SILO: StagePropSpec[] = [
  P("church", -30, 1.35, undefined, 0.26),
  P("door", 40, 0.9, undefined, 0.46),
  P("tent", -230, 1.15, undefined, 0.3),
  P("tent", 220, 1.1, undefined, 0.32),
  P("palm", 310, 1.1, undefined, 0.18),
  P("amphora", -120, 0.7, undefined, 0.6),
  P("rock", -320, 0.95, undefined, 0.5),
  P("grass", 120, 0.78, undefined, 0.74),
];

// O PÁTIO DO SACRIFÍCIO em Siló — lugar de CARNE e FOGO, não de oração: o
// altar aceso, a fogueira onde ferve a caldeira, a caldeira dos sacerdotes (a
// que o garfo de três dentes vai vasculhar), os caixotes das porções.
const PATIO: StagePropSpec[] = [
  P("altar", -60, 1.15, 0.5, 0.5),
  P("campfire", 90, 1.0, undefined, 0.54),
  { ...P("bowl", 170, 0.85, 0.35, 0.6), tag: "caldeira-de-silo" },
  P("crate", 240, 0.85, undefined, 0.56),
  P("church", -230, 1.2, undefined, 0.26),
  P("amphora", 20, 0.7, undefined, 0.66),
  P("grass", 300, 0.76, undefined, 0.74),
];

// O UMBRAL DO TEMPLO — o canto de Siló onde Ana orou sem voz: a fachada da
// casa do SENHOR, a porta, o castiçal aceso lá dentro e a CADEIRA de Eli
// junto ao pilar, de onde o velho vigia quem entra.
const UMBRAL: StagePropSpec[] = [
  P("church", -80, 1.3, undefined, 0.24),
  P("door", 60, 1.0, undefined, 0.42),
  { ...P("throne", 200, 0.9, undefined, 0.5), tag: "cadeira-de-eli" },
  P("lampstand", 130, 0.8, undefined, 0.58),
  P("amphora", -200, 0.7, undefined, 0.6),
  P("rock", 310, 0.9, undefined, 0.56),
  P("grass", -280, 0.76, undefined, 0.72),
];

// O ADRO ABERTO DO CÂNTICO — Ana de pé diante do altar fumegante, com o céu
// inteiro por cima: é o palco de um hino que vira o mundo do avesso, e por
// isso é largo e claro, sem paredes fechando a cena.
const CANTICO: StagePropSpec[] = [
  P("altar", 0, 1.1, 0.35, 0.5),
  P("church", -220, 1.25, undefined, 0.26),
  P("rock", 250, 1.2, undefined, 0.52),
  P("palm", -320, 1.05, undefined, 0.18),
  P("grass", 150, 0.78, undefined, 0.74),
  { ...P("sun", 60, 1.15, undefined, 0.62), sky: true },
];

// O SANTUÁRIO POR DENTRO — onde o menino ministra de dia: o castiçal, o altar
// do incenso, a ARCA guardada ao fundo e as portas da casa do SENHOR, as
// mesmas que ele abrirá pela manhã em 3:15.
const SANTUARIO: StagePropSpec[] = [
  P("church", -40, 1.3, undefined, 0.22),
  P("door", 60, 0.95, undefined, 0.44),
  P("lampstand", 190, 0.85, undefined, 0.5),
  { ...P("ark", 250, 0.9, undefined, 0.62), tag: "arca-do-concerto" },
  P("altar", -220, 1.0, undefined, 0.48),
  P("amphora", -300, 0.7, undefined, 0.62),
  P("grass", 300, 0.74, undefined, 0.74),
];

// A PORTA DA TENDA DA CONGREGAÇÃO — o lugar exato do escândalo de 2:22: a
// tenda grande, a porta por onde as mulheres se ajuntavam em bandos, os
// caixotes das ofertas desviadas e o santuário atrás, testemunha calada.
const PORTA_TENDA: StagePropSpec[] = [
  P("tent", 0, 1.4, undefined, 0.28),
  { ...P("door", 120, 0.95, undefined, 0.48), tag: "porta-da-tenda-da-congregacao" },
  P("church", -240, 1.15, undefined, 0.26),
  P("crate", 210, 0.8, undefined, 0.58),
  P("amphora", -140, 0.7, undefined, 0.62),
  P("rock", -320, 0.9, undefined, 0.52),
  P("grass", 280, 0.74, undefined, 0.74),
];

// O ADRO DA SENTENÇA — o mesmo santuário, mas na hora do juízo: o altar
// apagado, a porta fechada, a árvore seca e o céu carregado. Aqui o homem de
// Deus fala, e a casa de Eli ouve o que virá sobre ela.
const SENTENCA: StagePropSpec[] = [
  P("church", 0, 1.3, undefined, 0.24),
  P("altar", -170, 1.05, undefined, 0.5),
  P("door", 90, 0.9, undefined, 0.46),
  P("tree", -300, 1.05, undefined, 0.2),
  P("rock", 260, 1.05, undefined, 0.56),
  P("grass", 170, 0.74, undefined, 0.74),
];

// O TEMPLO DE SILÓ DE NOITE — a cena do chamado: a lâmpada de Deus ainda
// acesa (antes de apagar-se), a ARCA no escuro, a porta cerrada, a lua e as
// estrelas por cima do arraial adormecido.
const TEMPLO_NOITE: StagePropSpec[] = [
  P("church", -60, 1.3, undefined, 0.2),
  { ...P("ark", 120, 1.0, undefined, 0.52), tag: "arca-do-concerto" },
  { ...P("lampstand", -10, 0.9, 0.6, 0.6), tag: "lampada-de-deus" },
  P("door", 200, 0.9, undefined, 0.38),
  P("amphora", -230, 0.7, undefined, 0.62),
  P("grass", 290, 0.72, undefined, 0.74),
  { ...P("moon", -180, 1.0, undefined, 0.6), sky: true },
  { ...P("starfield", 40, 1.1, undefined, 0.82), sky: true },
];

// DE DÃ ATÉ BERSEBA — a terra inteira reconhecendo o profeta: a torre do
// norte, a casa do meio, a palmeira do sul, tudo debaixo do mesmo sol. É
// paisagem de NAÇÃO, não de aldeia.
const DA_A_BERSEBA: StagePropSpec[] = [
  P("tower", -260, 1.2, undefined, 0.3),
  P("church", 140, 1.1, undefined, 0.28),
  P("tree", -60, 1.15, undefined, 0.22),
  P("palm", 300, 1.05, undefined, 0.18),
  P("rock", 240, 0.95, undefined, 0.56),
  P("grass", 40, 0.78, undefined, 0.74),
  { ...P("sun", 0, 1.2, undefined, 0.64), sky: true },
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ 1Sm 1
  1: {
    start: { terrain: "field", night: 0.3, glory: 0.22, storm: 0.06, fire: 0, verdure: 0.34 },
    beats: [
      // v.1 — a genealogia abre o livro num homem comum: ELCANA, efrateu de
      // Ramataim-Zofim, na montanha de Efraim. A casa, sozinha na serra.
      b(1, { q: "Houve um homem de Ramataim-Zofim, da montanha de Efraim", set: "rama", props: RAMA,
        env: { terrain: "field", night: 0.28, glory: 0.24, storm: 0.05, verdure: 0.36 }, cast: [
        C("homem", -40, "stand", { dy: 0.5, facing: 1, id: "elcana" }),
      ] }),
      // v.2 — DUAS MULHERES, e a fratura da casa: Penina cercada de filhos à
      // direita; Ana sozinha à esquerda, sem nenhum. A distância entre elas é o
      // enredo do capítulo inteiro.
      b(2, { q: "E Penina tinha filhos, porém Ana não os tinha", cast: [
        C("mulherComum", -190, "stand", { dy: 0.56, facing: 1, id: "ana-mae-de-samuel" }),
        C("homem", -40, "stand", { dy: 0.5, facing: 1, id: "elcana" }),
        C("mulherComum", 120, "stand", { dy: 0.54, facing: -1, id: "penina" }),
        C("servo", 200, "stand", { dy: 0.6, facing: -1, scale: 0.62, id: "filho-de-penina" }),
        C("servo", 250, "stand", { dy: 0.56, facing: -1, scale: 0.58, id: "filha-de-penina" }),
      ] }),
      // v.3 — a SUBIDA anual a Siló, de ano em ano: a casa toda a caminho, e
      // lá adiante, no adro, já esperam Hofni e Finéias — os dois sacerdotes
      // que o livro vai julgar.
      b(3, { q: "a adorar e a sacrificar ao Senhor dos Exércitos em Siló", set: "caminho", props: CAMINHO,
        env: { terrain: "field", night: 0.2, glory: 0.4, verdure: 0.4 }, cast: [
        C("homem", -230, "walk", { dy: 0.56, facing: -1, id: "elcana" }),
        C("mulherComum", -300, "walk", { dy: 0.6, facing: -1, id: "ana-mae-de-samuel" }),
        C("mulherComum", -150, "walk", { dy: 0.52, facing: -1, id: "penina" }),
        C("servo", -100, "walk", { dy: 0.64, facing: -1, scale: 0.62, id: "filho-de-penina" }),
        C("homem", 190, "stand", { dy: 0.46, facing: 1, id: "hofni" }),
        C("homem", 250, "stand", { dy: 0.44, facing: 1, id: "fineias-silo" }),
      ] }),
      // v.4 — o dia do sacrifício no PÁTIO: Elcana reparte as PORÇÕES, e
      // Penina recebe a sua com todos os filhos e todas as filhas em volta.
      b(4, { q: "dava ele porções a Penina, sua mulher, e a todos os seus filhos", set: "patio", props: PATIO,
        env: { terrain: "field", night: 0.26, glory: 0.34, fire: 0.32, verdure: 0.28 }, cast: [
        C("homem", -20, "point", { dy: 0.52, facing: -1, id: "elcana" }),
        C("mulherComum", 140, "stand", { dy: 0.54, facing: -1, id: "penina" }),
        C("servo", 210, "stand", { dy: 0.6, facing: -1, scale: 0.62, id: "filho-de-penina" }),
        C("servo", 265, "stand", { dy: 0.56, facing: -1, scale: 0.58, id: "filha-de-penina" }),
        C("mulherComum", -230, "stand", { dy: 0.58, facing: 1, id: "ana-mae-de-samuel" }),
      ] }),
      // v.5 — a PARTE EXCELENTE: o marido atravessa o pátio para dá-la a Ana,
      // porque a amava — e o texto emenda, na mesma frase, que o SENHOR lhe
      // cerrara a madre. Amor de sobra e ventre fechado, lado a lado.
      b(5, { q: "Porém a Ana dava uma parte excelente; porque amava a Ana", env: { glory: 0.42 }, cast: [
        C("homem", -130, "point", { dy: 0.54, facing: 1, id: "elcana" }),
        C("mulherComum", -240, "stand", { dy: 0.58, facing: -1, id: "ana-mae-de-samuel" }),
        C("mulherComum", 150, "stand", { dy: 0.52, facing: 1, id: "penina" }),
        C("servo", 230, "stand", { dy: 0.58, facing: 1, scale: 0.6, id: "filho-de-penina" }),
      ] }),
      // v.6 — A RIVAL. A provocação não é episódio: é ofício anual, "para a
      // irritar". Penina aponta, primeira do seu papel — a fala é dela; Ana
      // recua com o rosto virado.
      b(6, { by: "mulherComum", q: "E a sua rival excessivamente a provocava, para a irritar",
        env: { night: 0.34, glory: 0.2 }, cast: [
        C("mulherComum", 110, "point", { dy: 0.52, facing: 1, id: "penina" }),
        C("mulherComum", -180, "stand", { dy: 0.6, facing: 1, id: "ana-mae-de-samuel" }),
        C("servo", 200, "stand", { dy: 0.58, facing: 1, scale: 0.6, id: "filho-de-penina" }),
        C("homem", -20, "stand", { dy: 0.48, facing: 1, id: "elcana" }),
      ] }),
      // v.7 — "por isso chorava, e não comia": a festa continua atrás, e ela
      // ajoelhada de costas para a mesa. Luz baixa, ninguém olhando.
      b(7, { q: "por isso chorava, e não comia", env: { night: 0.4, glory: 0.16, fire: 0.3 }, cast: [
        C("mulherComum", -200, "kneel", { dy: 0.64, facing: -1, id: "ana-mae-de-samuel" }),
        C("mulherComum", 160, "stand", { dy: 0.5, facing: 1, id: "penina" }),
        C("servo", 230, "stand", { dy: 0.56, facing: 1, scale: 0.6, id: "filho-de-penina" }),
      ] }),
      // v.8 — ELCANA fala: quatro perguntas seguidas e nenhuma resposta. "Não
      // te sou eu melhor do que dez filhos?" — o carinho que não alcança a dor.
      b(8, { by: "homem", q: "seu marido, lhe disse:", env: { night: 0.36, glory: 0.24 }, cast: [
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "elcana" }),
        C("mulherComum", -210, "kneel", { dy: 0.64, facing: -1, id: "ana-mae-de-samuel" }),
        C("mulherComum", 180, "stand", { dy: 0.5, facing: 1, id: "penina" }),
      ] }),
      // v.9 — ANA SE LEVANTA (o verbo que vira o capítulo) e vai ao templo. No
      // umbral, ELI está assentado na CADEIRA junto ao pilar: o velho vê tudo
      // de longe e entende quase nada.
      b(9, { q: "estava assentado numa cadeira, junto a um pilar do templo do Senhor",
        set: "umbral", props: UMBRAL,
        env: { terrain: "field", night: 0.34, glory: 0.34, fire: 0, verdure: 0.22 }, cast: [
        C("mulherComum", -140, "walk", { dy: 0.58, facing: 1, id: "ana-mae-de-samuel" }),
        C("anciao", 200, "stand", { dy: 0.5, facing: -1, id: "eli" }),
      ] }),
      // v.10 — AMARGURA DE ALMA: ela ora e chora abundantemente, de joelhos
      // junto à porta. Sem balão — este versículo é choro, não discurso.
      b(10, { q: "com amargura de alma, orou ao Senhor, e chorou abundantemente",
        env: { night: 0.36, glory: 0.4 }, cast: [
        C("mulherComum", -90, "kneel", { dy: 0.62, facing: 1, id: "ana-mae-de-samuel" }),
        C("anciao", 200, "stand", { dy: 0.5, facing: -1, id: "eli" }),
      ] }),
      // v.11 — ⭐ O VOTO. "Senhor dos Exércitos!" — e o pedido vira entrega:
      // o filho dado ao SENHOR todos os dias da vida, e sobre a cabeça dele
      // NÃO PASSARÁ NAVALHA. A glória sobe sobre a mulher ajoelhada.
      b(11, { by: "mulherComum", q: "E fez um voto, dizendo:", env: { glory: 0.75, night: 0.28 }, cast: [
        C("mulherComum", -90, "raise", { dy: 0.6, facing: 1, id: "ana-mae-de-samuel" }),
        C("anciao", 200, "stand", { dy: 0.5, facing: -1, id: "eli" }),
      ] }),
      // v.12 — ela PERSEVERA em orar, e Eli observa a boca dela. O sacerdote
      // sai da cadeira e chega perto: a cena passa a ser vista pelos olhos dele.
      b(12, { q: "Eli observou a sua boca", env: { glory: 0.6 }, cast: [
        C("mulherComum", -90, "kneel", { dy: 0.6, facing: 1, id: "ana-mae-de-samuel" }),
        C("anciao", 90, "point", { dy: 0.52, facing: 1, id: "eli" }),
      ] }),
      // v.13 — o detalhe mais fino do capítulo: SÓ SE MOVIAM OS SEUS LÁBIOS.
      // Oração sem voz — e o velho a tem por embriagada.
      b(13, { q: "só se moviam os seus lábios, porém não se ouvia a sua voz",
        env: { glory: 0.66, night: 0.24 }, cast: [
        C("mulherComum", -70, "kneel", { dy: 0.6, facing: 1, id: "ana-mae-de-samuel" }),
        C("anciao", 80, "stand", { dy: 0.52, facing: 1, id: "eli" }),
      ] }),
      // v.14 — ELI a repreende: "Até quando estarás tu embriagada? Aparta de ti
      // o teu vinho". O primeiro juízo do sacerdote no livro é um juízo errado.
      b(14, { by: "anciao", q: "E disse-lhe Eli:", env: { glory: 0.4, night: 0.32 }, cast: [
        C("anciao", 80, "point", { dy: 0.52, facing: 1, id: "eli" }),
        C("mulherComum", -80, "kneel", { dy: 0.62, facing: 1, id: "ana-mae-de-samuel" }),
      ] }),
      // v.15 — ANA responde sem perder a reverência: "nem vinho nem bebida
      // forte tenho bebido; porém tenho derramado a minha alma perante o
      // SENHOR". Ela se levanta para falar.
      b(15, { by: "mulherComum", q: "Porém Ana respondeu:", env: { glory: 0.5 }, cast: [
        C("mulherComum", -80, "stand", { dy: 0.58, facing: 1, id: "ana-mae-de-samuel" }),
        C("anciao", 110, "stand", { dy: 0.52, facing: -1, id: "eli" }),
      ] }),
      // v.16 — "não tenhas a tua serva por FILHA DE BELIAL" — a mesma palavra
      // que o cap. 2 usará para os filhos de Eli. Ela devolve o termo ao dono.
      b(16, { by: "mulherComum", q: "Não tenhas, pois, a tua serva por filha de Belial",
        env: { glory: 0.56 }, cast: [
        C("mulherComum", -80, "point", { dy: 0.58, facing: 1, id: "ana-mae-de-samuel" }),
        C("anciao", 110, "stand", { dy: 0.52, facing: -1, id: "eli" }),
      ] }),
      // v.17 — ELI se corrige e abençoa: "Vai em paz; e o Deus de Israel te
      // conceda a petição". A glória sobe: a bênção é verdadeira, mesmo vinda
      // de um sacerdote que errou o diagnóstico.
      b(17, { by: "anciao", q: "Então respondeu Eli:", env: { glory: 0.74, night: 0.22 }, cast: [
        C("anciao", 110, "raise", { dy: 0.5, facing: -1, id: "eli" }),
        C("mulherComum", -80, "bow", { dy: 0.6, facing: 1, id: "ana-mae-de-samuel" }),
      ] }),
      // v.18 — ela vai embora, COME, e o semblante já não era triste — a
      // resposta ainda não veio e o rosto já mudou. Ana sai de quadro andando.
      b(18, { by: "mulherComum", q: "E disse ela:", env: { glory: 0.66, night: 0.2, verdure: 0.3 }, cast: [
        C("mulherComum", -170, "walk", { dy: 0.6, facing: -1, id: "ana-mae-de-samuel" }),
        C("anciao", 150, "stand", { dy: 0.5, facing: -1, id: "eli" }),
      ] }),
      // v.19 — DE MADRUGADA adoram e voltam para Ramá; e ali, em três palavras,
      // o eixo do livro: "o Senhor se lembrou dela". Casa em luz nova.
      b(19, { q: "chegaram à sua casa, em Ramá, e Elcana conheceu a Ana sua mulher, e o Senhor se lembrou dela",
        set: "rama", props: RAMA,
        env: { terrain: "field", night: 0.24, glory: 0.7, verdure: 0.42 }, cast: [
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "elcana" }),
        C("mulherComum", -80, "stand", { dy: 0.56, facing: 1, id: "ana-mae-de-samuel" }),
      ] }),
      // v.20 — nasce SAMUEL, e o nome é a explicação: "o tenho pedido ao
      // Senhor". Ana fala; o menino recém-nascido no colo, minúsculo em cena.
      b(20, { by: "mulherComum", q: "ao qual chamou Samuel; porque, dizia ela, o tenho pedido ao Senhor",
        env: { glory: 0.8, night: 0.16, verdure: 0.46 }, cast: [
        C("mulherComum", -70, "raise", { dy: 0.58, facing: 1, id: "ana-mae-de-samuel" }),
        C("servo", -10, "stand", { dy: 0.66, facing: 1, scale: 0.42, id: "samuel-menino" }),
        C("homem", 120, "stand", { dy: 0.5, facing: -1, id: "elcana" }),
      ] }),
      // v.21 — a casa torna a SUBIR para o sacrifício anual e para cumprir o
      // voto — só que agora sem Ana: o caminho vai cheio e ela ficou.
      b(21, { q: "a oferecer ao Senhor o sacrifício anual e a cumprir o seu voto",
        set: "caminho", props: CAMINHO,
        env: { terrain: "field", night: 0.22, glory: 0.42, verdure: 0.4 }, cast: [
        C("homem", -160, "walk", { dy: 0.56, facing: -1, id: "elcana" }),
        C("mulherComum", -260, "walk", { dy: 0.52, facing: -1, id: "penina" }),
        C("servo", -80, "walk", { dy: 0.62, facing: -1, scale: 0.62, id: "filho-de-penina" }),
        C("servo", -20, "walk", { dy: 0.58, facing: -1, scale: 0.58, id: "filha-de-penina" }),
      ] }),
      // v.22 — em Ramá, ANA explica ao marido: só depois do DESMAME; e então
      // "lá fique para sempre". O voto tem prazo, e ela o está contando.
      b(22, { by: "mulherComum", q: "mas disse a seu marido:", set: "rama", props: RAMA,
        env: { terrain: "field", night: 0.28, glory: 0.44, verdure: 0.38 }, cast: [
        C("mulherComum", -100, "point", { dy: 0.58, facing: 1, id: "ana-mae-de-samuel" }),
        C("servo", -170, "stand", { dy: 0.66, facing: 1, scale: 0.46, id: "samuel-menino" }),
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "elcana" }),
      ] }),
      // v.23 — ELCANA concorda e devolve tudo a Deus: "somente confirme o
      // Senhor a sua palavra". E ela fica dando leite ao filho.
      b(23, { by: "homem", q: "seu marido, lhe disse:", env: { glory: 0.52 }, cast: [
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "elcana" }),
        C("mulherComum", -100, "kneel", { dy: 0.6, facing: 1, id: "ana-mae-de-samuel" }),
        C("servo", -170, "stand", { dy: 0.66, facing: 1, scale: 0.46, id: "samuel-menino" }),
      ] }),
      // v.24 — a subida do CUMPRIMENTO, carregada: TRÊS BEZERROS, UM EFA DE
      // FARINHA, UM ODRE DE VINHO — e o menino, "ainda muito criança", andando
      // ao lado da mãe pela estrada de Siló.
      b(24, { q: "com três bezerros, e um efa de farinha, e um odre de vinho",
        set: "caminho",
        props: [
          P("palm", -280, 1.1, undefined, 0.16),
          P("church", 120, 1.05, undefined, 0.26),
          P("tree", 300, 1.1, undefined, 0.2),
          { ...P("crate", 40, 0.85, undefined, 0.64), tag: "efa-de-farinha" },
          { ...P("amphora", -20, 0.8, undefined, 0.68), tag: "odre-de-vinho" },
          P("bush", -140, 0.9, undefined, 0.44),
          P("grass", 210, 0.78, undefined, 0.74),
          { ...P("sun", -60, 1.15, undefined, 0.62), sky: true },
        ],
        env: { terrain: "field", night: 0.18, glory: 0.58, verdure: 0.42 }, cast: [
        C("mulherComum", -180, "walk", { dy: 0.58, facing: -1, id: "ana-mae-de-samuel" }),
        C("servo", -110, "walk", { dy: 0.64, facing: -1, scale: 0.5, id: "samuel-menino" }),
        C("homem", -250, "walk", { dy: 0.54, facing: -1, id: "elcana" }),
        C("rebanho", 160, "stand", { dy: 0.6, facing: -1, scale: 0.9, id: "bezerros-do-voto" }),
      ] }),
      // v.25 — no pátio: DEGOLARAM UM BEZERRO (o altar arde) e trouxeram o
      // menino a Eli. O sacrifício e a entrega acontecem no mesmo gesto.
      b(25, { q: "E degolaram um bezerro, e trouxeram o menino a Eli", set: "patio", props: PATIO,
        env: { terrain: "field", night: 0.24, glory: 0.6, fire: 0.42, verdure: 0.26 }, cast: [
        C("mulherComum", -180, "walk", { dy: 0.58, facing: -1, id: "ana-mae-de-samuel" }),
        C("servo", -110, "walk", { dy: 0.62, facing: -1, scale: 0.5, id: "samuel-menino" }),
        C("anciao", 130, "stand", { dy: 0.5, facing: 1, id: "eli" }),
        C("homem", -260, "stand", { dy: 0.52, facing: -1, id: "elcana" }),
      ] }),
      // v.26 — ANA se identifica: "eu sou aquela mulher que aqui esteve
      // contigo, para orar ao SENHOR". Anos depois, ela volta ao mesmo umbral
      // com o mesmo sacerdote — e agora com o menino pela mão.
      b(26, { by: "mulherComum", q: "E disse ela:", set: "umbral", props: UMBRAL,
        env: { terrain: "field", night: 0.24, glory: 0.66, fire: 0, verdure: 0.24 }, cast: [
        C("mulherComum", -110, "stand", { dy: 0.58, facing: 1, id: "ana-mae-de-samuel" }),
        C("servo", -30, "stand", { dy: 0.64, facing: 1, scale: 0.5, id: "samuel-menino" }),
        C("anciao", 180, "stand", { dy: 0.5, facing: -1, id: "eli" }),
      ] }),
      // v.27 — "POR ESTE MENINO ORAVA EU" — ela aponta para o filho e mostra a
      // oração atendida de pé, viva, ali no meio do adro.
      b(27, { by: "mulherComum", q: "Por este menino orava eu; e o Senhor atendeu à minha petição",
        env: { glory: 0.8 }, cast: [
        C("mulherComum", -110, "point", { dy: 0.58, facing: 1, id: "ana-mae-de-samuel" }),
        C("servo", -30, "stand", { dy: 0.64, facing: 1, scale: 0.5, id: "samuel-menino" }),
        C("anciao", 180, "stand", { dy: 0.5, facing: -1, id: "eli" }),
      ] }),
      // v.28 — ⭐ A ENTREGA: "também ao Senhor eu o entreguei, por todos os
      // dias que viver". A mãe se prostra, o menino fica de pé com o velho
      // sacerdote, e a glória enche o umbral. Fim do capítulo em adoração.
      b(28, { by: "mulherComum", q: "Por isso também ao Senhor eu o entreguei, por todos os dias que viver",
        env: { glory: 0.95, night: 0.12, verdure: 0.26 }, cast: [
        C("mulherComum", -140, "bow", { dy: 0.62, facing: 1, id: "ana-mae-de-samuel" }),
        C("servo", 40, "stand", { dy: 0.6, facing: -1, scale: 0.52, id: "samuel-menino", glow: 0.4 }),
        C("anciao", 180, "raise", { dy: 0.5, facing: -1, id: "eli" }),
        C("homem", -260, "bow", { dy: 0.56, facing: 1, id: "elcana" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ 1Sm 2
  2: {
    start: { terrain: "field", night: 0.14, glory: 0.8, storm: 0.05, fire: 0.2, verdure: 0.32 },
    beats: [
      // v.1 — ⭐ O CÂNTICO começa: "o meu coração exulta ao SENHOR". Ana de
      // braços erguidos diante do altar, sozinha no adro aberto — a mesma boca
      // que em 1:13 não tinha voz agora se dilatou sobre os inimigos.
      b(1, { by: "mulherComum", q: "Então orou Ana, e disse:", set: "cantico", props: CANTICO,
        env: { terrain: "field", night: 0.12, glory: 0.85, fire: 0.2, verdure: 0.34 }, cast: [
        C("mulherComum", -60, "raise", { dy: 0.58, facing: 1, id: "ana-mae-de-samuel" }),
      ] }),
      // v.2 — "ROCHA NENHUMA HÁ COMO O NOSSO DEUS": a rocha do adro cresce e
      // toma o quadro; Ana ajoelha ao pé dela. Imagem, não abstração.
      b(2, { by: "mulherComum", q: "e rocha nenhuma há como o nosso Deus",
        props: [
          { ...P("rock", 150, 1.7, undefined, 0.42), tag: "rocha-do-cantico-de-ana" },
          P("altar", -110, 1.05, 0.3, 0.52),
          P("church", -270, 1.15, undefined, 0.26),
          P("grass", 40, 0.78, undefined, 0.74),
          { ...P("sun", -40, 1.15, undefined, 0.66), sky: true },
        ],
        env: { glory: 0.9 }, cast: [
        C("mulherComum", -20, "kneel", { dy: 0.62, facing: 1, id: "ana-mae-de-samuel" }),
      ] }),
      // v.3 — contra a ALTIVEZ: "por ele são as obras pesadas na balança". Os
      // arrogantes de Siló entram em cena, de queixo erguido, para serem
      // pesados — Ana os enfrenta apontando.
      b(3, { by: "mulherComum", q: "e por ele são as obras pesadas na balança", set: "cantico", props: CANTICO,
        env: { glory: 0.76, storm: 0.14 }, cast: [
        C("mulherComum", -120, "point", { dy: 0.58, facing: 1, id: "ana-mae-de-samuel" }),
        C("homem", 120, "stand", { dy: 0.52, facing: -1, id: "altivo-de-silo" }),
        C("homem", 220, "stand", { dy: 0.48, facing: -1, id: "arrogante-de-silo" }),
      ] }),
      // v.4 — A PRIMEIRA REVIRAVOLTA: o ARCO DOS FORTES quebrado e o que
      // TROPEÇAVA cingido de força. O forte cai curvado à direita; o fraco se
      // levanta de braços erguidos à esquerda. A cena troca de lado.
      b(4, { by: "mulherComum", q: "O arco dos fortes foi quebrado, e os que tropeçavam foram cingidos de força",
        env: { glory: 0.82, storm: 0.2 }, cast: [
        C("mulherComum", -30, "raise", { dy: 0.56, facing: 1, id: "ana-mae-de-samuel" }),
        C("homem", 190, "bow", { dy: 0.6, facing: -1, id: "forte-de-arco-quebrado" }),
        C("homem", -210, "raise", { dy: 0.58, facing: 1, id: "tropecado-cingido-de-forca" }),
      ] }),
      // v.5 — A ESTÉRIL DEU À LUZ SETE FILHOS. É o verso de Ana sobre Ana: ela
      // cercada de crianças, e a que tinha muitos filhos enfraquecida ao lado;
      // e o farto, agora alugado por pão, curvado sobre o caixote.
      b(5, { by: "mulherComum", q: "até a estéril deu à luz sete filhos, e a que tinha muitos filhos enfraqueceu",
        props: [
          P("altar", -140, 1.0, 0.3, 0.52),
          P("crate", 210, 0.9, undefined, 0.62),
          P("church", -280, 1.15, undefined, 0.26),
          P("sheaf", 90, 0.95, undefined, 0.66),
          P("grass", -40, 0.78, undefined, 0.74),
          { ...P("sun", 20, 1.15, undefined, 0.66), sky: true },
        ],
        env: { glory: 0.88, verdure: 0.42 }, cast: [
        C("mulherComum", -80, "raise", { dy: 0.56, facing: 1, id: "ana-mae-de-samuel" }),
        C("servo", -170, "stand", { dy: 0.64, facing: 1, scale: 0.5, id: "filho-da-esteril-1" }),
        C("servo", -230, "stand", { dy: 0.6, facing: 1, scale: 0.46, id: "filho-da-esteril-2" }),
        C("servo", -10, "stand", { dy: 0.68, facing: -1, scale: 0.48, id: "filho-da-esteril-3" }),
        C("mulherComum", 260, "bow", { dy: 0.56, facing: -1, id: "mulher-de-muitos-filhos" }),
        C("homem", 150, "bow", { dy: 0.62, facing: -1, id: "farto-alugado-por-pao" }),
      ] }),
      // v.6 — O SENHOR FAZ DESCER À SEPULTURA E FAZ TORNAR A SUBIR. A noite
      // cobre metade do palco: um corpo deitado no escuro à direita, um homem
      // erguido na luz à esquerda — o mesmo verso, os dois destinos.
      b(6, { by: "mulherComum", q: "faz descer à sepultura e faz tornar a subir dela",
        props: [
          P("rock", 200, 1.5, undefined, 0.5),
          P("altar", -150, 1.0, 0.25, 0.52),
          P("church", -290, 1.1, undefined, 0.26),
          P("grass", 60, 0.72, undefined, 0.74),
        ],
        env: { glory: 0.7, night: 0.48, storm: 0.22 }, cast: [
        C("mulherComum", -60, "raise", { dy: 0.56, facing: 1, id: "ana-mae-de-samuel" }),
        C("homem", 230, "lie", { dy: 0.68, facing: -1, id: "descido-a-sepultura" }),
        C("homem", -220, "raise", { dy: 0.58, facing: 1, id: "tornado-a-subir" }),
      ] }),
      // v.7 — "empobrece e enriquece; abaixa e também exalta". O rico do beat
      // anterior desce ao chão, o pobre sobe — os dois trocam de altura (dy) e
      // de pose no mesmo corte.
      b(7, { by: "mulherComum", q: "O Senhor empobrece e enriquece; abaixa e também exalta",
        set: "cantico", props: CANTICO,
        env: { glory: 0.8, night: 0.24, storm: 0.12 }, cast: [
        C("mulherComum", -40, "point", { dy: 0.56, facing: 1, id: "ana-mae-de-samuel" }),
        C("homem", 200, "kneel", { dy: 0.66, facing: -1, id: "rico-abaixado" }),
        C("homem", -230, "stand", { dy: 0.5, facing: 1, id: "pobre-exaltado" }),
      ] }),
      // v.8 — ⭐ LEVANTA O POBRE DO PÓ e o assenta ENTRE OS PRÍNCIPES, para o
      // fazer herdar O TRONO DE GLÓRIA. O trono entra em cena e o necessitado
      // do monturo é conduzido até ele. Glória no auge.
      b(8, { by: "mulherComum", q: "Levanta o pobre do pó, e desde o monturo exalta o necessitado",
        props: [
          { ...P("throne", 190, 1.05, undefined, 0.42), tag: "trono-de-gloria" },
          P("altar", -170, 1.0, 0.3, 0.52),
          P("church", -300, 1.1, undefined, 0.26),
          P("rock", 60, 0.9, undefined, 0.66),
          P("grass", -60, 0.78, undefined, 0.74),
          { ...P("sun", 30, 1.2, undefined, 0.68), sky: true },
        ],
        env: { glory: 0.95, night: 0.12, storm: 0.06, verdure: 0.36 }, cast: [
        C("mulherComum", -70, "raise", { dy: 0.56, facing: 1, id: "ana-mae-de-samuel" }),
        C("homem", 90, "raise", { dy: 0.6, facing: 1, id: "pobre-do-monturo" }),
        C("rei", 260, "stand", { dy: 0.46, facing: -1, id: "principe-do-cantico" }),
      ] }),
      // v.9 — "os ímpios ficarão MUDOS NAS TREVAS". A noite sobe de vez: os
      // ímpios curvados no escuro à direita, e os pés dos santos guardados na
      // faixa de luz que resta.
      b(9, { by: "mulherComum", q: "porém os ímpios ficarão mudos nas trevas",
        env: { glory: 0.5, night: 0.66, storm: 0.3 }, cast: [
        C("mulherComum", -100, "stand", { dy: 0.56, facing: 1, id: "ana-mae-de-samuel" }),
        C("homem", 200, "bow", { dy: 0.62, facing: -1, id: "impio-mudo-nas-trevas" }),
        C("homem", 280, "bow", { dy: 0.56, facing: -1, id: "impio-sem-forca" }),
        C("homem", -230, "walk", { dy: 0.58, facing: 1, id: "santo-de-pes-guardados" }),
      ] }),
      // v.10 — ⭐ O FIM DO CÂNTICO: "DESDE OS CÉUS TROVEJARÁ SOBRE ELES". A
      // tempestade rompe, as nuvens tomam o céu — e no último fôlego Ana fala
      // do SEU REI e do SEU UNGIDO, quando Israel ainda não tem rei nenhum.
      b(10, { by: "mulherComum", q: "desde os céus trovejará sobre eles",
        props: [
          { ...P("throne", 210, 1.0, undefined, 0.42), tag: "trono-de-gloria" },
          P("altar", -160, 1.05, 0.4, 0.52),
          P("church", -300, 1.1, undefined, 0.26),
          P("rock", 80, 0.95, undefined, 0.66),
          P("grass", -40, 0.74, undefined, 0.74),
          { ...P("clouds", -20, 1.3, undefined, 0.74), sky: true },
          { ...P("firmament", 120, 1.2, undefined, 0.86), sky: true },
        ],
        env: { glory: 0.9, night: 0.34, storm: 0.7, fire: 0.2 }, cast: [
        C("mulherComum", -80, "raise", { dy: 0.56, facing: 1, id: "ana-mae-de-samuel" }),
        C("rei", 250, "stand", { dy: 0.44, facing: -1, id: "rei-e-ungido-do-cantico" }),
        C("homem", 130, "bow", { dy: 0.64, facing: -1, id: "contendedor-quebrantado" }),
      ] }),
      // v.11 — o corte seco depois do hino: ELCANA VOLTA A RAMÁ e o menino
      // FICA. A família sai de cena pela esquerda; sobram o menino e o velho.
      b(11, { q: "porém o menino ficou servindo ao Senhor, perante o sacerdote Eli",
        set: "silo", props: SILO,
        env: { terrain: "field", night: 0.26, glory: 0.55, storm: 0.06, fire: 0, verdure: 0.32 }, cast: [
        C("homem", -280, "walk", { dy: 0.54, facing: 1, id: "elcana" }),
        C("mulherComum", -220, "walk", { dy: 0.58, facing: 1, id: "ana-mae-de-samuel" }),
        C("servo", 30, "stand", { dy: 0.62, facing: -1, scale: 0.54, id: "samuel-menino", glow: 0.35 }),
        C("anciao", 170, "stand", { dy: 0.5, facing: -1, id: "eli" }),
      ] }),
      // v.12 — a queda: os filhos de Eli eram FILHOS DE BELIAL; NÃO CONHECIAM
      // AO SENHOR. Sacerdotes de pé no pátio, sem glória alguma sobre eles.
      b(12, { q: "Eram, porém, os filhos de Eli filhos de Belial; não conheciam ao Senhor",
        set: "patio", props: PATIO,
        env: { terrain: "field", night: 0.5, glory: 0.14, storm: 0.16, fire: 0.4, verdure: 0.2 }, cast: [
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "hofni" }),
        C("homem", 170, "stand", { dy: 0.46, facing: -1, id: "fineias-silo" }),
      ] }),
      // v.13 — O COSTUME: enquanto a carne coze, vem o MOÇO DO SACERDOTE com o
      // GARFO DE TRÊS DENTES na mão, direto à caldeira sobre a fogueira.
      b(13, { q: "com um garfo de três dentes em sua mão", env: { night: 0.46, fire: 0.55 }, cast: [
        C("servo", 120, "point", { dy: 0.56, facing: -1, id: "moco-do-sacerdote" }),
        C("homem", -140, "kneel", { dy: 0.6, facing: 1, id: "ofertante-de-silo" }),
        C("homem", 240, "stand", { dy: 0.46, facing: -1, id: "hofni" }),
      ] }),
      // v.14 — e TUDO QUANTO O GARFO TIRAVA o sacerdote tomava para si: assim
      // faziam a TODO O ISRAEL que ia ali. O ofertante recua; o moço não.
      b(14, { q: "e tudo quanto o garfo tirava, o sacerdote tomava para si",
        env: { night: 0.5, fire: 0.6, glory: 0.1 }, cast: [
        C("servo", 130, "raise", { dy: 0.56, facing: -1, id: "moco-do-sacerdote" }),
        C("homem", -160, "bow", { dy: 0.62, facing: 1, id: "ofertante-de-silo" }),
        C("homem", 250, "stand", { dy: 0.46, facing: -1, id: "fineias-silo" }),
      ] }),
      // v.15 — pior que o garfo: ANTES DE QUEIMAREM A GORDURA já vinha exigir
      // carne CRUA para assar. A parte de Deus fica para depois — se sobrar.
      b(15, { by: "servo", q: "e dizia ao homem que sacrificava:",
        env: { night: 0.52, fire: 0.62, glory: 0.08 }, cast: [
        C("servo", 90, "point", { dy: 0.56, facing: 1, id: "moco-do-sacerdote" }),
        C("homem", -150, "stand", { dy: 0.6, facing: 1, id: "ofertante-de-silo" }),
      ] }),
      // v.16 — o ofertante pede que se queime primeiro a gordura, e ouve a
      // resposta que fecha o caso: "agora a hás de dar, e, se não, POR FORÇA A
      // TOMAREI". Roubo dentro do santuário.
      b(16, { by: "servo", q: "então ele lhe dizia:", env: { night: 0.58, storm: 0.24, fire: 0.6 }, cast: [
        C("servo", 80, "raise", { dy: 0.56, facing: 1, id: "moco-do-sacerdote" }),
        C("homem", -160, "bow", { dy: 0.62, facing: 1, id: "ofertante-de-silo" }),
        C("homem", 230, "stand", { dy: 0.46, facing: -1, id: "hofni" }),
      ] }),
      // v.17 — o veredicto do narrador: MUITO GRANDE o pecado destes moços
      // PERANTE O SENHOR, porque os homens desprezavam a oferta. Céu fechado.
      b(17, { q: "Era, pois, muito grande o pecado destes moços perante o Senhor",
        env: { night: 0.64, glory: 0.06, storm: 0.32, fire: 0.5 }, cast: [
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "hofni" }),
        C("homem", 180, "stand", { dy: 0.46, facing: -1, id: "fineias-silo" }),
        C("servo", 270, "stand", { dy: 0.54, facing: -1, id: "moco-do-sacerdote" }),
        C("homem", -190, "bow", { dy: 0.62, facing: 1, id: "ofertante-de-silo" }),
      ] }),
      // v.18 — "PORÉM Samuel ministrava perante o SENHOR": o contraste é o
      // ponto. O menino sozinho no santuário, vestido com o ÉFODE DE LINHO,
      // luz voltando ao quadro.
      b(18, { q: "vestido com um éfode de linho", set: "santuario", props: SANTUARIO,
        env: { terrain: "field", night: 0.24, glory: 0.72, storm: 0, fire: 0, verdure: 0.2 }, cast: [
        C("servo", -20, "stand", { dy: 0.58, facing: 1, scale: 0.58, id: "samuel-menino", glow: 0.5 }),
      ] }),
      // v.19 — A TÚNICA PEQUENA que a mãe lhe fazia e trazia DE ANO EM ANO — a
      // única coisa que Ana ainda pode dar ao filho entregue. Ela chega com o
      // embrulho; o menino já está um pouco maior que no ano passado.
      b(19, { q: "E sua mãe lhe fazia uma túnica pequena, e de ano em ano lha trazia",
        props: [
          P("church", -40, 1.3, undefined, 0.22),
          P("door", 60, 0.95, undefined, 0.44),
          P("lampstand", 190, 0.85, undefined, 0.5),
          { ...P("crate", -150, 0.8, undefined, 0.64), tag: "capinha-de-samuel" },
          P("altar", -240, 1.0, undefined, 0.48),
          P("grass", 290, 0.74, undefined, 0.74),
        ],
        env: { glory: 0.68, night: 0.26, verdure: 0.24 }, cast: [
        C("mulherComum", -110, "kneel", { dy: 0.62, facing: 1, id: "ana-mae-de-samuel" }),
        C("servo", 20, "stand", { dy: 0.6, facing: -1, scale: 0.6, id: "samuel-menino", glow: 0.4 }),
        C("homem", 200, "stand", { dy: 0.5, facing: -1, id: "elcana" }),
      ] }),
      // v.20 — ELI ABENÇOA Elcana e a mulher: "o Senhor te dê descendência
      // desta mulher, pela petição que fez". O velho errou o diagnóstico em
      // 1:14, mas a bênção dele continua valendo.
      b(20, { by: "anciao", q: "e dizia:", set: "silo", props: SILO,
        env: { terrain: "field", night: 0.2, glory: 0.82, fire: 0, verdure: 0.34 }, cast: [
        C("anciao", 120, "raise", { dy: 0.5, facing: -1, id: "eli" }),
        C("homem", -120, "bow", { dy: 0.56, facing: 1, id: "elcana" }),
        C("mulherComum", -210, "bow", { dy: 0.6, facing: 1, id: "ana-mae-de-samuel" }),
        C("servo", 20, "stand", { dy: 0.62, facing: -1, scale: 0.6, id: "samuel-menino" }),
      ] }),
      // v.21 — a bênção se cumpre: TRÊS FILHOS E DUAS FILHAS na casa de Ramá;
      // e, longe dali, "o jovem Samuel crescia DIANTE DO SENHOR".
      b(21, { q: "e deu à luz três filhos e duas filhas", set: "rama", props: RAMA,
        env: { terrain: "field", night: 0.16, glory: 0.78, verdure: 0.48 }, cast: [
        C("mulherComum", -70, "raise", { dy: 0.58, facing: 1, id: "ana-mae-de-samuel" }),
        C("servo", -180, "stand", { dy: 0.64, facing: 1, scale: 0.5, id: "filho-de-ana-1" }),
        C("servo", -240, "stand", { dy: 0.6, facing: 1, scale: 0.46, id: "filho-de-ana-2" }),
        C("servo", 30, "stand", { dy: 0.68, facing: -1, scale: 0.48, id: "filho-de-ana-3" }),
        C("servo", 110, "stand", { dy: 0.62, facing: -1, scale: 0.46, id: "filha-de-ana-1" }),
        C("servo", 170, "stand", { dy: 0.58, facing: -1, scale: 0.44, id: "filha-de-ana-2" }),
      ] }),
      // v.22 — Eli JÁ MUITO VELHO ouve tudo: os filhos se deitavam com as
      // mulheres que em bandos se ajuntavam À PORTA DA TENDA DA CONGREGAÇÃO. O
      // escândalo acontece na própria soleira do santuário.
      b(22, { q: "de como se deitavam com as mulheres que em bandos se ajuntavam à porta da tenda da congregação",
        set: "porta-tenda", props: PORTA_TENDA,
        env: { terrain: "field", night: 0.6, glory: 0.08, storm: 0.22, verdure: 0.18 }, cast: [
        C("anciao", -230, "stand", { dy: 0.5, facing: -1, id: "eli" }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "hofni" }),
        C("homem", 170, "stand", { dy: 0.48, facing: -1, id: "fineias-silo" }),
        C("mulherComum", 250, "stand", { dy: 0.58, facing: 1, id: "mulher-da-porta-da-tenda" }),
      ] }),
      // v.23 — o velho enfim fala: "Por que fazeis tais coisas? Pois OUÇO DE
      // TODO ESTE POVO os vossos malefícios". Ele sabe, e sabe que todos sabem.
      b(23, { by: "anciao", q: "E disse-lhes:", env: { night: 0.56, glory: 0.16, storm: 0.2 }, cast: [
        C("anciao", -140, "point", { dy: 0.52, facing: -1, id: "eli" }),
        C("homem", 80, "stand", { dy: 0.52, facing: 1, id: "hofni" }),
        C("homem", 190, "stand", { dy: 0.48, facing: 1, id: "fineias-silo" }),
      ] }),
      // v.24 — ⭐ "NÃO, FILHOS MEUS" — a repreensão fraca que o cap. 3 vai
      // cobrar dele: um pai que reclama da FAMA em vez de tirar os filhos do
      // altar. Ele estende a mão e eles nem se viram.
      b(24, { by: "anciao", q: "Não, filhos meus, porque não é boa esta fama que ouço",
        env: { night: 0.58, glory: 0.14 }, cast: [
        C("anciao", -140, "raise", { dy: 0.52, facing: -1, id: "eli" }),
        C("homem", 90, "stand", { dy: 0.52, facing: -1, id: "hofni" }),
        C("homem", 200, "stand", { dy: 0.48, facing: -1, id: "fineias-silo" }),
      ] }),
      // v.25 — "quem rogará por ele?" — e a sentença já se ouve na entrelinha:
      // NÃO OUVIRAM a voz do pai, porque o SENHOR OS QUERIA MATAR. Os dois
      // saem andando de costas para o velho; a tempestade sobe.
      b(25, { q: "Mas não ouviram a voz de seu pai, porque o Senhor os queria matar",
        env: { night: 0.68, glory: 0.06, storm: 0.42 }, cast: [
        C("homem", 150, "walk", { dy: 0.52, facing: 1, id: "hofni" }),
        C("homem", 250, "walk", { dy: 0.48, facing: 1, id: "fineias-silo" }),
        C("anciao", -180, "bow", { dy: 0.54, facing: -1, id: "eli" }),
      ] }),
      // v.26 — outra vez o contraste, e é assim que o capítulo respira: O JOVEM
      // SAMUEL IA CRESCENDO, agradável ao SENHOR E AOS HOMENS. Luz de volta,
      // menino em movimento dentro do santuário.
      b(26, { q: "E o jovem Samuel ia crescendo, e fazia-se agradável",
        set: "santuario", props: SANTUARIO,
        env: { terrain: "field", night: 0.2, glory: 0.78, storm: 0, verdure: 0.24 }, cast: [
        C("servo", -60, "walk", { dy: 0.6, facing: 1, scale: 0.66, id: "samuel-menino", glow: 0.5 }),
        C("anciao", 180, "stand", { dy: 0.5, facing: -1, id: "eli" }),
      ] }),
      // v.27 — ⭐ VEIO UM HOMEM DE DEUS A ELI. A palavra é do SENHOR, mas há
      // BOCA HUMANA na frase: por isso não é voz do céu — é `by:"homem"`, o
      // mensageiro em cena, PRIMEIRO homem do cast, com glória sobre ele.
      b(27, { by: "homem", q: "e disse-lhe:", set: "sentenca", props: SENTENCA,
        env: { terrain: "field", night: 0.46, glory: 0.6, storm: 0.24, fire: 0, verdure: 0.16 }, cast: [
        C("homem", 120, "stand", { dy: 0.48, facing: -1, id: "homem-de-deus", glow: 0.9 }),
        C("anciao", -130, "stand", { dy: 0.54, facing: 1, id: "eli" }),
      ] }),
      // v.28 — a memória da eleição: EU O ESCOLHI dentre todas as tribos por
      // sacerdote, para oferecer sobre o meu altar e TRAZER O ÉFODE. O
      // mensageiro aponta para o altar apagado atrás de Eli.
      b(28, { by: "homem", q: "E eu o escolhi dentre todas as tribos de Israel por sacerdote",
        env: { glory: 0.7, night: 0.42 }, cast: [
        C("homem", 120, "point", { dy: 0.48, facing: -1, id: "homem-de-deus", glow: 0.95 }),
        C("anciao", -130, "stand", { dy: 0.54, facing: 1, id: "eli" }),
      ] }),
      // v.29 — a acusação nominal: "POR QUE PISASTES o meu sacrifício... e
      // HONRAS A TEUS FILHOS MAIS DO QUE A MIM?" O velho recua e curva.
      b(29, { by: "homem", q: "Por que pisastes o meu sacrifício e a minha oferta de alimentos",
        env: { glory: 0.72, night: 0.46, storm: 0.34 }, cast: [
        C("homem", 110, "raise", { dy: 0.48, facing: -1, id: "homem-de-deus", glow: 1 }),
        C("anciao", -150, "bow", { dy: 0.58, facing: 1, id: "eli" }),
      ] }),
      // v.30 — ⭐ a lei que rege o resto do livro: "AOS QUE ME HONRAM HONRAREI,
      // porém OS QUE ME DESPREZAM SERÃO DESPREZADOS". A promessa perpétua à
      // casa é revogada em pleno adro.
      b(30, { by: "homem", q: "porque aos que me honram honrarei, porém os que me desprezam serão desprezados",
        env: { glory: 0.88, night: 0.38, storm: 0.3 }, cast: [
        C("homem", 100, "raise", { dy: 0.46, facing: -1, id: "homem-de-deus", glow: 1, scale: 1.12 }),
        C("anciao", -160, "kneel", { dy: 0.62, facing: 1, id: "eli" }),
      ] }),
      // v.31 — "CORTAREI O TEU BRAÇO": não haverá mais ANCIÃO ALGUM na casa de
      // Eli — a velhice que ele alcançou nenhum descendente alcançará.
      b(31, { by: "homem", q: "Eis que vêm dias em que cortarei o teu braço",
        env: { glory: 0.7, night: 0.52, storm: 0.5 }, cast: [
        C("homem", 100, "point", { dy: 0.46, facing: -1, id: "homem-de-deus", glow: 0.95 }),
        C("anciao", -160, "kneel", { dy: 0.62, facing: 1, id: "eli" }),
      ] }),
      // v.32 — "E VERÁS O APERTO DA MORADA DE DEUS": ele viverá o bastante para
      // ver o santuário estreitado. Casa do SENHOR ao fundo, céu carregado.
      b(32, { by: "homem", q: "E verás o aperto da morada de Deus",
        env: { glory: 0.6, night: 0.58, storm: 0.56 }, cast: [
        C("homem", 110, "stand", { dy: 0.46, facing: -1, id: "homem-de-deus", glow: 0.9 }),
        C("anciao", -150, "bow", { dy: 0.6, facing: 1, id: "eli" }),
      ] }),
      // v.33 — o que restar "será para TE CONSUMIR OS OLHOS e para te
      // entristecer a alma" — o velho que já vai cegando ouve isso de olhos
      // baixos, com um descendente encolhido atrás.
      b(33, { by: "homem", q: "será para te consumir os olhos e para te entristecer a alma",
        env: { glory: 0.56, night: 0.62, storm: 0.5 }, cast: [
        C("homem", 110, "point", { dy: 0.46, facing: -1, id: "homem-de-deus", glow: 0.9 }),
        C("anciao", -150, "bow", { dy: 0.6, facing: 1, id: "eli" }),
        C("servo", -270, "kneel", { dy: 0.56, facing: 1, id: "descendente-de-eli" }),
      ] }),
      // v.34 — ⭐ O SINAL: HOFNI E FINÉIAS, AMBOS MORRERÃO NO MESMO DIA. A cena
      // antecipa o que 1Sm 4 cumprirá — os dois no chão, sem multidão festiva
      // por perto (aqui a regra é figura individual em `lie`).
      b(34, { by: "homem", q: "a Hofni e a Finéias; ambos morrerão no mesmo dia",
        env: { glory: 0.52, night: 0.72, storm: 0.6 }, cast: [
        C("homem", 90, "point", { dy: 0.44, facing: -1, id: "homem-de-deus", glow: 0.95 }),
        C("homem", 220, "lie", { dy: 0.66, facing: -1, id: "hofni" }),
        C("homem", 290, "lie", { dy: 0.58, facing: -1, id: "fineias-silo" }),
        C("anciao", -170, "kneel", { dy: 0.62, facing: 1, id: "eli" }),
      ] }),
      // v.35 — mas a sentença não termina em ruína: "EU SUSCITAREI PARA MIM UM
      // SACERDOTE FIEL". A glória volta a subir — e o menino que a cumprirá já
      // está no santuário, ao fundo do quadro.
      b(35, { by: "homem", q: "E eu suscitarei para mim um sacerdote fiel",
        env: { glory: 0.85, night: 0.44, storm: 0.22 }, cast: [
        C("homem", 80, "raise", { dy: 0.46, facing: -1, id: "homem-de-deus", glow: 1 }),
        C("servo", 250, "stand", { dy: 0.4, facing: -1, scale: 0.6, id: "samuel-menino", glow: 0.55 }),
        C("anciao", -170, "kneel", { dy: 0.62, facing: 1, id: "eli" }),
      ] }),
      // v.36 — o fim da casa em miniatura: um sobrevivente vindo inclinar-se
      // POR UMA MOEDA DE PRATA E POR UM BOCADO DE PÃO, pedindo um ministério
      // qualquer. Luz baixa, ninguém erguido.
      b(36, { q: "por uma moeda de prata e por um bocado de pão",
        env: { glory: 0.2, night: 0.66, storm: 0.24 }, cast: [
        C("servo", -60, "bow", { dy: 0.62, facing: 1, id: "descendente-de-eli" }),
        C("anciao", -220, "stand", { dy: 0.54, facing: 1, id: "eli" }),
        C("homem", 180, "stand", { dy: 0.48, facing: -1, id: "sacerdote-que-restar" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ 1Sm 3
  3: {
    start: { terrain: "field", night: 0.38, glory: 0.34, storm: 0.08, fire: 0, verdure: 0.2 },
    beats: [
      // v.1 — o diagnóstico da época: a palavra do SENHOR era RARA e NÃO HAVIA
      // VISÃO MANIFESTA. O menino serve, o velho vigia, e o céu está calado —
      // glória baixa de propósito neste primeiro beat.
      b(1, { q: "não havia visão manifesta", set: "santuario", props: SANTUARIO,
        env: { terrain: "field", night: 0.42, glory: 0.26, storm: 0.06, verdure: 0.18 }, cast: [
        C("servo", -50, "stand", { dy: 0.6, facing: 1, scale: 0.68, id: "samuel-menino" }),
        C("anciao", 170, "stand", { dy: 0.5, facing: -1, id: "eli" }),
      ] }),
      // v.2 — cai a noite: ELI DEITADO NO SEU LUGAR, e os olhos começando a
      // escurecer — ele já não pode ver. A cegueira do sacerdote é literal e é
      // figura do capítulo inteiro.
      b(2, { q: "estando Eli deitado no seu lugar", set: "templo-noite", props: TEMPLO_NOITE,
        env: { terrain: "field", night: 0.8, glory: 0.16, storm: 0, verdure: 0.14 }, cast: [
        C("anciao", 210, "lie", { dy: 0.62, facing: -1, id: "eli" }),
      ] }),
      // v.3 — ⭐ o relógio da cena: ANTES QUE A LÂMPADA DE DEUS SE APAGASSE, no
      // templo ONDE ESTAVA A ARCA. O menino deitado ao pé do castiçal, a arca
      // no escuro atrás dele.
      b(3, { q: "antes que a lâmpada de Deus se apagasse no templo do Senhor, onde estava a arca de Deus",
        env: { night: 0.82, glory: 0.22 }, cast: [
        C("servo", -70, "lie", { dy: 0.66, facing: 1, scale: 0.68, id: "samuel-menino" }),
        C("anciao", 210, "lie", { dy: 0.6, facing: -1, id: "eli" }),
      ] }),
      // v.4 — ⭐ O SENHOR CHAMOU A SAMUEL. Primeira das três vezes: SEM
      // MEDIADOR, sem figura nenhuma — voz do céu (`by:"deus"`), só a glória
      // subindo sobre a noite. O menino se ergue: "Eis-me aqui".
      b(4, { by: "deus", q: "O Senhor chamou a Samuel", env: { night: 0.74, glory: 0.62 }, cast: [
        C("servo", -70, "kneel", { dy: 0.64, facing: 1, scale: 0.68, id: "samuel-menino" }),
        C("anciao", 210, "lie", { dy: 0.6, facing: -1, id: "eli" }),
      ] }),
      // v.5 — ele CORRE a Eli: "porque tu me chamaste". O velho o manda tornar
      // a deitar-se. O menino atravessa o palco pela primeira vez.
      b(5, { q: "E correu a Eli", env: { night: 0.78, glory: 0.3 }, cast: [
        C("servo", 100, "walk", { dy: 0.62, facing: -1, scale: 0.68, id: "samuel-menino" }),
        C("anciao", 220, "lie", { dy: 0.6, facing: -1, id: "eli" }),
      ] }),
      // v.6 — SEGUNDA VEZ, e desta vez é ELI quem fala: "Não te chamei eu,
      // FILHO MEU, torna a deitar-te" — o mesmo "filhos meus" fraco do cap. 2,
      // agora dito a quem de fato o ouvirá.
      b(6, { by: "anciao", q: "Mas ele disse:", env: { night: 0.78, glory: 0.4 }, cast: [
        C("anciao", 200, "kneel", { dy: 0.6, facing: -1, id: "eli" }),
        C("servo", 90, "stand", { dy: 0.64, facing: 1, scale: 0.68, id: "samuel-menino" }),
      ] }),
      // v.7 — a explicação do narrador: SAMUEL AINDA NÃO CONHECIA AO SENHOR;
      // ainda não lhe tinha sido manifestada a palavra. Ele volta a deitar-se
      // sem entender de quem é a voz.
      b(7, { q: "Porém Samuel ainda não conhecia ao Senhor", env: { night: 0.82, glory: 0.24 }, cast: [
        C("servo", -70, "lie", { dy: 0.66, facing: 1, scale: 0.68, id: "samuel-menino" }),
        C("anciao", 210, "lie", { dy: 0.6, facing: -1, id: "eli" }),
      ] }),
      // v.8 — TERCEIRA VEZ — e é aqui que o velho enfim ENTENDE que é o SENHOR
      // quem chama o jovem. Eli senta-se; a glória sobe outra vez sobre o
      // menino de pé no meio do templo.
      b(8, { q: "Então entendeu Eli que o Senhor chamava o jovem", env: { night: 0.7, glory: 0.6 }, cast: [
        C("servo", 40, "stand", { dy: 0.62, facing: -1, scale: 0.68, id: "samuel-menino" }),
        C("anciao", 200, "kneel", { dy: 0.6, facing: -1, id: "eli" }),
      ] }),
      // v.9 — ⭐ o último serviço útil de Eli: ensinar o menino a responder —
      // "FALA, SENHOR, PORQUE O TEU SERVO OUVE". O velho aponta o lugar; o
      // menino volta a deitar-se sabendo o que dizer.
      b(9, { by: "anciao", q: "Por isso Eli disse a Samuel:", env: { night: 0.72, glory: 0.55 }, cast: [
        C("anciao", 200, "point", { dy: 0.58, facing: -1, id: "eli" }),
        C("servo", 40, "bow", { dy: 0.64, facing: 1, scale: 0.68, id: "samuel-menino" }),
      ] }),
      // v.10 — ⭐⭐ "ENTÃO VEIO O SENHOR, E PÔS-SE ALI". Mesmo aqui NÃO se
      // desenha figura alguma: a presença é LUZ. Voz do céu (`by:"deus"`),
      // glória no auge sobre a noite, o menino de joelhos e a arca acesa.
      b(10, { by: "deus", q: "Então veio o Senhor, e pôs-se ali, e chamou como das outras vezes",
        props: [
          P("church", -60, 1.3, undefined, 0.2),
          { ...P("ark", 120, 1.05, undefined, 0.52), tag: "arca-do-concerto" },
          { ...P("lampstand", -10, 0.95, 0.8, 0.6), tag: "lampada-de-deus" },
          P("door", 200, 0.9, undefined, 0.38),
          P("grass", 290, 0.72, undefined, 0.74),
          { ...P("starfield", 40, 1.15, undefined, 0.84), sky: true },
        ],
        env: { night: 0.52, glory: 0.95, storm: 0 }, cast: [
        C("servo", -70, "kneel", { dy: 0.64, facing: 1, scale: 0.68, id: "samuel-menino", glow: 0.5 }),
        C("anciao", 250, "lie", { dy: 0.58, facing: -1, id: "eli" }),
      ] }),
      // v.11 — a palavra que faz RETINIR AMBOS OS OUVIDOS de todo o que a
      // ouvir. Voz do céu; o menino ergue o rosto, a lâmpada arde alta.
      b(11, { by: "deus", q: "E disse o Senhor a Samuel:", env: { night: 0.5, glory: 0.92, storm: 0.16 }, cast: [
        C("servo", -70, "stand", { dy: 0.62, facing: 1, scale: 0.68, id: "samuel-menino", glow: 0.55 }),
        C("anciao", 250, "lie", { dy: 0.58, facing: -1, id: "eli" }),
      ] }),
      // v.12 — "COMEÇAREI E ACABAREI": tudo o que o homem de Deus falou em
      // 2:27-36 contra a casa de Eli será cumprido NAQUELE MESMO DIA. A
      // tempestade entra sob a glória.
      b(12, { by: "deus", q: "começarei e acabarei", env: { night: 0.56, glory: 0.86, storm: 0.36 }, cast: [
        C("servo", -70, "stand", { dy: 0.62, facing: 1, scale: 0.68, id: "samuel-menino", glow: 0.5 }),
        C("anciao", 250, "lie", { dy: 0.58, facing: -1, id: "eli" }),
      ] }),
      // v.13 — a raiz do juízo, dita sem rodeio: os filhos se faziam
      // EXECRÁVEIS e ELE NÃO OS REPREENDEU. Não é o pecado dos moços que
      // condena a casa — é o silêncio do pai.
      b(13, { by: "deus", q: "porque, fazendo-se os seus filhos execráveis, não os repreendeu",
        env: { night: 0.6, glory: 0.8, storm: 0.46 }, cast: [
        C("servo", -70, "kneel", { dy: 0.64, facing: 1, scale: 0.68, id: "samuel-menino", glow: 0.45 }),
        C("anciao", 250, "lie", { dy: 0.58, facing: -1, id: "eli" }),
      ] }),
      // v.14 — o juramento que fecha a porta: NUNCA JAMAIS será expiada a
      // iniquidade daquela casa, NEM COM SACRIFÍCIO NEM COM OFERTA. O sistema
      // inteiro de Siló fica sem remédio.
      b(14, { by: "deus", q: "nunca jamais será expiada a sua iniqüidade",
        env: { night: 0.64, glory: 0.76, storm: 0.5 }, cast: [
        C("servo", -70, "bow", { dy: 0.66, facing: 1, scale: 0.68, id: "samuel-menino" }),
        C("anciao", 250, "lie", { dy: 0.58, facing: -1, id: "eli" }),
      ] }),
      // v.15 — amanhece. O menino fica deitado até a manhã e então ABRE AS
      // PORTAS DA CASA DO SENHOR — o gesto mais simples do mundo, feito por
      // quem acaba de ouvir a sentença. E TEME contar a visão.
      b(15, { q: "porém temia Samuel relatar esta visão a Eli", set: "santuario", props: SANTUARIO,
        env: { terrain: "field", night: 0.3, glory: 0.5, storm: 0.1, verdure: 0.22 }, cast: [
        C("servo", 40, "stand", { dy: 0.6, facing: -1, scale: 0.7, id: "samuel-menino" }),
        C("anciao", 220, "stand", { dy: 0.5, facing: -1, id: "eli" }),
      ] }),
      // v.16 — ELI o chama: "Samuel, meu filho". A pergunta que ele não quer
      // ouvir a resposta, mas faz mesmo assim.
      b(16, { by: "anciao", q: "Então chamou Eli a Samuel", env: { night: 0.28, glory: 0.46 }, cast: [
        C("anciao", 180, "point", { dy: 0.5, facing: -1, id: "eli" }),
        C("servo", -20, "stand", { dy: 0.6, facing: 1, scale: 0.7, id: "samuel-menino" }),
      ] }),
      // v.17 — e insiste com juramento: "PEÇO-TE QUE NÃO MA ENCUBRAS; assim
      // Deus te faça, e outro tanto, se me encobrires alguma palavra". O velho
      // exige a sentença contra si mesmo.
      b(17, { by: "anciao", q: "E ele disse:", env: { night: 0.3, glory: 0.42, storm: 0.16 }, cast: [
        C("anciao", 180, "raise", { dy: 0.5, facing: -1, id: "eli" }),
        C("servo", -20, "bow", { dy: 0.62, facing: 1, scale: 0.7, id: "samuel-menino" }),
      ] }),
      // v.18 — ⭐ Samuel conta TUDO e NADA lhe encobre; e o velho recebe:
      // "ELE É O SENHOR; FAÇA O QUE BEM PARECER AOS SEUS OLHOS". Rendição sem
      // defesa — a coisa mais digna que Eli faz no livro.
      b(18, { by: "anciao", q: "E disse ele:", env: { night: 0.34, glory: 0.6, storm: 0.12 }, cast: [
        C("anciao", 170, "bow", { dy: 0.54, facing: -1, id: "eli" }),
        C("servo", -50, "stand", { dy: 0.6, facing: 1, scale: 0.7, id: "samuel-menino", glow: 0.45 }),
      ] }),
      // v.19 — "E CRESCIA SAMUEL, e o SENHOR era com ele, e NENHUMA DAS SUAS
      // PALAVRAS DEIXOU CAIR EM TERRA". Ele sai do templo para o campo aberto:
      // a palavra rara agora tem um portador.
      b(19, { q: "e nenhuma de todas as suas palavras deixou cair em terra",
        set: "caminho", props: CAMINHO,
        env: { terrain: "field", night: 0.16, glory: 0.82, storm: 0, verdure: 0.44 }, cast: [
        C("servo", -60, "walk", { dy: 0.58, facing: -1, scale: 0.8, id: "samuel-menino", glow: 0.6 }),
      ] }),
      // v.20 — TODO O ISRAEL, DESDE DÃ ATÉ BERSEBA, soube que Samuel estava
      // CONFIRMADO POR PROFETA. Aqui a multidão cabe: é reconhecimento, não
      // luto — o povo inteiro em volta do jovem profeta.
      b(20, { q: "desde Dã até Berseba, conheceu que Samuel estava confirmado por profeta do Senhor",
        set: "da-a-berseba", props: DA_A_BERSEBA,
        env: { terrain: "field", night: 0.12, glory: 0.88, verdure: 0.46 }, cast: [
        C("servo", -40, "raise", { dy: 0.58, facing: 1, scale: 0.85, id: "samuel-menino", glow: 0.7 }),
        C("multidao", 180, "stand", { dy: 0.5, facing: -1, id: "israel-de-da-a-berseba" }),
        C("multidao", -240, "stand", { dy: 0.46, facing: 1, id: "israel-do-sul" }),
      ] }),
      // v.21 — o fecho que desfaz o v.1: o SENHOR CONTINUOU A APARECER EM
      // SILÓ, manifestando-se a Samuel PELA PALAVRA. A casa do SENHOR volta a
      // ter céu aberto por cima — e agora há quem escute.
      b(21, { q: "E continuou o Senhor a aparecer em Siló", set: "silo", props: SILO,
        env: { terrain: "field", night: 0.1, glory: 0.95, storm: 0, verdure: 0.4 }, cast: [
        C("servo", -30, "raise", { dy: 0.58, facing: 1, scale: 0.85, id: "samuel-menino", glow: 0.75 }),
      ] }),
    ],
  },
};
