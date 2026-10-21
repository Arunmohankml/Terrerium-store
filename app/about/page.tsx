"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sprout, Sparkles, Heart, CheckCircle2, Award, Compass } from "lucide-react";
import { resolveImageAsset, TERRARIUM_IMAGES } from "@/lib/assets";
import { AnimatedButton } from "@/components/AnimatedButton";

const CRAFTSMANSHIP_CARDS = [
  {
    image: TERRARIUM_IMAGES.sunlightBowl,
    label: "Handcrafted Biotopes",
    value: "1,200+",
    desc: "Built by laboratory botanists",
    tag: "Studio Built",
  },
  {
    image: TERRARIUM_IMAGES.mountainBowl,
    label: "Live Transit Arrival",
    value: "99.8%",
    desc: "Verified delivery safe rate",
    tag: "Transit Safe",
  },
  {
    image: TERRARIUM_IMAGES.bottleGarden,
    label: "Closed Loop Duration",
    value: "3+ Years",
    desc: "Longest running active build",
    tag: "Closed Cycle",
  },
  {
    image: TERRARIUM_IMAGES.bonsaiDome,
    label: "Beneficial Microfauna",
    value: "100%",
    desc: "Springtails in every jar",
    tag: "Bio-Active",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
          <span>BOTANICAL PHILOSOPHY</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-semibold text-zinc-950 tracking-tight leading-[1.1]">
          Reconnecting modern spaces to living botanical cycles
        </h1>
        <p className="text-lg text-zinc-500 font-normal leading-relaxed">
          Founded in 2024, AquaTerra creates sealed and open tabletop ecosystems. We believe living nature indoors shouldn't demand relentless chores — it should offer calm, wonder, and equilibrium.
        </p>
      </div>

      {/* 4 Craftsmanship Cards with Very Curved Corner Images & Metrics Below */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CRAFTSMANSHIP_CARDS.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#f4f4f6] rounded-[36px] p-4 sm:p-5 border border-zinc-200/70 hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-xs"
          >
            {/* Image with Very Curved Corners */}
            <div className="aspect-[4/3] rounded-[28px] overflow-hidden relative bg-white border border-zinc-200/50 shadow-2xs mb-4">
              <Image
                src={resolveImageAsset(card.image)}
                alt={card.label}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-zinc-800 text-[10px] font-bold font-mono uppercase border border-zinc-200/60 shadow-2xs">
                  {card.tag}
                </span>
              </div>
            </div>

            {/* Metrics & Content Below the Image */}
            <div className="px-1.5 pb-2 space-y-1">
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block font-mono">
                {card.label}
              </span>
              <p className="text-3xl sm:text-4xl font-bold text-zinc-950 font-mono tracking-tight">
                {card.value}
              </p>
              <p className="text-xs text-zinc-400 font-mono pt-0.5">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sustainable Principles (3 Bento Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-[#f4f4f6] rounded-[32px] p-8 border border-zinc-200/60 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-zinc-800 shadow-2xs">
            <Sprout className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-zinc-950">Ethically Cultivated</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            100% of our mosses and ferns are cultivated in controlled indoor propagation facilities. Zero wild-harvesting of endangered forests or moss carpets.
          </p>
        </div>

        <div className="bg-[#f4f4f6] rounded-[32px] p-8 border border-zinc-200/60 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-zinc-800 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-zinc-950">100% Live Arrival</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            We use precision-molded thermal insulation and air cushioning so your ecosystem survives transit vibrations without glass fracture or displaced stone.
          </p>
        </div>

        <div className="bg-[#f4f4f6] rounded-[32px] p-8 border border-zinc-200/60 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-zinc-800 shadow-2xs">
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-zinc-950">Lifetime Support</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Every terrarium purchase includes direct chat access to our botanical team for grooming advice, replanting assistance, and troubleshooting.
          </p>
        </div>
      </div>

      {/* Studio Workshop CTA */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
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
  );
}
