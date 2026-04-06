import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import type { MenuItem } from "@/data/menuData";

export type OrderStatus = "received" | "preparing" | "almost-ready" | "ready";

export const statusLabels: Record<OrderStatus, string> = {
  received: "Sipariş Alındı",
  preparing: "Hazırlanıyor",
  "almost-ready": "Çıkmak Üzere",
  ready: "Sipariş Hazır",
};

export const statusColors: Record<OrderStatus, string> = {
  received: "bg-muted text-muted-foreground",
  preparing: "bg-accent text-accent-foreground",
  "almost-ready": "gradient-warm text-primary-foreground",
  ready: "bg-green-500 text-primary-foreground",
};

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  tableNumber: string;
  paymentMethod: "online" | "cash";
  status: OrderStatus;
  createdAt: Date;
}

interface OrderContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  placeOrder: (customerName: string, tableNumber: string, paymentMethod: "online" | "cash") => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrder: (orderId: string) => Order | undefined;
  newOrderFlag: number;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrderFlag, setNewOrderFlag] = useState(0);

  const addToCart = useCallback((item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c => c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prev => prev.filter(c => c.item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(c => c.item.id !== itemId));
    } else {
      setCart(prev => prev.map(c => c.item.id === itemId ? { ...c, quantity } : c));
    }
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  const placeOrder = useCallback((customerName: string, tableNumber: string, paymentMethod: "online" | "cash") => {
    const id = `SIP-${Date.now().toString(36).toUpperCase()}`;
    const order: Order = {
      id,
      items: [...cart],
      total: cartTotal,
      customerName,
      tableNumber,
      paymentMethod,
      status: "received",
      createdAt: new Date(),
    };
    setOrders(prev => [order, ...prev]);
    setCart([]);
    setNewOrderFlag(f => f + 1);
    return id;
  }, [cart, cartTotal]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  }, []);

  const getOrder = useCallback((orderId: string) => {
    return orders.find(o => o.id === orderId);
  }, [orders]);

  return (
    <OrderContext.Provider value={{
      cart, orders, addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartCount, placeOrder, updateOrderStatus, getOrder, newOrderFlag,
    }}>
      {children}
    </OrderContext.Provider>
  );
};
