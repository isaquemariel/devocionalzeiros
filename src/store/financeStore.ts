import { create } from 'zustand';

export type SectionKey = 'overview' | 'transactions' | 'subscriptions' | 'installments' | 'fixedcosts' | 'reports' | 'budget' | 'recurring' | 'projects';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;
  is_recurring: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  billing_cycle: string;
  next_billing_date?: string;
  category: string;
  is_active: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Installment {
  id: string;
  user_id: string;
  description: string;
  total_amount: number;
  installment_amount: number;
  total_installments: number;
  paid_installments: number;
  start_date: string;
  category: string;
  is_active: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface FixedCost {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  due_day?: number;
  category: string;
  is_active: boolean;
  notes?: string;
  last_paid_date?: string | null;
  next_payment_date?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Budget {
  id: string;
  user_id: string;
  category: string;
  budget_amount: number;
  month_year: string;
  created_at: string;
  updated_at: string;
}

export interface RecurringItem {
  id: string;
  user_id: string;
  type: TransactionType;
  description: string;
  amount: number;
  frequency: string;
  category: string;
  is_active: boolean;
  next_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  total_invested: number;
  total_return: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectTransaction {
  id: string;
  user_id: string;
  project_id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  category: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface FinanceStore {
  activeSection: SectionKey;
  setActiveSection: (section: SectionKey) => void;
  transactions: Transaction[];
  subscriptions: Subscription[];
  installments: Installment[];
  fixedCosts: FixedCost[];
  budgets: Budget[];
  recurring: RecurringItem[];
  projects: Project[];
  projectTransactions: ProjectTransaction[];
  loaded: boolean;
  setTransactions: (t: Transaction[]) => void;
  setSubscriptions: (s: Subscription[]) => void;
  setInstallments: (i: Installment[]) => void;
  setFixedCosts: (f: FixedCost[]) => void;
  setBudgets: (b: Budget[]) => void;
  setRecurring: (r: RecurringItem[]) => void;
  setProjects: (p: Project[]) => void;
  setProjectTransactions: (pt: ProjectTransaction[]) => void;
  setLoaded: (l: boolean) => void;
  addTransaction: (t: Transaction) => void;
  removeTransaction: (id: string) => void;
  updateTransaction: (t: Transaction) => void;
  addSubscription: (s: Subscription) => void;
  removeSubscription: (id: string) => void;
  updateSubscription: (s: Subscription) => void;
  addInstallment: (i: Installment) => void;
  removeInstallment: (id: string) => void;
  updateInstallment: (i: Installment) => void;
  addFixedCost: (f: FixedCost) => void;
  removeFixedCost: (id: string) => void;
  updateFixedCost: (f: FixedCost) => void;
  addBudget: (b: Budget) => void;
  removeBudget: (id: string) => void;
  updateBudget: (b: Budget) => void;
  addRecurring: (r: RecurringItem) => void;
  removeRecurring: (id: string) => void;
  updateRecurring: (r: RecurringItem) => void;
  addProject: (p: Project) => void;
  removeProject: (id: string) => void;
  updateProject: (p: Project) => void;
  addProjectTransaction: (pt: ProjectTransaction) => void;
  removeProjectTransaction: (id: string) => void;
  updateProjectTransaction: (pt: ProjectTransaction) => void;
}

export const useFinanceStore = create<FinanceStore>((set) => ({
  activeSection: 'overview',
  setActiveSection: (section) => set({ activeSection: section }),
  transactions: [],
  subscriptions: [],
  installments: [],
  fixedCosts: [],
  budgets: [],
  recurring: [],
  projects: [],
  projectTransactions: [],
  loaded: false,
  setTransactions: (t) => set({ transactions: t }),
  setSubscriptions: (s) => set({ subscriptions: s }),
  setInstallments: (i) => set({ installments: i }),
  setFixedCosts: (f) => set({ fixedCosts: f }),
  setBudgets: (b) => set({ budgets: b }),
  setRecurring: (r) => set({ recurring: r }),
  setProjects: (p) => set({ projects: p }),
  setProjectTransactions: (pt) => set({ projectTransactions: pt }),
  setLoaded: (l) => set({ loaded: l }),
  addTransaction: (t) => set((s) => ({ transactions: [t, ...s.transactions] })),
  removeTransaction: (id) => set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) })),
  updateTransaction: (t) => set((s) => ({ transactions: s.transactions.map((x) => x.id === t.id ? t : x) })),
  addSubscription: (sub) => set((s) => ({ subscriptions: [sub, ...s.subscriptions] })),
  removeSubscription: (id) => set((s) => ({ subscriptions: s.subscriptions.filter((x) => x.id !== id) })),
  updateSubscription: (sub) => set((s) => ({ subscriptions: s.subscriptions.map((x) => x.id === sub.id ? sub : x) })),
  addInstallment: (i) => set((s) => ({ installments: [i, ...s.installments] })),
  removeInstallment: (id) => set((s) => ({ installments: s.installments.filter((x) => x.id !== id) })),
  updateInstallment: (i) => set((s) => ({ installments: s.installments.map((x) => x.id === i.id ? i : x) })),
  addFixedCost: (f) => set((s) => ({ fixedCosts: [f, ...s.fixedCosts] })),
  removeFixedCost: (id) => set((s) => ({ fixedCosts: s.fixedCosts.filter((x) => x.id !== id) })),
  updateFixedCost: (f) => set((s) => ({ fixedCosts: s.fixedCosts.map((x) => x.id === f.id ? f : x) })),
  addBudget: (b) => set((s) => ({ budgets: [b, ...s.budgets] })),
  removeBudget: (id) => set((s) => ({ budgets: s.budgets.filter((x) => x.id !== id) })),
  updateBudget: (b) => set((s) => ({ budgets: s.budgets.map((x) => x.id === b.id ? b : x) })),
  addRecurring: (r) => set((s) => ({ recurring: [r, ...s.recurring] })),
  removeRecurring: (id) => set((s) => ({ recurring: s.recurring.filter((x) => x.id !== id) })),
  updateRecurring: (r) => set((s) => ({ recurring: s.recurring.map((x) => x.id === r.id ? r : x) })),
  addProject: (p) => set((s) => ({ projects: [p, ...s.projects] })),
  removeProject: (id) => set((s) => ({ projects: s.projects.filter((x) => x.id !== id) })),
  updateProject: (p) => set((s) => ({ projects: s.projects.map((x) => x.id === p.id ? p : x) })),
  addProjectTransaction: (pt) => set((s) => ({ projectTransactions: [pt, ...s.projectTransactions] })),
  removeProjectTransaction: (id) => set((s) => ({ projectTransactions: s.projectTransactions.filter((x) => x.id !== id) })),
  updateProjectTransaction: (pt) => set((s) => ({ projectTransactions: s.projectTransactions.map((x) => x.id === pt.id ? pt : x) })),
}));

export const CATEGORIES = [
  'alimentação', 'transporte', 'moradia', 'saúde', 'educação', 'lazer',
  'vestuário', 'tecnologia', 'dízimo', 'oferta', 'salário', 'freelance',
  'investimento', 'presente', 'outros'
] as const;
