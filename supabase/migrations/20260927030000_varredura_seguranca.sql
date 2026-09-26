-- VARREDURA DE SEGURANÇA (set/2026) — o que a revisão encontrou no banco.

-- ─── 1. credit_talents aberto a qualquer um ────────────────────────────────
-- A função (SECURITY DEFINER) tinha EXECUTE para PUBLIC — e anon/authenticated
-- herdam de PUBLIC. Qualquer pessoa creditava talentos (moeda vendida) para
-- qualquer conta pelo console. Só o webhook (service role) pode chamar.
REVOKE ALL ON FUNCTION public.credit_talents(uuid, integer, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.credit_talents(uuid, integer, text) TO service_role;

-- check_email_authorized: não é usada pelo app e respondia a qualquer um se um
-- e-mail é de cliente pagante.
REVOKE ALL ON FUNCTION public.check_email_authorized(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_email_authorized(text) TO service_role;

-- ─── 2. Plano pago: prova de que o e-mail é seu ─────────────────────────────
-- Com a confirmação de e-mail desligada, o Supabase marca todo cadastro como
-- confirmado — a trava "email_confirmed_at IS NULL" nunca disparava, e quem se
-- cadastrasse com o e-mail de um comprador da Kiwify herdava o plano dele.
-- Agora a compra só vale se: for DA CONTA (authorized_purchases.user_id), ou o
-- e-mail estiver provado — login pelo Google (o provedor verifica) ou um link
-- enviado para o e-mail e aberto (email_verificado).
CREATE TABLE IF NOT EXISTS public.email_verificado (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  verificado_em timestamptz NOT NULL DEFAULT now(),
  como text NOT NULL DEFAULT 'link'
);
ALTER TABLE public.email_verificado ENABLE ROW LEVEL SECURITY;

-- quem já existia continua como está (ninguém que paga perde o plano). Data
-- FIXA: reaplicar esta migração no futuro não pode "provar" contas novas.
INSERT INTO public.email_verificado (user_id, verificado_em, como)
SELECT id, now(), 'anterior' FROM auth.users WHERE created_at < '2026-09-28T03:00:00Z'
ON CONFLICT (user_id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.email_comprovado(p_uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT EXISTS (SELECT 1 FROM public.email_verificado WHERE user_id = p_uid)
      OR EXISTS (SELECT 1 FROM auth.identities WHERE user_id = p_uid AND provider <> 'email');
$$;
REVOKE ALL ON FUNCTION public.email_comprovado(uuid) FROM PUBLIC, anon, authenticated;

-- Chamada pelo app logo depois de a pessoa entrar pelo link do e-mail: a
-- sessão aberta por link (magic link, recuperação, confirmação) traz isso no
-- próprio token (claim "amr") — o cliente não consegue fingir.
CREATE OR REPLACE FUNCTION public.confirmar_email()
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_email text;
  v_link boolean;
BEGIN
  IF v_uid IS NULL THEN RETURN false; END IF;
  SELECT email INTO v_email FROM auth.users WHERE id = v_uid;
  IF v_email IS NULL OR lower(coalesce(auth.jwt() ->> 'email', '')) <> lower(v_email) THEN RETURN false; END IF;
  SELECT EXISTS (
    SELECT 1 FROM jsonb_array_elements(coalesce(auth.jwt() -> 'amr', '[]'::jsonb)) e
    WHERE e ->> 'method' IN ('otp', 'magiclink', 'recovery', 'email/signup', 'invite', 'email_change')
  ) INTO v_link;
  IF NOT v_link THEN RETURN public.email_comprovado(v_uid); END IF;
  INSERT INTO public.email_verificado (user_id, verificado_em, como) VALUES (v_uid, now(), 'link')
  ON CONFLICT (user_id) DO NOTHING;
  -- a compra feita neste e-mail passa a ser DESTA conta
  UPDATE public.authorized_purchases SET user_id = v_uid
   WHERE user_id IS NULL AND lower(email) = lower(v_email);
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.confirmar_email() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.confirmar_email() TO authenticated;

-- "há uma compra no seu e-mail esperando você provar que o e-mail é seu?"
CREATE OR REPLACE FUNCTION public.compra_aguardando_confirmacao()
RETURNS boolean LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid(); v_email text;
BEGIN
  IF v_uid IS NULL THEN RETURN false; END IF;
  IF public.email_comprovado(v_uid) THEN RETURN false; END IF;
  SELECT email INTO v_email FROM auth.users WHERE id = v_uid;
  RETURN EXISTS (
    SELECT 1 FROM public.authorized_purchases ap
     WHERE lower(ap.email) = lower(v_email) AND ap.user_id IS NULL AND ap.status = 'active'
       AND coalesce(ap.plan_type, 'free') NOT IN ('free', 'gratuito', 'none')
  );
END;
$$;
REVOKE ALL ON FUNCTION public.compra_aguardando_confirmacao() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.compra_aguardando_confirmacao() TO authenticated;

CREATE OR REPLACE FUNCTION public.get_user_plan_type(email_input text)
 RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_email text;
  v_prova boolean;
  plan_result text;
  user_status text;
  amount_result numeric;
BEGIN
  SELECT email INTO v_email FROM auth.users WHERE id = v_uid;
  IF v_email IS NULL OR lower(v_email) <> lower(email_input) THEN RETURN NULL; END IF;

  IF lower(v_email) = 'devocionalzeiros@gmail.com' OR public.has_role(v_uid, 'admin') THEN
    RETURN 'admin';
  END IF;

  v_prova := public.email_comprovado(v_uid);

  -- vale a compra DESTA conta; a de "só o e-mail" só com o e-mail provado
  SELECT ap.plan_type, ap.status, COALESCE(ap.amount_paid, 0)
    INTO plan_result, user_status, amount_result
  FROM public.authorized_purchases ap
  WHERE lower(ap.email) = lower(v_email)
    AND (ap.user_id = v_uid OR (ap.user_id IS NULL AND v_prova))
  ORDER BY (ap.user_id IS NOT DISTINCT FROM v_uid) DESC, ap.updated_at DESC
  LIMIT 1;

  IF user_status = 'inactive' THEN RETURN 'inactive'; END IF;
  IF plan_result IS NULL THEN RETURN 'free'; END IF;
  IF plan_result IN ('gratuito', 'free', 'none') THEN RETURN 'free'; END IF;
  IF plan_result = 'start' THEN
    IF amount_result > 0 THEN RETURN 'gold'; ELSE RETURN 'free'; END IF;
  END IF;
  RETURN plan_result;
END;
$$;

-- ─── 3. Presença no app: por APARELHO, com a hora do servidor ──────────────
-- Uma linha por pessoa fazia um aparelho escondido marcar "fora" enquanto
-- outro estava na tela. E a hora vinha do cliente (dava para se calar para
-- sempre com uma data no futuro).
ALTER TABLE public.user_app_presence ADD COLUMN IF NOT EXISTS device_id text NOT NULL DEFAULT 'legado';
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'user_app_presence_pkey'
             AND pg_get_constraintdef(oid) = 'PRIMARY KEY (user_id)') THEN
    ALTER TABLE public.user_app_presence DROP CONSTRAINT user_app_presence_pkey;
    ALTER TABLE public.user_app_presence ADD PRIMARY KEY (user_id, device_id);
  END IF;
END $$;
ALTER TABLE public.user_app_presence DROP CONSTRAINT IF EXISTS user_app_presence_device_id_tam;
ALTER TABLE public.user_app_presence ADD CONSTRAINT user_app_presence_device_id_tam CHECK (char_length(device_id) BETWEEN 1 AND 64);

CREATE OR REPLACE FUNCTION public.presenca_hora_do_servidor()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public'
AS $$ BEGIN NEW.visto_em := now(); RETURN NEW; END; $$;
DROP TRIGGER IF EXISTS presenca_hora_do_servidor ON public.user_app_presence;
CREATE TRIGGER presenca_hora_do_servidor BEFORE INSERT OR UPDATE ON public.user_app_presence
  FOR EACH ROW EXECUTE FUNCTION public.presenca_hora_do_servidor();

-- ─── 4. Aviso de bloqueio das salas: uma vez por bloqueio ──────────────────
ALTER TABLE public.room_bans ADD COLUMN IF NOT EXISTS notificado_em timestamptz;

-- ─── 5. Troca de senha pelo admin: achar a conta e derrubar as sessões ─────
CREATE OR REPLACE FUNCTION public.admin_find_user_id_by_email(p_email text)
RETURNS uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO ''
AS $$ SELECT id FROM auth.users WHERE lower(email) = lower(trim(p_email)) ORDER BY created_at LIMIT 1; $$;
REVOKE ALL ON FUNCTION public.admin_find_user_id_by_email(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_find_user_id_by_email(text) TO service_role;

CREATE OR REPLACE FUNCTION public.admin_revoke_sessions(p_user_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $$
BEGIN
  DELETE FROM auth.refresh_tokens WHERE user_id = p_user_id::text;
  DELETE FROM auth.sessions WHERE user_id = p_user_id;
END;
$$;
REVOKE ALL ON FUNCTION public.admin_revoke_sessions(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_revoke_sessions(uuid) TO service_role;

-- ─── 6. Push num aparelho compartilhado: o endereço é de UMA conta ─────────
-- O mesmo endpoint (navegador) podia ficar salvo para duas contas: quem saía
-- continuava recebendo os pushes no aparelho de quem entrou. Fica o mais novo.
DELETE FROM public.push_subscriptions a
 USING public.push_subscriptions b
 WHERE a.endpoint = b.endpoint AND (a.created_at, a.id) < (b.created_at, b.id);
CREATE UNIQUE INDEX IF NOT EXISTS push_subscriptions_endpoint_unico ON public.push_subscriptions (endpoint);

-- o token nativo passa para a conta que entrou no aparelho (o upsert do
-- cliente esbarrava no RLS da linha da conta anterior e falhava calado)
CREATE OR REPLACE FUNCTION public.registrar_token_nativo(p_token text, p_platform text, p_device_id text DEFAULT NULL, p_app_version text DEFAULT NULL)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'auth required' USING ERRCODE = '42501'; END IF;
  IF p_token IS NULL OR char_length(p_token) NOT BETWEEN 10 AND 4096 THEN RAISE EXCEPTION 'invalid token'; END IF;
  IF p_platform NOT IN ('ios', 'android') THEN RAISE EXCEPTION 'invalid platform'; END IF;
  INSERT INTO public.native_push_tokens (user_id, token, platform, device_id, app_version, updated_at, last_seen_at)
  VALUES (auth.uid(), p_token, p_platform, left(p_device_id, 128), left(p_app_version, 32), now(), now())
  ON CONFLICT (token) DO UPDATE SET user_id = auth.uid(), platform = excluded.platform,
    device_id = excluded.device_id, app_version = excluded.app_version, updated_at = now(), last_seen_at = now();
END;
$$;
REVOKE ALL ON FUNCTION public.registrar_token_nativo(text, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.registrar_token_nativo(text, text, text, text) TO authenticated;

-- ao sair da conta: o token deste aparelho deixa de ser desta conta
CREATE OR REPLACE FUNCTION public.soltar_token_nativo(p_token text)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path TO 'public'
AS $$ DELETE FROM public.native_push_tokens WHERE token = p_token AND user_id = auth.uid(); $$;
REVOKE ALL ON FUNCTION public.soltar_token_nativo(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.soltar_token_nativo(text) TO authenticated;

-- ─── 7. Conquistas: o servidor confere se foi alcançada ────────────────────
-- Antes bastava inserir o id em achievement_claims: qualquer um resgatava as
-- 43 (~500 pontos no ranking) pelo console. As regras moram aqui agora — e o
-- app lê as MESMAS estatísticas (minhas_estatisticas_conquistas), então o que
-- a tela mostra como liberado é exatamente o que o banco aceita.
ALTER TABLE public.achievement_catalog ADD COLUMN IF NOT EXISTS estat text;
ALTER TABLE public.achievement_catalog ADD COLUMN IF NOT EXISTS meta integer;
UPDATE public.achievement_catalog c SET estat = v.estat, meta = v.meta
FROM (VALUES
  ('first_reading', 'capitulos', 1),
  ('reader_10', 'capitulos', 10),
  ('reader_50', 'capitulos', 50),
  ('reader_100', 'capitulos', 100),
  ('reader_260', 'capitulos', 260),
  ('streak_3', 'sequencia', 3),
  ('streak_7', 'sequencia', 7),
  ('streak_30', 'sequencia', 30),
  ('streak_100', 'sequencia', 100),
  ('quiz_first', 'quizAcertos', 1),
  ('quiz_10', 'quizAcertos', 10),
  ('quiz_50', 'quizAcertos', 50),
  ('quiz_100', 'quizAcertos', 100),
  ('quiz_hard_10', 'quizDificeis', 10),
  ('quiz_hard_50', 'quizDificeis', 50),
  ('quiz_hard_100', 'quizDificeis', 100),
  ('quiz_total_100', 'quizTentativas', 100),
  ('quiz_total_500', 'quizTentativas', 500),
  ('quiz_streak_3', 'quizSequencia', 3),
  ('quiz_streak_5', 'quizSequencia', 5),
  ('quiz_streak_7', 'quizSequencia', 7),
  ('quiz_streak_10', 'quizSequencia', 10),
  ('devocional_first', 'devocionais', 1),
  ('devocional_7', 'devocionais', 7),
  ('devocional_30', 'devocionais', 30),
  ('login_10', 'acessos', 10),
  ('login_50', 'acessos', 50),
  ('login_100', 'acessos', 100),
  ('rpg_first', 'rpgCapitulos', 1),
  ('rpg_10', 'rpgCapitulos', 10),
  ('rpg_50', 'rpgCapitulos', 50),
  ('rpg_100', 'rpgCapitulos', 100),
  ('rpg_perfect_5', 'rpgPerfeitos', 5),
  ('rpg_perfect_25', 'rpgPerfeitos', 25),
  ('rpg_xp_100', 'rpgXp', 100),
  ('rpg_xp_500', 'rpgXp', 500),
  ('community_first_prayer', 'oracoes', 1),
  ('community_prayer_10', 'oracoes', 10),
  ('community_first_thanks', 'gratidoes', 1),
  ('community_thanks_10', 'gratidoes', 10),
  ('community_thanks_50', 'gratidoes', 50),
  ('community_answered_1', 'respondidas', 1),
  ('community_answered_10', 'respondidas', 10)
) AS v(achievement_id, estat, meta)
WHERE c.achievement_id = v.achievement_id;

CREATE OR REPLACE FUNCTION public.estatisticas_conquistas(p_uid uuid)
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  WITH
  caps AS (
    -- capítulos DISTINTOS: o mesmo capítulo nas duas tabelas conta uma vez
    SELECT count(*) AS n FROM (
      SELECT book_name, chapter_number FROM public.reading_progress WHERE user_id = p_uid
      UNION
      SELECT book_name, chapter_number FROM public.reading_schedule WHERE user_id = p_uid AND is_completed
    ) x
  ),
  dias AS (SELECT DISTINCT login_date::date AS d FROM public.daily_logins WHERE user_id = p_uid),
  ilhas AS (SELECT d, d - (row_number() OVER (ORDER BY d))::int AS g FROM dias),
  seq AS (SELECT coalesce(max(c), 0) AS n FROM (SELECT count(*) AS c FROM ilhas GROUP BY g) z),
  quiz AS (
    SELECT
      count(*) FILTER (WHERE is_correct) AS acertos,
      -- difícil = 3 pontos de BASE (tira o bônus da sequência: 3→1, 5→2, 7→3, 10→5)
      count(*) FILTER (WHERE is_correct AND points_earned - CASE streak_count WHEN 3 THEN 1 WHEN 5 THEN 2 WHEN 7 THEN 3 WHEN 10 THEN 5 ELSE 0 END = 3) AS dificeis,
      count(*) AS tentativas,
      coalesce(max(streak_count), 0) AS melhor_seq
    FROM public.quiz_attempts WHERE user_id = p_uid
  ),
  rpg AS (
    SELECT
      count(*) FILTER (WHERE is_completed) AS caps,
      count(*) FILTER (WHERE is_completed AND quiz_total > 0 AND quiz_correct = quiz_total) AS perfeitos,
      coalesce(sum(10 + coalesce(quiz_correct, 0) * 5) FILTER (WHERE is_completed), 0) AS xp
    FROM public.rpg_progress WHERE user_id = p_uid
  ),
  com AS (
    SELECT
      count(*) FILTER (WHERE post_type = 'prayer') AS oracoes,
      count(*) FILTER (WHERE post_type = 'thanks') AS gratidoes,
      count(*) FILTER (WHERE post_type = 'prayer' AND is_answered) AS respondidas
    FROM public.community_posts WHERE user_id = p_uid
  )
  SELECT jsonb_build_object(
    'capitulos', (SELECT n FROM caps),
    'sequencia', (SELECT n FROM seq),
    'quizAcertos', quiz.acertos, 'quizDificeis', quiz.dificeis,
    'quizTentativas', quiz.tentativas, 'quizSequencia', quiz.melhor_seq,
    'devocionais', (SELECT count(*) FROM public.devotional_completions WHERE user_id = p_uid),
    'acessos', (SELECT count(*) FROM dias),
    'rpgCapitulos', rpg.caps, 'rpgPerfeitos', rpg.perfeitos, 'rpgXp', rpg.xp,
    'oracoes', com.oracoes, 'gratidoes', com.gratidoes, 'respondidas', com.respondidas
  )
  FROM quiz, rpg, com;
$$;
REVOKE ALL ON FUNCTION public.estatisticas_conquistas(uuid) FROM PUBLIC, anon, authenticated;

-- o que o app lê: as estatísticas da própria pessoa e o que ela já resgatou
CREATE OR REPLACE FUNCTION public.minhas_estatisticas_conquistas()
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN NULL; END IF;
  RETURN jsonb_build_object(
    'estat', public.estatisticas_conquistas(auth.uid()),
    'resgatadas', coalesce((SELECT jsonb_agg(achievement_id) FROM public.achievement_claims WHERE user_id = auth.uid()), '[]'::jsonb)
  );
END;
$$;
REVOKE ALL ON FUNCTION public.minhas_estatisticas_conquistas() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.minhas_estatisticas_conquistas() TO authenticated;

CREATE OR REPLACE FUNCTION public.exigir_conquista_alcancada()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE v_estat text; v_meta int; v_valor bigint;
BEGIN
  -- o servidor (service role, admin) pode conceder à mão
  IF coalesce(auth.role(), '') NOT IN ('authenticated', 'anon') THEN RETURN NEW; END IF;
  IF NEW.user_id IS DISTINCT FROM auth.uid() THEN RAISE EXCEPTION 'not yours' USING ERRCODE = '42501'; END IF;
  SELECT estat, meta INTO v_estat, v_meta FROM public.achievement_catalog WHERE achievement_id = NEW.achievement_id;
  IF v_estat IS NULL OR v_meta IS NULL THEN RAISE EXCEPTION 'unknown achievement'; END IF;
  v_valor := coalesce((public.estatisticas_conquistas(NEW.user_id) ->> v_estat)::bigint, 0);
  IF v_valor < v_meta THEN
    RAISE EXCEPTION 'conquista ainda não alcançada' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS exigir_conquista_alcancada ON public.achievement_claims;
CREATE TRIGGER exigir_conquista_alcancada BEFORE INSERT ON public.achievement_claims
  FOR EACH ROW EXECUTE FUNCTION public.exigir_conquista_alcancada();

-- ─── 8. Nome do personagem: o formato também no banco ──────────────────────
-- (só letras, até 10) — NOT VALID: vale para o que entrar daqui para a frente
ALTER TABLE public.rpg_user_stats DROP CONSTRAINT IF EXISTS rpg_user_stats_character_name_formato;
ALTER TABLE public.rpg_user_stats ADD CONSTRAINT rpg_user_stats_character_name_formato
  CHECK (character_name IS NULL OR character_name ~ '^[A-Za-zÀ-ÖØ-öø-ÿ]{1,10}$') NOT VALID;
