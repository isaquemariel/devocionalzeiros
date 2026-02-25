
-- Índices para acelerar get_user_rankings (tabelas mais pesadas)
-- reading_schedule: filtra por user_id, is_completed e completed_at
CREATE INDEX IF NOT EXISTS idx_reading_schedule_user_completed 
  ON public.reading_schedule(user_id, is_completed, completed_at) 
  WHERE is_completed = true;

-- reading_progress: filtra por user_id e completed_at
CREATE INDEX IF NOT EXISTS idx_reading_progress_user_completed_at 
  ON public.reading_progress(user_id, completed_at);

-- quiz_attempts: filtra por user_id e quiz_date
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_date 
  ON public.quiz_attempts(user_id, quiz_date);

-- devotional_completions: filtra por user_id e devotional_date
CREATE INDEX IF NOT EXISTS idx_devotional_completions_user_date 
  ON public.devotional_completions(user_id, devotional_date);

-- achievement_claims: filtra por user_id e claimed_at
CREATE INDEX IF NOT EXISTS idx_achievement_claims_user_claimed 
  ON public.achievement_claims(user_id, claimed_at);

-- rpg_progress: filtra por user_id, is_completed e completed_at
CREATE INDEX IF NOT EXISTS idx_rpg_progress_user_completed 
  ON public.rpg_progress(user_id, is_completed, completed_at) 
  WHERE is_completed = true;

-- daily_logins: agrupa por user_id e login_date
CREATE INDEX IF NOT EXISTS idx_daily_logins_user_date 
  ON public.daily_logins(user_id, login_date);

-- authorized_purchases: join por user_id e email
CREATE INDEX IF NOT EXISTS idx_authorized_purchases_user_id 
  ON public.authorized_purchases(user_id) 
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_authorized_purchases_email_lower 
  ON public.authorized_purchases(lower(email)) 
  WHERE status = 'active';
