"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  Check,
  ShieldCheck,
  Truck,
  Droplets,
  Sun,
  Layers,
  Sparkles,
  Plus,
  Minus,
} from "lucide-react";
import { getLocalProduct, LOCAL_CATALOG, StoreProduct } from "@/lib/catalog";
import { resolveImageAsset } from "@/lib/assets";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { AnimatedButton } from "@/components/AnimatedButton";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const product = getLocalProduct(id) || LOCAL_CATALOG[0];
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        stock: product.stock,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = LOCAL_CATALOG.filter(
    (item) => item.id !== product.id && item.category === product.category
  ).slice(0, 3);

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Back button */}
      <div>
        <Link
          href="/shop"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Image Card */}
        <div className="lg:col-span-6 bg-[#f4f4f6] rounded-[32px] p-6 border border-zinc-200/60 sticky top-28">
          <div className="aspect-square rounded-[24px] overflow-hidden relative bg-white border border-zinc-200/50 shadow-xs">
            <Image
              src={resolveImageAsset(product.image_url)}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.is_limited && (
                <span className="px-3 py-1 rounded-lg bg-[#18181b]/95 backdrop-blur-md text-white text-[11px] font-bold font-mono tracking-wider shadow-sm">
                  LIMITED STUDIO SPECIMEN
                </span>
              )}
              <span className="px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md text-zinc-900 text-[11px] font-bold font-mono uppercase border border-zinc-200/60 shadow-2xs">
                {product.category}
              </span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Dimensions: {product.size}</span>
            <span>Studio Batch: #{product.id.slice(0, 8)}</span>
          </div>
        </div>

        {/* Right Column: Specimen Details */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Header */}
          <div className="space-y-3 pb-6 border-b border-zinc-100">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold">
                {product.series}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                Care: {product.care_level}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 leading-tight">
              {product.name}
            </h1>

            <p className="text-base text-zinc-500 leading-relaxed font-normal">
              {product.description}
            </p>
          </div>

          {/* Pricing & Stock */}
          <div className="flex items-baseline space-x-4">
            <span className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-zinc-400">Tax included · Free delivery</span>
          </div>

          {/* Add to Cart Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-3">
              {/* Stepper */}
              <div className="flex items-center rounded-xl bg-[#f4f4f6] border border-zinc-200 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-600 hover:bg-white transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-mono font-bold text-zinc-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-600 hover:bg-white transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Bag CTA with Cursor-Origin Animation */}
              {added ? (
                <button
                  type="button"
                  disabled
                  className="flex-1 py-3.5 px-6 rounded-xl text-[15px] font-semibold bg-emerald-600 text-white shadow-xs flex items-center justify-center space-x-2 cursor-default transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Added {quantity} to Bag!</span>
                </button>
              ) : (
                <AnimatedButton
                  onClick={handleAddToCart}
                  variant="dark"
                  className="flex-1 py-3.5 px-6 rounded-xl text-[15px] font-semibold"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </AnimatedButton>
              )}

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() =>
                  toggleWishlist({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image_url: product.image_url,
                  })
                }
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSaved
                    ? "bg-red-50 border-red-200 text-[#f87171]"
                    : "bg-[#f4f4f6] border-zinc-200 text-zinc-600 hover:text-zinc-950"
                }`}
                title={isSaved ? "Saved" : "Save to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-700 bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>100% Live Arrival Safe Guarantee + Thermal Weather-Shield Packaging</span>
            </div>
          </div>

          {/* Technical Specifications Audit Table (Matches AnonVote Table) */}
          <div className="bg-[#f4f4f6] rounded-[28px] p-6 border border-zinc-200/60 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80">
              <span className="font-bold uppercase tracking-wider text-zinc-500 text-[11px]">SPECIFICATION</span>
              <span className="font-bold uppercase tracking-wider text-zinc-500 text-[11px]">STUDIO VERIFIED</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-zinc-600">Vessel Dimension</span>
              <span className="text-zinc-950 font-semibold">{product.size}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-zinc-600">Care Complexity</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                {product.care_level}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-zinc-600">Moisture Cycle</span>
              <span className="text-zinc-950 font-semibold">Self-Sustaining Closed Loop</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-zinc-600">Substrate Composition</span>
              <span className="text-zinc-950 font-semibold">Leca, Activated Carbon, Sphagnum</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-zinc-600">Lighting Exposure</span>
              <span className="text-zinc-950 font-semibold">Filtered Indirect (4-6 hrs/day)</span>
            </div>
          </div>

        </div>

      </div>

      {/* Related Specimens Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-zinc-100">
          <div>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              More from the Studio
            </span>
            <h2 className="text-2xl font-bold text-zinc-950 tracking-tight mt-1">
              Similar Living Ecosystems
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
