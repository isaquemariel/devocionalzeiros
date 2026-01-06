-- ============================================
-- SECURITY HARDENING: Comprehensive RLS Policies
-- ============================================

-- 1. PROFILES TABLE - Block anonymous access and add missing policies
-- Drop existing policies to recreate with better security
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Recreate with explicit authenticated user check
CREATE POLICY "Authenticated users can view own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Add DELETE policy for LGPD/GDPR compliance
CREATE POLICY "Authenticated users can delete own profile" 
ON public.profiles 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- 2. CHAT_MESSAGES TABLE - Add missing UPDATE/DELETE policies
DROP POLICY IF EXISTS "Users can update own messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can delete own messages" ON public.chat_messages;

CREATE POLICY "Users can update own messages" 
ON public.chat_messages 
FOR UPDATE 
TO authenticated
USING (
  conversation_id IN (
    SELECT id FROM public.chat_conversations WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  conversation_id IN (
    SELECT id FROM public.chat_conversations WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete own messages" 
ON public.chat_messages 
FOR DELETE 
TO authenticated
USING (
  conversation_id IN (
    SELECT id FROM public.chat_conversations WHERE user_id = auth.uid()
  )
);

-- 3. RANKING_NOTIFICATIONS TABLE - Add UPDATE/DELETE policies
DROP POLICY IF EXISTS "Users can update own ranking notifications" ON public.ranking_notifications;
DROP POLICY IF EXISTS "Users can delete own ranking notifications" ON public.ranking_notifications;

CREATE POLICY "Users can update own ranking notifications" 
ON public.ranking_notifications 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own ranking notifications" 
ON public.ranking_notifications 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- 4. DAILY_LOGINS TABLE - Add DELETE policy for privacy compliance
DROP POLICY IF EXISTS "Users can delete own login history" ON public.daily_logins;

CREATE POLICY "Users can delete own login history" 
ON public.daily_logins 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- 5. CHAT_CONVERSATIONS TABLE - Add DELETE policy
DROP POLICY IF EXISTS "Users can delete own conversations" ON public.chat_conversations;

CREATE POLICY "Users can delete own conversations" 
ON public.chat_conversations 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- 6. READING_PROGRESS TABLE - Add DELETE policy for privacy compliance
DROP POLICY IF EXISTS "Users can delete own reading progress" ON public.reading_progress;

CREATE POLICY "Users can delete own reading progress" 
ON public.reading_progress 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- 7. READING_SCHEDULE TABLE - Add DELETE policy
DROP POLICY IF EXISTS "Users can delete own schedule" ON public.reading_schedule;

CREATE POLICY "Users can delete own schedule" 
ON public.reading_schedule 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- 8. DEVOTIONAL_COMPLETIONS TABLE - Add DELETE policy
DROP POLICY IF EXISTS "Users can delete own devotional completions" ON public.devotional_completions;

CREATE POLICY "Users can delete own devotional completions" 
ON public.devotional_completions 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- 9. QUIZ_ATTEMPTS TABLE - Add DELETE policy
DROP POLICY IF EXISTS "Users can delete own quiz attempts" ON public.quiz_attempts;

CREATE POLICY "Users can delete own quiz attempts" 
ON public.quiz_attempts 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- 10. SAVED_SERMONS TABLE - Add missing policies
DROP POLICY IF EXISTS "Users can delete own sermons" ON public.saved_sermons;

CREATE POLICY "Users can delete own sermons" 
ON public.saved_sermons 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- 11. WHATSAPP_REMINDERS_SENT TABLE - Add DELETE policy
DROP POLICY IF EXISTS "Users can delete own whatsapp reminders" ON public.whatsapp_reminders_sent;

CREATE POLICY "Users can delete own whatsapp reminders" 
ON public.whatsapp_reminders_sent 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);