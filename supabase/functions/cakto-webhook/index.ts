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
}

interface WebhookProduct {
  name?: string
  id?: string
}

interface WebhookData {
  customer?: WebhookCustomer
  buyer?: WebhookCustomer
  email?: string
  name?: string
  id?: string
  transaction_id?: string
  order_id?: string
  status?: string
  product?: WebhookProduct
  offer?: WebhookProduct
  plan?: WebhookProduct
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
  id?: string
  transaction_id?: string
  order_id?: string
  status?: string
  product?: WebhookProduct
  offer?: WebhookProduct
  plan?: WebhookProduct
}

// Zod schema for email validation
const emailSchema = z.string().email().max(255)

// Valid event types for processing
const VALID_EVENTS = [
  'payment.success',
  'subscription.created',
  'purchase_approved',
  'subscription_created',
  'subscription_activated',
  'subscription.activated'
] as const

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

// Map Cakto product/offer names to plan types
// Checks both product name and offer name for maximum compatibility
function getPlanTypeFromProduct(productName: string, offerName: string): string {
  const productLower = productName.toLowerCase()
  const offerLower = offerName.toLowerCase()
  const combined = `${productLower} ${offerLower}`
  
  // Check for PREMIUM first (highest tier)
  if (combined.includes('premium')) return 'premium'
  // Then check for GOLD
  if (combined.includes('gold')) return 'gold'
  // Default to START
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
    const signature = req.headers.get('x-signature') || ''

    // Verify signature
    if (signature) {
      const isValid = await verifySignature(rawBody, signature, webhookSecret)
      if (!isValid) {
        console.error('Invalid webhook signature')
        return new Response(JSON.stringify({ error: 'Invalid signature' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
    }

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
    if (!VALID_EVENTS.includes(eventType as typeof VALID_EVENTS[number])) {
      console.log(`Ignoring event type: ${eventType}`)
      return new Response(JSON.stringify({ message: 'Event ignored' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    console.log(`Processing valid event: ${eventType}`)

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

    // Sanitize all string inputs
    const customerEmail = emailValidation.data
    const customerName = sanitizeString(data.customer?.name || data.buyer?.name || data.name, 200)
    const transactionId = sanitizeString(data.id || data.transaction_id || data.order_id, 100)
    const productName = sanitizeString(data.product?.name, 200)
    const offerName = sanitizeString(data.offer?.name || data.plan?.name, 200)
    const productId = sanitizeString(data.product?.id || data.offer?.id || data.plan?.id, 100)
    const status = sanitizeString(data.status, 50) || 'active'

    // Determine plan type based on product AND offer names
    const planType = getPlanTypeFromProduct(productName, offerName)
    const normalizedEmail = customerEmail.toLowerCase().trim()
    
    console.log(`Detected plan type: ${planType} from product: "${productName}" / offer: "${offerName}"`)

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

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
