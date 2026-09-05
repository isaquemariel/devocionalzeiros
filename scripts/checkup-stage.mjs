#!/usr/bin/env node
// ============================================================================
// CHECKUP dos PADRÕES da CENA VIVA — complementa scripts/validate-stage.mjs.
//
// O validador confere a ESTRUTURA (beats 1..N, `q` exato, whitelists). Este
// checkup confere os PADRÕES DE DIREÇÃO que aprendemos na prática e que, quando
// violados, produzem cena errada SEM quebrar nenhum tipo:
//
//   1. CÉU SEM sky:true — sun/moon/clouds/... sem `sky` caem no chão. ERRO.
//   2. `mulher` COM POSE IGNORADA — o motor a desenha sempre em pé e dourada;
//      para deitar/curvar/não-dourada use `mulherComum`.
//   3. MULTIDÃO FESTIVA EM CENA DE MORTE — `multidao` (que o motor SEMPRE
//      desenha comemorando, ignorando a pose) ao lado de alguém em `lie`.
//   4. BALÃO ÓRFÃO — `by` de quem não está no elenco resolvido. NÃO é quebra: o
//      motor manda a fala para a barra do narrador CREDITANDO a voz (é assim que
//      Moisés narra os flashbacks de Deuteronômio). Fica como aviso de revisão:
//      se a figura devia estar em cena, falta pôr no cast.
//   5. FICHA GENÉRICA — figurante ANÔNIMO (multidão, homem, servo, rei…) cuja
//      ficha "?" cai no texto genérico do papel em vez de dizer QUEM é ali.
//   6. TAG SEM FICHA — objeto marcado com `tag` sem verbete em PROP_TAG_INFO.
//   8. FIGURA DENTRO DO MAR — `dy` abaixo da linha da praia que `env.water`
//      desenha: a figura aparece submersa. Só é legítimo onde o afogamento é o
//      assunto do versículo.
//   7. ÁGUA HERDADA — o lugar mudou e `water` alto veio por herança do beat
//      anterior. Como `env.water` DESENHA uma faixa de mar (ao contrário de
//      `env.fire`, que é só ambiência), o lugar novo aparece alagado.
//
// NÃO checamos (regras que soam boas e dão falso positivo demais):
//  • "fogo sem fogueira": no motor da cena viva `env.fire` não é lido para
//    desenhar — serve de ambiência/áudio. Se a CENA pede chama é julgamento.
//  • "glow em quem está deitado": `lie` também é dormir, sonhar e prostrar-se, e
//    mártires/patriarcas glorificados brilham de propósito. A nossa regra real —
//    nunca glorificar o AMALDIÇOADO (Acã) — é semântica, não mecânica.
//  • "voz do céu com anjo em cena": na escada de Jacó (Gn 28) os anjos são
//    cenário e Deus fala direto do alto. Ter anjo em cena não faz dele mediador.
//
// Uso: node scripts/checkup-stage.mjs [livro]
// Saída: erros (quebram a cena) e avisos (cheiro forte). Sai 1 se houver erro.
// ============================================================================
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const ONLY = process.argv[2];

// papéis de FIGURANTE ANÔNIMO: aqui a ficha-base é genérica ("habitante da
// cena") e precisa ser sobreposta por (livro→capítulo→papel). Papéis
// intrinsecamente específicos (joao, cristo, cordeiro, moises, abraao…) já têm
// ficha-base correta e NÃO são cobrados.
const ANON_ROLES = new Set(["multidao", "homem", "mulher", "mulherComum", "servo",
  "rei", "anciao", "pastor", "patriarca", "cavaleiro", "rebanho", "hero"]);
// props que só existem no céu — sem `sky:true` viram objeto no chão.
const SKY_ONLY = new Set(["sun", "moon", "starfield", "birds", "clouds", "firmament"]);
// poses que o motor IGNORA no papel `mulher` (drawWomanHD desenha sempre em pé).
const POSES_IGNORED_BY_MULHER = new Set(["lie", "kneel", "bow", "walk", "point", "raise", "write"]);

const tmp = mkdtempSync(join(tmpdir(), "stage-checkup-"));
const entry = join(tmp, "entry.mjs");
writeFileSync(entry, `
export { STAGE_BOOKS } from "${join(ROOT, "src/lib/rpgStageRegistry.ts")}";
export { actorInfo, ACTOR_INFO, PROP_TAG_INFO } from "${join(ROOT, "src/lib/rpgStageInfo.ts")}";
`);
await build({
  entryPoints: [entry], bundle: true, format: "esm",
  outfile: join(tmp, "out.mjs"), alias: { "@": join(ROOT, "src") }, logLevel: "silent",
});
const { STAGE_BOOKS, actorInfo, ACTOR_INFO, PROP_TAG_INFO } =
  await import(pathToFileURL(join(tmp, "out.mjs")).href);

let errors = 0, warnings = 0;
const seen = new Map(); // regra → contagem
let ctx = "";
const hit = (kind, rule, msg) => {
  seen.set(rule, (seen.get(rule) ?? 0) + 1);
  if (kind === "err") { errors++; console.error(`  ✗ [${rule}] ${ctx} ${msg}`); }
  else { warnings++; console.warn(`  ⚠ [${rule}] ${ctx} ${msg}`); }
};

for (const [bookId, chaptersMap] of Object.entries(STAGE_BOOKS)) {
  if (ONLY && bookId !== ONLY) continue;
  for (const [chStr, script] of Object.entries(chaptersMap)) {
    const ch = Number(chStr);
    // estado herdado entre beats (o motor mantém cast/props/env até serem trocados)
    let cast = [], props = [], env = { ...(script.start ?? {}) };
    for (const bt of script.beats) {
      if (bt.cast) cast = bt.cast;
      if (bt.props) props = bt.props;
      // 7. ÁGUA HERDADA DE OUTRO LUGAR — `env` é Object.assign: a chave omitida
      // MANTÉM o valor anterior. Depois de um beat com `water` alto, todo beat
      // seguinte que não o zerar continua com a faixa de mar no horizonte —
      // e como `water` DESENHA (ao contrário de `fire`), o lugar novo aparece
      // alagado. Foi assim que Hesbom, a ferraria de Israel, o palácio de Davi
      // e a casa de Faraó saíram com o casario dentro do mar.
      const aguaAntes = env.water ?? 0;
      const declarouAgua = !!bt.env && Object.prototype.hasOwnProperty.call(bt.env, "water");
      if (bt.env) env = { ...env, ...bt.env };
      ctx = `${bookId} ${ch}:${bt.v} —`;
      // 8. FIGURA DENTRO DO MAR — a faixa de água sobe até
      //   praia = GROUND + water * bandH   (drawGroundWaterHD)
      // e os pés de quem está em cena caem em
      //   pés   = GROUND + 8 + dy * (bandH - 8)   (depthToFeetY).
      // Quem tem `dy` abaixo da praia aparece com os pés (ou o corpo) DENTRO da
      // água — Noé submerso ao lado da arca, Moisés e Arão de pé no meio do
      // Nilo, os animais do sexto dia no mar. Legítimo só onde o afogamento É o
      // assunto (os cavaleiros de Faraó em Êx 14:27-28).
      {
        const w = env.water ?? 0;
        if (w >= 0.1) {
          const bandH = 117, topo = 8;              // proporções do palco
          for (const c of cast) {
            const dy = c.dy ?? 0.5;
            if (topo + dy * (bandH - topo) < w * bandH - 2)
              hit("warn", "figura-na-agua", `"${c.id ?? c.role}" em dy=${dy} com water=${w} — os pés caem abaixo da linha da praia`);
          }
        }
      }
      if (!declarouAgua && aguaAntes >= 0.15 && (bt.set || bt.env?.terrain)) {
        hit("warn", "agua-herdada", `o lugar mudou (${bt.set ? `set "${bt.set}"` : `terreno "${bt.env.terrain}"`}) e water=${aguaAntes} veio por herança — declare water no beat (0 se aqui não há água)`);
      }

      // 4. BALÃO ÓRFÃO — o motor procura cast por id e depois por papel; sem
      // achar, a fala é creditada na barra do narrador (flashback).
      if (bt.by && bt.by !== "deus") {
        const found = cast.some((c) => c.id === bt.by) || cast.some((c) => c.role === bt.by);
        if (!found) hit("warn", "balao-orfao", `by:"${bt.by}" fora do elenco — vira voz narrada (confira se devia estar em cena)`);
      }
      // 1. CÉU SEM sky:true
      for (const p of bt.props ?? []) {
        if (SKY_ONLY.has(p.kind) && !p.sky) hit("err", "ceu-sem-sky", `prop "${p.kind}" sem sky:true (cai no chão)`);
      }
      // 2/3. padrões do elenco (só nos beats que DECLARAM cast, p/ não repetir herança)
      if (bt.cast) {
        const temMorto = bt.cast.some((c) => c.pose === "lie");
        for (const c of bt.cast) {
          if (c.role === "mulher" && c.pose && POSES_IGNORED_BY_MULHER.has(c.pose)) {
            hit("warn", "mulher-pose-ignorada", `mulher com pose "${c.pose}" (o motor ignora) — use mulherComum`);
          }
        }
        if (temMorto && bt.cast.some((c) => c.role === "multidao")) {
          hit("warn", "multidao-em-morte", `multidão (sempre desenhada comemorando) na mesma cena de alguém em "lie"`);
        }
      }
      // 7. FICHA GENÉRICA — só figurantes ANÔNIMOS que caem no texto genérico.
      for (const c of bt.cast ?? []) {
        if (!ANON_ROLES.has(c.role)) continue;
        const info = actorInfo(c.role, bookId, c.id, ch);
        if (info && info === ACTOR_INFO[c.role]) {
          hit("warn", "ficha-generica", `${c.id ?? c.role} (papel ${c.role}) cai na ficha genérica "${info.title}"`);
        }
      }
      // Um objeto marcado com `tag` foi marcado JUSTAMENTE por ser aquele objeto
      // da história (o velo de Gideão, e não "um feixe"). Sem verbete próprio,
      // propBadgeInfo cai na ficha genérica do TIPO e o badge mente.
      for (const p of bt.props ?? []) {
        if (!p.tag) continue;
        if (!PROP_TAG_INFO[p.tag]) hit("warn", "tag-sem-ficha", `tag "${p.tag}" sem verbete próprio em PROP_TAG_INFO (o badge cai na ficha genérica de "${p.kind}")`);
      }
    }
  }
}

ctx = "";
console.log(`\n— resumo por regra —`);
for (const [rule, n] of [...seen.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(5)}  ${rule}`);
console.log(`\n${errors} erro(s), ${warnings} aviso(s)${ONLY ? ` — livro: ${ONLY}` : ""}`);
process.exit(errors > 0 ? 1 : 0);
