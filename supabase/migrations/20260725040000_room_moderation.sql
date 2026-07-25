-- ===== MODERAÇÃO DAS SALAS (espelha o padrão da comunidade) =====
-- room_bans: 1 bloqueio ativo por usuário (permanente ou temporário)
-- room_reports: denúncias (1 por par denunciante→alvo)
-- Regra: 5 denunciantes distintos → bloqueio automático permanente.
-- Admin pode bloquear (perm/temp) e desbloquear. Tudo notifica o sino.

create table if not exists public.room_bans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  permanent boolean not null default true,
  banned_until timestamptz,
  reason text,
  created_by uuid,      -- admin que aplicou; null quando automático
  auto boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.room_bans enable row level security;
drop policy if exists room_bans_admin_read on public.room_bans;
create policy room_bans_admin_read on public.room_bans for select using (public.is_current_user_admin());

create table if not exists public.room_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null,
  target_id uuid not null,
  created_at timestamptz not null default now(),
  unique (reporter_id, target_id)
);
alter table public.room_reports enable row level security;
drop policy if exists room_reports_admin_read on public.room_reports;
create policy room_reports_admin_read on public.room_reports for select using (public.is_current_user_admin());

create or replace function public.is_room_blocked()
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare r record;
begin
  select * into r from public.room_bans
   where user_id = auth.uid()
     and (permanent or (banned_until is not null and banned_until > now()))
   limit 1;
  if r.user_id is null then return jsonb_build_object('blocked', false); end if;
  return jsonb_build_object('blocked', true, 'permanent', r.permanent, 'until', r.banned_until, 'reason', r.reason);
end; $$;
grant execute on function public.is_room_blocked() to authenticated;

create or replace function public.report_room_user(target_id uuid)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare me uuid := auth.uid(); v_count int; v_threshold int := 5; v_already boolean;
begin
  if me is null then raise exception 'auth required' using errcode='42501'; end if;
  if target_id = me then raise exception 'cannot report self'; end if;
  if public.has_role(target_id, 'admin'::app_role) then
    return jsonb_build_object('reported', false, 'reason', 'admin');
  end if;

  insert into public.room_reports(reporter_id, target_id) values (me, target_id)
  on conflict (reporter_id, target_id) do nothing;

  select count(distinct reporter_id) into v_count from public.room_reports r where r.target_id = report_room_user.target_id;
  select exists(select 1 from public.room_bans b where b.user_id = target_id and (b.permanent or b.banned_until > now())) into v_already;

  if v_count >= v_threshold and not v_already then
    insert into public.room_bans(user_id, permanent, banned_until, reason, created_by, auto)
    values (target_id, true, null, 'Bloqueio automático por múltiplas denúncias', null, true)
    on conflict (user_id) do update set permanent=true, banned_until=null, auto=true,
      reason=excluded.reason, updated_at=now();

    insert into public.user_notifications(user_id, type, title, body, link)
    values (target_id, 'room_block', 'Acesso às salas bloqueado',
            'Você foi bloqueado das salas de bate-papo por denúncias de outros usuários. Para revisar seu caso, fale com o suporte.',
            '/mundo');

    insert into public.user_notifications(user_id, type, title, body, link)
    select ur.user_id, 'room_block_admin', 'Usuário bloqueado nas salas',
           'Um usuário foi bloqueado automaticamente após atingir ' || v_threshold || ' denúncias nas salas.', '/adminhd'
    from public.user_roles ur where ur.role = 'admin'::app_role;

    return jsonb_build_object('reported', true, 'count', v_count, 'blocked', true);
  end if;

  return jsonb_build_object('reported', true, 'count', v_count, 'blocked', v_already);
end; $$;
grant execute on function public.report_room_user(uuid) to authenticated;

create or replace function public.admin_set_room_ban(target_id uuid, p_permanent boolean default true, p_minutes integer default 0, p_reason text default null)
returns void language plpgsql security definer set search_path to 'public' as $$
declare v_until timestamptz;
begin
  if not public.has_role(auth.uid(), 'admin'::app_role) then raise exception 'Access denied' using errcode='42501'; end if;
  if p_permanent then v_until := null; else v_until := now() + (greatest(p_minutes,1) || ' minutes')::interval; end if;
  insert into public.room_bans(user_id, permanent, banned_until, reason, created_by, auto)
  values (target_id, p_permanent, v_until, coalesce(p_reason,'Bloqueio pela moderação'), auth.uid(), false)
  on conflict (user_id) do update set permanent=excluded.permanent, banned_until=excluded.banned_until,
    reason=excluded.reason, created_by=auth.uid(), auto=false, updated_at=now();

  insert into public.user_notifications(user_id, type, title, body, link)
  values (target_id, 'room_block',
          case when p_permanent then 'Acesso às salas bloqueado' else 'Bloqueio temporário nas salas' end,
          case when p_permanent then 'Você foi bloqueado das salas de bate-papo pela moderação. Fale com o suporte.'
               else 'Você recebeu um bloqueio temporário nas salas de bate-papo. Tente novamente mais tarde.' end,
          '/mundo');
end; $$;
grant execute on function public.admin_set_room_ban(uuid, boolean, integer, text) to authenticated;

create or replace function public.admin_unblock_room_user(target_id uuid)
returns void language plpgsql security definer set search_path to 'public' as $$
begin
  if not public.has_role(auth.uid(),'admin'::app_role) then raise exception 'Access denied' using errcode='42501'; end if;
  delete from public.room_bans where user_id = target_id;
  insert into public.user_notifications(user_id, type, title, body, link)
  values (target_id, 'room_unblock', 'Acesso às salas liberado',
          'Seu acesso às salas de bate-papo foi restaurado. Seja bem-vindo de volta!', '/mundo');
end; $$;
grant execute on function public.admin_unblock_room_user(uuid) to authenticated;

create or replace function public.admin_list_room_bans()
returns table(user_id uuid, permanent boolean, banned_until timestamptz, reason text, auto boolean, created_at timestamptz)
language plpgsql security definer set search_path to 'public' as $$
begin
  if not public.has_role(auth.uid(),'admin'::app_role) then raise exception 'Access denied' using errcode='42501'; end if;
  return query select b.user_id, b.permanent, b.banned_until, b.reason, b.auto, b.created_at
    from public.room_bans b where b.permanent or b.banned_until > now() order by b.created_at desc;
end; $$;
grant execute on function public.admin_list_room_bans() to authenticated;
