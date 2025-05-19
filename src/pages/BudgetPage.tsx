
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BudgetDashboard from '@/components/budget/BudgetDashboard';

const BudgetPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-finance-dark mb-2">
              Meu Orçamento Pessoal
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Gerencie suas receitas e despesas em um só lugar. Monitore seu fluxo de caixa e 
              tome controle da sua vida financeira.
            </p>
          </div>
          
          <BudgetDashboard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BudgetPage;
