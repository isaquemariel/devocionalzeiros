import { useState, useContext, useMemo } from 'react';
import { useFinanceStore, Installment } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Trash2, Plus, CalendarClock, Pencil, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CategorySelect } from '@/components/financas/CategorySelect';
import { CategoriesCtx } from '@/pages/Financas';

interface Props { userId: string; }

type StatusFilter = 'all' | 'active' | 'completed' | 'overdue';

function getInstallmentStatus(inst: Installment): 'completed' | 'overdue' | 'active' {
  if (inst.paid_installments >= inst.total_installments || !inst.is_active) return 'completed';
  if ((inst as any).due_day) {
    const today = new Date();
    const dueThisMonth = new Date(today.getFullYear(), today.getMonth(), (inst as any).due_day);
    // If due date passed this month and not all paid yet
    if (today > dueThisMonth && inst.paid_installments < inst.total_installments) {
      // Check if they should have paid more based on months elapsed
      const startDate = new Date(inst.start_date);
      const monthsElapsed = (today.getFullYear() - startDate.getFullYear()) * 12 + (today.getMonth() - startDate.getMonth());
      const expectedPaid = Math.min(monthsElapsed + (today.getDate() >= (inst as any).due_day ? 1 : 0), inst.total_installments);
      if (inst.paid_installments < expectedPaid) return 'overdue';
    }
  }
  return 'active';
}

export function InstallmentsSection({ userId }: Props) {
  const { installments, addInstallment, removeInstallment, updateInstallment } = useFinanceStore();
  const { toast } = useToast();
  const cats = useContext(CategoriesCtx);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<Installment | null>(null);
  const [desc, setDesc] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [totalInst, setTotalInst] = useState('');
  const [paidInst, setPaidInst] = useState('');
  const [dueDay, setDueDay] = useState('');
  const [category, setCategory] = useState('outros');
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<StatusFilter>('all');

  const openEdit = (i: Installment) => {
    setEditItem(i);
    setDesc(i.description);
    setTotalAmount(String(i.total_amount));
    setTotalInst(String(i.total_installments));
    setPaidInst(String(i.paid_installments));
    setDueDay((i as any).due_day ? String((i as any).due_day) : '');
    setCategory(i.category);
    setShowAdd(true);
  };

  const openNew = () => {
    setEditItem(null);
    setDesc(''); setTotalAmount(''); setTotalInst(''); setPaidInst('0'); setDueDay(''); setCategory('outros');
    setShowAdd(true);
  };

  const handleSave = async () => {
    const total = parseFloat(totalAmount.replace(',', '.'));
    const count = parseInt(totalInst);
    const paid = parseInt(paidInst) || 0;
    const dueDayNum = parseInt(dueDay) || null;
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
      };
      const { data, error } = await supabase.from('financial_installments' as any).update(payload).eq('id', editItem.id).select().single();
      if (data) { updateInstallment(data as any); toast({ title: 'Parcela atualizada!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', variant: 'destructive' });
    } else {
      const { data, error } = await supabase.from('financial_installments' as any).insert({
        user_id: userId, description: desc.trim(), total_amount: total,
        installment_amount: Math.ceil((total / count) * 100) / 100, total_installments: count,
        paid_installments: clampedPaid, is_active: isActive, category, due_day: dueDayNum,
      }).select().single();
      if (data) { addInstallment(data as any); toast({ title: 'Parcela adicionada!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', variant: 'destructive' });
    }
    setSaving(false);
  };

  const handlePay = async (inst: any) => {
    const newPaid = inst.paid_installments + 1;
    const isActive = newPaid < inst.total_installments;
    await supabase.from('financial_installments' as any).update({ paid_installments: newPaid, is_active: isActive }).eq('id', inst.id);
    updateInstallment({ ...inst, paid_installments: newPaid, is_active: isActive });
    toast({ title: `Parcela ${newPaid}/${inst.total_installments} paga!` });
  };

  const handleDelete = async (id: string) => {
    await supabase.from('financial_installments' as any).delete().eq('id', id);
    removeInstallment(id);
  };

  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  const filteredInstallments = useMemo(() => {
    if (filter === 'all') return installments;
    return installments.filter(i => getInstallmentStatus(i) === filter);
  }, [installments, filter]);

  const counts = useMemo(() => ({
    all: installments.length,
    active: installments.filter(i => getInstallmentStatus(i) === 'active').length,
    completed: installments.filter(i => getInstallmentStatus(i) === 'completed').length,
    overdue: installments.filter(i => getInstallmentStatus(i) === 'overdue').length,
  }), [installments]);

  const FILTERS: { key: StatusFilter; label: string; icon: any; color: string }[] = [
    { key: 'all', label: 'Todas', icon: CalendarClock, color: 'text-foreground' },
    { key: 'active', label: 'Ativas', icon: Clock, color: 'text-blue-400' },
    { key: 'overdue', label: 'Atrasadas', icon: AlertTriangle, color: 'text-red-400' },
    { key: 'completed', label: 'Finalizadas', icon: CheckCircle2, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Parcelas</h1>
        <Button size="sm" onClick={openNew} className="shrink-0"><Plus className="w-4 h-4 mr-1" /> Nova</Button>
      </div>

      {/* Status filter */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 overflow-x-auto">
        {FILTERS.map(({ key, label, color }) => (
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
            const borderClass = status === 'overdue' ? 'border-red-500/30' : status === 'completed' ? 'border-emerald-500/30 opacity-70' : '';
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
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {inst.paid_installments}/{inst.total_installments} pagas · R$ {fmt(Number(inst.installment_amount))}/parcela
                        {(inst as any).due_day && ` · Venc. dia ${(inst as any).due_day}`}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-foreground whitespace-nowrap">R$ {fmt(Number(inst.total_amount))}</p>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(inst)} className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(inst.id)} className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>
                  <Progress value={(inst.paid_installments / inst.total_installments) * 100} className="h-2" />
                  {inst.is_active && inst.paid_installments < inst.total_installments && (
                    <Button size="sm" variant="outline" onClick={() => handlePay(inst)} className="text-xs">
                      Pagar parcela {inst.paid_installments + 1}
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
            <Input type="number" placeholder="Dia de vencimento (1-31)" value={dueDay} onChange={(e) => setDueDay(e.target.value)} min={1} max={31} />
            <CategorySelect value={category} onChange={setCategory} allCategories={cats.allCategories} customCategories={cats.customCategories} onAddCategory={cats.addCategory} onRemoveCategory={cats.removeCategory} />
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? 'Salvando...' : editItem ? 'Atualizar' : 'Salvar'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
