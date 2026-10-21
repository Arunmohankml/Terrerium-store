"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { resolveImageAsset } from "@/lib/assets";
import { AnimatedButton } from "@/components/AnimatedButton";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose }) => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200/80 shadow-2xl flex flex-col justify-between">
          
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#f87171]">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 tracking-tight">Saved Ecosystems</h3>
                <p className="text-xs text-zinc-400 font-mono">{wishlist.length} {wishlist.length === 1 ? "item" : "items"}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-zinc-900">Your wishlist is empty</h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    Save your favorite terrariums and botanical setups to inspect later.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-xs font-semibold transition-all shadow-xs inline-flex items-center space-x-2"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              wishlist.map((item) => (
                <div 
                  key={item.id}
                  className="bg-[#f4f4f6] rounded-2xl p-3.5 border border-zinc-200/60 flex items-center space-x-3.5"
                >
                  <div className="w-18 h-18 rounded-xl overflow-hidden relative bg-white border border-zinc-200/50 flex-shrink-0">
                    <Image
                      src={resolveImageAsset(item.image_url)}
                      alt={item.name}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-bold text-zinc-900 truncate pr-2">{item.name}</h4>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs font-mono font-bold text-zinc-900">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    <div className="pt-1">
                      <AnimatedButton
                        onClick={() => {
                          addToCart({ id: item.id, name: item.name, price: item.price, image_url: item.image_url });
                          removeFromWishlist(item.id);
                        }}
                        variant="dark"
                        className="px-3 py-1.5 rounded-lg text-[11px] font-semibold"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-zinc-100 bg-white">
            <AnimatedButton
              href="/shop"
              onClick={onClose}
              variant="white"
              className="w-full py-3 rounded-xl text-xs font-semibold"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </AnimatedButton>
          </div>

        </div>
      </div>
    </div>
  );
};
