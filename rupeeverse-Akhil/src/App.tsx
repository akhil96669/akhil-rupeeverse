import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OfflineTransactionProvider } from "./contexts/OfflineTransactionContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Transactions from "./pages/Transactions";
import FinLearn from "./pages/FinLearn";
import RupeeAI from "./pages/RupeeAI";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <OfflineTransactionProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/finlearn" element={<FinLearn />} />
              <Route path="/rupee-ai" element={<RupeeAI />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </OfflineTransactionProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
