// Fichas por (capítulo → papel) de JÓ — rede de segurança contextual para os
// figurantes anônimos (o `id` nomeado vence esta ficha; ver actorInfo).
// Agrega as faixas autorais do livro.
//
// São quarenta e dois capítulos em que o palco quase nunca mostra os cinco
// homens sentados na cinza: mostra o que a fala VÊ. Por isso o figurante de Jó
// nunca é "um homem do povo" — é a figura da imagem daquele versículo. O
// mensageiro que chega sozinho e diz "só eu escapei"; o oleiro do barro de que
// o homem foi formado; o mineiro pendurado no poço cortado longe dos homens; os
// idosos que se levantavam à porta e os moços de menos idade que agora cospem;
// o cego de quem Jó se fazia olhos e o coxo de quem se fazia pés; a viúva cujo
// coração ele fazia rejubilar e a serva cujo direito ele não desprezou; o moço
// Eliú, que ninguém anunciou; o pastor avisado do temporal pelo gado; a cabra
// montesa que pare no rochedo, o jumento montês que se ri do ruído da cidade, a
// avestruz que se esquece dos ovos no pó e o cavalo que ao soar das buzinas diz
// "Eia!"; e, no fim, as três filhas que receberam herança entre seus irmãos.
import type { StageInfo } from "@/lib/rpgStageInfo";
import { CHAPTER_ACTORS_01_14 } from "@/lib/stageInfo/job-01-14";
import { CHAPTER_ACTORS_15_28 } from "@/lib/stageInfo/job-15-28";
import { CHAPTER_ACTORS_29_42 } from "@/lib/stageInfo/job-29-42";

export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  ...CHAPTER_ACTORS_01_14,
  ...CHAPTER_ACTORS_15_28,
  ...CHAPTER_ACTORS_29_42,
};
