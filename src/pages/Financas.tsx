import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserPlan } from '@/hooks/useUserPlan';
import { useFinanceStore } from '@/store/financeStore';
import { useFinanceSync } from '@/hooks/useFinanceSync';
import { FinanceSidebar } from '@/components/financas/FinanceSidebar';
import { TransactionModal } from '@/components/financas/TransactionModal';
import { OverviewSection } from '@/components/financas/sections/OverviewSection';
import { TransactionsSection } from '@/components/financas/sections/TransactionsSection';
import { SubscriptionsSection } from '@/components/financas/sections/SubscriptionsSection';
import { InstallmentsSection } from '@/components/financas/sections/InstallmentsSection';
import { FixedCostsSection } from '@/components/financas/sections/FixedCostsSection';
import { ReportsSection } from '@/components/financas/sections/ReportsSection';
import { BudgetSection } from '@/components/financas/sections/BudgetSection';
import { RecurringSection } from '@/components/financas/sections/RecurringSection';
import { SettingsDialog } from '@/components/settings/SettingsDialog';
import { Menu, Plus, ArrowLeft, Settings } from 'lucide-react';

const Financas = () => {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id;
  const userEmail = user?.email;
  const { planType, loading: planLoading } = useUserPlan(userEmail || null);
  const navigate = useNavigate();
  const { activeSection, loaded } = useFinanceStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'income' | 'expense'>('expense');
  const [settingsOpen, setSettingsOpen] = useState(false);

  useFinanceSync(userId);

  useEffect(() => {
    if (!authLoading && !userId) {
      navigate('/auth');
    }
  }, [authLoading, userId, navigate]);

  useEffect(() => {
    if (!planLoading && planType) {
      const allowed = ['gold', 'premium', 'embaixador', 'admin'];
      if (!allowed.includes(planType)) {
        navigate('/home');
      }
    }
  }, [planLoading, planType, navigate]);

  if (authLoading || planLoading || !loaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="font-display font-bold text-2xl text-foreground tracking-tight mb-2">
            Devocionalzeiros <span className="text-primary">Finanças</span>
          </div>
          <div className="text-sm text-muted-foreground">Carregando seus dados...</div>
        </div>
      </div>
    );
  }

  if (!userId) return null;

  const openModal = (type: 'income' | 'expense') => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background overflow-x-hidden">
      {/* Compact app header — always visible */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border/30 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-lg hover:bg-muted/20 transition-colors"
            title="Voltar"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <span className="font-display font-bold text-base text-foreground tracking-tight">
            <span className="text-primary">Finanças</span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => openModal('expense')}
            className="px-2.5 py-1 bg-red-600/20 text-red-400 rounded-lg text-xs font-medium hover:bg-red-600/30 transition-colors lg:hidden"
          >
            − Saída
          </button>
          <button
            onClick={() => openModal('income')}
            className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors lg:hidden"
          >
            + Entrada
          </button>
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2 rounded-lg hover:bg-muted/20 transition-colors"
            title="Configurações"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Body with sidebar */}
      <div className="flex flex-1 min-h-0">
        <FinanceSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0 w-full">
          {/* Mobile section nav */}
          <div className="sticky top-[49px] z-30 bg-card border-b border-border px-4 py-2 flex items-center gap-3 lg:hidden">
            <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-foreground">
              <Menu className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-muted-foreground capitalize">
              {activeSection === 'overview' ? 'Visão Geral' :
               activeSection === 'transactions' ? 'Transações' :
               activeSection === 'subscriptions' ? 'Assinaturas' :
               activeSection === 'installments' ? 'Parcelas' :
               activeSection === 'fixedcosts' ? 'Custos Fixos' :
               activeSection === 'budget' ? 'Orçamento' :
               activeSection === 'recurring' ? 'Recorrentes' :
               'Relatórios'}
            </span>
          </div>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24">
            {activeSection === 'overview' && <OverviewSection />}
            {activeSection === 'transactions' && <TransactionsSection />}
            {activeSection === 'subscriptions' && <SubscriptionsSection userId={userId} />}
            {activeSection === 'installments' && <InstallmentsSection userId={userId} />}
            {activeSection === 'fixedcosts' && <FixedCostsSection userId={userId} />}
            {activeSection === 'reports' && <ReportsSection />}
            {activeSection === 'budget' && <BudgetSection userId={userId} />}
            {activeSection === 'recurring' && <RecurringSection userId={userId} />}
          </main>

          {/* Quick add buttons - desktop only */}
          <div className="fixed bottom-6 right-6 flex-col gap-2 z-50 hidden lg:flex">
            <button
              onClick={() => openModal('expense')}
              className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform text-lg font-light"
              title="Nova Saída"
            >
              −
            </button>
            <button
              onClick={() => openModal('income')}
              className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              title="Nova Entrada"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <TransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        userId={userId}
        defaultType={modalType}
      />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default Financas;
