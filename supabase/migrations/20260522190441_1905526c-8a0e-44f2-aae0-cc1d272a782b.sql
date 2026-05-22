
-- Enable RLS and add authenticated-only policies on realtime.messages.
-- Row-level access to broadcasted postgres_changes is still gated by the
-- source tables' own RLS (reading_progress, reading_schedule, etc.),
-- so this only prevents anonymous users from opening Realtime channels.

ALTER TABLE IF EXISTS realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can receive realtime messages" ON realtime.messages;
CREATE POLICY "Authenticated users can receive realtime messages"
ON realtime.messages
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Authenticated users can send realtime messages" ON realtime.messages;
CREATE POLICY "Authenticated users can send realtime messages"
ON realtime.messages
FOR INSERT
TO authenticated
WITH CHECK (true);
