import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";
import { enforceUsage } from "../_shared/enforce-usage.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Você é um teólogo e exegeta bíblico experiente, especializado em tornar a Bíblia acessível e aplicável. Seu objetivo é fornecer explicações CONCISAS e PRÁTICAS para estudo devocional diário.

## SEU PAPEL
Fornecer explicações bíblicas que sejam profundas mas diretas, focando em ajudar o leitor a entender e aplicar o texto em sua vida.

## FORMATO OBRIGATÓRIO (MÁXIMO 1500 palavras)

### 📖 VISÃO GERAL
Um parágrafo explicando o tema central e propósito do capítulo.

### 📜 CONTEXTO HISTÓRICO
2-3 parágrafos sobre:
- Quem escreveu e para quem
- Situação histórica relevante
- Por que isso foi escrito

### 🔍 EXEGESE DO TEXTO
Comentário das principais passagens, dividido em seções lógicas:
- Cite os versículos-chave
- Explique o significado original
- Destaque palavras importantes (com significado do original quando relevante)
- Máximo 3-4 seções

### 💡 APLICAÇÃO PRÁTICA
3-5 pontos de aplicação direta para a vida cristã hoje:
- Como isso afeta minha relação com Deus?
- Como isso afeta minha relação com outros?
- Que mudança prática posso fazer?

### 🙏 REFLEXÃO
Uma breve oração ou pergunta para meditação pessoal.

## DIRETRIZES
- Seja CONCISO - o leitor tem outros capítulos para estudar
- Foque no ESSENCIAL - não se perca em detalhes acadêmicos
- Priorize APLICAÇÃO - a Bíblia é para transformar vidas
- Use português brasileiro acessível
- Formate com markdown para facilitar leitura`;

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
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    // Create client with the user's token to validate their session
    const token = authHeader.replace("Bearer ", "");
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Create service role client for database operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`User ${user.id} requesting chapter explanation`);

    const body = await req.json();
    const { book, chapter } = body;
    
    // Validate book input
    if (!book || typeof book !== "string") {
      return new Response(JSON.stringify({ error: "Livro deve ser uma string válida" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const MAX_BOOK_LENGTH = 100;
    const trimmedBook = book.trim();
    if (trimmedBook.length === 0 || trimmedBook.length > MAX_BOOK_LENGTH) {
      return new Response(JSON.stringify({ error: `Livro deve ter entre 1 e ${MAX_BOOK_LENGTH} caracteres` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate chapter input (must be a positive integer)
    const chapterNum = typeof chapter === "string" ? parseInt(chapter, 10) : chapter;
    if (!Number.isInteger(chapterNum) || chapterNum < 1 || chapterNum > 150) {
      return new Response(JSON.stringify({ error: "Capítulo deve ser um número inteiro entre 1 e 150" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check cache first
    console.log(`Checking cache for ${trimmedBook} ${chapterNum}`);
    const { data: cachedExplanation, error: cacheError } = await supabase
      .from("chapter_explanations_cache")
      .select("explanation")
      .eq("book_name", trimmedBook)
      .eq("chapter_number", chapterNum)
      .maybeSingle();

    if (cacheError) {
      console.error("Cache lookup error:", cacheError);
    }

    if (cachedExplanation?.explanation) {
      console.log(`Cache hit for ${trimmedBook} ${chapterNum}`);
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

    console.log(`Cache miss for ${trimmedBook} ${chapterNum}, generating new explanation`);

    // Server-side plan + quota gate (only charged when actually invoking the AI)
    const gate = await enforceUsage(authHeader, "reading_chapter_explanation");
    if (gate) return gate;


    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const userPrompt = `Elabore uma explicação CONCISA e PRÁTICA para **${trimmedBook} capítulo ${chapterNum}**.

Siga o formato obrigatório (máximo 1500 palavras):
1. VISÃO GERAL (1 parágrafo)
2. CONTEXTO HISTÓRICO (2-3 parágrafos)
3. EXEGESE DO TEXTO (3-4 seções com versículos-chave)
4. APLICAÇÃO PRÁTICA (3-5 pontos diretos)
5. REFLEXÃO (oração ou pergunta)

IMPORTANTE: Seja CONCISO e PRÁTICO. O leitor tem outros capítulos para estudar. Foque no essencial para transformar vidas.`;

    console.log(`Generating explanation for ${book} ${chapter} using gpt-4o`);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
        max_tokens: 2000,
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
            console.log(`Saving explanation to cache for ${trimmedBook} ${chapterNum}`);
            const { error: insertError } = await supabase
              .from("chapter_explanations_cache")
              .upsert({
                book_name: trimmedBook,
                chapter_number: chapterNum,
                explanation: fullContent,
              }, {
                onConflict: "book_name,chapter_number",
              });
            
            if (insertError) {
              console.error("Failed to save to cache:", insertError);
            } else {
              console.log(`Successfully cached explanation for ${trimmedBook} ${chapterNum}`);
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
    return new Response(JSON.stringify({ error: "Erro interno. Tente novamente." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
