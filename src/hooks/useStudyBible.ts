import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  BibleVersion, 
  STUDY_BIBLE_BOOKS,
  getBookById,
  VerseStudy,
  Verse 
} from '@/lib/studyBibleData';

interface UseStudyBibleResult {
  loading: boolean;
  error: string | null;
  verses: Verse[];
  currentStudy: VerseStudy | null;
  studyLoading: boolean;
  fetchChapter: (bookId: string, chapter: number, version: BibleVersion) => Promise<void>;
  fetchVerseStudy: (bookId: string, chapter: number, verseNumber: number, verseText: string) => Promise<void>;
  clearStudy: () => void;
}

// Sample Bible text for demonstration (would be replaced by real API)
const SAMPLE_VERSES: Record<string, Verse[]> = {
  'john-1': [
    { number: 1, text: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
    { number: 2, text: 'Ele estava no princípio com Deus.' },
    { number: 3, text: 'Todas as coisas foram feitas por meio dele, e sem ele nada do que foi feito se fez.' },
    { number: 4, text: 'Nele estava a vida, e a vida era a luz dos homens.' },
    { number: 5, text: 'A luz resplandece nas trevas, e as trevas não a venceram.' },
    { number: 6, text: 'Houve um homem enviado por Deus, cujo nome era João.' },
    { number: 7, text: 'Este veio como testemunha para dar testemunho da luz, a fim de que todos cressem por meio dele.' },
    { number: 8, text: 'Ele não era a luz, mas veio para dar testemunho da luz.' },
    { number: 9, text: 'A luz verdadeira, que ilumina todo homem, estava vindo ao mundo.' },
    { number: 10, text: 'Ele estava no mundo, e o mundo foi feito por meio dele, mas o mundo não o conheceu.' },
    { number: 11, text: 'Veio para o que era seu, e os seus não o receberam.' },
    { number: 12, text: 'Mas a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus: aos que creem no seu nome.' },
    { number: 13, text: 'Os quais não nasceram do sangue, nem da vontade da carne, nem da vontade do varão, mas de Deus.' },
    { number: 14, text: 'E o Verbo se fez carne e habitou entre nós, cheio de graça e de verdade; e vimos a sua glória, como a glória do unigênito do Pai.' },
  ],
  'genesis-1': [
    { number: 1, text: 'No princípio, criou Deus os céus e a terra.' },
    { number: 2, text: 'A terra era sem forma e vazia; e havia trevas sobre a face do abismo, mas o Espírito de Deus pairava sobre a face das águas.' },
    { number: 3, text: 'Disse Deus: Haja luz. E houve luz.' },
    { number: 4, text: 'Viu Deus que a luz era boa; e fez separação entre a luz e as trevas.' },
    { number: 5, text: 'Chamou Deus à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia.' },
    { number: 6, text: 'E disse Deus: Haja firmamento no meio das águas e separação entre águas e águas.' },
    { number: 7, text: 'Fez, pois, Deus o firmamento e separação entre as águas debaixo do firmamento e as águas sobre o firmamento. E assim se fez.' },
    { number: 8, text: 'E chamou Deus ao firmamento Céus. Houve tarde e manhã, o segundo dia.' },
    { number: 9, text: 'E disse Deus: Ajuntem-se as águas debaixo dos céus num só lugar, e apareça a porção seca. E assim se fez.' },
    { number: 10, text: 'Chamou Deus à porção seca Terra e ao ajuntamento das águas, Mares. E viu Deus que isso era bom.' },
  ],
  'psalms-23': [
    { number: 1, text: 'O SENHOR é o meu pastor; nada me faltará.' },
    { number: 2, text: 'Ele me faz repousar em pastos verdejantes. Leva-me para junto das águas de descanso.' },
    { number: 3, text: 'Refrigera-me a alma. Guia-me pelas veredas da justiça por amor do seu nome.' },
    { number: 4, text: 'Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo; o teu bordão e o teu cajado me consolam.' },
    { number: 5, text: 'Preparas-me uma mesa na presença dos meus adversários, unges a minha cabeça com óleo; o meu cálice transborda.' },
    { number: 6, text: 'Bondade e misericórdia me seguirão todos os dias da minha vida; e habitarei na Casa do SENHOR para todo o sempre.' },
  ],
  'matthew-5': [
    { number: 1, text: 'Vendo Jesus as multidões, subiu ao monte, e, assentando-se, aproximaram-se os seus discípulos.' },
    { number: 2, text: 'E ele abriu a boca e os ensinava, dizendo:' },
    { number: 3, text: 'Bem-aventurados os humildes de espírito, porque deles é o reino dos céus.' },
    { number: 4, text: 'Bem-aventurados os que choram, porque serão consolados.' },
    { number: 5, text: 'Bem-aventurados os mansos, porque herdarão a terra.' },
    { number: 6, text: 'Bem-aventurados os que têm fome e sede de justiça, porque serão fartos.' },
    { number: 7, text: 'Bem-aventurados os misericordiosos, porque alcançarão misericórdia.' },
    { number: 8, text: 'Bem-aventurados os limpos de coração, porque verão a Deus.' },
    { number: 9, text: 'Bem-aventurados os pacificadores, porque serão chamados filhos de Deus.' },
    { number: 10, text: 'Bem-aventurados os perseguidos por causa da justiça, porque deles é o reino dos céus.' },
  ],
  'romans-8': [
    { number: 1, text: 'Agora, pois, já nenhuma condenação há para os que estão em Cristo Jesus.' },
    { number: 2, text: 'Porque a lei do Espírito da vida, em Cristo Jesus, te livrou da lei do pecado e da morte.' },
    { number: 3, text: 'Porquanto o que era impossível à lei, no que estava enferma pela carne, isso fez Deus enviando o seu próprio Filho em semelhança de carne pecaminosa e no tocante ao pecado; e, com efeito, condenou Deus, na carne, o pecado.' },
    { number: 4, text: 'A fim de que o preceito da lei se cumprisse em nós, que não andamos segundo a carne, mas segundo o Espírito.' },
    { number: 5, text: 'Porque os que se inclinam para a carne cogitam das coisas da carne; mas os que se inclinam para o Espírito, das coisas do Espírito.' },
    { number: 28, text: 'Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.' },
    { number: 31, text: 'Se Deus é por nós, quem será contra nós?' },
    { number: 37, text: 'Em todas estas coisas, porém, somos mais que vencedores, por meio daquele que nos amou.' },
    { number: 38, text: 'Porque eu estou certo de que nem a morte, nem a vida, nem os anjos, nem os principados, nem as coisas do presente, nem do porvir, nem os poderes,' },
    { number: 39, text: 'nem a altura, nem a profundidade, nem qualquer outra criatura poderá separar-nos do amor de Deus, que está em Cristo Jesus, nosso Senhor.' },
  ],
};

// Generate verses for any chapter (fallback when no sample exists)
function generateVerses(bookId: string, chapter: number): Verse[] {
  const book = getBookById(bookId);
  if (!book) return [];
  
  // Check for sample verses first
  const key = `${bookId}-${chapter}`;
  if (SAMPLE_VERSES[key]) {
    return SAMPLE_VERSES[key];
  }
  
  // Generate placeholder verses for demonstration
  const verseCount = Math.floor(Math.random() * 20) + 10;
  return Array.from({ length: verseCount }, (_, i) => ({
    number: i + 1,
    text: `Este é o versículo ${i + 1} de ${book.name} capítulo ${chapter}. O texto completo será carregado da API bíblica.`,
  }));
}

export function useStudyBible(): UseStudyBibleResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [currentStudy, setCurrentStudy] = useState<VerseStudy | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);

  const fetchChapter = useCallback(async (bookId: string, chapter: number, version: BibleVersion) => {
    setLoading(true);
    setError(null);
    
    try {
      // For now, use sample/generated verses
      // In production, this would call a Bible API
      const chapterVerses = generateVerses(bookId, chapter);
      setVerses(chapterVerses);
    } catch (err) {
      console.error('Error fetching chapter:', err);
      setError('Erro ao carregar capítulo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVerseStudy = useCallback(async (
    bookId: string, 
    chapter: number, 
    verseNumber: number, 
    verseText: string
  ) => {
    setStudyLoading(true);
    setCurrentStudy(null);
    
    try {
      const book = getBookById(bookId);
      if (!book) throw new Error('Livro não encontrado');

      const { data, error: fnError } = await supabase.functions.invoke('verse-study', {
        body: {
          bookName: book.name,
          chapter,
          verseNumber,
          verseText,
          testament: book.testament,
        },
      });

      if (fnError) throw fnError;

      setCurrentStudy(data as VerseStudy);
    } catch (err) {
      console.error('Error fetching verse study:', err);
      // Provide a fallback study
      setCurrentStudy({
        verseNumber,
        commentary: 'Não foi possível carregar o comentário no momento. Tente novamente em alguns segundos.',
        keyWords: [],
        crossReferences: [],
        source: 'Sistema',
      });
    } finally {
      setStudyLoading(false);
    }
  }, []);

  const clearStudy = useCallback(() => {
    setCurrentStudy(null);
  }, []);

  return {
    loading,
    error,
    verses,
    currentStudy,
    studyLoading,
    fetchChapter,
    fetchVerseStudy,
    clearStudy,
  };
}
