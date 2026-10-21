"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ReturnsPage() {
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
          <span>ZERO-RISK TRANSIT GUARANTEE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
          100% Live Arrival Guarantee & Shipping Terms
        </h1>
        <p className="text-sm text-zinc-500">Every handcrafted living build is fully backed by our studio</p>
      </div>

      <div className="bg-[#f4f4f6] rounded-[32px] p-8 sm:p-12 border border-zinc-200/60 space-y-8 text-sm text-zinc-600 leading-relaxed font-normal">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-950">1. 100% Live Arrival Guarantee</h2>
          <p>
            Because living mosses, tropical plants, and glass vessels require specialized care during shipping, we take full responsibility for transit. If any glass cracks, or if your plants arrive wilted or damaged, we replace the entire ecosystem completely free of charge.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-950">2. Claim Procedure (24-Hour Notification)</h2>
          <p>
            Upon delivery, please unpack your ecosystem on a clean surface. If you notice any damage:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-700 text-xs sm:text-sm">
            <li>Take 2 clear photos of the shipping box and the damaged vessel or plants.</li>
            <li>Send the photos along with your Order Reference ID to <strong className="text-zinc-900">care@aquaterra.in</strong> or WhatsApp <strong className="text-zinc-900">+91 91234 56789</strong> within 24 hours of package arrival.</li>
            <li>Our botanists will dispatch a brand-new identical build within 48 hours or issue an instant refund.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-950">3. Non-Returnable Living Flora</h2>
          <p>
            Because sealed terrariums develop customized internal micro-climates, shipped healthy living specimens cannot be returned for buyer's remorse once opened. However, our botanical team provides lifetime guidance to ensure your plants thrive.
          </p>
        </div>
      </div>
    </div>
  );
}
