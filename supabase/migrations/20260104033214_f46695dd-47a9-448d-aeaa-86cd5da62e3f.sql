-- Add WhatsApp notification fields to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS whatsapp_phone TEXT,
ADD COLUMN IF NOT EXISTS whatsapp_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS whatsapp_terms_accepted_at TIMESTAMP WITH TIME ZONE;