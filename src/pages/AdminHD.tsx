import { useState, useEffect } from "react";
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
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
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
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

const PLAN_COLORS = {
  start: "#3b82f6",
  gold: "#f59e0b",
  premium: "#eab308",
  none: "#6b7280",
};

const AdminHD = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();

  const [users, setUsers] = useState<UserData[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

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

  useEffect(() => {
    if (isAdmin) {
      fetchAllData();
    }
  }, [isAdmin]);

  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const [usersRes, metricsRes, historyRes] = await Promise.all([
        supabase.rpc("admin_get_all_users"),
        supabase.rpc("admin_get_metrics"),
        supabase.rpc("admin_get_login_history", { days_back: 30 }),
      ]);

      if (usersRes.error) throw usersRes.error;
      if (metricsRes.error) throw metricsRes.error;
      if (historyRes.error) throw historyRes.error;

      setUsers(usersRes.data || []);
      setMetrics(metricsRes.data?.[0] || null);
      setLoginHistory(historyRes.data || []);
    } catch (error: any) {
      console.error("Error fetching admin data:", error);
      toast.error("Erro ao carregar dados");
    } finally {
      setLoadingData(false);
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
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">Painel Administrativo</h1>
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
                  <CardTitle className="text-lg">Histórico de Acessos (30 dias)</CardTitle>
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
