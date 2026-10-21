"use client";

import React from "react";
import Image from "next/image";
import { TERRARIUM_IMAGES, resolveImageAsset } from "@/lib/assets";

const BENTO_CARDS = [
  {
    title: "A self-contained rain cycle that never needs misting",
    desc: "Moisture evaporates, gathers on the glass dome as condensation, and trickles back down to water the roots.",
    image: TERRARIUM_IMAGES.bottleGarden,
    overlayTitle: "Continuous Micro-Rain",
    overlayDesc: "Self-condensing moisture beads hydrate living moss naturally",
  },
  {
    title: "Four living layers built by hand for balance",
    desc: "Each vessel is individually layered with premium drainage leca, activated charcoal, and wild-harvested moss.",
    image: TERRARIUM_IMAGES.storyJar,
    overlayTitle: "Bio-Active Strata",
    overlayDesc: "Horticultural charcoal purification & false bottom leca reservoir",
  },
  {
    title: "Designed for simple, worry-free indoor spaces",
    desc: "No green thumb needed. Handcrafted to thrive on bookshelves, office desks, and side tables.",
    image: TERRARIUM_IMAGES.windowCloche,
    overlayTitle: "Everyday Equilibrium",
    overlayDesc: "Thrives in indirect daylight with self-cleaning microfauna",
  },
];

export const BentoFeatures: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BENTO_CARDS.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#f4f4f6] rounded-[32px] p-6 sm:p-7 flex flex-col justify-between space-y-6 border border-zinc-200/70 shadow-2xs hover:border-zinc-300 transition-all duration-300 group"
          >
            {/* Top Text Content */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-semibold text-zinc-950 tracking-tight leading-snug">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>

            {/* Bottom Image with Very Curved Corners & Text Overlay */}
            <div className="aspect-[4/3] rounded-[24px] overflow-hidden relative bg-white border border-zinc-200/60 shadow-2xs">
              <Image
                src={resolveImageAsset(card.image)}
                alt={card.overlayTitle}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Subtle Dark Gradient for High-Contrast Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Text on Top of Image */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white space-y-1">
                <p className="text-base sm:text-lg font-bold font-sans tracking-tight text-white drop-shadow-xs">
                  {card.overlayTitle}
                </p>
                <p className="text-xs text-zinc-200 font-mono drop-shadow-xs leading-relaxed">
                  {card.overlayDesc}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
