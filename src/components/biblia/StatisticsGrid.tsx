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

// Mock data
const weeklyData = [
  { day: "Seg", chapters: 3, minutes: 25 },
  { day: "Ter", chapters: 4, minutes: 32 },
  { day: "Qua", chapters: 0, minutes: 0 },
  { day: "Qui", chapters: 0, minutes: 0 },
  { day: "Sex", chapters: 0, minutes: 0 },
  { day: "Sáb", chapters: 0, minutes: 0 },
  { day: "Dom", chapters: 0, minutes: 0 },
];

const monthlyProgress = [
  { week: "Sem 1", completed: 2, total: 7 },
  { week: "Sem 2", completed: 0, total: 7 },
  { week: "Sem 3", completed: 0, total: 7 },
  { week: "Sem 4", completed: 0, total: 7 },
];

const readingTimeData = [
  { time: "Manhã (6h-12h)", value: 35, color: "hsl(45, 93%, 47%)" },
  { time: "Tarde (12h-18h)", value: 25, color: "hsl(221, 83%, 53%)" },
  { time: "Noite (18h-22h)", value: 30, color: "hsl(262, 83%, 58%)" },
  { time: "Madrugada (22h-6h)", value: 10, color: "hsl(215, 20%, 65%)" },
];

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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs text-muted-foreground">
            {entry.name}: <span className="font-medium text-foreground">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StatisticsGrid = () => {
  const totalChaptersRead = 7;
  const totalMinutes = 57;
  const currentStreak = 2;
  const bestStreak = 2;

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
          value={totalChaptersRead}
          subvalue="Este mês"
          color="primary"
        />
        <StatCard
          icon={Clock}
          label="Tempo Total"
          value={`${totalMinutes}min`}
          subvalue="Este mês"
          color="accent"
        />
        <StatCard
          icon={Flame}
          label="Sequência Atual"
          value={`${currentStreak} dias`}
          trend={{ value: 100, positive: true }}
          color="orange"
        />
        <StatCard
          icon={Target}
          label="Melhor Sequência"
          value={`${bestStreak} dias`}
          subvalue="Recorde pessoal"
          color="primary"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Chapters Chart */}
        <motion.div
          className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Capítulos por Dia</h3>
              <p className="text-xs text-muted-foreground">Esta semana</p>
            </div>
          </div>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barSize={24}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
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
          className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Horários de Leitura</h3>
              <p className="text-xs text-muted-foreground">Distribuição do mês</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="h-40 w-40 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={readingTimeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
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
            
            <div className="flex-1 space-y-3">
              {readingTimeData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{item.time}</p>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Monthly Progress Chart */}
      <motion.div
        className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold">Progresso Mensal</h3>
              <p className="text-xs text-muted-foreground">Dias lidos por semana</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Lidos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted/30" />
              <span className="text-muted-foreground">Meta</span>
            </div>
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyProgress}>
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
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                domain={[0, 7]}
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
        className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-semibold mb-4">Insights da Sua Jornada</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-background/50">
            <p className="text-sm text-muted-foreground mb-1">Melhor dia</p>
            <p className="font-semibold">Terça-feira</p>
            <p className="text-xs text-accent">4 capítulos</p>
          </div>
          <div className="p-4 rounded-xl bg-background/50">
            <p className="text-sm text-muted-foreground mb-1">Horário favorito</p>
            <p className="font-semibold">Manhã</p>
            <p className="text-xs text-accent">35% das leituras</p>
          </div>
          <div className="p-4 rounded-xl bg-background/50">
            <p className="text-sm text-muted-foreground mb-1">Média diária</p>
            <p className="font-semibold">3.5 capítulos</p>
            <p className="text-xs text-accent">~28 minutos</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatisticsGrid;
