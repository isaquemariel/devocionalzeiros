#!/usr/bin/env node
// ============================================================================
// FICHAS HOMÔNIMAS — o mesmo `id` para pessoas diferentes.
//
// Um `id` de cena pode nomear gente distinta em livros distintos: Nadabe é o
// filho de Arão em Levítico e o filho de Jeroboão em 1 Reis; Simei é gersonita
// em Números e o benjamita que amaldiçoou Davi em 2 Samuel; Manassés é o filho
// de José no Gênesis e o rei de Judá em 2 Reis. Enquanto as fichas eram um mapa
// global, os dois partilhavam UM verbete — e um deles mentia, sem que nenhum
// validador percebesse (o tipo está certo, o id existe, o texto é bom).
//
// Agora que cada livro tem o seu arquivo de fichas, dá para dar a cada um o seu
// verbete. Isto NÃO é um teste: é uma lista de revisão. Ele mostra os `id`s
// partilhados por livros de ÉPOCAS diferentes, e a maioria é legítima (Davi
// aparece em Rute, Samuel, Reis e Crônicas, e é a mesma pessoa). Olhe cada um
// e pergunte: são mesmo o mesmo homem?
//
//   node scripts/fichas-homonimas.mjs
// ============================================================================
import { build } from "esbuild";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const tmp = mkdtempSync(join(tmpdir(), "col-"));
await build({ stdin: { contents: `export { PACKS } from "${join(ROOT, "src/lib/rpgStageInfoAll.ts")}";`, resolveDir: ROOT, loader: "ts" },
  bundle: true, format: "esm", outfile: join(tmp, "o.mjs"), alias: { "@": join(ROOT, "src") }, logLevel: "silent" });
const { PACKS } = await import(pathToFileURL(join(tmp, "o.mjs")).href);
const SIGLA = { genesis: "Gn", exodus: "Êx", leviticus: "Lv", numbers: "Nm", deuteronomy: "Dt", joshua: "Js",
  judges: "Jz", ruth: "Rt", "1samuel": "1Sm", "2samuel": "2Sm", "1kings": "1Rs", "2kings": "2Rs",
  "1chronicles": "1Cr", "2chronicles": "2Cr", ezra: "Ed", nehemiah: "Ne", esther: "Et", job: "Jó", revelation: "Ap" };
const porId = new Map();
for (const [b, p] of Object.entries(PACKS)) for (const [id, inf] of Object.entries(p.chars)) {
  if (!porId.has(id)) porId.set(id, []);
  porId.get(id).push({ b, inf });
}
// A citação sozinha dá falso positivo demais (Salomão está em 1Rs e em 2Cr,
// e é a mesma pessoa). O sinal forte é a ÉPOCA: quem aparece no Pentateuco ou
// na conquista não pode estar também na monarquia, salvo pela genealogia.
const ERA = {
  genesis: 1, exodus: 1, leviticus: 1, numbers: 1, deuteronomy: 1, joshua: 1, judges: 1, ruth: 1,
  "1samuel": 2, "2samuel": 2, "1kings": 2, "2kings": 2, "1chronicles": 2, "2chronicles": 2,
  ezra: 3, nehemiah: 3, esther: 3, job: 0, revelation: 4,
};
let n = 0;
for (const [id, usos] of [...porId].sort()) {
  if (usos.length < 2) continue;
  const eras = new Set(usos.map((u) => ERA[u.b]).filter((e) => e > 0));
  if (eras.size < 2) continue;
  // 1 Crônicas abre com genealogias que vão de Adão a Davi: um nome do
  // Pentateuco citado ali é legítimo, e não conta como travessia de época.
  const semCronicas = usos.filter((u) => u.b !== "1chronicles");
  const eras2 = new Set(semCronicas.map((u) => ERA[u.b]).filter((e) => e > 0));
  if (eras2.size < 2) continue;
  n++;
  console.log(`${id.padEnd(34)} [${usos.map((u) => u.b).join(", ")}]`);
  console.log(`   ${usos[0].inf.title} — ${usos[0].inf.subtitle}`);
}
console.log(`\n${n} id(s) atravessando épocas — conferir se são a MESMA pessoa`);
