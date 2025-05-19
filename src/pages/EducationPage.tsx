
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FinancialEducation from '@/components/education/FinancialEducation';

const EducationPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-finance-dark mb-2">
              Educação Financeira
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Aprenda conceitos financeiros importantes e dicas práticas para melhorar sua relação com o dinheiro.
            </p>
          </div>
          
          <FinancialEducation />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EducationPage;
