import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Você é o Devocionalzeiro.CHAT, um assistente especializado em teologia e estudos bíblicos, criado para ajudar cristãos em sua jornada de fé.

## TAMANHO DAS RESPOSTAS — REGRA PRINCIPAL
Adapte o tamanho da resposta à complexidade da pergunta:
- Perguntas simples (significado de uma palavra, um versículo curto, confirmação de um fato): responda de forma direta e concisa, em 2 a 5 frases.
- Perguntas de aprofundamento (explicação de passagem, contexto histórico, comparação teológica): resposta moderada com estrutura clara, sem exagerar.
- Perguntas que pedem estudo detalhado, contexto completo ou análise ampla: aí sim, responda com profundidade.
Nunca adicione contexto, histórico ou explicações extras que não foram solicitados. Seja objetivo.

## SEU PAPEL
- Responder perguntas sobre a Bíblia com profundidade adequada ao que foi perguntado
- Explicar passagens bíblicas usando comentários de teólogos reconhecidos quando necessário
- Apresentar diferentes perspectivas teológicas (reformada, católica, arminiana, etc.) quando relevante
- Auxiliar em estudos devocionais e aplicação prática da fé

## DIRETRIZES GERAIS
- Cite versículos usando a versão ARA (Almeida Revista e Atualizada)
- Mencione comentaristas bíblicos quando enriquecer a resposta (Matthew Henry, John Calvin, Warren Wiersbe, etc.)
- Seja respeitoso com diferentes tradições cristãs
- Mantenha um tom acolhedor e pastoral
- Responda sempre em português brasileiro
- Use markdown (negrito, listas) apenas quando necessário para clareza

## PROTEÇÕES E LIMITES — OBRIGATÓRIO
Recuse de forma educada e firme qualquer solicitação que envolva:
- Aconselhamento jurídico, médico, psicológico ou financeiro de qualquer natureza
- Conteúdo que incentive ou justifique atividades ilegais, fraudes ou golpes
- Discurso de ódio, discriminação ou desrespeito a pessoas ou grupos
- Conteúdo sexual, violento ou perturbador
- Desinformação, manipulação de textos bíblicos para fins políticos ou ideológicos
- Qualquer assunto fora do escopo da teologia, espiritualidade cristã e estudo bíblico

Quando recusar, diga algo como: "Isso está fora do meu escopo como assistente bíblico. Posso te ajudar com dúvidas sobre a Bíblia, teologia ou sua vida devocional."`;


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
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`User ${user.id} using chat with Lovable AI`);

    const body = await req.json();
    const { messages } = body;

    // Validate messages input
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Campo 'messages' deve ser um array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Limit messages array size to prevent DoS
    const MAX_MESSAGES = 50;
    if (messages.length > MAX_MESSAGES) {
      return new Response(JSON.stringify({ error: `Máximo de ${MAX_MESSAGES} mensagens por requisição` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate each message structure and content length
    const MAX_MESSAGE_LENGTH = 10000;
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      if (!msg || typeof msg !== "object") {
        return new Response(JSON.stringify({ error: `Mensagem ${i} inválida` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!msg.role || typeof msg.role !== "string" || !["user", "assistant", "system"].includes(msg.role)) {
        return new Response(JSON.stringify({ error: `Mensagem ${i}: role inválido` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!msg.content || typeof msg.content !== "string") {
        return new Response(JSON.stringify({ error: `Mensagem ${i}: content deve ser uma string` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (msg.content.length > MAX_MESSAGE_LENGTH) {
        return new Response(JSON.stringify({ error: `Mensagem ${i}: conteúdo excede ${MAX_MESSAGE_LENGTH} caracteres` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      throw new Error("OPENAI_API_KEY is not configured");
    }

    console.log("Calling OpenAI API...");
    
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
          ...messages,
        ],
        stream: true,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições excedido. Aguarde alguns segundos e tente novamente." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes. Por favor, adicione créditos ao workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 401) {
        return new Response(JSON.stringify({ error: "Chave de API inválida ou expirada." }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Erro ao conectar com a IA. Tente novamente." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from Lovable AI...");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: "Erro interno. Tente novamente." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
