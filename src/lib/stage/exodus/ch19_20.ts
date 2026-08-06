// ============================================================================
// ÊXODO 19–20 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 19 — A TEOFANIA DO SINAI: ao terceiro mês, Israel acampa diante do monte.
// Deus propõe a aliança ("sereis um reino sacerdotal") e desce sobre o Sinai em
// FOGO, fumaça de fornalha, trovões, relâmpagos e o sonido crescente da buzina;
// o monte treme e o povo estremece. Só Moisés sobe ao cume.
//
// Êx 20 — OS DEZ MANDAMENTOS: do meio do fogo, Deus fala "todas estas palavras".
// O povo, aterrado, põe-se de longe e pede que Moisés fale por eles; Moisés se
// chega à escuridão onde Deus está.
//
// A VOZ DE DEUS (regra do projeto): teofania SEM figura — a presença é fogo,
// fumaça e nuvem sobre o monte, e a fala vem do céu: `by: "deus"`, com glória e
// fogo altos no ambiente. O povo que treme e responde é `multidao`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// O SINAI: o monte ao centro (o cume à frente), os rochedos e as tendas do
// arraial ao pé. A presença desce sobre o cume — fogo e fumaça pelo AMBIENTE.
const SINAI: StagePropSpec[] = [
  { ...P("rock", 0, 1.75, undefined, 0.24), tag: "monte-sinai" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("bush", -150, 0.75, undefined, 0.44),
  P("grass", -40, 0.78, undefined, 0.82),
  P("tent", -260, 0.95, undefined, 0.18),
  P("tent", 250, 0.9, undefined, 0.2),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 19
  // A chegada ao Sinai → a proposta da aliança (asas de águias) → o "sim" do povo
  // → a santificação → e a descida do Senhor em fogo e fumaça, com o monte a tremer.
  19: {
    start: { terrain: "mountain", night: 0.18, glory: 0.5, storm: 0, fire: 0, verdure: 0.25 },
    beats: [
      b(1, { set: "sinai", cast: [C("moises", -100, "stand", { dy: 0.5, facing: 1 }), C("multidao", 20, "stand", { dy: 0.48 }), C("multidao", 130, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], props: SINAI, env: { terrain: "mountain", glory: 0.5, night: 0.16 } }), // ao terceiro mês da saída, chegam ao deserto do Sinai
      b(2, { cast: [C("multidao", 20, "stand", { dy: 0.48 }), C("multidao", 130, "stand", { scale: 0.9, dy: 0.52, id: "povo2" }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })] }), // acampam-se em frente ao monte
      b(3, { by: "deus", q: "dizendo: ", cast: [C("moises", -30, "walk", { dy: 0.42, facing: 1 })], env: { glory: 0.7, night: 0.12 } }), // Moisés sobe; o Senhor o chama do monte: "Assim falarás à casa de Jacó"
      b(4, { by: "deus", env: { glory: 0.75 } }), // "vos levei sobre asas de águias, e vos trouxe a mim"
      b(5, { by: "deus", env: { glory: 0.8 } }), // "se guardardes a minha aliança, sereis a minha propriedade peculiar"
      b(6, { by: "deus", env: { glory: 0.85 } }), // "vós me sereis um reino sacerdotal e o povo santo"
      b(7, { cast: [C("moises", -90, "point", { dy: 0.5, facing: 1 }), C("anciao", -20, "stand", { dy: 0.5, facing: 1 }), C("multidao", 90, "stand", { dy: 0.48 })], env: { glory: 0.55, night: 0.14 } }), // Moisés desce e expõe aos anciãos todas estas palavras
      b(8, { by: "multidao", q: "e disse: ", cast: [C("multidao", 40, "raise", { dy: 0.48 }), C("multidao", 140, "stand", { scale: 0.9, dy: 0.52, id: "povo2" }), C("moises", -100, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.65 } }), // o povo responde a uma voz: "Tudo o que o Senhor tem falado, faremos"
      b(9, { by: "deus", q: "E disse o Senhor a Moisés: ", cast: [C("moises", -30, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.7, night: 0.2 } }), // "eu virei a ti numa nuvem espessa, para que o povo ouça e te creia"
      b(10, { by: "deus", q: "Disse também o Senhor a Moisés: " }), // "santifica o povo hoje e amanhã, e lavem as suas roupas"
      b(11, { by: "deus", env: { glory: 0.72 } }), // "estejam prontos para o terceiro dia, quando o Senhor descer sobre o Sinai"
      b(12, { by: "deus" }), // "marca limites ao povo: quem tocar o monte, certamente morrerá"
      b(13, { by: "deus" }), // "soando a buzina longamente, então subirão ao monte"
      b(14, { cast: [C("moises", -70, "stand", { dy: 0.5, facing: 1 }), C("multidao", 30, "bow", { dy: 0.5 }), C("multidao", 130, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], env: { glory: 0.6, night: 0.12 } }), // Moisés desce, santifica o povo, e eles lavam as roupas
      b(15, { by: "moises", q: "E disse ao povo: " }), // "Estai prontos ao terceiro dia"
      b(16, { cast: [C("multidao", 30, "bow", { dy: 0.5 }), C("multidao", 130, "kneel", { scale: 0.9, dy: 0.56, id: "povo2" }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })], env: { storm: 0.6, fire: 0.4, glory: 0.6, night: 0.35 } }), // ao terceiro dia: trovões, relâmpagos, nuvem espessa e a buzina forte; o povo estremece
      b(17, { cast: [C("moises", -120, "point", { dy: 0.5, facing: 1 }), C("multidao", -20, "stand", { dy: 0.5 }), C("multidao", 90, "stand", { scale: 0.9, dy: 0.54, id: "povo2" })], env: { storm: 0.55, fire: 0.5, glory: 0.6 } }), // Moisés leva o povo ao encontro de Deus; põem-se ao pé do monte
      b(18, { cast: [C("moises", -120, "stand", { dy: 0.5, facing: 1 })], env: { fire: 0.9, storm: 0.7, glory: 0.7, night: 0.4 } }), // todo o Sinai fumega, porque o Senhor descera em fogo; o monte treme grandemente
      b(19, { cast: [C("moises", -110, "raise", { dy: 0.5, facing: 1 })], env: { fire: 0.92, storm: 0.75, glory: 0.75 } }), // a buzina cresce; Moisés fala, e Deus lhe responde em voz alta
      b(20, { cast: [C("moises", -40, "walk", { dy: 0.42, facing: 1 })], env: { fire: 0.9, glory: 0.85, storm: 0.6 } }), // o Senhor desce sobre o cume e chama Moisés; e Moisés sobe
      b(21, { by: "deus", q: "E disse o Senhor a Moisés: ", env: { glory: 0.8, fire: 0.8 } }), // "desce, adverte ao povo que não traspasse o termo, para que não pereçam"
      b(22, { by: "deus" }), // "também os sacerdotes que se chegam ao Senhor se hão de santificar"
      b(23, { by: "moises", q: "Então disse Moisés ao Senhor: ", cast: [C("moises", -40, "stand", { dy: 0.42, facing: 1 })], env: { glory: 0.75, fire: 0.75 } }), // "o povo não poderá subir, porque tu nos advertiste: marca termos ao monte"
      b(24, { by: "deus", q: "E disse-lhe o Senhor: ", env: { glory: 0.8, fire: 0.8 } }), // "desce; depois subirás tu e Arão; o povo, porém, não traspasse o termo"
      b(25, { cast: [C("moises", -110, "stand", { dy: 0.5, facing: 1 }), C("multidao", 20, "bow", { dy: 0.5 }), C("multidao", 120, "kneel", { scale: 0.9, dy: 0.56, id: "povo2" })], env: { glory: 0.7, fire: 0.7, storm: 0.5, night: 0.32 } }), // Moisés desce ao povo e lhe diz isto
    ],
  },

  // ------------------------------------------------------------------ Êx 20
  // A voz do fogo dita os Dez Mandamentos → o povo aterrado se põe de longe e pede
  // Moisés por medianeiro → e Moisés se chega à escuridão onde Deus está.
  20: {
    start: { terrain: "mountain", night: 0.32, glory: 0.7, storm: 0.5, fire: 0.75, verdure: 0.2 },
    beats: [
      b(1, { set: "sinai", cast: [C("moises", -110, "stand", { dy: 0.5, facing: 1 }), C("multidao", 20, "bow", { dy: 0.5 }), C("multidao", 120, "kneel", { scale: 0.9, dy: 0.56, id: "povo2" })], props: SINAI, env: { terrain: "mountain", fire: 0.8, storm: 0.55, glory: 0.75, night: 0.34 } }), // então falou Deus todas estas palavras
      b(2, { by: "deus", env: { glory: 0.9, fire: 0.85 } }), // "Eu sou o Senhor teu Deus, que te tirei da terra do Egito, da casa da servidão"
      b(3, { by: "deus", env: { glory: 0.92 } }), // "não terás outros deuses diante de mim"
      b(4, { by: "deus" }), // "não farás para ti imagem de escultura"
      b(5, { by: "deus", env: { fire: 0.88 } }), // "não te encurvarás a elas; eu, o Senhor teu Deus, sou Deus zeloso"
      b(6, { by: "deus", env: { glory: 0.95 } }), // "faço misericórdia a milhares dos que me amam e guardam os meus mandamentos"
      b(7, { by: "deus" }), // "não tomarás o nome do Senhor teu Deus em vão"
      b(8, { by: "deus", env: { glory: 0.9 } }), // "lembra-te do dia do sábado, para o santificar"
      b(9, { by: "deus" }), // "seis dias trabalharás, e farás toda a tua obra"
      b(10, { by: "deus" }), // "o sétimo dia é o sábado do Senhor teu Deus; não farás nenhuma obra"
      b(11, { by: "deus", env: { glory: 0.95 } }), // "em seis dias fez o Senhor os céus e a terra... e abençoou o dia do sábado"
      b(12, { by: "deus" }), // "honra a teu pai e a tua mãe, para que se prolonguem os teus dias"
      b(13, { by: "deus", env: { fire: 0.9 } }), // "não matarás"
      b(14, { by: "deus" }), // "não adulterarás"
      b(15, { by: "deus" }), // "não furtarás"
      b(16, { by: "deus" }), // "não dirás falso testemunho contra o teu próximo"
      b(17, { by: "deus", env: { glory: 0.9 } }), // "não cobiçarás a casa do teu próximo, nem coisa alguma do teu próximo"
      b(18, { cast: [C("multidao", 60, "walk", { dy: 0.52, facing: -1 }), C("multidao", 160, "walk", { scale: 0.9, dy: 0.56, id: "povo2", facing: -1 }), C("moises", -120, "stand", { dy: 0.5, facing: 1 })], env: { storm: 0.6, fire: 0.75, glory: 0.6, night: 0.4 } }), // o povo vê os trovões e o monte fumegando, e retira-se, pondo-se de longe
      b(19, { by: "multidao", q: "E disseram a Moisés: ", cast: [C("multidao", 90, "point", { dy: 0.52, facing: -1 }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })], env: { storm: 0.5, fire: 0.7 } }), // "fala tu conosco, e ouviremos; não fale Deus conosco, para que não morramos"
      b(20, { by: "moises", q: "E disse Moisés ao povo: ", cast: [C("moises", -80, "raise", { dy: 0.5, facing: 1 }), C("multidao", 60, "stand", { dy: 0.52, facing: -1 })], env: { glory: 0.65, fire: 0.6 } }), // "não temais; Deus veio para vos provar, para que o seu temor esteja diante de vós"
      b(21, { cast: [C("moises", -30, "walk", { dy: 0.44, facing: 1 }), C("multidao", 140, "stand", { dy: 0.54, facing: -1 })], env: { fire: 0.85, night: 0.5, glory: 0.7, storm: 0.4 } }), // o povo fica de longe; Moisés chega-se à escuridão onde Deus estava
      b(22, { by: "deus", q: "Então disse o Senhor a Moisés: Assim dirás aos filhos de Israel: ", cast: [C("moises", -30, "stand", { dy: 0.44, facing: 1 })], env: { glory: 0.8, fire: 0.75 } }), // "vós tendes visto que, dos céus, eu falei convosco"
      b(23, { by: "deus" }), // "não fareis deuses de prata nem de ouro para vós"
      b(24, { by: "deus", env: { glory: 0.82 } }), // "um altar de terra me farás... virei a ti e te abençoarei"
      b(25, { by: "deus" }), // "se me fizeres um altar de pedras, não o farás de pedras lavradas"
      b(26, { by: "deus" }), // "não subirás ao meu altar por degraus"
    ],
  },
};
