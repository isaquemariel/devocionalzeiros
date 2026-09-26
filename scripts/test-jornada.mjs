#!/usr/bin/env node
// Testa o MOTOR da jornada de boas-vindas sem navegador: roteiro, reducer,
// validações e o cálculo do plano. É lógica pura — se ela trava num passo,
// ninguém chega a criar conta.
//
//   node scripts/test-jornada.mjs
import { build } from "esbuild";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const RAIZ = resolve(import.meta.dirname, "..");
const tmp = mkdtempSync(join(tmpdir(), "jornada-"));
const entrada = join(tmp, "e.ts");
writeFileSync(entrada, `
export * from "${RAIZ}/src/lib/jornada/motor";
export * from "${RAIZ}/src/lib/jornada/roteiro";
export * from "${RAIZ}/src/lib/jornada/plano";
export * from "${RAIZ}/src/lib/jornada/nomes";
export { RECURSOS, PRECOS, economiaAnual, formatBRL, lerValor } from "${RAIZ}/src/lib/planos";
`);
const saida = join(tmp, "b.mjs");
await build({
  entryPoints: [entrada], bundle: true, format: "esm", platform: "node", outfile: saida,
  alias: { "@": join(RAIZ, "src") }, logLevel: "error",
});
// armazenamentos de mentira para o Node: o rascunho vive no sessionStorage;
// o localStorage só existe para provar que a versão antiga é apagada
const armazenamento = () => {
  const m = new Map();
  return { m, getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) };
};
globalThis.window = globalThis;
globalThis.sessionStorage = armazenamento();
globalThis.localStorage = armazenamento();
const J = await import(pathToFileURL(saida).href);

let ok = 0;
const caso = (nome, fn) => {
  try { fn(); ok++; }
  catch (e) { console.error(`✗ ${nome}\n  ${e.message}`); process.exitCode = 1; }
};

// ─── roteiro ────────────────────────────────────────────────────────────────
caso("roteiro começa nas boas-vindas, celebra no fim e termina nas portas (planos)", () => {
  assert.equal(J.ORDEM[0], "boas-vindas");
  assert.equal(J.ORDEM.at(-2), "fim");
  assert.equal(J.ORDEM.at(-1), "plano");
});
caso("toda etapa do roteiro é única", () => {
  assert.equal(new Set(J.ORDEM).size, J.ORDEM.length);
});
caso("a conta vem DEPOIS da meta (a pessoa investe antes do pedágio)", () => {
  assert.ok(J.ORDEM.indexOf("meta") < J.ORDEM.indexOf("salvar"));
  assert.ok(J.ORDEM.indexOf("salvar") < J.ORDEM.indexOf("senha"));
});
caso("etapas de escolha têm opções", () => {
  for (const e of J.ROTEIRO) {
    if (["lanternas", "escala", "mostrador", "selos", "planos"].includes(e.tipo)) assert.ok(e.opcoes?.length >= 2, e.id);
  }
});
caso("a escala tem cinco estágios, em ordem, cada um com a sua reação", () => {
  assert.deepEqual(J.FAMILIARIDADE.map((o) => o.nivel), [0, 1, 2, 3, 4]);
  for (const o of [...J.FAMILIARIDADE, ...J.METAS]) assert.ok(o.reacao?.texto, o.valor);
});
caso("a chama só cresce até o fim, e fica cheia nas portas", () => {
  const c = J.ROTEIRO.map((e) => e.chama);
  const fim = J.ORDEM.indexOf("fim");
  for (let i = 1; i <= fim; i++) assert.ok(c[i] > c[i - 1], J.ORDEM[i]);
  assert.equal(c[fim], 1);
  assert.equal(c.at(-1), 1);
});
caso("o que ele diz de cada plano bate com a tabela dos planos", () => {
  const rpg = J.RECURSOS.find((r) => r.name === "Devocionalzeiros RPG");
  const fala = (v) => J.PLANOS.find((o) => o.valor === v).reacao.texto;
  assert.ok(fala("free").includes(rpg.free.match(/\d+/)[0] + " fases"), fala("free"));
  assert.ok(fala("gold").includes(rpg.gold.match(/\d+/)[0] + " fases"), fala("gold"));
  assert.equal(rpg.premium, "Ilimitado");
  assert.match(fala("premium"), /não tem limite/);
  // Finanças e Embaixador só no Premium, como ele diz
  for (const n of ["Devocionalzeiros Finanças", "Programa Embaixador"]) {
    const r = J.RECURSOS.find((x) => x.name === n);
    assert.ok(!J.lerValor(r.gold).tem && J.lerValor(r.premium).tem, n);
  }
  assert.deepEqual(J.PLANOS.map((o) => o.valor), ["free", "gold", "premium"]);
});
caso("preço escrito = preço em número (a vitrine não pode divergir de si mesma)", () => {
  const n = (t) => t.replace(/\s/g, " ");
  for (const [k, p] of Object.entries(J.PRECOS)) {
    assert.equal(n(p.monthlyPrice), n(J.formatBRL(p.monthlyValue)), k);
    assert.equal(n(p.annualPrice), n(J.formatBRL(p.annualValue)), k);
    assert.ok(p.annualValue < p.monthlyValue * 12, `${k}: o anual tem de sair mais barato`);
  }
  assert.equal(J.economiaAnual(J.PRECOS.gold).pct, 16);
  assert.deepEqual(J.lerValor("❌ Bloqueado"), { tem: false, texto: "Bloqueado" });
  assert.deepEqual(J.lerValor("✅ Completo"), { tem: true, texto: "Completo" });
});
// respostas de exemplo que passam por todos os ramos das reações
const AMOSTRAS = [
  {},
  { apelido: "Ana" },
  { apelido: "Zé", motivos: ["juntos"], familiaridade: "inteira", meta_min: 20, origem: "igreja", whatsapp: null },
  { apelido: "Maria Clara", motivos: ["deus", "habito"], meta_min: 5, origem: "google", whatsapp: { ddi: "+55", numero: "11987654321" } },
  { apelido: "Kauã", motivos: ["habito", "entender", "divertido"], origem: "outro" },
  { apelido: "Lu", motivos: ["outro"], origem: "tiktok" },
];
const todasAsFalas = () => {
  const falas = [];
  for (const e of J.ROTEIRO) for (const r of AMOSTRAS) {
    for (const f of e.falas(r)) falas.push([e.id, f]);
    for (const f of e.reacao?.(r) ?? []) falas.push([e.id + " (reação)", f]);
  }
  for (const o of [...J.FAMILIARIDADE, ...J.METAS, ...J.ORIGENS]) if (o.reacao) falas.push([o.valor, o.reacao]);
  for (const n of J.NOMES_BIBLICOS) falas.push(["nome " + n, J.reacaoAoNome(n)]);
  for (const r of J.RECURSOS) falas.push(["recurso " + r.name, { texto: r.explicacao }]);
  return falas;
};
caso("toda fala sai como texto, com e sem nome, e cabe no balão", () => {
  for (const [id, f] of todasAsFalas()) {
    assert.equal(typeof f.texto, "string", id);
    assert.ok(f.texto.length > 0 && !f.texto.includes("undefined") && !f.texto.includes("null"), `${id}: ${f.texto}`);
    // ~26 letras por linha no balão; mais de ~4 linhas vira duas falas
    assert.ok(f.texto.length <= 100, `${id} tem ${f.texto.length} letras: ${f.texto}`);
  }
});
caso("toda citação entre aspas confere com a ARC", () => {
  const arc = JSON.parse(readFileSync(join(RAIZ, "public/bible/arc.json"), "utf8"));
  const versos = Object.values(arc).flatMap((l) => l.chapters.flat().map((v) => v.t));
  let n = 0;
  for (const [id, f] of todasAsFalas()) {
    for (const [, q] of f.texto.matchAll(/"([^"]+)"/g)) {
      // a pontuação final e a maiúscula de começo de frase são de quem cita
      const limpa = q.replace(/[.!?]$/, "");
      const formas = [limpa, limpa[0].toLowerCase() + limpa.slice(1), limpa[0].toUpperCase() + limpa.slice(1)];
      assert.ok(versos.some((t) => formas.some((f) => t.includes(f))), `${id}: "${q}" não está na ARC`);
      n++;
    }
  }
  assert.ok(n >= 8, `só ${n} citações conferidas`);
});
caso("o nome bíblico é reconhecido com e sem acento, pelo primeiro nome", () => {
  assert.match(J.reacaoAoNome("Débora").texto, /Débora, juíza/);
  assert.match(J.reacaoAoNome("debora").texto, /Débora, juíza/);
  assert.match(J.reacaoAoNome("  josé   carlos ").texto, /José/);
  assert.match(J.reacaoAoNome("Elias").texto, /Carmelo/);
});
caso("nome comum: a mesma frase para o mesmo nome, só com o primeiro nome", () => {
  const a = J.reacaoAoNome("Kauã Henrique");
  assert.deepEqual(J.reacaoAoNome("Kauã Henrique"), a);
  assert.ok(a.texto.includes("Kauã") && !a.texto.includes("Henrique"), a.texto);
});
caso("a origem preserva os valores que o admin já conta", () => {
  const valores = J.ORIGENS.map((o) => o.valor);
  for (const antigo of ["instagram", "threads", "tiktok", "kwai", "anuncios", "indicacao"]) {
    assert.ok(valores.includes(antigo), antigo);
  }
});
caso("o céu vai de 0 a 1 até o fim, e fica no dia nas portas", () => {
  const p = J.ORDEM.map((id) => J.progresso(id));
  const fim = J.ORDEM.indexOf("fim");
  assert.equal(p[0], 0);
  assert.equal(p[fim], 1);
  assert.equal(p.at(-1), 1);
  for (let i = 1; i <= fim; i++) assert.ok(p[i] > p[i - 1]);
});

// ─── reducer ────────────────────────────────────────────────────────────────
caso("percorre a jornada inteira avançando", () => {
  let e = J.estadoInicial(0);
  const visitadas = [e.etapa];
  while (J.proxima(e.etapa)) { e = J.reduzir(e, { tipo: "avancar" }); visitadas.push(e.etapa); }
  assert.deepEqual(visitadas, J.ORDEM);
});
caso("voltar desfaz o avançar", () => {
  let e = J.estadoInicial(0);
  e = J.reduzir(e, { tipo: "avancar" });
  e = J.reduzir(e, { tipo: "avancar" });
  e = J.reduzir(e, { tipo: "voltar" });
  assert.equal(e.etapa, "nome");
  e = J.reduzir(e, { tipo: "voltar" });
  assert.equal(e.etapa, "boas-vindas");
  assert.equal(J.podeVoltar(e), false);
  assert.equal(J.reduzir(e, { tipo: "voltar" }).etapa, "boas-vindas"); // não passa do começo
});
caso("depois da conta criada não se volta", () => {
  let e = J.reduzir(J.estadoInicial(0), { tipo: "irPara", etapa: "fim" });
  assert.equal(J.podeVoltar(e), false);
  assert.equal(J.reduzir(e, { tipo: "voltar" }).etapa, "fim");
});
caso("responder acumula sem apagar o que veio antes", () => {
  let e = J.estadoInicial(0);
  e = J.reduzir(e, { tipo: "responder", parcial: { apelido: "Ana" } });
  e = J.reduzir(e, { tipo: "responder", parcial: { meta_min: 10 } });
  assert.deepEqual(e.respostas, { apelido: "Ana", meta_min: 10 });
});
caso("voltar cancela a espera do Google", () => {
  let e = J.reduzir(J.estadoInicial(0), { tipo: "irPara", etapa: "salvar" });
  e = J.reduzir(e, { tipo: "aguardarGoogle" });
  assert.equal(e.aguardandoGoogle, true);
  e = J.reduzir(e, { tipo: "voltar" });
  assert.equal(e.aguardandoGoogle, false);
});
caso("desistir no Google devolve para a escolha da conta", () => {
  let e = J.reduzir(J.estadoInicial(0), { tipo: "irPara", etapa: "salvar" });
  e = J.reduzir(e, { tipo: "aguardarGoogle" });
  e = J.reduzir(e, { tipo: "cancelarGoogle" });
  assert.equal(e.aguardandoGoogle, false);
  assert.equal(e.etapa, "salvar");
  const igual = J.reduzir(e, { tipo: "cancelarGoogle" });
  assert.equal(igual, e); // sem espera, é no-op (mesma referência, sem re-render)
});
caso("rascunho de uma etapa que o roteiro não tem mais recomeça do zero", () => {
  const velho = { v: 1, etapa: "etapa-extinta", historico: ["boas-vindas"], respostas: {}, aguardandoGoogle: true, iniciadoEm: Date.now() };
  sessionStorage.setItem(J.CHAVE_RASCUNHO, JSON.stringify(velho));
  assert.equal(J.lerRascunho(), null);
  const bom = { ...velho, etapa: "meta", historico: ["boas-vindas", "etapa-extinta", "nome"] };
  sessionStorage.setItem(J.CHAVE_RASCUNHO, JSON.stringify(bom));
  assert.deepEqual(J.lerRascunho().historico, ["boas-vindas", "nome"]); // a etapa extinta sai da pilha
  J.apagarRascunho();
  assert.equal(J.lerRascunho(), null);
});
caso("o rascunho mora no sessionStorage, vale 30 minutos e apaga o antigo do localStorage", () => {
  localStorage.setItem("dz.jornada.v1", JSON.stringify({ respostas: { email: "velho@x.com" } }));
  const e = J.reduzir(J.estadoInicial(0), { tipo: "responder", parcial: { apelido: "Ana" } });
  J.gravarRascunho({ ...e, aguardandoGoogle: true }, 1_000_000);
  assert.equal(localStorage.getItem(J.CHAVE_RASCUNHO), null, "nada no localStorage");
  assert.equal(J.lerRascunho(1_000_000 + 29 * 60_000).respostas.apelido, "Ana");
  assert.equal(J.lerRascunho(1_000_000 + 31 * 60_000), null, "passou de 30 min");
  assert.equal(localStorage.getItem("dz.jornada.v1"), null, "a versão antiga (7 dias no localStorage) foi apagada");
  J.apagarRascunho();
});
caso("rascunho adulterado: só volta o que o roteiro poderia ter produzido", () => {
  const sujo = {
    v: 1, etapa: "salvar", historico: ["boas-vindas", "<img>"], aguardandoGoogle: "sim", iniciadoEm: Date.now(),
    respostas: {
      apelido: "<script>alert(1)</script>", motivos: ["deus", "hack", "deus", 7], familiaridade: "mestre",
      meta_min: 999, origem: "javascript:alert(1)", whatsapp: { ddi: "+55", numero: "11987654321; drop" },
      email: "a@b.c<script>", senha: "Luz2026", admin: true,
    },
  };
  sessionStorage.setItem(J.CHAVE_RASCUNHO, JSON.stringify(sujo));
  const e = J.lerRascunho();
  assert.deepEqual(e.historico, ["boas-vindas"]);
  assert.equal(e.aguardandoGoogle, false, "só `true` de verdade conta");
  assert.deepEqual(e.respostas, { motivos: ["deus"] }, JSON.stringify(e.respostas));
  J.apagarRascunho();
});
caso("saneamento aceita o que é legítimo", () => {
  const ok = { apelido: "  Ana   Clara ", motivos: ["deus", "juntos"], familiaridade: "historias", meta_min: 15, origem: "igreja",
    whatsapp: { ddi: "+55", numero: "(11) 98765-4321" }, email: " Ana@Exemplo.com " };
  assert.deepEqual(J.sanearRespostas(ok), { apelido: "Ana Clara", motivos: ["deus", "juntos"], familiaridade: "historias", meta_min: 15,
    origem: "igreja", whatsapp: { ddi: "+55", numero: "11987654321" }, email: "ana@exemplo.com" });
  assert.deepEqual(J.sanearRespostas({ whatsapp: null }), { whatsapp: null }, "pular o WhatsApp continua valendo");
  assert.deepEqual(J.sanearRespostas("lixo"), {});
});
caso("o estado nunca carrega senha", () => {
  const e = J.reduzir(J.estadoInicial(0), { tipo: "responder", parcial: { email: "a@b.com" } });
  assert.ok(!JSON.stringify(e).toLowerCase().includes("senha"));
  assert.ok(!("password" in e.respostas));
});

// ─── validações ─────────────────────────────────────────────────────────────
caso("nome", () => {
  for (const ruim of ["<b>Ana</b>", "Ana{}", "Ana\u202Eoãn", "Ana\u0000", "Ana 2", "Ana 🔥", "a@b"]) assert.ok(J.validarNome(ruim), ruim);
  for (const bom of ["Ana Clara", "D'Ávila", "João Pedro", "Zé", "Ana-Lú", "O’Neil", "Ma. Clara"]) assert.equal(J.validarNome(bom), null, bom);
  assert.ok(J.validarNome("A"));
  assert.equal(J.validarNome("  Ana  "), null);
  assert.equal(J.validarNome("José"), null);
  assert.ok(J.validarNome("12345"));
  assert.ok(J.validarNome("x".repeat(31)));
});
caso("e-mail", () => {
  assert.equal(J.validarEmail("ana@gmail.com"), null);
  assert.equal(J.validarEmail("  ana@gmail.com "), null);
  for (const ruim of ["", "ana", "ana@", "ana@gmail", "ana @gmail.com", "ana@gmail.c"]) assert.ok(J.validarEmail(ruim), ruim);
});
caso("senha segue a régua do cadastro (8+, letra, número)", () => {
  assert.ok(J.validarSenha("abc123"));
  assert.ok(J.validarSenha("abcdefgh"));
  assert.ok(J.validarSenha("12345678"));
  assert.equal(J.validarSenha("abcd1234"), null);
});
caso("força da senha cresce", () => {
  assert.equal(J.forcaSenha(""), 0);
  assert.ok(J.forcaSenha("Abcd1234!xyz") > J.forcaSenha("abcd1234"));
});
caso("WhatsApp respeita os dígitos de cada país", () => {
  assert.equal(J.validarWhatsapp({ ddi: "+55", numero: "(11) 98765-4321" }), null);
  assert.ok(J.validarWhatsapp({ ddi: "+55", numero: "1234" }));
  assert.ok(J.validarWhatsapp({ ddi: "+55", numero: "119876543210" })); // 12 > 11
  assert.ok(J.validarWhatsapp({ ddi: "+999", numero: "11987654321" }));
  assert.equal(J.validarWhatsapp({ ddi: "+598", numero: "94123456" }), null); // Uruguai: 8
});

// ─── plano ──────────────────────────────────────────────────────────────────
caso("plano: 1.189 capítulos, 260 no NT", () => {
  assert.equal(J.CAPITULOS_BIBLIA, 1189);
  assert.equal(J.CAPITULOS_NT, 260);
});
caso("plano: mais minutos terminam antes", () => {
  const dias = [5, 10, 15, 20].map((m) => J.planoDeLeitura(m).diasBiblia);
  for (let i = 1; i < dias.length; i++) assert.ok(dias[i] < dias[i - 1]);
});
caso("plano: 10 min/dia ≈ 14 meses a Bíblia e ≈ 3 meses o NT", () => {
  const p = J.planoDeLeitura(10);
  assert.equal(p.biblia, "cerca de 14 meses");
  assert.equal(p.novoTestamento, "cerca de 3 meses");
});
caso("plano: a duração escolhe a unidade certa", () => {
  assert.equal(J.duracao(7), "7 dias");
  assert.equal(J.duracao(21), "3 semanas");
  assert.equal(J.duracao(120), "4 meses");
  assert.equal(J.duracao(900), "2 anos e meio");
});

console.log(process.exitCode ? `\n${ok} passaram, houve falha` : `✓ ${ok} casos da jornada passaram`);
