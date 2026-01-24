-- Create table to track claimed achievements
CREATE TABLE public.achievement_claims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_id TEXT NOT NULL,
  points_awarded INTEGER NOT NULL DEFAULT 0,
  claimed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_achievement UNIQUE (user_id, achievement_id)
);

-- Enable Row Level Security
ALTER TABLE public.achievement_claims ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own achievement claims" 
ON public.achievement_claims 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can claim their own achievements" 
ON public.achievement_claims 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_achievement_claims_user_id ON public.achievement_claims (user_id);