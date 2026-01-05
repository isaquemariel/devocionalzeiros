import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Você é um especialista em homilética bíblica, com profundo conhecimento em exegese, teologia e pregação. Seu estilo é inspirado nos maiores pregadores reformados e expositivos da história, incluindo:

- **Hernandes Dias Lopes**: Conhecido por sermões práticos, aplicáveis e com estrutura clara
- **Augustus Nicodemus Lopes**: Exegese profunda, teologia reformada sólida
- **Charles Spurgeon**: O príncipe dos pregadores, eloquência e poder espiritual
- **John MacArthur**: Exposição bíblica detalhada e fiel ao texto
- **Martyn Lloyd-Jones**: Profundidade teológica e aplicação transformadora

## ESTRUTURA DO SERMÃO

Você deve gerar sermões completos seguindo esta estrutura:

### 1. TÍTULO
- Criativo e memorável
- Reflete o tema central

### 2. TEXTO BÍBLICO
- Citação completa do texto base
- Contexto imediato

### 3. INTRODUÇÃO (aprox. 15% do sermão)
- Captar a atenção
- Apresentar o tema
- Mostrar relevância
- Transição para o corpo

### 4. PROPOSIÇÃO
- Uma frase que resume a verdade central do texto

### 5. DIVISÃO DO SERMÃO (3-5 pontos principais)
Cada ponto deve ter:
- Declaração clara
- Explicação do texto (exegese)
- Ilustração prática
- Aplicação específica

### 6. CONCLUSÃO
- Recapitulação dos pontos
- Apelo ou aplicação final
- Oração ou desafio

## TIPOS DE SERMÃO

**EXPOSITIVO**: Segue a estrutura do próprio texto bíblico, verso a verso ou perícope por perícope. O esboço emerge naturalmente do texto.

**TEXTUAL**: Os pontos principais derivam diretamente de um texto curto (1-3 versículos). O texto determina a estrutura.

**TEMÁTICO**: Parte de um tema bíblico e usa vários textos para desenvolver os pontos. O tema unifica textos diversos.

## DIRETRIZES

1. **Fidelidade Bíblica**: Sempre mantenha a interpretação fiel ao contexto e intenção original do autor
2. **Cristocentricidade**: Aponte para Cristo em todo o sermão
3. **Aplicação Prática**: Torne o sermão aplicável à vida contemporânea
4. **Ilustrações**: Use histórias, exemplos e analogias relevantes
5. **Clareza**: Linguagem acessível, mas profunda
6. **Estrutura**: Organização lógica e fácil de seguir
7. **Referências**: Cite comentaristas e teólogos quando apropriado

Responda sempre em português brasileiro, com linguagem adequada para pregação.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { theme, sermonType, additionalContext } = await req.json();

    if (!theme) {
      return new Response(
        JSON.stringify({ error: "Tema ou texto bíblico é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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
    let userPrompt = `Gere um sermão ${sermonType.toUpperCase()} completo sobre: "${theme}"`;
    
    if (additionalContext) {
      userPrompt += `\n\nContexto adicional ou direcionamento: ${additionalContext}`;
    }

    userPrompt += `\n\nLembre-se de seguir rigorosamente a estrutura definida e gerar um sermão digno de ser pregado.`;

    console.log(`Generating ${sermonType} sermon for: ${theme}`);

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
