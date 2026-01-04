-- Create table to track sent WhatsApp reminders
CREATE TABLE public.whatsapp_reminders_sent (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  sent_date date NOT NULL DEFAULT CURRENT_DATE,
  sent_at timestamp with time zone NOT NULL DEFAULT now(),
  message_index integer NOT NULL,
  UNIQUE(user_id, sent_date)
);

-- Enable RLS
ALTER TABLE public.whatsapp_reminders_sent ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access (edge function uses service role key)
CREATE POLICY "Service role can manage reminders"
ON public.whatsapp_reminders_sent
FOR ALL
USING (true)
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_whatsapp_reminders_sent_date ON public.whatsapp_reminders_sent(sent_date);
CREATE INDEX idx_whatsapp_reminders_user_date ON public.whatsapp_reminders_sent(user_id, sent_date);