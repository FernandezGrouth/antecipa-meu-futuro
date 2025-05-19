
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import SimulationResult from './SimulationResult';

const LoanSimulator = () => {
  const [loanType, setLoanType] = useState('vehicle');
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(1.0);
  const [totalInstallments, setTotalInstallments] = useState(48);
  const [paidInstallments, setPaidInstallments] = useState(6);
  const [monthlyPayment, setMonthlyPayment] = useState(1302.44);
  const [anticipateInstallments, setAnticipateInstallments] = useState(1);
  
  const [showResults, setShowResults] = useState(false);
  const [simulationResult, setSimulationResult] = useState({
    originalTotal: 0,
    newTotal: 0,
    interestSaved: 0,
    timeSaved: 0,
    newEndDate: '',
    originalEndDate: ''
  });

  // Set defaults based on loan type
  useEffect(() => {
    switch(loanType) {
      case 'vehicle':
        setLoanAmount(50000);
        setInterestRate(1.0);
        setTotalInstallments(48);
        setPaidInstallments(6);
        setMonthlyPayment(1302.44);
        break;
      case 'property':
        setLoanAmount(300000);
        setInterestRate(0.65);
        setTotalInstallments(360);
        setPaidInstallments(24);
        setMonthlyPayment(2394.05);
        break;
      case 'other':
        setLoanAmount(15000);
        setInterestRate(2.5);
        setTotalInstallments(24);
        setPaidInstallments(3);
        setMonthlyPayment(818.38);
        break;
    }
    setShowResults(false);
  }, [loanType]);

  // Calculate monthly payment (very simplified)
  const calculateMonthlyPayment = () => {
    const monthlyInterestRate = interestRate / 100;
    const x = Math.pow(1 + monthlyInterestRate, totalInstallments);
    return loanAmount * (monthlyInterestRate * x) / (x - 1);
  };

  // Update monthly payment when loan details change
  useEffect(() => {
    const calculated = calculateMonthlyPayment();
    setMonthlyPayment(calculated);
  }, [loanAmount, interestRate, totalInstallments]);

  // Run simulation when submit button is clicked
  const runSimulation = () => {
    // Remaining loan term
    const remainingInstallments = totalInstallments - paidInstallments;
    
    // Remaining balance calculation (simplified)
    const monthlyInterestRate = interestRate / 100;
    const remainingBalance = monthlyPayment * 
      ((1 - Math.pow(1 + monthlyInterestRate, -remainingInstallments)) / monthlyInterestRate);
    
    // Total cost with current plan
    const originalTotal = monthlyPayment * remainingInstallments;
    
    // Calculate time with extra payment
    let balance = remainingBalance;
    let regularPaymentMonths = 0;
    let interestPaid = 0;
    
    while (balance > 0) {
      // Add monthly interest
      balance += balance * (interestRate / 100);
      
      // Regular payment plus acceleration
      let payment = monthlyPayment;
      if (regularPaymentMonths < anticipateInstallments) {
        payment = monthlyPayment * 2; // Double payment for accelerated months
      }
      
      if (payment > balance) {
        payment = balance;
      }
      
      interestPaid += payment - (payment / (1 + (interestRate / 100)));
      balance -= payment;
      regularPaymentMonths++;
    }
    
    // Calculate results
    const newTotal = regularPaymentMonths * monthlyPayment + 
      anticipateInstallments * monthlyPayment; // Additional payments
      
    const interestSaved = originalTotal - newTotal;
    const timeSaved = remainingInstallments - regularPaymentMonths;
    
    // Calculate end dates
    const today = new Date();
    const originalEndDate = new Date(today);
    originalEndDate.setMonth(originalEndDate.getMonth() + remainingInstallments);
    
    const newEndDate = new Date(today);
    newEndDate.setMonth(newEndDate.getMonth() + regularPaymentMonths);
    
    setSimulationResult({
      originalTotal,
      newTotal,
      interestSaved: originalTotal - newTotal,
      timeSaved,
      originalEndDate: originalEndDate.toLocaleDateString('pt-BR', {year: 'numeric', month: 'long'}),
      newEndDate: newEndDate.toLocaleDateString('pt-BR', {year: 'numeric', month: 'long'})
    });
    
    setShowResults(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="vehicle" onValueChange={value => setLoanType(value)}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="vehicle">Veículo</TabsTrigger>
          <TabsTrigger value="property">Imóvel</TabsTrigger>
          <TabsTrigger value="other">Outros</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vehicle" className="mt-0">
          <Card className="financial-card">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="section-title">Detalhes do Financiamento de Veículo</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Valor do financiamento (R$)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Taxa de juros mensal (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="totalInstallments">Prazo total (meses)</Label>
                    <Input
                      id="totalInstallments"
                      type="number"
                      value={totalInstallments}
                      onChange={(e) => setTotalInstallments(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="paidInstallments">Parcelas já pagas</Label>
                    <Input
                      id="paidInstallments"
                      type="number"
                      value={paidInstallments}
                      onChange={(e) => setPaidInstallments(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="monthlyPayment">Valor da parcela (R$)</Label>
                    <Input
                      id="monthlyPayment"
                      type="number"
                      step="0.01"
                      value={monthlyPayment.toFixed(2)}
                      onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="section-title">Opções de Antecipação</h2>
                
                <div className="space-y-2">
                  <Label>Quantidade de parcelas adicionais por mês</Label>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[anticipateInstallments]}
                      onValueChange={(value) => setAnticipateInstallments(value[0])}
                      max={5}
                      step={1}
                      className="flex-grow"
                    />
                    <span className="font-medium text-lg text-finance-blue">{anticipateInstallments}</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={runSimulation} className="btn-finance-primary">
                Simular Antecipação
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="property" className="mt-0">
          <Card className="financial-card">
            {/* Similar UI as vehicle tab, with property-specific defaults */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="section-title">Detalhes do Financiamento de Imóvel</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Valor do financiamento (R$)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Taxa de juros mensal (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="totalInstallments">Prazo total (meses)</Label>
                    <Input
                      id="totalInstallments"
                      type="number"
                      value={totalInstallments}
                      onChange={(e) => setTotalInstallments(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="paidInstallments">Parcelas já pagas</Label>
                    <Input
                      id="paidInstallments"
                      type="number"
                      value={paidInstallments}
                      onChange={(e) => setPaidInstallments(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="monthlyPayment">Valor da parcela (R$)</Label>
                    <Input
                      id="monthlyPayment"
                      type="number"
                      step="0.01"
                      value={monthlyPayment.toFixed(2)}
                      onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="section-title">Opções de Antecipação</h2>
                
                <div className="space-y-2">
                  <Label>Quantidade de parcelas adicionais por mês</Label>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[anticipateInstallments]}
                      onValueChange={(value) => setAnticipateInstallments(value[0])}
                      max={5}
                      step={1}
                      className="flex-grow"
                    />
                    <span className="font-medium text-lg text-finance-blue">{anticipateInstallments}</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={runSimulation} className="btn-finance-primary">
                Simular Antecipação
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="other" className="mt-0">
          <Card className="financial-card">
            {/* Similar UI with other loan type defaults */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="section-title">Detalhes de Outros Financiamentos</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Valor do financiamento (R$)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Taxa de juros mensal (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="totalInstallments">Prazo total (meses)</Label>
                    <Input
                      id="totalInstallments"
                      type="number"
                      value={totalInstallments}
                      onChange={(e) => setTotalInstallments(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="paidInstallments">Parcelas já pagas</Label>
                    <Input
                      id="paidInstallments"
                      type="number"
                      value={paidInstallments}
                      onChange={(e) => setPaidInstallments(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="monthlyPayment">Valor da parcela (R$)</Label>
                    <Input
                      id="monthlyPayment"
                      type="number"
                      step="0.01"
                      value={monthlyPayment.toFixed(2)}
                      onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                      className="input-finance"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="section-title">Opções de Antecipação</h2>
                
                <div className="space-y-2">
                  <Label>Quantidade de parcelas adicionais por mês</Label>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[anticipateInstallments]}
                      onValueChange={(value) => setAnticipateInstallments(value[0])}
                      max={5}
                      step={1}
                      className="flex-grow"
                    />
                    <span className="font-medium text-lg text-finance-blue">{anticipateInstallments}</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={runSimulation} className="btn-finance-primary">
                Simular Antecipação
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      {showResults && (
        <SimulationResult result={simulationResult} loanType={loanType} anticipateInstallments={anticipateInstallments} />
      )}
    </div>
  );
};

export default LoanSimulator;
