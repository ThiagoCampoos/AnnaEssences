export interface Alert {
  id: string;
  type: 'low_stock' | 'expiring' | 'demand_spike' | 'reorder_suggestion' | 'layout_optimization';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  productId?: string;
  productName?: string;
  quantity?: number;
  threshold?: number;
  expiryDate?: string;
  suggestedAction?: string;
  createdAt: string;
  isRead: boolean;
}

export interface DemandPrediction {
  productId: string;
  productName: string;
  currentStock: number;
  predictedDemand: number;
  suggestedReorder: number;
  confidence: number;
  timeframe: string;
}

export interface LayoutOptimization {
  productId: string;
  productName: string;
  currentLocation: string;
  suggestedLocation: string;
  accessFrequency: number;
  reason: string;
  estimatedTimeSaving: string;
}

export class SmartAlertsSystem {
  private alerts: Alert[] = [];
  private products: any[] = [];

  constructor(products: any[]) {
    this.products = products;
    this.generateAlerts();
  }

  private generateAlerts() {
    this.alerts = [];
    
    // Alertas de estoque baixo
    this.products.forEach(product => {
      if (product.quantity <= 10) {
        this.alerts.push({
          id: `low_stock_${product.id}`,
          type: 'low_stock',
          title: 'Estoque Baixo',
          message: `${product.name} está com apenas ${product.quantity} unidades em estoque`,
          priority: product.quantity <= 5 ? 'critical' : 'high',
          productId: product.id,
          productName: product.name,
          quantity: product.quantity,
          threshold: 10,
          suggestedAction: `Reabastecer com ${Math.max(50, product.quantity * 3)} unidades`,
          createdAt: new Date().toISOString(),
          isRead: false
        });
      }
    });

    // Alertas de produtos próximos ao vencimento (simulado)
    const expiringProducts = [
      { id: '1', name: 'Base Líquida Premium', expiryDate: '2025-02-15' },
      { id: '3', name: 'Sérum Anti-Idade', expiryDate: '2025-02-20' }
    ];

    expiringProducts.forEach(product => {
      this.alerts.push({
        id: `expiring_${product.id}`,
        type: 'expiring',
        title: 'Produto Próximo ao Vencimento',
        message: `${product.name} vence em breve`,
        priority: 'medium',
        productId: product.id,
        productName: product.name,
        expiryDate: product.expiryDate,
        suggestedAction: 'Considere promoção ou desconto para acelerar vendas',
        createdAt: new Date().toISOString(),
        isRead: false
      });
    });

    // Alertas de pico de demanda
    this.alerts.push({
      id: 'demand_spike_1',
      type: 'demand_spike',
      title: 'Pico de Demanda Detectado',
      message: 'Batom Matte Luxo teve aumento de 150% nas vendas',
      priority: 'high',
      productId: '5',
      productName: 'Batom Matte Luxo',
      suggestedAction: 'Aumentar estoque em 200% para próxima semana',
      createdAt: new Date().toISOString(),
      isRead: false
    });

    // Sugestões de reposição
    this.alerts.push({
      id: 'reorder_1',
      type: 'reorder_suggestion',
      title: 'Sugestão de Reposição Inteligente',
      message: 'Baseado no histórico, recomendamos reabastecer Creme Hidratante Facial',
      priority: 'medium',
      productId: '2',
      productName: 'Creme Hidratante Facial',
      suggestedAction: 'Pedir 25 unidades para otimizar custos de frete',
      createdAt: new Date().toISOString(),
      isRead: false
    });
  }

  getAlerts(): Alert[] {
    return this.alerts.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  getUnreadCount(): number {
    return this.alerts.filter(alert => !alert.isRead).length;
  }

  markAsRead(alertId: string) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.isRead = true;
    }
  }

  dismissAlert(alertId: string) {
    this.alerts = this.alerts.filter(a => a.id !== alertId);
  }

  getDemandPredictions(): DemandPrediction[] {
    return [
      {
        productId: '1',
        productName: 'Base Líquida Premium',
        currentStock: 45,
        predictedDemand: 30,
        suggestedReorder: 50,
        confidence: 0.85,
        timeframe: 'próximos 30 dias'
      },
      {
        productId: '2',
        productName: 'Creme Hidratante Facial',
        currentStock: 12,
        predictedDemand: 25,
        suggestedReorder: 40,
        confidence: 0.92,
        timeframe: 'próximos 30 dias'
      },
      {
        productId: '5',
        productName: 'Batom Matte Luxo',
        currentStock: 15,
        predictedDemand: 45,
        suggestedReorder: 60,
        confidence: 0.78,
        timeframe: 'próximos 30 dias'
      }
    ];
  }

  getLayoutOptimizations(): LayoutOptimization[] {
    return [
      {
        productId: '5',
        productName: 'Batom Matte Luxo',
        currentLocation: 'Setor C - Prateleira 15',
        suggestedLocation: 'Setor A - Prateleira 3',
        accessFrequency: 25,
        reason: 'Alto volume de vendas recente',
        estimatedTimeSaving: '15 min/dia'
      },
      {
        productId: '1',
        productName: 'Base Líquida Premium',
        currentLocation: 'Setor B - Prateleira 8',
        suggestedLocation: 'Setor A - Prateleira 5',
        accessFrequency: 18,
        reason: 'Produto de alta rotatividade',
        estimatedTimeSaving: '10 min/dia'
      }
    ];
  }
}