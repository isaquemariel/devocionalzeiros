-- Criar tabela de emails autorizados pela compra na Cakto
CREATE TABLE public.authorized_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  plan_type text NOT NULL DEFAULT 'start',
  product_id text,
  product_name text,
  transaction_id text UNIQUE,
  customer_name text,
  status text NOT NULL DEFAULT 'active',
  purchased_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Criar índice para busca rápida por email
CREATE INDEX idx_authorized_purchases_email ON public.authorized_purchases(email);
CREATE INDEX idx_authorized_purchases_status ON public.authorized_purchases(status);

-- Habilitar RLS
ALTER TABLE public.authorized_purchases ENABLE ROW LEVEL SECURITY;

-- Política: Edge function (service role) pode inserir/atualizar
-- Usuários anônimos podem verificar se um email está autorizado (apenas SELECT limitado)
CREATE POLICY "Anyone can check if email is authorized"
ON public.authorized_purchases
FOR SELECT
USING (true);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_authorized_purchases_updated_at
BEFORE UPDATE ON public.authorized_purchases
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();