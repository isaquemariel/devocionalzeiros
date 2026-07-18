-- R6: monthly ranking reset cron was broken + not versioned (applied live).
--
-- The 'monthly-ranking-reset' cron (00:01 Brasília on the 1st) POSTed to the
-- monthly-ranking-reset edge function using the ANON key, but that function
-- requires the SERVICE_ROLE key -> every run returned 403 and the snapshot
-- silently stopped. Last successful run: 2026-05-01 (snapshotting April). The
-- June-1 and July-1 runs never happened, leaving gaps in monthly_ranking_history
-- (the live leaderboard was unaffected — get_user_rankings computes the current
-- month on the fly).
--
-- Fix: call the function directly from cron (same pattern as daily-metrics-backup
-- and deactivate-inactive-users-daily), which runs as the job owner and needs no
-- HTTP auth. save_monthly_ranking_and_reset is SECURITY DEFINER, idempotent
-- (ON CONFLICT DO NOTHING) and non-destructive (it only snapshots the previous
-- month's top-3). The monthly-ranking-reset edge function is now unused (kept
-- deployed but no longer referenced by cron).
--
-- Missed months (May + June 2026) were backfilled manually after this change.

SELECT cron.schedule(
  'monthly-ranking-reset',
  '1 3 1 * *',                                  -- 00:01 Brasília on the 1st
  'SELECT public.save_monthly_ranking_and_reset();'
);
