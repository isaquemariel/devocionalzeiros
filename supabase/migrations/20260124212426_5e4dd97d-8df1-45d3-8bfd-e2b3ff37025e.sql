-- Fix: Restrict monthly_ranking_history to only allow users to view their own ranking data
-- or authenticated users to view anonymized top rankings

-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Monthly ranking history is viewable by everyone" ON public.monthly_ranking_history;

-- Create a more restrictive policy: Users can only view their own history
CREATE POLICY "Users can view their own ranking history"
ON public.monthly_ranking_history
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Optional: Allow reading top 3 rankings for anyone (for the champions display feature)
-- The get_previous_month_champions function already handles this with SECURITY DEFINER