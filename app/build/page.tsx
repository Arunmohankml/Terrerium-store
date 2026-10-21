"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ShoppingBag,
  Sparkles,
  Layers,
  Compass,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { resolveImageAsset, TERRARIUM_IMAGES } from "@/lib/assets";
import { AnimatedButton } from "@/components/AnimatedButton";

const VESSELS = [
  {
    id: "v-cloche",
    name: "Premium Cloche Dome",
    price: 2499,
    size: "28 x 40 cm",
    desc: "Heavy hand-blown bell dome with walnut base. Superior humidity recycling.",
    image: TERRARIUM_IMAGES.windowCloche,
  },
  {
    id: "v-bowl",
    name: "Sunlit Open Bowl",
    price: 1899,
    size: "28 cm diameter",
    desc: "Low-profile open bowl for cushion moss carpets and desktop stone outcrops.",
    image: TERRARIUM_IMAGES.sunlightBowl,
  },
  {
    id: "v-tank",
    name: "Waterfall Frame Tank",
    price: 3999,
    size: "32 x 42 cm",
    desc: "Integrated water reservoir chamber with silent recirculating watercourse.",
    image: TERRARIUM_IMAGES.waterfallTank,
  },
  {
    id: "v-jar",
    name: "Airtight Story Jar",
    price: 2199,
    size: "19 x 32 cm",
    desc: "Cylindrical sealed vessel with cork closure for 100% self-sustaining humidity.",
    image: TERRARIUM_IMAGES.jarLandscape,
  },
];

const HARDSCAPES = [
  {
    id: "h-dragon",
    name: "Dragon Stone Outcrop",
    price: 799,
    desc: "Clay-textured crevice stones perfect for rooting moss and micro-creeping vines.",
  },
  {
    id: "h-river",
    name: "Polished River Pebbles & Slate",
    price: 599,
    desc: "Smooth volcanic river pebbles, slate chips, and sterilised mountain bark.",
  },
  {
    id: "h-lava",
    name: "Porous Black Lava Rock",
    price: 899,
    desc: "Deep mineral-rich lava stone with excellent biological filtration surfaces.",
  },
];

const FLORA = [
  {
    id: "f-cushion",
    name: "Living Cushion & Sheet Moss",
    price: 899,
    desc: "Dense emerald mounds of Leucobryum glaucum and tropical sheet moss.",
  },
  {
    id: "f-ferns",
    name: "Miniature Ferns & Ficus Vines",
    price: 1299,
    desc: "Micro-button ferns and Ficus pumila vines that sculpt the vertical glass walls.",
  },
  {
    id: "f-botanical",
    name: "Tropical Clubmoss & Fittonia",
    price: 1099,
    desc: "Vibrant nerve plants with pink/white veining and lush spike clubmoss.",
  },
];

const INHABITANTS = [
  {
    id: "i-figures",
    name: "Miniature Hand-Painted Bench & Figures",
    price: 399,
    desc: "Tiny sculpted bench and wanderer figurines for whimsical scale.",
  },
  {
    id: "i-springtails",
    name: "Active Springtail Colony (Bio-Guard)",
    price: 499,
    desc: "Beneficial micro-fauna that consume dead organic matter and keep glass clean.",
  },
  {
    id: "i-none",
    name: "Pure Plant & Hardscape (No Figures)",
    price: 0,
    desc: "Pure minimalist Japanese nature aquarium style without decorations.",
  },
];

export default function BuildPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [vessel, setVessel] = useState(VESSELS[0]);
  const [hardscape, setHardscape] = useState(HARDSCAPES[0]);
  const [flora, setFlora] = useState(FLORA[0]);
  const [inhabitant, setInhabitant] = useState(INHABITANTS[1]);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

  const totalPrice = vessel.price + hardscape.price + flora.price + inhabitant.price;

  const handleCompleteBuild = () => {
    const buildId = `custom-${vessel.id}-${hardscape.id}-${flora.id}`;
    const customName = `Custom Build: ${vessel.name}`;

    addToCart({
      id: buildId,
      name: customName,
      price: totalPrice,
      image_url: vessel.image,
      stock: 10,
    });

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {}

    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      
      {/* Header (AnonVote Top Header) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
            <span>STUDIO LAB WORKSHOP</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
            Custom Biotope Ecosystem Builder
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 font-normal mt-1">
            Assemble your vessel, stones, living botanicals, and bio-guard step by step.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono text-zinc-400">Total Build:</span>
          <span className="text-2xl font-bold font-mono text-zinc-950">
            ₹{totalPrice.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Stepper Navigation Pills with Background Box & Sliding Spring Pill */}
      <div>
        <div className="bg-[#f4f4f6] p-1.5 rounded-2xl sm:rounded-full border border-zinc-200/80 inline-flex items-center gap-1 overflow-x-auto max-w-full scrollbar-none shadow-2xs">
          {[
            { num: 1, label: "1. Vessel Architecture" },
            { num: 2, label: "2. Mineral Hardscape" },
            { num: 3, label: "3. Botanical Flora" },
            { num: 4, label: "4. Bio-Inhabitants" },
          ].map((s) => {
            const isActive = step === s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num as any)}
                className="relative px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs font-semibold transition-colors cursor-pointer select-none whitespace-nowrap flex items-center"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBuilderStepPill"
                    className="absolute inset-0 bg-[#18181b] rounded-xl sm:rounded-full shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    isActive
                      ? "text-white font-medium"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Step Configuration Options */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* STEP 1: VESSELS */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-zinc-950">Select Glass Vessel Architecture</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {VESSELS.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => setVessel(v)}
                        className={`rounded-[24px] p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                          vessel.id === v.id
                            ? "bg-white border-[1.5px] border-zinc-400 shadow-xs"
                            : "bg-[#f4f4f6] border border-zinc-200/80 hover:border-zinc-300"
                        }`}
                      >
                        <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-white border border-zinc-200/50">
                          <Image
                            src={resolveImageAsset(v.image)}
                            alt={v.name}
                            fill
                            sizes="300px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-zinc-950">{v.name}</h4>
                            <span className="text-xs font-mono font-bold text-zinc-900">₹{v.price}</span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1">{v.desc}</p>
                          <span className="inline-block mt-2 text-[10px] font-mono text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">
                            {v.size}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: HARDSCAPE */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-zinc-950">Select Mineral Hardscape Foundation</h3>
                  <div className="space-y-3">
                    {HARDSCAPES.map((h) => (
                      <div
                        key={h.id}
                        onClick={() => setHardscape(h)}
                        className={`rounded-[24px] p-5 border transition-all cursor-pointer flex items-center justify-between ${
                          hardscape.id === h.id
                            ? "bg-white border-[1.5px] border-zinc-400 shadow-xs"
                            : "bg-[#f4f4f6] border border-zinc-200/80 hover:border-zinc-300"
                        }`}
                      >
                        <div className="space-y-1 pr-4">
                          <h4 className="text-sm font-bold text-zinc-950">{h.name}</h4>
                          <p className="text-xs text-zinc-500">{h.desc}</p>
                        </div>
                        <span className="text-sm font-mono font-bold text-zinc-900 whitespace-nowrap">
                          +₹{h.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: FLORA */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-zinc-950">Select Living Flora Composition</h3>
                  <div className="space-y-3">
                    {FLORA.map((f) => (
                      <div
                        key={f.id}
                        onClick={() => setFlora(f)}
                        className={`rounded-[24px] p-5 border transition-all cursor-pointer flex items-center justify-between ${
                          flora.id === f.id
                            ? "bg-white border-[1.5px] border-zinc-400 shadow-xs"
                            : "bg-[#f4f4f6] border border-zinc-200/80 hover:border-zinc-300"
                        }`}
                      >
                        <div className="space-y-1 pr-4">
                          <h4 className="text-sm font-bold text-zinc-950">{f.name}</h4>
                          <p className="text-xs text-zinc-500">{f.desc}</p>
                        </div>
                        <span className="text-sm font-mono font-bold text-zinc-900 whitespace-nowrap">
                          +₹{f.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: INHABITANTS */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-zinc-950">Select Biological Inhabitants & Accents</h3>
                  <div className="space-y-3">
                    {INHABITANTS.map((i) => (
                      <div
                        key={i.id}
                        onClick={() => setInhabitant(i)}
                        className={`rounded-[24px] p-5 border transition-all cursor-pointer flex items-center justify-between ${
                          inhabitant.id === i.id
                            ? "bg-white border-[1.5px] border-zinc-400 shadow-xs"
                            : "bg-[#f4f4f6] border border-zinc-200/80 hover:border-zinc-300"
                        }`}
                      >
                        <div className="space-y-1 pr-4">
                          <h4 className="text-sm font-bold text-zinc-950">{i.name}</h4>
                          <p className="text-xs text-zinc-500">{i.desc}</p>
                        </div>
                        <span className="text-sm font-mono font-bold text-zinc-900 whitespace-nowrap">
                          {i.price === 0 ? "FREE" : `+₹${i.price}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Step Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <AnimatedButton
                onClick={() => setStep((s) => (s + 1) as any)}
                variant="dark"
                className="px-6 py-2.5 rounded-xl text-xs font-semibold"
              >
                <span>Continue to Step {step + 1}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </AnimatedButton>
            ) : (
              <button
                type="button"
                onClick={handleCompleteBuild}
                className="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-xs flex items-center space-x-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Finalize & Add to Cart</span>
              </button>
            )}
          </div>

        </div>

        {/* Right Column: Live Build Bill & Preview (Pastel Aura Canvas) */}
        <div className="lg:col-span-5 pastel-aura-canvas rounded-[32px] p-6 sm:p-8 space-y-6 sticky top-28 shadow-sm">
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-white/60 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <span className="text-xs font-mono font-bold uppercase text-zinc-400">
                Active Recipe
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200">
                100% BALANCED
              </span>
            </div>

            {/* Vessel preview thumbnail */}
            <div className="aspect-[16/10] rounded-xl overflow-hidden relative bg-white border border-zinc-100">
              <Image
                src={resolveImageAsset(vessel.image)}
                alt={vessel.name}
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>

            {/* Spec breakdown table (AnonVote style) */}
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between text-zinc-600">
                <span>Vessel:</span>
                <span className="text-zinc-950 font-bold">{vessel.name} (₹{vessel.price})</span>
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span>Hardscape:</span>
                <span className="text-zinc-950 font-bold">{hardscape.name} (₹{hardscape.price})</span>
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span>Living Flora:</span>
                <span className="text-zinc-950 font-bold">{flora.name} (₹{flora.price})</span>
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span>Accents:</span>
                <span className="text-zinc-950 font-bold">{inhabitant.name} (₹{inhabitant.price})</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-900">Total Price</span>
              <span className="text-2xl font-bold font-mono text-zinc-950">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            {added ? (
              <button
                type="button"
                disabled
                className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold bg-emerald-600 text-white shadow-xs flex items-center justify-center space-x-2 cursor-default transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Custom Build Added to Cart!</span>
              </button>
            ) : (
              <AnimatedButton
                onClick={handleCompleteBuild}
                variant="dark"
                className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Custom Build to Bag</span>
              </AnimatedButton>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
