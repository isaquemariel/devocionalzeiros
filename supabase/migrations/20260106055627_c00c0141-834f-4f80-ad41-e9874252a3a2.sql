-- Fix cache pollution vulnerability: Restrict INSERT to service role only
-- Edge functions use service role which bypasses RLS, so this blocks direct user writes

-- Drop existing permissive INSERT policies
DROP POLICY IF EXISTS "Authenticated users can insert cache entries" ON chapter_explanations_cache;
DROP POLICY IF EXISTS "Authenticated users can insert cache" ON quiz_questions_cache;

-- Create restrictive policies that block all INSERT via RLS
-- Service role bypasses RLS so edge functions will still work
CREATE POLICY "Service role only can insert cache"
ON chapter_explanations_cache
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Service role only can insert quiz cache"
ON quiz_questions_cache
FOR INSERT
WITH CHECK (false);