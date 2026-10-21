"use client";

import React from "react";
import { Star, CheckCircle, ShieldCheck } from "lucide-react";

const REVIEWS = [
  {
    name: "Arjun M.",
    role: "Architect, Bangalore",
    product: "Woodland Lamp Terrarium",
    content: "The craftsmanship is remarkable. The glass clarity is crystal clear, and the internal moisture cycle stabilized within 48 hours. It sits on my studio desk and brings instant calm.",
    daysAlive: "8 months thriving",
  },
  {
    name: "Pooja S.",
    role: "UX Designer, Mumbai",
    product: "Sunlit Moss Bowl",
    content: "Arrived in custom molded shockproof packaging with zero soil shifted. The moss is vibrant green and requires zero work. Everyone on my video calls asks about it.",
    daysAlive: "5 months thriving",
  },
  {
    name: "Rohan D.",
    role: "Software Engineer, Hyderabad",
    product: "Bonsai Waterfall Dome",
    content: "Truly a work of biological art. The subtle trickle of water and miniature ficus vines are mesmerizing. The bioactive springtails keep the glass spotless.",
    daysAlive: "1 year thriving",
  },
];

export const StudioReviewsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>VERIFIED BOTANICAL OWNERS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
          Crafted for modern, thoughtful interiors
        </h2>
        <p className="text-sm text-zinc-500">
          How our living glass biotopes transform desks, credenzas, and studio offices across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev, idx) => (
          <div
            key={idx}
            className="bg-[#f4f4f6] rounded-[32px] p-8 flex flex-col justify-between space-y-6 border border-zinc-200/50"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="px-2.5 py-0.5 rounded-md bg-white border border-zinc-200 font-mono text-[10px] text-emerald-700 font-bold">
                  {rev.daysAlive}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic">
                "{rev.content}"
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-200/60 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-zinc-900 tracking-tight">{rev.name}</p>
                <p className="text-xs text-zinc-500">{rev.role}</p>
              </div>
              <span className="text-[11px] font-mono font-medium text-zinc-400">
                {rev.product}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
