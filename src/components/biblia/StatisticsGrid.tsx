import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Target,
  Calendar,
  Flame
} from "lucide-react";
import { useMemo } from "react";
import { getBrazilDate } from "@/lib/bibleData";

interface DaySchedule {
  date: string;
  chapters: { book: string; chapter: number; isCompleted: boolean }[];
  isCompleted: boolean;
  completedChapters: number;
  totalChapters: number;
}

interface StatisticsGridProps {
  schedule: DaySchedule[];
  streak: number;
}

const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  subvalue, 
  trend,
  color = "primary" 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string | number; 
  subvalue?: string;
  trend?: { value: number; positive: boolean };
  color?: "primary" | "accent" | "orange";
}) => {
  const colorClasses = {
    primary: "from-primary/20 to-primary/5 border-primary/20",
    accent: "from-accent/20 to-accent/5 border-accent/20",
    orange: "from-orange-500/20 to-orange-500/5 border-orange-500/20",
  };

  const iconColors = {
    primary: "text-primary",
    accent: "text-accent",
    orange: "text-orange-500",
  };

  return (
    <motion.div
      className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${colorClasses[color]} border`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-background/50 flex items-center justify-center ${iconColors[color]}`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend.positive ? "text-accent" : "text-red-400"
          }`}>
            <TrendingUp className={`w-3 h-3 ${!trend.positive && "rotate-180"}`} />
            {trend.value}%
          </div>
        )}
      </div>
      <p className="text-lg sm:text-2xl font-bold mb-0.5 sm:mb-1">{value}</p>
      <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
      {subvalue && (
        <p className="text-[10px] sm:text-xs text-muted-foreground/60 mt-0.5 sm:mt-1">{subvalue}</p>
      )}
    </motion.div>
  );
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {payload.map((entry, index: number) => (
          <p key={index} className="text-xs text-muted-foreground">
            {entry.name}: <span className="font-medium text-foreground">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const StatisticsGrid = ({ schedule, streak }: StatisticsGridProps) => {
  // Calculate real statistics from schedule data
  const stats = useMemo(() => {
    const today = getBrazilDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Filter schedule for current month
    const thisMonthSchedule = schedule.filter((day) => {
      const date = new Date(day.date + "T12:00:00");
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    // Total chapters read this month
    const totalChaptersRead = thisMonthSchedule.reduce(
      (acc, day) => acc + day.completedChapters,
      0
    );

    // Estimate reading time (avg 8 min per chapter)
    const totalMinutes = totalChaptersRead * 8;

    // Calculate best streak (longest consecutive completed days)
    let bestStreak = 0;
    let currentStreakCount = 0;
    
    schedule.forEach((day) => {
      if (day.isCompleted) {
        currentStreakCount++;
        bestStreak = Math.max(bestStreak, currentStreakCount);
      } else {
        currentStreakCount = 0;
      }
    });

    // Weekly data for bar chart (last 7 days)
    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const last7Days = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = formatDateKey(date);
      const daySchedule = schedule.find((d) => d.date === dateKey);
      
      last7Days.push({
        day: dayNames[date.getDay()],
        chapters: daySchedule?.completedChapters || 0,
        minutes: (daySchedule?.completedChapters || 0) * 8,
      });
    }

    // Monthly progress (weeks of current month)
    const weeksInMonth: { week: string; completed: number; total: number }[] = [];
    let weekNum = 1;
    let weekCompleted = 0;
    let weekTotal = 0;
    
    thisMonthSchedule.forEach((day, index) => {
      const date = new Date(day.date + "T12:00:00");
      weekCompleted += day.isCompleted ? 1 : 0;
      weekTotal++;
      
      // New week starts on Sunday or end of month data
      if (date.getDay() === 6 || index === thisMonthSchedule.length - 1) {
        weeksInMonth.push({
          week: `Sem ${weekNum}`,
          completed: weekCompleted,
          total: weekTotal,
        });
        weekNum++;
        weekCompleted = 0;
        weekTotal = 0;
      }
    });

    // Fill empty weeks if needed
    while (weeksInMonth.length < 4) {
      weeksInMonth.push({
        week: `Sem ${weeksInMonth.length + 1}`,
        completed: 0,
        total: 7,
      });
    }

    // Find best day of the week
    const dayStats = dayNames.map((name) => ({ name, chapters: 0 }));
    schedule.forEach((day) => {
      const date = new Date(day.date + "T12:00:00");
      dayStats[date.getDay()].chapters += day.completedChapters;
    });
    
    const bestDay = dayStats.reduce((max, day) => 
      day.chapters > max.chapters ? day : max, 
      { name: "—", chapters: 0 }
    );

    // Average daily chapters
    const completedDays = schedule.filter((d) => d.completedChapters > 0).length;
    const avgChapters = completedDays > 0 
      ? (totalChaptersRead / completedDays).toFixed(1) 
      : "0";

    return {
      totalChaptersRead,
      totalMinutes,
      currentStreak: streak,
      bestStreak: Math.max(bestStreak, streak),
      weeklyData: last7Days,
      monthlyProgress: weeksInMonth,
      bestDay,
      avgChapters,
    };
  }, [schedule, streak]);

  // Reading time distribution (mock for now - would need actual timestamp data)
  const readingTimeData = [
    { time: "Manhã", value: 35, color: "hsl(45, 93%, 47%)" },
    { time: "Tarde", value: 25, color: "hsl(221, 83%, 53%)" },
    { time: "Noite", value: 30, color: "hsl(262, 83%, 58%)" },
    { time: "Madrugada", value: 10, color: "hsl(215, 20%, 65%)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <StatCard
          icon={BookOpen}
          label="Capítulos Lidos"
          value={stats.totalChaptersRead}
          subvalue="Este mês"
          color="primary"
        />
        <StatCard
          icon={Clock}
          label="Tempo Total"
          value={`${stats.totalMinutes}min`}
          subvalue="Este mês"
          color="accent"
        />
        <StatCard
          icon={Flame}
          label="Sequência Atual"
          value={`${stats.currentStreak} dias`}
          trend={stats.currentStreak > 0 ? { value: 100, positive: true } : undefined}
          color="orange"
        />
        <StatCard
          icon={Target}
          label="Melhor Sequência"
          value={`${stats.bestStreak} dias`}
          subvalue="Recorde pessoal"
          color="primary"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Weekly Chapters Chart */}
        <motion.div
          className="p-4 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Capítulos por Dia</h3>
              <p className="text-xs text-muted-foreground">Últimos 7 dias</p>
            </div>
          </div>
          
          <div className="h-40 sm:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyData} barSize={20}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  width={25}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted)/0.1)' }} />
                <Bar 
                  dataKey="chapters" 
                  name="Capítulos"
                  fill="url(#barGradient)" 
                  radius={[6, 6, 0, 0]}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Reading Time Distribution */}
        <motion.div
          className="p-4 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Horários de Leitura</h3>
              <p className="text-xs text-muted-foreground">Distribuição do mês</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={readingTimeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {readingTimeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex-1 w-full space-y-2 sm:space-y-3">
              {readingTimeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <div 
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{item.time}</p>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Monthly Progress Chart */}
      <motion.div
        className="p-4 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Progresso Mensal</h3>
              <p className="text-xs text-muted-foreground">Dias lidos por semana</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Lidos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-muted/30" />
              <span className="text-muted-foreground">Meta</span>
            </div>
          </div>
        </div>

        <div className="h-40 sm:h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.monthlyProgress}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="week" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                domain={[0, 7]}
                width={25}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="total"
                name="Meta"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1}
                strokeDasharray="4 4"
                fill="none"
              />
              <Area
                type="monotone"
                dataKey="completed"
                name="Lidos"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#areaGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Reading Insights */}
      <motion.div
        className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Insights da Sua Jornada</h3>
        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl bg-background/50">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Melhor dia</p>
            <p className="font-semibold text-sm sm:text-base">{stats.bestDay.name}</p>
            <p className="text-[10px] sm:text-xs text-accent">{stats.bestDay.chapters} capítulos</p>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-background/50">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Horário favorito</p>
            <p className="font-semibold text-sm sm:text-base">Manhã</p>
            <p className="text-[10px] sm:text-xs text-accent">35% das leituras</p>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-background/50">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Média diária</p>
            <p className="font-semibold text-sm sm:text-base">{stats.avgChapters} capítulos</p>
            <p className="text-[10px] sm:text-xs text-accent">~{Math.round(parseFloat(stats.avgChapters) * 8)} minutos</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatisticsGrid;
