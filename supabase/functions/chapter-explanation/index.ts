import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Você é um especialista em estudos bíblicos, emulando o estilo e profundidade da renomada "Bíblia de Estudos Palavra-Chave Hebraico-Grego" da editora CPAD.

Esta Bíblia de Estudos é conhecida por:
- Identificar e explicar palavras-chave do texto original (hebraico no AT, grego no NT)
- Fornecer transliterações precisas das palavras originais
- Apresentar códigos Strong para referência léxica
- Oferecer comentários exegéticos profundos mas acessíveis
- Usar a versão Almeida Revista e Corrigida (ARC)

Seu papel é fornecer explicações profundas e acessíveis sobre capítulos da Bíblia, seguindo este padrão:

1. **Resumo do Capítulo**: Uma síntese de 2-3 frases do conteúdo principal
2. **Contexto Histórico-Literário**: Explique o cenário em que o texto foi escrito
3. **Palavras-Chave do Original**: Destaque termos hebraicos/gregos importantes com transliteração, significado e códigos Strong quando relevante
4. **Análise dos Principais Versículos**: Comente versículos-chave com insights do texto original
5. **Temas Teológicos**: Identifique doutrinas e ensinos centrais
6. **Conexões Bíblicas**: Referências cruzadas com outros livros
7. **Aplicação Prática**: Como aplicar na vida cristã contemporânea
8. **Reflexão Devocional**: Encerre com uma oração ou meditação

Diretrizes:
- Priorize citações da versão ARC (Almeida Revista e Corrigida), mas pode usar ARA quando necessário
- Sempre inclua palavras no original com transliteração (ex: "amor" - ágape/ἀγάπη)
- Cite comentaristas respeitados (Matthew Henry, John Calvin, Warren Wiersbe, John MacArthur)
- Mantenha profundidade acadêmica com linguagem acessível
- Use formatação markdown estruturada
- Responda sempre em português brasileiro`;

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
    
    if (!book || !chapter) {
      return new Response(JSON.stringify({ error: "Livro e capítulo são obrigatórios" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check cache first
    console.log(`Checking cache for ${book} ${chapter}`);
    const { data: cachedExplanation, error: cacheError } = await supabase
      .from("chapter_explanations_cache")
      .select("explanation")
      .eq("book_name", book)
      .eq("chapter_number", chapter)
      .maybeSingle();

    if (cacheError) {
      console.error("Cache lookup error:", cacheError);
    }

    if (cachedExplanation?.explanation) {
      console.log(`Cache hit for ${book} ${chapter}`);
      // Return cached explanation as a fake SSE stream for compatibility
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          const content = cachedExplanation.explanation;
          // Send content in chunks to simulate streaming
          const chunkSize = 100;
          for (let i = 0; i < content.length; i += chunkSize) {
            const chunk = content.slice(i, i + chunkSize);
            const sseMessage = `data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`;
            controller.enqueue(encoder.encode(sseMessage));
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

    console.log(`Cache miss for ${book} ${chapter}, generating new explanation`);

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const userPrompt = `Por favor, forneça uma explicação completa no estilo da Bíblia de Estudos Palavra-Chave para ${book} capítulo ${chapter}. 

Estruture sua resposta com:
1. **Resumo do Capítulo** - Síntese de 2-3 frases
2. **Contexto Histórico-Literário** - Autor, destinatários, situação
3. **Palavras-Chave do Original** - Termos hebraicos/gregos importantes com transliteração e significado
4. **Análise dos Principais Versículos** - Comentário exegético dos versículos mais relevantes
5. **Temas Teológicos** - Doutrinas e ensinos centrais
6. **Conexões Bíblicas** - Referências cruzadas
7. **Aplicação Prática** - Relevância para hoje
8. **Reflexão Devocional** - Oração ou meditação final

Seja detalhado mas acessível. Use citações da ARC (Almeida Revista e Corrigida).`;

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

    // Create a transform stream to capture the response and save to cache
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let fullContent = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            controller.enqueue(value);
            
            // Parse the SSE data to extract content
            const text = decoder.decode(value, { stream: true });
            const lines = text.split("\n");
            
            for (const line of lines) {
              if (line.startsWith("data: ") && !line.includes("[DONE]")) {
                try {
                  const jsonStr = line.slice(6).trim();
                  const parsed = JSON.parse(jsonStr);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    fullContent += content;
                  }
                } catch {
                  // Ignore parsing errors for incomplete chunks
                }
              }
            }
          }
          
          controller.close();
          
          // Save to cache after stream completes
          if (fullContent.length > 100) {
            console.log(`Saving explanation to cache for ${book} ${chapter}`);
            const { error: insertError } = await supabase
              .from("chapter_explanations_cache")
              .upsert({
                book_name: book,
                chapter_number: chapter,
                explanation: fullContent,
              }, {
                onConflict: "book_name,chapter_number",
              });
            
            if (insertError) {
              console.error("Failed to save to cache:", insertError);
            } else {
              console.log(`Successfully cached explanation for ${book} ${chapter}`);
            }
          }
        } catch (error) {
          console.error("Stream processing error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
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
