import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuizQuestion {
  question: string;
  options: { A: string; B: string; C: string };
  correct_answer: 'A' | 'B' | 'C';
}

// Shuffle function to randomize answer positions
function shuffleOptions(question: QuizQuestion): QuizQuestion {
  const options = [
    { key: 'A', value: question.options.A },
    { key: 'B', value: question.options.B },
    { key: 'C', value: question.options.C },
  ];
  
  // Fisher-Yates shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  // Find where the correct answer ended up
  const correctValue = question.options[question.correct_answer];
  const newCorrectKey = options.find(o => o.value === correctValue)?.key as 'A' | 'B' | 'C';
  
  return {
    question: question.question,
    options: {
      A: options[0].value,
      B: options[1].value,
      C: options[2].value,
    },
    correct_answer: ['A', 'B', 'C'][options.findIndex(o => o.value === correctValue)] as 'A' | 'B' | 'C',
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Authorization header required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Validate the user's session
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { chapters } = await req.json();

    if (!chapters || !Array.isArray(chapters) || chapters.length === 0) {
      return new Response(JSON.stringify({ error: 'Chapters array required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Generating quiz for ${chapters.length} chapters for user ${user.id}`);

    const allQuestions: Array<{ bookName: string; chapterNumber: number; questions: QuizQuestion[] }> = [];

    for (const chapter of chapters) {
      const { bookName, chapterNumber } = chapter;

      // Check cache first
      const { data: cachedData, error: cacheError } = await supabase
        .from('quiz_questions_cache')
        .select('questions')
        .eq('book_name', bookName)
        .eq('chapter_number', chapterNumber)
        .single();

      if (cachedData && !cacheError) {
        console.log(`Cache hit for ${bookName} ${chapterNumber}`);
        // Shuffle cached questions so answers aren't always in same position
        const cachedQuestions = (cachedData.questions as QuizQuestion[]).map(q => shuffleOptions(q));
        allQuestions.push({
          bookName,
          chapterNumber,
          questions: cachedQuestions,
        });
        continue;
      }

      // Generate new questions using AI
      console.log(`Cache miss - generating questions for ${bookName} ${chapterNumber}`);

      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        throw new Error('LOVABLE_API_KEY is not configured');
      }

      const systemPrompt = `Você é um teólogo e especialista em estudos bíblicos. Gere exatamente 2 perguntas de múltipla escolha sobre o capítulo específico da Bíblia fornecido.

REGRAS OBRIGATÓRIAS:
1. NÍVEL MÉDIO de dificuldade - perguntas que testem compreensão real do texto
2. As perguntas devem ser sobre eventos, personagens, ensinamentos ou versículos ESPECÍFICOS e REAIS do capítulo mencionado
3. Cada pergunta deve ter exatamente 3 opções: A, B e C
4. APENAS UMA opção deve ser a resposta correta
5. A resposta correta DEVE ser factualmente precisa e corresponder ao texto bíblico
6. As opções incorretas devem ser plausíveis mas CLARAMENTE diferentes da resposta correta
7. NUNCA invente eventos ou personagens que não existem no capítulo
8. VERIFIQUE se a pergunta faz sentido gramatical e se a resposta correta realmente responde à pergunta

VALIDAÇÃO CRÍTICA:
- Antes de finalizar, RELEIA cada pergunta e confirme que:
  a) A resposta marcada como correta REALMENTE responde à pergunta
  b) As opções incorretas NÃO respondem corretamente à pergunta
  c) O texto da pergunta é claro e sem ambiguidade
  d) O evento/fato mencionado REALMENTE acontece no capítulo especificado

Responda APENAS com um JSON válido, sem markdown, sem explicações, sem texto adicional:
[
  {
    "question": "Pergunta clara e específica sobre o capítulo?",
    "options": { "A": "Opção A", "B": "Opção B", "C": "Opção C" },
    "correct_answer": "A"
  },
  {
    "question": "Segunda pergunta clara e específica sobre o capítulo?",
    "options": { "A": "Opção A", "B": "Opção B", "C": "Opção C" },
    "correct_answer": "B"
  }
]`;

      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Gere 2 perguntas sobre ${bookName} capítulo ${chapterNumber} da Bíblia.` },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI gateway error:', response.status, errorText);
        
        if (response.status === 429) {
          return new Response(JSON.stringify({ error: 'Rate limit exceeded. Try again later.' }), {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        if (response.status === 402) {
          return new Response(JSON.stringify({ error: 'Payment required. Please add funds.' }), {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        throw new Error(`AI gateway error: ${response.status}`);
      }

      const aiData = await response.json();
      const content = aiData.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('No content from AI');
      }

      // Parse the JSON response
      let questions: QuizQuestion[];
      try {
        // Remove markdown code blocks if present
        const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        questions = JSON.parse(cleanContent);
      } catch (parseError) {
        console.error('Failed to parse AI response:', content);
        throw new Error('Failed to parse AI response');
      }

      // Validate questions structure
      if (!Array.isArray(questions) || questions.length !== 2) {
        throw new Error('Invalid questions format');
      }

      // Cache the questions
      await supabase
        .from('quiz_questions_cache')
        .upsert({
          book_name: bookName,
          chapter_number: chapterNumber,
          questions: questions,
        }, {
          onConflict: 'book_name,chapter_number',
        });

      console.log(`Cached questions for ${bookName} ${chapterNumber}`);

      // Shuffle options before returning
      const shuffledQuestions = questions.map(q => shuffleOptions(q));
      
      allQuestions.push({
        bookName,
        chapterNumber,
        questions: shuffledQuestions,
      });
    }

    return new Response(JSON.stringify({ questions: allQuestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Quiz generator error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});