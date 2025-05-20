
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import SubscriptionGuard from "@/components/layout/SubscriptionGuard";
import UpgradeBanner from "@/components/subscription/UpgradeBanner";
import Index from "./pages/Index";
import SimulatorPage from "./pages/SimulatorPage";
import BudgetPage from "./pages/BudgetPage";
import GoalsPage from "./pages/GoalsPage";
import EducationPage from "./pages/EducationPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <UpgradeBanner />
      {children}
    </>
  );
};

// Auth wrapper to handle auth context
const AuthenticatedApp = () => (
  <Routes>
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/" element={
      <ProtectedRoute>
        <SubscriptionGuard><Index /></SubscriptionGuard>
      </ProtectedRoute>
    } />
    <Route path="/simulator" element={
      <ProtectedRoute>
        <SubscriptionGuard><SimulatorPage /></SubscriptionGuard>
      </ProtectedRoute>
    } />
    <Route path="/budget" element={
      <ProtectedRoute>
        <SubscriptionGuard><BudgetPage /></SubscriptionGuard>
      </ProtectedRoute>
    } />
    <Route path="/goals" element={
      <ProtectedRoute>
        <SubscriptionGuard><GoalsPage /></SubscriptionGuard>
      </ProtectedRoute>
    } />
    <Route path="/education" element={
      <ProtectedRoute>
        <SubscriptionGuard><EducationPage /></SubscriptionGuard>
      </ProtectedRoute>
    } />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AuthenticatedApp />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
