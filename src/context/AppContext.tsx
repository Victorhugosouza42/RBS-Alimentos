import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem, Order, OrderStatus, AppSettings, OrderItem, CustomerInfo } from '../types';
import { initialProducts } from '../data/products';

interface AppContextType {
  products: Product[];
  cartItems: CartItem[];
  orders: Order[];
  settings: AppSettings;
  isAdmin: boolean;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  createOrder: (customer: CustomerInfo, notes: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  login: (password: string) => boolean;
  logout: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('emporio_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch { return initialProducts; }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('emporio_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('emporio_orders');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('emporio_settings');
      return saved ? JSON.parse(saved) : {
        storeName: 'RBS Alimentos',
        whatsappNumber: '5573999010809',
        adminPassword: 'admin123',
      };
    } catch {
      return {
        storeName: 'RBS Alimentos',
        whatsappNumber: '5573999010809',
        adminPassword: 'admin123',
      };
    }
  });

  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('emporio_admin') === 'true');

  useEffect(() => { localStorage.setItem('emporio_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('emporio_cart', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem('emporio_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('emporio_settings', JSON.stringify(settings)); }, [settings]);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const id = 'p' + Date.now();
    setProducts(prev => [...prev, { ...product, id }]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCartItems(prev => prev.filter(c => c.productId !== id));
  }, []);

  const addToCart = useCallback((productId: string) => {
    setCartItems(prev => {
      const existing = prev.find(c => c.productId === productId);
      if (existing) {
        return prev.map(c => c.productId === productId ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prev => prev.filter(c => c.productId !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(c => c.productId !== productId));
    } else {
      setCartItems(prev => prev.map(c => c.productId === productId ? { ...c, quantity } : c));
    }
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [cartItems, products]);

  const getCartCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const createOrder = useCallback((customer: CustomerInfo, notes: string): Order => {
    const orderItems: OrderItem[] = cartItems.map(item => {
      const product = products.find(p => p.id === item.productId)!;
      return {
        productId: item.productId,
        productName: product.name,
        brand: product.brand,
        quantity: item.quantity,
        unitPrice: product.price,
      };
    });

    const total = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const order: Order = {
      id: 'PED-' + Date.now().toString(36).toUpperCase(),
      items: orderItems,
      customer,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      notes,
    };

    setOrders(prev => [order, ...prev]);
    setCartItems([]);
    return order;
  }, [cartItems, products]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  }, []);

  const deleteOrder = useCallback((orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  }, []);

  const login = useCallback((password: string): boolean => {
    if (password === settings.adminPassword) {
      setIsAdmin(true);
      sessionStorage.setItem('emporio_admin', 'true');
      return true;
    }
    return false;
  }, [settings.adminPassword]);

  const logout = useCallback(() => {
    setIsAdmin(false);
    sessionStorage.removeItem('emporio_admin');
  }, []);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return (
    <AppContext.Provider value={{
      products, cartItems, orders, settings, isAdmin,
      addProduct, updateProduct, deleteProduct,
      addToCart, removeFromCart, updateCartQuantity, clearCart, getCartTotal, getCartCount,
      createOrder, updateOrderStatus, deleteOrder,
      login, logout, updateSettings,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
