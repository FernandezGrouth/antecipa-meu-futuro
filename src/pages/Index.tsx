
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-finance-blue to-finance-teal py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Economize dinheiro e tempo nos seus financiamentos
                </h1>
                <p className="text-lg md:text-xl mb-8">
                  Simule a antecipação de parcelas, organize suas finanças e tome decisões financeiras mais inteligentes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/simulator">
                    <Button className="btn-finance-secondary w-full sm:w-auto">Simular Agora</Button>
                  </Link>
                  <Link to="/budget">
                    <Button variant="outline" className="bg-white/10 text-white border-white w-full sm:w-auto">
                      Organizar Finanças
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-10">
                <div className="rounded-lg shadow-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80&w=1470"
                    alt="Planejamento Financeiro" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-finance-dark mb-12">
              Como podemos ajudar você
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-finance-blue" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-finance-dark mb-2">
                  Simulador de Antecipação
                </h3>
                <p className="text-gray-600 mb-4">
                  Descubra quanto você pode economizar antecipando parcelas do seu financiamento de veículo, imóvel ou outros bens.
                </p>
                <Link to="/simulator" className="text-finance-blue font-medium inline-flex items-center">
                  Simular Agora
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-finance-green" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a3 3 0 00-3 3v2H7a1 1 0 000 2h1v1a1 1 0 01-1 1 1 1 0 100 2h6a1 1 0 100-2H9.83c.11-.313.17-.65.17-1v-1h1a1 1 0 100-2h-1V7a1 1 0 112 0 1 1 0 102 0 3 3 0 00-3-3z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-finance-dark mb-2">
                  Controle de Orçamento
                </h3>
                <p className="text-gray-600 mb-4">
                  Gerencie suas receitas e despesas de forma simples. Saiba para onde seu dinheiro está indo e tome o controle da sua vida financeira.
                </p>
                <Link to="/budget" className="text-finance-green font-medium inline-flex items-center">
                  Organizar Finanças
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-finance-purple" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-finance-dark mb-2">
                  Metas Financeiras
                </h3>
                <p className="text-gray-600 mb-4">
                  Estabeleça metas claras para seus objetivos financeiros. Acompanhe seu progresso e mantenha-se motivado.
                </p>
                <Link to="/goals" className="text-finance-purple font-medium inline-flex items-center">
                  Definir Metas
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-finance-dark mb-12">
              Como funciona
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-finance-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-finance-dark mb-2">Insira os dados do financiamento</h3>
                <p className="text-gray-600">
                  Preencha as informações sobre seu financiamento, como valor das parcelas, taxa de juros e prazo restante.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-finance-green text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-finance-dark mb-2">Simule diferentes cenários</h3>
                <p className="text-gray-600">
                  Experimente diferentes opções de antecipação e veja o impacto em economia de juros e tempo.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-finance-teal text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-finance-dark mb-2">Tome decisões informadas</h3>
                <p className="text-gray-600">
                  Use os resultados para decidir a melhor estratégia para seu financiamento e organize-se para implementá-la.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/simulator">
                <Button className="btn-finance-primary">Fazer minha primeira simulação</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-finance-dark mb-12">
              O que nossos usuários dizem
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Carlos Silva</h4>
                    <p className="text-gray-500 text-sm">Financiamento de carro</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Consegui economizar mais de R$ 5.000 em juros antecipando algumas parcelas do meu financiamento de carro. A ferramenta é simples e mostrou exatamente o que eu precisava saber."
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Ana Oliveira</h4>
                    <p className="text-gray-500 text-sm">Financiamento imobiliário</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "O simulador me ajudou a entender que antecipar meu financiamento imobiliário iria me fazer economizar anos de pagamento. As dicas de educação financeira também foram ótimas."
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Marcos Pereira</h4>
                    <p className="text-gray-500 text-sm">Organização financeira</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Comecei usando apenas o simulador, mas acabei adotando toda a parte de orçamento pessoal também. Em 6 meses, consegui organizar minhas finanças completamente."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-finance-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Comece a economizar hoje mesmo
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Faça sua primeira simulação gratuitamente e descubra quanto você pode economizar antecipando parcelas do seu financiamento.
            </p>
            <Link to="/simulator">
              <Button className="bg-white text-finance-blue hover:bg-gray-100 font-bold px-8 py-3 text-lg">
                Simular Agora
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
