import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateReadingSchedule, generateCustomReadingSchedule, ReadingPlan, getBrazilDate, readingPlans, bibleBooks } from "@/lib/bibleData";
import { useGameSounds } from "@/hooks/useGameSounds";
import { toast } from "sonner";

// Create a map of book names to their canonical order index
const bookOrderMap = new Map<string, number>();
bibleBooks.forEach((book, index) => {
  bookOrderMap.set(book.name, index);
});

// Helper function to get book order (returns high number for unknown books)
const getBookOrder = (bookName: string): number => {
  return bookOrderMap.get(bookName) ?? 999;
};

/** O erro veio de SESSÃO morta (token expirado, conta que já não existe, RLS
 *  negando a escrita) e não de rede ou de dado? Só nesse caso adianta pedir
 *  para entrar de novo. */
const ehErroDeSessao = (erro: { code?: string; message?: string } | null | undefined): boolean => {
  if (!erro) return false;
  const codigo = erro.code ?? "";
  const msg = (erro.message ?? "").toLowerCase();
  return (
    codigo === "42501" ||   // violação de row-level security
    codigo === "23503" ||   // chave estrangeira: o usuário do token não existe mais
    codigo === "PGRST301" || // JWT recusado pelo PostgREST
    msg.includes("jwt") ||
    msg.includes("row-level security") ||
    msg.includes("violates foreign key")
  );
};

/** Ainda há sessão válida? Renova se estiver no fim. Devolve false quando o
 *  usuário precisa mesmo entrar de novo — e aí não se apaga nem se grava nada. */
const garantirSessao = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession();
  const sessao = data.session;
  if (!sessao) return false;
  const expiraEm = (sessao.expires_at ?? 0) * 1000;
  if (expiraEm && expiraEm - Date.now() > 60_000) return true;
  const { data: renovada, error } = await supabase.auth.refreshSession();
  return !error && !!renovada.session;
};

/** Avisa que NÃO salvou. Antes isto era um `console.error` e mais nada: a tela
 *  mostrava um plano que nunca chegou ao banco, e o usuário só descobria ao
 *  recarregar, já sem o progresso que tinha marcado. */
const avisarQueNaoSalvou = (deSessao: boolean) => {
  if (deSessao) {
    toast.error("Sua sessão expirou — o plano de leitura não foi salvo.", {
      description: "Entre de novo para o plano e o seu progresso ficarem guardados.",
      duration: 12000,
      action: {
        label: "Entrar",
        onClick: async () => {
          await supabase.auth.signOut();
          window.location.assign("/auth");
        },
      },
    });
  } else {
    toast.error("Não consegui salvar o seu plano de leitura.", {
      description: "O que está na tela ainda não foi guardado. Tente escolher o plano de novo em instantes.",
      duration: 10000,
    });
  }
};

/** Grava o plano em lotes. Se travar no meio, APAGA o que já entrou: meio
 *  plano guardado é pior do que nenhum — na abertura seguinte o app o trataria
 *  como o plano do usuário e ele leria um cronograma truncado sem saber. */
type LinhaDoPlano = {
  user_id: string;
  scheduled_date: string;
  book_name: string;
  chapter_number: number;
  is_completed: boolean;
};

const salvarPlano = async (
  itens: LinhaDoPlano[],
): Promise<{ ok: boolean; sessao: boolean }> => {
  const gravados: string[] = [];
  const TAMANHO_LOTE = 500;

  const desfazer = async () => {
    // em pedaços: o filtro `in` vai na URL, e mil UUIDs de uma vez não cabem
    for (let i = 0; i < gravados.length; i += 200) {
      await supabase.from("reading_schedule").delete().in("id", gravados.slice(i, i + 200));
    }
  };

  for (let i = 0; i < itens.length; i += TAMANHO_LOTE) {
    const lote = itens.slice(i, i + TAMANHO_LOTE);
    let { data, error } = await supabase.from("reading_schedule").insert(lote).select("id");
    // uma segunda chance: token vencido se renova sozinho e o lote passa
    if (error && ehErroDeSessao(error) && (await garantirSessao())) {
      ({ data, error } = await supabase.from("reading_schedule").insert(lote).select("id"));
    }
    if (error) {
      console.error("Falha ao gravar o plano de leitura:", error);
      await desfazer();
      return { ok: false, sessao: ehErroDeSessao(error) };
    }
    for (const linha of data ?? []) gravados.push((linha as { id: string }).id);
  }
  return { ok: true, sessao: false };
};

interface ReadingScheduleItem {
  id?: string;
  scheduled_date: string;
  book_name: string;
  chapter_number: number;
  is_completed: boolean;
  completed_at?: string | null;
}

interface DaySchedule {
  date: string;
  chapters: { book: string; chapter: number; isCompleted: boolean; completedAt?: string | null }[];
  isCompleted: boolean;
  completedChapters: number;
  totalChapters: number;
  completedTimes: string[]; // Array of completion timestamps
}

export const useReadingProgress = (userId: string | undefined, plan: ReadingPlan, startDate: Date) => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(1);
  const [streak, setStreak] = useState(0);
  /** true quando o que está na tela NÃO chegou ao banco. */
  const [planoNaoSalvo, setPlanoNaoSalvo] = useState(false);
  const { playSound } = useGameSounds();

  // Format date to YYYY-MM-DD string using Brasília timezone
  const formatDateKey = (date: Date): string => {
    // Convert to Brasília timezone to ensure consistency
    const brasiliaDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const year = brasiliaDate.getFullYear();
    const month = (brasiliaDate.getMonth() + 1).toString().padStart(2, "0");
    const day = brasiliaDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchSchedule = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      // Get today's date in Brasília timezone
      const today = formatDateKey(getBrazilDate());
      
      // Fetch ALL schedule items for this user (both complete and incomplete)
      // This ensures we don't miss today's completed chapters
      const { data: allScheduleItems, error } = await supabase
        .from("reading_schedule")
        .select("*")
        .eq("user_id", userId)
        .order("scheduled_date", { ascending: true });

      if (error) throw error;

      if (allScheduleItems && allScheduleItems.length > 0) {
        // Find the earliest incomplete item to determine current plan start
        const incompleteItems = allScheduleItems.filter(item => !item.is_completed);
        const completedItems = allScheduleItems.filter(item => item.is_completed);
        
        // Determine plan boundaries - use the earliest scheduled date as plan start
        // and filter to only include items from today onwards (for incomplete) 
        // plus completed items from today
        let planStartDate: string;
        
        if (incompleteItems.length > 0) {
          // If there are incomplete items, the plan start is the min of:
          // - first incomplete item date
          // - today (to ensure we include today's completed items)
          planStartDate = incompleteItems[0].scheduled_date < today 
            ? incompleteItems[0].scheduled_date 
            : today;
        } else {
          // All items are complete - use today or earliest completed
          planStartDate = today;
        }
        
        // Filter to get current plan items (from planStartDate onwards)
        // Include all items >= planStartDate OR items that are completed today
        const currentPlanItems = allScheduleItems.filter(item => 
          item.scheduled_date >= planStartDate || 
          (item.scheduled_date === today && item.is_completed)
        );

        if (currentPlanItems.length === 0) {
          // No items in current plan range - generate new schedule
          await generateAndSaveSchedule();
          return;
        }

        // Group by date
        const scheduleMap: Record<string, ReadingScheduleItem[]> = {};
        currentPlanItems.forEach((item) => {
          const date = item.scheduled_date;
          if (!scheduleMap[date]) {
            scheduleMap[date] = [];
          }
          scheduleMap[date].push(item as ReadingScheduleItem);
        });

        // Convert to DaySchedule format and sort by date
        const formattedSchedule: DaySchedule[] = Object.entries(scheduleMap)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([date, items]) => {
            // Sort items by canonical book order first, then by chapter number
            const sortedItems = [...items].sort((a, b) => {
              const bookOrderA = getBookOrder(a.book_name);
              const bookOrderB = getBookOrder(b.book_name);
              if (bookOrderA !== bookOrderB) {
                return bookOrderA - bookOrderB;
              }
              return a.chapter_number - b.chapter_number;
            });
            return {
              date,
              chapters: sortedItems.map((item) => ({
                book: item.book_name,
                chapter: item.chapter_number,
                isCompleted: item.is_completed,
                completedAt: item.completed_at,
              })),
              isCompleted: sortedItems.every((item) => item.is_completed),
              completedChapters: sortedItems.filter((item) => item.is_completed).length,
              totalChapters: sortedItems.length,
              completedTimes: sortedItems
                .filter((item) => item.completed_at)
                .map((item) => item.completed_at as string),
            };
          });

        setSchedule(formattedSchedule);

        // Calculate current day based on completed days in THIS plan + 1
        const completedDays = formattedSchedule.filter((d) => d.isCompleted).length;
        setCurrentDay(completedDays + 1);

        // Calculate streak based on completed days in current plan
        calculateNonSequentialStreak(formattedSchedule);
      } else {
        // No schedule items at all - generate new schedule
        await generateAndSaveSchedule();
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, plan, startDate]);

  const generateAndSaveSchedule = async () => {
    if (!userId) return;

    // Skip for custom plan without proper config
    if (plan === "custom") return;
    
    const generatedSchedule = generateReadingSchedule(plan, startDate);

    // Prepare items for insertion
    const scheduleItems: Omit<ReadingScheduleItem, "id">[] = [];
    generatedSchedule.forEach(({ date, chapters }) => {
      chapters.forEach(({ book, chapter }) => {
        scheduleItems.push({
          scheduled_date: formatDateKey(date),
          book_name: book,
          chapter_number: chapter,
          is_completed: false,
        });
      });
    });

    const salvo = await salvarPlano(scheduleItems.map((item) => ({ ...item, user_id: userId })));
    setPlanoNaoSalvo(!salvo.ok);
    if (!salvo.ok) avisarQueNaoSalvou(salvo.sessao);

    // Convert to DaySchedule format
    const formattedSchedule: DaySchedule[] = generatedSchedule.map(({ date, chapters }) => ({
      date: formatDateKey(date),
      chapters: chapters.map((c) => ({ ...c, isCompleted: false, completedAt: null })),
      isCompleted: false,
      completedChapters: 0,
      totalChapters: chapters.length,
      completedTimes: [],
    }));

    setSchedule(formattedSchedule);
    setCurrentDay(1);
  };

  // Calculate streak based on total completed days (non-sequential approach)
  const calculateNonSequentialStreak = (scheduleData: DaySchedule[]) => {
    // Count total completed days as the "streak" for non-sequential progress
    const completedDays = scheduleData.filter((d) => d.isCompleted).length;
    setStreak(completedDays);
  };

  const markChapterComplete = async (date: string, book: string, chapter: number) => {
    if (!userId) return;

    // Use Brasília timezone for completion timestamp
    const now = new Date();
    const brasiliaTimestamp = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })).toISOString();

    const { error } = await supabase
      .from("reading_schedule")
      .update({ is_completed: true, completed_at: brasiliaTimestamp })
      .eq("user_id", userId)
      .eq("scheduled_date", date)
      .eq("book_name", book)
      .eq("chapter_number", chapter);

    if (error) {
      // silêncio aqui era um toque que simplesmente não acontecia: o capítulo
      // continuava por ler e ninguém dizia por quê.
      console.error("Error marking chapter complete:", error);
      avisarQueNaoSalvou(ehErroDeSessao(error));
      return;
    }

    // Play chapter complete sound
    playSound('chapterComplete');

    // Update local state
    setSchedule((prev) => {
      const updated = prev.map((day) => {
        if (day.date !== date) return day;

        const updatedChapters = day.chapters.map((c) =>
          c.book === book && c.chapter === chapter ? { ...c, isCompleted: true } : c
        );

        const completedCount = updatedChapters.filter((c) => c.isCompleted).length;

        return {
          ...day,
          chapters: updatedChapters,
          completedChapters: completedCount,
          isCompleted: completedCount === updatedChapters.length,
        };
      });
      
      // Update current day and streak based on new state
      const completedDays = updated.filter((d) => d.isCompleted).length;
      setCurrentDay(completedDays + 1);
      setStreak(completedDays);
      
      return updated;
    });
  };

  const markDayComplete = async (date: string) => {
    if (!userId) return;

    const now = new Date().toISOString();

    const { error } = await supabase
      .from("reading_schedule")
      .update({ is_completed: true, completed_at: now })
      .eq("user_id", userId)
      .eq("scheduled_date", date);

    if (error) {
      console.error("Error marking day complete:", error);
      avisarQueNaoSalvou(ehErroDeSessao(error));
      return;
    }

    // Update local state
    setSchedule((prev) => {
      const updated = prev.map((day) => {
        if (day.date !== date) return day;

        return {
          ...day,
          chapters: day.chapters.map((c) => ({ ...c, isCompleted: true })),
          completedChapters: day.totalChapters,
          isCompleted: true,
        };
      });
      
      // Update current day and streak based on new state
      const completedDays = updated.filter((d) => d.isCompleted).length;
      setCurrentDay(completedDays + 1);
      setStreak(completedDays);
      
      return updated;
    });
  };

  const regenerateSchedule = async (newPlan: ReadingPlan | "custom", customBooks?: string[], customDays?: number) => {
    if (!userId) return;

    setLoading(true);

    try {
      // PASSO 0: a sessão ainda está viva? Isto vem ANTES de tudo porque o
      // passo 2 APAGA o cronograma inteiro do usuário. Com o token morto, o
      // apagar passava (ou não) e a gravação seguinte falhava em silêncio: a
      // pessoa ficava sem o plano velho e sem o novo. Sem sessão, não se
      // encosta em nada.
      if (!(await garantirSessao())) {
        avisarQueNaoSalvou(true);
        setPlanoNaoSalvo(true);
        setLoading(false);
        return;
      }

      // STEP 1: Move completed chapters to reading_progress (historical points table)
      // This preserves the user's earned points from previous readings
      const { data: completedChapters } = await supabase
        .from("reading_schedule")
        .select("book_name, chapter_number, completed_at")
        .eq("user_id", userId)
        .eq("is_completed", true);

      if (completedChapters && completedChapters.length > 0) {
        // Insert completed chapters into reading_progress (for historical point tracking)
        // Using individual inserts with error handling to avoid duplicates
        for (const c of completedChapters) {
          await supabase
            .from("reading_progress")
            .insert({
              user_id: userId,
              book_name: c.book_name,
              chapter_number: c.chapter_number,
              completed_at: c.completed_at || new Date().toISOString(),
            })
            .select()
            .maybeSingle(); // Silently ignore if already exists due to unique constraint
        }
      }

      // STEP 2: Delete ALL schedule items for this user (clean slate for new plan)
      const { error: deleteError } = await supabase
        .from("reading_schedule")
        .delete()
        .eq("user_id", userId);

      if (deleteError) {
        console.error("Error deleting schedule items:", deleteError);
        avisarQueNaoSalvou(ehErroDeSessao(deleteError));
        setPlanoNaoSalvo(true);
        setLoading(false);
        return;
      }

      // STEP 3: Generate new schedule starting today
      const today = getBrazilDate();
      let generatedSchedule;
      
      if (newPlan === "custom" && customBooks && customDays) {
        generatedSchedule = generateCustomReadingSchedule(customBooks, customDays, today);
      } else {
        generatedSchedule = generateReadingSchedule(newPlan, today);
      }

      // STEP 4: Prepare items for insertion - all new chapters start fresh
      const scheduleItems = generatedSchedule.flatMap(({ date, chapters }) =>
        chapters.map(({ book, chapter }) => ({
          user_id: userId,
          scheduled_date: formatDateKey(date),
          book_name: book,
          chapter_number: chapter,
          is_completed: false,
        }))
      );

      // STEP 5: Insert in batches
      const salvo = await salvarPlano(scheduleItems);
      setPlanoNaoSalvo(!salvo.ok);
      if (!salvo.ok) avisarQueNaoSalvou(salvo.sessao);

      // STEP 6: Reset local state for new plan - Day 1 starts now
      setCurrentDay(1);
      setStreak(0);
      
      // STEP 7: Set the fresh schedule directly (no need to fetch again)
      const formattedSchedule: DaySchedule[] = generatedSchedule.map(({ date, chapters }) => ({
        date: formatDateKey(date),
        chapters: chapters.map((c) => ({ ...c, isCompleted: false, completedAt: null })),
        isCompleted: false,
        completedChapters: 0,
        totalChapters: chapters.length,
        completedTimes: [],
      }));

      setSchedule(formattedSchedule);
    } catch (error) {
      console.error("Error regenerating schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if plan is complete
  const isPlanComplete = useCallback(() => {
    if (schedule.length === 0) return false;
    return schedule.every((day) => day.isCompleted);
  }, [schedule]);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  // Subscribe to realtime changes in reading_schedule for instant updates across pages
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`reading-schedule-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reading_schedule',
          filter: `user_id=eq.${userId}`,
        },
        () => {
          // Refetch schedule when any change happens
          fetchSchedule();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchSchedule]);

  const getTodaySchedule = useCallback(() => {
    if (schedule.length === 0) return null;
    // AUTOPACED: a "leitura do dia" é SEMPRE a próxima pendente (a mais antiga não
    // concluída), independente da data de calendário. Assim ninguém "perde" um dia
    // por atraso e o card nunca fica em branco — a pessoa sempre continua de onde
    // parou. "Dia X" (currentDay) segue contando pela conclusão.
    const nextPending = schedule.find((d) => !d.isCompleted);
    if (nextPending) return nextPending;
    // Tudo concluído: mostra o último dia para exibir o estado "Concluído".
    return schedule[schedule.length - 1];
  }, [schedule]);

  return {
    schedule,
    loading,
    currentDay,
    streak,
    planoNaoSalvo,
    markChapterComplete,
    markDayComplete,
    regenerateSchedule,
    getTodaySchedule,
    isPlanComplete,
    refetch: fetchSchedule,
  };
};
