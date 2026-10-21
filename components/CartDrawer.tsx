"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { resolveImageAsset } from "@/lib/assets";
import { AnimatedButton } from "@/components/AnimatedButton";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, itemCount, clearCart } = useCart();

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
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200/80 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 tracking-tight">Your Botanical Cart</h3>
                <p className="text-xs text-zinc-400 font-mono">{itemCount} {itemCount === 1 ? "specimen" : "specimens"}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-zinc-900">Your basket is empty</h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    Explore our living closed terrariums, botanical vessels, and aquatic kits.
                  </p>
                </div>
                <AnimatedButton
                  href="/shop"
                  onClick={onClose}
                  variant="dark"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs"
                >
                  <span>Browse Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </AnimatedButton>
              </div>
            ) : (
              cart.map((item) => (
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
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs font-mono font-bold text-zinc-900">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>

                    {/* Quantity Stepper */}
                    <div className="flex items-center space-x-2 pt-1">
                      <div className="inline-flex items-center rounded-lg bg-white border border-zinc-200 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-mono font-bold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">₹{item.price} ea</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-zinc-100 bg-white space-y-4">
              {/* Delivery Guarantee Pill */}
              <div className="flex items-center space-x-2 text-[11px] text-zinc-500 bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Live Arrival Guarantee + Free Priority Shipping</span>
              </div>

              {/* Subtotal */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-mono text-zinc-800">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>White-Glove Botanical Packaging</span>
                  <span className="font-mono text-emerald-600 font-bold uppercase">FREE</span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-zinc-950 pt-2 border-t border-zinc-100">
                  <span>Estimated Total</span>
                  <span className="font-mono text-lg text-zinc-950">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Checkout Button with Cursor-Origin Animation */}
              <div className="space-y-2 pt-1">
                <AnimatedButton
                  href="/checkout"
                  onClick={onClose}
                  variant="dark"
                  className="w-full py-3.5 px-6 rounded-xl text-[15px] font-semibold"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </AnimatedButton>

                <div className="flex items-center justify-between">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <span className="text-[11px] text-zinc-400">Cash on Delivery Available</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
