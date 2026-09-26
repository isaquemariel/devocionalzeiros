/**
 * TIPOS DA JORNADA DE BOAS-VINDAS.
 *
 * A jornada é um ROTEIRO de dados (ver `roteiro.ts`) tocado por um motor puro
 * (`motor.ts`). A tela não sabe o que perguntar nem em que ordem: ela desenha a
 * etapa que o motor manda. É a mesma separação da cena viva — roteiro de um
 * lado, motor do outro —, e pelo mesmo motivo: reordenar, cortar ou incluir uma
 * pergunta vira edição de dado, não de componente.
 */

/** Expressão do Devocionalzeiro. Cada uma é uma arte própria. */
export type Humor = "base" | "feliz" | "campeao" | "triste";

export type IdEtapa =
  | "boas-vindas"
  | "nome"
  | "motivo"
  | "familiaridade"
  | "meta"
  | "plano"
  | "origem"
  | "whatsapp"
  | "salvar"
  | "email"
  | "senha"
  | "fim";

/**
 * Como a etapa é jogada.
 * - `fala`: só o Devocionalzeiro falando, e um botão para seguir.
 * - `texto`: um campo livre (nome, e-mail).
 * - `unica` / `multipla`: cartões de escolha.
 * - `plano`: a revelação do plano de leitura calculado das respostas.
 * - `telefone`: WhatsApp, pulável.
 * - `conta`: a escolha entre Google e e-mail.
 * - `senha`: a criação da senha, que é o que de fato cria a conta.
 * - `fim`: a celebração.
 */
export type TipoEtapa = "fala" | "texto" | "unica" | "multipla" | "plano" | "telefone" | "conta" | "senha" | "fim";

export interface Opcao {
  valor: string;
  rotulo: string;
  /** emoji à esquerda do rótulo */
  icone?: string;
  /** texto discreto à direita (ex.: "Constante") */
  detalhe?: string;
  /** 0..4 — desenha as barrinhas de nível (familiaridade) */
  nivel?: number;
}

export interface Whatsapp {
  ddi: string;
  /** só dígitos, sem o DDI */
  numero: string;
}

/**
 * O que a pessoa respondeu. NUNCA guarda a senha: isto vai para o
 * localStorage e sobrevive a um redirecionamento do Google.
 */
export interface Respostas {
  apelido?: string;
  motivos?: string[];
  familiaridade?: string;
  meta_min?: number;
  origem?: string;
  /** `null` = a pessoa escolheu pular */
  whatsapp?: Whatsapp | null;
  email?: string;
}

/** Fala curta que o Devocionalzeiro solta logo depois de uma resposta. */
export interface Reacao {
  humor: Humor;
  fala: string;
}

export interface Etapa {
  id: IdEtapa;
  tipo: TipoEtapa;
  humor: Humor;
  /** o que o Devocionalzeiro diz ao abrir a etapa */
  fala: (r: Respostas) => string;
  /** linha de apoio abaixo do balão (ex.: "Pode escolher mais de um") */
  apoio?: string;
  opcoes?: Opcao[];
  placeholder?: string;
  /** rótulo do botão principal; o padrão é "Continuar" */
  botao?: string;
  /** reação ao responder — um respiro de ~1s antes da próxima etapa */
  reacao?: (r: Respostas) => Reacao | null;
}

/** Estado do motor. É isto que vai para o rascunho no localStorage. */
export interface Estado {
  v: 1;
  etapa: IdEtapa;
  /** pilha de etapas visitadas — é o que o botão de voltar desempilha */
  historico: IdEtapa[];
  respostas: Respostas;
  /**
   * A pessoa saiu para o Google. O redirecionamento destrói a página; na
   * volta, é esta marca que diz "retome no fim, não do começo".
   */
  aguardandoGoogle: boolean;
  iniciadoEm: number;
}

export type Acao =
  | { tipo: "responder"; parcial: Partial<Respostas> }
  | { tipo: "avancar" }
  | { tipo: "voltar" }
  | { tipo: "irPara"; etapa: IdEtapa }
  | { tipo: "aguardarGoogle" }
  /** voltou do Google sem entrar (desistiu na tela dele) */
  | { tipo: "cancelarGoogle" }
  | { tipo: "reiniciar" };
