-- Allow authenticated users to read only their own purchase row
CREATE POLICY "Users can view their own purchase"
ON public.authorized_purchases
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Remove overly-broad realtime policies; keep only the user-scoped topic policies
DROP POLICY IF EXISTS "Authenticated users can receive realtime messages" ON realtime.messages;
DROP POLICY IF EXISTS "Authenticated users can send realtime messages" ON realtime.messages;
