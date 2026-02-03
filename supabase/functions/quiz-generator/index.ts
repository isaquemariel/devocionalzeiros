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

// Random Bible chapters for random mode
const BIBLE_CHAPTERS = [
  { book: 'Gênesis', maxChapter: 50 },
  { book: 'Êxodo', maxChapter: 40 },
  { book: 'Levítico', maxChapter: 27 },
  { book: 'Números', maxChapter: 36 },
  { book: 'Deuteronômio', maxChapter: 34 },
  { book: 'Josué', maxChapter: 24 },
  { book: 'Juízes', maxChapter: 21 },
  { book: 'Rute', maxChapter: 4 },
  { book: '1 Samuel', maxChapter: 31 },
  { book: '2 Samuel', maxChapter: 24 },
  { book: '1 Reis', maxChapter: 22 },
  { book: '2 Reis', maxChapter: 25 },
  { book: 'Salmos', maxChapter: 150 },
  { book: 'Provérbios', maxChapter: 31 },
  { book: 'Eclesiastes', maxChapter: 12 },
  { book: 'Isaías', maxChapter: 66 },
  { book: 'Jeremias', maxChapter: 52 },
  { book: 'Ezequiel', maxChapter: 48 },
  { book: 'Daniel', maxChapter: 12 },
  { book: 'Mateus', maxChapter: 28 },
  { book: 'Marcos', maxChapter: 16 },
  { book: 'Lucas', maxChapter: 24 },
  { book: 'João', maxChapter: 21 },
  { book: 'Atos', maxChapter: 28 },
  { book: 'Romanos', maxChapter: 16 },
  { book: '1 Coríntios', maxChapter: 16 },
  { book: '2 Coríntios', maxChapter: 13 },
  { book: 'Gálatas', maxChapter: 6 },
  { book: 'Efésios', maxChapter: 6 },
  { book: 'Filipenses', maxChapter: 4 },
  { book: 'Hebreus', maxChapter: 13 },
  { book: 'Tiago', maxChapter: 5 },
  { book: '1 Pedro', maxChapter: 5 },
  { book: 'Apocalipse', maxChapter: 22 },
];

interface WrongAnswer {
  book_name: string;
  chapter_number: number;
}

async function getRandomChaptersWithPriority(
  supabase: any,
  userId: string,
  count: number
): Promise<Array<{ bookName: string; chapterNumber: number }>> {
  // First, try to get chapters where the user got questions wrong (for retry)
  const { data: wrongAnswers } = await supabase
    .from('quiz_attempts')
    .select('book_name, chapter_number')
    .eq('user_id', userId)
    .eq('is_correct', false)
    .order('created_at', { ascending: false })
    .limit(20);

  const selected: Array<{ bookName: string; chapterNumber: number }> = [];
  const usedKeys = new Set<string>();

  // Add up to 2 wrong chapters first (for practice)
  if (wrongAnswers && wrongAnswers.length > 0) {
    const uniqueWrong = wrongAnswers.reduce((acc: WrongAnswer[], curr: WrongAnswer) => {
      const key = `${curr.book_name}-${curr.chapter_number}`;
      if (!acc.some(w => `${w.book_name}-${w.chapter_number}` === key)) {
        acc.push(curr);
      }
      return acc;
    }, []);

    // Shuffle and pick up to 2 wrong chapters
    const shuffledWrong = uniqueWrong.sort(() => Math.random() - 0.5);
    const wrongToInclude = Math.min(2, shuffledWrong.length, count);

    for (let i = 0; i < wrongToInclude; i++) {
      const wrong = shuffledWrong[i];
      const key = `${wrong.book_name}-${wrong.chapter_number}`;
      if (!usedKeys.has(key)) {
        usedKeys.add(key);
        selected.push({
          bookName: wrong.book_name,
          chapterNumber: wrong.chapter_number,
        });
      }
    }
  }

  // Fill remaining slots with random chapters
  while (selected.length < count) {
    const randomBook = BIBLE_CHAPTERS[Math.floor(Math.random() * BIBLE_CHAPTERS.length)];
    const randomChapter = Math.floor(Math.random() * randomBook.maxChapter) + 1;
    const key = `${randomBook.book}-${randomChapter}`;
    
    if (!usedKeys.has(key)) {
      usedKeys.add(key);
      selected.push({
        bookName: randomBook.book,
        chapterNumber: randomChapter,
      });
    }
  }
  
  // Shuffle final array so wrong chapters aren't always first
  return selected.sort(() => Math.random() - 0.5);
}

function getDifficultyPrompt(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return `NÍVEL FÁCIL - Perguntas básicas e diretas:
- Pergunte sobre fatos ÓBVIOS do capítulo
- Quem são os personagens principais?
- Qual é o evento central?
- Perguntas de "quem fez o quê"
- Use linguagem simples e clara
- As opções incorretas devem ser CLARAMENTE diferentes`;
    
    case 'hard':
      return `NÍVEL DIFÍCIL - Para estudiosos da Bíblia:
- Detalhes MUITO específicos: números exatos, nomes de lugares secundários
- Citações diretas de versículos
- Ordem EXATA de eventos
- Conexões com outros capítulos ou livros
- Significados de palavras em hebraico/grego
- Contexto histórico e cultural profundo
- As opções incorretas devem ser MUITO plausíveis`;
    
    default: // medium
      return `NÍVEL MÉDIO - Requer boa leitura do capítulo:
- Detalhes importantes mas não óbvios
- Sequência de eventos
- Números e quantidades mencionados
- Quem disse determinada frase
- Consequências de ações
- As opções incorretas devem ser plausíveis mas distinguíveis`;
  }
}

serve(async (req) => {
  console.log('Quiz generator: Received request');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    console.log('Quiz generator: Auth header present:', !!authHeader);
    
    if (!authHeader) {
      console.log('Quiz generator: Missing auth header');
      return new Response(JSON.stringify({ error: 'Authorization header required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    console.log('Quiz generator: Supabase URL present:', !!supabaseUrl);
    console.log('Quiz generator: Service key present:', !!supabaseServiceKey);
    
    // Validate user token using getUser (more secure - validates against database)
    console.log('Quiz generator: Validating user token');
    
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      console.log('Quiz generator: Auth error:', authError?.message || 'No user');
      return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const userId = user.id;
    
    // Create service role client for database operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    console.log('Quiz generator: User authenticated:', userId);

    const body = await req.json();
    console.log('Quiz generator: Received body:', JSON.stringify(body));
    
    let { chapters, difficulty = 'medium', mode = 'normal', questionsPerChapter = 2 } = body;

    // Handle random mode - generate random chapters with priority for wrong answers
    if (mode === 'random') {
      // For random mode, generate 5 chapters (1 question each = 5 questions total)
      // Prioritize chapters where user got questions wrong before
      chapters = await getRandomChaptersWithPriority(supabase, userId, 5);
      questionsPerChapter = 1;
      console.log('Quiz generator: Random mode - generated chapters:', chapters);
    }

    // Validate chapters array
    if (!chapters || !Array.isArray(chapters)) {
      console.log('Quiz generator: Invalid chapters - not an array:', typeof chapters);
      return new Response(JSON.stringify({ error: 'Campo chapters deve ser um array' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Quiz generator: Chapters count:', chapters.length);

    if (chapters.length === 0) {
      console.log('Quiz generator: Empty chapters array');
      return new Response(JSON.stringify({ error: 'Array chapters não pode estar vazio' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Limit chapters array size to prevent timeout
    const MAX_CHAPTERS = mode === 'random' ? 5 : 5;
    let processChapters = chapters;
    if (chapters.length > MAX_CHAPTERS) {
      console.log(`Quiz generator: Limiting from ${chapters.length} to ${MAX_CHAPTERS} chapters`);
      processChapters = chapters.slice(0, MAX_CHAPTERS);
    }

    // Validate each chapter structure
    const MAX_BOOK_LENGTH = 100;
    for (let i = 0; i < processChapters.length; i++) {
      const chapter = processChapters[i];
      if (!chapter || typeof chapter !== 'object') {
        return new Response(JSON.stringify({ error: `Capítulo ${i} inválido` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      const { bookName, chapterNumber } = chapter;
      
      // Validate bookName
      if (!bookName || typeof bookName !== 'string') {
        return new Response(JSON.stringify({ error: `Capítulo ${i}: bookName deve ser uma string` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (bookName.trim().length === 0 || bookName.length > MAX_BOOK_LENGTH) {
        return new Response(JSON.stringify({ error: `Capítulo ${i}: bookName deve ter entre 1 e ${MAX_BOOK_LENGTH} caracteres` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Validate chapterNumber (must be a positive integer between 1 and 150)
      if (!Number.isInteger(chapterNumber) || chapterNumber < 1 || chapterNumber > 150) {
        return new Response(JSON.stringify({ error: `Capítulo ${i}: chapterNumber deve ser um inteiro entre 1 e 150` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Validate difficulty
    const validDifficulties = ['easy', 'medium', 'hard'];
    if (!validDifficulties.includes(difficulty)) {
      difficulty = 'medium';
    }

    console.log(`Quiz generator: Processing ${processChapters.length} chapters for user ${userId}, difficulty: ${difficulty}, questionsPerChapter: ${questionsPerChapter}`);

    const allQuestions: Array<{ bookName: string; chapterNumber: number; questions: QuizQuestion[] }> = [];

    for (const chapter of processChapters) {
      const { bookName, chapterNumber } = chapter;

      // Check cache first - now we cache ALL questions regardless of difficulty
      const { data: cachedData, error: cacheError } = await supabase
        .from('quiz_questions_cache')
        .select('questions')
        .eq('book_name', bookName)
        .eq('chapter_number', chapterNumber)
        .single();

      // Use cache if available and has enough questions
      if (cachedData && !cacheError) {
        const cachedQuestions = cachedData.questions as QuizQuestion[];
        console.log(`Quiz generator: Cache hit for ${bookName} ${chapterNumber} (${cachedQuestions.length} questions)`);
        
        // Shuffle cached questions so answers aren't always in same position
        let shuffledQuestions = cachedQuestions.map(q => shuffleOptions(q));
        
        // Limit to requested questions per chapter
        if (questionsPerChapter < shuffledQuestions.length) {
          // Randomly select questions instead of always taking the first ones
          shuffledQuestions = shuffledQuestions
            .sort(() => Math.random() - 0.5)
            .slice(0, questionsPerChapter);
        }
        
        allQuestions.push({
          bookName,
          chapterNumber,
          questions: shuffledQuestions,
        });
        continue;
      }

      // Generate new questions using AI
      console.log(`Quiz generator: Generating questions for ${bookName} ${chapterNumber} (difficulty: ${difficulty})`);

      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        throw new Error('LOVABLE_API_KEY is not configured');
      }

      const difficultyInstructions = getDifficultyPrompt(difficulty);
      
      // Always generate 5 questions for caching, then return the requested amount
      const generateCount = Math.max(5, questionsPerChapter);

      const systemPrompt = `Você é um teólogo e especialista em estudos bíblicos. Gere exatamente ${generateCount} perguntas de múltipla escolha sobre o capítulo específico da Bíblia fornecido.

${difficultyInstructions}

REGRAS OBRIGATÓRIAS:
1. As perguntas devem ser sobre eventos, personagens, ensinamentos ou versículos ESPECÍFICOS e REAIS do capítulo mencionado
2. Cada pergunta deve ter exatamente 3 opções: A, B e C
3. APENAS UMA opção deve ser a resposta correta
4. A resposta correta DEVE ser factualmente precisa e corresponder ao texto bíblico
5. NUNCA invente eventos ou personagens que não existem no capítulo

REGRA CRÍTICA - EVITAR RESPOSTAS ÓBVIAS:
- A pergunta NÃO pode conter a resposta dentro dela mesma
- NUNCA faça perguntas como "Qual foi a praga X que fez Y?" onde Y é exatamente a descrição da praga X
- As perguntas devem exigir CONHECIMENTO do texto, não apenas leitura da própria pergunta
- EVITE perguntas que descrevam o evento na pergunta e peçam para identificá-lo

VALIDAÇÃO CRÍTICA:
- Antes de finalizar, RELEIA cada pergunta e confirme que:
  a) A resposta NÃO está contida ou implícita no texto da pergunta
  b) A pergunta exige conhecimento real do capítulo bíblico
  c) As opções incorretas são apropriadas para o nível de dificuldade
  d) O evento/fato mencionado REALMENTE acontece no capítulo especificado

Responda APENAS com um JSON válido, sem markdown, sem explicações, sem texto adicional. Array de ${generateCount} objetos com question, options {A, B, C} e correct_answer.`;

      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash-lite',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Gere ${generateCount} perguntas de nível ${difficulty === 'easy' ? 'FÁCIL' : difficulty === 'hard' ? 'DIFÍCIL' : 'MÉDIO'} sobre ${bookName} capítulo ${chapterNumber} da Bíblia.` },
          ],
          max_tokens: 2500,
          temperature: difficulty === 'hard' ? 0.5 : difficulty === 'easy' ? 0.8 : 0.7,
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
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('Invalid questions format');
      }

      // Always cache all generated questions for future reuse
      await supabase
        .from('quiz_questions_cache')
        .upsert({
          book_name: bookName,
          chapter_number: chapterNumber,
          questions: questions,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'book_name,chapter_number',
        });

      console.log(`Cached ${questions.length} questions for ${bookName} ${chapterNumber}`);

      // Shuffle options before returning
      let shuffledQuestions = questions.map(q => shuffleOptions(q));
      
      // Return only the requested number of questions
      if (questionsPerChapter < shuffledQuestions.length) {
        shuffledQuestions = shuffledQuestions.slice(0, questionsPerChapter);
      }
      
      allQuestions.push({
        bookName,
        chapterNumber,
        questions: shuffledQuestions,
      });
    }

    return new Response(JSON.stringify({ questions: allQuestions, difficulty }), {
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
