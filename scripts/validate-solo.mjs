#!/usr/bin/env node
// ============================================================================
// VALIDADOR SOLO — confere um arquivo de cena que AINDA NÃO ESTÁ no registro.
//
// `validate-stage.mjs`, `checkup-stage.mjs` e `qa-stage.mjs` leem STAGE_BOOKS.
// Enquanto um livro novo não entra em `rpgStageRegistry.ts`, nenhum dos três o
// alcança — e foi por isso que 2 Crônicas passou o livro inteiro a ser escrito
// com verificadores improvisados em /tmp, um por autor, cada um replicando as
// regras de memória. Este script existe para não haver mais nenhum.
//
//   node scripts/validate-solo.mjs <livro> <arquivo.ts> [mais arquivos...]
//   node scripts/validate-solo.mjs job src/lib/stage/job/ch01_03.ts
//
// Cada arquivo tem de exportar `CHAPTERS: Record<number, StageScript>`.
// Sai com código 1 se houver erro.
// ============================================================================
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdtempSync, readdirSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const [livro, ...arquivos] = process.argv.slice(2);
if (!livro || !arquivos.length) {
  console.error("uso: node scripts/validate-solo.mjs <livro> <arquivo.ts> [...]");
  process.exit(2);
}

const ROLES = new Set(["joao","cristo","anjo","anciao","servivente","cordeiro","dragao","besta","cavaleiro","multidao","mulher","homem","mulherComum","hero","adao","eva","serpente","rebanho","noe","abraao","sara","isaque","rebeca","jaco","esau","jose","farao","rei","pastor","servo","patriarca","melquisedeque","moises","arao","deus"]);
const POSES = new Set(["stand","walk","kneel","bow","raise","write","point","lie","flyIdle"]);
const PROPS = new Set(["palm","rock","lampstand","menorah","calf","serpent","manna","hail","pillar","frogs","locusts","grapes","bronzeSerpent","rod","tablets","church","tower","tree","star","door","doorBlood","amphora","crate","well","stall","bush","grass","river","altar","tent","boat","campfire","scroll","throne","trumpet","bowl","censer","ark","arkship","ladder","rainbow","sheaf","ziggurat","treeOfLife","treeOfKnowledge","edenRiver","riverFork","flamingSword","cherub","sun","moon","starfield","birds","clouds","firmament","sword","spear","bow","crown","harp","bed","pool","chariot","horse","donkey","column","table"]);
const TERRAINS = new Set(["patmos","glory","city","field","throne","garden","desert","mountain","abyss"]);
const SKY_ONLY = new Set(["sun","moon","starfield","birds","clouds","firmament"]);
const LANDMARK = new Set(["church","tower","ziggurat","tree","door","star","throne","altar","ark","well","stall","boat","tent","river","scroll","campfire","trumpet","bowl","censer","treeOfLife","treeOfKnowledge","edenRiver","riverFork","arkship","ladder","rainbow","cherub","bed","pool","chariot","horse","donkey","column","table"]);
// papéis de rpgStageBeings: não leem a pose como as figuras humanas
const BEINGS = new Set(["multidao","mulher","cavaleiro","rebanho","besta","cordeiro","servivente","dragao","serpente"]);
const TOMBA  = new Set(["cavaleiro","besta","cordeiro","servivente","mulher","dragao","serpente"]);

const tmp = mkdtempSync(join(tmpdir(), "solo-"));
writeFileSync(join(tmp, "e.mjs"),
  arquivos.map((f, i) => `export { CHAPTERS as C${i} } from "${resolve(f)}";`).join("\n"));
await build({ entryPoints: [join(tmp, "e.mjs")], bundle: true, format: "esm",
  outfile: join(tmp, "o.mjs"), alias: { "@": join(ROOT, "src") }, logLevel: "silent" });
const M = await import(pathToFileURL(join(tmp, "o.mjs")).href);

const bible = JSON.parse(readFileSync(join(ROOT, "public/bible/arc.json"), "utf8"));
const book = bible[livro]?.chapters;
if (!book) { console.error(`livro "${livro}" não existe em arc.json`); process.exit(2); }
// As fichas de objeto-marco vivem agora em src/lib/stageInfo/tags/<livro>.ts
// (uma por livro, para virem sob demanda). Varre todos, mais o que ainda estiver
// solto em rpgStageInfo.ts, para saber que `tag` já tem verbete.
const fontesDeFicha = [join(ROOT, "src/lib/rpgStageInfo.ts")];
{
  const dir = join(ROOT, "src/lib/stageInfo/tags");
  if (existsSync(dir)) for (const f of readdirSync(dir)) fontesDeFicha.push(join(dir, f));
}
const info = fontesDeFicha.map((f) => readFileSync(f, "utf8")).join("\n");
const temFicha = new Set([...info.matchAll(/^\s{2}"?([a-z0-9-]+)"?:\s*\{/gm)].map((m) => m[1]));

let erros = 0, avisos = 0;
const tags = new Set(), ids = new Set();
const err = (m) => { erros++; console.error("  ✗ " + m); };
const warn = (m) => { avisos++; console.warn("  ⚠ " + m); };

const vistos = new Set();
for (let i = 0; i < arquivos.length; i++) {
  const CH = M["C" + i];
  for (const ch of Object.keys(CH).map(Number).sort((a, b) => a - b)) {
    if (vistos.has(ch)) err(`capítulo ${ch} declarado em mais de um arquivo`);
    vistos.add(ch);
    const script = CH[ch], vv = book[ch - 1];
    if (!vv) { err(`${livro} ${ch}: capítulo não existe no ARC`); continue; }
    const nums = script.beats.map((b) => b.v);
    if (nums.length !== vv.length || nums.some((v, k) => v !== k + 1))
      err(`${livro} ${ch}: ${nums.length} beats para ${vv.length} versículos (ou fora de ordem)`);
    let cast = [], congelado = 0;
    let env = { ...(script.start ?? {}) };
    for (const bt of script.beats) {
      const at = `${livro} ${ch}:${bt.v}`;
      const t = vv[bt.v - 1]?.t ?? "";
      if (bt.q && !t.includes(bt.q)) err(`${at}: q NÃO é substring exata — "${bt.q}"`);
      if (bt.by && !ROLES.has(bt.by) && !(cast.some((c) => c.id === bt.by) || (bt.cast ?? []).some((c) => c.id === bt.by)))
        err(`${at}: by "${bt.by}" não é papel válido nem id de quem está em cena`);
      if (bt.env?.terrain && !TERRAINS.has(bt.env.terrain)) err(`${at}: terreno "${bt.env.terrain}"`);
      for (const k of ["night", "glory", "storm", "fire", "water", "verdure"]) {
        const x = bt.env?.[k];
        if (x != null && (x < 0 || x > 1)) err(`${at}: env.${k}=${x} fora de 0..1`);
      }
      // ÁGUA HERDADA: env é Object.assign, e water DESENHA uma faixa de mar
      const aguaAntes = env.water ?? 0;
      const declarouAgua = !!bt.env && Object.prototype.hasOwnProperty.call(bt.env, "water");
      if (bt.env) env = { ...env, ...bt.env };
      if (!declarouAgua && aguaAntes >= 0.15 && (bt.set || bt.env?.terrain))
        warn(`${at}: lugar novo com water=${aguaAntes} vindo por herança — declare water (0 se aqui não há água)`);
      if (bt.cast) {
        cast = bt.cast;
        for (const c of bt.cast) {
          if (!ROLES.has(c.role)) err(`${at}: role "${c.role}"`);
          if (c.pose && !POSES.has(c.pose)) err(`${at}: pose "${c.pose}"`);
          if (Math.abs(c.dx) > 340) err(`${at}: dx ${c.dx} fora do palco`);
          if (c.dy != null && (c.dy < 0 || c.dy > 1)) err(`${at}: dy ${c.dy}`);
          if (!c.id) err(`${at}: figurante "${c.role}" SEM id (cai na ficha genérica)`);
          else ids.add(c.id);
          if (BEINGS.has(c.role) && c.pose && c.pose !== "stand" && !(c.pose === "lie" && TOMBA.has(c.role)))
            warn(`${at}: pose "${c.pose}" descartada em "${c.role}" (papel de rpgStageBeings)`);
        }
        if (bt.cast.some((c) => c.pose === "lie") && bt.cast.some((c) => c.role === "multidao"))
          warn(`${at}: multidão (sempre desenhada comemorando) numa cena com caídos`);
      }
      if (bt.props) {
        for (const p of bt.props) {
          if (!PROPS.has(p.kind)) err(`${at}: prop "${p.kind}"`);
          if (Math.abs(p.dx) > 340) err(`${at}: prop ${p.kind} dx ${p.dx}`);
          if (SKY_ONLY.has(p.kind) && !p.sky) err(`${at}: ${p.kind} sem sky:true (cai no chão)`);
          if (p.tag) {
            tags.add(p.tag);
            if (!/^[a-z0-9-]+$/.test(p.tag)) err(`${at}: tag "${p.tag}" fora do padrão (a-z, 0-9, hífen)`);
          }
        }
        const astros = bt.props.filter((p) => p.kind === "sun" || p.kind === "moon");
        if (astros.length > 1) err(`${at}: ${astros.length} astros no mesmo céu`);
        const marcos = bt.props.filter((p) => LANDMARK.has(p.kind) && !p.sky);
        for (let a = 0; a < marcos.length; a++) for (let b = a + 1; b < marcos.length; b++) {
          const A = marcos[a], B = marcos[b];
          if (Math.abs(A.dx - B.dx) < 25 && Math.abs((A.dy ?? 0.28) - (B.dy ?? 0.28)) < 0.15)
            warn(`${at}: marcos sobrepostos ${A.kind}@${A.dx} × ${B.kind}@${B.dx}`);
        }
      }
      if (bt.by && bt.by !== "deus") {
        if (!cast.length) err(`${at}: fala com o palco vazio`);
        else if (!(cast.find((c) => c.id === bt.by) ?? cast.find((c) => c.role === bt.by)))
          warn(`${at}: balão órfão by:"${bt.by}" — vai para a barra do narrador`);
      }
      if (bt.by === "deus" && !(env.glory >= 0.5))
        warn(`${at}: voz do céu com glory=${env.glory ?? 0} (a regra pede glória alta)`);
      if (!bt.set && !bt.cast && !bt.props && !bt.env) {
        congelado++;
        if (congelado === 6) warn(`${at}: cena congelada (6+ beats sem mudar set/cast/props/env)`);
      } else congelado = 0;
    }
  }
}

const semFicha = [...tags].filter((t) => !temFicha.has(t)).sort();
console.log(`\n${livro} — capítulos ${[...vistos].sort((a,b)=>a-b).join(", ")}`);
console.log(`${ids.size} ids · ${tags.size} tags (${semFicha.length} ainda sem verbete em PROP_TAG_INFO)`);
if (semFicha.length) console.log("  " + semFicha.join("\n  "));
console.log(`\n${erros} erro(s), ${avisos} aviso(s)`);
process.exit(erros ? 1 : 0);
