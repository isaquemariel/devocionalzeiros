import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';

// Push de moderação das salas. Seguro por desenho:
//  • Só quem pode mandar: um ADMIN (bloqueio manual) ou, no bloqueio
//    AUTOMÁTICO, quem acabou de provocá-lo (até 2 min depois de criado).
//  • Só envia se o ALVO estiver REALMENTE bloqueado (room_bans ativo), e UMA
//    vez por bloqueio (`notificado_em`) — não dá para repetir o push.
//  • Mensagem é FIXA, e a resposta é só { ok }: não revela a ninguém se a
//    pessoa está bloqueada, se está no app, nem quantos aparelhos tem.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'missing_auth' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const authClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: userData, error: userErr } = await authClient.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: 'invalid_auth' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const body = await req.json().catch(() => ({}));
    const targetId = body?.user_id as string;
    if (!targetId) {
      return new Response(JSON.stringify({ error: 'missing_user_id' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const admin = createClient(supabaseUrl, serviceKey);

    const ok = () => new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    // Confirma que o alvo está mesmo com bloqueio ATIVO
    const { data: ban, error: banErr } = await admin
      .from('room_bans')
      .select('permanent, banned_until, auto, created_at, updated_at, created_by, notificado_em')
      .eq('user_id', targetId)
      .maybeSingle();
    if (banErr) throw banErr;
    const active = !!ban && (ban.permanent || (ban.banned_until && new Date(ban.banned_until as string) > new Date()));
    if (!active) return ok();

    // quem está chamando pode avisar ESTE bloqueio?
    const { data: papel } = await admin.from('user_roles').select('role').eq('user_id', userData.user.id).eq('role', 'admin').maybeSingle();
    const recente = Date.now() - new Date((ban!.updated_at ?? ban!.created_at) as string).getTime() < 2 * 60_000;
    const autorizado = !!papel || (ban!.auto && recente) || (ban!.created_by === userData.user.id && recente);
    if (!autorizado) return ok();

    // uma vez por bloqueio: já avisado depois da última mudança, não repete
    if (ban!.notificado_em && new Date(ban!.notificado_em as string) >= new Date((ban!.updated_at ?? ban!.created_at) as string)) return ok();
    const { error: marcaErr } = await admin.from('room_bans').update({ notificado_em: new Date().toISOString() }).eq('user_id', targetId);
    if (marcaErr) throw marcaErr;

    const permanent = !!ban!.permanent;

    // Dispara o push (server-to-server, service role) pro alvo
    await fetch(`${supabaseUrl}/functions/v1/send-push-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${serviceKey}` },
      body: JSON.stringify({
        user_id: targetId,
        title: permanent ? 'Acesso às salas bloqueado' : 'Bloqueio temporário nas salas',
        message: permanent
          ? 'Você foi bloqueado das salas de bate-papo. Fale com o suporte para revisar.'
          : 'Você recebeu um bloqueio temporário nas salas de bate-papo.',
        url: '/mundo',
      }),
    });
    return ok();
  } catch (e) {
    console.error('notify-room-block error', e);
    return new Response(JSON.stringify({ error: 'failed' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
