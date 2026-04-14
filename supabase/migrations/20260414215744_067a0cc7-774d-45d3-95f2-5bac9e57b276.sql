
-- Function to mirror project transaction updates
CREATE OR REPLACE FUNCTION public.mirror_project_tx_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  project_name TEXT;
BEGIN
  SELECT name INTO project_name FROM financial_projects WHERE id = NEW.project_id;
  
  UPDATE financial_transactions
  SET 
    type = NEW.type,
    amount = NEW.amount,
    description = COALESCE(project_name || ': ', '') || NEW.description,
    category = NEW.category,
    date = NEW.date,
    updated_at = now()
  WHERE notes = 'Espelho automático de projeto (ID: ' || OLD.id || ')'
    AND user_id = OLD.user_id;
  
  RETURN NEW;
END;
$$;

-- Create trigger for UPDATE
CREATE TRIGGER mirror_project_tx_on_update
  AFTER UPDATE ON financial_project_transactions
  FOR EACH ROW
  EXECUTE FUNCTION mirror_project_tx_update();
