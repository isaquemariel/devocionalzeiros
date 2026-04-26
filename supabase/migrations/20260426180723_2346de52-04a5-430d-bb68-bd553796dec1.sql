-- Allow users to update their own daily usage counters
CREATE POLICY "Users can update own usage"
ON public.daily_usage_limits
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow admins to view all authorized purchases for operational/support tasks
CREATE POLICY "Admins can view all authorized purchases"
ON public.authorized_purchases
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));