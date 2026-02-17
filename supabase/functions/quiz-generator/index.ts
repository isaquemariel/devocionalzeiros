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
- Pergunte sobre fatos ÓBVIOS e centrais do capítulo: quem são os personagens principais, qual o evento central, o que aconteceu primeiro
- Perguntas do tipo "quem fez o quê", "onde aconteceu", "qual o tema principal"
- Use linguagem simples e clara
- As opções incorretas devem ser CLARAMENTE diferentes e fáceis de eliminar
- NÃO pergunte sobre detalhes específicos, números exatos ou nomes secundários
- Exemplo de pergunta fácil: "Quem Deus chamou para sair da sua terra em Gênesis 12?" com opções óbvias`;
    
    case 'hard':
      return `NÍVEL DIFÍCIL - Para estudiosos sérios da Bíblia (perguntas MUITO mais complexas que o médio):
- EXIJA análise exegética e teológica profunda: "O que o autor quis comunicar com...", "Qual o significado teológico de..."
- Pergunte sobre o SIGNIFICADO por trás do texto, não apenas fatos superficiais
- Inclua perguntas sobre: contexto histórico-cultural, tipologia bíblica, paralelismos literários, figuras de linguagem hebraicas/gregas
- Pergunte sobre detalhes MUITO específicos: números exatos, nomes de lugares secundários, citações diretas de versículos específicos
- Faça perguntas de COMPARAÇÃO: "Diferente de X, o que Y fez neste capítulo?"
- Perguntas sobre CONEXÕES teológicas com outros textos bíblicos
- As opções incorretas devem ser EXTREMAMENTE plausíveis - respostas que um leitor casual poderia confundir
- Exija raciocínio teológico sistemático para responder corretamente
- Exemplo: "Qual é a implicação soteriológica da expressão usada no versículo X?" ou "O que a estrutura quiástica deste trecho revela sobre a intenção do autor?"`;
    
    default: // medium
      return `NÍVEL MÉDIO - Perguntas que exigem RACIOCÍNIO, ASSOCIAÇÃO e REFLEXÃO sobre o texto:
- NÃO faça perguntas meramente factuais ou de memorização ("quem fez X?", "quantos eram?")
- Em vez disso, exija que o leitor PENSE e CONECTE ideias do capítulo
- TIPOS DE PERGUNTAS OBRIGATÓRIAS (varie entre estes tipos):
  1. CAUSA E CONSEQUÊNCIA: "Por que X aconteceu?" ou "Qual foi a consequência de Y?"
  2. INTERPRETAÇÃO: "O que a atitude de [personagem] revela sobre...?" ou "Qual lição o texto transmite quando descreve...?"
  3. COMPARAÇÃO: "Qual a diferença entre a reação de A e de B neste capítulo?"
  4. APLICAÇÃO: "Que princípio deste capítulo se aplica a...?" ou "O que este ensinamento implica para...?"
  5. INFERÊNCIA: "Com base no texto, o que se pode concluir sobre...?"
- As 3 opções devem ser TODAS plausíveis e exigir reflexão real para distinguir a correta
- NUNCA coloque uma opção absurda ou claramente errada - todas devem parecer possíveis à primeira vista
- A resposta correta deve ser identificável apenas por quem COMPREENDEU o texto, não por quem apenas memorizou fatos
- Exemplo BOM: "Por que Deus rejeitou a oferta de Caim segundo o contexto de Gênesis 4?" com 3 opções teologicamente plausíveis
- Exemplo RUIM: "Quem matou Abel?" (muito factual e óbvio)`;
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

      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        throw new Error('LOVABLE_API_KEY is not configured');
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

REGRA MAIS IMPORTANTE - PRECISÃO TEOLÓGICA E BÍBLICA:
- A resposta marcada como correct_answer DEVE ser 100% fiel ao texto bíblico original
- ANTES de definir a resposta correta, CITE MENTALMENTE o versículo exato que a fundamenta
- Se a pergunta é sobre Romanos 12:1-2, a resposta DEVE refletir "transformai-vos pela renovação da mente" - NÃO sobre rituais ou monasticismo
- NUNCA marque como correta uma opção que representa uma interpretação errônea ou superficial do texto
- As opções INCORRETAS devem ser interpretações plausíveis mas CLARAMENTE não alinhadas com o texto bíblico quando analisadas com cuidado
- Em caso de dúvida, prefira a resposta mais diretamente conectada ao texto bíblico literal

VALIDAÇÃO CRÍTICA (FAÇA ISTO PARA CADA PERGUNTA):
- Antes de finalizar, para CADA pergunta:
  1. Identifique o versículo exato que fundamenta a resposta correta
  2. Confirme que a opção marcada como correct_answer É DE FATO a que corresponde ao texto bíblico
  3. Verifique que as opções incorretas NÃO são mais precisas que a resposta marcada como correta
  4. Se a resposta correta parecer ser B ou C, NÃO force que seja A - marque a que for realmente correta
  5. Confirme que o evento/fato mencionado REALMENTE acontece no capítulo especificado
  6. Confirme que a complexidade CORRESPONDE ao nível de dificuldade solicitado

Responda APENAS com um JSON válido, sem markdown, sem explicações, sem texto adicional. Array de ${generateCount} objetos com question, options {A, B, C} e correct_answer.`;

      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: difficulty === 'easy' ? 'google/gemini-2.5-flash-lite' : 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Gere ${generateCount} perguntas de nível ${difficulty === 'easy' ? 'FÁCIL (perguntas básicas e óbvias)' : difficulty === 'hard' ? 'DIFÍCIL (perguntas exegéticas, teológicas e de análise profunda)' : 'MÉDIO (perguntas detalhadas mas não teológicas)'} sobre ${bookName} capítulo ${chapterNumber} da Bíblia. Lembre-se: no modo DIFÍCIL as perguntas devem ser genuinamente complexas, exigindo estudo teológico profundo.` },
          ],
          max_tokens: 3000,
          temperature: difficulty === 'hard' ? 0.2 : difficulty === 'easy' ? 0.8 : 0.5,
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
