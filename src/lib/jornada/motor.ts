import type { Acao, Estado, IdEtapa, Respostas, Whatsapp } from "./tipos";
import { existeEtapa, FAMILIARIDADE, METAS, MOTIVOS, ORIGENS, proxima } from "./roteiro";
import { DDIS } from "@/lib/ddis";

/**
 * MOTOR DA JORNADA — puro: estado + ação → estado. Nenhum efeito colateral
 * aqui (rede, armazenamento, navegação); isso fica na tela. É o que permite
 * testar a jornada inteira sem navegador.
 */

export function estadoInicial(agora = Date.now()): Estado {
  return { v: 1, etapa: "boas-vindas", historico: [], respostas: {}, aguardandoGoogle: false, iniciadoEm: agora };
}

/** Depois da conta criada não se volta: não há "descriar" a conta. */
const SEM_VOLTA: IdEtapa[] = ["fim"];

export function reduzir(estado: Estado, acao: Acao): Estado {
  switch (acao.tipo) {
    case "responder":
      return { ...estado, respostas: { ...estado.respostas, ...acao.parcial } };

    case "avancar": {
      // da senha ninguém "avança": o fim só vem quando a conta EXISTE (quem
      // leva para lá é o efeito da conta). Um Enter duplo no e-mail disparava
      // um segundo avanço e caía no fim sem conta nenhuma.
      if (estado.etapa === "senha") return estado;
      const seguinte = proxima(estado.etapa);
      if (!seguinte) return estado;
      return { ...estado, etapa: seguinte, historico: [...estado.historico, estado.etapa] };
    }

    case "irPara":
      if (acao.etapa === estado.etapa) return estado;
      return { ...estado, etapa: acao.etapa, historico: [...estado.historico, estado.etapa] };

    case "voltar": {
      if (SEM_VOLTA.includes(estado.etapa) || estado.historico.length === 0) return estado;
      const historico = estado.historico.slice(0, -1);
      return { ...estado, etapa: estado.historico[estado.historico.length - 1], historico, aguardandoGoogle: false };
    }

    case "aguardarGoogle":
      return { ...estado, aguardandoGoogle: true };

    case "cancelarGoogle":
      return estado.aguardandoGoogle ? { ...estado, aguardandoGoogle: false } : estado;

    case "reiniciar":
      return estadoInicial();
  }
}

export function podeVoltar(estado: Estado): boolean {
  return !SEM_VOLTA.includes(estado.etapa) && estado.historico.length > 0;
}

// ─── validações ────────────────────────────────────────────────────────────
// Devolvem a mensagem de erro, ou `null` se está tudo certo. A mensagem é na
// voz do Devocionalzeiro: é ele quem está conversando, não um formulário.

export function validarNome(v: string): string | null {
  const t = v.trim();
  if (t.length < 2) return "Me diz pelo menos duas letrinhas 😉";
  if (t.length > 30) return "Que nome comprido! Pode encurtar um pouco?";
  if (!/\p{L}/u.test(t)) return "Esse nome precisa de pelo menos uma letra.";
  // Só letras (com acento), espaço, apóstrofo (o reto e o curvo, que o
  // teclado do iPhone troca sozinho), hífen e ponto. Fecha a porta
  // para número, emoji, sinal de código (<, >, {) e caractere invisível de
  // controle ou de inversão de texto — que viraria o nome no perfil, no
  // ranking e no painel do admin.
  if (!/^[\p{L}\p{M}'\u2019 .-]+$/u.test(t)) return "Usa só letras no nome, por favor.";
  return null;
}

export function validarEmail(v: string): string | null {
  const t = v.trim();
  if (!t) return "Faltou o e-mail.";
  if (t.length > 120) return "Esse e-mail é comprido demais. Confere pra mim?";
  // Só os caracteres de um endereço de verdade. A versão frouxa (qualquer
  // coisa com @ e ponto) aceitava "a@b.c<script>" — que seguiria para o
  // cadastro, o perfil e o painel do admin.
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(t)) return "Hmm, esse e-mail parece incompleto. Confere pra mim?";
  return null;
}

/**
 * Mesma régua do formulário de cadastro (`passwordSchema` em Auth.tsx): 8+,
 * uma letra, um número. O servidor ainda recusa senha que já vazou (HIBP
 * ligado no Auth do projeto) — esse erro chega no `signUp` e é tratado lá.
 */
export function validarSenha(v: string): string | null {
  if (v.length < 8) return "A senha precisa de pelo menos 8 caracteres.";
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return "Use letras e números juntos.";
  return null;
}

/** 0..4 — alimenta o medidor de força. Não substitui a validação. */
export function forcaSenha(v: string): number {
  if (!v) return 0;
  let f = 0;
  if (v.length >= 8) f++;
  if (/[A-Za-z]/.test(v) && /\d/.test(v)) f++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) f++;
  if (v.length >= 12 || /[^A-Za-z0-9]/.test(v)) f++;
  return f;
}

export function validarWhatsapp(w: Whatsapp): string | null {
  const ddi = DDIS.find((d) => d.code === w.ddi);
  if (!ddi) return "Escolhe o país do número.";
  const n = w.numero.replace(/\D/g, "");
  // piso de 8: o menor número nacional da lista (Uruguai) tem 8 dígitos
  if (n.length < 8 || n.length > ddi.maxDigits) {
    return `Esse número parece ter ${n.length < 8 ? "poucos" : "muitos"} dígitos.`;
  }
  return null;
}

// ─── saneamento ────────────────────────────────────────────────────────────
// Tudo o que vem de fora da memória da página — o rascunho do armazenamento,
// que qualquer um com o aparelho na mão pode editar — passa por aqui antes de
// ser usado ou gravado no perfil. Só sobrevive o que o roteiro poderia ter
// produzido: valor de lista que existe na lista, nome que passa na régua,
// número que passa na régua. O resto é descartado em silêncio.

export function sanearRespostas(bruto: unknown): Respostas {
  const r = (bruto && typeof bruto === "object" ? bruto : {}) as Record<string, unknown>;
  const s: Respostas = {};
  const texto = (v: unknown) => (typeof v === "string" ? v : "");
  const naLista = (lista: { valor: string }[], v: unknown) => lista.some((o) => o.valor === v);

  const apelido = texto(r.apelido).trim().replace(/\s+/g, " ");
  if (apelido && !validarNome(apelido)) s.apelido = apelido;
  if (Array.isArray(r.motivos)) {
    const m = [...new Set(r.motivos.filter((v) => naLista(MOTIVOS, v)) as string[])];
    if (m.length) s.motivos = m;
  }
  if (naLista(FAMILIARIDADE, r.familiaridade)) s.familiaridade = r.familiaridade as string;
  if (typeof r.meta_min === "number" && naLista(METAS, String(r.meta_min))) s.meta_min = r.meta_min;
  if (naLista(ORIGENS, r.origem)) s.origem = r.origem as string;
  if (r.whatsapp === null) s.whatsapp = null;
  else if (r.whatsapp && typeof r.whatsapp === "object") {
    const w = r.whatsapp as Record<string, unknown>;
    const numero = texto(w.numero);
    // só o que o campo deixa digitar (dígito, espaço, parêntese, hífen)
    const zap = { ddi: texto(w.ddi), numero: numero.replace(/\D/g, "") };
    if (/^[\d\s()-]*$/.test(numero) && !validarWhatsapp(zap)) s.whatsapp = zap;
  }
  const email = texto(r.email).trim().toLowerCase();
  if (email && email.length <= 120 && !validarEmail(email)) s.email = email;
  return s;
}

// ─── rascunho ──────────────────────────────────────────────────────────────
// A jornada vive na MEMÓRIA da página: recarregar recomeça do zero, e nada do
// que a pessoa digitou fica no aparelho. A única exceção é a ida ao Google (e
// ao login, no meio da conta): o redirecionamento destrói a página, e sem um
// rascunho a pessoa voltaria para o começo depois de ter respondido tudo.
//
// Por isso o rascunho é gravado SÓ no instante da saída, no `sessionStorage`
// (morre com a aba, não é visto por outra aba nem sobrevive a fechar o
// navegador), vale 30 minutos, nunca leva a senha (não faz parte de
// `Respostas`) nem o e-mail do caminho do Google, e é apagado assim que é
// aplicado ou que a pessoa desiste.

export const CHAVE_RASCUNHO = "dz.jornada.v2";
/** a versão antiga morava no localStorage por 7 dias — é apagada onde for achada */
const CHAVE_ANTIGA = "dz.jornada.v1";
/** o tempo de ir ao Google e voltar, com folga */
const VALIDADE_MS = 30 * 60 * 1000;

const sessao = (): Storage | null => {
  try { return window.sessionStorage; } catch { return null; }
};
const limparAntigo = () => {
  try { window.localStorage.removeItem(CHAVE_ANTIGA); } catch { /* ok */ }
};

export function lerRascunho(agora = Date.now()): Estado | null {
  limparAntigo();
  try {
    const bruto = sessao()?.getItem(CHAVE_RASCUNHO);
    if (!bruto) return null;
    const e = JSON.parse(bruto) as Estado;
    if (e?.v !== 1 || typeof e.etapa !== "string" || !e.respostas) return null;
    // Etapa que o roteiro não tem mais (a jornada foi reescrita entre uma
    // visita e outra): recomeça, em vez de a tela quebrar procurando por ela.
    if (!existeEtapa(e.etapa)) return null;
    if (!Array.isArray(e.historico)) return null;
    if (typeof e.iniciadoEm !== "number" || agora - e.iniciadoEm > VALIDADE_MS || e.iniciadoEm > agora + 60_000) return null;
    return {
      v: 1,
      etapa: e.etapa,
      historico: e.historico.filter(existeEtapa),
      respostas: sanearRespostas(e.respostas),
      aguardandoGoogle: e.aguardandoGoogle === true,
      iniciadoEm: e.iniciadoEm,
    };
  } catch {
    return null; // modo anônimo, armazenamento bloqueado, JSON corrompido
  }
}

/** Grava o estado para sobreviver a UM redirecionamento. Carimba a hora da saída. */
export function gravarRascunho(e: Estado, agora = Date.now()): void {
  try {
    sessao()?.setItem(CHAVE_RASCUNHO, JSON.stringify({ ...e, respostas: sanearRespostas(e.respostas), iniciadoEm: agora }));
  } catch {
    /* sem armazenamento a jornada segue — só não sobrevive ao redirecionamento */
  }
}

export function apagarRascunho(): void {
  limparAntigo();
  try {
    sessao()?.removeItem(CHAVE_RASCUNHO);
  } catch {
    /* idem */
  }
}
