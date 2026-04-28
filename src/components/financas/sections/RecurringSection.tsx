import { useState, useContext, useMemo } from 'react';
import { useFinanceStore, RecurringItem } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Plus, RefreshCw, Pencil } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CategorySelect } from '@/components/financas/CategorySelect';
import { CategoriesCtx, FinanceGuardCtx } from '@/pages/Financas';
import { moveToTrash } from '@/lib/financeTrash';
import { ConfirmDeleteDialog } from '@/components/financas/ConfirmDeleteDialog';
import { SearchBar } from '@/components/financas/SearchBar';

interface Props { userId: string; }

export function RecurringSection({ userId }: Props) {
  const { recurring, addRecurring, removeRecurring, updateRecurring } = useFinanceStore();
  const { toast } = useToast();
  const cats = useContext(CategoriesCtx);
  const { guardAction } = useContext(FinanceGuardCtx);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<RecurringItem | null>(null);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('monthly');
  const [category, setCategory] = useState('outros');
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<RecurringItem | null>(null);
  const [search, setSearch] = useState('');

  const filteredRecurring = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = [...recurring];
    if (q) {
      list = list.filter(r =>
        (r.description || '').toLowerCase().includes(q) ||
        (r.category || '').toLowerCase().includes(q) ||
        (r.notes || '').toLowerCase().includes(q) ||
        String(r.amount).includes(q)
      );
    }
    return list.sort((a, b) => {
      const getSort = (r: RecurringItem) => {
        const next = (r as any).next_date;
        if (next) return new Date(next + 'T12:00:00').getTime();
        return Infinity;
      };
      return getSort(a) - getSort(b);
    });
  }, [recurring, search]);

  const openEdit = (r: RecurringItem) => guardAction(() => {
    setEditItem(r);
    setType(r.type);
    setDesc(r.description);
    setAmount(String(r.amount));
    setFrequency(r.frequency);
    setCategory(r.category);
    setShowAdd(true);
  });

  const openNew = () => guardAction(() => {
    setEditItem(null);
    setType('expense'); setDesc(''); setAmount(''); setFrequency('monthly'); setCategory('outros');
    setShowAdd(true);
  });

  const handleSave = async () => {
    const num = parseFloat(amount.replace(',', '.'));
    if (!num || !desc.trim()) return;
    setSaving(true);
    const payload = { type, description: desc.trim(), amount: num, frequency, category };
    if (editItem) {
      const { data, error } = await supabase.from('financial_recurring' as any).update(payload).eq('id', editItem.id).select().single();
      if (data) { updateRecurring(data as any); toast({ title: 'Recorrência atualizada!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', variant: 'destructive' });
    } else {
      const { data, error } = await supabase.from('financial_recurring' as any).insert({ user_id: userId, ...payload }).select().single();
      if (data) { addRecurring(data as any); toast({ title: 'Recorrência adicionada!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', variant: 'destructive' });
    }
    setSaving(false);
  };

  const handleDelete = async (r: RecurringItem) => {
    const { error } = await moveToTrash(userId, 'recurring', r);
    if (!error) {
      removeRecurring(r.id);
      toast({ title: 'Movido para a Lixeira' });
    } else {
      toast({ title: 'Erro ao excluir', variant: 'destructive' });
    }
  };

  const freqLabel = (f: string) => ({ daily: 'Diário', weekly: 'Semanal', monthly: 'Mensal', yearly: 'Anual' }[f] || f);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Recorrentes</h1>
        <Button size="sm" onClick={openNew} className="shrink-0"><Plus className="w-4 h-4 mr-1" /> Novo</Button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Pesquisar recorrência, categoria, valor..." />

      {filteredRecurring.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhum lançamento recorrente</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {filteredRecurring.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${r.type === 'income' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                  <RefreshCw className={`w-4 h-4 ${r.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{r.description}</p>
                  <p className="text-xs text-muted-foreground truncate">{r.category} · {freqLabel(r.frequency)}</p>
                </div>
                <p className={`text-sm font-bold whitespace-nowrap ${r.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                  R$ {Number(r.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-0.5 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(r)} className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => guardAction(() => setConfirmDelete(r))} className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editItem ? 'Editar Recorrência' : 'Nova Recorrência'}</DialogTitle></DialogHeader>
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
            <CategorySelect value={category} onChange={setCategory} allCategories={cats.allCategories} customCategories={cats.customCategories} onAddCategory={cats.addCategory} onRemoveCategory={cats.removeCategory} />
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? 'Salvando...' : editItem ? 'Atualizar' : 'Salvar'}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!confirmDelete}
        onOpenChange={(o) => !o && setConfirmDelete(null)}
        itemName={confirmDelete?.description}
        onConfirm={() => {
          if (confirmDelete) handleDelete(confirmDelete);
          setConfirmDelete(null);
        }}
      />
    </div>
  );
}
