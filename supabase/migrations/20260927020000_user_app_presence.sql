-- PRESENÇA NO APP — para o push só sair quando a pessoa está FORA do app.
--
-- O app grava "estou aqui" quando a tela fica visível (e renova a cada 90 s
-- enquanto ela segue visível) e "saí" quando ela some. O envio de push
-- (`send-push-notification`) pula quem está com o app na tela há menos de
-- 3 minutos — lá dentro, quem avisa é o Devocionalzeiro. Sem Realtime: é um
-- UPDATE barato, só da própria linha.
CREATE TABLE IF NOT EXISTS public.user_app_presence (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  visivel boolean NOT NULL DEFAULT false,
  visto_em timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_app_presence ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "presenca: a propria linha (ler)" ON public.user_app_presence;
CREATE POLICY "presenca: a propria linha (ler)" ON public.user_app_presence
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "presenca: a propria linha (criar)" ON public.user_app_presence;
CREATE POLICY "presenca: a propria linha (criar)" ON public.user_app_presence
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "presenca: a propria linha (atualizar)" ON public.user_app_presence;
CREATE POLICY "presenca: a propria linha (atualizar)" ON public.user_app_presence
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_app_presence_no_app
  ON public.user_app_presence (visto_em) WHERE visivel;
