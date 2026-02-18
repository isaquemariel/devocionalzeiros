// Bible books data for RPG - 66 levels, each with chapters as stages
export interface RPGBook {
  index: number;
  id: string;
  name: string;
  chapters: number;
  testament: "old" | "new";
}

export const RPG_BIBLE_BOOKS: RPGBook[] = [
  { index: 0, id: "genesis", name: "Gênesis", chapters: 50, testament: "old" },
  { index: 1, id: "exodus", name: "Êxodo", chapters: 40, testament: "old" },
  { index: 2, id: "leviticus", name: "Levítico", chapters: 27, testament: "old" },
  { index: 3, id: "numbers", name: "Números", chapters: 36, testament: "old" },
  { index: 4, id: "deuteronomy", name: "Deuteronômio", chapters: 34, testament: "old" },
  { index: 5, id: "joshua", name: "Josué", chapters: 24, testament: "old" },
  { index: 6, id: "judges", name: "Juízes", chapters: 21, testament: "old" },
  { index: 7, id: "ruth", name: "Rute", chapters: 4, testament: "old" },
  { index: 8, id: "1samuel", name: "1 Samuel", chapters: 31, testament: "old" },
  { index: 9, id: "2samuel", name: "2 Samuel", chapters: 24, testament: "old" },
  { index: 10, id: "1kings", name: "1 Reis", chapters: 22, testament: "old" },
  { index: 11, id: "2kings", name: "2 Reis", chapters: 25, testament: "old" },
  { index: 12, id: "1chronicles", name: "1 Crônicas", chapters: 29, testament: "old" },
  { index: 13, id: "2chronicles", name: "2 Crônicas", chapters: 36, testament: "old" },
  { index: 14, id: "ezra", name: "Esdras", chapters: 10, testament: "old" },
  { index: 15, id: "nehemiah", name: "Neemias", chapters: 13, testament: "old" },
  { index: 16, id: "esther", name: "Ester", chapters: 10, testament: "old" },
  { index: 17, id: "job", name: "Jó", chapters: 42, testament: "old" },
  { index: 18, id: "psalms", name: "Salmos", chapters: 150, testament: "old" },
  { index: 19, id: "proverbs", name: "Provérbios", chapters: 31, testament: "old" },
  { index: 20, id: "ecclesiastes", name: "Eclesiastes", chapters: 12, testament: "old" },
  { index: 21, id: "songofsolomon", name: "Cantares", chapters: 8, testament: "old" },
  { index: 22, id: "isaiah", name: "Isaías", chapters: 66, testament: "old" },
  { index: 23, id: "jeremiah", name: "Jeremias", chapters: 52, testament: "old" },
  { index: 24, id: "lamentations", name: "Lamentações", chapters: 5, testament: "old" },
  { index: 25, id: "ezekiel", name: "Ezequiel", chapters: 48, testament: "old" },
  { index: 26, id: "daniel", name: "Daniel", chapters: 12, testament: "old" },
  { index: 27, id: "hosea", name: "Oséias", chapters: 14, testament: "old" },
  { index: 28, id: "joel", name: "Joel", chapters: 3, testament: "old" },
  { index: 29, id: "amos", name: "Amós", chapters: 9, testament: "old" },
  { index: 30, id: "obadiah", name: "Obadias", chapters: 1, testament: "old" },
  { index: 31, id: "jonah", name: "Jonas", chapters: 4, testament: "old" },
  { index: 32, id: "micah", name: "Miquéias", chapters: 7, testament: "old" },
  { index: 33, id: "nahum", name: "Naum", chapters: 3, testament: "old" },
  { index: 34, id: "habakkuk", name: "Habacuque", chapters: 3, testament: "old" },
  { index: 35, id: "zephaniah", name: "Sofonias", chapters: 3, testament: "old" },
  { index: 36, id: "haggai", name: "Ageu", chapters: 2, testament: "old" },
  { index: 37, id: "zechariah", name: "Zacarias", chapters: 14, testament: "old" },
  { index: 38, id: "malachi", name: "Malaquias", chapters: 4, testament: "old" },
  { index: 39, id: "matthew", name: "Mateus", chapters: 28, testament: "new" },
  { index: 40, id: "mark", name: "Marcos", chapters: 16, testament: "new" },
  { index: 41, id: "luke", name: "Lucas", chapters: 24, testament: "new" },
  { index: 42, id: "john", name: "João", chapters: 21, testament: "new" },
  { index: 43, id: "acts", name: "Atos", chapters: 28, testament: "new" },
  { index: 44, id: "romans", name: "Romanos", chapters: 16, testament: "new" },
  { index: 45, id: "1corinthians", name: "1 Coríntios", chapters: 16, testament: "new" },
  { index: 46, id: "2corinthians", name: "2 Coríntios", chapters: 13, testament: "new" },
  { index: 47, id: "galatians", name: "Gálatas", chapters: 6, testament: "new" },
  { index: 48, id: "ephesians", name: "Efésios", chapters: 6, testament: "new" },
  { index: 49, id: "philippians", name: "Filipenses", chapters: 4, testament: "new" },
  { index: 50, id: "colossians", name: "Colossenses", chapters: 4, testament: "new" },
  { index: 51, id: "1thessalonians", name: "1 Tessalonicenses", chapters: 5, testament: "new" },
  { index: 52, id: "2thessalonians", name: "2 Tessalonicenses", chapters: 3, testament: "new" },
  { index: 53, id: "1timothy", name: "1 Timóteo", chapters: 6, testament: "new" },
  { index: 54, id: "2timothy", name: "2 Timóteo", chapters: 4, testament: "new" },
  { index: 55, id: "titus", name: "Tito", chapters: 3, testament: "new" },
  { index: 56, id: "philemon", name: "Filemom", chapters: 1, testament: "new" },
  { index: 57, id: "hebrews", name: "Hebreus", chapters: 13, testament: "new" },
  { index: 58, id: "james", name: "Tiago", chapters: 5, testament: "new" },
  { index: 59, id: "1peter", name: "1 Pedro", chapters: 5, testament: "new" },
  { index: 60, id: "2peter", name: "2 Pedro", chapters: 3, testament: "new" },
  { index: 61, id: "1john", name: "1 João", chapters: 5, testament: "new" },
  { index: 62, id: "2john", name: "2 João", chapters: 1, testament: "new" },
  { index: 63, id: "3john", name: "3 João", chapters: 1, testament: "new" },
  { index: 64, id: "jude", name: "Judas", chapters: 1, testament: "new" },
  { index: 65, id: "revelation", name: "Apocalipse", chapters: 22, testament: "new" },
];

export const TOTAL_BOOKS = RPG_BIBLE_BOOKS.length;
export const TOTAL_CHAPTERS = RPG_BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0);

export const getBookByIndex = (index: number): RPGBook | undefined => RPG_BIBLE_BOOKS[index];
