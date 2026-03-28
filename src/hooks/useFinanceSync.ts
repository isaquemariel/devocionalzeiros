import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useFinanceStore } from '@/store/financeStore';

export function useFinanceSync(userId: string | undefined) {
  const store = useFinanceStore();

  const fetchAll = useCallback(async () => {
    if (!userId) return;

    const [txRes, subRes, instRes, fcRes, budRes, recRes] = await Promise.all([
      supabase.from('financial_transactions').select('*').eq('user_id', userId).order('date', { ascending: false }),
      supabase.from('financial_subscriptions').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('financial_installments').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('financial_fixed_costs').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('financial_budgets').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('financial_recurring').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    ]);

    if (txRes.data) store.setTransactions(txRes.data as any);
    if (subRes.data) store.setSubscriptions(subRes.data as any);
    if (instRes.data) store.setInstallments(instRes.data as any);
    if (fcRes.data) store.setFixedCosts(fcRes.data as any);
    if (budRes.data) store.setBudgets(budRes.data as any);
    if (recRes.data) store.setRecurring(recRes.data as any);

    store.setLoaded(true);
  }, [userId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { refetch: fetchAll };
}
