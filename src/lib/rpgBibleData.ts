// Bible books data for RPG - 66 levels, each with chapters as stages

export type RPGRegion = 
  | "creation"      // Gênesis
  | "desert"        // Êxodo-Deuteronômio
  | "conquest"      // Josué-Rute
  | "kingdom"       // 1 Samuel - 2 Crônicas
  | "exile"         // Esdras-Ester
  | "wisdom"        // Jó-Cantares
  | "prophets"      // Isaías-Daniel
  | "minor_prophets"// Oséias-Malaquias
  | "gospels"       // Mateus-João
  | "acts"          // Atos
  | "epistles"      // Romanos-Judas
  | "revelation";   // Apocalipse

export interface RPGRegionTheme {
  id: RPGRegion;
  name: string;
  emoji: string;
  gradient: string;
  bgGradient: string;
  accentColor: string;
  glowColor: string;
  particleEmoji: string[];
  description: string;
}

export const RPG_REGION_THEMES: Record<RPGRegion, RPGRegionTheme> = {
  creation: {
    id: "creation",
    name: "A Criação",
    emoji: "🌌",
    gradient: "from-indigo-600 via-purple-600 to-blue-600",
    bgGradient: "from-[#0a0a2e] via-[#1a0a3e] to-[#0a1a3e]",
    accentColor: "#818cf8",
    glowColor: "rgba(129,140,248,0.3)",
    particleEmoji: ["✨", "⭐", "🌟"],
    description: "No princípio..."
  },
  desert: {
    id: "desert",
    name: "O Deserto",
    emoji: "🏜️",
    gradient: "from-amber-700 via-orange-600 to-yellow-600",
    bgGradient: "from-[#2a1a0a] via-[#3a2010] to-[#1a1008]",
    accentColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.3)",
    particleEmoji: ["🔥", "☀️", "💨"],
    description: "40 anos no deserto"
  },
  conquest: {
    id: "conquest",
    name: "A Conquista",
    emoji: "⚔️",
    gradient: "from-red-700 via-red-600 to-orange-600",
    bgGradient: "from-[#1a0a0a] via-[#2a1010] to-[#1a0a08]",
    accentColor: "#ef4444",
    glowColor: "rgba(239,68,68,0.3)",
    particleEmoji: ["⚔️", "🛡️", "🏹"],
    description: "Terra Prometida"
  },
  kingdom: {
    id: "kingdom",
    name: "O Reino",
    emoji: "👑",
    gradient: "from-amber-500 via-yellow-500 to-amber-600",
    bgGradient: "from-[#1a1a08] via-[#2a2010] to-[#1a1508]",
    accentColor: "#eab308",
    glowColor: "rgba(234,179,8,0.3)",
    particleEmoji: ["👑", "🏰", "⚜️"],
    description: "Reis e Reinados"
  },
  exile: {
    id: "exile",
    name: "O Exílio",
    emoji: "⛓️",
    gradient: "from-slate-600 via-gray-600 to-zinc-700",
    bgGradient: "from-[#0a0a10] via-[#151520] to-[#0a0a15]",
    accentColor: "#94a3b8",
    glowColor: "rgba(148,163,184,0.3)",
    particleEmoji: ["⛓️", "🕊️", "🧱"],
    description: "Restauração"
  },
  wisdom: {
    id: "wisdom",
    name: "Sabedoria",
    emoji: "📜",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    bgGradient: "from-[#0a1a1a] via-[#0a2a20] to-[#0a1a18]",
    accentColor: "#10b981",
    glowColor: "rgba(16,185,129,0.3)",
    particleEmoji: ["📜", "🕯️", "🎵"],
    description: "Salmos e Provérbios"
  },
  prophets: {
    id: "prophets",
    name: "Profetas Maiores",
    emoji: "🔥",
    gradient: "from-violet-700 via-purple-600 to-fuchsia-600",
    bgGradient: "from-[#1a0a2a] via-[#200a30] to-[#150a25]",
    accentColor: "#a78bfa",
    glowColor: "rgba(167,139,250,0.3)",
    particleEmoji: ["🔥", "👁️", "⚡"],
    description: "Visões e Profecias"
  },
  minor_prophets: {
    id: "minor_prophets",
    name: "Profetas Menores",
    emoji: "📣",
    gradient: "from-sky-600 via-blue-600 to-indigo-600",
    bgGradient: "from-[#0a0a2a] via-[#0a1030] to-[#0a0a25]",
    accentColor: "#38bdf8",
    glowColor: "rgba(56,189,248,0.3)",
    particleEmoji: ["📣", "🌊", "🐋"],
    description: "Vozes do Senhor"
  },
  gospels: {
    id: "gospels",
    name: "Os Evangelhos",
    emoji: "✝️",
    gradient: "from-amber-400 via-yellow-300 to-white",
    bgGradient: "from-[#1a1508] via-[#2a2010] to-[#1a1a0a]",
    accentColor: "#fbbf24",
    glowColor: "rgba(251,191,36,0.4)",
    particleEmoji: ["✝️", "🕊️", "💫"],
    description: "A Vida de Jesus"
  },
  acts: {
    id: "acts",
    name: "Atos",
    emoji: "🔥",
    gradient: "from-orange-500 via-red-500 to-amber-500",
    bgGradient: "from-[#1a0a08] via-[#2a1510] to-[#1a0a0a]",
    accentColor: "#f97316",
    glowColor: "rgba(249,115,22,0.3)",
    particleEmoji: ["🔥", "🌍", "⚡"],
    description: "O Espírito Santo"
  },
  epistles: {
    id: "epistles",
    name: "As Epístolas",
    emoji: "✉️",
    gradient: "from-cyan-600 via-teal-500 to-emerald-500",
    bgGradient: "from-[#0a1518] via-[#0a2020] to-[#0a1a15]",
    accentColor: "#06b6d4",
    glowColor: "rgba(6,182,212,0.3)",
    particleEmoji: ["✉️", "📖", "🙏"],
    description: "Cartas às Igrejas"
  },
  revelation: {
    id: "revelation",
    name: "Apocalipse",
    emoji: "🌟",
    gradient: "from-amber-400 via-rose-500 to-purple-600",
    bgGradient: "from-[#1a0a1a] via-[#2a1020] to-[#1a0a2a]",
    accentColor: "#f43f5e",
    glowColor: "rgba(244,63,94,0.4)",
    particleEmoji: ["🌟", "👑", "🔥"],
    description: "A Revelação Final"
  },
};

export interface RPGBook {
  index: number;
  id: string;
  name: string;
  chapters: number;
  testament: "old" | "new";
  region: RPGRegion;
}

export const RPG_BIBLE_BOOKS: RPGBook[] = [
  { index: 0, id: "genesis", name: "Gênesis", chapters: 50, testament: "old", region: "creation" },
  { index: 1, id: "exodus", name: "Êxodo", chapters: 40, testament: "old", region: "desert" },
  { index: 2, id: "leviticus", name: "Levítico", chapters: 27, testament: "old", region: "desert" },
  { index: 3, id: "numbers", name: "Números", chapters: 36, testament: "old", region: "desert" },
  { index: 4, id: "deuteronomy", name: "Deuteronômio", chapters: 34, testament: "old", region: "desert" },
  { index: 5, id: "joshua", name: "Josué", chapters: 24, testament: "old", region: "conquest" },
  { index: 6, id: "judges", name: "Juízes", chapters: 21, testament: "old", region: "conquest" },
  { index: 7, id: "ruth", name: "Rute", chapters: 4, testament: "old", region: "conquest" },
  { index: 8, id: "1samuel", name: "1 Samuel", chapters: 31, testament: "old", region: "kingdom" },
  { index: 9, id: "2samuel", name: "2 Samuel", chapters: 24, testament: "old", region: "kingdom" },
  { index: 10, id: "1kings", name: "1 Reis", chapters: 22, testament: "old", region: "kingdom" },
  { index: 11, id: "2kings", name: "2 Reis", chapters: 25, testament: "old", region: "kingdom" },
  { index: 12, id: "1chronicles", name: "1 Crônicas", chapters: 29, testament: "old", region: "kingdom" },
  { index: 13, id: "2chronicles", name: "2 Crônicas", chapters: 36, testament: "old", region: "kingdom" },
  { index: 14, id: "ezra", name: "Esdras", chapters: 10, testament: "old", region: "exile" },
  { index: 15, id: "nehemiah", name: "Neemias", chapters: 13, testament: "old", region: "exile" },
  { index: 16, id: "esther", name: "Ester", chapters: 10, testament: "old", region: "exile" },
  { index: 17, id: "job", name: "Jó", chapters: 42, testament: "old", region: "wisdom" },
  { index: 18, id: "psalms", name: "Salmos", chapters: 150, testament: "old", region: "wisdom" },
  { index: 19, id: "proverbs", name: "Provérbios", chapters: 31, testament: "old", region: "wisdom" },
  { index: 20, id: "ecclesiastes", name: "Eclesiastes", chapters: 12, testament: "old", region: "wisdom" },
  { index: 21, id: "songofsolomon", name: "Cantares", chapters: 8, testament: "old", region: "wisdom" },
  { index: 22, id: "isaiah", name: "Isaías", chapters: 66, testament: "old", region: "prophets" },
  { index: 23, id: "jeremiah", name: "Jeremias", chapters: 52, testament: "old", region: "prophets" },
  { index: 24, id: "lamentations", name: "Lamentações", chapters: 5, testament: "old", region: "prophets" },
  { index: 25, id: "ezekiel", name: "Ezequiel", chapters: 48, testament: "old", region: "prophets" },
  { index: 26, id: "daniel", name: "Daniel", chapters: 12, testament: "old", region: "prophets" },
  { index: 27, id: "hosea", name: "Oséias", chapters: 14, testament: "old", region: "minor_prophets" },
  { index: 28, id: "joel", name: "Joel", chapters: 3, testament: "old", region: "minor_prophets" },
  { index: 29, id: "amos", name: "Amós", chapters: 9, testament: "old", region: "minor_prophets" },
  { index: 30, id: "obadiah", name: "Obadias", chapters: 1, testament: "old", region: "minor_prophets" },
  { index: 31, id: "jonah", name: "Jonas", chapters: 4, testament: "old", region: "minor_prophets" },
  { index: 32, id: "micah", name: "Miquéias", chapters: 7, testament: "old", region: "minor_prophets" },
  { index: 33, id: "nahum", name: "Naum", chapters: 3, testament: "old", region: "minor_prophets" },
  { index: 34, id: "habakkuk", name: "Habacuque", chapters: 3, testament: "old", region: "minor_prophets" },
  { index: 35, id: "zephaniah", name: "Sofonias", chapters: 3, testament: "old", region: "minor_prophets" },
  { index: 36, id: "haggai", name: "Ageu", chapters: 2, testament: "old", region: "minor_prophets" },
  { index: 37, id: "zechariah", name: "Zacarias", chapters: 14, testament: "old", region: "minor_prophets" },
  { index: 38, id: "malachi", name: "Malaquias", chapters: 4, testament: "old", region: "minor_prophets" },
  { index: 39, id: "matthew", name: "Mateus", chapters: 28, testament: "new", region: "gospels" },
  { index: 40, id: "mark", name: "Marcos", chapters: 16, testament: "new", region: "gospels" },
  { index: 41, id: "luke", name: "Lucas", chapters: 24, testament: "new", region: "gospels" },
  { index: 42, id: "john", name: "João", chapters: 21, testament: "new", region: "gospels" },
  { index: 43, id: "acts", name: "Atos", chapters: 28, testament: "new", region: "acts" },
  { index: 44, id: "romans", name: "Romanos", chapters: 16, testament: "new", region: "epistles" },
  { index: 45, id: "1corinthians", name: "1 Coríntios", chapters: 16, testament: "new", region: "epistles" },
  { index: 46, id: "2corinthians", name: "2 Coríntios", chapters: 13, testament: "new", region: "epistles" },
  { index: 47, id: "galatians", name: "Gálatas", chapters: 6, testament: "new", region: "epistles" },
  { index: 48, id: "ephesians", name: "Efésios", chapters: 6, testament: "new", region: "epistles" },
  { index: 49, id: "philippians", name: "Filipenses", chapters: 4, testament: "new", region: "epistles" },
  { index: 50, id: "colossians", name: "Colossenses", chapters: 4, testament: "new", region: "epistles" },
  { index: 51, id: "1thessalonians", name: "1 Tessalonicenses", chapters: 5, testament: "new", region: "epistles" },
  { index: 52, id: "2thessalonians", name: "2 Tessalonicenses", chapters: 3, testament: "new", region: "epistles" },
  { index: 53, id: "1timothy", name: "1 Timóteo", chapters: 6, testament: "new", region: "epistles" },
  { index: 54, id: "2timothy", name: "2 Timóteo", chapters: 4, testament: "new", region: "epistles" },
  { index: 55, id: "titus", name: "Tito", chapters: 3, testament: "new", region: "epistles" },
  { index: 56, id: "philemon", name: "Filemom", chapters: 1, testament: "new", region: "epistles" },
  { index: 57, id: "hebrews", name: "Hebreus", chapters: 13, testament: "new", region: "epistles" },
  { index: 58, id: "james", name: "Tiago", chapters: 5, testament: "new", region: "epistles" },
  { index: 59, id: "1peter", name: "1 Pedro", chapters: 5, testament: "new", region: "epistles" },
  { index: 60, id: "2peter", name: "2 Pedro", chapters: 3, testament: "new", region: "epistles" },
  { index: 61, id: "1john", name: "1 João", chapters: 5, testament: "new", region: "epistles" },
  { index: 62, id: "2john", name: "2 João", chapters: 1, testament: "new", region: "epistles" },
  { index: 63, id: "3john", name: "3 João", chapters: 1, testament: "new", region: "epistles" },
  { index: 64, id: "jude", name: "Judas", chapters: 1, testament: "new", region: "epistles" },
  { index: 65, id: "revelation", name: "Apocalipse", chapters: 22, testament: "new", region: "revelation" },
];

export const TOTAL_BOOKS = RPG_BIBLE_BOOKS.length;
export const TOTAL_CHAPTERS = RPG_BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0);

export const getBookByIndex = (index: number): RPGBook | undefined => RPG_BIBLE_BOOKS[index];

// Group books by region for the world map
export const getBooksByRegion = (): { region: RPGRegion; theme: RPGRegionTheme; books: RPGBook[] }[] => {
  const regionOrder: RPGRegion[] = [
    "creation", "desert", "conquest", "kingdom", "exile", "wisdom",
    "prophets", "minor_prophets", "gospels", "acts", "epistles", "revelation"
  ];
  return regionOrder.map(r => ({
    region: r,
    theme: RPG_REGION_THEMES[r],
    books: RPG_BIBLE_BOOKS.filter(b => b.region === r),
  }));
};
