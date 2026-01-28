-- Fix profiles_phone_exposure: Consolidate duplicate phone fields
-- Migrate data from whatsapp_number to whatsapp_phone if whatsapp_phone is null
UPDATE public.profiles 
SET whatsapp_phone = whatsapp_number 
WHERE whatsapp_phone IS NULL AND whatsapp_number IS NOT NULL;

-- Drop the redundant whatsapp_number column to reduce attack surface
ALTER TABLE public.profiles DROP COLUMN IF EXISTS whatsapp_number;