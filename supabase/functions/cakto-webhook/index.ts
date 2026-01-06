import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

// Map Cakto product/offer names to plan types
// Checks both product name and offer name for maximum compatibility
function getPlanTypeFromProduct(productName: string, offerName: string): string {
  const productLower = productName?.toLowerCase() || ''
  const offerLower = offerName?.toLowerCase() || ''
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

    // Parse the webhook payload
    const payload = JSON.parse(rawBody)
    console.log('Received Cakto webhook:', JSON.stringify(payload, null, 2))

    // Extract event type and data
    const eventType = payload.event || payload.type
    const data = payload.data || payload

    // Process successful payments and subscriptions from Cakto
    // Cakto sends: purchase_approved, subscription_created, subscription_activated, etc.
    const validEvents = [
      'payment.success',
      'subscription.created',
      'purchase_approved',
      'subscription_created',
      'subscription_activated',
      'subscription.activated'
    ]
    
    if (!validEvents.includes(eventType)) {
      console.log(`Ignoring event type: ${eventType}`)
      return new Response(JSON.stringify({ message: 'Event ignored' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    console.log(`Processing valid event: ${eventType}`)

    // Extract customer email and other details
    const customerEmail = data.customer?.email || data.buyer?.email || data.email
    const customerName = data.customer?.name || data.buyer?.name || data.name
    const transactionId = data.id || data.transaction_id || data.order_id
    // Extract all possible names for plan detection
    const productName = data.product?.name || ''
    const offerName = data.offer?.name || data.plan?.name || ''
    const productId = data.product?.id || data.offer?.id || data.plan?.id
    const status = data.status || 'active'

    if (!customerEmail) {
      console.error('No customer email in payload')
      return new Response(JSON.stringify({ error: 'Missing customer email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

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
