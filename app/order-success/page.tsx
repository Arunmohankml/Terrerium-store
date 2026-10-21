"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { CheckCircle2, PackageCheck, Truck, ArrowRight, ShieldCheck, ShoppingBag, Download } from "lucide-react";

interface LastOrder {
  id: string;
  total: number;
  payment: string;
  shipping?: { fullName?: string; email?: string; city?: string };
  created_at?: string;
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aquaterra_last_order");
      if (saved) setOrder(JSON.parse(saved));
    } catch {}

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
      });
    } catch {}
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-8">
      
      {/* Main Success Bento Card */}
      <div className="bg-[#f4f4f6] rounded-[32px] p-8 sm:p-12 border border-zinc-200/60 text-center space-y-6 shadow-sm">
        
        {/* Checkmark Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            TRANSACTION COMMITTED
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
            Your Living Ecosystem is Reserved
          </h1>
          <p className="text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="text-zinc-800">{order?.shipping?.fullName || "Valued Collector"}</strong>. Our botanical specialists have received your order details and are preparing your biological composition for thermal packing.
          </p>
        </div>

        {/* Order Details Receipt Box (AnonVote Table Style) */}
        <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-xs text-left space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 text-[11px] text-zinc-400 font-bold uppercase">
            <span>AUDIT RECEIPT</span>
            <span>STATUS: CONFIRMED</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <span className="text-zinc-400 text-[10px] uppercase">Order Reference</span>
              <p className="font-bold text-zinc-950 text-sm mt-0.5">{order?.id || "AQ-892401"}</p>
            </div>
            <div>
              <span className="text-zinc-400 text-[10px] uppercase">Payment Mode</span>
              <p className="font-bold text-zinc-950 text-sm mt-0.5">{order?.payment || "Cash on Delivery"}</p>
            </div>
            <div>
              <span className="text-zinc-400 text-[10px] uppercase">Total Paid</span>
              <p className="font-bold text-zinc-950 text-sm mt-0.5">
                {order?.total ? `₹${order.total.toLocaleString("en-IN")}` : "Confirmed"}
              </p>
            </div>
            <div>
              <span className="text-zinc-400 text-[10px] uppercase">Destination</span>
              <p className="font-bold text-zinc-950 text-sm mt-0.5 truncate">{order?.shipping?.city || "India"}</p>
            </div>
          </div>
        </div>

        {/* 2 Checkpoint indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 flex items-start space-x-3">
            <PackageCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-zinc-900">Biological Inspection</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Pre-packing humidity scan and moisture stabilization before container sealing.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 flex items-start space-x-3">
            <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-zinc-900">Express Temperature Tracking</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Confirmation dispatched to <strong className="text-zinc-700">{order?.shipping?.email || "your email"}</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Return Actions */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/shop"
            className="px-6 py-3.5 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-xs font-semibold transition-all shadow-xs flex items-center space-x-2"
          >
            <span>Continue Exploring Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/account"
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-semibold transition-all"
          >
            View Account Orders
          </Link>
        </div>

      </div>

    </div>
  );
}
