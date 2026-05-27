import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-aulas-token',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

const j = (d: unknown, s = 200) =>
  new Response(JSON.stringify(d), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function getSessionFromRequest(req: Request, supabase: any) {
  const auth = req.headers.get('x-aulas-token') ?? req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!auth) return null
  const tokenHash = await sha256(auth)
  const { data: sess } = await supabase
    .from('aulas_sessions')
    .select('email, expires_at')
    .eq('token_hash', tokenHash)
    .maybeSingle()
  if (!sess) return null
  if (new Date(sess.expires_at) < new Date()) return null
  await supabase.from('aulas_sessions').update({ last_seen_at: new Date().toISOString() }).eq('token_hash', tokenHash)
  return sess as { email: string; expires_at: string }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const sess = await getSessionFromRequest(req, supabase)
  if (!sess) return j({ error: 'unauthenticated' }, 401)

  const [{ data: admin }, { data: access }] = await Promise.all([
    supabase.from('aulas_admins').select('email').eq('email', sess.email).maybeSingle(),
    supabase.from('aulas_product_access').select('curso_id').eq('email', sess.email),
  ])

  return j({
    email: sess.email,
    is_admin: !!admin,
    allowed_curso_ids: (access ?? []).map((r: any) => r.curso_id),
  })
})
