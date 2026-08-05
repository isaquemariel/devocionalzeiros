import { build } from "esbuild";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = "/home/user/devocionalzeiros";
const tmp = mkdtempSync(join(tmpdir(), "smoke-"));
writeFileSync(join(tmp, "entry.mjs"), `
export { BEING_ROLES, drawBeingHD, beingHeight } from "${ROOT}/src/lib/rpgStageBeings.ts";
export { drawPropHD, drawBackdropHD } from "${ROOT}/src/lib/rpgStageHD.ts";
export { makeDrawState } from "${ROOT}/src/lib/rpgStage.ts";
`);
await build({ entryPoints: [join(tmp, "entry.mjs")], bundle: true, format: "esm", outfile: join(tmp, "out.mjs"), alias: { "@": join(ROOT, "src") }, logLevel: "silent" });
const { BEING_ROLES, drawBeingHD, beingHeight, drawPropHD, drawBackdropHD, makeDrawState } = await import(pathToFileURL(join(tmp, "out.mjs")).href);

// contexto 2D falso: aceita qualquer chamada/atribuição; gradientes com addColorStop
const grad = { addColorStop: () => {} };
const ctx = new Proxy({}, {
  get: (o, k) => {
    if (k === "createLinearGradient" || k === "createRadialGradient" || k === "createConicGradient") return () => grad;
    if (k === "measureText") return () => ({ width: 10 });
    if (k === "getTransform") return () => ({ a:1,b:0,c:0,d:1,e:0,f:0 });
    if (typeof k === "string") return (o[k] ??= () => {});
    return undefined;
  },
  set: () => true,
});

let fail = 0;
const CASES = [];
for (const role of BEING_ROLES) {
  const palettes = role === "cavaleiro" ? ["branco","vermelho","preto","amarelo"]
    : role === "besta" ? ["mar","terra","escarlate"] : [undefined];
  for (const palette of palettes)
    for (const pose of ["stand","walk","flyIdle","lie","raise","kneel"])
      for (const facing of [1,-1])
        CASES.push({ role, palette, pose, facing });
}
for (const c of CASES) {
  for (const t of [0, 1234.5, 99999]) {
    try { drawBeingHD(ctx, 100, 200, { ...c, t, scale: 0.9, glow: 0.5, alpha: 0.8, reduce: t === 0 }); }
    catch (e) { fail++; console.error(`✗ drawBeingHD ${JSON.stringify(c)} t=${t}: ${e.message}`); break; }
  }
  const h = beingHeight(c.role);
  if (!(h > 0)) { fail++; console.error(`✗ beingHeight(${c.role}) = ${h}`); }
}
const ALL_PROPS = ["palm","rock","lampstand","church","tower","ziggurat","tree","star","door","amphora","crate","well","stall","bush","grass","river","altar","tent","boat","campfire","scroll","throne","trumpet","bowl","censer","ark","arkship","ladder","rainbow","sheaf","treeOfLife","treeOfKnowledge","edenRiver","riverFork","flamingSword","cherub","sun","moon","starfield","birds","clouds","firmament"];
for (const kind of ALL_PROPS) {
  for (const t of [0, 1234.5]) {
    try { drawPropHD(ctx, kind, 100, 200, { scale: 1, t, reduce: t === 0, fire: 0.5 }); }
    catch (e) { fail++; console.error(`✗ drawPropHD ${kind} t=${t}: ${e.message}`); }
  }
}
// fundos: todos os terrenos, com e sem intempéries
const TERRAINS = ["patmos","glory","city","field","throne","garden","desert","mountain","abyss"];
for (const terrain of TERRAINS) {
  for (const env of [{ night: 0, glory: 0, storm: 0, fire: 0 }, { night: 0.9, glory: 0.6, storm: 0.7, fire: 0.5 }]) {
    const state = makeDrawState({ start: { terrain, ...env }, beats: [{ v: 1 }] });
    for (const t of [0, 4321.5]) {
      try { drawBackdropHD(ctx, { dims: { W: 420, H: 256, GROUND: 112, BOT: 230 }, t, reduce: t === 0, state }); }
      catch (e) { fail++; console.error(`✗ drawBackdropHD ${terrain} t=${t}: ${e.message}`); }
    }
  }
}
console.log(`${CASES.length} combinações de seres + ${ALL_PROPS.length} props + ${TERRAINS.length} terrenos — ${fail} falha(s)`);
process.exit(fail ? 1 : 0);
