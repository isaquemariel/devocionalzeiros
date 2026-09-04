#!/usr/bin/env node
// ============================================================================
// QA DE CONTEÚDO da CENA VIVA — o terceiro portão, depois de validate e checkup.
//
// validate-stage confere ESTRUTURA (beats 1..N, `q` exato, whitelists).
// checkup-stage confere PADRÕES DE DIREÇÃO (céu sem sky, multidão em morte…).
// Este confere o que sobra e só aparece jogando:
//
//   • cena congelada      — 6+ beats seguidos sem mudar set/cast/props/env
//   • fala com palco vazio — alguém fala e não há ninguém em cena
//   • balão órfão          — o falante não está no elenco (vai ao narrador)
//   • narração no balão    — sem `q`, e o versículo abre com "E disse X:"
//   • papel `mulher`       — ignora a pose; quase sempre é `mulherComum`
//   • voz do céu sem marcação — nem glória nem trevas apoiando o balão
//
// Uso:  node scripts/qa-stage.mjs [livro]     (sem argumento = todos)
// ============================================================================
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const ONLY = process.argv[2];

const tmp = mkdtempSync(join(tmpdir(), "qa-stage-"));
writeFileSync(join(tmp, "entry.mjs"), `export { STAGE_BOOKS } from "${join(ROOT, "src/lib/rpgStageRegistry.ts")}";\n`);
await build({ entryPoints: [join(tmp, "entry.mjs")], bundle: true, format: "esm",
  outfile: join(tmp, "out.mjs"), alias: { "@": join(ROOT, "src") }, logLevel: "silent" });
const { STAGE_BOOKS } = await import(pathToFileURL(join(tmp, "out.mjs")).href);
const bible = JSON.parse(readFileSync(join(ROOT, "public/bible/arc.json"), "utf8"));

const R = {};
const hit = (regra, msg) => { (R[regra] ??= []).push(msg); };
const LEAD_IN = /:[\s"“]*$/;
const CONGELADO = 6;

for (const [book, chapters] of Object.entries(STAGE_BOOKS)) {
  if (ONLY && book !== ONLY) continue;
  const bb = bible[book];
  for (const [chS, script] of Object.entries(chapters)) {
    const ch = Number(chS);
    const verses = bb?.chapters[ch - 1] ?? [];
    let cast = [], env = { ...(script.start ?? {}) }, run = 0, start = 0;

    for (let i = 0; i < script.beats.length; i++) {
      const bt = script.beats[i];
      const at = `${book} ${ch}:${bt.v}`;
      if (bt.cast) cast = bt.cast;
      if (bt.env) env = { ...env, ...bt.env };

      // cena congelada
      if (bt.set || bt.cast || bt.props || bt.env) {
        if (run >= CONGELADO) hit("cena-congelada", `${book} ${ch}: v.${script.beats[start].v}-${script.beats[i - 1].v} (${run} beats sem mudar nada)`);
        run = 1; start = i;
      } else run++;

      // papel `mulher` — o motor a desenha SEMPRE dourada e em pé, ignorando a
      // pose. Usá-la para uma figura de glória (a mulher vestida do sol, Ap 12) é
      // legítimo; o defeito é DECLARAR uma pose que nunca aparece, porque aí o
      // código promete um gesto que o desenho não cumpre.
      for (const c of cast)
        if (c.role === "mulher" && c.pose)
          hit("papel-mulher", `${at} — pose "${c.pose}" é ignorada; use mulherComum`);

      if (!bt.by) continue;

      // fala com palco vazio / balão órfão
      const achou = bt.by === "deus" || cast.find((c) => c.id === bt.by) || cast.find((c) => c.role === bt.by);
      if (!cast.length) hit("fala-com-palco-vazio", `${at} — by:"${bt.by}" e ninguém em cena`);
      else if (!achou) hit("balao-orfao", `${at} — by:"${bt.by}" fora do elenco (vai para o narrador)`);

      // Voz do céu SEM MARCAÇÃO NENHUMA. O balão dourado precisa de apoio
      // visual: ou glória, ou trevas. Cena de juízo pode (e deve) ser escura —
      // 1Rs 9:7-9, o aviso do exílio, é o exemplo —, o que não pode é a voz do
      // céu cair num dia comum, sem glória e sem noite.
      if (bt.by === "deus" && (env.glory ?? 0) < 0.5 && (env.night ?? 0) < 0.5)
        hit("voz-do-ceu-sem-marcacao", `${at} — glory=${env.glory ?? 0} e night=${env.night ?? 0}`);

      // q suspeito
      const vtext = verses[bt.v - 1]?.t ?? verses[bt.v - 1] ?? "";
      // Sem `q`, o balão mostra o VERSÍCULO INTEIRO. Isso só é defeito quando o
      // versículo começa por narração de fala ("E disse Moisés ao povo:"), porque
      // aí a narração entra no balão como se fosse falada. Versículo que é fala
      // do começo ao fim dispensa `q` — e é assim que a maior parte dos livros
      // antigos foi escrita.
      if (!bt.q) {
        if (/^\s*(E|Então|Porém|Mas|Depois|Respondendo)?\s*(disse|respondeu|falou|tornou|clamou|bradou|perguntou|ordenou)\b[^:]{0,80}:/i.test(vtext))
          hit("narracao-no-balao", `${at} — by:"${bt.by}" sem q, e o versículo abre narrando a fala`);
        continue;
      }
      if (!vtext.includes(bt.q)) { hit("q-fora-do-texto", `${at} — q não é substring do ARC`); continue; }
      if (LEAD_IN.test(bt.q)) {
        const depois = vtext.slice(vtext.indexOf(bt.q) + bt.q.length).trim();
        if (!/[0-9A-Za-zÀ-ÿ]/.test(depois)) hit("deixa-sem-fala", `${at} — deixa no fim do versículo, nada depois`);
      }
    }
    if (run >= CONGELADO) hit("cena-congelada", `${book} ${ch}: v.${script.beats[start].v}-${script.beats.at(-1).v} (${run} beats sem mudar nada)`);
  }
}

const ordem = Object.entries(R).sort((a, b) => b[1].length - a[1].length);
for (const [regra, lista] of ordem) {
  console.log(`\n### ${regra} — ${lista.length}`);
  for (const m of lista.slice(0, 15)) console.log("   " + m);
  if (lista.length > 15) console.log(`   … +${lista.length - 15}`);
}
const total = ordem.reduce((a, [, l]) => a + l.length, 0);
console.log(`\n${total} apontamento(s)${ONLY ? ` — livro: ${ONLY}` : ""}`);
