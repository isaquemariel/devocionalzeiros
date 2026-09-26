/**
 * O CATÁLOGO DOS PLANOS — preço e o que cada plano libera.
 *
 * Fonte única da vitrine: a jornada e a página oficial de planos (as portas da
 * cidade, em `/planos` e `/escolher-plano`) leem daqui. A tabela já viveu
 * copiada em duas telas antigas — um reajuste de preço lembrado numa só
 * mostrava à pessoa um preço que o checkout não cobra.
 *
 * O preço cobrado de verdade é o do Stripe (edge function
 * `create-subscription-checkout`); estes valores são a VITRINE e precisam
 * acompanhar o de lá.
 */

export type ChavePlano = "free" | "gold" | "premium";
export type ChavePago = Exclude<ChavePlano, "free">;

export interface Recurso {
  name: string;
  free: string;
  gold: string;
  premium: string;
  /** nome curto, para caber num selo de duas colunas no celular */
  curto: string;
  /** o que o Devocionalzeiro diz quando a pessoa toca no recurso, na jornada */
  explicacao: string;
}

export const RECURSOS: Recurso[] = [
  { name: "Devocional Diário", curto: "Devocional", free: "✅ Completo", gold: "✅ Completo", premium: "✅ Completo",
    explicacao: "Um devocional novo todo dia. É o coração do app, e é de todo mundo." },
  { name: "Leitura Bíblica", curto: "Leitura", free: "Bíblia completa", gold: "✅ Todos os planos", premium: "✅ Todos os planos",
    explicacao: "A Bíblia inteira é de todos. Nos pagos, entram também todos os planos de leitura." },
  { name: "Ranking", curto: "Ranking", free: "✅ Completo", gold: "✅ Completo", premium: "✅ Completo",
    explicacao: "A classificação da comunidade — quem anda mais constante na Palavra." },
  { name: "Devocionalzeiros RPG", curto: "RPG", free: "2 estágios/dia", gold: "10 estágios/dia", premium: "Ilimitado",
    explicacao: "O jogo: você vive as histórias da Bíblia, fase por fase. Muda quantas por dia." },
  { name: "Salas de Bate-papo (chat ao vivo)", curto: "Salas ao vivo", free: "❌ Bloqueado", gold: "Salas dos livros (Gênesis→Apocalipse)", premium: "Todas + Sala Global",
    explicacao: "Salas ao vivo pra conversar com outros leitores, uma por livro da Bíblia." },
  { name: "Quiz Bíblico (Plano + Livre)", curto: "Quiz", free: "1x/dia", gold: "5x/dia", premium: "Ilimitado",
    explicacao: "Perguntas sobre o que você leu, pra fixar. O limite é de rodadas por dia." },
  { name: "Quiz Modo Aleatório", curto: "Quiz aleatório", free: "❌ Bloqueado", gold: "❌ Bloqueado", premium: "✅ Ilimitado",
    explicacao: "Quiz com perguntas sorteadas de qualquer parte da Bíblia." },
  { name: "Gerador de Sermão", curto: "Sermão", free: "❌ Bloqueado", gold: "5/dia", premium: "Ilimitado",
    explicacao: "Ajuda a montar o esboço de uma pregação a partir de um texto." },
  { name: "Devocionalzeiro.CHAT", curto: "Chat bíblico", free: "❌ Bloqueado", gold: "5 perguntas/dia", premium: "Ilimitado",
    explicacao: "Um chat pra tirar dúvidas sobre a Bíblia, na hora que bater a dúvida." },
  { name: "Explicação de Versículo", curto: "Explicação", free: "2/dia", gold: "10/dia", premium: "Ilimitado",
    explicacao: "Explica o sentido de um versículo enquanto você lê." },
  { name: "Plano Personalizado (IA)", curto: "Plano com IA", free: "❌ Bloqueado", gold: "✅ Ilimitado", premium: "✅ Ilimitado",
    explicacao: "Um plano de leitura montado pra você, no seu ritmo." },
  { name: "Programa Embaixador", curto: "Embaixador", free: "❌ Bloqueado", gold: "❌ Bloqueado", premium: "✅ Disponível",
    explicacao: "Você indica o app com o seu link e ganha 10% de cada nova assinatura indicada." },
];

export interface Preco {
  name: string;
  monthlyPrice: string;
  monthlyValue: number;
  annualPrice: string;
  annualValue: number;
  highlight: string;
}

export const PRECOS: Record<ChavePago, Preco> = {
  gold: {
    name: "GOLD",
    monthlyPrice: "R$ 14,90",
    monthlyValue: 14.9,
    annualPrice: "R$ 149,90",
    annualValue: 149.9,
    highlight: "Mais popular",
  },
  premium: {
    name: "PREMIUM",
    monthlyPrice: "R$ 29,90",
    monthlyValue: 29.9,
    annualPrice: "R$ 249,90",
    annualValue: 249.9,
    highlight: "Uso ilimitado",
  },
};

export const formatBRL = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** quanto o anual economiza sobre doze mensalidades */
export function economiaAnual(p: Preco) {
  const doze = p.monthlyValue * 12;
  const valor = doze - p.annualValue;
  return { valor, pct: Math.round((valor / doze) * 100), porMes: p.annualValue / 12 };
}

/**
 * O valor em poucas palavras, para o selo: "10 estágios/dia" → "10 por dia",
 * "Salas dos livros (Gênesis→Apocalipse)" → "de cada livro".
 */
export function resumo(v: string): string {
  const t = lerValor(v).texto;
  const porDia = t.match(/^(\d+)\s*(?:x|estágios|perguntas)?\s*\/\s*dia$/i);
  if (porDia) return `${porDia[1]} por dia`;
  if (/Gênesis/.test(t)) return "de cada livro";
  if (/Sala Global/.test(t)) return "todas + Global";
  return t;
}

/**
 * O que o plano `para` traz A MAIS que o plano `de` — o que muda. É o que
 * mostra o Gold ("tudo do Grátis, e mais…") e o Premium ("tudo do Gold, e
 * mais…") sem repetir a tabela inteira a cada aba.
 */
export function diferencas(de: ChavePlano, para: ChavePlano): Recurso[] {
  return RECURSOS.filter((r) => {
    const a = lerValor(r[de]), b = lerValor(r[para]);
    return b.tem && (!a.tem || a.texto !== b.texto);
  });
}

/** o que o plano inclui (para o Grátis, que não tem "de quem herdar") */
export const incluidos = (p: ChavePlano) => RECURSOS.filter((r) => lerValor(r[p]).tem);

/** "✅ Completo" → { tem: true, texto: "Completo" } — o emoji vira ícone na tela */
export function lerValor(v: string): { tem: boolean; texto: string } {
  const bloqueado = v.includes("❌");
  return { tem: !bloqueado, texto: v.replace(/[✅❌]\s*/gu, "").trim() };
}
