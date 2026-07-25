-- ============================================================================
-- PAINEL ADMIN: correções de veracidade + ledger de vendas do Stripe
-- Já aplicado em produção via painel. Este arquivo documenta as mudanças.
-- ============================================================================

-- 1) admin_get_metrics
--    • total_users: TODOS os usuários (antes excluía churn com status 'inactive')
--    • total_chapters_read: union reading_schedule + reading_progress (antes só schedule)
--    • gratuitos: total - usuários distintos com plano pago/embaixador ativo
CREATE OR REPLACE FUNCTION public.admin_get_metrics()
 RETURNS TABLE(total_users bigint, active_users bigint, start_plans bigint, gold_plans bigint, premium_plans bigint, total_logins_today bigint, total_logins_week bigint, avg_daily_logins numeric, total_chapters_read bigint, total_quiz_attempts bigint, total_devotionals_completed bigint, gratuito_users bigint, embaixador_plans bigint)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  brasilia_today DATE; v_total bigint; paying_users_count bigint;
  gold_count bigint; premium_count bigint; embaixador_count bigint; start_count bigint;
  free_count bigint; paid_or_amb bigint;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Access denied: admin only'; END IF;
  brasilia_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;

  SELECT COUNT(*) INTO v_total FROM auth.users;

  SELECT COUNT(DISTINCT u.id) INTO start_count FROM auth.users u
    JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
    WHERE ap.plan_type = 'start' AND ap.status = 'active' AND COALESCE(ap.amount_paid,0) > 0;
  SELECT COUNT(DISTINCT u.id) INTO gold_count FROM auth.users u
    JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
    WHERE ap.plan_type = 'gold' AND ap.status = 'active';
  SELECT COUNT(DISTINCT u.id) INTO premium_count FROM auth.users u
    JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
    WHERE ap.plan_type = 'premium' AND ap.status = 'active';
  SELECT COUNT(DISTINCT u.id) INTO embaixador_count FROM auth.users u
    JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
    WHERE ap.plan_type = 'embaixador' AND ap.status = 'active';

  paying_users_count := start_count + gold_count + premium_count;

  SELECT COUNT(DISTINCT u.id) INTO paid_or_amb FROM auth.users u
    JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
    WHERE ap.status='active' AND ap.plan_type IN ('start','gold','premium','embaixador')
      AND (ap.plan_type <> 'start' OR COALESCE(ap.amount_paid,0) > 0);
  free_count := v_total - paid_or_amb;

  RETURN QUERY SELECT
    v_total, paying_users_count, start_count, gold_count, premium_count,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date = brasilia_today)::bigint,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date >= brasilia_today - INTERVAL '7 days')::bigint,
    COALESCE((SELECT COUNT(*)::numeric / NULLIF(COUNT(DISTINCT login_date),0) FROM daily_logins WHERE login_date >= brasilia_today - INTERVAL '30 days'),0),
    (SELECT COUNT(*) FROM (
        SELECT user_id, book_name, chapter_number FROM reading_schedule WHERE is_completed = true
        UNION
        SELECT user_id, book_name, chapter_number FROM reading_progress
    ) uniq)::bigint,
    (SELECT COUNT(*) FROM quiz_attempts)::bigint,
    (SELECT COUNT(*) FROM devotional_completions)::bigint,
    free_count, embaixador_count;
END; $function$;

-- 2) admin_get_all_users
--    • coluna "Pontos" = fórmula real do total vitalício (bate com o modal do usuário)
--    • dedup do JOIN de compras via LATERAL (uma linha por usuário)
CREATE OR REPLACE FUNCTION public.admin_get_all_users()
 RETURNS TABLE(user_id uuid, email text, full_name text, avatar_url text, created_at timestamp with time zone, last_sign_in_at timestamp with time zone, plan_type text, plan_status text, total_points bigint, active_days bigint, phone text, cpf text, whatsapp_phone text, inactive_days integer, referral_source text)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE brasilia_today DATE;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Access denied: Admin role required'; END IF;
  brasilia_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;

  RETURN QUERY
  SELECT
    u.id, u.email::text,
    COALESCE(p.full_name, u.raw_user_meta_data->>'full_name', 'Sem nome')::text,
    p.avatar_url::text, u.created_at, u.last_sign_in_at,
    CASE
      WHEN ap.plan_type IS NULL THEN 'free'
      WHEN ap.plan_type IN ('gratuito', 'free') THEN 'free'
      WHEN ap.plan_type = 'start' AND COALESCE(ap.amount_paid, 0) = 0 THEN 'free'
      ELSE ap.plan_type
    END::text,
    COALESCE(ap.status, 'active')::text,
    (
      COALESCE((SELECT COUNT(*) FROM (
        SELECT rs.book_name, rs.chapter_number FROM reading_schedule rs WHERE rs.user_id=u.id AND rs.is_completed=true
        UNION
        SELECT rp.book_name, rp.chapter_number FROM reading_progress rp WHERE rp.user_id=u.id
      ) c), 0)
      + COALESCE((SELECT SUM(qa.points_earned) FROM quiz_attempts qa WHERE qa.user_id=u.id), 0)
      + COALESCE((SELECT COUNT(DISTINCT dc.devotional_date) FROM devotional_completions dc WHERE dc.user_id=u.id), 0)
      + COALESCE((SELECT SUM(ac.points_awarded) FROM achievement_claims ac WHERE ac.user_id=u.id), 0)
      + COALESCE((SELECT SUM(10 + rpg.quiz_correct*5) FROM rpg_progress rpg WHERE rpg.user_id=u.id AND rpg.is_completed=true), 0)
    )::bigint,
    COALESCE((SELECT COUNT(DISTINCT dl.login_date) FROM daily_logins dl WHERE dl.user_id = u.id), 0)::bigint,
    COALESCE(ap.phone, p.whatsapp_phone)::text, ap.cpf::text, p.whatsapp_phone::text,
    COALESCE(
      (brasilia_today - (SELECT MAX(dl.login_date) FROM daily_logins dl WHERE dl.user_id = u.id)),
      (brasilia_today - (u.created_at AT TIME ZONE 'America/Sao_Paulo')::date)
    )::integer,
    p.referral_source::text
  FROM auth.users u
  LEFT JOIN profiles p ON p.user_id = u.id
  LEFT JOIN LATERAL (
    SELECT ap2.* FROM authorized_purchases ap2
    WHERE ap2.user_id = u.id OR lower(ap2.email) = lower(u.email)
    ORDER BY (ap2.status='active') DESC, ap2.updated_at DESC NULLS LAST
    LIMIT 1
  ) ap ON true
  ORDER BY u.created_at DESC;
END; $function$;

-- 3) Ledger de vendas do Stripe (append-only; fonte de verdade = Stripe)
CREATE TABLE IF NOT EXISTS public.stripe_sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  charge_id text UNIQUE NOT NULL,
  payment_intent_id text, invoice_id text, subscription_id text,
  kind text NOT NULL, status text NOT NULL,
  amount numeric NOT NULL DEFAULT 0, currency text NOT NULL DEFAULT 'brl',
  plan_type text, billing_interval text, cosmetic_id text, item_name text,
  user_id uuid, email text, customer_name text,
  occurred_at timestamptz NOT NULL, raw jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  synced_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_stripe_sales_occurred ON public.stripe_sales (occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_stripe_sales_kind ON public.stripe_sales (kind);
CREATE INDEX IF NOT EXISTS idx_stripe_sales_email ON public.stripe_sales (lower(email));

ALTER TABLE public.stripe_sales ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_read_sales" ON public.stripe_sales;
CREATE POLICY "admin_read_sales" ON public.stripe_sales
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 4) RPC admin-only para listar o ledger
CREATE OR REPLACE FUNCTION public.admin_list_sales()
 RETURNS SETOF public.stripe_sales
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Access denied: Admin role required'; END IF;
  RETURN QUERY SELECT * FROM public.stripe_sales ORDER BY occurred_at DESC;
END; $function$;
