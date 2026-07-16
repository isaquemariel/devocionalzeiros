-- Security fix (H2): rotina_google_calendar stores Google OAuth access_token and
-- refresh_token in plaintext. A later migration (20260527172131) re-introduced an
-- owner-scoped SELECT policy, and 20260522185901 re-added INSERT/UPDATE/DELETE
-- policies, which together let the anon-key browser client read and write these
-- long-lived tokens directly. Any XSS or leaked session could then exfiltrate a
-- Google refresh token and gain persistent access to the victim's calendar.
--
-- The client never queries this table directly (only the service_role edge
-- functions do, and they bypass RLS). Non-sensitive status is available via the
-- rotina_google_calendar_status view. Restore the original lockdown
-- (20260519221716): remove ALL client policies so only service_role can access
-- rows. RLS stays enabled, so with no policies authenticated/anon callers get
-- nothing.

ALTER TABLE public.rotina_google_calendar ENABLE ROW LEVEL SECURITY;

-- Drop every client-facing policy this table has accumulated across migrations.
DROP POLICY IF EXISTS "Users view own google calendar" ON public.rotina_google_calendar;
DROP POLICY IF EXISTS "Users select own google calendar" ON public.rotina_google_calendar;
DROP POLICY IF EXISTS "Users insert own google calendar" ON public.rotina_google_calendar;
DROP POLICY IF EXISTS "Users update own google calendar" ON public.rotina_google_calendar;
DROP POLICY IF EXISTS "Users delete own google calendar" ON public.rotina_google_calendar;
DROP POLICY IF EXISTS "Users manage own google calendar" ON public.rotina_google_calendar;
DROP POLICY IF EXISTS "Users can view own gcal" ON public.rotina_google_calendar;
DROP POLICY IF EXISTS "Users can update own gcal" ON public.rotina_google_calendar;
DROP POLICY IF EXISTS "Users can insert own gcal" ON public.rotina_google_calendar;
DROP POLICY IF EXISTS "Users can delete own gcal" ON public.rotina_google_calendar;

COMMENT ON TABLE public.rotina_google_calendar IS 'Stores Google OAuth tokens (access_token, refresh_token). Access restricted to service_role only (edge functions). Client SDK cannot read or modify rows; non-sensitive status is exposed via the rotina_google_calendar_status view.';
