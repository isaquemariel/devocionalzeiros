import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, HandHeart, Sparkles, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AppHeader } from "@/components/shared/AppHeader";
import { BottomNavBar } from "@/components/shared/BottomNavBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CommunityOnboarding } from "@/components/comunidade/CommunityOnboarding";
import { CommunityComposer } from "@/components/comunidade/CommunityComposer";
import { CommunityPostCard } from "@/components/comunidade/CommunityPostCard";
import { useCommunityFeed, PostType } from "@/hooks/useCommunity";

const ONBOARDING_KEY = "community_onboarding_done";

const Comunidade = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, refetchProfile } = useAuth();
  const [tab, setTab] = useState<PostType>("prayer");
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  // Pre-check onboarding from profile + localStorage
  useEffect(() => {
    if (!user || !profile) return;
    const flag = localStorage.getItem(`${ONBOARDING_KEY}_${user.id}`);
    const hasName = !!profile.full_name && profile.full_name.trim().length >= 2;
    const hasAvatar = !!profile.avatar_url;
    if (flag === "1" && hasName && hasAvatar) {
      setOnboardingComplete(true);
    }
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
      {/* Background */}
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
        <div
          className="absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full blur-[180px] -translate-y-1/2"
          style={{ backgroundColor: "hsl(var(--primary) / 0.05)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] translate-y-1/2"
          style={{ backgroundColor: "hsl(var(--accent) / 0.04)" }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 pb-32">
        <AppHeader
          userId={user.id}
          userEmail={user.email || undefined}
          showBack
          profileName={profile?.full_name || undefined}
          profileAvatarUrl={profile?.avatar_url || undefined}
        />

        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Comunidade
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Orem e celebrem juntos
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Compartilhe pedidos, agradeça e interceda pela comunidade.
          </p>
        </motion.div>

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
          <Tabs value={tab} onValueChange={(v) => setTab(v as PostType)} className="w-full">
            <TabsList className="grid grid-cols-2 w-full h-12 bg-card/60 border border-border/60 backdrop-blur-sm">
              <TabsTrigger value="prayer" className="gap-2 data-[state=active]:bg-primary/15">
                <HandHeart className="w-4 h-4" />
                Pedidos de Oração
              </TabsTrigger>
              <TabsTrigger value="thanks" className="gap-2 data-[state=active]:bg-primary/15">
                <Sparkles className="w-4 h-4" />
                Agradecimentos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prayer" className="mt-4">
              <FeedSection type="prayer" userId={user.id} />
            </TabsContent>
            <TabsContent value="thanks" className="mt-4">
              <FeedSection type="thanks" userId={user.id} />
            </TabsContent>
          </Tabs>
        )}
      </div>

      <BottomNavBar />
    </div>
  );
};

function FeedSection({ type, userId }: { type: PostType; userId: string }) {
  const { posts, loading } = useCommunityFeed(type);
  return (
    <div>
      <CommunityComposer userId={userId} type={type} />
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border/60">
          <p className="text-sm text-muted-foreground">
            {type === "prayer"
              ? "Ainda não há pedidos. Seja o primeiro a abrir o coração."
              : "Nenhum agradecimento ainda. Comece celebrando algo bom!"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <CommunityPostCard key={p.id} post={p} currentUserId={userId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comunidade;
