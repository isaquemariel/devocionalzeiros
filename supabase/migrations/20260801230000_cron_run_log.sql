-- Trava de idempotência para funções chamadas por cron (aplicada em produção
-- via painel — este arquivo é o registro no repositório).
CREATE TABLE IF NOT EXISTS public.cron_run_log (
  fn text PRIMARY KEY,
  last_run_date date NOT NULL
);
ALTER TABLE public.cron_run_log ENABLE ROW LEVEL SECURITY;
-- sem policies: apenas o service role (edge functions) lê/escreve
