import type { Acao, Estado, IdEtapa, Whatsapp } from "./tipos";
import { existeEtapa, proxima } from "./roteiro";
import { DDIS } from "@/lib/ddis";

/**
 * MOTOR DA JORNADA — puro: estado + ação → estado. Nenhum efeito colateral
 * aqui (rede, localStorage, navegação); isso fica na tela. É o que permite
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
  return null;
}

export function validarEmail(v: string): string | null {
  const t = v.trim();
  if (!t) return "Faltou o e-mail.";
  // Deliberadamente simples: o Supabase valida de verdade. Aqui só se pegam
  // os tropeços de digitação (sem @, sem ponto, espaço no meio).
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)) return "Hmm, esse e-mail parece incompleto. Confere pra mim?";
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

// ─── rascunho ──────────────────────────────────────────────────────────────
// O redirecionamento do Google destrói a página. Sem rascunho, a pessoa
// voltaria para o começo — depois de ter respondido tudo. Guarda-se o
// estado inteiro; a senha nunca entra nele (não faz parte de `Respostas`).

export const CHAVE_RASCUNHO = "dz.jornada.v1";
/** Rascunho mais velho que isto é de outra visita — recomeça. */
const VALIDADE_MS = 7 * 24 * 60 * 60 * 1000;

export function lerRascunho(agora = Date.now()): Estado | null {
  try {
    const bruto = localStorage.getItem(CHAVE_RASCUNHO);
    if (!bruto) return null;
    const e = JSON.parse(bruto) as Estado;
    if (e?.v !== 1 || typeof e.etapa !== "string" || !e.respostas) return null;
    // Etapa que o roteiro não tem mais (a jornada foi reescrita entre uma
    // visita e outra): recomeça, em vez de a tela quebrar procurando por ela.
    if (!existeEtapa(e.etapa)) return null;
    if (!Array.isArray(e.historico)) return null;
    e.historico = e.historico.filter(existeEtapa);
    if (agora - (e.iniciadoEm ?? 0) > VALIDADE_MS) return null;
    return e;
  } catch {
    return null; // modo anônimo, armazenamento bloqueado, JSON corrompido
  }
}

export function gravarRascunho(e: Estado): void {
  try {
    localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(e));
  } catch {
    /* sem armazenamento a jornada segue — só não sobrevive a um reload */
  }
}

export function apagarRascunho(): void {
  try {
    localStorage.removeItem(CHAVE_RASCUNHO);
  } catch {
    /* idem */
  }
}
