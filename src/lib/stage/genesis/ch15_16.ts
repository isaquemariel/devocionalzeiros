// ============================================================================
// GÊNESIS — CENA VIVA, caps. 15 e 16.
//
// Gn 15 — A ALIANÇA DAS ESTRELAS: o deserto à NOITE (night 0.75). A palavra
// do SENHOR vem em visão ("Não temas, Abrão" — narração com glory 0.5: Deus
// NUNCA é desenhado, a voz é luz), a queixa do homem sem herdeiro ("ando sem
// filhos… Eliézer"), e o beat MONUMENTAL do capítulo: "conta as estrelas"
// (céu estrelado, night 0.85, Abrão de braços erguidos) e "E CREU ele no
// Senhor" (glory 0.6). Depois o rito antigo: os animais partidos ao meio em
// duas fileiras (dois altares frente a frente), as aves de rapina enxotadas,
// o SONO PROFUNDO com "grande espanto e grande escuridão" (night 0.95 +
// storm — a profecia dos 400 anos), e o clímax: a TOCHA DE FOGO que passa
// SOZINHA entre as metades (campfire aceso entre os altares + fire/glory) —
// Deus sela a aliança unilateralmente — até a promessa da terra (glory 0.8).
//
// Gn 16 — AGAR: a tenda no deserto. Sarai estéril entrega a serva egípcia
// (mulherComum = Agar), o desprezo e a dureza (night 0.35) até a FUGA; o
// ANJO DO SENHOR a encontra junto à fonte do caminho de Sur (set do POÇO,
// anjo com glow, Agar de joelhos) — "Torna-te… multiplicarei… Ismael" — e a
// confissão que dá nome ao poço: "TU ÉS DEUS QUE ME VÊ" (glory 0.7,
// Beer-Laai-Rói). Fecho em alívio contido: Ismael nasce na tenda.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// O ACAMPAMENTO DA VIGÍLIA (Gn 15): a noite de Abrão no deserto — tendas à
// direita, a fogueira do clã à esquerda, pedra e mato ralo. Corredor de
// extras dx -100..-190 LIVRE (é a vaga das metades do pacto).
const VIGILIA: StagePropSpec[] = [
  P("tent", 252, 1.05, undefined, 0.24),
  P("tent", 318, 0.9, undefined, 0.42),
  P("campfire", -250, 0.85, 1, 0.55),
  P("rock", -304, 0.9, undefined, 0.35),
  P("rock", 182, 0.65, undefined, 0.7),
  P("bush", -222, 0.85, undefined, 0.62),
  P("bush", 210, 0.85, undefined, 0.5),
  P("grass", -58, 0.9, undefined, 0.85),
  P("grass", 132, 0.85, undefined, 0.78),
];

// AS ESTRELAS DA PROMESSA (15:5): quatro estrelas no alto do palco — "conta
// as estrelas, se as podes contar". Entram no v.5 e ficam até o fim.
const ESTRELAS: StagePropSpec[] = [
  P("star", -150, 0.75, undefined, 0.06),
  P("star", -46, 0.6, undefined, 0.03),
  P("star", 64, 0.7, undefined, 0.05),
  P("star", 168, 0.55, undefined, 0.09),
];

// o céu estrelado sobre o acampamento (v.5-9)
const CEUS: StagePropSpec[] = [...VIGILIA, ...ESTRELAS];

// O PACTO (15:10-21): as metades dos animais "em frente da outra" — dois
// altares frente a frente na vaga de extras; com `tocha`, o forno de fumaça
// e a tocha de fogo ACESA passando pelo corredor ENTRE as metades (v.17).
const PACTO = (tocha = false): StagePropSpec[] => [
  ...CEUS,
  P("altar", -182, 1.0, undefined, 0.22),                          // uma metade
  P("altar", -60, 1.0, undefined, 0.26),                           // a outra, em frente
  ...(tocha ? [P("campfire", -120, 0.9, 0.7, 0.3)] : []),          // a tocha entre as peças
];

// A TENDA DE ABRÃO (Gn 16:1-6 e 15-16): o acampamento doméstico em Canaã —
// tendas, vasilhame da casa (ânfora/caixote), o poço do clã à direita.
// Corredor -100..-190 livre.
const TENDA: StagePropSpec[] = [
  P("tent", -262, 1.1, undefined, 0.2),
  P("tent", 244, 0.95, undefined, 0.28),
  P("palm", -320, 1.0, undefined, 0.14),
  P("well", 320, 1, undefined, 0.12),
  P("crate", -292, 0.9, undefined, 0.52),
  P("amphora", -228, 0.85, undefined, 0.58),
  P("campfire", 292, 0.8, 1, 0.6),
  P("rock", 178, 0.65, undefined, 0.7),
  P("bush", 208, 0.85, undefined, 0.5),
  P("grass", -60, 0.9, undefined, 0.85),
  P("grass", 140, 0.85, undefined, 0.78),
];

// A FONTE NO CAMINHO DE SUR (16:7-14): deserto aberto — o POÇO destacado na
// vaga de extras (é o item do versículo: Beer-Laai-Rói), pedra e palmeira
// solitária de oásis.
const POCO: StagePropSpec[] = [
  { ...P("well", -140, 1.1, undefined, 0.22), tag: "poco-agar" },                           // a fonte de água no deserto
  P("palm", 240, 1.05, undefined, 0.12),
  P("rock", -300, 0.95, undefined, 0.32),
  P("rock", 300, 0.8, undefined, 0.6),
  P("rock", 150, 0.6, undefined, 0.72),
  P("bush", -240, 0.85, undefined, 0.55),
  P("bush", 200, 0.85, undefined, 0.4),
  P("grass", -54, 0.9, undefined, 0.85),
  P("grass", 120, 0.85, undefined, 0.78),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ----------------------------------------------------------------- Gn 15
  // A aliança das estrelas: a visão noturna (glory 0.5 = a voz do SENHOR,
  // sem figura), a queixa de Abrão, o céu estrelado e a fé imputada por
  // justiça (glory 0.6); o rito das metades, o horror de grande escuridão
  // (night 0.95 + storm) com a profecia dos 400 anos, a TOCHA que passa
  // sozinha entre as peças (fire + glory 0.5) e a promessa da terra (0.8).
  15: {
    start: { terrain: "desert", night: 0.75, glory: 0, storm: 0, fire: 0 },
    beats: [
      // A PALAVRA EM VISÃO (v.1-4) — a voz é LUZ sobre o acampamento
      b(1, { cast: [C("abraao", -10, "kneel", { dy: 0.5, glow: 0.35 })], props: VIGILIA, env: { glory: 0.5 } }), // (voz) Não temas, Abrão: eu sou o teu escudo
      b(2, { by: "abraao", q: "disse Abrão: ", cast: [C("abraao", -10, "stand", { dy: 0.5, glow: 0.3 })], env: { glory: 0.4 } }), // "ando sem filhos… o damasceno Eliézer"
      b(3, { by: "abraao", q: "Disse mais Abrão: ", env: { glory: 0.35, night: 0.78 } }),                        // "um nascido na minha casa será o herdeiro"
      b(4, { env: { glory: 0.5, night: 0.75 } }),                                                                // (voz) o que de tuas entranhas sair herdará
      // OLHA PARA OS CÉUS (v.5-6) — o beat monumental do capítulo
      b(5, { props: CEUS, cast: [C("abraao", 30, "raise", { dy: 0.48, glow: 0.4 })], env: { night: 0.85, glory: 0.5 } }), // (voz) conta as estrelas: assim será a tua descendência
      b(6, { cast: [C("abraao", 30, "kneel", { dy: 0.48, glow: 0.5 })], env: { glory: 0.6 } }),                  // E CREU ele no Senhor: imputado por justiça
      // COMO SABEREI? (v.7-9) — a pergunta e a ordem do sacrifício
      b(7, { env: { glory: 0.55 } }),                                                                            // (voz) Eu sou o Senhor, que te tirei de Ur
      b(8, { by: "abraao", q: "disse ele: ", cast: [C("abraao", 30, "stand", { dy: 0.48, glow: 0.35 })], env: { glory: 0.45 } }), // "Senhor DEUS, como saberei que hei de herdá-la?"
      b(9, { env: { glory: 0.4 } }),                                                                             // (voz) toma-me bezerra, cabra, carneiro, rola e pombinho
      // AS METADES (v.10-11) — o rito antigo; as aves de rapina enxotadas
      b(10, { props: PACTO(), cast: [C("abraao", -120, "stand", { dy: 0.5, glow: 0.3 })], env: { glory: 0.35 } }), // partiu-os pelo meio, cada parte em frente da outra
      b(11, { cast: [C("abraao", -118, "raise", { dy: 0.5, glow: 0.3, facing: -1 })], env: { storm: 0.12 } }),   // as aves desciam; Abrão, porém, as enxotava
      // O SONO PROFUNDO (v.12-16) — horror de grande escuridão; os 400 anos
      b(12, { cast: [C("abraao", -30, "lie", { dy: 0.52, glow: 0.2 })], env: { night: 0.95, storm: 0.2, glory: 0.1 } }), // sol posto: profundo sono, grande espanto e escuridão
      b(13, { env: { storm: 0.28, glory: 0.15 } }),                                                              // (voz) peregrina será… afligida quatrocentos anos
      b(14, { env: { storm: 0.22, glory: 0.25 } }),                                                              // (voz) julgarei a nação; sairá com grande riqueza
      b(15, { env: { storm: 0.12, glory: 0.32 } }),                                                              // (voz) irás a teus pais em paz, em boa velhice
      b(16, { env: { storm: 0.2, glory: 0.22 } }),                                                               // (voz) a quarta geração; a medida dos amorreus
      // A TOCHA FUMEGANTE (v.17) — Deus sela a aliança SOZINHO, Abrão dorme
      b(17, { props: PACTO(true), env: { fire: 0.35, glory: 0.5, storm: 0.1, night: 0.9 } }),                    // forno de fumaça e tocha de fogo entre as metades
      // A PROMESSA DA TERRA (v.18-21) — a glória sobe e permanece
      b(18, { cast: [C("abraao", -30, "lie", { dy: 0.52, glow: 0.4 })], env: { glory: 0.8, fire: 0.15, storm: 0 } }), // aliança: do rio do Egito ao grande rio Eufrates
      b(19, { env: { glory: 0.8, fire: 0 } }),                                                                   // o queneu, o quenezeu e o cadmoneu
      b(20, { env: { glory: 0.82 } }),                                                                           // o heteu, o perizeu e os refains
      b(21, { env: { glory: 0.85, night: 0.82 } }),                                                              // o amorreu, o cananeu, o girgaseu e o jebuseu
    ],
  },

  // ----------------------------------------------------------------- Gn 16
  // Agar: a casa sem filhos (a serva entregue), o desprezo e a dureza
  // (night 0.35) até a fuga; o anjo do SENHOR na fonte do caminho de Sur
  // (glow crescendo pela fala do anjo, v.9-12), o "Tu és Deus que me vê"
  // (glory 0.7 — Beer-Laai-Rói) e o nascimento de Ismael na tenda (alívio
  // contido, glory 0.4).
  16: {
    start: { terrain: "desert", night: 0.12, glory: 0.2, storm: 0 },
    beats: [
      // A CASA SEM FILHOS (v.1-3) — Sarai entrega a serva egípcia
      b(1, { cast: [C("abraao", -60, "stand", { dy: 0.5, glow: 0.3 }), C("sara", 0, "stand", { dy: 0.52 }), C("mulherComum", 70, "stand", { id: "agar", dy: 0.56 })], props: TENDA }), // Sarai não lhe dava filhos; a serva egípcia Agar
      b(2, { by: "sara", q: "disse Sarai a Abrão: ", cast: [C("sara", 10, "point", { dy: 0.52, facing: -1 }), C("abraao", -50, "stand", { dy: 0.5, glow: 0.3, facing: 1 }), C("mulherComum", 90, "stand", { id: "agar", dy: 0.56 })] }), // "toma a minha serva; terei filhos dela"
      b(3, { cast: [C("sara", -40, "point", { dy: 0.52, facing: 1 }), C("mulherComum", 24, "walk", { id: "agar", dy: 0.56, facing: 1 }), C("abraao", 90, "stand", { dy: 0.5, glow: 0.3, facing: -1 })] }), // tomou a Agar e deu-a por mulher a Abrão
      // O DESPREZO E A DUREZA (v.4-6) — a casa escurece; Agar FOGE
      b(4, { cast: [C("mulherComum", -20, "stand", { id: "agar", dy: 0.54, facing: -1 }), C("sara", 70, "stand", { dy: 0.52, facing: -1 }), C("abraao", -90, "stand", { dy: 0.5, glow: 0.25 })], env: { night: 0.35 } }), // concebeu; a senhora desprezada aos seus olhos
      b(5, { by: "sara", q: "disse Sarai a Abrão: ", cast: [C("sara", 20, "point", { dy: 0.52, facing: -1 }), C("abraao", -50, "stand", { dy: 0.5, glow: 0.25, facing: 1 }), C("mulherComum", 110, "stand", { id: "agar", dy: 0.56, facing: -1 })], env: { night: 0.38 } }), // "meu agravo seja sobre ti; o Senhor julgue"
      b(6, { by: "abraao", q: "disse Abrão a Sarai: ", cast: [C("abraao", 60, "stand", { dy: 0.5, glow: 0.25, facing: -1 }), C("sara", 0, "point", { dy: 0.52, facing: -1 }), C("mulherComum", -210, "walk", { id: "agar", dy: 0.56, facing: -1 })], env: { night: 0.42, storm: 0.12 } }), // "tua serva está na tua mão"; e ela FUGIU
      // O ANJO NA FONTE (v.7-12) — o caminho de Sur; a luz encontra a fugitiva
      b(7, { set: "poco", props: POCO, cast: [C("mulherComum", -66, "kneel", { id: "agar", dy: 0.55 }), C("anjo", 24, "stand", { glow: 0.7, dy: 0.45 })], env: { night: 0.25, glory: 0.35, storm: 0 } }), // o anjo do Senhor a achou junto à fonte
      b(8, { by: "mulherComum", q: "ela disse: ", cast: [C("mulherComum", -66, "kneel", { id: "agar", dy: 0.55, facing: 1 }), C("anjo", 24, "stand", { glow: 0.7, dy: 0.45, facing: -1 })] }), // "venho fugida da face de Sarai minha senhora"
      b(9, { by: "anjo", q: "disse o anjo do SENHOR: ", env: { glory: 0.42 } }),                                 // "torna-te para tua senhora, e humilha-te"
      b(10, { by: "anjo", q: "Disse-lhe mais o anjo do Senhor: ", cast: [C("mulherComum", -66, "kneel", { id: "agar", dy: 0.55, facing: 1 }), C("anjo", 24, "raise", { glow: 0.8, dy: 0.45, facing: -1 })], env: { glory: 0.5 } }), // "multiplicarei sobremaneira a tua descendência"
      b(11, { by: "anjo", q: "Disse-lhe também o anjo do Senhor: ", env: { glory: 0.58 } }),                     // "darás à luz um filho… Ismael: o Senhor ouviu"
      b(12, { by: "anjo", cast: [C("mulherComum", -66, "kneel", { id: "agar", dy: 0.55, facing: 1 }), C("anjo", 24, "point", { glow: 0.8, dy: 0.45, facing: -1 })], env: { glory: 0.6 } }), // "será homem feroz; a sua mão contra todos"
      // TU ÉS DEUS QUE ME VÊ (v.13-14) — o nome do Senhor e o nome do poço
      b(13, { by: "mulherComum", q: "que com ela falava: ", cast: [C("mulherComum", -66, "raise", { id: "agar", dy: 0.55, glow: 0.35 })], env: { glory: 0.7, night: 0.15 } }), // "Tu és Deus que me vê" — o anjo já não está
      b(14, { cast: [C("mulherComum", -110, "stand", { id: "agar", dy: 0.55, glow: 0.3 })], env: { glory: 0.6 } }), // por isso o poço se chama Beer-Laai-Rói
      // ISMAEL NASCE (v.15-16) — de volta à tenda: alívio contido
      b(15, { set: "nascimento", props: TENDA, cast: [C("mulherComum", 10, "stand", { id: "agar", dy: 0.54 }), C("abraao", -56, "raise", { dy: 0.5, glow: 0.35 }), C("sara", 90, "stand", { dy: 0.54 })], env: { night: 0.1, glory: 0.4 } }), // Agar deu à luz; Abrão chamou-o Ismael
      b(16, { cast: [C("abraao", -40, "stand", { dy: 0.5, glow: 0.3 }), C("mulherComum", 34, "stand", { id: "agar", dy: 0.54 })], env: { glory: 0.35, night: 0.18 } }), // Abrão, de oitenta e seis anos, quando Ismael nasceu
    ],
  },
};
