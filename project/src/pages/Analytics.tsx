
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Leaf, Recycle, Droplets, Heart, Shield, Award, TrendingUp, TrendingDown } from 'lucide-react';

const data = [
  { name: 'Jan', vendas: 4000, estoque: 2400, emissoes: 320, organicos: 65, satisfacao: 4.2 },
  { name: 'Fev', vendas: 3000, estoque: 1398, emissoes: 280, organicos: 68, satisfacao: 4.3 },
  { name: 'Mar', vendas: 2000, estoque: 9800, emissoes: 290, organicos: 72, satisfacao: 4.4 },
  { name: 'Abr', vendas: 2780, estoque: 3908, emissoes: 300, organicos: 75, satisfacao: 4.5 },
  { name: 'Mai', vendas: 1890, estoque: 4800, emissoes: 250, organicos: 78, satisfacao: 4.6 },
  { name: 'Jun', vendas: 2390, estoque: 3800, emissoes: 240, organicos: 82, satisfacao: 4.7 },
];

const wasteData = [
  { name: 'Embalagens Recicláveis', value: 65, color: '#10B981' },
  { name: 'Ingredientes Orgânicos', value: 25, color: '#8B5CF6' },
  { name: 'Resíduos Não-recicláveis', value: 10, color: '#EF4444' },
];

const certificationData = [
  { name: 'Cruelty-Free', value: 95, color: '#EC4899' },
  { name: 'Orgânico', value: 78, color: '#10B981' },
  { name: 'Vegano', value: 85, color: '#8B5CF6' },
  { name: 'Fair Trade', value: 62, color: '#F59E0B' },
];

const Analytics: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Analytics Sustentáveis
          </h1>
          <p className="text-gray-600 text-lg">Monitoramento de impacto ambiental e performance de cosméticos sustentáveis</p>
        </div>

        {/* Métricas Principais */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Métricas de Impacto Sustentável</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500 rounded-full">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -12% este mês
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Pegada de Carbono</h3>
              <p className="text-3xl font-bold text-green-700 mb-2">1.8t</p>
              <p className="text-sm text-gray-600">CO₂ equivalente por mês</p>
              <div className="mt-3 bg-green-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500 rounded-full">
                  <Recycle className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center text-purple-600 text-sm font-medium">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8% este mês
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Embalagens Sustentáveis</h3>
              <p className="text-3xl font-bold text-purple-700 mb-2">92%</p>
              <p className="text-sm text-gray-600">materiais recicláveis</p>
              <div className="mt-3 bg-purple-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full w-11/12"></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl shadow-lg border border-pink-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-pink-500 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center text-pink-600 text-sm font-medium">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +15% este mês
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Produtos Orgânicos</h3>
              <p className="text-3xl font-bold text-pink-700 mb-2">78%</p>
              <p className="text-sm text-gray-600">do catálogo total</p>
              <div className="mt-3 bg-pink-200 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full w-4/5"></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <Award className="h-4 w-4 mr-1" />
                  Certificado
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Cruelty-Free</h3>
              <p className="text-3xl font-bold text-blue-700 mb-2">95%</p>
              <p className="text-sm text-gray-600">produtos certificados</p>
              <div className="mt-3 bg-blue-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-11/12"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Impacto Ambiental */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <Leaf className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Impacto Ambiental Mensal</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="emissoes" stroke="#059669" strokeWidth={3} name="CO₂ (t)" dot={{ fill: '#059669', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="organicos" stroke="#8B5CF6" strokeWidth={3} name="Produtos Orgânicos (%)" dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Composição Sustentável */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <Recycle className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Composição Sustentável</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wasteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Certificações e Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Certificações Sustentáveis */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-yellow-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Certificações Sustentáveis</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={certificationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                  }} 
                />
                <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Satisfação do Cliente */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-pink-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Satisfação & Vendas Sustentáveis</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                  }} 
                />
                <Legend />
                <Area type="monotone" dataKey="vendas" stackId="1" stroke="#3B82F6" fill="rgba(59, 130, 246, 0.3)" name="Vendas" />
                <Area type="monotone" dataKey="satisfacao" stackId="2" stroke="#EC4899" fill="rgba(236, 72, 153, 0.3)" name="Satisfação (★)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resumo de Impacto */}
        <div className="bg-gradient-to-r from-green-500 to-purple-600 p-8 rounded-xl shadow-lg text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Impacto Sustentável Total</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Droplets className="h-12 w-12 mx-auto mb-2 opacity-80" />
                <p className="text-2xl font-bold">2.847L</p>
                <p className="text-sm opacity-80">Água economizada</p>
              </div>
              <div className="text-center">
                <Leaf className="h-12 w-12 mx-auto mb-2 opacity-80" />
                <p className="text-2xl font-bold">1.2t</p>
                <p className="text-sm opacity-80">CO₂ reduzido</p>
              </div>
              <div className="text-center">
                <Heart className="h-12 w-12 mx-auto mb-2 opacity-80" />
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm opacity-80">Testes em animais</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;