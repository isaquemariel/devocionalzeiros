// ============================================================================
// DEUTERONÔMIO 29–30 — CENA VIVA. A ALIANÇA DE MOABE e A ESCOLHA DA VIDA.
//
// Dt 29 — A ALIANÇA NAS CAMPINAS DE MOABE, além da de Horebe. Moisés relembra:
// "Tendes visto tudo quanto o Senhor fez… na terra do Egito" (29:2), "aqueles
// sinais e grandes maravilhas" (29:3); os 40 anos no deserto em que "não se
// envelheceram… as vossas vestes, e nem se envelheceu o vosso sapato" (29:5); a
// vitória sobre Siom de Hesbom e Ogue de Basã (29:7). TODO Israel está de pé
// DIANTE DO SENHOR para entrar na aliança — dos capitães ao "rachador da vossa
// lenha" e "tirador da vossa água" (29:10-11). A advertência contra a "raiz que
// dê veneno e fel" (29:18); e a terra abrasada de enxofre e sal, "como… Sodoma
// e Gomorra" (29:23), o exílio (29:28) — o juízo da desolação (glória baixa,
// figuras individuais no escuro). Fecha com "As coisas ENCOBERTAS pertencem ao
// Senhor… porém as REVELADAS nos pertencem" (29:29).
//
// Dt 30 — A RESTAURAÇÃO após o exílio e A ESCOLHA DA VIDA. Se te converteres, o
// Senhor te ajunta "da extremidade do céu" (30:4) e "circuncidará o teu coração"
// (30:6). O mandamento "não te é encoberto… está mui perto de ti, na tua boca, e
// no teu coração" (30:11-14). O ÁPICE: "Os céus e a terra tomo hoje por
// testemunhas… escolhe pois a vida, para que vivas" (30:19) — os dois caminhos,
// a bênção luminosa contra a morte sombria.
//
// A VOZ é de MOISÉS (mediador visível pregando nas campinas de Moabe): usa-se
// `by: "moises"` com `q` nas frases-chave. Cena-base: `field`, Jordão ao fundo,
// o monte de Moabe, as tendas do arraial.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const mv = (v: number, q?: string) => b(v, { by: "moises", ...(q ? { q } : {}) }); // Moisés prega

// Campinas de Moabe: o Jordão ao fundo, o monte de Moabe, as tendas do arraial.
const MOABE: StagePropSpec[] = [
  P("river", 300, 1.25, undefined, 0.2),
  P("rock", 320, 1.1, undefined, 0.12),
  P("tent", -285, 1.0, undefined, 0.2),
  P("tent", 250, 0.95, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -70, 0.85, undefined, 0.82),
  P("grass", 70, 0.8, undefined, 0.74),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Dt 29
  29: {
    start: { terrain: "field", night: 0.12, glory: 0.58, storm: 0, fire: 0, verdure: 0.42 },
    beats: [
      // v.1 — As palavras da aliança de MOABE, além da de Horebe.
      b(1, { by: "moises", q: "na terra de Moabe", props: MOABE, // a aliança nas campinas de Moabe, além de Horebe
        env: { terrain: "field", glory: 0.58, night: 0.12, verdure: 0.42 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      // v.2-3 — FLASHBACK do EGITO: o que os olhos viram, os sinais e maravilhas.
      b(2, { by: "moises", q: "Tendes visto tudo quanto o Senhor fez perante vossos olhos", // "Tendes visto… na terra do Egito"
        env: { terrain: "desert", glory: 0.3, night: 0.38, storm: 0.3, verdure: 0.05 }, cast: [
        C("rei", 160, "bow", { dy: 0.5, facing: -1, id: "farao" }),
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
      ], props: [
        P("tower", 250, 1.3, undefined, 0.2),
        P("ziggurat", 310, 1.1, undefined, 0.18),
      ] }),
      b(3, { by: "moises", q: "aqueles sinais e grandes maravilhas", // os SINAIS e grandes MARAVILHAS
        env: { terrain: "desert", glory: 0.24, night: 0.5, storm: 0.42, verdure: 0.05 }, cast: [
        C("rei", 160, "lie", { dy: 0.5, facing: -1, id: "farao" }),
      ], props: [
        P("locusts", -20, 1.2, undefined, 0.6),
        P("hail", 170, 1.0, undefined, 0.4),
        P("tower", 270, 1.3, undefined, 0.2),
      ] }),
      b(4, { by: "moises", q: "um coração para entender", props: MOABE, // não vos foi dado um CORAÇÃO para entender, olhos, ouvidos
        env: { terrain: "field", glory: 0.55, night: 0.14, verdure: 0.42 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      // v.5-6 — FLASHBACK dos 40 ANOS no deserto: vestes e sapatos que não gastaram.
      b(5, { by: "moises", q: "não se envelheceram sobre vós as vossas vestes", // 40 ANOS: nem as vestes nem o sapato se gastaram
        env: { terrain: "desert", glory: 0.4, night: 0.2, verdure: 0.08 }, cast: [
        C("moises", -170, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "walk", { dy: 0.46 }),
      ], props: [
        P("palm", 260, 1.05, undefined, 0.16),
        P("rock", -300, 1.0, undefined, 0.14),
        P("rock", 300, 0.9, undefined, 0.2),
      ] }),
      b(6, { by: "moises", q: "Pão não comestes", // nem pão comestes nem vinho bebestes: para saberdes que EU sou o Senhor
        env: { terrain: "desert", glory: 0.42, night: 0.18, verdure: 0.08 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
      ], props: [
        P("manna", 40, 1.0, undefined, 0.72),
        P("rock", 300, 1.0, undefined, 0.14),
      ] }),
      // v.7-8 — FLASHBACK: SIOM de Hesbom e OGUE de Basã (o gigante) feridos; a terra por herança.
      b(7, { by: "moises", q: "Siom, rei de Hesbom, e Ogue, rei de Basã", // SIOM e OGUE nos saíram à peleja, e nós os ferimos
        env: { terrain: "field", glory: 0.4, night: 0.22, storm: 0.2, verdure: 0.2 }, cast: [
        C("rei", 90, "lie", { dy: 0.5, facing: -1, id: "siom" }),
        C("rei", 190, "lie", { scale: 1.5, dy: 0.52, facing: -1, id: "ogue" }),
        C("moises", -180, "raise", { dy: 0.5, facing: 1 }),
      ], props: [
        P("tower", 140, 1.25, undefined, 0.2),
        P("tower", 270, 1.1, undefined, 0.24),
      ] }),
      b(8, { by: "moises", q: "demos por herança aos rubenitas", cast: [ // tomamos a terra e a demos por HERANÇA às tribos
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(9, { by: "moises", q: "Guardai, pois, as palavras desta aliança", env: { glory: 0.68 }, cast: [ // GUARDAI as palavras desta aliança, para prosperardes
        C("moises", -140, "raise", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      // v.10-11 — TODO ISRAEL DE PÉ diante do Senhor: dos capitães ao rachador de lenha e tirador de água.
      b(10, { by: "moises", q: "Vós todos estais hoje perante o Senhor", props: MOABE, // TODO Israel de pé PERANTE O SENHOR
        env: { terrain: "field", glory: 0.7, night: 0.1, verdure: 0.45 }, cast: [
        C("moises", -160, "raise", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
        C("multidao", 230, "stand", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
      b(11, { by: "moises", q: "desde o rachador da vossa lenha até ao tirador da vossa água", cast: [ // do maior ao menor: RACHADOR de lenha, TIRADOR de água
        C("moises", -190, "point", { dy: 0.5, facing: 1 }),
        C("homem", 20, "kneel", { dy: 0.5, facing: -1, id: "rachador" }),
        C("mulherComum", 110, "stand", { dy: 0.48, facing: -1, id: "tiradora" }),
      ], props: [
        { ...P("well", 170, 1.0, undefined, 0.5), tag: "tirador-de-agua" },
        P("grass", -60, 0.82, undefined, 0.8),
      ] }),
      b(12, { by: "moises", q: "Para entrardes na aliança", cast: [ // para ENTRARDES na aliança e no juramento do Senhor
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      mv(13, "Abraão, Isaque e Jacó"),                              // como jurou a teus pais: ABRAÃO, ISAQUE e JACÓ
      mv(14, "não somente convosco faço esta aliança"),             // não só convosco faço esta aliança e juramento
      b(15, { by: "moises", q: "aquele que hoje não está aqui conosco", cast: [ // também com AS GERAÇÕES que ainda não estão aqui
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "presente" }),
        C("homem", 110, "stand", { scale: 0.7, dy: 0.44, facing: -1, id: "vindouro" }),
      ] }),
      // v.16-17 — recordação das nações e seus ÍDOLOS: o pau, a pedra, a prata e o ouro.
      mv(16, "como habitamos na terra do Egito"),                   // sabeis como habitamos no Egito e passamos entre as nações
      b(17, { by: "moises", q: "os seus ídolos, o pau e a pedra", // vistes as abominações e os ÍDOLOS: pau, pedra, prata, ouro
        env: { terrain: "field", glory: 0.42, night: 0.24, verdure: 0.28 }, cast: [
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
      ], props: [
        { ...P("calf", 70, 0.95, undefined, 0.6), tag: "idolo" },
        P("rock", 160, 0.9, undefined, 0.3),
      ] }),
      // v.18 — a RAIZ que dá veneno e fel: o coração que se desvia.
      b(18, { by: "moises", q: "raiz que dê veneno e fel", // que não haja RAIZ que dê veneno e fel entre vós
        env: { terrain: "field", glory: 0.4, night: 0.26, verdure: 0.25 }, cast: [
        C("moises", -170, "raise", { dy: 0.5, facing: 1 }),
      ], props: [
        { ...P("tree", 90, 1.1, undefined, 0.22), tag: "raiz-de-fel" },
        P("rock", 220, 0.9, undefined, 0.28),
      ] }),
      b(19, { by: "moises", q: "Terei paz", // o que se abençoa em falso no coração: "Terei paz…"
        env: { terrain: "field", glory: 0.35, night: 0.3, verdure: 0.2 }, cast: [
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("homem", 70, "stand", { dy: 0.52, facing: -1, id: "presuncoso" }),
      ] }),
      // v.20-21 — a IRA do Senhor fumega; o nome apagado; separado para o mal.
      b(20, { by: "moises", q: "fumegará a ira do Senhor", // FUMEGARÁ a ira do Senhor; seu nome apagado de debaixo do céu
        env: { terrain: "field", glory: 0.15, night: 0.5, storm: 0.4, fire: 0.35, verdure: 0.1 }, cast: [
        C("moises", -180, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 80, "lie", { dy: 0.5, facing: -1, id: "amaldicoado" }),
      ], props: [
        P("rock", 220, 0.95, undefined, 0.28),
      ] }),
      b(21, { by: "moises", q: "o separará para mal", // o SEPARARÁ para o mal, de todas as tribos, conforme as maldições
        env: { terrain: "field", glory: 0.13, night: 0.55, storm: 0.4, verdure: 0.08 }, cast: [
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("homem", 90, "bow", { dy: 0.5, facing: -1, id: "separado" }),
      ] }),
      // v.22-23 — A DESOLAÇÃO: as pragas da terra; enxofre e sal, como SODOMA e GOMORRA.
      b(22, { by: "moises", q: "as pragas desta terra", // a geração vindoura verá as PRAGAS e doenças desta terra
        env: { terrain: "desert", glory: 0.12, night: 0.58, storm: 0.4, fire: 0.2, verdure: 0 }, cast: [
        C("moises", -190, "point", { dy: 0.5, facing: 1 }),
        C("homem", 100, "stand", { dy: 0.5, facing: -1, id: "vindouro" }),
      ], props: [
        P("rock", 200, 1.0, undefined, 0.24),
        P("rock", 280, 0.85, undefined, 0.32),
      ] }),
      b(23, { by: "moises", q: "abrasada com enxofre, e sal", // terra ABRASADA de enxofre e sal, como SODOMA e GOMORRA
        env: { terrain: "desert", glory: 0.1, night: 0.62, storm: 0.5, fire: 0.55, verdure: 0 }, cast: [
        C("homem", -40, "lie", { dy: 0.5, facing: 1, id: "morto1" }),
        C("mulherComum", 60, "bow", { dy: 0.5, facing: -1, id: "sobrevivente" }),
      ], props: [
        { ...P("tower", 150, 1.2, 0.7, 0.22), tag: "sodoma" },
        { ...P("tower", 260, 1.0, 0.6, 0.28), tag: "gomorra" },
        P("rock", -260, 1.0, undefined, 0.24),
      ] }),
      b(24, { by: "moises", q: "Por que fez o Senhor assim com esta terra", // as nações perguntam: POR QUE fez o Senhor assim?
        env: { terrain: "desert", glory: 0.14, night: 0.55, verdure: 0.02 }, cast: [
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("homem", 100, "stand", { dy: 0.5, facing: -1, id: "estrangeiro" }),
      ], props: [
        P("rock", 240, 1.0, undefined, 0.26),
      ] }),
      b(25, { by: "moises", q: "deixaram a aliança do Senhor", // a resposta: DEIXARAM a aliança do Senhor dos seus pais
        env: { terrain: "desert", glory: 0.16, night: 0.5, verdure: 0.05 }, cast: [
        C("moises", -170, "raise", { dy: 0.5, facing: 1 }),
      ], props: [
        P("rock", 230, 1.0, undefined, 0.26),
      ] }),
      b(26, { by: "moises", q: "serviram a outros deuses", // foram e SERVIRAM a outros deuses que não conheceram
        env: { terrain: "desert", glory: 0.16, night: 0.5, verdure: 0.05 }, cast: [
        C("homem", 60, "bow", { dy: 0.5, facing: -1, id: "idolatra" }),
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
      ], props: [
        { ...P("calf", 130, 0.95, undefined, 0.58), tag: "outros-deuses" },
      ] }),
      mv(27, "a ira do Senhor se acendeu"),                         // por isso a IRA do Senhor se acendeu contra esta terra
      // v.28 — o EXÍLIO: arrancados da terra com ira, lançados em outra terra.
      b(28, { by: "moises", q: "os arrancou da sua terra com ira", // ARRANCADOS da terra com ira e lançados em outra terra
        env: { terrain: "desert", glory: 0.13, night: 0.55, storm: 0.35, verdure: 0.02 }, cast: [
        C("servo", 40, "walk", { dy: 0.48, facing: 1, id: "exilado1" }),
        C("servo", 110, "walk", { dy: 0.46, facing: 1, id: "exilado2" }),
        C("mulherComum", 175, "walk", { dy: 0.44, facing: 1, id: "exilada" }),
      ], props: [
        P("tower", -250, 1.1, undefined, 0.22),
        P("rock", 280, 1.0, undefined, 0.26),
      ] }),
      // v.29 — AS COISAS ENCOBERTAS x AS REVELADAS: a luz volta, o livro da lei diante do povo.
      b(29, { by: "moises", q: "As coisas encobertas pertencem ao Senhor", // ENCOBERTAS ao Senhor; REVELADAS a nós e nossos filhos
        env: { terrain: "field", glory: 0.82, night: 0.08, storm: 0, fire: 0, verdure: 0.45 }, cast: [
        C("moises", -140, "raise", { glow: 0.4, dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ], props: [
        { ...P("scroll", 60, 1.15, undefined, 0.42), tag: "coisas-reveladas" },
        P("tent", -285, 1.0, undefined, 0.2),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Dt 30
  30: {
    start: { terrain: "field", night: 0.12, glory: 0.6, storm: 0, fire: 0, verdure: 0.42 },
    beats: [
      // v.1 — A BÊNÇÃO ou a MALDIÇÃO postas diante; o recordar-se entre as nações.
      b(1, { by: "moises", q: "a bênção ou a maldição", props: MOABE, // a BÊNÇÃO ou a MALDIÇÃO postas diante de ti
        env: { terrain: "field", glory: 0.6, night: 0.12, verdure: 0.42 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      mv(2, "te converteres ao Senhor teu Deus"),                   // se te CONVERTERES ao Senhor e deres ouvidos à sua voz
      // v.3-4 — A RESTAURAÇÃO: o Senhor te faz voltar do cativeiro e te ajunta da extremidade do céu.
      b(3, { by: "moises", q: "te fará voltar do teu cativeiro", env: { glory: 0.72 }, cast: [ // te fará VOLTAR do cativeiro e se compadecerá de ti
        C("moises", -150, "raise", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("multidao", 150, "walk", { dy: 0.46 }),
      ] }),
      b(4, { by: "moises", q: "na extremidade do céu", // ainda que na EXTREMIDADE DO CÉU, dali te ajuntará
        env: { terrain: "field", glory: 0.78, night: 0.1, verdure: 0.45 }, cast: [
        C("moises", -160, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("multidao", 140, "walk", { dy: 0.46 }),
      ], props: [
        { ...P("starfield", 0, 1.2, undefined, 0.78), sky: true },
        { ...P("sun", 240, 1.0, undefined, 0.62), sky: true },
      ] }),
      // v.5 — DE VOLTA À TERRA dos pais; o bem e a multiplicação.
      b(5, { by: "moises", q: "te trará à terra que teus pais possuíram", props: [ // de volta à TERRA dos pais; te fará bem e te multiplicará
        P("river", 300, 1.25, undefined, 0.2),
        P("tree", 210, 1.15, undefined, 0.2),
        P("grapes", 130, 1.1, undefined, 0.5),
        P("grass", -70, 0.85, undefined, 0.82),
        P("tent", -285, 1.0, undefined, 0.2),
      ], env: { terrain: "field", glory: 0.85, night: 0.08, verdure: 0.62 }, cast: [
        C("moises", -160, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      // v.6 — O CORAÇÃO CIRCUNCIDADO: para amares ao Senhor de todo o coração.
      b(6, { by: "moises", q: "circuncidará o teu coração", env: { glory: 0.92 }, cast: [ // o Senhor CIRCUNCIDARÁ o teu coração, para amá-lo e viveres
        C("moises", -130, "raise", { glow: 0.5, dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
        C("multidao", 220, "stand", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
      mv(7, "sobre os teus inimigos"),                              // as maldições postas SOBRE os teus inimigos
      mv(8, "darás ouvidos à voz do Senhor"),                       // converter-te-ás e DARÁS OUVIDOS à voz do Senhor
      // v.9 — A PROSPERIDADE: fruto do ventre, do gado e da terra; o Senhor se alegra em ti.
      b(9, { by: "moises", q: "no fruto do teu ventre", props: [ // te fará PROSPERAR: fruto do ventre, do gado e da terra
        P("sheaf", 130, 1.1, undefined, 0.5),
        P("grapes", 210, 1.1, undefined, 0.5),
        P("stall", -280, 1.0, undefined, 0.4),
        P("grass", 60, 0.85, undefined, 0.78),
      ], env: { terrain: "field", glory: 0.88, night: 0.08, verdure: 0.62 }, cast: [
        C("moises", -160, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("mulher", 50, undefined, { dy: 0.5 }),
      ] }),
      // v.10 — guardar os mandamentos ESCRITOS NESTE LIVRO da lei.
      b(10, { by: "moises", q: "escritos neste livro da lei", cast: [ // guardando o que está ESCRITO NESTE LIVRO da lei
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ], props: [
        { ...P("scroll", 70, 1.15, undefined, 0.42), tag: "livro-da-lei" },
      ] }),
      // v.11-14 — NÃO ESTÁ LONGE: nem nos céus, nem além do mar; está na tua BOCA e no teu CORAÇÃO.
      b(11, { by: "moises", q: "tampouco está longe de ti", cast: [ // este mandamento não te é encoberto, nem está LONGE
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(12, { by: "moises", q: "Não está nos céus", // NÃO está nos CÉUS, para dizeres: quem subirá por nós?
        env: { terrain: "field", glory: 0.72, night: 0.1, verdure: 0.42 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ], props: [
        { ...P("sun", 40, 1.1, undefined, 0.66), sky: true },
        { ...P("clouds", 180, 1.0, undefined, 0.8), sky: true },
      ] }),
      b(13, { by: "moises", q: "Nem tampouco está além do mar", // NEM além do MAR, para dizeres: quem passará por nós?
        env: { terrain: "field", glory: 0.66, night: 0.12, verdure: 0.4 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
      ], props: [
        P("river", 120, 1.4, undefined, 0.24),
        P("boat", 210, 0.95, undefined, 0.32),
      ] }),
      b(14, { by: "moises", q: "na tua boca, e no teu coração", env: { glory: 0.86 }, cast: [ // MUI PERTO: na tua BOCA e no teu CORAÇÃO
        C("moises", -130, "raise", { glow: 0.4, dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      // v.15 — OS DOIS CAMINHOS propostos: a vida e o bem, a morte e o mal.
      b(15, { by: "moises", q: "a vida e o bem, e a morte e o mal", props: [ // hoje te propus A VIDA e o bem, A MORTE e o mal
        P("tree", -110, 1.2, undefined, 0.2),
        P("grass", -60, 0.85, undefined, 0.78),
        { ...P("rock", 140, 1.15, undefined, 0.24), tag: "caminho-da-morte" },
        P("rock", 250, 0.9, undefined, 0.3),
      ], env: { terrain: "field", glory: 0.6, night: 0.18, verdure: 0.35 }, cast: [
        C("moises", -180, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      // v.16 — O CAMINHO DA VIDA: amar o Senhor, andar nos seus caminhos; a bênção na terra.
      b(16, { by: "moises", q: "andes nos seus caminhos", env: { terrain: "field", glory: 0.88, night: 0.08, verdure: 0.6 }, cast: [ // AMAR o Senhor e ANDAR nos seus caminhos: para viveres
        C("moises", -150, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("multidao", 140, "walk", { dy: 0.46 }),
      ], props: [
        P("tree", 200, 1.15, undefined, 0.2),
        P("grass", 70, 0.85, undefined, 0.78),
      ] }),
      // v.17-18 — O CAMINHO DA MORTE: o coração que se desvia; certamente perecereis.
      b(17, { by: "moises", q: "se o teu coração se desviar", // se o CORAÇÃO se DESVIAR a outros deuses e os servires
        env: { terrain: "field", glory: 0.3, night: 0.34, verdure: 0.2 }, cast: [
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("homem", 80, "bow", { dy: 0.5, facing: -1, id: "desviado" }),
      ], props: [
        { ...P("calf", 150, 0.95, undefined, 0.58), tag: "outros-deuses" },
      ] }),
      b(18, { by: "moises", q: "certamente, perecereis", // eu vos declaro: certamente PERECEREIS, não prolongareis os dias
        env: { terrain: "field", glory: 0.15, night: 0.52, storm: 0.35, verdure: 0.1 }, cast: [
        C("moises", -180, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 80, "lie", { dy: 0.5, facing: -1, id: "perecido" }),
      ], props: [
        P("rock", 210, 1.0, undefined, 0.26),
      ] }),
      // v.19 — O GRANDE APELO: céus e terra por testemunhas; ESCOLHE A VIDA.
      b(19, { by: "moises", q: "escolhe pois a vida, para que vivas", // OS CÉUS E A TERRA por testemunhas: ESCOLHE A VIDA!
        env: { terrain: "field", glory: 0.98, night: 0.06, storm: 0, fire: 0, verdure: 0.6 }, cast: [
        C("moises", -110, "raise", { glow: 0.6, dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
        C("multidao", 220, "stand", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ], props: [
        { ...P("sun", -230, 1.2, undefined, 0.6), sky: true },
        { ...P("tree", 60, 1.25, undefined, 0.2), tag: "caminho-da-vida" },
        P("grapes", 150, 1.05, undefined, 0.5),
        { ...P("firmament", 0, 1.2, undefined, 0.85), sky: true },
        { ...P("rock", 300, 1.0, undefined, 0.3), tag: "caminho-da-morte" },
      ] }),
      // v.20 — POIS ELE É A TUA VIDA: amar, ouvir e achegar-se; ficar na terra jurada aos pais.
      b(20, { by: "moises", q: "ele é a tua vida", env: { glory: 0.95 }, cast: [ // pois ELE É A TUA VIDA e o prolongamento dos teus dias
        C("moises", -130, "raise", { glow: 0.5, dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
        C("multidao", 220, "stand", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ], props: [
        P("tree", 60, 1.25, undefined, 0.2),
        P("river", 300, 1.2, undefined, 0.2),
      ] }),
    ],
  },
};
