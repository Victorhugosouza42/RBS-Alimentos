export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  description: string;
  emoji: string;
  active: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customer: CustomerInfo;
  total: number;
  status: OrderStatus;
  createdAt: string;
  notes: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  quantity: number;
  unitPrice: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  neighborhood: string;
  reference: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface AppSettings {
  storeName: string;
  whatsappNumber: string;
  adminPassword: string;
}

export type Category = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  subcategories: string[];
};
