-- Tabela para armazenar o histórico mensal de rankings (top 3)
CREATE TABLE public.monthly_ranking_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  rank INTEGER NOT NULL CHECK (rank >= 1 AND rank <= 3),
  total_points INTEGER NOT NULL DEFAULT 0,
  chapters_read INTEGER NOT NULL DEFAULT 0,
  quiz_points INTEGER NOT NULL DEFAULT 0,
  devotional_points INTEGER NOT NULL DEFAULT 0,
  month_year TEXT NOT NULL, -- Formato: '2025-01' (YYYY-MM)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índices para busca rápida
CREATE INDEX idx_monthly_ranking_history_month ON public.monthly_ranking_history(month_year);
CREATE INDEX idx_monthly_ranking_history_rank ON public.monthly_ranking_history(rank);

-- Constraint única para evitar duplicatas
CREATE UNIQUE INDEX idx_monthly_ranking_unique ON public.monthly_ranking_history(user_id, month_year, rank);

-- Enable RLS
ALTER TABLE public.monthly_ranking_history ENABLE ROW LEVEL SECURITY;

-- Política: todos podem visualizar o histórico
CREATE POLICY "Monthly ranking history is viewable by everyone"
ON public.monthly_ranking_history
FOR SELECT
USING (true);

-- Política: apenas admins podem inserir (será via cron job ou função)
CREATE POLICY "Only service role can insert monthly history"
ON public.monthly_ranking_history
FOR INSERT
WITH CHECK (false);

-- Função para salvar o top 3 do mês e resetar pontos
CREATE OR REPLACE FUNCTION public.save_monthly_ranking_and_reset()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  prev_month TEXT;
  ranking_record RECORD;
BEGIN
  -- Calcula o mês anterior no formato YYYY-MM
  prev_month := to_char(now() - interval '1 month', 'YYYY-MM');
  
  -- Busca o top 3 atual
  FOR ranking_record IN
    SELECT * FROM get_user_rankings() WHERE rank <= 3
  LOOP
    INSERT INTO monthly_ranking_history (
      user_id,
      full_name,
      avatar_url,
      rank,
      total_points,
      chapters_read,
      quiz_points,
      devotional_points,
      month_year
    ) VALUES (
      ranking_record.user_id,
      ranking_record.full_name,
      ranking_record.avatar_url,
      ranking_record.rank,
      ranking_record.total_points,
      ranking_record.chapters_read,
      ranking_record.quiz_points,
      ranking_record.devotional_points,
      prev_month
    )
    ON CONFLICT (user_id, month_year, rank) DO NOTHING;
  END LOOP;
END;
$$;

-- Função para obter os campeões do mês anterior
CREATE OR REPLACE FUNCTION public.get_previous_month_champions()
RETURNS TABLE (
  user_id UUID,
  full_name TEXT,
  avatar_url TEXT,
  rank INTEGER,
  total_points INTEGER,
  month_year TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  prev_month TEXT;
BEGIN
  prev_month := to_char(now() - interval '1 month', 'YYYY-MM');
  
  RETURN QUERY
  SELECT 
    mrh.user_id,
    mrh.full_name,
    mrh.avatar_url,
    mrh.rank,
    mrh.total_points,
    mrh.month_year
  FROM monthly_ranking_history mrh
  WHERE mrh.month_year = prev_month
  ORDER BY mrh.rank;
END;
$$;