import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Package, TrendingUp, Brain, Leaf, Recycle } from 'lucide-react';
import SmartAlerts from '../components/SmartAlerts';
import DemandPredictionComponent from '../components/DemandPrediction';
import LayoutOptimizationComponent from '../components/LayoutOptimization';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Fev', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Abr', value: 800 },
  { name: 'Mai', value: 500 },
];

const mockProducts = [
  {
    id: '1',
    name: 'Sérum Anti-Idade Premium',
    sku: 'SERUM-ANTI-30ML',
    category: 'Cuidados Faciais',
    quantity: 45,
    price: 299.99,
    status: 'Em Estoque'
  },
  {
    id: '2',
    name: 'Base Líquida HD Cobertura Total',
    sku: 'BASE-HD-30ML',
    category: 'Maquiagem',
    quantity: 12,
    price: 89.99,
    status: 'Baixo Estoque'
  },
  {
    id: '3',
    name: 'Perfume Floral Feminino 100ml',
    sku: 'PERF-FLORAL-100',
    category: 'Perfumaria',
    quantity: 28,
    price: 189.99,
    status: 'Em Estoque'
  },
  {
    id: '4',
    name: 'Creme Hidratante Corporal Orgânico',
    sku: 'CREME-CORP-250ML',
    category: 'Cuidados Corporais',
    quantity: 0,
    price: 79.99,
    status: 'Sem Estoque'
  },
  {
    id: '5',
    name: 'Kit Shampoo e Condicionador Natural',
    sku: 'KIT-SHAMP-500ML',
    category: 'Cuidados Capilares',
    quantity: 15,
    price: 149.99,
    status: 'Em Estoque'
  }
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'predictions' | 'optimization'>('overview');

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Painel de Controle Inteligente</h1>
        <div className="flex items-center space-x-4">
          <SmartAlerts products={mockProducts} />
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Brain className="h-4 w-4 text-purple-600" />
            <span>IA Ativa</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('predictions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'predictions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Previsões IA
          </button>
          <button
            onClick={() => setActiveTab('optimization')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'optimization'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Otimização
          </button>
        </nav>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Produtos</p>
                  <p className="text-2xl font-semibold">1.234</p>
                  <p className="text-xs text-green-600 mt-1">+5% este mês</p>
                </div>
                <Package className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Crescimento Mensal</p>
                  <p className="text-2xl font-semibold">+12,5%</p>
                  <p className="text-xs text-green-600 mt-1">Acima da meta</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-emerald-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pegada de Carbono</p>
                  <p className="text-2xl font-semibold">1.8t</p>
                  <p className="text-xs text-green-600 mt-1">-15% este mês</p>
                </div>
                <Leaf className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-teal-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taxa de Reciclagem</p>
                  <p className="text-2xl font-semibold">92%</p>
                  <p className="text-xs text-green-600 mt-1">+8% este mês</p>
                </div>
                <Recycle className="w-8 h-8 text-teal-500" />
              </div>
            </div>
          </div>

          {/* Sustainability Metrics */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg shadow-sm mb-8 border border-green-200">
            <div className="flex items-center mb-4">
              <Leaf className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-lg font-semibold text-green-900">Painel de Sustentabilidade</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Produtos Orgânicos</span>
                  <span className="text-green-600 text-sm font-medium">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '68%'}}></div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Embalagens Eco</span>
                  <span className="text-emerald-600 text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Fornecedores Sustentáveis</span>
                  <span className="text-teal-600 text-sm font-medium">74%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full" style={{width: '74%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-lg font-semibold mb-4">Movimentação de Estoque</h2>
            <BarChart width={800} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </div>

          {/* Recent Activity with AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Atividades Recentes</h2>
              <div className="space-y-4">
                {[
                  { action: 'Alerta IA: Estoque baixo detectado', product: 'Base Líquida HD Cobertura Total', time: 'há 5 min', type: 'ai' },
                  { action: 'Atualização de Produto', product: 'Sérum Anti-Idade Premium', time: 'há 15 min', type: 'update' },
                  { action: 'Previsão de demanda gerada', product: 'Kit Shampoo e Condicionador Natural', time: 'há 30 min', type: 'ai' },
                  { action: 'Produto orgânico adicionado', product: 'Creme Hidratante Corporal Orgânico', time: 'há 1 hora', type: 'add' },
                  { action: 'Certificação sustentável aprovada', product: 'Perfume Floral Feminino 100ml', time: 'há 2 horas', type: 'sustainability' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center space-x-3">
                      {item.type === 'ai' && <Brain className="h-4 w-4 text-purple-600" />}
                      {item.type === 'update' && <Package className="h-4 w-4 text-blue-600" />}
                      {item.type === 'add' && <TrendingUp className="h-4 w-4 text-green-600" />}
                      {item.type === 'sustainability' && <Leaf className="h-4 w-4 text-emerald-600" />}
                      <div>
                        <p className="font-medium text-sm">{item.action}</p>
                        <p className="text-xs text-gray-600">{item.product}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Insights da IA</h2>
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Brain className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="font-medium text-purple-900">Análise de Tendências</span>
                  </div>
                  <p className="text-sm text-purple-800">
                    Kit Shampoo e Condicionador Natural mostra pico de demanda de 180%. Recomendamos aumentar estoque.
                  </p>
                </div>
                
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Leaf className="h-5 w-5 text-emerald-600 mr-2" />
                    <span className="font-medium text-emerald-900">Sustentabilidade</span>
                  </div>
                  <p className="text-sm text-emerald-800">
                    92% dos produtos possuem certificação orgânica. Meta de 95% até fim do ano.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Recycle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-900">Economia Circular</span>
                  </div>
                  <p className="text-sm text-green-800">
                    Programa de refil reduziu embalagens em 35%. Economia de 2.1t CO₂ este mês.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'predictions' && (
        <DemandPredictionComponent products={mockProducts} />
      )}

      {activeTab === 'optimization' && (
        <LayoutOptimizationComponent products={mockProducts} />
      )}
    </div>
  );
};

export default Dashboard;