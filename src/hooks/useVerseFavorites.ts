import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface VerseFavorite {
  id: string;
  book_id: string;
  chapter_number: number;
  verse_number: number;
  verse_text: string;
  created_at: string;
}

export interface VerseHighlight {
  id: string;
  book_id: string;
  chapter_number: number;
  verse_number: number;
  highlight_color: string;
  created_at: string;
}

export const HIGHLIGHT_COLORS = [
  { id: 'yellow', name: 'Amarelo', class: 'bg-yellow-500/30' },
  { id: 'green', name: 'Verde', class: 'bg-green-500/30' },
  { id: 'blue', name: 'Azul', class: 'bg-blue-500/30' },
  { id: 'pink', name: 'Rosa', class: 'bg-pink-500/30' },
  { id: 'purple', name: 'Roxo', class: 'bg-purple-500/30' },
];

export function useVerseFavorites(userId: string | undefined) {
  const [favorites, setFavorites] = useState<VerseFavorite[]>([]);
  const [highlights, setHighlights] = useState<VerseHighlight[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar favoritos e grifos
  const loadData = useCallback(async () => {
    if (!userId) {
      setFavorites([]);
      setHighlights([]);
      setLoading(false);
      return;
    }

    try {
      const [favRes, highRes] = await Promise.all([
        supabase
          .from('verse_favorites')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false }),
        supabase
          .from('verse_highlights')
          .select('*')
          .eq('user_id', userId),
      ]);

      if (favRes.error) throw favRes.error;
      if (highRes.error) throw highRes.error;

      setFavorites(favRes.data || []);
      setHighlights(highRes.data || []);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Verificar se versículo é favorito
  const isFavorite = useCallback(
    (bookId: string, chapter: number, verse: number): boolean => {
      return favorites.some(
        (f) => f.book_id === bookId && f.chapter_number === chapter && f.verse_number === verse
      );
    },
    [favorites]
  );

  // Obter cor de grifo do versículo
  const getHighlightColor = useCallback(
    (bookId: string, chapter: number, verse: number): string | null => {
      const highlight = highlights.find(
        (h) => h.book_id === bookId && h.chapter_number === chapter && h.verse_number === verse
      );
      return highlight?.highlight_color || null;
    },
    [highlights]
  );

  // Adicionar/remover favorito
  const toggleFavorite = useCallback(
    async (bookId: string, chapter: number, verse: number, verseText: string): Promise<boolean> => {
      if (!userId) {
        toast.error('Faça login para salvar favoritos');
        return false;
      }

      const existing = favorites.find(
        (f) => f.book_id === bookId && f.chapter_number === chapter && f.verse_number === verse
      );

      try {
        if (existing) {
          // Remover
          const { error } = await supabase
            .from('verse_favorites')
            .delete()
            .eq('id', existing.id);

          if (error) throw error;

          setFavorites((prev) => prev.filter((f) => f.id !== existing.id));
          toast.success('Favorito removido');
          return false;
        } else {
          // Adicionar
          const { data, error } = await supabase
            .from('verse_favorites')
            .insert({
              user_id: userId,
              book_id: bookId,
              chapter_number: chapter,
              verse_number: verse,
              verse_text: verseText,
            })
            .select()
            .single();

          if (error) throw error;

          setFavorites((prev) => [data, ...prev]);
          toast.success('Adicionado aos favoritos');
          return true;
        }
      } catch (error) {
        console.error('Erro ao alterar favorito:', error);
        toast.error('Erro ao salvar favorito');
        return false;
      }
    },
    [userId, favorites]
  );

  // Adicionar/atualizar/remover grifo
  const setHighlight = useCallback(
    async (bookId: string, chapter: number, verse: number, color: string | null): Promise<void> => {
      if (!userId) {
        toast.error('Faça login para grifar versículos');
        return;
      }

      const existing = highlights.find(
        (h) => h.book_id === bookId && h.chapter_number === chapter && h.verse_number === verse
      );

      try {
        if (color === null && existing) {
          // Remover grifo
          const { error } = await supabase
            .from('verse_highlights')
            .delete()
            .eq('id', existing.id);

          if (error) throw error;

          setHighlights((prev) => prev.filter((h) => h.id !== existing.id));
          toast.success('Grifo removido');
        } else if (color !== null) {
          if (existing) {
            // Atualizar cor
            const { error } = await supabase
              .from('verse_highlights')
              .update({ highlight_color: color })
              .eq('id', existing.id);

            if (error) throw error;

            setHighlights((prev) =>
              prev.map((h) => (h.id === existing.id ? { ...h, highlight_color: color } : h))
            );
            toast.success('Cor atualizada');
          } else {
            // Criar novo grifo
            const { data, error } = await supabase
              .from('verse_highlights')
              .insert({
                user_id: userId,
                book_id: bookId,
                chapter_number: chapter,
                verse_number: verse,
                highlight_color: color,
              })
              .select()
              .single();

            if (error) throw error;

            setHighlights((prev) => [...prev, data]);
            toast.success('Versículo grifado');
          }
        }
      } catch (error) {
        console.error('Erro ao alterar grifo:', error);
        toast.error('Erro ao salvar grifo');
      }
    },
    [userId, highlights]
  );

  return {
    favorites,
    highlights,
    loading,
    isFavorite,
    getHighlightColor,
    toggleFavorite,
    setHighlight,
    refreshData: loadData,
  };
}
