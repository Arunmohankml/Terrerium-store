"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LOCAL_CATALOG, StoreProduct } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { AnimatedButton } from "@/components/AnimatedButton";

const CATEGORIES = ["All", "Terrariums", "Aquascape Kits", "Aquatic Plants"];

const CATEGORY_LINES: Record<string, string> = {
  All: "Handcrafted living ecosystems, from closed-loop glass jars to tabletop freshwater biotopes.",
  Terrariums: "Closed-loop tropical moss worlds with natural rockwork, requiring little to no misting.",
  "Aquascape Kits": "Tabletop underwater biotopes arranged with river stone, aquatic soil, and lush greens.",
  "Aquatic Plants": "Hardy, pest-free submerged botanical species cultivated for pristine glass compositions.",
};

export const FeaturedProductsGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = React.useMemo(() => {
    if (activeCategory === "All") return LOCAL_CATALOG.slice(0, 8);
    return LOCAL_CATALOG.filter((p) => p.category === activeCategory).slice(0, 8);
  }, [activeCategory]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      
      {/* Top Header & Nested Segmented Pill Switcher ((opt1) (opt2) (opt3)) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-zinc-100">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
            <span>CURATED STUDIO SELECTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
            Featured Living Ecosystems
          </h2>
          
          {/* Small Chosen Section Line with smooth crossfade animation */}
          <div className="flex items-center space-x-2 mt-1.5 min-h-[22px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeCategory}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-xs sm:text-sm text-zinc-500 font-normal"
              >
                {CATEGORY_LINES[activeCategory]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Nested Segmented Pill Switcher: ((opt1) (opt2) (opt3)) with sliding spring animation */}
        <div className="bg-[#f4f4f6] p-1.5 rounded-full border border-zinc-200/80 inline-flex items-center gap-1 overflow-x-auto max-w-full scrollbar-none shadow-2xs">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="relative px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition-colors cursor-pointer select-none whitespace-nowrap"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-[#18181b] rounded-full shadow-xs"
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
                  {cat}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Product Cards with Smooth Animated Section Switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          {filtered.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: idx * 0.035 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* View All Collection Banner */}
      <div className="pt-4 flex justify-center">
        <AnimatedButton
          href="/shop"
          variant="light"
          className="px-8 py-4 rounded-xl text-sm font-semibold"
        >
          <span>View All 13 Botanical Specimens in Catalog</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </AnimatedButton>
      </div>

    </section>
  );
};
