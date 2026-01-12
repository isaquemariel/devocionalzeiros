-- Restore the check_email_authorized function to properly verify purchases
CREATE OR REPLACE FUNCTION public.check_email_authorized(email_input text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS(
    SELECT 1 FROM public.authorized_purchases 
    WHERE email = lower(trim(email_input)) 
    AND status = 'active'
  );
END;
$$;