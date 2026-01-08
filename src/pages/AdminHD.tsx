import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Save,
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

const PLAN_COLORS = {
  start: "#3b82f6",
  gold: "#f59e0b",
  premium: "#eab308",
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

  const [users, setUsers] = useState<UserData[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [metricsHistory, setMetricsHistory] = useState<MetricsHistory[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [periodDays, setPeriodDays] = useState("30");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [savingBackup, setSavingBackup] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);

  // Add email modal
  const [addEmailOpen, setAddEmailOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPlan, setNewPlan] = useState("start");
  const [addingEmail, setAddingEmail] = useState(false);

  // Edit user modal
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [editPlan, setEditPlan] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // Real-time update interval
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!adminLoading && !isAdmin && !authLoading) {
      toast.error("Acesso negado. Apenas administradores.");
      navigate("/home");
    }
  }, [isAdmin, adminLoading, authLoading, navigate]);

  const fetchAllData = useCallback(async (showLoading = true) => {
    if (showLoading) setLoadingData(true);
    try {
      const days = parseInt(periodDays);
      const [usersRes, metricsRes, historyRes, metricsHistoryRes] = await Promise.all([
        supabase.rpc("admin_get_all_users"),
        supabase.rpc("admin_get_metrics"),
        supabase.rpc("admin_get_login_history", { days_back: days }),
        supabase.rpc("admin_get_metrics_history", { days_back: days }),
      ]);

      if (usersRes.error) throw usersRes.error;
      if (metricsRes.error) throw metricsRes.error;
      if (historyRes.error) throw historyRes.error;

      setUsers(usersRes.data || []);
      setMetrics(metricsRes.data?.[0] || null);
      setLoginHistory(historyRes.data || []);
      setMetricsHistory(metricsHistoryRes.data || []);
      setLastUpdate(new Date());
    } catch (error: any) {
      console.error("Error fetching admin data:", error);
      if (showLoading) toast.error("Erro ao carregar dados");
    } finally {
      if (showLoading) setLoadingData(false);
    }
  }, [periodDays]);

  useEffect(() => {
    if (isAdmin) {
      fetchAllData();
    }
  }, [isAdmin, fetchAllData]);

  // Real-time updates every 30 seconds
  useEffect(() => {
    if (isAdmin) {
      intervalRef.current = setInterval(() => {
        fetchAllData(false);
      }, 30000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isAdmin, fetchAllData]);

  const handleSaveBackup = async () => {
    setSavingBackup(true);
    try {
      const { error } = await supabase.rpc("admin_save_metrics_snapshot");
      if (error) throw error;
      toast.success("Backup das métricas salvo com sucesso!");
      fetchAllData(false);
    } catch (error: any) {
      console.error("Error saving backup:", error);
      toast.error("Erro ao salvar backup");
    } finally {
      setSavingBackup(false);
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

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    setSavingEdit(true);
    try {
      const { error } = await supabase.rpc("admin_update_user_plan", {
        target_email: editingUser.email,
        new_plan_type: editPlan,
        new_status: editStatus,
      });

      if (error) throw error;

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

  const openEditModal = (userData: UserData) => {
    setEditingUser(userData);
    setEditPlan(userData.plan_type || "start");
    setEditStatus(userData.plan_status || "active");
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === "all" || u.plan_type === filterPlan;
    const matchesStatus = filterStatus === "all" || u.plan_status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const planDistribution = [
    { name: "Start", value: metrics?.start_plans || 0, color: PLAN_COLORS.start },
    { name: "Gold", value: metrics?.gold_plans || 0, color: PLAN_COLORS.gold },
    { name: "Premium", value: metrics?.premium_plans || 0, color: PLAN_COLORS.premium },
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
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveBackup}
                  disabled={savingBackup}
                  className="gap-2"
                >
                  {savingBackup ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Salvar Backup
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{metrics?.total_users || 0}</p>
                      <p className="text-xs text-muted-foreground">Total de Usuários</p>
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
                      <p className="text-xs text-muted-foreground">Usuários Ativos</p>
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
                      <p className="text-xs text-muted-foreground">Média Diária (30d)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{metrics?.total_chapters_read || 0}</p>
                    <p className="text-xs text-muted-foreground">Capítulos Lidos</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{metrics?.total_quiz_attempts || 0}</p>
                    <p className="text-xs text-muted-foreground">Quiz Respondidos</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Crown className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{metrics?.total_devotionals_completed || 0}</p>
                    <p className="text-xs text-muted-foreground">Devocionais Feitos</p>
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

            {/* Growth Chart */}
            {metricsHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Crescimento de Usuários</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <LineChart data={metricsHistory}>
                      <XAxis
                        dataKey="snapshot_date"
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
                      <Line
                        type="monotone"
                        dataKey="total_users"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        dot={false}
                        name="Total Usuários"
                      />
                      <Line
                        type="monotone"
                        dataKey="active_users"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        dot={false}
                        name="Usuários Ativos"
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}

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
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos Planos</SelectItem>
                      <SelectItem value="start">Start</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="none">Sem Plano</SelectItem>
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
                </div>

                {/* Table */}
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Pontos</TableHead>
                        <TableHead>Dias Ativos</TableHead>
                        <TableHead>Cadastro</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            Nenhum usuário encontrado
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((userData) => (
                          <TableRow key={userData.user_id}>
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
                              <Badge
                                variant="outline"
                                className="capitalize"
                                style={{
                                  borderColor:
                                    PLAN_COLORS[userData.plan_type as keyof typeof PLAN_COLORS] ||
                                    PLAN_COLORS.none,
                                  color:
                                    PLAN_COLORS[userData.plan_type as keyof typeof PLAN_COLORS] ||
                                    PLAN_COLORS.none,
                                }}
                              >
                                {userData.plan_type || "none"}
                              </Badge>
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
                              {userData.created_at
                                ? format(new Date(userData.created_at), "dd/MM/yyyy", {
                                    locale: ptBR,
                                  })
                                : "-"}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditModal(userData)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

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
