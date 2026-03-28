import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useFinanceStore, CATEGORIES, TransactionType } from '@/store/financeStore';
import { useToast } from '@/hooks/use-toast';

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  defaultType?: TransactionType;
}

export function TransactionModal({ open, onClose, userId, defaultType = 'expense' }: TransactionModalProps) {
  const [type, setType] = useState<TransactionType>(defaultType);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('outros');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [saving, setSaving] = useState(false);
  const { addTransaction } = useFinanceStore();
  const { toast } = useToast();

  const handleSave = async () => {
    const numAmount = parseFloat(amount.replace(',', '.'));
    if (!numAmount || !description.trim()) {
      toast({ title: 'Preencha todos os campos', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const { data, error } = await supabase.from('financial_transactions' as any).insert({
      user_id: userId,
      type,
      amount: numAmount,
      description: description.trim(),
      category,
      date,
    }).select().single();

    if (error) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
    } else if (data) {
      addTransaction(data as any);
      toast({ title: type === 'income' ? 'Entrada registrada!' : 'Saída registrada!' });
      resetAndClose();
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {type === 'income' ? '+ Nova Entrada' : '- Nova Saída'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Type toggle */}
          <div className="flex gap-2">
            <Button
              variant={type === 'income' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType('income')}
              className={type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              + Entrada
            </Button>
            <Button
              variant={type === 'expense' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType('expense')}
              className={type === 'expense' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              - Saída
            </Button>
          </div>

          <Input
            type="text"
            inputMode="decimal"
            placeholder="Valor (R$)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
