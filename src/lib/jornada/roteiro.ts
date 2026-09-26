import type { Etapa, IdEtapa, Opcao, Respostas } from "./tipos";

/**
 * O ROTEIRO DA JORNADA — a conversa com o Devocionalzeiro, etapa por etapa.
 *
 * A ordem é de propósito, e é a lição que os apps de hábito aprenderam: a
 * pessoa INVESTE antes de pagar o pedágio. Primeiro ela conta quem é, por que
 * veio e quanto quer se dedicar; vê o plano que isso gera; SÓ ENTÃO cria a
 * conta — que deixa de ser um formulário e passa a ser "salvar o que eu já
 * comecei". O cadastro antigo pedia e-mail e senha na porta, antes de dar
 * qualquer motivo para ficar.
 *
 * Tudo aqui é dado. Para tirar, trocar ou incluir pergunta, mexa nesta lista.
 */

/** Nome que a pessoa deu, ou um tratamento neutro enquanto não deu. */
const nome = (r: Respostas) => r.apelido?.trim() || "amigo(a)";

export const MOTIVOS: Opcao[] = [
  { valor: "deus", rotulo: "Me aproximar de Deus", icone: "🙏" },
  { valor: "habito", rotulo: "Criar o hábito de ler a Bíblia", icone: "📖" },
  { valor: "entender", rotulo: "Entender melhor o que leio", icone: "💡" },
  { valor: "juntos", rotulo: "Crescer junto com outras pessoas", icone: "🤝" },
  { valor: "divertido", rotulo: "Aprender de um jeito divertido", icone: "🎮" },
  { valor: "outro", rotulo: "Outro motivo", icone: "💬" },
];

export const FAMILIARIDADE: Opcao[] = [
  { valor: "comecando", rotulo: "Estou começando agora", nivel: 0 },
  { valor: "historias", rotulo: "Conheço algumas histórias", nivel: 1 },
  { valor: "alguns-livros", rotulo: "Já li alguns livros", nivel: 2 },
  { valor: "frequente", rotulo: "Leio com frequência", nivel: 3 },
  { valor: "inteira", rotulo: "Já li a Bíblia inteira", nivel: 4 },
];

/** O valor é a meta em minutos — é ele que alimenta o cálculo do plano. */
export const METAS: Opcao[] = [
  { valor: "5", rotulo: "5 minutos / dia", detalhe: "Leve" },
  { valor: "10", rotulo: "10 minutos / dia", detalhe: "Constante" },
  { valor: "15", rotulo: "15 minutos / dia", detalhe: "Firme" },
  { valor: "20", rotulo: "20 minutos / dia", detalhe: "Intensa" },
];

/**
 * Os seis primeiros valores são os que o cadastro antigo gravava em
 * `referral_source`. Mantidos IGUAIS de propósito: o admin e os relatórios
 * contam por eles, e trocar a grafia partiria a série histórica ao meio.
 */
export const ORIGENS: Opcao[] = [
  { valor: "instagram", rotulo: "Instagram", icone: "📸" },
  { valor: "tiktok", rotulo: "TikTok", icone: "🎵" },
  { valor: "threads", rotulo: "Threads", icone: "🧵" },
  { valor: "kwai", rotulo: "Kwai", icone: "🎬" },
  { valor: "anuncios", rotulo: "Anúncio", icone: "📣" },
  { valor: "indicacao", rotulo: "Indicação de alguém", icone: "💛" },
  { valor: "youtube", rotulo: "YouTube", icone: "▶️" },
  { valor: "igreja", rotulo: "Na minha igreja", icone: "⛪" },
  { valor: "google", rotulo: "Busca no Google", icone: "🔎" },
  { valor: "outro", rotulo: "Outro lugar", icone: "✨" },
];

const nivelDe = (valor?: string) => FAMILIARIDADE.find((o) => o.valor === valor)?.nivel ?? 0;

export const ROTEIRO: Etapa[] = [
  {
    id: "boas-vindas",
    tipo: "fala",
    humor: "feliz",
    fala: () => "Oi! Eu sou o Devocionalzeiro 🔥 Vou caminhar com você pela Palavra. Posso te conhecer um pouquinho?",
    botao: "Bora!",
  },
  {
    id: "nome",
    tipo: "texto",
    humor: "base",
    fala: () => "Como você gosta de ser chamado(a)?",
    placeholder: "Seu nome",
    reacao: (r) => ({ humor: "feliz", fala: `Prazer, ${nome(r)}! Que alegria ter você aqui.` }),
  },
  {
    id: "motivo",
    tipo: "multipla",
    humor: "base",
    fala: (r) => `O que te trouxe até aqui, ${nome(r)}?`,
    apoio: "Pode escolher mais de um",
    opcoes: MOTIVOS,
    reacao: (r) =>
      r.motivos?.includes("deus")
        ? { humor: "feliz", fala: "Não existe motivo mais bonito que esse. 🙌" }
        : { humor: "feliz", fala: "Anotado! Vou montar tudo pensando nisso." },
  },
  {
    id: "familiaridade",
    tipo: "unica",
    humor: "base",
    fala: () => "E quanto você já conhece da Bíblia?",
    opcoes: FAMILIARIDADE,
    reacao: (r) => {
      const n = nivelDe(r.familiaridade);
      if (n <= 1) return { humor: "feliz", fala: "Perfeito pra começar! Eu te guio passo a passo." };
      if (n === 2) return { humor: "feliz", fala: "Ótimo! Então vamos aprofundar juntos." };
      return { humor: "feliz", fala: "Uau! Então se prepare pros desafios. 😎" };
    },
  },
  {
    id: "meta",
    tipo: "unica",
    humor: "base",
    fala: () => "Quanto tempo por dia você quer separar pra Palavra?",
    opcoes: METAS,
  },
  {
    id: "plano",
    tipo: "plano",
    humor: "campeao",
    fala: (r) => `Olha só aonde você vai chegar, ${nome(r)}:`,
    botao: "Quero isso!",
  },
  {
    id: "origem",
    tipo: "unica",
    humor: "base",
    fala: () => "Me conta: como você conheceu o Devocionalzeiros?",
    opcoes: ORIGENS,
    reacao: () => ({ humor: "feliz", fala: "Obrigado por contar! 💛" }),
  },
  {
    // Honesto de propósito: hoje o app não manda mensagem automática pelo
    // WhatsApp, então o Devocionalzeiro não promete versículo diário.
    id: "whatsapp",
    tipo: "telefone",
    humor: "base",
    fala: () => "Quer deixar seu WhatsApp? Assim a gente consegue te avisar das novidades e te ajudar se precisar.",
    apoio: "É opcional — dá pra pular.",
    botao: "Salvar meu WhatsApp",
  },
  {
    id: "salvar",
    tipo: "conta",
    humor: "feliz",
    fala: (r) => `${nome(r)}, sua jornada já começou! 🎉 Bora salvar seu progresso pra não perder nada?`,
  },
  {
    id: "email",
    tipo: "texto",
    humor: "base",
    fala: () => "Qual é o seu melhor e-mail?",
    placeholder: "voce@exemplo.com",
  },
  {
    id: "senha",
    tipo: "senha",
    humor: "base",
    fala: () => "Agora crie uma senha. É a chave da sua jornada 🔒",
    placeholder: "Pelo menos 8 caracteres",
    botao: "Criar minha conta",
  },
  {
    id: "fim",
    tipo: "fim",
    humor: "campeao",
    fala: (r) => `Bem-vindo(a) à família, ${nome(r)}! 🎉`,
    botao: "Começar",
  },
];

export const ORDEM: IdEtapa[] = ROTEIRO.map((e) => e.id);

const INDICE = new Map(ROTEIRO.map((e, i) => [e.id, i]));

export function etapa(id: IdEtapa): Etapa {
  const i = INDICE.get(id);
  if (i === undefined) throw new Error(`Etapa desconhecida: ${id}`);
  return ROTEIRO[i];
}

/** A etapa seguinte na ordem linear, ou `null` no fim. */
export function proxima(id: IdEtapa): IdEtapa | null {
  const i = INDICE.get(id) ?? -1;
  return i >= 0 && i < ORDEM.length - 1 ? ORDEM[i + 1] : null;
}

/** Fração 0..1 da barra de progresso. */
export function progresso(id: IdEtapa): number {
  const i = INDICE.get(id) ?? 0;
  return i / (ORDEM.length - 1);
}
