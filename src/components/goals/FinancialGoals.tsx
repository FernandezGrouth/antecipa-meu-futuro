import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { fetchGoals, createGoal, updateGoal, deleteGoal, Goal } from '@/services/supabaseService';
import { toast } from '@/components/ui/use-toast';

const goalCategories = [
  { id: 'emergency', name: 'Reserva de Emergência', color: '#FF6B6B' },
  { id: 'retirement', name: 'Aposentadoria', color: '#4ECDC4' },
  { id: 'travel', name: 'Viagem', color: '#45B7D1' },
  { id: 'education', name: 'Educação', color: '#FFA62B' },
  { id: 'home', name: 'Casa Própria', color: '#A78BFA' },
  { id: 'car', name: 'Veículo', color: '#34D399' },
  { id: 'other', name: 'Outro', color: '#94A3B8' },
];

const priorityLevels = [
  { id: 'high', name: 'Alta', color: '#EF4444' },
  { id: 'medium', name: 'Média', color: '#F59E0B' },
  { id: 'low', name: 'Baixa', color: '#10B981' },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const FinancialGoals = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('emergency');
  const [priority, setPriority] = useState('medium');
  
  useEffect(() => {
    loadGoals();
  }, [user]);
  
  const loadGoals = async () => {
    setLoading(true);
    const data = await fetchGoals();
    setGoals(data);
    setLoading(false);
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTargetAmount('');
    setCurrentAmount('');
    setDeadline('');
    setCategory('emergency');
    setPriority('medium');
    setEditingGoal(null);
  };
  
  const handleShowForm = (goal?: Goal) => {
    if (goal) {
      setEditingGoal(goal);
      setTitle(goal.title);
      setDescription(goal.description || '');
      setTargetAmount(goal.target_amount.toString());
      setCurrentAmount(goal.current_amount.toString());
      setDeadline(goal.deadline.split('T')[0]);
      setCategory(goal.category);
      setPriority(goal.priority);
    } else {
      resetForm();
    }
    setShowForm(true);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const goalData = {
      title,
      description: description || null,
      target_amount: parseFloat(targetAmount),
      current_amount: parseFloat(currentAmount),
      deadline: new Date(deadline).toISOString(),
      category,
      priority,
    };
    
    try {
      if (editingGoal) {
        await updateGoal(editingGoal.id, goalData);
        toast({
          title: "Meta atualizada",
          description: "Sua meta financeira foi atualizada com sucesso.",
        });
      } else {
        await createGoal(goalData);
        toast({
          title: "Meta criada",
          description: "Sua nova meta financeira foi criada com sucesso.",
        });
      }
      
      setShowForm(false);
      resetForm();
      loadGoals();
    } catch (error) {
      console.error("Error saving goal:", error);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta meta?")) {
      const success = await deleteGoal(id);
      if (success) {
        toast({
          title: "Meta excluída",
          description: "Sua meta financeira foi excluída com sucesso.",
        });
        loadGoals();
      }
    }
  };
  
  const handleUpdateProgress = async (goal: Goal, newAmount: string) => {
    const amount = parseFloat(newAmount);
    if (!isNaN(amount)) {
      await updateGoal(goal.id, { current_amount: amount });
      toast({
        title: "Progresso atualizado",
        description: "O progresso da sua meta foi atualizado com sucesso.",
      });
      loadGoals();
    }
  };
  
  const getCategoryColor = (categoryId: string) => {
    return goalCategories.find(cat => cat.id === categoryId)?.color || '#94A3B8';
  };
  
  const getPriorityColor = (priorityId: string) => {
    return priorityLevels.find(p => p.id === priorityId)?.color || '#94A3B8';
  };
  
  const calculateDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-finance-dark">Minhas Metas</h2>
        <Button 
          onClick={() => handleShowForm()} 
          className="bg-finance-blue hover:bg-blue-700"
        >
          Nova Meta
        </Button>
      </div>
      
      {showForm && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">
            {editingGoal ? 'Editar Meta' : 'Nova Meta Financeira'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  {goalCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Valor Alvo (R$)</label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="w-full p-2 border rounded"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Valor Atual (R$)</label>
                <input
                  type="number"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  className="w-full p-2 border rounded"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Data Limite</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Prioridade</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  {priorityLevels.map((level) => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Descrição (opcional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-finance-blue hover:bg-blue-700">
                {editingGoal ? 'Atualizar' : 'Criar'} Meta
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      {loading ? (
        <div className="text-center py-8">Carregando metas...</div>
      ) : goals.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Você ainda não tem metas financeiras.</p>
          <Button 
            onClick={() => handleShowForm()} 
            className="bg-finance-blue hover:bg-blue-700"
          >
            Criar Primeira Meta
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const progress = (goal.current_amount / goal.target_amount) * 100;
            const categoryColor = getCategoryColor(goal.category);
            const priorityColor = getPriorityColor(goal.priority);
            const daysLeft = calculateDaysLeft(goal.deadline);
            
            return (
              <Card key={goal.id} className="overflow-hidden">
                <div 
                  className="h-2" 
                  style={{ backgroundColor: categoryColor }}
                ></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">{goal.title}</h3>
                    <div 
                      className="px-2 py-1 text-xs rounded-full text-white"
                      style={{ backgroundColor: priorityColor }}
                    >
                      {priorityLevels.find(p => p.id === goal.priority)?.name}
                    </div>
                  </div>
                  
                  {goal.description && (
                    <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                  )}
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progresso</span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                    <Progress 
                      value={progress} 
                      className="h-2 mt-2 bg-opacity-20" 
                      style={{ backgroundColor: `${categoryColor}30` }} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">Meta</p>
                      <p className="font-semibold">{formatCurrency(goal.target_amount)}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">Atual</p>
                      <p className="font-semibold">{formatCurrency(goal.current_amount)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Categoria</p>
                      <p className="text-sm font-medium">
                        {goalCategories.find(cat => cat.id === goal.category)?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Prazo</p>
                      <p className={`text-sm font-medium ${daysLeft < 30 ? 'text-red-500' : ''}`}>
                        {daysLeft <= 0 ? 'Vencido' : `${daysLeft} dias`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Atualizar valor"
                        className="flex-1 p-2 text-sm border rounded"
                        min="0"
                        step="0.01"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdateProgress(goal, (e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShowForm(goal)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(goal.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FinancialGoals;
