import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { enforceUsage } from "../_shared/enforce-usage.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Auth check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await authClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Token inválido" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = user.id;

    const { bookName, chapter, forceNew } = await req.json();
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get which sets the user already failed for this chapter
    const { data: usedSets } = await supabase
      .from("rpg_quiz_attempts_tracker")
      .select("question_set_used")
      .eq("user_id", userId)
      .eq("book_name", bookName)
      .eq("chapter_number", chapter)
      .eq("failed", true);

    const failedSetNumbers = (usedSets || []).map((r: any) => r.question_set_used);

    // Try to find a cached set the user hasn't failed yet
    let query = supabase
      .from("rpg_quiz_cache")
      .select("questions, question_set")
      .eq("book_name", bookName)
      .eq("chapter_number", chapter)
      .order("question_set", { ascending: true });

    const { data: cachedSets } = await query;

    // Find first set not in the user's failed list
    const availableSet = (cachedSets || []).find(
      (s: any) => !failedSetNumbers.includes(s.question_set)
    );

    if (availableSet && !forceNew) {
      console.log(`Cache hit: set ${availableSet.question_set} for ${bookName} ${chapter}`);
      return new Response(JSON.stringify({
        questions: availableSet.questions,
        questionSet: availableSet.question_set,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Need to generate a new set
    console.log(`Generating new quiz set for ${bookName} ${chapter}`);

    const gate = await enforceUsage(authHeader, "rpg_quiz");
    if (gate) return gate;

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not configured");

    // Collect previously used questions to exclude
    const allCachedQuestions = (cachedSets || []).flatMap((s: any) =>
      (s.questions || []).map((q: any) => q.question)
    );

    const excludeClause = allCachedQuestions.length > 0
      ? `\n\nIMPORTANTE: NÃO repita estas perguntas já usadas:\n${allCachedQuestions.map((q: string, i: number) => `${i + 1}. ${q}`).join("\n")}`
      : "";

    const systemPrompt = `Você é um especialista em quizzes bíblicos. Gere perguntas claras e precisas sobre capítulos específicos da Bíblia. Responda APENAS em JSON válido.`;
    const userPrompt = `Gere exatamente 2 perguntas sobre ${bookName} capítulo ${chapter} da Bíblia.

Retorne JSON com esta estrutura:
[
  {
    "question": "Pergunta clara e objetiva sobre o conteúdo do capítulo",
    "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
    "correct_answer": "A opção correta (deve ser idêntica a uma das opções)"
  }
]

Regras:
- Perguntas devem ser sobre FATOS do capítulo (não interpretação)
- 4 opções por pergunta, apenas 1 correta
- Nível fácil/médio
- Seja conciso${excludeClause}`;

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
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI error: ${status}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    let questions;
    try {
      const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      questions = JSON.parse(jsonStr);
      if (!Array.isArray(questions)) questions = [questions];
    } catch {
      throw new Error("Failed to parse quiz questions");
    }

    // Determine new set number
    const nextSet = (cachedSets || []).length > 0
      ? Math.max(...(cachedSets || []).map((s: any) => s.question_set)) + 1
      : 1;

    // Cache the new set
    await supabase.from("rpg_quiz_cache").insert({
      book_name: bookName,
      chapter_number: chapter,
      question_set: nextSet,
      questions,
    });

    console.log(`Cached new set ${nextSet} for ${bookName} ${chapter}`);

    return new Response(JSON.stringify({
      questions,
      questionSet: nextSet,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("rpg-quiz error:", e);
    return new Response(JSON.stringify({ error: "Erro interno. Tente novamente." }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
