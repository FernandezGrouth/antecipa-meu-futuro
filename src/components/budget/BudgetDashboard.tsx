
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchTransactions, createTransaction, Transaction } from '@/services/supabaseService';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const BudgetDashboard = () => {
  const { user } = useAuth();
  const [income, setIncome] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [newTransaction, setNewTransaction] = useState({
    name: '',
    amount: '',
    category: 'Outros',
  });
  const [transactionType, setTransactionType] = useState('expense');
  
  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);
  
  const loadTransactions = async () => {
    setLoading(true);
    try {
      const transactions = await fetchTransactions();
      
      setIncome(transactions.filter(transaction => transaction.type === 'income'));
      setExpenses(transactions.filter(transaction => transaction.type === 'expense'));
    } catch (error) {
      console.error("Failed to load transactions:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as transações.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
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
  
  // Get monthly data for trends chart
  const getMonthlyData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentYear = new Date().getFullYear();
    
    const monthlyData = months.map((month, index) => {
      const monthIncome = income.filter(transaction => {
        const date = new Date(transaction.date);
        return date.getMonth() === index && date.getFullYear() === currentYear;
      }).reduce((acc, curr) => acc + curr.amount, 0);
      
      const monthExpenses = expenses.filter(transaction => {
        const date = new Date(transaction.date);
        return date.getMonth() === index && date.getFullYear() === currentYear;
      }).reduce((acc, curr) => acc + curr.amount, 0);
      
      return {
        name: month,
        income: monthIncome,
        expenses: monthExpenses
      };
    });
    
    return monthlyData;
  };
  
  const handleAddTransaction = async () => {
    if (!newTransaction.name || !newTransaction.amount) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para adicionar a transação.",
        variant: "destructive",
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      const transaction = {
        description: newTransaction.name,
        amount: parseFloat(newTransaction.amount),
        category: newTransaction.category,
        type: transactionType,
        date: new Date().toISOString().split('T')[0],
        is_recurring: false
      };
      
      await createTransaction(transaction);
      toast({
        title: "Transação adicionada",
        description: `${transactionType === 'income' ? 'Receita' : 'Despesa'} adicionada com sucesso.`,
      });
      
      // Reset form and reload transactions
      setNewTransaction({
        name: '',
        amount: '',
        category: 'Outros',
      });
      loadTransactions();
    } catch (error) {
      console.error("Failed to add transaction:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a transação.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-finance-blue" />
        <span className="ml-2 text-finance-blue">Carregando dados financeiros...</span>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-finance-dark mb-2">Meu Orçamento</h1>
        <p className="text-gray-600">Gerencie suas finanças e tenha controle sobre seu dinheiro</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-finance-dark mb-2">Receitas</h3>
          <p className="text-3xl font-bold text-finance-green">{formatCurrency(totalIncome)}</p>
          <div className="mt-2 text-sm text-gray-500">Este mês</div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-finance-dark mb-2">Despesas</h3>
          <p className="text-3xl font-bold text-finance-red">{formatCurrency(totalExpenses)}</p>
          <div className="mt-2 text-sm text-gray-500">Este mês</div>
        </Card>
        
        <Card className="p-6">
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
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-finance-dark mb-4">Despesas por Categoria</h3>
          {expenses.length > 0 ? (
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
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p className="mb-2">Sem despesas registradas</p>
              <p className="text-sm">Adicione despesas para visualizar o gráfico</p>
            </div>
          )}
        </Card>
        
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-finance-dark mb-4">Histórico Mensal</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getMonthlyData()}>
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
        <Card className="p-6">
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
                className="w-full"
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
                className="w-full"
              />
            </div>
            
            {transactionType === 'expense' && (
              <div className="space-y-2">
                <Label htmlFor="transactionCategory">Categoria</Label>
                <select 
                  id="transactionCategory"
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  {categories.map(category => (
                    <option key={category.name} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
            )}
            
            <Button 
              onClick={handleAddTransaction}
              disabled={submitting}
              className={`w-full ${transactionType === 'income' ? 'bg-finance-green hover:bg-green-700' : 'bg-finance-blue hover:bg-blue-700'}`}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                `Adicionar ${transactionType === 'income' ? 'Receita' : 'Despesa'}`
              )}
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <Tabs defaultValue="expenses">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="expenses">Despesas</TabsTrigger>
              <TabsTrigger value="income">Receitas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="expenses" className="space-y-4">
              <h3 className="text-xl font-semibold text-finance-dark">Suas Despesas</h3>
              
              {expenses.length > 0 ? (
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
                          <td className="py-3">{expense.description}</td>
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
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Você ainda não tem despesas cadastradas.
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="income" className="space-y-4">
              <h3 className="text-xl font-semibold text-finance-dark">Suas Receitas</h3>
              
              {income.length > 0 ? (
                <div className="overflow-auto max-h-80">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Descrição</th>
                        <th className="text-right py-2">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {income.map(item => (
                        <tr key={item.id} className="border-b">
                          <td className="py-3">{item.description}</td>
                          <td className="py-3 text-right text-finance-green font-medium">{formatCurrency(item.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Você ainda não tem receitas cadastradas.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default BudgetDashboard;
