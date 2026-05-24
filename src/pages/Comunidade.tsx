import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, HandHeart, Sparkles, Users, ScrollText, ShieldAlert, X, Search, Calendar as CalendarIcon, Plus, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { AppHeader } from "@/components/shared/AppHeader";
import { BottomNavBar } from "@/components/shared/BottomNavBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommunityOnboarding } from "@/components/comunidade/CommunityOnboarding";
import { CommunityComposer } from "@/components/comunidade/CommunityComposer";
import { CommunityPostCard } from "@/components/comunidade/CommunityPostCard";
import { CommunityRules } from "@/components/comunidade/CommunityRules";
import { AdminModerationModal } from "@/components/comunidade/AdminModerationModal";
import { QuickComposeModal } from "@/components/comunidade/QuickComposeModal";
import { useCommunityFeed, useCommunityStatus, PostType, CommunityPost } from "@/hooks/useCommunity";
import { getBrasiliaDateString } from "@/lib/brasiliaDate";

const ONBOARDING_KEY = "community_onboarding_done";
const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/G3RUHiKTrLh8mZFUDK2j5a";
type TabKey = PostType | "rules";

const Comunidade = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, refetchProfile } = useAuth();
  const { isAdmin } = useAdminCheck();
  const [tab, setTab] = useState<TabKey>("prayer");
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [moderationTarget, setModerationTarget] = useState<
    { kind: "post" | "reply"; id: string; preview: string } | null
  >(null);
  const [quickOpen, setQuickOpen] = useState(false);

  const { ban, notices, ackNotice } = useCommunityStatus(user?.id);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user || !profile) return;
    const flag = localStorage.getItem(`${ONBOARDING_KEY}_${user.id}`);
    const hasName = !!profile.full_name && profile.full_name.trim().length >= 2;
    const hasAvatar = !!profile.avatar_url;
    if (flag === "1" && hasName && hasAvatar) setOnboardingComplete(true);
  }, [user, profile]);

  const needsOnboarding = useMemo(() => {
    if (!profile) return true;
    const hasName = !!profile.full_name && profile.full_name.trim().length >= 2;
    const hasAvatar = !!profile.avatar_url;
    return !(onboardingComplete && hasName && hasAvatar);
  }, [profile, onboardingComplete]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay">
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-background">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground) / 0.03) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground) / 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full blur-[180px] -translate-y-1/2" style={{ backgroundColor: "hsl(var(--primary) / 0.05)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] translate-y-1/2" style={{ backgroundColor: "hsl(var(--accent) / 0.04)" }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 pb-32">
        <AppHeader
          userId={user.id}
          userEmail={user.email || undefined}
          showBack
          profileName={profile?.full_name || undefined}
          profileAvatarUrl={profile?.avatar_url || undefined}
        />

        <motion.div className="mb-6 text-center" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Comunidade</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Orem e celebrem juntos
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Compartilhe pedidos, agradeça e interceda pela comunidade.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <Button
              size="sm"
              onClick={() => setQuickOpen(true)}
              className="gap-1.5 h-9"
            >
              <Plus className="w-4 h-4" /> Novo post
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(WHATSAPP_COMMUNITY_URL, "_blank", "noopener,noreferrer")}
              className="gap-1.5 h-9 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
            >
              <MessageCircle className="w-4 h-4" /> Grupo no WhatsApp
            </Button>
          </div>
        </motion.div>

        {/* Moderation notices */}
        {notices.length > 0 && (
          <div className="space-y-2 mb-4">
            {notices.map((n) => (
              <div key={n.id} className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-3">
                <ShieldAlert className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                <div className="flex-1 text-xs">
                  <p className="font-bold text-destructive mb-0.5">Aviso da moderação</p>
                  <p className="text-foreground/80">{n.reason}</p>
                </div>
                <button onClick={() => ackNotice(n.id)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Active ban banner */}
        {ban && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert className="w-4 h-4 text-destructive" />
              <p className="text-sm font-bold text-destructive">Você está temporariamente bloqueado</p>
            </div>
            <p className="text-xs text-muted-foreground">Motivo: {ban.reason}</p>
            <p className="text-xs text-muted-foreground">
              Liberado em: {new Date(ban.banned_until).toLocaleString("pt-BR")}
            </p>
          </div>
        )}

        {needsOnboarding ? (
          <CommunityOnboarding
            userId={user.id}
            initialName={profile?.full_name || null}
            initialAvatarUrl={profile?.avatar_url || null}
            onComplete={async () => {
              localStorage.setItem(`${ONBOARDING_KEY}_${user.id}`, "1");
              await refetchProfile?.();
              setOnboardingComplete(true);
            }}
          />
        ) : (
          <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)} className="w-full">
            <TabsList className="grid grid-cols-3 w-full h-12 bg-card/60 border border-border/60 backdrop-blur-sm">
              <TabsTrigger value="prayer" className="gap-1.5 data-[state=active]:bg-primary/15 text-xs sm:text-sm">
                <HandHeart className="w-4 h-4" />
                <span className="hidden xs:inline">Pedidos</span>
                <span className="xs:hidden">Orar</span>
              </TabsTrigger>
              <TabsTrigger value="thanks" className="gap-1.5 data-[state=active]:bg-primary/15 text-xs sm:text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Gratidão</span>
              </TabsTrigger>
              <TabsTrigger value="rules" className="gap-1.5 data-[state=active]:bg-primary/15 text-xs sm:text-sm">
                <ScrollText className="w-4 h-4" />
                <span>Regras</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prayer" className="mt-4">
              <FeedSection
                type="prayer"
                userId={user.id}
                isAdmin={isAdmin}
                disabled={!!ban}
                onAdminModerate={setModerationTarget}
                onSwitchToThanks={() => setTab("thanks")}
              />
            </TabsContent>
            <TabsContent value="thanks" className="mt-4">
              <FeedSection
                type="thanks"
                userId={user.id}
                isAdmin={isAdmin}
                disabled={!!ban}
                onAdminModerate={setModerationTarget}
              />
            </TabsContent>
            <TabsContent value="rules" className="mt-4">
              <CommunityRules />
            </TabsContent>
          </Tabs>
        )}
      </div>

      <AdminModerationModal
        open={!!moderationTarget}
        onClose={() => setModerationTarget(null)}
        target={moderationTarget}
      />

      {user && (
        <QuickComposeModal
          open={quickOpen}
          onClose={() => setQuickOpen(false)}
          userId={user.id}
          defaultType={tab === "thanks" ? "thanks" : "prayer"}
          onPosted={(t) => setTab(t)}
        />
      )}

      <BottomNavBar />
    </div>
  );
};

interface FeedProps {
  type: PostType;
  userId: string;
  isAdmin?: boolean;
  disabled?: boolean;
  onAdminModerate?: (t: { kind: "post" | "reply"; id: string; preview: string }) => void;
  onSwitchToThanks?: () => void;
}

function FeedSection({ type, userId, isAdmin, disabled, onAdminModerate, onSwitchToThanks }: FeedProps) {
  const { posts, loading } = useCommunityFeed(type);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<string>(""); // YYYY-MM-DD in BRT, "" = all

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p: CommunityPost) => {
      if (q) {
        const hay = `${p.author_name} ${p.content}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (dateFilter) {
        const postDay = getBrasiliaDateString(new Date(p.created_at));
        if (postDay !== dateFilter) return false;
      }
      return true;
    });
  }, [posts, search, dateFilter]);

  const today = getBrasiliaDateString(new Date());

  return (
    <div>
      {!disabled && <CommunityComposer userId={userId} type={type} />}

      <div className="flex flex-col gap-2 mb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou palavra..."
            className="pl-9 h-10 bg-card/60 border-border/60"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-9 h-9 bg-card/60 border-border/60 text-xs"
            />
          </div>
          <Button
            type="button"
            variant={dateFilter === today ? "default" : "outline"}
            size="sm"
            onClick={() => setDateFilter(dateFilter === today ? "" : today)}
            className="h-9 text-xs"
          >
            Hoje
          </Button>
          {dateFilter && (
            <Button type="button" variant="ghost" size="sm" onClick={() => setDateFilter("")} className="h-9 text-xs">
              <X className="w-3 h-3" /> Limpar
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border/60">
          <p className="text-sm text-muted-foreground">
            {posts.length === 0
              ? type === "prayer"
                ? "Ainda não há pedidos. Seja o primeiro a abrir o coração."
                : "Nenhum agradecimento ainda. Comece celebrando algo bom!"
              : "Nenhum resultado para os filtros aplicados."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <CommunityPostCard
              key={p.id}
              post={p}
              currentUserId={userId}
              isAdmin={isAdmin}
              onAdminModerate={onAdminModerate}
              onSwitchToThanks={onSwitchToThanks}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comunidade;
