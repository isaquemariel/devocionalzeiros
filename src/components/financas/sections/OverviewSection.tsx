import { useMemo, useState } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Diamond, CreditCard, RefreshCw } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfYear, endOfYear, isWithinInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Period = 'today' | 'week' | 'month' | 'year';

export function OverviewSection() {
  const { transactions, installments, fixedCosts, subscriptions } = useFinanceStore();
  const [period, setPeriod] = useState<Period>('month');

  const now = new Date();

  const dateRange = useMemo(() => {
    switch (period) {
      case 'today': return { start: now, end: now };
      case 'week': return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
      case 'month': return { start: startOfMonth(now), end: endOfMonth(now) };
      case 'year': return { start: startOfYear(now), end: endOfYear(now) };
    }
  }, [period]);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const d = new Date(t.date + 'T12:00:00');
      return isWithinInterval(d, { start: dateRange.start, end: dateRange.end });
    });
  }, [transactions, dateRange]);

  const totalIncome = filtered.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
  const totalExpense = filtered.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
  const balance = totalIncome - totalExpense;

  const installmentMonthly = installments
    .filter((i) => i.is_active && i.paid_installments < i.total_installments)
    .reduce((s, i) => s + Number(i.installment_amount), 0);

  const fixedMonthly = fixedCosts.filter((f) => f.is_active).reduce((s, f) => s + Number(f.amount), 0);
  const subscriptionMonthly = subscriptions.filter((s) => s.is_active).reduce((s, sub) => s + Number(sub.amount), 0);
  const commitments = installmentMonthly + fixedMonthly + subscriptionMonthly;

  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const periodLabel = period === 'month'
    ? format(now, 'MMMM yyyy', { locale: ptBR }).replace(/^\w/, (c) => c.toUpperCase())
    : period === 'today' ? 'Hoje' : period === 'week' ? 'Esta semana' : format(now, 'yyyy');

  const PERIODS: { key: Period; label: string }[] = [
    { key: 'today', label: 'Hoje' },
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' },
  ];

  return (
    <div className="space-y-6">
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
            onClick={() => setPeriod(key)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              period === key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

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
            <p className="text-xs text-muted-foreground">R$ {fmt(installments.filter(i => i.is_active).reduce((s,i) => s + Number(i.total_amount) - Number(i.installment_amount) * i.paid_installments, 0))} p/ quitar</p>
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
