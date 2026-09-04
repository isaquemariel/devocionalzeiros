// ============================================================================
// GÊNESIS 17–18 — roteiro do modo CENA VIVA (força-tarefa AT, onda 2).
//
// Gn 17 — A ALIANÇA E OS NOMES: no deserto, o SENHOR aparece (glória súbita —
// DEUS NUNCA É DESENHADO: a voz dele é narração, a presença é luz). Abrão cai
// sobre o rosto, recebe o NOVO NOME (Abraão), a circuncisão, Sarai vira SARA,
// Abraão RI, Isaque ("riso") é prometido — e a obediência NO MESMO DIA.
//
// Gn 18 — OS TRÊS VARÕES E A INTERCESSÃO: os carvalhos de Manre no calor do
// dia; os três varões são 3 `anjo` (exceção da SPEC). Hospitalidade, "Sara
// terá um filho", o riso escondido, Sodoma ao longe — e a GRANDE BARGANHA
// (50 → 45 → 40 → 30 → 20 → DEZ), a ousadia reverente diante da glória.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// Gn 17 — acampamento de Abrão no Neguebe: tendas, pedras e mato ralo.
// (corredor de extras dx -100..-190 LIVRE, como manda o padrão de palco)
const DESERT_CAMP: StagePropSpec[] = [
  P("tent", 180, 1.2, undefined, 0.12),   // a tenda de Abrão
  P("tent", 262, 0.95, undefined, 0.32),  // tenda menor do acampamento
  P("well", 320, 1, undefined, 0.12),     // o poço do acampamento
  P("amphora", 214, 0.85, undefined, 0.56),
  P("rock", -240, 0.9, undefined, 0.55),
  P("rock", 60, 0.55, undefined, 0.25),
  P("rock", 300, 0.8, undefined, 0.72),
  P("bush", -300, 0.9, undefined, 0.4),
  P("bush", 236, 0.85, undefined, 0.62),
  P("grass", -60, 0.9, undefined, 0.8),
  P("grass", 118, 1, undefined, 0.75),
  P("grass", -272, 1, undefined, 0.72),
];

// ---------------------------------------------------------------------------
// Gn 18 — os carvalhais de Manre: duas grandes árvores, a tenda de Sara.
const MANRE: StagePropSpec[] = [
  P("tree", -70, 1.9, undefined, 0.16),   // o GRANDE carvalho da sombra (recostai-vos debaixo da árvore)
  P("tree", 128, 1.5, undefined, 0.1),    // segundo carvalho de Manre
  P("tree", -252, 1.15, undefined, 0.05), // o bosque dos carvalhais ao fundo
  P("tent", 220, 1.2, undefined, 0.12),   // a tenda (Sara escuta à porta)
  P("well", -320, 1, undefined, 0.15),
  P("amphora", 258, 0.85, undefined, 0.55),
  P("rock", -260, 0.8, undefined, 0.6),
  P("rock", 310, 0.9, undefined, 0.68),
  P("bush", -298, 0.9, undefined, 0.42),
  P("bush", 282, 0.85, undefined, 0.5),
  P("grass", -230, 1, undefined, 0.75),
  P("grass", 40, 1, undefined, 0.82),
  P("grass", 172, 0.95, undefined, 0.7),
];
// a refeição da hospitalidade: fogo e gamela no corredor de extras
const MANRE_FOGO: StagePropSpec[] = [...MANRE, P("campfire", -130, 1, 1, 0.5)];
const MANRE_MESA: StagePropSpec[] = [...MANRE_FOGO, P("bowl", -176, 0.9, undefined, 0.56)];
// Sodoma ao longe: torres pequenas no fundo do lado direito
const MANRE_SODOMA: StagePropSpec[] = [
  ...MANRE,
  P("tower", 284, 1, undefined, 0.02),    // Sodoma distante
  P("tower", 320, 1.1, undefined, 0.04),  // Gomorra distante
];

// os TRÊS VARÕES (Gn 18): três anjos lado a lado, o do meio mais luminoso
const TRES = (x: number, pose = "stand"): CastPlacement[] => [
  C("anjo", x - 50, pose, { glow: 0.55, dy: 0.42 }),
  C("anjo", x, pose, { glow: 0.75, dy: 0.4 }),
  C("anjo", x + 50, pose, { glow: 0.55, dy: 0.44 }),
];

// Gn 18:22 — "os varões… foram-se para Sodoma; mas Abraão ficou ainda em pé
// diante da face do SENHOR". Os dois partem e o do meio FICA: é com esta
// figura luminosa que Abraão discute os cinquenta, os quarenta e cinco, os
// dez. Sem ela em cena, o balão do SENHOR caía na barra do narrador e o
// leitor via um homem falando sozinho com o deserto.
const SENHOR_QUE_FICA = (pose = "stand"): CastPlacement =>
  C("anjo", 78, pose, { glow: 0.85, dy: 0.42, facing: -1, id: "o-senhor-diante-de-abraao" });

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 17
  // A voz de Deus é SEMPRE narração (sem `by`); a presença dele é a glória.
  17: {
    start: { terrain: "desert", night: 0.1, glory: 0 },
    beats: [
      b(1, { by: "deus", q: "apareceu o SENHOR a Abrão, e disse-lhe: ", cast: [C("abraao", -10, "kneel", { dy: 0.5 })], props: DESERT_CAMP, env: { glory: 0.8, night: 0 } }), // Deus: Eu sou o Deus Todo-Poderoso; anda em minha presença
      b(2, { cast: [C("abraao", -10, "bow", { dy: 0.5 })], env: { glory: 0.85 } }),  // porei a minha aliança… multiplicarei
      b(3, { cast: [C("abraao", -14, "lie", { dy: 0.5 })] }),                        // caiu Abrão sobre o seu rosto
      b(4, { env: { glory: 0.9 } }),                                                 // eis a aliança: pai de muitas nações
      b(5, { env: { glory: 0.95 } }),                                                // o NOVO NOME: Abrão → ABRAÃO
      b(6),                                                                          // nações e reis sairão de ti
      b(7, { env: { glory: 0.95 } }),                                                // aliança perpétua com a descendência
      b(8),                                                                          // toda a terra de Canaã em possessão
      b(9, { by: "deus", q: "Disse mais Deus a Abraão: ", cast: [C("abraao", -10, "kneel", { dy: 0.5 })], env: { glory: 0.85 } }), // Deus: tu, porém, guardarás a minha aliança
      b(10),                                                                         // todo homem será circuncidado
      b(11),                                                                         // sinal da aliança na carne
      b(12),                                                                         // o filho de oito dias
      b(13),                                                                         // aliança perpétua na vossa carne
      b(14, { env: { storm: 0.12 } }),                                               // o incircunciso será extirpado
      b(15, { by: "deus", q: "Disse Deus mais a Abraão: ", env: { storm: 0, glory: 0.9 } }),                                      // Deus: Sarai → SARA será o seu nome
      b(16, { env: { glory: 0.95 } }),                                               // mãe de nações; reis sairão dela
      b(17, { by: "abraao", q: "disse no seu coração: ", cast: [C("abraao", -14, "lie", { dy: 0.5 })] }), // caiu e RIU-SE: a homem de cem anos?
      b(18, { by: "abraao", q: "disse Abraão a Deus: ", cast: [C("abraao", -10, "kneel", { dy: 0.5 })] }), // quem dera que viva Ismael!
      b(19, { by: "deus", q: "E disse Deus: ", env: { glory: 1 } }),                                                  // Deus: ISAQUE ("riso") prometido: aliança perpétua
      b(20),                                                                         // Ismael abençoado: doze príncipes
      b(21, { env: { glory: 1 } }),                                                  // com Isaque, no ano seguinte
      b(22, { cast: [C("abraao", -6, "stand", { dy: 0.5 })], env: { glory: 0.35 } }), // subiu Deus de diante dele
      b(23, { cast: [C("abraao", -50, "point", { dy: 0.5 }), C("homem", 12, "stand", { dy: 0.52 }), C("servo", 66, "stand", { dy: 0.55 }), C("multidao", 130, "stand", { dy: 0.42 })], env: { glory: 0.25 } }), // NAQUELE MESMO DIA: circuncidou toda a casa
      b(24, { cast: [C("abraao", -20, "stand", { dy: 0.48 }), C("homem", 40, "stand", { dy: 0.54 }), C("servo", 90, "stand", { dy: 0.57 }), C("multidao", 150, "stand", { dy: 0.42 })] }), // Abraão, noventa e nove anos
      b(25, { cast: [C("abraao", -40, "stand", { dy: 0.52 }), C("homem", 16, "stand", { dy: 0.48 }), C("servo", 90, "stand", { dy: 0.57 }), C("multidao", 150, "stand", { dy: 0.42 })] }), // Ismael, treze anos
      b(26, { cast: [C("abraao", -26, "stand", { dy: 0.5 }), C("homem", 26, "stand", { dy: 0.5 }), C("servo", 96, "stand", { dy: 0.57 }), C("multidao", 156, "stand", { dy: 0.42 })], env: { glory: 0.3 } }), // no mesmo dia, Abraão e Ismael
      b(27, { cast: [C("abraao", -26, "raise", { dy: 0.5 }), C("homem", 26, "stand", { dy: 0.5 }), C("servo", 96, "stand", { dy: 0.57 }), C("multidao", 156, "stand", { dy: 0.42 })], env: { glory: 0.35 } }), // todos os homens da casa, com ele
    ],
  },

  // ------------------------------------------------------------------ Gn 18
  // Os três varões são 3 `anjo` (exceção da SPEC); a voz do SENHOR na
  // intercessão é narração — a glória constante 0.5 é a Presença.
  18: {
    start: { terrain: "field", night: 0, glory: 0.1 },
    beats: [
      b(1, { cast: [C("abraao", 176, "kneel", { dy: 0.52 })], props: MANRE, env: { glory: 0.3, night: 0 } }), // o Senhor aparece em Manre; calor do dia
      b(2, { cast: [...TRES(-20), C("abraao", 72, "bow", { dy: 0.55 })], env: { glory: 0.45 } }), // TRÊS varões; correu e inclinou-se à terra
      b(3, { by: "abraao", q: "disse: " }),                                          // não passes de teu servo
      b(4, { by: "abraao", cast: [...TRES(-20), C("abraao", 66, "point", { dy: 0.55 })] }), // água, lavai os pés, recostai-vos à árvore
      b(5, { by: "abraao" }),                                                        // um bocado de pão… "Assim faze"
      b(6, { by: "abraao", q: "disse-lhe: ", cast: [...TRES(-20), C("abraao", 152, "walk", { dy: 0.52 }), C("sara", 216, "stand", { dy: 0.5 })] }), // corre a Sara: amassa três medidas, faze bolos
      b(7, { cast: [...TRES(-20), C("abraao", -152, "walk", { dy: 0.62 }), C("servo", -212, "stand", { dy: 0.58 })], props: MANRE_FOGO }), // correu às vacas; a vitela ao moço
      b(8, { cast: [...TRES(-20), C("abraao", 74, "stand", { dy: 0.5 })], props: MANRE_MESA }), // manteiga, leite e a vitela; e comeram
      b(9, { by: "anjo", q: "disseram-lhe: " }),                                     // Onde está Sara? — Ei-la aí na tenda
      b(10, { by: "anjo", q: "disse: ", cast: [...TRES(-20), C("abraao", 74, "stand", { dy: 0.5 }), C("sara", 216, "stand", { dy: 0.5 })], env: { glory: 0.55 } }), // SARA TERÁ UM FILHO; ela escuta à porta
      b(11),                                                                         // velhos, adiantados em idade
      b(12, { by: "sara", q: "dizendo: " }),                                         // Sara RIU-SE consigo, escondida
      b(13, { by: "anjo", q: "E disse o Senhor a Abraão: ", env: { glory: 0.65 } }),                                               // o SENHOR: por que se riu Sara?
      b(14, { env: { glory: 0.8 } }),                                                // haveria coisa difícil ao SENHOR?
      b(15, { by: "sara", q: "negou, dizendo: ", env: { glory: 0.6 } }),             // o medo e a negação: "Não me ri"
      b(16, { cast: [...TRES(160, "walk"), C("abraao", 60, "walk", { dy: 0.55 })], props: MANRE_SODOMA, env: { night: 0.15, glory: 0.5 } }), // levantam-se e olham para Sodoma
      b(17, { by: "anjo", q: "E disse o Senhor: ", env: { glory: 0.55 } }),                                               // o SENHOR: ocultarei eu a Abraão o que faço?
      b(18),                                                                         // grande e poderosa nação; benditas nele
      b(19),                                                                         // ordenará à sua casa o caminho do SENHOR
      b(20, { by: "anjo", q: "Disse mais o Senhor: ", env: { storm: 0.25, night: 0.25 } }),                                  // o SENHOR: o clamor de Sodoma e Gomorra
      b(21, { env: { storm: 0.35, night: 0.3 } }),                                   // descerei agora, e verei
      b(22, { cast: [C("abraao", -60, "stand", { dy: 0.5, facing: 1 }), SENHOR_QUE_FICA()], env: { storm: 0.15, glory: 0.5 } }), // os varões vão a Sodoma; Abraão FICA diante do SENHOR
      b(23, { by: "abraao", q: "dizendo: ", cast: [C("abraao", -60, "point", { dy: 0.5, facing: 1 }), SENHOR_QUE_FICA()] }), // destruirás o justo com o ímpio?
      b(24, { by: "abraao" }),                                                       // o primeiro lance: CINQUENTA justos
      b(25, { by: "abraao", cast: [C("abraao", -60, "kneel", { dy: 0.5, facing: 1 }), SENHOR_QUE_FICA()] }),         // não faria justiça o Juiz de toda a terra?
      b(26, { by: "anjo", q: "Então disse o Senhor: ", cast: [SENHOR_QUE_FICA("raise"), C("abraao", -60, "bow", { dy: 0.5, facing: 1 })], env: { glory: 0.5, storm: 0.1 } }),                                    // o SENHOR: pouparei por amor dos cinquenta
      b(27, { by: "abraao", q: "dizendo: ", cast: [C("abraao", -60, "bow", { dy: 0.5, facing: 1 }), SENHOR_QUE_FICA()] }), // atrevi-me… sou pó e cinza
      b(28, { by: "abraao", cast: [C("abraao", -60, "point", { dy: 0.5, facing: 1 }), SENHOR_QUE_FICA()] }),         // QUARENTA E CINCO — "Não a destruirei"
      b(29, { by: "abraao", q: "e disse: ", cast: [C("abraao", -60, "kneel", { dy: 0.5, facing: 1 }), SENHOR_QUE_FICA()] }), // QUARENTA — "Não o farei"
      b(30, { by: "abraao", q: "Disse mais: ", cast: [C("abraao", -60, "point", { dy: 0.5, facing: 1 }), SENHOR_QUE_FICA()] }), // não se ire o Senhor: TRINTA
      b(31, { by: "abraao", q: "E disse: ", cast: [C("abraao", -60, "kneel", { dy: 0.5, facing: 1 }), SENHOR_QUE_FICA()] }), // atrevi-me a falar: VINTE
      b(32, { by: "abraao", q: "Disse mais: ", cast: [C("abraao", -60, "bow", { dy: 0.5, facing: 1 }), SENHOR_QUE_FICA("raise")], env: { glory: 0.55 } }), // só mais esta vez: DEZ
      b(33, { cast: [C("abraao", 148, "walk", { dy: 0.55 })], env: { glory: 0.15, night: 0.45, storm: 0 } }), // o SENHOR se retira; Abraão volta, entardecer
    ],
  },
};
