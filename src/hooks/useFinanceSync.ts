import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useFinanceStore } from '@/store/financeStore';

export function useFinanceSync(userId: string | undefined) {
  const fetchAll = useCallback(async () => {
    if (!userId) return;

    const [txRes, subRes, instRes, fcRes, budRes, recRes, projRes, projTxRes] = await Promise.all([
      supabase.from('financial_transactions').select('*').eq('user_id', userId).order('date', { ascending: false }),
      supabase.from('financial_subscriptions').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('financial_installments').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('financial_fixed_costs').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('financial_budgets').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('financial_recurring').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('financial_projects').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('financial_project_transactions').select('*').eq('user_id', userId).order('date', { ascending: false }),
    ]);

    const s = useFinanceStore.getState();
    if (txRes.data) s.setTransactions(txRes.data as any);
    if (subRes.data) s.setSubscriptions(subRes.data as any);
    if (instRes.data) s.setInstallments(instRes.data as any);
    if (fcRes.data) s.setFixedCosts(fcRes.data as any);
    if (budRes.data) s.setBudgets(budRes.data as any);
    if (recRes.data) s.setRecurring(recRes.data as any);
    if (projRes.data) s.setProjects(projRes.data as any);
    if (projTxRes.data) s.setProjectTransactions(projTxRes.data as any);

    s.setLoaded(true);
  }, [userId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { refetch: fetchAll };
}
