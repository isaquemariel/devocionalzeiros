import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useUserPlan } from "@/hooks/useUserPlan";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import {
  ArrowLeft,
  Users,
  Crown,
  TrendingUp,
  BookOpen,
  MessageSquare,
  Calendar,
  Loader2,
  Plus,
  Edit,
  Shield,
  Activity,
  Download,
  RefreshCw,
  DollarSign,
  CreditCard,
  Receipt,
  Banknote,
  Eye,
  Phone,
  IdCard,
  Mail,
  CalendarDays,
  Trophy,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import jsPDF from "jspdf";

interface UserData {
  user_id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  plan_type: string;
  plan_status: string;
  total_points: number;
  active_days: number;
  inactive_days: number;
  phone: string | null;
  cpf: string | null;
  whatsapp_phone: string | null;
  referral_source: string | null;
}

interface Metrics {
  total_users: number;
  active_users: number;
  start_plans: number;
  gold_plans: number;
  premium_plans: number;
  total_logins_today: number;
  total_logins_week: number;
  avg_daily_logins: number;
  total_chapters_read: number;
  total_quiz_attempts: number;
  total_devotionals_completed: number;
  gratuito_users: number;
  embaixador_plans: number;
}

interface LoginHistory {
  login_date: string;
  login_count: number;
}

interface MetricsHistory {
  snapshot_date: string;
  total_users: number;
  active_users: number;
  total_chapters_read: number;
  total_quiz_attempts: number;
  total_devotionals_completed: number;
}

interface RevenueMetrics {
  total_revenue: number;
  avg_ticket: number;
  pix_count: number;
  pix_revenue: number;
  card_count: number;
  card_revenue: number;
  boleto_count: number;
  boleto_revenue: number;
  other_count: number;
  other_revenue: number;
}

interface RevenueHistory {
  sale_date: string;
  daily_revenue: number;
  sale_count: number;
}

interface ReferralMetrics {
  referral_source: string;
  user_count: number;
}

const PLAN_COLORS = {
  start: "#10b981", // emerald for paid start
  gold: "#f59e0b",
  premium: "#a855f7",
  embaixador: "#ec4899",
  gratuito: "#6b7280", // gray for free users
  none: "#6b7280",
};

const PERIOD_OPTIONS = [
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 90 dias" },
];

const AdminHD = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const { planType, loading: planLoading } = useUserPlan(user?.email);
  
  // Admin access: either has admin role OR has 'admin' plan type
  const hasAdminAccess = isAdmin || planType === 'admin';
  const accessCheckComplete = !adminLoading && !planLoading;

  const [users, setUsers] = useState<UserData[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [metricsHistory, setMetricsHistory] = useState<MetricsHistory[]>([]);
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics | null>(null);
  const [revenueHistory, setRevenueHistory] = useState<RevenueHistory[]>([]);
  const [referralMetrics, setReferralMetrics] = useState<ReferralMetrics[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [filterReferral, setFilterReferral] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [periodDays, setPeriodDays] = useState("30");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [exportingPdf, setExportingPdf] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Manual sale modal
  const [manualSaleOpen, setManualSaleOpen] = useState(false);
  const [saleCustomerName, setSaleCustomerName] = useState("");
  const [saleCustomerEmail, setSaleCustomerEmail] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [salePaymentMethod, setSalePaymentMethod] = useState("pix");
  const [salePlanType, setSalePlanType] = useState("start");
  const [saleNotes, setSaleNotes] = useState("");
  const [addingSale, setAddingSale] = useState(false);

  // Add email modal
  const [addEmailOpen, setAddEmailOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPlan, setNewPlan] = useState("start");
  const [addingEmail, setAddingEmail] = useState(false);

  // View user modal
  const [viewingUser, setViewingUser] = useState<UserData | null>(null);

  // Edit user modal
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  // Bulk selection
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  const [editPlan, setEditPlan] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCpf, setEditCpf] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // Real-time update interval
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (accessCheckComplete && !hasAdminAccess && !authLoading) {
      toast.error("Acesso negado. Apenas administradores.");
      navigate("/home");
    }
  }, [hasAdminAccess, accessCheckComplete, authLoading, navigate]);

  const fetchAllData = useCallback(async (showLoading = true) => {
    if (showLoading) setLoadingData(true);
    try {
      const days = parseInt(periodDays);
      const [usersRes, metricsRes, historyRes, metricsHistoryRes, revenueRes, revenueHistoryRes] = await Promise.all([
        supabase.rpc("admin_get_all_users"),
        supabase.rpc("admin_get_metrics"),
        supabase.rpc("admin_get_login_history", { days_back: days }),
        supabase.rpc("admin_get_metrics_history", { days_back: days }),
        supabase.rpc("admin_get_revenue_metrics", { days_back: days }),
        supabase.rpc("admin_get_revenue_history", { days_back: days }),
      ]);
      
      // Fetch referral metrics separately as it's a new function
      const referralRes = await supabase.rpc("admin_get_referral_metrics" as any);

      if (usersRes.error) throw usersRes.error;
      if (metricsRes.error) throw metricsRes.error;
      if (historyRes.error) throw historyRes.error;

      setUsers(usersRes.data || []);
      setMetrics(metricsRes.data?.[0] || null);
      setLoginHistory(historyRes.data || []);
      setMetricsHistory(metricsHistoryRes.data || []);
      setRevenueMetrics(revenueRes.data?.[0] || null);
      setRevenueHistory(revenueHistoryRes.data || []);
      setReferralMetrics((referralRes.data as ReferralMetrics[]) || []);
      setLastUpdate(new Date());
    } catch (error: any) {
      console.error("Error fetching admin data:", error);
      if (showLoading) toast.error("Erro ao carregar dados");
    } finally {
      if (showLoading) setLoadingData(false);
    }
  }, [periodDays]);

  useEffect(() => {
    if (hasAdminAccess) {
      fetchAllData();
    }
  }, [hasAdminAccess, fetchAllData]);

  // Real-time updates every 30 seconds
  useEffect(() => {
    if (hasAdminAccess) {
      intervalRef.current = setInterval(() => {
        fetchAllData(false);
      }, 30000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [hasAdminAccess, fetchAllData]);

  const handleExportUsersPdf = () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Header
      pdf.setFontSize(18);
      pdf.setTextColor(33, 33, 33);
      pdf.text("Relatório de Usuários", pageWidth / 2, 20, { align: "center" });
      
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, pageWidth / 2, 28, { align: "center" });
      pdf.text(`Total: ${users.length} usuários`, pageWidth / 2, 34, { align: "center" });
      
      let yPos = 50;
      
      // Table header
      pdf.setFontSize(7);
      pdf.setFillColor(240, 240, 240);
      pdf.rect(10, yPos - 4, pageWidth - 20, 7, "F");
      pdf.setTextColor(33, 33, 33);
      pdf.text("Nome", 12, yPos);
      pdf.text("Email", 38, yPos);
      pdf.text("WhatsApp", 80, yPos);
      pdf.text("Origem", 110, yPos);
      pdf.text("Plano", 140, yPos);
      pdf.text("Status", 160, yPos);
      pdf.text("Cadastro", 180, yPos);
      
      yPos += 8;
      pdf.setTextColor(66, 66, 66);
      
      const referralLabels: { [key: string]: string } = {
        instagram: "Instagram",
        threads: "Threads",
        tiktok: "TikTok",
        kwai: "Kwai",
        anuncios: "Anúncios",
        indicacao: "Indicação",
      };
      
      // Table rows
      users.forEach((u) => {
        if (yPos > 280) {
          pdf.addPage();
          yPos = 20;
          // Repeat header on new page
          pdf.setFillColor(240, 240, 240);
          pdf.rect(10, yPos - 4, pageWidth - 20, 7, "F");
          pdf.setTextColor(33, 33, 33);
          pdf.text("Nome", 12, yPos);
          pdf.text("Email", 38, yPos);
          pdf.text("WhatsApp", 80, yPos);
          pdf.text("Origem", 110, yPos);
          pdf.text("Plano", 140, yPos);
          pdf.text("Status", 160, yPos);
          pdf.text("Cadastro", 180, yPos);
          yPos += 8;
          pdf.setTextColor(66, 66, 66);
        }
        
        const name = (u.full_name || "Sem nome").substring(0, 14);
        const email = u.email.substring(0, 22);
        const whatsapp = (u.whatsapp_phone || u.phone || "-").substring(0, 14);
        const origem = referralLabels[(u as any).referral_source] || (u as any).referral_source || "-";
        const plan = u.plan_type || "start";
        const status = u.plan_status === "active" ? "Ativo" : "Inativo";
        const cadastro = u.created_at ? format(new Date(u.created_at), "dd/MM/yy", { locale: ptBR }) : "-";
        
        pdf.text(name, 12, yPos);
        pdf.text(email, 38, yPos);
        pdf.text(whatsapp, 80, yPos);
        pdf.text(origem.substring(0, 12), 110, yPos);
        pdf.text(plan, 140, yPos);
        pdf.text(status, 160, yPos);
        pdf.text(cadastro, 180, yPos);
        
        yPos += 5;
      });
      
      // Footer with page numbers
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Página ${i} de ${pageCount}`, pageWidth / 2, 290, { align: "center" });
      }
      
      pdf.save(`usuarios-${format(new Date(), "yyyy-MM-dd")}.pdf`);
      toast.success(`Relatório com ${users.length} usuários exportado!`);
    } catch (error) {
      console.error("Error exporting users PDF:", error);
      toast.error("Erro ao exportar relatório");
    }
  };

  const handleExportPdf = async () => {
    setExportingPdf(true);
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Header
      pdf.setFontSize(20);
      pdf.setTextColor(33, 33, 33);
      pdf.text("Relatório Administrativo", pageWidth / 2, 20, { align: "center" });
      
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, pageWidth / 2, 28, { align: "center" });
      pdf.text(`Período: ${PERIOD_OPTIONS.find(p => p.value === periodDays)?.label}`, pageWidth / 2, 34, { align: "center" });
      
      // Metrics Section
      let yPos = 50;
      pdf.setFontSize(14);
      pdf.setTextColor(33, 33, 33);
      pdf.text("Métricas Gerais", 20, yPos);
      
      yPos += 10;
      pdf.setFontSize(10);
      pdf.setTextColor(66, 66, 66);
      
      const metricsData = [
        ["Total de Usuários", metrics?.total_users?.toString() || "0"],
        ["Usuários Ativos", metrics?.active_users?.toString() || "0"],
        ["Planos Start", metrics?.start_plans?.toString() || "0"],
        ["Planos Gold", metrics?.gold_plans?.toString() || "0"],
        ["Planos Premium", metrics?.premium_plans?.toString() || "0"],
        ["Logins Hoje", metrics?.total_logins_today?.toString() || "0"],
        ["Logins na Semana", metrics?.total_logins_week?.toString() || "0"],
        ["Média Diária (30d)", Number(metrics?.avg_daily_logins || 0).toFixed(1)],
        ["Capítulos Lidos", metrics?.total_chapters_read?.toString() || "0"],
        ["Quiz Respondidos", metrics?.total_quiz_attempts?.toString() || "0"],
        ["Devocionais Feitos", metrics?.total_devotionals_completed?.toString() || "0"],
      ];
      
      metricsData.forEach(([label, value]) => {
        pdf.text(`${label}: ${value}`, 25, yPos);
        yPos += 6;
      });
      
      // Referral Sources Section
      if (referralMetrics.length > 0) {
        yPos += 10;
        pdf.setFontSize(14);
        pdf.setTextColor(33, 33, 33);
        pdf.text("Fontes de Captação", 20, yPos);
        
        yPos += 10;
        pdf.setFontSize(10);
        pdf.setTextColor(66, 66, 66);
        
        const referralLabels: { [key: string]: string } = {
          instagram: "Instagram",
          threads: "Threads",
          tiktok: "TikTok",
          kwai: "Kwai",
          anuncios: "Anúncios",
          indicacao: "Indicação",
          "não informado": "Não informado",
        };
        
        referralMetrics.forEach((r) => {
          const label = referralLabels[r.referral_source] || r.referral_source;
          pdf.text(`${label}: ${r.user_count} usuários`, 25, yPos);
          yPos += 6;
        });
      }
      
      // Users Summary
      yPos += 10;
      pdf.setFontSize(14);
      pdf.setTextColor(33, 33, 33);
      pdf.text("Resumo de Usuários", 20, yPos);
      
      yPos += 10;
      pdf.setFontSize(9);
      pdf.setTextColor(66, 66, 66);
      
      // Table header
      pdf.setFillColor(240, 240, 240);
      pdf.rect(20, yPos - 4, pageWidth - 40, 7, "F");
      pdf.text("Nome", 22, yPos);
      pdf.text("Email", 60, yPos);
      pdf.text("Plano", 120, yPos);
      pdf.text("Status", 145, yPos);
      pdf.text("Pontos", 170, yPos);
      
      yPos += 8;
      
      // Table rows (max 20 users per page)
      const maxUsersPerPage = 20;
      const usersToShow = users.slice(0, maxUsersPerPage);
      
      usersToShow.forEach((u) => {
        if (yPos > 270) {
          pdf.addPage();
          yPos = 20;
        }
        
        const name = (u.full_name || "Sem nome").substring(0, 15);
        const email = u.email.substring(0, 25);
        
        pdf.text(name, 22, yPos);
        pdf.text(email, 60, yPos);
        pdf.text(u.plan_type || "none", 120, yPos);
        pdf.text(u.plan_status === "active" ? "Ativo" : "Inativo", 145, yPos);
        pdf.text(u.total_points.toString(), 170, yPos);
        
        yPos += 6;
      });
      
      if (users.length > maxUsersPerPage) {
        yPos += 5;
        pdf.setTextColor(100, 100, 100);
        pdf.text(`... e mais ${users.length - maxUsersPerPage} usuários`, 22, yPos);
      }
      
      // Footer
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Página ${i} de ${pageCount}`, pageWidth / 2, 290, { align: "center" });
      }
      
      pdf.save(`relatorio-admin-${format(new Date(), "yyyy-MM-dd")}.pdf`);
      toast.success("Relatório PDF exportado com sucesso!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Erro ao exportar PDF");
    } finally {
      setExportingPdf(false);
    }
  };

  const handleAddEmail = async () => {
    if (!newEmail.trim()) {
      toast.error("Digite um e-mail válido");
      return;
    }

    setAddingEmail(true);
    try {
      const { error } = await supabase.rpc("admin_add_authorized_email", {
        target_email: newEmail.trim(),
        plan: newPlan,
      });

      if (error) throw error;

      toast.success("E-mail autorizado com sucesso!");
      setNewEmail("");
      setNewPlan("start");
      setAddEmailOpen(false);
      fetchAllData();
    } catch (error: any) {
      console.error("Error adding email:", error);
      toast.error(error.message || "Erro ao adicionar e-mail");
    } finally {
      setAddingEmail(false);
    }
  };

  const openEditModal = (userData: UserData) => {
    setEditingUser(userData);
    setEditPlan(userData.plan_type || "start");
    setEditStatus(userData.plan_status || "active");
    setEditPhone(userData.phone || "");
    setEditCpf(userData.cpf || "");
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    setSavingEdit(true);
    try {
      // Update plan and status
      const { error } = await supabase.rpc("admin_update_user_plan", {
        target_email: editingUser.email,
        new_plan_type: editPlan,
        new_status: editStatus,
      });

      if (error) throw error;

      // Update phone and CPF if changed
      if (editingUser.user_id && (editPhone !== editingUser.phone || editCpf !== editingUser.cpf)) {
        const { error: apError } = await supabase
          .from("authorized_purchases")
          .update({ 
            phone: editPhone || null, 
            cpf: editCpf || null,
            updated_at: new Date().toISOString()
          })
          .eq("user_id", editingUser.user_id);

        if (apError) console.error("Error updating phone/cpf:", apError);
      }

      toast.success("Usuário atualizado com sucesso!");
      setEditingUser(null);
      fetchAllData();
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast.error(error.message || "Erro ao atualizar usuário");
    } finally {
      setSavingEdit(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Handle plan filter - START includes both free users and paid start
    let matchesPlan = false;
    if (filterPlan === "all") {
      matchesPlan = true;
    } else if (filterPlan === "start") {
      // START = all START users (free or paid)
      matchesPlan = !u.plan_type || u.plan_type === "" || u.plan_type === "none" || u.plan_type === "start";
    } else if (filterPlan === "none") {
      matchesPlan = !u.plan_type || u.plan_type === "" || u.plan_type === "none";
    } else {
      matchesPlan = u.plan_type === filterPlan;
    }
    
    const matchesStatus = filterStatus === "all" || u.plan_status === filterStatus;
    const matchesReferral = filterReferral === "all" || 
      (filterReferral === "none" ? !u.referral_source : u.referral_source === filterReferral);
    return matchesSearch && matchesPlan && matchesStatus && matchesReferral;
  });

  // Bulk selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUserIds(new Set(paginatedUsers.map(u => u.user_id)));
    } else {
      setSelectedUserIds(new Set());
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    const newSelected = new Set(selectedUserIds);
    if (checked) {
      newSelected.add(userId);
    } else {
      newSelected.delete(userId);
    }
    setSelectedUserIds(newSelected);
  };

  const handleBulkStatusChange = async (newStatus: string) => {
    if (selectedUserIds.size === 0) {
      toast.error("Selecione pelo menos um usuário");
      return;
    }
    
    setBulkActionLoading(true);
    try {
      let successCount = 0;
      for (const userId of selectedUserIds) {
        const userData = users.find(u => u.user_id === userId);
        if (userData) {
          const { error } = await supabase.rpc("admin_update_user_plan", {
            target_email: userData.email,
            new_plan_type: userData.plan_type || "start",
            new_status: newStatus,
          });
          if (!error) successCount++;
        }
      }
      toast.success(`${successCount} usuário(s) atualizado(s)`);
      setSelectedUserIds(new Set());
      fetchAllData(false);
    } catch (error: any) {
      console.error("Bulk status update error:", error);
      toast.error("Erro ao atualizar usuários");
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleBulkPlanChange = async (newPlan: string) => {
    if (selectedUserIds.size === 0) {
      toast.error("Selecione pelo menos um usuário");
      return;
    }
    
    setBulkActionLoading(true);
    try {
      let successCount = 0;
      for (const userId of selectedUserIds) {
        const userData = users.find(u => u.user_id === userId);
        if (userData) {
          const { error } = await supabase.rpc("admin_update_user_plan", {
            target_email: userData.email,
            new_plan_type: newPlan,
            new_status: userData.plan_status || "active",
          });
          if (!error) successCount++;
        }
      }
      toast.success(`${successCount} usuário(s) atualizado(s)`);
      setSelectedUserIds(new Set());
      fetchAllData(false);
    } catch (error: any) {
      console.error("Bulk plan update error:", error);
      toast.error("Erro ao atualizar usuários");
    } finally {
      setBulkActionLoading(false);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterPlan, filterStatus, filterReferral]);

  const planDistribution = [
    { name: "Start", value: metrics?.start_plans || 0, color: PLAN_COLORS.start },
    { name: "Gold", value: metrics?.gold_plans || 0, color: PLAN_COLORS.gold },
    { name: "Premium", value: metrics?.premium_plans || 0, color: PLAN_COLORS.premium },
    { name: "Embaixador", value: metrics?.embaixador_plans || 0, color: PLAN_COLORS.embaixador },
  ].filter((p) => p.value > 0);

  const chartConfig = {
    logins: {
      label: "Logins",
      color: "hsl(var(--primary))",
    },
    users: {
      label: "Usuários",
      color: "hsl(var(--chart-1))",
    },
    revenue: {
      label: "Faturamento",
      color: "hsl(142.1 76.2% 36.3%)",
    },
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const paymentMethodDistribution = [
    { name: "PIX", value: revenueMetrics?.pix_count || 0, revenue: revenueMetrics?.pix_revenue || 0, color: "#22c55e" },
    { name: "Cartão", value: revenueMetrics?.card_count || 0, revenue: revenueMetrics?.card_revenue || 0, color: "#3b82f6" },
    { name: "Boleto", value: revenueMetrics?.boleto_count || 0, revenue: revenueMetrics?.boleto_revenue || 0, color: "#f59e0b" },
    { name: "Outros", value: revenueMetrics?.other_count || 0, revenue: revenueMetrics?.other_revenue || 0, color: "#6b7280" },
  ].filter((p) => p.value > 0);

  const handleAddManualSale = async () => {
    if (!saleCustomerName.trim() || !saleAmount) {
      toast.error("Preencha nome e valor");
      return;
    }

    const amount = parseFloat(saleAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Digite um valor válido");
      return;
    }

    setAddingSale(true);
    try {
      const { error } = await supabase.from("manual_sales").insert({
        customer_name: saleCustomerName.trim(),
        customer_email: saleCustomerEmail.trim() || null,
        amount,
        payment_method: salePaymentMethod,
        plan_type: salePlanType,
        notes: saleNotes.trim() || null,
        sale_date: new Date().toISOString().split("T")[0],
      });

      if (error) throw error;

      toast.success("Venda registrada com sucesso!");
      setSaleCustomerName("");
      setSaleCustomerEmail("");
      setSaleAmount("");
      setSalePaymentMethod("pix");
      setSalePlanType("start");
      setSaleNotes("");
      setManualSaleOpen(false);
      fetchAllData();
    } catch (error: any) {
      console.error("Error adding manual sale:", error);
      toast.error(error.message || "Erro ao registrar venda");
    } finally {
      setAddingSale(false);
    }
  };

  if (authLoading || adminLoading || planLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!hasAdminAccess) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Painel Administrativo</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:block">
              Atualizado: {format(lastUpdate, "HH:mm:ss")}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchAllData()}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Atualizar</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-6 space-y-6">
        {loadingData ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Select value={periodDays} onValueChange={setPeriodDays}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PERIOD_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Dialog open={manualSaleOpen} onOpenChange={setManualSaleOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700">
                      <DollarSign className="w-4 h-4" />
                      Adicionar Venda
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Registrar Venda Manual</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nome do Cliente *</label>
                        <Input
                          placeholder="Nome completo"
                          value={saleCustomerName}
                          onChange={(e) => setSaleCustomerName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">E-mail (opcional)</label>
                        <Input
                          type="email"
                          placeholder="email@exemplo.com"
                          value={saleCustomerEmail}
                          onChange={(e) => setSaleCustomerEmail(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Valor (R$) *</label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0,00"
                            value={saleAmount}
                            onChange={(e) => setSaleAmount(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Forma de Pagamento</label>
                          <Select value={salePaymentMethod} onValueChange={setSalePaymentMethod}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pix">PIX</SelectItem>
                              <SelectItem value="card">Cartão</SelectItem>
                              <SelectItem value="boleto">Boleto</SelectItem>
                              <SelectItem value="other">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Plano</label>
                        <Select value={salePlanType} onValueChange={setSalePlanType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="start">Start</SelectItem>
                            <SelectItem value="gold">Gold</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Observações</label>
                        <Input
                          placeholder="Observações sobre a venda..."
                          value={saleNotes}
                          onChange={(e) => setSaleNotes(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={handleAddManualSale}
                        disabled={addingSale}
                        className="w-full"
                      >
                        {addingSale ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : null}
                        Registrar Venda
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportUsersPdf}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Baixar Usuários
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportPdf}
                  disabled={exportingPdf}
                  className="gap-2"
                >
                  {exportingPdf ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Exportar PDF
                </Button>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{metrics?.total_users || 0}</p>
                      <p className="text-xs text-muted-foreground">Total Usuários</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-500/10 to-gray-600/5 border-gray-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-500/20">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{metrics?.gratuito_users || 0}</p>
                      <p className="text-xs text-muted-foreground">Gratuitos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Activity className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{metrics?.active_users || 0}</p>
                      <p className="text-xs text-muted-foreground">Pagantes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/20">
                      <TrendingUp className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{metrics?.total_logins_today || 0}</p>
                      <p className="text-xs text-muted-foreground">Logins Hoje</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Calendar className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {Number(metrics?.avg_daily_logins || 0).toFixed(1)}
                      </p>
                      <p className="text-xs text-muted-foreground">Média Diária</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-500/20 shrink-0">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-lg sm:text-2xl font-bold truncate">{formatCurrency(revenueMetrics?.total_revenue || 0)}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Faturamento Total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 border-teal-500/20">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-teal-500/20 shrink-0">
                      <Banknote className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-lg sm:text-2xl font-bold truncate">
                        {formatCurrency(
                          // Card fee: 3.89% + R$2.49 per transaction
                          // PIX fee: R$2.49 per transaction
                          (revenueMetrics?.pix_revenue || 0) - ((revenueMetrics?.pix_count || 0) * 2.49) +
                          (revenueMetrics?.card_revenue || 0) * (1 - 0.0389) - ((revenueMetrics?.card_count || 0) * 2.49) +
                          (revenueMetrics?.boleto_revenue || 0) - ((revenueMetrics?.boleto_count || 0) * 2.49) +
                          (revenueMetrics?.other_revenue || 0)
                        )}
                      </p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Faturamento Líquido</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/20">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-cyan-500/20 shrink-0">
                      <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-lg sm:text-2xl font-bold truncate">{formatCurrency(revenueMetrics?.avg_ticket || 0)}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Ticket Médio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <Card>
                <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-lg sm:text-2xl font-bold">{metrics?.total_chapters_read || 0}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Capítulos Lidos</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                  <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-lg sm:text-2xl font-bold">{metrics?.total_quiz_attempts || 0}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Quiz Respondidos</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                  <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-lg sm:text-2xl font-bold">{metrics?.total_devotionals_completed || 0}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Devocionais Feitos</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Login History Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Histórico de Acessos ({PERIOD_OPTIONS.find(p => p.value === periodDays)?.label})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <AreaChart data={loginHistory}>
                      <defs>
                        <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="login_date"
                        tickFormatter={(value) => format(new Date(value), "dd/MM", { locale: ptBR })}
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis fontSize={10} tickLine={false} axisLine={false} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            labelFormatter={(value) =>
                              format(new Date(value), "dd 'de' MMMM", { locale: ptBR })
                            }
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="login_count"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorLogins)"
                        name="Logins"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Plan Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Distribuição de Planos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center">
                    {planDistribution.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={planDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {planDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-muted-foreground">Sem dados</p>
                    )}
                  </div>
                  <div className="flex justify-center gap-4 mt-2">
                    {planDistribution.map((p) => (
                      <div key={p.name} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: p.color }}
                        />
                        <span className="text-sm">
                          {p.name}: {p.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Revenue History Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Faturamento Diário ({PERIOD_OPTIONS.find(p => p.value === periodDays)?.label})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <AreaChart data={revenueHistory}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="sale_date"
                        tickFormatter={(value) => format(new Date(value), "dd/MM", { locale: ptBR })}
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(value) => `R$${value}`}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            labelFormatter={(value) =>
                              format(new Date(value), "dd 'de' MMMM", { locale: ptBR })
                            }
                            formatter={(value) => [formatCurrency(Number(value)), "Faturamento"]}
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="daily_revenue"
                        stroke="#22c55e"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        name="Faturamento"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Payment Method Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Formas de Pagamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center">
                    {paymentMethodDistribution.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={paymentMethodDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {paymentMethodDistribution.map((entry, index) => (
                              <Cell key={`cell-payment-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-muted-foreground">Sem dados de pagamento</p>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {paymentMethodDistribution.map((p) => (
                      <div key={p.name} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: p.color }}
                        />
                        <span className="text-sm">
                          {p.name}: {p.value} ({formatCurrency(p.revenue)})
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Referral Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fontes de Captação</CardTitle>
              </CardHeader>
              <CardContent>
                {referralMetrics.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {referralMetrics.map((r) => {
                      const labels: { [key: string]: { label: string; color: string } } = {
                        instagram: { label: "Instagram", color: "#E4405F" },
                        threads: { label: "Threads", color: "#000000" },
                        tiktok: { label: "TikTok", color: "#00f2ea" },
                        kwai: { label: "Kwai", color: "#FF6F00" },
                        anuncios: { label: "Anúncios", color: "#4285F4" },
                        indicacao: { label: "Indicação", color: "#22c55e" },
                        "não informado": { label: "Não informado", color: "#6b7280" },
                      };
                      const config = labels[r.referral_source] || { label: r.referral_source, color: "#6b7280" };
                      return (
                        <div
                          key={r.referral_source}
                          className="flex items-center gap-2 p-3 rounded-lg border"
                          style={{ borderColor: `${config.color}40`, background: `${config.color}10` }}
                        >
                          <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: config.color }}
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{config.label}</p>
                            <p className="text-lg font-bold">{r.user_count}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Nenhum dado de captação registrado ainda. Novos usuários cadastrados informarão a fonte.</p>
                )}
              </CardContent>
            </Card>

            {/* Users Management */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Gerenciar Usuários</CardTitle>
                <Dialog open={addEmailOpen} onOpenChange={setAddEmailOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Adicionar E-mail
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Autorizar Novo E-mail</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">E-mail</label>
                        <Input
                          type="email"
                          placeholder="email@exemplo.com"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Plano</label>
                        <Select value={newPlan} onValueChange={setNewPlan}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="start">Start</SelectItem>
                            <SelectItem value="gold">Gold</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="embaixador">Embaixador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={handleAddEmail}
                        disabled={addingEmail}
                        className="w-full"
                      >
                        {addingEmail ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : null}
                        Autorizar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <Input
                    placeholder="Buscar por e-mail ou nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-xs"
                  />
                  <Select value={filterPlan} onValueChange={setFilterPlan}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos Planos</SelectItem>
                      <SelectItem value="start">Start</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="embaixador">Embaixador</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos Status</SelectItem>
                      <SelectItem value="active">Ativos</SelectItem>
                      <SelectItem value="inactive">Inativos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterReferral} onValueChange={setFilterReferral}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Origem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas Origens</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="threads">Threads</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="kwai">Kwai</SelectItem>
                      <SelectItem value="anuncios">Anúncios</SelectItem>
                      <SelectItem value="indicacao">Indicação</SelectItem>
                      <SelectItem value="none">Não informado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bulk Actions */}
                {selectedUserIds.size > 0 && (
                  <div className="flex flex-wrap items-center gap-3 mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm font-medium">
                      {selectedUserIds.size} selecionado(s)
                    </span>
                    <div className="flex gap-2">
                      <Select onValueChange={handleBulkStatusChange} disabled={bulkActionLoading}>
                        <SelectTrigger className="w-[140px] h-8">
                          <SelectValue placeholder="Alterar status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Ativar</SelectItem>
                          <SelectItem value="inactive">Inativar</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select onValueChange={handleBulkPlanChange} disabled={bulkActionLoading}>
                        <SelectTrigger className="w-[140px] h-8">
                          <SelectValue placeholder="Alterar plano" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="start">Start</SelectItem>
                          <SelectItem value="gold">Gold</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="embaixador">Embaixador</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedUserIds(new Set())}
                        disabled={bulkActionLoading}
                      >
                        Limpar seleção
                      </Button>
                    </div>
                    {bulkActionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  </div>
                )}

                {/* Table */}
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40px]">
                          <Checkbox 
                            checked={paginatedUsers.length > 0 && paginatedUsers.every(u => selectedUserIds.has(u.user_id))}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Pontos</TableHead>
                        <TableHead>Dias Ativos</TableHead>
                        <TableHead>Dias Inativo</TableHead>
                        <TableHead>Cadastro</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                            Nenhum usuário encontrado
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedUsers.map((userData) => (
                          <TableRow key={userData.user_id}>
                            <TableCell>
                              <Checkbox 
                                checked={selectedUserIds.has(userData.user_id)}
                                onCheckedChange={(checked) => handleSelectUser(userData.user_id, checked as boolean)}
                              />
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">
                                  {userData.full_name || "Sem nome"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {userData.email}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {(() => {
                                // Determine display plan: if no plan_type or empty, show as "Start"
                                const displayPlan = userData.plan_type && userData.plan_type !== "none" && userData.plan_type !== "" 
                                  ? userData.plan_type 
                                  : "start";
                                const planColor = PLAN_COLORS[displayPlan as keyof typeof PLAN_COLORS] || PLAN_COLORS.none;
                                return (
                                  <Badge
                                    variant="outline"
                                    className="capitalize"
                                    style={{
                                      borderColor: planColor,
                                      color: planColor,
                                    }}
                                  >
                                    {displayPlan}
                                  </Badge>
                                );
                              })()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={userData.plan_status === "active" ? "default" : "secondary"}
                              >
                                {userData.plan_status === "active" ? "Ativo" : "Inativo"}
                              </Badge>
                            </TableCell>
                            <TableCell>{userData.total_points}</TableCell>
                            <TableCell>{userData.active_days}</TableCell>
                            <TableCell>
                              <span className={userData.inactive_days >= 30 ? 'text-red-500 font-semibold' : userData.inactive_days >= 15 ? 'text-yellow-500' : ''}>
                                {userData.inactive_days}
                              </span>
                            </TableCell>
                            <TableCell>
                              {userData.created_at
                                ? format(new Date(userData.created_at), "dd/MM/yyyy", {
                                    locale: ptBR,
                                  })
                                : "-"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setViewingUser(userData)}
                                  title="Ver detalhes"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openEditModal(userData)}
                                  title="Editar"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                      Mostrando {((currentPage - 1) * usersPerPage) + 1} - {Math.min(currentPage * usersPerPage, filteredUsers.length)} de {filteredUsers.length} usuários
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              className="w-8 h-8 p-0"
                              onClick={() => setCurrentPage(pageNum)}
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* View User Modal */}
            <Dialog open={!!viewingUser} onOpenChange={() => setViewingUser(null)}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Detalhes do Usuário
                  </DialogTitle>
                </DialogHeader>
                {viewingUser && (
                  <div className="space-y-4 pt-2">
                    {/* Avatar and Name */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {viewingUser.avatar_url ? (
                          <img src={viewingUser.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Users className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{viewingUser.full_name || "Sem nome"}</p>
                        <div className="flex gap-2">
                          <Badge
                            variant="outline"
                            className="capitalize"
                            style={{
                              borderColor: PLAN_COLORS[viewingUser.plan_type as keyof typeof PLAN_COLORS] || PLAN_COLORS.none,
                              color: PLAN_COLORS[viewingUser.plan_type as keyof typeof PLAN_COLORS] || PLAN_COLORS.none,
                            }}
                          >
                            {viewingUser.plan_type || "none"}
                          </Badge>
                          <Badge variant={viewingUser.plan_status === "active" ? "default" : "secondary"}>
                            {viewingUser.plan_status === "active" ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{viewingUser.email}</span>
                      </div>
                      {viewingUser.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-mono">{viewingUser.phone}</span>
                        </div>
                      )}
                      {viewingUser.cpf && (
                        <div className="flex items-center gap-3">
                          <IdCard className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-mono">
                            {viewingUser.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg text-center">
                        <Trophy className="w-5 h-5 mx-auto mb-1 text-primary" />
                        <p className="text-2xl font-bold">{viewingUser.total_points}</p>
                        <p className="text-xs text-muted-foreground">Pontos Totais</p>
                      </div>
                      <div className="p-3 bg-amber-500/10 rounded-lg text-center">
                        <CalendarDays className="w-5 h-5 mx-auto mb-1 text-amber-500" />
                        <p className="text-2xl font-bold">{viewingUser.active_days}</p>
                        <p className="text-xs text-muted-foreground">Dias Ativos</p>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>
                        Cadastro: {viewingUser.created_at 
                          ? format(new Date(viewingUser.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
                          : "-"}
                      </p>
                      <p>
                        Último acesso: {viewingUser.last_sign_in_at 
                          ? format(new Date(viewingUser.last_sign_in_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
                          : "-"}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setViewingUser(null);
                        openEditModal(viewingUser);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Usuário
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Edit User Modal */}
            <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Usuário</DialogTitle>
                </DialogHeader>
                {editingUser && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <p className="font-medium">{editingUser.full_name || "Sem nome"}</p>
                      <p className="text-sm text-muted-foreground">{editingUser.email}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Plano</label>
                        <Select value={editPlan} onValueChange={setEditPlan}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="start">Start</SelectItem>
                            <SelectItem value="gold">Gold</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="embaixador">Embaixador</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <Select value={editStatus} onValueChange={setEditStatus}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Ativo</SelectItem>
                            <SelectItem value="inactive">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Telefone</label>
                      <Input
                        placeholder="(11) 99999-9999"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">CPF</label>
                      <Input
                        placeholder="000.000.000-00"
                        value={editCpf}
                        onChange={(e) => setEditCpf(e.target.value.replace(/\D/g, ''))}
                        maxLength={11}
                      />
                    </div>

                    <Button
                      onClick={handleUpdateUser}
                      disabled={savingEdit}
                      className="w-full"
                    >
                      {savingEdit ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : null}
                      Salvar Alterações
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminHD;
