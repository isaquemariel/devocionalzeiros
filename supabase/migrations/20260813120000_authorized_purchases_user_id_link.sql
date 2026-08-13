-- ============================================================================
-- VÍNCULO CONFIÁVEL ENTRE COMPRA E USUÁRIO (authorized_purchases.user_id)
--
-- PROBLEMA: a chave real de `authorized_purchases` é o E-MAIL (UNIQUE (email));
-- a coluna `user_id` veio depois, é nullable, e só era preenchida no cadastro,
-- por `handle_new_user`. Mas o fluxo normal do produto é o inverso: a pessoa se
-- cadastra primeiro e compra depois. Nesse caso o webhook (Kiwify/Stripe) cria
-- a linha só com o e-mail, e `handle_new_user` já rodou lá atrás e nunca mais
-- roda — a linha fica com plan_type='gold' e user_id NULL.
--
-- Quase todo o app lê o plano por E-MAIL (get_user_plan_type, paywall, painel
-- admin), então o usuário via gold normalmente. Mas o modal do ranking resolvia
-- por `user_id` e, não achando linha, exibia "free" — o sintoma relatado:
-- "comprou gold e no ranking aparece free".
--
-- Esta migration ataca a causa em vez do sintoma:
--   1. BACKFILL — liga as compras órfãs que já existem ao usuário do mesmo e-mail.
--   2. TRIGGER  — preenche `user_id` em toda inserção/atualização futura, para
--                 nenhum webhook criar órfão de novo.
--   3. ÍNDICE   — a busca por e-mail em minúsculas passa a ser indexada.
-- É idempotente: pode rodar mais de uma vez sem efeito colateral.
-- ============================================================================

-- 1) BACKFILL das linhas órfãs já existentes -------------------------------
update public.authorized_purchases ap
   set user_id = u.id
  from auth.users u
 where ap.user_id is null
   and lower(ap.email) = lower(u.email);

-- 2) TRIGGER: nenhuma compra nova nasce órfã --------------------------------
create or replace function public.link_authorized_purchase_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Só resolve quando o vínculo não veio pronto. Nunca sobrescreve um user_id
  -- já definido (o admin pode ter corrigido um caso de e-mail divergente).
  if new.user_id is null and new.email is not null then
    select u.id into new.user_id
      from auth.users u
     where lower(u.email) = lower(new.email)
     limit 1;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_link_authorized_purchase_user on public.authorized_purchases;
create trigger trg_link_authorized_purchase_user
  before insert or update of email, user_id on public.authorized_purchases
  for each row execute function public.link_authorized_purchase_user();

-- 3) Índice para a resolução por e-mail (usada em toda leitura de plano) -----
create index if not exists idx_authorized_purchases_lower_email
  on public.authorized_purchases (lower(email));

-- 4) RPC única para o plano de um usuário, com a MESMA regra do painel -------
-- Resolve por user_id OU e-mail, preferindo a compra ATIVA e mais recente —
-- exatamente o que `admin_get_all_users` já faz. Assim ranking e painel nunca
-- mais discordam.
create or replace function public.admin_get_user_plan(target_user_id uuid)
returns table (plan_type text, plan_status text, email text, phone text)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not has_role(auth.uid(), 'admin') then
    raise exception 'Access denied';
  end if;

  return query
  select coalesce(ap.plan_type, 'free')::text,
         coalesce(ap.status, 'active')::text,
         coalesce(ap.email, u.email)::text,
         ap.phone::text
    from auth.users u
    left join lateral (
      select ap2.*
        from public.authorized_purchases ap2
       where ap2.user_id = u.id
          or lower(ap2.email) = lower(u.email)
       order by (ap2.status = 'active') desc, ap2.updated_at desc nulls last
       limit 1
    ) ap on true
   where u.id = target_user_id;
end;
$$;

grant execute on function public.admin_get_user_plan(uuid) to authenticated;
