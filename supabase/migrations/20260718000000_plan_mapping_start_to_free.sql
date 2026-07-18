-- Plan-mapping correctness (applied live via Lovable).
--
-- Context: only GOLD and PREMIUM are ever purchased (each has a mensal + anual
-- Kiwify checkout). "gratuito" (free) is chosen in-app with no purchase.
-- "embaixador" is granted manually by an admin. The old "start" plan was retired
-- ("o start é o gratuito") and must be treated as free everywhere.
--
-- P5/P6 (webhook, see supabase/functions/kiwify-webhook/index.ts):
--   Kiwify sends product info at the TOP LEVEL (product_name/product_id/
--   checkout_link), not in a nested Product object, so every purchase fell to the
--   default plan. The checkout IDs were also stale and the default was 'start'
--   (which mapped to paid access). Fixed: read top-level fields, match the real
--   GOLD/PREMIUM checkout IDs, and default unrecognized payloads to 'free' so an
--   unknown/malformed webhook can never silently grant paid access.
--   Current checkout IDs: PREMIUM anual kb0Gv2E / mensal rkZYQDA;
--                         GOLD    anual hdqNhIH / mensal VIxn8D3.
--
-- This file mirrors the two SECURITY DEFINER functions that resolve a user's plan
-- so the legacy 'start' value maps to 'free' instead of 'gold'. There are no real
-- active paid 'start' rows (the one active 'start' row is Kiwify test data;
-- all others are inactive), so no data backfill is required — 'start' is simply
-- interpreted as free from now on.

CREATE OR REPLACE FUNCTION public.get_user_plan_type(email_input text)
 RETURNS text
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  plan_result text;
  user_status text;
  requesting_user_email text;
BEGIN
  SELECT email INTO requesting_user_email FROM auth.users WHERE id = auth.uid();
  IF requesting_user_email IS NULL OR lower(requesting_user_email) != lower(email_input) THEN
    RETURN NULL;
  END IF;
  IF lower(email_input) = 'devocionalzeiros@gmail.com' THEN
    RETURN 'admin';
  END IF;
  SELECT ap.plan_type, ap.status INTO plan_result, user_status
  FROM public.authorized_purchases ap
  WHERE lower(ap.email) = lower(email_input)
  ORDER BY ap.updated_at DESC LIMIT 1;
  IF user_status = 'inactive' THEN RETURN 'inactive'; END IF;
  IF plan_result IS NULL THEN RETURN 'free'; END IF;
  -- Retired 'start' + legacy free aliases -> free
  IF plan_result IN ('gratuito','free','none','start') THEN RETURN 'free'; END IF;
  RETURN plan_result; -- gold, premium, embaixador
END;
$function$;

-- increment_daily_usage: the paywall. Only the plan-resolution CASE changed —
-- 'start' now collapses into 'free' (was: start+amount>0 -> gold). Full body is
-- applied live; the CASE is:
--   WHEN ap.plan_type IS NULL THEN 'free'
--   WHEN ap.plan_type IN ('gratuito','free','none','start') THEN 'free'
--   ELSE ap.plan_type
-- with the existing `AND ap.status = 'active'` filter so refunded/canceled
-- purchases fall through to free.
