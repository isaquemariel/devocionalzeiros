import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { SoundProvider } from "@/contexts/SoundContext";
import { FloatingMascot, MascotLoader } from "@/components/shared/FloatingMascot";
import { AppPresenceWrapper } from "@/components/shared/AppPresenceWrapper";
import { NativePushBootstrap } from "@/components/shared/NativePushBootstrap";
import { GlobalAchievementUnlockWatcher } from "@/components/shared/GlobalAchievementUnlockWatcher";
import { useCartSync } from "@/hooks/useCartSync";

// Auto-retry dynamic imports: on chunk failure, busts SW caches and reloads.
// Prevents the dreaded "404 page" caused by stale PWA precache pointing to
// hashed chunk filenames that no longer exist after a deploy.
async function nukeCachesAndReload() {
  try {
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
    }
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }
  } catch {
    // ignore
  }
  // Append a cache-busting query param so the browser re-fetches index.html
  const url = new URL(window.location.href);
  url.searchParams.set("_r", Date.now().toString());
  window.location.replace(url.toString());
}

function lazyRetry(factory: () => Promise<any>) {
  return lazy(() =>
    factory().catch(async (err) => {
      const key = "chunk_reload_v2";
      const attempts = parseInt(sessionStorage.getItem(key) || "0", 10);
      if (attempts < 2) {
        sessionStorage.setItem(key, String(attempts + 1));
        await nukeCachesAndReload();
        return new Promise(() => {}); // never resolves; page is reloading
      }
      // Final fallback: drop the user on /home instead of a broken 404
      sessionStorage.removeItem(key);
      console.error("[lazyRetry] chunk load failed after retries", err);
      if (window.location.pathname !== "/home") {
        window.location.replace("/home");
        return new Promise(() => {});
      }
      throw err;
    })
  );
}

// Eager load Auth (common entry), lazy load landing
import Auth from "./pages/Auth";
const Index = lazyRetry(() => import("./pages/Index"));

// Lazy load internal pages for better initial load performance
const Home = lazyRetry(() => import("./pages/Home"));
const Biblia = lazyRetry(() => import("./pages/Biblia"));
const BibliaEstudo = lazyRetry(() => import("./pages/BibliaEstudo"));
const Ranking = lazyRetry(() => import("./pages/Ranking"));
const Devocional = lazyRetry(() => import("./pages/Devocional"));
const DevocionalzeiroChat = lazyRetry(() => import("./pages/DevocionalzeiroChat"));
const SermonGenerator = lazyRetry(() => import("./pages/SermonGenerator"));
const Quiz = lazyRetry(() => import("./pages/Quiz"));
const AdminHD = lazyRetry(() => import("./pages/AdminHD"));
const Embaixador = lazyRetry(() => import("./pages/Embaixador"));
const EmbaixadorPublic = lazyRetry(() => import("./pages/EmbaixadorPublic"));
const VerseDevotional = lazyRetry(() => import("./pages/VerseDevotional"));
const Planos = lazyRetry(() => import("./pages/Planos"));
const EscolherPlano = lazyRetry(() => import("./pages/EscolherPlano"));
const Conquistas = lazyRetry(() => import("./pages/Conquistas"));
const RPG = lazyRetry(() => import("./pages/RPG"));
const Loja = lazyRetry(() => import("./pages/Loja"));
const NotFound = lazyRetry(() => import("./pages/NotFound"));
const Privacidade = lazyRetry(() => import("./pages/Privacidade"));
const Exclusao = lazyRetry(() => import("./pages/Exclusao"));
const Comunidade = lazyRetry(() => import("./pages/Comunidade"));
const Aulas = lazyRetry(() => import("./pages/Aulas"));
const AulasCurso = lazyRetry(() => import("./pages/AulasCurso"));
const AulasAula = lazyRetry(() => import("./pages/AulasAula"));
const AulasAdmin = lazyRetry(() => import("./pages/AulasAdmin"));
const AulasLogin = lazyRetry(() => import("./pages/AulasLogin"));
const AulasEnoqueIntro = lazyRetry(() => import("./pages/AulasEnoque").then(m => ({ default: m.AulasEnoqueIntro })));
const AulasEnoqueReader = lazyRetry(() => import("./pages/AulasEnoque").then(m => ({ default: m.AulasEnoqueReader })));
const AulasEnoqueFavoritos = lazyRetry(() => import("./pages/AulasEnoque").then(m => ({ default: m.AulasEnoqueFavoritos })));
const AulasEnoqueVideos = lazyRetry(() => import("./pages/AulasEnoque").then(m => ({ default: m.AulasEnoqueVideos })));
import { AulasGuard } from "@/components/aulas/AulasGuard";

// QueryClient with balanced caching - auto-refreshes on focus
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1,
    },
  },
});

const CartSyncWrapper = ({ children }: { children: React.ReactNode }) => {
  useCartSync();
  return <>{children}</>;
};

const cleanupDialogLocks = () => {
  document.body.style.pointerEvents = "";
  document.body.style.overflow = "";
  document.body.removeAttribute("data-scroll-locked");
};

const RouteDialogLockCleanup = () => {
  const location = useLocation();

  useEffect(() => {
    cleanupDialogLocks();
  }, [location.pathname, location.search, location.hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <SoundProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteDialogLockCleanup />
            <Suspense fallback={<MascotLoader />}>
              <AppPresenceWrapper>
              <NativePushBootstrap />
              <CartSyncWrapper>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/clubehd" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/biblia" element={<Biblia />} />
                <Route path="/biblia-estudo" element={<BibliaEstudo />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/devocional" element={<Devocional />} />
                <Route path="/chat" element={<DevocionalzeiroChat />} />
                <Route path="/sermao" element={<SermonGenerator />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/adminhd" element={<AdminHD />} />
                <Route path="/embaixador" element={<Embaixador />} />
                <Route path="/seja-embaixador" element={<EmbaixadorPublic />} />
                <Route path="/verse-devotional" element={<VerseDevotional />} />
                <Route path="/planos" element={<Planos />} />
                <Route path="/escolher-plano" element={<EscolherPlano />} />
                <Route path="/conquistas" element={<Conquistas />} />
                <Route path="/rpg" element={<RPG />} />
                <Route path="/loja" element={<Loja />} />
                <Route path="/privacidade" element={<Privacidade />} />
                <Route path="/exclusao" element={<Exclusao />} />
                <Route path="/comunidade" element={<Comunidade />} />
                <Route path="/aulas/login" element={<AulasLogin />} />
                <Route path="/aulas" element={<AulasGuard><Aulas /></AulasGuard>} />
                <Route path="/aulas/admin" element={<AulasGuard requireAdmin><AulasAdmin /></AulasGuard>} />
                <Route path="/aulas/curso/:slug" element={<AulasGuard><AulasCurso /></AulasGuard>} />
                <Route path="/aulas/aula/:id" element={<AulasGuard><AulasAula /></AulasGuard>} />
                <Route path="/aulas/enoque" element={<AulasGuard><AulasEnoqueIntro /></AulasGuard>} />
                <Route path="/aulas/enoque/favoritos" element={<AulasGuard><AulasEnoqueFavoritos /></AulasGuard>} />
                <Route path="/aulas/enoque/videos" element={<AulasGuard><AulasEnoqueVideos /></AulasGuard>} />
                <Route path="/aulas/enoque/ler/:chapter" element={<AulasGuard><AulasEnoqueReader /></AulasGuard>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              {/* Global floating mascot - appears on all app pages */}
              <FloatingMascot />
              {/* Global achievement unlock popup - works on any page */}
              <GlobalAchievementUnlockWatcher />
              </CartSyncWrapper>
              </AppPresenceWrapper>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </SoundProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
