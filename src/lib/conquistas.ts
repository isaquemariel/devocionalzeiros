import { supabase } from "@/integrations/supabase/client";

/**
 * AS CONQUISTAS — a lista única e a conta de cada uma.
 *
 * Antes, as 43 conquistas moravam escritas à mão dentro do hook da página, e o
 * selo do cabeçalho tinha uma cópia com só 28 (sem RPG e comunidade) — ele
 * contava menos do que a página mostrava. Agora as duas leem daqui.
 *
 * Uma conquista é desbloqueada quando uma ESTATÍSTICA da pessoa chega à META
 * (capítulos lidos ≥ 10, sequência de acesso ≥ 7…). As estatísticas vêm das
 * tabelas do app (`buscarEstatisticas`); o resgate grava em
 * `achievement_claims`, e o banco (`achievement_catalog`) decide os pontos.
 */

export type Raridade = "comum" | "raro" | "epico" | "lendario";
export type Categoria = "leitura" | "sequencia" | "quiz" | "devocional" | "constancia" | "rpg" | "comunidade";
export type Estatistica =
  | "capitulos" | "sequencia" | "quizAcertos" | "quizDificeis" | "quizTentativas" | "quizSequencia"
  | "devocionais" | "acessos" | "rpgCapitulos" | "rpgPerfeitos" | "rpgXp" | "oracoes" | "gratidoes" | "respondidas";
export type IconeConquista =
  | "Award" | "Book" | "BookOpen" | "Brain" | "Calendar" | "CheckCircle2" | "Crown" | "Flame" | "Gem" | "Heart"
  | "Medal" | "Star" | "Target" | "Trophy" | "Zap";

export interface DefConquista {
  id: string;
  titulo: string;
  descricao: string;
  icone: IconeConquista;
  raridade: Raridade;
  pontos: number;
  categoria: Categoria;
  estat: Estatistica;
  meta: number;
}

export const CONQUISTAS: DefConquista[] = [
  { id: "first_reading", titulo: "Primeiro Passo", descricao: "Complete sua primeira leitura", icone: "BookOpen", raridade: "comum", pontos: 5, categoria: "leitura", estat: "capitulos", meta: 1 },
  { id: "reader_10", titulo: "Leitor Dedicado", descricao: "Leia 10 capítulos da Bíblia", icone: "Book", raridade: "comum", pontos: 5, categoria: "leitura", estat: "capitulos", meta: 10 },
  { id: "reader_50", titulo: "Estudioso da Palavra", descricao: "Leia 50 capítulos da Bíblia", icone: "Gem", raridade: "raro", pontos: 10, categoria: "leitura", estat: "capitulos", meta: 50 },
  { id: "reader_100", titulo: "Mestre das Escrituras", descricao: "Leia 100 capítulos da Bíblia", icone: "Crown", raridade: "epico", pontos: 15, categoria: "leitura", estat: "capitulos", meta: 100 },
  { id: "reader_260", titulo: "Novo Testamento Completo", descricao: "Leia 260 capítulos (tamanho do NT)", icone: "Star", raridade: "lendario", pontos: 20, categoria: "leitura", estat: "capitulos", meta: 260 },
  { id: "streak_3", titulo: "Início Promissor", descricao: "Acesse o app por 3 dias seguidos", icone: "Flame", raridade: "comum", pontos: 5, categoria: "sequencia", estat: "sequencia", meta: 3 },
  { id: "streak_7", titulo: "Chama Acesa", descricao: "Acesse o app por 7 dias seguidos", icone: "Flame", raridade: "raro", pontos: 10, categoria: "sequencia", estat: "sequencia", meta: 7 },
  { id: "streak_30", titulo: "Fogo Inextinguível", descricao: "Acesse o app por 30 dias seguidos", icone: "Zap", raridade: "epico", pontos: 15, categoria: "sequencia", estat: "sequencia", meta: 30 },
  { id: "streak_100", titulo: "Centurião da Fé", descricao: "Acesse o app por 100 dias seguidos", icone: "Crown", raridade: "lendario", pontos: 20, categoria: "sequencia", estat: "sequencia", meta: 100 },
  { id: "quiz_first", titulo: "Primeira Resposta", descricao: "Acerte sua primeira pergunta no quiz", icone: "Brain", raridade: "comum", pontos: 5, categoria: "quiz", estat: "quizAcertos", meta: 1 },
  { id: "quiz_10", titulo: "Mente Afiada", descricao: "Acerte 10 perguntas no quiz", icone: "Brain", raridade: "raro", pontos: 10, categoria: "quiz", estat: "quizAcertos", meta: 10 },
  { id: "quiz_50", titulo: "Sábio Bíblico", descricao: "Acerte 50 perguntas no quiz", icone: "Trophy", raridade: "epico", pontos: 15, categoria: "quiz", estat: "quizAcertos", meta: 50 },
  { id: "quiz_100", titulo: "Mestre do Quiz", descricao: "Acerte 100 perguntas no quiz", icone: "Trophy", raridade: "lendario", pontos: 20, categoria: "quiz", estat: "quizAcertos", meta: 100 },
  { id: "quiz_hard_10", titulo: "Desafiador", descricao: "Acerte 10 perguntas difíceis", icone: "Zap", raridade: "raro", pontos: 10, categoria: "quiz", estat: "quizDificeis", meta: 10 },
  { id: "quiz_hard_50", titulo: "Veterano do Difícil", descricao: "Acerte 50 perguntas difíceis", icone: "Zap", raridade: "epico", pontos: 15, categoria: "quiz", estat: "quizDificeis", meta: 50 },
  { id: "quiz_hard_100", titulo: "Lenda do Quiz Difícil", descricao: "Acerte 100 perguntas difíceis", icone: "Crown", raridade: "lendario", pontos: 20, categoria: "quiz", estat: "quizDificeis", meta: 100 },
  { id: "quiz_total_100", titulo: "Jogador Dedicado", descricao: "Responda 100 perguntas no quiz", icone: "Target", raridade: "raro", pontos: 10, categoria: "quiz", estat: "quizTentativas", meta: 100 },
  { id: "quiz_total_500", titulo: "Maratonista do Quiz", descricao: "Responda 500 perguntas no quiz", icone: "Medal", raridade: "lendario", pontos: 20, categoria: "quiz", estat: "quizTentativas", meta: 500 },
  { id: "quiz_streak_3", titulo: "Sequência Inicial", descricao: "Acerte 3 perguntas seguidas no quiz", icone: "Flame", raridade: "comum", pontos: 5, categoria: "quiz", estat: "quizSequencia", meta: 3 },
  { id: "quiz_streak_5", titulo: "Em Chamas", descricao: "Acerte 5 perguntas seguidas no quiz", icone: "Flame", raridade: "raro", pontos: 10, categoria: "quiz", estat: "quizSequencia", meta: 5 },
  { id: "quiz_streak_7", titulo: "Mente Brilhante", descricao: "Acerte 7 perguntas seguidas no quiz", icone: "Gem", raridade: "epico", pontos: 15, categoria: "quiz", estat: "quizSequencia", meta: 7 },
  { id: "quiz_streak_10", titulo: "Perfeição Absoluta", descricao: "Acerte 10 perguntas seguidas no quiz", icone: "Crown", raridade: "lendario", pontos: 20, categoria: "quiz", estat: "quizSequencia", meta: 10 },
  { id: "devocional_first", titulo: "Momento com Deus", descricao: "Complete seu primeiro devocional", icone: "Heart", raridade: "comum", pontos: 5, categoria: "devocional", estat: "devocionais", meta: 1 },
  { id: "devocional_7", titulo: "Semana de Devoção", descricao: "Complete 7 devocionais", icone: "Heart", raridade: "raro", pontos: 10, categoria: "devocional", estat: "devocionais", meta: 7 },
  { id: "devocional_30", titulo: "Mês Devocional", descricao: "Complete 30 devocionais", icone: "Award", raridade: "epico", pontos: 15, categoria: "devocional", estat: "devocionais", meta: 30 },
  { id: "login_10", titulo: "Visitante Frequente", descricao: "Acesse o app 10 vezes", icone: "Calendar", raridade: "comum", pontos: 5, categoria: "constancia", estat: "acessos", meta: 10 },
  { id: "login_50", titulo: "Usuário Fiel", descricao: "Acesse o app 50 vezes", icone: "Target", raridade: "raro", pontos: 10, categoria: "constancia", estat: "acessos", meta: 50 },
  { id: "login_100", titulo: "Devocionalzeiro de Ouro", descricao: "Acesse o app 100 vezes", icone: "Medal", raridade: "lendario", pontos: 20, categoria: "constancia", estat: "acessos", meta: 100 },
  { id: "rpg_first", titulo: "Aventureiro", descricao: "Complete seu primeiro capítulo no Jogo da Bíblia", icone: "Gem", raridade: "comum", pontos: 5, categoria: "rpg", estat: "rpgCapitulos", meta: 1 },
  { id: "rpg_10", titulo: "Explorador Bíblico", descricao: "Complete 10 capítulos no Jogo da Bíblia", icone: "Target", raridade: "raro", pontos: 10, categoria: "rpg", estat: "rpgCapitulos", meta: 10 },
  { id: "rpg_50", titulo: "Herói da Fé", descricao: "Complete 50 capítulos no Jogo da Bíblia", icone: "Award", raridade: "epico", pontos: 15, categoria: "rpg", estat: "rpgCapitulos", meta: 50 },
  { id: "rpg_100", titulo: "Lenda Bíblica", descricao: "Complete 100 capítulos no Jogo da Bíblia", icone: "Crown", raridade: "lendario", pontos: 20, categoria: "rpg", estat: "rpgCapitulos", meta: 100 },
  { id: "rpg_perfect_5", titulo: "Jogador Perfeito", descricao: "Acerte todas as perguntas em 5 capítulos do Jogo", icone: "Star", raridade: "raro", pontos: 10, categoria: "rpg", estat: "rpgPerfeitos", meta: 5 },
  { id: "rpg_perfect_25", titulo: "Mestre do Jogo", descricao: "Acerte todas as perguntas em 25 capítulos do Jogo", icone: "Crown", raridade: "epico", pontos: 15, categoria: "rpg", estat: "rpgPerfeitos", meta: 25 },
  { id: "rpg_xp_100", titulo: "Centurião XP", descricao: "Acumule 100 XP no Jogo da Bíblia", icone: "Zap", raridade: "raro", pontos: 10, categoria: "rpg", estat: "rpgXp", meta: 100 },
  { id: "rpg_xp_500", titulo: "Guerreiro da Palavra", descricao: "Acumule 500 XP no Jogo da Bíblia", icone: "Trophy", raridade: "lendario", pontos: 20, categoria: "rpg", estat: "rpgXp", meta: 500 },
  { id: "community_first_prayer", titulo: "Voz da Fé", descricao: "Publique seu primeiro pedido de oração", icone: "Heart", raridade: "comum", pontos: 5, categoria: "comunidade", estat: "oracoes", meta: 1 },
  { id: "community_prayer_10", titulo: "Coração Aberto", descricao: "Publique 10 pedidos de oração", icone: "Heart", raridade: "raro", pontos: 10, categoria: "comunidade", estat: "oracoes", meta: 10 },
  { id: "community_first_thanks", titulo: "Primeira Gratidão", descricao: "Publique seu primeiro agradecimento", icone: "Gem", raridade: "comum", pontos: 5, categoria: "comunidade", estat: "gratidoes", meta: 1 },
  { id: "community_thanks_10", titulo: "Espírito Grato", descricao: "Publique 10 agradecimentos na comunidade", icone: "Gem", raridade: "raro", pontos: 10, categoria: "comunidade", estat: "gratidoes", meta: 10 },
  { id: "community_thanks_50", titulo: "Gratidão Sem Fim", descricao: "Publique 50 agradecimentos", icone: "Award", raridade: "epico", pontos: 15, categoria: "comunidade", estat: "gratidoes", meta: 50 },
  { id: "community_answered_1", titulo: "Oração Respondida", descricao: "Marque seu primeiro pedido como respondido", icone: "CheckCircle2", raridade: "raro", pontos: 10, categoria: "comunidade", estat: "respondidas", meta: 1 },
  { id: "community_answered_10", titulo: "Testemunho Vivo", descricao: "Tenha 10 pedidos marcados como respondidos", icone: "Crown", raridade: "epico", pontos: 15, categoria: "comunidade", estat: "respondidas", meta: 10 },
];

/** as seções da página, na ordem em que aparecem, com o nome do RPG */
export const CATEGORIAS: { id: Categoria; nome: string; frase: string }[] = [
  { id: "leitura", nome: "A Leitura", frase: "Capítulo a capítulo pela Palavra" },
  { id: "sequencia", nome: "A Chama Acesa", frase: "Dias seguidos, sem apagar" },
  { id: "devocional", nome: "O Devocional", frase: "O encontro de cada manhã" },
  { id: "quiz", nome: "O Quiz", frase: "O que ficou gravado" },
  { id: "constancia", nome: "A Constância", frase: "Voltar sempre" },
  { id: "rpg", nome: "A Aventura", frase: "As fases do RPG" },
  { id: "comunidade", nome: "A Comunidade", frase: "Orar e agradecer juntos" },
];

/** cor e nome de cada raridade — a paleta do RPG (bronze, azul, púrpura, ouro) */
export const RARIDADES: Record<Raridade, { nome: string; cor: string; fundo: string; brilho: string }> = {
  comum: { nome: "Comum", cor: "#c9a27a", fundo: "#2a1f14", brilho: "#c9a27a55" },
  raro: { nome: "Rara", cor: "#6fb2ff", fundo: "#12213a", brilho: "#6fb2ff55" },
  epico: { nome: "Épica", cor: "#c084fc", fundo: "#241536", brilho: "#c084fc55" },
  lendario: { nome: "Lendária", cor: "#ffd889", fundo: "#2e2208", brilho: "#ffd88966" },
};

/** a unidade de cada estatística, para o Devocionalzeiro dizer "faltam 12 capítulos" */
export const UNIDADE: Record<Estatistica, [string, string]> = {
  capitulos: ["capítulo", "capítulos"], sequencia: ["dia seguido", "dias seguidos"],
  quizAcertos: ["acerto", "acertos"], quizDificeis: ["acerto difícil", "acertos difíceis"],
  quizTentativas: ["pergunta", "perguntas"], quizSequencia: ["acerto seguido", "acertos seguidos"],
  devocionais: ["devocional", "devocionais"], acessos: ["dia de acesso", "dias de acesso"],
  rpgCapitulos: ["fase", "fases"], rpgPerfeitos: ["fase perfeita", "fases perfeitas"], rpgXp: ["XP", "XP"],
  oracoes: ["pedido de oração", "pedidos de oração"], gratidoes: ["gratidão", "gratidões"],
  respondidas: ["oração respondida", "orações respondidas"],
};
export const faltam = (c: { estat: Estatistica; meta: number; progresso: number }) => {
  const n = Math.max(0, c.meta - c.progresso);
  return `${n} ${UNIDADE[c.estat][n === 1 ? 0 : 1]}`;
};

export type Estatisticas = Record<Estatistica, number>;

export interface Conquista extends DefConquista {
  desbloqueada: boolean;
  resgatada: boolean;
  progresso: number;
}

export function montarConquistas(e: Estatisticas, resgatadas: Set<string>): Conquista[] {
  return CONQUISTAS.map((d) => ({
    ...d,
    desbloqueada: (e[d.estat] ?? 0) >= d.meta,
    resgatada: resgatadas.has(d.id),
    progresso: Math.min(e[d.estat] ?? 0, d.meta),
  }));
}

/** o bônus da sequência que o quiz soma aos pontos (useQuiz: 3→1, 5→2, 7→3, 10→5) */
const BONUS_SEQUENCIA: Record<number, number> = { 3: 1, 5: 2, 7: 3, 10: 5 };

/**
 * As estatísticas da pessoa e as conquistas já resgatadas.
 *
 * Quem conta é o BANCO (`minhas_estatisticas_conquistas`): é ele que aceita ou
 * recusa o resgate, então a tela mostra como liberado exatamente o que ele
 * vai aceitar. Sem a função (banco ainda sem a migração), a conta é feita aqui
 * com as MESMAS regras. Erro de consulta LANÇA — antes uma falha virava "zero",
 * e a tela dizia "todas as conquistas são suas" ou oferecia resgatar de novo.
 */
export async function buscarEstatisticas(userId: string): Promise<{ estat: Estatisticas; resgatadas: Set<string> }> {
  const { data: doBanco, error: erroRpc } = await supabase.rpc("minhas_estatisticas_conquistas" as never);
  if (!erroRpc && doBanco) {
    const d = doBanco as unknown as { estat: Estatisticas; resgatadas: string[] };
    return { estat: d.estat, resgatadas: new Set(d.resgatadas ?? []) };
  }
  return contarAqui(userId);
}

async function contarAqui(userId: string): Promise<{ estat: Estatisticas; resgatadas: Set<string> }> {
  const r = await Promise.all([
    supabase.from('daily_logins').select('login_date').eq('user_id', userId).order('login_date', { ascending: true }),
    supabase.from('reading_progress').select('book_name, chapter_number').eq('user_id', userId),
    supabase.from('reading_schedule').select('book_name, chapter_number').eq('user_id', userId).eq('is_completed', true),
    supabase.from('quiz_attempts').select('is_correct, points_earned, streak_count').eq('user_id', userId),
    supabase.from('devotional_completions').select('devotional_date').eq('user_id', userId),
    supabase.from('achievement_claims').select('achievement_id').eq('user_id', userId),
    supabase.from('rpg_progress').select('is_completed, quiz_correct, quiz_total').eq('user_id', userId),
    supabase.from('community_posts' as never).select('post_type, is_answered').eq('user_id', userId),
  ]);
  const erro = r.find((x) => x.error)?.error;
  if (erro) throw erro;
  const [logins, leituras, cronograma, quiz, devocionais, resgates, rpg, posts] = r.map((x) => x.data ?? []) as unknown as [
    { login_date: string }[], { book_name: string; chapter_number: number }[], { book_name: string; chapter_number: number }[],
    { is_correct: boolean; points_earned: number; streak_count: number | null }[], unknown[], { achievement_id: string }[],
    { is_completed: boolean; quiz_correct: number; quiz_total: number }[], { post_type: string; is_answered: boolean | null }[],
  ];

  // capítulos DISTINTOS (o mesmo capítulo nas duas tabelas conta uma vez)
  const capitulos = new Set([...leituras, ...cronograma].map((c) => `${c.book_name}:${c.chapter_number}`)).size;
  // a MAIOR sequência de dias seguidos (a conquista, uma vez alcançada, fica)
  let sequencia = 0, atual = 0, anterior: number | null = null;
  for (const l of logins) {
    const dia = Math.round(new Date(`${l.login_date}T12:00:00`).getTime() / 86_400_000);
    if (anterior !== null && dia === anterior) continue;
    atual = anterior !== null && dia - anterior === 1 ? atual + 1 : 1;
    sequencia = Math.max(sequencia, atual);
    anterior = dia;
  }
  const dificil = (q: { points_earned: number; streak_count: number | null }) =>
    q.points_earned - (BONUS_SEQUENCIA[q.streak_count ?? 0] ?? 0) === 3;
  const concluidas = rpg.filter((p) => p.is_completed);

  return {
    estat: {
      capitulos,
      sequencia,
      quizAcertos: quiz.filter((q) => q.is_correct).length,
      quizDificeis: quiz.filter((q) => q.is_correct && dificil(q)).length,
      quizTentativas: quiz.length,
      quizSequencia: quiz.reduce((m, q) => Math.max(m, q.streak_count || 0), 0),
      devocionais: devocionais.length,
      acessos: new Set(logins.map((l) => l.login_date)).size,
      rpgCapitulos: concluidas.length,
      rpgPerfeitos: concluidas.filter((p) => p.quiz_total > 0 && p.quiz_correct === p.quiz_total).length,
      rpgXp: concluidas.reduce((s, p) => s + 10 + (p.quiz_correct || 0) * 5, 0),
      oracoes: posts.filter((p) => p.post_type === 'prayer').length,
      gratidoes: posts.filter((p) => p.post_type === 'thanks').length,
      respondidas: posts.filter((p) => p.post_type === 'prayer' && p.is_answered).length,
    },
    resgatadas: new Set(resgates.map((c) => c.achievement_id)),
  };
}
