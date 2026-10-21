"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="border-t border-zinc-100 bg-[#fafafa] text-zinc-600 transition-colors">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        
        {/* Top Newsletter & Studio Dispatch Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-[32px] p-8 sm:p-12 border border-zinc-200/60 shadow-xs">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-800">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
              <span>STUDIO DISPATCH</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
              Curated botanical drops & seasonal terrarium releases
            </h3>
            <p className="text-sm text-zinc-500 font-normal leading-relaxed max-w-xl">
              Subscribe for first access to one-of-a-kind moss compositions, rare tropical flora specimens, and biological maintenance advice.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Thank you! You are on our private studio drop list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900 transition-all"
                    required
                  />
                  <AnimatedButton
                    type="submit"
                    variant="dark"
                    className="px-6 py-3 rounded-xl text-sm font-semibold shadow-xs flex-shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </AnimatedButton>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Zero spam. We respect your inbox privacy like we respect closed ecosystems.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pt-4">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group select-none">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="AquaTerra Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl tracking-tight text-zinc-900">AquaTerra</span>
                <span className="text-[11px] font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">STUDIO</span>
              </div>
            </Link>

            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              Artisanal living biotope vessels, closed terrariums, and freshwater micro-landscapes. Handcrafted in our laboratory studio and shipped across India with guaranteed live arrival.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-3 text-xs">
            <p className="font-bold uppercase tracking-wider text-zinc-900">Collections</p>
            <ul className="space-y-2 text-zinc-500">
              <li><Link href="/shop" className="hover:text-zinc-900 transition-colors">Closed Terrariums</Link></li>
              <li><Link href="/shop?category=Aquascape%20Kits" className="hover:text-zinc-900 transition-colors">Aquascape Kits</Link></li>
              <li><Link href="/shop?category=Aquatic%20Plants" className="hover:text-zinc-900 transition-colors">Living Aquatic Plants</Link></li>
              <li><Link href="/shop" className="hover:text-zinc-900 transition-colors">Studio Jars & Cloches</Link></li>
              <li><Link href="/build" className="hover:text-zinc-900 transition-colors">Custom Biotope Builder</Link></li>
            </ul>
          </div>

          {/* Care & Guides */}
          <div className="space-y-3 text-xs">
            <p className="font-bold uppercase tracking-wider text-zinc-900">Care & Studio</p>
            <ul className="space-y-2 text-zinc-500">
              <li><Link href="/care" className="hover:text-zinc-900 transition-colors">Terrarium Care Guide</Link></li>
              <li><Link href="/care#water" className="hover:text-zinc-900 transition-colors">Moisture Cycle Balancing</Link></li>
              <li><Link href="/about" className="hover:text-zinc-900 transition-colors">Craftsmanship & Botany</Link></li>
              <li><Link href="/contact" className="hover:text-zinc-900 transition-colors">Studio Consultations</Link></li>
              <li><Link href="/account" className="hover:text-zinc-900 transition-colors">Order History</Link></li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div className="space-y-3 text-xs">
            <p className="font-bold uppercase tracking-wider text-zinc-900">Confidence</p>
            <ul className="space-y-2 text-zinc-500">
              <li><Link href="/returns" className="hover:text-zinc-900 transition-colors">Live Arrival Guarantee</Link></li>
              <li><Link href="/privacy" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/returns" className="hover:text-zinc-900 transition-colors">Safe Glass Packaging</Link></li>
              <li><Link href="/contact" className="hover:text-zinc-900 transition-colors">Help & FAQ</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© 2026 AquaTerra Living Ecosystems Studio. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
