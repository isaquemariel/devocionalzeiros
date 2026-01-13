-- Add referral source column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS referral_source TEXT;

-- Create index for analytics queries
CREATE INDEX IF NOT EXISTS idx_profiles_referral_source ON public.profiles(referral_source);

-- Add comment for documentation
COMMENT ON COLUMN public.profiles.referral_source IS 'Where the user discovered the app: Instagram, Threads, Tiktok, Kwai, Anúncios, Indicação';