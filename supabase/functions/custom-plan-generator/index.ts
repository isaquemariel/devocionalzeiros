import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { enforceUsage } from "../_shared/enforce-usage.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Bible book categories for AI to understand
const BOOK_CATEGORIES = {
  evangelhos: ["Mateus", "Marcos", "Lucas", "João"],
  cartas_paulinas: ["Romanos", "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios", "Filipenses", "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses", "1 Timóteo", "2 Timóteo", "Tito", "Filemom"],
  cartas_gerais: ["Hebreus", "Tiago", "1 Pedro", "2 Pedro", "1 João", "2 João", "3 João", "Judas"],
  pentateuco: ["Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio"],
  historicos: ["Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel", "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras", "Neemias", "Ester"],
  poeticos: ["Jó", "Salmos", "Provérbios", "Eclesiastes", "Cantares"],
  profetas_maiores: ["Isaías", "Jeremias", "Lamentações", "Ezequiel", "Daniel"],
  profetas_menores: ["Oséias", "Joel", "Amós", "Obadias", "Jonas", "Miquéias", "Naum", "Habacuque", "Sofonias", "Ageu", "Zacarias", "Malaquias"],
  apocalipse: ["Apocalipse"],
  atos: ["Atos"],
};

// Bible books with chapter counts
const BIBLE_BOOKS: Record<string, number> = {
  "Gênesis": 50, "Êxodo": 40, "Levítico": 27, "Números": 36, "Deuteronômio": 34,
  "Josué": 24, "Juízes": 21, "Rute": 4, "1 Samuel": 31, "2 Samuel": 24,
  "1 Reis": 22, "2 Reis": 25, "1 Crônicas": 29, "2 Crônicas": 36,
  "Esdras": 10, "Neemias": 13, "Ester": 10, "Jó": 42, "Salmos": 150,
  "Provérbios": 31, "Eclesiastes": 12, "Cantares": 8, "Isaías": 66,
  "Jeremias": 52, "Lamentações": 5, "Ezequiel": 48, "Daniel": 12,
  "Oséias": 14, "Joel": 3, "Amós": 9, "Obadias": 1, "Jonas": 4,
  "Miquéias": 7, "Naum": 3, "Habacuque": 3, "Sofonias": 3, "Ageu": 2,
  "Zacarias": 14, "Malaquias": 4, "Mateus": 28, "Marcos": 16, "Lucas": 24,
  "João": 21, "Atos": 28, "Romanos": 16, "1 Coríntios": 16, "2 Coríntios": 13,
  "Gálatas": 6, "Efésios": 6, "Filipenses": 4, "Colossenses": 4,
  "1 Tessalonicenses": 5, "2 Tessalonicenses": 3, "1 Timóteo": 6, "2 Timóteo": 4,
  "Tito": 3, "Filemom": 1, "Hebreus": 13, "Tiago": 5, "1 Pedro": 5,
  "2 Pedro": 3, "1 João": 5, "2 João": 1, "3 João": 1, "Judas": 1, "Apocalipse": 22
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication validation
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.error("Missing or invalid Authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
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
      console.error("Auth validation failed:", authError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = user.id;
    console.log(`User ${userId} generating custom plan`);

    const { userRequest, totalDays } = await req.json();

    if (!userRequest || !totalDays) {
      return new Response(
        JSON.stringify({ error: "userRequest and totalDays are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Enforce daily usage quota per plan
    const gate = await enforceUsage(authHeader, "custom_plan");
    if (gate) return gate;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const systemPrompt = `Você é um assistente especializado em criar planos de leitura bíblica personalizados.

Categorias disponíveis e seus livros:
${Object.entries(BOOK_CATEGORIES).map(([cat, books]) => `- ${cat}: ${books.join(", ")}`).join("\n")}

Livros da Bíblia com número de capítulos:
${Object.entries(BIBLE_BOOKS).map(([book, chapters]) => `${book}: ${chapters}`).join(", ")}

INSTRUÇÕES:
1. Analise o pedido do usuário e identifique quais livros ou categorias ele quer ler
2. Retorne APENAS um JSON válido com a estrutura abaixo, sem texto adicional
3. Os livros devem ser retornados na ordem de leitura recomendada
4. O nome do plano deve ser curto e descritivo (máx 40 caracteres)
5. A descrição deve explicar o objetivo do plano (máx 100 caracteres)

Formato de resposta (JSON puro):
{
  "planName": "Nome do Plano",
  "planDescription": "Descrição breve do plano",
  "books": ["Livro1", "Livro2"]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Pedido do usuário: "${userRequest}" em ${totalDays} dias` }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições atingido. Tente novamente em alguns minutos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response
    let planData;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        planData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response");
    }

    // Validate and calculate chapters
    const validBooks: string[] = [];
    let totalChapters = 0;

    for (const book of planData.books) {
      if (BIBLE_BOOKS[book]) {
        validBooks.push(book);
        totalChapters += BIBLE_BOOKS[book];
      }
    }

    if (validBooks.length === 0) {
      return new Response(
        JSON.stringify({ error: "Nenhum livro válido identificado no pedido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const chaptersPerDay = Math.ceil(totalChapters / totalDays);

    return new Response(
      JSON.stringify({
        success: true,
        plan: {
          name: planData.planName || "Plano Personalizado",
          description: planData.planDescription || `Leitura de ${validBooks.length} livros em ${totalDays} dias`,
          books: validBooks,
          totalDays,
          totalChapters,
          chaptersPerDay,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Custom plan generator error:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno. Tente novamente." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
