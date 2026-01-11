// Complete Bible data with books and chapters
export const bibleBooks = [
  { name: "Gênesis", chapters: 50, testament: "old" },
  { name: "Êxodo", chapters: 40, testament: "old" },
  { name: "Levítico", chapters: 27, testament: "old" },
  { name: "Números", chapters: 36, testament: "old" },
  { name: "Deuteronômio", chapters: 34, testament: "old" },
  { name: "Josué", chapters: 24, testament: "old" },
  { name: "Juízes", chapters: 21, testament: "old" },
  { name: "Rute", chapters: 4, testament: "old" },
  { name: "1 Samuel", chapters: 31, testament: "old" },
  { name: "2 Samuel", chapters: 24, testament: "old" },
  { name: "1 Reis", chapters: 22, testament: "old" },
  { name: "2 Reis", chapters: 25, testament: "old" },
  { name: "1 Crônicas", chapters: 29, testament: "old" },
  { name: "2 Crônicas", chapters: 36, testament: "old" },
  { name: "Esdras", chapters: 10, testament: "old" },
  { name: "Neemias", chapters: 13, testament: "old" },
  { name: "Ester", chapters: 10, testament: "old" },
  { name: "Jó", chapters: 42, testament: "old" },
  { name: "Salmos", chapters: 150, testament: "old" },
  { name: "Provérbios", chapters: 31, testament: "old" },
  { name: "Eclesiastes", chapters: 12, testament: "old" },
  { name: "Cantares", chapters: 8, testament: "old" },
  { name: "Isaías", chapters: 66, testament: "old" },
  { name: "Jeremias", chapters: 52, testament: "old" },
  { name: "Lamentações", chapters: 5, testament: "old" },
  { name: "Ezequiel", chapters: 48, testament: "old" },
  { name: "Daniel", chapters: 12, testament: "old" },
  { name: "Oséias", chapters: 14, testament: "old" },
  { name: "Joel", chapters: 3, testament: "old" },
  { name: "Amós", chapters: 9, testament: "old" },
  { name: "Obadias", chapters: 1, testament: "old" },
  { name: "Jonas", chapters: 4, testament: "old" },
  { name: "Miquéias", chapters: 7, testament: "old" },
  { name: "Naum", chapters: 3, testament: "old" },
  { name: "Habacuque", chapters: 3, testament: "old" },
  { name: "Sofonias", chapters: 3, testament: "old" },
  { name: "Ageu", chapters: 2, testament: "old" },
  { name: "Zacarias", chapters: 14, testament: "old" },
  { name: "Malaquias", chapters: 4, testament: "old" },
  { name: "Mateus", chapters: 28, testament: "new" },
  { name: "Marcos", chapters: 16, testament: "new" },
  { name: "Lucas", chapters: 24, testament: "new" },
  { name: "João", chapters: 21, testament: "new" },
  { name: "Atos", chapters: 28, testament: "new" },
  { name: "Romanos", chapters: 16, testament: "new" },
  { name: "1 Coríntios", chapters: 16, testament: "new" },
  { name: "2 Coríntios", chapters: 13, testament: "new" },
  { name: "Gálatas", chapters: 6, testament: "new" },
  { name: "Efésios", chapters: 6, testament: "new" },
  { name: "Filipenses", chapters: 4, testament: "new" },
  { name: "Colossenses", chapters: 4, testament: "new" },
  { name: "1 Tessalonicenses", chapters: 5, testament: "new" },
  { name: "2 Tessalonicenses", chapters: 3, testament: "new" },
  { name: "1 Timóteo", chapters: 6, testament: "new" },
  { name: "2 Timóteo", chapters: 4, testament: "new" },
  { name: "Tito", chapters: 3, testament: "new" },
  { name: "Filemom", chapters: 1, testament: "new" },
  { name: "Hebreus", chapters: 13, testament: "new" },
  { name: "Tiago", chapters: 5, testament: "new" },
  { name: "1 Pedro", chapters: 5, testament: "new" },
  { name: "2 Pedro", chapters: 3, testament: "new" },
  { name: "1 João", chapters: 5, testament: "new" },
  { name: "2 João", chapters: 1, testament: "new" },
  { name: "3 João", chapters: 1, testament: "new" },
  { name: "Judas", chapters: 1, testament: "new" },
  { name: "Apocalipse", chapters: 22, testament: "new" },
];

// Total chapters in the Bible: 1189
export const totalBibleChapters = bibleBooks.reduce((acc, book) => acc + book.chapters, 0);

// Get chapters only from New Testament
export const getNewTestamentChapters = () => {
  const chapters: { book: string; chapter: number }[] = [];
  bibleBooks
    .filter((book) => book.testament === "new")
    .forEach((book) => {
      for (let i = 1; i <= book.chapters; i++) {
        chapters.push({ book: book.name, chapter: i });
      }
    });
  return chapters;
};

// Get chapters only from Old Testament
export const getOldTestamentChapters = () => {
  const chapters: { book: string; chapter: number }[] = [];
  bibleBooks
    .filter((book) => book.testament === "old")
    .forEach((book) => {
      for (let i = 1; i <= book.chapters; i++) {
        chapters.push({ book: book.name, chapter: i });
      }
    });
  return chapters;
};

// Get chapters from specific books
export const getChaptersFromBooks = (bookNames: string[]) => {
  const chapters: { book: string; chapter: number }[] = [];
  bibleBooks
    .filter((book) => bookNames.includes(book.name))
    .forEach((book) => {
      for (let i = 1; i <= book.chapters; i++) {
        chapters.push({ book: book.name, chapter: i });
      }
    });
  return chapters;
};

// Generate all chapters as a flat array
export const getAllChapters = () => {
  const chapters: { book: string; chapter: number }[] = [];
  bibleBooks.forEach((book) => {
    for (let i = 1; i <= book.chapters; i++) {
      chapters.push({ book: book.name, chapter: i });
    }
  });
  return chapters;
};

// New Testament total chapters: 260
export const totalNewTestamentChapters = bibleBooks
  .filter((book) => book.testament === "new")
  .reduce((acc, book) => acc + book.chapters, 0);

// Old Testament total chapters: 929
export const totalOldTestamentChapters = bibleBooks
  .filter((book) => book.testament === "old")
  .reduce((acc, book) => acc + book.chapters, 0);

// Reading plan configurations
export const readingPlans = {
  "nt60": {
    name: "Novo Testamento - 60 Dias",
    description: "Leia o Novo Testamento completo em 60 dias. Perfeito para focar nos ensinamentos de Jesus e dos apóstolos.",
    chaptersPerDay: Math.ceil(totalNewTestamentChapters / 60), // ~5 chapters/day
    totalDays: 60,
    icon: "✝️",
    scope: "new" as const,
  },
  "at90": {
    name: "Antigo Testamento - 90 Dias",
    description: "Leia o Antigo Testamento completo em 90 dias. Explore a história e a sabedoria dos profetas.",
    chaptersPerDay: Math.ceil(totalOldTestamentChapters / 90), // ~11 chapters/day
    totalDays: 90,
    icon: "📜",
    scope: "old" as const,
  },
  "90": {
    name: "Bíblia Completa - 90 Dias",
    description: "Leia a Bíblia completa em 90 dias. Ideal para quem quer um desafio intenso.",
    chaptersPerDay: Math.ceil(totalBibleChapters / 90), // ~14 chapters/day
    totalDays: 90,
    icon: "🔥",
    scope: "all" as const,
  },
  "184": {
    name: "Bíblia Completa - 184 Dias",
    description: "Leia a Bíblia completa em 6 meses. Um ritmo equilibrado e consistente.",
    chaptersPerDay: Math.ceil(totalBibleChapters / 184), // ~7 chapters/day
    totalDays: 184,
    icon: "⚡",
    scope: "all" as const,
  },
  "365": {
    name: "Bíblia Completa - 365 Dias",
    description: "Leia a Bíblia completa em 1 ano. Ritmo confortável para leitura diária.",
    chaptersPerDay: Math.ceil(totalBibleChapters / 365), // ~4 chapters/day
    totalDays: 365,
    icon: "📖",
    scope: "all" as const,
  },
};

export type ReadingPlan = "nt60" | "at90" | "90" | "184" | "365" | "custom";

// Generate reading schedule for a plan starting from a specific date
export const generateReadingSchedule = (
  plan: ReadingPlan,
  startDate: Date,
  customBooks?: string[]
): { date: Date; chapters: { book: string; chapter: number }[] }[] => {
  // Handle custom plan with specific books
  if (plan === "custom" && customBooks) {
    const allChapters = getChaptersFromBooks(customBooks);
    // Custom plans need totalDays passed differently, handled in hook
    return [];
  }
  
  const planConfig = readingPlans[plan as keyof typeof readingPlans];
  if (!planConfig) return [];
  
  let allChapters: { book: string; chapter: number }[];
  
  if (planConfig.scope === "new") {
    allChapters = getNewTestamentChapters();
  } else if (planConfig.scope === "old") {
    allChapters = getOldTestamentChapters();
  } else {
    allChapters = getAllChapters();
  }
  
  const schedule: { date: Date; chapters: { book: string; chapter: number }[] }[] = [];

  let chapterIndex = 0;

  for (let day = 0; day < planConfig.totalDays; day++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day);

    const dayChapters: { book: string; chapter: number }[] = [];

    for (let i = 0; i < planConfig.chaptersPerDay && chapterIndex < allChapters.length; i++) {
      dayChapters.push(allChapters[chapterIndex]);
      chapterIndex++;
    }

    if (dayChapters.length > 0) {
      schedule.push({ date, chapters: dayChapters });
    }
  }

  return schedule;
};

// Generate custom reading schedule
export const generateCustomReadingSchedule = (
  books: string[],
  totalDays: number,
  startDate: Date
): { date: Date; chapters: { book: string; chapter: number }[] }[] => {
  const allChapters = getChaptersFromBooks(books);
  const chaptersPerDay = Math.ceil(allChapters.length / totalDays);
  const schedule: { date: Date; chapters: { book: string; chapter: number }[] }[] = [];

  let chapterIndex = 0;

  for (let day = 0; day < totalDays; day++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day);

    const dayChapters: { book: string; chapter: number }[] = [];

    for (let i = 0; i < chaptersPerDay && chapterIndex < allChapters.length; i++) {
      dayChapters.push(allChapters[chapterIndex]);
      chapterIndex++;
    }

    if (dayChapters.length > 0) {
      schedule.push({ date, chapters: dayChapters });
    }
  }

  return schedule;
};

// Get Brazil timezone date (Brasília - America/Sao_Paulo)
export const getBrazilDate = (): Date => {
  // Get current date/time in Brasília timezone
  const brazilDateStr = new Date().toLocaleString('en-CA', { 
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  // Parse the date string (format: "YYYY-MM-DD, HH:MM:SS")
  const [datePart, timePart] = brazilDateStr.split(', ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);
  
  return new Date(year, month - 1, day, hours, minutes, seconds);
};

// Get Brazil date string for comparison (YYYY-MM-DD format)
export const getBrazilDateString = (): string => {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
};

// Format date in Brazilian Portuguese
export const formatDateBR = (date: Date): string => {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} de ${month} de ${year}`;
};

// Format short date
export const formatShortDateBR = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day}/${month}`;
};

// Get day of week in Portuguese
export const getDayOfWeekBR = (date: Date): string => {
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  return days[date.getDay()];
};
