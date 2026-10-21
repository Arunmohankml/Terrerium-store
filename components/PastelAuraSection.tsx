"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Check, Sliders, Droplets, Sun, Layers, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LOCAL_CATALOG, StoreProduct } from "@/lib/catalog";
import { resolveImageAsset } from "@/lib/assets";
import { useCart } from "@/context/CartContext";
import { AnimatedButton } from "@/components/AnimatedButton";

export const PastelAuraSection: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedRoom, setSelectedRoom] = useState("Office Desk");
  const [selectedLight, setSelectedLight] = useState("Bright Indirect");
  const [selectedCare, setSelectedCare] = useState("Beginner");
  const [added, setAdded] = useState(false);

  // Dynamic recommendation based on selection
  const matchedProduct: StoreProduct = React.useMemo(() => {
    if (selectedCare === "Beginner") {
      return LOCAL_CATALOG.find((p) => p.id === "sunlit-moss-bowl") || LOCAL_CATALOG[0];
    }
    if (selectedLight === "Low Ambient") {
      return LOCAL_CATALOG.find((p) => p.id === "woodland-lamp-terrarium") || LOCAL_CATALOG[1];
    }
    if (selectedRoom === "Living Room") {
      return LOCAL_CATALOG.find((p) => p.id === "fern-fall-terrarium") || LOCAL_CATALOG[4];
    }
    return LOCAL_CATALOG.find((p) => p.id === "bonsai-waterfall-dome") || LOCAL_CATALOG[0];
  }, [selectedRoom, selectedLight, selectedCare]);

  const handleQuickAdd = () => {
    addToCart({
      id: matchedProduct.id,
      name: matchedProduct.name,
      price: matchedProduct.price,
      image_url: matchedProduct.image_url,
      stock: matchedProduct.stock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuickPreset = (preset: "Desk" | "LowLight" | "Statement") => {
    if (preset === "Desk") {
      setSelectedRoom("Office Desk");
      setSelectedLight("Bright Indirect");
      setSelectedCare("Beginner");
    } else if (preset === "LowLight") {
      setSelectedRoom("Bedroom");
      setSelectedLight("Low Ambient");
      setSelectedCare("Easy");
    } else {
      setSelectedRoom("Living Room");
      setSelectedLight("Bright Indirect");
      setSelectedCare("Moderate");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Context & Explanations (Matches AnonVote Left Column) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 py-6">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold uppercase tracking-wider text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
              <span>STUDIO SPECIMEN MATCHER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight leading-tight">
              Find the right living ecosystem for your room
            </h2>

            <p className="text-base text-zinc-600 leading-relaxed font-normal">
              Every room has its own light and temperature. Select your placement location and natural light below to discover a handcrafted specimen that will flourish effortlessly in your space.
            </p>
          </div>

          {/* Quick Preset Helper Pills (AnonVote Signature Helper Pills) */}
          <div className="p-5 rounded-2xl bg-[#f4f4f6] border border-zinc-200 space-y-3">
            <p className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
              Quick Environment Presets:
            </p>
            <div className="flex flex-wrap gap-2">
              <AnimatedButton
                onClick={() => handleQuickPreset("Desk")}
                variant="white"
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold shadow-2xs"
              >
                Desk Glow (Beginner)
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleQuickPreset("LowLight")}
                variant="white"
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold shadow-2xs"
              >
                Low-Light Sanctuary
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleQuickPreset("Statement")}
                variant="white"
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold shadow-2xs"
              >
                Statement Centerpiece
              </AnimatedButton>
            </div>
          </div>

          <div className="text-xs text-zinc-500 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Tested & verified by studio botanical craftsmen</span>
          </div>
        </div>

        {/* Right Column: Pastel Aura Canvas (AnonVote Exact Signature Mesh) */}
        <div className="lg:col-span-7 pastel-aura-canvas rounded-[32px] p-6 sm:p-10 flex items-center justify-center min-h-[460px] shadow-sm">
          
          {/* FLOATING CARD */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 w-full max-w-lg shadow-xl shadow-zinc-900/5 space-y-6 border border-white/60">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                  Biotope Matcher
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Real-time environmental calibration
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800">
                <Sliders className="w-4 h-4" />
              </div>
            </div>

            {/* Form selectors with Sliding Background Box */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5 font-mono">
                  1. Placement Location
                </label>
                <div className="p-1 bg-[#f4f4f6] rounded-2xl border border-zinc-200/80 grid grid-cols-3 relative">
                  {["Office Desk", "Bedroom", "Living Room"].map((rm) => {
                    const isSelected = selectedRoom === rm;
                    return (
                      <button
                        key={rm}
                        type="button"
                        onClick={() => setSelectedRoom(rm)}
                        className="relative py-2.5 px-2 rounded-xl text-xs font-semibold text-center cursor-pointer select-none transition-colors"
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="activeRoomBg"
                            className="absolute inset-0 bg-[#18181b] rounded-xl shadow-xs"
                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          />
                        )}
                        <span
                          className={`relative z-10 block truncate transition-colors duration-200 ${
                            isSelected ? "text-white font-bold" : "text-zinc-600 hover:text-zinc-950"
                          }`}
                        >
                          {rm}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5 font-mono">
                  2. Light Exposure
                </label>
                <div className="p-1 bg-[#f4f4f6] rounded-2xl border border-zinc-200/80 grid grid-cols-3 relative">
                  {["Bright Indirect", "Low Ambient", "Direct Window"].map((lt) => {
                    const isSelected = selectedLight === lt;
                    return (
                      <button
                        key={lt}
                        type="button"
                        onClick={() => setSelectedLight(lt)}
                        className="relative py-2.5 px-2 rounded-xl text-xs font-semibold text-center cursor-pointer select-none transition-colors"
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="activeLightBg"
                            className="absolute inset-0 bg-[#18181b] rounded-xl shadow-xs"
                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          />
                        )}
                        <span
                          className={`relative z-10 block truncate transition-colors duration-200 ${
                            isSelected ? "text-white font-bold" : "text-zinc-600 hover:text-zinc-950"
                          }`}
                        >
                          {lt}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5 font-mono">
                  3. Care Experience
                </label>
                <div className="p-1 bg-[#f4f4f6] rounded-2xl border border-zinc-200/80 grid grid-cols-3 relative">
                  {["Beginner", "Easy", "Moderate"].map((cr) => {
                    const isSelected = selectedCare === cr;
                    return (
                      <button
                        key={cr}
                        type="button"
                        onClick={() => setSelectedCare(cr)}
                        className="relative py-2.5 px-2 rounded-xl text-xs font-semibold text-center cursor-pointer select-none transition-colors"
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="activeCareBg"
                            className="absolute inset-0 bg-[#18181b] rounded-xl shadow-xs"
                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          />
                        )}
                        <span
                          className={`relative z-10 block truncate transition-colors duration-200 ${
                            isSelected ? "text-white font-bold" : "text-zinc-600 hover:text-zinc-950"
                          }`}
                        >
                          {cr}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recommendation Match Result Box with Smooth Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={matchedProduct.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="bg-[#f4f4f6] rounded-2xl p-4 border border-zinc-200/80 flex items-center space-x-4 shadow-2xs"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden relative bg-white border border-zinc-200/60 flex-shrink-0">
                  <Image
                    src={resolveImageAsset(matchedProduct.image_url)}
                    alt={matchedProduct.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wide">
                    IDEAL ROOM MATCH
                  </span>
                  <h4 className="text-sm font-bold text-zinc-950 truncate">{matchedProduct.name}</h4>
                  <p className="text-xs font-bold text-zinc-900">
                    ₹{matchedProduct.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action button with cursor-origin animation */}
            {added ? (
              <button
                type="button"
                disabled
                className="w-full py-3.5 px-6 rounded-xl text-[14px] font-semibold bg-emerald-600 text-white shadow-xs flex items-center justify-center space-x-2 cursor-default transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Added Recommended Specimen!</span>
              </button>
            ) : (
              <AnimatedButton
                onClick={handleQuickAdd}
                variant="dark"
                className="w-full py-3.5 px-6 rounded-xl text-[14px] font-semibold"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Matched Specimen to Cart</span>
              </AnimatedButton>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
