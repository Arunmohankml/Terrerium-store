"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Check, ArrowRight, Sparkles } from "lucide-react";
import { StoreProduct } from "@/lib/catalog";
import { resolveImageAsset } from "@/lib/assets";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { AnimatedButton } from "@/components/AnimatedButton";

interface ProductCardProps {
  product: StoreProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      stock: product.stock,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
  };

  return (
    <div className="bg-[#f4f4f6] rounded-2xl sm:rounded-[28px] p-3 sm:p-5 pb-3.5 sm:pb-5 border border-zinc-200/60 hover:border-zinc-300/90 transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-xs">
      
      {/* Top Image Container */}
      <div>
        <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden relative bg-white border border-zinc-200/50 mb-3 sm:mb-4 group-hover:scale-[1.01] transition-transform duration-300">
          <Link href={`/shop/${product.id}`} className="block w-full h-full relative">
            <Image
              src={resolveImageAsset(product.image_url)}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Wishlist Button - Clean Floating Heart (No Background Box) */}
          <button
            type="button"
            onClick={handleWishlist}
            className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 p-1 sm:p-1.5 transition-all cursor-pointer group/like z-10"
            title={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover/like:scale-120 ${
                isSaved
                  ? "fill-[#f87171] text-[#f87171] drop-shadow-[0_2px_4px_rgba(248,113,113,0.35)]"
                  : "text-white fill-black/20 stroke-white stroke-[2.2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.65)] hover:text-rose-400 hover:stroke-rose-400"
              }`}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-400">
            <span className="truncate max-w-[65%]">{product.series}</span>
            <span className="truncate">{product.size}</span>
          </div>

          <Link href={`/shop/${product.id}`}>
            <h3 className="text-xs sm:text-base font-bold text-zinc-950 tracking-tight group-hover:text-zinc-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] sm:text-xs text-zinc-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Bottom Price & Action */}
      <div className="pt-2.5 sm:pt-3.5 mt-2.5 sm:mt-3 border-t border-zinc-200/60 flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-1">
        <div className="space-y-0.5">
          <span className="text-[9px] sm:text-[11px] uppercase text-zinc-400 font-semibold tracking-wide block">
            Studio Price
          </span>
          <p className="text-sm sm:text-xl md:text-2xl font-bold text-zinc-950 tracking-tight">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>

        {justAdded ? (
          <button
            disabled
            className="px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold bg-emerald-600 text-white shadow-xs flex items-center justify-center space-x-1.5 cursor-default transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Added!</span>
          </button>
        ) : (
          <AnimatedButton
            onClick={handleAdd}
            variant="dark"
            className="px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold"
          >
            <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Add<span className="hidden min-[400px]:inline sm:inline"> to Bag</span></span>
          </AnimatedButton>
        )}
      </div>

    </div>
  );
};
