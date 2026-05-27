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

// Extract storage path inside the bucket from a stored file_url.
// Supports both public and signed URL formats from Supabase Storage.
function extractStoragePath(fileUrl: string): string | null {
  if (!fileUrl) return null
  try {
    const u = new URL(fileUrl)
    const marker = '/aulas-arquivos/'
    const idx = u.pathname.indexOf(marker)
    if (idx === -1) return null
    let path = u.pathname.substring(idx + marker.length)
    // Strip any leading slashes
    path = path.replace(/^\/+/, '')
    return decodeURIComponent(path)
  } catch {
    // Maybe it's already a plain path
    if (!fileUrl.includes('://')) return fileUrl.replace(/^\/+/, '')
    return null
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // Auth via aulas session token
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
  try {
    body = await req.json()
  } catch {}
  const arquivoId = String(body?.arquivo_id ?? '').trim()
  if (!arquivoId) return j({ error: 'arquivo_id obrigatório' }, 400)

  // Resolve arquivo -> aula -> modulo -> curso
  const { data: arquivo, error: arquivoErr } = await supabase
    .from('aulas_arquivos')
    .select('id, title, file_url, aula_id')
    .eq('id', arquivoId)
    .maybeSingle()
  if (arquivoErr || !arquivo) return j({ error: 'arquivo não encontrado' }, 404)

  const { data: aula } = await supabase
    .from('aulas_aulas')
    .select('id, modulo_id')
    .eq('id', arquivo.aula_id)
    .maybeSingle()
  if (!aula) return j({ error: 'aula não encontrada' }, 404)

  const { data: modulo } = await supabase
    .from('aulas_modulos')
    .select('id, curso_id')
    .eq('id', aula.modulo_id)
    .maybeSingle()
  if (!modulo) return j({ error: 'módulo não encontrado' }, 404)

  // Check access: admin OR has aulas_product_access for this curso
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

  const path = extractStoragePath(arquivo.file_url)
  if (!path) return j({ error: 'caminho do arquivo inválido' }, 500)

  // 5 min signed URL, with download disposition
  const { data: signed, error: signErr } = await supabase.storage
    .from('aulas-arquivos')
    .createSignedUrl(path, 300, { download: arquivo.title || true })

  if (signErr || !signed) {
    console.error('createSignedUrl failed', signErr, { path })
    return j({ error: 'falha ao gerar link' }, 500)
  }

  return j({ url: signed.signedUrl, expires_in: 300 })
})
