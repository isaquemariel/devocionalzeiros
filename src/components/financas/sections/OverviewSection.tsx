import { useMemo, useState } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Diamond, CreditCard, RefreshCw, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfYear, endOfYear, isWithinInterval, subDays, eachDayOfInterval, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { getInstallmentStatus } from '@/lib/installmentStatus';

type Period = 'today' | 'week' | 'month' | 'year';

export function OverviewSection() {
  const { transactions, installments, fixedCosts, subscriptions } = useFinanceStore();
  const [period, setPeriod] = useState<Period>('month');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const now = new Date();

  const dateRange = useMemo(() => {
    switch (period) {
      case 'today': return { start: now, end: now };
      case 'week': return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
      case 'month': return { start: startOfMonth(selectedMonth), end: endOfMonth(selectedMonth) };
      case 'year': return { start: startOfYear(selectedMonth), end: endOfYear(selectedMonth) };
    }
  }, [period, selectedMonth]);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const d = new Date(t.date + 'T12:00:00');
      if (!isWithinInterval(d, { start: dateRange.start, end: dateRange.end })) return false;
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
      if (typeFilter !== 'all' && t.type !== typeFilter) return false;
      return true;
    });
  }, [transactions, dateRange, categoryFilter, typeFilter]);

  const totalIncome = filtered.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
  const totalExpense = filtered.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
  const balance = totalIncome - totalExpense;

  const installmentMonthly = installments
    .filter((i) => i.is_active && i.paid_installments < i.total_installments)
    .reduce((s, i) => s + Number(i.installment_amount), 0);

  // Calculate settlement total for active installments
  const settlementTotal = installments
    .filter((i) => i.is_active && i.paid_installments < i.total_installments)
    .reduce((s, i) => {
      const settlement = (i as any).settlement_amount;
      if (settlement && Number(settlement) > 0) return s + Number(settlement);
      return s + Number(i.installment_amount) * (i.total_installments - i.paid_installments);
    }, 0);

  // Overdue installments for selected month
  const overdueInstallments = useMemo(() => {
    return installments.filter((installment) => getInstallmentStatus(installment, selectedMonth) === 'overdue');
  }, [installments, selectedMonth]);

  const fixedMonthly = fixedCosts.filter((f) => f.is_active).reduce((s, f) => s + Number(f.amount), 0);
  const subscriptionMonthly = subscriptions.filter((s) => s.is_active).reduce((s, sub) => s + Number(sub.amount), 0);
  const commitments = installmentMonthly + fixedMonthly + subscriptionMonthly;

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

  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const periodLabel = period === 'month'
    ? format(selectedMonth, 'MMMM yyyy', { locale: ptBR }).replace(/^\w/, (c) => c.toUpperCase())
    : period === 'today' ? 'Hoje' : period === 'week' ? 'Esta semana' : format(selectedMonth, 'yyyy');

  const PERIODS: { key: Period; label: string }[] = [
    { key: 'today', label: 'Hoje' },
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' },
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

      {/* Overdue installments alert */}
      {overdueInstallments.length > 0 && (
        <Card className="border-red-500/40 bg-red-950/10">
          <CardContent className="p-3">
            <p className="text-xs font-semibold text-red-400 mb-1">⚠ Parcelas atrasadas ({overdueInstallments.length})</p>
            {overdueInstallments.map(inst => (
              <p key={inst.id} className="text-xs text-red-400/80 truncate">
                {inst.description} — R$ {fmt(Number(inst.installment_amount))} (venc. dia {(inst as any).due_day})
              </p>
            ))}
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
            <p className="text-xs text-muted-foreground">{balance >= 0 ? 'positivo' : 'negativo'}</p>
          </CardContent>
        </Card>

        <Card className="bg-amber-950/20 border-amber-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Parcelas/Mês</span>
              <CreditCard className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-lg font-bold text-amber-400">R$ {fmt(installmentMonthly)}</p>
            <p className={`text-xs ${overdueInstallments.length > 0 ? 'text-red-400 font-medium' : 'text-muted-foreground'}`}>
              R$ {fmt(settlementTotal)} p/ quitar
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
            <p className="text-xs text-muted-foreground">Parcelas + Custos Fixos + Assinaturas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
