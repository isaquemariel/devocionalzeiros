import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CATEGORIES } from '@/store/financeStore';

export interface CustomCategory {
  id: string;
  name: string;
}

export function useFinanceCategories(userId: string | undefined) {
  const [customCategories, setCustomCategories] = useState<CustomCategory[]>([]);

  const fetchCategories = useCallback(async () => {
    if (!userId) return;
    const { data } = await supabase
      .from('financial_categories')
      .select('*')
      .eq('user_id', userId)
      .order('name');
    if (data) setCustomCategories(data);
  }, [userId]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const allCategories = [
    ...CATEGORIES,
    ...customCategories.map(c => c.name).filter(n => !CATEGORIES.includes(n as any)),
  ];

  const addCategory = async (name: string) => {
    if (!userId || !name.trim()) return false;
    const { data, error } = await supabase
      .from('financial_categories' as any)
      .insert({ user_id: userId, name: name.trim().toLowerCase() })
      .select()
      .single();
    if (error) return false;
    if (data) setCustomCategories(prev => [...prev, data as any]);
    return true;
  };

  const removeCategory = async (id: string) => {
    await supabase.from('financial_categories' as any).delete().eq('id', id);
    setCustomCategories(prev => prev.filter(c => c.id !== id));
  };

  return { allCategories, customCategories, addCategory, removeCategory, refetch: fetchCategories };
}
