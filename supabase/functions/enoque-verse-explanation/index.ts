import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-aulas-token',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const ENOQUE_SLUG = 'os-segredos-do-livro-de-enoque'

const j = (d: unknown, s = 200) =>
  new Response(JSON.stringify(d), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

const TEMP_FALLBACK_MESSAGE = 'Comentário temporariamente indisponível. Tente novamente em instantes.'

async function sha256(t: string) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t))
  return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('')
}

function extractExplanation(payload: any) {
  const content = payload?.choices?.[0]?.message?.content ?? payload?.choices?.[0]?.text ?? payload?.output_text ?? ''

  if (typeof content === 'string') return content.trim()

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') return part
        if (typeof part?.text === 'string') return part.text
        if (typeof part?.content === 'string') return part.content
        if (typeof part?.output_text === 'string') return part.output_text
        return ''
      })
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  return ''
}

async function generateExplanation(apiKey: string, system: string, userPrompt: string) {
  let lastStatus = 500
  let lastBody = ''

  for (let attempt = 1; attempt <= 2; attempt++) {
    const resp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Lovable-API-Key': apiKey,
        'X-Lovable-AIG-SDK': 'vercel-ai-sdk',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 400,
      }),
    })

    if (!resp.ok) {
      lastStatus = resp.status
      lastBody = await resp.text()
      console.error('AI error', resp.status, lastBody)

      if ([500, 502, 503, 504].includes(resp.status) && attempt < 2) continue
      break
    }

    const data = await resp.json()
    const explanation = extractExplanation(data)
    if (explanation.length >= 30) return explanation

    console.error('AI empty payload', JSON.stringify(data))
    lastStatus = 500
    lastBody = JSON.stringify(data)
  }

  const error = new Error('AI generation failed') as Error & { status?: number; body?: string }
  error.status = lastStatus
  error.body = lastBody
  throw error
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { chapter, verse, text } = await req.json()
    const ch = Number(chapter), vs = Number(verse)
    if (!Number.isInteger(ch) || !Number.isInteger(vs) || ch < 1 || vs < 1) {
      return j({ error: 'Parâmetros inválidos' }, 400)
    }

    // 1) Cache hit?
    const { data: cached } = await supabase
      .from('enoque_verse_explanations')
      .select('explanation')
      .eq('chapter_number', ch).eq('verse_number', vs).maybeSingle()
    if (cached?.explanation) return j({ explanation: cached.explanation, cached: true })

    // 2) Auth — must be a valid aulas session with access to Enoque curso
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

    // 3) Generate with Lovable AI Gateway
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    if (!LOVABLE_API_KEY) return j({ error: 'AI não configurada' }, 500)

    const system = `Você é um teólogo e exegeta cristão, especialista em literatura apócrifa judaico-cristã (1 Enoque / Enoque Etíope) e em sua relação com a Bíblia canônica (AT, NT e deuterocanônicos católicos).

Para cada versículo, escreva uma MINI explicação em português brasileiro:
- MÁXIMO 70 palavras, em UM único parágrafo fluido.
- Seja teológico, histórico e coerente. Nunca invente fatos.
- SEMPRE conecte o versículo a pelo menos UMA passagem bíblica real e relevante (canônica ou deuterocanônica), citando a referência entre parênteses — ex.: (Gn 6,1-4), (Jd 14-15), (2Pe 2,4), (Sb 2,23-24), (Dn 7,9-10).
- Sem títulos, sem markdown, sem emojis, sem listas. Tom reverente e claro.`

    const userPrompt = `Enoque ${ch}:${vs} — "${String(text ?? '').slice(0, 600)}"\n\nGere a mini-explicação seguindo o formato.`

    let explanation = ''
    try {
      explanation = await generateExplanation(LOVABLE_API_KEY, system, userPrompt)
    } catch (e) {
      const status = typeof e === 'object' && e && 'status' in e ? Number((e as { status?: number }).status) : 500
      if (status === 429) return j({ error: 'Muitas requisições. Aguarde alguns segundos.' }, 429)
      if (status === 402) return j({ error: 'Créditos de IA esgotados.' }, 402)
      console.error('enoque-verse-explanation fallback', e)
      return j({
        explanation: TEMP_FALLBACK_MESSAGE,
        fallback: true,
        error: 'Falha temporária ao gerar explicação. Tente novamente.',
      })
    }

    await supabase.from('enoque_verse_explanations').upsert({
      chapter_number: ch, verse_number: vs, explanation, updated_at: new Date().toISOString(),
    }, { onConflict: 'chapter_number,verse_number' })

    return j({ explanation, cached: false })
  } catch (e) {
    console.error('enoque-verse-explanation error', e)
    return j({
      explanation: TEMP_FALLBACK_MESSAGE,
      fallback: true,
      error: 'Erro interno',
    })
  }
})
