-- Create a cron job to automatically backup metrics every 24 hours at midnight (Brasilia time = 3am UTC)
SELECT cron.schedule(
  'daily-metrics-backup',
  '0 3 * * *',
  $$
  SELECT public.admin_save_metrics_snapshot();
  $$
);