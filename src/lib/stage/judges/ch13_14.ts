// ============================================================================
// JUÍZES 13–14 — CENA VIVA. O ANJO DO SENHOR em Zorá, o NAZIREU que há de
// nascer, e o começo de SANSÃO: Timna, o leão, o mel e o enigma.
//
// Jz 13 — O CICLO recomeça e desta vez SEM CLAMOR: Israel torna a fazer o que
// era mau, e o SENHOR o entrega na mão dos FILISTEUS por QUARENTA ANOS — a mais
// longa opressão do livro. Em ZORÁ, na tribo de Dã, um homem chamado MANOÁ tem
// uma mulher ESTÉRIL. A ela — não a ele — aparece o ANJO DO SENHOR: conceberás
// e terás um filho. Sobre a cabeça do menino NÃO PASSARÁ NAVALHA; nem vinho,
// nem bebida forte, nem coisa imunda: NAZIREU DE DEUS desde o ventre. Manoá ora
// pedindo que o homem de Deus volte, e Deus ouve — o anjo torna a aparecer À
// MULHER, no campo, outra vez sem o marido. Manoá corre, interroga, quer deter
// o hóspede com um cabrito, quer saber o NOME — e ouve: "por que perguntas
// assim pelo meu nome, visto que é maravilhoso?". Sobre a PENHA sobe o
// holocausto, e o anjo SOBE NA CHAMA DO ALTAR; os dois caem com o rosto em
// terra. Nasce SANSÃO, e o Espírito do SENHOR começa a incitá-lo em Maané-Dã.
//
// Jz 14 — SANSÃO DESCE (o verbo do capítulo é sempre "descer"): desce a Timnate
// e vê uma mulher das filhas dos filisteus; "toma-ma por mulher", porque ela
// AGRADA AOS MEUS OLHOS — o mesmo olho do "cada um fazia o que parecia bem aos
// seus olhos". Nas vinhas, um filho de LEÃO lhe sai ao encontro rugindo, e o
// Espírito do SENHOR se apossa dele: despedaça o leão SEM TER NADA NA MÃO — e
// não conta a ninguém. Dias depois, no corpo do leão, um ENXAME DE ABELHAS COM
// MEL: come e dá aos pais, sem lhes dizer donde veio. No banquete de sete dias,
// os TRINTA companheiros e o ENIGMA — "do comedor saiu comida, e do forte saiu
// doçura" — por trinta lençóis e trinta mudas de roupas. A noiva chora sete
// dias, é ameaçada de fogo, arranca o segredo e o entrega; e Sansão responde:
// "se vós não lavrásseis com a minha novilha…". Desce a Ascalom, e a noiva é
// dada ao companheiro.
//
// A VOZ DE DEUS (regra do projeto): em Jz 13 o SENHOR NUNCA fala do céu — Ele
// fala SEMPRE por um MEDIADOR VISÍVEL, o ANJO DO SENHOR. Por isso todo oráculo
// deste capítulo é `by: "anjo"`, com a figura luminosa (`glow`) em cena e a
// glória subindo — NUNCA `by: "deus"`. Em Jz 14 o SENHOR não fala: age pelo
// ESPÍRITO que se apossa de Sansão (glória alta, Sansão em `raise`).
// FOGO: só o `altar` com `fire` (13:19-20) e o `campfire` do banquete desenham
// chama de verdade — `fire` no env é só ambiência.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
// (sem `dv` aqui: em Jz 13 Deus fala SÓ pelo anjo — mediador visível em cena.)

// ---------------------------------------------------------------- SETS Jz 13

// A OPRESSÃO FILISTEIA — a cidade do senhorio estrangeiro pesando sobre a terra
// de Israel por quarenta anos: torre, muralha, chão sem viço.
const OPRESSAO: StagePropSpec[] = [
  P("tower", 120, 1.35, undefined, 0.3),
  P("church", -80, 1.05, undefined, 0.36),
  P("rock", 300, 1.05, undefined, 0.52),
  P("rock", -300, 0.95, undefined, 0.46),
  P("grass", -180, 0.7, undefined, 0.74),
];

// ZORÁ — a casa de Manoá, da tribo de Dã: a tenda-morada, a porta, a figueira do
// pátio e o curral. Uma casa sem filhos: quieta, arrumada, vazia.
const ZORA: StagePropSpec[] = [
  P("tent", -110, 1.15, undefined, 0.24),
  P("door", 30, 0.95, undefined, 0.34),
  P("tree", 250, 1.15, undefined, 0.2),
  P("stall", -300, 0.95, undefined, 0.3),
  P("amphora", 130, 0.7, undefined, 0.6),
  P("grass", 200, 0.76, undefined, 0.7),
];

// O CAMPO DE ZORÁ — onde a mulher estava sozinha quando o anjo apareceu (13:9):
// searas, moitas, a pedra do caminho, a cidade natal distante.
const CAMPO: StagePropSpec[] = [
  P("sheaf", -230, 0.95, undefined, 0.6),
  P("sheaf", 230, 0.9, undefined, 0.56),
  P("bush", 300, 0.9, undefined, 0.4),
  P("tree", -320, 1.1, undefined, 0.18),
  P("rock", 150, 0.85, undefined, 0.68),
  P("grass", -60, 0.8, undefined, 0.74),
];

// A PENHA — a rocha que Manoá fez de altar: o cabrito e a oferta de alimentos
// sobre a pedra, o campo aberto ao redor, o céu por cima.
const PENHA: StagePropSpec[] = [
  P("rock", 0, 1.45, undefined, 0.44),
  P("altar", 0, 1.05, undefined, 0.52),
  P("rock", -280, 1.0, undefined, 0.4),
  P("bush", 300, 0.9, undefined, 0.38),
  P("grass", 160, 0.78, undefined, 0.72),
];

// O ALTAR EM CHAMA — o holocausto aceito: a chama sobe da penha para o céu, e o
// anjo sobe NELA. (fogo desenhado: `altar` com fire.)
const CHAMA: StagePropSpec[] = [
  P("rock", 0, 1.45, undefined, 0.44),
  P("altar", 0, 1.15, 1, 0.52),
  P("rock", -280, 1.0, undefined, 0.4),
  P("bush", 300, 0.9, undefined, 0.38),
  P("grass", 170, 0.78, undefined, 0.72),
];

// MAANÉ-DÃ, entre Zorá e Estaol — o campo largo onde o Espírito começa a incitar
// o menino: sol alto, relva, as duas aldeias marcadas pelas pedras.
const MAANE_DA: StagePropSpec[] = [
  P("rock", -270, 1.1, undefined, 0.36),
  P("rock", 280, 1.05, undefined, 0.34),
  P("tree", 170, 1.15, undefined, 0.22),
  P("bush", -150, 0.9, undefined, 0.42),
  P("grass", 40, 0.82, undefined, 0.74),
  { ...P("sun", -40, 1.15, undefined, 0.64), sky: true },
];

// ---------------------------------------------------------------- SETS Jz 14

// TIMNATE — a cidade filisteia lá embaixo (Sansão sempre DESCE a ela): torre,
// casas, palmeira, e o caminho de terra vindo do alto.
const TIMNATE: StagePropSpec[] = [
  P("tower", 200, 1.25, undefined, 0.28),
  P("church", 60, 1.0, undefined, 0.34),
  P("palm", -300, 1.1, undefined, 0.16),
  P("rock", -180, 0.9, undefined, 0.6),
  P("grass", 300, 0.76, undefined, 0.72),
];

// AS VINHAS DE TIMNATE — parreirais na encosta; entre eles, o mato cerrado de
// onde o filho de leão sai rugindo. (Não há prop de leão: a fera se sugere pela
// mata fechada, pela rocha do desfiladeiro e pelo enquadramento.)
const VINHAS: StagePropSpec[] = [
  P("grapes", -210, 1.15, undefined, 0.34),
  P("grapes", 230, 1.1, undefined, 0.3),
  P("bush", 90, 1.25, undefined, 0.5),
  P("rock", -60, 1.3, undefined, 0.56),
  P("tree", 320, 1.15, undefined, 0.2),
  P("grass", 170, 0.78, undefined, 0.74),
];

// O CORPO DO LEÃO — a carcaça deixada fora do caminho, virada em colmeia: a
// rocha baixa onde ficou, o enxame na moita, o mel no meio da morte.
const MEL: StagePropSpec[] = [
  P("rock", 20, 1.2, undefined, 0.62),
  P("bush", 120, 1.15, undefined, 0.52),
  P("bush", -180, 0.95, undefined, 0.44),
  P("grapes", -300, 1.0, undefined, 0.3),
  P("tree", 300, 1.1, undefined, 0.2),
  P("grass", -80, 0.78, undefined, 0.74),
];

// AS BODAS — o banquete de sete dias em Timnate: o toldo, as talhas de vinho, as
// bandejas, a fogueira da festa e a cidade filisteia atrás.
const BODAS: StagePropSpec[] = [
  P("tent", -140, 1.2, undefined, 0.26),
  P("amphora", -30, 0.85, undefined, 0.6),
  P("bowl", 60, 0.8, undefined, 0.64),
  P("crate", 170, 0.85, undefined, 0.58),
  P("campfire", 250, 1.0, undefined, 0.5),
  P("tower", 320, 1.05, undefined, 0.26),
  P("grass", -260, 0.76, undefined, 0.72),
];

// ASCALOM — a cidade dos ascalonitas onde caem os trinta e de onde vêm as trinta
// mudas de roupas: muralha, torre, entulho e chão pisado.
const ASCALOM: StagePropSpec[] = [
  P("tower", -60, 1.3, undefined, 0.28),
  P("church", 140, 1.05, undefined, 0.34),
  P("rock", 280, 1.1, undefined, 0.58),
  P("rock", -280, 1.0, undefined, 0.5),
  P("grass", 60, 0.72, undefined, 0.76),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Jz 13
  13: {
    start: { terrain: "city", night: 0.5, glory: 0.14, storm: 0.12, fire: 0, verdure: 0.16 },
    beats: [
      // v.1 — o ciclo recomeça: entregues na mão dos filisteus por QUARENTA ANOS.
      // Desta vez Israel nem clama: a opressão vira paisagem. Filisteus de pé,
      // israelitas curvados — nunca `glow` no opressor.
      b(1, { q: "os entregou na mão dos filisteus por quarenta anos", set: "opressao", props: OPRESSAO,
        env: { terrain: "city", night: 0.55, glory: 0.12, storm: 0.14, verdure: 0.14 }, cast: [
        C("rei", 150, "stand", { dy: 0.42, facing: -1, id: "principe-filisteu" }),
        C("homem", 40, "stand", { dy: 0.46, facing: -1, id: "filisteu-armado" }),
        C("homem", -130, "bow", { dy: 0.58, facing: 1, id: "israelita1" }),
        C("mulherComum", -230, "kneel", { dy: 0.54, facing: 1, id: "israelita2" }),
      ] }),
      // v.2 — ZORÁ: a casa de Manoá, da tribo de Dã. A mulher é ESTÉRIL; a casa
      // tem porta, pátio e curral — e nenhum filho. Silêncio, não desgraça.
      b(2, { q: "sua mulher, sendo estéril, não tinha filhos", set: "zora", props: ZORA,
        env: { terrain: "field", night: 0.34, glory: 0.24, storm: 0, verdure: 0.32 }, cast: [
        C("homem", -190, "stand", { dy: 0.5, facing: 1, id: "manoa" }),
        C("mulherComum", 110, "stand", { dy: 0.56, facing: -1, id: "mulher-manoa" }),
      ] }),
      // v.3 — O ANJO DO SENHOR aparece A ELA (mediador visível: `by:"anjo"`,
      // NUNCA voz do céu). A glória rompe a manhã; a mulher, sozinha.
      b(3, { by: "anjo", q: "porém conceberás, e terás um filho", set: "campo", props: CAMPO,
        env: { terrain: "field", night: 0.2, glory: 0.72, verdure: 0.42 }, cast: [
        C("anjo", 170, "stand", { dy: 0.36, facing: -1, glow: 0.95 }),
        C("mulherComum", -110, "stand", { dy: 0.56, facing: 1, id: "mulher-manoa" }),
      ] }),
      // v.4 — a primeira parte do NAZIREADO: nem vinho, nem bebida forte, nem
      // coisa imunda — a mãe já vive a consagração do filho.
      b(4, { by: "anjo", q: "guarda-te de beber vinho, ou bebida forte", env: { glory: 0.78 }, cast: [
        C("anjo", 170, "point", { dy: 0.36, facing: -1, glow: 1 }),
        C("mulherComum", -110, "bow", { dy: 0.56, facing: 1, id: "mulher-manoa" }),
      ] }),
      // v.5 — a NAVALHA que não passará: nazireu de Deus DESDE O VENTRE; ele
      // COMEÇARÁ a livrar Israel (só começará — o livramento fica em aberto).
      b(5, { by: "anjo", q: "sobre cuja cabeça não passará navalha", env: { glory: 0.9, night: 0.14 }, cast: [
        C("anjo", 170, "raise", { dy: 0.36, facing: -1, glow: 1 }),
        C("mulherComum", -110, "kneel", { dy: 0.58, facing: 1, id: "mulher-manoa" }),
      ] }),
      // v.6 — de volta em casa, ela conta ao marido: a aparência era como a de um
      // anjo de Deus, TERRIBILÍSSIMA — e ela não perguntou o nome. (ela fala)
      b(6, { by: "mulherComum", q: "cuja aparência era semelhante a de um anjo de Deus, terribilíssima",
        set: "zora", props: ZORA, env: { terrain: "field", night: 0.3, glory: 0.4, verdure: 0.34 }, cast: [
        C("mulherComum", -80, "point", { dy: 0.56, facing: 1, id: "mulher-manoa" }),
        C("homem", 130, "stand", { dy: 0.52, facing: -1, id: "manoa" }),
      ] }),
      // v.7 — ela repete a palavra recebida palavra por palavra: nazireu desde o
      // ventre ATÉ AO DIA DA SUA MORTE. (ela fala)
      b(7, { by: "mulherComum", q: "porque o menino será nazireu de Deus", env: { glory: 0.46 }, cast: [
        C("mulherComum", -80, "raise", { dy: 0.56, facing: 1, id: "mulher-manoa" }),
        C("homem", 130, "stand", { dy: 0.52, facing: -1, id: "manoa" }),
      ] }),
      // v.8 — MANOÁ ORA: que o homem de Deus torne a vir e nos ensine o que
      // devemos fazer ao menino que há de nascer. (Manoá fala; ajoelhado)
      b(8, { by: "homem", q: "rogo-te que o homem de Deus, que enviaste, ainda venha para nós outra vez",
        env: { glory: 0.58, night: 0.24 }, cast: [
        C("homem", -60, "kneel", { dy: 0.56, facing: 1, id: "manoa" }),
        C("mulherComum", 150, "stand", { dy: 0.52, facing: -1, id: "mulher-manoa" }),
      ] }),
      // v.9 — Deus OUVE — e responde do mesmo jeito: o anjo vem OUTRA VEZ À
      // MULHER, no campo, e outra vez sem Manoá por perto.
      b(9, { q: "o anjo de Deus veio outra vez à mulher", set: "campo", props: CAMPO,
        env: { terrain: "field", night: 0.16, glory: 0.78, verdure: 0.44 }, cast: [
        C("anjo", 180, "stand", { dy: 0.36, facing: -1, glow: 0.95 }),
        C("mulherComum", -100, "stand", { dy: 0.56, facing: 1, id: "mulher-manoa" }),
      ] }),
      // v.10 — ela CORRE (o verbo é dela) e avisa o marido: apareceu-me aquele
      // homem do outro dia. (ela fala, ainda em movimento)
      b(10, { by: "mulherComum", q: "Eis que aquele homem que veio a mim o outro dia me apareceu",
        env: { glory: 0.6 }, cast: [
        C("mulherComum", -60, "walk", { dy: 0.6, facing: -1, id: "mulher-manoa" }),
        C("homem", 190, "stand", { dy: 0.54, facing: -1, id: "manoa" }),
        C("anjo", 300, "stand", { dy: 0.34, facing: -1, glow: 0.8 }),
      ] }),
      // v.11 — Manoá levanta-se, SEGUE a mulher e interroga o hóspede: és tu
      // aquele homem? — "Eu sou". (Manoá fala; ele é o PRIMEIRO homem do cast)
      b(11, { by: "homem", q: "És tu aquele homem que falou a esta mulher?",
        env: { glory: 0.72, night: 0.14 }, cast: [
        C("homem", -70, "stand", { dy: 0.54, facing: 1, id: "manoa" }),
        C("mulherComum", -200, "stand", { dy: 0.5, facing: 1, id: "mulher-manoa" }),
        C("anjo", 170, "stand", { dy: 0.36, facing: -1, glow: 0.95 }),
      ] }),
      // v.12 — a pergunta do pai que ainda não sabe criar um nazireu: qual será o
      // MODO DE VIVER e o serviço do menino? (Manoá fala)
      b(12, { by: "homem", q: "qual será o modo de viver e o serviço do menino?", env: { glory: 0.74 }, cast: [
        C("homem", -70, "bow", { dy: 0.56, facing: 1, id: "manoa" }),
        C("mulherComum", -200, "stand", { dy: 0.5, facing: 1, id: "mulher-manoa" }),
        C("anjo", 170, "stand", { dy: 0.36, facing: -1, glow: 0.95 }),
      ] }),
      // v.13 — o anjo não dá regra nova: de tudo quanto EU DISSE À MULHER se
      // guardará ELA. A consagração começa na mãe. (mediador: anjo)
      b(13, { by: "anjo", q: "De tudo quanto eu disse à mulher se guardará ela", env: { glory: 0.82 }, cast: [
        C("anjo", 170, "point", { dy: 0.36, facing: -1, glow: 1 }),
        C("homem", -70, "stand", { dy: 0.54, facing: 1, id: "manoa" }),
        C("mulherComum", -200, "stand", { dy: 0.5, facing: 1, id: "mulher-manoa" }),
      ] }),
      // v.14 — o NAZIREADO detalhado: nada que procede da VIDEIRA, nem vinho, nem
      // bebida forte, nem coisa imunda. (o parreiral entra em cena)
      b(14, { by: "anjo", q: "De tudo quanto procede da videira não comerá",
        props: [
          P("grapes", -250, 1.1, undefined, 0.32),
          P("sheaf", 250, 0.9, undefined, 0.56),
          P("bush", 300, 0.9, undefined, 0.4),
          P("tree", -330, 1.1, undefined, 0.18),
          P("grass", -40, 0.8, undefined, 0.74),
        ],
        env: { glory: 0.84, verdure: 0.46 }, cast: [
        C("anjo", 160, "raise", { dy: 0.36, facing: -1, glow: 1 }),
        C("homem", -70, "stand", { dy: 0.54, facing: 1, id: "manoa" }),
        C("mulherComum", -200, "stand", { dy: 0.5, facing: 1, id: "mulher-manoa" }),
      ] }),
      // v.15 — a hospitalidade de Manoá: deixa que te detenhamos e te preparemos
      // um CABRITO. Ele ainda pensa estar recebendo um homem. (Manoá fala)
      b(15, { by: "homem", q: "Ora deixa que te detenhamos, e te preparemos um cabrito",
        set: "penha", props: PENHA,
        env: { terrain: "field", night: 0.18, glory: 0.7, verdure: 0.34 }, cast: [
        C("homem", -120, "stand", { dy: 0.56, facing: 1, id: "manoa" }),
        C("mulherComum", -240, "stand", { dy: 0.5, facing: 1, id: "mulher-manoa" }),
        C("anjo", 180, "stand", { dy: 0.36, facing: -1, glow: 0.95 }),
      ] }),
      // v.16 — o anjo recusa o pão e desvia a oferta para o SENHOR: "se fizeres
      // holocausto o oferecerás ao Senhor". Manoá ainda não sabia quem era.
      b(16, { by: "anjo", q: "Ainda que me detenhas, não comerei de teu pão", env: { glory: 0.8 }, cast: [
        C("anjo", 180, "point", { dy: 0.36, facing: -1, glow: 1 }),
        C("homem", -120, "stand", { dy: 0.56, facing: 1, id: "manoa" }),
        C("mulherComum", -240, "stand", { dy: 0.5, facing: 1, id: "mulher-manoa" }),
      ] }),
      // v.17 — Manoá quer o NOME, para honrá-lo quando a palavra se cumprir.
      // (Manoá fala; a curiosidade reverente que não terá resposta)
      b(17, { by: "homem", q: "Qual é o teu nome", env: { glory: 0.78 }, cast: [
        C("homem", -120, "bow", { dy: 0.58, facing: 1, id: "manoa" }),
        C("mulherComum", -240, "stand", { dy: 0.5, facing: 1, id: "mulher-manoa" }),
        C("anjo", 180, "stand", { dy: 0.36, facing: -1, glow: 1 }),
      ] }),
      // v.18 — ⭐ "POR QUE PERGUNTAS ASSIM PELO MEU NOME, VISTO QUE É
      // MARAVILHOSO?" — o Nome que não cabe na boca de Manoá. Glória no auge.
      b(18, { by: "anjo", q: "Por que perguntas assim pelo meu nome, visto que é maravilhoso?",
        env: { glory: 0.95, night: 0.1, fire: 0.08 }, cast: [
        C("anjo", 150, "raise", { dy: 0.38, facing: -1, glow: 1, scale: 1.25 }),
        C("homem", -130, "kneel", { dy: 0.6, facing: 1, id: "manoa" }),
        C("mulherComum", -250, "bow", { dy: 0.54, facing: 1, id: "mulher-manoa" }),
      ] }),
      // v.19 — o cabrito e a oferta de alimentos SOBRE UMA PENHA; e o anjo
      // houve-se MARAVILHOSAMENTE, com os dois observando.
      b(19, { q: "os ofereceu sobre uma penha ao Senhor", env: { glory: 0.9, fire: 0.2 }, cast: [
        C("homem", -140, "kneel", { dy: 0.6, facing: 1, id: "manoa" }),
        C("mulherComum", -250, "stand", { dy: 0.52, facing: 1, id: "mulher-manoa" }),
        C("anjo", 150, "stand", { dy: 0.38, facing: -1, glow: 1 }),
      ] }),
      // v.20 — ⭐ A CHAMA SOBE DO ALTAR PARA O CÉU E O ANJO SOBE NELA (fogo real:
      // `altar` com fire). Os dois CAEM EM TERRA SOBRE SEUS ROSTOS.
      b(20, { q: "o anjo do Senhor subiu na chama do altar", set: "chama", props: CHAMA,
        env: { terrain: "field", night: 0.22, glory: 1, fire: 0.85, storm: 0.1, verdure: 0.3 }, cast: [
        C("anjo", 0, "flyIdle", { dy: 0.18, facing: -1, glow: 1, scale: 1.15 }),
        C("homem", -170, "lie", { dy: 0.66, facing: 1, id: "manoa" }),
        C("mulherComum", 170, "lie", { dy: 0.64, facing: -1, id: "mulher-manoa" }),
      ] }),
      // v.21 — nunca mais apareceu; e SÓ ENTÃO Manoá compreendeu QUEM era. O
      // altar já sem chama, os dois de joelhos diante da pedra.
      b(21, { q: "então compreendeu Manoá que era o anjo do Senhor",
        set: "penha", props: PENHA,
        env: { terrain: "field", night: 0.3, glory: 0.6, fire: 0.1, verdure: 0.3 }, cast: [
        C("homem", -110, "kneel", { dy: 0.6, facing: 1, id: "manoa" }),
        C("mulherComum", 120, "kneel", { dy: 0.58, facing: -1, id: "mulher-manoa" }),
      ] }),
      // v.22 — o medo do homem: CERTAMENTE MORREREMOS, porque temos visto a Deus.
      // (Manoá fala — ele é o PRIMEIRO homem do cast)
      b(22, { by: "homem", q: "Certamente morreremos, porquanto temos visto a Deus",
        env: { night: 0.42, glory: 0.4 }, cast: [
        C("homem", -110, "bow", { dy: 0.62, facing: 1, id: "manoa" }),
        C("mulherComum", 120, "kneel", { dy: 0.58, facing: -1, id: "mulher-manoa" }),
      ] }),
      // v.23 — a teologia serena da mulher: se Ele nos quisesse matar, não teria
      // ACEITADO a oferta nem nos mostrado tudo isto. (ela fala; ela é a primeira)
      b(23, { by: "mulherComum", q: "Se o Senhor nos quisesse matar, não aceitaria da nossa mão o holocausto",
        env: { night: 0.24, glory: 0.66 }, cast: [
        C("mulherComum", -80, "stand", { dy: 0.58, facing: 1, id: "mulher-manoa" }),
        C("homem", 140, "kneel", { dy: 0.6, facing: -1, id: "manoa" }),
      ] }),
      // v.24 — NASCE SANSÃO: a estéril tem um filho, o menino cresce e o SENHOR o
      // ABENÇOA. A casa de Zorá enfim com criança dentro.
      b(24, { q: "a quem pôs o nome de Sansão", set: "zora", props: ZORA,
        env: { terrain: "field", night: 0.12, glory: 0.8, verdure: 0.52 }, cast: [
        C("mulherComum", -140, "stand", { dy: 0.56, facing: 1, id: "mulher-manoa" }),
        C("homem", 20, "raise", { dy: 0.54, facing: -1, id: "manoa" }),
        C("homem", 170, "stand", { dy: 0.6, facing: -1, id: "sansao", scale: 0.85 }),
      ] }),
      // v.25 — o ESPÍRITO DO SENHOR começa a incitá-lo em MAANÉ-DÃ, entre Zorá e
      // Estaol: o menino já anda no campo com força que não é dele.
      b(25, { q: "começou a incitá-lo de quando em quando para o campo de Maané-Dã",
        set: "maane-da", props: MAANE_DA,
        env: { terrain: "field", night: 0.08, glory: 0.88, verdure: 0.55 }, cast: [
        C("homem", 0, "raise", { dy: 0.58, facing: 1, id: "sansao" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Jz 14
  14: {
    start: { terrain: "field", night: 0.14, glory: 0.5, storm: 0, fire: 0, verdure: 0.42 },
    beats: [
      // v.1 — Sansão DESCE a Timnate (o verbo do capítulo) e VÊ uma mulher das
      // filhas dos filisteus. Tudo começa pelo olho.
      b(1, { q: "vendo em Timnate uma mulher das filhas dos filisteus",
        set: "timnate", props: TIMNATE,
        env: { terrain: "city", night: 0.16, glory: 0.42, verdure: 0.3 }, cast: [
        C("homem", -150, "walk", { dy: 0.6, facing: 1, id: "sansao" }),
        C("mulherComum", 130, "stand", { dy: 0.5, facing: -1, id: "mulher-timna" }),
      ] }),
      // v.2 — SOBE de novo a Zorá e declara aos pais: vi uma mulher em Timnate…
      // TOMAI-MA POR MULHER. (Sansão fala — PRIMEIRO homem do cast)
      b(2, { by: "homem", q: "Vi uma mulher em Timnate, das filhas dos filisteus",
        set: "zora", props: ZORA,
        env: { terrain: "field", night: 0.16, glory: 0.45, verdure: 0.42 }, cast: [
        C("homem", -100, "point", { dy: 0.58, facing: 1, id: "sansao" }),
        C("homem", 120, "stand", { dy: 0.52, facing: -1, id: "manoa" }),
        C("mulherComum", 230, "stand", { dy: 0.5, facing: -1, id: "mulher-manoa" }),
      ] }),
      // v.3 — o pai objeta (Manoá é agora o PRIMEIRO homem do cast, e por isso é
      // ele quem fala): não há mulher entre as filhas de teus irmãos? E Sansão
      // responde a frase que resume o livro: "ela agrada aos meus olhos".
      b(3, { by: "homem", q: "Não há, porventura, mulher entre as filhas de teus irmãos",
        env: { glory: 0.36, night: 0.26 }, cast: [
        C("homem", 110, "point", { dy: 0.54, facing: -1, id: "manoa" }),
        C("mulherComum", 230, "stand", { dy: 0.5, facing: -1, id: "mulher-manoa" }),
        C("homem", -110, "stand", { dy: 0.6, facing: 1, id: "sansao" }),
      ] }),
      // v.4 — os pais não sabiam: ISTO VINHA DO SENHOR, que buscava ocasião
      // contra os filisteus — os quais dominavam sobre Israel. Glória por trás
      // de uma escolha torta (sem figura de Deus: só a luz).
      b(4, { q: "pois buscava ocasião contra os filisteus", env: { glory: 0.7, night: 0.2 }, cast: [
        C("homem", -110, "stand", { dy: 0.6, facing: 1, id: "sansao" }),
        C("homem", 110, "bow", { dy: 0.54, facing: -1, id: "manoa" }),
        C("mulherComum", 230, "stand", { dy: 0.5, facing: -1, id: "mulher-manoa" }),
      ] }),
      // v.5 — nas VINHAS DE TIMNATE, um filho de LEÃO, RUGINDO, lhe sai ao
      // encontro. A fera não se desenha: vem da mata cerrada e da rocha; Sansão
      // sozinho à frente, os pais atrás e longe.
      b(5, { q: "eis que um filho de leão, rugindo, lhe saiu ao encontro",
        set: "vinhas", props: VINHAS,
        env: { terrain: "field", night: 0.34, glory: 0.32, storm: 0.2, verdure: 0.5 }, cast: [
        C("homem", -70, "stand", { dy: 0.62, facing: 1, id: "sansao" }),
        C("homem", -290, "stand", { dy: 0.4, facing: 1, id: "manoa" }),
        C("mulherComum", -330, "stand", { dy: 0.38, facing: 1, id: "mulher-manoa" }),
      ] }),
      // v.6 — ⭐ O ESPÍRITO DO SENHOR SE APOSSA DELE tão poderosamente que
      // DESPEDAÇA O LEÃO como quem despedaça um cabrito — SEM TER NADA NA MÃO.
      // Glória em cima, braços erguidos, e nem ao pai nem à mãe ele conta.
      b(6, { q: "despedaçou o leão, como quem despedaça um cabrito",
        env: { glory: 0.95, night: 0.16, storm: 0.1, fire: 0.12, verdure: 0.5 }, cast: [
        C("homem", -20, "raise", { dy: 0.66, facing: 1, id: "sansao", scale: 1.2 }),
      ] }),
      // v.7 — desce e FALA àquela mulher; e ela agrada aos olhos de Sansão. O
      // segredo do leão fica para trás, no mato.
      b(7, { q: "e ela agradou aos olhos de Sansão", set: "timnate", props: TIMNATE,
        env: { terrain: "city", night: 0.14, glory: 0.48, verdure: 0.3 }, cast: [
        C("homem", -100, "stand", { dy: 0.6, facing: 1, id: "sansao" }),
        C("mulherComum", 90, "stand", { dy: 0.56, facing: -1, id: "mulher-timna" }),
      ] }),
      // v.8 — dias depois volta para tomá-la e SE APARTA DO CAMINHO para ver o
      // corpo do leão: um ENXAME DE ABELHAS COM MEL dentro da carcaça.
      b(8, { q: "eis que nele havia um enxame de abelhas com mel", set: "mel", props: MEL,
        env: { terrain: "field", night: 0.2, glory: 0.6, verdure: 0.5 }, cast: [
        C("homem", -80, "kneel", { dy: 0.64, facing: 1, id: "sansao" }),
      ] }),
      // v.9 — toma o mel nas mãos, VAI ANDANDO E COMENDO, dá aos pais — e não
      // lhes diz donde veio. O nazireu tocando o que era morto e calando.
      b(9, { q: "não lhes deu a saber que tomara o mel do corpo do leão",
        env: { glory: 0.55, night: 0.2 }, cast: [
        C("homem", -140, "walk", { dy: 0.62, facing: 1, id: "sansao" }),
        C("homem", 100, "stand", { dy: 0.54, facing: -1, id: "manoa" }),
        C("mulherComum", 210, "stand", { dy: 0.52, facing: -1, id: "mulher-manoa" }),
      ] }),
      // v.10 — as BODAS em Timnate: Sansão faz ali um BANQUETE, como os moços
      // costumavam fazer. Toldo, talhas, bandejas, fogueira.
      b(10, { q: "fez Sansão ali um banquete", set: "bodas", props: BODAS,
        env: { terrain: "city", night: 0.4, glory: 0.4, fire: 0.3, verdure: 0.25 }, cast: [
        C("homem", -60, "stand", { dy: 0.6, facing: 1, id: "sansao" }),
        C("mulherComum", 80, "stand", { dy: 0.56, facing: -1, id: "mulher-timna" }),
        C("homem", 190, "stand", { dy: 0.5, facing: -1, id: "manoa" }),
      ] }),
      // v.11 — "como o vissem", trouxeram TRINTA COMPANHEIROS para estarem com
      // ele: guarda de honra que é também vigilância. Massa neutra ao fundo.
      b(11, { q: "trouxeram trinta companheiros para estarem com ele",
        env: { night: 0.42, glory: 0.34, fire: 0.3 }, cast: [
        C("homem", -110, "stand", { dy: 0.62, facing: 1, id: "sansao" }),
        C("multidao", 130, "stand", { dy: 0.44 }),
      ] }),
      // v.12 — ⭐ O ENIGMA proposto: se o decifrarem nos sete dias das bodas,
      // TRINTA LENÇÓIS E TRINTA MUDAS DE ROUPAS. (Sansão fala)
      b(12, { by: "homem", q: "Eu vos darei um enigma para decifrar",
        env: { night: 0.4, glory: 0.42, fire: 0.3 }, cast: [
        C("homem", -110, "raise", { dy: 0.62, facing: 1, id: "sansao" }),
        C("multidao", 130, "stand", { dy: 0.44 }),
      ] }),
      // v.13 — a aposta ao contrário: se não puderdes, VÓS me dareis as trinta
      // mudas. E eles aceitam: "dá-nos o teu enigma". (Sansão fala)
      b(13, { by: "homem", q: "vós me dareis a mim trinta lençóis e as trinta mudas de roupas",
        env: { night: 0.4, glory: 0.4, fire: 0.3 }, cast: [
        C("homem", -110, "point", { dy: 0.62, facing: 1, id: "sansao" }),
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "companheiro1" }),
        C("multidao", 190, "stand", { dy: 0.44 }),
      ] }),
      // v.14 — ⭐ "DO COMEDOR SAIU COMIDA, E DO FORTE SAIU DOÇURA" — o leão e o
      // mel escondidos numa frase. Três dias e ninguém decifra.
      b(14, { by: "homem", q: "Do comedor saiu comida, e do forte saiu doçura",
        props: [
          P("tent", -160, 1.2, undefined, 0.26),
          P("amphora", -40, 0.85, undefined, 0.6),
          P("bowl", 50, 0.8, undefined, 0.64),
          P("campfire", 230, 1.05, undefined, 0.5),
          P("crate", 320, 0.85, undefined, 0.56),
          P("grass", -270, 0.74, undefined, 0.72),
        ],
        env: { night: 0.46, glory: 0.5, fire: 0.4 }, cast: [
        C("homem", -110, "raise", { dy: 0.62, facing: 1, id: "sansao" }),
        C("homem", 70, "bow", { dy: 0.52, facing: -1, id: "companheiro1" }),
        C("homem", 160, "stand", { dy: 0.48, facing: -1, id: "companheiro2" }),
      ] }),
      // v.15 — ao sétimo dia AMEAÇAM A NOIVA com fogo: persuade teu marido, ou
      // queimaremos a ti e à casa de teu pai. (o companheiro fala — ele é o
      // PRIMEIRO homem do cast; cena de chantagem, sem multidão festiva)
      b(15, { by: "homem", q: "Persuade a teu marido que nos declare o enigma",
        env: { night: 0.6, glory: 0.18, storm: 0.2, fire: 0.35 }, cast: [
        C("homem", 60, "point", { dy: 0.5, facing: -1, id: "companheiro1" }),
        C("homem", 170, "stand", { dy: 0.46, facing: -1, id: "companheiro2" }),
        C("mulherComum", -130, "bow", { dy: 0.6, facing: 1, id: "mulher-timna" }),
      ] }),
      // v.16 — a NOIVA CHORA diante dele: "tão-somente me desprezas, e não me
      // amas". (ela fala — PRIMEIRA mulherComum do cast)
      b(16, { by: "mulherComum", q: "Tão-somente me desprezas, e não me amas",
        env: { night: 0.55, glory: 0.2, fire: 0.25 }, cast: [
        C("mulherComum", -70, "kneel", { dy: 0.62, facing: 1, id: "mulher-timna" }),
        C("homem", 120, "stand", { dy: 0.58, facing: -1, id: "sansao" }),
      ] }),
      // v.17 — chorou os SETE DIAS; ao sétimo ele cede à importunação, e ela
      // entrega o enigma aos filhos do seu povo. A traição consumada.
      b(17, { q: "ao sétimo dia lho declarou, porquanto o importunava",
        env: { night: 0.62, glory: 0.16, storm: 0.18, fire: 0.25 }, cast: [
        C("mulherComum", -40, "walk", { dy: 0.6, facing: -1, id: "mulher-timna" }),
        C("homem", 150, "stand", { dy: 0.5, facing: -1, id: "companheiro1" }),
        C("homem", -200, "stand", { dy: 0.56, facing: 1, id: "sansao" }),
      ] }),
      // v.18 — antes de se pôr o sol: "que coisa há mais doce do que o mel? e
      // mais forte do que o leão?" — e a resposta amarga de Sansão: ⭐ "SE VÓS
      // NÃO LAVRÁSSEIS COM A MINHA NOVILHA…". (Sansão fala: PRIMEIRO homem)
      b(18, { by: "homem", q: "Se vós não lavrásseis com a minha novilha",
        props: [
          P("tent", -170, 1.2, undefined, 0.26),
          P("amphora", -50, 0.85, undefined, 0.6),
          P("campfire", 240, 1.0, undefined, 0.5),
          P("tower", 330, 1.05, undefined, 0.26),
          { ...P("sun", 120, 1.0, undefined, 0.18), sky: true },
          P("grass", -280, 0.74, undefined, 0.72),
        ],
        env: { night: 0.5, glory: 0.3, storm: 0.15, fire: 0.3 }, cast: [
        C("homem", -120, "raise", { dy: 0.64, facing: 1, id: "sansao" }),
        C("homem", 70, "stand", { dy: 0.5, facing: -1, id: "companheiro1" }),
        C("homem", 170, "stand", { dy: 0.46, facing: -1, id: "companheiro2" }),
        C("mulherComum", -260, "bow", { dy: 0.54, facing: 1, id: "mulher-timna" }),
      ] }),
      // v.19 — o ESPÍRITO se apossa dele outra vez: desce a ASCALOM, fere trinta
      // homens, toma as roupas e paga a aposta — e sobe ardendo em ira à casa do
      // pai. (juízo/morte: individuais em `lie`, NUNCA multidão festiva)
      b(19, { q: "desceu aos ascalonitas, e matou deles trinta homens",
        set: "ascalom", props: ASCALOM,
        env: { terrain: "city", night: 0.55, glory: 0.62, storm: 0.28, fire: 0.2, verdure: 0.12 }, cast: [
        C("homem", -80, "raise", { dy: 0.64, facing: 1, id: "sansao", scale: 1.18 }),
        C("homem", 120, "lie", { dy: 0.6, id: "ascalonita1" }),
        C("homem", 230, "lie", { dy: 0.54, id: "ascalonita2" }),
        C("homem", 30, "bow", { dy: 0.5, facing: -1, id: "ascalonita3" }),
      ] }),
      // v.20 — e a mulher de Sansão FOI DADA AO SEU COMPANHEIRO que antes o
      // acompanhava. O capítulo fecha vazio: o noivo ausente, a casa alheia.
      b(20, { q: "foi dada ao seu companheiro que antes o acompanhava",
        set: "timnate", props: TIMNATE,
        env: { terrain: "city", night: 0.45, glory: 0.18, storm: 0.12, verdure: 0.2 }, cast: [
        C("mulherComum", 40, "stand", { dy: 0.54, facing: -1, id: "mulher-timna" }),
        C("homem", 150, "stand", { dy: 0.5, facing: -1, id: "companheiro1" }),
      ] }),
    ],
  },
};
