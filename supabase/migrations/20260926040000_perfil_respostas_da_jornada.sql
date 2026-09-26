-- Respostas da JORNADA de boas-vindas (o onboarding conversado com o
-- Devocionalzeiro, no lugar do formulário de "criar conta").
--
-- O que já tinha casa continua na casa de sempre, para o admin e os relatórios
-- não mudarem: nome em `full_name`, origem em `referral_source`, WhatsApp em
-- `whatsapp_phone` / `whatsapp_country_code`.
--
-- O que é novo — por que a pessoa veio, quanto já conhece da Bíblia, a meta
-- diária — vai num JSON só, versionado por dentro (`v`). A jornada vai ganhar
-- e perder perguntas; uma coluna por pergunta viraria migração a cada ajuste
-- de roteiro.
--
-- Aditiva e anulável: contas existentes ficam com NULL e nada muda para elas.
-- A tabela já tem RLS por dono, e a coluna herda as mesmas políticas.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS jornada jsonb;

COMMENT ON COLUMN public.profiles.jornada IS
  'Respostas da jornada de boas-vindas: {v, apelido, motivos[], familiaridade, meta_min, concluida_em}.';
