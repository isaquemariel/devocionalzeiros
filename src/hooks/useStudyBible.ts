import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getBookById, VerseStudy, Verse } from '@/lib/studyBibleData';
import { fetchChapterVerses } from '@/lib/bibleService';

interface UseStudyBibleResult {
  loading: boolean;
  error: string | null;
  verses: Verse[];
  currentStudy: VerseStudy | null;
  studyLoading: boolean;
  fetchChapter: (bookId: string, chapter: number) => Promise<void>;
  fetchVerseStudy: (bookId: string, chapter: number, verseNumber: number, verseText: string) => Promise<void>;
  clearStudy: () => void;
}

export function useStudyBible(): UseStudyBibleResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [currentStudy, setCurrentStudy] = useState<VerseStudy | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);

  const fetchChapter = useCallback(async (bookId: string, chapter: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedVerses = await fetchChapterVerses(bookId, chapter);
      
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
          bookId,
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
