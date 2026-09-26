import { supabase } from "@/integrations/supabase/client";

/**
 * OS AVISOS DO APP — ditos pelo Devocionalzeiro.
 *
 * O app avisava com toasts (sonner e o do shadcn): caixinhas que brotavam no
 * topo da tela, sem dono, iguais às de qualquer site. Agora quem avisa é o
 * personagem: ele aparece no rodapé, com a cara do que aconteceu (sorri no
 * sucesso, coça a cabeça no erro, aponta na dica) e diz a mensagem num balão
 * que sai dele. Ele avisa, ele comemora, ele fala.
 *
 * A API é a mesma do sonner (`toast.success`, `toast.error`, `toast.info`…),
 * para os lugares que avisam não precisarem mudar: só o import troca de
 * "sonner" para "@/lib/avisos". Quem mostra é `components/devocionalzeiro/
 * Comemoracao`, montado uma vez no `App`.
 */

export type TipoAviso = "sucesso" | "erro" | "info" | "alerta";

export interface OpcoesAviso {
  description?: string;
  /** ms que o balão fica (o padrão acompanha o tamanho do texto) */
  duration?: number;
  action?: { label: string; onClick: () => void };
  /** aceito por compatibilidade com o sonner; o personagem tem lugar próprio */
  position?: string;
  id?: string | number;
  /**
   * O aviso é da tela para onde se está INDO (o "Bem-vindo de volta!" do
   * login): entra direto na fila do palco central e só sobe quando a tela de
   * destino terminar de abrir — e, desde já, os bonecos fixos dela ficam fora
   * de cena até ele descer.
   */
  naProximaTela?: boolean;
}

export interface PedidoAviso {
  tipo: TipoAviso;
  texto: string;
  detalhe?: string;
  duracao?: number;
  acao?: { rotulo: string; onClick: () => void };
  naProximaTela?: boolean;
}

export const EVENTO_AVISO = "dz:aviso";

// Quem acabou de sair da conta não recebe erro: telas que ainda terminam um
// pedido no ar esbarram na sessão fechada, e isso não é problema da pessoa.
let saiuEm = 0;
supabase.auth.onAuthStateChange((evento) => { if (evento === "SIGNED_OUT") saiuEm = Date.now(); });

/** tira os emojis: a cara dele já diz o que o 🎉 e o ⚠️ diziam */
const semEmoji = (s: string) =>
  s.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "").replace(/\s{2,}/g, " ").trim();

function avisar(tipo: TipoAviso, mensagem: unknown, o: OpcoesAviso = {}) {
  if (typeof window === "undefined") return;
  if ((tipo === "erro" || tipo === "alerta") && Date.now() - saiuEm < 8000) return;
  const texto = semEmoji(String(mensagem ?? ""));
  if (!texto) return;
  const detalhe = o.description ? semEmoji(String(o.description)) : undefined;
  window.dispatchEvent(new CustomEvent<PedidoAviso>(EVENTO_AVISO, {
    detail: {
      tipo, texto, detalhe: detalhe || undefined, duracao: o.duration,
      acao: o.action ? { rotulo: o.action.label, onClick: o.action.onClick } : undefined,
      naProximaTela: o.naProximaTela || undefined,
    },
  }));
}

type Fn = (mensagem: unknown, opcoes?: OpcoesAviso) => void;

/** o mesmo formato do `toast` do sonner */
export const toast: Fn & { success: Fn; error: Fn; info: Fn; warning: Fn; message: Fn; dismiss: (id?: unknown) => void } =
  Object.assign((m: unknown, o?: OpcoesAviso) => avisar("info", m, o), {
    success: (m: unknown, o?: OpcoesAviso) => avisar("sucesso", m, o),
    error: (m: unknown, o?: OpcoesAviso) => avisar("erro", m, o),
    info: (m: unknown, o?: OpcoesAviso) => avisar("info", m, o),
    warning: (m: unknown, o?: OpcoesAviso) => avisar("alerta", m, o),
    message: (m: unknown, o?: OpcoesAviso) => avisar("info", m, o),
    dismiss: () => {},
  });

export { avisar };

/**
 * Navega para uma rota do app sem recarregar a página (o botão de um aviso
 * vindo de fora do React Router — push, sino — usa isto).
 */
export function irPara(link: string) {
  if (!link) return;
  if (/^https?:\/\//.test(link) && !link.startsWith(window.location.origin)) { window.location.assign(link); return; }
  const caminho = link.replace(window.location.origin, "");
  window.history.pushState({}, "", caminho);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
