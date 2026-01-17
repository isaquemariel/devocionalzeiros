-- Add missing UPDATE policy for saved_sermons table
CREATE POLICY "Users can update their own sermons"
ON public.saved_sermons
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);