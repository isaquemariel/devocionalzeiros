ALTER TABLE public.financial_subscriptions 
  ADD COLUMN IF NOT EXISTS due_day integer,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active';