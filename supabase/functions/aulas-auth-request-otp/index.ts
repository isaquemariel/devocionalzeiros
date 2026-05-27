import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const j = (d: unknown, s = 200) =>
  new Response(JSON.stringify(d), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return j({ error: 'Method not allowed' }, 405)

  try {
    const { email: rawEmail } = await req.json()
    if (typeof rawEmail !== 'string') return j({ error: 'email obrigatório' }, 400)
    const email = rawEmail.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      return j({ error: 'E-mail inválido' }, 400)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // Check access (admin OR product access)
    const [{ data: adminRow }, { data: accessRows }] = await Promise.all([
      supabase.from('aulas_admins').select('email').eq('email', email).maybeSingle(),
      supabase.from('aulas_product_access').select('id').eq('email', email).limit(1),
    ])

    const isAdmin = !!adminRow
    const hasAccess = isAdmin || (accessRows && accessRows.length > 0)

    if (!hasAccess) {
      return j({
        error: 'no_access',
        message: 'Este e-mail não tem acesso à área de membros. Fale com o suporte pelo WhatsApp.',
      }, 403)
    }

    // Rate limit: 1 código a cada 60s por e-mail
    const sixtySecAgo = new Date(Date.now() - 60_000).toISOString()
    const { data: recent } = await supabase
      .from('aulas_otp_codes')
      .select('id')
      .eq('email', email)
      .gt('created_at', sixtySecAgo)
      .limit(1)
    if (recent && recent.length > 0) {
      return j({ error: 'Aguarde 60s para solicitar outro código.' }, 429)
    }

    // Gera código 6 dígitos
    const code = String(Math.floor(100000 + Math.random() * 900000))
    const codeHash = await sha256(code)
    const expiresAt = new Date(Date.now() + 15 * 60_000).toISOString()

    const { error: insertErr } = await supabase.from('aulas_otp_codes').insert({
      email, code_hash: codeHash, expires_at: expiresAt,
    })
    if (insertErr) {
      console.error('Insert OTP error', insertErr)
      return j({ error: 'Erro interno' }, 500)
    }

    // Envia e-mail via send-transactional-email
    const sendUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/send-transactional-email`
    const anonJwt = Deno.env.get('SUPABASE_ANON_KEY')
    if (!anonJwt) {
      console.error('Missing SUPABASE_ANON_KEY for transactional email call')
      return j({ error: 'Erro interno' }, 500)
    }

    const sendRes = await fetch(sendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: anonJwt,
        Authorization: `Bearer ${anonJwt}`,
      },
      body: JSON.stringify({
        templateName: 'aulas-otp',
        recipientEmail: email,
        templateData: { code, recipient: email },
      }),
    })

    if (!sendRes.ok) {
      const errText = await sendRes.text()
      console.error('send-transactional-email failed', sendRes.status, errText)
      return j({ error: 'Falha ao enviar e-mail. Tente novamente.' }, 500)
    }

    return j({ ok: true })
  } catch (err) {
    console.error('request-otp error', err)
    return j({ error: 'Erro interno' }, 500)
  }
})
