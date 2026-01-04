import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateReadingSchedule, ReadingPlan, getBrazilDate } from "@/lib/bibleData";

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
  chapters: { book: string; chapter: number; isCompleted: boolean }[];
  isCompleted: boolean;
  completedChapters: number;
  totalChapters: number;
}

export const useReadingProgress = (userId: string | undefined, plan: ReadingPlan, startDate: Date) => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(1);
  const [streak, setStreak] = useState(0);

  const formatDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
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
          })),
          isCompleted: items.every((item) => item.is_completed),
          completedChapters: items.filter((item) => item.is_completed).length,
          totalChapters: items.length,
        }));

        setSchedule(formattedSchedule);

        // Calculate current day
        const today = formatDateKey(getBrazilDate());
        const dayIndex = formattedSchedule.findIndex((d) => d.date === today);
        setCurrentDay(dayIndex >= 0 ? dayIndex + 1 : 1);

        // Calculate streak
        calculateStreak(formattedSchedule);
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
      chapters: chapters.map((c) => ({ ...c, isCompleted: false })),
      isCompleted: false,
      completedChapters: 0,
      totalChapters: chapters.length,
    }));

    setSchedule(formattedSchedule);
    setCurrentDay(1);
  };

  const calculateStreak = (scheduleData: DaySchedule[]) => {
    const today = formatDateKey(getBrazilDate());
    let streakCount = 0;

    // Find today's index
    const todayIndex = scheduleData.findIndex((d) => d.date === today);
    if (todayIndex < 0) {
      setStreak(0);
      return;
    }

    // Count backwards from yesterday (or today if completed)
    const startIndex = scheduleData[todayIndex].isCompleted ? todayIndex : todayIndex - 1;

    for (let i = startIndex; i >= 0; i--) {
      if (scheduleData[i].isCompleted) {
        streakCount++;
      } else {
        break;
      }
    }

    setStreak(streakCount);
  };

  const markChapterComplete = async (date: string, book: string, chapter: number) => {
    if (!userId) return;

    const now = new Date().toISOString();

    const { error } = await supabase
      .from("reading_schedule")
      .update({ is_completed: true, completed_at: now })
      .eq("user_id", userId)
      .eq("scheduled_date", date)
      .eq("book_name", book)
      .eq("chapter_number", chapter);

    if (error) {
      console.error("Error marking chapter complete:", error);
      return;
    }

    // Update local state
    setSchedule((prev) =>
      prev.map((day) => {
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
      })
    );

    // Recalculate streak
    calculateStreak(schedule);
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
    setSchedule((prev) =>
      prev.map((day) => {
        if (day.date !== date) return day;

        return {
          ...day,
          chapters: day.chapters.map((c) => ({ ...c, isCompleted: true })),
          completedChapters: day.totalChapters,
          isCompleted: true,
        };
      })
    );
  };

  const regenerateSchedule = async (newPlan: ReadingPlan) => {
    if (!userId) return;

    setLoading(true);

    // Delete existing schedule
    const { error: deleteError } = await supabase
      .from("reading_schedule")
      .delete()
      .eq("user_id", userId);

    if (deleteError) {
      console.error("Error deleting old schedule:", deleteError);
      setLoading(false);
      return;
    }

    // Generate new schedule starting today
    const today = getBrazilDate();
    const generatedSchedule = generateReadingSchedule(newPlan, today);

    // Prepare items for insertion
    const scheduleItems = generatedSchedule.flatMap(({ date, chapters }) =>
      chapters.map(({ book, chapter }) => ({
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
    refetch: fetchSchedule,
  };
};
