import { useMemo, useState, useContext, useCallback } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import { RefetchCtx } from '@/pages/Financas';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Diamond, CreditCard, RefreshCw, Filter, ChevronLeft, ChevronRight, CalendarDays, AlertTriangle } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfYear, endOfYear, isWithinInterval, subDays, eachDayOfInterval, addMonths, subMonths, startOfDay, endOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, PieChart, Pie, Cell } from 'recharts';
import { getInstallmentStatus, isInstallmentPaidInMonth } from '@/lib/installmentStatus';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

type Period = 'today' | 'week' | 'month' | 'year' | 'custom';

export function OverviewSection() {
  const { transactions, projectTransactions, projects, installments, fixedCosts, subscriptions } = useFinanceStore();
  const refetch = useContext(RefetchCtx);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);
  const [period, setPeriod] = useState<Period>('month');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [customDateRange, setCustomDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });

  const now = new Date();

  const dateRange = useMemo(() => {
    switch (period) {
      case 'today': return { start: startOfDay(now), end: endOfDay(now) };
      case 'week': return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
      case 'month': return { start: startOfMonth(selectedMonth), end: endOfMonth(selectedMonth) };
      case 'year': return { start: startOfYear(selectedMonth), end: endOfYear(selectedMonth) };
      case 'custom': {
        const from = customDateRange.from || now;
        const to = customDateRange.to || from;
        return { start: startOfDay(from), end: endOfDay(to) };
      }
    }
  }, [period, selectedMonth, customDateRange]);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const d = new Date(t.date + 'T12:00:00');
      if (!isWithinInterval(d, { start: dateRange.start, end: dateRange.end })) return false;
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
      if (typeFilter !== 'all' && t.type !== typeFilter) return false;
      return true;
    });
  }, [transactions, dateRange, categoryFilter, typeFilter]);

  const filteredProjectTx = useMemo(() => {
    return projectTransactions.filter((t) => {
      const d = new Date(t.date + 'T12:00:00');
      if (!isWithinInterval(d, { start: dateRange.start, end: dateRange.end })) return false;
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
      if (typeFilter !== 'all' && t.type !== typeFilter) return false;
      return true;
    });
  }, [projectTransactions, dateRange, categoryFilter, typeFilter]);

  const totalIncome = filtered.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
    + filteredProjectTx.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
  const totalExpense = filtered.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
    + filteredProjectTx.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);

  // Saldo anterior: all transactions BEFORE the current period start
  const carriedBalance = useMemo(() => {
    const before = (list: { date: string; type: string; amount: number }[]) =>
      list.filter(t => new Date(t.date + 'T12:00:00') < dateRange.start);
    const txBefore = before(transactions);
    const ptxBefore = before(projectTransactions);
    const inc = [...txBefore, ...ptxBefore].filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
    const exp = [...txBefore, ...ptxBefore].filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
    return inc - exp;
  }, [transactions, projectTransactions, dateRange.start]);

  const periodBalance = totalIncome - totalExpense;
  const balance = carriedBalance + periodBalance;

  const activeInstallments = installments.filter((i) => i.is_active && i.paid_installments < i.total_installments);

  const installmentMonthly = activeInstallments
    .reduce((s, i) => s + Number(i.installment_amount), 0);

  // How much is already paid this month vs total due
  const installmentPaidThisMonth = useMemo(() => {
    return activeInstallments
      .filter((i) => isInstallmentPaidInMonth(i, selectedMonth))
      .reduce((s, i) => s + Number(i.installment_amount), 0);
  }, [activeInstallments, selectedMonth]);

  const installmentRemainingThisMonth = installmentMonthly - installmentPaidThisMonth;

  // Calculate settlement total for active installments
  const settlementTotal = activeInstallments
    .reduce((s, i) => {
      const settlement = (i as any).settlement_amount;
      if (settlement && Number(settlement) > 0) return s + Number(settlement);
      return s + Number(i.installment_amount) * (i.total_installments - i.paid_installments);
    }, 0);

  // Overdue installments for selected month
  const overdueInstallments = useMemo(() => {
    return installments.filter((installment) => getInstallmentStatus(installment, selectedMonth) === 'overdue');
  }, [installments, selectedMonth]);

  // Overdue fixed costs (active, past due_day, not paid this month)
  const overdueFixedCosts = useMemo(() => {
    const now = new Date();
    return fixedCosts.filter((f) => {
      if (!f.is_active || !f.due_day) return false;
      const lastPaid = (f as any).last_paid_date;
      if (lastPaid) {
        const paidDate = new Date(lastPaid + 'T12:00:00');
        if (paidDate.getFullYear() === now.getFullYear() && paidDate.getMonth() === now.getMonth()) return false;
      }
      return now.getDate() > f.due_day;
    });
  }, [fixedCosts]);

  const fixedMonthly = fixedCosts.filter((f) => f.is_active).reduce((s, f) => s + Number(f.amount), 0);

  // Fixed costs paid this month
  const fixedPaidThisMonth = useMemo(() => {
    const now = new Date();
    return fixedCosts.filter((f) => {
      if (!f.is_active) return false;
      const lastPaid = (f as any).last_paid_date;
      if (!lastPaid) return false;
      const paidDate = new Date(lastPaid + 'T12:00:00');
      return paidDate.getFullYear() === now.getFullYear() && paidDate.getMonth() === now.getMonth();
    }).reduce((s, f) => s + Number(f.amount), 0);
  }, [fixedCosts]);

  const fixedRemainingThisMonth = fixedMonthly - fixedPaidThisMonth;

  const subscriptionMonthly = subscriptions.filter((s) => s.is_active && ((s as any).status || 'active') === 'active').reduce((s, sub) => s + Number(sub.amount), 0);
  const commitments = installmentMonthly + fixedMonthly + subscriptionMonthly;
  const commitmentsPaidThisMonth = installmentPaidThisMonth + fixedPaidThisMonth;
  const commitmentsRemainingThisMonth = commitments - commitmentsPaidThisMonth;

  const sparkData = useMemo(() => {
    const days = eachDayOfInterval({ start: subDays(now, 6), end: now });
    return days.map((day) => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const dayTx = transactions.filter(t => t.date === dayStr);
      const inc = dayTx.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
      const exp = dayTx.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
      return { d: format(day, 'dd/MM'), Entradas: inc, Saídas: exp };
    });
  }, [transactions]);

  const EXPENSE_COLORS = ['#ef4444', '#dc2626', '#f87171', '#b91c1c', '#fca5a5', '#991b1b', '#fee2e2', '#7f1d1d', '#f43f5e', '#e11d48'];
  const INCOME_COLORS = ['#22c55e', '#16a34a', '#4ade80', '#15803d', '#86efac', '#166534', '#bbf7d0', '#14532d', '#10b981', '#059669'];

  const projectNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    projects.forEach(p => { map[p.id] = p.name; });
    return map;
  }, [projects]);




  const expenseByCat = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + Number(t.amount);
    });
    filteredProjectTx.filter(t => t.type === 'expense').forEach(t => {
      const label = projectNameMap[t.project_id] || 'Projeto';
      map[label] = (map[label] || 0) + Number(t.amount);
    });
    // Include paid fixed costs as expenses in the pie chart
    fixedCostsPaidInPeriod.forEach(f => {
      const cat = f.category || 'outros';
      map[cat] = (map[cat] || 0) + Number(f.amount);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [filtered, filteredProjectTx, projectNameMap, fixedCostsPaidInPeriod]);

  const incomeByCat = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.filter(t => t.type === 'income').forEach(t => {
      map[t.category] = (map[t.category] || 0) + Number(t.amount);
    });
    filteredProjectTx.filter(t => t.type === 'income').forEach(t => {
      const label = projectNameMap[t.project_id] || 'Projeto';
      map[label] = (map[label] || 0) + Number(t.amount);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [filtered, filteredProjectTx, projectNameMap]);

  const PieTooltipContent = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0];
    return (
      <div className="bg-card border border-border rounded-lg p-2 text-xs shadow-lg">
        <p className="font-medium capitalize">{d.name}</p>
        <p style={{ color: d.payload.fill }}>R$ {Number(d.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
      </div>
    );
  };

  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const periodLabel = period === 'month'
    ? format(selectedMonth, 'MMMM yyyy', { locale: ptBR }).replace(/^\w/, (c) => c.toUpperCase())
    : period === 'today' ? 'Hoje' : period === 'week' ? 'Esta semana' : period === 'custom'
      ? (customDateRange.from
        ? (customDateRange.to && customDateRange.from !== customDateRange.to
          ? `${format(customDateRange.from, 'dd/MM/yyyy')} - ${format(customDateRange.to, 'dd/MM/yyyy')}`
          : format(customDateRange.from, 'dd/MM/yyyy'))
        : 'Selecione uma data')
      : format(selectedMonth, 'yyyy');

  const PERIODS: { key: Period; label: string }[] = [
    { key: 'today', label: 'Hoje' },
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' },
    { key: 'custom', label: 'Período' },
  ];

  const usedCategories = useMemo(() => {
    const cats = new Set(transactions.map(t => t.category));
    return Array.from(cats).sort();
  }, [transactions]);

  const SparkTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-card border border-border rounded-lg p-1.5 text-[10px] shadow-lg">
        <p className="text-muted-foreground mb-0.5">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>{p.name}: R$ {Number(p.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        ))}
      </div>
    );
  };

  const hasFilters = categoryFilter !== 'all' || typeFilter !== 'all';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Visão Geral</h1>
          <p className="text-sm text-muted-foreground">{periodLabel}</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
          title="Atualizar dados"
        >
          <RefreshCw className={`w-4 h-4 text-muted-foreground ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Period selector */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
        {PERIODS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { setPeriod(key); setSelectedMonth(new Date()); }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              period === key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Month navigation */}
      {(period === 'month' || period === 'year') && (
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => setSelectedMonth(prev => period === 'month' ? subMonths(prev, 1) : new Date(prev.getFullYear() - 1, 0, 1))} className="p-1.5 rounded-md hover:bg-muted transition-colors">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-sm font-medium text-foreground min-w-[120px] text-center">{periodLabel}</span>
          <button onClick={() => setSelectedMonth(prev => period === 'month' ? addMonths(prev, 1) : new Date(prev.getFullYear() + 1, 0, 1))} className="p-1.5 rounded-md hover:bg-muted transition-colors">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Custom date picker */}
      {period === 'custom' && (
        <div className="flex items-center gap-2 flex-wrap">
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-colors",
                customDateRange.from ? "border-primary/30 bg-primary/5 text-foreground" : "border-border text-muted-foreground"
              )}>
                <CalendarDays className="w-3.5 h-3.5" />
                {customDateRange.from
                  ? (customDateRange.to && customDateRange.to.getTime() !== customDateRange.from.getTime()
                    ? `${format(customDateRange.from, 'dd/MM/yyyy')} → ${format(customDateRange.to, 'dd/MM/yyyy')}`
                    : format(customDateRange.from, 'dd/MM/yyyy'))
                  : 'Selecione data(s)'}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{ from: customDateRange.from, to: customDateRange.to }}
                onSelect={(range) => setCustomDateRange({ from: range?.from, to: range?.to })}
                numberOfMonths={1}
                locale={ptBR}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          {customDateRange.from && (
            <button
              onClick={() => setCustomDateRange({ from: undefined, to: undefined })}
              className="text-xs text-primary underline"
            >
              Limpar
            </button>
          )}
        </div>
      )}

      {/* Type filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <div className="flex gap-1">
          {([['all', 'Tudo'], ['income', 'Entradas'], ['expense', 'Saídas']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTypeFilter(key)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                typeFilter === key ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {usedCategories.length > 0 && (
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-muted border-0 rounded-md px-2 py-1 text-foreground outline-none max-w-[140px]"
          >
            <option value="all">Todas categorias</option>
            {usedCategories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}
        {hasFilters && (
          <button onClick={() => { setCategoryFilter('all'); setTypeFilter('all'); }} className="text-xs text-primary underline">Limpar</button>
        )}
      </div>

      {/* Mini sparkline */}
      <Card>
        <CardContent className="p-3 pb-1">
          <p className="text-xs text-muted-foreground mb-1">Últimos 7 dias</p>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData}>
                <defs>
                  <linearGradient id="sparkIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="sparkExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip content={<SparkTooltip />} />
                <Area type="monotone" dataKey="Entradas" stroke="#22c55e" fill="url(#sparkIncome)" strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="Saídas" stroke="#ef4444" fill="url(#sparkExpense)" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Overdue alerts */}
      {(overdueInstallments.length > 0 || overdueFixedCosts.length > 0) && (
        <Card className="border-red-500/40 bg-red-950/10">
          <CardContent className="p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <p className="text-xs font-semibold text-red-400">Atenção — Itens atrasados</p>
            </div>
            {overdueInstallments.map(inst => (
              <button key={inst.id} onClick={() => useFinanceStore.getState().setActiveSection('installments')} className="block w-full text-left">
                <p className="text-xs text-red-400/80 truncate hover:text-red-300 transition-colors">
                  Parcela: {inst.description} — R$ {fmt(Number(inst.installment_amount))} (venc. dia {(inst as any).due_day})
                </p>
              </button>
            ))}
            {overdueFixedCosts.map(fc => (
              <button key={fc.id} onClick={() => useFinanceStore.getState().setActiveSection('fixedcosts')} className="block w-full text-left">
                <p className="text-xs text-red-400/80 truncate hover:text-red-300 transition-colors">
                  Custo fixo: {fc.name} — R$ {fmt(Number(fc.amount))} (venc. dia {fc.due_day})
                </p>
              </button>
            ))}
            <p className="text-[10px] text-red-400/60 mt-1">Toque para ir às pendências e regularizar.</p>
          </CardContent>
        </Card>
      )}

      {/* Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-emerald-950/30 border-emerald-800/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Entradas</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-lg font-bold text-emerald-400">R$ {fmt(totalIncome)}</p>
            <p className="text-xs text-muted-foreground">{filtered.filter((t) => t.type === 'income').length} lançamentos</p>
          </CardContent>
        </Card>

        <Card className="bg-red-950/30 border-red-800/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Saídas</span>
              <ArrowDownRight className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-lg font-bold text-red-400">R$ {fmt(totalExpense)}</p>
            <p className="text-xs text-muted-foreground">{filtered.filter((t) => t.type === 'expense').length} lançamentos</p>
          </CardContent>
        </Card>

        <Card className={`${balance >= 0 ? 'bg-emerald-950/20 border-emerald-800/20' : 'bg-red-950/20 border-red-800/20'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Saldo</span>
              <Diamond className="w-4 h-4 text-primary" />
            </div>
            <p className={`text-lg font-bold ${balance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>R$ {fmt(balance)}</p>
            {carriedBalance !== 0 && (
              <p className={`text-xs ${carriedBalance >= 0 ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
                Anterior: R$ {fmt(carriedBalance)} {periodBalance >= 0 ? '+' : ''} {fmt(periodBalance)} período
              </p>
            )}
            {carriedBalance === 0 && (
              <p className="text-xs text-muted-foreground">{balance >= 0 ? 'positivo' : 'negativo'}</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-amber-950/20 border-amber-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Parcelas/Mês</span>
              <CreditCard className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-lg font-bold text-amber-400">R$ {fmt(installmentMonthly)}</p>
            <p className="text-xs text-muted-foreground">
              {installmentRemainingThisMonth > 0
                ? <span className="text-amber-400/80">Falta: R$ {fmt(installmentRemainingThisMonth)}</span>
                : <span className="text-emerald-400/80">✓ Pago este mês</span>}
            </p>
            <p className={`text-[10px] ${overdueInstallments.length > 0 ? 'text-red-400' : 'text-muted-foreground'}`}>
              R$ {fmt(settlementTotal)} p/ quitar tudo
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-2 bg-purple-950/20 border-purple-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Compromissos</span>
              <RefreshCw className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-lg font-bold text-purple-400">R$ {fmt(commitments)}</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Parcelas + Fixos + Assinaturas</p>
              {commitmentsRemainingThisMonth > 0 ? (
                <p className="text-xs text-amber-400/80">Falta: R$ {fmt(commitmentsRemainingThisMonth)}</p>
              ) : (
                <p className="text-xs text-emerald-400/80">✓ Quitado</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pie charts - Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {expenseByCat.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <ArrowDownRight className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-foreground">Saídas por Categoria</span>
              </div>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expenseByCat} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} innerRadius={30} paddingAngle={2}>
                      {expenseByCat.map((_, i) => (
                        <Cell key={i} fill={EXPENSE_COLORS[i % EXPENSE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1 mt-2">
                {expenseByCat.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: EXPENSE_COLORS[i % EXPENSE_COLORS.length] }} />
                      <span className="text-muted-foreground capitalize truncate">{item.name}</span>
                    </div>
                    <span className="text-foreground font-medium shrink-0 ml-2">R$ {fmt(item.value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {incomeByCat.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-foreground">Entradas por Categoria</span>
              </div>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={incomeByCat} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} innerRadius={30} paddingAngle={2}>
                      {incomeByCat.map((_, i) => (
                        <Cell key={i} fill={INCOME_COLORS[i % INCOME_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1 mt-2">
                {incomeByCat.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: INCOME_COLORS[i % INCOME_COLORS.length] }} />
                      <span className="text-muted-foreground capitalize truncate">{item.name}</span>
                    </div>
                    <span className="text-foreground font-medium shrink-0 ml-2">R$ {fmt(item.value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
