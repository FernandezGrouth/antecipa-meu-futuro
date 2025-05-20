
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import Stripe from 'https://esm.sh/stripe@12.18.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  httpClient: Stripe.createFetchHttpClient(),
})

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req: Request) => {
  try {
    const signature = req.headers.get('stripe-signature')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    const body = await req.text()

    if (!signature || !webhookSecret) {
      return new Response(JSON.stringify({ error: 'Assinatura ou secret do webhook não encontrados' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Verificar a assinatura do webhook
    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      return new Response(JSON.stringify({ error: `Erro na assinatura do webhook: ${err.message}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Processar eventos do Stripe
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object)
        break
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChanged(event.data.object)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object)
        break
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Erro ao processar webhook:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

// Função para processar checkout completo
async function handleCheckoutCompleted(session: any) {
  // O checkout foi concluído. Nesse ponto, o status da assinatura ainda não mudou.
  console.log('Checkout completo:', session.id)
}

// Função para processar alterações na assinatura
async function handleSubscriptionChanged(subscription: any) {
  // Buscar o customer_id do Stripe
  const stripeCustomerId = subscription.customer

  // Buscar o usuário pelo customer_id do Stripe
  const { data: subscriber } = await supabase
    .from('subscribers')
    .select('user_id')
    .eq('stripe_customer_id', stripeCustomerId)
    .single()

  if (!subscriber) {
    console.error('Assinante não encontrado para o customer:', stripeCustomerId)
    return
  }

  // Verificar se a assinatura está ativa
  const isActive = subscription.status === 'active' || 
                  subscription.status === 'trialing'

  // Calcular a data de término da assinatura
  let subscriptionEndDate = null
  if (subscription.current_period_end) {
    subscriptionEndDate = new Date(subscription.current_period_end * 1000).toISOString()
  }

  // Atualizar o status da assinatura do usuário
  await supabase
    .from('subscribers')
    .update({
      subscribed: isActive,
      subscription_end: subscriptionEndDate,
      subscription_tier: isActive ? 'premium' : null,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', subscriber.user_id)

  console.log('Assinatura atualizada para o usuário:', subscriber.user_id)
}

// Função para processar assinaturas excluídas/canceladas
async function handleSubscriptionDeleted(subscription: any) {
  // Buscar o customer_id do Stripe
  const stripeCustomerId = subscription.customer

  // Buscar o usuário pelo customer_id do Stripe
  const { data: subscriber } = await supabase
    .from('subscribers')
    .select('user_id')
    .eq('stripe_customer_id', stripeCustomerId)
    .single()

  if (!subscriber) {
    console.error('Assinante não encontrado para o customer:', stripeCustomerId)
    return
  }

  // Atualizar o status da assinatura do usuário
  await supabase
    .from('subscribers')
    .update({
      subscribed: false,
      subscription_end: null,
      subscription_tier: null,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', subscriber.user_id)

  console.log('Assinatura cancelada para o usuário:', subscriber.user_id)
}
