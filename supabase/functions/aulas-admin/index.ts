import { createClient } from 'npm:@supabase/supabase-js@2'
import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { AulasWelcomeEmail } from '../_shared/transactional-email-templates/aulas-welcome.tsx'

const SITE_NAME = 'devocionalzeiros'
const SENDER_DOMAIN = 'notify.devocionalzeiros.com.br'
const FROM_DOMAIN = 'devocionalzeiros.com.br'

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

async function sendAulasWelcomeEmail(supabase: any, email: string, cursoId: string) {
  try {
    const { data: accessRow } = await supabase
      .from('aulas_product_access')
      .select('id, welcome_sent_at')
      .eq('email', email)
      .eq('curso_id', cursoId)
      .maybeSingle()
    if (!accessRow || accessRow.welcome_sent_at) return

    const { data: curso } = await supabase
      .from('aulas_cursos')
      .select('title')
      .eq('id', cursoId)
      .maybeSingle()
    const courseTitle = curso?.title || 'seu curso'

    const messageId = crypto.randomUUID()
    const html = await renderAsync(
      React.createElement(AulasWelcomeEmail, { productName: courseTitle, recipient: email }),
    )
    const text = await renderAsync(
      React.createElement(AulasWelcomeEmail, { productName: courseTitle, recipient: email }),
      { plainText: true },
    )

    let unsubscribeToken: string | null = null
    const { data: existingToken } = await supabase
      .from('email_unsubscribe_tokens')
      .select('token, used_at')
      .eq('email', email)
      .maybeSingle()
    if (existingToken && !existingToken.used_at) {
      unsubscribeToken = existingToken.token
    } else {
      const newToken = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '')
      await supabase
        .from('email_unsubscribe_tokens')
        .upsert({ token: newToken, email }, { onConflict: 'email', ignoreDuplicates: true })
      const { data: stored } = await supabase
        .from('email_unsubscribe_tokens')
        .select('token')
        .eq('email', email)
        .maybeSingle()
      unsubscribeToken = stored?.token ?? newToken
    }

    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: 'aulas-welcome',
      recipient_email: email,
      status: 'pending',
    })

    const { error: enqueueError } = await supabase.rpc('enqueue_email', {
      queue_name: 'transactional_emails',
      payload: {
        message_id: messageId,
        to: email,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject: 'Seu acesso foi liberado — entre na sua área de membros',
        html,
        text,
        purpose: 'transactional',
        label: 'aulas-welcome',
        idempotency_key: `aulas-welcome-${email}-${cursoId}`,
        unsubscribe_token: unsubscribeToken,
        queued_at: new Date().toISOString(),
      },
    })

    if (enqueueError) {
      console.error('enqueue aulas welcome email failed', enqueueError)
      return
    }
    await supabase
      .from('aulas_product_access')
      .update({ welcome_sent_at: new Date().toISOString() })
      .eq('id', accessRow.id)
  } catch (e) {
    console.error('sendAulasWelcomeEmail error', e)
  }
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

  const rawAction = typeof body?.action === 'string' ? body.action : typeof body?.type === 'string' ? body.type : ''
  const action = rawAction.trim().toLowerCase()
  const actionAliases: Record<string, string> = {
    list_admins_all: 'list_admins_full',
    list_full_admins: 'list_admins_full',
    update_access_course: 'update_access',
    change_access_course: 'update_access',
    delete_access: 'revoke_access',
    remove_access: 'revoke_access',
  }
  const resolvedAction = actionAliases[action] ?? action

  try {
    switch (resolvedAction) {
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
        await sendAulasWelcomeEmail(supabase, email, curso_id)
        return j({ ok: true })
      }
      case 'resend_welcome': {
        const email = String(body.email ?? '').trim().toLowerCase()
        const curso_id = String(body.curso_id ?? '')
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return j({ error: 'E-mail inválido' }, 400)
        if (!curso_id) return j({ error: 'curso_id obrigatório' }, 400)
        // garantir que o acesso existe
        await supabase.from('aulas_product_access').upsert(
          { email, curso_id, source: 'manual_admin' },
          { onConflict: 'email,curso_id' },
        )
        // resetar marcador para permitir reenvio
        await supabase
          .from('aulas_product_access')
          .update({ welcome_sent_at: null })
          .eq('email', email)
          .eq('curso_id', curso_id)
        await sendAulasWelcomeEmail(supabase, email, curso_id)
        return j({ ok: true })
      }
      case 'list_webhook_log': {
        const limit = Math.min(Math.max(Number(body.limit ?? 50), 1), 200)
        const { data, error } = await supabase
          .from('kiwify_webhook_log')
          .select('id, received_at, status, event_type, email, product_id, product_name, error_message, token_match, token_source')
          .order('received_at', { ascending: false })
          .limit(limit)
        if (error) throw error
        return j({ items: data ?? [] })
      }
      case 'update_access': {
        const id = String(body.id ?? '')
        const curso_id = String(body.curso_id ?? '')
        if (!id) return j({ error: 'id obrigatório' }, 400)
        if (!curso_id) return j({ error: 'curso_id obrigatório' }, 400)
        const { error } = await supabase.from('aulas_product_access')
          .update({ curso_id, source: 'manual_admin' }).eq('id', id)
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
      case 'list_modulos': {
        const { data, error } = await supabase.from('aulas_modulos').select('*').order('order_index')
        if (error) throw error
        return j({ items: data ?? [] })
      }
      case 'list_aulas': {
        const { data, error } = await supabase.from('aulas_aulas').select('*').order('order_index')
        if (error) throw error
        return j({ items: data ?? [] })
      }
      case 'list_arquivos': {
        const { data, error } = await supabase.from('aulas_arquivos').select('*').order('order_index')
        if (error) throw error
        return j({ items: data ?? [] })
      }
      case 'list_admins_full': {
        const { data, error } = await supabase.from('aulas_admins').select('*').order('created_at')
        if (error) throw error
        return j({ items: data ?? [] })
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
      case 'list_cursos': {
        const { data, error } = await supabase
          .from('aulas_cursos')
          .select('*')
          .order('order_index', { ascending: true })
        if (error) throw error
        return j({ items: data ?? [] })
      }
      case 'save_curso': {
        const c = body.curso ?? {}
        const payload = {
          slug: c.slug,
          title: c.title,
          description: c.description ?? null,
          cover_url: c.cover_url ?? null,
          kiwify_product_id: c.kiwify_product_id ?? null,
          purchase_url: c.purchase_url ?? null,
          order_index: Number(c.order_index ?? 0),
          is_published: !!c.is_published,
        }
        const q = c.id
          ? supabase.from('aulas_cursos').update(payload).eq('id', c.id)
          : supabase.from('aulas_cursos').insert(payload)
        const { error } = await q
        if (error) throw error
        return j({ ok: true })
      }
      case 'delete_curso': {
        const id = String(body.id ?? '')
        if (!id) return j({ error: 'id obrigatório' }, 400)
        const { error } = await supabase.from('aulas_cursos').delete().eq('id', id)
        if (error) throw error
        return j({ ok: true })
      }
      case 'save_modulo': {
        const m = body.modulo ?? {}
        const payload = {
          curso_id: m.curso_id,
          title: m.title,
          description: m.description ?? null,
          cover_url: m.cover_url ?? null,
          order_index: Number(m.order_index ?? 0),
        }
        const q = m.id
          ? supabase.from('aulas_modulos').update(payload).eq('id', m.id)
          : supabase.from('aulas_modulos').insert(payload)
        const { error } = await q
        if (error) throw error
        return j({ ok: true })
      }
      case 'delete_modulo': {
        const id = String(body.id ?? '')
        if (!id) return j({ error: 'id obrigatório' }, 400)
        const { error } = await supabase.from('aulas_modulos').delete().eq('id', id)
        if (error) throw error
        return j({ ok: true })
      }
      case 'save_aula': {
        const a = body.aula ?? {}
        const payload = {
          modulo_id: a.modulo_id,
          title: a.title,
          description: a.description ?? null,
          youtube_url: a.youtube_url ?? null,
          duration_minutes: a.duration_minutes ? Number(a.duration_minutes) : null,
          cover_url: a.cover_url ?? null,
          order_index: Number(a.order_index ?? 0),
          is_published: !!a.is_published,
        }
        const q = a.id
          ? supabase.from('aulas_aulas').update(payload).eq('id', a.id)
          : supabase.from('aulas_aulas').insert(payload)
        const { error } = await q
        if (error) throw error
        return j({ ok: true })
      }
      case 'delete_aula': {
        const id = String(body.id ?? '')
        if (!id) return j({ error: 'id obrigatório' }, 400)
        const { error } = await supabase.from('aulas_aulas').delete().eq('id', id)
        if (error) throw error
        return j({ ok: true })
      }
      case 'save_arquivo': {
        const f = body.arquivo ?? {}
        const payload = {
          aula_id: f.aula_id,
          title: f.title,
          file_url: f.file_url,
          file_size_kb: f.file_size_kb ? Number(f.file_size_kb) : null,
          order_index: Number(f.order_index ?? 0),
        }
        const q = f.id
          ? supabase.from('aulas_arquivos').update(payload).eq('id', f.id)
          : supabase.from('aulas_arquivos').insert(payload)
        const { error } = await q
        if (error) throw error
        return j({ ok: true })
      }
      case 'delete_arquivo': {
        const id = String(body.id ?? '')
        if (!id) return j({ error: 'id obrigatório' }, 400)
        const { error } = await supabase.from('aulas_arquivos').delete().eq('id', id)
        if (error) throw error
        return j({ ok: true })
      }
      case 'list_enoque_videos': {
        const { data, error } = await supabase
          .from('enoque_videos')
          .select('*')
          .order('order_index', { ascending: true })
        if (error) throw error
        return j({ items: data ?? [] })
      }
      case 'save_enoque_video': {
        const v = body.video ?? {}
        const title = String(v.title ?? '').trim()
        const youtube_id = String(v.youtube_id ?? '').trim()
        if (!title) return j({ error: 'Título obrigatório' }, 400)
        if (!youtube_id) return j({ error: 'ID do YouTube obrigatório' }, 400)
        const payload = {
          title,
          youtube_id,
          description: v.description ?? null,
          order_index: Number(v.order_index ?? 0),
          updated_at: new Date().toISOString(),
        }
        const q = v.id
          ? supabase.from('enoque_videos').update(payload).eq('id', v.id)
          : supabase.from('enoque_videos').insert(payload)
        const { error } = await q
        if (error) throw error
        return j({ ok: true })
      }
      case 'delete_enoque_video': {
        const id = String(body.id ?? '')
        if (!id) return j({ error: 'id obrigatório' }, 400)
        const { error } = await supabase.from('enoque_videos').delete().eq('id', id)
        if (error) throw error
        return j({ ok: true })
      }
      default:
        console.error('aulas-admin unknown action', { rawAction, resolvedAction, keys: Object.keys(body ?? {}) })
        return j({ error: 'unknown action', received_action: rawAction || null }, 400)
    }
  } catch (err: any) {
    console.error('aulas-admin error', err)
    return j({ error: err.message ?? 'erro interno' }, 500)
  }
})
