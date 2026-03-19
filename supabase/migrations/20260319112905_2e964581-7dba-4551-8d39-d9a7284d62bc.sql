
-- Fix existing OAuth users that may not have a profile created
INSERT INTO public.profiles (user_id, full_name)
SELECT 
  u.id,
  COALESCE(
    u.raw_user_meta_data ->> 'full_name',
    u.raw_user_meta_data ->> 'name',
    NULL
  )
FROM auth.users u
LEFT JOIN public.profiles p ON p.user_id = u.id
WHERE p.id IS NULL
ON CONFLICT (user_id) DO NOTHING;
