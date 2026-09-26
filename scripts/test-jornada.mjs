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

const RAIZ = resolve(import.meta.dirname, "..");
const tmp = mkdtempSync(join(tmpdir(), "jornada-"));
const entrada = join(tmp, "e.ts");
writeFileSync(entrada, `
export * from "${RAIZ}/src/lib/jornada/motor";
export * from "${RAIZ}/src/lib/jornada/roteiro";
export * from "${RAIZ}/src/lib/jornada/plano";
`);
const saida = join(tmp, "b.mjs");
await build({
  entryPoints: [entrada], bundle: true, format: "esm", platform: "node", outfile: saida,
  alias: { "@": join(RAIZ, "src") }, logLevel: "error",
});
const J = await import(pathToFileURL(saida).href);

let ok = 0;
const caso = (nome, fn) => {
  try { fn(); ok++; }
  catch (e) { console.error(`✗ ${nome}\n  ${e.message}`); process.exitCode = 1; }
};

// ─── roteiro ────────────────────────────────────────────────────────────────
caso("roteiro começa nas boas-vindas e termina no fim", () => {
  assert.equal(J.ORDEM[0], "boas-vindas");
  assert.equal(J.ORDEM.at(-1), "fim");
});
caso("toda etapa do roteiro é única", () => {
  assert.equal(new Set(J.ORDEM).size, J.ORDEM.length);
});
caso("a conta vem DEPOIS do plano (a pessoa investe antes do pedágio)", () => {
  assert.ok(J.ORDEM.indexOf("plano") < J.ORDEM.indexOf("salvar"));
  assert.ok(J.ORDEM.indexOf("salvar") < J.ORDEM.indexOf("senha"));
});
caso("etapas de escolha têm opções", () => {
  for (const e of J.ROTEIRO) {
    if (e.tipo === "unica" || e.tipo === "multipla") assert.ok(e.opcoes?.length >= 2, e.id);
  }
});
caso("toda fala do roteiro sai como texto, com e sem nome", () => {
  for (const e of J.ROTEIRO) {
    for (const r of [{}, { apelido: "Ana" }]) {
      const f = e.fala(r);
      assert.equal(typeof f, "string", e.id);
      assert.ok(f.length > 0 && !f.includes("undefined"), `${e.id}: ${f}`);
    }
  }
});
caso("a origem preserva os valores que o admin já conta", () => {
  const valores = J.ORIGENS.map((o) => o.valor);
  for (const antigo of ["instagram", "threads", "tiktok", "kwai", "anuncios", "indicacao"]) {
    assert.ok(valores.includes(antigo), antigo);
  }
});
caso("progresso vai de 0 a 1 e só cresce", () => {
  const p = J.ORDEM.map((id) => J.progresso(id));
  assert.equal(p[0], 0);
  assert.equal(p.at(-1), 1);
  for (let i = 1; i < p.length; i++) assert.ok(p[i] > p[i - 1]);
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
caso("o estado nunca carrega senha", () => {
  const e = J.reduzir(J.estadoInicial(0), { tipo: "responder", parcial: { email: "a@b.com" } });
  assert.ok(!JSON.stringify(e).toLowerCase().includes("senha"));
  assert.ok(!("password" in e.respostas));
});

// ─── validações ─────────────────────────────────────────────────────────────
caso("nome", () => {
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
