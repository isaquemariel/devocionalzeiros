import { useState, useContext } from 'react';
import { useFinanceStore, FixedCost } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Plus, Landmark, Pencil } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CategorySelect } from '@/components/financas/CategorySelect';
import { CategoriesCtx } from '@/pages/Financas';

interface Props { userId: string; }

export function FixedCostsSection({ userId }: Props) {
  const { fixedCosts, addFixedCost, removeFixedCost, updateFixedCost } = useFinanceStore();
  const { toast } = useToast();
  const cats = useContext(CategoriesCtx);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<FixedCost | null>(null);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDay, setDueDay] = useState('');
  const [category, setCategory] = useState('outros');
  const [saving, setSaving] = useState(false);

  const openEdit = (f: FixedCost) => {
    setEditItem(f);
    setName(f.name);
    setAmount(String(f.amount));
    setDueDay(f.due_day ? String(f.due_day) : '');
    setCategory(f.category);
    setShowAdd(true);
  };

  const openNew = () => {
    setEditItem(null);
    setName(''); setAmount(''); setDueDay(''); setCategory('outros');
    setShowAdd(true);
  };

  const handleSave = async () => {
    const num = parseFloat(amount.replace(',', '.'));
    if (!num || !name.trim()) return;
    setSaving(true);
    const payload = { name: name.trim(), amount: num, due_day: dueDay ? parseInt(dueDay) : null, category };
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

  const handleDelete = async (id: string) => {
    await supabase.from('financial_fixed_costs' as any).delete().eq('id', id);
    removeFixedCost(id);
  };

  const total = fixedCosts.filter(f => f.is_active).reduce((a, f) => a + Number(f.amount), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold text-foreground">Custos Fixos</h1>
          <p className="text-sm text-muted-foreground">Total mensal: R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <Button size="sm" onClick={openNew} className="shrink-0"><Plus className="w-4 h-4 mr-1" /> Novo</Button>
      </div>

      {fixedCosts.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhum custo fixo cadastrado</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {fixedCosts.map((f) => (
            <Card key={f.id}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                  <Landmark className="w-4 h-4 text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{f.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{f.category}{f.due_day ? ` · Dia ${f.due_day}` : ''}</p>
                </div>
                <p className="text-sm font-bold text-red-400 whitespace-nowrap">R$ {Number(f.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <div className="flex items-center gap-0.5 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(f)} className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(f.id)} className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editItem ? 'Editar Custo Fixo' : 'Novo Custo Fixo'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nome (ex: Aluguel)" value={name} onChange={(e) => setName(e.target.value)} />
            <Input type="text" inputMode="decimal" placeholder="Valor (R$)" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Input type="number" placeholder="Dia de vencimento (opcional)" min="1" max="31" value={dueDay} onChange={(e) => setDueDay(e.target.value)} />
            <CategorySelect value={category} onChange={setCategory} allCategories={cats.allCategories} customCategories={cats.customCategories} onAddCategory={cats.addCategory} onRemoveCategory={cats.removeCategory} />
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? 'Salvando...' : editItem ? 'Atualizar' : 'Salvar'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
