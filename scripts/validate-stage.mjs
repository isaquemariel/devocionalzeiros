#!/usr/bin/env node
// ============================================================================
// VALIDADOR dos roteiros da CENA VIVA — roda em CI/local antes de qualquer
// merge de conteúdo. Confere cada capítulo registrado contra o texto bíblico
// REAL (public/bible/arc.json):
//   • beats = v.1..N (todos os versículos, em ordem, sem falta/sobra)
//   • `q` é substring exata do versículo (senão o balão sai errado)
//   • roles/poses/props/terrenos dentro das listas suportadas pelo motor
//   • padrão de palco: sem props sobrepostos (dx±25 & dy±0.15)
// Uso: node scripts/validate-stage.mjs
// ============================================================================
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(new URL("..", import.meta.url).pathname);

const ROLES = new Set(["joao","cristo","anjo","anciao","servivente","cordeiro","dragao","besta","cavaleiro","multidao","mulher","homem","mulherComum","hero"]);
const POSES = new Set(["stand","walk","kneel","bow","raise","write","point","lie","flyIdle"]);
const PROPS = new Set(["palm","rock","lampstand","church","tower","tree","star","door","amphora","crate","well","stall","bush","grass","river","altar","tent","boat","campfire","scroll","throne","trumpet","bowl","censer","ark"]);
const TERRAINS = new Set(["patmos","glory","city","field","throne"]);

// bundle only the registry (type-only imports elsewhere keep this light)
const tmp = mkdtempSync(join(tmpdir(), "stage-val-"));
const entry = join(tmp, "entry.mjs");
writeFileSync(entry, `export { STAGE_BOOKS } from "${join(ROOT, "src/lib/rpgStageRegistry.ts")}";\n`);
await build({
  entryPoints: [entry],
  bundle: true,
  format: "esm",
  outfile: join(tmp, "out.mjs"),
  alias: { "@": join(ROOT, "src") },
  logLevel: "silent",
});
const { STAGE_BOOKS } = await import(pathToFileURL(join(tmp, "out.mjs")).href);
const bible = JSON.parse(readFileSync(join(ROOT, "public/bible/arc.json"), "utf8"));

let errors = 0, warnings = 0, chapters = 0, beats = 0;
const err = (m) => { errors++; console.error("  ✗ " + m); };
const warn = (m) => { warnings++; console.warn("  ⚠ " + m); };

for (const [bookId, chaptersMap] of Object.entries(STAGE_BOOKS)) {
  const bb = bible[bookId];
  if (!bb) { console.error(`LIVRO ${bookId}: não existe no arc.json`); errors++; continue; }
  for (const [chStr, script] of Object.entries(chaptersMap)) {
    const ch = Number(chStr);
    chapters++;
    const verses = bb.chapters[ch - 1];
    const tag = `${bookId} ${ch}`;
    console.log(`— ${tag} (${script.beats.length} beats / ${verses?.length ?? "?"} vv)`);
    if (!verses) { err(`capítulo ${ch} não existe no arc.json`); continue; }
    if (script.start?.terrain && !TERRAINS.has(script.start.terrain)) err(`terreno inicial inválido: ${script.start.terrain}`);
    // beats 1..N em ordem
    const vs = script.beats.map((b) => b.v);
    const want = Array.from({ length: verses.length }, (_, i) => i + 1);
    if (vs.length !== want.length || vs.some((v, i) => v !== want[i])) {
      err(`beats devem ser v.1..${verses.length} em ordem — recebi [${vs.slice(0, 8).join(",")}${vs.length > 8 ? ",…" : ""}] (${vs.length})`);
    }
    let castNow = [];
    for (const bt of script.beats) {
      beats++;
      const raw = verses[bt.v - 1];
      const vtext = (typeof raw === "string" ? raw : raw?.t) ?? "";
      if (bt.q && !vtext.includes(bt.q)) err(`v.${bt.v}: q ${JSON.stringify(bt.q)} não é substring do versículo ARC`);
      if (bt.by && !ROLES.has(bt.by)) err(`v.${bt.v}: by role inválido "${bt.by}"`);
      if (bt.env?.terrain && !TERRAINS.has(bt.env.terrain)) err(`v.${bt.v}: terreno inválido "${bt.env.terrain}"`);
      for (const k of ["night","glory","storm","fire"]) {
        const val = bt.env?.[k];
        if (val != null && (val < 0 || val > 1)) err(`v.${bt.v}: env.${k}=${val} fora de 0..1`);
      }
      if (bt.cast) {
        castNow = bt.cast;
        for (const c of bt.cast) {
          if (!ROLES.has(c.role)) err(`v.${bt.v}: cast role inválido "${c.role}"`);
          if (c.pose && !POSES.has(c.pose)) err(`v.${bt.v}: pose inválida "${c.pose}"`);
          if (Math.abs(c.dx) > 340) warn(`v.${bt.v}: cast ${c.role} dx=${c.dx} fora do palco (±340)`);
          if (c.dy != null && (c.dy < 0 || c.dy > 1)) err(`v.${bt.v}: cast ${c.role} dy=${c.dy} fora de 0..1`);
        }
      }
      if (bt.props) {
        for (const p of bt.props) {
          if (!PROPS.has(p.kind)) err(`v.${bt.v}: prop inválido "${p.kind}"`);
          if (Math.abs(p.dx) > 340) warn(`v.${bt.v}: prop ${p.kind} dx=${p.dx} fora do palco (±340)`);
        }
        // sobreposição de MARCOS (props grandes que disputam a mesma vaga e o
        // badge "?"). Cenografia miúda (grass/bush/rock/amphora/crate) e
        // conjuntos intencionais (arco de castiçais) não geram ruído.
        const LANDMARK = new Set(["church","tower","tree","door","star","throne","altar","ark","well","stall","boat","tent","river","scroll","campfire","trumpet","bowl","censer"]);
        const marks = bt.props.filter((p) => LANDMARK.has(p.kind));
        for (let i = 0; i < marks.length; i++) for (let j = i + 1; j < marks.length; j++) {
          const a = marks[i], b2 = marks[j];
          const dyA = a.dy ?? 0.28, dyB = b2.dy ?? 0.28;
          if (Math.abs(a.dx - b2.dx) < 25 && Math.abs(dyA - dyB) < 0.15) {
            warn(`v.${bt.v}: marcos sobrepostos ${a.kind}@${a.dx} × ${b2.kind}@${b2.dx}`);
          }
        }
      }
    }
  }
}

console.log(`\n${chapters} capítulos, ${beats} beats — ${errors} erro(s), ${warnings} aviso(s)`);
process.exit(errors > 0 ? 1 : 0);
