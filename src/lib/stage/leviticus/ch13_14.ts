// ============================================================================
// LEVÍTICO 13–14 — CENA VIVA. A praga da lepra e a purificação do leproso.
//
// Lev 13 — O DIAGNÓSTICO: o sacerdote examina a praga na pele, na roupa, no
// couro; declara limpo ou imundo. O leproso, imundo, anda de vestes rasgadas
// clamando "Imundo, imundo!", e habita SÓ, fora do arraial (v.45-46) — imagem
// viva do que o pecado faz: separa.
//
// Lev 14 — A PURIFICAÇÃO: o sacerdote sai FORA do arraial ao encontro do curado
// (a graça vai buscar o excluído). O rito das DUAS AVES: uma degolada sobre
// águas vivas, a outra molhada no sangue e SOLTA viva sobre o campo — o preço
// pago e a vida libertada. Depois, lavado e rapado, o purificado volta; ao
// oitavo dia, as ofertas o restauram. Até a lepra da CASA é tratada.
//
// A VOZ DE DEUS (regra do projeto): a lei vem do alto (`by: "deus"`), sem
// figura. O sacerdote é `arao`; o afligido/curado é `homem`; a ave solta é o
// prop `birds`, subindo livre ao céu.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// A PORTA DO ARRAIAL: onde o sacerdote examina a praga — as tendas atrás, o
// deserto à frente, o exame à luz do dia.
const PORTA: StagePropSpec[] = [
  P("tent", -260, 1.1, undefined, 0.16),
  P("tent", -180, 0.9, undefined, 0.28),
  { ...P("tent", 40, 1.25, undefined, 0.12), tag: "tabernaculo" },
  P("palm", 250, 1.0, undefined, 0.16),
  P("rock", 300, 0.95, undefined, 0.5),
  P("amphora", 150, 0.8, undefined, 0.6),
  P("grass", -60, 0.8, undefined, 0.8),
];
// FORA DO ARRAIAL: onde o leproso habita só e onde o sacerdote vai ao seu
// encontro na purificação — a solidão do deserto, uma tenda ao longe.
const FORA: StagePropSpec[] = [
  P("tent", 260, 0.85, undefined, 0.14),
  P("rock", -280, 1.1, undefined, 0.44),
  P("rock", 300, 1.0, undefined, 0.52),
  P("palm", -200, 0.9, undefined, 0.16),
  P("bush", 120, 0.75, undefined, 0.4),
  P("grass", -40, 0.78, undefined, 0.8),
];
// A PURIFICAÇÃO (Lev 14:4-7): as águas vivas, e a AVE VIVA solta ao céu.
const PURIFICACAO: StagePropSpec[] = [
  ...FORA,
  P("river", 60, 1.0, undefined, 0.56),
  { kind: "birds", dx: 20, scale: 1, dy: 0.7, sky: true },
];
// O ENCERRAMENTO DE SETE DIAS (Lev 13:4-5,21,26,31,33): a tenda apartada onde o
// sacerdote fecha o que tem a praga, longe do movimento do arraial — a espera
// solitária entre um exame e o outro.
const ENCERRO: StagePropSpec[] = [
  P("tent", 30, 1.2, undefined, 0.22),
  P("rock", -290, 1.05, undefined, 0.46),
  P("rock", 280, 0.95, undefined, 0.54),
  P("palm", -210, 0.9, undefined, 0.14),
  P("bush", 150, 0.72, undefined, 0.38),
  P("grass", -60, 0.78, undefined, 0.8),
];
// O EXAME COM AS VESTES A LAVAR (Lev 13:6,34): declarado limpo, lava as vestes.
const PORTA_LAVAR: StagePropSpec[] = [...PORTA, P("crate", -20, 0.85, undefined, 0.66)];
// A QUEIMADURA DE FOGO (Lev 13:24-28): a chaga que floresceu onde o fogo queimou.
const QUEIMADURA: StagePropSpec[] = [...PORTA, P("campfire", -30, 1.1, 1, 0.64)];
// A OFERTA DO POBRE (Lev 14:21-22): um só cordeiro, a dízima de flor de farinha
// amassada com azeite, o logue de azeite e duas aves — o que a mão alcança.
const OFERTA_POBRE: StagePropSpec[] = [
  ...PORTA,
  P("bowl", -20, 0.9, undefined, 0.64),
  { kind: "birds", dx: 90, scale: 0.85, dy: 0.62, sky: true },
];
// O OITAVO DIA DO POBRE (Lev 14:23-31): à porta da tenda, o altar, o azeite e as
// duas rolas — a mesma expiação, ao alcance de quem nada tem.
const ALTAR_POBRE: StagePropSpec[] = [
  { ...P("tent", -40, 1.3, undefined, 0.1), tag: "tabernaculo" },
  { ...P("altar", 80, 1.25, 0.75, 0.44), tag: "altar-holocausto" },
  P("bowl", -170, 0.9, undefined, 0.6),
  P("crate", -250, 0.85, undefined, 0.64),
  P("palm", 260, 1.0, undefined, 0.16),
  { kind: "birds", dx: 40, scale: 0.85, dy: 0.66, sky: true },
  P("grass", -60, 0.8, undefined, 0.82),
];

const dv = (v: number) => b(v, { by: "deus" });   // versículo de instrução (voz do céu)

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 13
  13: {
    start: { terrain: "desert", night: 0.1, glory: 0.55, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: PORTA, env: { terrain: "desert", glory: 0.58, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés e a Arão
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -100, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "será levado a Arão", cast: [                          // a praga na pele: será levado ao sacerdote
        C("arao", 30, "stand", { dy: 0.52, facing: -1 }),
        C("homem", -40, "stand", { dy: 0.54, facing: 1, id: "afligido" }),
      ] }),
      b(3, { by: "deus", q: "o declarará por imundo", cast: [                      // o sacerdote examina; se for lepra, declara imundo
        C("arao", 20, "point", { dy: 0.52, facing: -1 }),
        C("homem", -40, "stand", { dy: 0.54, facing: 1, id: "afligido" }),
      ] }),
      // ---- v.4-6 — A MANCHA BRANCA: os dois encerramentos e o veredicto LIMPO.
      b(4, { by: "deus", set: "encerro", props: ENCERRO, env: { terrain: "desert", night: 0.22, glory: 0.4 }, cast: [ // o sacerdote encerra o que tem a praga por sete dias
        C("servo", -70, "point", { dy: 0.5, facing: 1, id: "sacerdote-exame" }),
        C("homem", 60, "stand", { dy: 0.56, facing: -1, id: "afligido" }),
      ] }),
      b(5, { by: "deus", env: { night: 0.26, glory: 0.36 }, cast: [                // ao sétimo dia examina: a praga parou — encerra outros sete dias
        C("servo", 20, "point", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("homem", -60, "stand", { dy: 0.56, facing: 1, id: "afligido" }),
      ] }),
      b(6, { by: "deus", q: "o declarará por limpo", set: "porta", props: PORTA_LAVAR, env: { terrain: "desert", night: 0.1, glory: 0.76 }, cast: [ // é pústula: declarado LIMPO, lava as vestes
        C("servo", 40, "raise", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("homem", -50, "raise", { dy: 0.56, facing: 1, id: "afligido" }),
      ] }),
      // ---- v.7-8 — A PÚSTULA QUE SE ESTENDE: outra vez mostrado, e IMUNDO.
      b(7, { by: "deus", props: PORTA, env: { glory: 0.5, night: 0.14 }, cast: [   // a pústula se estendeu: outra vez será mostrado ao sacerdote
        C("homem", -90, "walk", { dy: 0.56, facing: 1, id: "afligido" }),
        C("servo", 50, "stand", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
      ] }),
      b(8, { by: "deus", q: "o declarará por imundo; é lepra", env: { glory: 0.26, night: 0.3 }, cast: [ // "o sacerdote o declarará por imundo; é lepra"
        C("servo", 50, "point", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("homem", -60, "bow", { dy: 0.58, facing: 1, id: "afligido" }),
      ] }),
      // ---- v.9-11 — A LEPRA INVETERADA: nem se encerra, porque imundo é.
      b(9, { by: "deus", q: "será levado ao sacerdote", env: { glory: 0.42, night: 0.2 }, cast: [ // havendo praga de lepra no homem, será levado ao sacerdote
        C("homem", -120, "walk", { dy: 0.56, facing: 1, id: "inveterado" }),
        C("servo", 30, "stand", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
      ] }),
      b(10, { by: "deus", cast: [                                                  // inchação branca, o pêlo em branco, e carne viva na inchação
        C("servo", 10, "kneel", { dy: 0.52, facing: -1, id: "sacerdote-exame" }),
        C("homem", -50, "stand", { dy: 0.58, facing: 1, id: "inveterado" }),
      ] }),
      b(11, { by: "deus", q: "não o encerrará, porque imundo é", set: "fora", props: FORA, env: { terrain: "desert", glory: 0.2, night: 0.34 }, cast: [ // lepra inveterada: não o encerrará, porque imundo é
        C("homem", 10, "bow", { dy: 0.56, id: "inveterado" }),
      ] }),
      // ---- v.12-13 — A LEPRA QUE COBRE TUDO: todo se tornou branco, LIMPO está.
      b(12, { by: "deus", set: "porta", props: PORTA, env: { terrain: "desert", night: 0.14, glory: 0.5 }, cast: [ // a lepra cobre toda a pele, da cabeça aos pés
        C("servo", 40, "point", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("homem", -50, "stand", { dy: 0.56, facing: 1, id: "coberto" }),
      ] }),
      b(13, { by: "deus", q: "todo se tornou branco; limpo está", env: { glory: 0.78, night: 0.1 }, cast: [ // "todo se tornou branco; limpo está"
        C("servo", 40, "raise", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("homem", -50, "raise", { dy: 0.56, facing: 1, id: "coberto" }),
      ] }),
      // ---- v.14-15 — A CARNE VIVA: no dia em que aparecer, será imundo.
      b(14, { by: "deus", q: "aparecer nela carne viva será imundo", env: { glory: 0.3, night: 0.26 }, cast: [ // mas no dia em que aparecer nela carne viva, será imundo
        C("homem", -30, "stand", { dy: 0.58, id: "coberto" }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
      ] }),
      b(15, { by: "deus", q: "a carne é imunda; é lepra", set: "fora", props: FORA, env: { terrain: "desert", glory: 0.18, night: 0.36 }, cast: [ // vendo a carne viva, declará-lo-á imundo: a carne é imunda
        C("homem", -10, "kneel", { dy: 0.58, id: "coberto" }),
      ] }),
      // ---- v.16-17 — A CARNE VIVA QUE TORNA BRANCA: limpo está.
      b(16, { by: "deus", q: "então virá ao sacerdote", set: "porta", props: PORTA, env: { terrain: "desert", night: 0.12, glory: 0.46 }, cast: [ // tornando-se a carne viva em branca, virá ao sacerdote
        C("homem", -120, "walk", { dy: 0.56, facing: 1, id: "coberto" }),
        C("servo", 30, "stand", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
      ] }),
      b(17, { by: "deus", q: "limpo está", env: { glory: 0.8, night: 0.1 }, cast: [ // a praga se tornou branca: o sacerdote o declara limpo
        C("servo", 30, "raise", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("homem", -60, "raise", { dy: 0.56, facing: 1, id: "coberto" }),
      ] }),
      // ---- v.18-20 — A ÚLCERA SARADA que volta em inchação branca: IMUNDO.
      b(18, { by: "deus", env: { glory: 0.58, night: 0.12 }, cast: [                // a carne em cuja pele houve úlcera, e sarou
        C("homem", 0, "stand", { dy: 0.56, id: "ulcerado" }),
      ] }),
      b(19, { by: "deus", q: "mostrar-se-á então ao sacerdote", env: { glory: 0.48 }, cast: [ // no lugar da úlcera, inchação branca: mostra-se ao sacerdote
        C("homem", -60, "stand", { dy: 0.56, facing: 1, id: "ulcerado" }),
        C("servo", 40, "point", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
      ] }),
      b(20, { by: "deus", q: "é praga da lepra que brotou da pústula", env: { glory: 0.24, night: 0.32 }, cast: [ // mais funda e o pêlo branco: IMUNDO, lepra que brotou da pústula
        C("servo", 40, "point", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("homem", -60, "bow", { dy: 0.58, facing: 1, id: "ulcerado" }),
      ] }),
      // ---- v.21-23 — O ENCERRAMENTO da mancha encolhida, e o seu desfecho.
      b(21, { by: "deus", q: "o encerrará por sete dias", set: "encerro", props: ENCERRO, env: { terrain: "desert", night: 0.24, glory: 0.38 }, cast: [ // sem pêlo branco e encolhida: encerra-o por sete dias
        C("servo", -80, "point", { dy: 0.5, facing: 1, id: "sacerdote-exame" }),
        C("homem", 50, "stand", { dy: 0.56, facing: -1, id: "ulcerado" }),
      ] }),
      b(22, { by: "deus", q: "o declarará por imundo; praga é", env: { glory: 0.2, night: 0.34 }, cast: [ // se grandemente se estender: IMUNDO, praga é
        C("homem", 20, "bow", { dy: 0.58, id: "ulcerado" }),
      ] }),
      b(23, { by: "deus", q: "o declarará por limpo", set: "porta", props: PORTA_LAVAR, env: { terrain: "desert", night: 0.1, glory: 0.76 }, cast: [ // mas se a mancha parou: inflamação da pústula, LIMPO
        C("servo", 40, "raise", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("homem", -50, "raise", { dy: 0.56, facing: 1, id: "ulcerado" }),
      ] }),
      // ---- v.24-28 — A QUEIMADURA DE FOGO: a mancha que floresce na cicatriz.
      b(24, { by: "deus", q: "queimadura de fogo", set: "queimadura", props: QUEIMADURA, env: { terrain: "desert", night: 0.16, glory: 0.5, fire: 0.5 }, cast: [ // na pele há queimadura de fogo, e na cicatriz uma mancha lustrosa
        C("homem", 70, "stand", { dy: 0.56, facing: -1, id: "queimado-praga" }),
        C("servo", -110, "walk", { dy: 0.5, facing: 1, id: "sacerdote-exame" }),
      ] }),
      b(25, { by: "deus", q: "o declarará por imundo; é praga de lepra", env: { glory: 0.24, night: 0.3 }, cast: [ // lepra que floresceu pela queimadura: IMUNDO
        C("servo", 50, "point", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("homem", -60, "bow", { dy: 0.58, facing: 1, id: "queimado-praga" }),
      ] }),
      b(26, { by: "deus", q: "o encerrará por sete dias", set: "encerro", props: ENCERRO, env: { terrain: "desert", night: 0.26, glory: 0.36, fire: 0 }, cast: [ // sem pêlo branco e recolhida: encerra-o por sete dias
        C("homem", 40, "kneel", { dy: 0.58, id: "queimado-praga" }),
      ] }),
      b(27, { by: "deus", q: "o declarará por imundo; é praga de lepra", env: { glory: 0.2, night: 0.34 }, cast: [ // ao sétimo dia, se se estendeu grandemente: IMUNDO
        C("servo", -70, "point", { dy: 0.5, facing: 1, id: "sacerdote-exame" }),
        C("homem", 50, "bow", { dy: 0.58, facing: -1, id: "queimado-praga" }),
      ] }),
      b(28, { by: "deus", q: "porque inflamação é da queimadura", set: "porta", props: PORTA_LAVAR, env: { terrain: "desert", night: 0.1, glory: 0.74 }, cast: [ // a mancha parou: é inchação da queimadura — LIMPO
        C("servo", 40, "raise", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("homem", -50, "raise", { dy: 0.56, facing: 1, id: "queimado-praga" }),
      ] }),
      // ---- v.29-37 — A TINHA na cabeça ou na barba, de homem ou de MULHER.
      b(29, { by: "deus", q: "homem ou mulher tiver chaga na cabeça ou na barba", props: PORTA, env: { glory: 0.5, night: 0.14 }, cast: [ // homem ou mulher com chaga na cabeça ou na barba
        C("mulherComum", -70, "stand", { dy: 0.56, facing: 1, id: "tinhosa" }),
        C("homem", -150, "stand", { dy: 0.5, facing: 1, id: "tinhoso" }),
        C("servo", 50, "point", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
      ] }),
      b(30, { by: "deus", q: "é tinha, é lepra da cabeça ou da barba", env: { glory: 0.24, night: 0.3 }, cast: [ // pêlo amarelo fino e mais funda: IMUNDO, é tinha
        C("servo", 40, "point", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("mulherComum", -60, "bow", { dy: 0.58, facing: 1, id: "tinhosa" }),
      ] }),
      b(31, { by: "deus", q: "por sete dias", set: "encerro", props: ENCERRO, env: { terrain: "desert", night: 0.24, glory: 0.38 }, cast: [ // não sendo mais funda nem tendo pêlo preto: encerra por sete dias
        C("mulherComum", 30, "kneel", { dy: 0.58, id: "tinhosa" }),
      ] }),
      b(32, { by: "deus", env: { glory: 0.42, night: 0.22 }, cast: [                // ao sétimo dia: a tinha não se estendeu, nem há pêlo amarelo
        C("servo", -80, "kneel", { dy: 0.52, facing: 1, id: "sacerdote-exame" }),
        C("mulherComum", 50, "stand", { dy: 0.56, facing: -1, id: "tinhosa" }),
      ] }),
      b(33, { by: "deus", q: "encerrará o que tem a tinha por sete dias", env: { glory: 0.36, night: 0.26 }, cast: [ // rapa-se ao redor, mas não a tinha; encerra segunda vez
        C("mulherComum", 20, "kneel", { dy: 0.58, id: "tinhosa" }),
        C("servo", -110, "point", { dy: 0.5, facing: 1, id: "sacerdote-exame" }),
      ] }),
      b(34, { by: "deus", q: "e lavará as suas vestes, e será limpo", set: "porta", props: PORTA_LAVAR, env: { terrain: "desert", night: 0.1, glory: 0.78 }, cast: [ // a tinha não se estendeu: LIMPO; lavará as vestes
        C("servo", 40, "raise", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("mulherComum", -50, "raise", { dy: 0.56, facing: 1, id: "tinhosa" }),
      ] }),
      b(35, { by: "deus", env: { glory: 0.4, night: 0.2 }, cast: [                  // mas a tinha, depois da purificação, estendeu-se grandemente
        C("mulherComum", -60, "stand", { dy: 0.56, facing: 1, id: "tinhosa" }),
        C("servo", 50, "walk", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
      ] }),
      b(36, { by: "deus", q: "imundo está", env: { glory: 0.18, night: 0.34 }, cast: [ // estendendo-se, nem busca pêlo amarelo: imundo está
        C("servo", 40, "point", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("mulherComum", -60, "bow", { dy: 0.58, facing: 1, id: "tinhosa" }),
      ] }),
      b(37, { by: "deus", q: "a tinha está sã, limpo está", env: { glory: 0.8, night: 0.1 }, cast: [ // a tinha parou e cresceu pêlo preto: está sã, LIMPO
        C("servo", 40, "raise", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("mulherComum", -50, "raise", { dy: 0.56, facing: 1, id: "tinhosa" }),
      ] }),
      // ---- v.38-39 — AS MANCHAS LUSTROSAS: é impigem, limpo está.
      b(38, { by: "deus", q: "manchas lustrosas brancas na pele da sua carne", env: { glory: 0.55, night: 0.12 }, cast: [ // homem ou mulher com manchas lustrosas brancas na pele
        C("homem", -140, "stand", { dy: 0.5, facing: 1, id: "impigem" }),
        C("mulherComum", -60, "stand", { dy: 0.56, facing: 1, id: "impigem-mulher" }),
        C("servo", 50, "stand", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
      ] }),
      b(39, { by: "deus", q: "é impigem que floresceu na pele, limpo está", env: { glory: 0.8, night: 0.1 }, cast: [ // manchas escurecidas: é impigem — limpo está
        C("servo", 50, "raise", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
        C("mulherComum", -60, "raise", { dy: 0.56, facing: 1, id: "impigem-mulher" }),
        C("homem", -150, "raise", { dy: 0.5, facing: 1, id: "impigem" }),
      ] }),
      // ---- v.40-44 — A CALVA: limpa em si; mas a praga na calva é LEPRA.
      b(40, { by: "deus", q: "calvo é, mas limpo está", env: { glory: 0.72 }, cast: [ // caindo-lhe os cabelos da cabeça: calvo é, mas limpo está
        C("homem", 20, "stand", { dy: 0.56, facing: -1, id: "calvo" }),
        C("servo", -90, "stand", { dy: 0.5, facing: 1, id: "sacerdote-exame" }),
      ] }),
      b(41, { by: "deus", q: "meio calvo é; mas limpo está", env: { glory: 0.7 }, cast: [ // caindo-lhe os cabelos na frente: meio calvo, mas limpo está
        C("homem", -40, "stand", { dy: 0.56, facing: 1, id: "calvo" }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
      ] }),
      b(42, { by: "deus", q: "é lepra", env: { glory: 0.34, night: 0.22 }, cast: [  // mas praga branca avermelhada na calva: é lepra florescendo
        C("homem", -40, "stand", { dy: 0.58, facing: 1, id: "calvo" }),
        C("servo", 60, "point", { dy: 0.5, facing: -1, id: "sacerdote-exame" }),
      ] }),
      b(43, { by: "deus", env: { glory: 0.28, night: 0.28 }, cast: [                // o sacerdote examina a inchação branca tirando a vermelho na calva
        C("servo", 30, "kneel", { dy: 0.52, facing: -1, id: "sacerdote-exame" }),
        C("homem", -50, "stand", { dy: 0.58, facing: 1, id: "calvo" }),
      ] }),
      b(44, { by: "deus", q: "o declarará totalmente por imundo", set: "fora", props: FORA, env: { terrain: "desert", night: 0.34, glory: 0.16 }, cast: [ // "Leproso é aquele homem, imundo está" — totalmente imundo
        C("homem", 0, "bow", { dy: 0.56, id: "calvo" }),
      ] }),
      // v.45-46 — O LEPROSO ISOLADO: vestes rasgadas, "Imundo, imundo!", só.
      b(45, { by: "deus", q: "Imundo, imundo", env: { glory: 0.2, night: 0.3 }, cast: [ // o leproso de vestes rasgadas clama: "Imundo, imundo!"
        C("homem", 20, "bow", { dy: 0.54, id: "leproso" }),
      ] }),
      b(46, { by: "deus", q: "a sua habitação será fora do arraial", set: "fora", props: FORA, env: { terrain: "desert", night: 0.22, glory: 0.35 }, cast: [ // habitará SÓ; a sua habitação será fora do arraial
        C("homem", 0, "stand", { dy: 0.54, id: "leproso" }),
      ] }),
      // v.47-59 — a lepra nas VESTES: examinada, lavada, ou queimada no fogo.
      b(47, { by: "deus", set: "porta", props: [...PORTA, P("crate", -20, 0.85, undefined, 0.6)], env: { terrain: "desert", night: 0.1, glory: 0.55 }, cast: [ // a praga da lepra na veste de lã ou de linho
        C("arao", 30, "point", { dy: 0.52, facing: -1 }),
      ] }),
      dv(48), dv(49), dv(50), dv(51),
      b(52, { by: "deus", env: { fire: 0.5 } }),                                   // a veste com lepra maligna: queimada no fogo
      dv(53), dv(54), dv(55),
      b(56, { by: "deus" }), b(57, { by: "deus", env: { fire: 0.4 } }),            // reexame; se reincide, queimada
      b(58, { by: "deus" }),
      b(59, { by: "deus", q: "Esta é a lei da praga da lepra", env: { glory: 0.6 } }), // a lei da lepra na roupa: declarar limpa ou imunda
    ],
  },

  // ------------------------------------------------------------------ Lev 14
  // A purificação do leproso — a graça que vai fora do arraial buscar o
  // excluído, o rito das duas aves (uma morta, uma solta viva), a restauração.
  14: {
    start: { terrain: "desert", night: 0.14, glory: 0.5, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", set: "fora", props: FORA, env: { terrain: "desert", glory: 0.55, night: 0.14, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "Esta será a lei do leproso no dia da sua purificação", cast: [ // a lei do leproso no dia da purificação
        C("homem", 40, "stand", { dy: 0.54, id: "curado" }),
      ] }),
      b(3, { by: "deus", q: "o sacerdote sairá fora do arraial", cast: [           // o sacerdote SAI fora do arraial e o examina
        C("arao", -20, "walk", { dy: 0.5, facing: 1 }),
        C("homem", 60, "stand", { dy: 0.54, id: "curado" }),
      ] }),
      b(4, { by: "deus", q: "duas aves vivas e limpas", props: [...FORA, { kind: "birds", dx: 30, scale: 0.9, dy: 0.5, sky: true }], cast: [ // duas aves vivas, pau de cedro, carmesim e hissopo
        C("arao", -20, "point", { dy: 0.5, facing: 1 }),
        C("homem", 60, "stand", { dy: 0.54, id: "curado" }),
      ] }),
      b(5, { by: "deus", props: [...FORA, P("river", 60, 1.0, undefined, 0.56)], cast: [ // uma ave degolada num vaso sobre águas vivas
        C("arao", 30, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
      b(6, { by: "deus" }),                                                        // a ave viva e os ramos molhados no sangue
      b(7, { by: "deus", q: "soltará a ave viva sobre a face do campo", set: "purificacao", props: PURIFICACAO, env: { glory: 0.75 }, cast: [ // asperge sete vezes; declara limpo e SOLTA a ave viva
        C("arao", -30, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 40, "raise", { dy: 0.54, id: "curado" }),
      ] }),
      b(8, { by: "deus", set: "fora", props: FORA, env: { glory: 0.6 }, cast: [    // lava as vestes, rapa o pêlo, lava-se: entra no arraial
        C("homem", 20, "stand", { dy: 0.54, id: "curado" }),
      ] }),
      dv(9),
      b(10, { by: "deus", set: "porta", props: PORTA, env: { terrain: "desert", night: 0.1, glory: 0.6 }, cast: [ // ao oitavo dia: dois cordeiros e uma cordeira sem defeito
        C("homem", -40, "stand", { dy: 0.54, id: "curado" }),
        C("cordeiro", 120, "stand", { dy: 0.46, scale: 0.66, id: "cordeiro-of" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      dv(11), dv(12), dv(13),
      b(14, { by: "deus", q: "sobre a ponta da orelha direita", cast: [            // o sangue na orelha, no polegar da mão e do pé do purificado
        C("arao", 20, "point", { dy: 0.5, facing: -1 }),
        C("homem", -30, "stand", { dy: 0.54, id: "curado" }),
      ] }),
      dv(15), dv(16), dv(17), dv(18), dv(19),
      b(20, { by: "deus", q: "assim o sacerdote fará expiação por ele, e será limpo", env: { fire: 0.6, glory: 0.75 }, cast: [ // o holocausto e a oferta no altar: expiação, e será limpo
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
        C("homem", -40, "bow", { dy: 0.54, id: "curado" }),
      ] }),
      // ---- v.21-32 — A PURIFICAÇÃO DO POBRE: a mesma lei, ao alcance da mão
      // que não pode tanto — um só cordeiro e duas aves em vez de três reses.
      b(21, { by: "deus", q: "se for pobre", set: "pobre", props: OFERTA_POBRE, env: { terrain: "desert", night: 0.14, glory: 0.5, fire: 0 }, cast: [ // se for pobre: um cordeiro, a dízima de flor de farinha e um logue de azeite
        C("homem", -60, "stand", { dy: 0.56, facing: 1, id: "pobre" }),
        C("cordeiro", 110, "stand", { dy: 0.48, scale: 0.62, id: "cordeiro-pobre" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(22, { by: "deus", q: "conforme as suas posses", env: { glory: 0.56 }, cast: [ // duas rolas ou dois pombinhos, conforme as suas posses
        C("homem", -50, "raise", { dy: 0.56, facing: 1, id: "pobre" }),
        C("arao", 50, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(23, { by: "deus", q: "ao oitavo dia da sua purificação", set: "altar-pobre", props: ALTAR_POBRE, env: { terrain: "desert", night: 0.12, glory: 0.62 }, cast: [ // ao oitavo dia os traz ao sacerdote, à porta da tenda
        C("homem", -110, "walk", { dy: 0.56, facing: 1, id: "pobre" }),
        C("cordeiro", -20, "stand", { dy: 0.5, scale: 0.62, id: "cordeiro-pobre" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(24, { by: "deus", q: "por oferta movida perante o Senhor", env: { glory: 0.68 }, cast: [ // o sacerdote move o cordeiro e o logue de azeite perante o Senhor
        C("arao", 30, "raise", { dy: 0.5, facing: -1 }),
        C("cordeiro", -20, "stand", { dy: 0.5, scale: 0.62, id: "cordeiro-pobre" }),
        C("homem", -110, "stand", { dy: 0.56, facing: 1, id: "pobre" }),
      ] }),
      b(25, { by: "deus", q: "sobre a ponta da orelha direita", env: { glory: 0.6, night: 0.16 }, cast: [ // degolado o cordeiro, o SANGUE na orelha, no polegar da mão e do pé
        C("arao", 20, "kneel", { dy: 0.5, facing: -1 }),
        C("homem", -60, "stand", { dy: 0.56, facing: 1, id: "pobre" }),
      ] }),
      b(26, { by: "deus", props: [...ALTAR_POBRE, P("amphora", 190, 0.85, undefined, 0.6)], env: { glory: 0.64 }, cast: [ // derrama do AZEITE na palma da sua própria mão esquerda
        C("arao", 0, "stand", { dy: 0.5, facing: -1 }),
        C("homem", -80, "stand", { dy: 0.56, facing: 1, id: "pobre" }),
      ] }),
      b(27, { by: "deus", q: "sete vezes perante o Senhor", env: { glory: 0.78 }, cast: [ // asperge do azeite SETE VEZES perante o Senhor
        C("arao", -10, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(28, { by: "deus", q: "no lugar do sangue da expiação da culpa", env: { glory: 0.72 }, cast: [ // o azeite na orelha, no polegar da mão e do pé, sobre o sangue
        C("arao", 20, "point", { dy: 0.5, facing: -1 }),
        C("homem", -60, "stand", { dy: 0.56, facing: 1, id: "pobre" }),
      ] }),
      b(29, { by: "deus", q: "sobre a cabeça daquele que tem de purificar-se", env: { glory: 0.82 }, cast: [ // o que sobeja do azeite, sobre a CABEÇA do purificado
        C("arao", 10, "raise", { dy: 0.5, facing: -1 }),
        C("homem", -50, "bow", { dy: 0.56, facing: 1, id: "pobre" }),
      ] }),
      b(30, { by: "deus", q: "conforme suas posses", props: [...ALTAR_POBRE, { kind: "birds", dx: -110, scale: 0.8, dy: 0.78, sky: true }], env: { glory: 0.76, fire: 0.55 }, cast: [ // oferece uma das rolas ou um dos pombinhos, conforme as posses
        C("arao", 50, "raise", { dy: 0.5, facing: -1 }),
        C("homem", -70, "kneel", { dy: 0.56, facing: 1, id: "pobre" }),
      ] }),
      b(31, { by: "deus", q: "fará expiação por aquele que tem de purificar-se", env: { glory: 0.88, fire: 0.65 }, cast: [ // um pela expiação, outro em holocausto: e fará expiação por ele
        C("arao", 50, "raise", { dy: 0.5, facing: -1 }),
        C("homem", -60, "bow", { dy: 0.56, facing: 1, id: "pobre" }),
      ] }),
      b(32, { by: "deus", q: "Esta é a lei daquele em quem estiver a praga da lepra", set: "porta", props: PORTA, env: { terrain: "desert", night: 0.1, glory: 0.72, fire: 0 }, cast: [ // esta é a lei de quem não alcança o devido para a purificação
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -100, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      // v.33-53 — A LEPRA NA CASA: examinada, as pedras arrancadas, ou a casa
      // derribada; e a mesma purificação das duas aves para a casa limpa.
      b(33, { by: "deus", set: "casa", props: [{ ...P("door", 0, 1.3, undefined, 0.34), tag: "casa-lepra" }, P("tower", -260, 1.1, undefined, 0.1), P("palm", 240, 1.0, undefined, 0.14), P("rock", 300, 0.9, undefined, 0.5), P("grass", -60, 0.8, undefined, 0.8)], env: { terrain: "city", night: 0.12, glory: 0.5 }, cast: [ // o Senhor fala a Moisés e a Arão sobre a lepra da casa
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -100, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      dv(34), dv(35),
      b(36, { by: "deus", cast: [ C("arao", -30, "point", { dy: 0.5, facing: 1 }) ] }), // manda desocupar a casa antes do exame
      dv(37), dv(38), dv(39), dv(40), dv(41), dv(42), dv(43), dv(44),
      b(45, { by: "deus", q: "derribará a casa", env: { storm: 0.15 } }),           // a casa com lepra maligna: DERRIBADA para fora da cidade
      dv(46), dv(47), dv(48),
      b(49, { by: "deus", props: [{ ...P("door", 0, 1.3, undefined, 0.34), tag: "casa-lepra" }, { kind: "birds", dx: 60, scale: 0.9, dy: 0.6, sky: true }, P("tower", -260, 1.1, undefined, 0.1), P("palm", 240, 1.0, undefined, 0.14), P("grass", -60, 0.8, undefined, 0.8)], cast: [ // para expiar a casa: duas aves, cedro, carmesim e hissopo
        C("arao", 30, "point", { dy: 0.5, facing: -1 }),
      ] }),
      dv(50), dv(51),
      b(52, { by: "deus", q: "Assim expiará aquela casa", env: { glory: 0.65 } }),   // e assim expiará aquela casa com o sangue da ave
      b(53, { by: "deus", q: "e será limpa", env: { glory: 0.7 }, cast: [           // solta a ave viva fora da cidade: a casa será limpa
        C("arao", -20, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      // v.54-57 — o resumo da lei de toda a lepra.
      b(54, { by: "deus", set: "porta", props: PORTA, env: { terrain: "desert", night: 0.1, glory: 0.6 } }),
      dv(55), dv(56),
      b(57, { by: "deus", q: "Esta é a lei da lepra", env: { glory: 0.68 }, cast: [ // esta é a lei da lepra, para ensinar quando é limpo ou imundo
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -100, "stand", { dy: 0.5, facing: 1 }),
      ] }),
    ],
  },
};
