"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </Link>

      <div className="space-y-3 pb-6 border-b border-zinc-100">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>DATA INTEGRITY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
          Privacy & Collector Data Policy
        </h1>
        <p className="text-sm text-zinc-500">Last updated: October 2026</p>
      </div>

      <div className="bg-[#f4f4f6] rounded-[32px] p-8 sm:p-12 border border-zinc-200/60 space-y-8 text-sm text-zinc-600 leading-relaxed font-normal">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-950">1. Information Collection</h2>
          <p>
            When you purchase a living biotope from AquaTerra, we only collect the essential delivery information needed to fulfill transit: your recipient name, shipping address, contact phone, and tracking email.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-950">2. Usage of Courier Data</h2>
          <p>
            Delivery information is transmitted exclusively to our temperature-regulated logistics partners. We do not sell, rent, or distribute collector information to third-party marketing companies.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-950">3. Local Storage Security</h2>
          <p>
            Your active cart, saved wishlist, and local demo session tokens are stored directly on your browser device. You can clear this data at any time via your browser settings or our drawer interfaces.
          </p>
        </div>
      </div>
    </div>
  );
}
