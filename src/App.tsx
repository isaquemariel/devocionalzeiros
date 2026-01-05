import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { SupportButton } from "@/components/SupportButton";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Biblia from "./pages/Biblia";
import Ranking from "./pages/Ranking";
import Devocional from "./pages/Devocional";
import DevocionalzeiroChat from "./pages/DevocionalzeiroChat";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to conditionally render support button (hide on landing page)
const ConditionalSupportButton = () => {
  const location = useLocation();
  const hiddenRoutes = ["/", "/clubehd"];
  
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }
  
  return <SupportButton />;
};

const AppContent = () => (
  <>
    <ConditionalSupportButton />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/clubehd" element={<Index />} />
      <Route path="/home" element={<Home />} />
      <Route path="/biblia" element={<Biblia />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/devocional" element={<Devocional />} />
      <Route path="/chat" element={<DevocionalzeiroChat />} />
      <Route path="/auth" element={<Auth />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
