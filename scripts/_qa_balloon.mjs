import { build } from "esbuild";
import { writeFileSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const ROOT = "/home/user/devocionalzeiros";
const tmp = mkdtempSync(join(tmpdir(), "qa2-"));
const entry = join(tmp, "entry.mjs");
writeFileSync(entry, `
export { STAGE_BOOKS } from "${join(ROOT,"src/lib/rpgStageRegistry.ts")}";
export { balloonText } from "${join(ROOT,"src/lib/rpgStage.ts")}";
`);
await build({entryPoints:[entry],bundle:true,format:"esm",outfile:join(tmp,"o.mjs"),alias:{"@":join(ROOT,"src")},logLevel:"silent"});
const { STAGE_BOOKS, balloonText } = await import(pathToFileURL(join(tmp,"o.mjs")).href);
const bible = JSON.parse(readFileSync(join(ROOT,"public/bible/arc.json"),"utf8"));
for (const [book, chs] of [["judges",[20,21]],["ruth",[1,2,3,4]]]) {
  for (const ch of chs) {
    console.log(`\n##### ${book} ${ch}`);
    for (const bt of STAGE_BOOKS[book][ch].beats) {
      if (!bt.by) continue;
      const raw = bible[book].chapters[ch-1][bt.v-1];
      const text = raw?.t ?? raw;
      const out = balloonText(text, bt.q);
      const full = out === text;
      console.log(`v.${bt.v} by=${bt.by} q=${JSON.stringify(bt.q ?? null)} ${full?"[VERSÍCULO INTEIRO NO BALÃO]":"[recorte]"}\n    BALÃO: ${out}`);
    }
  }
}
