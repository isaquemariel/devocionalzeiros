import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { AulasWelcomeEmail } from '../_shared/transactional-email-templates/aulas-welcome.tsx'

const SITE_NAME = 'devocionalzeiros'
const SENDER_DOMAIN = 'notify.devocionalzeiros.com.br'
const FROM_DOMAIN = 'devocionalzeiros.com.br'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting
const RATE_LIMIT_WINDOW_MS = 60000
const MAX_REQUESTS_PER_WINDOW = 30
const requestLog: Map<string, number[]> = new Map()

function cleanRequestLog(): void {
  const now = Date.now()
  for (const [key, timestamps] of requestLog.entries()) {
    const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
    if (validTimestamps.length === 0) {
      requestLog.delete(key)
    } else {
      requestLog.set(key, validTimestamps)
    }
  }
}

function isRateLimited(identifier: string): boolean {
  cleanRequestLog()
  const now = Date.now()
  const timestamps = requestLog.get(identifier) || []
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) return true
  recentTimestamps.push(now)
  requestLog.set(identifier, recentTimestamps)
  return false
}

const emailSchema = z.string().email().max(255)

// Kiwify event types
const ACTIVATION_EVENTS = [
  'compra_aprovada',
  'subscription_renewed',
] as const

const DEACTIVATION_EVENTS = [
  'compra_reembolsada',
  'chargeback',
  'subscription_canceled',
  'subscription_late',
] as const

const ALL_VALID_EVENTS = [...ACTIVATION_EVENTS, ...DEACTIVATION_EVENTS] as const

function sanitizeString(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return ''
  return input.trim().slice(0, maxLength).replace(/[<>'"\\]/g, '')
}

type TokenCandidate = {
  source: string
  value: string
}

function getTokenCandidates(req: Request, payload: any): TokenCandidate[] {
  const url = new URL(req.url)

  const candidates: Array<TokenCandidate | null> = [
    { source: 'query.token', value: url.searchParams.get('token') ?? '' },
    { source: 'query.webhook_token', value: url.searchParams.get('webhook_token') ?? '' },
    { source: 'query.webhookToken', value: url.searchParams.get('webhookToken') ?? '' },
    { source: 'query.secret', value: url.searchParams.get('secret') ?? '' },
    { source: 'query.signature', value: url.searchParams.get('signature') ?? '' },
    { source: 'body.webhook_token', value: String(payload?.webhook_token ?? '') },
    { source: 'body.signature', value: String(payload?.signature ?? '') },
    { source: 'body.token', value: String(payload?.token ?? '') },
    { source: 'body.secret', value: String(payload?.secret ?? '') },
    { source: 'header.x-webhook-token', value: req.headers.get('x-webhook-token') ?? '' },
    { source: 'header.x-kiwify-token', value: req.headers.get('x-kiwify-token') ?? '' },
    { source: 'header.x-kiwify-signature', value: req.headers.get('x-kiwify-signature') ?? '' },
  ]

  const seen = new Set<string>()

  return candidates
    .filter((candidate): candidate is TokenCandidate => !!candidate?.value)
    .filter((candidate) => {
      const key = `${candidate.source}:${candidate.value}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
}

function redactToken(value: string): string {
  return value.length <= 8 ? value : `${value.slice(0, 4)}…${value.slice(-4)}`
}

// Map Kiwify product names/IDs to plan types
// Kiwify checkout IDs:
// START mensal: l9y7u96 | START anual: Z3kz3M0
// GOLD mensal: 3GnzSq7 | GOLD anual: pB36jRz
// PREMIUM mensal: ie0zdSP | PREMIUM anual: IvoBgb3
function getPlanTypeFromProduct(productName: string, productId: string): string {
  const combined = `${productName.toLowerCase()} ${productId.toLowerCase()}`

  // Check by Kiwify checkout/product ID
  if (combined.includes('l9y7u96') || combined.includes('z3kz3m0')) return 'start'
  if (combined.includes('3gnzsq7') || combined.includes('pb36jrz')) return 'gold'
  if (combined.includes('ie0zdsp') || combined.includes('ivobgb3')) return 'premium'

  // Check by name (fallback)
  if (combined.includes('premium')) return 'premium'
  if (combined.includes('gold')) return 'gold'
  if (combined.includes('start')) return 'start'

  // Price-based mapping (fallback) — updated for new pricing
  // GOLD: 14,90 / 149,90 | PREMIUM: 29,90 / 249,90
  if (combined.includes('249,90') || combined.includes('249.90') || combined.includes('29,90') || combined.includes('29.90')) return 'premium'
  if (combined.includes('149,90') || combined.includes('149.90') || combined.includes('14,90') || combined.includes('14.90')) return 'gold'

  return 'start'
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                   req.headers.get('cf-connecting-ip') || 'unknown'

  if (isRateLimited(clientIP)) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': '60' }
    })
  }

  // Service client used for logging — created early so we can audit even rejected calls
  const supabaseUrlEarly = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKeyEarly = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabaseLogger = createClient(supabaseUrlEarly, supabaseServiceKeyEarly)

  const logWebhook = async (entry: Record<string, unknown>) => {
    try { await supabaseLogger.from('kiwify_webhook_log').insert(entry) }
    catch (e) { console.error('Failed to write kiwify_webhook_log', e) }
  }

  try {
    const webhookToken = Deno.env.get('KIWIFY_WEBHOOK_TOKEN')
    if (!webhookToken) {
      console.error('KIWIFY_WEBHOOK_TOKEN not configured')
      await logWebhook({ status: 'rejected', error_message: 'KIWIFY_WEBHOOK_TOKEN not configured' })
      return new Response(JSON.stringify({ error: 'Webhook token not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const rawBody = await req.text()
    let payload: any
    try {
      payload = JSON.parse(rawBody)
    } catch {
      await logWebhook({ status: 'rejected', error_message: 'Invalid JSON payload', raw_payload: { raw: rawBody.slice(0, 2000) } })
      return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const tokenCandidates = getTokenCandidates(req, payload)
    const matchedToken = tokenCandidates.find((candidate) => candidate.value === webhookToken)
    const receivedToken = matchedToken?.value || tokenCandidates[0]?.value || ''
    const tokenSource = matchedToken?.source || tokenCandidates[0]?.source || 'missing'
    const tokenMatch = !!matchedToken
    const candidatesPreview = tokenCandidates.length > 0
      ? tokenCandidates.map((candidate) => `${candidate.source}=${redactToken(candidate.value)}`).join(', ')
      : '(none)'

    // Audit log BEFORE rejecting — capture everything
    const previewEmail = String(payload?.Customer?.email || payload?.customer?.email || payload?.email || '').toLowerCase().slice(0, 200) || null
    const previewProductId = String(payload?.Product?.product_id || payload?.product?.id || '').slice(0, 100) || null
    const previewProductName = String(payload?.Product?.product_name || payload?.product?.name || '').slice(0, 200) || null
    const previewEvent = String(payload?.order_status || payload?.event || payload?.type || '').slice(0, 100) || null

    if (!tokenMatch) {
      const expectedPreview = redactToken(webhookToken)
      const receivedPreview = receivedToken ? redactToken(String(receivedToken)) : '(none)'
      console.error(`Invalid webhook token. source=${tokenSource} expected=${expectedPreview} received=${receivedPreview} candidates=${candidatesPreview}`)
      await logWebhook({
        status: 'rejected',
        error_message: `Invalid token. source=${tokenSource} expected=${expectedPreview} received=${receivedPreview} candidates=${candidatesPreview}`,
        token_match: false,
        token_source: tokenSource,
        event_type: previewEvent,
        email: previewEmail,
        product_id: previewProductId,
        product_name: previewProductName,
        raw_payload: payload,
      })
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log(`Kiwify webhook token verified successfully (source=${tokenSource})`)
    await logWebhook({
      status: 'accepted',
      token_match: true,
      token_source: tokenSource,
      event_type: previewEvent,
      email: previewEmail,
      product_id: previewProductId,
      product_name: previewProductName,
      raw_payload: payload,
    })

    // Extract event type - Kiwify uses "order_status" field as event type
    const eventType = sanitizeString(payload.order_status || payload.event || payload.type, 100)
    console.log('Received Kiwify webhook event:', eventType)

    if (!ALL_VALID_EVENTS.includes(eventType as typeof ALL_VALID_EVENTS[number])) {
      console.log(`Ignoring event type: ${eventType}`)
      return new Response(JSON.stringify({ message: 'Event ignored' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const isDeactivation = DEACTIVATION_EVENTS.includes(eventType as typeof DEACTIVATION_EVENTS[number])
    console.log(`Processing ${isDeactivation ? 'DEACTIVATION' : 'ACTIVATION'} event: ${eventType}`)

    // Extract customer email - Kiwify uses Customer object
    const customer = payload.Customer || payload.customer || {}
    const rawEmail = customer.email || payload.email
    const emailValidation = emailSchema.safeParse(rawEmail)
    if (!emailValidation.success) {
      console.error('Invalid or missing customer email')
      return new Response(JSON.stringify({ error: 'Invalid customer email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const normalizedEmail = emailValidation.data.toLowerCase().trim()

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Handle deactivation
    if (isDeactivation) {
      console.log(`Deactivating access for: ${normalizedEmail} due to: ${eventType}`)

      const { data: existing, error: fetchError } = await supabase
        .from('authorized_purchases')
        .select('id')
        .eq('email', normalizedEmail)
        .maybeSingle()

      if (fetchError) {
        console.error('Error fetching purchase:', fetchError)
        return new Response(JSON.stringify({ error: 'Database error' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      if (!existing) {
        return new Response(JSON.stringify({ message: 'No purchase to deactivate' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const { error: updateError } = await supabase
        .from('authorized_purchases')
        .update({ status: 'inactive', updated_at: new Date().toISOString() })
        .eq('id', existing.id)

      if (updateError) {
        console.error('Error deactivating:', updateError)
        return new Response(JSON.stringify({ error: 'Failed to deactivate' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      console.log(`Successfully deactivated: ${normalizedEmail}`)
      return new Response(JSON.stringify({ success: true, message: 'Access deactivated', email: normalizedEmail }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Handle activation (compra_aprovada, subscription_renewed)
    const customerName = sanitizeString(customer.full_name || customer.name || payload.Customer?.full_name, 200)
    const orderId = sanitizeString(payload.order_id || payload.id, 100)

    // Kiwify Product object
    const product = payload.Product || payload.product || {}
    const productName = sanitizeString(product.product_name || product.name, 200)
    const productId = sanitizeString(product.product_id || product.id, 100)

    // Phone & CPF from Kiwify Customer
    const rawPhone = customer.mobile || customer.phone || customer.phone_number
    const customerPhone = sanitizeString(rawPhone, 20).replace(/[^0-9+]/g, '') || null
    const rawCpf = customer.CPF || customer.cpf || customer.document
    const customerCpf = sanitizeString(rawCpf, 14).replace(/[^0-9]/g, '') || null

    // Payment info from Kiwify
    const paymentMethod = sanitizeString(
      payload.payment_method || payload.Subscription?.charges?.payment_method || 'pix', 50
    ).toLowerCase() || 'pix'

    // Amount - Kiwify sends values as string or number
    const rawAmount = payload.sale_value || payload.order_value || 
                      payload.Commissions?.charge_amount || product.price || 0
    let amountPaid = 0
    if (typeof rawAmount === 'number') {
      amountPaid = rawAmount > 1000 ? rawAmount / 100 : rawAmount
    } else if (typeof rawAmount === 'string') {
      const parsed = parseFloat(rawAmount.replace(',', '.')) || 0
      amountPaid = parsed > 1000 ? parsed / 100 : parsed
    }

    // Commission / net value
    const rawCommission = payload.Commissions?.producer_value || payload.producer_value || 0
    let commission = 0
    if (typeof rawCommission === 'number') {
      commission = rawCommission > 1000 ? rawCommission / 100 : rawCommission
    } else if (typeof rawCommission === 'string') {
      const parsed = parseFloat(rawCommission.replace(',', '.')) || 0
      commission = parsed > 1000 ? parsed / 100 : parsed
    }

    const planType = getPlanTypeFromProduct(productName, productId)
    console.log(`Plan: ${planType} | Product: "${productName}" | ID: "${productId}" | Amount: ${amountPaid}`)

    // Upsert authorized_purchases
    const { data: existing } = await supabase
      .from('authorized_purchases')
      .select('id, plan_type')
      .eq('email', normalizedEmail)
      .maybeSingle()

    let result
    if (existing) {
      console.log(`Updating ${normalizedEmail}: ${existing.plan_type} -> ${planType}`)
      result = await supabase
        .from('authorized_purchases')
        .update({
          plan_type: planType,
          product_id: productId,
          product_name: productName,
          transaction_id: orderId,
          customer_name: customerName,
          status: 'active',
          amount_paid: amountPaid,
          commission: commission,
          payment_method: paymentMethod,
          phone: customerPhone,
          cpf: customerCpf,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single()
    } else {
      console.log(`Creating purchase for ${normalizedEmail} with plan: ${planType}`)
      result = await supabase
        .from('authorized_purchases')
        .insert({
          email: normalizedEmail,
          plan_type: planType,
          product_id: productId,
          product_name: productName,
          transaction_id: orderId,
          customer_name: customerName,
          status: 'active',
          amount_paid: amountPaid,
          commission: commission,
          payment_method: paymentMethod,
          phone: customerPhone,
          cpf: customerCpf,
          purchased_at: new Date().toISOString(),
        })
        .select()
        .single()
    }

    if (result.error) {
      console.error('Error saving purchase:', result.error)
      return new Response(JSON.stringify({ error: 'Failed to save purchase' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log(`Successfully authorized: ${normalizedEmail} for plan: ${planType}`)

    // Also grant access to any matching /aulas course by kiwify_product_id
    try {
      if (productId) {
        const { data: matchedCursos } = await supabase
          .from('aulas_cursos')
          .select('id, kiwify_product_id, title')
          .eq('kiwify_product_id', productId)
        if (matchedCursos && matchedCursos.length > 0) {
          for (const c of matchedCursos) {
            await supabase.from('aulas_product_access').upsert(
              {
                email: normalizedEmail,
                curso_id: c.id,
                kiwify_product_id: productId,
                source: 'kiwify',
              },
              { onConflict: 'email,curso_id' },
            )
          }
          console.log(`Granted aulas access for ${normalizedEmail} on ${matchedCursos.length} curso(s).`)

          // Send welcome email (only once per email — idempotent via welcome_sent_at)
          try {
            const { data: accessRow } = await supabase
              .from('aulas_product_access')
              .select('id, welcome_sent_at')
              .eq('email', normalizedEmail)
              .eq('curso_id', matchedCursos[0].id)
              .maybeSingle()

            if (accessRow && !accessRow.welcome_sent_at) {
              const courseTitle = matchedCursos[0].title || productName || 'seu curso'
              const messageId = crypto.randomUUID()
              const html = await renderAsync(
                React.createElement(AulasWelcomeEmail, {
                  customerName: customerName || undefined,
                  productName: courseTitle,
                  recipient: normalizedEmail,
                }),
              )
              const text = await renderAsync(
                React.createElement(AulasWelcomeEmail, {
                  customerName: customerName || undefined,
                  productName: courseTitle,
                  recipient: normalizedEmail,
                }),
                { plainText: true },
              )

              // Garante unsubscribe_token (obrigatório pelo Email API)
              let unsubscribeToken: string | null = null
              const { data: existingToken } = await supabase
                .from('email_unsubscribe_tokens')
                .select('token, used_at')
                .eq('email', normalizedEmail)
                .maybeSingle()
              if (existingToken && !existingToken.used_at) {
                unsubscribeToken = existingToken.token
              } else {
                const newToken =
                  crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '')
                await supabase
                  .from('email_unsubscribe_tokens')
                  .upsert({ token: newToken, email: normalizedEmail }, {
                    onConflict: 'email',
                    ignoreDuplicates: true,
                  })
                const { data: stored } = await supabase
                  .from('email_unsubscribe_tokens')
                  .select('token')
                  .eq('email', normalizedEmail)
                  .maybeSingle()
                unsubscribeToken = stored?.token ?? newToken
              }

              await supabase.from('email_send_log').insert({
                message_id: messageId,
                template_name: 'aulas-welcome',
                recipient_email: normalizedEmail,
                status: 'pending',
              })

              const { error: enqueueError } = await supabase.rpc('enqueue_email', {
                queue_name: 'transactional_emails',
                payload: {
                  message_id: messageId,
                  to: normalizedEmail,
                  from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
                  sender_domain: SENDER_DOMAIN,
                  subject: 'Sua compra foi confirmada — acesse sua área de membros',
                  html,
                  text,
                  purpose: 'transactional',
                  label: 'aulas-welcome',
                  idempotency_key: `aulas-welcome-${normalizedEmail}-${matchedCursos[0].id}`,
                  unsubscribe_token: unsubscribeToken,
                  queued_at: new Date().toISOString(),
                },
              })

              if (enqueueError) {
                console.error('enqueue aulas welcome email failed', enqueueError)
              } else {
                await supabase
                  .from('aulas_product_access')
                  .update({ welcome_sent_at: new Date().toISOString() })
                  .eq('id', accessRow.id)
                console.log(`Welcome email enqueued for ${normalizedEmail}`)
              }
            }
          } catch (emailErr) {
            console.error('welcome email error', emailErr)
          }
        }
      }
    } catch (e) {
      console.error('aulas_product_access upsert error', e)
    }

    return new Response(JSON.stringify({ success: true, email: normalizedEmail, plan: planType }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
