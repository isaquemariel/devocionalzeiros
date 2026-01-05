-- Add UPDATE policy for devotional_completions
CREATE POLICY "Users can update their own devotional completions"
ON public.devotional_completions FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);