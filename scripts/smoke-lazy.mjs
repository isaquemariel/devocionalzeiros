#!/usr/bin/env node
// ============================================================================
// SMOKE DA CARGA POR LIVRO — o que os validadores não veem.
//
// `validate-stage`, `checkup-stage` e `qa-stage` leem os roteiros pelo
// agregador de ferramenta, com TUDO no ar de uma vez. Eles nunca percebem se o
// app, que carrega por livro, deixou de achar uma ficha ou se um pedaço voltou
// para dentro do pré-cache do service worker. Este script cobre esses dois:
//
//   A) FUNCIONAL — ensureStageInfo("job") põe no ar a ficha de personagem, a de
//      objeto-marco e a de capítulo daquele livro, e um livro não carregado
//      continua respondendo null (é o que prova que a separação é real).
//   B) EMPACOTAMENTO — no dist, cada livro tem o seu pedaço de ficha, pedido
//      por import(), e nenhum deles entra na lista de pré-cache.
//
// A parte B precisa de um build: rode `npx vite build` antes.
//   node scripts/smoke-lazy.mjs
// ============================================================================
import { build } from "esbuild";
import { readFileSync, readdirSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
const ROOT = resolve(new URL("..", import.meta.url).pathname);

const tmp = mkdtempSync(join(tmpdir(), "fichas-"));
await build({
  stdin: { contents: `export * from "${join(ROOT, "src/lib/rpgStageInfo.ts")}";`, resolveDir: ROOT, loader: "ts" },
  bundle: true, format: "esm", splitting: true, outdir: tmp,
  alias: { "@": join(ROOT, "src") }, logLevel: "silent", entryNames: "entrada",
});
const M = await import(pathToFileURL(join(tmp, "entrada.js")).href);

let falhas = 0;
const ok = (c, m) => { console.log((c ? "  ✅ " : "  ❌ ") + m); if (!c) falhas++; };

console.log("A) registro sob demanda");
ok(M.namedActorInfo("jo") === null, "antes de carregar, a ficha de Jó responde null");
ok(M.propTagInfo("coluna-betel") === null, "antes de carregar, a ficha da coluna de Betel responde null");
await M.ensureStageInfo("job");
ok(M.stageInfoReady("job"), "ensureStageInfo(\"job\") deixa o livro pronto");
ok(!!M.namedActorInfo("jo")?.title, `Jó agora tem ficha: "${M.namedActorInfo("jo")?.title ?? "—"}"`);
ok(!!M.actorInfo("homem", "job", undefined, 2)?.title, "a ficha de capítulo de Jó 2 resolve");
ok(M.namedActorInfo("raabe") === null, "Raabe (Josué) segue fora — o pacote é MESMO por livro");
await M.ensureStageInfo("joshua");
ok(!!M.namedActorInfo("raabe")?.title, `depois de Josué, Raabe aparece: "${M.namedActorInfo("raabe")?.title ?? "—"}"`);
await M.ensureStageInfo("genesis");
ok(!!M.propTagInfo("coluna-betel")?.title, "a coluna de Betel resolve com o Gênesis no ar");
ok(!!M.namedActorInfo("tera")?.title, "Terá tem ficha no Gênesis (o id vem de um ajudante, não do literal)");
await M.ensureStageInfo("livro-que-nao-existe");
ok(true, "um livro sem pacote resolve sem estourar");

console.log("\nB) empacotamento no dist");
const assets = readdirSync(join(ROOT, "dist/assets"));
const packs = assets.filter((f) => /^stageinfo-[\w-]+\.js$/.test(f));
ok(packs.length === 19, `${packs.length} pedaços de ficha, um por livro (esperado 19)`);
const sw = readFileSync(join(ROOT, "dist/sw.js"), "utf8");
// só a LISTA de pré-cache — o sw.js também contém a regra de runtime, que cita
// esses mesmos nomes de propósito (foi nisso que a primeira versão deste teste
// tropeçou e acusou falha onde o build estava certo).
const manifesto = [...sw.matchAll(/url:"([^"]+)"/g)].map((m) => m[1]);
const intrusos = manifesto.filter((u) => /(stageinfo-|rpg[A-Za-z]*Stage-|assets\/RPG-)/.test(u));
ok(intrusos.length === 0, `nenhum pedaço de RPG no pré-cache (${manifesto.length} arquivos listados${intrusos.length ? " — intrusos: " + intrusos.join(", ") : ""})`);
const rpg = assets.find((f) => /^RPG-[\w-]+\.js$/.test(f));
const txt = readFileSync(join(ROOT, "dist/assets/" + rpg), "utf8");
const dyn = [...txt.matchAll(/import\("\.\/(stageinfo-[\w-]+\.js)"\)/g)].map((m) => m[1]);
ok(dyn.length === 19, `o núcleo pede os 19 pacotes por import() (achei ${dyn.length})`);
const kb = (f) => Math.round(readFileSync(join(ROOT, "dist/assets/" + f)).length / 1024);
console.log(`     núcleo RPG: ${kb(rpg)} KB · maior pacote de ficha: ${Math.max(...packs.map(kb))} KB · menor: ${Math.min(...packs.map(kb))} KB`);

console.log(falhas ? `\n✗ ${falhas} falha(s)` : "\n✓ tudo certo");
process.exit(falhas ? 1 : 0);
