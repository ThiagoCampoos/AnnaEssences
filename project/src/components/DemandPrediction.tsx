import React, { useState } from 'react';
import { Brain, TrendingUp, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { SmartAlertsSystem, DemandPrediction } from '../lib/smartAlerts';

interface DemandPredictionProps {
  products: any[];
}

const DemandPredictionComponent: React.FC<DemandPredictionProps> = ({ products }) => {
  const [alertSystem] = useState(() => new SmartAlertsSystem(products));
  const [predictions] = useState(alertSystem.getDemandPredictions());

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStockStatus = (current: number, predicted: number) => {
    if (current >= predicted * 1.5) return { status: 'Excelente', color: 'text-green-600', icon: CheckCircle };
    if (current >= predicted) return { status: 'Adequado', color: 'text-blue-600', icon: Package };
    return { status: 'Crítico', color: 'text-red-600', icon: AlertCircle };
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <Brain className="h-6 w-6 text-purple-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Previsão de Demanda IA</h2>
      </div>

      <div className="space-y-4">
        {predictions.map((prediction) => {
          const stockStatus = getStockStatus(prediction.currentStock, prediction.predictedDemand);
          const StatusIcon = stockStatus.icon;

          return (
            <div key={prediction.productId} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{prediction.productName}</h3>
                <div className="flex items-center space-x-2">
                  <StatusIcon className={`h-4 w-4 ${stockStatus.color}`} />
                  <span className={`text-sm font-medium ${stockStatus.color}`}>
                    {stockStatus.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{prediction.currentStock}</p>
                  <p className="text-sm text-gray-500">Estoque Atual</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{prediction.predictedDemand}</p>
                  <p className="text-sm text-gray-500">Demanda Prevista</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{prediction.suggestedReorder}</p>
                  <p className="text-sm text-gray-500">Reposição Sugerida</p>
                </div>
                <div className="text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                    {Math.round(prediction.confidence * 100)}%
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Confiança</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Previsão para: <span className="font-medium">{prediction.timeframe}</span>
                </p>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                  Aplicar Sugestão
                </button>
              </div>

              {/* Barra de progresso visual */}
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Estoque vs Demanda</span>
                  <span>{Math.round((prediction.currentStock / prediction.predictedDemand) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      prediction.currentStock >= prediction.predictedDemand ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{
                      width: `${Math.min((prediction.currentStock / prediction.predictedDemand) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <div className="flex items-center mb-2">
          <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
          <h3 className="font-medium text-purple-900">Insights da IA</h3>
        </div>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Console GameStation 6 mostra tendência de alta demanda (+150%)</li>
          <li>• Notebook ProBook X1 precisa de reposição urgente</li>
          <li>• Smartphone Galaxy S25 mantém demanda estável</li>
        </ul>
      </div>
    </div>
  );
};

export default DemandPredictionComponent;