-- Production hardening (advisor findings), applied live via Lovable.
--
-- 1) quiz_questions_cache: remove the client-facing SELECT policy (was USING(true)
--    for authenticated). The client never reads this table directly — quiz
--    questions are served through the quiz-generator edge function (service_role,
--    bypasses RLS). Blocking client reads prevents users from querying cached
--    answers directly (ranking-integrity / cheating vector).
DROP POLICY IF EXISTS "Authenticated users can read cache" ON public.quiz_questions_cache;

-- 2) Monthly champions functions now enforce the show_in_rankings opt-out at read
--    time (anonymize name/avatar for users who opted out), matching the rest of
--    the ranking paths. Previously they returned stored names/avatars with no
--    opt-out enforcement.
CREATE OR REPLACE FUNCTION public.get_all_monthly_champions()
RETURNS TABLE(user_id uuid, full_name text, avatar_url text, rank integer, total_points integer, chapters_read integer, quiz_points integer, devotional_points integer, month_year text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    mrh.user_id,
    CASE WHEN COALESCE(p.show_in_rankings, true) THEN mrh.full_name ELSE 'Anônimo' END,
    CASE WHEN COALESCE(p.show_in_rankings, true) THEN mrh.avatar_url ELSE NULL END,
    mrh.rank, mrh.total_points, mrh.chapters_read, mrh.quiz_points, mrh.devotional_points, mrh.month_year
  FROM monthly_ranking_history mrh
  LEFT JOIN profiles p ON p.user_id = mrh.user_id
  ORDER BY mrh.month_year DESC, mrh.rank ASC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_previous_month_champions()
RETURNS TABLE(user_id uuid, full_name text, avatar_url text, rank integer, total_points integer, month_year text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  prev_month TEXT;
BEGIN
  prev_month := to_char(now() - interval '1 month', 'YYYY-MM');
  RETURN QUERY
  SELECT
    mrh.user_id,
    CASE WHEN COALESCE(p.show_in_rankings, true) THEN mrh.full_name ELSE 'Anônimo' END,
    CASE WHEN COALESCE(p.show_in_rankings, true) THEN mrh.avatar_url ELSE NULL END,
    mrh.rank, mrh.total_points, mrh.month_year
  FROM monthly_ranking_history mrh
  LEFT JOIN profiles p ON p.user_id = mrh.user_id
  WHERE mrh.month_year = prev_month
  ORDER BY mrh.rank;
END;
$function$;
