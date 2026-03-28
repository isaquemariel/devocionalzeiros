import { useFinanceStore, SectionKey } from '@/store/financeStore';
import { 
  LayoutDashboard, ArrowLeftRight, CreditCard, CalendarClock,
  Landmark, BarChart3, PiggyBank, RefreshCw, ArrowLeft, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MENU_ITEMS: { key: SectionKey; label: string; icon: React.ElementType }[] = [
  { key: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
  { key: 'transactions', label: 'Transações', icon: ArrowLeftRight },
  { key: 'subscriptions', label: 'Assinaturas', icon: CreditCard },
  { key: 'installments', label: 'Parcelas', icon: CalendarClock },
  { key: 'fixedcosts', label: 'Custos Fixos', icon: Landmark },
  { key: 'budget', label: 'Orçamento', icon: PiggyBank },
  { key: 'recurring', label: 'Recorrentes', icon: RefreshCw },
  { key: 'reports', label: 'Relatórios', icon: BarChart3 },
];

interface FinanceSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function FinanceSidebar({ open, onClose }: FinanceSidebarProps) {
  const { activeSection, setActiveSection } = useFinanceStore();
  const navigate = useNavigate();

  const handleSelect = (key: SectionKey) => {
    setActiveSection(key);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 
        bg-card border-r border-border flex flex-col
        transition-transform duration-300
        lg:sticky lg:translate-x-0
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-foreground tracking-tight">
              Devocionalzeiros <span className="text-primary">Finanças</span>
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-accent">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {MENU_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${activeSection === key
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        {/* Back to app */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => navigate('/home')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao App
          </button>
        </div>
      </aside>
    </>
  );
}
