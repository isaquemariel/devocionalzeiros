-- Update get_user_plan_type to properly handle inactive users
CREATE OR REPLACE FUNCTION public.get_user_plan_type(email_input text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  plan_result text;
  user_status text;
  requesting_user_email text;
BEGIN
  -- Get the email of the requesting user from auth
  SELECT email INTO requesting_user_email 
  FROM auth.users 
  WHERE id = auth.uid();
  
  -- Only allow users to check their own plan type
  IF requesting_user_email IS NULL OR lower(requesting_user_email) != lower(email_input) THEN
    RETURN NULL;
  END IF;

  -- Special case: devocionalzeiros@gmail.com is always admin
  IF lower(email_input) = 'devocionalzeiros@gmail.com' THEN
    RETURN 'admin';
  END IF;

  -- Check for any purchase (active or inactive)
  SELECT ap.plan_type, ap.status INTO plan_result, user_status
  FROM public.authorized_purchases ap
  WHERE lower(ap.email) = lower(email_input)
  ORDER BY ap.updated_at DESC
  LIMIT 1;
  
  -- If user has an inactive purchase, return 'inactive' to trigger logout
  IF user_status = 'inactive' THEN
    RETURN 'inactive';
  END IF;
  
  -- If no purchase found at all, check if user is legacy (allow start access)
  IF plan_result IS NULL THEN
    RETURN 'start';
  END IF;
  
  -- Handle legacy 'gratuito' values - return 'start' instead
  IF plan_result = 'gratuito' THEN
    RETURN 'start';
  END IF;
  
  RETURN plan_result;
END;
$$;