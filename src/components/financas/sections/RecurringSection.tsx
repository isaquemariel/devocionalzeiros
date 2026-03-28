import { useState } from 'react';
import { useFinanceStore, CATEGORIES } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Plus, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Props { userId: string; }

export function RecurringSection({ userId }: Props) {
  const { recurring, addRecurring, removeRecurring } = useFinanceStore();
  const { toast } = useToast();
  const [showAdd, setShowAdd] = useState(false);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('monthly');
  const [category, setCategory] = useState('outros');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const num = parseFloat(amount.replace(',', '.'));
    if (!num || !desc.trim()) return;
    setSaving(true);
    const { data, error } = await supabase.from('financial_recurring' as any).insert({
      user_id: userId, type, description: desc.trim(), amount: num, frequency, category,
    }).select().single();
    if (data) { addRecurring(data as any); toast({ title: 'Recorrência adicionada!' }); setShowAdd(false); setDesc(''); setAmount(''); }
    if (error) toast({ title: 'Erro', variant: 'destructive' });
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('financial_recurring' as any).delete().eq('id', id);
    removeRecurring(id);
  };

  const freqLabel = (f: string) => ({ daily: 'Diário', weekly: 'Semanal', monthly: 'Mensal', yearly: 'Anual' }[f] || f);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Recorrentes</h1>
        <Button size="sm" onClick={() => setShowAdd(true)}><Plus className="w-4 h-4 mr-1" /> Novo</Button>
      </div>

      {recurring.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhum lançamento recorrente</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {recurring.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${r.type === 'income' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                  <RefreshCw className={`w-4 h-4 ${r.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{r.description}</p>
                  <p className="text-xs text-muted-foreground">{r.category} · {freqLabel(r.frequency)}</p>
                </div>
                <p className={`text-sm font-bold ${r.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                  R$ {Number(r.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)} className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Nova Recorrência</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button variant={type === 'income' ? 'default' : 'outline'} size="sm" onClick={() => setType('income')} className={type === 'income' ? 'bg-emerald-600' : ''}>Entrada</Button>
              <Button variant={type === 'expense' ? 'default' : 'outline'} size="sm" onClick={() => setType('expense')} className={type === 'expense' ? 'bg-red-600' : ''}>Saída</Button>
            </div>
            <Input placeholder="Descrição" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Input type="text" inputMode="decimal" placeholder="Valor (R$)" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="daily">Diário</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
              <option value="yearly">Anual</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? 'Salvando...' : 'Salvar'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
