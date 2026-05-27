
-- 1) aulas_otp_codes: deny-all explícito para anon/authenticated (service role bypassa RLS)
CREATE POLICY "Deny all client access to aulas_otp_codes"
ON public.aulas_otp_codes
AS RESTRICTIVE
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- 2) aulas_sessions: deny-all explícito para anon/authenticated
CREATE POLICY "Deny all client access to aulas_sessions"
ON public.aulas_sessions
AS RESTRICTIVE
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- 3) authorized_purchases: consolida políticas conflitantes em uma única regra admin-only
DROP POLICY IF EXISTS "Admins can update authorized purchases" ON public.authorized_purchases;
DROP POLICY IF EXISTS "Deny client updates on authorized_purchases" ON public.authorized_purchases;
DROP POLICY IF EXISTS "Deny client inserts on authorized_purchases" ON public.authorized_purchases;
DROP POLICY IF EXISTS "Deny client deletes on authorized_purchases" ON public.authorized_purchases;

CREATE POLICY "Admins can insert authorized purchases"
ON public.authorized_purchases
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update authorized purchases"
ON public.authorized_purchases
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete authorized purchases"
ON public.authorized_purchases
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
