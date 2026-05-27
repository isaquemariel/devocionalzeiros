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

function randomToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return j({ error: 'Method not allowed' }, 405)

  try {
    const { email: rawEmail, code } = await req.json()
    if (typeof rawEmail !== 'string' || typeof code !== 'string') {
      return j({ error: 'email e code obrigatórios' }, 400)
    }
    const email = rawEmail.trim().toLowerCase()
    if (!/^\d{6}$/.test(code)) return j({ error: 'Código inválido' }, 400)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { data: otpRow } = await supabase
      .from('aulas_otp_codes')
      .select('*')
      .eq('email', email)
      .is('consumed_at', null)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!otpRow) return j({ error: 'Código expirado ou inexistente. Solicite outro.' }, 401)
    if (otpRow.attempts >= 5) return j({ error: 'Muitas tentativas. Solicite outro código.' }, 401)

    const codeHash = await sha256(code)
    if (codeHash !== otpRow.code_hash) {
      await supabase.from('aulas_otp_codes').update({ attempts: otpRow.attempts + 1 }).eq('id', otpRow.id)
      return j({ error: 'Código incorreto' }, 401)
    }

    // Consome
    await supabase.from('aulas_otp_codes').update({ consumed_at: new Date().toISOString() }).eq('id', otpRow.id)

    // Cria sessão (30 dias)
    const token = randomToken()
    const tokenHash = await sha256(token)
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60_000).toISOString()
    const ua = req.headers.get('user-agent') ?? null
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null

    const { error: sessErr } = await supabase.from('aulas_sessions').insert({
      email, token_hash: tokenHash, expires_at: expiresAt, user_agent: ua, ip,
    })
    if (sessErr) {
      console.error('Session insert error', sessErr)
      return j({ error: 'Erro interno' }, 500)
    }

    const { data: adminRow } = await supabase.from('aulas_admins').select('email').eq('email', email).maybeSingle()

    return j({ token, email, is_admin: !!adminRow, expires_at: expiresAt })
  } catch (err) {
    console.error('verify-otp error', err)
    return j({ error: 'Erro interno' }, 500)
  }
})
