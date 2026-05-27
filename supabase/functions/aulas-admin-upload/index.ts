import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-aulas-token',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  const { data: admin } = await supabase
    .from('aulas_admins')
    .select('email')
    .eq('email', email)
    .maybeSingle()
  if (!admin) return j({ error: 'forbidden' }, 403)

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return j({ error: 'multipart/form-data esperado' }, 400)
  }

  const file = form.get('file') as File | null
  const folder = String(form.get('folder') ?? '').trim() || 'misc'
  if (!file) return j({ error: 'arquivo ausente' }, 400)

  // Sanitize folder (no traversal)
  const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'misc'
  const ext = (file.name.split('.').pop() ?? 'bin').replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)
  const path = `${safeFolder}/${crypto.randomUUID()}.${ext}`

  // Covers go to public bucket; PDFs and others stay private
  const bucket = safeFolder === 'covers' ? 'aulas-covers' : 'aulas-arquivos'

  const buf = new Uint8Array(await file.arrayBuffer())
  const { error: upErr } = await supabase.storage
    .from(bucket)
    .upload(path, buf, {
      upsert: false,
      contentType: file.type || 'application/octet-stream',
    })
  if (upErr) {
    console.error('upload failed', upErr)
    return j({ error: upErr.message ?? 'falha ao enviar' }, 500)
  }

  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path)
  return j({ url: pub.publicUrl, path, bucket, size_kb: Math.round(buf.byteLength / 1024) })
})
