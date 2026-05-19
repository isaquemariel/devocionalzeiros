
-- Lock down rotina_google_calendar OAuth tokens: remove client-side policies so only service_role can access tokens
DROP POLICY IF EXISTS "Users can view own gcal" ON public.rotina_google_calendar;
DROP POLICY IF EXISTS "Users can update own gcal" ON public.rotina_google_calendar;
DROP POLICY IF EXISTS "Users can insert own gcal" ON public.rotina_google_calendar;
DROP POLICY IF EXISTS "Users can delete own gcal" ON public.rotina_google_calendar;

COMMENT ON TABLE public.rotina_google_calendar IS 'Stores Google OAuth tokens. Access restricted to service_role only (edge functions). Client SDK cannot read or modify rows.';

-- Document that whatsapp_reminders_sent INSERTs happen only via service_role edge functions
COMMENT ON TABLE public.whatsapp_reminders_sent IS 'Insert-only via service_role edge functions (daily-whatsapp-reminders). Users have SELECT/DELETE access to their own rows; no client INSERT policy by design.';
