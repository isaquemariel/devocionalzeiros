import { useState, useContext } from 'react';
import { useFinanceStore, Installment } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Trash2, Plus, CalendarClock, Pencil } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CategorySelect } from '@/components/financas/CategorySelect';
import { CategoriesCtx } from '@/pages/Financas';

interface Props { userId: string; }

export function InstallmentsSection({ userId }: Props) {
  const { installments, addInstallment, removeInstallment, updateInstallment } = useFinanceStore();
  const { toast } = useToast();
  const cats = useContext(CategoriesCtx);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<Installment | null>(null);
  const [desc, setDesc] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [totalInst, setTotalInst] = useState('');
  const [category, setCategory] = useState('outros');
  const [saving, setSaving] = useState(false);

  const openEdit = (i: Installment) => {
    setEditItem(i);
    setDesc(i.description);
    setTotalAmount(String(i.total_amount));
    setTotalInst(String(i.total_installments));
    setCategory(i.category);
    setShowAdd(true);
  };

  const openNew = () => {
    setEditItem(null);
    setDesc(''); setTotalAmount(''); setTotalInst(''); setCategory('outros');
    setShowAdd(true);
  };

  const handleSave = async () => {
    const total = parseFloat(totalAmount.replace(',', '.'));
    const count = parseInt(totalInst);
    if (!total || !count || !desc.trim()) return;
    setSaving(true);
    if (editItem) {
      const payload = { description: desc.trim(), total_amount: total, installment_amount: Math.ceil((total / count) * 100) / 100, total_installments: count, category };
      const { data, error } = await supabase.from('financial_installments' as any).update(payload).eq('id', editItem.id).select().single();
      if (data) { updateInstallment(data as any); toast({ title: 'Parcela atualizada!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', variant: 'destructive' });
    } else {
      const { data, error } = await supabase.from('financial_installments' as any).insert({
        user_id: userId, description: desc.trim(), total_amount: total,
        installment_amount: Math.ceil((total / count) * 100) / 100, total_installments: count, category,
      }).select().single();
      if (data) { addInstallment(data as any); toast({ title: 'Parcela adicionada!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', variant: 'destructive' });
    }
    setSaving(false);
  };

  const handlePay = async (inst: any) => {
    const newPaid = inst.paid_installments + 1;
    const isActive = newPaid < inst.total_installments;
    await supabase.from('financial_installments' as any).update({ paid_installments: newPaid, is_active: isActive }).eq('id', inst.id);
    updateInstallment({ ...inst, paid_installments: newPaid, is_active: isActive });
    toast({ title: `Parcela ${newPaid}/${inst.total_installments} paga!` });
  };

  const handleDelete = async (id: string) => {
    await supabase.from('financial_installments' as any).delete().eq('id', id);
    removeInstallment(id);
  };

  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Parcelas</h1>
        <Button size="sm" onClick={openNew} className="shrink-0"><Plus className="w-4 h-4 mr-1" /> Nova</Button>
      </div>

      {installments.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhuma parcela cadastrada</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {installments.map((inst) => (
            <Card key={inst.id}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <CalendarClock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{inst.description}</p>
                    <p className="text-xs text-muted-foreground truncate">{inst.paid_installments}/{inst.total_installments} pagas · R$ {fmt(Number(inst.installment_amount))}/parcela</p>
                  </div>
                  <p className="text-sm font-bold text-foreground whitespace-nowrap">R$ {fmt(Number(inst.total_amount))}</p>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(inst)} className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(inst.id)} className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </div>
                <Progress value={(inst.paid_installments / inst.total_installments) * 100} className="h-2" />
                {inst.is_active && (
                  <Button size="sm" variant="outline" onClick={() => handlePay(inst)} className="text-xs">
                    Pagar parcela {inst.paid_installments + 1}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editItem ? 'Editar Parcela' : 'Nova Parcela'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Descrição" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Input type="text" inputMode="decimal" placeholder="Valor total (R$)" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
            <Input type="number" placeholder="Número de parcelas" value={totalInst} onChange={(e) => setTotalInst(e.target.value)} />
            <CategorySelect value={category} onChange={setCategory} allCategories={cats.allCategories} customCategories={cats.customCategories} onAddCategory={cats.addCategory} onRemoveCategory={cats.removeCategory} />
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? 'Salvando...' : editItem ? 'Atualizar' : 'Salvar'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
