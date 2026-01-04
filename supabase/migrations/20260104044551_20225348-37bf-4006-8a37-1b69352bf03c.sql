-- Add UPDATE policy for reading_progress table
-- This allows users to update their own reading progress records (e.g., reading time)
CREATE POLICY "Users can update their own progress"
ON public.reading_progress FOR UPDATE
USING (auth.uid() = user_id);