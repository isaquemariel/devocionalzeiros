import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateReadingSchedule, generateCustomReadingSchedule, ReadingPlan, getBrazilDate, readingPlans } from "@/lib/bibleData";
import { useGameSounds } from "@/hooks/useGameSounds";

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
      // Fetch existing schedule from database
      const { data: existingSchedule, error } = await supabase
        .from("reading_schedule")
        .select("*")
        .eq("user_id", userId)
        .order("scheduled_date", { ascending: true });

      if (error) throw error;

      if (existingSchedule && existingSchedule.length > 0) {
        // Group by date
        const scheduleMap: Record<string, ReadingScheduleItem[]> = {};
        existingSchedule.forEach((item) => {
          const date = item.scheduled_date;
          if (!scheduleMap[date]) {
            scheduleMap[date] = [];
          }
          scheduleMap[date].push(item as ReadingScheduleItem);
        });

        // Convert to DaySchedule format
        const formattedSchedule: DaySchedule[] = Object.entries(scheduleMap).map(([date, items]) => ({
          date,
          chapters: items.map((item) => ({
            book: item.book_name,
            chapter: item.chapter_number,
            isCompleted: item.is_completed,
            completedAt: item.completed_at,
          })),
          isCompleted: items.every((item) => item.is_completed),
          completedChapters: items.filter((item) => item.is_completed).length,
          totalChapters: items.length,
          completedTimes: items
            .filter((item) => item.completed_at)
            .map((item) => item.completed_at as string),
        }));

        setSchedule(formattedSchedule);

        // Calculate current day based on completed days + 1 (next day to read)
        const completedDays = formattedSchedule.filter((d) => d.isCompleted).length;
        setCurrentDay(completedDays + 1);

        // Calculate streak based on completed days (non-sequential)
        calculateNonSequentialStreak(formattedSchedule);
      } else {
        // Generate new schedule
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

    // Insert in batches
    const batchSize = 500;
    for (let i = 0; i < scheduleItems.length; i += batchSize) {
      const batch = scheduleItems.slice(i, i + batchSize).map((item) => ({
        ...item,
        user_id: userId,
      }));

      const { error } = await supabase.from("reading_schedule").insert(batch);
      if (error) {
        console.error("Error inserting schedule batch:", error);
      }
    }

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
      console.error("Error marking chapter complete:", error);
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

    // IMPORTANT: Only delete INCOMPLETE chapters to preserve points from completed readings
    // Completed chapters (is_completed = true) are kept in the database for ranking/points calculation
    const { error: deleteError } = await supabase
      .from("reading_schedule")
      .delete()
      .eq("user_id", userId)
      .eq("is_completed", false);

    if (deleteError) {
      console.error("Error deleting incomplete schedule items:", deleteError);
      setLoading(false);
      return;
    }

    // Generate new schedule starting today
    const today = getBrazilDate();
    let generatedSchedule;
    
    if (newPlan === "custom" && customBooks && customDays) {
      generatedSchedule = generateCustomReadingSchedule(customBooks, customDays, today);
    } else {
      generatedSchedule = generateReadingSchedule(newPlan, today);
    }

    // Get existing completed chapters to avoid duplicates
    const { data: existingCompleted } = await supabase
      .from("reading_schedule")
      .select("book_name, chapter_number")
      .eq("user_id", userId)
      .eq("is_completed", true);

    const completedSet = new Set(
      (existingCompleted || []).map(c => `${c.book_name}:${c.chapter_number}`)
    );

    // Prepare items for insertion - filter out already completed chapters
    const scheduleItems = generatedSchedule.flatMap(({ date, chapters }) =>
      chapters
        .filter(({ book, chapter }) => !completedSet.has(`${book}:${chapter}`))
        .map(({ book, chapter }) => ({
          user_id: userId,
          scheduled_date: formatDateKey(date),
          book_name: book,
          chapter_number: chapter,
          is_completed: false,
        }))
    );

    // Insert in batches
    const batchSize = 500;
    for (let i = 0; i < scheduleItems.length; i += batchSize) {
      const batch = scheduleItems.slice(i, i + batchSize);
      const { error } = await supabase.from("reading_schedule").insert(batch);
      if (error) {
        console.error("Error inserting schedule batch:", error);
      }
    }

    // Refresh
    await fetchSchedule();
  };

  // Check if plan is complete
  const isPlanComplete = useCallback(() => {
    if (schedule.length === 0) return false;
    return schedule.every((day) => day.isCompleted);
  }, [schedule]);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  const getTodaySchedule = useCallback(() => {
    const today = formatDateKey(getBrazilDate());
    return schedule.find((d) => d.date === today) || null;
  }, [schedule]);

  return {
    schedule,
    loading,
    currentDay,
    streak,
    markChapterComplete,
    markDayComplete,
    regenerateSchedule,
    getTodaySchedule,
    isPlanComplete,
    refetch: fetchSchedule,
  };
};
