export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  quantity: number;
  min_quantity: number;
  price: number;
  category: string;
  location: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryMovement {
  id: string;
  product_id: string;
  type: 'in' | 'out';
  quantity: number;
  reason: string;
  created_at: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'manager' | 'user';
}