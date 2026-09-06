// ============================================================================
// TODAS as fichas de uma vez — SÓ PARA FERRAMENTA.
//
// O app carrega as fichas por livro (ver `ensureStageInfo` em rpgStageInfo.ts).
// Os validadores, porém, varrem os 19 livros de enfiada e precisam de tudo no
// ar de forma síncrona. Este módulo registra todos os pacotes na importação e
// reexporta os resolvedores já prontos.
//
// NÃO IMPORTE ISTO NO APP: puxaria de volta os 4,7 MB de fichas para dentro do
// primeiro carregamento, que é exatamente o que a separação por livro desfez.
// ============================================================================
import { registerStageInfo } from "@/lib/rpgStageInfo";
import { PACK as P_1chronicles } from "@/lib/stageInfo/pack/stageinfo-1chronicles";
import { PACK as P_1kings } from "@/lib/stageInfo/pack/stageinfo-1kings";
import { PACK as P_1samuel } from "@/lib/stageInfo/pack/stageinfo-1samuel";
import { PACK as P_2chronicles } from "@/lib/stageInfo/pack/stageinfo-2chronicles";
import { PACK as P_2kings } from "@/lib/stageInfo/pack/stageinfo-2kings";
import { PACK as P_2samuel } from "@/lib/stageInfo/pack/stageinfo-2samuel";
import { PACK as P_deuteronomy } from "@/lib/stageInfo/pack/stageinfo-deuteronomy";
import { PACK as P_esther } from "@/lib/stageInfo/pack/stageinfo-esther";
import { PACK as P_exodus } from "@/lib/stageInfo/pack/stageinfo-exodus";
import { PACK as P_ezra } from "@/lib/stageInfo/pack/stageinfo-ezra";
import { PACK as P_genesis } from "@/lib/stageInfo/pack/stageinfo-genesis";
import { PACK as P_job } from "@/lib/stageInfo/pack/stageinfo-job";
import { PACK as P_joshua } from "@/lib/stageInfo/pack/stageinfo-joshua";
import { PACK as P_judges } from "@/lib/stageInfo/pack/stageinfo-judges";
import { PACK as P_leviticus } from "@/lib/stageInfo/pack/stageinfo-leviticus";
import { PACK as P_nehemiah } from "@/lib/stageInfo/pack/stageinfo-nehemiah";
import { PACK as P_numbers } from "@/lib/stageInfo/pack/stageinfo-numbers";
import { PACK as P_revelation } from "@/lib/stageInfo/pack/stageinfo-revelation";
import { PACK as P_ruth } from "@/lib/stageInfo/pack/stageinfo-ruth";

registerStageInfo("1chronicles", P_1chronicles);
registerStageInfo("1kings", P_1kings);
registerStageInfo("1samuel", P_1samuel);
registerStageInfo("2chronicles", P_2chronicles);
registerStageInfo("2kings", P_2kings);
registerStageInfo("2samuel", P_2samuel);
registerStageInfo("deuteronomy", P_deuteronomy);
registerStageInfo("esther", P_esther);
registerStageInfo("exodus", P_exodus);
registerStageInfo("ezra", P_ezra);
registerStageInfo("genesis", P_genesis);
registerStageInfo("job", P_job);
registerStageInfo("joshua", P_joshua);
registerStageInfo("judges", P_judges);
registerStageInfo("leviticus", P_leviticus);
registerStageInfo("nehemiah", P_nehemiah);
registerStageInfo("numbers", P_numbers);
registerStageInfo("revelation", P_revelation);
registerStageInfo("ruth", P_ruth);

export { actorInfo, namedActorInfo, propInfo, propTagInfo, propBadgeInfo, ACTOR_INFO, PROP_INFO } from "@/lib/rpgStageInfo";
export type { StageInfo, StageInfoPack } from "@/lib/rpgStageInfo";

/** Todas as fichas de objeto-marco (por `tag`), reunidas dos 19 pacotes — é o
 *  que o checkup usa para cobrar `tag-sem-ficha`. */
export const PROP_TAG_INFO: Record<string, import("@/lib/rpgStageInfo").StageInfo> = Object.assign(
  {},
  P_1chronicles.tags,
  P_1kings.tags,
  P_1samuel.tags,
  P_2chronicles.tags,
  P_2kings.tags,
  P_2samuel.tags,
  P_deuteronomy.tags,
  P_esther.tags,
  P_exodus.tags,
  P_ezra.tags,
  P_genesis.tags,
  P_job.tags,
  P_joshua.tags,
  P_judges.tags,
  P_leviticus.tags,
  P_nehemiah.tags,
  P_numbers.tags,
  P_revelation.tags,
  P_ruth.tags,
);

/** Todas as fichas de personagem (por `id`), reunidas dos 19 pacotes. */
export const CHAR_INFO: Record<string, import("@/lib/rpgStageInfo").StageInfo> = Object.assign(
  {},
  P_1chronicles.chars,
  P_1kings.chars,
  P_1samuel.chars,
  P_2chronicles.chars,
  P_2kings.chars,
  P_2samuel.chars,
  P_deuteronomy.chars,
  P_esther.chars,
  P_exodus.chars,
  P_ezra.chars,
  P_genesis.chars,
  P_job.chars,
  P_joshua.chars,
  P_judges.chars,
  P_leviticus.chars,
  P_nehemiah.chars,
  P_numbers.chars,
  P_revelation.chars,
  P_ruth.chars,
);

/** Cada pacote SEPARADO, por livro — o checkup precisa saber em QUE arquivo
 *  cada ficha está, não só que ela existe em algum lugar. */
export const PACKS: Record<string, import("@/lib/rpgStageInfo").StageInfoPack> = {
  "1chronicles": P_1chronicles,
  "1kings": P_1kings,
  "1samuel": P_1samuel,
  "2chronicles": P_2chronicles,
  "2kings": P_2kings,
  "2samuel": P_2samuel,
  deuteronomy: P_deuteronomy,
  esther: P_esther,
  exodus: P_exodus,
  ezra: P_ezra,
  genesis: P_genesis,
  job: P_job,
  joshua: P_joshua,
  judges: P_judges,
  leviticus: P_leviticus,
  nehemiah: P_nehemiah,
  numbers: P_numbers,
  revelation: P_revelation,
  ruth: P_ruth,
};
