import React, { useState } from 'react';
import { MapPin, Clock, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { SmartAlertsSystem, LayoutOptimization } from '../lib/smartAlerts';

interface LayoutOptimizationProps {
  products: any[];
}

const LayoutOptimizationComponent: React.FC<LayoutOptimizationProps> = ({ products }) => {
  const [alertSystem] = useState(() => new SmartAlertsSystem(products));
  const [optimizations] = useState(alertSystem.getLayoutOptimizations());
  const [appliedOptimizations, setAppliedOptimizations] = useState<string[]>([]);

  const handleApplyOptimization = (productId: string) => {
    setAppliedOptimizations([...appliedOptimizations, productId]);
  };

  const isApplied = (productId: string) => appliedOptimizations.includes(productId);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <MapPin className="h-6 w-6 text-green-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Otimização de Layout</h2>
      </div>

      <div className="space-y-4">
        {optimizations.map((optimization) => (
          <div key={optimization.productId} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">{optimization.productName}</h3>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  {optimization.accessFrequency} acessos/semana
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-red-800 mb-1">Localização Atual</p>
                <p className="text-red-700">{optimization.currentLocation}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-green-800 mb-1">Localização Sugerida</p>
                <p className="text-green-700">{optimization.suggestedLocation}</p>
              </div>
            </div>

            <div className="flex items-center justify-center mb-4">
              <ArrowRight className="h-6 w-6 text-gray-400" />
            </div>

            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Benefícios Esperados</span>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Economia de tempo: {optimization.estimatedTimeSaving}</li>
                <li>• Motivo: {optimization.reason}</li>
                <li>• Melhoria na eficiência operacional</li>
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Aguardando implementação</span>
              </div>
              
              {isApplied(optimization.productId) ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Aplicado</span>
                </div>
              ) : (
                <button
                  onClick={() => handleApplyOptimization(optimization.productId)}
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                >
                  Aplicar Otimização
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center mb-2">
          <MapPin className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="font-medium text-green-900">Resumo das Otimizações</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{optimizations.length}</p>
            <p className="text-green-800">Otimizações Sugeridas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">25min</p>
            <p className="text-blue-800">Economia Total/Dia</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">15%</p>
            <p className="text-purple-800">Melhoria Eficiência</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutOptimizationComponent;