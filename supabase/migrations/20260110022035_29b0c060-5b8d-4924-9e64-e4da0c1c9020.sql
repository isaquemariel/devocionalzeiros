-- Update the get_user_plan_type function to return 'gratuito' for users without a purchase
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

  -- Check for active purchase
  SELECT ap.plan_type INTO plan_result
  FROM public.authorized_purchases ap
  WHERE lower(ap.email) = lower(email_input)
    AND ap.status = 'active'
  ORDER BY ap.created_at DESC
  LIMIT 1;
  
  -- If no active purchase found, return 'gratuito'
  IF plan_result IS NULL THEN
    RETURN 'gratuito';
  END IF;
  
  RETURN plan_result;
END;
$$;

-- Update check_email_authorized to always return true (allow any email to register)
CREATE OR REPLACE FUNCTION public.check_email_authorized(email_input text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Allow any email to register (free tier)
  RETURN true;
END;
$$;

-- Add whatsapp_number column to profiles if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'whatsapp_number'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN whatsapp_number text;
  END IF;
END $$;