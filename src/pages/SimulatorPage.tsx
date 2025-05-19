
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoanSimulator from '@/components/simulator/LoanSimulator';

const SimulatorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-finance-dark mb-2">
              Simulador de Antecipação de Financiamentos
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Calcule quanto você pode economizar antecipando parcelas do seu financiamento. 
              Visualize a redução de juros e do prazo total.
            </p>
          </div>
          
          <LoanSimulator />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SimulatorPage;
