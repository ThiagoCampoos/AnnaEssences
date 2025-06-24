import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulação de login - em produção, integrar com sistema de autenticação real
    try {
      if (email === 'admin@anaessence.com' && password === 'admin123') {
        localStorage.setItem('user', JSON.stringify({ email, name: 'Ana Silva' }));
        navigate('/');
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">AnaEssence</h1>
        <p className="text-gray-600 text-center mb-8">Sistema de Gestão de Cosméticos Sustentáveis</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 font-medium"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;