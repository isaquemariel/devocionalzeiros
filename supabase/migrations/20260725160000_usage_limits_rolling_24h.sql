-- ============================================================================
-- LIMITES DE USO: janela deslizante de 24h (antes: reset à meia-noite)
-- ----------------------------------------------------------------------------
-- Antes, o bloqueio diário resetava à MEIA-NOITE de Brasília (a tabela era
-- indexada por usage_date). Quem batia o limite às 17h liberava à 00h (~7h
-- depois), não 24h. Agora o bloqueio dura 24h REAIS a partir do momento em que
-- o limite é atingido (bateu às 17h → libera às 17h do dia seguinte).
--
-- Modelo: UMA linha por (user_id, feature_key) com:
--   • window_start — início da janela atual (1º uso após um reset)
--   • reset_at     — quando o limite libera; setado quando a contagem ATINGE o
--                    limite (= momento do bloqueio + 24h). Nulo enquanto parcial.
-- Expiração de janela:
--   • se reset_at setado  → expira em reset_at
--   • se ainda parcial    → expira em window_start + 24h (evita contagem "presa")
-- Já aplicado no banco de produção via painel.
-- ============================================================================

-- 1) Colunas da janela
ALTER TABLE public.daily_usage_limits
  ADD COLUMN IF NOT EXISTS window_start timestamptz,
  ADD COLUMN IF NOT EXISTS reset_at timestamptz;

-- 2) Colapsar para UMA linha por (user, feature): mantém a mais recente
DELETE FROM public.daily_usage_limits d
WHERE d.id NOT IN (
  SELECT DISTINCT ON (user_id, feature_key) id
  FROM public.daily_usage_limits
  ORDER BY user_id, feature_key, last_used_at DESC NULLS LAST, id DESC
);

-- 3) Backfill window_start das linhas sobreviventes
UPDATE public.daily_usage_limits
  SET window_start = COALESCE(window_start, last_used_at, now())
  WHERE window_start IS NULL;

-- 4) Trocar o índice único por-data pelo índice único por (user, feature)
ALTER TABLE public.daily_usage_limits
  DROP CONSTRAINT IF EXISTS daily_usage_limits_user_id_feature_key_usage_date_key,
  DROP CONSTRAINT IF EXISTS daily_usage_limits_user_feature_date_unique;
DROP INDEX IF EXISTS public.idx_daily_usage_user_feature_date;
CREATE UNIQUE INDEX IF NOT EXISTS daily_usage_limits_user_feature_unique
  ON public.daily_usage_limits (user_id, feature_key);

-- 5) RPC de consumo — janela deslizante de 24h ancorada no bloqueio
CREATE OR REPLACE FUNCTION public.increment_daily_usage(p_feature_key text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_user_id uuid; v_now timestamptz := now(); v_today date;
  v_plan text; v_email text; v_limit integer; v_limits jsonb;
  v_count integer; v_window_start timestamptz; v_reset_at timestamptz;
  v_expired boolean; v_new_reset timestamptz;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  v_today := (v_now AT TIME ZONE 'America/Sao_Paulo')::date;

  -- Resolução do plano (idêntica à versão anterior)
  SELECT email INTO v_email FROM auth.users WHERE id = v_user_id;
  IF lower(v_email) = 'devocionalzeiros@gmail.com' THEN
    v_plan := 'admin';
  ELSE
    SELECT CASE
        WHEN ap.plan_type IS NULL THEN 'free'
        WHEN ap.plan_type IN ('gratuito','free','none') THEN 'free'
        WHEN ap.plan_type = 'start' AND COALESCE(ap.amount_paid,0) = 0 THEN 'free'
        WHEN ap.plan_type = 'start' AND COALESCE(ap.amount_paid,0) > 0 THEN 'gold'
        ELSE ap.plan_type
      END INTO v_plan
    FROM authorized_purchases ap
    WHERE lower(ap.email) = lower(v_email) AND ap.status = 'active'
    ORDER BY ap.updated_at DESC LIMIT 1;
    v_plan := COALESCE(v_plan, 'free');
  END IF;

  v_limits := CASE v_plan
    WHEN 'admin' THEN '{}'::jsonb WHEN 'embaixador' THEN '{}'::jsonb WHEN 'premium' THEN '{}'::jsonb
    WHEN 'gold' THEN jsonb_build_object('rpg_quiz',10,'rpg_verse_explanation',10,'quiz_free_choice',5,'quiz_random',5,'sermon',5,'chat_question',5,'reading_chapter_explanation',10,'reading_verse_explanation',10,'study_bible_verse_explanation',10,'study_bible_quiz',5,'custom_plan',-1,'rpg_book_summary',20,'community_post_prayer',-1,'community_post_thanks',-1,'community_reply',-1)
    ELSE jsonb_build_object('rpg_quiz',2,'rpg_verse_explanation',2,'quiz_free_choice',1,'quiz_random',1,'sermon',0,'chat_question',0,'reading_chapter_explanation',4,'reading_verse_explanation',0,'study_bible_verse_explanation',2,'study_bible_quiz',1,'custom_plan',0,'rpg_book_summary',5,'community_post_prayer',1,'community_post_thanks',1,'community_reply',3)
  END;
  IF v_plan IN ('admin','embaixador','premium') THEN v_limit := -1;
  ELSE v_limit := COALESCE((v_limits ->> p_feature_key)::int, 0); END IF;

  IF v_limit = 0 THEN RAISE EXCEPTION 'Feature blocked for plan %', v_plan USING ERRCODE = 'P0001'; END IF;

  -- Ilimitado: não rastreia contagem
  IF v_limit = -1 THEN
    RETURN jsonb_build_object('usage_count', 0, 'limit', -1, 'plan', v_plan, 'reset_at', NULL);
  END IF;

  -- Linha única por (user, feature). Trava para evitar corrida.
  SELECT usage_count, window_start, reset_at
    INTO v_count, v_window_start, v_reset_at
  FROM daily_usage_limits
  WHERE user_id = v_user_id AND feature_key = p_feature_key
  FOR UPDATE;

  -- Primeiro uso desta feature (sem linha)
  IF v_count IS NULL THEN
    v_new_reset := CASE WHEN 1 >= v_limit THEN v_now + interval '24 hours' ELSE NULL END;
    INSERT INTO daily_usage_limits (user_id, feature_key, usage_date, usage_count, window_start, last_used_at, reset_at)
    VALUES (v_user_id, p_feature_key, v_today, 1, v_now, v_now, v_new_reset)
    ON CONFLICT (user_id, feature_key) DO UPDATE
      SET usage_count = 1, window_start = v_now, last_used_at = v_now,
          usage_date = v_today, reset_at = v_new_reset;
    RETURN jsonb_build_object('usage_count', 1, 'limit', v_limit, 'plan', v_plan, 'reset_at', v_new_reset);
  END IF;

  -- A janela atual expirou?
  v_expired := (v_reset_at IS NOT NULL AND v_now >= v_reset_at)
            OR (v_reset_at IS NULL AND v_window_start IS NOT NULL AND v_now >= v_window_start + interval '24 hours');

  IF v_expired THEN
    v_new_reset := CASE WHEN 1 >= v_limit THEN v_now + interval '24 hours' ELSE NULL END;
    UPDATE daily_usage_limits
      SET usage_count = 1, window_start = v_now, last_used_at = v_now,
          usage_date = v_today, reset_at = v_new_reset
      WHERE user_id = v_user_id AND feature_key = p_feature_key;
    RETURN jsonb_build_object('usage_count', 1, 'limit', v_limit, 'plan', v_plan, 'reset_at', v_new_reset);
  END IF;

  -- Dentro da janela ativa e já no limite → bloqueado (24h a partir de reset_at)
  IF v_count >= v_limit THEN
    RAISE EXCEPTION 'Daily limit reached for %', p_feature_key USING ERRCODE = 'P0001';
  END IF;

  -- Consome mais 1; se atingir o limite AGORA, inicia o relógio de 24h
  v_count := v_count + 1;
  v_new_reset := v_reset_at;
  IF v_count >= v_limit AND v_new_reset IS NULL THEN
    v_new_reset := v_now + interval '24 hours';
  END IF;
  UPDATE daily_usage_limits
    SET usage_count = v_count, last_used_at = v_now, reset_at = v_new_reset
    WHERE user_id = v_user_id AND feature_key = p_feature_key;

  RETURN jsonb_build_object('usage_count', v_count, 'limit', v_limit, 'plan', v_plan, 'reset_at', v_new_reset);
END; $function$;

-- 6) Estorno: devolve 1 uso e remove o bloqueio de 24h que o uso falho iniciou
CREATE OR REPLACE FUNCTION public.refund_daily_usage(p_feature_key text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_user_id uuid;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN RETURN; END IF;
  UPDATE daily_usage_limits
    SET usage_count = GREATEST(usage_count - 1, 0),
        reset_at = NULL
    WHERE user_id = v_user_id
      AND feature_key = p_feature_key;
END;
$function$;
