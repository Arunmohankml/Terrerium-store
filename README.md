# Aquaterra — Premium Terrarium & Aquascaping Store

A complete, production-ready homepage built with Next.js (App Router) + TypeScript,
Tailwind CSS, GSAP/ScrollTrigger (sticky water-rise hero), and Framer Motion
(entrance/hover micro-interactions).

## 1. Install

Requires Node 18+.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Production build:

```bash
npm run build
npm start
```

## 2. Folder structure

```
aquaterra/
├── app/
│   ├── layout.tsx        # Fonts (Manrope + DM Serif Display), metadata
│   ├── page.tsx           # Assembles all homepage sections in order
│   └── globals.css        # Design tokens, liquid-glass system, keyframes
├── components/
│   ├── Navbar.tsx
│   ├── StickyWaterHero.tsx    # ⭐ Main GSAP ScrollTrigger sticky water animation
│   ├── AquariumScene.tsx      # Layered hero aquarium visual + mouse parallax
│   ├── WaterSurface.tsx       # Wave/caustics/foam layer used by the hero
│   ├── BubbleField.tsx        # Reusable capped bubble particle field
│   ├── CategorySection.tsx
│   ├── BuildEcosystemSection.tsx
│   ├── FeaturedProducts.tsx
│   ├── PlantSpotlight.tsx
│   ├── FishCollection.tsx
│   ├── BenefitsSection.tsx
│   ├── InspirationGallery.tsx
│   ├── CareSupport.tsx
│   ├── Newsletter.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── GlassCard.tsx
│       ├── SectionHeading.tsx
│       ├── ProductCard.tsx
│       └── ImagePlaceholder.tsx   # Falls back to a gradient if an image is missing
├── lib/
│   └── assets.ts          # ⭐ Central image-path config + product data
├── public/
│   └── images/             # Drop replacement images here (see list below)
├── tailwind.config.ts      # Custom aquatic/glass palette, fonts, keyframes
├── package.json
└── tsconfig.json
```

## 3. Required image files

Add these to `public/images/` (any raster format works, but WebP/PNG as named
is recommended — PNG for anything that needs transparency). If a file is
missing, the site automatically shows a themed gradient placeholder instead
of a broken image, so the site is fully usable before you add real photos.

```
/images/hero-aquarium.webp
/images/hero-fish-1.png          (transparent PNG)
/images/hero-fish-2.png          (transparent PNG)
/images/hero-plants.png          (transparent PNG)
/images/hero-driftwood.png       (transparent PNG)
/images/hero-substrate.png       (transparent PNG)
/images/terrarium-category.webp
/images/aquatic-plants-category.webp
/images/fish-category.webp
/images/aquascaping-category.webp
/images/build-environment.webp
/images/build-inhabitants.webp
/images/build-result.webp
/images/product-1.webp           (Planted Nano Aquarium)
/images/product-2.webp           (Moss Forest Terrarium)
/images/product-3.webp           (Betta Habitat Kit)
/images/product-4.webp           (Beginner Aquascaping Bundle)
/images/product-5.webp           (Rare Aquatic Plant Collection)
/images/product-6.webp           (Shrimp Ecosystem)
/images/aquatic-plant-detail.webp
/images/fish-collection.webp
/images/gallery-1.webp … /images/gallery-6.webp
/images/seabed-silhouette.png    (optional, footer uses an SVG silhouette by default)
/images/logo-mark.svg            (optional, navbar uses an inline SVG mark by default)
```

All paths are declared once in `lib/assets.ts` (`ASSETS` object) — update
paths there, not inside components.

## 4. The sticky water-rise hero, explained

See the full comment block at the top of `components/StickyWaterHero.tsx`.
Summary:

- An outer `<section>` (`230vh` mobile → `320vh` desktop) provides scroll
  distance.
- GSAP's `ScrollTrigger.create({ trigger: outer, start: "top top", end:
  "bottom bottom", pin: heroInner, scrub: 1 })` pins the hero for that whole
  distance and ties progress directly to scroll position (no lag, no extra
  smoothing).
- `onUpdate` reads `self.progress` (0 → 1) once per scroll tick and applies
  it directly via `gsap.set(...)` to a few refs: the water group's
  `translateY`, a deep-background overlay's opacity, a blue "submersion"
  tint's opacity, light-ray opacity, and particle opacity. All transform/
  opacity — no layout thrashing, no React state updates on scroll.
- Because `pin: true` is used, GSAP handles the pin/unpin transition itself;
  there is no manual "unpin" code, so there's no jump or gap when the next
  section (`CategorySection`) takes over right as the water reaches the top.
- `prefers-reduced-motion` skips the pin/scrub entirely and renders a
  static, gently-submerged hero instead.

## 5. Depth progression

Each section below the hero uses its own background gradient, moving from
turquoise → ocean blue → deep navy, with matched gradient stops at section
boundaries so the transition reads as continuous rather than a hard cut.

## 6. Performance notes

- Bubble/particle counts are capped at 25 and are generated once via
  `useMemo`, not regenerated on re-render.
- The hero's aquarium image is loaded eagerly (`priority`); every other
  image lazy-loads.
- Scroll-linked work in the hero is done via direct `gsap.set` calls on
  refs — it never touches React state, so scrolling doesn't trigger
  re-renders.
- `ScrollTrigger` instances are created inside a `gsap.context()` and
  reverted in the `useLayoutEffect` cleanup function.
- Mobile automatically gets a shorter scroll distance and a slightly faster
  scrub value; blur/parallax intensity is naturally reduced by the smaller
  viewport-relative offsets used throughout.

## 7. Packages used

```bash
npm install next react react-dom gsap framer-motion
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer eslint eslint-config-next
```

(All already listed in `package.json` — `npm install` is all you need.)
