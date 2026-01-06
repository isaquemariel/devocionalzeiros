-- Fix PUBLIC_DATA_EXPOSURE: authorized_purchases table public access
-- This migration restricts access to authorized_purchases and creates secure RPC for signup checks

-- 1. Create a secure RPC function that only returns boolean (no data exposure)
-- This will be used during signup to check if an email is authorized
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

-- 2. Create a secure RPC function that returns plan type for authenticated users
-- This is used by useUserPlan.ts to get the user's plan after login
CREATE OR REPLACE FUNCTION public.get_user_plan_type(email_input text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  plan text;
BEGIN
  -- Only allow users to query their own email (verified via JWT)
  IF lower(trim(email_input)) != lower(trim(auth.jwt()->>'email')) THEN
    RETURN NULL;
  END IF;
  
  SELECT plan_type INTO plan
  FROM public.authorized_purchases 
  WHERE email = lower(trim(email_input)) 
  AND status = 'active'
  LIMIT 1;
  
  RETURN plan;
END;
$$;

-- 3. Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can check if email is authorized" ON public.authorized_purchases;

-- 4. Create a restricted policy for authenticated users to view their own purchase data
CREATE POLICY "Users can view their own purchase"
ON public.authorized_purchases
FOR SELECT
TO authenticated
USING (
  email = lower(trim(auth.jwt()->>'email'))
);