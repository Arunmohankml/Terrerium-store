"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  ShoppingBag,
  Package,
  LogOut,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Compass,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function AccountPage() {
  const [userEmail, setUserEmail] = useState<string>("collector@aquaterra.in");
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Check firebase or local demo user
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email) {
        setUserEmail(currentUser.email);
      } else {
        try {
          const demoUser = localStorage.getItem("aquaterra_demo_user");
          if (demoUser) {
            const parsed = JSON.parse(demoUser);
            if (parsed.email) setUserEmail(parsed.email);
          }
        } catch {}
      }
    });

    // Load last orders from localStorage
    try {
      const lastOrder = localStorage.getItem("aquaterra_last_order");
      if (lastOrder) {
        setOrders([JSON.parse(lastOrder)]);
      }
    } catch {}

    return () => unsub();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch {}
    localStorage.removeItem("aquaterra_demo_user");
    router.push("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Top Header (Matches AnonVote Admin Top Header) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
            <span>COLLECTOR DASHBOARD</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
            Account & Living Acquisitions
          </h1>
          <p className="text-sm text-zinc-500 font-normal mt-1">
            Signed in as <strong className="text-zinc-800 font-mono">{userEmail}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/shop"
            className="px-5 py-2.5 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-xs font-semibold transition-all shadow-xs flex items-center space-x-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Store</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="px-4 py-2.5 rounded-xl bg-[#f4f4f6] hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Metrics Row (AnonVote Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#f4f4f6] rounded-[28px] p-6 border border-zinc-200/60">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono">
            Active Terrariums
          </span>
          <p className="text-3xl sm:text-4xl font-bold text-zinc-950 font-mono tracking-tight mt-2">
            {orders.length > 0 ? orders.length : 1}
          </p>
          <p className="text-xs text-zinc-400 font-mono mt-1">Biological health: OPTIMAL</p>
        </div>

        <div className="bg-[#f4f4f6] rounded-[28px] p-6 border border-zinc-200/60">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono">
            Live Arrival Guarantee
          </span>
          <p className="text-3xl sm:text-4xl font-bold text-emerald-600 font-mono tracking-tight mt-2">
            ACTIVE
          </p>
          <p className="text-xs text-zinc-400 font-mono mt-1">100% Weather protected</p>
        </div>

        <div className="bg-[#f4f4f6] rounded-[28px] p-6 border border-zinc-200/60">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono">
            Botanical Advisory
          </span>
          <p className="text-3xl sm:text-4xl font-bold text-zinc-950 font-mono tracking-tight mt-2">
            UNLIMITED
          </p>
          <p className="text-xs text-zinc-400 font-mono mt-1">Direct studio messaging</p>
        </div>
      </div>

      {/* Past Orders Audit Ledger Table (Matches AnonVote Ledger) */}
      <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-zinc-200/60 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div>
            <h2 className="text-xl font-bold text-zinc-950 tracking-tight">Order Acquisition History</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Immutable record of purchased living compositions</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-mono font-bold">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <Package className="w-10 h-10 text-zinc-300 mx-auto" />
            <p className="text-sm font-semibold text-zinc-700">No previous orders recorded</p>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Once you checkout from our store or custom builder, your dispatch ledger will display here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#18181b] text-white text-xs font-semibold mt-2"
            >
              <span>Explore Specimens</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-400 uppercase text-[10px] font-bold">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {orders.map((ord, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-zinc-900">{ord.id || `AQ-2026-${idx + 1}`}</td>
                    <td className="py-4 px-4 text-zinc-500">
                      {ord.created_at ? new Date(ord.created_at).toLocaleDateString("en-IN") : "Today"}
                    </td>
                    <td className="py-4 px-4 text-zinc-600">{ord.payment || "Cash on Delivery"}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                        {ord.status || "CONFIRMED"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-zinc-950 text-sm">
                      ₹{(ord.total || 3499).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
