import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getBookById, VerseStudy, Verse } from '@/lib/studyBibleData';
import { fetchChapterVerses, BibleTranslation } from '@/lib/bibleService';

interface UseStudyBibleResult {
  loading: boolean;
  error: string | null;
  verses: Verse[];
  currentStudy: VerseStudy | null;
  studyLoading: boolean;
  studyError: boolean;
  fetchChapter: (bookId: string, chapter: number, translation?: BibleTranslation) => Promise<void>;
  fetchVerseStudy: (bookId: string, chapter: number, verseNumber: number, verseText: string) => Promise<void>;
  retryVerseStudy: () => Promise<void>;
  clearStudy: () => void;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

export function useStudyBible(): UseStudyBibleResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [currentStudy, setCurrentStudy] = useState<VerseStudy | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);
  const [studyError, setStudyError] = useState(false);
  
  const lastRequestRef = useRef<{
    bookId: string;
    chapter: number;
    verseNumber: number;
    verseText: string;
  } | null>(null);

  const fetchChapter = useCallback(async (bookId: string, chapter: number, translation?: BibleTranslation) => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedVerses = await fetchChapterVerses(bookId, chapter, translation);
      
      if (fetchedVerses && fetchedVerses.length > 0) {
        setVerses(fetchedVerses);
        setError(null);
      } else {
        setVerses([]);
        setError('Não foi possível carregar o capítulo. Verifique sua conexão.');
      }
    } catch (err) {
      console.error('Error fetching chapter:', err);
      setVerses([]);
      setError('Erro ao carregar capítulo.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVerseStudyWithRetry = useCallback(async (
    bookId: string, 
    chapter: number, 
    verseNumber: number, 
    verseText: string,
    retryCount: number = 0
  ): Promise<boolean> => {
    try {
      const book = getBookById(bookId);
      if (!book) throw new Error('Livro não encontrado');

      const { data, error: fnError } = await supabase.functions.invoke('verse-study', {
        body: {
          bookId,
          bookName: book.name,
          chapter,
          verseNumber,
          verseText,
          testament: book.testament,
        },
      });

      if (fnError) {
        console.error('Edge function error:', fnError);
        throw fnError;
      }

      if (!data || !data.commentary) {
        throw new Error('Response without commentary');
      }

      setCurrentStudy(data as VerseStudy);
      setStudyError(false);
      return true;
    } catch (err) {
      console.error(`Error fetching verse study (attempt ${retryCount + 1}/${MAX_RETRIES}):`, err);
      
      if (retryCount < MAX_RETRIES - 1) {
        console.log(`Retrying in ${RETRY_DELAY_MS}ms...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        return fetchVerseStudyWithRetry(bookId, chapter, verseNumber, verseText, retryCount + 1);
      }
      
      return false;
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
    setStudyError(false);
    
    lastRequestRef.current = { bookId, chapter, verseNumber, verseText };
    
    const success = await fetchVerseStudyWithRetry(bookId, chapter, verseNumber, verseText);
    
    if (!success) {
      setStudyError(true);
      setCurrentStudy({
        verseNumber,
        commentary: 'Não foi possível carregar o comentário no momento. Clique em "Tentar novamente" para recarregar.',
        keyWords: [],
        crossReferences: [],
        source: 'Sistema',
      });
    }
    
    setStudyLoading(false);
  }, [fetchVerseStudyWithRetry]);

  const retryVerseStudy = useCallback(async () => {
    if (!lastRequestRef.current) return;
    const { bookId, chapter, verseNumber, verseText } = lastRequestRef.current;
    await fetchVerseStudy(bookId, chapter, verseNumber, verseText);
  }, [fetchVerseStudy]);

  const clearStudy = useCallback(() => {
    setCurrentStudy(null);
    setStudyError(false);
    lastRequestRef.current = null;
  }, []);

  return {
    loading,
    error,
    verses,
    currentStudy,
    studyLoading,
    studyError,
    fetchChapter,
    fetchVerseStudy,
    retryVerseStudy,
    clearStudy,
  };
}
