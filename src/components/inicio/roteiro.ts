import type { Fase, Momento } from "@/lib/ceu";
import type { Expressao, Gesto } from "@/lib/jornada/tipos";

/**
 * O QUE ELE DIZ NA TELA INICIAL — o app, contado por ele.
 *
 * Nada de frase solta: a conversa apresenta o que a pessoa vai encontrar lá
 * dentro, por que vale fazer parte, e termina chamando para o botão certo.
 * Cada fala sobre um recurso acende o chip (celular) ou o cartão (computador)
 * dele — o que ele fala e o que se vê andam juntos.
 *
 * Três conversas, conforme quem chega:
 * - quem nunca entrou: a apresentação inteira e "Começar Jornada";
 * - quem já entrou NESTE aparelho (`quemVolta`): pelo nome, "a sua chama
 *   ficou guardada", o que tem hoje, e "Já tenho uma conta";
 * - quem começou a jornada de boas-vindas e parou: "falta pouco" e
 *   "Continuar Jornada" (o rascunho guarda as respostas).
 */

export type IdRecurso = "devocional" | "leitura" | "rpg" | "quiz" | "conquistas" | "comunidade";

export interface Fala {
  texto: string;
  detalhe?: string;
  gesto?: Gesto;
  expressao?: Expressao;
  /** o recurso de que ele está falando (acende na tela) */
  recurso?: IdRecurso;
}

export const RECURSOS: { id: IdRecurso; nome: string; texto: string }[] = [
  { id: "devocional", nome: "Devocional", texto: "Um devocional novo todo dia, para conversar com o seu momento." },
  { id: "leitura", nome: "Leitura", texto: "A Bíblia inteira num plano no seu ritmo — a chama cresce a cada capítulo." },
  { id: "rpg", nome: "RPG", texto: "O Jogo da Bíblia: ande pelas cenas, fale com os personagens, vença desafios." },
  { id: "quiz", nome: "Quiz", texto: "Perguntas para fixar o que você leu, do fácil ao difícil." },
  { id: "conquistas", nome: "Conquistas", texto: "Medalhas, pontos e ranking para você não parar." },
  { id: "comunidade", nome: "Comunidade", texto: "Pedidos de oração e agradecimentos: ninguém caminha sozinho." },
];

const OI: Record<Fase, string> = { madrugada: "Acordado a essa hora?", manha: "Bom dia!", tarde: "Boa tarde!", noite: "Boa noite!" };

/** a apresentação do app, recurso por recurso */
const APRESENTACAO: Fala[] = [
  { texto: "Aqui a Bíblia vira jornada — e eu vou com você do Gênesis ao Apocalipse.", gesto: "apontar", expressao: "radiante" },
  { texto: "Todo dia tem um devocional novo, feito para conversar com o que você está vivendo.", gesto: "parado", expressao: "feliz", recurso: "devocional" },
  { texto: "Você lê a Bíblia num plano do seu tamanho. A cada capítulo, a minha chama cresce.", gesto: "apontar", expressao: "orgulhoso", recurso: "leitura" },
  { texto: "E tem o Jogo da Bíblia: você anda pelas cenas, conversa com os personagens e enfrenta desafios.", gesto: "vitoria", expressao: "radiante", recurso: "rpg" },
  { texto: "Quiz para fixar o que leu, do fácil ao difícil. Vale ponto!", gesto: "pensar", expressao: "pensativo", recurso: "quiz" },
  { texto: "Medalhas, conquistas e ranking — pra constância virar hábito.", gesto: "comemorar", expressao: "radiante", recurso: "conquistas" },
  { texto: "E uma comunidade que ora junto e agradece junto. Ninguém caminha sozinho aqui.", gesto: "acenar", expressao: "feliz", recurso: "comunidade" },
  { texto: "Por que ser um devocionalzeiro? Porque com Deus é um passo por dia — e com companhia fica mais fácil.", gesto: "parado", expressao: "feliz" },
];

export interface Quem {
  /** primeiro nome de quem já entrou neste aparelho (vazio: não sabemos o nome) */
  volta?: { nome: string } | null;
  /** começou a jornada de boas-vindas e não terminou */
  jornadaPelaMetade?: boolean;
}

export function montarRoteiro(m: Momento, quem: Quem): Fala[] {
  const oi = OI[m.fase];

  if (quem.volta) {
    const nome = quem.volta.nome;
    return [
      { texto: nome ? `${oi} Oi de novo, ${nome}!` : `${oi} Que bom te ver de novo!`, gesto: "acenar", expressao: "radiante" },
      { texto: "A sua chama ficou guardada aqui. É só entrar para continuar de onde parou.", gesto: "apontar", expressao: "feliz" },
      { texto: "Hoje tem devocional novo te esperando.", gesto: "parado", expressao: "feliz", recurso: "devocional" },
      { texto: "E o próximo capítulo do seu plano também — a sequência não pode parar!", gesto: "vitoria", expressao: "orgulhoso", recurso: "leitura" },
      { texto: "No Jogo da Bíblia, a aventura continua do capítulo em que você ficou.", gesto: "apontar", expressao: "radiante", recurso: "rpg" },
      { texto: "Toca em Já tenho uma conta e bora!", gesto: "acenar", expressao: "radiante" },
    ];
  }

  if (quem.jornadaPelaMetade) {
    return [
      { texto: `${oi} Você voltou!`, gesto: "acenar", expressao: "radiante" },
      { texto: "Você começou a sua jornada e parou no meio. Falta pouco!", gesto: "apontar", expressao: "feliz" },
      { texto: "Eu guardei as suas respostas. Toca em Continuar Jornada e a gente termina juntos.", gesto: "vitoria", expressao: "radiante" },
      ...APRESENTACAO.slice(1),
      { texto: "Bora terminar? É só tocar em Continuar Jornada.", gesto: "apontar", expressao: "feliz" },
    ];
  }

  return [
    { texto: `${oi} Eu sou o Devocionalzeiro.`, gesto: "acenar", expressao: "radiante" },
    ...APRESENTACAO,
    { texto: "Toca em Começar Jornada: umas perguntas rápidas e eu monto o seu caminho.", gesto: "apontar", expressao: "radiante" },
  ];
}

/** nas voltas do ciclo, a saudação fica de fora */
export const CUTUCOES: Fala[] = [
  { texto: "Ei! Isso faz cócegas!", gesto: "pirueta", expressao: "radiante" },
  { texto: "Pode me levar pela estrada! Arrasta o dedo pelo chão.", gesto: "apontar", expressao: "feliz" },
  { texto: "Toca duas vezes que eu pulo!", gesto: "vitoria", expressao: "radiante" },
  { texto: "Hehe. Tô pronto! E você?", gesto: "vitoria", expressao: "radiante" },
];

export const CUTUCOES_DESKTOP: Fala[] = [
  { texto: "Ei! Isso faz cócegas!", gesto: "pirueta", expressao: "radiante" },
  { texto: "Pode me levar pela estrada com as setas do teclado.", gesto: "apontar", expressao: "feliz" },
  { texto: "Aperta espaço que eu pulo!", gesto: "vitoria", expressao: "radiante" },
  { texto: "Hehe. Tô pronto! E você?", gesto: "vitoria", expressao: "radiante" },
];
