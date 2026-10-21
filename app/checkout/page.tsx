"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  Banknote,
  Lock,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { resolveImageAsset } from "@/lib/assets";
import { AnimatedButton } from "@/components/AnimatedButton";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, isHydrated } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "UPI">("COD");
  const [error, setError] = useState("");
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const update = (field: keyof typeof form, val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.address || !form.city || !form.zip) {
      setError("Please fill in all required shipping address fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderId = `AQ-${Date.now().toString().slice(-8)}`;
      const orderRecord = {
        id: orderId,
        total: cartTotal,
        payment: paymentMethod === "COD" ? "Cash on Delivery" : "UPI / Online Payment",
        shipping: form,
        items: cart,
        status: "Confirmed",
        created_at: new Date().toISOString(),
      };

      localStorage.setItem("aquaterra_last_order", JSON.stringify(orderRecord));
      clearCart();
      router.push("/order-success");
    } catch {
      setError("We encountered an error processing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-sm font-mono text-zinc-400">Loading order checkout...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-950">Your Cart is Empty</h2>
        <p className="text-xs text-zinc-500">
          Select a handcrafted living terrarium or botanical build before continuing to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs"
        >
          <span>Return to Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Top Header (AnonVote Style) */}
      <div className="space-y-2 pb-6 border-b border-zinc-100">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>SECURE BOTANICAL CHECKOUT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
          Delivery Address & Order Confirmation
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 font-normal">
          White-glove biological packing included. Studio team verifies plant balance prior to courier dispatch.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Delivery Details Form */}
        <div className="lg:col-span-7 bg-[#f4f4f6] rounded-[32px] p-6 sm:p-10 border border-zinc-200/60 space-y-6">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-zinc-200/80">
            <MapPin className="w-5 h-5 text-zinc-800" />
            <h2 className="text-lg font-bold text-zinc-950">1. Destination Shipping Address</h2>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="e.g. Maya Sharma"
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Email for Tracking
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="maya@example.com"
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all shadow-2xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Contact Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Postal PIN Code
                </label>
                <input
                  type="text"
                  required
                  value={form.zip}
                  onChange={(e) => update("zip", e.target.value)}
                  placeholder="e.g. 560034"
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all shadow-2xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                Street Address & Flat / House Number
              </label>
              <textarea
                required
                rows={2}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Flat / Floor, Building Name, Street Landmark"
                className="w-full bg-white border border-zinc-200 rounded-xl p-3.5 text-sm font-medium text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all shadow-2xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="Bangalore"
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  State
                </label>
                <input
                  type="text"
                  required
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  placeholder="Karnataka"
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3 pt-4 border-t border-zinc-200/80">
            <h3 className="text-sm font-bold text-zinc-950">2. Select Payment Preference</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setPaymentMethod("COD")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3 ${
                  paymentMethod === "COD"
                    ? "bg-white border-zinc-900 shadow-sm ring-2 ring-zinc-900"
                    : "bg-white/60 border-zinc-200 hover:bg-white"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
                  <Banknote className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900">Cash on Delivery</p>
                  <p className="text-[11px] text-zinc-500">Pay when safely received</p>
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod("UPI")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3 ${
                  paymentMethod === "UPI"
                    ? "bg-white border-zinc-900 shadow-sm ring-2 ring-zinc-900"
                    : "bg-white/60 border-zinc-200 hover:bg-white"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900">UPI / Net Banking</p>
                  <p className="text-[11px] text-zinc-500">Instant digital dispatch</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Order Summary */}
        <div className="lg:col-span-5 bg-white rounded-[32px] p-6 sm:p-8 border border-zinc-200/60 shadow-sm space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <h2 className="text-lg font-bold text-zinc-950">Order Summary</h2>
            <span className="text-xs font-mono font-bold text-zinc-500">{cart.length} unique builds</span>
          </div>

          {/* Cart Items Preview */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 pb-3 border-b border-zinc-100 last:border-0">
                <div className="w-14 h-14 rounded-xl overflow-hidden relative bg-zinc-100 border border-zinc-200 flex-shrink-0">
                  <Image
                    src={resolveImageAsset(item.image_url)}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-zinc-900 truncate">{item.name}</h4>
                  <p className="text-[11px] text-zinc-400 font-mono">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-mono font-bold text-zinc-900">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 pt-2 border-t border-zinc-100 text-xs">
            <div className="flex items-center justify-between text-zinc-500">
              <span>Specimens Subtotal</span>
              <span className="font-mono text-zinc-900 font-medium">₹{cartTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-500">
              <span>White-Glove Weather Packing</span>
              <span className="font-mono text-emerald-600 font-bold uppercase">FREE</span>
            </div>
            <div className="flex items-center justify-between text-zinc-500">
              <span>Express Living Transit</span>
              <span className="font-mono text-emerald-600 font-bold uppercase">FREE</span>
            </div>

            <div className="flex items-center justify-between text-base font-bold text-zinc-950 pt-3 border-t border-zinc-100">
              <span>Total Payable</span>
              <span className="text-2xl font-bold font-mono text-zinc-950">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Confidence guarantee */}
          <div className="flex items-center space-x-2 text-[11px] text-zinc-500 bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Guaranteed undamaged delivery or 100% free studio reshipment.</span>
          </div>

          {/* Place Order Button with Cursor-Origin Animation */}
          <AnimatedButton
            type="submit"
            disabled={loading}
            variant="dark"
            className="w-full py-4 px-6 rounded-xl text-[15px] font-semibold"
          >
            {loading ? (
              <span>Confirming Botanical Order...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Place Order (₹{cartTotal.toLocaleString("en-IN")})</span>
              </>
            )}
          </AnimatedButton>

          <p className="text-[11px] text-center text-zinc-400">
            By placing this order, you agree to AquaTerra's live arrival guarantee policies.
          </p>
        </div>

      </form>

    </div>
  );
}
