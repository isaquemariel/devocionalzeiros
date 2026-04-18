import { useState, useContext, useMemo } from 'react';
import { useFinanceStore, Installment } from '@/store/financeStore';
import { RefetchCtx } from '@/pages/Financas';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Trash2, Plus, CalendarClock, Pencil, AlertTriangle, CheckCircle2, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CategorySelect } from '@/components/financas/CategorySelect';
import { CategoriesCtx, FinanceGuardCtx } from '@/pages/Financas';
import { format, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getInstallmentStatus, isInstallmentPaidInMonth } from '@/lib/installmentStatus';
import { moveToTrash } from '@/lib/financeTrash';
import { ConfirmDeleteDialog } from '@/components/financas/ConfirmDeleteDialog';

interface Props { userId: string; }

type StatusFilter = 'all' | 'active' | 'completed' | 'overdue';

function getRemainingAmount(inst: Installment): number {
  const settlement = (inst as any).settlement_amount;
  if (settlement && Number(settlement) > 0) return Number(settlement);
  return Number(inst.installment_amount) * (inst.total_installments - inst.paid_installments);
}

function formatNextDate(inst: Installment): string | null {
  const nextDate = (inst as any).next_payment_date;
  if (nextDate) {
    return format(new Date(nextDate + 'T12:00:00'), 'dd/MM/yyyy');
  }
  return null;
}

export function InstallmentsSection({ userId }: Props) {
  const { installments, addInstallment, removeInstallment, updateInstallment, addTransaction } = useFinanceStore();
  const { toast } = useToast();
  const cats = useContext(CategoriesCtx);
  const { guardAction } = useContext(FinanceGuardCtx);
  const refetch = useContext(RefetchCtx);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<Installment | null>(null);
  const [desc, setDesc] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [totalInst, setTotalInst] = useState('');
  const [paidInst, setPaidInst] = useState('');
  const [dueDay, setDueDay] = useState('');
  const [category, setCategory] = useState('outros');
  const [settlementAmount, setSettlementAmount] = useState('');
  const [nextPaymentDate, setNextPaymentDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [confirmDelete, setConfirmDelete] = useState<Installment | null>(null);

  const openEdit = (i: Installment) => guardAction(() => {
    setEditItem(i);
    setDesc(i.description);
    setTotalAmount(String(i.total_amount));
    setTotalInst(String(i.total_installments));
    setPaidInst(String(i.paid_installments));
    setDueDay((i as any).due_day ? String((i as any).due_day) : '');
    setSettlementAmount((i as any).settlement_amount ? String((i as any).settlement_amount) : '');
    setNextPaymentDate((i as any).next_payment_date || '');
    setCategory(i.category);
    setShowAdd(true);
  });

  const openNew = () => guardAction(() => {
    setEditItem(null);
    setDesc(''); setTotalAmount(''); setTotalInst(''); setPaidInst('0'); setDueDay(''); setCategory('outros'); setSettlementAmount(''); setNextPaymentDate('');
    setShowAdd(true);
  });

  const handleSave = async () => {
    const total = parseFloat(totalAmount.replace(',', '.'));
    const count = parseInt(totalInst);
    const paid = parseInt(paidInst) || 0;
    const dueDayNum = parseInt(dueDay) || null;
    const settlement = settlementAmount ? parseFloat(settlementAmount.replace(',', '.')) : null;
    const nextDate = nextPaymentDate || null;
    if (!total || !count || !desc.trim()) return;
    if (dueDayNum && (dueDayNum < 1 || dueDayNum > 31)) {
      toast({ title: 'Dia de vencimento deve ser entre 1 e 31', variant: 'destructive' });
      return;
    }
    const clampedPaid = Math.max(0, Math.min(paid, count));
    const isActive = clampedPaid < count;
    setSaving(true);
    if (editItem) {
      const payload = {
        description: desc.trim(),
        total_amount: total,
        installment_amount: Math.ceil((total / count) * 100) / 100,
        total_installments: count,
        paid_installments: clampedPaid,
        is_active: isActive,
        category,
        due_day: dueDayNum,
        settlement_amount: settlement,
        next_payment_date: nextDate,
      };
      const { data, error } = await supabase.from('financial_installments' as any).update(payload).eq('id', editItem.id).select().single();
      if (data) { updateInstallment(data as any); toast({ title: 'Parcela atualizada!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', variant: 'destructive' });
    } else {
      const { data, error } = await supabase.from('financial_installments' as any).insert({
        user_id: userId, description: desc.trim(), total_amount: total,
        installment_amount: Math.ceil((total / count) * 100) / 100, total_installments: count,
        paid_installments: clampedPaid, is_active: isActive, category, due_day: dueDayNum,
        settlement_amount: settlement, next_payment_date: nextDate,
      }).select().single();
      if (data) { addInstallment(data as any); toast({ title: 'Parcela adicionada!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', variant: 'destructive' });
    }
    setSaving(false);
  };

  const handlePay = async (inst: any) => guardAction(async () => {
    const newPaid = inst.paid_installments + 1;
    const isActive = newPaid < inst.total_installments;
    const today = new Date().toISOString().split('T')[0];
    let newNextDate = inst.next_payment_date;
    if (newNextDate && isActive) {
      const current = new Date(newNextDate + 'T12:00:00');
      const next = addMonths(current, 1);
      newNextDate = format(next, 'yyyy-MM-dd');
    } else if (!isActive) {
      newNextDate = null;
    }
    // Update installment
    await supabase.from('financial_installments' as any).update({
      paid_installments: newPaid, is_active: isActive, last_paid_date: today, next_payment_date: newNextDate,
    }).eq('id', inst.id);
    updateInstallment({ ...inst, paid_installments: newPaid, is_active: isActive, last_paid_date: today, next_payment_date: newNextDate });

    // Create expense transaction
    const { data: txData } = await supabase.from('financial_transactions').insert({
      user_id: userId,
      type: 'expense',
      amount: Number(inst.installment_amount),
      description: `${inst.description} (parcela ${newPaid}/${inst.total_installments})`,
      category: inst.category || 'outros',
      date: today,
      is_recurring: false,
    }).select().single();
    if (txData) addTransaction(txData as any);

    toast({ title: `Parcela ${newPaid}/${inst.total_installments} paga!${newNextDate ? ` Próx: ${format(new Date(newNextDate + 'T12:00:00'), 'dd/MM/yyyy')}` : ''}` });
  });

  const handleSettle = async (inst: any) => guardAction(async () => {
    const today = new Date().toISOString().split('T')[0];
    const settleValue = getRemainingAmount(inst);
    await supabase.from('financial_installments' as any).update({
      paid_installments: inst.total_installments,
      is_active: false,
      last_paid_date: today,
      next_payment_date: null,
    }).eq('id', inst.id);
    updateInstallment({ ...inst, paid_installments: inst.total_installments, is_active: false, last_paid_date: today, next_payment_date: null });

    // Create expense transaction for settlement
    const { data: txData } = await supabase.from('financial_transactions').insert({
      user_id: userId,
      type: 'expense',
      amount: settleValue,
      description: `${inst.description} (quitação)`,
      category: inst.category || 'outros',
      date: today,
      is_recurring: false,
    }).select().single();
    if (txData) addTransaction(txData as any);

    toast({ title: `${inst.description} quitada com sucesso! ✅` });
  });

  const handleDelete = async (inst: Installment) => {
    const { error } = await moveToTrash(userId, 'installment', inst);
    if (!error) {
      removeInstallment(inst.id);
      toast({ title: 'Movido para a Lixeira' });
    } else {
      toast({ title: 'Erro ao excluir', variant: 'destructive' });
    }
  };

  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  const filteredInstallments = useMemo(() => {
    const list = filter === 'all' ? [...installments] : installments.filter(i => getInstallmentStatus(i) === filter);
    return list.sort((a, b) => {
      const getSort = (inst: Installment) => {
        const next = (inst as any).next_payment_date;
        if (next) return new Date(next + 'T12:00:00').getTime();
        const day = (inst as any).due_day;
        if (day) {
          const now = new Date();
          return new Date(now.getFullYear(), now.getMonth(), day).getTime();
        }
        return Infinity;
      };
      return getSort(a) - getSort(b);
    });
  }, [installments, filter]);

  const counts = useMemo(() => ({
    all: installments.length,
    active: installments.filter(i => getInstallmentStatus(i) === 'active').length,
    completed: installments.filter(i => getInstallmentStatus(i) === 'completed').length,
    overdue: installments.filter(i => getInstallmentStatus(i) === 'overdue').length,
  }), [installments]);

  const FILTERS: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: 'Todas' },
    { key: 'active', label: 'Ativas' },
    { key: 'overdue', label: 'Atrasadas' },
    { key: 'completed', label: 'Finalizadas' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Parcelados</h1>
        <Button size="sm" onClick={openNew} className="shrink-0"><Plus className="w-4 h-4 mr-1" /> Nova</Button>
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

      {filteredInstallments.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">
          {filter === 'all' ? 'Nenhuma parcela cadastrada' : `Nenhuma parcela ${filter === 'active' ? 'ativa' : filter === 'completed' ? 'finalizada' : 'atrasada'}`}
        </CardContent></Card>
      ) : (
        <div className="space-y-2">
          {filteredInstallments.map((inst) => {
            const status = getInstallmentStatus(inst);
            const paidThisMonth = isInstallmentPaidInMonth(inst);
            const remaining = getRemainingAmount(inst);
            const hasSettlement = (inst as any).settlement_amount && Number((inst as any).settlement_amount) > 0;
            const nextDateStr = formatNextDate(inst);
            const borderClass = status === 'overdue' 
              ? 'border-red-500/40 bg-red-950/10' 
              : status === 'completed' 
                ? 'border-emerald-500/30 opacity-70' 
                : paidThisMonth 
                  ? 'border-emerald-500/20' 
                  : '';
            return (
              <Card key={inst.id} className={borderClass}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <CalendarClock className={`w-4 h-4 shrink-0 ${status === 'overdue' ? 'text-red-400' : status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-medium text-foreground truncate">{inst.description}</p>
                        {status === 'overdue' && <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                        {status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        {paidThisMonth && status === 'active' && <span className="shrink-0" aria-label="Pago este mês"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /></span>}
                      </div>
                      <p className={`text-xs truncate ${status === 'overdue' ? 'text-red-400' : 'text-muted-foreground'}`}>
                        {inst.paid_installments}/{inst.total_installments} pagas · R$ {fmt(Number(inst.installment_amount))}/parcela
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground whitespace-nowrap">R$ {fmt(Number(inst.total_amount))}</p>
                      <p className={`text-xs font-medium whitespace-nowrap ${status === 'overdue' ? 'text-red-400' : 'text-amber-400'}`}>
                        {hasSettlement && <DollarSign className="w-3 h-3 inline" />}
                        Falta: R$ {fmt(remaining)}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(inst)} className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => guardAction(() => setConfirmDelete(inst))} className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>

                  {/* Payment date & status indicator */}
                  {status !== 'completed' && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {nextDateStr && (
                        <div className={`text-xs px-2 py-1 rounded-md inline-flex items-center gap-1 ${
                          status === 'overdue'
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          📅 Próx: {nextDateStr}
                        </div>
                      )}
                      {(inst as any).due_day && !nextDateStr && (
                        <div className={`text-xs px-2 py-1 rounded-md inline-block ${
                          status === 'overdue' ? 'bg-red-500/10 text-red-400' : 'bg-muted text-muted-foreground'
                        }`}>
                          Venc. dia {(inst as any).due_day}
                        </div>
                      )}
                      {paidThisMonth && (
                        <div className="text-xs px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 inline-block">
                          ✓ Pago este mês
                        </div>
                      )}
                      {status === 'overdue' && !paidThisMonth && (
                        <div className="text-xs px-2 py-1 rounded-md bg-red-500/10 text-red-400 inline-block">
                          ⚠ Atrasado
                        </div>
                      )}
                    </div>
                  )}

                  <Progress value={(inst.paid_installments / inst.total_installments) * 100} className="h-2" />
                  {inst.is_active && inst.paid_installments < inst.total_installments && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button size="sm" onClick={() => handlePay(inst)} className={`text-xs ${status === 'overdue' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}>
                        {paidThisMonth ? 'Adiantar próxima parcela' : `Pagar parcela ${inst.paid_installments + 1}`}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleSettle(inst)} className="text-xs">
                        Quitar (R$ {fmt(remaining)})
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editItem ? 'Editar Parcela' : 'Nova Parcela'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Descrição" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Input type="text" inputMode="decimal" placeholder="Valor total (R$)" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" placeholder="Nº de parcelas" value={totalInst} onChange={(e) => setTotalInst(e.target.value)} />
              <Input type="number" placeholder="Parcelas pagas" value={paidInst} onChange={(e) => setPaidInst(e.target.value)} min={0} max={parseInt(totalInst) || 999} />
            </div>
            {totalInst && paidInst !== undefined && (
              <p className="text-xs text-muted-foreground">
                {Math.max(0, (parseInt(totalInst) || 0) - (parseInt(paidInst) || 0))} parcelas restantes
              </p>
            )}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Data do próximo pagamento</Label>
              <Input type="date" value={nextPaymentDate} onChange={(e) => setNextPaymentDate(e.target.value)} />
              <p className="text-xs text-muted-foreground">Ao pagar, a data avança automaticamente 1 mês</p>
            </div>
            <Input type="number" placeholder="Dia de vencimento fixo (1-31) — opcional" value={dueDay} onChange={(e) => setDueDay(e.target.value)} min={1} max={31} />
            <div className="space-y-1">
              <Input type="text" inputMode="decimal" placeholder="Valor de quitação antecipada (R$)" value={settlementAmount} onChange={(e) => setSettlementAmount(e.target.value)} />
              <p className="text-xs text-muted-foreground">Opcional — valor para quitar de uma vez (ex: empréstimo)</p>
            </div>
            <CategorySelect value={category} onChange={setCategory} allCategories={cats.allCategories} customCategories={cats.customCategories} onAddCategory={cats.addCategory} onRemoveCategory={cats.removeCategory} />
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? 'Salvando...' : editItem ? 'Atualizar' : 'Salvar'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
