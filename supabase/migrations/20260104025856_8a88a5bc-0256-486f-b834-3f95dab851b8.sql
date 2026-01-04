-- Create devotional_completions table to track completed devotionals
CREATE TABLE public.devotional_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  devotional_date DATE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  UNIQUE(user_id, devotional_date)
);

-- Enable Row Level Security
ALTER TABLE public.devotional_completions ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own devotional completions" 
ON public.devotional_completions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own devotional completions" 
ON public.devotional_completions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own devotional completions" 
ON public.devotional_completions 
FOR DELETE 
USING (auth.uid() = user_id);