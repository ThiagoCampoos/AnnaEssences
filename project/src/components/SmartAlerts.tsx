import React, { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, Package, TrendingUp, MapPin, CheckCircle, Clock } from 'lucide-react';
import { SmartAlertsSystem, Alert } from '../lib/smartAlerts';

interface SmartAlertsProps {
  products: any[];
}

const SmartAlerts: React.FC<SmartAlertsProps> = ({ products }) => {
  const [alertSystem] = useState(() => new SmartAlertsSystem(products));
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setAlerts(alertSystem.getAlerts());
    setUnreadCount(alertSystem.getUnreadCount());
  }, [alertSystem]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'low_stock':
        return <Package className="h-5 w-5" />;
      case 'expiring':
        return <Clock className="h-5 w-5" />;
      case 'demand_spike':
        return <TrendingUp className="h-5 w-5" />;
      case 'reorder_suggestion':
        return <CheckCircle className="h-5 w-5" />;
      case 'layout_optimization':
        return <MapPin className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'high':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const handleMarkAsRead = (alertId: string) => {
    alertSystem.markAsRead(alertId);
    setAlerts(alertSystem.getAlerts());
    setUnreadCount(alertSystem.getUnreadCount());
  };

  const handleDismiss = (alertId: string) => {
    alertSystem.dismissAlert(alertId);
    setAlerts(alertSystem.getAlerts());
    setUnreadCount(alertSystem.getUnreadCount());
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Alertas Inteligentes</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {unreadCount} alertas não lidos
            </p>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>Nenhum alerta no momento</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 border-b border-gray-100 ${getPriorityColor(alert.priority)} ${
                    !alert.isRead ? 'bg-opacity-50' : 'bg-opacity-20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-1 rounded-full ${
                        alert.priority === 'critical' ? 'bg-red-100' :
                        alert.priority === 'high' ? 'bg-orange-100' :
                        alert.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                        {alert.suggestedAction && (
                          <p className="text-sm text-blue-600 mt-2 font-medium">
                            💡 {alert.suggestedAction}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(alert.createdAt).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {!alert.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(alert.id)}
                          className="text-blue-600 hover:text-blue-800 text-xs"
                          title="Marcar como lido"
                        >
                          ✓
                        </button>
                      )}
                      <button
                        onClick={() => handleDismiss(alert.id)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Dispensar"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Ver todos os alertas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartAlerts;