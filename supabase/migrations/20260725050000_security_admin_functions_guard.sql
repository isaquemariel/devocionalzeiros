-- ============================================================================
-- HARDENING DE SEGURANÇA — funções administrativas
-- ----------------------------------------------------------------------------
-- Corrige funções SECURITY DEFINER que estavam SEM checagem de admin e com
-- EXECUTE liberado para anon/authenticated, permitindo:
--   • qualquer usuário logado/anônimo desativar contas free em massa;
--   • qualquer um ler métricas da plataforma, histórico de logins e RECEITA.
-- Solução: guard de admin no corpo + revoke de anon (e authenticated onde a
-- função não é chamada pelo cliente). Já aplicado no banco via painel.
-- ============================================================================

-- 1) Desativação em massa: cron-only (nunca cliente)
revoke execute on function public.admin_deactivate_inactive_users() from public, anon, authenticated;
-- (o corpo recebeu: IF auth.uid() IS NOT NULL AND NOT has_role(auth.uid(),'admin') THEN RAISE)

-- 2) Métricas / logins / receita: somente admin (o painel usa role authenticated
--    + guard has_role). anon perde o execute.
revoke execute on function public.admin_get_login_history(integer) from anon;
revoke execute on function public.admin_get_metrics() from anon;
revoke execute on function public.admin_get_metrics_history(integer) from anon;
revoke execute on function public.admin_get_revenue_history(integer) from anon;
-- 3) Snapshot de métricas (cron 03h): guard permite cron/admin, bloqueia anon/comum
revoke execute on function public.admin_save_metrics_snapshot() from anon, authenticated;

-- OBS: os corpos das funções acima foram recriados com:
--   IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Access denied: admin only'; END IF;
-- (no snapshot, variação que permite execução por cron sem sessão).
-- Ver histórico do banco para o corpo completo aplicado.
