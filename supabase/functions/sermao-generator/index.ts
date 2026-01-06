import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Você é um especialista em homilética bíblica e cria ESBOÇOS DE SERMÕES concisos e objetivos para apoio na pregação. Seu estilo é inspirado nos grandes pregadores reformados:

- Hernandes Dias Lopes
- Augustus Nicodemus Lopes  
- Charles Spurgeon
- John MacArthur
- John Stott
- Dietrich Bonhoeffer

## FORMATO DO ESBOÇO

Gere esboços NO SEGUINTE FORMATO EXATO (não sermões extensos, mas ESBOÇOS de apoio):

---

**TEMA:** [Título criativo e memorável]

**Subtítulo:** [Uma frase que capture a essência]

---

**TEXTO BASE**
[Referência bíblica] (NAA)
"[Texto bíblico completo]"

---

**INTRODUÇÃO TEOLÓGICA**
[2-4 frases contextualizando o texto e sua relevância. Use 👉 para destacar pontos-chave]

---

**1. [PRIMEIRO PONTO EM CAIXA ALTA] (versículo)**
"[Citação do versículo]"

[1-2 frases explicando o ponto]

**Exegese**
[Explicação breve da palavra grega/hebraica relevante e seu significado]

**Textos de apoio (NAA)**
[Referência 1]
"[Citação]"

[Referência 2]  
"[Citação]"

👉 [Aplicação direta em uma frase]

---

**2. [SEGUNDO PONTO EM CAIXA ALTA] (versículo)**
[Mesma estrutura do ponto 1]

---

**3. [TERCEIRO PONTO EM CAIXA ALTA] (versículo)**
[Mesma estrutura - adicione 4-6 pontos no total conforme necessário]

---

**CITAÇÃO**
[Nome do teólogo/pregador]:
"[Citação verídica e relevante]"

---

**APLICAÇÃO FINAL**
[Lista de aplicações práticas com bullet points]
- [Aplicação 1]
- [Aplicação 2]
- [Aplicação 3]

---

**FRASE FINAL PARA ENCERRAMENTO**
"[Uma frase poderosa e memorável para fechar]"

---

## REGRAS IMPORTANTES

1. **SEJA CONCISO**: Esboço de apoio, NÃO um roteiro extenso
2. **USE EMOJIS**: 👉 para destacar aplicações práticas
3. **CITAÇÕES VERÍDICAS**: Só cite frases reais de teólogos conhecidos
4. **EXEGESE OBJETIVA**: Explique palavras gregas/hebraicas em 1-2 frases
5. **TEXTOS DE APOIO**: Use sempre a versão NAA
6. **3-6 PONTOS**: Dependendo da extensão do texto base
7. **FORMATAÇÃO**: Use markdown com negrito, itálico e separadores
8. **LINGUAGEM**: Português brasileiro, clara e acessível

Responda sempre em português brasileiro.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: authError } = await supabase.auth.getClaims(token);

    if (authError || !claimsData?.claims) {
      console.error("Auth error:", authError);
      return new Response(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log(`User ${userId} generating sermon`);

    const body = await req.json();
    const { theme, sermonType, additionalContext } = body;

    // Validate theme input
    if (!theme || typeof theme !== "string") {
      return new Response(
        JSON.stringify({ error: "Tema deve ser uma string válida" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const MAX_THEME_LENGTH = 500;
    const trimmedTheme = theme.trim();
    if (trimmedTheme.length === 0 || trimmedTheme.length > MAX_THEME_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Tema deve ter entre 1 e ${MAX_THEME_LENGTH} caracteres` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate sermonType if provided
    const validSermonTypes = ["expositivo", "textual", "tematico"];
    if (sermonType && (typeof sermonType !== "string" || !validSermonTypes.includes(sermonType))) {
      return new Response(
        JSON.stringify({ error: `Tipo de sermão deve ser um de: ${validSermonTypes.join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate additionalContext if provided
    const MAX_CONTEXT_LENGTH = 1000;
    if (additionalContext !== undefined && additionalContext !== null) {
      if (typeof additionalContext !== "string") {
        return new Response(
          JSON.stringify({ error: "Contexto adicional deve ser uma string" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (additionalContext.length > MAX_CONTEXT_LENGTH) {
        return new Response(
          JSON.stringify({ error: `Contexto adicional deve ter no máximo ${MAX_CONTEXT_LENGTH} caracteres` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Configuração de API ausente" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    // Build user prompt based on sermon type
    let userPrompt = `Gere um ESBOÇO DE SERMÃO ${sermonType.toUpperCase()} sobre: "${theme}"

Tipo: ${sermonType === 'expositivo' ? 'Siga a estrutura do texto verso a verso' : sermonType === 'textual' ? 'Derive os pontos de um texto curto (1-3 versículos)' : 'Parta do tema usando vários textos bíblicos'}`;
    
    if (additionalContext) {
      userPrompt += `\n\nContexto adicional: ${additionalContext}`;
    }

    userPrompt += `\n\nLembre-se: ESBOÇO CONCISO para apoio na pregação, não um roteiro extenso. Siga exatamente o formato especificado.`;

    console.log(`Generating ${sermonType} sermon outline for: ${theme}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns minutos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Entre em contato com o suporte." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Erro ao gerar sermão. Tente novamente." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return streaming response
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
      },
    });
  } catch (error) {
    console.error("sermao-generator error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
