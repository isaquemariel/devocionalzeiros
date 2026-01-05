-- Create table for saved sermons
CREATE TABLE public.saved_sermons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  theme TEXT NOT NULL,
  sermon_type TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.saved_sermons ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own sermons" 
ON public.saved_sermons 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sermons" 
ON public.saved_sermons 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sermons" 
ON public.saved_sermons 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_saved_sermons_user_id ON public.saved_sermons(user_id);
CREATE INDEX idx_saved_sermons_created_at ON public.saved_sermons(created_at DESC);