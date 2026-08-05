// ============================================================================
// GÊNESIS — CENA VIVA, caps. 7 e 8.
//
// Gn 7 — O DILÚVIO: a ARCA enorme domina o centro; a VOZ DO SENHOR (balão de
// voz do céu — Deus NUNCA é figura) manda entrar; a procissão dos animais de
// dois em dois; as fontes do grande abismo se rompem e a ÁGUA SOBE (env.water
// 0→1) enquanto a tempestade e a noite crescem; o beat solene do "e o Senhor o
// fechou dentro" (palco vazio, um pulso de glória) e o MAR ABERTO: só a arca
// sobre o dilúvio, água 1 — até o silêncio dos cento e cinqüenta dias.
//
// Gn 8 — AS ÁGUAS BAIXAM: Deus se LEMBRA de Noé (o vento — a água RECUA e a luz
// volta), a arca pousa no ARARATE, o CORVO e a POMBA (a folha de oliveira é o
// beat da esperança), a terra reverdece, a VOZ manda sair e o ALTAR do
// holocausto — "não tornarei mais a amaldiçoar a terra".
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
// corpo do CÉU (sky:true) — a ave voa pela expansão, nunca no chão.
const SKY = (kind: string, dx: number, scale = 1, dy = 0.6): StagePropSpec =>
  ({ kind, dx, scale, dy, sky: true });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// O ESTALEIRO PRONTO (Gn 7:1-16): a ARCA GRANDE domina o centro do palco;
// restos da obra (caixotes, betume) à esquerda, a tenda da família à direita.
// Corredor de extras dx -100..-190 LIVRE.
const ESTALEIRO: StagePropSpec[] = [
  P("arkship", 30, 1.9, undefined, 0.05),
  P("crate", -230, 1, undefined, 0.45),
  P("crate", -212, 0.8, undefined, 0.62),
  P("amphora", -264, 0.9, undefined, 0.52),
  P("campfire", -300, 0.8, 1, 0.4),
  P("tent", 282, 1.0, undefined, 0.3),
  P("tree", -320, 1.05, undefined, 0.08),
  P("rock", 222, 0.6, undefined, 0.72),
  P("bush", -286, 0.9, undefined, 0.28),
  P("grass", -60, 1, undefined, 0.85),
  P("grass", 128, 0.95, undefined, 0.8),
  P("grass", 254, 0.9, undefined, 0.6),
];

// MAR ABERTO (Gn 7:17–8:3): nada além da arca flutuando sobre as águas do
// dilúvio — o mundo inteiro submerso (env.water leva o mar a cobrir tudo).
const MAR: StagePropSpec[] = [
  P("arkship", 0, 1.6, undefined, 0.2),
];

// O ARARATE (Gn 8:4-12): a arca pousada entre os cumes que emergem — mundo
// ainda nu, só rocha lavada. Corredor -100..-190 livre.
const ARARATE: StagePropSpec[] = [
  P("arkship", 40, 1.6, undefined, 0.12),
  P("rock", -252, 1.15, undefined, 0.28),
  P("rock", -308, 0.9, undefined, 0.55),
  P("rock", 210, 0.85, undefined, 0.62),
  P("rock", 305, 1.05, undefined, 0.38),
  P("rock", -40, 0.55, undefined, 0.8),
];

// A TERRA ENXUTA (Gn 8:13-22): o mesmo Ararate reverdecendo — capim e
// arbustos voltam; o altar do v.20 entra depois na vaga de extras.
const TERRA_SECA: StagePropSpec[] = [
  ...ARARATE,
  P("grass", -70, 1, undefined, 0.85),
  P("grass", 140, 0.95, undefined, 0.78),
  P("grass", 268, 0.9, undefined, 0.7),
  P("bush", -218, 0.85, undefined, 0.5),
];

// A família de Noé (a "casa" inteira): Noé + os três filhos + a mulher e as
// noras, em bloco ao redor de uma marca central.
const FAMILIA = (cx: number, pose = "stand", noePose = pose, extra: Partial<CastPlacement> = {}): CastPlacement[] => [
  C("noe", cx, noePose, { glow: 0.45, dy: 0.48, ...extra }),
  C("homem", cx + 46, pose, { dy: 0.55, ...extra }),
  C("pastor", cx + 84, pose, { dy: 0.55, ...extra }),
  C("servo", cx + 122, pose, { dy: 0.56, ...extra }),
  C("mulherComum", cx - 46, pose, { dy: 0.55, ...extra }),
  C("mulherComum", cx - 84, pose, { dy: 0.56, ...extra }),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 7
  // O dilúvio: da ordem de entrar na arca até as águas prevalecerem cento e
  // cinqüenta dias. A VOZ DO SENHOR fala em balão (Deus NUNCA é desenhado);
  // a água (env.water) sobe do v.10 ao pico no mar aberto; a tempestade e a
  // noite crescem juntas.
  7: {
    start: { terrain: "field", night: 0.15, glory: 0.3, storm: 0, water: 0 },
    beats: [
      // A ORDEM DE ENTRAR (v.1-4) — a VOZ DO SENHOR sobre o estaleiro
      b(1, { by: "deus", q: "Depois disse o SENHOR a Noé: ", cast: [...FAMILIA(-30, "stand", "kneel"), C("rebanho", 200, "stand", { dy: 0.5 })], props: ESTALEIRO, env: { glory: 0.5 } }), // Entra tu e toda a tua casa na arca
      b(2, { by: "deus", cast: [...FAMILIA(-30), C("rebanho", 176, "walk", { dy: 0.5, facing: -1 }), C("rebanho", -252, "stand", { dy: 0.42 })], env: { glory: 0.45 } }), // dos animais limpos, sete e sete
      b(3, { cast: [C("rebanho", 150, "walk", { dy: 0.5, facing: -1 }), C("rebanho", -210, "walk", { dy: 0.44, facing: 1 })], props: [...ESTALEIRO, SKY("birds", -120, 0.5, 0.9)], env: { glory: 0.4, night: 0.18 } }), // também as aves, macho e fêmea
      b(4, { by: "deus", env: { glory: 0.42, night: 0.22, storm: 0.1 } }),                              // sete dias, e farei chover quarenta dias
      // A OBEDIÊNCIA E O ANO SEISCENTOS (v.5-6)
      b(5, { cast: [...FAMILIA(-30, "stand", "raise"), C("rebanho", 160, "stand", { dy: 0.5 }), C("rebanho", -252, "stand", { dy: 0.42 })], env: { glory: 0.4 } }), // fez Noé conforme tudo
      b(6, { env: { night: 0.3, storm: 0.15, glory: 0.3, water: 0.05 } }),                              // seiscentos anos; o dilúvio veio
      // A ENTRADA (v.7-9) — família e animais movem para a arca
      b(7, { cast: [...FAMILIA(-14, "walk", "walk", { facing: 1 }), C("rebanho", 150, "walk", { dy: 0.5, facing: -1 }), C("rebanho", -240, "walk", { dy: 0.44, facing: 1 })], env: { storm: 0.2, night: 0.32, water: 0.08 } }), // Noé entrou na arca com os seus
      b(8, { cast: [...FAMILIA(0, "stand"), C("rebanho", 120, "walk", { dy: 0.52, facing: -1 }), C("rebanho", -200, "walk", { dy: 0.46, facing: 1 })], env: { storm: 0.25, water: 0.1 } }), // dos limpos, dos não limpos, das aves
      b(9, { cast: [...FAMILIA(0, "stand"), C("rebanho", 92, "walk", { dy: 0.54, facing: -1 }), C("rebanho", -120, "walk", { dy: 0.5, facing: 1 })], env: { storm: 0.3, night: 0.36, water: 0.12 } }), // entraram de dois em dois
      // AS ÁGUAS VÊM (v.10-12) — as fontes do abismo se rompem
      b(10, { env: { storm: 0.45, night: 0.42, glory: 0.15, water: 0.28 } }),                           // passados sete dias, as águas
      b(11, { env: { storm: 0.8, night: 0.6, glory: 0, water: 0.55 } }),                                // romperam-se as fontes do abismo!
      b(12, { env: { storm: 0.85, night: 0.65, water: 0.66 } }),                                        // chuva quarenta dias e quarenta noites
      // OS ÚLTIMOS A ENTRAR (v.13-15)
      b(13, { cast: [...FAMILIA(6, "walk", "walk", { facing: 1 })], env: { storm: 0.85, night: 0.66, water: 0.72 } }), // no mesmo dia: Noé, Sem, Cão e Jafé
      b(14, { cast: [C("noe", 10, "point", { glow: 0.45, dy: 0.48, facing: 1 }), C("rebanho", 96, "walk", { dy: 0.52, facing: -1 }), C("rebanho", -74, "walk", { dy: 0.5, facing: 1 })], env: { water: 0.76 } }), // todo animal conforme a sua espécie
      b(15, { cast: [C("noe", 22, "stand", { glow: 0.45, dy: 0.48, facing: 1 }), C("rebanho", 70, "walk", { dy: 0.54, facing: -1 })], env: { storm: 0.88, night: 0.68, water: 0.8 } }), // toda carne com espírito de vida
      // O SENHOR FECHA A PORTA (v.16) — beat solene: o palco fica vazio
      b(16, { cast: [], env: { glory: 0.5, storm: 0.85, night: 0.65, water: 0.85 } }),                  // e o Senhor o fechou dentro
      // O MAR ABERTO (v.17-20) — só a arca no dilúvio, a água cobre tudo
      b(17, { set: "mar-aberto", props: MAR, env: { storm: 1, night: 0.7, glory: 0, water: 1 } }),      // as águas levantaram a arca
      b(18, { env: { storm: 1, night: 0.72, water: 1 } }),                                              // a arca andava sobre as águas
      b(19, { env: { storm: 1, night: 0.76, water: 1 } }),                                              // todos os altos montes cobertos
      b(20, { env: { storm: 1, night: 0.8, water: 1 } }),                                               // quinze côvados acima prevaleceram
      // TODA CARNE EXPIRA (v.21-23) — narração grave
      b(21, { env: { storm: 0.92, night: 0.85, water: 1 } }),                                           // expirou toda a carne que se movia
      b(22, { env: { storm: 0.9, night: 0.85, water: 1 } }),                                            // tudo o que tinha fôlego morreu
      b(23, { env: { storm: 0.75, night: 0.85, glory: 0.18, water: 0.98 } }),                           // ficou somente Noé na arca
      // CENTO E CINQÜENTA DIAS (v.24) — o silêncio das águas
      b(24, { env: { storm: 0.4, night: 0.7, glory: 0.1, water: 0.95 } }),                              // as águas prevaleceram cento e cinqüenta dias
    ],
  },

  // ------------------------------------------------------------------ Gn 8
  // As águas baixam: Deus se lembra de Noé (o vento, a água RECUA), a arca
  // pousa no Ararate, o corvo e a pomba, a saída de toda a vida e o altar da
  // nova aliança — a VOZ manda sair; a glória cresce até o "não cessarão".
  8: {
    start: { terrain: "field", night: 0.7, storm: 0.4, glory: 0, water: 0.95 },
    beats: [
      // DEUS SE LEMBRA (v.1-3) — o vento passa, as águas aquietam e recuam
      b(1, { props: MAR, env: { storm: 0.2, glory: 0.3, night: 0.62, water: 0.9 } }),                  // lembrou-se Deus de Noé; o vento
      b(2, { env: { storm: 0.08, night: 0.55, glory: 0.32, water: 0.8 } }),                            // cerraram-se as fontes; a chuva deteve-se
      b(3, { env: { storm: 0.04, night: 0.48, glory: 0.35, water: 0.66 } }),                           // as águas iam-se escoando; minguaram
      // O ARARATE (v.4-5) — a arca repousa, os cumes aparecem
      b(4, { set: "ararate", props: ARARATE, env: { terrain: "mountain", night: 0.4, storm: 0, glory: 0.35, water: 0.4 } }), // a arca repousou sobre os montes de Ararate
      b(5, { env: { night: 0.3, glory: 0.38, water: 0.3 } }),                                          // apareceram os cumes dos montes
      // O CORVO E A POMBA (v.6-12) — Noé à janela da arca
      b(6, { cast: [C("noe", 116, "stand", { glow: 0.45, dy: 0.42 })], env: { night: 0.25, water: 0.26 } }), // Noé abriu a janela da arca
      b(7, { cast: [C("noe", 116, "point", { glow: 0.45, dy: 0.42, facing: -1 })], props: [...ARARATE, SKY("birds", -140, 0.6, 0.85)] }), // soltou um corvo, indo e voltando
      b(8, { cast: [C("noe", 116, "raise", { glow: 0.45, dy: 0.42 })], props: [...ARARATE, SKY("birds", -60, 0.5, 0.7)], env: { night: 0.22, glory: 0.4, water: 0.22 } }), // soltou uma pomba, para ver
      b(9, { cast: [C("noe", 116, "stand", { glow: 0.45, dy: 0.42, facing: -1 })], env: { night: 0.24 } }), // a pomba voltou; ele a recolheu
      b(10, { env: { night: 0.3, water: 0.18 } }),                                                     // esperou ainda outros sete dias
      b(11, { cast: [C("noe", 116, "raise", { glow: 0.6, dy: 0.42 })], props: [...TERRA_SECA, SKY("birds", 40, 0.55, 0.72)], env: { glory: 0.55, night: 0.16, water: 0.12 } }), // a folha de oliveira no bico!
      b(12, { env: { glory: 0.55, night: 0.15, water: 0.08 } }),                                       // enviou a pomba; não tornou mais
      // A TERRA SECA (v.13-14)
      b(13, { cast: [C("noe", 100, "stand", { glow: 0.5, dy: 0.4 })], props: TERRA_SECA, env: { night: 0.1, glory: 0.55, water: 0.02 } }), // tirou a cobertura: a terra enxuta
      b(14, { env: { night: 0.04, glory: 0.58, water: 0 } }),                                          // a terra estava seca
      // A ORDEM DE SAIR (v.15-17) — a VOZ de Deus
      b(15, { cast: [C("noe", 100, "kneel", { glow: 0.55, dy: 0.42 })], env: { glory: 0.65 } }),       // então falou Deus a Noé
      b(16, { by: "deus", env: { glory: 0.68 } }),                                                     // Sai da arca, tu e os teus
      b(17, { by: "deus", env: { glory: 0.7 } }),                                                      // traze fora todo o animal; frutificai
      // A SAÍDA (v.18-19) — toda a vida desce da arca
      b(18, { cast: FAMILIA(-30, "walk", "walk", { facing: -1 }), env: { glory: 0.7, night: 0 } }),    // saiu Noé, filhos, mulher e noras
      b(19, { cast: [...FAMILIA(-46, "stand"), C("rebanho", 130, "walk", { dy: 0.5, facing: -1 }), C("rebanho", 250, "walk", { dy: 0.44, facing: -1 })], props: [...TERRA_SECA, SKY("birds", -150, 0.5, 0.9)], env: { glory: 0.72 } }), // todo animal saiu conforme as famílias
      // O ALTAR E A PROMESSA (v.20-22)
      b(20, { cast: [C("noe", -96, "kneel", { glow: 0.6, dy: 0.48 }), C("homem", -34, "bow", { dy: 0.55 }), C("pastor", 6, "bow", { dy: 0.55 }), C("mulherComum", 46, "kneel", { dy: 0.55 })], props: [...TERRA_SECA, P("altar", -150, 1.15, 1, 0.22)], env: { glory: 0.75 } }), // edificou um altar; holocausto
      b(21, { by: "deus", q: "o Senhor disse em seu coração: ", env: { glory: 0.85 } }),               // não tornarei mais a amaldiçoar a terra
      b(22, { by: "deus", cast: [C("noe", -96, "raise", { glow: 0.65, dy: 0.48 }), C("homem", -34, "raise", { dy: 0.55 }), C("pastor", 6, "raise", { dy: 0.55 }), C("mulherComum", 46, "raise", { dy: 0.55 })], env: { glory: 0.9, night: 0 } }), // sementeira e sega não cessarão
    ],
  },
};
