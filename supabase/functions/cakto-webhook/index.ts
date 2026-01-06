import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-signature',
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

// Map Cakto product IDs to plan types
function getPlanTypeFromProduct(productId: string, productName: string): string {
  const nameLower = productName?.toLowerCase() || ''
  
  if (nameLower.includes('premium')) return 'premium'
  if (nameLower.includes('gold')) return 'gold'
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

    // Only process successful payments
    if (eventType !== 'payment.success' && eventType !== 'subscription.created') {
      console.log(`Ignoring event type: ${eventType}`)
      return new Response(JSON.stringify({ message: 'Event ignored' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Extract customer email and other details
    const customerEmail = data.customer?.email || data.buyer?.email || data.email
    const customerName = data.customer?.name || data.buyer?.name || data.name
    const transactionId = data.id || data.transaction_id || data.order_id
    const productId = data.product?.id || data.offer?.id || data.plan?.id
    const productName = data.product?.name || data.offer?.name || data.plan?.name
    const status = data.status || 'active'

    if (!customerEmail) {
      console.error('No customer email in payload')
      return new Response(JSON.stringify({ error: 'Missing customer email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Determine plan type based on product
    const planType = getPlanTypeFromProduct(productId, productName)

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Upsert the authorized purchase
    const { data: purchase, error } = await supabase
      .from('authorized_purchases')
      .upsert({
        email: customerEmail.toLowerCase().trim(),
        plan_type: planType,
        product_id: productId,
        product_name: productName,
        transaction_id: transactionId,
        customer_name: customerName,
        status: status === 'paid' || status === 'active' ? 'active' : status,
        purchased_at: new Date().toISOString(),
      }, {
        onConflict: 'transaction_id'
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving authorized purchase:', error)
      return new Response(JSON.stringify({ error: 'Failed to save purchase' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log(`Successfully authorized email: ${customerEmail} for plan: ${planType}`)

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
