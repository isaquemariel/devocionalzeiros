-- Fix: Ensure cache tables have restrictive INSERT policies
-- Service role bypasses RLS, so edge functions will still be able to insert cache data

-- For chapter_explanations_cache
DROP POLICY IF EXISTS "Authenticated users can insert cache entries" ON chapter_explanations_cache;
DROP POLICY IF EXISTS "Service role only can insert cache" ON chapter_explanations_cache;

CREATE POLICY "Service role only can insert cache"
ON chapter_explanations_cache
FOR INSERT
WITH CHECK (false);

-- For quiz_questions_cache  
DROP POLICY IF EXISTS "Authenticated users can insert cache" ON quiz_questions_cache;
DROP POLICY IF EXISTS "Service role only can insert quiz cache" ON quiz_questions_cache;

CREATE POLICY "Service role only can insert quiz cache"
ON quiz_questions_cache
FOR INSERT
WITH CHECK (false);