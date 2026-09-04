// ============================================================================
// LEVÍTICO 27 — CENA VIVA. Votos, avaliações e o dízimo. O FIM de Levítico.
//
// O livro que começou no altar termina na consagração voluntária: o que se
// dedica ao Senhor por voto — pessoas, animais, casas, campos — e o resgate de
// cada um segundo a avaliação do santuário. E o DÍZIMO da terra e do gado, que
// "é do Senhor; santo é ao Senhor" (v.30,32). Fecha com o selo de todo o livro:
// "Estes são os mandamentos que o Senhor ordenou a Moisés no monte Sinai".
//
// A VOZ DE DEUS (regra do projeto): tudo é instrução do alto (`by: "deus"`),
// da tenda, sem figura; o sacerdote avalia; o povo consagra os seus votos.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

const ATRIO: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.08), tag: "tabernaculo" },
  { ...P("altar", 70, 1.2, 0.6, 0.44), tag: "altar-holocausto" },
  P("tower", -300, 1.15, undefined, 0.06),
  P("palm", -250, 1.0, undefined, 0.16),
  P("crate", -140, 0.8, undefined, 0.62),
  P("stall", 200, 0.9, undefined, 0.5),
  P("grass", -60, 0.8, undefined, 0.82),
];

// A CASA CONSAGRADA (Lv 27:14-15): a moradia santificada ao Senhor, avaliada
// pelo sacerdote, e o resgate com a quinta parte a mais.
const CASA_VOTO: StagePropSpec[] = [
  P("tent", -60, 1.35, undefined, 0.14),
  P("door", 70, 1.1, undefined, 0.46),
  P("crate", 160, 0.85, undefined, 0.6),
  P("amphora", 230, 0.8, undefined, 0.62),
  P("palm", -280, 1.0, undefined, 0.14),
  P("grass", 0, 0.8, undefined, 0.84),
];
// O CAMPO SEMEADO DO VOTO (Lv 27:16-24): avaliado segundo a sua semente, um
// ômer de cevada por cinquenta siclos, contado até o ano do jubileu.
const CAMPO_VOTO: StagePropSpec[] = [
  P("sheaf", -120, 1.1, undefined, 0.44),
  P("sheaf", 60, 1.0, undefined, 0.5),
  P("rock", -240, 0.85, undefined, 0.56),
  P("tree", 280, 1.1, undefined, 0.12),
  P("bush", 160, 0.85, undefined, 0.4),
  P("grass", -30, 0.9, undefined, 0.82),
  P("grass", 120, 0.85, undefined, 0.76),
];

export const CHAPTERS: Record<number, StageScript> = {
  27: {
    start: { terrain: "desert", night: 0.1, glory: 0.68, storm: 0, fire: 0.5, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.7, fire: 0.5, night: 0.1 }, cast: [ // falou mais o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", 30, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(2, { by: "deus", q: "fizer particular voto", cast: [                      // quem fizer VOTO: segundo a avaliação, as pessoas ao Senhor
        C("homem", -50, "stand", { dy: 0.54, facing: 1, id: "votante" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      // v.3-8 — A AVALIAÇÃO DAS PESSOAS: diante do sacerdote desfilam o homem
      // na força da idade, a mulher, o jovem, a criança, o ancião e o pobre.
      b(3, { by: "deus", cast: [                                                   // o homem de vinte a sessenta anos: cinquenta siclos
        C("homem", -70, "stand", { dy: 0.54, facing: 1, id: "avaliado" }),
        C("arao", 40, "point", { dy: 0.52, facing: -1 }),
      ] }),
      b(4, { by: "deus", cast: [                                                   // se for mulher: trinta siclos
        C("mulherComum", -70, "stand", { dy: 0.54, facing: 1, id: "avaliada" }),
        C("arao", 40, "point", { dy: 0.52, facing: -1 }),
      ] }),
      b(5, { by: "deus", cast: [                                                   // de cinco a vinte anos: o jovem e a moça
        C("homem", -90, "stand", { dy: 0.54, facing: 1, id: "jovem", scale: 0.8 }),
        C("mulherComum", -30, "stand", { dy: 0.54, facing: 1, id: "moca", scale: 0.75 }),
        C("arao", 60, "point", { dy: 0.52, facing: -1 }),
      ] }),
      b(6, { by: "deus", cast: [                                                   // de um mês a cinco anos: a criança nos braços da mãe
        C("mulherComum", -70, "stand", { dy: 0.54, facing: 1, id: "mae" }),
        C("homem", -20, "stand", { dy: 0.56, facing: 1, id: "crianca", scale: 0.5 }),
        C("arao", 60, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(7, { by: "deus", cast: [                                                   // de sessenta anos e acima: o ancião diante do sacerdote
        C("anciao", -70, "stand", { dy: 0.54, facing: 1, id: "idoso" }),
        C("arao", 40, "point", { dy: 0.52, facing: -1 }),
      ] }),
      b(8, { by: "deus", env: { glory: 0.76 }, cast: [                             // o POBRE é avaliado conforme as suas posses: misericórdia
        C("homem", -60, "kneel", { dy: 0.56, facing: 1, id: "pobre" }),
        C("arao", 50, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      // v.9-13 — OS ANIMAIS VOTADOS: o que se oferece é santo; o imundo é
      // avaliado e resgatado com a quinta parte.
      b(9, { by: "deus", env: { glory: 0.78, fire: 0.55 }, cast: [                 // o animal que se oferece ao Senhor: tudo dele será SANTO
        C("arao", 40, "raise", { dy: 0.52, facing: -1 }),
        C("rebanho", -110, "walk", { dy: 0.46, facing: 1, id: "oferta" }),
      ] }),
      b(10, { by: "deus", cast: [                                                  // não se troca bom por mau: trocado, AMBOS ficam santos
        C("arao", 40, "point", { dy: 0.52, facing: -1 }),
        C("rebanho", -110, "stand", { dy: 0.46, facing: 1, id: "oferta" }),
        C("rebanho", -200, "stand", { dy: 0.42, facing: 1, id: "trocado" }),
      ] }),
      b(11, { by: "deus", env: { glory: 0.62 }, cast: [                            // o animal IMUNDO é apresentado diante do sacerdote
        C("homem", -160, "stand", { dy: 0.5, facing: 1, id: "dono" }),
        C("rebanho", -80, "walk", { dy: 0.46, facing: 1, id: "imundo" }),
        C("arao", 50, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(12, { by: "deus", cast: [                                                  // o sacerdote o avaliará, bom ou mau: assim será
        C("arao", 50, "point", { dy: 0.52, facing: -1 }),
        C("rebanho", -80, "stand", { dy: 0.46, facing: 1, id: "imundo" }),
      ] }),
      b(13, { by: "deus", props: [...ATRIO, P("bowl", -60, 0.85, undefined, 0.64)], env: { glory: 0.7 }, cast: [ // o resgate: a avaliação MAIS a sua quinta parte
        C("homem", -140, "kneel", { dy: 0.54, facing: 1, id: "dono" }),
        C("arao", 50, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      // v.14-15 — A CASA CONSAGRADA.
      b(14, { by: "deus", set: "casa", props: CASA_VOTO, env: { glory: 0.72, fire: 0, verdure: 0.4 }, cast: [ // quem santifica a sua CASA: o sacerdote a avaliará
        C("homem", -140, "stand", { dy: 0.52, facing: 1, id: "dono-da-casa" }),
        C("arao", -20, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      b(15, { by: "deus", props: [...CASA_VOTO, P("bowl", -80, 0.8, undefined, 0.64)], cast: [ // para resgatá-la: a quinta parte do dinheiro a mais
        C("homem", -150, "kneel", { dy: 0.54, facing: 1, id: "dono-da-casa" }),
        C("arao", -20, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      // v.16-24 — O CAMPO DO VOTO: avaliado pela semente, contado do jubileu,
      // resgatado com o quinto — ou saindo santo ao Senhor.
      b(16, { by: "deus", set: "campo", props: CAMPO_VOTO, env: { terrain: "field", glory: 0.75, verdure: 0.6 }, cast: [ // o CAMPO santificado: avaliado segundo a sua semente
        C("homem", -100, "stand", { dy: 0.52, facing: 1, id: "lavrador" }),
        C("arao", 30, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(17, { by: "deus", props: [...CAMPO_VOTO, P("trumpet", -300, 1.0, undefined, 0.42)], env: { glory: 0.8 }, cast: [ // santificado DESDE o ano do jubileu, vale a avaliação cheia
        C("homem", -100, "raise", { dy: 0.52, facing: 1, id: "lavrador" }),
        C("arao", 30, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(18, { by: "deus", env: { glory: 0.7 }, cast: [                             // DEPOIS do jubileu, o sacerdote conta os anos restantes
        C("arao", 30, "point", { dy: 0.5, facing: -1 }),
        C("homem", -100, "stand", { dy: 0.52, facing: 1, id: "lavrador" }),
      ] }),
      b(19, { by: "deus", props: [...CAMPO_VOTO, P("bowl", -30, 0.8, undefined, 0.64)], cast: [ // resgatando o campo, acrescenta a quinta parte e fica seu
        C("homem", -110, "kneel", { dy: 0.54, facing: 1, id: "lavrador" }),
        C("arao", 30, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(20, { by: "deus", env: { night: 0.22, glory: 0.55 }, cast: [               // vendido a outro homem, NUNCA MAIS se resgatará
        C("homem", -180, "walk", { dy: 0.5, facing: -1, id: "lavrador" }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "outro-homem" }),
      ] }),
      b(21, { by: "deus", env: { night: 0.1, glory: 0.85 }, cast: [                // saindo no jubileu, será SANTO ao Senhor, do sacerdote
        C("arao", 30, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(22, { by: "deus", env: { glory: 0.72 }, cast: [                            // o campo COMPRADO, que não é da possessão herdada
        C("homem", -90, "stand", { dy: 0.52, facing: 1, id: "comprador" }),
        C("arao", 30, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(23, { by: "deus", cast: [                                                  // o sacerdote conta o valor até o jubileu: dado no mesmo dia
        C("arao", 30, "point", { dy: 0.5, facing: -1 }),
        C("homem", -90, "bow", { dy: 0.52, facing: 1, id: "comprador" }),
      ] }),
      b(24, { by: "deus", props: [...CAMPO_VOTO, P("trumpet", -300, 1.0, undefined, 0.42)], env: { glory: 0.82 }, cast: [ // no jubileu o campo TORNA àquele de quem era a possessão
        C("homem", -180, "walk", { dy: 0.5, facing: -1, id: "possuidor" }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "comprador" }),
      ] }),
      // v.25-29 — O SICLO DO SANTUÁRIO, o primogênito que já é do Senhor e o
      // ANÁTEMA que não se resgata: a noite sobe sobre a palavra mais grave.
      b(25, { by: "deus", set: "atrio", props: [...ATRIO, P("bowl", -70, 0.9, undefined, 0.62)], env: { terrain: "desert", glory: 0.75, fire: 0.5, verdure: 0.2, night: 0.1 }, cast: [ // toda avaliação pelo SICLO do santuário: vinte geras
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("arao", 40, "point", { dy: 0.52, facing: -1 }),
      ] }),
      b(26, { by: "deus", env: { glory: 0.8 }, cast: [                             // o PRIMOGÊNITO ninguém o santifica: já é do Senhor
        C("arao", 40, "raise", { dy: 0.52, facing: -1 }),
        C("rebanho", -110, "stand", { dy: 0.46, facing: 1, id: "primogenito" }),
      ] }),
      b(27, { by: "deus", env: { glory: 0.7 }, cast: [                             // o animal imundo: resgatado com o quinto, ou vendido
        C("homem", -160, "stand", { dy: 0.5, facing: 1, id: "dono" }),
        C("rebanho", -80, "stand", { dy: 0.46, facing: 1, id: "imundo" }),
        C("arao", 50, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(28, { by: "deus", env: { night: 0.35, glory: 0.62 }, cast: [                // o ANÁTEMA: coisa consagrada não se vende nem se resgata
        C("homem", -70, "bow", { dy: 0.54, facing: 1, id: "consagrante" }),
        C("arao", 50, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(29, { by: "deus", env: { night: 0.52, glory: 0.22 }, cast: [               // o consagrado de homens não se resgata: certamente morrerá
        C("homem", -30, "kneel", { dy: 0.56, facing: 1, id: "anatema" }),
        C("arao", -160, "stand", { dy: 0.48, facing: 1 }),
      ] }),
      b(30, { by: "deus", q: "santas são ao Senhor", env: { glory: 0.82, night: 0.1 }, cast: [ // o DÍZIMO da terra e do fruto: é do Senhor, santo ao Senhor
        C("arao", 40, "raise", { dy: 0.52, facing: -1 }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      dv(31),
      b(32, { by: "deus", q: "o dízimo será santo ao Senhor", cast: [             // o dízimo do gado, o que passa debaixo da vara: santo
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
        C("rebanho", 180, "walk", { dy: 0.4, facing: -1, id: "dizimo" }),
      ] }),
      dv(33),
      b(34, { by: "deus", q: "no monte Sinai", env: { glory: 0.85 }, cast: [       // o selo do livro: os mandamentos dados no monte Sinai
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("arao", 30, "stand", { dy: 0.52, facing: -1 }),
      ] }),
    ],
  },
};
