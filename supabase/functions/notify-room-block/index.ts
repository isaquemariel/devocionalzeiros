import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

// Push de moderação das salas. Seguro por desenho:
//  • Exige um usuário autenticado (qualquer um pode chamar).
//  • Só envia se o ALVO estiver REALMENTE bloqueado (room_bans ativo).
//  • Mensagem é FIXA (não dá para spammar texto arbitrário).
// Assim tanto o bloqueio automático (denúncias) quanto o manual (admin) podem
// avisar o bloqueado por push, sem abrir brecha de abuso.
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

    // Confirma que o alvo está mesmo com bloqueio ATIVO
    const { data: ban } = await admin
      .from('room_bans')
      .select('permanent, banned_until')
      .eq('user_id', targetId)
      .maybeSingle();
    const active = !!ban && (ban.permanent || (ban.banned_until && new Date(ban.banned_until as string) > new Date()));
    if (!active) {
      return new Response(JSON.stringify({ skipped: 'not_blocked' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const permanent = !!ban!.permanent;

    // Dispara o push (server-to-server, service role) pro alvo
    const resp = await fetch(`${supabaseUrl}/functions/v1/send-push-notification`, {
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
    const out = await resp.json().catch(() => ({}));

    return new Response(JSON.stringify({ ok: true, push: out }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('notify-room-block error', e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
