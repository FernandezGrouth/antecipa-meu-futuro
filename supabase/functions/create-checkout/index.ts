
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import Stripe from 'https://esm.sh/stripe@12.18.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  httpClient: Stripe.createFetchHttpClient(),
})

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseKey)

const FRONTEND_URL = Deno.env.get('FRONTEND_URL') || 'https://financesimulator.lovable.app'
const MONTHLY_PRICE_ID = Deno.env.get('STRIPE_PRICE_MONTHLY') || 'price_monthly'
const ANNUAL_PRICE_ID = Deno.env.get('STRIPE_PRICE_ANNUAL') || 'price_annual'

serve(async (req: Request) => {
  try {
    // Verificar método HTTP
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Autorização via JWT do Supabase
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Verificar token JWT
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Token inválido' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Obter dados do corpo da requisição
    const { priceId, isAnnual } = await req.json()
    const actualPriceId = isAnnual ? ANNUAL_PRICE_ID : MONTHLY_PRICE_ID

    // Verificar se o usuário já tem um customer_id no Stripe
    const { data: subscriber } = await supabase
      .from('subscribers')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    let customerId = subscriber?.stripe_customer_id

    // Se não tiver, criar um novo customer no Stripe
    if (!customerId) {
      const customerData = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id
        }
      })
      customerId = customerData.id

      // Atualizar o customer_id na tabela de subscribers
      await supabase
        .from('subscribers')
        .update({ stripe_customer_id: customerId })
        .eq('user_id', user.id)
    }

    // Criar uma sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: actualPriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${FRONTEND_URL}?payment=success`,
      cancel_url: `${FRONTEND_URL}?payment=canceled`,
      metadata: {
        user_id: user.id
      }
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Erro ao criar checkout:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
