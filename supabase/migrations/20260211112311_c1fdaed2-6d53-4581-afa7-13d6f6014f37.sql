
-- Fix: When a user disables show_in_rankings, anonymize their historical ranking data
CREATE OR REPLACE FUNCTION public.anonymize_ranking_on_opt_out()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- If user changed show_in_rankings from true to false, anonymize their history
  IF OLD.show_in_rankings = true AND NEW.show_in_rankings = false THEN
    UPDATE monthly_ranking_history
    SET full_name = 'Usuário Anônimo', avatar_url = NULL
    WHERE user_id = NEW.user_id;
  END IF;
  
  -- If user changed show_in_rankings from false to true, restore their name
  IF OLD.show_in_rankings = false AND NEW.show_in_rankings = true THEN
    UPDATE monthly_ranking_history
    SET full_name = NEW.full_name, avatar_url = NEW.avatar_url
    WHERE user_id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger on profiles table
CREATE TRIGGER trigger_anonymize_ranking_on_opt_out
AFTER UPDATE OF show_in_rankings ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.anonymize_ranking_on_opt_out();

-- Fix: Add data retention - delete WhatsApp reminder logs older than 90 days
CREATE OR REPLACE FUNCTION public.cleanup_old_whatsapp_reminders()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM whatsapp_reminders_sent
  WHERE sent_date < CURRENT_DATE - INTERVAL '90 days';
END;
$$;
