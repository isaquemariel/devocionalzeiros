-- Create a view for user rankings based on reading progress
CREATE OR REPLACE VIEW public.user_rankings AS
SELECT 
  rp.user_id,
  p.full_name,
  COUNT(DISTINCT rp.id) as chapters_read,
  COALESCE(SUM(rp.reading_time_minutes), 0) as total_reading_time,
  COUNT(DISTINCT DATE(rp.completed_at)) as active_days,
  MAX(rp.completed_at) as last_activity,
  ROW_NUMBER() OVER (ORDER BY COUNT(DISTINCT rp.id) DESC, COALESCE(SUM(rp.reading_time_minutes), 0) DESC) as rank
FROM public.reading_progress rp
LEFT JOIN public.profiles p ON rp.user_id = p.user_id
GROUP BY rp.user_id, p.full_name;

-- Create a table to track ranking notifications (to avoid duplicate notifications)
CREATE TABLE public.ranking_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  rank_achieved INTEGER NOT NULL,
  notified_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ranking_notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for ranking_notifications
CREATE POLICY "Users can view their own notifications" 
ON public.ranking_notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notifications" 
ON public.ranking_notifications 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Enable realtime for reading_progress to listen for ranking changes
ALTER PUBLICATION supabase_realtime ADD TABLE public.reading_progress;