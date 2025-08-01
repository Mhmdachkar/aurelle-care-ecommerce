import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useVisitorTracking } from "./hooks/useVisitorTracking";
import { MetaPixelProvider } from "./hooks/MetaPixelProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Success from "./pages/Success";

const queryClient = new QueryClient();

const AppContent = () => {
  // Enable visitor tracking
  useVisitorTracking({
    enabled: true,
    trackPageViews: true,
    trackTimeOnPage: true,
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MetaPixelProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </MetaPixelProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
