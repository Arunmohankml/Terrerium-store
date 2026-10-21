"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, Compass } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playbackRate = 0.85;

    const startPlayback = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback for strict browser autoplay policies
        });
      }
    };

    startPlayback();
    video.addEventListener("canplay", startPlayback);
    video.addEventListener("loadedmetadata", startPlayback);

    return () => {
      video.removeEventListener("canplay", startPlayback);
      video.removeEventListener("loadedmetadata", startPlayback);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden h-[calc(100vh-5rem)] min-h-[560px] max-h-[880px] flex flex-col justify-center items-center py-6 sm:py-8 px-4">
      
      {/* ============================================================ */}
      {/* BACKGROUND VIDEO: Ultra-Smooth Terrarium Crafting Video      */}
      {/* ============================================================ */}
      <div 
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" 
        aria-hidden="true"
      >
        {/* Hardware-accelerated Video Layer with Feathered CSS Mask */}
        <div 
          className="absolute inset-0 opacity-[0.38] sm:opacity-[0.44] transition-opacity duration-700 ease-out"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 10%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.9) 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 10%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.9) 85%, transparent 100%)",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            className="w-full h-full object-cover object-center transform-gpu will-change-transform scale-[1.03]"
          >
            <source src="/videos/makingvideo1.mp4" type="video/mp4" />
            <source src="/videos/makingvideo2.mp4" type="video/mp4" />
            <source src="/images/herohomepage.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Top Smooth Gradient Fade (Seamless into White Navbar) */}
        <div className="absolute top-0 inset-x-0 h-20 sm:h-28 bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none z-10" />

        {/* Bottom Smooth Gradient Fade (Seamless into White Content Canvas) */}
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
      </div>

      {/* ============================================================ */}
      {/* FOREGROUND HERO CONTENT (Fits Fully In Viewport)            */}
      {/* ============================================================ */}
      <div className="relative z-20 max-w-4xl mx-auto text-center space-y-5 sm:space-y-6 md:space-y-7">
        
        {/* Top Pill Tag (AnonVote Signature Style) */}
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-50/90 backdrop-blur-xs border border-zinc-200/80 text-[12px] sm:text-[13px] font-medium text-zinc-600 shadow-2xs">
            <span className="w-2 h-2 rounded-xs bg-[#f87171]" />
            <span className="tracking-wide uppercase font-semibold text-xs">BIOPHILIC LIVING ECOSYSTEMS</span>
          </div>
        </div>

        {/* Hero Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-950 leading-[1.08] max-w-3xl mx-auto drop-shadow-xs">
          A little piece of nature, for your space.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-500 font-normal max-w-2xl mx-auto leading-relaxed">
          Handmade terrariums, moss gardens and little aquatic worlds. Made with care to bring a bit of green into your everyday life.
        </p>

        {/* Quick CTAs with Cursor-Origin Expanding Animation */}
        <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <AnimatedButton
            href="/shop"
            variant="dark"
            className="px-7 sm:px-8 py-3.5 rounded-xl text-sm sm:text-[15px] font-medium shadow-sm"
          >
            <span>Explore Living Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </AnimatedButton>

          <AnimatedButton
            href="/build"
            variant="light"
            className="px-6 sm:px-7 py-3.5 rounded-xl text-sm sm:text-[15px] font-medium shadow-sm hover:shadow-md"
          >
            <Compass className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            <span>Launch Custom Studio Builder</span>
          </AnimatedButton>
        </div>

      </div>

    </section>
  );
};
