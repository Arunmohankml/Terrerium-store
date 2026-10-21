"use client";

import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { BentoFeatures } from "@/components/BentoFeatures";
import { FeaturedProductsGrid } from "@/components/FeaturedProductsGrid";
import { PastelAuraSection } from "@/components/PastelAuraSection";
import { DarkTelemetrySection } from "@/components/DarkTelemetrySection";
import { StudioReviewsSection } from "@/components/StudioReviewsSection";

export default function Home() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Hero Section (Matches AnonVote Hero) */}
      <HeroSection />

      {/* 2. 3-Card Bento Grid (Matches AnonVote 3-Card Bento) */}
      <BentoFeatures />

      {/* 3. Featured Store Collection */}
      <FeaturedProductsGrid />

      {/* 4. Split Pastel Aura Canvas Matcher (Matches AnonVote Pastel Aura Mesh) */}
      <PastelAuraSection />

      {/* 5. Signature Dark Telemetry Section (Matches AnonVote Dark Bento Section) */}
      <DarkTelemetrySection />

      {/* 6. Studio Reviews Bento Grid */}
      <StudioReviewsSection />
    </div>
  );
}
