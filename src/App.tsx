
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Contracts from "./pages/Contracts";
import Compliance from "./pages/Compliance";
import Reports from "./pages/Reports";
import Workflows from "./pages/Workflows";
import Categories from "./pages/Categories";
import LiveDeals from "./pages/LiveDeals";
import NotFound from "./pages/NotFound";
import ProcurementMethods from "./pages/ProcurementMethods";
import Quantification from "./pages/Quantification";
import Reconciliation from "./pages/Reconciliation";
import GroupPurchasing from "./pages/GroupPurchasing";
import QualityAssurance from "./pages/QualityAssurance";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Add smooth page transitions
  useEffect(() => {
    // Apply a smooth scrolling behavior to the entire document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/live-deals" element={<LiveDeals />} />
            <Route path="/procurement-methods" element={<ProcurementMethods />} />
            <Route path="/quantification" element={<Quantification />} />
            <Route path="/reconciliation" element={<Reconciliation />} />
            <Route path="/group-purchasing" element={<GroupPurchasing />} />
            <Route path="/quality-assurance" element={<QualityAssurance />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
