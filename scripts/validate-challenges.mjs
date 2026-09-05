#!/usr/bin/env node
// ============================================================================
// VALIDADOR DOS JOGOS DE CAPÍTULO — o irmão que faltava de validate-stage.mjs.
//
// A cena viva é rigorosa: todo `q` tem de ser substring EXATA do ARC. Os jogos
// de fim de capítulo não tinham validador nenhum, e por isso citavam de memória
// — e às vezes ERRADO. O jogo "completar" de Ester ensinava "e se perecer,
// pereço" quando a ARC diz "pereci"; o de Josué ensinava "testemunha" onde o
// texto diz "testemunho"; o de 2 Samuel trocava "miséria" por "aflição".
// Um jogo que ensina a palavra errada é pior do que não ter jogo.
//
// O que se confere aqui:
//  1. COMPLETAR — a frase (before+answer+after) tem de bater com o versículo do
//     `ref`, e a `answer` tem de estar mesmo nele.
//  2. COMPLETAR — a resposta certa tem de estar entre as opções, e as opções
//     não podem ter repetidas.
//  3. ORDENAR — os `d` têm de ser 1..N sem buraco nem repetição.
//  4. LIGAR / MEMÓRIA — sem pares repetidos dos dois lados.
//  5. BOSS — a resposta certa tem de estar entre as opções.
//
// Uso:  node scripts/validate-challenges.mjs [livro ...]
// ============================================================================
import { build } from "esbuild";
import { writeFileSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const tmp = mkdtempSync(join(tmpdir(), "vch-"));
writeFileSync(join(tmp, "e.mjs"),
  `export { EXT_COMPLETE, EXT_ORDER, EXT_CONNECT, EXT_MEMORY, EXT_BOSS_QUESTIONS } from "${ROOT}/src/lib/rpgChallengeContent.ts";`);
await build({ entryPoints: [join(tmp, "e.mjs")], bundle: true, format: "esm",
  outfile: join(tmp, "o.mjs"), alias: { "@": join(ROOT, "src") }, logLevel: "silent" });
const X = await import(pathToFileURL(join(tmp, "o.mjs")).href);
const bible = JSON.parse(readFileSync(join(ROOT, "public/bible/arc.json"), "utf8"));

const alvo = new Set(process.argv.slice(2));
const usa = (chave) => !alvo.size || alvo.has(chave.split(":")[0]);
const norm = (x) => x.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
  .replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

let erros = 0, avisos = 0;
const err = (m) => { erros++; console.error("  ✗ " + m); };
const warn = (m) => { avisos++; console.warn("  ⚠ " + m); };

// 1-2. COMPLETAR
for (const [chave, c] of Object.entries(X.EXT_COMPLETE ?? {})) {
  if (!usa(chave)) continue;
  const [livro, cap] = chave.split(":");
  const verses = bible[livro]?.chapters?.[Number(cap) - 1];
  if (!verses) { err(`${chave}: capítulo não existe no ARC`); continue; }
  if (!c.options?.includes(c.answer)) err(`${chave}: a resposta "${c.answer}" não está entre as opções`);
  if (new Set(c.options).size !== c.options.length) warn(`${chave}: opções repetidas`);
  const frase = norm(`${c.before} ${c.answer} ${c.after}`);
  const palavras = frase.split(" ").filter((w) => w.length > 3);
  let melhor = 0;
  for (const v of verses) {
    const t = norm(v.t);
    const sc = palavras.filter((w) => t.includes(w)).length / Math.max(1, palavras.length);
    if (sc > melhor) melhor = sc;
  }
  const respostaNoTexto = verses.some((v) => norm(v.t).includes(norm(c.answer)));
  if (!respostaNoTexto) err(`${chave} (${c.ref}): a resposta "${c.answer}" NÃO aparece em nenhum versículo do capítulo`);
  else if (melhor < 0.6) warn(`${chave} (${c.ref}): a frase do jogo cobre só ${Math.round(melhor * 100)}% do versículo — parafraseada`);
}
// 3. ORDENAR
for (const [chave, c] of Object.entries(X.EXT_ORDER ?? {})) {
  if (!usa(chave)) continue;
  const ds = (c.items ?? []).map((i) => i.d).sort((a, b) => a - b);
  const esperado = ds.map((_, i) => i + 1);
  if (ds.join() !== esperado.join()) err(`${chave}: ordem "d" é [${ds.join(",")}], devia ser 1..${ds.length}`);
}
// 4. LIGAR / MEMÓRIA
for (const [nome, mapa] of [["ligar", X.EXT_CONNECT], ["memoria", X.EXT_MEMORY]]) {
  for (const [chave, c] of Object.entries(mapa ?? {})) {
    if (!usa(chave)) continue;
    const pares = c.pairs ?? [];
    const as = pares.map((p) => p.a ?? p.em), bs = pares.map((p) => p.b ?? p.l);
    if (new Set(as).size !== as.length) warn(`${chave} (${nome}): lado esquerdo com item repetido`);
    if (new Set(bs).size !== bs.length) warn(`${chave} (${nome}): lado direito com item repetido`);
  }
}
// 5. BOSS
for (const [livro, qs] of Object.entries(X.EXT_BOSS_QUESTIONS ?? {})) {
  if (alvo.size && !alvo.has(livro)) continue;
  qs.forEach((q, i) => {
    if (!q.options?.includes(q.correct)) err(`${livro} boss q${i + 1}: a resposta "${q.correct}" não está entre as opções`);
    if (new Set(q.options).size !== q.options.length) warn(`${livro} boss q${i + 1}: opções repetidas`);
  });
}
console.log(`\n${erros} erro(s), ${avisos} aviso(s)`);
process.exit(erros ? 1 : 0);
