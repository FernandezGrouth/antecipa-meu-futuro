
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAccessAllowed, checkSubscriptionStatus } from '@/services/supabaseService';
import { Button } from '@/components/ui/button';
import { createCheckoutSession } from '@/services/supabaseService';

interface SubscriptionGuardProps {
  children: React.ReactNode;
}

const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAccess = async () => {
      const status = await checkSubscriptionStatus();
      setSubscriptionData(status);
      
      // Allow access if subscribed or in trial period
      const access = await isAccessAllowed();
      setHasAccess(access);
      setLoading(false);
    };
    
    checkAccess();
  }, []);

  const handleUpgrade = async (isAnnual: boolean) => {
    const priceId = isAnnual ? 'price_annual' : 'price_monthly';
    await createCheckoutSession(priceId, isAnnual);
  };

  // Páginas que são sempre acessíveis mesmo sem assinatura
  const publicPages = ['/auth'];
  const isPublicPage = publicPages.includes(location.pathname);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Permitir acesso a páginas públicas ou quando o usuário tem acesso permitido
  if (isPublicPage || hasAccess) {
    return <>{children}</>;
  }

  // Caso contrário, mostrar página de upgrade
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Seu período de teste expirou</h2>
        <p className="text-gray-600 mb-6">
          Para continuar utilizando todas as funcionalidades do sistema, por favor atualize para um de nossos planos.
        </p>
        
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-lg text-blue-800">Plano Mensal</h3>
            <p className="text-blue-600 text-xl font-bold my-2">R$ 29,90/mês</p>
            <Button 
              onClick={() => handleUpgrade(false)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Assinar Plano Mensal
            </Button>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 relative">
            <span className="absolute -top-3 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">Economia de 20%</span>
            <h3 className="font-medium text-lg text-green-800">Plano Anual</h3>
            <p className="text-green-600 text-xl font-bold my-2">R$ 287,00/ano</p>
            <p className="text-green-600 text-sm mb-2">R$ 23,92/mês</p>
            <Button 
              onClick={() => handleUpgrade(true)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Assinar Plano Anual
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionGuard;
