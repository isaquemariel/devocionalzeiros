import { useState, useContext } from 'react';
import { useFinanceStore, Subscription } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Plus, CreditCard, Pencil } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CategorySelect } from '@/components/financas/CategorySelect';
import { CategoriesCtx, FinanceGuardCtx } from '@/pages/Financas';

interface Props { userId: string; }

export function SubscriptionsSection({ userId }: Props) {
  const { subscriptions, addSubscription, removeSubscription, updateSubscription } = useFinanceStore();
  const { toast } = useToast();
  const cats = useContext(CategoriesCtx);
  const { guardAction } = useContext(FinanceGuardCtx);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<Subscription | null>(null);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('outros');
  const [saving, setSaving] = useState(false);

  const openEdit = (s: Subscription) => guardAction(() => {
    setEditItem(s);
    setName(s.name);
    setAmount(String(s.amount));
    setCategory(s.category);
    setShowAdd(true);
  });

  const openNew = () => guardAction(() => {
    setEditItem(null);
    setName('');
    setAmount('');
    setCategory('outros');
    setShowAdd(true);
  });

  const handleSave = async () => {
    const num = parseFloat(amount.replace(',', '.'));
    if (!num || !name.trim()) return;
    setSaving(true);
    if (editItem) {
      const { data, error } = await supabase.from('financial_subscriptions' as any)
        .update({ name: name.trim(), amount: num, category })
        .eq('id', editItem.id).select().single();
      if (data) { updateSubscription(data as any); toast({ title: 'Assinatura atualizada!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', variant: 'destructive' });
    } else {
      const { data, error } = await supabase.from('financial_subscriptions' as any).insert({
        user_id: userId, name: name.trim(), amount: num, category,
      }).select().single();
      if (data) { addSubscription(data as any); toast({ title: 'Assinatura adicionada!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', description: error.message, variant: 'destructive' });
    }
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
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold text-foreground">Assinaturas</h1>
          <p className="text-sm text-muted-foreground">Total mensal: R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <Button size="sm" onClick={openNew} className="shrink-0"><Plus className="w-4 h-4 mr-1" /> Nova</Button>
      </div>

      {subscriptions.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhuma assinatura cadastrada</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {subscriptions.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{s.category} · {s.billing_cycle}</p>
                </div>
                <p className="text-sm font-bold text-red-400 whitespace-nowrap">R$ {Number(s.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <div className="flex items-center gap-0.5 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(s)} className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editItem ? 'Editar Assinatura' : 'Nova Assinatura'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nome (ex: Netflix)" value={name} onChange={(e) => setName(e.target.value)} />
            <Input type="text" inputMode="decimal" placeholder="Valor mensal (R$)" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <CategorySelect value={category} onChange={setCategory} allCategories={cats.allCategories} customCategories={cats.customCategories} onAddCategory={cats.addCategory} onRemoveCategory={cats.removeCategory} />
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? 'Salvando...' : editItem ? 'Atualizar' : 'Salvar'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
