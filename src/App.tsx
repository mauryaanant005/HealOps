import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import Chatbot from "./pages/Chatbot";
import Monitoring from "./pages/Monitoring";
import Incidents from "./pages/Incidents";
import SelfHealing from "./pages/SelfHealing";
import Logs from "./pages/Logs";
import Configuration from "./pages/Configuration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/self-healing" element={<SelfHealing />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/configuration" element={<Configuration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
