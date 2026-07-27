// ============================================================================
// RPG — Patentes de Nível (design evolutivo do ícone de nível)
// ----------------------------------------------------------------------------
// Nível = número de livros da Bíblia concluídos no RPG (0 a 66). Cada livro
// concluído sobe 1 nível; o teto é 66 (a Bíblia inteira). O admin é sempre 66.
//
// Conforme o nível sobe, o distintivo (badge) evolui de patente: muda a cor, o
// emblema e o brilho — dando leitura visual imediata do progresso do jogador.
// A fonte da verdade do NÚMERO do nível é o banco (rpg_user_stats.current_level,
// calculado por trigger). Aqui mora só a APARÊNCIA por faixa.
// ============================================================================

export interface LevelTier {
  /** nível mínimo (inclusive) para entrar nesta patente */
  min: number;
  /** nome da patente */
  title: string;
  /** emblema (emoji) */
  emoji: string;
  /** cor principal (texto/realce) */
  color: string;
  /** gradiente do distintivo [claro, escuro] */
  gradient: [string, string];
  /** brilho/animação para patentes altas */
  glow?: boolean;
}

// 9 patentes — do Recruta (nv 0) ao Fiel (nv 66, Bíblia inteira).
export const LEVEL_TIERS: LevelTier[] = [
  { min: 0,  title: "Recruta",   emoji: "🔰", color: "#9aa3ad", gradient: ["#4a525c", "#2b3138"] },
  { min: 1,  title: "Aprendiz",  emoji: "🛡️", color: "#d1975a", gradient: ["#a86a37", "#5f3a1e"] },
  { min: 5,  title: "Peregrino", emoji: "🧭", color: "#b9c4d0", gradient: ["#8a97a6", "#454f5b"] },
  { min: 13, title: "Guerreiro", emoji: "⚔️", color: "#7fb0ff", gradient: ["#3f6bb0", "#1e2f57"] },
  { min: 23, title: "Valente",   emoji: "🏹", color: "#6fd28a", gradient: ["#3f8f5e", "#1c4a30"] },
  { min: 33, title: "Sábio",     emoji: "📜", color: "#c79bff", gradient: ["#6b46b0", "#341f5c"] },
  { min: 44, title: "Profeta",   emoji: "🔥", color: "#ff9d5c", gradient: ["#b0562c", "#5e2a13"] },
  { min: 55, title: "Discípulo", emoji: "✨", color: "#ffd889", gradient: ["#c99a2e", "#6b5013"], glow: true },
  { min: 66, title: "O Fiel",    emoji: "👑", color: "#ffe9a8", gradient: ["#ffd54a", "#8a6a12"], glow: true },
];

/** Patente correspondente a um nível. */
export function getLevelTier(level: number): LevelTier {
  let tier = LEVEL_TIERS[0];
  for (const t of LEVEL_TIERS) if (level >= t.min) tier = t;
  return tier;
}

/** Nível máximo do jogo (Bíblia inteira). */
export const MAX_LEVEL = 66;

/** Texto curto de explicação do nível (usado no popover do HUD). */
export const LEVEL_HELP =
  "Seu nível no Jogo da Bíblia. Você começa no nível 0 e sobe 1 nível a cada " +
  "livro da Bíblia concluído (todos os capítulos) — até o nível máximo 66, a " +
  "Bíblia inteira.";
