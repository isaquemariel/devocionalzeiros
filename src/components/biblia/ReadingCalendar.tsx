import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Calendar as CalendarIcon, BookOpen, X, Eye } from "lucide-react";
import { getBrazilDate } from "@/lib/bibleData";

interface Chapter {
  book: string;
  chapter: number;
}

interface DaySchedule {
  date: string;
  chapters: Chapter[];
  isCompleted: boolean;
  completedChapters: number;
  totalChapters: number;
}

interface ReadingCalendarProps {
  schedule: DaySchedule[];
  onDayClick: (date: string) => void;
  onMarkDayComplete?: (date: string) => void;
  onMarkChapterComplete?: (date: string, book: string, chapter: number) => void;
  onOpenChapter?: (book: string, chapter: number, isCompleted: boolean) => void;
  currentDay: number;
  totalDays: number;
}

const ReadingCalendar = ({ 
  schedule, 
  onDayClick, 
  onMarkDayComplete,
  onMarkChapterComplete,
  onOpenChapter,
  currentDay, 
  totalDays 
}: ReadingCalendarProps) => {
  const brazilDate = getBrazilDate();
  const [currentMonth, setCurrentMonth] = useState(brazilDate.getMonth());
  const [currentYear, setCurrentYear] = useState(brazilDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState<DaySchedule | null>(null);

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const scheduleByDate = useMemo(() => {
    const map: Record<string, DaySchedule> = {};
    schedule.forEach((day) => {
      map[day.date] = day;
    });
    return map;
  }, [schedule]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startPadding = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: { date: Date | null; dayNumber: number | null }[] = [];

    for (let i = 0; i < startPadding; i++) {
      days.push({ date: null, dayNumber: null });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(currentYear, currentMonth, i),
        dayNumber: i,
      });
    }

    return days;
  }, [currentMonth, currentYear]);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    const today = getBrazilDate();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const formatDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isToday = (date: Date | null): boolean => {
    if (!date) return false;
    const today = getBrazilDate();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleDayClick = (daySchedule: DaySchedule) => {
    setSelectedDay(daySchedule);
    onDayClick(daySchedule.date);
  };

  const handleCloseDetail = () => {
    setSelectedDay(null);
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Calendário de Leitura</h2>
            <p className="text-xs text-muted-foreground">
              Dia {currentDay} de {totalDays} • Clique para ver detalhes
            </p>
          </div>
        </div>
        <button
          onClick={goToToday}
          className="px-3 py-1.5 text-sm rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          Hoje
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-semibold text-lg">
          {months[currentMonth]} {currentYear}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (!day.date) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const dateKey = formatDateKey(day.date);
          const daySchedule = scheduleByDate[dateKey];
          const today = isToday(day.date);

          return (
            <motion.button
              key={dateKey}
              onClick={() => daySchedule && handleDayClick(daySchedule)}
              disabled={!daySchedule}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all relative ${
                today
                  ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : daySchedule?.isCompleted
                    ? "bg-accent/20 text-accent hover:bg-accent/30"
                    : daySchedule
                      ? "bg-muted/10 hover:bg-muted/20"
                      : "text-muted-foreground/30"
              }`}
              whileHover={daySchedule ? { scale: 1.05 } : {}}
              whileTap={daySchedule ? { scale: 0.95 } : {}}
            >
              <span className="font-medium">{day.dayNumber}</span>
              {daySchedule && (
                <span className="absolute bottom-1">
                  {daySchedule.isCompleted ? (
                    <CheckCircle2 className="w-3 h-3 text-accent" />
                  ) : daySchedule.completedChapters > 0 ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  ) : (
                    <Circle className="w-2 h-2 text-muted-foreground/50" />
                  )}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-4 border-t border-border/30 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-primary" />
          <span>Hoje</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-accent" />
          <span>Concluído</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Parcial</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Circle className="w-3 h-3 text-muted-foreground/50" />
          <span>Pendente</span>
        </div>
      </div>

      {/* Day Detail Modal */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={handleCloseDetail}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-6 rounded-2xl bg-card border border-border/50 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Leitura do Dia</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedDay.date + "T12:00:00").toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseDetail}
                  className="p-2 rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                {selectedDay.chapters.map((chapter, index) => {
                  // Check if this specific chapter is completed by looking at the full schedule
                  const fullDaySchedule = schedule.find(s => s.date === selectedDay.date);
                  const isChapterCompleted = selectedDay.isCompleted;
                  
                  return (
                    <div
                      key={`${chapter.book}-${chapter.chapter}`}
                      className={`flex items-center justify-between p-3 rounded-xl border ${
                        isChapterCompleted
                          ? "bg-accent/10 border-accent/30"
                          : "bg-muted/5 border-border/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isChapterCompleted
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted/20"
                        }`}>
                          {isChapterCompleted 
                            ? <CheckCircle2 className="w-4 h-4" />
                            : <span className="text-sm font-medium">{index + 1}</span>
                          }
                        </div>
                        <span className={`font-medium ${isChapterCompleted ? "line-through opacity-60" : ""}`}>
                          {chapter.book} {chapter.chapter}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {onOpenChapter && (
                          <button
                            onClick={() => {
                              onOpenChapter(chapter.book, chapter.chapter, isChapterCompleted);
                              handleCloseDetail();
                            }}
                            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Explicação</span>
                          </button>
                        )}
                        {!isChapterCompleted && onMarkChapterComplete && (
                          <button
                            onClick={() => {
                              onMarkChapterComplete(selectedDay.date, chapter.book, chapter.chapter);
                            }}
                            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Marcar</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {!selectedDay.isCompleted && onMarkDayComplete && (
                <button
                  onClick={() => {
                    onMarkDayComplete(selectedDay.date);
                    handleCloseDetail();
                  }}
                  className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-all"
                >
                  Marcar Dia como Lido
                </button>
              )}

              {selectedDay.isCompleted && (
                <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-accent/20 text-accent">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Dia Concluído</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReadingCalendar;
