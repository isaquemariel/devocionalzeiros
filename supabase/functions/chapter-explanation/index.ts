import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Você é um especialista em estudos bíblicos baseado na tradição da "Bíblia de Estudos Palavra-Chave". 

Seu papel é fornecer explicações profundas e acessíveis sobre capítulos da Bíblia, incluindo:

1. **Contexto Histórico**: Explique brevemente o contexto em que o texto foi escrito
2. **Palavras-Chave**: Destaque palavras hebraicas ou gregas importantes e seus significados
3. **Análise Versículo a Versículo**: Comente os principais versículos do capítulo
4. **Temas Teológicos**: Identifique os temas centrais e doutrinas presentes
5. **Aplicação Prática**: Como aplicar este texto na vida cristã hoje
6. **Conexões Bíblicas**: Referências cruzadas com outros textos bíblicos

Diretrizes de estilo:
- Use a versão ARA (Almeida Revista e Atualizada) para citações
- Inclua transliterações de palavras hebraicas/gregas quando relevante
- Cite comentaristas clássicos quando apropriado (Matthew Henry, John Calvin, Warren Wiersbe, etc.)
- Mantenha um equilíbrio entre profundidade acadêmica e acessibilidade
- Use formatação markdown para melhor legibilidade
- Responda sempre em português brasileiro

Formato da resposta:
- Comece com um breve resumo do capítulo (2-3 frases)
- Organize em seções claras com títulos
- Termine com uma oração ou reflexão devocional`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`User ${user.id} requesting chapter explanation`);

    const { book, chapter } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!book || !chapter) {
      return new Response(JSON.stringify({ error: "Livro e capítulo são obrigatórios" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userPrompt = `Por favor, forneça uma explicação completa e devocional de ${book} capítulo ${chapter}. 

Inclua:
- Resumo do capítulo
- Contexto histórico e literário
- Palavras-chave do texto original (hebraico/grego)
- Comentário dos principais versículos
- Temas teológicos
- Aplicação prática para a vida cristã
- Versículos relacionados de outros livros da Bíblia

Seja detalhado mas acessível para leitores de diferentes níveis de conhecimento bíblico.`;

    console.log(`Generating explanation for ${book} ${chapter}`);

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
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns minutos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes. Entre em contato com o suporte." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Erro ao gerar explicação" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chapter explanation error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
