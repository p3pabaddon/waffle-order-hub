import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { MenuItem } from "@/data/menuData";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export type OrderStatus = "received" | "preparing" | "almost-ready" | "ready";

export const statusLabels: Record<OrderStatus, string> = {
  received: "Sipariş Alındı",
  preparing: "Hazırlanıyor",
  "almost-ready": "Çıkmak Üzere",
  ready: "Sipariş Hazır",
};

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customizations?: string[];
}

export interface Order {
  id: string;
  orderCode: string;
  items: CartItem[];
  total: number;
  customerName: string;
  tableNumber: string; // now used for phone
  paymentMethod: "online" | "cash";
  status: OrderStatus;
  createdAt: string;
}

interface OrderContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: MenuItem) => void;
  addCustomToCart: (item: MenuItem, customizations: string[]) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  placeOrder: (customerName: string, phone: string, paymentMethod: "online" | "cash") => Promise<string>;
  updateOrderStatus: (orderCode: string, status: OrderStatus) => Promise<void>;
  getOrder: (orderCode: string) => Order | undefined;
  newOrderFlag: number;
  loadingOrders: boolean;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};

const mapDbOrder = (row: any): Order => ({
  id: row.id,
  orderCode: row.order_code,
  items: (row.items as any[]) || [],
  total: Number(row.total),
  customerName: row.customer_name,
  tableNumber: row.table_number,
  paymentMethod: row.payment_method as "online" | "cash",
  status: row.status as OrderStatus,
  createdAt: row.created_at,
});

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrderFlag, setNewOrderFlag] = useState(0);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (data) setOrders(data.map(mapDbOrder));
      setLoadingOrders(false);
    };
    fetchOrders();

    const channel = supabase
      .channel("orders-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
        setOrders((prev) => [mapDbOrder(payload.new), ...prev]);
        setNewOrderFlag((f) => f + 1);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders" }, (payload) => {
        setOrders((prev) =>
          prev.map((o) => (o.id === payload.new.id ? mapDbOrder(payload.new) : o))
        );
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id && !c.customizations);
      if (existing) return prev.map((c) => (c.item.id === item.id && !c.customizations ? { ...c, quantity: c.quantity + 1 } : c));
      return [...prev, { item, quantity: 1 }];
    });
  }, []);

  const addCustomToCart = useCallback((item: MenuItem, customizations: string[]) => {
    setCart((prev) => [...prev, { item, quantity: 1, customizations }]);
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) setCart((prev) => prev.filter((c) => c.item.id !== itemId));
    else setCart((prev) => prev.map((c) => (c.item.id === itemId ? { ...c, quantity } : c)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  const placeOrder = useCallback(
    async (customerName: string, phone: string, paymentMethod: "online" | "cash") => {
      const orderCode = `SIP-${Date.now().toString(36).toUpperCase()}`;
      const cartItemsForDb = cart.map((c) => ({
        item: { id: c.item.id, name: c.item.name, price: c.item.price, image: c.item.image },
        quantity: c.quantity,
        customizations: c.customizations || [],
      }));

      await supabase.from("orders").insert({
        order_code: orderCode,
        customer_name: customerName,
        table_number: phone, // storing phone in table_number field
        payment_method: paymentMethod,
        total: cartTotal,
        items: cartItemsForDb as unknown as Json,
      });

      setCart([]);
      return orderCode;
    },
    [cart, cartTotal]
  );

  const updateOrderStatus = useCallback(async (orderCode: string, status: OrderStatus) => {
    await supabase.from("orders").update({ status }).eq("order_code", orderCode);
  }, []);

  const getOrder = useCallback(
    (orderCode: string) => orders.find((o) => o.orderCode === orderCode),
    [orders]
  );

  return (
    <OrderContext.Provider
      value={{
        cart, orders, addToCart, addCustomToCart, removeFromCart, updateQuantity, clearCart,
        cartTotal, cartCount, placeOrder, updateOrderStatus, getOrder, newOrderFlag, loadingOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
