// ============================================================================
// JUÍZES 4–5 — CENA VIVA. DÉBORA sob a PALMEIRA, BARAQUE, o QUISOM e JAEL.
//
// Jz 4 — Morto Eúde, Israel torna a fazer o mal: o SENHOR os vende na mão de
// JABIM, rei de Canaã, que reina em HAZOR, e do seu capitão SÍSERA, com
// NOVECENTOS CARROS DE FERRO, vinte anos de opressão violenta. O povo CLAMA.
// E o juiz que Deus levanta é uma MULHER: DÉBORA, profetisa, mulher de
// Lapidote, assentada DEBAIXO DAS PALMEIRAS DE DÉBORA, entre Ramá e Betel, nas
// montanhas de Efraim — e a ela subiam os filhos de Israel a juízo. Ela chama
// BARAQUE: sobe ao TABOR com dez mil homens; o SENHOR atrairá Sísera ao ribeiro
// de QUISOM. Baraque hesita ("se fores comigo, irei"); Débora vai, mas a honra
// da jornada será de OUTRA MULHER. O SENHOR derrota os carros; Sísera desce do
// carro e FOGE A PÉ — até a TENDA DE JAEL. Ela o cobre, lhe dá leite, o esconde;
// e, dormindo ele de cansaço, toma a ESTACA da tenda e o MARTELO e lhe crava a
// estaca na fonte. Cena de JUÍZO: noite alta, Sísera INDIVIDUAL em `lie`, sem
// multidão festiva.
//
// Jz 5 — o CÂNTICO de Débora e Baraque: memória viva da batalha. O SENHOR
// saindo de Seir, a terra estremecendo; os caminhos cessados nos dias de
// Sangar e de Jael; "até que eu, Débora, me levantei, por mãe em Israel";
// as tribos que vieram e as que ficaram (Rúben entre os currais, Dã nos
// navios); os reis de Canaã em Taanaque; AS ESTRELAS PELEJANDO desde os céus
// (`starfield` com `sky: true`, dy ~0.8); o QUISOM que os ARRASTOU; MEROZ
// AMALDIÇOADA pelo anjo do SENHOR; Jael bendita entre as mulheres; e, do outro
// lado, A MÃE DE SÍSERA À JANELA, esperando em vão o carro que não volta.
// Fecho: "os que te amam sejam como o sol quando sai na sua força" — e a terra
// sossega quarenta anos. Por ser cântico longo, o ENQUADRAMENTO MUDA a cada
// versículo (set/props/env/cast), para a cena nunca ficar parada.
//
// A VOZ DE DEUS (regra do projeto): neste par de capítulos o SENHOR não fala
// diretamente do céu — Débora fala como PROFETISA ("Porventura o Senhor Deus de
// Israel não deu ordem, dizendo..."), portanto `by: "mulherComum"` com Débora
// como a PRIMEIRA mulherComum do cast. Em Jz 5:23 quem fala é o ANJO DO SENHOR
// (mediador visível): `by: "anjo"`, com a figura luminosa (`glow`) em cena.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------- Jz 4 sets
// A APOSTASIA — morto Eúde, o bezerro de fundição outra vez no meio do povo.
const APOSTASIA: StagePropSpec[] = [
  P("calf", 20, 1.1, undefined, 0.42),
  P("rock", -250, 1.05, undefined, 0.36),
  P("tower", 280, 1.0, undefined, 0.3),
  P("bush", 180, 0.85, undefined, 0.58),
  P("grass", -110, 0.76, undefined, 0.7),
];
// HAZOR — a cidade de Jabim, rei de Canaã; o trono e o ferro do seu poder.
const HAZOR: StagePropSpec[] = [
  P("tower", 0, 1.45, undefined, 0.28),
  P("throne", -150, 1.0, undefined, 0.46),
  P("church", 190, 1.0, undefined, 0.34),
  P("door", 90, 0.9, undefined, 0.5),
  P("rock", 310, 1.0, undefined, 0.42),
];
// O CLAMOR — vinte anos de opressão: as tendas pobres, a terra pisada.
const CLAMOR: StagePropSpec[] = [
  P("tent", -230, 1.05, undefined, 0.24),
  P("tent", 230, 1.0, undefined, 0.28),
  P("rock", 60, 1.1, undefined, 0.5),
  P("bush", -60, 0.8, undefined, 0.62),
  P("grass", 150, 0.76, undefined, 0.7),
];
// A PALMEIRA DE DÉBORA — o tribunal ao ar livre, entre Ramá e Betel.
const PALMEIRA: StagePropSpec[] = [
  { ...P("palm", 0, 1.35, undefined, 0.34), tag: "palmeira-de-debora" },
  P("rock", -260, 1.0, undefined, 0.42),
  P("tree", 300, 1.0, undefined, 0.26),
  P("grass", -120, 0.78, undefined, 0.7),
  P("grass", 140, 0.74, undefined, 0.66),
];
// O MONTE TABOR — a subida dos dez mil de Zebulom e Naftali.
const TABOR: StagePropSpec[] = [
  P("rock", 0, 1.5, undefined, 0.3),
  P("rock", -250, 1.15, undefined, 0.44),
  P("rock", 260, 1.05, undefined, 0.4),
  P("bush", 130, 0.8, undefined, 0.62),
  P("grass", -110, 0.76, undefined, 0.7),
];
// O CARVALHO DE ZAANAIM — as tendas de Héber, o queneu, apartado dos seus.
const CARVALHO: StagePropSpec[] = [
  P("tree", -40, 1.4, undefined, 0.32),
  P("tent", 160, 1.15, undefined, 0.44),
  P("stall", -230, 0.95, undefined, 0.5),
  P("grass", 60, 0.76, undefined, 0.7),
  P("rock", 300, 1.0, undefined, 0.36),
];
// HAROSETE DOS GENTIOS — o quartel de Sísera, de onde saem os carros.
const HAROSETE: StagePropSpec[] = [
  P("tower", 140, 1.3, undefined, 0.28),
  P("door", 20, 0.95, undefined, 0.48),
  P("crate", -180, 0.9, undefined, 0.56),
  P("rock", -300, 1.05, undefined, 0.4),
  P("grass", 250, 0.74, undefined, 0.68),
];
// O RIBEIRO DE QUISOM — a torrente onde o SENHOR atrai os carros de ferro.
const QUISOM: StagePropSpec[] = [
  P("river", 0, 1.5, undefined, 0.84),
  P("rock", -270, 1.1, undefined, 0.42),
  P("bush", 240, 0.85, undefined, 0.56),
  P("grass", 120, 0.76, undefined, 0.66),
  P("rock", 320, 1.0, undefined, 0.36),
];
// A TENDA DE JAEL — o refúgio que virou tribunal; o odre de leite, a estaca.
const TENDA: StagePropSpec[] = [
  P("tent", 0, 1.5, undefined, 0.4),
  P("stall", -260, 0.95, undefined, 0.5),
  P("amphora", 150, 0.85, undefined, 0.6),
  P("bush", -140, 0.8, undefined, 0.62),
  P("grass", 230, 0.74, undefined, 0.68),
];
// A TENDA DE NOITE — a porta guardada, o hóspede coberto, o sono profundo.
const TENDA_NOITE: StagePropSpec[] = [
  P("tent", -20, 1.5, undefined, 0.4),
  P("door", 170, 0.9, undefined, 0.5),
  P("amphora", 110, 0.85, undefined, 0.62),
  { ...P("moon", 200, 1.4, undefined, 0.76), sky: true },
  P("grass", -180, 0.74, undefined, 0.68),
];

// ---------------------------------------------------------------- Jz 5 sets
// O CÂNTICO — Débora e Baraque cantam no mesmo dia da vitória, sob a palmeira.
const CANTICO: StagePropSpec[] = [
  { ...P("palm", -30, 1.3, undefined, 0.34), tag: "palmeira-de-debora" },
  P("sheaf", 200, 0.95, undefined, 0.58),
  P("grass", 90, 0.76, undefined, 0.7),
  P("tree", 310, 1.0, undefined, 0.26),
  P("rock", -290, 1.0, undefined, 0.4),
];
// DIANTE DOS REIS — a corte que ouve: "Ouvi, reis; dai ouvidos, príncipes".
const CORTE: StagePropSpec[] = [
  P("throne", 230, 1.0, undefined, 0.4),
  P("throne", -250, 1.0, undefined, 0.42),
  P("tower", 320, 1.05, undefined, 0.28),
  P("church", -330, 1.0, undefined, 0.3),
  P("grass", 40, 0.74, undefined, 0.72),
];
// SEIR E EDOM — o SENHOR saindo do sul: a terra estremece, os céus gotejam.
const SEIR: StagePropSpec[] = [
  P("rock", -60, 1.5, undefined, 0.32),
  P("rock", 220, 1.25, undefined, 0.42),
  { ...P("clouds", 40, 1.5, undefined, 0.66), sky: true },
  { ...P("clouds", -230, 1.2, undefined, 0.58), sky: true },
  P("rock", 330, 1.0, undefined, 0.5),
];
// O SINAI QUE SE DERRETE — os montes escorrendo diante do Deus de Israel.
const SINAI: StagePropSpec[] = [
  P("rock", 0, 1.8, undefined, 0.34),
  P("rock", -280, 1.2, undefined, 0.46),
  P("rock", 290, 1.15, undefined, 0.44),
  { ...P("clouds", -60, 1.4, undefined, 0.7), sky: true },
];
// OS CAMINHOS CESSADOS — as veredas torcidas, as estradas desertas de medo.
const CAMINHOS: StagePropSpec[] = [
  P("rock", -180, 1.2, undefined, 0.46),
  P("rock", 210, 1.1, undefined, 0.52),
  P("bush", 40, 0.85, undefined, 0.62),
  P("bush", -300, 0.8, undefined, 0.56),
  P("grass", 130, 0.72, undefined, 0.72),
];
// AS ALDEIAS QUE CESSARAM — as casas caladas até se levantar a mãe em Israel.
const ALDEIAS: StagePropSpec[] = [
  P("church", -170, 1.05, undefined, 0.34),
  P("door", 60, 0.95, undefined, 0.5),
  P("tower", 250, 1.05, undefined, 0.3),
  P("well", -290, 0.9, undefined, 0.56),
  P("grass", 160, 0.74, undefined, 0.7),
];
// DEUSES NOVOS — o bezerro escolhido, e logo a guerra às portas, sem escudo.
const DEUSES_NOVOS: StagePropSpec[] = [
  P("calf", -40, 1.15, undefined, 0.44),
  P("door", 190, 1.0, undefined, 0.46),
  P("tower", 300, 1.0, undefined, 0.28),
  P("rock", -270, 1.05, undefined, 0.4),
  P("grass", 90, 0.72, undefined, 0.7),
];
// OS VOLUNTÁRIOS — o povo que se ofereceu; os legisladores de Israel.
const VOLUNTARIOS: StagePropSpec[] = [
  P("sheaf", -220, 0.95, undefined, 0.56),
  { ...P("palm", 250, 1.15, undefined, 0.3), tag: "palmeira-de-debora" },
  P("grass", 0, 0.78, undefined, 0.72),
  P("rock", 320, 1.0, undefined, 0.4),
];
// AS JUMENTAS BRANCAS — os que cavalgam e se assentam em juízo pelo caminho.
const JUMENTAS: StagePropSpec[] = [
  P("stall", -150, 1.05, undefined, 0.5),
  P("stall", 170, 1.0, undefined, 0.46),
  { ...P("palm", 20, 1.2, undefined, 0.32), tag: "palmeira-de-debora" },
  P("grass", 280, 0.74, undefined, 0.68),
];
// OS LUGARES ONDE SE TIRAM ÁGUAS — os poços e as portas, onde se conta a justiça.
const AGUAS: StagePropSpec[] = [
  P("well", -60, 1.15, undefined, 0.5),
  P("door", 200, 1.0, undefined, 0.46),
  P("river", 0, 1.3, undefined, 0.86),
  P("amphora", -170, 0.85, undefined, 0.62),
  P("grass", 130, 0.74, undefined, 0.7),
];
// DESPERTA, DÉBORA — o cântico se levanta e Baraque leva presos os cativos.
const DESPERTAR: StagePropSpec[] = [
  { ...P("palm", -230, 1.25, undefined, 0.32), tag: "palmeira-de-debora" },
  P("crate", 230, 0.9, undefined, 0.58),
  P("rock", 320, 1.0, undefined, 0.4),
  P("grass", 60, 0.76, undefined, 0.72),
];
// AS TRIBOS EM MARCHA — Efraim, Benjamim, Maquir e a cana do escriba de Zebulom.
const TRIBOS: StagePropSpec[] = [
  P("scroll", 210, 0.85, undefined, 0.6),
  P("tent", -290, 1.05, undefined, 0.26),
  P("rock", 300, 1.0, undefined, 0.36),
  P("grass", -60, 0.76, undefined, 0.72),
];
// OS CURRAIS DE RÚBEN — os balidos dos rebanhos, longe do campo de batalha.
const CURRAIS: StagePropSpec[] = [
  P("stall", 60, 1.2, undefined, 0.48),
  P("stall", -210, 1.0, undefined, 0.52),
  P("bush", 250, 0.85, undefined, 0.58),
  P("grass", -80, 0.78, undefined, 0.72),
];
// OS NAVIOS E AS BAÍAS — Dã detido nos navios, Aser assentado na beira dos mares.
const NAVIOS: StagePropSpec[] = [
  P("boat", -60, 1.25, undefined, 0.6),
  P("boat", 210, 1.0, undefined, 0.5),
  P("river", 0, 1.5, undefined, 0.88),
  P("rock", -300, 1.05, undefined, 0.42),
];
// AS ALTURAS DO CAMPO — Zebulom e Naftali expondo a vida à morte.
const ALTURAS: StagePropSpec[] = [
  P("rock", 30, 1.6, undefined, 0.3),
  P("rock", -260, 1.2, undefined, 0.44),
  P("bush", 220, 0.8, undefined, 0.6),
  P("grass", -100, 0.74, undefined, 0.72),
];
// TAANAQUE, JUNTO ÀS ÁGUAS DE MEGIDO — vieram reis, pelejaram, e nada levaram.
const MEGIDO: StagePropSpec[] = [
  P("river", 0, 1.45, undefined, 0.85),
  P("tower", 260, 1.15, undefined, 0.28),
  P("rock", -280, 1.1, undefined, 0.44),
  P("crate", 160, 0.85, undefined, 0.62),
  P("grass", -100, 0.72, undefined, 0.7),
];
// AS ESTRELAS PELEJANDO — os céus em armas contra Sísera, desde os seus cursos.
const ESTRELAS: StagePropSpec[] = [
  { ...P("starfield", 0, 1.6, undefined, 0.8), sky: true },
  { ...P("clouds", 220, 1.2, undefined, 0.62), sky: true },
  P("rock", -260, 1.1, undefined, 0.44),
  P("grass", 120, 0.72, undefined, 0.72),
];
// O QUISOM QUE ARRASTA — o antigo ribeiro levando os carros e os valentes.
const TORRENTE: StagePropSpec[] = [
  P("river", 0, 1.7, undefined, 0.8),
  P("rock", 250, 1.15, undefined, 0.5),
  P("rock", -290, 1.1, undefined, 0.46),
  P("bush", 150, 0.8, undefined, 0.6),
];
// OS CASCOS DESPEDAÇADOS — o galopar dos valentes quebrado na lama do ribeiro.
const CASCOS: StagePropSpec[] = [
  P("stall", 170, 1.05, undefined, 0.5),
  P("rock", -40, 1.25, undefined, 0.58),
  P("river", 0, 1.4, undefined, 0.86),
  P("rock", 300, 1.0, undefined, 0.42),
];
// MEROZ AMALDIÇOADA — a aldeia que não veio ao socorro do SENHOR.
const MEROZ: StagePropSpec[] = [
  P("church", 60, 1.1, undefined, 0.34),
  P("door", -110, 0.95, undefined, 0.5),
  P("tower", 260, 1.05, undefined, 0.28),
  P("bush", -280, 0.8, undefined, 0.58),
  P("grass", 170, 0.72, undefined, 0.72),
];
// A TENDA BENDITA — Jael entre as mulheres nas tendas; o prato de nobres.
const TENDA_JAEL: StagePropSpec[] = [
  P("tent", 30, 1.5, undefined, 0.4),
  P("amphora", -140, 0.9, undefined, 0.6),
  P("stall", 240, 0.95, undefined, 0.5),
  P("grass", -240, 0.74, undefined, 0.7),
];
// A JANELA DE SÍSERA — a mãe atrás da grade, esperando o carro que não volta.
const JANELA: StagePropSpec[] = [
  P("tower", 0, 1.55, undefined, 0.28),
  P("door", -160, 0.95, undefined, 0.46),
  P("church", 220, 1.05, undefined, 0.32),
  { ...P("moon", 250, 1.3, undefined, 0.74), sky: true },
  P("rock", -300, 1.0, undefined, 0.44),
];
// OS DESPOJOS QUE NÃO VIERAM — os estofos coloridos sonhados em vão.
const DESPOJOS: StagePropSpec[] = [
  P("crate", -60, 1.05, undefined, 0.56),
  P("crate", 130, 0.95, undefined, 0.62),
  P("tower", 260, 1.2, undefined, 0.28),
  P("door", -230, 0.9, undefined, 0.48),
];
// O SOL QUANDO SAI NA SUA FORÇA — os que amam o SENHOR, resplandecendo.
const SOL: StagePropSpec[] = [
  { ...P("sun", 30, 1.25, undefined, 0.64), sky: true },
  { ...P("palm", -240, 1.2, undefined, 0.3), tag: "palmeira-de-debora" },
  P("grass", 100, 0.78, undefined, 0.72),
  P("sheaf", 230, 0.95, undefined, 0.58),
];
// O DESCANSO — quarenta anos de sossego: a terra verde, a seara segura.
const DESCANSO: StagePropSpec[] = [
  P("sheaf", -140, 1.0, undefined, 0.58),
  { ...P("palm", 210, 1.25, undefined, 0.32), tag: "palmeira-de-debora" },
  P("well", -290, 0.9, undefined, 0.54),
  P("grass", 40, 0.78, undefined, 0.72),
  P("tree", 320, 1.0, undefined, 0.26),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Jz 4
  4: {
    start: { terrain: "city", night: 0.5, glory: 0.2, storm: 0.08, fire: 0, verdure: 0.2 },
    beats: [
      // v.1 — morto Eúde, Israel torna a fazer o mal: o ciclo recomeça.
      b(1, { q: "tornaram a fazer o que era mau aos olhos do SENHOR", set: "apostasia", props: APOSTASIA,
        env: { terrain: "city", night: 0.55, glory: 0.16, storm: 0.1, verdure: 0.16 }, cast: [
        C("homem", -130, "bow", { dy: 0.56, facing: 1, id: "israelita1" }),
        C("mulherComum", 130, "kneel", { dy: 0.52, facing: -1, id: "israelita2" }),
        C("homem", 240, "stand", { dy: 0.46, facing: -1, id: "israelita3" }),
      ] }),
      // v.2 — vendidos na mão de JABIM, rei de Canaã, em Hazor; Sísera, o capitão.
      b(2, { q: "Sísera era o capitão do seu exército", set: "hazor", props: HAZOR,
        env: { terrain: "city", night: 0.5, glory: 0.14, verdure: 0.14 }, cast: [
        C("rei", -150, "stand", { dy: 0.5, facing: 1, id: "jabim" }),
        C("homem", 60, "stand", { dy: 0.54, facing: -1, scale: 1.15, id: "sisera" }),
        C("multidao", 250, "stand", { dy: 0.3 }),
      ] }),
      // v.3 — o CLAMOR: novecentos carros de ferro, vinte anos de opressão.
      b(3, { q: "novecentos carros de ferro", set: "clamor", props: CLAMOR,
        env: { terrain: "field", night: 0.5, glory: 0.3, storm: 0.06, verdure: 0.2 }, cast: [
        C("homem", -140, "kneel", { dy: 0.56, facing: 1, id: "clamor1" }),
        C("mulherComum", 20, "kneel", { dy: 0.6, facing: 1, id: "clamor2" }),
        C("homem", 180, "bow", { dy: 0.5, facing: -1, id: "clamor3" }),
      ] }),
      // v.4 — DÉBORA, profetisa, mulher de Lapidote, julgava a Israel.
      b(4, { q: "mulher profetisa, mulher de Lapidote", set: "palmeira", props: PALMEIRA,
        env: { terrain: "field", night: 0.14, glory: 0.6, storm: 0, verdure: 0.5 }, cast: [
        C("mulherComum", 0, "stand", { dy: 0.5, facing: 1, id: "debora-juiza" }),
      ] }),
      // v.5 — assentada DEBAIXO DAS PALMEIRAS DE DÉBORA; subiam a ela a juízo.
      b(5, { q: "debaixo das palmeiras de Débora", env: { glory: 0.62, verdure: 0.52 }, cast: [
        C("mulherComum", -60, "stand", { dy: 0.5, facing: 1, id: "debora-juiza" }),
        C("homem", 110, "kneel", { dy: 0.58, facing: -1, id: "litigante1" }),
        C("homem", 220, "bow", { dy: 0.5, facing: -1, id: "litigante2" }),
        C("multidao", 300, "stand", { dy: 0.3 }),
      ] }),
      // v.6 — DÉBORA manda chamar BARAQUE: sobe ao Tabor com dez mil homens.
      b(6, { by: "mulherComum", q: "e disse-lhe:", env: { glory: 0.66 }, cast: [
        C("mulherComum", -110, "point", { dy: 0.52, facing: 1, id: "debora-juiza" }),
        C("servo", 110, "stand", { dy: 0.54, facing: -1, id: "baraque" }),
      ] }),
      // v.7 — e atrairei Sísera ao ribeiro de Quisom, e o darei na tua mão.
      b(7, { by: "mulherComum", q: "E atrairei a ti para o ribeiro de Quisom",
        env: { glory: 0.7 }, cast: [
        C("mulherComum", -110, "raise", { dy: 0.52, facing: 1, id: "debora-juiza" }),
        C("servo", 110, "stand", { dy: 0.54, facing: -1, id: "baraque" }),
      ] }),
      // v.8 — BARAQUE hesita: "se fores comigo, irei". (Baraque fala)
      b(8, { by: "servo", q: "Então lhe disse Baraque:", env: { glory: 0.55, night: 0.2 }, cast: [
        C("servo", 90, "stand", { dy: 0.56, facing: -1, id: "baraque" }),
        C("mulherComum", -110, "stand", { dy: 0.5, facing: 1, id: "debora-juiza" }),
      ] }),
      // v.9 — à mão de UMA MULHER o SENHOR venderá a Sísera. (Débora fala)
      b(9, { by: "mulherComum", q: "E disse ela:", env: { glory: 0.68, night: 0.16 }, cast: [
        C("mulherComum", -100, "raise", { dy: 0.52, facing: 1, id: "debora-juiza" }),
        C("servo", 100, "bow", { dy: 0.56, facing: -1, id: "baraque" }),
      ] }),
      // v.10 — Baraque convoca Zebulom e Naftali; sobem dez mil, e Débora com ele.
      b(10, { q: "subiu com dez mil homens após ele", set: "tabor", props: TABOR,
        env: { terrain: "mountain", night: 0.24, glory: 0.5, verdure: 0.3 }, cast: [
        C("servo", -140, "walk", { dy: 0.52, facing: 1, id: "baraque" }),
        C("mulherComum", -230, "walk", { dy: 0.5, facing: 1, id: "debora-juiza" }),
        C("multidao", 120, "walk", { dy: 0.42, facing: 1 }),
      ] }),
      // v.11 — HÉBER, o queneu, com as tendas até ao carvalho de Zaanaim.
      b(11, { q: "tinha estendido as suas tendas até ao carvalho de Zaanaim",
        set: "carvalho", props: CARVALHO,
        env: { terrain: "field", night: 0.2, glory: 0.42, verdure: 0.48 }, cast: [
        C("homem", -140, "stand", { dy: 0.54, facing: 1, id: "heber" }),
        C("mulherComum", 60, "stand", { dy: 0.56, facing: -1, id: "jael" }),
      ] }),
      // v.12 — anunciam a Sísera que Baraque subiu ao monte Tabor.
      b(12, { q: "tinha subido ao monte Tabor", set: "harosete", props: HAROSETE,
        env: { terrain: "city", night: 0.42, glory: 0.2, verdure: 0.18 }, cast: [
        C("homem", -150, "point", { dy: 0.56, facing: 1, id: "mensageiro" }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, scale: 1.15, id: "sisera" }),
        C("multidao", 260, "stand", { dy: 0.3 }),
      ] }),
      // v.13 — os NOVECENTOS CARROS DE FERRO descem ao ribeiro de Quisom.
      b(13, { q: "novecentos carros de ferro, e todo o povo", set: "quisom", props: QUISOM,
        env: { terrain: "field", night: 0.4, glory: 0.24, storm: 0.2, water: 0.35, verdure: 0.28 }, cast: [
        C("homem", -40, "stand", { dy: 0.6, facing: 1, scale: 1.25, id: "sisera" }),
        C("multidao", 200, "stand", { dy: 0.32, facing: 1 }),
      ] }),
      // v.14 — DÉBORA: levanta-te! este é o dia; o SENHOR saiu adiante de ti.
      b(14, { by: "mulherComum", q: "Então disse Débora a Baraque:", set: "tabor", props: TABOR,
        env: { terrain: "mountain", night: 0.2, glory: 0.72, storm: 0.1, verdure: 0.3 }, cast: [
        C("mulherComum", -120, "point", { dy: 0.5, facing: 1, id: "debora-juiza" }),
        C("servo", 70, "raise", { dy: 0.54, facing: -1, id: "baraque" }),
        C("multidao", 240, "stand", { dy: 0.34, facing: 1 }),
      ] }),
      // v.15 — o SENHOR DERROTA Sísera e os carros; ele desce e FOGE A PÉ.
      b(15, { q: "o Senhor derrotou a Sísera", set: "quisom", props: QUISOM,
        env: { terrain: "field", night: 0.36, glory: 0.78, storm: 0.5, water: 0.5, verdure: 0.25 }, cast: [
        C("homem", -220, "lie", { dy: 0.64, id: "cananeu1" }),
        C("homem", -60, "lie", { dy: 0.58, id: "cananeu2" }),
        C("homem", 120, "walk", { dy: 0.6, facing: 1, id: "sisera" }),
        C("servo", 250, "raise", { dy: 0.5, facing: -1, id: "baraque" }),
      ] }),
      // v.16 — Baraque persegue até Harosete; nem um só ficou.
      b(16, { q: "todo o exército de Sísera caiu ao fio da espada",
        env: { night: 0.46, glory: 0.5, storm: 0.3, water: 0.4, verdure: 0.2 }, cast: [
        C("servo", -180, "walk", { dy: 0.5, facing: 1, id: "baraque" }),
        C("homem", 30, "lie", { dy: 0.62, id: "cananeu1" }),
        C("homem", 180, "lie", { dy: 0.56, id: "cananeu2" }),
      ] }),
      // v.17 — Sísera foge à TENDA DE JAEL: havia paz entre Jabim e Héber.
      b(17, { q: "fugiu a pé à tenda de Jael", set: "tenda", props: TENDA,
        env: { terrain: "field", night: 0.5, glory: 0.26, storm: 0.06, water: 0, verdure: 0.32 }, cast: [
        C("homem", -180, "walk", { dy: 0.6, facing: 1, id: "sisera" }),
        C("mulherComum", 60, "stand", { dy: 0.54, facing: -1, id: "jael" }),
      ] }),
      // v.18 — JAEL sai ao encontro: "Entra, senhor meu... não temas". (Jael fala)
      b(18, { by: "mulherComum", q: "e disse-lhe:", env: { night: 0.54, glory: 0.24 }, cast: [
        C("mulherComum", 50, "point", { dy: 0.54, facing: -1, id: "jael" }),
        C("homem", -120, "walk", { dy: 0.6, facing: 1, id: "sisera" }),
      ] }),
      // v.19 — Sísera pede água; ela abre um odre de LEITE e o cobre. (Sísera fala)
      b(19, { by: "homem", q: "Então ele lhe disse:", env: { night: 0.58, glory: 0.22 }, cast: [
        C("homem", -60, "lie", { dy: 0.62, id: "sisera" }),
        C("mulherComum", 110, "kneel", { dy: 0.56, facing: -1, id: "jael" }),
      ] }),
      // v.20 — "Põe-te à porta da tenda... responderás: Não." (Sísera fala)
      b(20, { by: "homem", q: "E ele lhe disse:", set: "tenda-noite", props: TENDA_NOITE,
        env: { terrain: "field", night: 0.66, glory: 0.2, verdure: 0.28 }, cast: [
        C("homem", -80, "lie", { dy: 0.62, id: "sisera" }),
        C("mulherComum", 170, "stand", { dy: 0.5, facing: -1, id: "jael" }),
      ] }),
      // v.21 — A ESTACA e o MARTELO: juízo em silêncio, no sono profundo.
      b(21, { q: "lhe cravou a estaca na fonte",
        env: { night: 0.74, glory: 0.36, storm: 0.14, verdure: 0.24 }, cast: [
        C("mulherComum", 60, "kneel", { dy: 0.54, facing: -1, id: "jael" }),
        C("homem", -70, "lie", { dy: 0.64, id: "sisera" }),
      ] }),
      // v.22 — Jael sai ao encontro de Baraque: "mostrar-te-ei o homem que buscas".
      b(22, { by: "mulherComum", q: "e disse-lhe:", env: { night: 0.62, glory: 0.42 }, cast: [
        C("mulherComum", 40, "point", { dy: 0.5, facing: -1, id: "jael" }),
        C("servo", -200, "walk", { dy: 0.52, facing: 1, id: "baraque" }),
        C("homem", 170, "lie", { dy: 0.66, id: "sisera" }),
      ] }),
      // v.23 — Deus sujeitou Jabim, rei de Canaã, diante dos filhos de Israel.
      b(23, { q: "sujeitou a Jabim, rei de Canaã", set: "hazor", props: HAZOR,
        env: { terrain: "city", night: 0.3, glory: 0.62, storm: 0.06, verdure: 0.22 }, cast: [
        C("rei", 130, "bow", { dy: 0.54, facing: -1, id: "jabim" }),
        C("servo", -140, "stand", { dy: 0.52, facing: 1, id: "baraque" }),
        C("mulherComum", -240, "stand", { dy: 0.48, facing: 1, id: "debora-juiza" }),
      ] }),
      // v.24 — a mão de Israel pesa sobre Jabim até exterminá-lo: livramento.
      b(24, { q: "até que exterminaram a Jabim", set: "palmeira", props: PALMEIRA,
        env: { terrain: "field", night: 0.16, glory: 0.74, storm: 0, verdure: 0.52 }, cast: [
        C("mulherComum", -120, "raise", { dy: 0.5, facing: 1, id: "debora-juiza" }),
        C("servo", 20, "stand", { dy: 0.52, facing: -1, id: "baraque" }),
        C("multidao", 200, "raise", { dy: 0.36 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Jz 5
  5: {
    start: { terrain: "field", night: 0.14, glory: 0.7, storm: 0, fire: 0, verdure: 0.5 },
    beats: [
      // v.1 — Débora e Baraque cantam naquele mesmo dia.
      b(1, { q: "E cantou Débora e Baraque", set: "cantico", props: CANTICO,
        env: { terrain: "field", night: 0.14, glory: 0.72, verdure: 0.5 }, cast: [
        C("mulherComum", -90, "raise", { dy: 0.5, facing: 1, id: "debora-juiza" }),
        C("servo", 90, "stand", { dy: 0.52, facing: -1, id: "baraque" }),
      ] }),
      // v.2 — louvor pela vingança de Israel: o povo se ofereceu voluntariamente.
      b(2, { by: "mulherComum", q: "Louvai ao Senhor pela vingança de Israel",
        env: { glory: 0.8 }, cast: [
        C("mulherComum", -40, "raise", { dy: 0.56, facing: 1, id: "debora-juiza" }),
        C("servo", 130, "raise", { dy: 0.48, facing: -1, id: "baraque" }),
        C("multidao", 260, "raise", { dy: 0.32 }),
      ] }),
      // v.3 — "Ouvi, reis; dai ouvidos, príncipes": o cântico diante das cortes.
      b(3, { by: "mulherComum", q: "Ouvi, reis; dai ouvidos, príncipes", set: "corte", props: CORTE,
        env: { terrain: "city", night: 0.2, glory: 0.68, verdure: 0.25 }, cast: [
        C("mulherComum", 0, "raise", { dy: 0.58, facing: 1, id: "debora-juiza" }),
        C("rei", -190, "stand", { dy: 0.42, facing: 1, id: "rei1" }),
        C("rei", 190, "stand", { dy: 0.42, facing: -1, id: "rei2" }),
      ] }),
      // v.4 — o SENHOR saindo de Seir: a terra estremece, os céus gotejam.
      b(4, { by: "mulherComum", q: "saindo tu de Seir", set: "seir", props: SEIR,
        env: { terrain: "mountain", night: 0.42, glory: 0.72, storm: 0.55, water: 0.3, verdure: 0.14 }, cast: [
        C("mulherComum", -230, "raise", { dy: 0.62, facing: 1, id: "debora-juiza" }),
      ] }),
      // v.5 — os montes se derreteram; até o Sinai, diante do Deus de Israel.
      b(5, { by: "mulherComum", q: "Os montes se derreteram diante do Senhor", set: "sinai", props: SINAI,
        env: { terrain: "mountain", night: 0.34, glory: 0.85, storm: 0.4, verdure: 0.1 }, cast: [
        C("mulherComum", 210, "bow", { dy: 0.66, facing: -1, id: "debora-juiza" }),
      ] }),
      // v.6 — nos dias de Sangar e de Jael, cessaram os caminhos: veredas torcidas.
      b(6, { by: "mulherComum", q: "cessaram os caminhos", set: "caminhos", props: CAMINHOS,
        env: { terrain: "desert", night: 0.52, glory: 0.24, storm: 0.08, water: 0, verdure: 0.14 }, cast: [
        C("mulherComum", 250, "stand", { dy: 0.72, facing: -1, id: "debora-juiza" }),
        C("homem", -80, "walk", { dy: 0.5, facing: 1, id: "viandante" }),
      ] }),
      // v.7 — "até que eu, Débora, me levantei, por mãe em Israel me levantei".
      b(7, { by: "mulherComum", q: "até que eu, Débora, me levantei", set: "aldeias", props: ALDEIAS,
        env: { terrain: "city", night: 0.34, glory: 0.62, verdure: 0.28 }, cast: [
        C("mulherComum", -20, "raise", { dy: 0.62, facing: 1, id: "debora-juiza" }),
        C("mulherComum", 200, "kneel", { dy: 0.44, facing: -1, id: "aldea" }),
      ] }),
      // v.8 — escolhiam deuses novos, e a guerra às portas: nem escudo nem lança.
      b(8, { by: "mulherComum", q: "E se escolhia deuses novos", set: "deuses-novos", props: DEUSES_NOVOS,
        env: { terrain: "city", night: 0.56, glory: 0.2, storm: 0.12, verdure: 0.16 }, cast: [
        C("mulherComum", 240, "stand", { dy: 0.7, facing: -1, id: "debora-juiza" }),
        C("homem", -160, "bow", { dy: 0.56, facing: 1, id: "idolatra" }),
      ] }),
      // v.9 — o coração da profetisa é para os que se ofereceram voluntariamente.
      b(9, { by: "mulherComum", q: "que voluntariamente se ofereceram entre o povo",
        set: "voluntarios", props: VOLUNTARIOS,
        env: { terrain: "field", night: 0.16, glory: 0.7, storm: 0, verdure: 0.5 }, cast: [
        C("mulherComum", -150, "raise", { dy: 0.54, facing: 1, id: "debora-juiza" }),
        C("multidao", 110, "raise", { dy: 0.4 }),
      ] }),
      // v.10 — vós que cavalgais jumentas brancas e vos assentais em juízo: falai!
      b(10, { by: "mulherComum", q: "Vós os que cavalgais sobre jumentas brancas",
        set: "jumentas", props: JUMENTAS,
        env: { terrain: "field", night: 0.18, glory: 0.6, verdure: 0.46 }, cast: [
        C("mulherComum", 20, "point", { dy: 0.6, facing: -1, id: "debora-juiza" }),
        C("homem", -240, "walk", { dy: 0.5, facing: 1, id: "cavaleiro1" }),
        C("homem", 250, "stand", { dy: 0.44, facing: -1, id: "juiz" }),
      ] }),
      // v.11 — nos lugares onde se tiram águas, contai as justiças do SENHOR.
      b(11, { by: "mulherComum", q: "entre os lugares onde se tiram águas", set: "aguas", props: AGUAS,
        env: { terrain: "field", night: 0.2, glory: 0.66, water: 0.3, verdure: 0.5 }, cast: [
        C("mulherComum", -230, "stand", { dy: 0.56, facing: 1, id: "debora-juiza" }),
        C("mulherComum", 90, "kneel", { dy: 0.62, facing: -1, id: "aguadeira" }),
        C("multidao", 250, "walk", { dy: 0.36, facing: -1 }),
      ] }),
      // v.12 — "Desperta, desperta, Débora"; levanta-te, Baraque, leva os cativos.
      b(12, { by: "mulherComum", q: "Desperta, desperta, Débora", set: "despertar", props: DESPERTAR,
        env: { terrain: "field", night: 0.12, glory: 0.82, water: 0, verdure: 0.5 }, cast: [
        C("mulherComum", -120, "raise", { dy: 0.5, facing: 1, id: "debora-juiza" }),
        C("servo", 60, "walk", { dy: 0.56, facing: 1, id: "baraque" }),
        C("homem", 200, "bow", { dy: 0.6, facing: 1, id: "cativo" }),
      ] }),
      // v.13 — o SENHOR me fez dominar sobre os poderosos, com os que restaram.
      b(13, { by: "mulherComum", q: "fez-me o Senhor dominar sobre os poderosos",
        env: { glory: 0.76, night: 0.16 }, cast: [
        C("mulherComum", 150, "stand", { dy: 0.46, facing: -1, id: "debora-juiza" }),
        C("homem", -180, "bow", { dy: 0.64, facing: 1, id: "poderoso" }),
        C("servo", -40, "stand", { dy: 0.56, facing: 1, id: "baraque" }),
      ] }),
      // v.14 — Efraim, Benjamim, Maquir e a cana do escriba de Zebulom.
      b(14, { by: "mulherComum", q: "De Efraim saiu a sua raiz contra Amaleque",
        set: "tribos", props: TRIBOS,
        env: { terrain: "field", night: 0.18, glory: 0.62, verdure: 0.44 }, cast: [
        C("mulherComum", -250, "stand", { dy: 0.66, facing: 1, id: "debora-juiza" }),
        C("servo", 170, "write", { dy: 0.56, facing: -1, id: "escriba" }),
        C("multidao", 20, "walk", { dy: 0.38, facing: 1 }),
      ] }),
      // v.15 — Issacar veio com Débora; Baraque, enviado a pé para o vale.
      b(15, { by: "mulherComum", q: "os principais de Issacar foram com Débora",
        env: { glory: 0.6, night: 0.2 }, cast: [
        C("mulherComum", -60, "walk", { dy: 0.58, facing: 1, id: "debora-juiza" }),
        C("servo", 100, "walk", { dy: 0.66, facing: 1, id: "baraque" }),
        C("homem", -230, "walk", { dy: 0.46, facing: 1, id: "issacar" }),
      ] }),
      // v.16 — Rúben ficou entre os currais, ouvindo os balidos dos rebanhos.
      b(16, { by: "mulherComum", q: "para ouvires os balidos dos rebanhos",
        set: "currais", props: CURRAIS,
        env: { terrain: "field", night: 0.3, glory: 0.36, verdure: 0.55 }, cast: [
        C("mulherComum", -260, "point", { dy: 0.68, facing: 1, id: "debora-juiza" }),
        C("rebanho", 90, "stand", { dy: 0.5 }),
        C("homem", 230, "stand", { dy: 0.6, facing: -1, id: "rubenita" }),
      ] }),
      // v.17 — Gileade além do Jordão; Dã nos navios; Aser junto às suas baías.
      b(17, { by: "mulherComum", q: "e Dã por que se deteve nos navios", set: "navios", props: NAVIOS,
        env: { terrain: "field", night: 0.28, glory: 0.4, water: 0.6, verdure: 0.3 }, cast: [
        C("mulherComum", 260, "stand", { dy: 0.7, facing: -1, id: "debora-juiza" }),
        C("homem", -110, "stand", { dy: 0.52, facing: -1, id: "danita" }),
        C("homem", 120, "lie", { dy: 0.58, id: "aser" }),
      ] }),
      // v.18 — Zebulom e Naftali expuseram a vida à morte, nas alturas do campo.
      b(18, { by: "mulherComum", q: "expôs a sua vida à morte", set: "alturas", props: ALTURAS,
        env: { terrain: "mountain", night: 0.3, glory: 0.6, storm: 0.2, water: 0, verdure: 0.22 }, cast: [
        C("mulherComum", -250, "raise", { dy: 0.66, facing: 1, id: "debora-juiza" }),
        C("homem", 60, "raise", { dy: 0.44, facing: -1, id: "zebulom" }),
        C("homem", 190, "stand", { dy: 0.4, facing: -1, id: "naftali" }),
      ] }),
      // v.19 — vieram reis, pelejaram em Taanaque, e nada levaram de despojo.
      b(19, { by: "mulherComum", q: "então pelejaram os reis de Canaã em Taanaque",
        set: "megido", props: MEGIDO,
        env: { terrain: "field", night: 0.42, glory: 0.5, storm: 0.3, water: 0.3, verdure: 0.2 }, cast: [
        C("mulherComum", -270, "stand", { dy: 0.72, facing: 1, id: "debora-juiza" }),
        C("rei", 40, "stand", { dy: 0.5, facing: 1, id: "rei-cana1" }),
        C("rei", 180, "bow", { dy: 0.56, facing: 1, id: "rei-cana2" }),
      ] }),
      // v.20 — AS ESTRELAS pelejaram desde os céus contra Sísera.
      b(20, { q: "até as estrelas desde os lugares dos seus cursos pelejaram",
        set: "estrelas", props: ESTRELAS,
        env: { terrain: "field", night: 0.76, glory: 0.66, storm: 0.35, water: 0.2, verdure: 0.16 }, cast: [
        C("homem", 60, "bow", { dy: 0.62, facing: 1, id: "sisera" }),
        C("homem", -160, "lie", { dy: 0.56, id: "cananeu1" }),
      ] }),
      // v.21 — o QUISOM, aquele antigo ribeiro, os arrastou.
      b(21, { q: "O ribeiro de Quisom os arrastou", set: "torrente", props: TORRENTE,
        env: { terrain: "field", night: 0.56, glory: 0.6, storm: 0.6, water: 0.85, verdure: 0.18 }, cast: [
        C("homem", -120, "lie", { dy: 0.7, id: "arrastado1" }),
        C("homem", 100, "lie", { dy: 0.62, id: "arrastado2" }),
        C("homem", 250, "bow", { dy: 0.54, facing: -1, id: "arrastado3" }),
      ] }),
      // v.22 — os cascos dos cavalos se despedaçaram no galopar dos valentes.
      b(22, { q: "os cascos dos cavalos se despedaçaram", set: "cascos", props: CASCOS,
        env: { terrain: "field", night: 0.5, glory: 0.46, storm: 0.45, water: 0.6, verdure: 0.18 }, cast: [
        C("homem", -60, "lie", { dy: 0.68, id: "cavaleiro-caido" }),
        C("homem", 230, "kneel", { dy: 0.54, facing: -1, id: "fugitivo" }),
      ] }),
      // v.23 — MEROZ amaldiçoada: quem fala é o ANJO DO SENHOR (mediador visível).
      b(23, { by: "anjo", q: "diz o anjo do Senhor,", set: "meroz", props: MEROZ,
        env: { terrain: "city", night: 0.6, glory: 0.7, storm: 0.2, water: 0, verdure: 0.14 }, cast: [
        C("anjo", -60, "raise", { dy: 0.42, facing: 1, glow: 1 }),
        C("homem", 140, "bow", { dy: 0.6, facing: -1, id: "morador-meroz" }),
        C("mulherComum", 240, "kneel", { dy: 0.52, facing: -1, id: "moradora-meroz" }),
      ] }),
      // v.24 — bendita entre as mulheres, JAEL, mulher de Héber, nas tendas.
      b(24, { by: "mulherComum", q: "Bendita seja entre as mulheres, Jael",
        set: "tenda-jael", props: TENDA_JAEL,
        env: { terrain: "field", night: 0.24, glory: 0.72, storm: 0, verdure: 0.4 }, cast: [
        C("mulherComum", -220, "raise", { dy: 0.56, facing: 1, id: "debora-juiza" }),
        C("mulherComum", 130, "stand", { dy: 0.5, facing: -1, id: "jael" }),
      ] }),
      // v.25 — água pediu ele, LEITE lhe deu ela, em prato de nobres.
      b(25, { by: "mulherComum", q: "Água pediu ele, leite lhe deu ela",
        env: { night: 0.36, glory: 0.6, verdure: 0.36 }, cast: [
        C("mulherComum", -250, "stand", { dy: 0.68, facing: 1, id: "debora-juiza" }),
        C("mulherComum", 40, "kneel", { dy: 0.54, facing: -1, id: "jael" }),
        C("homem", -80, "lie", { dy: 0.6, id: "sisera" }),
      ] }),
      // v.26 — a ESTACA na esquerda, o MARTELO na direita: o golpe na fonte.
      b(26, { q: "À estaca estendeu a sua mão esquerda",
        env: { night: 0.66, glory: 0.44, storm: 0.14, verdure: 0.3 }, cast: [
        C("mulherComum", 70, "kneel", { dy: 0.52, facing: -1, id: "jael" }),
        C("homem", -60, "lie", { dy: 0.64, id: "sisera" }),
      ] }),
      // v.27 — entre os seus pés se encurvou, caiu; ali ficou abatido.
      b(27, { q: "Entre os seus pés se encurvou, caiu",
        env: { night: 0.72, glory: 0.4, storm: 0.1, verdure: 0.26 }, cast: [
        C("homem", -20, "lie", { dy: 0.7, id: "sisera" }),
        C("mulherComum", 190, "stand", { dy: 0.46, facing: -1, id: "jael" }),
      ] }),
      // v.28 — A MÃE DE SÍSERA à janela: "Por que tarda em vir o seu carro?"
      b(28, { by: "mulherComum", q: "e exclamava pela grade:", set: "janela", props: JANELA,
        env: { terrain: "city", night: 0.62, glory: 0.18, storm: 0, verdure: 0.14 }, cast: [
        C("mulherComum", 10, "stand", { dy: 0.4, facing: 1, id: "mae-sisera" }),
      ] }),
      // v.29 — as mais sábias das suas damas respondem; e ela a si mesma.
      b(29, { by: "mulherComum", q: "As mais sábias das suas damas responderam",
        env: { night: 0.6, glory: 0.2 }, cast: [
        C("mulherComum", 170, "stand", { dy: 0.54, facing: -1, id: "dama" }),
        C("mulherComum", -20, "stand", { dy: 0.42, facing: 1, id: "mae-sisera" }),
      ] }),
      // v.30 — os despojos imaginados: estofos coloridos que nunca chegarão.
      b(30, { by: "mulherComum", q: "Porventura não achariam e repartiriam despojos",
        set: "despojos", props: DESPOJOS,
        env: { terrain: "city", night: 0.66, glory: 0.16, verdure: 0.12 }, cast: [
        C("mulherComum", -140, "stand", { dy: 0.46, facing: 1, id: "mae-sisera" }),
        C("mulherComum", 210, "kneel", { dy: 0.58, facing: -1, id: "dama" }),
      ] }),
      // v.31 — pereçam os teus inimigos; os que te amam, como o SOL na sua força.
      b(31, { by: "mulherComum", q: "Assim, ó Senhor, pereçam todos os teus inimigos",
        set: "sol", props: SOL,
        env: { terrain: "field", night: 0.08, glory: 0.95, storm: 0, verdure: 0.55 }, cast: [
        C("mulherComum", -90, "raise", { dy: 0.52, facing: 1, id: "debora-juiza" }),
        C("servo", 90, "raise", { dy: 0.5, facing: -1, id: "baraque" }),
      ] }),
      // v.32 — e sossegou a terra quarenta anos: o descanso do juiz.
      b(32, { q: "sossegou a terra quarenta anos", set: "descanso", props: DESCANSO,
        env: { terrain: "field", night: 0.1, glory: 0.8, verdure: 0.7 }, cast: [
        C("mulherComum", -80, "stand", { dy: 0.5, facing: 1, id: "debora-juiza" }),
        C("servo", 40, "stand", { dy: 0.52, facing: -1, id: "baraque" }),
        C("multidao", 210, "stand", { dy: 0.34 }),
      ] }),
    ],
  },
};
