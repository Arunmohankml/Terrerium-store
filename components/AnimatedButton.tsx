"use client";

import React, { useRef, useState, MouseEvent } from "react";
import Link from "next/link";

export interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: "dark" | "light" | "white" | "outline";
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;
  title?: string;
}

/**
 * AnimatedButton - Smooth Directional Slide Fill System:
 * 
 * 1. Black Button (`variant="dark"`):
 *    - Default: Solid black background (#18181b), black border, pure white text & icons.
 *    - On Hover: A white fill layer smoothly and slowly slides across from the side (left to right),
 *                transitioning the background cleanly.
 *                The stroke transitions to a refined, soft GREY (border-zinc-400), not harsh black.
 *                Text and icons smoothly turn pure black (#09090b).
 * 
 * 2. Transparent Button (`variant="white"` | `"light"` | `"outline"`):
 *    - Default: Transparent background with a refined soft GREY stroke (border-zinc-300).
 *                Text and icons are solid black (#09090b).
 *    - On Hover: A subtle light fill layer (bg-zinc-100) smoothly and slowly slides across from the side (left to right).
 *                The stroke transitions to a clean GREY (border-zinc-400).
 *                Text and icons remain crisp, solid BLACK (#09090b) so they are 100% visible and sharp.
 * 
 * 3. Icon Hover Animations:
 *    - Arrows slide forward (translate-x-1.5)
 *    - Compasses rotate (rotate-45)
 *    - Shopping Bags bounce & tilt (scale-115, -rotate-6)
 *    - Hearts, Sparkles, and all other icons smoothly scale & animate
 */
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = "dark",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  target,
  rel,
  title,
}) => {
  const isDark = variant === "dark";
  const [isHovered, setIsHovered] = useState(false);

  // Base background and border classes:
  // Both buttons use a soft, refined GREY stroke on hover (border-zinc-400), NOT dark black
  const baseClasses = isDark
    ? "bg-[#18181b] border border-[#18181b] hover:border-zinc-400 shadow-xs"
    : "bg-white/60 backdrop-blur-md border border-zinc-300 hover:border-zinc-400 shadow-sm hover:shadow-md";

  // Dynamic text and SVG icon stroke colors:
  // For black buttons: text is white initially, smoothly turns black on hover.
  // For transparent buttons: text and icons are ALWAYS BLACK (never white on white/transparent).
  const textClasses = isDark
    ? isHovered
      ? "text-zinc-950 [&_svg]:stroke-zinc-950"
      : "text-white [&_svg]:stroke-white"
    : "text-zinc-950 [&_svg]:stroke-zinc-950";

  // Group hover fallback classes for instant responsiveness
  const groupHoverClasses = isDark
    ? "group-hover:text-zinc-950 group-hover:[&_svg]:stroke-zinc-950"
    : "group-hover:text-zinc-950 group-hover:[&_svg]:stroke-zinc-950";

  // Global icon hover animations
  const iconAnimationClasses = `
    [&_svg]:transition-all [&_svg]:duration-300
    group-hover:[&_svg]:scale-110
    group-hover:[&_.lucide-arrow-right]:translate-x-1.5
    group-hover:[&_.lucide-arrow-left]:-translate-x-1.5
    group-hover:[&_.lucide-compass]:rotate-45
    group-hover:[&_.lucide-shopping-bag]:-rotate-6
    group-hover:[&_.lucide-shopping-bag]:scale-115
    group-hover:[&_.lucide-heart]:scale-120
    group-hover:[&_.lucide-sparkles]:scale-115
    group-hover:[&_.lucide-sparkles]:rotate-12
    group-hover:[&_.lucide-rotate-ccw]:-rotate-90
    group-hover:[&_.lucide-check]:scale-115
    group-hover:[&_.lucide-user]:scale-115
  `;

  const content = (
    <>
      {/* Smooth Directional Fill Slide Layer (Slowly sweeps across from left to right) */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-px z-0 will-change-transform ${
          isHovered
            ? "translate-x-0 opacity-100"
            : "-translate-x-[calc(100%+24px)] opacity-0"
        } ${isDark ? "bg-white" : "bg-zinc-100/90"}`}
        style={{
          transitionProperty: "transform, opacity",
          transitionDuration: isHovered ? "500ms, 150ms" : "500ms, 300ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1), ease",
        }}
      />

      {/* Button Content with smooth text and icon transitions */}
      <span
        className={`relative z-10 flex items-center justify-center space-x-2 transition-colors duration-300 [&_svg]:transition-colors [&_svg]:duration-300 ${textClasses} ${groupHoverClasses} ${iconAnimationClasses}`}
        style={{
          color: isDark ? (isHovered ? "#09090b" : "#ffffff") : "#09090b",
        }}
      >
        {children}
      </span>
    </>
  );

  const sharedClasses = `group relative overflow-hidden isolate transform-gpu inline-flex items-center justify-center font-medium transition-all duration-300 select-none cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${baseClasses} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick as any}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={sharedClasses}
        target={target}
        rel={rel}
        title={title}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={sharedClasses}
      title={title}
    >
      {content}
    </button>
  );
};
