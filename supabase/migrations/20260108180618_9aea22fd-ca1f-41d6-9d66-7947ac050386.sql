-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Service role can manage metrics backup" ON public.admin_metrics_backup;

-- Create admin-only policies for insert/update/delete
CREATE POLICY "Admins can insert metrics backup"
ON public.admin_metrics_backup
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update metrics backup"
ON public.admin_metrics_backup
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete metrics backup"
ON public.admin_metrics_backup
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));