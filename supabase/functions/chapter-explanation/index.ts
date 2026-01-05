import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      throw new Error("OPENAI_API_KEY is not configured");
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

    console.log(`Generating explanation for ${book} ${chapter} using gpt-4o`);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições da OpenAI excedido. Aguarde alguns segundos e tente novamente." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 401) {
        return new Response(JSON.stringify({ error: "Chave da API OpenAI inválida ou expirada." }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402 || response.status === 403) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes na conta OpenAI ou acesso negado." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Erro ao gerar explicação. Tente novamente." }), {
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
