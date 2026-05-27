// Edge function: generates (and caches) chapter audio narration via OpenAI TTS.
// Audio is stored in the public `enoque-audio` bucket, keyed by chapter number,
// so each chapter is generated only once for all users.
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-aulas-token',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const ENOQUE_SLUG = 'os-segredos-do-livro-de-enoque'
const BUCKET = 'enoque-audio'
const VOICE = 'nova' // natural PT-BR friendly
const MODEL = 'gpt-4o-mini-tts'
const MAX_CHUNK = 3500

const j = (d: unknown, s = 200) =>
  new Response(JSON.stringify(d), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

async function sha256(t: string) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t))
  return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('')
}

function chunkText(text: string, max: number): string[] {
  if (text.length <= max) return [text]
  const out: string[] = []
  const sentences = text.split(/(?<=[.!?])\s+/)
  let cur = ''
  for (const s of sentences) {
    if ((cur + ' ' + s).trim().length > max && cur) { out.push(cur.trim()); cur = s }
    else cur = (cur + ' ' + s).trim()
  }
  if (cur) out.push(cur)
  return out
}

async function ttsChunk(apiKey: string, text: string): Promise<Uint8Array> {
  const resp = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      voice: VOICE,
      input: text,
      format: 'mp3',
      instructions: 'Narração reverente e pausada em português brasileiro, ritmo de leitura bíblica.',
    }),
  })
  if (!resp.ok) {
    const body = await resp.text()
    const err = new Error(`OpenAI TTS ${resp.status}: ${body}`) as Error & { status?: number }
    err.status = resp.status
    throw err
  }
  return new Uint8Array(await resp.arrayBuffer())
}

function concatBytes(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((a, p) => a + p.length, 0)
  const out = new Uint8Array(total)
  let off = 0
  for (const p of parts) { out.set(p, off); off += p.length }
  return out
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { chapter, text } = await req.json()
    const ch = Number(chapter)
    if (!Number.isInteger(ch) || ch < 1) return j({ error: 'Parâmetros inválidos' }, 400)
    if (typeof text !== 'string' || text.length < 5) return j({ error: 'Texto inválido' }, 400)

    const path = `chapter-${ch}.mp3`
    const publicUrl = `${Deno.env.get('SUPABASE_URL')}/storage/v1/object/public/${BUCKET}/${path}`

    // 1) Cache hit? Try a cheap HEAD on the public URL.
    try {
      const head = await fetch(publicUrl, { method: 'HEAD' })
      if (head.ok) return j({ url: publicUrl, cached: true })
    } catch { /* ignore */ }

    // 2) Auth — aulas session with access to Enoque curso
    const auth = req.headers.get('x-aulas-token') ?? req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
    if (!auth) return j({ error: 'unauthenticated' }, 401)
    const tokenHash = await sha256(auth)
    const { data: sess } = await supabase.from('aulas_sessions')
      .select('email, expires_at').eq('token_hash', tokenHash).maybeSingle()
    if (!sess || new Date(sess.expires_at) < new Date()) return j({ error: 'unauthenticated' }, 401)
    const email = sess.email

    const { data: isAdm } = await supabase.from('aulas_admins').select('email').eq('email', email).maybeSingle()
    if (!isAdm) {
      const { data: curso } = await supabase.from('aulas_cursos').select('id').eq('slug', ENOQUE_SLUG).maybeSingle()
      if (!curso) return j({ error: 'forbidden' }, 403)
      const { data: acc } = await supabase.from('aulas_product_access')
        .select('id').eq('email', email).eq('curso_id', curso.id).maybeSingle()
      if (!acc) return j({ error: 'forbidden' }, 403)
    }

    // 3) Generate audio
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) return j({ error: 'TTS não configurado' }, 500)

    const chunks = chunkText(text.slice(0, 20000), MAX_CHUNK)
    const audios: Uint8Array[] = []
    for (const c of chunks) {
      try {
        audios.push(await ttsChunk(OPENAI_API_KEY, c))
      } catch (e: any) {
        console.error('TTS chunk failed', e?.message)
        const status = e?.status === 429 ? 429 : 500
        return j({ error: status === 429 ? 'Muitas requisições. Tente em alguns segundos.' : 'Falha ao gerar áudio.' }, status)
      }
    }
    const audio = concatBytes(audios)

    // 4) Upload to storage (overwrite if any stale)
    const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, audio, {
      contentType: 'audio/mpeg',
      cacheControl: '31536000',
      upsert: true,
    })
    if (upErr) {
      console.error('Upload error', upErr)
      return j({ error: 'Falha ao salvar áudio.' }, 500)
    }

    return j({ url: publicUrl, cached: false, bytes: audio.length })
  } catch (e) {
    console.error('enoque-chapter-audio error', e)
    return j({ error: 'Erro interno' }, 500)
  }
})
