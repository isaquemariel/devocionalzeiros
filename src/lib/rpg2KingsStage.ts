// ============================================================================
// 2 REIS — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC.
//
// O livro da PALAVRA QUE SE CUMPRE e do reino que acaba: o carro de fogo e o
// redemoinho que tomam Elias, o manto que fica na mão de Eliseu e ainda divide
// o Jordão, a botija de azeite que só para quando falta vasilha, o menino da
// sunamita que espirra sete vezes, o ferro do machado que vem a nadar, o monte
// cheio de cavalos e carros de fogo em redor do profeta, os quatro leprosos que
// dizem "este dia é dia de boas novas, e nos calamos". Depois Jeú guiando com
// fúria, Jezabel na janela, Atalia e o menino coroado com o testemunho. E então
// a descida: o cordel de Samaria e o prumo da casa de Acabe, a carta de
// Senaqueribe estendida diante do SENHOR, o livro da lei achado na casa em obra,
// as fogueiras de Josias no Cedrom, e por fim as duas colunas medidas côvado a
// côvado antes de os caldeus as fazerem em pedaços. Acaba numa luz pequena:
// Joaquin tirado da prisão, comendo pão à mesa do rei todos os dias da sua vida.
// Os capítulos vivem em src/lib/stage/2kings/chXX_YY.ts.
//
// FORMA DOS ARQUIVOS. Três arquivos exportam `CHAPTERS` já como StageScript
// ({ start, beats }); os outros sete exportam só os beats, porque o pedido de
// autoria dizia `Record<number, StageBeat[]>`. `asScripts` abaixo iguala os
// dois: o `start` de cada capítulo é o ambiente declarado no PRIMEIRO beat, que
// em todos eles é completo — então o quadro inicial é exatamente o mesmo, e o
// motor não cai nos defaults de `envAt` (verdure 1, terrain "field").
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs && node scripts/checkup-stage.mjs
//   node scripts/qa-stage.mjs 2kings
// ============================================================================

import type { StageBeat, StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_02 } from "@/lib/stage/2kings/ch01_02";
import { CH03_04 } from "@/lib/stage/2kings/ch03_04";
import { CH05_07 } from "@/lib/stage/2kings/ch05_07";
import { CHAPTERS as CH08_10 } from "@/lib/stage/2kings/ch08_10";
import { CHAPTERS as CH11_13 } from "@/lib/stage/2kings/ch11_13";
import { CH14_17 } from "@/lib/stage/2kings/ch14_17";
import { CH18_19 } from "@/lib/stage/2kings/ch18_19";
import { CH20_21 } from "@/lib/stage/2kings/ch20_21";
import { CH22_23 } from "@/lib/stage/2kings/ch22_23";
import { CH24_25 } from "@/lib/stage/2kings/ch24_25";

const asScripts = (byChapter: Record<number, StageBeat[]>): Record<number, StageScript> =>
  Object.fromEntries(
    Object.entries(byChapter).map(([ch, beats]) => [ch, { start: { ...beats[0].env }, beats }]),
  );

export const SECOND_KINGS_STAGE: Record<number, StageScript> = {
  ...CH01_02,
  ...asScripts(CH03_04),
  ...asScripts(CH05_07),
  ...CH08_10,
  ...CH11_13,
  ...asScripts(CH14_17),
  ...asScripts(CH18_19),
  ...asScripts(CH20_21),
  ...asScripts(CH22_23),
  ...asScripts(CH24_25),
};
