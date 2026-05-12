
-- ============================================
-- ROTINA: Tabelas principais
-- ============================================

-- 1. TAREFAS
CREATE TABLE public.rotina_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  area text NOT NULL DEFAULT 'pessoal',
  priority text NOT NULL DEFAULT 'media',
  due_date date,
  due_time time,
  status text NOT NULL DEFAULT 'todo',
  tags text[] DEFAULT '{}'::text[],
  recurrence text NOT NULL DEFAULT 'none',
  anchor_verse text,
  parent_task_id uuid REFERENCES public.rotina_tasks(id) ON DELETE CASCADE,
  goal_id uuid,
  sort_order integer DEFAULT 0,
  completed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.rotina_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own tasks" ON public.rotina_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tasks" ON public.rotina_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tasks" ON public.rotina_tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tasks" ON public.rotina_tasks FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_rotina_tasks_user_due ON public.rotina_tasks(user_id, due_date);
CREATE INDEX idx_rotina_tasks_user_status ON public.rotina_tasks(user_id, status);
CREATE TRIGGER update_rotina_tasks_updated_at BEFORE UPDATE ON public.rotina_tasks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. EVENTOS DE CALENDÁRIO
CREATE TABLE public.rotina_calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'pessoal',
  color text NOT NULL DEFAULT '#3b82f6',
  start_at timestamp with time zone NOT NULL,
  end_at timestamp with time zone NOT NULL,
  all_day boolean NOT NULL DEFAULT false,
  recurrence text NOT NULL DEFAULT 'none',
  recurrence_until date,
  location text,
  google_event_id text,
  reminder_minutes integer,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.rotina_calendar_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own events" ON public.rotina_calendar_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own events" ON public.rotina_calendar_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own events" ON public.rotina_calendar_events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own events" ON public.rotina_calendar_events FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_rotina_events_user_start ON public.rotina_calendar_events(user_id, start_at);
CREATE TRIGGER update_rotina_events_updated_at BEFORE UPDATE ON public.rotina_calendar_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. HÁBITOS
CREATE TABLE public.rotina_habits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  icon text DEFAULT 'sparkles',
  color text DEFAULT '#8b5cf6',
  frequency_type text NOT NULL DEFAULT 'daily',
  frequency_days integer[] DEFAULT '{0,1,2,3,4,5,6}'::integer[],
  target_per_week integer,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.rotina_habits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own habits" ON public.rotina_habits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own habits" ON public.rotina_habits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own habits" ON public.rotina_habits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own habits" ON public.rotina_habits FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_rotina_habits_updated_at BEFORE UPDATE ON public.rotina_habits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. LOGS DE HÁBITOS
CREATE TABLE public.rotina_habit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  habit_id uuid NOT NULL REFERENCES public.rotina_habits(id) ON DELETE CASCADE,
  log_date date NOT NULL,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(habit_id, log_date)
);

ALTER TABLE public.rotina_habit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own habit logs" ON public.rotina_habit_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own habit logs" ON public.rotina_habit_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own habit logs" ON public.rotina_habit_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own habit logs" ON public.rotina_habit_logs FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_rotina_habit_logs_user_date ON public.rotina_habit_logs(user_id, log_date);

-- 5. LISTA DE ORAÇÃO
CREATE TABLE public.rotina_prayers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'pessoal',
  status text NOT NULL DEFAULT 'praying',
  testimony text,
  answered_at timestamp with time zone,
  is_pinned boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.rotina_prayers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own prayers" ON public.rotina_prayers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own prayers" ON public.rotina_prayers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own prayers" ON public.rotina_prayers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own prayers" ON public.rotina_prayers FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_rotina_prayers_user_status ON public.rotina_prayers(user_id, status);
CREATE TRIGGER update_rotina_prayers_updated_at BEFORE UPDATE ON public.rotina_prayers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. NOTAS E ESTUDOS
CREATE TABLE public.rotina_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  content text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'reflexao',
  tags text[] DEFAULT '{}'::text[],
  template_type text,
  related_verses text[] DEFAULT '{}'::text[],
  is_favorite boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.rotina_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own notes" ON public.rotina_notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notes" ON public.rotina_notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notes" ON public.rotina_notes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notes" ON public.rotina_notes FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_rotina_notes_user ON public.rotina_notes(user_id, updated_at DESC);
CREATE TRIGGER update_rotina_notes_updated_at BEFORE UPDATE ON public.rotina_notes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 7. METAS
CREATE TABLE public.rotina_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  area text NOT NULL DEFAULT 'pessoal',
  target_date date,
  progress_percent integer NOT NULL DEFAULT 0,
  current_score integer DEFAULT 5,
  parent_goal_id uuid REFERENCES public.rotina_goals(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active',
  completed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.rotina_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own goals" ON public.rotina_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own goals" ON public.rotina_goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own goals" ON public.rotina_goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own goals" ON public.rotina_goals FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_rotina_goals_updated_at BEFORE UPDATE ON public.rotina_goals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 8. REFLEXÕES SEMANAIS
CREATE TABLE public.rotina_weekly_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  week_start date NOT NULL,
  gratitude text,
  confessions text,
  learnings text,
  next_focus text,
  week_verse text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, week_start)
);

ALTER TABLE public.rotina_weekly_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own reviews" ON public.rotina_weekly_reviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reviews" ON public.rotina_weekly_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON public.rotina_weekly_reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON public.rotina_weekly_reviews FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_rotina_reviews_updated_at BEFORE UPDATE ON public.rotina_weekly_reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 9. GOOGLE CALENDAR (preparado para o futuro)
CREATE TABLE public.rotina_google_calendar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  access_token text,
  refresh_token text,
  expires_at timestamp with time zone,
  calendar_id text DEFAULT 'primary',
  sync_enabled boolean DEFAULT false,
  last_synced_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.rotina_google_calendar ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own gcal" ON public.rotina_google_calendar FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own gcal" ON public.rotina_google_calendar FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own gcal" ON public.rotina_google_calendar FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own gcal" ON public.rotina_google_calendar FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_rotina_gcal_updated_at BEFORE UPDATE ON public.rotina_google_calendar FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 10. CONFIGURAÇÕES
CREATE TABLE public.rotina_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  default_view text DEFAULT 'today',
  week_start_day integer DEFAULT 0,
  show_completed_tasks boolean DEFAULT true,
  prayer_reminder_time time DEFAULT '07:00',
  prayer_reminder_enabled boolean DEFAULT false,
  weekly_review_day integer DEFAULT 5,
  weekly_review_enabled boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.rotina_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own settings" ON public.rotina_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own settings" ON public.rotina_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own settings" ON public.rotina_settings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own settings" ON public.rotina_settings FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_rotina_settings_updated_at BEFORE UPDATE ON public.rotina_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
