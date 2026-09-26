/**
 * TIPOS DA JORNADA DE BOAS-VINDAS.
 *
 * A jornada é um ROTEIRO de dados (ver `roteiro.ts`) tocado por um motor puro
 * (`motor.ts`). A tela não sabe o que perguntar nem em que ordem: ela desenha a
 * etapa que o motor manda. É a mesma separação da cena viva — roteiro de um
 * lado, motor do outro —, e pelo mesmo motivo: reordenar, cortar ou incluir uma
 * pergunta vira edição de dado, não de componente.
 */

/** Rosto do Devocionalzeiro (o rig em `components/jornada/Devocionalzeiro`). */
export type Expressao =
  | "neutro" | "feliz" | "radiante" | "surpreso" | "pensativo" | "triste" | "orgulhoso" | "dormindo";

/** O que o corpo dele está fazendo. */
export type Gesto =
  | "parado" | "acenar" | "comemorar" | "pensar" | "apontar" | "tampar" | "espiar" | "andar"
  | "espreguicar" | "cocar";

/** Uma frase do Devocionalzeiro, com a cara e o gesto com que ele a diz. */
export interface Fala {
  texto: string;
  expressao?: Expressao;
  gesto?: Gesto;
}

export type IdEtapa =
  | "boas-vindas"
  | "nome"
  | "motivo"
  | "familiaridade"
  | "meta"
  | "origem"
  | "whatsapp"
  | "salvar"
  | "email"
  | "senha"
  | "fim";

/**
 * A MECÂNICA da etapa. Nenhuma pergunta é uma lista de cartões: cada uma tem o
 * seu brinquedo.
 * - `despertar`: ele está dormindo; um toque acorda, e a chama nasce faísca.
 * - `nome`: o nome aparece gravado numa lápide de pedra enquanto se digita.
 * - `lanternas`: um varal de lanternas; acende as suas, e elas voam para a chama.
 * - `escala`: uma planta que cresce de semente a árvore com fruto.
 * - `mostrador`: um marcador que gira, com o plano de leitura mudando ao vivo.
 * - `selos`: carimbos num mapa — de onde a pessoa veio.
 * - `telefone`: o WhatsApp, pulável.
 * - `conta`: guardar a chama — Google ou e-mail.
 * - `email`: ele acompanha com os olhos o que se digita.
 * - `senha`: ele tapa os olhos (e espia, se a senha for mostrada).
 * - `fim`: o sol nasce e a cidade aparece no horizonte.
 */
export type TipoEtapa =
  | "despertar" | "nome" | "lanternas" | "escala" | "mostrador" | "selos"
  | "telefone" | "conta" | "email" | "senha" | "fim";

/** Ícones desenhados à mão em `components/jornada/Icones` — nada de emoji. */
export type IdIcone =
  | "maos" | "livro" | "lampada" | "pessoas" | "controle" | "balao"
  | "camera" | "nota" | "arroba" | "claquete" | "megafone" | "coracao" | "play" | "igreja" | "lupa" | "estrela";

export interface Opcao {
  valor: string;
  rotulo: string;
  icone?: IdIcone;
  /** nome curto do estágio ("Semente", "Constante") */
  detalhe?: string;
  /** 0..4 — o estágio da planta (familiaridade) */
  nivel?: number;
  /** o que ele diz AO VIVO quando esta opção está marcada */
  reacao?: Fala;
  /** cor de fundo do selo (origem) */
  cor?: string;
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

export interface Etapa {
  id: IdEtapa;
  tipo: TipoEtapa;
  /** o nome da parada na trilha, escrito à mão no caderno ("o nome") */
  estacao: string;
  /** 0..1 — o tamanho da chama ao chegar aqui */
  chama: number;
  /** o que ele diz ao chegar, uma frase de cada vez */
  falas: (r: Respostas) => Fala[];
  opcoes?: Opcao[];
  placeholder?: string;
  /** rótulo do botão principal; o padrão é "Seguir" */
  botao?: string;
  /** o que ele diz ao receber a resposta, antes de andar para a próxima */
  reacao?: (r: Respostas) => Fala[] | null;
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
