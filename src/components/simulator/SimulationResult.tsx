
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'recharts';

// Define the prop types
interface SimulationResultProps {
  result: {
    originalTotal: number;
    newTotal: number;
    interestSaved: number;
    timeSaved: number;
    originalEndDate: string;
    newEndDate: string;
  };
  loanType: string;
  anticipateInstallments: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const SimulationResult = ({ result, loanType, anticipateInstallments }: SimulationResultProps) => {
  // Data for the charts
  const compareData = [
    {
      name: 'Original',
      value: result.originalTotal,
      fill: '#0066CC',
    },
    {
      name: 'Com Antecipação',
      value: result.newTotal,
      fill: '#00A67E',
    },
  ];

  const savingsData = [
    {
      name: 'Valor Pago',
      value: result.newTotal,
      fill: '#00A67E',
    },
    {
      name: 'Economia',
      value: result.interestSaved,
      fill: '#00B8A9',
    },
  ];
  
  // Loan type descriptive text
  const loanTypeText = {
    vehicle: 'do veículo',
    property: 'do imóvel',
    other: 'do seu bem',
  }[loanType] || '';
  
  return (
    <div className="mt-8 space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-finance-dark">Resultado da Simulação</h2>
      
      <Card className="financial-card">
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-finance-dark">
              Antecipando {anticipateInstallments} parcela{anticipateInstallments > 1 ? 's' : ''} por mês
            </h3>
            <p className="text-gray-600 mt-2">
              Veja o quanto você pode economizar e quanto tempo a menos de financiamento
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card-metric border-finance-green">
              <p className="text-gray-500 text-sm mb-1">Economia de Juros</p>
              <p className="text-2xl font-bold text-finance-green animate-value">
                {formatCurrency(result.interestSaved)}
              </p>
            </div>
            
            <div className="card-metric border-finance-blue">
              <p className="text-gray-500 text-sm mb-1">Tempo Economizado</p>
              <p className="text-2xl font-bold text-finance-blue animate-value">
                {result.timeSaved} {result.timeSaved === 1 ? 'mês' : 'meses'}
              </p>
            </div>
            
            <div className="card-metric border-finance-teal">
              <p className="text-gray-500 text-sm mb-1">Término Antecipado</p>
              <p className="text-2xl font-bold text-finance-teal animate-value">
                {result.newEndDate}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-finance-dark">Comparação de Cenários</h3>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total sem antecipação:</span>
                    <span className="font-semibold">{formatCurrency(result.originalTotal)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total com antecipação:</span>
                    <span className="font-semibold text-finance-green">{formatCurrency(result.newTotal)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="font-semibold">Economia total:</span>
                    <span className="font-bold text-finance-green">{formatCurrency(result.interestSaved)}</span>
                  </div>
                </div>
                
                <div className="mt-4 h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-finance-green rounded-full"
                    style={{ width: `${(result.newTotal / result.originalTotal) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Com antecipação</span>
                  <span>Sem antecipação</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-finance-dark">Prazos</h3>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Término original:</span>
                    <span className="font-semibold">{result.originalEndDate}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Novo término:</span>
                    <span className="font-semibold text-finance-blue">{result.newEndDate}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="font-semibold">Tempo economizado:</span>
                    <span className="font-bold text-finance-blue">
                      {result.timeSaved} {result.timeSaved === 1 ? 'mês' : 'meses'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="relative h-16">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 rounded-full mt-6"></div>
                    <div className="absolute top-0 left-0 h-2 bg-finance-blue rounded-full mt-6" 
                      style={{
                        width: `${100 - (result.timeSaved / (result.timeSaved + result.newTotal / result.originalTotal * 100)) * 100}%`
                      }}
                    ></div>
                    
                    <div className="absolute -top-1 -ml-2 mt-6 left-0">
                      <div className="w-4 h-4 rounded-full bg-finance-blue"></div>
                      <div className="mt-1 text-xs">Hoje</div>
                    </div>
                    
                    <div className="absolute -top-1 -ml-2 mt-6" 
                      style={{
                        left: `${100 - (result.timeSaved / (result.timeSaved + result.newTotal / result.originalTotal * 100)) * 100}%`
                      }}
                    >
                      <div className="w-4 h-4 rounded-full bg-finance-blue"></div>
                      <div className="mt-1 text-xs whitespace-nowrap">Novo término</div>
                    </div>
                    
                    <div className="absolute -top-1 -ml-2 mt-6 right-0">
                      <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                      <div className="mt-1 text-xs">Término original</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-6 border-t border-gray-200 mt-6">
            <h3 className="font-semibold text-lg text-finance-dark">O que fazer com este dinheiro?</h3>
            <p className="text-gray-600">
              Com uma economia de {formatCurrency(result.interestSaved)}, você poderia:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-finance-gray p-4 rounded-lg border-l-4 border-finance-blue">
                <h4 className="font-semibold">Investir</h4>
                <p className="text-sm text-gray-600">
                  Aplicando essa economia em um investimento com rendimento de 1% ao mês, você 
                  teria aproximadamente {formatCurrency(result.interestSaved * 1.12)} em um ano.
                </p>
              </div>
              <div className="bg-finance-gray p-4 rounded-lg border-l-4 border-finance-green">
                <h4 className="font-semibold">Criar Reserva de Emergência</h4>
                <p className="text-sm text-gray-600">
                  Esse valor é suficiente para cobrir despesas inesperadas e dar mais segurança financeira.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button className="btn-finance-primary flex-1">Compartilhar Simulação</Button>
              <Button className="btn-finance-secondary flex-1">Fazer Nova Simulação</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SimulationResult;
