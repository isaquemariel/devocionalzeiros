// ============================================================================
// DEUTERONÔMIO 8–9 — CENA VIVA. Nas campinas de Moabe, MOISÉS relembra.
//
// Dt 8 — LEMBRA-TE DO CAMINHO: Moisés manda o povo lembrar dos quarenta anos no
// deserto, onde o Senhor os HUMILHOU e os sustentou com o MANÁ — "para te dar a
// entender que o homem não viverá só de pão". A roupa não envelheceu, o pé não
// inchou. À frente está a BOA TERRA que mana leite e mel: ribeiros, trigo,
// cevada, vides, figueiras, romãs, azeite. ADVERTÊNCIA: quando comeres e te
// fartares, NÃO te esqueças do Senhor nem digas "a minha força me deu esta
// riqueza". Contraste do deserto árido (o passado) com a terra farta (a promessa).
//
// Dt 9 — NÃO POR TUA JUSTIÇA: és povo de dura cerviz. FLASHBACK DE HOREBE e o
// BEZERRO DE OURO: Moisés sobe ao monte que ARDE EM FOGO, jejua quarenta dias e
// recebe as DUAS TÁBUAS escritas pelo DEDO DE DEUS. A VOZ sai do fogo do monte:
// "desce depressa, o teu povo se corrompeu". Moisés desce, vê o BEZERRO, e
// ARROJA as tábuas, quebrando-as ao pé do monte. Queima o ídolo e se prostra
// outros quarenta dias intercedendo: "não destruas o teu povo". Também em
// Taberá, Massá, Quibrote e Cades o povo provocou o Senhor.
//
// A VOZ DE DEUS (regra do projeto): Moisés é o mediador visível que prega —
// `by: "moises"` com `q` na frase-chave. Só no FLASHBACK de Horebe, quando a VOZ
// sai do FOGO do monte (mediador = fogo, `pillar`/`campfire` no cume), usamos
// `by: "deus"`. Cenas de pecado/juízo: glória baixa, night alto, SEM glow.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const mv = (v: number, q?: string) => b(v, { by: "moises", ...(q ? { q } : {}) }); // Moisés prega
const dv = (v: number, q?: string, extra: Partial<StageBeat> = {}) => b(v, { by: "deus", ...(q ? { q } : {}), ...extra });   // voz do fogo em Horebe

// CAMPINAS DE MOABE, além do Jordão — a cena-base do discurso de Moisés.
const MOABE: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("tent", -220, 1.1, undefined, 0.2),
  P("tent", 210, 1.05, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 80, 0.78, undefined, 0.68),
];
// O DESERTO ÁRIDO relembrado — a marcha de quarenta anos, terra seca.
const DESERTO: StagePropSpec[] = [
  P("palm", -320, 1.05, undefined, 0.14),
  P("rock", 300, 1.12, undefined, 0.3),
  P("rock", -190, 0.85, undefined, 0.5),
  P("grass", -60, 0.72, undefined, 0.82),
];
// O MANÁ no chão do arraial — o pão do céu que os sustentou.
const MANA: StagePropSpec[] = [
  { ...P("manna", -120, 1.0, undefined, 0.78), tag: "mana" },
  { ...P("manna", 30, 1.0, undefined, 0.85), tag: "mana" },
  { ...P("manna", 190, 0.95, undefined, 0.72), tag: "mana" },
  P("palm", -330, 1.0, undefined, 0.14),
  P("rock", 300, 1.1, undefined, 0.32),
  P("grass", -260, 0.7, undefined, 0.5),
];
// A BOA TERRA que mana leite e mel — ribeiros, vides, figueiras, azeite.
const BOA_TERRA: StagePropSpec[] = [
  P("river", 0, 1.35, undefined, 0.86),
  P("grapes", -280, 1.05, undefined, 0.4),
  P("tree", 240, 1.2, undefined, 0.28),
  P("palm", -330, 1.1, undefined, 0.12),
  P("well", 300, 1.0, undefined, 0.5),
  P("grass", -70, 0.85, undefined, 0.8),
  P("grass", 90, 0.8, undefined, 0.72),
];
// HOREBE EM FOGO — o monte que arde, a coluna de fogo, a VOZ do meio do fogo.
const HOREBE: StagePropSpec[] = [
  P("pillar", 30, 1.5, 1, 0.16),
  P("campfire", -20, 1.25, 1, 0.32),
  P("rock", 300, 1.12, undefined, 0.3),
  P("rock", -285, 1.0, undefined, 0.42),
];
// O BEZERRO DE OURO — o ídolo de fundição no arraial, o pecado de Horebe.
const BEZERRO: StagePropSpec[] = [
  { ...P("calf", 0, 1.35, undefined, 0.42), tag: "bezerro-de-ouro" },
  P("tent", -240, 1.05, undefined, 0.22),
  P("tent", 230, 1.0, undefined, 0.26),
  P("rock", 300, 1.05, undefined, 0.3),
  P("grass", -80, 0.7, undefined, 0.7),
];
// AS TÁBUAS QUEBRADAS ao pé do monte — arrojadas diante do bezerro.
const TABUAS_QUEBRADAS: StagePropSpec[] = [
  { ...P("tablets", -70, 0.95, undefined, 0.83), tag: "tabuas-quebradas" },
  { ...P("tablets", 10, 0.88, undefined, 0.88), tag: "tabuas-quebradas" },
  { ...P("calf", 170, 1.15, undefined, 0.44), tag: "bezerro-de-ouro" },
  P("rock", 300, 1.05, undefined, 0.3),
  P("grass", -220, 0.7, undefined, 0.6),
];
// AS CIDADES DOS GIGANTES — muradas até aos céus, filhos de Anaque.
const GIGANTES: StagePropSpec[] = [
  P("tower", -140, 1.28, undefined, 0.24),
  P("tower", 150, 1.22, undefined, 0.3),
  P("rock", 300, 1.1, undefined, 0.3),
  P("grass", -50, 0.76, undefined, 0.78),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Dt 8
  8: {
    start: { terrain: "field", night: 0.12, glory: 0.55, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — Moisés prega: guardai os mandamentos, para que vivais e possuais a terra.
      b(1, { by: "moises", q: "para que vivais", props: MOABE,
        env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.42 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.2 }),
        C("multidao", 130, "stand", { dy: 0.5 }),
      ] }),
      // v.2 — "lembra-te de todo o caminho": abre o flashback do deserto.
      b(2, { by: "moises", q: "te lembrarás de todo o caminho", set: "deserto", props: DESERTO,
        env: { terrain: "desert", glory: 0.4, night: 0.2, verdure: 0.12 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 90, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      // v.3 — O MANÁ: humilhou e sustentou; "o homem não viverá só de pão".
      b(3, { by: "moises", q: "o homem não viverá só de pão", set: "mana", props: MANA,
        env: { terrain: "desert", glory: 0.5, night: 0.15, verdure: 0.14 }, cast: [
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 40, "kneel", { dy: 0.6, facing: -1, id: "colhe1" }),
        C("homem", 170, "bow", { dy: 0.62, facing: -1, id: "colhe2" }),
      ] }),
      // v.4 — a roupa não envelheceu, o pé não inchou nestes quarenta anos.
      b(4, { by: "moises", q: "Nunca se envelheceu a tua roupa", set: "deserto", props: DESERTO,
        env: { terrain: "desert", glory: 0.48, night: 0.16, verdure: 0.12 }, cast: [
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      // v.5 — como um homem castiga a seu filho, assim te castiga o Senhor.
      b(5, { by: "moises", q: "como um homem castiga a seu filho", cast: [
        C("moises", -130, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "filho" }),
      ] }),
      // v.6 — guarda os mandamentos, para andares nos seus caminhos.
      b(6, { by: "moises", q: "para andares nos seus caminhos", cast: [
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.5 }),
      ] }),
      // v.7 — A BOA TERRA: terra de ribeiros de águas, de fontes e mananciais.
      b(7, { by: "moises", q: "terra de ribeiros de águas", set: "boa-terra", props: BOA_TERRA,
        env: { terrain: "field", glory: 0.7, night: 0.08, verdure: 0.85 }, cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1, glow: 0.25 }),
        C("multidao", 140, "raise", { dy: 0.5 }),
      ] }),
      // v.8 — terra de trigo e cevada, de vides, figueiras e romeiras.
      b(8, { by: "moises", q: "vides e figueiras, e romeiras",
        env: { glory: 0.72, verdure: 0.9 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1, glow: 0.2 }),
        C("mulherComum", 80, "stand", { dy: 0.52, facing: -1, id: "colhedora" }),
      ] }),
      // v.9 — terra em que comerás o pão sem escassez, nada te faltará.
      b(9, { by: "moises", q: "comerás o pão sem escassez",
        env: { glory: 0.7, verdure: 0.85 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.2 }),
        C("multidao", 130, "raise", { dy: 0.5 }),
      ] }),
      // v.10 — quando fores farto, louvarás ao Senhor pela boa terra.
      b(10, { by: "moises", q: "louvarás ao Senhor teu Deus pela boa terra",
        env: { glory: 0.72, verdure: 0.82 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.28 }),
        C("multidao", 120, "raise", { dy: 0.5 }),
      ] }),
      // v.11 — ADVERTÊNCIA: guarda-te que não te esqueças do Senhor.
      b(11, { by: "moises", q: "Guarda-te que não te esqueças", set: "moabe", props: MOABE,
        env: { terrain: "field", glory: 0.5, night: 0.18, verdure: 0.4 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.5 }),
      ] }),
      // v.12 — quando tiveres comido, edificado boas casas, e as habitares.
      b(12, { by: "moises", q: "havendo edificado boas casas", cast: [
        C("moises", -130, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.5 }),
      ] }),
      // v.13 — e se acrescentar a prata e o ouro, e se multiplicar o que tens.
      b(13, { by: "moises", q: "se acrescentar a prata e o ouro", cast: [
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("homem", 90, "stand", { dy: 0.52, facing: -1, id: "farto" }),
      ] }),
      // v.14 — que se NÃO eleve o teu coração e te esqueças do Senhor. Aviso sombrio.
      b(14, { by: "moises", q: "Se eleve o teu coração e te esqueças",
        env: { glory: 0.34, night: 0.42, verdure: 0.32 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 90, "stand", { dy: 0.52, facing: -1, id: "soberbo" }),
      ] }),
      // v.15 — flashback: o grande e terrível deserto de serpentes ardentes.
      b(15, { by: "moises", q: "grande e terrível deserto de serpentes ardentes",
        set: "deserto-serpentes",
        props: [
          P("serpent", -140, 1.0, undefined, 0.72),
          P("serpent", 120, 1.0, undefined, 0.8),
          P("rock", 300, 1.12, undefined, 0.3),
          P("rock", -260, 0.9, undefined, 0.5),
          P("palm", -330, 1.0, undefined, 0.14),
        ],
        env: { terrain: "desert", glory: 0.22, night: 0.5, storm: 0.12, verdure: 0.08 }, cast: [
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
        C("homem", 120, "walk", { dy: 0.5, id: "and1" }),
        C("servo", 200, "bow", { dy: 0.48, id: "and2" }),
      ] }),
      // v.16 — que te sustentou com maná no deserto, para no fim te fazer bem.
      b(16, { by: "moises", q: "te sustentou com maná", set: "mana", props: MANA,
        env: { terrain: "desert", glory: 0.5, night: 0.16, verdure: 0.14 }, cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("mulherComum", 60, "kneel", { dy: 0.6, facing: -1, id: "colhe" }),
      ] }),
      // v.17 — o CORAÇÃO SOBERBO: "a minha força me adquiriu este poder". Sem glow.
      b(17, { by: "moises", q: "A minha força, e a fortaleza da minha mão", set: "moabe", props: MOABE,
        env: { terrain: "field", glory: 0.2, night: 0.55, storm: 0.08, verdure: 0.3 }, cast: [
        C("homem", 40, "point", { dy: 0.5, facing: -1, id: "soberbo" }),
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      // v.18 — antes lembra-te do Senhor, que te dá força para adquirires riqueza.
      b(18, { by: "moises", q: "ele é o que te dá força para adquirires riqueza",
        env: { glory: 0.55, night: 0.16, verdure: 0.42 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.2 }),
        C("multidao", 130, "stand", { dy: 0.5 }),
      ] }),
      // v.19 — se te esqueceres e servires outros deuses, certamente perecereis.
      b(19, { by: "moises", q: "certamente perecereis",
        env: { glory: 0.28, night: 0.5, storm: 0.1, verdure: 0.28 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.5 }),
      ] }),
      // v.20 — como as nações que o Senhor destruiu, assim vós perecereis.
      b(20, { by: "moises", q: "assim vós perecereis",
        env: { glory: 0.26, night: 0.52, storm: 0.12, verdure: 0.26 }, cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("homem", 90, "bow", { dy: 0.56, facing: -1, id: "juizo" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Dt 9
  9: {
    start: { terrain: "field", night: 0.12, glory: 0.55, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — ouve, ó Israel: hoje passarás o Jordão para possuir nações maiores.
      b(1, { by: "moises", q: "hoje passarás o Jordão", props: MOABE,
        env: { terrain: "field", glory: 0.56, night: 0.1, verdure: 0.42 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.5 }),
      ] }),
      // v.2 — um povo grande e alto, FILHOS DE GIGANTES; cidades muradas.
      b(2, { by: "moises", q: "filhos de gigantes", set: "gigantes", props: GIGANTES,
        env: { terrain: "field", glory: 0.44, night: 0.2, verdure: 0.3 }, cast: [
        C("rei", 140, "stand", { dy: 0.36, facing: -1, id: "gigante", scale: 2.0 }),
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
      ] }),
      // v.3 — o Senhor teu Deus é um FOGO CONSUMIDOR que os destruirá.
      b(3, { by: "moises", q: "é um fogo consumidor",
        env: { glory: 0.5, night: 0.18, fire: 0.15 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.5 }),
      ] }),
      // v.4 — não digas: "por causa da MINHA JUSTIÇA o Senhor me trouxe".
      b(4, { by: "moises", q: "Por causa da minha justiça", set: "moabe", props: MOABE,
        env: { terrain: "field", glory: 0.5, night: 0.16, verdure: 0.4 }, cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("homem", 80, "stand", { dy: 0.52, facing: -1, id: "presunçoso" }),
      ] }),
      // v.5 — NÃO por tua justiça, mas pela impiedade das nações e a promessa aos pais.
      b(5, { by: "moises", q: "Não é por causa da tua justiça", cast: [
        C("moises", -130, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.5 }),
      ] }),
      // v.6 — sabe que és POVO OBSTINADO (dura cerviz).
      b(6, { by: "moises", q: "tu és povo obstinado",
        env: { glory: 0.42, night: 0.22 }, cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.5 }),
      ] }),
      // v.7 — lembra-te: muito PROVOCASTE à ira ao Senhor no deserto.
      b(7, { by: "moises", q: "muito provocaste à ira ao Senhor", set: "deserto", props: DESERTO,
        env: { terrain: "desert", glory: 0.34, night: 0.32, verdure: 0.12 }, cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 110, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      // v.8 — em HOREBE provocastes o Senhor: abre o flashback do monte em fogo.
      b(8, { by: "moises", q: "em Horebe provocastes à ira o Senhor", set: "horebe", props: HOREBE,
        env: { terrain: "mountain", glory: 0.28, night: 0.4, fire: 0.4, storm: 0.1, verdure: 0.05 }, cast: [
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.6 }),
      ] }),
      // v.9 — Moisés SOBE ao monte a receber as TÁBUAS de pedra; jejua 40 dias.
      b(9, { by: "moises", q: "a receber as tábuas de pedra",
        props: [ ...HOREBE, { ...P("tablets", -140, 0.9, undefined, 0.46), tag: "tabuas-da-lei" } ],
        env: { terrain: "mountain", glory: 0.35, night: 0.38, fire: 0.45 }, cast: [
        C("moises", -150, "kneel", { dy: 0.44, facing: 1, glow: 0.35 }),
      ] }),
      // v.10 — as duas tábuas ESCRITAS COM O DEDO DE DEUS, do meio do fogo.
      b(10, { by: "moises", q: "escritas com o dedo de Deus",
        props: [ ...HOREBE, { ...P("tablets", 0, 1.1, undefined, 0.4), tag: "tabuas-da-lei" } ],
        env: { terrain: "mountain", glory: 0.4, night: 0.35, fire: 0.5 }, cast: [
        C("moises", -150, "raise", { dy: 0.46, facing: 1, glow: 0.4 }),
      ] }),
      // v.11 — ao fim dos 40 dias, o Senhor me deu as TÁBUAS DA ALIANÇA.
      b(11, { by: "moises", q: "as tábuas da aliança",
        props: [ ...HOREBE, { ...P("tablets", -130, 0.95, undefined, 0.44), tag: "tabuas-da-lei" } ],
        env: { terrain: "mountain", glory: 0.4, night: 0.35, fire: 0.45 }, cast: [
        C("moises", -150, "stand", { dy: 0.46, facing: 1, glow: 0.38 }),
      ] }),
      // v.12 — A VOZ DO FOGO: "desce depressa, o teu povo se corrompeu". by deus.
      dv(12, "desce depressa daqui", { env: { glory: 0.62, night: 0.35 } }),
      // v.13 — a voz prossegue: "eis que ele é povo obstinado".
      dv(13, "ele é povo obstinado", { env: { glory: 0.62, night: 0.35 } }),
      // v.14 — "DEIXA-ME que os destrua, e te faça a ti nação mais poderosa".
      dv(14, "Deixa-me que os destrua", { env: { glory: 0.62, night: 0.35 } }),
      // v.15 — Moisés DESCE do monte que ARDIA EM FOGO, as duas tábuas nas mãos.
      b(15, { by: "moises", q: "o qual ardia em fogo",
        props: [ ...HOREBE, { ...P("tablets", -110, 0.9, undefined, 0.5), tag: "tabuas-da-lei" } ],
        env: { terrain: "mountain", glory: 0.3, night: 0.42, fire: 0.5 }, cast: [
        C("moises", -140, "walk", { dy: 0.52, facing: -1 }),
      ] }),
      // v.16 — e eis o BEZERRO DE FUNDIÇÃO: o povo pecara. Cena de pecado, sem glow.
      b(16, { by: "moises", q: "vós tínheis feito um bezerro de fundição", set: "bezerro", props: BEZERRO,
        env: { terrain: "field", glory: 0.14, night: 0.58, storm: 0.1, verdure: 0.2 }, cast: [
        C("moises", -170, "stand", { dy: 0.52, facing: 1 }),
        C("multidao", 130, "raise", { dy: 0.58 }),
      ] }),
      // v.17 — ÍCONE: Moisés ARROJA as tábuas e as QUEBRA diante do bezerro.
      b(17, { by: "moises", q: "as arrojei das minhas mãos, e as quebrei",
        set: "tabuas-quebradas",
        props: [
          { ...P("tablets", 40, 0.8, undefined, 0.9), tag: "tabuas-quebradas" },
          P("rock", 10, 0.5, undefined, 0.86),
          P("rock", 70, 0.45, undefined, 0.9),
          P("rock", 40, 0.4, undefined, 0.88),
          { ...P("calf", 180, 1.15, undefined, 0.44), tag: "bezerro-de-ouro" },
          P("rock", 300, 1.05, undefined, 0.3),
          P("grass", -220, 0.7, undefined, 0.6),
        ],
        env: { terrain: "field", glory: 0.12, night: 0.6, storm: 0.15, fire: 0.08, verdure: 0.18 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 170, "bow", { dy: 0.56, id: "idol1" }),
        C("homem", 230, "kneel", { dy: 0.54, id: "idol2" }),
      ] }),
      // v.18 — Moisés se PROSTRA quarenta dias e quarenta noites, sem pão nem água.
      b(18, { by: "moises", q: "quarenta dias, e quarenta noites",
        env: { glory: 0.16, night: 0.55, verdure: 0.18 }, cast: [
        C("moises", -20, "bow", { dy: 0.62, facing: 1 }),
      ] }),
      // v.19 — temi a ira; porém ainda por esta vez o SENHOR ME OUVIU.
      b(19, { by: "moises", q: "ainda por esta vez o Senhor me ouviu",
        env: { glory: 0.3, night: 0.42, verdure: 0.22 }, cast: [
        C("moises", -20, "kneel", { dy: 0.58, facing: 1, glow: 0.2 }),
      ] }),
      // v.20 — o Senhor se irou contra ARÃO; mas também orei por Arão.
      b(20, { by: "moises", q: "também orei por Arão",
        env: { glory: 0.32, night: 0.4, verdure: 0.24 }, cast: [
        C("moises", -60, "kneel", { dy: 0.58, facing: 1, glow: 0.2 }),
        C("arao", 90, "bow", { dy: 0.56, facing: -1, id: "arao" }),
      ] }),
      // v.21 — tomei o BEZERRO, e o QUEIMEI A FOGO, e o pisei em pó no ribeiro.
      b(21, { by: "moises", q: "o queimei a fogo, e o pisei", set: "bezerro-queimado",
        props: [
          { ...P("calf", 0, 0.95, undefined, 0.5), tag: "bezerro-de-ouro" },
          P("campfire", 30, 1.1, 1, 0.55),
          P("river", 200, 1.2, undefined, 0.82),
          P("rock", 300, 1.05, undefined, 0.3),
        ],
        env: { terrain: "field", glory: 0.2, night: 0.5, fire: 0.4, storm: 0.08, verdure: 0.2 }, cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
      ] }),
      // v.22 — também em TABERÁ, MASSÁ e QUIBROTE provocastes o Senhor.
      b(22, { by: "moises", q: "Taberá, e em Massá, e em Quibrote", set: "deserto", props: DESERTO,
        env: { terrain: "desert", glory: 0.3, night: 0.35, storm: 0.08, verdure: 0.1 }, cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.5 }),
      ] }),
      // v.23 — e em CADES-BARNÉIA fostes rebeldes ao mandado, não crendo.
      b(23, { by: "moises", q: "Cades-Barnéia",
        env: { glory: 0.3, night: 0.34, verdure: 0.1 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "walk", { dy: 0.5, facing: -1 }),
      ] }),
      // v.24 — REBELDES fostes contra o Senhor desde o dia em que vos conheci.
      b(24, { by: "moises", q: "Rebeldes fostes contra o Senhor",
        env: { glory: 0.28, night: 0.4, storm: 0.08 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.5 }),
      ] }),
      // v.25 — e ESTIVE PROSTRADO 40 dias, porque o Senhor dissera destruir-vos.
      b(25, { by: "moises", q: "estive prostrado", set: "prostrado",
        props: [
          P("rock", 280, 1.1, undefined, 0.3),
          P("rock", -260, 0.9, undefined, 0.44),
        ],
        env: { terrain: "field", glory: 0.16, night: 0.55, verdure: 0.18 }, cast: [
        C("moises", -10, "bow", { dy: 0.62, facing: 1 }),
      ] }),
      // v.26 — a INTERCESSÃO: "Senhor, NÃO DESTRUAS o teu povo e a tua herança".
      b(26, { by: "moises", q: "não destruas o teu povo",
        env: { glory: 0.4, night: 0.4, verdure: 0.2 }, cast: [
        C("moises", -10, "kneel", { dy: 0.58, facing: 1, glow: 0.3 }),
      ] }),
      // v.27 — "LEMBRA-TE dos teus servos, Abraão, Isaque e Jacó".
      b(27, { by: "moises", q: "Lembra-te dos teus servos, Abraão, Isaque",
        env: { glory: 0.44, night: 0.36, verdure: 0.22 }, cast: [
        C("moises", -10, "raise", { dy: 0.58, facing: 1, glow: 0.32 }),
      ] }),
      // v.28 — para que a terra do Egito não diga que os tiraste para matá-los.
      b(28, { by: "moises", q: "os tirou para matá-los no deserto",
        env: { glory: 0.4, night: 0.36, verdure: 0.22 }, cast: [
        C("moises", -20, "kneel", { dy: 0.58, facing: 1, glow: 0.25 }),
      ] }),
      // v.29 — "todavia são eles O TEU POVO E A TUA HERANÇA". A glória se ergue.
      b(29, { by: "moises", q: "o teu povo e a tua herança", set: "moabe", props: MOABE,
        env: { terrain: "field", glory: 0.58, night: 0.14, verdure: 0.42 }, cast: [
        C("moises", -20, "raise", { dy: 0.5, facing: 1, glow: 0.35 }),
        C("multidao", 130, "stand", { dy: 0.5 }),
      ] }),
    ],
  },
};
