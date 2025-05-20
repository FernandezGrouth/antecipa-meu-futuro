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

export interface Subscription {
  id: string;
  user_id: string;
  email: string;
  stripe_customer_id: string | null;
  subscribed: boolean;
  trial_ends_at: string | null;
  subscription_tier: string | null;
  subscription_end: string | null;
  created_at: string;
  updated_at: string;
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

// Subscription
export const fetchSubscription = async () => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const { data, error } = await supabase
      .from("subscribers")
      .select("*")
      .eq("user_id", sessionData.session?.user.id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error fetching subscription:", error);
    return null;
  }
};

export const createCheckoutSession = async (priceId: string, isAnnual: boolean) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { priceId, isAnnual }
    });

    if (error) throw error;
    
    if (data?.url) {
      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
      return true;
    }
    
    return false;
  } catch (error: any) {
    toast({
      title: "Erro ao criar sessão de pagamento",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

export const checkSubscriptionStatus = async () => {
  try {
    const subscription = await fetchSubscription();
    
    if (!subscription) return { isSubscribed: false, inTrial: false, trialEndsAt: null };
    
    const now = new Date();
    const trialEndsAt = subscription.trial_ends_at ? new Date(subscription.trial_ends_at) : null;
    const subscriptionEndsAt = subscription.subscription_end ? new Date(subscription.subscription_end) : null;
    
    const isSubscribed = subscription.subscribed;
    const inTrial = trialEndsAt ? now < trialEndsAt : false;
    const subscriptionActive = subscriptionEndsAt ? now < subscriptionEndsAt : false;
    
    return { 
      isSubscribed, 
      inTrial, 
      trialEndsAt, 
      subscriptionActive,
      subscriptionEndsAt,
      subscription 
    };
  } catch (error: any) {
    console.error("Error checking subscription status:", error);
    return { isSubscribed: false, inTrial: false, trialEndsAt: null };
  }
};

export const isAccessAllowed = async () => {
  try {
    const { isSubscribed, inTrial } = await checkSubscriptionStatus();
    return isSubscribed || inTrial;
  } catch (error) {
    console.error("Error checking access permission:", error);
    return false;
  }
};
