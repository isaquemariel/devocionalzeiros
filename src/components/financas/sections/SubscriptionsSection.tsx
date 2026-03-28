import { useState } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Plus, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CATEGORIES } from '@/store/financeStore';

interface Props { userId: string; }

export function SubscriptionsSection({ userId }: Props) {
  const { subscriptions, addSubscription, removeSubscription } = useFinanceStore();
  const { toast } = useToast();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('outros');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const num = parseFloat(amount.replace(',', '.'));
    if (!num || !name.trim()) return;
    setSaving(true);
    const { data, error } = await supabase.from('financial_subscriptions' as any).insert({
      user_id: userId, name: name.trim(), amount: num, category,
    }).select().single();
    if (data) { addSubscription(data as any); toast({ title: 'Assinatura adicionada!' }); setShowAdd(false); setName(''); setAmount(''); }
    if (error) toast({ title: 'Erro', description: error.message, variant: 'destructive' });
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('financial_subscriptions' as any).delete().eq('id', id);
    removeSubscription(id);
    toast({ title: 'Assinatura removida' });
  };

  const total = subscriptions.filter(s => s.is_active).reduce((a, s) => a + Number(s.amount), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Assinaturas</h1>
          <p className="text-sm text-muted-foreground">Total mensal: R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}><Plus className="w-4 h-4 mr-1" /> Nova</Button>
      </div>

      {subscriptions.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhuma assinatura cadastrada</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {subscriptions.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.category} · {s.billing_cycle}</p>
                </div>
                <p className="text-sm font-bold text-red-400">R$ {Number(s.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Nova Assinatura</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nome (ex: Netflix)" value={name} onChange={(e) => setName(e.target.value)} />
            <Input type="text" inputMode="decimal" placeholder="Valor mensal (R$)" value={amount} onChange={(e) => setAmount(e.target.value)} />
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
