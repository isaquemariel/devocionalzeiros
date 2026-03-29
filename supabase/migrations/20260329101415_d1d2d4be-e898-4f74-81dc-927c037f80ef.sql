ALTER TABLE public.financial_fixed_costs 
ADD COLUMN IF NOT EXISTS last_paid_date date DEFAULT NULL,
ADD COLUMN IF NOT EXISTS next_payment_date date DEFAULT NULL;