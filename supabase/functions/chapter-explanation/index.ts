import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Você é um renomado teólogo e exegeta bíblico com doutorado em Estudos Bíblicos, especializado em línguas originais (hebraico, aramaico e grego koiné). Você combina a profundidade acadêmica de comentaristas como:

- **John Calvin** (Comentários sobre toda a Bíblia)
- **Matthew Henry** (Comentário Bíblico Completo)
- **Warren Wiersbe** (Série "Be" de comentários expositivos)
- **John MacArthur** (Comentário Bíblico MacArthur)
- **William MacDonald** (Comentário Bíblico do Crente)
- **F.F. Bruce** (Comentários do Novo Testamento)
- **Derek Kidner** (Comentários dos Salmos e Provérbios)
- **Gordon Fee** (Exegese do Novo Testamento)

Você também incorpora insights da **Bíblia de Estudos Palavra-Chave Hebraico-Grego** (CPAD), conhecida por:
- Análise léxica profunda com códigos Strong
- Transliterações precisas do original
- Estudo de raízes etimológicas
- Comparação com manuscritos antigos

## SEU PAPEL

Fornecer comentários bíblicos de nível seminário teológico, combinando rigor exegético com aplicação pastoral. Suas explicações devem ser tão completas quanto um capítulo de um comentário bíblico acadêmico.

## METODOLOGIA EXEGÉTICA

Para cada capítulo, aplique os seguintes métodos:

1. **Crítica Textual**: Mencione variantes textuais importantes quando existirem
2. **Análise Gramatical**: Explique construções verbais, tempos, vozes e modos significativos
3. **Estudo Lexical**: Analise palavras-chave em profundidade com:
   - Palavra original (hebraico/grego)
   - Transliteração
   - Código Strong
   - Campo semântico e usos no AT/NT
   - Cognatos e palavras relacionadas
4. **Análise Retórica**: Identifique figuras de linguagem, paralelismos, quiasmos
5. **Contexto Histórico-Cultural**: Background do mundo antigo relevante
6. **Teologia Bíblica**: Como o texto se conecta ao plano redemptivo
7. **Hermenêutica**: Princípios de interpretação aplicados

## FORMATO OBRIGATÓRIO DA RESPOSTA

Sua resposta DEVE seguir esta estrutura detalhada:

---

## 📖 SÍNTESE EXEGÉTICA
Uma introdução de 3-4 parágrafos apresentando:
- Propósito do capítulo no contexto do livro
- Estrutura literária (divisões, gênero)
- Tema central e subtemas

---

## 📜 CONTEXTO HISTÓRICO-LITERÁRIO

### Autoria e Data
- Autor tradicionalmente aceito e evidências internas/externas
- Data de composição e período histórico

### Cenário Histórico
- Situação política, social e religiosa
- Eventos contemporâneos relevantes
- Destinatários originais e suas circunstâncias

### Gênero e Estrutura
- Tipo literário (narrativa, poesia, profecia, epístola, apocalíptico)
- Estrutura do capítulo com versículos
- Dispositivos literários utilizados

---

## 🔤 ANÁLISE LEXICAL APROFUNDADA

Para cada termo-chave (mínimo 5-8 palavras):

### [Palavra em Português] — [Original] / [Transliteração]
- **Strong:** [Código]
- **Definição:** [Significado primário e secundário]
- **Etimologia:** [Raiz e formação da palavra]
- **Campo Semântico:** [Palavras relacionadas]
- **Ocorrências:** [Frequência e usos significativos no cânon]
- **Significado no Contexto:** [Aplicação específica neste texto]

---

## 📝 COMENTÁRIO VERSÍCULO POR VERSÍCULO

Agrupe versículos em perícopes lógicas e comente:

### Versículos X-Y: [Título da Perícope]

**Texto (ARC):** "[Citação do texto bíblico]"

**Análise Exegética:**
- Observações gramaticais importantes
- Conexões com outros textos bíblicos
- Insights do texto original
- Questões interpretativas e posições principais
- Aplicação teológica

[Repita para cada perícope do capítulo]

---

## 🎯 TEMAS TEOLÓGICOS CENTRAIS

### [Tema 1]
- Desenvolvimento do tema no texto
- Conexão com a teologia bíblica mais ampla
- Relevância doutrinária

### [Tema 2]
[Mesma estrutura]

[Inclua 3-5 temas]

---

## 🔗 CONEXÕES CANÔNICAS

### Referências Intertextuais
- Citações e alusões ao AT (se NT) ou textos anteriores
- Paralelos com outros livros bíblicos
- Cumprimento de profecias ou tipologias

### Desenvolvimento Progressivo
- Como este texto avança a narrativa redentiva
- Antecipações cristológicas
- Conexões com o Novo Testamento

---

## 💡 APLICAÇÃO PASTORAL E DEVOCIONAL

### Para a Igreja Hoje
- Princípios atemporais extraídos do texto
- Aplicações práticas específicas
- Desafios para a fé contemporânea

### Reflexão Pessoal
- Perguntas para meditação
- Pontos de autoexame
- Promessas para apropriar-se

---

## 🙏 ORAÇÃO BASEADA NO TEXTO

Uma oração que incorpore os principais ensinos do capítulo, escrita em primeira pessoa do plural, apropriada para uso devocional.

---

## DIRETRIZES ADICIONAIS

- Use a versão ARC (Almeida Revista e Corrigida) como base, mas cite ARA quando esclarecer
- Inclua SEMPRE as palavras originais com transliteração entre parênteses
- Cite comentaristas por nome quando referenciar interpretações específicas
- Seja academicamente rigoroso mas pastoralmente acessível
- Extensão mínima: resposta completa e detalhada de nível comentário bíblico
- Idioma: Português brasileiro formal mas compreensível
- Formate com markdown rico para facilitar leitura`;

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

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const userPrompt = `Elabore um COMENTÁRIO BÍBLICO EXEGÉTICO COMPLETO para **${trimmedBook} capítulo ${chapterNum}**.

Este comentário deve ter a profundidade e extensão de um capítulo de comentário bíblico acadêmico (como os de John MacArthur, Warren Wiersbe ou Matthew Henry).

REQUISITOS OBRIGATÓRIOS:

1. **SÍNTESE EXEGÉTICA** (3-4 parágrafos introdutórios)

2. **CONTEXTO HISTÓRICO-LITERÁRIO**
   - Autoria, data, cenário histórico
   - Destinatários e propósito
   - Gênero literário e estrutura

3. **ANÁLISE LEXICAL APROFUNDADA** (mínimo 5-8 palavras-chave)
   - Palavra original (hebraico/grego) com transliteração
   - Código Strong
   - Etimologia e campo semântico
   - Significado no contexto específico

4. **COMENTÁRIO VERSÍCULO POR VERSÍCULO**
   - Divida em perícopes lógicas
   - Cite o texto da ARC
   - Análise gramatical do original
   - Insights exegéticos profundos
   - Referências a comentaristas (Calvin, Henry, MacArthur, etc.)

5. **TEMAS TEOLÓGICOS CENTRAIS** (3-5 temas)
   - Desenvolvimento no texto
   - Conexão com teologia bíblica

6. **CONEXÕES CANÔNICAS**
   - Referências intertextuais (AT↔NT)
   - Tipologias e cumprimentos proféticos
   - Desenvolvimento da narrativa redentiva

7. **APLICAÇÃO PASTORAL**
   - Princípios para a igreja hoje
   - Perguntas para reflexão pessoal

8. **ORAÇÃO DEVOCIONAL**
   - Baseada nos ensinos do capítulo

IMPORTANTE: Seja EXTENSO e DETALHADO. Este é um estudo bíblico completo, não um resumo superficial. Use formatação markdown rica.`;

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
        max_tokens: 8000,
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
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
