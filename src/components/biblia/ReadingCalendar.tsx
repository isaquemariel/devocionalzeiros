import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Calendar as CalendarIcon } from "lucide-react";
import { getBrazilDate, formatShortDateBR, getDayOfWeekBR } from "@/lib/bibleData";

interface DaySchedule {
  date: string;
  chapters: { book: string; chapter: number }[];
  isCompleted: boolean;
  completedChapters: number;
  totalChapters: number;
}

interface ReadingCalendarProps {
  schedule: DaySchedule[];
  onDayClick: (date: string) => void;
  currentDay: number;
  totalDays: number;
}

const ReadingCalendar = ({ schedule, onDayClick, currentDay, totalDays }: ReadingCalendarProps) => {
  const brazilDate = getBrazilDate();
  const [currentMonth, setCurrentMonth] = useState(brazilDate.getMonth());
  const [currentYear, setCurrentYear] = useState(brazilDate.getFullYear());

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

    // Add padding for days before the first of the month
    for (let i = 0; i < startPadding; i++) {
      days.push({ date: null, dayNumber: null });
    }

    // Add days of the month
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
              Dia {currentDay} de {totalDays} • Horário de Brasília
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
              onClick={() => daySchedule && onDayClick(dateKey)}
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
              <span className={`font-medium ${today ? "" : ""}`}>{day.dayNumber}</span>
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
    </div>
  );
};

export default ReadingCalendar;
