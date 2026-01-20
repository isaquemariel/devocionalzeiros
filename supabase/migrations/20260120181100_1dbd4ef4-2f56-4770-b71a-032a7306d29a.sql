-- Add column to track last celebrated plan for upgrade celebration modal
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_celebrated_plan text;