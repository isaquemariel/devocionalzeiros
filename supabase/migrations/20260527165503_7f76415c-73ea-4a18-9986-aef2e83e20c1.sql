
-- Create user notifications table
CREATE TABLE public.user_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  body text,
  link text,
  metadata jsonb,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_notifications_user_unread ON public.user_notifications(user_id, is_read, created_at DESC);

GRANT SELECT, UPDATE, DELETE ON public.user_notifications TO authenticated;
GRANT ALL ON public.user_notifications TO service_role;

ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own notifications"
  ON public.user_notifications FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users update own notifications"
  ON public.user_notifications FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own notifications"
  ON public.user_notifications FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Realtime
ALTER TABLE public.user_notifications REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_notifications;

-- Trigger: notify post owner when someone replies to their community post
CREATE OR REPLACE FUNCTION public.notify_community_reply()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_post_owner uuid;
  v_post_type text;
  v_replier_name text;
  v_title text;
BEGIN
  SELECT user_id, post_type INTO v_post_owner, v_post_type
  FROM public.community_posts
  WHERE id = NEW.post_id;

  IF v_post_owner IS NULL OR v_post_owner = NEW.user_id THEN
    RETURN NEW;
  END IF;

  SELECT COALESCE(full_name, 'Alguém') INTO v_replier_name
  FROM public.profiles
  WHERE user_id = NEW.user_id;

  IF v_post_type = 'prayer' THEN
    v_title := v_replier_name || ' respondeu seu pedido de oração';
  ELSE
    v_title := v_replier_name || ' respondeu sua publicação';
  END IF;

  INSERT INTO public.user_notifications (user_id, type, title, body, link, metadata)
  VALUES (
    v_post_owner,
    'community_reply',
    v_title,
    LEFT(NEW.content, 140),
    '/comunidade?post=' || NEW.post_id,
    jsonb_build_object('post_id', NEW.post_id, 'reply_id', NEW.id, 'replier_id', NEW.user_id)
  );

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_notify_community_reply
AFTER INSERT ON public.community_replies
FOR EACH ROW EXECUTE FUNCTION public.notify_community_reply();

-- Function callable by admins (via SECURITY DEFINER) to broadcast in-app notification
CREATE OR REPLACE FUNCTION public.broadcast_admin_notification(
  p_title text,
  p_body text,
  p_link text
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  INSERT INTO public.user_notifications (user_id, type, title, body, link)
  SELECT p.user_id, 'admin_broadcast', p_title, p_body, COALESCE(p_link, '/home')
  FROM public.profiles p
  WHERE p.user_id IS NOT NULL;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.broadcast_admin_notification(text, text, text) TO authenticated;
