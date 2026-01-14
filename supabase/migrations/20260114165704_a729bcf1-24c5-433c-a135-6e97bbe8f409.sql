-- Add admin-only UPDATE policy to authorized_purchases table
-- This ensures only admins can update sensitive purchase data (phone, CPF, etc.)
CREATE POLICY "Admins can update authorized purchases"
ON public.authorized_purchases
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));