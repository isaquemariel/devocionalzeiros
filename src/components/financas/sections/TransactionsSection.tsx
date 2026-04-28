import { useState, useMemo, useContext } from 'react';
import { useFinanceStore, Transaction } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowUpRight, ArrowDownRight, Pencil, CalendarIcon, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TransactionModal } from '@/components/financas/TransactionModal';
import { useAuth } from '@/hooks/useAuth';
import { FinanceGuardCtx, RefetchCtx } from '@/pages/Financas';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';
import { moveToTrash } from '@/lib/financeTrash';
import { ConfirmDeleteDialog } from '@/components/financas/ConfirmDeleteDialog';
import { SearchBar } from '@/components/financas/SearchBar';
import { supabase } from '@/integrations/supabase/client';

const PROJECT_MIRROR_PREFIX = 'Espelho automático de projeto (ID: ';

function getMirroredProjectTxId(notes?: string | null): string | null {
  if (!notes || !notes.startsWith(PROJECT_MIRROR_PREFIX)) return null;
  const rest = notes.slice(PROJECT_MIRROR_PREFIX.length);
  const closeIdx = rest.indexOf(')');
  if (closeIdx === -1) return null;
  return rest.slice(0, closeIdx).trim() || null;
}

export function TransactionsSection() {
  const { transactions, removeTransaction } = useFinanceStore();
  const { toast } = useToast();
  const { user } = useAuth();
  const { guardAction } = useContext(FinanceGuardCtx);
  const refetch = useContext(RefetchCtx);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [editTx, setEditTx] = useState<Transaction | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    let list = [...transactions];

    if (filter !== 'all') list = list.filter(t => t.type === filter);

    if (dateRange?.from) {
      const startStr = format(dateRange.from, 'yyyy-MM-dd');
      const endStr = dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : startStr;
      list = list.filter(t => t.date >= startStr && t.date <= endStr);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(t =>
        (t.description || '').toLowerCase().includes(q) ||
        (t.category || '').toLowerCase().includes(q) ||
        (t.notes || '').toLowerCase().includes(q) ||
        String(t.amount).includes(q)
      );
    }

    list.sort((a, b) => {
      const dateCmp = b.date.localeCompare(a.date);
      if (dateCmp !== 0) return dateCmp;
      return (b.created_at || '').localeCompare(a.created_at || '');
    });

    return list;
  }, [transactions, filter, dateRange, search]);

  const handleDelete = async (tx: Transaction) => {
    if (!user?.id) return;

    // If this is an automatic mirror of a project transaction, delete the source
    // project transaction instead — the DB trigger will remove the mirror.
    const projectTxId = getMirroredProjectTxId(tx.notes);
    if (projectTxId) {
      const { error } = await supabase
        .from('financial_project_transactions')
        .delete()
        .eq('id', projectTxId);
      if (error) {
        toast({ title: 'Erro ao excluir', description: error.message, variant: 'destructive' });
        return;
      }
      // Refresh both stores so projects list and transactions list stay in sync
      await refetch();
      toast({ title: 'Movimentação de projeto excluída' });
      return;
    }

    const { error } = await moveToTrash(user.id, 'transaction', tx);
    if (!error) {
      removeTransaction(tx.id);
      toast({ title: 'Movido para a Lixeira', description: 'Você pode restaurar em "Lixeira"' });
    } else {
      toast({ title: 'Erro ao excluir', variant: 'destructive' });
    }
  };

  const handleEditClick = (tx: Transaction) => {
    if (getMirroredProjectTxId(tx.notes)) {
      toast({
        title: 'Edite pela seção Projetos',
        description: 'Esta transação é um espelho de uma movimentação de projeto.',
      });
      return;
    }
    setEditTx(tx);
  };

  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  const dateLabel = dateRange?.from
    ? dateRange.to && dateRange.to.getTime() !== dateRange.from.getTime()
      ? `${format(dateRange.from, 'dd/MM/yy')} - ${format(dateRange.to, 'dd/MM/yy')}`
      : format(dateRange.from, "dd 'de' MMMM", { locale: ptBR })
    : 'Filtrar por data';

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-foreground">Transações</h1>

      {/* Type filter */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
        {(['income', 'expense', 'all'] as const).map((f) => (
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

      {/* Date picker filter */}
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left text-xs font-medium h-9",
                !dateRange?.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="w-3.5 h-3.5 mr-1.5" />
              {dateLabel}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              locale={ptBR}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
        {dateRange?.from && (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setDateRange(undefined)}>
            <X className="w-4 h-4" />
          </Button>
        )}
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
                  <Button variant="ghost" size="icon" onClick={() => guardAction(() => handleEditClick(t))} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => guardAction(() => setConfirmDelete(t))} className="h-8 w-8 text-muted-foreground hover:text-red-400">
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
