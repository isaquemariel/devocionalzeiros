import { useState, useMemo, useContext } from 'react';
import { useFinanceStore, Transaction } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowUpRight, ArrowDownRight, Pencil } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TransactionModal } from '@/components/financas/TransactionModal';
import { useAuth } from '@/hooks/useAuth';
import { FinanceGuardCtx } from '@/pages/Financas';

export function TransactionsSection() {
  const { transactions, removeTransaction } = useFinanceStore();
  const { toast } = useToast();
  const { user } = useAuth();
  const { guardAction } = useContext(FinanceGuardCtx);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [editTx, setEditTx] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [transactions, filter]);

  const handleDelete = async (id: string) => guardAction(async () => {
    const { error } = await supabase.from('financial_transactions' as any).delete().eq('id', id);
    if (!error) {
      removeTransaction(id);
      toast({ title: 'Transação removida' });
    }
  });

  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-foreground">Transações</h1>

      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
        {(['all', 'income', 'expense'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              filter === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {f === 'all' ? 'Todos' : f === 'income' ? 'Entradas' : 'Saídas'}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhuma transação encontrada</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((t) => (
            <Card key={t.id} className="hover:bg-accent/30 transition-colors">
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  t.type === 'income' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                }`}>
                  {t.type === 'income'
                    ? <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                    : <ArrowDownRight className="w-4 h-4 text-red-400" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{t.description}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.category} · {format(new Date(t.date + 'T12:00:00'), 'dd MMM', { locale: ptBR })}
                  </p>
                </div>
                <p className={`text-sm font-bold whitespace-nowrap ${t.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {t.type === 'income' ? '+' : '-'} R$ {fmt(Number(t.amount))}
                </p>
                <div className="flex items-center gap-0.5 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => guardAction(() => setEditTx(t))} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)} className="h-8 w-8 text-muted-foreground hover:text-red-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {user?.id && (
        <TransactionModal
          open={!!editTx}
          onClose={() => setEditTx(null)}
          userId={user.id}
          editTransaction={editTx}
        />
      )}
    </div>
  );
}
