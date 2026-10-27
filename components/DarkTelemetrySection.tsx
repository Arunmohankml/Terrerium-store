"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Compass, Sprout, ShieldCheck, Heart } from "lucide-react";
import { TERRARIUM_IMAGES, resolveImageAsset } from "@/lib/assets";
import { AnimatedButton } from "@/components/AnimatedButton";

const CRAFT_FEATURES = [
  {
    tag: "Healthy Roots",
    title: "4 Handcrafted Soil Layers",
    desc: "Clay leca stones, charcoal, and mesh isolate excess moisture below the roots. This stops root rot and keeps soil fresh without stagnant odors.",
    image: TERRARIUM_IMAGES.sunlightBowl,
    perk1: "Prevents root rot",
    perk2: "Zero stale odor",
  },
  {
    tag: "Self-Cleaning",
    title: "Beneficial Micro-Cleaners",
    desc: "Every jar includes living springtails. These tiny, harmless organisms eat decaying moss and prevent mold, keeping the glass and foliage crystal clear.",
    image: TERRARIUM_IMAGES.bonsaiDome,
    perk1: "Naturally cleans glass",
    perk2: "100% pesticide-free",
  },
  {
    tag: "Safe Transit",
    title: "Guaranteed Live Delivery",
    desc: "We pack each vessel in custom molded foam and temperature insulation. Your ecosystem arrives alive, intact, and ready for your desk or shelf.",
    image: TERRARIUM_IMAGES.mountainBowl,
    perk1: "100% Live arrival promise",
    perk2: "Protected glass packaging",
  },
];

export const DarkTelemetrySection: React.FC = () => {
  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header (Light, Clean AnonVote Style) */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
            <span>STUDIO CRAFTSMANSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-950 leading-tight">
            Handcrafted glass ecosystems built to flourish without the fuss
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 font-normal leading-relaxed">
            Every terrarium is carefully built with natural drainage layers, self-cleaning bio-organisms, and hardy moss varieties so you enjoy peaceful living nature without daily chores.
          </p>
        </div>

        {/* 3 Visual Cards with Very Curved Corners & Terrarium Photography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CRAFT_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#f4f4f6] rounded-[32px] p-6 sm:p-7 border border-zinc-200/70 shadow-2xs hover:shadow-xs hover:border-zinc-300 transition-all duration-300 flex flex-col group"
            >
              {/* Very Curved Terrarium Image */}
              <div className="aspect-[4/3] rounded-[24px] overflow-hidden relative bg-white border border-zinc-200/60 shadow-2xs flex-shrink-0">
                <Image
                  src={resolveImageAsset(feature.image)}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-zinc-900 text-[10px] font-bold font-mono uppercase tracking-wider border border-zinc-200/60 shadow-2xs">
                    {feature.tag}
                  </span>
                </div>
              </div>

              {/* Friendly Content Below Image */}
              <div className="mt-6 flex-1 flex flex-col justify-start space-y-2.5">
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Simple Benefits / Perks - Uniform 2-row layout with smaller refined text */}
              <div className="mt-auto pt-4 border-t border-zinc-200/60 flex flex-col items-start gap-2">
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl bg-white border border-zinc-200/70 text-[11px] sm:text-xs font-semibold text-zinc-800 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{feature.perk1}</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl bg-white border border-zinc-200/70 text-[11px] sm:text-xs font-semibold text-zinc-800 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{feature.perk2}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Section Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <AnimatedButton
            href="/shop"
            variant="dark"
            className="px-8 py-3.5 rounded-xl text-sm font-semibold shadow-xs"
          >
            <span>Explore Living Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </AnimatedButton>
          <AnimatedButton
            href="/build"
            variant="white"
            className="px-7 py-3.5 rounded-xl text-sm font-semibold"
          >
            <Compass className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            <span>Launch Custom Studio Builder</span>
          </AnimatedButton>
        </div>

      </div>
    </section>
  );
};
