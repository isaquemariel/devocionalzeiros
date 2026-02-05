-- Add commission column if it doesn't exist
ALTER TABLE public.authorized_purchases 
ADD COLUMN IF NOT EXISTS commission numeric DEFAULT 0;

ALTER TABLE public.manual_sales 
ADD COLUMN IF NOT EXISTS commission numeric DEFAULT 0;