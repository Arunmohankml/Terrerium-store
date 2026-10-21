"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SunMedium,
  Leaf,
  Droplets,
  PackageCheck,
  Eye,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const GUIDES = [
  {
    num: "01",
    title: "Light & Room Placement",
    desc: "Position your terrarium where it receives bright, indirect light. North or east-facing windows are ideal. Never place inside harsh direct afternoon sun, as glass amplifies heat rapidly.",
    tag: "ILLUMINATION",
    icon: SunMedium,
  },
  {
    num: "02",
    title: "Understanding Condensation Cycles",
    desc: "A light mist of moisture on the upper glass in the early morning is healthy and normal. If the glass remains fully fogged and wet all day, open the lid for 2-3 hours to balance.",
    tag: "MOISTURE BALANCE",
    icon: Eye,
  },
  {
    num: "03",
    title: "Watering Frequency",
    desc: "Closed terrariums operate in a sealed loop and only require light misting once every 3 to 6 months. Add distilled or filtered water only when the bottom soil appears pale.",
    tag: "HYDRATION",
    icon: Droplets,
  },
  {
    num: "04",
    title: "Pruning & Plant Grooming",
    desc: "Trim tall ficus vines or fern fronds when they touch the glass sides. Use clean curved scissors. Snip yellowing leaves immediately to maintain clean air circulation.",
    tag: "GROOMING",
    icon: Leaf,
  },
  {
    num: "05",
    title: "Settling Upon Arrival",
    desc: "After delivery, unpack carefully on a flat surface. Allow the ecosystem 48 to 72 hours to acclimate to your room temperature and ambient humidity before making any changes.",
    tag: "TRANSIT ACCLIMATION",
    icon: PackageCheck,
  },
];

const TROUBLESHOOTING = [
  {
    issue: "Glass is completely covered in condensation all day",
    cause: "Excess moisture locked inside vessel",
    fix: "Wipe interior glass with a clean paper towel and leave cork/lid open for 3–4 hours.",
  },
  {
    issue: "Moss appears pale or dry to the touch",
    cause: "Insufficient moisture in false bottom",
    fix: "Lightly mist with 2–3 sprays of distilled water, close vessel, and monitor next morning.",
  },
  {
    issue: "White mold or fuzzy fungal growth appears",
    cause: "Dead leaf decaying without springtails",
    fix: "Remove decaying leaf with tweezers. Your beneficial springtail colony will consume residual spores.",
  },
];

export default function CarePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      
      {/* Header (AnonVote Top Header) */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>BOTANICAL HEALTH PROTOCOL</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-zinc-950 tracking-tight">
          Living Ecosystem Care & Maintenance Guide
        </h1>
        <p className="text-base text-zinc-500 font-normal leading-relaxed">
          How to care for your handcrafted closed terrarium, maintain living moss carpets, and ensure lifelong biological equilibrium.
        </p>
      </div>

      {/* Bento Grid: 5 Care Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDES.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.num}
              className="bg-[#f4f4f6] rounded-[32px] p-8 flex flex-col justify-between space-y-6 border border-zinc-200/50"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-400">{g.num}</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white border border-zinc-200 text-[10px] font-mono font-bold text-zinc-700">
                    {g.tag}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-800 shadow-2xs">
                  <Icon className="w-5 h-5 text-zinc-700" />
                </div>

                <h3 className="text-xl font-bold text-zinc-950 tracking-tight">
                  {g.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  {g.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200/60 text-[11px] font-mono text-zinc-400">
                Studio Standard Practice
              </div>
            </div>
          );
        })}
      </div>

      {/* Troubleshooting Audit Table (AnonVote Audit Style) */}
      <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-zinc-200/60 shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
            <span>DIAGNOSTIC MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
            Troubleshooting Common Terrarium Signals
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Quick diagnostic checks and simple remedies if your ecosystem shows early imbalance.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-4">Observation / Signal</th>
                <th className="py-3 px-4">Root Biological Cause</th>
                <th className="py-3 px-4">Corrective Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {TROUBLESHOOTING.map((t, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                  <td className="py-4 px-4 font-bold text-zinc-900">{t.issue}</td>
                  <td className="py-4 px-4 text-zinc-600">{t.cause}</td>
                  <td className="py-4 px-4 text-emerald-700 font-sans font-medium">{t.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assistance CTA Banner */}
      <div className="pastel-aura-canvas rounded-[32px] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-zinc-950 tracking-tight">
            Need personalized botanical consultation?
          </h3>
          <p className="text-sm text-zinc-600 max-w-xl">
            Send our botanists a photo of your terrarium on WhatsApp or Instagram for instant advice.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3.5 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-sm font-semibold transition-all shadow-xs flex items-center space-x-2 cursor-pointer flex-shrink-0"
        >
          <span>Contact Botanical Team</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
