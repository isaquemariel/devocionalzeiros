-- Remove the old check constraint and allow new plan types
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_reading_plan_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_reading_plan_check CHECK (reading_plan IN ('nt60', 'at90', '90', '184', '365', 'custom'));