import { useState, useEffect, useContext, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, RotateCcw, ArrowUpRight, ArrowDownRight, CreditCard, CalendarClock, Landmark, RefreshCw, FolderKanban, PiggyBank } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFinanceStore } from '@/store/financeStore';
import { ENTITY_LABEL, TrashEntity, restoreFromTrash, purgeFromTrash } from '@/lib/financeTrash';
import { ConfirmDeleteDialog } from '@/components/financas/ConfirmDeleteDialog';
import { FinanceGuardCtx, RefetchCtx } from '@/pages/Financas';

interface TrashItem {
  id: string;
  user_id: string;
  entity_type: TrashEntity;
  original_id: string;
  data: any;
  deleted_at: string;
}

const TYPE_FILTERS: { key: 'all' | TrashEntity; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'transaction', label: 'Transações' },
  { key: 'subscription', label: 'Assinaturas' },
  { key: 'installment', label: 'Parcelados' },
  { key: 'fixed_cost', label: 'Custos Fixos' },
  { key: 'recurring', label: 'Recorrentes' },
  { key: 'project', label: 'Projetos' },
  { key: 'budget', label: 'Orçamento' },
];

function getIcon(item: TrashItem) {
  if (item.entity_type === 'transaction') {
    return item.data.type === 'income'
      ? <ArrowUpRight className="w-4 h-4 text-emerald-400" />
      : <ArrowDownRight className="w-4 h-4 text-red-400" />;
  }
  switch (item.entity_type) {
    case 'subscription': return <CreditCard className="w-4 h-4 text-blue-400" />;
    case 'installment': return <CalendarClock className="w-4 h-4 text-amber-400" />;
    case 'fixed_cost': return <Landmark className="w-4 h-4 text-orange-400" />;
    case 'recurring': return <RefreshCw className="w-4 h-4 text-purple-400" />;
    case 'project': return <FolderKanban className="w-4 h-4 text-indigo-400" />;
    case 'budget': return <PiggyBank className="w-4 h-4 text-pink-400" />;
    default: return <Trash2 className="w-4 h-4 text-muted-foreground" />;
  }
}

function getTitle(item: TrashItem): string {
  const d = item.data || {};
  return d.description || d.name || d.category || ENTITY_LABEL[item.entity_type];
}

function getSubtitle(item: TrashItem): string {
  const d = item.data || {};
  if (item.entity_type === 'transaction') {
    return `${d.category || 'outros'} · ${d.type === 'income' ? 'Entrada' : 'Saída'}`;
  }
  if (item.entity_type === 'budget') {
    return `${d.category} · ${d.month_year}`;
  }
  return d.category || ENTITY_LABEL[item.entity_type];
}

function getAmount(item: TrashItem): string | null {
  const d = item.data || {};
  const v = d.amount ?? d.total_amount ?? d.budget_amount;
  if (v == null) return null;
  return `R$ ${Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

interface Props {
  userId: string;
}

export function TrashSection({ userId }: Props) {
  const { toast } = useToast();
  const { guardAction } = useContext(FinanceGuardCtx);
  const refetch = useContext(RefetchCtx);
  const [items, setItems] = useState<TrashItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | TrashEntity>('all');
  const [confirmRestoreItem, setConfirmRestoreItem] = useState<TrashItem | null>(null);
  const [confirmPurgeItem, setConfirmPurgeItem] = useState<TrashItem | null>(null);
  const [confirmEmpty, setConfirmEmpty] = useState(false);

  const fetchTrash = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('financial_trash' as any)
      .select('*')
      .eq('user_id', userId)
      .order('deleted_at', { ascending: false });
    setItems((data as any) || []);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchTrash();
  }, [fetchTrash]);

  const handleRestore = async (item: TrashItem) => {
    const { error } = await restoreFromTrash(item.id, item.entity_type, item.data);
    if (error) {
      toast({ title: 'Erro ao restaurar', description: error.message, variant: 'destructive' });
      return;
    }
    setItems(prev => prev.filter(i => i.id !== item.id));
    await refetch();
    toast({ title: `${ENTITY_LABEL[item.entity_type]} restaurado!` });
  };

  const handlePurge = async (item: TrashItem) => {
    const { error } = await purgeFromTrash(item.id);
    if (error) {
      toast({ title: 'Erro', variant: 'destructive' });
      return;
    }
    setItems(prev => prev.filter(i => i.id !== item.id));
    toast({ title: 'Excluído permanentemente' });
  };

  const handleEmptyAll = async () => {
    const { error } = await supabase.from('financial_trash' as any).delete().eq('user_id', userId);
    if (error) {
      toast({ title: 'Erro', variant: 'destructive' });
      return;
    }
    setItems([]);
    toast({ title: 'Lixeira esvaziada' });
  };

  const filtered = filter === 'all' ? items : items.filter(i => i.entity_type === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold text-foreground">Lixeira</h1>
          <p className="text-sm text-muted-foreground">
            {items.length === 0 ? 'Nenhum item excluído' : `${items.length} ${items.length === 1 ? 'item excluído' : 'itens excluídos'}`}
          </p>
        </div>
        {items.length > 0 && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => guardAction(() => setConfirmEmpty(true))}
            className="shrink-0 text-red-400 border-red-500/30 hover:bg-red-500/10"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" /> Esvaziar
          </Button>
        )}
      </div>

      {/* Type filter */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 overflow-x-auto">
        {TYPE_FILTERS.map(({ key, label }) => {
          const count = key === 'all' ? items.length : items.filter(i => i.entity_type === key).length;
          if (key !== 'all' && count === 0) return null;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                filter === key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label} {count > 0 && <span className="ml-1 opacity-70">({count})</span>}
            </button>
          );
        })}
      </div>

      {loading ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Carregando...</CardContent></Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            <Trash2 className="w-10 h-10 mx-auto mb-2 opacity-30" />
            Lixeira vazia
            <p className="text-xs mt-1">Itens excluídos aparecerão aqui e podem ser restaurados</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => {
            const amount = getAmount(item);
            return (
              <Card key={item.id} className="opacity-90">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    {getIcon(item)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-foreground truncate">{getTitle(item)}</p>
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0">
                        {ENTITY_LABEL[item.entity_type]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {getSubtitle(item)} · excluído {format(new Date(item.deleted_at), "dd/MM 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                  {amount && (
                    <p className="text-sm font-bold text-foreground whitespace-nowrap shrink-0">{amount}</p>
                  )}
                  <div className="flex items-center gap-0.5 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => guardAction(() => setConfirmRestoreItem(item))}
                      className="h-8 w-8 text-emerald-400 hover:text-emerald-300"
                      title="Restaurar"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => guardAction(() => setConfirmPurgeItem(item))}
                      className="h-8 w-8 text-muted-foreground hover:text-red-400"
                      title="Excluir permanentemente"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <ConfirmDeleteDialog
        open={!!confirmRestoreItem}
        onOpenChange={(o) => !o && setConfirmRestoreItem(null)}
        description={
          confirmRestoreItem
            ? `Restaurar "${getTitle(confirmRestoreItem)}" para a lista original?`
            : ''
        }
        confirmLabel="Restaurar"
        onConfirm={() => {
          if (confirmRestoreItem) handleRestore(confirmRestoreItem);
          setConfirmRestoreItem(null);
        }}
      />

      <ConfirmDeleteDialog
        open={!!confirmPurgeItem}
        onOpenChange={(o) => !o && setConfirmPurgeItem(null)}
        description={
          confirmPurgeItem
            ? `Excluir "${getTitle(confirmPurgeItem)}" permanentemente? Esta ação não pode ser desfeita.`
            : ''
        }
        confirmLabel="Excluir para sempre"
        onConfirm={() => {
          if (confirmPurgeItem) handlePurge(confirmPurgeItem);
          setConfirmPurgeItem(null);
        }}
      />

      <ConfirmDeleteDialog
        open={confirmEmpty}
        onOpenChange={setConfirmEmpty}
        description="Esvaziar a lixeira excluirá permanentemente todos os itens. Esta ação não pode ser desfeita."
        confirmLabel="Esvaziar lixeira"
        onConfirm={() => {
          handleEmptyAll();
          setConfirmEmpty(false);
        }}
      />
    </div>
  );
}
