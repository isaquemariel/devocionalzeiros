-- Add user_id column to authorized_purchases (nullable because it's set after registration)
ALTER TABLE public.authorized_purchases 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_authorized_purchases_user_id ON public.authorized_purchases(user_id);

-- Drop the old email-based policy
DROP POLICY IF EXISTS "Users can view their own purchase" ON public.authorized_purchases;

-- Create new policy using user_id (more secure)
CREATE POLICY "Users can view their own purchase by user_id"
ON public.authorized_purchases
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Update handle_new_user function to also link authorized_purchases
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_email text;
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  
  -- Get user email
  user_email := lower(trim(new.email));
  
  -- Link authorized_purchase to user_id
  UPDATE public.authorized_purchases
  SET user_id = new.id, updated_at = now()
  WHERE email = user_email AND user_id IS NULL;
  
  RETURN new;
END;
$$;

-- Backfill existing users: link authorized_purchases to existing users by email
UPDATE public.authorized_purchases ap
SET user_id = u.id, updated_at = now()
FROM auth.users u
WHERE lower(trim(ap.email)) = lower(trim(u.email))
AND ap.user_id IS NULL;