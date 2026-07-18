-- Plan-mapping correctness + fail-safe (applied live via Lovable).
--
-- Context: only GOLD and PREMIUM are ever purchased (each has a mensal + anual
-- Kiwify checkout). "gratuito" (free) is chosen in-app with no purchase.
-- "embaixador" is granted manually by an admin. The old "start" plan was retired.
--
-- P5/P6 (webhook, see supabase/functions/kiwify-webhook/index.ts):
--   Kiwify sends product info at the TOP LEVEL (product_name/product_id/
--   checkout_link), not in a nested Product object, so every purchase fell to the
--   default plan. The checkout IDs were also stale. Fixed: read top-level fields
--   and match the real GOLD/PREMIUM checkout IDs
--   (PREMIUM kb0Gv2E/rkZYQDA, GOLD hdqNhIH/VIxn8D3).
--
-- FAIL-SAFE direction (important): a PAID purchase must never resolve to "free".
--   - Webhook: every Kiwify event is a paid purchase, so an unrecognized product
--     WITH amount_paid>0 defaults to 'gold' (paid access) + is logged for review,
--     rather than 'free'.
--   - DB (below): a legacy 'start' row with amount_paid>0 resolves to 'gold';
--     'start' with 0 (or gratuito/free/none/NULL) resolves to 'free'. There are
--     no real active paid 'start' rows (the one active 'start' row is test data),
--     so this only guards against future mislabels.
--
-- Both get_user_plan_type and increment_daily_usage (the paywall) apply this,
-- with the existing `status = 'active'` filter so refunded/canceled purchases
-- fall through to free.

CREATE OR REPLACE FUNCTION public.get_user_plan_type(email_input text)
 RETURNS text
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  plan_result text; user_status text; amount_result numeric; requesting_user_email text;
BEGIN
  SELECT email INTO requesting_user_email FROM auth.users WHERE id = auth.uid();
  IF requesting_user_email IS NULL OR lower(requesting_user_email) != lower(email_input) THEN RETURN NULL; END IF;
  IF lower(email_input) = 'devocionalzeiros@gmail.com' THEN RETURN 'admin'; END IF;
  SELECT ap.plan_type, ap.status, COALESCE(ap.amount_paid,0)
    INTO plan_result, user_status, amount_result
  FROM public.authorized_purchases ap
  WHERE lower(ap.email) = lower(email_input)
  ORDER BY ap.updated_at DESC LIMIT 1;
  IF user_status = 'inactive' THEN RETURN 'inactive'; END IF;
  IF plan_result IS NULL THEN RETURN 'free'; END IF;
  IF plan_result IN ('gratuito','free','none') THEN RETURN 'free'; END IF;
  -- Retired 'start': fail-safe -> paid start becomes gold, unpaid becomes free.
  IF plan_result = 'start' THEN
    IF amount_result > 0 THEN RETURN 'gold'; ELSE RETURN 'free'; END IF;
  END IF;
  RETURN plan_result; -- gold, premium, embaixador
END;
$function$;

-- increment_daily_usage (the paywall): same plan resolution CASE:
--   WHEN plan_type IS NULL THEN 'free'
--   WHEN plan_type IN ('gratuito','free','none') THEN 'free'
--   WHEN plan_type='start' AND amount_paid=0 THEN 'free'
--   WHEN plan_type='start' AND amount_paid>0 THEN 'gold'
--   ELSE plan_type
-- with `AND status='active'`. Full body applied live.
