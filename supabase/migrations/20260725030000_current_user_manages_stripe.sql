-- "Gerenciar assinatura" (portal do Stripe) só deve aparecer para quem tem
-- uma ASSINATURA STRIPE recorrente. Compras avulsas (PIX/Kiwify) e planos
-- concedidos manualmente não são gerenciáveis pelo portal e não devem ver o
-- botão. O webhook do Stripe grava payment_method='stripe' e last_event_type
-- começando com 'stripe' — esse é o marcador confiável.
create or replace function public.current_user_manages_stripe()
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  req_email text;
  pm text;
  ev text;
begin
  -- Só o próprio usuário autenticado; sem sessão → false
  select email into req_email from auth.users where id = auth.uid();
  if req_email is null then return false; end if;

  -- Última compra/assinatura do usuário
  select payment_method, last_event_type
    into pm, ev
    from public.authorized_purchases
    where lower(email) = lower(req_email)
    order by updated_at desc
    limit 1;

  return (lower(coalesce(pm, '')) = 'stripe' or lower(coalesce(ev, '')) like 'stripe%');
end;
$$;

grant execute on function public.current_user_manages_stripe() to authenticated;
