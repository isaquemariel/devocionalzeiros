-- Tabela de lixeira para registros financeiros excluídos
CREATE TABLE public.financial_trash (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  entity_type TEXT NOT NULL,
  original_id UUID NOT NULL,
  data JSONB NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_financial_trash_user ON public.financial_trash(user_id, deleted_at DESC);

ALTER TABLE public.financial_trash ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own trash"
ON public.financial_trash
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);