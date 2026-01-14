import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { SoundProvider } from "@/contexts/SoundContext";
import { Loader2 } from "lucide-react";

// Eager load critical pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";

// Lazy load internal pages for better initial load performance
const Home = lazy(() => import("./pages/Home"));
const Biblia = lazy(() => import("./pages/Biblia"));
const BibliaEstudo = lazy(() => import("./pages/BibliaEstudo"));
const Ranking = lazy(() => import("./pages/Ranking"));
const Devocional = lazy(() => import("./pages/Devocional"));
const DevocionalzeiroChat = lazy(() => import("./pages/DevocionalzeiroChat"));
const SermonGenerator = lazy(() => import("./pages/SermonGenerator"));
const Quiz = lazy(() => import("./pages/Quiz"));
const AdminHD = lazy(() => import("./pages/AdminHD"));
const Embaixador = lazy(() => import("./pages/Embaixador"));
const EmbaixadorPublic = lazy(() => import("./pages/EmbaixadorPublic"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-white/50 text-sm">Carregando...</p>
    </div>
  </div>
);

// Optimized QueryClient with better caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <SoundProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
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
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </SoundProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
