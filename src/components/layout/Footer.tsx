
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-finance-blue mb-4">FinanceSimulator</h3>
            <p className="text-gray-600">
              Sua ferramenta para tomar decisões financeiras inteligentes e economizar dinheiro.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-bold text-gray-800 mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li><Link to="/simulator" className="text-gray-600 hover:text-finance-blue">Simulador de Antecipação</Link></li>
              <li><Link to="/budget" className="text-gray-600 hover:text-finance-blue">Orçamento Pessoal</Link></li>
              <li><Link to="/goals" className="text-gray-600 hover:text-finance-blue">Metas Financeiras</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-bold text-gray-800 mb-4">Educação</h4>
            <ul className="space-y-2">
              <li><Link to="/education" className="text-gray-600 hover:text-finance-blue">Dicas Financeiras</Link></li>
              <li><Link to="/education/interest" className="text-gray-600 hover:text-finance-blue">Juros e Financiamentos</Link></li>
              <li><Link to="/education/budget" className="text-gray-600 hover:text-finance-blue">Planejamento Financeiro</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-bold text-gray-800 mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">contato@financesimulator.com</li>
              <li className="text-gray-600">Suporte: (00) 1234-5678</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2025 FinanceSimulator. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-finance-blue">Termos de Uso</a>
            <a href="#" className="text-gray-600 hover:text-finance-blue">Privacidade</a>
            <a href="#" className="text-gray-600 hover:text-finance-blue">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
