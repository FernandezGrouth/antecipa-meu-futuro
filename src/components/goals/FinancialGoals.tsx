
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

// Sample goals data
const initialGoals = [
  {
    id: 1,
    name: 'Quitar financiamento do carro',
    currentAmount: 12000,
    targetAmount: 25000,
    endDate: '2025-12-31',
    category: 'Dívidas',
    priority: 'Alta',
    color: '#0066CC',
  },
  {
    id: 2,
    name: 'Viagem para praia',
    currentAmount: 3500,
    targetAmount: 5000,
    endDate: '2025-07-15',
    category: 'Lazer',
    priority: 'Média',
    color: '#FF5A5F',
  },
  {
    id: 3,
    name: 'Reserva de emergência',
    currentAmount: 8000,
    targetAmount: 20000,
    endDate: '2026-05-10',
    category: 'Segurança',
    priority: 'Alta',
    color: '#00A67E',
  }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

interface Goal {
  id: number;
  name: string;
  currentAmount: number;
  targetAmount: number;
  endDate: string;
  category: string;
  priority: string;
  color: string;
}

const FinancialGoals = () => {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    endDate: '',
    category: 'Outros',
    priority: 'Média',
  });
  const [addAmount, setAddAmount] = useState({
    goalId: 0,
    amount: ''
  });
  
  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };
  
  const calculateTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffInTime = end.getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    
    if (diffInDays < 0) {
      return 'Meta vencida';
    } else if (diffInDays === 0) {
      return 'Último dia';
    } else if (diffInDays === 1) {
      return '1 dia restante';
    } else if (diffInDays < 30) {
      return `${diffInDays} dias restantes`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} ${months === 1 ? 'mês' : 'meses'} restantes`;
    } else {
      const years = Math.floor(diffInDays / 365);
      const remainingMonths = Math.floor((diffInDays % 365) / 30);
      if (remainingMonths === 0) {
        return `${years} ${years === 1 ? 'ano' : 'anos'} restantes`;
      } else {
        return `${years} ${years === 1 ? 'ano' : 'anos'} e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'} restantes`;
      }
    }
  };
  
  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.endDate) return;
    
    const goal = {
      id: Date.now(),
      name: newGoal.name,
      currentAmount: 0,
      targetAmount: parseFloat(newGoal.targetAmount),
      endDate: newGoal.endDate,
      category: newGoal.category,
      priority: newGoal.priority,
      color: '#' + Math.floor(Math.random()*16777215).toString(16), // Random color
    };
    
    setGoals([...goals, goal]);
    
    // Reset form
    setNewGoal({
      name: '',
      targetAmount: '',
      endDate: '',
      category: 'Outros',
      priority: 'Média',
    });
  };
  
  const handleAddToGoal = () => {
    if (!addAmount.goalId || !addAmount.amount) return;
    
    setGoals(goals.map(goal => {
      if (goal.id === addAmount.goalId) {
        return {
          ...goal,
          currentAmount: goal.currentAmount + parseFloat(addAmount.amount)
        };
      }
      return goal;
    }));
    
    // Reset form
    setAddAmount({
      goalId: 0,
      amount: ''
    });
  };
  
  const sortedGoals = [...goals].sort((a, b) => {
    const aPriority = a.priority === 'Alta' ? 3 : a.priority === 'Média' ? 2 : 1;
    const bPriority = b.priority === 'Alta' ? 3 : b.priority === 'Média' ? 2 : 1;
    return bPriority - aPriority;
  });
  
  const completedGoals = goals.filter(goal => goal.currentAmount >= goal.targetAmount);
  const inProgressGoals = goals.filter(goal => goal.currentAmount < goal.targetAmount);
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-finance-dark mb-2">Minhas Metas Financeiras</h1>
        <p className="text-gray-600">Defina objetivos e acompanhe seu progresso financeiro</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="financial-card">
          <h3 className="text-lg font-semibold text-finance-dark mb-2">Total em Metas</h3>
          <p className="text-3xl font-bold text-finance-blue">
            {formatCurrency(goals.reduce((acc, goal) => acc + goal.currentAmount, 0))}
          </p>
          <div className="mt-2 text-sm text-gray-500">Valor acumulado</div>
        </Card>
        
        <Card className="financial-card">
          <h3 className="text-lg font-semibold text-finance-dark mb-2">Objetivo Total</h3>
          <p className="text-3xl font-bold text-finance-purple">
            {formatCurrency(goals.reduce((acc, goal) => acc + goal.targetAmount, 0))}
          </p>
          <div className="mt-2 text-sm text-gray-500">Valor a alcançar</div>
        </Card>
        
        <Card className="financial-card">
          <h3 className="text-lg font-semibold text-finance-dark mb-2">Progresso Geral</h3>
          <p className="text-3xl font-bold text-finance-green">
            {calculateProgress(
              goals.reduce((acc, goal) => acc + goal.currentAmount, 0),
              goals.reduce((acc, goal) => acc + goal.targetAmount, 0)
            )}%
          </p>
          <div className="mt-2">
            <Progress value={calculateProgress(
              goals.reduce((acc, goal) => acc + goal.currentAmount, 0),
              goals.reduce((acc, goal) => acc + goal.targetAmount, 0)
            )} className="h-2" />
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="in-progress">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
              <TabsTrigger value="completed">Concluídas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="in-progress" className="space-y-4">
              {inProgressGoals.length === 0 && (
                <Card className="financial-card text-center py-8">
                  <p className="text-gray-500">Você ainda não tem metas em andamento.</p>
                  <p className="text-gray-500 mt-2">Adicione uma meta para começar!</p>
                </Card>
              )}
              
              {inProgressGoals.map(goal => (
                <Card key={goal.id} className="financial-card">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-finance-dark">{goal.name}</h3>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 mt-1">
                        {goal.category}
                      </span>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ml-2 mt-1 ${
                        goal.priority === 'Alta' ? 'bg-red-100 text-red-800' : 
                        goal.priority === 'Média' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        Prioridade {goal.priority}
                      </span>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Adicionar Valor</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adicionar valor à meta</DialogTitle>
                          <DialogDescription>
                            Informe quanto deseja adicionar à meta "{goal.name}"
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="space-y-2">
                            <Label htmlFor="add-amount">Valor (R$)</Label>
                            <Input
                              id="add-amount"
                              type="number"
                              value={addAmount.goalId === goal.id ? addAmount.amount : ''}
                              onChange={(e) => setAddAmount({ goalId: goal.id, amount: e.target.value })}
                              placeholder="0.00"
                              className="input-finance"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleAddToGoal}>Adicionar</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{formatCurrency(goal.currentAmount)}</span>
                      <span>{formatCurrency(goal.targetAmount)}</span>
                    </div>
                    <Progress value={calculateProgress(goal.currentAmount, goal.targetAmount)} className="h-2" 
                      style={{ backgroundColor: `${goal.color}30` }}
                      indicatorStyle={{ backgroundColor: goal.color }}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm font-medium">
                        {calculateProgress(goal.currentAmount, goal.targetAmount)}% completo
                      </div>
                      <div className="text-sm text-gray-500">
                        {calculateTimeRemaining(goal.endDate)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Falta</p>
                        <p className="font-semibold">
                          {formatCurrency(goal.targetAmount - goal.currentAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Valor Mensal Sugerido</p>
                        <p className="font-semibold">
                          {formatCurrency(
                            (goal.targetAmount - goal.currentAmount) / 
                            (Math.max(Math.ceil((new Date(goal.endDate).getTime() - new Date().getTime()) / 
                            (1000 * 3600 * 24 * 30)), 1))
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {completedGoals.length === 0 && (
                <Card className="financial-card text-center py-8">
                  <p className="text-gray-500">Você ainda não tem metas concluídas.</p>
                  <p className="text-gray-500 mt-2">Continue progredindo em suas metas atuais!</p>
                </Card>
              )}
              
              {completedGoals.map(goal => (
                <Card key={goal.id} className="financial-card">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-finance-dark">{goal.name}</h3>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 mt-1">
                        {goal.category}
                      </span>
                      <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Meta Concluída! 🎉
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{formatCurrency(goal.currentAmount)}</span>
                      <span>{formatCurrency(goal.targetAmount)}</span>
                    </div>
                    <Progress value={100} className="h-2 bg-green-100" 
                      style={{ backgroundColor: `${goal.color}30` }}
                      indicatorStyle={{ backgroundColor: goal.color }}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm font-medium text-green-600">
                        100% completo
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="financial-card">
            <h3 className="text-xl font-semibold text-finance-dark mb-4">Adicionar Nova Meta</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goalName">Nome da Meta</Label>
                <Input
                  id="goalName"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                  placeholder="Ex: Carro novo, Reserva de emergência"
                  className="input-finance"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goalAmount">Valor Total (R$)</Label>
                <Input
                  id="goalAmount"
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                  placeholder="0.00"
                  className="input-finance"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goalDate">Data de Conclusão</Label>
                <Input
                  id="goalDate"
                  type="date"
                  value={newGoal.endDate}
                  onChange={(e) => setNewGoal({...newGoal, endDate: e.target.value})}
                  className="input-finance"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goalCategory">Categoria</Label>
                <select 
                  id="goalCategory"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  className="input-finance"
                >
                  <option value="Moradia">Moradia</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Educação">Educação</option>
                  <option value="Dívidas">Quitar Dívidas</option>
                  <option value="Segurança">Reserva/Segurança</option>
                  <option value="Investimento">Investimento</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goalPriority">Prioridade</Label>
                <select 
                  id="goalPriority"
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                  className="input-finance"
                >
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>
              
              <Button 
                onClick={handleAddGoal}
                className="btn-finance-primary w-full"
              >
                Criar Nova Meta
              </Button>
            </div>
          </Card>
          
          <Card className="financial-card mt-6">
            <h3 className="text-xl font-semibold text-finance-dark mb-4">Dicas para Alcançar Metas</h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium">Regra 50/30/20</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Destine 50% para necessidades, 30% para desejos e 20% para metas financeiras.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium">Automatize seus Depósitos</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Configure transferências automáticas para suas metas assim que receber seu salário.
                </p>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg">
                <h4 className="font-medium">Comemore Pequenas Vitórias</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Defina marcos intermediários e comemore quando alcançá-los para manter a motivação.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinancialGoals;
