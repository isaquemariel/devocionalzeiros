import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserPlan } from "@/hooks/useUserPlan";
import { ArrowLeft, Settings as SettingsIcon, Menu } from "lucide-react";
import { RotinaSidebar } from "@/components/rotina/RotinaSidebar";
import { RotinaDashboard } from "@/components/rotina/sections/RotinaDashboard";
import { RotinaTasksSection } from "@/components/rotina/sections/RotinaTasksSection";
import { RotinaPrayersSection } from "@/components/rotina/sections/RotinaPrayersSection";
import { RotinaCalendarSection } from "@/components/rotina/sections/RotinaCalendarSection";
import { RotinaHabitsSection } from "@/components/rotina/sections/RotinaHabitsSection";
import { RotinaNotesSection } from "@/components/rotina/sections/RotinaNotesSection";
import { RotinaGoalsSection } from "@/components/rotina/sections/RotinaGoalsSection";
import { RotinaWeeklyReviewSection } from "@/components/rotina/sections/RotinaWeeklyReviewSection";
import { LockedFeatureModal } from "@/components/shared/LockedFeatureModal";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import { BottomNavBar } from "@/components/shared/BottomNavBar";

export type RotinaSection =
  | "today"
  | "tasks"
  | "calendar"
  | "habits"
  | "prayers"
  | "notes"
  | "goals"
  | "review";

const FREE_SECTIONS: RotinaSection[] = ["today", "tasks", "prayers"];

const Rotina = () => {
  const { user, loading: authLoading } = useAuth();
  const { planType, loading: planLoading, hasPaidPlan } = useUserPlan(user?.email || undefined);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [section, setSection] = useState<RotinaSection>(
    (params.get("s") as RotinaSection) || "today"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [lockOpen, setLockOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  const isAdmin = planType === "admin";
  const canAccessAll = hasPaidPlan || isAdmin;

  const handleSectionChange = (next: RotinaSection) => {
    if (!canAccessAll && !FREE_SECTIONS.includes(next)) {
      setLockOpen(true);
      return;
    }
    setSection(next);
    setParams({ s: next });
    setSidebarOpen(false);
  };

  if (authLoading || planLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="font-display font-bold text-2xl text-foreground tracking-tight mb-2">
            Devocionalzeiros <span className="text-primary">Rotina</span>
          </div>
          <div className="text-sm text-muted-foreground">Carregando sua rotina...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm px-3 py-2 flex items-center justify-between">
        <button
          onClick={() => (section !== "today" ? handleSectionChange("today") : navigate("/home"))}
          className="p-2 rounded-lg hover:bg-muted/20 transition-colors"
          title="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={() => setSettingsOpen(true)}
          className="p-2 rounded-lg hover:bg-muted/20 transition-colors"
          title="Configurações"
        >
          <SettingsIcon className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="flex flex-1 min-h-0">
        <RotinaSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeSection={section}
          onChange={handleSectionChange}
          freeSections={FREE_SECTIONS}
          canAccessAll={canAccessAll}
        />

        <div className="flex-1 flex flex-col min-w-0 w-full">
          <header className="sticky top-[44px] z-30 bg-card border-b border-border px-4 py-3 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-accent transition-colors text-foreground"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="font-display font-bold text-lg text-foreground tracking-tight">
                <span className="text-primary">Rotina</span>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-32">
            {section === "today" && <RotinaDashboard userId={user.id} onSectionChange={handleSectionChange} canAccessAll={canAccessAll} />}
            {section === "tasks" && <RotinaTasksSection userId={user.id} />}
            {section === "prayers" && <RotinaPrayersSection userId={user.id} />}
            {section === "calendar" && canAccessAll && <RotinaCalendarSection userId={user.id} />}
            {section === "habits" && canAccessAll && <RotinaHabitsSection userId={user.id} />}
            {section === "notes" && canAccessAll && <RotinaNotesSection userId={user.id} />}
            {section === "goals" && canAccessAll && <RotinaGoalsSection userId={user.id} />}
            {section === "review" && canAccessAll && <RotinaWeeklyReviewSection userId={user.id} />}
          </main>
        </div>
      </div>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <LockedFeatureModal
        isOpen={lockOpen}
        onClose={() => setLockOpen(false)}
        featureName="Devocionalzeiros Rotina (completo)"
        featureId="chat"
        currentPlan={planType || "free"}
      />
      <BottomNavBar />
    </div>
  );
};

export default Rotina;
