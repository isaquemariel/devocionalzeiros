-- Uma notificação por conquista, na vida da conta: a função
-- `notificar-conquista` grava aqui antes de avisar, e a chave primária impede
-- que dois aparelhos (ou duas abas) notifiquem a mesma conquista duas vezes.
CREATE TABLE IF NOT EXISTS public.achievement_notifications (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id text NOT NULL REFERENCES public.achievement_catalog(achievement_id),
  notified_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, achievement_id)
);

-- só a função (service role) escreve e lê; o cliente não precisa ver
ALTER TABLE public.achievement_notifications ENABLE ROW LEVEL SECURITY;
