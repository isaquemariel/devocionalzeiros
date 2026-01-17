-- Drop remaining overly permissive INSERT policies on cache tables
DROP POLICY IF EXISTS "Authenticated users can insert verse studies cache" ON public.verse_studies_cache;
DROP POLICY IF EXISTS "Authenticated users can insert cached devotionals" ON public.verse_devotionals_cache;

-- Recreate with restrictive policies (service role bypasses RLS)
CREATE POLICY "Service role only can insert verse studies cache"
ON public.verse_studies_cache
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Service role only can insert cached devotionals"
ON public.verse_devotionals_cache
FOR INSERT
WITH CHECK (false);

-- Fix whatsapp_reminders_sent overly permissive ALL policy
DROP POLICY IF EXISTS "Service role can manage reminders" ON public.whatsapp_reminders_sent;