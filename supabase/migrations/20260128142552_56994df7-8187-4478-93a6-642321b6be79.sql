-- Update admin_update_user_plan to set a marker for admin-assigned plans
CREATE OR REPLACE FUNCTION public.admin_update_user_plan(target_email text, new_plan_type text, new_status text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  target_user_id uuid;
BEGIN
  -- Only allow admins
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  -- Get the user_id from auth.users if exists
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE lower(email) = lower(trim(target_email));

  -- Update or insert authorized_purchase with user_id linkage
  -- For paid plans (not 'free'), set amount_paid = 1 as marker for admin-assigned
  INSERT INTO authorized_purchases (email, plan_type, status, user_id, amount_paid, updated_at)
  VALUES (
    lower(trim(target_email)), 
    new_plan_type, 
    new_status, 
    target_user_id,
    CASE WHEN new_plan_type NOT IN ('free', 'gratuito') THEN 1.00 ELSE 0 END,
    now()
  )
  ON CONFLICT (email) 
  DO UPDATE SET 
    plan_type = new_plan_type, 
    status = new_status, 
    user_id = COALESCE(authorized_purchases.user_id, target_user_id),
    amount_paid = CASE 
      WHEN new_plan_type NOT IN ('free', 'gratuito') AND COALESCE(authorized_purchases.amount_paid, 0) = 0 
      THEN 1.00 
      ELSE authorized_purchases.amount_paid 
    END,
    updated_at = now();

  RETURN true;
END;
$function$;