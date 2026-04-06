import { useState, useContext, useMemo } from 'react';
import { useFinanceStore, FixedCost } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Plus, Landmark, Pencil, CheckCircle2, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CategorySelect } from '@/components/financas/CategorySelect';
import { CategoriesCtx, FinanceGuardCtx } from '@/pages/Financas';
import { format, addMonths } from 'date-fns';

interface Props { userId: string; }

type StatusFilter = 'all' | 'paid' | 'pending' | 'overdue';

function getFixedCostStatus(f: FixedCost): 'paid' | 'pending' | 'overdue' {
  if (!f.is_active) return 'paid';
  const lastPaid = (f as any).last_paid_date;
  const nextDate = (f as any).next_payment_date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if paid this month
  if (lastPaid) {
    const paidDate = new Date(lastPaid + 'T12:00:00');
    if (paidDate.getFullYear() === today.getFullYear() && paidDate.getMonth() === today.getMonth()) {
      return 'paid';
    }
  }

  // If next_payment_date is in a future month, consider current month as paid
  if (nextDate) {
    const due = new Date(nextDate + 'T12:00:00');
    const dueMonth = due.getFullYear() * 12 + due.getMonth();
    const currentMonth = today.getFullYear() * 12 + today.getMonth();
    if (dueMonth > currentMonth) return 'paid';
    if (today > due) return 'overdue';
  } else if (f.due_day) {
    // Fallback: check due_day
    const dueThisMonth = new Date(today.getFullYear(), today.getMonth(), f.due_day);
    if (today > dueThisMonth) return 'overdue';
  }

  return 'pending';
}

export function FixedCostsSection({ userId }: Props) {
  const { fixedCosts, addFixedCost, removeFixedCost, updateFixedCost } = useFinanceStore();
  const { toast } = useToast();
  const cats = useContext(CategoriesCtx);
  const { guardAction } = useContext(FinanceGuardCtx);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<FixedCost | null>(null);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDay, setDueDay] = useState('');
  const [category, setCategory] = useState('outros');
  const [nextPaymentDate, setNextPaymentDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<StatusFilter>('all');

  const openEdit = (f: FixedCost) => guardAction(() => {
    setEditItem(f);
    setName(f.name);
    setAmount(String(f.amount));
    setDueDay(f.due_day ? String(f.due_day) : '');
    setNextPaymentDate((f as any).next_payment_date || '');
    setCategory(f.category);
    setShowAdd(true);
  });

  const openNew = () => guardAction(() => {
    setEditItem(null);
    setName(''); setAmount(''); setDueDay(''); setCategory('outros'); setNextPaymentDate('');
    setShowAdd(true);
  });

  const handleSave = async () => {
    const num = parseFloat(amount.replace(',', '.'));
    if (!num || !name.trim()) return;
    setSaving(true);
    const payload = {
      name: name.trim(), amount: num,
      due_day: dueDay ? parseInt(dueDay) : null,
      category,
      next_payment_date: nextPaymentDate || null,
    };
    if (editItem) {
      const { data, error } = await supabase.from('financial_fixed_costs' as any).update(payload).eq('id', editItem.id).select().single();
      if (data) { updateFixedCost(data as any); toast({ title: 'Custo fixo atualizado!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', variant: 'destructive' });
    } else {
      const { data, error } = await supabase.from('financial_fixed_costs' as any).insert({ user_id: userId, ...payload }).select().single();
      if (data) { addFixedCost(data as any); toast({ title: 'Custo fixo adicionado!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', variant: 'destructive' });
    }
    setSaving(false);
  };

  const handlePay = async (f: FixedCost) => guardAction(async () => {
    const today = new Date().toISOString().split('T')[0];
    let newNextDate = (f as any).next_payment_date;
    if (newNextDate) {
      const current = new Date(newNextDate + 'T12:00:00');
      const next = addMonths(current, 1);
      newNextDate = format(next, 'yyyy-MM-dd');
    }
    const { data, error } = await supabase.from('financial_fixed_costs' as any).update({
      last_paid_date: today,
      next_payment_date: newNextDate,
    }).eq('id', f.id).select().single();
    if (error) {
      toast({ title: 'Erro ao registrar pagamento', description: error.message, variant: 'destructive' });
      return;
    }
    if (data) {
      updateFixedCost(data as any);
    } else {
      updateFixedCost({ ...f, last_paid_date: today, next_payment_date: newNextDate } as any);
    }
    toast({ title: `${f.name} pago!${newNextDate ? ` Próx: ${format(new Date(newNextDate + 'T12:00:00'), 'dd/MM/yyyy')}` : ''}` });
  });

  const handleDelete = async (id: string) => guardAction(async () => {
    await supabase.from('financial_fixed_costs' as any).delete().eq('id', id);
    removeFixedCost(id);
  });

  const total = fixedCosts.filter(f => f.is_active).reduce((a, f) => a + Number(f.amount), 0);
  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  const filteredCosts = useMemo(() => {
    const list = filter === 'all' ? [...fixedCosts] : fixedCosts.filter(f => getFixedCostStatus(f) === filter);
    return list.sort((a, b) => {
      const getSort = (item: FixedCost) => {
        const next = (item as any).next_payment_date;
        if (next) return new Date(next + 'T12:00:00').getTime();
        const day = (item as any).due_day;
        if (day) {
          const now = new Date();
          return new Date(now.getFullYear(), now.getMonth(), day).getTime();
        }
        return Infinity;
      };
      return getSort(a) - getSort(b);
    });
  }, [fixedCosts, filter]);

  const counts = useMemo(() => ({
    all: fixedCosts.length,
    paid: fixedCosts.filter(f => getFixedCostStatus(f) === 'paid').length,
    pending: fixedCosts.filter(f => getFixedCostStatus(f) === 'pending').length,
    overdue: fixedCosts.filter(f => getFixedCostStatus(f) === 'overdue').length,
  }), [fixedCosts]);

  const FILTERS: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'paid', label: 'Pagos' },
    { key: 'pending', label: 'Pendentes' },
    { key: 'overdue', label: 'Atrasados' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold text-foreground">Custos Fixos</h1>
          <p className="text-sm text-muted-foreground">Total mensal: R$ {fmt(total)}</p>
        </div>
        <Button size="sm" onClick={openNew} className="shrink-0"><Plus className="w-4 h-4 mr-1" /> Novo</Button>
      </div>

      {/* Status filter */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 overflow-x-auto">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              filter === key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label} {counts[key] > 0 && <span className="ml-1 opacity-70">({counts[key]})</span>}
          </button>
        ))}
      </div>

      {filteredCosts.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">
          {filter === 'all' ? 'Nenhum custo fixo cadastrado' : `Nenhum custo fixo ${filter === 'paid' ? 'pago' : filter === 'pending' ? 'pendente' : 'atrasado'}`}
        </CardContent></Card>
      ) : (
        <div className="space-y-2">
          {filteredCosts.map((f) => {
            const status = getFixedCostStatus(f);
            const nextDate = (f as any).next_payment_date;
            const borderClass = status === 'overdue'
              ? 'border-red-500/40 bg-red-950/10'
              : status === 'paid'
                ? 'border-emerald-500/20'
                : '';
            return (
              <Card key={f.id} className={borderClass}>
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      status === 'overdue' ? 'bg-red-500/20' : status === 'paid' ? 'bg-emerald-500/20' : 'bg-orange-500/20'
                    }`}>
                      {status === 'overdue' ? <AlertTriangle className="w-4 h-4 text-red-400" /> :
                       status === 'paid' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> :
                       <Landmark className="w-4 h-4 text-orange-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{f.name}</p>
                      <p className={`text-xs truncate ${status === 'overdue' ? 'text-red-400' : 'text-muted-foreground'}`}>
                        {f.category}{f.due_day ? ` · Venc. dia ${f.due_day}` : ''}
                      </p>
                    </div>
                    <p className={`text-sm font-bold whitespace-nowrap ${status === 'overdue' ? 'text-red-400' : 'text-foreground'}`}>
                      R$ {fmt(Number(f.amount))}
                    </p>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(f)} className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(f.id)} className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>

                  {/* Status & date indicators */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {nextDate && (
                      <div className={`text-xs px-2 py-1 rounded-md inline-flex items-center gap-1 ${
                        status === 'overdue' ? 'bg-red-500/10 text-red-400' : 'bg-muted text-muted-foreground'
                      }`}>
                        📅 Próx: {format(new Date(nextDate + 'T12:00:00'), 'dd/MM/yyyy')}
                      </div>
                    )}
                    {status === 'paid' && (
                      <div className="text-xs px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 inline-block">
                        ✓ Pago este mês
                      </div>
                    )}
                    {status === 'overdue' && (
                      <div className="text-xs px-2 py-1 rounded-md bg-red-500/10 text-red-400 inline-block">
                        ⚠ Atrasado
                      </div>
                    )}
                    {status === 'pending' && (
                      <div className="text-xs px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 inline-block">
                        Pendente
                      </div>
                    )}
                  </div>

                  {/* Pay button */}
                  {f.is_active && status !== 'paid' && (
                    <Button size="sm" variant="outline" onClick={() => handlePay(f)}
                      className={`text-xs ${status === 'overdue' ? 'border-red-500/50 text-red-400 hover:bg-red-500/10' : ''}`}>
                      Pagar {f.name}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editItem ? 'Editar Custo Fixo' : 'Novo Custo Fixo'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nome (ex: Aluguel)" value={name} onChange={(e) => setName(e.target.value)} />
            <Input type="text" inputMode="decimal" placeholder="Valor (R$)" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Data do próximo pagamento</Label>
              <Input type="date" value={nextPaymentDate} onChange={(e) => setNextPaymentDate(e.target.value)} />
              <p className="text-xs text-muted-foreground">Ao pagar, a data avança automaticamente 1 mês</p>
            </div>
            <Input type="number" placeholder="Dia de vencimento fixo (1-31) — opcional" min="1" max="31" value={dueDay} onChange={(e) => setDueDay(e.target.value)} />
            <CategorySelect value={category} onChange={setCategory} allCategories={cats.allCategories} customCategories={cats.customCategories} onAddCategory={cats.addCategory} onRemoveCategory={cats.removeCategory} />
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? 'Salvando...' : editItem ? 'Atualizar' : 'Salvar'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
