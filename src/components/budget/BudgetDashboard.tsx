
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample data
const initialIncome = [
  { id: 1, name: 'Salário', amount: 5000, category: 'Fixo' },
  { id: 2, name: 'Freelance', amount: 1200, category: 'Variável' },
];

const initialExpenses = [
  { id: 1, name: 'Aluguel', amount: 1500, category: 'Moradia' },
  { id: 2, name: 'Mercado', amount: 800, category: 'Alimentação' },
  { id: 3, name: 'Internet', amount: 120, category: 'Serviços' },
  { id: 4, name: 'Transporte', amount: 300, category: 'Locomoção' },
  { id: 5, name: 'Lazer', amount: 400, category: 'Entretenimento' },
  { id: 6, name: 'Financiamento Carro', amount: 700, category: 'Dívidas' },
];

// Expense categories and colors
const categories = [
  { name: 'Moradia', color: '#0066CC' },
  { name: 'Alimentação', color: '#00A67E' },
  { name: 'Transporte', color: '#00B8A9' },
  { name: 'Lazer', color: '#FF5A5F' },
  { name: 'Saúde', color: '#FFBD00' },
  { name: 'Educação', color: '#7E57C2' },
  { name: 'Dívidas', color: '#FF8A65' },
  { name: 'Serviços', color: '#4FC3F7' },
  { name: 'Locomoção', color: '#81C784' },
  { name: 'Entretenimento', color: '#BA68C8' },
  { name: 'Outros', color: '#9E9E9E' },
];

// Monthly data for trends
const monthlyData = [
  { name: 'Jan', income: 5600, expenses: 4200 },
  { name: 'Fev', income: 6200, expenses: 4800 },
  { name: 'Mar', income: 5800, expenses: 4500 },
  { name: 'Abr', income: 6000, expenses: 3800 },
  { name: 'Mai', income: 6200, expenses: 4100 },
  { name: 'Jun', income: 6300, expenses: 4300 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const BudgetDashboard = () => {
  const [income, setIncome] = useState(initialIncome);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [newTransaction, setNewTransaction] = useState({
    name: '',
    amount: '',
    category: 'Outros',
  });
  const [transactionType, setTransactionType] = useState('expense');
  
  // Calculate totals
  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpenses;
  
  // Prepare data for pie chart
  const expensesByCategory = categories.map(category => {
    const total = expenses
      .filter(expense => expense.category === category.name)
      .reduce((acc, curr) => acc + curr.amount, 0);
      
    return {
      name: category.name,
      value: total,
      color: category.color
    };
  }).filter(category => category.value > 0);
  
  const handleAddTransaction = () => {
    if (!newTransaction.name || !newTransaction.amount) return;
    
    const transaction = {
      id: Date.now(),
      name: newTransaction.name,
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category,
    };
    
    if (transactionType === 'income') {
      setIncome([...income, transaction]);
    } else {
      setExpenses([...expenses, transaction]);
    }
    
    // Reset form
    setNewTransaction({
      name: '',
      amount: '',
      category: 'Outros',
    });
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-finance-dark mb-2">Meu Orçamento</h1>
        <p className="text-gray-600">Gerencie suas finanças e tenha controle sobre seu dinheiro</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="financial-card">
          <h3 className="text-lg font-semibold text-finance-dark mb-2">Receitas</h3>
          <p className="text-3xl font-bold text-finance-green">{formatCurrency(totalIncome)}</p>
          <div className="mt-2 text-sm text-gray-500">Este mês</div>
        </Card>
        
        <Card className="financial-card">
          <h3 className="text-lg font-semibold text-finance-dark mb-2">Despesas</h3>
          <p className="text-3xl font-bold text-finance-red">{formatCurrency(totalExpenses)}</p>
          <div className="mt-2 text-sm text-gray-500">Este mês</div>
        </Card>
        
        <Card className="financial-card">
          <h3 className="text-lg font-semibold text-finance-dark mb-2">Saldo</h3>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
            {formatCurrency(balance)}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            {balance >= 0 ? 'Você está no azul!' : 'Atenção! Saldo negativo'}
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="financial-card">
          <h3 className="text-xl font-semibold text-finance-dark mb-4">Despesas por Categoria</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="financial-card">
          <h3 className="text-xl font-semibold text-finance-dark mb-4">Histórico Mensal</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar dataKey="income" name="Receitas" fill="#00A67E" />
                <Bar dataKey="expenses" name="Despesas" fill="#FF5A5F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="financial-card">
          <h3 className="text-xl font-semibold text-finance-dark mb-4">Adicionar Transação</h3>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Button 
                className={`flex-1 ${transactionType === 'income' ? 'bg-finance-green' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTransactionType('income')}
              >
                Receita
              </Button>
              <Button 
                className={`flex-1 ${transactionType === 'expense' ? 'bg-finance-red' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTransactionType('expense')}
              >
                Despesa
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transactionName">Descrição</Label>
              <Input
                id="transactionName"
                value={newTransaction.name}
                onChange={(e) => setNewTransaction({...newTransaction, name: e.target.value})}
                placeholder="Ex: Salário, Aluguel, etc"
                className="input-finance"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transactionAmount">Valor (R$)</Label>
              <Input
                id="transactionAmount"
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                placeholder="0.00"
                className="input-finance"
              />
            </div>
            
            {transactionType === 'expense' && (
              <div className="space-y-2">
                <Label htmlFor="transactionCategory">Categoria</Label>
                <select 
                  id="transactionCategory"
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  className="input-finance"
                >
                  {categories.map(category => (
                    <option key={category.name} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
            )}
            
            <Button 
              onClick={handleAddTransaction}
              className={transactionType === 'income' ? 'btn-finance-secondary w-full' : 'btn-finance-primary w-full'}
            >
              Adicionar {transactionType === 'income' ? 'Receita' : 'Despesa'}
            </Button>
          </div>
        </Card>
        
        <Card className="financial-card">
          <Tabs defaultValue="expenses">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="expenses">Despesas</TabsTrigger>
              <TabsTrigger value="income">Receitas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="expenses" className="space-y-4">
              <h3 className="text-xl font-semibold text-finance-dark">Suas Despesas</h3>
              
              <div className="overflow-auto max-h-80">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Descrição</th>
                      <th className="text-left py-2">Categoria</th>
                      <th className="text-right py-2">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map(expense => (
                      <tr key={expense.id} className="border-b">
                        <td className="py-3">{expense.name}</td>
                        <td className="py-3">
                          <span className="inline-block px-2 py-1 text-xs rounded-full"
                            style={{
                              backgroundColor: categories.find(c => c.name === expense.category)?.color + '20',
                              color: categories.find(c => c.name === expense.category)?.color
                            }}
                          >
                            {expense.category}
                          </span>
                        </td>
                        <td className="py-3 text-right text-finance-red font-medium">{formatCurrency(expense.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="income" className="space-y-4">
              <h3 className="text-xl font-semibold text-finance-dark">Suas Receitas</h3>
              
              <div className="overflow-auto max-h-80">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Descrição</th>
                      <th className="text-left py-2">Categoria</th>
                      <th className="text-right py-2">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {income.map(item => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3">{item.name}</td>
                        <td className="py-3">
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 text-right text-finance-green font-medium">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default BudgetDashboard;
