"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ArrowLeft, Package, Truck, MapPin, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { resolveImageAsset } from "@/lib/assets";

const formatDateTime = (iso: string) => {
  if (!iso) return "Recent";
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function OrderDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Attempt load from Supabase or fallback to local storage
    async function loadOrder() {
      if (id) {
        try {
          const { data } = await supabase.from("orders").select("*").eq("id", id).single();
          if (data) {
            setOrder(data);
            setLoading(false);
            return;
          }
        } catch {}

        try {
          const localOrder = localStorage.getItem("aquaterra_last_order");
          if (localOrder) {
            const parsed = JSON.parse(localOrder);
            if (parsed.id === id || !id) {
              setOrder(parsed);
              setLoading(false);
              return;
            }
          }
        } catch {}
      }
      setLoading(false);
    }

    void loadOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-sm font-mono text-zinc-400">Loading order dispatch records...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 mx-auto">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-950">Order Record Not Found</h2>
        <p className="text-xs text-zinc-500">
          We could not find an active biological acquisition matching that reference ID.
        </p>
        <Link
          href="/account"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Collector Profile</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Back button */}
      <div>
        <Link
          href="/account"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Orders</span>
        </Link>
      </div>

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>CONFIRMED SPECIMEN DISPATCH</span>
          </div>
          <h1 className="text-3xl font-semibold text-zinc-950 tracking-tight">
            Order #{order.id}
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Recorded on {formatDateTime(order.created_at)}
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200 self-start sm:self-auto">
          {order.status || "CONFIRMED"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Items breakdown */}
        <div className="lg:col-span-8 bg-[#f4f4f6] rounded-[32px] p-6 sm:p-8 border border-zinc-200/60 space-y-6">
          <h2 className="text-base font-bold text-zinc-950">Acquired Specimens</h2>

          <div className="space-y-3">
            {order.items && order.items.length > 0 ? (
              order.items.map((item: any, i: number) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 border border-zinc-200/60 flex items-center space-x-4 shadow-2xs"
                >
                  <div className="w-18 h-18 rounded-xl overflow-hidden relative bg-zinc-100 flex-shrink-0">
                    <Image
                      src={resolveImageAsset(item.image_url)}
                      alt={item.name}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h4 className="text-sm font-bold text-zinc-900 truncate">{item.name}</h4>
                    <p className="text-xs text-zinc-400 font-mono">Quantity: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-mono font-bold text-zinc-950">
                    ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                  </span>
                </div>
              ))
            ) : (
              <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 text-center text-xs text-zinc-400 font-mono">
                Order record stored with live verified tracking.
              </div>
            )}
          </div>

          {/* Pricing summary */}
          <div className="pt-4 border-t border-zinc-200/80 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-zinc-500">
              <span>Payment Mode:</span>
              <span className="text-zinc-900 font-bold">{order.payment || "Cash on Delivery"}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-500">
              <span>Living Transit Protection:</span>
              <span className="text-emerald-700 font-bold">100% COVERED</span>
            </div>
            <div className="flex items-center justify-between text-base font-bold text-zinc-950 pt-2 border-t border-zinc-200">
              <span>Total Amount</span>
              <span className="text-xl font-bold font-mono text-zinc-950">
                ₹{(order.total || order.total_amount || 3499).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Shipping details card */}
        <div className="lg:col-span-4 bg-white rounded-[32px] p-6 sm:p-8 border border-zinc-200/60 shadow-xs space-y-6">
          <div className="flex items-center space-x-2 text-zinc-900 font-bold text-sm pb-3 border-b border-zinc-100">
            <MapPin className="w-4 h-4" />
            <span>Shipping Destination</span>
          </div>

          <div className="space-y-2 text-xs text-zinc-600">
            <p className="font-bold text-zinc-900">{order.shipping?.fullName || "Valued Collector"}</p>
            <p>{order.shipping?.address || "Address verified on file"}</p>
            <p>{order.shipping?.city ? `${order.shipping.city}, ${order.shipping.state || ""}` : "Express Destination"}</p>
            <p className="font-mono text-zinc-400">{order.shipping?.zip || ""}</p>
          </div>

          <div className="pt-4 border-t border-zinc-100">
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-700 bg-emerald-50 rounded-xl p-3 border border-emerald-200">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Priority temperature-controlled transit active.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
