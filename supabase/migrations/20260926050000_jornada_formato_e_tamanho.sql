-- Limite de forma e tamanho para `profiles.jornada`.
--
-- A coluna é escrita pelo próprio dono (RLS de UPDATE por `auth.uid() =
-- user_id`). O app só grava um objeto pequeno — {v, apelido, motivos[],
-- familiaridade, meta_min, concluida_em}, algumas centenas de bytes —, mas
-- quem tem o token pode chamar a API direto e mandar qualquer JSON. Sem teto,
-- dava para encher o próprio perfil com megabytes, que depois viajam em toda
-- leitura do perfil e no painel do admin.
--
-- 2 KB é ~5x o objeto real. A coluna nasceu nesta mesma leva (20260926040000)
-- e todas as linhas atuais são NULL ou vieram do app, então a validação passa.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_jornada_formato' AND conrelid = 'public.profiles'::regclass
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_jornada_formato CHECK (
        jornada IS NULL OR (jsonb_typeof(jornada) = 'object' AND pg_column_size(jornada) <= 2048)
      );
  END IF;
END $$;
