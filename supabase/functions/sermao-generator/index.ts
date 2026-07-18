import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { enforceUsage, refundUsage } from "../_shared/enforce-usage.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Você é um especialista em homilética bíblica e cria ESBOÇOS DE SERMÕES concisos para apoio na pregação. Inspirado em: Hernandes Dias Lopes, Augustus Nicodemus, Charles Spurgeon, John MacArthur.

## TIPOS DE SERMÃO (SIGA RIGOROSAMENTE)

**EXPOSITIVO**: Analise o texto VERSO A VERSO em sequência. Cada ponto deve corresponder a um versículo ou grupo de versículos na ordem do texto. O sermão "caminha" pelo texto do início ao fim.

**TEXTUAL**: Derive TODOS os pontos de um texto curto (1-3 versículos apenas). Os pontos surgem das palavras, frases ou ideias DENTRO desse único texto. Não use outros textos como pontos principais.

**TEMÁTICO**: Parta do TEMA e use MÚLTIPLOS textos bíblicos de diferentes livros para construir os pontos. Cada ponto pode vir de um texto diferente da Bíblia.

## FORMATO DO ESBOÇO

**TEMA:** [Título criativo]
**Subtítulo:** [Frase que capture a essência]

**TEXTO BASE**
[Referência] (NAA)
"[Texto bíblico]"

**INTRODUÇÃO**
[2-3 frases contextualizando. Use 👉 para aplicações]

**1. [PONTO EM CAIXA ALTA]** (v. X)
"[Citação do versículo]"

[1-2 frases explicando]

**Palavra-chave:** [Termo grego/hebraico] - [significado breve]

**Apoio:** [Referência] - "[Citação curta]"

👉 [Aplicação em uma frase]

**2. [PONTO EM CAIXA ALTA]** (v. X)
[Mesma estrutura]

**3. [PONTO EM CAIXA ALTA]** (v. X)
[Mesma estrutura - 3 a 5 pontos no total]

**CITAÇÃO FINAL**
"[Citação verídica de teólogo]" — [Nome]

**APLICAÇÕES**
• [Aplicação 1]
• [Aplicação 2]
• [Aplicação 3]

**ENCERRAMENTO**
"[Frase memorável para fechar]"

## REGRAS
1. Seja CONCISO - esboço de apoio, não roteiro completo
2. Use 👉 para aplicações práticas
3. Apenas citações VERÍDICAS de teólogos
4. Exegese em 1 frase por palavra-chave
5. Sempre versão NAA
6. 3-5 pontos dependendo do texto
7. Use **negrito** para títulos, sem exagero de símbolos
8. NÃO use linhas separadoras (---)
9. Português brasileiro claro

Responda sempre em português brasileiro.`;

const refineSystemPrompt = `Você é um revisor especialista em homilética, teologia reformada/evangélica clássica e gramática portuguesa (PT-BR). Sua tarefa é APRIMORAR um sermão escrito pelo próprio pregador, SEM descaracterizá-lo.

## O QUE FAZER
1. **Revisão teológica**: corrija imprecisões doutrinárias, heresias, citações bíblicas erradas, contextos mal aplicados. Mantenha a tradição evangélica/reformada clássica.
2. **Revisão de português (PT-BR)**: ortografia, concordância, regência, pontuação, coesão, clareza. Elimine repetições e cacófatos.
3. **Aprimoramento de estrutura**: melhore a fluidez de introdução → pontos → aplicação → encerramento. Reforce transições.
4. **Verificação de referências bíblicas**: confirme se os versículos citados batem com o texto. Se houver erro, corrija e sinalize.
5. **Sugestão de palavra-chave grega/hebraica** quando relevante (1 frase).

## O QUE NÃO FAZER
- NÃO reescreva do zero. NÃO mude o tema, o tom nem a "voz" do pregador.
- NÃO invente citações de teólogos (use só verídicas, se necessário).
- NÃO adicione conteúdo extenso novo — apenas ajustes pontuais.

## FORMATO DA RESPOSTA (em markdown, nesta ordem)

**✦ SERMÃO APRIMORADO**

[Sermão completo já revisado e formatado, pronto para pregar. Use **negrito** para títulos de seções e pontos. Mantenha a estrutura original do autor.]

---

**✦ AJUSTES REALIZADOS**

**Teológicos:**
• [Ajuste 1 — se houver]
• [Ajuste 2 — se houver]
(Se não houve, escreva: "Nenhum ajuste doutrinário necessário — boa base teológica.")

**Português / Estilo:**
• [Ajuste 1]
• [Ajuste 2]

**Referências bíblicas:**
• [Correção, se houver]
(Se tudo certo: "Todas as referências conferem.")

**✦ SUGESTÕES OPCIONAIS**
• [1-3 sugestões breves para fortalecer ainda mais o sermão]

Seja conciso, direto e respeitoso. Você é um revisor, não o autor.`;


serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  let committedFeatureKey: string | null = null;
  const authHeader = req.headers.get("Authorization");

  try {
    // Verify authentication
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

    // Validate user token using getUser (more secure - validates against database)
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = user.id;
    console.log(`User ${userId} generating sermon`);

    const body = await req.json();
    const { theme, sermonType, additionalContext, mode, userSermon } = body;
    const requestMode = mode === "refine" ? "refine" : "generate";

    let systemMsg = systemPrompt;
    let userPrompt = "";
    const MAX_THEME_LENGTH = 500;
    const MAX_CONTEXT_LENGTH = 1000;
    const MAX_SERMON_LENGTH = 12000;

    if (requestMode === "refine") {
      // REFINE MODE: user wrote the sermon; AI polishes it
      if (!userSermon || typeof userSermon !== "string") {
        return new Response(
          JSON.stringify({ error: "Sermão do usuário é obrigatório no modo aprimorar." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const trimmedSermon = userSermon.trim();
      if (trimmedSermon.length < 50 || trimmedSermon.length > MAX_SERMON_LENGTH) {
        return new Response(
          JSON.stringify({ error: `Sermão deve ter entre 50 e ${MAX_SERMON_LENGTH} caracteres.` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (additionalContext && typeof additionalContext === "string" && additionalContext.length > MAX_CONTEXT_LENGTH) {
        return new Response(
          JSON.stringify({ error: `Contexto adicional deve ter no máximo ${MAX_CONTEXT_LENGTH} caracteres.` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      systemMsg = refineSystemPrompt;
      userPrompt = `Aprimore o sermão abaixo (revisão teológica + português PT-BR + estrutura). Mantenha a voz do autor.\n\n=== SERMÃO DO PREGADOR ===\n${trimmedSermon}\n=== FIM ===`;
      if (additionalContext) {
        userPrompt += `\n\nObservações do autor: ${additionalContext.trim()}`;
      }
      console.log(`User ${userId} refining sermon (${trimmedSermon.length} chars)`);
    } else {
      // GENERATE MODE (original)
      if (!theme || typeof theme !== "string") {
        return new Response(
          JSON.stringify({ error: "Tema deve ser uma string válida" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const trimmedTheme = theme.trim();
      if (trimmedTheme.length === 0 || trimmedTheme.length > MAX_THEME_LENGTH) {
        return new Response(
          JSON.stringify({ error: `Tema deve ter entre 1 e ${MAX_THEME_LENGTH} caracteres` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const validSermonTypes = ["expositivo", "textual", "tematico"];
      if (sermonType && (typeof sermonType !== "string" || !validSermonTypes.includes(sermonType))) {
        return new Response(
          JSON.stringify({ error: `Tipo de sermão deve ser um de: ${validSermonTypes.join(", ")}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
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
      const typeInstructions = {
        expositivo: 'EXPOSITIVO - Analise o texto VERSO A VERSO na sequência. Cada ponto = um versículo ou grupo de versículos na ordem do texto.',
        textual: 'TEXTUAL - Use APENAS 1-3 versículos como base. Todos os pontos devem surgir DESSE ÚNICO texto curto.',
        tematico: 'TEMÁTICO - Parta do tema e use MÚLTIPLOS textos de diferentes livros da Bíblia para cada ponto.'
      };
      const safeType = (sermonType as keyof typeof typeInstructions) || "expositivo";
      userPrompt = `Gere um ESBOÇO DE SERMÃO ${safeType.toUpperCase()} sobre: "${trimmedTheme}"\n\nINSTRUÇÕES DO TIPO: ${typeInstructions[safeType]}`;
      if (additionalContext) userPrompt += `\n\nContexto adicional: ${additionalContext}`;
      userPrompt += `\n\nLembre-se: ESBOÇO CONCISO para apoio na pregação, não um roteiro extenso. Siga exatamente o formato especificado.`;
      console.log(`Generating ${safeType} sermon outline for: ${trimmedTheme}`);
    }

    // Server-side plan + quota enforcement. Placed AFTER input validation and
    // right before the AI call so a rejected/invalid request never consumes the
    // user's daily quota.
    const gate = await enforceUsage(authHeader, "sermon");
    if (gate) return gate;
    committedFeatureKey = "sermon";

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY not configured");
      if (committedFeatureKey) await refundUsage(authHeader, committedFeatureKey);
      return new Response(
        JSON.stringify({ error: "Configuração de API ausente" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemMsg },
          { role: "user", content: userPrompt },
        ],
        stream: true,
        max_tokens: 2000,
      }),
    });


    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        if (committedFeatureKey) await refundUsage(authHeader, committedFeatureKey);
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns minutos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (response.status === 402) {
        if (committedFeatureKey) await refundUsage(authHeader, committedFeatureKey);
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Entre em contato com o suporte." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (committedFeatureKey) await refundUsage(authHeader, committedFeatureKey);
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
    if (committedFeatureKey) await refundUsage(authHeader, committedFeatureKey);
    return new Response(
      JSON.stringify({ error: "Erro interno. Tente novamente." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
