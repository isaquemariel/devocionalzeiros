import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface QuizQuestion {
  question: string;
  options: { A: string; B: string; C: string };
  correct_answer: 'A' | 'B' | 'C';
}

// Shuffle function to randomize answer positions
function shuffleOptions(question: QuizQuestion): QuizQuestion {
  // Normalize correct_answer to uppercase
  const normalizedCorrectAnswer = (question.correct_answer || 'A').toUpperCase() as 'A' | 'B' | 'C';
  
  // Ensure options exist
  const optA = question.options?.A || '';
  const optB = question.options?.B || '';
  const optC = question.options?.C || '';
  
  const options = [
    { key: 'A' as const, value: optA },
    { key: 'B' as const, value: optB },
    { key: 'C' as const, value: optC },
  ];
  
  // Fisher-Yates shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  // Find where the correct answer ended up by tracking the original key
  const correctValue = { 'A': optA, 'B': optB, 'C': optC }[normalizedCorrectAnswer];
  const newIndex = options.findIndex(o => o.value === correctValue);
  const newCorrectKey = newIndex >= 0 ? (['A', 'B', 'C'] as const)[newIndex] : normalizedCorrectAnswer;
  
  return {
    question: question.question,
    options: {
      A: options[0].value,
      B: options[1].value,
      C: options[2].value,
    },
    correct_answer: newCorrectKey,
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
      return `NÍVEL FÁCIL - Perguntas básicas e diretas sobre o texto:
- Pergunte sobre fatos ÓBVIOS e centrais do capítulo
- Perguntas do tipo "quem fez o quê", "onde aconteceu", "qual o tema principal"
- Use linguagem simples e clara
- As opções incorretas devem ser CLARAMENTE diferentes e fáceis de eliminar
- REGRA DE BREVIDADE: Pergunta com no máximo 2 frases curtas (máx 30 palavras). Cada opção com no máximo 15 palavras.
- Exemplo: "Quem Deus chamou para sair da sua terra?" → opções curtas como "Abraão", "Moisés", "Noé"`;
    
    case 'hard':
      return `NÍVEL DIFÍCIL - Para estudiosos sérios da Bíblia:
- Exija análise exegética e teológica profunda do texto
- Pergunte sobre significado teológico, contexto histórico-cultural, tipologia bíblica, paralelismos literários
- Detalhes específicos: números exatos, nomes secundários, citações de versículos
- Perguntas de comparação e conexão teológica com outros textos
- As opções incorretas devem ser EXTREMAMENTE plausíveis
- REGRA CRÍTICA DE BREVIDADE: A pergunta deve ter no máximo 2 frases (máx 35 palavras). Cada opção (A, B, C) deve ter NO MÁXIMO 20 palavras. Seja denso mas conciso. PROIBIDO escrever parágrafos.
- Exemplo BOM: "Qual a implicação teológica da expressão 'pelos frutos' em Mt 7?" → opções de ~15 palavras cada
- Exemplo RUIM: pergunta de 4 linhas com opções de parágrafo inteiro`;
    
    default: // medium
      return `NÍVEL MÉDIO - Perguntas que exigem RACIOCÍNIO e REFLEXÃO:
- NÃO faça perguntas meramente factuais. Exija que o leitor PENSE e CONECTE ideias.
- TIPOS: causa/consequência, interpretação, comparação, aplicação, inferência
- REGRA CRÍTICA DE BREVIDADE: Pergunta com no máximo 2 frases curtas (máx 30 palavras). Cada opção (A, B, C) com NO MÁXIMO 15 palavras. Seja direto. PROIBIDO parágrafos nas opções.
- As 3 opções devem ser TODAS plausíveis. NUNCA coloque opção absurda.
- Exemplo BOM de opção: "A renovação da mente para discernir a vontade de Deus" (curta)
- Exemplo RUIM de opção: "A conformação refere-se a adotar os padrões e valores do mundo sem questionamento, enquanto a renovação..." (LONGO DEMAIS - PROIBIDO)`;
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

    // Server-side plan + quota enforcement
    const featureKey = mode === 'random' ? 'quiz_random' : 'quiz_free_choice';
    const gate = await enforceUsage(authHeader, featureKey);
    if (gate) return gate;


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
        .eq('difficulty', difficulty)
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

      const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
      if (!OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not configured');
      }

      const difficultyInstructions = getDifficultyPrompt(difficulty);
      
      // Always generate 5 questions for caching, then return the requested amount
      const generateCount = Math.max(5, questionsPerChapter);

      const systemPrompt = `Você é um teólogo reformado e especialista em exegese bíblica. Gere exatamente ${generateCount} perguntas de múltipla escolha sobre o capítulo específico da Bíblia fornecido.

${difficultyInstructions}

REGRAS OBRIGATÓRIAS:
1. As perguntas devem ser sobre eventos, personagens, ensinamentos ou versículos ESPECÍFICOS e REAIS do capítulo mencionado
2. Cada pergunta deve ter exatamente 3 opções: A, B e C
3. APENAS UMA opção deve ser a resposta correta
4. A resposta correta DEVE ser factualmente precisa e corresponder ao texto bíblico
5. NUNCA invente eventos ou personagens que não existem no capítulo
6. TODAS as ${generateCount} perguntas devem ser DIFERENTES entre si - nunca repita o mesmo tema ou fato

REGRA CRÍTICA - DIFERENCIAÇÃO DE DIFICULDADE:
- No nível FÁCIL: perguntas que qualquer pessoa que leu o capítulo uma vez responderia
- No nível MÉDIO: perguntas que exigem atenção a detalhes durante a leitura
- No nível DIFÍCIL: perguntas que exigem ESTUDO TEOLÓGICO e análise exegética profunda - NÃO apenas fatos, mas compreensão do SIGNIFICADO e da TEOLOGIA do texto

REGRA CRÍTICA - EVITAR RESPOSTAS ÓBVIAS:
- A pergunta NÃO pode conter a resposta dentro dela mesma
- NUNCA faça perguntas como "Qual foi a praga X que fez Y?" onde Y é exatamente a descrição da praga X
- As perguntas devem exigir CONHECIMENTO do texto, não apenas leitura da própria pergunta
- EVITE perguntas que descrevam o evento na pergunta e peçam para identificá-lo

REGRA CRÍTICA - COERÊNCIA ENTRE PERGUNTA E OPÇÕES:
- Se a pergunta menciona DUAS ou mais pessoas (ex: "pai de Raquel e Lia"), as opções devem responder EXATAMENTE o que foi perguntado (um nome de pessoa, não dois nomes separados)
- NUNCA faça uma pergunta sobre a relação entre pessoas e coloque como opção apenas UM dos nomes mencionados na pergunta
- Exemplo ERRADO: "Quem era o pai de Raquel e Jacó?" com opção "Labão" — Jacó NÃO era filho de Labão. A pergunta está mal formulada.
- Exemplo CORRETO: "Quem era o pai de Raquel e Lia?" com opção "Labão"
- SEMPRE revise se a pergunta é factualmente correta ANTES de gerar as opções

REGRA MAIS IMPORTANTE - PRECISÃO TEOLÓGICA E BÍBLICA:
- A resposta marcada como correct_answer DEVE ser 100% fiel ao texto bíblico original
- ANTES de definir a resposta correta, CITE MENTALMENTE o versículo exato que a fundamenta
- NUNCA marque como correta uma opção que representa uma interpretação errônea ou superficial do texto
- As opções INCORRETAS devem ser interpretações plausíveis mas CLARAMENTE não alinhadas com o texto bíblico quando analisadas com cuidado

VALIDAÇÃO CRÍTICA (FAÇA ISTO PARA CADA PERGUNTA):
- Antes de finalizar, para CADA pergunta:
  1. Identifique o versículo exato que fundamenta a resposta correta
  2. Confirme que a opção marcada como correct_answer É DE FATO a que corresponde ao texto bíblico
  3. Verifique que as opções incorretas NÃO são mais precisas que a resposta marcada como correta
  4. Se a resposta correta parecer ser B ou C, NÃO force que seja A - marque a que for realmente correta
  5. Confirme que o evento/fato mencionado REALMENTE acontece no capítulo especificado
  6. Confirme que a complexidade CORRESPONDE ao nível de dificuldade solicitado

Responda APENAS com um JSON válido, sem markdown, sem explicações, sem texto adicional. Array de ${generateCount} objetos com question, options {A, B, C} e correct_answer.`;

      // Retry logic with exponential backoff for rate limits
      const MAX_RETRIES = 3;
      const MODELS_FALLBACK = difficulty === 'easy' 
        ? ['google/gemini-2.5-flash-lite', 'google/gemini-2.5-flash', 'google/gemini-3-flash-preview']
        : ['google/gemini-2.5-flash', 'google/gemini-2.5-flash-lite', 'google/gemini-3-flash-preview'];
      
      let content: string | null = null;
      let lastError: string | null = null;

      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        const model = MODELS_FALLBACK[Math.min(attempt, MODELS_FALLBACK.length - 1)];
        
        if (attempt > 0) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 4000);
          console.log(`Quiz generator: Retry ${attempt}/${MAX_RETRIES} with model ${model}, waiting ${delay}ms`);
          await new Promise(r => setTimeout(r, delay));
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: `Gere ${generateCount} perguntas de nível ${difficulty === 'easy' ? 'FÁCIL (perguntas básicas e óbvias)' : difficulty === 'hard' ? 'DIFÍCIL (perguntas exegéticas, teológicas e de análise profunda)' : 'MÉDIO (perguntas detalhadas mas não teológicas)'} sobre ${bookName} capítulo ${chapterNumber} da Bíblia. Lembre-se: no modo DIFÍCIL as perguntas devem ser genuinamente complexas, exigindo estudo teológico profundo.` },
            ],
            max_tokens: 3000,
            temperature: difficulty === 'hard' ? 0.2 : difficulty === 'easy' ? 0.8 : 0.5,
          }),
        });

        if (response.ok) {
          const aiData = await response.json();
          content = aiData.choices?.[0]?.message?.content || null;
          if (content) break;
          lastError = 'No content from AI';
          continue;
        }

        const errorText = await response.text();
        console.error(`AI gateway error (attempt ${attempt + 1}):`, response.status, errorText);
        lastError = `AI error ${response.status}`;

        if (response.status === 402) {
          return new Response(JSON.stringify({ error: 'Payment required. Please add funds.' }), {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // For 429, continue to retry with fallback model
        if (response.status !== 429 && response.status !== 503 && response.status !== 500) {
          break;
        }
      }

      // If all retries failed for this chapter, skip it and continue with others
      if (!content) {
        console.warn(`Quiz generator: Skipping ${bookName} ${chapterNumber} after ${MAX_RETRIES} retries: ${lastError}`);
        continue;
      }

      if (!content) {
        throw new Error('No content from AI');
      }

      // Parse the JSON response
      let questions: QuizQuestion[];
      try {
        // Remove markdown code blocks if present
        const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        questions = JSON.parse(cleanContent);
        
        // Normalize correct_answer to uppercase for all questions
        questions = questions.map(q => ({
          ...q,
          correct_answer: (q.correct_answer || 'A').toUpperCase() as 'A' | 'B' | 'C',
          options: {
            A: q.options?.A || q.options?.a || '',
            B: q.options?.B || q.options?.b || '',
            C: q.options?.C || q.options?.c || '',
          },
        }));
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
          difficulty: difficulty,
          questions: questions,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'book_name,chapter_number,difficulty',
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

    // If no questions were generated at all, return a friendly error
    if (allQuestions.length === 0) {
      return new Response(JSON.stringify({ error: 'Não foi possível gerar perguntas no momento. Tente novamente em alguns segundos.' }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ questions: allQuestions, difficulty }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Quiz generator error:', error);
    return new Response(JSON.stringify({ error: 'Erro interno. Tente novamente.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
