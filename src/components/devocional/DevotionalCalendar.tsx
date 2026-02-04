import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, BookOpen, Lock, Heart } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, startOfYear, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { devotionals } from "@/data/devotionals";

interface DevotionalFavorite {
  id: string;
  day_of_year: number;
  created_at: string;
}

interface DevotionalCalendarProps {
  onSelectDate: (dayOfYear: number) => void;
  availableDays: number;
  completedDates: string[];
  favorites?: DevotionalFavorite[];
}

export const DevotionalCalendar = ({ onSelectDate, availableDays, completedDates, favorites = [] }: DevotionalCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showFavorites, setShowFavorites] = useState(false);
  
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  }, []);

  const yearStart = startOfYear(today);

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  }, [currentMonth]);

  const firstDayOfMonth = useMemo(() => {
    return startOfMonth(currentMonth).getDay();
  }, [currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDayClick = (day: Date) => {
    const dayOfYear = differenceInDays(day, yearStart) + 1;
    
    // Only allow if day is within available days and is in the current year
    if (dayOfYear <= availableDays && day.getFullYear() === today.getFullYear()) {
      onSelectDate(dayOfYear);
    }
  };

  const isDayAvailable = (day: Date) => {
    const dayOfYear = differenceInDays(day, yearStart) + 1;
    return dayOfYear <= availableDays && day.getFullYear() === today.getFullYear();
  };

  const isDayCompleted = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd");
    return completedDates.includes(dateStr);
  };

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // Get favorite devotionals info
  const favoriteDevotionals = useMemo(() => {
    return favorites.map(fav => {
      const devotional = devotionals[fav.day_of_year - 1];
      return {
        ...fav,
        title: devotional?.title || `Dia ${fav.day_of_year}`,
        verse: devotional?.verse?.reference || "",
      };
    }).sort((a, b) => a.day_of_year - b.day_of_year);
  }, [favorites]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Devocional Diário</h1>
        <p className="text-muted-foreground">Escolha o dia do devocional que deseja ler</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowFavorites(false)}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            !showFavorites 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-card/50 text-muted-foreground hover:bg-card/70'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Calendário
        </button>
        <button
          onClick={() => setShowFavorites(true)}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            showFavorites 
              ? 'bg-rose-500 text-white' 
              : 'bg-card/50 text-muted-foreground hover:bg-card/70'
          }`}
        >
          <Heart className="w-4 h-4" />
          Favoritos ({favorites.length})
        </button>
      </div>

      {showFavorites ? (
        /* Favorites List */
        <div className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
          {favoriteDevotionals.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-muted-foreground">Nenhum devocional favoritado ainda.</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Clique no ❤️ ao ler um devocional para salvá-lo aqui.
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {favoriteDevotionals.map((fav) => (
                <motion.button
                  key={fav.id}
                  onClick={() => onSelectDate(fav.day_of_year)}
                  className="w-full p-3 rounded-xl bg-card hover:bg-card/80 border border-border/30 hover:border-rose-500/30 transition-all text-left group"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-rose-400">
                        {String(fav.day_of_year).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate group-hover:text-rose-400 transition-colors">
                        {fav.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {fav.verse}
                      </p>
                    </div>
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Calendar */
        <div className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <motion.button
              onClick={goToPreviousMonth}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <h2 className="text-lg font-semibold capitalize">
              {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
            </h2>
            <motion.button
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before the first day of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            
            {/* Actual days */}
            {days.map((day) => {
              const isToday = isSameDay(day, today);
              const isAvailable = isDayAvailable(day);
              const isCompleted = isDayCompleted(day);
              const isFuture = day > today;
              const dayOfYear = differenceInDays(day, yearStart) + 1;
              const isFavorited = favorites.some(f => f.day_of_year === dayOfYear);

              return (
                <motion.button
                  key={day.toISOString()}
                  onClick={() => isAvailable && !isFuture && handleDayClick(day)}
                  disabled={!isAvailable || isFuture}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center text-sm font-medium relative
                    transition-all
                    ${isToday 
                      ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30" 
                      : isCompleted && isAvailable
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : isAvailable && !isFuture
                          ? "hover:bg-primary/20 text-foreground"
                          : "text-muted-foreground/30 cursor-not-allowed"
                    }
                  `}
                  whileHover={isAvailable && !isFuture ? { scale: 1.1 } : {}}
                  whileTap={isAvailable && !isFuture ? { scale: 0.95 } : {}}
                >
                  {!isAvailable && !isFuture && day.getFullYear() === today.getFullYear() ? (
                    <Lock className="w-3 h-3" />
                  ) : (
                    day.getDate()
                  )}
                  {isCompleted && isAvailable && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500" />
                  )}
                  {isFavorited && isAvailable && (
                    <Heart className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-border/50 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-accent" />
              <span>Hoje</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span>Concluído</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>Favorito</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Bloqueado</span>
            </div>
          </div>
        </div>
      )}

      {/* Today Button */}
      <motion.button
        onClick={() => {
          setShowFavorites(false);
          setCurrentMonth(today);
          const dayOfYear = differenceInDays(today, yearStart) + 1;
          if (dayOfYear <= availableDays) {
            onSelectDate(dayOfYear);
          }
        }}
        className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Calendar className="w-5 h-5" />
        Ler Devocional de Hoje
      </motion.button>
    </motion.div>
  );
};
