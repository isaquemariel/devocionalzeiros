-- ============================================================================
-- ADMIN: estatísticas do MÊS ATUAL de um usuário (espelha o ranking mensal)
-- ----------------------------------------------------------------------------
-- O modal de detalhes do usuário (admin) mostrava o "Xº lugar no ranking DESTE
-- MÊS" ao lado de "Estatísticas Totais" ACUMULADAS desde o cadastro — leituras
-- de escalas de tempo diferentes, o que confundia.
--
-- Esta função devolve as estatísticas do MÊS ATUAL usando EXATAMENTE a mesma
-- janela de datas e a mesma fórmula de pontos de public.get_user_rankings
-- (capítulos + quiz + devocional + conquistas + jogo + comunidade), então o
-- "Pontos no Mês" bate com a posição do ranking. Protegida por has_role admin.
-- Já aplicada no banco de produção via painel.
-- ============================================================================
CREATE OR REPLACE FUNCTION public.admin_get_user_current_month_stats(target_user_id uuid)
 RETURNS TABLE(chapters_read bigint, quiz_points bigint, devotional_points bigint, achievement_points bigint, rpg_points bigint, community_points bigint, active_days bigint, total_points bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  cms date; cme date; ms_ts timestamptz; me_ts timestamptz;
  v_ch bigint; v_q bigint; v_d bigint; v_a bigint; v_r bigint; v_cm bigint; v_ad bigint;
BEGIN
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  cms   := date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo'))::date;
  cme   := (date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo')) + interval '1 month' - interval '1 day')::date;
  ms_ts := date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo')) AT TIME ZONE 'America/Sao_Paulo';
  me_ts := (date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo')) + interval '1 month') AT TIME ZONE 'America/Sao_Paulo';

  SELECT COUNT(*) INTO v_ch FROM (
    SELECT rs.book_name, rs.chapter_number FROM reading_schedule rs
      WHERE rs.user_id=target_user_id AND rs.is_completed AND rs.completed_at>=ms_ts AND rs.completed_at<me_ts
    UNION
    SELECT rp.book_name, rp.chapter_number FROM reading_progress rp
      WHERE rp.user_id=target_user_id AND rp.completed_at>=ms_ts AND rp.completed_at<me_ts
  ) u;
  SELECT COALESCE(SUM(points_earned),0) INTO v_q FROM quiz_attempts
    WHERE user_id=target_user_id AND quiz_date>=cms AND quiz_date<=cme;
  SELECT COUNT(DISTINCT devotional_date) INTO v_d FROM devotional_completions
    WHERE user_id=target_user_id AND devotional_date>=cms AND devotional_date<=cme;
  SELECT COALESCE(SUM(points_awarded),0) INTO v_a FROM achievement_claims
    WHERE user_id=target_user_id AND claimed_at>=ms_ts AND claimed_at<me_ts;
  SELECT COALESCE(SUM(10+quiz_correct*5),0) INTO v_r FROM rpg_progress
    WHERE user_id=target_user_id AND is_completed AND completed_at>=ms_ts AND completed_at<me_ts;
  SELECT COALESCE((SELECT COUNT(*) FROM community_posts WHERE user_id=target_user_id AND post_type='thanks' AND created_at>=ms_ts AND created_at<me_ts),0)
       + COALESCE((SELECT COUNT(*) FROM community_posts WHERE user_id=target_user_id AND is_answered AND answered_at>=ms_ts AND answered_at<me_ts),0)
    INTO v_cm;
  SELECT COUNT(DISTINCT login_date) INTO v_ad FROM daily_logins
    WHERE user_id=target_user_id AND login_date>=cms AND login_date<=cme;

  RETURN QUERY SELECT v_ch, v_q, v_d, v_a, v_r, v_cm, v_ad,
    (v_ch + v_q + v_d + v_a + v_r + v_cm)::bigint;
END; $function$;
