-- Registro auditável de cada envio de push (web + nativo). Os logs de edge
-- function não são acessíveis fora do dashboard; esta tabela torna cada envio
-- verificável por SQL (contadores e amostras de erro do FCM/web-push).
-- Já aplicada em produção em 2026-08-02 (mantida aqui como fonte de verdade).
create table if not exists public.push_send_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text,
  target_user_id uuid,
  title text,
  web jsonb,
  native jsonb,
  error text
);

alter table public.push_send_log enable row level security;

do $$ begin
  create policy "admin can read push log" on public.push_send_log
    for select using (public.is_current_user_admin());
exception when duplicate_object then null; end $$;
