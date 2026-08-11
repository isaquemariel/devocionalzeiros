import { build } from "esbuild";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
const ROOT = "/home/user/devocionalzeiros";
const tmp = mkdtempSync(join(tmpdir(), "sim-"));
const entry = join(tmp, "entry.mjs");
writeFileSync(entry, `
export { STAGE_BOOKS } from "${join(ROOT, "src/lib/rpgStageRegistry.ts")}";
export { namedActorInfo } from "${join(ROOT, "src/lib/rpgStageInfo.ts")}";
`);
await build({ entryPoints:[entry], bundle:true, format:"esm", outfile: join(tmp,"out.mjs"), alias:{"@":join(ROOT,"src")}, logLevel:"silent" });
const M = await import(pathToFileURL(join(tmp,"out.mjs")).href);
const { STAGE_BOOKS, namedActorInfo } = M;
const SPEAKER_NAME = M.SPEAKER_NAME ?? {};
const targets = [["judges",[20,21]],["ruth",[1,2,3,4]]];
for (const [book, chs] of targets) {
  for (const ch of chs) {
    const script = STAGE_BOOKS[book][ch];
    console.log(`\n===== ${book} ${ch} =====`);
    let cast=[], props=[], env={...(script.start??{})}, castFrom=null, propsFrom=null;
    for (const bt of script.beats) {
      if (bt.cast) { cast=bt.cast; castFrom=bt.v; }
      if (bt.props) { props=bt.props; propsFrom=bt.v; }
      if (bt.env) env={...env,...bt.env};
      const inh = (bt.cast? "" : ` [cast herdado de v.${castFrom}]`) + (bt.props? "":` [props herdados de v.${propsFrom}]`);
      let line = `v.${bt.v}${inh}`;
      if (bt.by) {
        if (bt.by === "deus") line += `  BY=deus (voz do céu) glory=${env.glory} terrain=${env.terrain}`;
        else {
          const sp = cast.find(c=>c.id===bt.by) ?? cast.find(c=>c.role===bt.by);
          const named = sp?.id ? namedActorInfo(sp.id)?.title : undefined;
          line += `  BY=${bt.by} -> ${sp? `id=${sp.id??"(sem id)"} pose=${sp.pose}` : "ÓRFÃO(narrador)"} | nomeBalão="${named ?? SPEAKER_NAME[bt.by] ?? bt.by}"`;
        }
      }
      const roles = cast.map(c=>`${c.role}:${c.id??"-"}:${c.pose??"-"}`).join(", ");
      const glowy = cast.filter(c=>c.glow!=null).map(c=>`${c.id??c.role}(glow=${c.glow})`);
      line += `\n     cast[${roles}]`;
      if (glowy.length) line += `\n     GLOW: ${glowy.join(", ")}`;
      line += `\n     props: ${props.map(p=>p.kind+(p.fire?`(fire=${p.fire})`:"")+(p.sky?"[sky]":"")).join(", ")}`;
      line += `\n     env: ${JSON.stringify(env)}`;
      console.log(line);
    }
  }
}
