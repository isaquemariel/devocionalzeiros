
CREATE OR REPLACE FUNCTION public.get_user_plan_type(email_input text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  plan_result text;
  user_status text;
  amount_result numeric;
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
  SELECT ap.plan_type, ap.status, COALESCE(ap.amount_paid, 0)
  INTO plan_result, user_status, amount_result
  FROM public.authorized_purchases ap
  WHERE lower(ap.email) = lower(email_input)
  ORDER BY ap.updated_at DESC
  LIMIT 1;
  
  -- If user has an inactive purchase, return 'inactive' to trigger logout
  IF user_status = 'inactive' THEN
    RETURN 'inactive';
  END IF;
  
  -- If no purchase found at all = free user
  IF plan_result IS NULL THEN
    RETURN 'free';
  END IF;
  
  -- Handle legacy 'gratuito' values -> free
  IF plan_result = 'gratuito' THEN
    RETURN 'free';
  END IF;

  -- Handle legacy 'start' plan:
  -- If start with no payment (amount_paid = 0) -> free
  -- If start with payment (amount_paid > 0) -> keep as 'gold' (upgrade legacy paid START to GOLD)
  IF plan_result = 'start' THEN
    IF amount_result > 0 THEN
      RETURN 'gold';
    ELSE
      RETURN 'free';
    END IF;
  END IF;

  -- Handle 'free' or 'none' explicitly
  IF plan_result IN ('free', 'none') THEN
    RETURN 'free';
  END IF;
  
  -- gold, premium, embaixador -> return as-is
  RETURN plan_result;
END;
$function$;
