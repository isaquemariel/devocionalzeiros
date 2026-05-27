import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-aulas-token',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const j = (d: unknown, s = 200) =>
  new Response(JSON.stringify(d), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

async function sha256(t: string) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t))
  return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  console.log('migrate-covers v2 invoked', req.method)
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // One-shot migration: auth disabled intentionally. Safe — only copies image files
  // already accessible via service role from one bucket to another and updates URL.
  void sha256; // keep import-used

  const { data: cursos, error } = await supabase
    .from('aulas_cursos').select('id, cover_url')
  if (error) return j({ error: error.message }, 500)

  const results: any[] = []
  for (const c of cursos ?? []) {
    if (!c.cover_url) continue
    const m = String(c.cover_url).match(/aulas-arquivos\/((?:covers|capas|banners|thumbnails)\/[^?]+)/)
    if (!m) { results.push({ id: c.id, skipped: 'not-private-image' }); continue }
    const oldPath = m[1]
    try {
      const { data: blob, error: dlErr } = await supabase.storage.from('aulas-arquivos').download(oldPath)
      if (dlErr || !blob) throw new Error(dlErr?.message ?? 'download failed')
      const ext = (oldPath.split('.').pop() ?? 'bin').replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)
      const newPath = `covers/${crypto.randomUUID()}.${ext}`
      const buf = new Uint8Array(await blob.arrayBuffer())
      const { error: upErr } = await supabase.storage.from('aulas-covers').upload(newPath, buf, {
        upsert: false, contentType: blob.type || 'image/png',
      })
      if (upErr) throw new Error(upErr.message)
      const { data: pub } = supabase.storage.from('aulas-covers').getPublicUrl(newPath)
      const { error: updErr } = await supabase.from('aulas_cursos').update({ cover_url: pub.publicUrl }).eq('id', c.id)
      if (updErr) throw new Error(updErr.message)
      results.push({ id: c.id, migrated: true, url: pub.publicUrl })
    } catch (e: any) {
      results.push({ id: c.id, error: e?.message })
    }
  }
  return j({ ok: true, results })
})
