import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-signature',
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60000 // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 30 // Max 30 requests per minute
const requestLog: Map<string, number[]> = new Map()

// Clean old entries from request log (prevent memory leaks)
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

// Check if request should be rate limited
function isRateLimited(identifier: string): boolean {
  cleanRequestLog()
  const now = Date.now()
  const timestamps = requestLog.get(identifier) || []
  
  // Filter to only recent requests within the window
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
  
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }
  
  // Record this request
  recentTimestamps.push(now)
  requestLog.set(identifier, recentTimestamps)
  
  return false
}

// Verify webhook signature from Cakto
async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  const computedSignature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)))
  
  return computedSignature === signature
}

// Type definitions for webhook data
interface WebhookCustomer {
  email?: string
  name?: string
  phone?: string
  phone_number?: string
  cellphone?: string
  mobile?: string
  cpf?: string
  document?: string
  tax_id?: string
}

interface WebhookProduct {
  name?: string
  id?: string
}

interface WebhookPayment {
  method?: string
  payment_method?: string
  type?: string
  amount?: number
  value?: number
  price?: number
  total?: number
}

interface WebhookData {
  customer?: WebhookCustomer
  buyer?: WebhookCustomer
  email?: string
  name?: string
  phone?: string
  phone_number?: string
  cellphone?: string
  cpf?: string
  document?: string
  id?: string
  transaction_id?: string
  order_id?: string
  status?: string
  product?: WebhookProduct
  offer?: WebhookProduct
  plan?: WebhookProduct
  payment?: WebhookPayment
  payment_method?: string
  amount?: number
  value?: number
  price?: number
  total?: number
}

interface WebhookPayload {
  event?: string
  type?: string
  data?: WebhookData
  // Allow payload itself to contain data fields (Cakto sends data at root level sometimes)
  customer?: WebhookCustomer
  buyer?: WebhookCustomer
  email?: string
  name?: string
  phone?: string
  phone_number?: string
  cellphone?: string
  cpf?: string
  document?: string
  id?: string
  transaction_id?: string
  order_id?: string
  status?: string
  product?: WebhookProduct
  offer?: WebhookProduct
  plan?: WebhookProduct
  payment?: WebhookPayment
  payment_method?: string
  amount?: number
  value?: number
  price?: number
  total?: number
}

// Zod schema for email validation
const emailSchema = z.string().email().max(255)

// Valid event types for processing (positive events - activate access)
const ACTIVATION_EVENTS = [
  'payment.success',
  'subscription.created',
  'purchase_approved',
  'subscription_created',
  'subscription_activated',
  'subscription.activated'
] as const

// Deactivation events (cancel, refund, chargeback, etc.)
const DEACTIVATION_EVENTS = [
  'subscription.cancelled',
  'subscription.canceled',
  'subscription_cancelled',
  'subscription_canceled',
  'subscription.expired',
  'subscription_expired',
  'refund.created',
  'refund.approved',
  'refund_created',
  'refund_approved',
  'chargeback.created',
  'chargeback.opened',
  'chargeback_created',
  'dispute.created',
  'dispute.opened',
  'payment.refunded',
  'payment_refunded',
  'purchase_refunded',
  'purchase.refunded',
  'subscription.deactivated',
  'subscription_deactivated'
] as const

// All valid events (both activation and deactivation)
const ALL_VALID_EVENTS = [...ACTIVATION_EVENTS, ...DEACTIVATION_EVENTS] as const

// Sanitize string input to prevent injection
function sanitizeString(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>'"\\]/g, '') // Remove potentially dangerous characters
}

// Validate basic webhook structure
function isValidWebhookPayload(payload: unknown): payload is WebhookPayload {
  return typeof payload === 'object' && payload !== null
}

// Map Cakto product/offer names and checkout IDs to plan types
// Updated mapping for new plan structure (v60):
// - START: R$ 14,90/mês ou R$ 97/ano (checkout IDs: hhrx4r7, 6szcxh2)
// - GOLD: R$ 39,90/mês ou R$ 287/ano (checkout IDs: evd3575_710682, 35xwf5x)
// - PREMIUM: R$ 69,90/mês ou R$ 575/ano (checkout IDs: g5pbha9, 3ajb7to)
function getPlanTypeFromProduct(productName: string, offerName: string, productId?: string): string {
  const productLower = productName.toLowerCase()
  const offerLower = offerName.toLowerCase()
  const productIdLower = (productId || '').toLowerCase()
  const combined = `${productLower} ${offerLower} ${productIdLower}`
  
  // Check by checkout/product ID first (most reliable)
  // START plan checkout IDs
  if (productIdLower.includes('hhrx4r7') || productIdLower.includes('6szcxh2')) {
    return 'start'
  }
  
  // GOLD plan checkout IDs (includes legacy start IDs that are now gold)
  if (productIdLower.includes('evd3575') || productIdLower.includes('710682') || productIdLower.includes('35xwf5x')) {
    return 'gold'
  }
  
  // PREMIUM plan checkout IDs
  if (productIdLower.includes('g5pbha9') || productIdLower.includes('3ajb7to')) {
    return 'premium'
  }
  
  // Check by name (fallback)
  // Check for PREMIUM first (highest tier)
  if (combined.includes('premium')) return 'premium'
  
  // Check for GOLD 
  if (combined.includes('gold')) return 'gold'
  
  // Check for START (paid start plan)
  if (combined.includes('start')) return 'start'
  
  // Price-based mapping (fallback)
  // ~R$ 14.90 or ~R$ 97 = START
  // ~R$ 39.90 or ~R$ 287 = GOLD
  // ~R$ 69.90 or ~R$ 575 = PREMIUM
  if (combined.includes('14.9') || combined.includes('14,9') || combined.includes('97')) {
    return 'start'
  }
  if (combined.includes('39') || combined.includes('287')) {
    return 'gold'
  }
  if (combined.includes('69') || combined.includes('575')) {
    return 'premium'
  }
  
  // Default to START for new products (entry-level paid plan)
  return 'start'
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  // Get client IP for rate limiting (use forwarded header or default)
  const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                   req.headers.get('cf-connecting-ip') || 
                   'unknown'
  
  // Check rate limit
  if (isRateLimited(clientIP)) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`)
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json',
        'Retry-After': '60'
      }
    })
  }

  try {
    const webhookSecret = Deno.env.get('CAKTO_WEBHOOK_SECRET')
    if (!webhookSecret) {
      console.error('CAKTO_WEBHOOK_SECRET not configured')
      return new Response(JSON.stringify({ error: 'Webhook secret not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Get raw body for signature verification
    const rawBody = await req.text()
    const signature = req.headers.get('x-signature')

    // SECURITY: Signature is REQUIRED - reject requests without it
    if (!signature) {
      console.error('Missing webhook signature - rejecting request')
      return new Response(JSON.stringify({ error: 'Missing signature' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Verify the provided signature
    const isValid = await verifySignature(rawBody, signature, webhookSecret)
    if (!isValid) {
      console.error('Invalid webhook signature - rejecting request')
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    console.log('Webhook signature verified successfully')

    // Parse and validate the webhook payload
    let parsedPayload
    try {
      parsedPayload = JSON.parse(rawBody)
    } catch {
      console.error('Invalid JSON in webhook payload')
      return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Validate basic payload structure
    if (!isValidWebhookPayload(parsedPayload)) {
      console.error('Invalid webhook payload structure')
      return new Response(JSON.stringify({ error: 'Invalid payload structure' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const payload = parsedPayload
    console.log('Received Cakto webhook event type:', payload.event || payload.type)

    // Extract event type
    const eventType = sanitizeString(payload.event || payload.type, 100)

    // Validate event type against allowed values
    if (!ALL_VALID_EVENTS.includes(eventType as typeof ALL_VALID_EVENTS[number])) {
      console.log(`Ignoring event type: ${eventType}`)
      return new Response(JSON.stringify({ message: 'Event ignored' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    // Check if this is a deactivation event
    const isDeactivation = DEACTIVATION_EVENTS.includes(eventType as typeof DEACTIVATION_EVENTS[number])
    console.log(`Processing ${isDeactivation ? 'DEACTIVATION' : 'ACTIVATION'} event: ${eventType}`)

    // Extract data - Cakto can send data nested or at root level
    const data: WebhookData = payload.data || payload

    // Extract and validate customer email
    const rawEmail = data.customer?.email || data.buyer?.email || data.email
    const emailValidation = emailSchema.safeParse(rawEmail)
    if (!emailValidation.success) {
      console.error('Invalid or missing customer email in payload')
      return new Response(JSON.stringify({ error: 'Invalid customer email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const normalizedEmail = emailValidation.data.toLowerCase().trim()

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Handle deactivation events (refund, chargeback, cancellation)
    if (isDeactivation) {
      console.log(`Deactivating access for: ${normalizedEmail} due to event: ${eventType}`)
      
      const { data: existing, error: fetchError } = await supabase
        .from('authorized_purchases')
        .select('id')
        .eq('email', normalizedEmail)
        .maybeSingle()

      if (fetchError) {
        console.error('Error fetching purchase for deactivation:', fetchError)
        return new Response(JSON.stringify({ error: 'Database error' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      if (!existing) {
        console.log(`No purchase found for ${normalizedEmail}, nothing to deactivate`)
        return new Response(JSON.stringify({ message: 'No purchase to deactivate' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const { error: updateError } = await supabase
        .from('authorized_purchases')
        .update({
          status: 'inactive',
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)

      if (updateError) {
        console.error('Error deactivating purchase:', updateError)
        return new Response(JSON.stringify({ error: 'Failed to deactivate' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      console.log(`Successfully deactivated access for: ${normalizedEmail}`)
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Access deactivated',
        email: normalizedEmail,
        reason: eventType
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Handle activation events (payment, subscription creation)
    // Sanitize all string inputs
    const customerEmail = emailValidation.data
    const customerName = sanitizeString(data.customer?.name || data.buyer?.name || data.name, 200)
    const transactionId = sanitizeString(data.id || data.transaction_id || data.order_id, 100)
    const productName = sanitizeString(data.product?.name, 200)
    const offerName = sanitizeString(data.offer?.name || data.plan?.name, 200)
    const productId = sanitizeString(data.product?.id || data.offer?.id || data.plan?.id, 100)
    const status = sanitizeString(data.status, 50) || 'active'

    // Extract phone number (try multiple possible fields from Cakto)
    const rawPhone = data.customer?.phone || data.customer?.phone_number || data.customer?.cellphone || data.customer?.mobile ||
                     data.buyer?.phone || data.buyer?.phone_number || data.buyer?.cellphone || data.buyer?.mobile ||
                     data.phone || data.phone_number || data.cellphone ||
                     (payload.data as any)?.customer?.phone || (payload.data as any)?.buyer?.phone
    const customerPhone = sanitizeString(rawPhone, 20).replace(/[^0-9+]/g, '') || null
    
    // Extract CPF/Document (try multiple possible fields from Cakto)
    const rawCpf = data.customer?.cpf || data.customer?.document || data.customer?.tax_id ||
                   data.buyer?.cpf || data.buyer?.document || data.buyer?.tax_id ||
                   data.cpf || data.document ||
                   (payload.data as any)?.customer?.cpf || (payload.data as any)?.buyer?.cpf
    const customerCpf = sanitizeString(rawCpf, 14).replace(/[^0-9]/g, '') || null
    
    console.log(`Extracted phone: ${customerPhone}, CPF: ${customerCpf ? '***' + customerCpf.slice(-4) : 'none'}`)

    // Extract payment method
    const rawPaymentMethod = data.payment?.method || data.payment?.payment_method || 
                             data.payment?.type || data.payment_method || 'pix'
    const paymentMethod = sanitizeString(rawPaymentMethod, 50).toLowerCase() || 'pix'

    // Extract amount paid (try multiple possible fields from Cakto)
    const rawAmount = data.payment?.amount || data.payment?.value || data.payment?.price || 
                      data.payment?.total || (data as any).net_value || (data as any).gross_value ||
                      data.amount || data.value || data.price || data.total ||
                      (payload.data as any)?.payment?.amount || (payload.data as any)?.payment?.value ||
                      (payload.data as any)?.net_value || (payload.data as any)?.gross_value
    
    let amountPaid = 0
    if (typeof rawAmount === 'number') {
      amountPaid = rawAmount > 1000 ? rawAmount / 100 : rawAmount
    } else if (typeof rawAmount === 'string') {
      const parsed = parseFloat(rawAmount.replace(',', '.')) || 0
      amountPaid = parsed > 1000 ? parsed / 100 : parsed
    }
    
    console.log(`Raw amount from webhook: ${rawAmount}, Processed amount: ${amountPaid}`)

    // Determine plan type based on product, offer names, AND product ID
    const planType = getPlanTypeFromProduct(productName, offerName, productId)
    
    console.log(`Detected plan type: ${planType} from product: "${productName}" / offer: "${offerName}" / id: "${productId}"`)
    console.log(`Payment method: ${paymentMethod}, Amount: ${amountPaid}`)

    // Check if email already exists
    const { data: existing } = await supabase
      .from('authorized_purchases')
      .select('id, plan_type')
      .eq('email', normalizedEmail)
      .maybeSingle()

    let result
    if (existing) {
      // Update existing record (upgrade/renew)
      console.log(`Updating existing purchase for ${normalizedEmail}: ${existing.plan_type} -> ${planType}`)
      result = await supabase
        .from('authorized_purchases')
        .update({
          plan_type: planType,
          product_id: productId,
          product_name: productName || offerName,
          transaction_id: transactionId,
          customer_name: customerName,
          status: status === 'paid' || status === 'active' ? 'active' : status,
          amount_paid: amountPaid,
          payment_method: paymentMethod,
          phone: customerPhone,
          cpf: customerCpf,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single()
    } else {
      // Insert new record
      console.log(`Creating new purchase for ${normalizedEmail} with plan: ${planType}`)
      result = await supabase
        .from('authorized_purchases')
        .insert({
          email: normalizedEmail,
          plan_type: planType,
          product_id: productId,
          product_name: productName || offerName,
          transaction_id: transactionId,
          customer_name: customerName,
          status: status === 'paid' || status === 'active' ? 'active' : status,
          amount_paid: amountPaid,
          payment_method: paymentMethod,
          phone: customerPhone,
          cpf: customerCpf,
          purchased_at: new Date().toISOString(),
        })
        .select()
        .single()
    }

    if (result.error) {
      console.error('Error saving authorized purchase:', result.error)
      return new Response(JSON.stringify({ error: 'Failed to save purchase' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log(`Successfully authorized email: ${normalizedEmail} for plan: ${planType}`)

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Purchase authorized',
      email: customerEmail,
      plan: planType
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
