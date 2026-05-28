import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-aulas-token',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

const j = (d: unknown, s = 200) =>
  new Response(JSON.stringify(d), {
    status: s,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

async function sha256(t: string) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t))
  return Array.from(new Uint8Array(b))
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const token =
    req.headers.get('x-aulas-token') ??
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!token) return j({ error: 'unauthenticated' }, 401)

  const tokenHash = await sha256(token)
  const { data: sess } = await supabase
    .from('aulas_sessions')
    .select('email, expires_at')
    .eq('token_hash', tokenHash)
    .maybeSingle()
  if (!sess || new Date(sess.expires_at) < new Date()) {
    return j({ error: 'unauthenticated' }, 401)
  }
  const email = String(sess.email).toLowerCase()

  let body: any = {}
  try { body = await req.json() } catch {}
  const aulaId = String(body?.aula_id ?? '').trim()
  if (!aulaId) return j({ error: 'aula_id obrigatório' }, 400)

  // Resolve aula -> modulo -> curso for access check
  const { data: aula } = await supabase
    .from('aulas_aulas')
    .select('id, modulo_id')
    .eq('id', aulaId)
    .maybeSingle()
  if (!aula) return j({ error: 'aula não encontrada' }, 404)

  const { data: modulo } = await supabase
    .from('aulas_modulos')
    .select('id, curso_id')
    .eq('id', aula.modulo_id)
    .maybeSingle()
  if (!modulo) return j({ error: 'módulo não encontrado' }, 404)

  const { data: admin } = await supabase
    .from('aulas_admins')
    .select('email')
    .eq('email', email)
    .maybeSingle()

  let allowed = !!admin
  if (!allowed) {
    const { data: access } = await supabase
      .from('aulas_product_access')
      .select('id')
      .eq('email', email)
      .eq('curso_id', modulo.curso_id)
      .maybeSingle()
    allowed = !!access
  }
  if (!allowed) return j({ error: 'forbidden' }, 403)

  // Return arquivos WITHOUT file_url (signed URLs are issued only by aulas-file-signed-url)
  const { data: arquivos, error } = await supabase
    .from('aulas_arquivos')
    .select('id, aula_id, title, file_size_kb, order_index')
    .eq('aula_id', aulaId)
    .order('order_index', { ascending: true })
  if (error) return j({ error: error.message }, 500)

  return j({ items: arquivos ?? [] })
})
