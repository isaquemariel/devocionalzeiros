ALTER TABLE public.rotina_notes 
ADD COLUMN IF NOT EXISTS note_date date NOT NULL DEFAULT (now() AT TIME ZONE 'America/Sao_Paulo')::date,
ADD COLUMN IF NOT EXISTS location text;