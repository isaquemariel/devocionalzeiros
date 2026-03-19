
-- Create the trigger that auto-creates a profile for every new user (including OAuth/Google)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  user_email text;
BEGIN
  -- Create profile (use full_name from OAuth metadata if available)
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    new.id,
    COALESCE(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      NULL
    )
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- Get user email
  user_email := lower(trim(new.email));

  -- Link authorized_purchase to user_id if email already exists
  UPDATE public.authorized_purchases
  SET user_id = new.id, updated_at = now()
  WHERE lower(email) = user_email AND user_id IS NULL;

  RETURN new;
END;
$$;

-- Attach trigger to auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
