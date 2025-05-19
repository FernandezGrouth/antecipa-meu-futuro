
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold text-finance-blue">FinanceSimulator</Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-finance-blue transition-colors">Início</Link>
          <Link to="/simulator" className="text-gray-700 hover:text-finance-blue transition-colors">Simulador</Link>
          <Link to="/budget" className="text-gray-700 hover:text-finance-blue transition-colors">Orçamento</Link>
          <Link to="/goals" className="text-gray-700 hover:text-finance-blue transition-colors">Metas</Link>
          <Link to="/education" className="text-gray-700 hover:text-finance-blue transition-colors">Educação Financeira</Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="hidden md:block">Entrar</Button>
          <Button className="bg-finance-blue hover:bg-blue-700">Começar agora</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
