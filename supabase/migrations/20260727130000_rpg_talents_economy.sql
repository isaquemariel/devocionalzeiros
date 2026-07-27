-- ============================================================================
-- ECONOMIA "TALENTOS" (moeda do jogo) — Mt 25, parábola dos talentos.
-- R$ 1 = 100 talentos. Servidor-autoritativo (cliente nunca define saldo/ganho).
-- Ganha-se 1 por estágio (capítulo) + 1 por acerto no quiz. Já aplicado em prod.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.rpg_talents (
  user_id uuid PRIMARY KEY,
  balance int NOT NULL DEFAULT 0,       -- resgatado, gastável
  unclaimed int NOT NULL DEFAULT 0,     -- ganho, aguardando resgate (pop-up)
  total_earned int NOT NULL DEFAULT 0,  -- vitalício
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.rpg_talents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "read_own_talents" ON public.rpg_talents;
CREATE POLICY "read_own_talents" ON public.rpg_talents FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.rpg_talent_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  source text NOT NULL,
  amount int NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, source)
);
ALTER TABLE public.rpg_talent_grants ENABLE ROW LEVEL SECURITY; -- sem policy = sem acesso do cliente

CREATE TABLE IF NOT EXISTS public.rpg_talent_prices (
  cosmetic_id text PRIMARY KEY,
  price int NOT NULL CHECK (price > 0)
);
ALTER TABLE public.rpg_talent_prices ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "read_talent_prices" ON public.rpg_talent_prices;
CREATE POLICY "read_talent_prices" ON public.rpg_talent_prices FOR SELECT USING (true);

-- Trigger: credita ao concluir capítulo (1 + acertos), idempotente por origem.
CREATE OR REPLACE FUNCTION public.grant_chapter_talents()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_amount int; v_inserted int;
BEGIN
  IF NEW.is_completed IS NOT TRUE THEN RETURN NEW; END IF;
  v_amount := 1 + COALESCE(NEW.quiz_correct, 0);
  INSERT INTO public.rpg_talent_grants (user_id, source, amount)
  VALUES (NEW.user_id, 'chapter:' || NEW.book_index || ':' || NEW.chapter_number, v_amount)
  ON CONFLICT (user_id, source) DO NOTHING;
  GET DIAGNOSTICS v_inserted = ROW_COUNT;
  IF v_inserted > 0 THEN
    INSERT INTO public.rpg_talents (user_id, unclaimed, total_earned)
    VALUES (NEW.user_id, v_amount, v_amount)
    ON CONFLICT (user_id) DO UPDATE
      SET unclaimed = rpg_talents.unclaimed + v_amount,
          total_earned = rpg_talents.total_earned + v_amount,
          updated_at = now();
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_grant_chapter_talents ON public.rpg_progress;
CREATE TRIGGER trg_grant_chapter_talents
AFTER INSERT OR UPDATE ON public.rpg_progress
FOR EACH ROW EXECUTE FUNCTION public.grant_chapter_talents();

-- Resgate: unclaimed -> balance.
CREATE OR REPLACE FUNCTION public.rpg_claim_talents()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_uid uuid := auth.uid(); v_claimed int; v_balance int;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  INSERT INTO public.rpg_talents (user_id) VALUES (v_uid) ON CONFLICT (user_id) DO NOTHING;
  SELECT unclaimed INTO v_claimed FROM public.rpg_talents WHERE user_id = v_uid FOR UPDATE;
  UPDATE public.rpg_talents SET balance = balance + COALESCE(v_claimed,0), unclaimed = 0, updated_at = now()
    WHERE user_id = v_uid RETURNING balance INTO v_balance;
  RETURN jsonb_build_object('claimed', COALESCE(v_claimed,0), 'balance', COALESCE(v_balance,0));
END; $$;

-- Compra com talentos (preço vem de rpg_talent_prices; valida saldo no servidor).
CREATE OR REPLACE FUNCTION public.rpg_buy_cosmetic_with_talents(p_cosmetic_id text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_uid uuid := auth.uid(); v_price int; v_balance int; v_blob jsonb; v_owned jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  SELECT price INTO v_price FROM public.rpg_talent_prices WHERE cosmetic_id = p_cosmetic_id;
  IF v_price IS NULL THEN RAISE EXCEPTION 'Item não disponível por talentos' USING ERRCODE='P0001'; END IF;
  SELECT balance INTO v_balance FROM public.rpg_talents WHERE user_id = v_uid FOR UPDATE;
  IF COALESCE(v_balance,0) < v_price THEN RAISE EXCEPTION 'Talentos insuficientes' USING ERRCODE='P0001'; END IF;
  UPDATE public.rpg_talents SET balance = balance - v_price, updated_at = now() WHERE user_id = v_uid;
  INSERT INTO public.rpg_talent_grants (user_id, source, amount)
    VALUES (v_uid, 'spend:' || p_cosmetic_id || ':' || extract(epoch from now())::bigint, -v_price);
  SELECT cosmetics INTO v_blob FROM public.rpg_user_stats WHERE user_id = v_uid;
  v_owned := COALESCE(v_blob->'owned', '[]'::jsonb);
  IF NOT (v_owned ? p_cosmetic_id) THEN v_owned := v_owned || to_jsonb(p_cosmetic_id); END IF;
  v_blob := COALESCE(v_blob, '{}'::jsonb) || jsonb_build_object('owned', v_owned);
  UPDATE public.rpg_user_stats SET cosmetics = v_blob WHERE user_id = v_uid;
  SELECT balance INTO v_balance FROM public.rpg_talents WHERE user_id = v_uid;
  RETURN jsonb_build_object('ok', true, 'balance', v_balance, 'cosmetic_id', p_cosmetic_id);
END; $$;

-- Backfill (executado em prod): capítulos já concluídos creditados como SALDO.
--   INSERT INTO rpg_talent_grants (user_id, source, amount)
--     SELECT user_id, 'chapter:'||book_index||':'||chapter_number, 1+COALESCE(quiz_correct,0)
--     FROM rpg_progress WHERE is_completed ON CONFLICT DO NOTHING;
--   INSERT INTO rpg_talents (user_id, balance, unclaimed, total_earned)
--     SELECT user_id, SUM(amount), 0, SUM(amount) FROM rpg_talent_grants WHERE amount>0
--     GROUP BY user_id ON CONFLICT (user_id) DO UPDATE SET balance=EXCLUDED.balance, total_earned=EXCLUDED.total_earned;
