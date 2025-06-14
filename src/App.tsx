
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CompostListings from "@/pages/CompostListings";
import MyCompostMatchDashboard from "./pages/MyCompostMatchDashboard";
import RegisterRestaurant from "./pages/RegisterRestaurant";
import RegisterGardener from "./pages/RegisterGardener";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register/restaurant" element={<RegisterRestaurant />} />
          <Route path="/register/gardener" element={<RegisterGardener />} />
          <Route path="/listings" element={<CompostListings />} />
          <Route path="/dashboard" element={<MyCompostMatchDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
