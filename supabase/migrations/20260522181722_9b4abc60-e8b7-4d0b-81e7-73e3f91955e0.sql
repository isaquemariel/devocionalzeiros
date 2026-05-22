ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_reading_plan_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_reading_plan_check
  CHECK (reading_plan = ANY (ARRAY['nt60'::text, 'at90'::text, '90'::text, '184'::text, '365'::text, 'cronologico365'::text, 'custom'::text]));