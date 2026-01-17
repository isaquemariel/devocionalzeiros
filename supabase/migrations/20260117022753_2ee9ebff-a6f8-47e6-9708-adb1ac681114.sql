-- Fix overly permissive INSERT policies on cache tables
-- Drop existing permissive INSERT policies
DROP POLICY IF EXISTS "Authenticated users can insert verse studies" ON public.verse_studies_cache;
DROP POLICY IF EXISTS "Anyone can insert verse studies" ON public.verse_studies_cache;
DROP POLICY IF EXISTS "Authenticated users can insert verse devotionals" ON public.verse_devotionals_cache;
DROP POLICY IF EXISTS "Anyone can insert verse devotionals" ON public.verse_devotionals_cache;

-- Create restrictive INSERT policies (service role only via edge functions)
CREATE POLICY "Service role only can insert verse studies"
ON public.verse_studies_cache
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Service role only can insert verse devotionals"
ON public.verse_devotionals_cache
FOR INSERT
WITH CHECK (false);

-- Fix whatsapp_reminders_sent table policies if overly permissive
DROP POLICY IF EXISTS "Service role has full access" ON public.whatsapp_reminders_sent;

-- Create proper policies for whatsapp_reminders_sent
CREATE POLICY "Users can view their own reminders"
ON public.whatsapp_reminders_sent
FOR SELECT
USING (auth.uid() = user_id);

-- Service role will bypass RLS for inserts (edge functions)

-- Ensure authorized_purchases rejects NULL user_id access
DROP POLICY IF EXISTS "Users can view their own purchase by user_id" ON public.authorized_purchases;

CREATE POLICY "Users can view their own purchase by user_id"
ON public.authorized_purchases
FOR SELECT
TO authenticated
USING (user_id IS NOT NULL AND user_id = auth.uid());