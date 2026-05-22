-- Tighten realtime.messages RLS so only the owner of a "user:<uid>" topic can subscribe/send
DROP POLICY IF EXISTS "Allow authenticated users to read messages" ON realtime.messages;
DROP POLICY IF EXISTS "Allow authenticated users to send messages" ON realtime.messages;
DROP POLICY IF EXISTS "authenticated can read messages" ON realtime.messages;
DROP POLICY IF EXISTS "authenticated can send messages" ON realtime.messages;
DROP POLICY IF EXISTS "Authenticated users can read messages" ON realtime.messages;
DROP POLICY IF EXISTS "Authenticated users can send messages" ON realtime.messages;

-- SELECT: only allow reading messages whose topic is scoped to the calling user
CREATE POLICY "Users read own-topic realtime messages"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  realtime.topic() = 'user:' || auth.uid()::text
);

-- INSERT: only allow sending messages on channels scoped to the calling user
CREATE POLICY "Users send own-topic realtime messages"
ON realtime.messages
FOR INSERT
TO authenticated
WITH CHECK (
  realtime.topic() = 'user:' || auth.uid()::text
);
