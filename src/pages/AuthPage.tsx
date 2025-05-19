
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const AuthPage = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password, fullName);
    }
  };

  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-finance-blue mb-2">
            {isLogin ? 'Login' : 'Criar Conta'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Acesse sua conta para continuar' : 'Preencha os dados para criar sua conta'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Digite seu nome completo"
                required={!isLogin}
                className="w-full"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full bg-finance-blue hover:bg-blue-700">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </Button>
        </form>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-finance-blue hover:underline"
          >
            {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
