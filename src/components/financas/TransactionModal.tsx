import { useState, useEffect, useContext, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useFinanceStore, TransactionType, Transaction } from '@/store/financeStore';
import { useToast } from '@/hooks/use-toast';
import { CategorySelect } from '@/components/financas/CategorySelect';
import { CategoriesCtx } from '@/pages/Financas';
import { CreditCard, Landmark, RefreshCw, CalendarClock } from 'lucide-react';
import { format, addMonths } from 'date-fns';

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  defaultType?: TransactionType;
  editTransaction?: Transaction | null;
}

type QuickPickItem = {
  label: string;
  description: string;
  amount: number;
  category: string;
  icon: 'subscription' | 'fixed' | 'installment' | 'recurring';
  installmentId?: string;
};

export function TransactionModal({ open, onClose, userId, defaultType = 'expense', editTransaction }: TransactionModalProps) {
  const [type, setType] = useState<TransactionType>(defaultType);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('outros');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [saving, setSaving] = useState(false);
  const [showQuickPick, setShowQuickPick] = useState(false);
  const [selectedInstallmentId, setSelectedInstallmentId] = useState<string | null>(null);
  const { addTransaction, updateTransaction, subscriptions, fixedCosts, installments, recurring, updateInstallment } = useFinanceStore();
  const { toast } = useToast();
  const cats = useContext(CategoriesCtx);

  useEffect(() => {
    if (editTransaction) {
      setType(editTransaction.type);
      setAmount(String(editTransaction.amount));
      setDescription(editTransaction.description);
      setCategory(editTransaction.category);
      setDate(editTransaction.date);
      setSelectedInstallmentId(null);
    } else {
      setType(defaultType);
      setSelectedInstallmentId(null);
    }
  }, [editTransaction, defaultType]);

  const quickPickItems = useMemo(() => {
    const items: QuickPickItem[] = [];
    subscriptions.filter(s => s.is_active).forEach(s => items.push({ label: s.name, description: `Assinatura · ${s.billing_cycle}`, amount: Number(s.amount), category: s.category, icon: 'subscription' }));
    fixedCosts.filter(f => f.is_active).forEach(f => items.push({ label: f.name, description: 'Custo fixo', amount: Number(f.amount), category: f.category, icon: 'fixed' }));
    installments.filter(i => i.is_active && i.paid_installments < i.total_installments).forEach(i => items.push({ label: i.description, description: `Parcela ${i.paid_installments + 1}/${i.total_installments}`, amount: Number(i.installment_amount), category: i.category, icon: 'installment', installmentId: i.id }));
    recurring.filter(r => r.is_active && r.type === 'expense').forEach(r => items.push({ label: r.description, description: `Recorrente · ${r.frequency}`, amount: Number(r.amount), category: r.category, icon: 'recurring' }));
    return items;
  }, [subscriptions, fixedCosts, installments, recurring]);

  const selectQuickPick = (item: QuickPickItem) => {
    setType('expense');
    setAmount(String(item.amount));
    setDescription(item.label);
    setCategory(item.category);
    setSelectedInstallmentId(item.installmentId || null);
    setShowQuickPick(false);
  };

  const payInstallment = async (instId: string) => {
    const inst = installments.find(i => i.id === instId);
    if (!inst) return;
    
    const newPaid = inst.paid_installments + 1;
    const isActive = newPaid < inst.total_installments;
    const today = new Date().toISOString().split('T')[0];
    let newNextDate = (inst as any).next_payment_date;
    if (newNextDate && isActive) {
      const current = new Date(newNextDate + 'T12:00:00');
      const next = addMonths(current, 1);
      newNextDate = format(next, 'yyyy-MM-dd');
    } else if (!isActive) {
      newNextDate = null;
    }
    await supabase.from('financial_installments' as any).update({
      paid_installments: newPaid, is_active: isActive, last_paid_date: today, next_payment_date: newNextDate,
    }).eq('id', instId);
    updateInstallment({ ...inst, paid_installments: newPaid, is_active: isActive, last_paid_date: today, next_payment_date: newNextDate } as any);
  };

  const handleSave = async () => {
    const numAmount = parseFloat(amount.replace(',', '.'));
    if (!numAmount || !description.trim()) {
      toast({ title: 'Preencha todos os campos', variant: 'destructive' });
      return;
    }
    setSaving(true);

    if (editTransaction) {
      const { data, error } = await supabase.from('financial_transactions' as any)
        .update({ type, amount: numAmount, description: description.trim(), category, date })
        .eq('id', editTransaction.id)
        .select().single();
      if (error) {
        toast({ title: 'Erro ao atualizar', description: error.message, variant: 'destructive' });
      } else if (data) {
        updateTransaction(data as any);
        toast({ title: 'Transação atualizada!' });
        resetAndClose();
      }
    } else {
      const { data, error } = await supabase.from('financial_transactions' as any).insert({
        user_id: userId, type, amount: numAmount, description: description.trim(), category, date,
      }).select().single();
      if (error) {
        toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
      } else if (data) {
        addTransaction(data as any);
        
        // If an installment was selected, automatically pay it
        if (selectedInstallmentId) {
          await payInstallment(selectedInstallmentId);
          const inst = installments.find(i => i.id === selectedInstallmentId);
          if (inst) {
            const newPaid = inst.paid_installments + 1;
            toast({ title: `Saída registrada e parcela ${newPaid}/${inst.total_installments} marcada como paga! ✅` });
          }
        } else {
          toast({ title: type === 'income' ? 'Entrada registrada!' : 'Saída registrada!' });
        }
        resetAndClose();
      }
    }
    setSaving(false);
  };

  const resetAndClose = () => {
    setAmount('');
    setDescription('');
    setCategory('outros');
    setDate(new Date().toISOString().split('T')[0]);
    setShowQuickPick(false);
    setSelectedInstallmentId(null);
    onClose();
  };

  const IconMap = {
    subscription: CreditCard,
    fixed: Landmark,
    installment: CalendarClock,
    recurring: RefreshCw,
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && resetAndClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {editTransaction ? 'Editar Transação' : type === 'income' ? '+ Nova Entrada' : '- Nova Saída'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button variant={type === 'income' ? 'default' : 'outline'} size="sm" onClick={() => { setType('income'); setSelectedInstallmentId(null); }} className={type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}>
              + Entrada
            </Button>
            <Button variant={type === 'expense' ? 'default' : 'outline'} size="sm" onClick={() => setType('expense')} className={type === 'expense' ? 'bg-red-600 hover:bg-red-700' : ''}>
              - Saída
            </Button>
          </div>

          {/* Quick pick from existing commitments */}
          {!editTransaction && type === 'expense' && quickPickItems.length > 0 && (
            <div className="space-y-1.5">
              <button
                onClick={() => setShowQuickPick(!showQuickPick)}
                className="text-xs text-primary font-medium hover:underline"
              >
                {showQuickPick ? '▼ Ocultar pagamentos existentes' : '▶ Selecionar de pagamento existente'}
              </button>
              {showQuickPick && (
                <div className="max-h-40 overflow-y-auto space-y-1 border border-border rounded-lg p-2 bg-muted/30">
                  {quickPickItems.map((item, idx) => {
                    const Icon = IconMap[item.icon];
                    return (
                      <button
                        key={idx}
                        onClick={() => selectQuickPick(item)}
                        className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors text-left"
                      >
                        <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{item.label}</p>
                          <p className="text-[10px] text-muted-foreground">{item.description}</p>
                        </div>
                        <span className="text-xs font-bold text-foreground whitespace-nowrap">
                          R$ {Number(item.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {selectedInstallmentId && (
            <div className="text-xs text-emerald-400 bg-emerald-500/10 rounded-md px-3 py-2">
              ✅ Ao salvar, a parcela será automaticamente marcada como paga
            </div>
          )}

          <Input type="text" inputMode="decimal" placeholder="Valor (R$)" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Input placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
          <CategorySelect
            value={category}
            onChange={setCategory}
            allCategories={cats.allCategories}
            customCategories={cats.customCategories}
            onAddCategory={cats.addCategory}
            onRemoveCategory={cats.removeCategory}
          />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? 'Salvando...' : editTransaction ? 'Atualizar' : 'Salvar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
