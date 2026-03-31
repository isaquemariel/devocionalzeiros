
-- Projects table
CREATE TABLE public.financial_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  total_invested numeric NOT NULL DEFAULT 0,
  total_return numeric NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.financial_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own projects"
  ON public.financial_projects FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Project transactions table
CREATE TABLE public.financial_project_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  project_id uuid NOT NULL REFERENCES public.financial_projects(id) ON DELETE CASCADE,
  type text NOT NULL DEFAULT 'expense',
  amount numeric NOT NULL DEFAULT 0,
  description text NOT NULL DEFAULT '',
  date date NOT NULL DEFAULT CURRENT_DATE,
  category text NOT NULL DEFAULT 'outros',
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.financial_project_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own project transactions"
  ON public.financial_project_transactions FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_financial_projects_updated_at
  BEFORE UPDATE ON public.financial_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financial_project_transactions_updated_at
  BEFORE UPDATE ON public.financial_project_transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
