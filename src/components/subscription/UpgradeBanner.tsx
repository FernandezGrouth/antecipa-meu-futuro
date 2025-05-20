
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { checkSubscriptionStatus, createCheckoutSession } from '@/services/supabaseService';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const UpgradeBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);

  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkSubscriptionStatus();
      setSubscriptionData(status);
      
      // Show banner if in trial or not subscribed
      setShowBanner(status.inTrial || (!status.isSubscribed && !status.subscriptionActive));
    };
    
    checkStatus();
  }, []);

  const handleUpgrade = async (isAnnual: boolean) => {
    setLoading(true);
    // Use price IDs from your Stripe dashboard
    const priceId = isAnnual ? 'price_annual' : 'price_monthly';
    await createCheckoutSession(priceId, isAnnual);
    setLoading(false);
  };

  const formatTrialRemainingTime = () => {
    if (!subscriptionData?.trialEndsAt) return '';
    
    return formatDistanceToNow(new Date(subscriptionData.trialEndsAt), { 
      addSuffix: true, 
      locale: ptBR 
    });
  };

  if (!showBanner) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 relative">
      <button
        onClick={() => setShowBanner(false)}
        className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full p-1"
        aria-label="Fechar"
      >
        <X size={18} />
      </button>
      
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          {subscriptionData?.inTrial ? (
            <>
              <h3 className="font-semibold">Seu período de teste termina {formatTrialRemainingTime()}</h3>
              <p className="text-sm opacity-90">Atualize agora para continuar utilizando todas as funcionalidades</p>
            </>
          ) : (
            <>
              <h3 className="font-semibold">Acesso limitado</h3>
              <p className="text-sm opacity-90">Atualize para o plano premium para desbloquear todas as funcionalidades</p>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => handleUpgrade(false)}
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50"
            disabled={loading}
          >
            Plano Mensal
          </Button>
          <Button
            onClick={() => handleUpgrade(true)}
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50"
            disabled={loading}
          >
            <span className="relative">
              Plano Anual
              <span className="absolute -top-4 right-0 bg-green-500 text-xs px-1 rounded-sm font-medium">-20%</span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeBanner;
