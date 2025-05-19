
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FinancialEducation = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-finance-dark mb-2">Educação Financeira</h1>
        <p className="text-gray-600">Aprenda conceitos financeiros importantes para tomar melhores decisões</p>
      </div>
      
      <Tabs defaultValue="financing">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="financing">Financiamentos</TabsTrigger>
          <TabsTrigger value="budgeting">Orçamento</TabsTrigger>
          <TabsTrigger value="investing">Investimentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="financing" className="space-y-8">
          <Card className="financial-card p-8">
            <h2 className="text-2xl font-bold text-finance-dark mb-4">Entendendo os Financiamentos</h2>
            <p className="text-gray-700 mb-6">
              Financiamentos são empréstimos de longo prazo geralmente usados para a compra de bens de alto valor. 
              Entender como eles funcionam pode economizar milhares de reais ao longo do tempo.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-finance-dark">Juros Compostos</h3>
                <p className="text-gray-600">
                  Juros compostos são aqueles que incidem não só sobre o capital inicial, mas também sobre os juros acumulados em períodos anteriores. 
                  Este é o principal fator que pode encarecer muito um financiamento no longo prazo.
                </p>
                
                <div className="bg-finance-gray p-4 rounded-lg border-l-4 border-finance-blue">
                  <h4 className="font-semibold">Exemplo Prático:</h4>
                  <p className="text-sm text-gray-600">
                    Num financiamento de R$100.000 a 1% ao mês por 5 anos, você pagará aproximadamente R$127.000, 
                    sendo R$27.000 só de juros!
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-finance-dark">CET (Custo Efetivo Total)</h3>
                <p className="text-gray-600">
                  O CET é a taxa que considera todos os custos de um financiamento: juros, seguros, taxas administrativas, etc. 
                  É obrigatório que bancos e financeiras informem o CET, e é esse número que você deve usar para comparar propostas.
                </p>
                
                <div className="bg-finance-gray p-4 rounded-lg border-l-4 border-finance-green">
                  <h4 className="font-semibold">Dica Importante:</h4>
                  <p className="text-sm text-gray-600">
                    Ao comparar financiamentos, sempre peça o CET anual de cada proposta. A que tiver menor CET será a mais econômica no longo prazo.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-finance-dark mb-4">Sistemas de Amortização</h3>
              
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-finance-blue">Sistema de Amortização Constante (SAC)</h4>
                  <p className="text-gray-600 mt-2">
                    No SAC, o valor da amortização (parcela que abate o saldo devedor) é constante, mas o valor dos 
                    juros diminui a cada parcela. Resultado: as parcelas começam maiores e vão diminuindo com o tempo.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Vantagem:</strong> Paga menos juros no total e o saldo devedor cai mais rapidamente.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-finance-blue">Tabela Price (TP)</h4>
                  <p className="text-gray-600 mt-2">
                    Na Tabela Price, as parcelas são iguais do início ao fim do financiamento. No começo, a maior 
                    parte da parcela é composta por juros, e apenas uma pequena parte amortiza o saldo devedor.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Vantagem:</strong> Parcelas fixas facilitam o planejamento financeiro.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-finance-dark mb-4">Antecipação de Parcelas: Vale a Pena?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-finance-gray p-5 rounded-lg">
                  <h4 className="font-semibold">Vantagens da Antecipação</h4>
                  <ul className="mt-3 space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Economia significativa em juros</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Redução do prazo total do financiamento</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Menor comprometimento da renda mensal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Quitar dívidas antes ajuda no score de crédito</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-finance-gray p-5 rounded-lg">
                  <h4 className="font-semibold">Quando Não Antecipar</h4>
                  <ul className="mt-3 space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Quando a taxa de juros do financiamento é muito baixa (abaixo da inflação)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Se você tem dívidas com juros mais altos (ex: cartão de crédito)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Quando não sobra reserva de emergência</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Se há multa alta por quitação antecipada</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button className="btn-finance-primary">Use nosso Simulador de Antecipação</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="budgeting" className="space-y-8">
          <Card className="financial-card p-8">
            <h2 className="text-2xl font-bold text-finance-dark mb-4">Orçamento Pessoal Inteligente</h2>
            <p className="text-gray-700 mb-6">
              Um bom orçamento não significa restrição, mas sim controle e liberdade para tomar decisões conscientes 
              sobre seu dinheiro.
            </p>
            
            <div className="space-y-6">
              <div className="p-6 bg-finance-gray rounded-lg">
                <h3 className="text-xl font-semibold text-finance-dark mb-3">A Regra 50/30/20</h3>
                <p className="text-gray-600 mb-4">
                  Uma forma simples e eficaz de organizar seu orçamento é seguir a regra 50/30/20:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-finance-blue">
                    <h4 className="font-semibold text-finance-blue">50% - Necessidades</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Destine metade da sua renda para gastos essenciais como moradia, alimentação, 
                      transporte, contas básicas e parcelas de financiamentos.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-finance-purple">
                    <h4 className="font-semibold text-finance-purple">30% - Desejos</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Reserve 30% para gastos com lazer, viagens, restaurantes, streaming, compras não essenciais 
                      e outros itens que melhoram sua qualidade de vida.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-finance-green">
                    <h4 className="font-semibold text-finance-green">20% - Futuro</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Guarde 20% para metas de longo prazo: poupança, investimentos, reserva de emergência, 
                      quitação de dívidas e aposentadoria.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-finance-dark mb-4">5 Passos para um Orçamento Eficaz</h3>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm flex">
                    <div className="bg-finance-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Conheça seus Números</h4>
                      <p className="text-gray-600 mt-1">
                        Liste todas as suas fontes de renda e todos os seus gastos mensais. Não deixe nada de fora, 
                        mesmo pequenos gastos somam no final do mês.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm flex">
                    <div className="bg-finance-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Categorize seus Gastos</h4>
                      <p className="text-gray-600 mt-1">
                        Divida seus gastos entre fixos (que não mudam) e variáveis (que podem ser ajustados). 
                        Depois separe entre essenciais e não-essenciais.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm flex">
                    <div className="bg-finance-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Defina Objetivos Claros</h4>
                      <p className="text-gray-600 mt-1">
                        Estabeleça metas financeiras de curto, médio e longo prazo. Ter objetivos claros ajuda a 
                        manter a motivação para seguir o orçamento.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm flex">
                    <div className="bg-finance-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">Automatize o que For Possível</h4>
                      <p className="text-gray-600 mt-1">
                        Configure transferências automáticas para sua poupança ou investimentos logo após receber seu salário. 
                        Automatize também o pagamento de contas fixas.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm flex">
                    <div className="bg-finance-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold">Revise e Ajuste Regularmente</h4>
                      <p className="text-gray-600 mt-1">
                        Um orçamento não é estático. Revisá-lo mensalmente permite ajustes conforme mudanças em sua vida ou 
                        em seus objetivos financeiros.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button className="btn-finance-primary">Use nosso Painel de Orçamento</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="investing" className="space-y-8">
          <Card className="financial-card p-8">
            <h2 className="text-2xl font-bold text-finance-dark mb-4">Investimentos Básicos</h2>
            <p className="text-gray-700 mb-6">
              Investir não precisa ser complicado. Compreender alguns conceitos básicos já é suficiente para começar 
              a fazer seu dinheiro trabalhar para você.
            </p>
            
            <div className="space-y-6">
              <div className="p-6 bg-finance-gray rounded-lg">
                <h3 className="text-xl font-semibold text-finance-dark mb-3">Antes de Investir</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-finance-blue">1. Quite Dívidas Caras</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Antes de começar a investir, elimine dívidas com juros altos, como cartão de crédito e 
                      cheque especial. Nenhum investimento seguro rende mais que essas taxas.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-finance-blue">2. Monte sua Reserva de Emergência</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Tenha de 3 a 6 meses de despesas guardados em aplicações de liquidez imediata. 
                      Esta reserva é fundamental antes de fazer investimentos de maior risco.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-finance-dark mb-4">Tipos de Investimentos para Iniciantes</h3>
                
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-finance-teal">
                    <h4 className="font-semibold text-finance-teal">Renda Fixa</h4>
                    <p className="text-gray-600 mt-2">
                      Investimentos de menor risco onde você "empresta" dinheiro para bancos ou governo 
                      em troca de juros. Exemplos:
                    </p>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      <li><strong>Tesouro Direto:</strong> Títulos públicos emitidos pelo governo brasileiro.</li>
                      <li><strong>CDBs:</strong> Certificados emitidos por bancos para captar recursos.</li>
                      <li><strong>LCI/LCA:</strong> Títulos imobiliários e do agronegócio, isentos de IR para pessoa física.</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-finance-yellow">
                    <h4 className="font-semibold text-finance-yellow">Renda Variável</h4>
                    <p className="text-gray-600 mt-2">
                      Investimentos com maior potencial de retorno, mas também maior risco. Os valores variam 
                      conforme o mercado. Exemplos:
                    </p>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      <li><strong>Ações:</strong> Você se torna sócio de empresas listadas na bolsa de valores.</li>
                      <li><strong>Fundos Imobiliários:</strong> Investimento em imóveis sem precisar comprar um imóvel inteiro.</li>
                      <li><strong>ETFs:</strong> Fundos que replicam índices, oferecendo diversificação com menor custo.</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-finance-purple">
                    <h4 className="font-semibold text-finance-purple">Fundos de Investimento</h4>
                    <p className="text-gray-600 mt-2">
                      Aplicação que reúne recursos de vários investidores para investir em diversos ativos. 
                      Um gestor profissional toma as decisões de investimento.
                    </p>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      <li><strong>Fundos de Renda Fixa:</strong> Investem majoritariamente em títulos de renda fixa.</li>
                      <li><strong>Fundos Multimercado:</strong> Podem investir em diferentes mercados como renda fixa, ações, câmbio.</li>
                      <li><strong>Fundos de Ações:</strong> Concentram seus investimentos em ações de empresas.</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-finance-dark mb-4">3 Princípios para Investir Bem</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-finance-gray p-5 rounded-lg text-center">
                    <div className="w-16 h-16 bg-finance-blue rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold">Comece Cedo</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      O tempo é seu maior aliado graças aos juros compostos. Começar a investir alguns anos antes 
                      pode significar centenas de milhares de reais a mais no futuro.
                    </p>
                  </div>
                  
                  <div className="bg-finance-gray p-5 rounded-lg text-center">
                    <div className="w-16 h-16 bg-finance-green rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold">Diversifique</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Não coloque todos os ovos na mesma cesta. Distribua seus investimentos em diferentes 
                      classes de ativos para reduzir riscos.
                    </p>
                  </div>
                  
                  <div className="bg-finance-gray p-5 rounded-lg text-center">
                    <div className="w-16 h-16 bg-finance-teal rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold">Seja Consistente</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Invista regularmente, mesmo que pequenas quantias. Aportes mensais consistentes trazem 
                      melhores resultados que tentativas de "acertar o timing do mercado".
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button className="btn-finance-primary">Defina suas Metas de Investimento</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialEducation;
