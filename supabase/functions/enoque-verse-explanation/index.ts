import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-aulas-token',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const ENOQUE_SLUG = 'os-segredos-do-livro-de-enoque'

const j = (d: unknown, s = 200) =>
  new Response(JSON.stringify(d), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

async function sha256(t: string) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t))
  return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('')
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

    const system = `Você é um teólogo e exegeta especialista em literatura apócrifa judaico-cristã, com profundo conhecimento do Livro de Enoque (1 Enoque / Enoque Etíope). Forneça mini-explicações CONCISAS, claras e instigantes para cada versículo.

FORMATO OBRIGATÓRIO (máximo 180 palavras):
- 1 parágrafo curto de **Sentido** (o que o versículo afirma).
- 1 parágrafo de **Contexto** (referências bíblicas, símbolos angelicais, ligação com Gênesis 6, Judas 14-15, tradição enoquiana).
- 1 frase final de **Aplicação espiritual** prática.

Use português brasileiro elegante, sem títulos em markdown, sem emojis. Separe os blocos com linha em branco. Nunca invente versículos.`

    const userPrompt = `Versículo de Enoque ${ch}:${vs} — "${String(text ?? '').slice(0, 600)}"\n\nProduza a mini-explicação.`

    const resp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: userPrompt },
        ],
      }),
    })
    if (!resp.ok) {
      const t = await resp.text()
      console.error('AI error', resp.status, t)
      if (resp.status === 429) return j({ error: 'Muitas requisições. Aguarde alguns segundos.' }, 429)
      if (resp.status === 402) return j({ error: 'Créditos de IA esgotados.' }, 402)
      return j({ error: 'Falha ao gerar explicação' }, 500)
    }
    const data = await resp.json()
    const explanation: string = data?.choices?.[0]?.message?.content ?? ''
    if (!explanation || explanation.length < 30) return j({ error: 'Resposta vazia' }, 500)

    await supabase.from('enoque_verse_explanations').upsert({
      chapter_number: ch, verse_number: vs, explanation, updated_at: new Date().toISOString(),
    }, { onConflict: 'chapter_number,verse_number' })

    return j({ explanation, cached: false })
  } catch (e) {
    console.error('enoque-verse-explanation error', e)
    return j({ error: 'Erro interno' }, 500)
  }
})
