import { useState, useMemo, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useFinanceStore, Project, ProjectTransaction } from '@/store/financeStore';
import { FinanceGuardCtx } from '@/pages/Financas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import {
  Plus,
  Trash2,
  Edit2,
  ChevronRight,
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingUp,
  TrendingDown,
  FolderKanban,
  ArrowLeft,
} from 'lucide-react';

interface Props {
  userId: string;
}

export function ProjectsSection({ userId }: Props) {
  const {
    projects, projectTransactions,
    addProject, removeProject, updateProject,
    addProjectTransaction, removeProjectTransaction,
    addTransaction,
  } = useFinanceStore();
  const { guardAction } = useContext(FinanceGuardCtx);

  const [showNewProject, setShowNewProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showNewTx, setShowNewTx] = useState(false);

  // New project form
  const [pName, setPName] = useState('');
  const [pDesc, setPDesc] = useState('');

  // New tx form
  const [txType, setTxType] = useState<'expense' | 'income'>('expense');
  const [txAmount, setTxAmount] = useState('');
  const [txDesc, setTxDesc] = useState('');
  const [txDate, setTxDate] = useState(new Date().toISOString().slice(0, 10));
  const [txCategory, setTxCategory] = useState('investimento');

  const fmt = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const activeProjects = useMemo(() => projects.filter((p) => p.is_active), [projects]);
  const inactiveProjects = useMemo(() => projects.filter((p) => !p.is_active), [projects]);

  const projectTxs = useMemo(() => {
    if (!selectedProject) return [];
    return projectTransactions
      .filter((t) => t.project_id === selectedProject.id)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [selectedProject, projectTransactions]);

  const projectTotals = useMemo(() => {
    if (!selectedProject) return { invested: 0, returned: 0, balance: 0 };
    const txs = projectTransactions.filter((t) => t.project_id === selectedProject.id);
    const invested = txs.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
    const returned = txs.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
    return { invested, returned, balance: returned - invested };
  }, [selectedProject, projectTransactions]);

  const resetProjectForm = () => {
    setPName('');
    setPDesc('');
  };

  const resetTxForm = () => {
    setTxType('expense');
    setTxAmount('');
    setTxDesc('');
    setTxDate(new Date().toISOString().slice(0, 10));
    setTxCategory('investimento');
  };

  const handleSaveProject = async () => {
    if (!pName.trim()) {
      toast.error('Informe o nome do projeto');
      return;
    }

    if (editingProject) {
      const { error } = await supabase
        .from('financial_projects')
        .update({ name: pName.trim(), description: pDesc.trim() || null } as any)
        .eq('id', editingProject.id);
      if (error) { toast.error('Erro ao atualizar'); return; }
      updateProject({ ...editingProject, name: pName.trim(), description: pDesc.trim() || undefined });
      toast.success('Projeto atualizado');
    } else {
      const { data, error } = await supabase
        .from('financial_projects')
        .insert({ user_id: userId, name: pName.trim(), description: pDesc.trim() || null } as any)
        .select()
        .single();
      if (error || !data) { toast.error('Erro ao criar projeto'); return; }
      addProject(data as any);
      toast.success('Projeto criado');
    }

    setShowNewProject(false);
    setEditingProject(null);
    resetProjectForm();
  };

  const handleDeleteProject = async (p: Project) => {
    const { error } = await supabase.from('financial_projects').delete().eq('id', p.id);
    if (error) { toast.error('Erro ao excluir'); return; }
    removeProject(p.id);
    if (selectedProject?.id === p.id) setSelectedProject(null);
    toast.success('Projeto excluído');
  };

  const handleToggleActive = async (p: Project) => {
    const newActive = !p.is_active;
    const { error } = await supabase
      .from('financial_projects')
      .update({ is_active: newActive } as any)
      .eq('id', p.id);
    if (error) { toast.error('Erro'); return; }
    updateProject({ ...p, is_active: newActive });
    toast.success(newActive ? 'Projeto reativado' : 'Projeto arquivado');
  };

  const handleSaveTx = async () => {
    if (!selectedProject) return;
    const amount = parseFloat(txAmount.replace(',', '.'));
    if (!amount || amount <= 0) { toast.error('Valor inválido'); return; }
    if (!txDesc.trim()) { toast.error('Informe a descrição'); return; }

    const { data, error } = await supabase
      .from('financial_project_transactions')
      .insert({
        user_id: userId,
        project_id: selectedProject.id,
        type: txType,
        amount,
        description: txDesc.trim(),
        date: txDate,
        category: txCategory,
      } as any)
      .select()
      .single();
    if (error || !data) { toast.error('Erro ao salvar'); return; }
    addProjectTransaction(data as any);

    // Mirror is now handled automatically by DB trigger (mirror_project_tx_on_insert)
    // Refetch to get the mirrored transaction in the local store
    const { data: latestTx } = await supabase
      .from('financial_transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('notes', `Espelho automático de projeto (ID: ${(data as any).id})`)
      .maybeSingle();
    if (latestTx) {
      addTransaction(latestTx as any);
    }

    toast.success(txType === 'expense' ? 'Investimento registrado' : 'Retorno registrado');
    setShowNewTx(false);
    resetTxForm();
  };

  const handleDeleteTx = async (tx: ProjectTransaction) => {
    const { error } = await supabase.from('financial_project_transactions').delete().eq('id', tx.id);
    if (error) { toast.error('Erro'); return; }
    removeProjectTransaction(tx.id);
    toast.success('Removido');
  };

  // ─── Detail view of a selected project ───
  if (selectedProject) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedProject(null)} className="p-2 rounded-lg hover:bg-accent transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-foreground">{selectedProject.name}</h2>
            {selectedProject.description && (
              <p className="text-xs text-muted-foreground">{selectedProject.description}</p>
            )}
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="border-red-500/20">
            <CardContent className="p-3 text-center">
              <ArrowDownCircle className="w-4 h-4 text-red-400 mx-auto mb-1" />
              <p className="text-[10px] text-muted-foreground">Investido</p>
              <p className="text-sm font-bold text-red-400">{fmt(projectTotals.invested)}</p>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/20">
            <CardContent className="p-3 text-center">
              <ArrowUpCircle className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <p className="text-[10px] text-muted-foreground">Retorno</p>
              <p className="text-sm font-bold text-emerald-400">{fmt(projectTotals.returned)}</p>
            </CardContent>
          </Card>
          <Card className={`border-${projectTotals.balance >= 0 ? 'emerald' : 'red'}-500/20`}>
            <CardContent className="p-3 text-center">
              {projectTotals.balance >= 0 ? (
                <TrendingUp className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400 mx-auto mb-1" />
              )}
              <p className="text-[10px] text-muted-foreground">Saldo</p>
              <p className={`text-sm font-bold ${projectTotals.balance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {fmt(projectTotals.balance)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => guardAction(() => { setTxType('expense'); setShowNewTx(true); })}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-600/20 text-red-400 text-sm font-medium hover:bg-red-600/30 transition-colors"
          >
            <ArrowDownCircle className="w-4 h-4" /> Investir
          </button>
          <button
            onClick={() => guardAction(() => { setTxType('income'); setShowNewTx(true); })}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600/20 text-emerald-400 text-sm font-medium hover:bg-emerald-600/30 transition-colors"
          >
            <ArrowUpCircle className="w-4 h-4" /> Retorno
          </button>
        </div>

        {/* Transactions list */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Movimentações</h3>
          {projectTxs.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-6">Nenhuma movimentação registrada</p>
          )}
          {projectTxs.map((tx) => (
            <Card key={tx.id}>
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  {tx.type === 'expense' ? (
                    <ArrowDownCircle className="w-4 h-4 text-red-400 shrink-0" />
                  ) : (
                    <ArrowUpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                    <p className="text-[10px] text-muted-foreground">{new Date(tx.date + 'T12:00:00').toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${tx.type === 'expense' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {tx.type === 'expense' ? '−' : '+'} {fmt(Number(tx.amount))}
                  </span>
                  <button onClick={() => handleDeleteTx(tx)} className="p-1 rounded hover:bg-accent">
                    <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Transaction Modal */}
        <Dialog open={showNewTx} onOpenChange={setShowNewTx}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{txType === 'expense' ? 'Registrar Investimento' : 'Registrar Retorno'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Descrição</Label>
                <Input value={txDesc} onChange={(e) => setTxDesc(e.target.value)} placeholder="Ex: Compra de insumos" />
              </div>
              <div>
                <Label>Valor (R$)</Label>
                <Input value={txAmount} onChange={(e) => setTxAmount(e.target.value)} placeholder="0,00" inputMode="decimal" />
              </div>
              <div>
                <Label>Data</Label>
                <Input type="date" value={txDate} onChange={(e) => setTxDate(e.target.value)} />
              </div>
              <div>
                <Label>Categoria</Label>
                <Select value={txCategory} onValueChange={setTxCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investimento">Investimento</SelectItem>
                    <SelectItem value="material">Material</SelectItem>
                    <SelectItem value="equipamento">Equipamento</SelectItem>
                    <SelectItem value="mão de obra">Mão de obra</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="vendas">Vendas</SelectItem>
                    <SelectItem value="serviço">Serviço</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <button
                onClick={handleSaveTx}
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Salvar
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ─── Projects list view ───
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Projetos</h2>
          <p className="text-xs text-muted-foreground">Acompanhe investimentos e retornos por projeto</p>
        </div>
        <button
          onClick={() => guardAction(() => { resetProjectForm(); setEditingProject(null); setShowNewProject(true); })}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Novo Projeto
        </button>
      </div>

      {/* Active projects */}
      {activeProjects.length === 0 && inactiveProjects.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderKanban className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Nenhum projeto criado ainda</p>
            <p className="text-xs text-muted-foreground mt-1">Crie um projeto para acompanhar seus investimentos</p>
          </CardContent>
        </Card>
      )}

      {activeProjects.map((p) => {
        const txs = projectTransactions.filter((t) => t.project_id === p.id);
        const invested = txs.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
        const returned = txs.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
        const balance = returned - invested;

        return (
          <Card key={p.id} className="cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelectedProject(p)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FolderKanban className="w-4 h-4 text-primary shrink-0" />
                  <h3 className="text-sm font-semibold text-foreground truncate">{p.name}</h3>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); guardAction(() => { setPName(p.name); setPDesc(p.description || ''); setEditingProject(p); setShowNewProject(true); }); }}
                    className="p-1.5 rounded hover:bg-accent"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); guardAction(() => handleToggleActive(p)); }}
                    className="p-1.5 rounded hover:bg-accent text-xs text-muted-foreground"
                    title="Arquivar"
                  >
                    Arquivar
                  </button>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              {p.description && <p className="text-[10px] text-muted-foreground mb-2 truncate">{p.description}</p>}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground">Investido</p>
                  <p className="text-xs font-bold text-red-400">{fmt(invested)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Retorno</p>
                  <p className="text-xs font-bold text-emerald-400">{fmt(returned)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Saldo</p>
                  <p className={`text-xs font-bold ${balance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{fmt(balance)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Archived projects */}
      {inactiveProjects.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Arquivados</h3>
          {inactiveProjects.map((p) => (
            <Card key={p.id} className="opacity-60 mb-2">
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <FolderKanban className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground truncate">{p.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => guardAction(() => handleToggleActive(p))}
                    className="px-2 py-1 rounded text-[10px] text-primary hover:bg-accent"
                  >
                    Reativar
                  </button>
                  <button
                    onClick={() => guardAction(() => handleDeleteProject(p))}
                    className="p-1.5 rounded hover:bg-accent"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* New/Edit Project Modal */}
      <Dialog open={showNewProject} onOpenChange={(o) => { setShowNewProject(o); if (!o) setEditingProject(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Editar Projeto' : 'Novo Projeto'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nome do Projeto</Label>
              <Input value={pName} onChange={(e) => setPName(e.target.value)} placeholder="Ex: Sorveteria" />
            </div>
            <div>
              <Label>Descrição (opcional)</Label>
              <Input value={pDesc} onChange={(e) => setPDesc(e.target.value)} placeholder="Descrição breve" />
            </div>
            <button
              onClick={handleSaveProject}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              {editingProject ? 'Salvar Alterações' : 'Criar Projeto'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
