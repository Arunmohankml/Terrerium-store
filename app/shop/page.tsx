"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Filter,
  Check,
  X,
  ChevronDown,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LOCAL_CATALOG, StoreProduct } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { AnimatedButton } from "@/components/AnimatedButton";

const CATEGORIES = ["All", "Terrariums", "Aquascape Kits", "Aquatic Plants"];
const CARE_LEVELS = ["All", "Beginner", "Easy", "Moderate", "Advanced"];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCare, setSelectedCare] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">("newest");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category if URL param changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && CATEGORIES.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: LOCAL_CATALOG.length };
    LOCAL_CATALOG.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Compute care level counts
  const careCounts = useMemo(() => {
    const counts: Record<string, number> = { All: LOCAL_CATALOG.length };
    LOCAL_CATALOG.forEach((p) => {
      counts[p.care_level] = (counts[p.care_level] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return LOCAL_CATALOG.filter((item) => {
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.series.toLowerCase().includes(q);
      const matchCat = selectedCategory === "All" || item.category === selectedCategory;
      const matchCare = selectedCare === "All" || item.care_level === selectedCare;
      const matchStock = !inStockOnly || item.stock > 0;
      return matchSearch && matchCat && matchCare && matchStock;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [search, selectedCategory, selectedCare, sortBy, inStockOnly]);

  const handleReset = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedCare("All");
    setSortBy("newest");
    setInStockOnly(false);
  };

  const hasActiveFilters =
    search !== "" ||
    selectedCategory !== "All" ||
    selectedCare !== "All" ||
    inStockOnly ||
    sortBy !== "newest";

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "All") count++;
    if (selectedCare !== "All") count++;
    if (inStockOnly) count++;
    if (search.trim() !== "") count++;
    return count;
  }, [selectedCategory, selectedCare, inStockOnly, search]);

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-100">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
            <span>BOTANICAL INVENTORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
            Store Catalog & Living Specimens
          </h1>
          <p className="text-sm text-zinc-500 font-normal">
            Browse our living collections, self-sustaining moss jars, and tabletop aquascapes.
          </p>
        </div>

        {/* Live inventory counter */}
        <div className="hidden sm:flex items-center space-x-3 flex-shrink-0">
          <div className="bg-[#f4f4f6] border border-zinc-200/80 rounded-2xl px-4 py-2 flex items-center space-x-2.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-zinc-800">
              {filteredProducts.length} Specimens Available
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Search & Sort Top Bar */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3.5 border-b border-zinc-200/70 shadow-2xs transition-all">
        <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input (Left/Center) */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by specimen name, series, or plant species..."
              className="w-full bg-[#f4f4f6] border border-zinc-200/80 rounded-xl pl-10 pr-9 py-2.5 text-sm font-medium text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900 transition-all placeholder:text-zinc-400"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Mobile Filter Button + Sorting Dropdown */}
          <div className="flex items-center justify-between md:justify-end gap-2.5 flex-shrink-0">
            
            {/* Mobile Filter Trigger Button (Visible only on < lg screens) */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-[#f4f4f6] hover:bg-zinc-200 border border-zinc-200 text-xs font-semibold text-zinc-800 transition-colors shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-600" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#18181b] text-white text-[10px] font-bold font-mono flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sorting Dropdown (Strictly aligned to Right side) */}
            <div className="relative flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort botanical specimens"
                className="bg-[#f4f4f6] border border-zinc-200/90 text-zinc-900 rounded-xl pl-3.5 pr-8 py-2.5 text-xs font-semibold focus:outline-none focus:bg-white focus:border-zinc-900 cursor-pointer appearance-none transition-colors shadow-2xs"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-3 pointer-events-none" />
            </div>

            {/* Desktop Reset Pill (if active) */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="hidden md:flex items-center space-x-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors shadow-2xs"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3 text-zinc-400" />
                <span>Reset</span>
              </button>
            )}

          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start pt-2">
        
        {/* ======================================================== */}
        {/* LEFT FILTER SIDEBAR (Desktop - Sticky)                   */}
        {/* ======================================================== */}
        <aside className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0 sticky top-[148px] self-start space-y-5">
          <div className="bg-[#f4f4f6] rounded-[28px] p-5 border border-zinc-200/70 shadow-2xs space-y-6">
            
            {/* Sidebar Title & Clear Button */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-zinc-800" />
                <span className="text-sm font-bold text-zinc-900">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-white text-zinc-800 border border-zinc-200 text-[10px] font-bold font-mono">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 flex items-center space-x-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {/* Filter Section 1: Categories / Collections */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono block">
                Collections
              </span>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count = categoryCounts[cat] || 0;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#18181b] text-white shadow-xs"
                          : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/70"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                          isSelected
                            ? "bg-zinc-800 text-zinc-200"
                            : "bg-white/80 text-zinc-500 border border-zinc-200/50"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Section 2: Care Level */}
            <div className="space-y-2.5 pt-3 border-t border-zinc-200/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono block">
                Care Level
              </span>
              <div className="space-y-1">
                {CARE_LEVELS.map((lvl) => {
                  const isSelected = selectedCare === lvl;
                  const count = careCounts[lvl] || 0;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedCare(lvl)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#18181b] text-white shadow-xs"
                          : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/70"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            lvl === "All"
                              ? "bg-zinc-400"
                              : lvl === "Beginner"
                              ? "bg-emerald-500"
                              : lvl === "Easy"
                              ? "bg-blue-500"
                              : lvl === "Moderate"
                              ? "bg-amber-500"
                              : "bg-purple-500"
                          }`}
                        />
                        <span>{lvl === "All" ? "All Care Levels" : `${lvl} Care`}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                          isSelected
                            ? "bg-zinc-800 text-zinc-200"
                            : "bg-white/80 text-zinc-500 border border-zinc-200/50"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Section 3: Availability */}
            <div className="pt-3 border-t border-zinc-200/60 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono block">
                Availability
              </span>
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 hover:bg-white border border-zinc-200/60 cursor-pointer select-none transition-colors">
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      inStockOnly ? "bg-emerald-500 animate-pulse" : "bg-zinc-300"
                    }`}
                  />
                  <span className="text-xs font-semibold text-zinc-800">In-Stock Only</span>
                </div>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-zinc-900 accent-zinc-900 cursor-pointer"
                />
              </label>
            </div>

          </div>
        </aside>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Active Filter Chips & Products Grid        */}
        {/* ======================================================== */}
        <main className="flex-1 min-w-0 space-y-6">
          
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pb-1">
              <span className="text-xs font-semibold text-zinc-400 font-mono mr-1">Active:</span>

              {selectedCategory !== "All" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
                >
                  <span>Collection: {selectedCategory}</span>
                  <X className="w-3 h-3 text-zinc-300" />
                </button>
              )}

              {selectedCare !== "All" && (
                <button
                  type="button"
                  onClick={() => setSelectedCare("All")}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
                >
                  <span>Care: {selectedCare}</span>
                  <X className="w-3 h-3 text-zinc-300" />
                </button>
              )}

              {inStockOnly && (
                <button
                  type="button"
                  onClick={() => setInStockOnly(false)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
                >
                  <span>In-Stock Only</span>
                  <X className="w-3 h-3 text-zinc-300" />
                </button>
              )}

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
                >
                  <span>Search: &quot;{search}&quot;</span>
                  <X className="w-3 h-3 text-zinc-300" />
                </button>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 underline ml-2 transition-colors cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-[#f4f4f6] rounded-[32px] p-12 text-center border border-zinc-200/60 space-y-4 max-w-xl mx-auto my-12">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-zinc-400 mx-auto shadow-xs">
                <Filter className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">No matching specimens found</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Try adjusting your search terms or clearing your active filters.
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-[#18181b] text-white text-xs font-semibold hover:bg-zinc-800 transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ======================================================== */}
      {/* MOBILE FILTERS DRAWER (Slide-Up Modal on < lg)          */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative z-10 bg-white rounded-t-[32px] p-6 max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl border-t border-zinc-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-zinc-900" />
                  <span className="text-base font-bold text-zinc-900">Filter Specimens</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Collections / Categories */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono block">
                  Collections
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                          isSelected
                            ? "bg-[#18181b] text-white shadow-xs"
                            : "bg-[#f4f4f6] text-zinc-700 hover:bg-zinc-200"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Care Level */}
              <div className="space-y-3 pt-2 border-t border-zinc-100">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono block">
                  Care Level
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {CARE_LEVELS.map((lvl) => {
                    const isSelected = selectedCare === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSelectedCare(lvl)}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                          isSelected
                            ? "bg-[#18181b] text-white shadow-xs"
                            : "bg-[#f4f4f6] text-zinc-700 hover:bg-zinc-200"
                        }`}
                      >
                        {lvl === "All" ? "All Care" : `${lvl} Care`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* In-Stock Toggle */}
              <div className="pt-2 border-t border-zinc-100">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#f4f4f6] cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        inStockOnly ? "bg-emerald-500 animate-pulse" : "bg-zinc-300"
                      }`}
                    />
                    <span className="text-xs font-semibold text-zinc-800">In-Stock Only</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-zinc-900 accent-zinc-900 cursor-pointer"
                  />
                </label>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-800 transition-colors"
                  >
                    Reset All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-[2] py-3 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Show {filteredProducts.length} Specimens
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen max-w-[1680px] mx-auto px-4 py-12 text-zinc-400 font-mono text-xs">Loading Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
