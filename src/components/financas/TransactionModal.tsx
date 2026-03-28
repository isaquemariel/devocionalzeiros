import { useState, useEffect, useContext } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useFinanceStore, TransactionType, Transaction } from '@/store/financeStore';
import { useToast } from '@/hooks/use-toast';
import { CategorySelect } from '@/components/financas/CategorySelect';
import { CategoriesCtx } from '@/pages/Financas';

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  defaultType?: TransactionType;
  editTransaction?: Transaction | null;
}

export function TransactionModal({ open, onClose, userId, defaultType = 'expense', editTransaction }: TransactionModalProps) {
  const [type, setType] = useState<TransactionType>(defaultType);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('outros');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [saving, setSaving] = useState(false);
  const { addTransaction, updateTransaction } = useFinanceStore();
  const { toast } = useToast();
  const cats = useContext(CategoriesCtx);

  useEffect(() => {
    if (editTransaction) {
      setType(editTransaction.type);
      setAmount(String(editTransaction.amount));
      setDescription(editTransaction.description);
      setCategory(editTransaction.category);
      setDate(editTransaction.date);
    } else {
      setType(defaultType);
    }
  }, [editTransaction, defaultType]);

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
        toast({ title: type === 'income' ? 'Entrada registrada!' : 'Saída registrada!' });
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
    onClose();
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
            <Button variant={type === 'income' ? 'default' : 'outline'} size="sm" onClick={() => setType('income')} className={type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}>
              + Entrada
            </Button>
            <Button variant={type === 'expense' ? 'default' : 'outline'} size="sm" onClick={() => setType('expense')} className={type === 'expense' ? 'bg-red-600 hover:bg-red-700' : ''}>
              - Saída
            </Button>
          </div>

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
