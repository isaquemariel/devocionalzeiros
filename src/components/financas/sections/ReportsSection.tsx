import { useMemo, useState } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { startOfMonth, endOfMonth, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BarChart3 } from 'lucide-react';

export function ReportsSection() {
  const { transactions } = useFinanceStore();
  const [months] = useState(6);

  const monthlyData = useMemo(() => {
    const data = [];
    for (let i = months - 1; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      const monthTx = transactions.filter((t) => {
        const d = new Date(t.date + 'T12:00:00');
        return d >= start && d <= end;
      });
      const income = monthTx.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
      const expense = monthTx.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
      data.push({
        label: format(date, 'MMM', { locale: ptBR }),
        income, expense, balance: income - expense,
      });
    }
    return data;
  }, [transactions, months]);

  const categoryData = useMemo(() => {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());
    const map: Record<string, number> = {};
    transactions
      .filter(t => t.type === 'expense' && new Date(t.date + 'T12:00:00') >= start && new Date(t.date + 'T12:00:00') <= end)
      .forEach(t => { map[t.category] = (map[t.category] || 0) + Number(t.amount); });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [transactions]);

  const maxExpense = Math.max(...monthlyData.map(d => d.expense), 1);
  const maxIncome = Math.max(...monthlyData.map(d => d.income), 1);
  const maxVal = Math.max(maxExpense, maxIncome);
  const maxCat = categoryData.length > 0 ? categoryData[0][1] : 1;

  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Relatórios</h1>

      {/* Monthly bar chart */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Últimos {months} meses</span>
          </div>
          <div className="flex items-end gap-2 h-40">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 items-end" style={{ height: '120px' }}>
                  <div className="flex-1 bg-emerald-500/60 rounded-t" style={{ height: `${(d.income / maxVal) * 100}%`, minHeight: d.income > 0 ? '4px' : '0' }} />
                  <div className="flex-1 bg-red-500/60 rounded-t" style={{ height: `${(d.expense / maxVal) * 100}%`, minHeight: d.expense > 0 ? '4px' : '0' }} />
                </div>
                <span className="text-[10px] text-muted-foreground uppercase">{d.label}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-500/60" /> Entradas</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500/60" /> Saídas</div>
          </div>
        </CardContent>
      </Card>

      {/* Category breakdown */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <span className="text-sm font-medium">Gastos por Categoria (este mês)</span>
          {categoryData.length === 0 ? (
            <p className="text-xs text-muted-foreground">Nenhum gasto neste mês</p>
          ) : (
            categoryData.map(([cat, val]) => (
              <div key={cat} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="capitalize text-foreground">{cat}</span>
                  <span className="text-red-400 font-medium">R$ {fmt(val)}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-red-500/60 h-2 rounded-full transition-all" style={{ width: `${(val / maxCat) * 100}%` }} />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
