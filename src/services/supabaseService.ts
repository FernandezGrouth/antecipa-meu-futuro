import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  target_amount: number;
  current_amount: number;
  deadline: string;
  category: string;
  priority: string;
  created_at: string;
}

export interface Loan {
  id: string;
  user_id: string;
  installment_value: number;
  total_installments: number;
  paid_installments: number;
  interest_rate: number;
  installments_to_prepay: number;
  loan_type: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  date: string;
  amount: number;
  type: string;
  description: string;
  category: string;
  is_recurring: boolean;
  created_at: string;
}

// Goals
export const fetchGoals = async () => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", sessionData.session?.user.id)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    toast({
      title: "Erro ao carregar metas",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

export const createGoal = async (goal: Omit<Goal, "id" | "user_id" | "created_at">) => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const { data, error } = await supabase
      .from("goals")
      .insert({
        ...goal,
        user_id: sessionData.session?.user.id
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    toast({
      title: "Erro ao criar meta",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const updateGoal = async (id: string, updates: Partial<Goal>) => {
  try {
    const { data, error } = await supabase
      .from("goals")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    toast({
      title: "Erro ao atualizar meta",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const deleteGoal = async (id: string) => {
  try {
    const { error } = await supabase
      .from("goals")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Erro ao excluir meta",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

// Loans
export const fetchLoans = async () => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const { data, error } = await supabase
      .from("loans")
      .select("*")
      .eq("user_id", sessionData.session?.user.id)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    toast({
      title: "Erro ao carregar financiamentos",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

export const createLoan = async (loan: Omit<Loan, "id" | "user_id" | "created_at">) => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const { data, error } = await supabase
      .from("loans")
      .insert({
        ...loan,
        user_id: sessionData.session?.user.id
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    toast({
      title: "Erro ao criar financiamento",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

// Transactions
export const fetchTransactions = async () => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", sessionData.session?.user.id)
      .order("date", { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    toast({
      title: "Erro ao carregar transações",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

export const createTransaction = async (transaction: Omit<Transaction, "id" | "user_id" | "created_at">) => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const { data, error } = await supabase
      .from("transactions")
      .insert({
        ...transaction,
        user_id: sessionData.session?.user.id
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    toast({
      title: "Erro ao criar transação",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};
