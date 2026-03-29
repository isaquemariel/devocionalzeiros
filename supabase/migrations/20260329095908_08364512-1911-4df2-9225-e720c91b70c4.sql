ALTER TABLE public.financial_installments 
ADD COLUMN IF NOT EXISTS settlement_amount numeric DEFAULT NULL,
ADD COLUMN IF NOT EXISTS last_paid_date date DEFAULT NULL;