-- Production hardening (applied live via Lovable): lock down internal/admin/cron
-- RPCs that were executable by anon/authenticated with no internal guard and are
-- NOT called by the client. Edge functions and cron invoke these as service_role,
-- so restricting to service_role only is safe and closes real abuse vectors:
--   - run_daily_deactivation  → mass user deactivation
--   - save_monthly_ranking_and_reset → wiping the monthly ranking
--   - enqueue_email/read_email_batch/delete_email/move_to_dlq/email_queue_dispatch/wake
--       → email spam / reading / deleting queued mail
--   - cleanup_old_whatsapp_reminders → low, included for consistency
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname IN (
      'run_daily_deactivation','save_monthly_ranking_and_reset',
      'enqueue_email','read_email_batch','delete_email','move_to_dlq',
      'email_queue_dispatch','email_queue_wake','cleanup_old_whatsapp_reminders'
    )
  LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated', r.sig);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', r.sig);
  END LOOP;
END $$;
