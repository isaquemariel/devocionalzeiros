-- Usage-refund + integrity hardening (applied live via Lovable).
--
-- Q5 (quota refund): AI edge functions call increment_daily_usage (via enforceUsage)
-- BEFORE invoking the AI, so a failed AI call burned one of the user's daily uses.
-- refund_daily_usage compensates: it decrements today's counter for the calling
-- user (Brasília), flooring at 0. The edge functions call it only on post-gate
-- AI-failure paths, so a use is consumed only when the AI actually delivers.
CREATE OR REPLACE FUNCTION public.refund_daily_usage(p_feature_key text)
 RETURNS void
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE v_user_id uuid; v_today date;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN RETURN; END IF;
  v_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  UPDATE daily_usage_limits
    SET usage_count = GREATEST(usage_count - 1, 0)
    WHERE user_id = v_user_id
      AND feature_key = p_feature_key
      AND usage_date = v_today;
END;
$function$;
REVOKE ALL ON FUNCTION public.refund_daily_usage(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.refund_daily_usage(text) TO authenticated, service_role;

-- Q3 (quiz answer leak): rpg_quiz_cache stores correct_answer and had a
-- world-readable SELECT policy (USING true), letting any client bulk-download
-- every answer. The rpg-quiz edge function reads it via the service role
-- (bypasses RLS) and the frontend never queries it, so the public read policy
-- is removed. RLS stays on -> non-service reads are denied.
DROP POLICY IF EXISTS "Anyone can read rpg quiz cache" ON public.rpg_quiz_cache;

-- C-F5 (content-filter bypass): the community filter matched raw text, so
-- "putaaa", "pôrra", or "MERDAAA" slipped through. Normalize a COPY of the
-- content before matching (lowercase + strip accents + collapse runs of 3+ of
-- the same letter to one). Only 3+ is collapsed so legit doubles inside blocked
-- words (e.g. "porra", "punheta") are preserved. Stored content is untouched and
-- the wordlist/policy is unchanged. (Over-blocking of legit words such as the
-- surname "Pinto" and "sexo" is a moderation-POLICY decision left to the owner.)
CREATE OR REPLACE FUNCTION public.community_content_filter()
 RETURNS trigger
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  blocked_pattern text := '\m(porra|caralho|merda|foda-?se|fdp|puta|puto|cuzao|cuz[aã]o|viado|vi[aá]do|arrombad[oa]|otari[oa]|imbecil|idiota|retardad[oa]|buceta|piroca|pinto|pau\s*duro|gozar|gozad[ao]|tes[aã]o|punheta|siririca|sexo|nudes?|pornografia|porn[oô]|xvideos|cunete|chupar|chupad[ao]|tarad[ao]|safad[ao]|gostosa|gostoso|peit[ãa]o|bunduda|fetiche|orgia|masturba|tran(s|sar|sou|sando))\M';
  banned boolean;
  normalized text;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM public.community_bans
    WHERE user_id = NEW.user_id AND banned_until > now()
  ) INTO banned;
  IF banned THEN
    RAISE EXCEPTION 'Você está temporariamente impedido de postar na comunidade.' USING ERRCODE='P0001';
  END IF;

  normalized := lower(NEW.content);
  normalized := translate(normalized, 'áàâãäéèêëíìîïóòôõöúùûüçñ', 'aaaaaeeeeiiiiooooouuuucn');
  normalized := regexp_replace(normalized, '(.)\1{2,}', '\1', 'g');

  IF normalized ~* blocked_pattern THEN
    RAISE EXCEPTION 'Conteúdo bloqueado pelas regras da comunidade (linguagem ofensiva ou inadequada).' USING ERRCODE='P0001';
  END IF;

  RETURN NEW;
END;
$function$;
