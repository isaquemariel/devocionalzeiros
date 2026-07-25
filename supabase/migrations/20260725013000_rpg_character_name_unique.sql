-- ============================================================================
-- Nome de personagem do RPG: único (case-insensitive) + validação server-side.
-- ----------------------------------------------------------------------------
-- Antes o app checava disponibilidade só contra uma lista fixa (nunca o banco),
-- deixando nomes repetidos. Aqui:
--   1) Resolvemos duplicados existentes: mantém o mais ANTIGO com o nome e zera
--      os demais (essas contas voltam ao onboarding pra escolher outro nome).
--   2) Índice único case-insensitive em character_name.
--   3) RPC is_character_name_available() (SECURITY DEFINER) pra o cliente checar.
-- ============================================================================

-- 1) Dedupe: mantém o registro mais antigo por nome; zera os repetidos.
WITH ranked AS (
  SELECT id,
         row_number() OVER (
           PARTITION BY lower(btrim(character_name))
           ORDER BY created_at ASC, id ASC
         ) AS rn
  FROM public.rpg_user_stats
  WHERE character_name IS NOT NULL AND btrim(character_name) <> ''
)
UPDATE public.rpg_user_stats s
SET character_name = NULL
FROM ranked r
WHERE s.id = r.id AND r.rn > 1;

-- 2) Índice único case-insensitive (ignora nulos/vazios).
CREATE UNIQUE INDEX IF NOT EXISTS idx_rpg_user_stats_character_name_unique
  ON public.rpg_user_stats (lower(btrim(character_name)))
  WHERE character_name IS NOT NULL AND btrim(character_name) <> '';

-- 3) RPC de disponibilidade — roda como SECURITY DEFINER pra enxergar todos os
--    nomes (a RLS só deixa o usuário ver a própria linha). exclude_user permite
--    o dono reconfirmar o próprio nome.
CREATE OR REPLACE FUNCTION public.is_character_name_available(
  name_input text,
  exclude_user uuid DEFAULT NULL
)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1
    FROM public.rpg_user_stats
    WHERE lower(btrim(character_name)) = lower(btrim(name_input))
      AND (exclude_user IS NULL OR user_id <> exclude_user)
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_character_name_available(text, uuid) TO anon, authenticated;
