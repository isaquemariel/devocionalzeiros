import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-aulas-token',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

const j = (d: unknown, s = 200) =>
  new Response(JSON.stringify(d), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

async function sha256(t: string) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t))
  return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // Auth via session token
  const auth = req.headers.get('x-aulas-token') ?? req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!auth) return j({ error: 'unauthenticated' }, 401)
  const tokenHash = await sha256(auth)
  const { data: sess } = await supabase.from('aulas_sessions').select('email, expires_at')
    .eq('token_hash', tokenHash).maybeSingle()
  if (!sess || new Date(sess.expires_at) < new Date()) return j({ error: 'unauthenticated' }, 401)

  const { data: adm } = await supabase.from('aulas_admins').select('email').eq('email', sess.email).maybeSingle()
  if (!adm) return j({ error: 'forbidden' }, 403)

  let body: any = {}
  try { body = await req.json() } catch {}

  const action = body.action as string

  try {
    switch (action) {
      case 'list_access': {
        const { data, error } = await supabase
          .from('aulas_product_access')
          .select('id, email, curso_id, source, kiwify_product_id, created_at')
          .order('created_at', { ascending: false })
        if (error) throw error
        return j({ items: data ?? [] })
      }
      case 'grant_access': {
        const email = String(body.email ?? '').trim().toLowerCase()
        const curso_id = String(body.curso_id ?? '')
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return j({ error: 'E-mail inválido' }, 400)
        if (!curso_id) return j({ error: 'curso_id obrigatório' }, 400)
        const { error } = await supabase.from('aulas_product_access').upsert({
          email, curso_id, source: 'manual_admin',
        }, { onConflict: 'email,curso_id' })
        if (error) throw error
        return j({ ok: true })
      }
      case 'revoke_access': {
        const id = String(body.id ?? '')
        if (!id) return j({ error: 'id obrigatório' }, 400)
        const { error } = await supabase.from('aulas_product_access').delete().eq('id', id)
        if (error) throw error
        return j({ ok: true })
      }
      case 'list_admins': {
        const { data, error } = await supabase.from('aulas_admins').select('id, email, created_at')
          .order('created_at', { ascending: true })
        if (error) throw error
        return j({ items: data ?? [] })
      }
      case 'add_admin': {
        const email = String(body.email ?? '').trim().toLowerCase()
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return j({ error: 'E-mail inválido' }, 400)
        const { error } = await supabase.from('aulas_admins').insert({ email })
        if (error && !String(error.message).includes('duplicate')) throw error
        return j({ ok: true })
      }
      case 'remove_admin': {
        const id = String(body.id ?? '')
        if (!id) return j({ error: 'id obrigatório' }, 400)
        const { error } = await supabase.from('aulas_admins').delete().eq('id', id)
        if (error) throw error
        return j({ ok: true })
      }
      case 'get_settings': {
        const { data, error } = await supabase.from('aulas_settings').select('*').eq('id', 1).maybeSingle()
        if (error) throw error
        return j({ settings: data })
      }
      case 'save_settings': {
        const payload = {
          id: 1,
          banner_enabled: !!body.banner_enabled,
          banner_image_url: body.banner_image_url ?? null,
          banner_curso_id: body.banner_curso_id ?? null,
          banner_title_override: body.banner_title_override ?? null,
          banner_subtitle_override: body.banner_subtitle_override ?? null,
          updated_at: new Date().toISOString(),
        }
        const { error } = await supabase.from('aulas_settings').upsert(payload, { onConflict: 'id' })
        if (error) throw error
        return j({ ok: true })
      }
      default:
        return j({ error: 'unknown action' }, 400)
    }
  } catch (err: any) {
    console.error('aulas-admin error', err)
    return j({ error: err.message ?? 'erro interno' }, 500)
  }
})
