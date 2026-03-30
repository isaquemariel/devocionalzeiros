import { useState, useMemo, useContext } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Plus, PiggyBank, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { CategorySelect } from '@/components/financas/CategorySelect';
import { CategoriesCtx, FinanceGuardCtx } from '@/pages/Financas';

interface Props { userId: string; }

export function BudgetSection({ userId }: Props) {
  const { budgets, transactions, addBudget, removeBudget } = useFinanceStore();
  const { toast } = useToast();
  const cats = useContext(CategoriesCtx);
  const { guardAction } = useContext(FinanceGuardCtx);
  const [showAdd, setShowAdd] = useState(false);
  const [category, setCategory] = useState('alimentação');
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);

  const currentMonth = format(new Date(), 'yyyy-MM');
  const monthBudgets = budgets.filter((b) => b.month_year === currentMonth);

  const spentByCategory = useMemo(() => {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());
    const map: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'expense' && new Date(t.date + 'T12:00:00') >= start && new Date(t.date + 'T12:00:00') <= end)
      .forEach((t) => { map[t.category] = (map[t.category] || 0) + Number(t.amount); });
    return map;
  }, [transactions]);

  const handleSave = async () => {
    const num = parseFloat(amount.replace(',', '.'));
    if (!num) return;
    setSaving(true);
    const { data, error } = await supabase.from('financial_budgets' as any).insert({
      user_id: userId, category, budget_amount: num, month_year: currentMonth,
    }).select().single();
    if (data) { addBudget(data as any); toast({ title: 'Orçamento definido!' }); setShowAdd(false); setAmount(''); }
    if (error) toast({ title: error.message.includes('unique') ? 'Já existe orçamento para essa categoria' : 'Erro', variant: 'destructive' });
    setSaving(false);
  };

  const handleDelete = async (id: string) => guardAction(async () => {
    await supabase.from('financial_budgets' as any).delete().eq('id', id);
    removeBudget(id);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Orçamento</h1>
        <Button size="sm" onClick={() => guardAction(() => setShowAdd(true))} className="shrink-0"><Plus className="w-4 h-4 mr-1" /> Novo</Button>
      </div>

      {monthBudgets.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhum orçamento definido para este mês</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {monthBudgets.map((b) => {
            const spent = spentByCategory[b.category] || 0;
            const pct = Math.min((spent / Number(b.budget_amount)) * 100, 100);
            const over = spent > Number(b.budget_amount);
            return (
              <Card key={b.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <PiggyBank className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium capitalize truncate">{b.category}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(b.id)} className="h-7 w-7 shrink-0"><Trash2 className="w-3 h-3" /></Button>
                  </div>
                  <Progress value={pct} className={`h-2 ${over ? '[&>div]:bg-red-500' : ''}`} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className={over ? 'text-red-400 font-semibold' : ''}>R$ {spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} gasto</span>
                    <span>R$ {Number(b.budget_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} limite</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Definir Orçamento</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <CategorySelect value={category} onChange={setCategory} allCategories={cats.allCategories} customCategories={cats.customCategories} onAddCategory={cats.addCategory} onRemoveCategory={cats.removeCategory} />
            <Input type="text" inputMode="decimal" placeholder="Limite mensal (R$)" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? 'Salvando...' : 'Salvar'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
