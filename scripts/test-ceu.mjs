#!/usr/bin/env node
/**
 * Confere, palavra por palavra, os versículos que o Devocionalzeiro diz na
 * tela inicial (src/lib/ceu.ts) contra o texto ARC (public/bible/arc.json).
 * Uso: node scripts/test-ceu.mjs  → termina com "0 erro(s)" ou sai com 1.
 */
import { readFileSync } from "node:fs";

const arc = JSON.parse(readFileSync(new URL("../public/bible/arc.json", import.meta.url), "utf8"));
const src = readFileSync(new URL("../src/lib/ceu.ts", import.meta.url), "utf8");
const LIVRO = { "Salmos": "psalms", "Lamentações": "lamentations", "Isaías": "isaiah", "Gênesis": "genesis", "Provérbios": "proverbs" };

const casos = [];
// VERSOS: { texto: "...", ref: "Livro c:v" }
for (const m of src.matchAll(/texto:\s*"([^"]+)",\s*ref:\s*"([^"]+)"/g)) casos.push({ texto: m[1], ref: m[2] });
// FALAS_DO_CEU: detalhe "“citação” — Livro c:v"
for (const m of src.matchAll(/“([^”]+)” — ([^"]+?\d+:\d+)/g)) casos.push({ texto: m[1], ref: m[2] });

let erros = 0;
for (const { texto, ref } of casos) {
  const r = ref.match(/^(.+?) (\d+):(\d+)$/);
  const livro = r && LIVRO[r[1]];
  const v = livro && arc[livro]?.chapters?.[Number(r[2]) - 1]?.find((x) => x.n === Number(r[3]));
  if (!v) { console.log(`ERRO  ${ref}: referência não encontrada`); erros++; continue; }
  if (!v.t.includes(texto)) { console.log(`ERRO  ${ref}: "${texto}" não é trecho exato de "${v.t}"`); erros++; continue; }
}
if (casos.length < 10) { console.log(`ERRO  só ${casos.length} versículos lidos — o formato de ceu.ts mudou?`); erros++; }
console.log(`${casos.length} versículo(s) conferido(s), ${erros} erro(s)`);
process.exit(erros ? 1 : 0);
