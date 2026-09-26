-- Plano pago passa a exigir e-mail VERIFICADO.
--
-- Contexto: a confirmação de e-mail no cadastro vai ser desligada, porque ~8%
-- de quem preenche o formulário nunca clica no link e nunca entra (42 contas
-- presas, 22 delas nos últimos 90 dias). Sem confirmação, porém, qualquer
-- pessoa cria conta com o e-mail de outra — e o plano aqui é resolvido POR
-- E-MAIL, casando `auth.users.email` com `authorized_purchases.email`. Bastaria
-- digitar o e-mail de um assinante para herdar o Gold dele.
--
-- A saída é separar as duas coisas: ENTRAR continua livre e instantâneo; só o
-- ACESSO PAGO pede a prova de que o e-mail é seu. Quem não confirmou é `free`
-- e vê o convite para confirmar quando tentar usar o que é pago.
--
-- Seguro para quem já existe: os 627 usuários que entram pelo Google têm
-- `email_confirmed_at` preenchido pelo próprio provedor (verificado: 627 de
-- 627), então nenhum deles perde o plano.
--
-- Só esta linha muda em relação à versão anterior da função.

CREATE OR REPLACE FUNCTION public.get_user_plan_type(email_input text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  plan_result text;
  user_status text;
  amount_result numeric;
  requesting_user_email text;
  requesting_confirmed timestamptz;
BEGIN
  SELECT email, email_confirmed_at
    INTO requesting_user_email, requesting_confirmed
  FROM auth.users WHERE id = auth.uid();

  IF requesting_user_email IS NULL OR lower(requesting_user_email) != lower(email_input) THEN
    RETURN NULL;
  END IF;

  IF lower(email_input) = 'devocionalzeiros@gmail.com' THEN
    RETURN 'admin';
  END IF;

  -- E-mail não provado não herda plano pago (ver cabeçalho).
  IF requesting_confirmed IS NULL THEN
    RETURN 'free';
  END IF;

  SELECT ap.plan_type, ap.status, COALESCE(ap.amount_paid, 0)
    INTO plan_result, user_status, amount_result
  FROM public.authorized_purchases ap
  WHERE lower(ap.email) = lower(email_input)
  ORDER BY ap.updated_at DESC
  LIMIT 1;

  IF user_status = 'inactive' THEN RETURN 'inactive'; END IF;
  IF plan_result IS NULL THEN RETURN 'free'; END IF;
  IF plan_result IN ('gratuito', 'free', 'none') THEN RETURN 'free'; END IF;
  IF plan_result = 'start' THEN
    IF amount_result > 0 THEN RETURN 'gold'; ELSE RETURN 'free'; END IF;
  END IF;

  RETURN plan_result;
END;
$function$;
