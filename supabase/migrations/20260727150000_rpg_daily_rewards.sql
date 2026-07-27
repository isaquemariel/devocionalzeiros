-- Recompensa diária de talentos + constância (streak de login).
--
-- Regras (confirmadas com o produto):
--   * Base diária: 1 talento por dia.
--   * Marcos de constância: 7, 30, 90, 180, 365 dias → bônus = o próprio número
--     do marco (+7, +30, +90, +180, +365), pago UMA vez cada (escada de progresso).
--   * Perder um dia zera a sequência (volta a 1). Estilo "moedas da Shopee".
--   * "Hoje" é calculado no fuso America/Sao_Paulo (a base do usuário é BR).
--   * Baseline: quem já tem constância acumulada NÃO recebe marcos retroativos —
--     o streak inicial é semeado a partir de rpg_user_stats.streak_days e todos os
--     marcos <= streak atual são marcados como já alcançados. A barra de progresso
--     passa a apontar para o PRÓXIMO marco a partir do progresso atual.
--   * Créditos vão direto para rpg_talents.balance (o resgate é o clique no pop-up),
--     idempotente por dia via rpg_talent_grants (source = 'daily:<data>').

-- Tabela de estado do resgate diário / constância
CREATE TABLE IF NOT EXISTS public.rpg_daily (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  streak int NOT NULL DEFAULT 0,          -- dias consecutivos (constância) contados pelo resgate
  last_claim_date date,                    -- último dia resgatado (America/Sao_Paulo)
  last_milestone int NOT NULL DEFAULT 0,   -- maior marco já pago/baselineado (escada)
  total_claimed int NOT NULL DEFAULT 0,    -- talentos vitalícios via resgate diário
  seeded boolean NOT NULL DEFAULT false,   -- baseline aplicado?
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.rpg_daily ENABLE ROW LEVEL SECURITY;

-- O usuário só lê a própria linha. Escrita é exclusiva das RPCs SECURITY DEFINER.
DROP POLICY IF EXISTS read_own_daily ON public.rpg_daily;
CREATE POLICY read_own_daily ON public.rpg_daily
  FOR SELECT USING (auth.uid() = user_id);

-- Próximo marco acima de p_last (NULL se todos já passaram).
CREATE OR REPLACE FUNCTION public._rpg_next_milestone(p_last int)
RETURNS int LANGUAGE sql IMMUTABLE AS $$
  SELECT m FROM unnest(ARRAY[7,30,90,180,365]) AS m
  WHERE m > COALESCE(p_last, 0)
  ORDER BY m LIMIT 1;
$$;

-- Estado atual do resgate (sem creditar). Usado para decidir o pop-up e a barra.
CREATE OR REPLACE FUNCTION public.rpg_get_daily()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_today date := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  v_row public.rpg_daily;
  v_seed int;
  v_streak int;
  v_last_ms int;
  v_can boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;

  SELECT * INTO v_row FROM public.rpg_daily WHERE user_id = v_uid;
  IF NOT FOUND THEN
    -- Ainda não resgatou nunca: baseline a partir do streak atual (constância existente)
    SELECT COALESCE(streak_days, 0) INTO v_seed FROM public.rpg_user_stats WHERE user_id = v_uid;
    v_seed := COALESCE(v_seed, 0);
    v_streak := v_seed;
    v_last_ms := COALESCE((SELECT max(m) FROM unnest(ARRAY[7,30,90,180,365]) m WHERE m <= v_seed), 0);
    v_can := true;
  ELSE
    v_streak := v_row.streak;
    v_last_ms := v_row.last_milestone;
    v_can := (v_row.last_claim_date IS NULL OR v_row.last_claim_date < v_today);
  END IF;

  RETURN jsonb_build_object(
    'streak', v_streak,
    'can_claim', v_can,
    'next_milestone', public._rpg_next_milestone(v_last_ms),
    'last_milestone', v_last_ms,
    'daily_amount', 1
  );
END; $$;

-- Resgata o talento do dia (base + eventual bônus de marco). Idempotente por dia.
CREATE OR REPLACE FUNCTION public.rpg_claim_daily()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_today date := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  v_row public.rpg_daily;
  v_seed int;
  v_streak int;
  v_last_ms int;
  v_next int;
  v_daily int := 1;
  v_bonus int := 0;
  v_bonus_ms int := NULL;
  v_total int;
  v_ins int;
  v_balance int;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;

  SELECT * INTO v_row FROM public.rpg_daily WHERE user_id = v_uid FOR UPDATE;

  IF NOT FOUND THEN
    -- Primeiro resgate: baseline (sem marcos retroativos)
    SELECT COALESCE(streak_days, 0) INTO v_seed FROM public.rpg_user_stats WHERE user_id = v_uid;
    v_seed := COALESCE(v_seed, 0);
    v_streak := GREATEST(v_seed, 1);
    v_last_ms := COALESCE((SELECT max(m) FROM unnest(ARRAY[7,30,90,180,365]) m WHERE m <= v_seed), 0);
    INSERT INTO public.rpg_daily (user_id, streak, last_claim_date, last_milestone, seeded)
      VALUES (v_uid, v_streak, v_today, v_last_ms, true);
  ELSE
    IF v_row.last_claim_date = v_today THEN
      -- Já resgatou hoje: não credita de novo
      RETURN jsonb_build_object(
        'claimed', false, 'already_claimed', true,
        'streak', v_row.streak,
        'next_milestone', public._rpg_next_milestone(v_row.last_milestone),
        'last_milestone', v_row.last_milestone
      );
    END IF;
    -- Novo streak: consecutivo (ontem) soma +1; qualquer gap zera para 1
    IF v_row.last_claim_date = v_today - 1 THEN
      v_streak := LEAST(v_row.streak + 1, 365);
    ELSE
      v_streak := 1;
    END IF;
    v_last_ms := v_row.last_milestone;
  END IF;

  -- Cruzou um marco novo? (bônus = número do marco, pago uma vez)
  v_next := public._rpg_next_milestone(v_last_ms);
  IF v_next IS NOT NULL AND v_streak >= v_next THEN
    v_bonus := v_next;
    v_bonus_ms := v_next;
    v_last_ms := v_next;
  END IF;

  v_total := v_daily + v_bonus;

  UPDATE public.rpg_daily
    SET streak = v_streak, last_claim_date = v_today, last_milestone = v_last_ms,
        total_claimed = total_claimed + v_total, updated_at = now()
    WHERE user_id = v_uid;

  -- Credita no balance (idempotente por dia)
  INSERT INTO public.rpg_talent_grants (user_id, source, amount)
    VALUES (v_uid, 'daily:' || v_today::text, v_total)
    ON CONFLICT (user_id, source) DO NOTHING;
  GET DIAGNOSTICS v_ins = ROW_COUNT;
  IF v_ins > 0 THEN
    INSERT INTO public.rpg_talents (user_id, balance, total_earned)
      VALUES (v_uid, v_total, v_total)
      ON CONFLICT (user_id) DO UPDATE
        SET balance = rpg_talents.balance + v_total,
            total_earned = rpg_talents.total_earned + v_total,
            updated_at = now();
  END IF;

  SELECT balance INTO v_balance FROM public.rpg_talents WHERE user_id = v_uid;

  RETURN jsonb_build_object(
    'claimed', true, 'already_claimed', false,
    'daily_amount', v_daily,
    'bonus_amount', v_bonus,
    'bonus_milestone', v_bonus_ms,
    'total', v_total,
    'streak', v_streak,
    'next_milestone', public._rpg_next_milestone(v_last_ms),
    'last_milestone', v_last_ms,
    'balance', v_balance
  );
END; $$;

REVOKE ALL ON FUNCTION public.rpg_get_daily() FROM anon;
REVOKE ALL ON FUNCTION public.rpg_claim_daily() FROM anon;
GRANT EXECUTE ON FUNCTION public.rpg_get_daily() TO authenticated;
GRANT EXECUTE ON FUNCTION public.rpg_claim_daily() TO authenticated;
