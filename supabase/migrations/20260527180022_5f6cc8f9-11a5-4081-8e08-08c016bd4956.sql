CREATE TABLE public.kiwify_webhook_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  received_at timestamp with time zone NOT NULL DEFAULT now(),
  event_type text,
  email text,
  product_id text,
  product_name text,
  amount_paid numeric,
  status text NOT NULL DEFAULT 'received',
  error_message text,
  token_match boolean,
  token_source text,
  raw_payload jsonb,
  processed_at timestamp with time zone
);

CREATE INDEX idx_kiwify_webhook_log_received_at ON public.kiwify_webhook_log (received_at DESC);
CREATE INDEX idx_kiwify_webhook_log_email ON public.kiwify_webhook_log (email);
CREATE INDEX idx_kiwify_webhook_log_status ON public.kiwify_webhook_log (status);

GRANT SELECT ON public.kiwify_webhook_log TO authenticated;
GRANT ALL ON public.kiwify_webhook_log TO service_role;

ALTER TABLE public.kiwify_webhook_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view webhook log"
ON public.kiwify_webhook_log
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));