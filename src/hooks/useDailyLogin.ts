import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useDailyLogin = (userId: string | undefined) => {
  const recordDailyLogin = useCallback(async () => {
    if (!userId) return;

    const today = new Date().toISOString().split('T')[0];

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
