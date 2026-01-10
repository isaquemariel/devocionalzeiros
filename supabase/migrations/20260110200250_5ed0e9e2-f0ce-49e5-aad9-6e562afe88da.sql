-- Update get_user_plan_type to return 'start' instead of 'gratuito' for free users
CREATE OR REPLACE FUNCTION public.get_user_plan_type(email_input text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  plan_result text;
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

  -- Check for active purchase
  SELECT ap.plan_type INTO plan_result
  FROM public.authorized_purchases ap
  WHERE lower(ap.email) = lower(email_input)
    AND ap.status = 'active'
  ORDER BY ap.created_at DESC
  LIMIT 1;
  
  -- If no active purchase found, return 'start' (free tier)
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