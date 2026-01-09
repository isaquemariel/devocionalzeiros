import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Helper to get current date in Brasília timezone
const getBrasiliaDateString = (): string => {
  const now = new Date();
  const brasiliaDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const year = brasiliaDate.getFullYear();
  const month = (brasiliaDate.getMonth() + 1).toString().padStart(2, '0');
  const day = brasiliaDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const useDailyLogin = (userId: string | undefined) => {
  const recordDailyLogin = useCallback(async () => {
    if (!userId) return;

    // Use Brasília timezone for date calculation
    const today = getBrasiliaDateString();

    try {
      // Use any to bypass type checking for new tables not yet in types.ts
      await (supabase as any)
        .from('daily_logins')
        .upsert({
          user_id: userId,
          login_date: today,
        }, {
          onConflict: 'user_id,login_date',
          ignoreDuplicates: true,
        });
    } catch (error) {
      // Silently ignore - duplicate login is fine
      console.log('Daily login already recorded or error:', error);
    }
  }, [userId]);

  useEffect(() => {
    recordDailyLogin();
  }, [recordDailyLogin]);
};
