
-- Function to mirror project transactions to financial_transactions on INSERT
CREATE OR REPLACE FUNCTION public.mirror_project_tx_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  project_name TEXT;
BEGIN
  -- Get project name
  SELECT name INTO project_name FROM financial_projects WHERE id = NEW.project_id;
  
  -- Insert mirror into financial_transactions
  INSERT INTO financial_transactions (user_id, type, amount, description, category, date, is_recurring, notes)
  VALUES (
    NEW.user_id,
    NEW.type,
    NEW.amount,
    COALESCE(project_name || ': ', '') || NEW.description,
    NEW.category,
    NEW.date,
    false,
    'Espelho automático de projeto (ID: ' || NEW.id || ')'
  );
  
  RETURN NEW;
END;
$$;

-- Function to remove mirrored transaction on DELETE
CREATE OR REPLACE FUNCTION public.mirror_project_tx_delete()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Delete the mirrored transaction by matching the notes with the project tx ID
  DELETE FROM financial_transactions 
  WHERE notes = 'Espelho automático de projeto (ID: ' || OLD.id || ')'
    AND user_id = OLD.user_id;
  
  RETURN OLD;
END;
$$;

-- Create triggers
CREATE TRIGGER mirror_project_tx_on_insert
  AFTER INSERT ON financial_project_transactions
  FOR EACH ROW
  EXECUTE FUNCTION mirror_project_tx_insert();

CREATE TRIGGER mirror_project_tx_on_delete
  BEFORE DELETE ON financial_project_transactions
  FOR EACH ROW
  EXECUTE FUNCTION mirror_project_tx_delete();
