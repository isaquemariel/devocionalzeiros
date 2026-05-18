import { useState, useContext, useMemo, useEffect } from 'react';
import { useFinanceStore, Subscription } from '@/store/financeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Plus, CreditCard, Pencil, CheckCircle2, PauseCircle, XCircle, AlertTriangle, Ban } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CategoriesCtx, FinanceGuardCtx, RefetchCtx } from '@/pages/Financas';
import { format, addMonths, addDays } from 'date-fns';
import { getBrasiliaDateString } from '@/lib/brasiliaDate';
import { moveToTrash } from '@/lib/financeTrash';
import { ConfirmDeleteDialog } from '@/components/financas/ConfirmDeleteDialog';
import { SearchBar } from '@/components/financas/SearchBar';
import { runLocked } from '@/hooks/useActionLock';

interface Props { userId: string; }

type SubStatus = 'active' | 'paused' | 'cancelled';
type StatusFilter = 'all' | 'active' | 'paused' | 'cancelled';

const SUBSCRIPTION_CATEGORIES = [
  'streaming', 'internet', 'saúde', 'segurança', 'trabalho', 'ferramenta',
  'beleza', 'investimentos', 'espaço', 'educação', 'outros',
];

const BILLING_CYCLES = [
  { value: 'monthly', label: 'Mensal' },
  { value: 'quarterly', label: 'Trimestral' },
  { value: 'semiannual', label: 'Semestral' },
  { value: 'annual', label: 'Anual' },
];

const STATUS_OPTIONS: { value: SubStatus; label: string }[] = [
  { value: 'active', label: 'Ativa' },
  { value: 'paused', label: 'Pausada' },
  { value: 'cancelled', label: 'Cancelada' },
];

const DEFAULT_CARDS = ['Mercado Pago', 'Infinity Pay', 'Nubank', 'Carrefour'];

function getStatusIcon(status: SubStatus) {
  switch (status) {
    case 'active': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
    case 'paused': return <PauseCircle className="w-3.5 h-3.5 text-amber-400" />;
    case 'cancelled': return <XCircle className="w-3.5 h-3.5 text-red-400" />;
  }
}

function getStatusLabel(status: SubStatus) {
  return STATUS_OPTIONS.find(s => s.value === status)?.label || 'Ativa';
}

function getBillingLabel(cycle: string) {
  return BILLING_CYCLES.find(c => c.value === cycle)?.label || cycle;
}

function getNextBillingDate(current: string, cycle: string): string {
  const date = new Date(current + 'T12:00:00');
  switch (cycle) {
    case 'quarterly': return format(addMonths(date, 3), 'yyyy-MM-dd');
    case 'semiannual': return format(addMonths(date, 6), 'yyyy-MM-dd');
    case 'annual': return format(addMonths(date, 12), 'yyyy-MM-dd');
    default: return format(addMonths(date, 1), 'yyyy-MM-dd');
  }
}

export function SubscriptionsSection({ userId }: Props) {
  const { subscriptions, addSubscription, removeSubscription, updateSubscription, addTransaction } = useFinanceStore();
  const { toast } = useToast();
  const cats = useContext(CategoriesCtx);
  const { guardAction } = useContext(FinanceGuardCtx);
  const refetch = useContext(RefetchCtx);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<Subscription | null>(null);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('streaming');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [status, setStatus] = useState<SubStatus>('active');
  const [dueDay, setDueDay] = useState('');
  const [nextBillingDate, setNextBillingDate] = useState('');
  const [cardName, setCardName] = useState('');
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<StatusFilter>('active');
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<Subscription | null>(null);
  const [manageCategories, setManageCategories] = useState(false);
  const [manageCards, setManageCards] = useState(false);
  const [newCat, setNewCat] = useState('');
  const [newCard, setNewCard] = useState('');
  const [customCards, setCustomCards] = useState<string[]>([]);

  // Load custom cards from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`finance_custom_cards_${userId}`);
    if (saved) setCustomCards(JSON.parse(saved));
  }, [userId]);

  const saveCustomCards = (cards: string[]) => {
    setCustomCards(cards);
    localStorage.setItem(`finance_custom_cards_${userId}`, JSON.stringify(cards));
  };

  const allCards = useMemo(() => {
    const merged = [...DEFAULT_CARDS];
    customCards.forEach(c => { if (!merged.includes(c)) merged.push(c); });
    return merged.sort();
  }, [customCards]);

  const addCard = (cardNameToAdd: string) => {
    const trimmed = cardNameToAdd.trim();
    if (!trimmed || allCards.includes(trimmed)) return;
    saveCustomCards([...customCards, trimmed]);
    setNewCard('');
  };

  const removeCard = (card: string) => {
    saveCustomCards(customCards.filter(c => c !== card));
  };

  // Auto-advance billing dates for active subscriptions
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    subscriptions.forEach(async (s) => {
      const subStatus = ((s as any).status || 'active') as SubStatus;
      if (subStatus !== 'active' || !s.next_billing_date) return;

      const nextDate = new Date(s.next_billing_date + 'T12:00:00');
      if (nextDate >= today) return;

      // Auto-advance: subscription is paid automatically, move to next cycle
      const newNextDate = getNextBillingDate(s.next_billing_date, s.billing_cycle);
      const { data } = await supabase.from('financial_subscriptions' as any)
        .update({ next_billing_date: newNextDate })
        .eq('id', s.id)
        .select()
        .single();
      if (data) updateSubscription(data as any);
    });
  }, [subscriptions.length]);

  const allSubCategories = useMemo(() => {
    const custom = cats.customCategories.map(c => c.name);
    const merged = [...SUBSCRIPTION_CATEGORIES];
    custom.forEach(c => { if (!merged.includes(c)) merged.push(c); });
    return merged.sort();
  }, [cats.customCategories]);

  const openEdit = (s: Subscription) => guardAction(() => {
    setEditItem(s);
    setName(s.name);
    setAmount(String(s.amount));
    setCategory(s.category);
    setBillingCycle(s.billing_cycle || 'monthly');
    setStatus(((s as any).status as SubStatus) || (s.is_active ? 'active' : 'cancelled'));
    setDueDay((s as any).due_day ? String((s as any).due_day) : '');
    setNextBillingDate(s.next_billing_date || '');
    setCardName((s as any).card_name || '');
    setShowAdd(true);
  });

  const openNew = () => guardAction(() => {
    setEditItem(null);
    setName(''); setAmount(''); setCategory('streaming'); setBillingCycle('monthly');
    setStatus('active'); setDueDay(''); setNextBillingDate(''); setCardName('');
    setShowAdd(true);
  });

  const handleSave = async () => {
    const num = parseFloat(amount.replace(',', '.'));
    if (!num || !name.trim()) return;
    const dueDayNum = parseInt(dueDay) || null;
    if (dueDayNum && (dueDayNum < 1 || dueDayNum > 31)) {
      toast({ title: 'Dia de vencimento deve ser entre 1 e 31', variant: 'destructive' });
      return;
    }
    const nextDate = nextBillingDate || null;
    const isActive = status === 'active';

    setSaving(true);
    const payload = {
      name: name.trim(),
      amount: num,
      category,
      billing_cycle: billingCycle,
      is_active: isActive,
      status,
      due_day: dueDayNum,
      next_billing_date: nextDate,
      card_name: cardName || null,
    };

    if (editItem) {
      const { data, error } = await supabase.from('financial_subscriptions' as any)
        .update(payload).eq('id', editItem.id).select().single();
      if (data) { updateSubscription(data as any); toast({ title: 'Assinatura atualizada!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', variant: 'destructive' });
    } else {
      const { data, error } = await supabase.from('financial_subscriptions' as any).insert({
        user_id: userId, ...payload,
      }).select().single();
      if (data) { addSubscription(data as any); toast({ title: 'Assinatura adicionada!' }); setShowAdd(false); }
      if (error) toast({ title: 'Erro', description: error.message, variant: 'destructive' });
    }
    setSaving(false);
  };

  const handleDelete = async (s: Subscription) => runLocked(`sub-del-${s.id}`, async () => {
    const { error } = await moveToTrash(userId, 'subscription', s);
    if (!error) {
      removeSubscription(s.id);
      toast({ title: 'Movido para a Lixeira' });
    } else {
      toast({ title: 'Erro ao excluir', variant: 'destructive' });
    }
  });

  const handleCancel = async (s: Subscription) => guardAction(() => runLocked(`sub-cancel-${s.id}`, async () => {
    const { data } = await supabase.from('financial_subscriptions' as any)
      .update({ status: 'cancelled', is_active: false })
      .eq('id', s.id)
      .select()
      .single();
    if (data) {
      updateSubscription(data as any);
      toast({ title: 'Assinatura cancelada!' });
    }
  }));

  const handlePay = async (s: Subscription) => guardAction(() => runLocked(`sub-pay-${s.id}`, async () => {
    const today = getBrasiliaDateString();
    let newNextDate = s.next_billing_date;
    if (newNextDate) {
      newNextDate = getNextBillingDate(newNextDate, s.billing_cycle);
    }

    // 1. Update subscription next billing date
    const { data, error } = await supabase.from('financial_subscriptions' as any).update({
      next_billing_date: newNextDate,
    }).eq('id', s.id).select().single();
    if (error) {
      toast({ title: 'Erro ao registrar pagamento', description: error.message, variant: 'destructive' });
      return;
    }

    // 2. Create a transaction so it appears in charts/totals
    const { data: txData } = await supabase.from('financial_transactions').insert({
      user_id: userId,
      type: 'expense',
      amount: Number(s.amount),
      description: s.name,
      category: s.category,
      date: today,
      notes: 'Pagamento de assinatura',
    }).select().single();

    if (data) updateSubscription(data as any);
    if (txData) addTransaction(txData as any);

    await refetch();

    toast({ title: `${s.name} pago!${newNextDate ? ` Próx: ${format(new Date(newNextDate + 'T12:00:00'), 'dd/MM/yyyy')}` : ''}` });
  }));

  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  const total = subscriptions.filter(s => ((s as any).status || 'active') === 'active').reduce((a, s) => a + Number(s.amount), 0);

  const filteredSubs = useMemo(() => {
    let list = filter === 'all'
      ? [...subscriptions]
      : subscriptions.filter(s => ((s as any).status || (s.is_active ? 'active' : 'cancelled')) === filter);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(s =>
        (s.name || '').toLowerCase().includes(q) ||
        (s.category || '').toLowerCase().includes(q) ||
        (s.notes || '').toLowerCase().includes(q) ||
        ((s as any).card_name || '').toLowerCase().includes(q) ||
        String(s.amount).includes(q)
      );
    }
    return list.sort((a, b) => {
      const getSort = (s: Subscription) => {
        const next = s.next_billing_date;
        if (next) return new Date(next + 'T12:00:00').getTime();
        const day = (s as any).due_day;
        if (day) {
          const now = new Date();
          return new Date(now.getFullYear(), now.getMonth(), day).getTime();
        }
        return Infinity;
      };
      return getSort(a) - getSort(b);
    });
  }, [subscriptions, filter, search]);

  const counts = useMemo(() => ({
    all: subscriptions.length,
    active: subscriptions.filter(s => ((s as any).status || 'active') === 'active').length,
    paused: subscriptions.filter(s => (s as any).status === 'paused').length,
    cancelled: subscriptions.filter(s => (s as any).status === 'cancelled').length,
  }), [subscriptions]);

  const FILTERS: { key: StatusFilter; label: string }[] = [
    { key: 'active', label: 'Ativas' },
    { key: 'paused', label: 'Pausadas' },
    { key: 'cancelled', label: 'Canceladas' },
    { key: 'all', label: 'Todas' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold text-foreground">Assinaturas</h1>
          <p className="text-sm text-muted-foreground">Total ativas: R$ {fmt(total)}/mês</p>
        </div>
        <Button size="sm" onClick={openNew} className="shrink-0"><Plus className="w-4 h-4 mr-1" /> Nova</Button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Pesquisar assinatura, categoria, valor..." />

      {/* Status filter */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 overflow-x-auto">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              filter === key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label} {counts[key] > 0 && <span className="ml-1 opacity-70">({counts[key]})</span>}
          </button>
        ))}
      </div>

      {filteredSubs.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">
          {filter === 'all' ? 'Nenhuma assinatura cadastrada' : `Nenhuma assinatura ${filter === 'active' ? 'ativa' : filter === 'paused' ? 'pausada' : 'cancelada'}`}
        </CardContent></Card>
      ) : (
        <div className="space-y-2">
          {filteredSubs.map((s) => {
            const subStatus = ((s as any).status || 'active') as SubStatus;
            const borderClass = subStatus === 'cancelled'
              ? 'border-red-500/20 opacity-60'
              : subStatus === 'paused'
                ? 'border-amber-500/20 opacity-80'
                : '';
            return (
              <Card key={s.id} className={borderClass}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <CreditCard className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                        {getStatusIcon(subStatus)}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {s.category} · {getBillingLabel(s.billing_cycle)} · {getStatusLabel(subStatus)}
                        {(s as any).card_name && ` · 💳 ${(s as any).card_name}`}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground whitespace-nowrap">R$ {fmt(Number(s.amount))}</p>
                      {(s as any).due_day && (
                        <p className="text-xs text-muted-foreground">Venc. dia {(s as any).due_day}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      {subStatus === 'active' && (
                        <Button variant="ghost" size="sm" onClick={() => handlePay(s)} className="h-8 px-2 text-emerald-400 hover:text-emerald-300 text-xs font-medium" title="Registrar pagamento">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Pagar
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => openEdit(s)} className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button>
                      {subStatus === 'active' && (
                        <Button variant="ghost" size="icon" onClick={() => handleCancel(s)} className="h-8 w-8 text-red-400 hover:text-red-300" title="Cancelar assinatura">
                          <Ban className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => guardAction(() => setConfirmDelete(s))} className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>

                  {/* Next billing info */}
                  {s.next_billing_date && subStatus === 'active' && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground inline-flex items-center gap-1">
                        📅 Próx: {format(new Date(s.next_billing_date + 'T12:00:00'), 'dd/MM/yyyy')}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editItem ? 'Editar Assinatura' : 'Nova Assinatura'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Nome</Label>
              <Input placeholder="Ex: Netflix, Spotify..." value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Valor (R$)</Label>
              <Input type="text" inputMode="decimal" placeholder="29,90" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Período de Cobrança</Label>
              <select
                value={billingCycle}
                onChange={(e) => setBillingCycle(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {BILLING_CYCLES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Status</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as SubStatus)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Dia de vencimento (1-31)</Label>
              <Input type="number" placeholder="Ex: 10" value={dueDay} onChange={(e) => setDueDay(e.target.value)} min={1} max={31} />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Data do próximo pagamento</Label>
              <Input type="date" value={nextBillingDate} onChange={(e) => setNextBillingDate(e.target.value)} />
              <p className="text-xs text-muted-foreground">O pagamento avança automaticamente após o vencimento</p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Cartão Utilizado</Label>
              <div className="flex gap-2">
                <select
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm truncate"
                >
                  <option value="">Nenhum</option>
                  {allCards.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <Button type="button" variant="outline" size="icon" className="shrink-0 h-10 w-10" onClick={() => setManageCards(true)} title="Gerenciar cartões">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Categoria</Label>
              <div className="flex gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm truncate"
                >
                  {allSubCategories.map(c => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
                <Button type="button" variant="outline" size="icon" className="shrink-0 h-10 w-10" onClick={() => setManageCategories(true)} title="Gerenciar categorias">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? 'Salvando...' : editItem ? 'Atualizar' : 'Salvar'}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage categories dialog */}
      <Dialog open={manageCategories} onOpenChange={setManageCategories}>
        <DialogContent className="sm:max-w-sm max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Gerenciar Categorias</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Nova categoria..." value={newCat} onChange={(e) => setNewCat(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    cats.addCategory(newCat).then(ok => { if (ok) setNewCat(''); });
                  }
                }} />
              <Button size="sm" onClick={() => cats.addCategory(newCat).then(ok => { if (ok) setNewCat(''); })} className="shrink-0"><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Padrão</p>
              <div className="flex flex-wrap gap-1.5">
                {SUBSCRIPTION_CATEGORIES.map(c => (
                  <span key={c} className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground capitalize">{c}</span>
                ))}
              </div>
            </div>
            {cats.customCategories.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">Personalizadas</p>
                <div className="space-y-1">
                  {cats.customCategories.map(cc => (
                    <div key={cc.id} className="flex items-center justify-between px-2 py-1.5 rounded-md bg-muted/50">
                      <span className="text-sm capitalize">{cc.name}</span>
                      <button onClick={() => cats.removeCategory(cc.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage cards dialog */}
      <Dialog open={manageCards} onOpenChange={setManageCards}>
        <DialogContent className="sm:max-w-sm max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Gerenciar Cartões</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Nome do cartão..." value={newCard} onChange={(e) => setNewCard(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addCard(newCard);
                }} />
              <Button size="sm" onClick={() => addCard(newCard)} className="shrink-0"><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Padrão</p>
              <div className="flex flex-wrap gap-1.5">
                {DEFAULT_CARDS.map(c => (
                  <span key={c} className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">💳 {c}</span>
                ))}
              </div>
            </div>
            {customCards.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">Personalizados</p>
                <div className="space-y-1">
                  {customCards.map(card => (
                    <div key={card} className="flex items-center justify-between px-2 py-1.5 rounded-md bg-muted/50">
                      <span className="text-sm">💳 {card}</span>
                      <button onClick={() => removeCard(card)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!confirmDelete}
        onOpenChange={(o) => !o && setConfirmDelete(null)}
        itemName={confirmDelete?.name}
        onConfirm={() => {
          if (confirmDelete) handleDelete(confirmDelete);
          setConfirmDelete(null);
        }}
      />
    </div>
  );
}
