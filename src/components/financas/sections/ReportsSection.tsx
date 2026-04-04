import { useMemo, useState, useContext, useCallback } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import { RefetchCtx } from '@/pages/Financas';
import { Card, CardContent } from '@/components/ui/card';
import { startOfMonth, endOfMonth, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BarChart3, TrendingUp, PieChart, RefreshCw, Download } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart as RechartsPie, Pie, Cell, Legend, AreaChart, Area,
} from 'recharts';
import jsPDF from 'jspdf';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

export function ReportsSection() {
  const { transactions, installments, fixedCosts, subscriptions, projectTransactions, projects } = useFinanceStore();
  const refetch = useContext(RefetchCtx);
  const [refreshing, setRefreshing] = useState(false);
  const [months] = useState(6);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

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
        fullLabel: format(date, 'MMMM yyyy', { locale: ptBR }),
        Entradas: income,
        Saídas: expense,
        Saldo: income - expense,
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
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const fmt = (v: number) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  const fmtFull = (v: number) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleExportPDF = useCallback(() => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 15;

    const addTitle = (title: string) => {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(title, pageWidth / 2, y, { align: 'center' });
      y += 8;
    };

    const addSubtitle = (text: string) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(text, 14, y);
      y += 6;
    };

    const addText = (text: string, indent = 14) => {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(text, indent, y);
      y += 5;
    };

    const checkPage = () => {
      if (y > 270) {
        doc.addPage();
        y = 15;
      }
    };

    // Header
    addTitle('Relatório Financeiro');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, pageWidth / 2, y, { align: 'center' });
    y += 10;

    // Monthly summary
    addSubtitle('Resumo Mensal (Últimos 6 meses)');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('Mês', 14, y);
    doc.text('Entradas', 70, y);
    doc.text('Saídas', 110, y);
    doc.text('Saldo', 150, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    monthlyData.forEach(m => {
      checkPage();
      doc.text(m.fullLabel, 14, y);
      doc.text(fmtFull(m.Entradas), 70, y);
      doc.text(fmtFull(m.Saídas), 110, y);
      doc.text(fmtFull(m.Saldo), 150, y);
      y += 5;
    });
    y += 5;

    // Category breakdown
    checkPage();
    addSubtitle(`Gastos por Categoria (${format(new Date(), 'MMMM yyyy', { locale: ptBR })})`);
    if (categoryData.length === 0) {
      addText('Nenhum gasto neste mês.');
    } else {
      categoryData.forEach(c => {
        checkPage();
        addText(`${c.name}: ${fmtFull(c.value)}`);
      });
    }
    y += 5;

    // Installments
    checkPage();
    const activeInst = installments.filter(i => i.is_active && i.paid_installments < i.total_installments);
    addSubtitle(`Parcelas Ativas (${activeInst.length})`);
    if (activeInst.length === 0) {
      addText('Nenhuma parcela ativa.');
    } else {
      activeInst.forEach(inst => {
        checkPage();
        addText(`${inst.description} — ${inst.paid_installments}/${inst.total_installments} — ${fmtFull(Number(inst.installment_amount))}/mês`);
      });
    }
    y += 5;

    // Fixed costs
    checkPage();
    const activeFixed = fixedCosts.filter(f => f.is_active);
    addSubtitle(`Custos Fixos (${activeFixed.length})`);
    if (activeFixed.length === 0) {
      addText('Nenhum custo fixo.');
    } else {
      activeFixed.forEach(fc => {
        checkPage();
        addText(`${fc.name} — ${fmtFull(Number(fc.amount))}${fc.due_day ? ` (venc. dia ${fc.due_day})` : ''}`);
      });
    }
    y += 5;

    // Subscriptions
    checkPage();
    const activeSubs = subscriptions.filter(s => s.is_active);
    addSubtitle(`Assinaturas (${activeSubs.length})`);
    if (activeSubs.length === 0) {
      addText('Nenhuma assinatura ativa.');
    } else {
      activeSubs.forEach(sub => {
        checkPage();
        addText(`${sub.name} — ${fmtFull(Number(sub.amount))} (${sub.billing_cycle})`);
      });
    }
    y += 5;

    // Projects
    checkPage();
    const activeProjects = projects.filter(p => p.is_active);
    if (activeProjects.length > 0) {
      addSubtitle(`Projetos (${activeProjects.length})`);
      activeProjects.forEach(p => {
        checkPage();
        const ptx = projectTransactions.filter(t => t.project_id === p.id);
        const invested = ptx.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
        const returned = ptx.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
        addText(`${p.name} — Investido: ${fmtFull(invested)} | Retorno: ${fmtFull(returned)} | Lucro: ${fmtFull(returned - invested)}`);
      });
    }

    doc.save(`relatorio-financeiro-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  }, [monthlyData, categoryData, installments, fixedCosts, subscriptions, projects, projectTransactions]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-card border border-border rounded-lg p-2 text-xs shadow-lg">
        <p className="font-medium text-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: R$ {Number(p.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        ))}
      </div>
    );
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0];
    return (
      <div className="bg-card border border-border rounded-lg p-2 text-xs shadow-lg">
        <p className="font-medium capitalize">{d.name}</p>
        <p className="text-red-400">R$ {Number(d.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Relatórios</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-xs font-medium hover:bg-primary/30 transition-colors"
            title="Salvar como PDF"
          >
            <Download className="w-3.5 h-3.5" />
            PDF
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            title="Atualizar dados"
          >
            <RefreshCw className={`w-4 h-4 text-muted-foreground ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Monthly bar chart */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Entradas vs Saídas — Últimos {months} meses</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => fmt(v)} width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Entradas" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="Saídas" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded" style={{ background: '#22c55e' }} /> Entradas</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded" style={{ background: '#ef4444' }} /> Saídas</div>
          </div>
        </CardContent>
      </Card>

      {/* Balance trend */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">Evolução do Saldo</span>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="saldoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => fmt(v)} width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="Saldo" stroke="#3b82f6" fill="url(#saldoGrad)" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Category pie chart */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Gastos por Categoria (este mês)</span>
          </div>
          {categoryData.length === 0 ? (
            <p className="text-xs text-muted-foreground py-4 text-center">Nenhum gasto neste mês</p>
          ) : (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="45%"
                    innerRadius={40}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                  >
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend
                    formatter={(value: string) => <span className="text-xs text-muted-foreground capitalize">{value}</span>}
                    iconSize={8}
                    wrapperStyle={{ fontSize: '11px' }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
