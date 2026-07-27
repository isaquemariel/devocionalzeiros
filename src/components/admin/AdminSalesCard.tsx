import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";
import { RefreshCw, DollarSign, CreditCard, Gamepad2, Receipt, Loader2, TrendingUp, Coins } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Sale {
  id: string;
  charge_id: string;
  kind: string; // subscription | rpg | donation | other
  status: string; // paid | refunded
  amount: number;
  currency: string;
  plan_type: string | null;
  billing_interval: string | null;
  cosmetic_id: string | null;
  item_name: string | null;
  email: string | null;
  customer_name: string | null;
  occurred_at: string;
}

const BRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const PERIODS = [
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 90 dias" },
  { value: "365", label: "Últimos 12 meses" },
  { value: "all", label: "Todo o período" },
];

const PLAN_LABEL: Record<string, string> = {
  start: "Start", gold: "Gold", premium: "Premium",
};

export const AdminSalesCard = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [period, setPeriod] = useState("30");
  const [kindFilter, setKindFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const fetchSales = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("admin_list_sales" as never);
      if (error) throw error;
      setSales(((data as unknown) as Sale[]) || []);
    } catch (e) {
      console.error("Error fetching sales:", e);
      toast.error("Erro ao carregar vendas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSales(); }, [fetchSales]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess.session?.access_token;
      if (!token) throw new Error("Sessão expirada");
      const { data, error } = await supabase.functions.invoke("admin-sync-stripe-sales", {
        body: { since_days: 0 },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (error) throw error;
      if (!data?.ok) throw new Error(data?.error || "Falha na sincronização");
      const k = data.byKind || {};
      toast.success(
        `Sincronizado: ${data.upserted} venda(s) — ${k.subscription || 0} assinaturas, ${k.rpg || 0} RPG`
      );
      await fetchSales();
    } catch (e: unknown) {
      console.error("Sync error:", e);
      toast.error((e as Error)?.message || "Erro ao sincronizar com o Stripe");
    } finally {
      setSyncing(false);
    }
  };

  // Aplica filtros de período / tipo / plano
  const filtered = useMemo(() => {
    const now = Date.now();
    const cutoff = period === "all" ? 0 : now - parseInt(period) * 86400 * 1000;
    return sales.filter((s) => {
      const t = new Date(s.occurred_at).getTime();
      if (t < cutoff) return false;
      if (kindFilter !== "all" && s.kind !== kindFilter) return false;
      if (planFilter !== "all" && (s.kind !== "subscription" || s.plan_type !== planFilter)) return false;
      return true;
    });
  }, [sales, period, kindFilter, planFilter]);

  // Só receita realizada (paga, não estornada)
  const paid = useMemo(() => filtered.filter((s) => s.status === "paid"), [filtered]);

  const stats = useMemo(() => {
    const revenue = paid.reduce((sum, s) => sum + Number(s.amount), 0);
    const subs = paid.filter((s) => s.kind === "subscription");
    const rpg = paid.filter((s) => s.kind === "rpg");
    const talentSales = paid.filter((s) => s.kind === "talents");
    const subRevenue = subs.reduce((sum, s) => sum + Number(s.amount), 0);
    const rpgRevenue = rpg.reduce((sum, s) => sum + Number(s.amount), 0);
    const talentRevenue = talentSales.reduce((sum, s) => sum + Number(s.amount), 0);
    const talentsSold = Math.round(talentRevenue * 20); // R$ 1 = 20 talentos
    const ticket = paid.length ? revenue / paid.length : 0;

    // Assinaturas por plano
    const byPlan: Record<string, { count: number; revenue: number }> = {};
    for (const s of subs) {
      const key = s.plan_type || "—";
      byPlan[key] = byPlan[key] || { count: 0, revenue: 0 };
      byPlan[key].count++;
      byPlan[key].revenue += Number(s.amount);
    }
    // RPG por item
    const byItem: Record<string, { count: number; revenue: number }> = {};
    for (const s of rpg) {
      const key = s.item_name || s.cosmetic_id || "—";
      byItem[key] = byItem[key] || { count: 0, revenue: 0 };
      byItem[key].count++;
      byItem[key].revenue += Number(s.amount);
    }
    return {
      revenue, subRevenue, rpgRevenue, talentRevenue, talentsSold, ticket,
      subCount: subs.length, rpgCount: rpg.length, talentCount: talentSales.length,
      byPlan, byItem,
    };
  }, [paid]);

  const refundedCount = useMemo(() => filtered.filter((s) => s.status === "refunded").length, [filtered]);

  // Série de receita por dia (para o gráfico)
  const daily = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of paid) {
      const day = s.occurred_at.slice(0, 10);
      map.set(day, (map.get(day) || 0) + Number(s.amount));
    }
    return Array.from(map.entries())
      .map(([day, revenue]) => ({ day, revenue }))
      .sort((a, b) => a.day.localeCompare(b.day));
  }, [paid]);

  const chartConfig = { revenue: { label: "Receita", color: "hsl(var(--primary))" } };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-500" /> Vendas (Stripe)
        </CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px] h-9 text-xs sm:text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {PERIODS.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={kindFilter} onValueChange={setKindFilter}>
            <SelectTrigger className="w-[130px] h-9 text-xs sm:text-sm"><SelectValue placeholder="Tipo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="subscription">Assinaturas</SelectItem>
              <SelectItem value="rpg">Compras RPG</SelectItem>
              <SelectItem value="talents">Talentos</SelectItem>
            </SelectContent>
          </Select>
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-[120px] h-9 text-xs sm:text-sm"><SelectValue placeholder="Plano" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os planos</SelectItem>
              <SelectItem value="start">Start</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" onClick={handleSync} disabled={syncing} className="gap-2 h-9">
            {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Sincronizar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : sales.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <Receipt className="w-10 h-10 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Nenhuma venda importada ainda. Clique em <strong>Sincronizar</strong> para puxar suas
              assinaturas e compras de RPG diretamente do Stripe.
            </p>
            <Button onClick={handleSync} disabled={syncing} className="gap-2">
              {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Sincronizar agora
            </Button>
          </div>
        ) : (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4">
              <div className="p-3 sm:p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 mb-1"><DollarSign className="w-4 h-4 text-green-500" /><span className="text-[10px] sm:text-xs text-muted-foreground">Receita</span></div>
                <p className="text-lg sm:text-2xl font-bold">{BRL(stats.revenue)}</p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-1"><CreditCard className="w-4 h-4 text-blue-500" /><span className="text-[10px] sm:text-xs text-muted-foreground">Assinaturas</span></div>
                <p className="text-lg sm:text-2xl font-bold">{stats.subCount}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{BRL(stats.subRevenue)}</p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-1"><Gamepad2 className="w-4 h-4 text-purple-500" /><span className="text-[10px] sm:text-xs text-muted-foreground">Compras RPG</span></div>
                <p className="text-lg sm:text-2xl font-bold">{stats.rpgCount}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{BRL(stats.rpgRevenue)}</p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-1"><Coins className="w-4 h-4 text-yellow-500" /><span className="text-[10px] sm:text-xs text-muted-foreground">Talentos vendidos</span></div>
                <p className="text-lg sm:text-2xl font-bold">🪙 {stats.talentsSold.toLocaleString("pt-BR")}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{stats.talentCount} compra(s) · {BRL(stats.talentRevenue)}</p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-1"><TrendingUp className="w-4 h-4 text-amber-500" /><span className="text-[10px] sm:text-xs text-muted-foreground">Ticket médio</span></div>
                <p className="text-lg sm:text-2xl font-bold">{BRL(stats.ticket)}</p>
                {refundedCount > 0 && <p className="text-[10px] sm:text-xs text-red-500">{refundedCount} estorno(s)</p>}
              </div>
            </div>

            {/* Gráfico de receita por dia */}
            {daily.length > 1 && (
              <div>
                <p className="text-sm font-medium mb-2">Receita por dia</p>
                <ChartContainer config={chartConfig} className="h-[180px] w-full">
                  <AreaChart data={daily}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tickFormatter={(v) => format(new Date(v), "dd/MM", { locale: ptBR })} fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${v}`} />
                    <ChartTooltip content={<ChartTooltipContent labelFormatter={(v) => format(new Date(v as string), "dd 'de' MMMM", { locale: ptBR })} formatter={(v) => BRL(Number(v))} />} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" name="Receita" />
                  </AreaChart>
                </ChartContainer>
              </div>
            )}

            {/* Breakdown assinaturas por plano + RPG por item */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Assinaturas por plano</p>
                {Object.keys(stats.byPlan).length === 0 ? (
                  <p className="text-xs text-muted-foreground">Nenhuma assinatura no período.</p>
                ) : (
                  <div className="space-y-1.5">
                    {Object.entries(stats.byPlan).sort((a, b) => b[1].revenue - a[1].revenue).map(([plan, v]) => (
                      <div key={plan} className="flex items-center justify-between text-sm p-2 rounded bg-muted/40">
                        <span className="capitalize">{PLAN_LABEL[plan] || plan} <span className="text-muted-foreground">×{v.count}</span></span>
                        <span className="font-medium">{BRL(v.revenue)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Compras de RPG por item</p>
                {Object.keys(stats.byItem).length === 0 ? (
                  <p className="text-xs text-muted-foreground">Nenhuma compra de RPG no período.</p>
                ) : (
                  <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
                    {Object.entries(stats.byItem).sort((a, b) => b[1].revenue - a[1].revenue).map(([item, v]) => (
                      <div key={item} className="flex items-center justify-between text-sm p-2 rounded bg-muted/40">
                        <span>{item} <span className="text-muted-foreground">×{v.count}</span></span>
                        <span className="font-medium">{BRL(v.revenue)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Transações */}
            <div>
              <p className="text-sm font-medium mb-2">Transações ({filtered.length})</p>
              <div className="rounded-lg border overflow-x-auto">
                <Table className="min-w-[640px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Item / Plano</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.slice(0, 100).map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="whitespace-nowrap text-xs">
                          {format(new Date(s.occurred_at), "dd/MM/yy HH:mm", { locale: ptBR })}
                        </TableCell>
                        <TableCell>
                          {s.kind === "subscription" ? (
                            <Badge variant="outline" className="border-blue-500/40 text-blue-500">Assinatura</Badge>
                          ) : s.kind === "rpg" ? (
                            <Badge variant="outline" className="border-purple-500/40 text-purple-500">RPG</Badge>
                          ) : s.kind === "talents" ? (
                            <Badge variant="outline" className="border-amber-500/40 text-amber-500">Talentos</Badge>
                          ) : s.kind === "donation" ? (
                            <Badge variant="outline" className="border-pink-500/40 text-pink-500">Doação</Badge>
                          ) : (
                            <Badge variant="outline">Outro</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {s.item_name || (s.plan_type ? `Assinatura ${s.plan_type}` : "—")}
                          {s.billing_interval && (
                            <span className="text-muted-foreground text-xs"> ({s.billing_interval === "year" ? "anual" : "mensal"})</span>
                          )}
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="block">{s.customer_name || "—"}</span>
                          <span className="text-muted-foreground">{s.email || ""}</span>
                        </TableCell>
                        <TableCell className="text-right font-medium whitespace-nowrap">{BRL(Number(s.amount))}</TableCell>
                        <TableCell>
                          {s.status === "refunded"
                            ? <Badge variant="secondary" className="text-red-500">Estornado</Badge>
                            : <Badge variant="default">Pago</Badge>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {filtered.length > 100 && (
                <p className="text-xs text-muted-foreground mt-2">Mostrando as 100 transações mais recentes de {filtered.length}.</p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminSalesCard;
