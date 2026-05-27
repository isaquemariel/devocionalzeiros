-- Explicit SELECT policy for aulas_admins (admin-only)
CREATE POLICY "Only admins can view aulas_admins"
ON public.aulas_admins
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Explicit owner-scoped SELECT policy for rotina_google_calendar
CREATE POLICY "Users view own google calendar"
ON public.rotina_google_calendar
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);