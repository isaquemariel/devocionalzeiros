ALTER TABLE public.store_products 
ADD COLUMN IF NOT EXISTS stock_quantity integer;

COMMENT ON COLUMN public.store_products.stock_quantity IS 'NULL = estoque ilimitado; 0 = esgotado; >0 = unidades disponíveis';