// ============================================================================
// GÊNESIS 1–2 — A CRIAÇÃO e o ÉDEN.
//
// PRINCÍPIO QUE REGE ESTE ARQUIVO: **em cena só existe o que Deus já criou.**
// O capítulo abre no VAZIO (terreno "abyss": sem chão, sem morros, sem
// estrelas — só trevas sobre o abismo de águas) e o mundo vai NASCENDO
// diante do jogador, obra por obra, na ordem exata do texto:
//   • v.3   a luz irrompe sobre as águas (glory salta; a treva recua)
//   • v.6   o firmamento separa as águas de cima das de baixo
//   • v.9   as águas se ajuntam e a TERRA SECA aparece (abyss → field,
//           water = mar ao fundo, verdure 0 = solo nu, ainda sem erva)
//   • v.11  a terra reverdece (verdure sobe; entram árvores frutíferas)
//   • v.14  os LUMINARES são postos NO CÉU (sky:true — nunca no chão)
//   • v.20  as aves voam sobre a face dos céus
//   • v.24  os animais da terra
//   • v.26  o homem e a mulher, à imagem de Deus (o ápice: glory 1)
// O refrão "e foi a tarde e a manhã" pulsa o ciclo dia→noite no `night`,
// dando ao capítulo o seu ritmo litúrgico de seis dias.
//
// DEUS NUNCA É DESENHADO. A voz do Criador é a narração (sem `by`); a Sua
// presença é LUZ (glory). O jogador atravessa a criação como testemunha.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
/** objeto do CÉU: `dy` é ALTURA (0 = horizonte, 1 = zênite). */
const SKY = (kind: string, dx: number, dy: number, scale = 1): StagePropSpec =>
  ({ kind, dx, dy, scale, sky: true });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// Gn 1 — os cenários vão se ACUMULANDO conforme a criação avança.
// O corredor dx -100..-190 fica livre p/ o "extra do versículo".
// ---------------------------------------------------------------------------

/** Dia 2: a expansão no meio das águas (véu de águas superiores no alto). */
const FIRMAMENTO: StagePropSpec[] = [SKY("firmament", 0, 0.88, 1.15)];

/** Dia 3a: a terra seca aparece — rochas nuas emergindo do mar. Nada verde. */
// A LINHA D'ÁGUA: com env.water ≈ 0.34 o mar ocupa o fundo da faixa andável.
// Tudo que é de TERRA FIRME fica em dy ≥ 0.42 — nada boiando no mar.
const TERRA_NUA: StagePropSpec[] = [
  P("rock", -292, 1.05, undefined, 0.46),
  P("rock", -54, 0.62, undefined, 0.72),
  P("rock", 196, 0.9, undefined, 0.6),
  P("rock", 316, 1.15, undefined, 0.44),
];

/** Dia 3b: "produza a terra erva verde… árvore frutífera" (verdure sobe junto). */
const VEGETACAO: StagePropSpec[] = [
  ...TERRA_NUA,
  P("tree", -308, 1.25, undefined, 0.5),
  P("tree", -216, 1.0, undefined, 0.66),
  P("tree", 142, 1.2, undefined, 0.48),
  P("tree", 264, 0.95, undefined, 0.68),
  P("bush", -74, 0.95, undefined, 0.56),
  P("bush", 96, 0.9, undefined, 0.78),
  P("grass", -250, 1, undefined, 0.88),
  P("grass", 54, 1.05, undefined, 0.82),
  P("grass", 214, 1, undefined, 0.92),
];

/** Dia 4: os dois grandes luminares e as estrelas — TODOS no céu. */
const SOL = SKY("sun", 118, 0.74, 1.1);
const LUA = SKY("moon", -232, 0.62, 0.95);
const ESTRELAS = SKY("starfield", -20, 0.86, 1.2);
const ASTROS: StagePropSpec[] = [...VEGETACAO, SOL, LUA, ESTRELAS];

/** Dia 5: as aves sobre a face da expansão dos céus (bandos em várias alturas). */
const AVES = SKY("birds", -120, 0.5, 1.05);
const AVES2 = SKY("birds", 210, 0.62, 0.8);
const AVES3 = SKY("birds", 60, 0.74, 0.9);

/** Dia 6: a terra FERVILHA de criaturas — rebanhos e feras em várias profundidades. */
const FERAS: CastPlacement[] = [
  C("rebanho", 176, "stand", { dy: 0.4, scale: 0.9 }),
  C("rebanho", -246, "stand", { dy: 0.62, scale: 0.7 }),
  C("rebanho", -80, "stand", { dy: 0.52, scale: 0.72 }),
  C("rebanho", 262, "stand", { dy: 0.46, scale: 0.58 }),
  C("cordeiro", 44, "stand", { dy: 0.68, scale: 0.6 }),
];

// ---------------------------------------------------------------------------
// Gn 2 — o JARDIM no Éden: as duas árvores no meio, o rio e os quatro braços.
// ---------------------------------------------------------------------------

/** O jardim plantado (v.8-9): árvores agradáveis à vista e boas para comida. */
const JARDIM: StagePropSpec[] = [
  // As DUAS árvores do meio são o CENTRO da cena — grandes e distintas. As
  // árvores comuns recuam para o fundo (menores, nas bordas), sem competir.
  P("treeOfLife", -44, 1.15, undefined, 0.28),        // no MEIO do jardim — a mais bela
  P("treeOfKnowledge", 118, 1.05, undefined, 0.32),   // e a do conhecimento, sombria e distinta
  P("tree", -312, 0.8, undefined, 0.15),              // pomar comum ao fundo/borda
  P("tree", 300, 0.72, undefined, 0.13),
  P("bush", -256, 1, undefined, 0.58),
  P("bush", 206, 0.95, undefined, 0.64),
  P("grass", -226, 1, undefined, 0.86),
  P("grass", 54, 1.05, undefined, 0.82),
  P("grass", 292, 0.95, undefined, 0.74),
];

/** v.10: "saía um rio do Éden para regar o jardim". */
const JARDIM_RIO: StagePropSpec[] = [...JARDIM, P("edenRiver", -140, 1.15, undefined, 0.3)];

/** v.10b-14: "dali se dividia e se tornava em quatro braços" (Pisom, Giom, Tigre, Eufrates). */
const JARDIM_QUATRO: StagePropSpec[] = [...JARDIM, P("riverFork", -140, 1.2, undefined, 0.3)];

export const CHAPTERS: Record<number, StageScript> = {
  // ======================================================================= Gn 1
  1: {
    // O VAZIO: trevas totais sobre o abismo. Sem chão, sem astros, sem vida.
    start: { terrain: "abyss", night: 1, glory: 0, storm: 0, fire: 0, water: 1, verdure: 0 },
    beats: [
      // ---- antes do primeiro dia: o abismo -------------------------------
      b(1, { cast: [], props: [] }),                                                  // No princípio criou Deus o céu e a terra
      b(2, { env: { glory: 0.12 } }),                                                 // trevas sobre o abismo; o Espírito se movia sobre as águas
      // ---- DIA 1: a luz ---------------------------------------------------
      b(3, { by: "deus", q: "E disse Deus: ",  env: { night: 0.34, glory: 0.9 } }),                                     // HAJA LUZ — e houve luz
      b(4, { env: { night: 0.26, glory: 0.72 } }),                                    // separação entre a luz e as trevas
      b(5, { env: { night: 0.82, glory: 0.22 } }),                                    // Dia e Noite — a tarde e a manhã, dia primeiro
      // ---- DIA 2: a expansão ---------------------------------------------
      b(6, { by: "deus", q: "E disse Deus: ",  env: { night: 0.34, glory: 0.62 }, props: FIRMAMENTO }),                  // haja uma expansão no meio das águas
      b(7, { env: { glory: 0.58 } }),                                                 // águas debaixo e águas sobre a expansão
      b(8, { env: { night: 0.82, glory: 0.2 } }),                                     // chamou Céus — a tarde e a manhã, dia segundo
      // ---- DIA 3: terra, mares e vegetação --------------------------------
      // A TERRA SECA APARECE: o abismo dá lugar ao chão; o mar recua para o
      // fundo (water) e o solo ainda está NU (verdure 0).
      b(9, { by: "deus", q: "E disse Deus: ",  env: { terrain: "field", night: 0.3, glory: 0.62, water: 0.34, verdure: 0 }, props: TERRA_NUA }), // apareça a porção seca
      b(10, { env: { night: 0.2, glory: 0.6 } }),                                     // Terra e Mares — e viu Deus que era bom
      b(11, { by: "deus", q: "E disse Deus: ",  env: { verdure: 0.72, glory: 0.5 }, props: VEGETACAO }),                // produza a terra erva verde e árvore frutífera
      b(12, { env: { verdure: 1, glory: 0.62 } }),                                    // a terra produziu — e era bom
      b(13, { env: { night: 0.82, glory: 0.18 } }),                                   // a tarde e a manhã, dia terceiro
      // ---- DIA 4: os luminares (NO CÉU) -----------------------------------
      b(14, { by: "deus", q: "E disse Deus: ",  env: { night: 0.42, glory: 0.62 }, props: [...VEGETACAO, SOL] }),       // haja luminares na expansão dos céus
      b(15, { env: { night: 0.2, glory: 0.55 } }),                                    // para iluminar a terra
      b(16, { env: { night: 0.4, glory: 0.45 }, props: ASTROS }),                     // os dois grandes luminares — e fez as estrelas
      b(17, { env: { night: 0.24, glory: 0.6 } }),                                    // postos na expansão dos céus
      b(18, { env: { night: 0.12, glory: 0.66 } }),                                   // governar o dia e a noite — era bom
      b(19, { env: { night: 0.82, glory: 0.2 } }),                                    // a tarde e a manhã, dia quarto
      // ---- DIA 5: peixes e aves -------------------------------------------
      b(20, { by: "deus", q: "E disse Deus: ",  env: { night: 0.3, glory: 0.62, water: 0.5 }, props: [...ASTROS, AVES, AVES3] }), // produzam as águas… e voem as aves
      b(21, { env: { glory: 0.58 }, props: [...ASTROS, AVES, AVES2, AVES3] }),        // as grandes baleias e toda ave de asas — era bom
      b(22, { by: "deus", q: "dizendo: ",  env: { night: 0.18, glory: 0.72 } }),                                   // e Deus os abençoou: frutificai e multiplicai-vos
      b(23, { env: { night: 0.82, glory: 0.2 } }),                                    // a tarde e a manhã, dia quinto
      // ---- DIA 6: os animais e o HOMEM -------------------------------------
      b(24, { by: "deus", q: "E disse Deus: ",  env: { night: 0.3, glory: 0.62 }, cast: [C("rebanho", 176, "stand", { dy: 0.5, scale: 0.9 }), C("rebanho", -80, "stand", { dy: 0.52, scale: 0.72 })] }), // produza a terra alma vivente: gado e feras
      b(25, { env: { water: 0.44, night: 0.18, glory: 0.6 }, cast: FERAS }), // e fez Deus as feras e o gado — era bom
      b(26, { by: "deus", q: "E disse Deus: ",  env: { water: 0.44, night: 0.1, glory: 0.9 } }),                                     // FAÇAMOS O HOMEM à nossa imagem
      b(27, {                                                                          // e criou Deus o homem: homem e mulher os criou
        env: { water: 0.44, night: 0.04, glory: 1 },
        cast: [
          C("adao", -34, "stand", { dy: 0.5, glow: 0.35 }),
          C("eva", 26, "stand", { dy: 0.5, glow: 0.35, facing: -1 }),
          ...FERAS,
        ],
      }),
      b(28, { by: "deus", q: "lhes disse: ",                                                                           // e Deus os abençoou: frutificai… e dominai
        env: { water: 0.44, glory: 1 },
        cast: [
          C("adao", -34, "raise", { dy: 0.5, glow: 0.4 }),
          C("eva", 26, "raise", { dy: 0.5, glow: 0.4, facing: -1 }),
          ...FERAS,
        ],
      }),
      b(29, { by: "deus", q: "E disse Deus: ",                                                                           // eis que vos tenho dado toda erva e árvore com fruto
        env: { glory: 0.9 },
        props: [...ASTROS, AVES, AVES2, P("tree", -150, 1.3, undefined, 0.5)],
        cast: [
          C("adao", -34, "point", { dy: 0.5, glow: 0.3 }),
          C("eva", 26, "stand", { dy: 0.5, glow: 0.3, facing: -1 }),
          C("rebanho", 172, "stand", { dy: 0.5, scale: 0.9 }),
          C("rebanho", -246, "stand", { dy: 0.62, scale: 0.7 }),
        ],
      }),
      b(30, {                                                                          // e a todo animal… toda erva verde para mantimento
        env: { glory: 0.85 },
        cast: [
          C("adao", -34, "stand", { dy: 0.5, glow: 0.3 }),
          C("eva", 26, "stand", { dy: 0.5, glow: 0.3, facing: -1 }),
          C("rebanho", 120, "stand", { dy: 0.55, scale: 0.95 }),
          C("rebanho", -246, "stand", { dy: 0.62, scale: 0.7 }),
        ],
      }),
      b(31, { env: { night: 0, glory: 1, verdure: 1 } }),                             // e eis que era MUITO BOM — a tarde e a manhã, dia sexto
    ],
  },

  // ======================================================================= Gn 2
  2: {
    // O sétimo dia amanhece sobre o mundo pronto: luz plena, terra verde.
    start: { terrain: "field", night: 0.06, glory: 0.85, storm: 0, fire: 0, water: 0.3, verdure: 1 },
    beats: [
      b(1, {                                                                           // os céus, a terra e todo o seu exército acabados
        props: [...VEGETACAO, SOL, LUA, ESTRELAS, AVES],
        cast: [C("adao", -34, "stand", { dy: 0.5 }), C("eva", 26, "stand", { dy: 0.5, facing: -1 })],
      }),
      b(2, { env: { glory: 0.95 } }),                                                  // descansou no sétimo dia de toda a sua obra
      b(3, { env: { glory: 1 } }),                                                     // abençoou o dia sétimo e o santificou
      // ---- a origem: a terra antes da chuva e do lavrador ------------------
      // Retrospectiva (v.4-6): o texto volta ao princípio — solo seco, sem
      // planta do campo, sem homem para lavrar. O palco esvazia e resseca.
      b(4, { env: { terrain: "desert", night: 0.2, glory: 0.4, water: 0, verdure: 0.12 }, props: TERRA_NUA, cast: [] }), // as origens dos céus e da terra
      b(5, { env: { verdure: 0.05 } }),                                                // nenhuma planta ainda; não havia homem para lavrar
      b(6, { env: { verdure: 0.3, glory: 0.5 } }),                                     // um vapor subia da terra e regava a face do solo
      b(7, { env: { glory: 0.95, verdure: 0.4 }, cast: [C("adao", -20, "kneel", { dy: 0.52, glow: 0.5 })] }), // formou o homem do pó e soprou o fôlego da vida
      // ---- o JARDIM no Éden -------------------------------------------------
      b(8, {                                                                           // plantou um jardim no Éden, e pôs ali o homem
        env: { terrain: "garden", night: 0, glory: 0.8, water: 0, verdure: 1 },
        props: JARDIM,
        cast: [C("adao", -40, "stand", { dy: 0.52 })],
      }),
      b(9, { env: { glory: 0.9 } }),                                                   // a árvore da vida no meio, e a do conhecimento
      b(10, { props: JARDIM_RIO }),                                                    // saía um rio do Éden para regar o jardim
      b(11, { props: JARDIM_QUATRO }),                                                 // o primeiro é Pisom — rodeia Havilá, onde há ouro
      b(12, { env: { glory: 0.86 } }),                                                 // o ouro dessa terra é bom; há bdélio e sardônica
      b(13),                                                                            // o segundo é Giom — rodeia a terra de Cuxe
      b(14),                                                                            // o terceiro é o Tigre; e o quarto, o Eufrates
      b(15, { props: JARDIM_RIO, cast: [C("adao", -46, "stand", { dy: 0.55 })] }),      // pôs o homem no jardim para o lavrar e o guardar
      b(16, { by: "deus", q: "dizendo: ",  env: { glory: 0.9 } }),                                                  // de toda árvore do jardim comerás livremente
      // A PROIBIÇÃO: a árvore do conhecimento vem à frente e a luz esfria um
      // instante — o peso da advertência ("certamente morrerás").
      b(17, {
        env: { night: 0.18, glory: 0.55 },
        props: [...JARDIM_RIO, P("treeOfKnowledge", -178, 1.15, undefined, 0.16)],
        cast: [C("adao", -46, "stand", { dy: 0.55 })],
      }),                                                                               // mas da árvore do conhecimento não comerás
      b(18, { by: "deus", q: "E disse o Senhor Deus: ",  env: { night: 0.06, glory: 0.7 }, props: JARDIM_RIO }),                  // não é bom que o homem esteja só
      b(19, {                                                                           // formou os animais e os trouxe a Adão para os nomear
        env: { glory: 0.72 },
        cast: [
          C("adao", -46, "point", { dy: 0.55 }),
          C("rebanho", 158, "stand", { dy: 0.42, scale: 0.95 }),
          C("rebanho", 44, "stand", { dy: 0.62, scale: 0.68 }),
          C("rebanho", -156, "stand", { dy: 0.5, scale: 0.7 }),
          C("cordeiro", 96, "stand", { dy: 0.68, scale: 0.58 }),
        ],
        props: [...JARDIM_RIO, SKY("birds", -160, 0.52, 0.9), SKY("birds", 130, 0.66, 0.78)],
      }),
      b(20, { cast: [                                                                    // Adão deu nome a todos; mas não se achava ajudadora
        C("adao", -46, "stand", { dy: 0.55 }),
        C("rebanho", 158, "stand", { dy: 0.42, scale: 0.95 }),
        C("rebanho", 44, "stand", { dy: 0.62, scale: 0.68 }),
        C("rebanho", -156, "stand", { dy: 0.5, scale: 0.7 }),
        C("cordeiro", 96, "stand", { dy: 0.68, scale: 0.58 }),
      ] }),
      b(21, { env: { night: 0.42, glory: 0.5 }, cast: [C("adao", -46, "lie", { dy: 0.55 })] }), // fez cair um sono pesado sobre Adão
      b(22, {                                                                           // da costela formou uma mulher, e trouxe-a a Adão
        env: { night: 0.05, glory: 1 },
        cast: [C("adao", -60, "stand", { dy: 0.55 }), C("eva", 4, "stand", { dy: 0.55, facing: -1, glow: 0.4 })],
      }),
      b(23, { by: "adao", q: "E disse Adão: " }),                                      // "Esta é agora osso dos meus ossos…"
      b(24, { env: { glory: 0.92 } }),                                                 // deixará o homem pai e mãe — e serão uma carne
      b(25, {                                                                           // ambos estavam nus e não se envergonhavam
        env: { glory: 0.85 },
        cast: [C("adao", -46, "stand", { dy: 0.55 }), C("eva", 12, "stand", { dy: 0.55, facing: -1 })],
      }),
    ],
  },
};
