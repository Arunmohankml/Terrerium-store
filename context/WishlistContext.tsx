"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  stock?: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  toggleWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hw_wishlist');
      if (saved) setWishlist(JSON.parse(saved));
    } catch {
      localStorage.removeItem('hw_wishlist');
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem('hw_wishlist', JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const toggleWishlist = (product: WishlistItem) => {
    setWishlist(prev => {
      const isPresent = prev.find(item => item.id === product.id);
      if (isPresent) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image_url: product.image_url, stock: product.stock }];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id: string) => wishlist.some(item => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
