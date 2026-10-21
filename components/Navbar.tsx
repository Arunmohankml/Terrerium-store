"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ShoppingBag,
  Heart,
  User,
  ShieldCheck,
  Compass,
  BookOpen,
  Sparkles,
  MessageSquare,
  Store,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AnimatedButton } from "@/components/AnimatedButton";

const ADMIN_EMAIL = "arunmohankrl@gmail.com";

interface NavItem {
  id: string;
  label: string;
  href: string;
  matchPrefix?: boolean;
  hasDropdown?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: "shop", label: "Store", href: "/shop", matchPrefix: true, hasDropdown: true },
  { id: "build", label: "Custom Builder", href: "/build", hasDropdown: true },
  { id: "care", label: "Care Guide", href: "/care" },
  { id: "about", label: "Craftsmanship", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { itemCount, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Automatically close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Active section identification
  const activeNav = useMemo(() => {
    if (!pathname) return null;
    if (pathname.startsWith("/shop")) return "shop";
    if (pathname === "/build") return "build";
    if (pathname === "/care") return "care";
    if (pathname === "/about") return "about";
    if (pathname === "/contact") return "contact";
    if (pathname.startsWith("/admin")) return "admin";
    return null;
  }, [pathname]);

  const currentIndicator = hoveredNav || activeNav;

  useEffect(() => {
    // Check localStorage admin token
    try {
      const localAdmin = localStorage.getItem("aquaterra_admin_auth");
      if (localAdmin?.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase()) {
        setIsAdmin(true);
      }
    } catch {}

    // Check Firebase user
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.email?.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase()) {
        setIsAdmin(true);
      }
    });

    return () => unsub();
  }, []);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100/90 transition-all">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left Area: Mobile Burger Toggle + Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Mobile Burger Collapse/Expand Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 -ml-2 rounded-xl text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer select-none"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              {/* Logo with Terrarium Glass Vessel Mark */}
              <Link 
                href="/"
                className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer select-none group"
              >
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/logo.png"
                    alt="AquaTerra Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xl tracking-tight text-zinc-900">
                    AquaTerra
                  </span>
                  {/* STUDIO badge visible on desktop, cleanly hidden on mobile per feedback */}
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                    STUDIO
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Center Navigation Links with Smooth Moving Indicator Line */}
            <nav 
              onMouseLeave={() => setHoveredNav(null)}
              className="hidden md:flex items-center space-x-7 text-[14px] font-medium text-zinc-600 relative"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeNav === item.id;
                const isHovered = hoveredNav === item.id;
                const showIndicator = currentIndicator === item.id;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onMouseEnter={() => setHoveredNav(item.id)}
                    className={`py-1.5 flex items-center space-x-1 transition-colors duration-200 cursor-pointer ${
                      isActive || isHovered
                        ? "text-zinc-950 font-semibold"
                        : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    <span className="relative inline-block">
                      {item.label}

                      {/* Smooth sliding active/hover line indicator positioned strictly under the text label */}
                      {showIndicator && (
                        <motion.div
                          layoutId="navbarActiveLine"
                          className="absolute -bottom-2 inset-x-0 h-[2.5px] bg-[#18181b] rounded-full shadow-xs"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                    </span>

                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-colors duration-200 ${
                          isActive || isHovered ? "text-zinc-700" : "text-zinc-400"
                        }`}
                      />
                    )}
                  </Link>
                );
              })}

              {isAdmin && (
                <Link
                  href="/admin"
                  onMouseEnter={() => setHoveredNav("admin")}
                  className={`relative py-1 px-3 rounded-full bg-zinc-900 text-white text-xs font-mono font-bold flex items-center space-x-1 cursor-pointer transition-all ${
                    activeNav === "admin" ? "ring-2 ring-emerald-400" : ""
                  }`}
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Admin Hub</span>
                  {currentIndicator === "admin" && (
                    <motion.div
                      layoutId="navbarActiveLine"
                      className="absolute -bottom-2 inset-x-2 h-[2.5px] bg-[#18181b] rounded-full shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </Link>
              )}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3.5">
              
              {/* Liked Symbol (Wishlist Heart) - Always visible on both mobile & desktop */}
              <button
                onClick={() => setWishlistOpen(true)}
                className="p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950 transition-colors relative cursor-pointer"
                title="Wishlist (Liked Specimens)"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f87171] text-white text-[10px] font-bold flex items-center justify-center font-mono">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Account Symbol - Always visible on both mobile & desktop */}
              <Link
                href="/account"
                className="p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer flex"
                title="Account"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>

              {/* Desktop Cart Button Pill (Mobile cart is housed inside the burger menu) */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="hidden md:flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors cursor-pointer"
                title="View Cart"
              >
                <ShoppingBag className="w-4 h-4 text-zinc-700" />
                <span className="text-xs font-bold font-mono text-zinc-900">{itemCount}</span>
                {cartTotal > 0 && (
                  <span className="text-xs font-mono font-medium text-zinc-500">
                    · ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                )}
              </button>

              {/* Desktop Black Pill CTA with Cursor-Origin Animation */}
              <AnimatedButton
                href="/shop"
                variant="dark"
                className="hidden md:inline-flex px-5 py-2.5 rounded-xl text-[14px] font-semibold"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </AnimatedButton>

            </div>

          </div>

          {/* ======================================================== */}
          {/* MOBILE BURGER EXPANDABLE MENU (2 Items Per Row Grid)    */}
          {/* ======================================================== */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="md:hidden overflow-hidden border-t border-zinc-100 bg-white/98 backdrop-blur-lg"
              >
                <div className="py-4 space-y-3.5">
                  
                  {/* 2 Items Per Row Grid for All Options */}
                  <div className="grid grid-cols-2 gap-2.5">
                    
                    {/* Item 1: Store */}
                    <Link
                      href="/shop"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`p-3.5 rounded-2xl border transition-all active:scale-[0.98] flex flex-col justify-between space-y-2.5 ${
                        activeNav === "shop"
                          ? "bg-zinc-900 text-white border-zinc-900 shadow-xs"
                          : "bg-[#f4f4f6] text-zinc-800 border-zinc-200/70 hover:bg-zinc-200"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-2xs ${
                        activeNav === "shop" ? "bg-zinc-800 text-white" : "bg-white text-zinc-900"
                      }`}>
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Store</p>
                        <p className={`text-[10px] font-mono ${
                          activeNav === "shop" ? "text-zinc-300" : "text-zinc-500"
                        }`}>
                          Living Collection
                        </p>
                      </div>
                    </Link>

                    {/* Item 2: Custom Builder */}
                    <Link
                      href="/build"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`p-3.5 rounded-2xl border transition-all active:scale-[0.98] flex flex-col justify-between space-y-2.5 ${
                        activeNav === "build"
                          ? "bg-zinc-900 text-white border-zinc-900 shadow-xs"
                          : "bg-[#f4f4f6] text-zinc-800 border-zinc-200/70 hover:bg-zinc-200"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-2xs ${
                        activeNav === "build" ? "bg-zinc-800 text-white" : "bg-white text-zinc-900"
                      }`}>
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Custom Builder</p>
                        <p className={`text-[10px] font-mono ${
                          activeNav === "build" ? "text-zinc-300" : "text-zinc-500"
                        }`}>
                          Studio Workshop
                        </p>
                      </div>
                    </Link>

                    {/* Item 3: Care Guide */}
                    <Link
                      href="/care"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`p-3.5 rounded-2xl border transition-all active:scale-[0.98] flex flex-col justify-between space-y-2.5 ${
                        activeNav === "care"
                          ? "bg-zinc-900 text-white border-zinc-900 shadow-xs"
                          : "bg-[#f4f4f6] text-zinc-800 border-zinc-200/70 hover:bg-zinc-200"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-2xs ${
                        activeNav === "care" ? "bg-zinc-800 text-white" : "bg-white text-zinc-900"
                      }`}>
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Care Guide</p>
                        <p className={`text-[10px] font-mono ${
                          activeNav === "care" ? "text-zinc-300" : "text-zinc-500"
                        }`}>
                          Maintenance
                        </p>
                      </div>
                    </Link>

                    {/* Item 4: Craftsmanship */}
                    <Link
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`p-3.5 rounded-2xl border transition-all active:scale-[0.98] flex flex-col justify-between space-y-2.5 ${
                        activeNav === "about"
                          ? "bg-zinc-900 text-white border-zinc-900 shadow-xs"
                          : "bg-[#f4f4f6] text-zinc-800 border-zinc-200/70 hover:bg-zinc-200"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-2xs ${
                        activeNav === "about" ? "bg-zinc-800 text-white" : "bg-white text-zinc-900"
                      }`}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Craftsmanship</p>
                        <p className={`text-[10px] font-mono ${
                          activeNav === "about" ? "text-zinc-300" : "text-zinc-500"
                        }`}>
                          Philosophy
                        </p>
                      </div>
                    </Link>

                    {/* Item 5: Contact */}
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`p-3.5 rounded-2xl border transition-all active:scale-[0.98] flex flex-col justify-between space-y-2.5 ${
                        activeNav === "contact"
                          ? "bg-zinc-900 text-white border-zinc-900 shadow-xs"
                          : "bg-[#f4f4f6] text-zinc-800 border-zinc-200/70 hover:bg-zinc-200"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-2xs ${
                        activeNav === "contact" ? "bg-zinc-800 text-white" : "bg-white text-zinc-900"
                      }`}>
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Contact</p>
                        <p className={`text-[10px] font-mono ${
                          activeNav === "contact" ? "text-zinc-300" : "text-zinc-500"
                        }`}>
                          Studio Support
                        </p>
                      </div>
                    </Link>

                    {/* Item 6: Shopping Cart */}
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="p-3.5 rounded-2xl bg-[#f4f4f6] hover:bg-zinc-200 border border-zinc-200/70 text-zinc-800 transition-all active:scale-[0.98] flex flex-col justify-between space-y-2.5 text-left cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-zinc-900 shadow-2xs relative">
                        <ShoppingBag className="w-4 h-4" />
                        {itemCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#18181b] text-white text-[9px] font-bold flex items-center justify-center font-mono">
                            {itemCount}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold">Cart ({itemCount})</p>
                        <p className="text-[10px] text-zinc-500 font-mono">
                          {cartTotal > 0 ? `₹${cartTotal.toLocaleString("en-IN")}` : "0 items"}
                        </p>
                      </div>
                    </button>

                    {/* Item 7: Admin Hub (if admin) */}
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="col-span-2 p-3.5 rounded-2xl bg-zinc-900 text-white flex items-center justify-between shadow-xs transition-all active:scale-[0.98]"
                      >
                        <div className="flex items-center space-x-2.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-bold">Admin Hub</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-400" />
                      </Link>
                    )}

                  </div>

                  {/* Full-Width Shop Button */}
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-xs transition-colors"
                  >
                    <span>Shop All Living Specimens</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>
    </>
  );
};
