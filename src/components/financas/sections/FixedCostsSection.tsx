import { useState } from 'react';
import { useFinanceStore, CATEGORIES } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Plus, Landmark } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Props { userId: string; }

export function FixedCostsSection({ userId }: Props) {
  const { fixedCosts, addFixedCost, removeFixedCost } = useFinanceStore();
  const { toast } = useToast();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDay, setDueDay] = useState('');
  const [category, setCategory] = useState('outros');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const num = parseFloat(amount.replace(',', '.'));
    if (!num || !name.trim()) return;
    setSaving(true);
    const { data, error } = await supabase.from('financial_fixed_costs' as any).insert({
      user_id: userId, name: name.trim(), amount: num,
      due_day: dueDay ? parseInt(dueDay) : null, category,
    }).select().single();
    if (data) { addFixedCost(data as any); toast({ title: 'Custo fixo adicionado!' }); setShowAdd(false); setName(''); setAmount(''); setDueDay(''); }
    if (error) toast({ title: 'Erro', variant: 'destructive' });
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('financial_fixed_costs' as any).delete().eq('id', id);
    removeFixedCost(id);
  };

  const total = fixedCosts.filter(f => f.is_active).reduce((a, f) => a + Number(f.amount), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Custos Fixos</h1>
          <p className="text-sm text-muted-foreground">Total mensal: R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}><Plus className="w-4 h-4 mr-1" /> Novo</Button>
      </div>

      {fixedCosts.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhum custo fixo cadastrado</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {fixedCosts.map((f) => (
            <Card key={f.id}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Landmark className="w-4 h-4 text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.category}{f.due_day ? ` · Dia ${f.due_day}` : ''}</p>
                </div>
                <p className="text-sm font-bold text-red-400">R$ {Number(f.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(f.id)} className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Novo Custo Fixo</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nome (ex: Aluguel)" value={name} onChange={(e) => setName(e.target.value)} />
            <Input type="text" inputMode="decimal" placeholder="Valor (R$)" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Input type="number" placeholder="Dia de vencimento (opcional)" min="1" max="31" value={dueDay} onChange={(e) => setDueDay(e.target.value)} />
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
