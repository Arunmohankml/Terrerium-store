"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  stock: number;
}

export type CartProduct = Omit<CartItem, 'quantity' | 'stock'> & { stock?: number };

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartProduct, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  isHydrated: boolean;
  notification: string | null;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('hw_cart_v2');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch {
      localStorage.removeItem('hw_cart_v2');
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem('hw_cart_v2', JSON.stringify(cart));
  }, [cart, hydrated]);

  const addToCart = (product: CartProduct, quantity = 1) => {
    const stock = Number.isFinite(product.stock) ? Math.max(0, product.stock as number) : 99;
    const requestedQuantity = Math.max(1, Math.floor(quantity));
    if (stock <= 0) {
      setNotification(`Sorry, ${product.name} is out of stock!`);
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity + requestedQuantity > stock) {
          setNotification(`Maximum stock reached for ${product.name}!`);
          return prev;
        }
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + requestedQuantity } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image_url: product.image_url, quantity: Math.min(requestedQuantity, stock), stock }];
    });
    setNotification(`${product.name} added to Cart!`);
    setIsCartOpen(true);
    setTimeout(() => setNotification(null), 3000);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        if (newQty > item.stock) {
          setNotification(`Only ${item.stock} units available!`);
          return item;
        }
        return { ...item, quantity: Math.max(0, newQty) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      cartTotal, itemCount, isHydrated: hydrated, notification, isCartOpen, setIsCartOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};



