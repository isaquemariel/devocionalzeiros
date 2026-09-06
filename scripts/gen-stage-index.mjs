#!/usr/bin/env node
// Gera src/lib/stageIndex.ts — o mapa livro→capítulos que TÊM cena viva.
// Existe para o app poder responder `hasStageScript` sem carregar os 11 MB de
// roteiro: o índice tem alguns KB e os livros entram por import() sob demanda.
// Rode sempre que um livro novo entrar em rpgStageAll.ts.
import { build } from "esbuild";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
const ROOT = resolve(new URL("..", import.meta.url).pathname);
const tmp = mkdtempSync(join(tmpdir(), "idx-"));
writeFileSync(join(tmp, "e.mjs"), `export { STAGE_BOOKS } from "${join(ROOT, "src/lib/rpgStageAll.ts")}";\n`);
await build({ entryPoints: [join(tmp, "e.mjs")], bundle: true, format: "esm", outfile: join(tmp, "o.mjs"), alias: { "@": join(ROOT, "src") }, logLevel: "silent" });
const { STAGE_BOOKS } = await import(pathToFileURL(join(tmp, "o.mjs")).href);
const linhas = Object.entries(STAGE_BOOKS).map(([livro, caps]) => {
  const ns = Object.keys(caps).map(Number).sort((a, b) => a - b);
  return `  ${/^[a-z]+$/.test(livro) ? livro : JSON.stringify(livro)}: [${ns.join(", ")}],`;
});
const out = `// GERADO POR scripts/gen-stage-index.mjs — não edite à mão.
// Mapa livro → capítulos que têm roteiro de CENA VIVA. O app usa isto para
// decidir, sem custo, se mostra o palco; o roteiro em si entra por import()
// dinâmico (ver rpgStageRegistry.ts). Sem este índice, responder "há cena?"
// custava carregar os 11 MB de todos os livros.
export const STAGE_INDEX: Record<string, number[]> = {
${linhas.join("\n")}
};
`;
writeFileSync(join(ROOT, "src/lib/stageIndex.ts"), out);
console.log(`stageIndex.ts: ${Object.keys(STAGE_BOOKS).length} livros, ${Object.values(STAGE_BOOKS).reduce((a, c) => a + Object.keys(c).length, 0)} capítulos`);
