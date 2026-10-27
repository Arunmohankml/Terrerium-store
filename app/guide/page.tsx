"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  X,
  Sparkles,
  Droplets,
  SunMedium,
  Fish,
  Leaf,
  ShieldCheck,
  Wrench,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { TERRARIUM_IMAGES, resolveImageAsset } from "@/lib/assets";

interface GuideArticle {
  id: string;
  title: string;
  subtitle: string;
  category: "Terrariums" | "Fish & Aquascaping" | "Maintenance" | "Botanicals";
  readTime: string;
  image: string;
  featured?: boolean;
  excerpt: string;
  overview: string;
  keyTakeaways: string[];
  steps: {
    num: string;
    heading: string;
    detail: string;
  }[];
  proTip: string;
  dos: string[];
  donts: string[];
}

const GUIDES_DATA: GuideArticle[] = [
  {
    id: "closed-terrarium-mastery",
    title: "The Complete Closed Terrarium Guide: Biological Equilibrium in Sealed Glass",
    subtitle: "Balancing the 24-hour moisture cycle, false drainage bottoms, and self-sustaining micro-climates",
    category: "Terrariums",
    readTime: "6 min read",
    image: TERRARIUM_IMAGES.bonsaiDome,
    featured: true,
    excerpt:
      "Everything you need to master sealed glass ecosystems: false drainage bottoms, daily condensation cycles, and keeping closed jars alive for decades with near-zero intervention.",
    overview:
      "A closed terrarium is a functioning miniature replica of the Earth's biosphere. When properly constructed with the right drainage strata, moss species, and beneficial micro-cleaners, water evaporates, condenses on the glass sides, and rains back down into the soil in an endless, self-sustaining loop.",
    keyTakeaways: [
      "Sealed terrariums only require misting once every 3 to 6 months.",
      "Morning condensation is healthy; all-day heavy fog indicates excessive water.",
      "Bright indirect light is essential; harsh afternoon direct sun magnifies glass and overheats plants.",
      "Beneficial springtails prevent mold and cycle decaying organic leaf matter.",
    ],
    steps: [
      {
        num: "01",
        heading: "The 4-Layer Soil Architecture",
        detail:
          "Never place potting soil directly on the glass bottom. Start with a 1-inch drainage layer of porous clay LECA stones or pea gravel. Top with a layer of activated horticultural charcoal to sweeten the air and filter toxins, place a fine mesh barrier, and finally add tropical terrarium soil rich in peat and bark.",
      },
      {
        num: "02",
        heading: "Reading the 24-Hour Condensation Cycle",
        detail:
          "In the early morning, ambient temperature drops and creates a delicate fog of moisture on the upper glass. As the room warms up, this moisture should roll down the sides or clear by mid-afternoon. If the glass stays wet and opaque all day, remove the lid for 2 to 3 hours to vent excess humidity.",
      },
      {
        num: "03",
        heading: "Illumination Rules: Bright, Indirect Light",
        detail:
          "Position your vessel 3 to 6 feet away from an east or north-facing window. Morning sun is gentle, but direct afternoon rays act like a magnifying glass, rapidly cooking the delicate mosses and ferns inside the glass dome.",
      },
      {
        num: "04",
        heading: "Pruning and Sanitation",
        detail:
          "When fittonia leaves or ficus vines reach the glass boundaries, trim them with sterile curved scissors. Promptly extract any yellowing foliage with long tweezers to prevent fungal buildup.",
      },
    ],
    proTip:
      "Always use pure distilled, reverse-osmosis (RO), or clean rainwater when misting. Tap water contains calcium, chloramines, and minerals that leave white crusty rings on your glass and burn moss tips.",
    dos: [
      "Place 3–6 feet away from bright windows",
      "Vent the lid for 2 hours if glass is fogged all day",
      "Trim foliage before it presses hard against glass",
      "Use distilled or reverse osmosis water exclusively",
    ],
    donts: [
      "Never place in direct scorching afternoon sun",
      "Never pour tap water directly into the jar",
      "Never spray chemical glass cleaners inside the jar",
      "Avoid opening the lid daily; it disrupts the microclimate",
    ],
  },
  {
    id: "freshwater-nano-fish-shrimp",
    title: "Freshwater Fish & Dwarf Shrimp: Thriving in Tabletop Nano Biotopes",
    subtitle: "Aquascaping with peaceful micro-fauna, nitrogen stabilization, and natural biological filtration",
    category: "Fish & Aquascaping",
    readTime: "7 min read",
    image: TERRARIUM_IMAGES.woodlandTank,
    featured: false,
    excerpt:
      "A complete handbook on pairing live plants with peaceful nano species (Bettas, Neocaridina shrimp, Otocinclus), cycling the biological filter, and maintaining pristine water parameters.",
    overview:
      "Tabletop planted aquariums bring tranquil underwater landscapes directly into your workspace. Unlike sterile fishbowls, modern nano biotopes leverage lush live stem plants, porous volcanic rock, and beneficial nitrifying bacteria to maintain pure water balance.",
    keyTakeaways: [
      "Complete the 3-week nitrogen cycle before adding sensitive dwarf shrimp or fish.",
      "Neocaridina cherry shrimp and Nerite snails are nature's most diligent algae clean-up crew.",
      "Never perform 100% water changes; gentle 15–20% weekly siphons protect bio-balance.",
      "Overfeeding is the #1 cause of water cloudiness and ammonia spikes.",
    ],
    steps: [
      {
        num: "01",
        heading: "Establishing the Nitrogen Cycle",
        detail:
          "Before introducing livestock, run the planted vessel for 14 to 21 days with active bio-filter media. Beneficial bacteria colonize the gravel and filter sponges, converting toxic ammonia into harmless nitrates that your aquatic plants eagerly consume.",
      },
      {
        num: "02",
        heading: "Selecting Compatible Nano Inhabitants",
        detail:
          "For 15 to 30-liter tabletop tanks, choose peaceful nano specimens: a single show Betta splendens, a colorful troupe of Neocaridina dwarf shrimp (Cherry, Blue Dream), 3–4 micro Chili Rasboras, or Zebra Nerite snails that maintain immaculate glass.",
      },
      {
        num: "03",
        heading: "The Gentle 20% Water Refresh",
        detail:
          "Once a week, siphon out 15% to 20% of the water from the bottom substrate. Treat fresh room-temperature water with aquarium water conditioner to neutralize heavy metals and chlorine before pouring it back in gently over a small saucer.",
      },
      {
        num: "04",
        heading: "Feeding Discipline",
        detail:
          "Feed only as much micro-pellet or freeze-dried food as your fish can consume within 90 seconds. Dwarf shrimp thrive primarily on natural biofilm growing on driftwood, requiring only a tiny wafer twice weekly.",
      },
    ],
    proTip:
      "Include fast-growing stem plants like Hornwort, Rotala, or Java Fern. Aquatic plants absorb surplus nitrates and pump continuous dissolved oxygen directly into the water column during daylight hours.",
    dos: [
      "Test water parameters weekly (pH 6.8–7.4, 0 Ammonia)",
      "Acclimate new shrimp using the slow drip method",
      "Feed small pinches that vanish in 90 seconds",
      "Keep lighting on a 7–8 hour timer to curb algae",
    ],
    donts: [
      "Never empty the entire tank or wash gravel with soap",
      "Never introduce livestock into an uncycled aquarium",
      "Never expose tank to drafty air conditioners or direct sun",
      "Avoid overstocking; allow 3–4 liters per tiny nano fish",
    ],
  },
  {
    id: "crystal-clear-glass-maintenance",
    title: "Crystal Clear Glass & Bio-Hygiene: The Maintenance Masterclass",
    subtitle: "Safe techniques to eliminate mineral deposits, prevent algae, and polish curved optical glass",
    category: "Maintenance",
    readTime: "5 min read",
    image: TERRARIUM_IMAGES.sunlightBowl,
    featured: false,
    excerpt:
      "Why commercial glass sprays must never touch living ecosystems, how to dissolve stubborn hard-water mineral lines with vinegar, and tools that keep glassware gleaming.",
    overview:
      "High-clarity lab glass provides the magical window into your living world. However, dust, fingerprints, and hard water evaporation lines can dull the view. Using the proper studio tools ensures your glassware stays crystal clear without harming delicate flora.",
    keyTakeaways: [
      "Commercial glass sprays (Windex/ammonia) release airborne toxins fatal to moss and fish.",
      "Diluted white vinegar (1:1 with distilled water) instantly dissolves hard water mineral lines.",
      "Use curved long-reach cotton swabs and magnetic micro-scrubbers for inner glass walls.",
      "Wipe exterior glass with a dry lint-free microfiber cloth once a week.",
    ],
    steps: [
      {
        num: "01",
        heading: "Exterior Glass Cleaning Protocol",
        detail:
          "Dampen a high-density microfiber cloth with distilled water. Gently wipe the exterior curved surface in circular motions. Buff dry immediately with a clean dry cloth to prevent streaks.",
      },
      {
        num: "02",
        heading: "Removing Interior Hard-Water Rings",
        detail:
          "If mineral crust forms along the waterline, dip a long medical cotton applicator in pure white vinegar. Carefully trace the mineral deposit line inside the glass, avoiding direct contact with the moss or plant stems. The acetic acid dissolves the calcium in seconds.",
      },
      {
        num: "03",
        heading: "Controlling Algae Without Scrubbing",
        detail:
          "Algae is simply excess light meeting excess nutrients. If you notice green film on the glass, reduce your illumination time by 1 hour daily and introduce 1–2 Nerite snails or a colony of springtails to naturally graze the glass clean.",
      },
      {
        num: "04",
        heading: "Essential Tool Curation",
        detail:
          "Keep three instruments in your studio drawer: a 25cm angled surgical tweezer, a pair of curved bonsai scissors, and a flexible silicone wiper blade designed specifically for spherical glass vessels.",
      },
    ],
    proTip:
      "When misting or topping off water, aim the nozzle at the center of the moss, not directly against the inner glass walls. This keeps your observation glass pristine for months without water spots.",
    dos: [
      "Buff exterior glass with clean dry microfiber",
      "Spot-treat mineral deposits with cotton swabs and vinegar",
      "Reduce photo-period if green micro-algae appears",
      "Rinse tools in warm water and dry before storage",
    ],
    donts: [
      "Never spray chemical aerosols or household cleaners nearby",
      "Never use abrasive rough scouring pads on acrylic or glass",
      "Never wipe interior walls with dirty kitchen paper towels",
      "Don't leave trimming clippings inside the vessel to rot",
    ],
  },
  {
    id: "moss-botanical-varieties",
    title: "Cushion Moss, Java Moss & Rare Epiphytes: Botanical Handbook",
    subtitle: "Cultivating emerald bryophyte carpets, humidity preferences, and choosing companion flora",
    category: "Botanicals",
    readTime: "5 min read",
    image: TERRARIUM_IMAGES.greenHaze,
    featured: false,
    excerpt:
      "Detailed care breakdowns for Cushion Moss (Leucobryum glaucum), Java Moss, and Sheet Moss, plus pairing with vibrant tropical Fittonias and miniature ferns.",
    overview:
      "Mosses are ancient, rootless bryophytes that absorb hydration and nutrients directly through their microscopic leaves. They form the velvety emerald foundation of every artisanal AquaTerra creation.",
    keyTakeaways: [
      "Mosses possess rhizoids instead of roots, anchoring directly onto stone and bark.",
      "Chlorine and high TDS tap water burn moss tips into an irreversible pale yellow.",
      "Cushion moss loves high humidity with periodic fresh airflow; avoid waterlogging.",
      "Fittonias (Nerve Plants) act as the perfect biological humidity indicators.",
    ],
    steps: [
      {
        num: "01",
        heading: "Selecting the Right Bryophyte Species",
        detail:
          "For terrarium mounds, Cushion Moss (Leucobryum glaucum) provides plush architectural pillows. For aquatic stones and waterfalls, Java Moss (Taxiphyllum barbieri) thrives completely submerged or in splash zones.",
      },
      {
        num: "02",
        heading: "Water Purity Requirements",
        detail:
          "Tap water minerals accumulate on moss leaflets like scale, causing browning within weeks. Always hydrate using distilled or rainwater to preserve vivid lime-green coloration.",
      },
      {
        num: "03",
        heading: "Reviving Thirsty Moss",
        detail:
          "If moss feels dry or crispy to the touch, do not drown it in puddles. Instead, apply 3 to 4 fine mist sprays across the canopy, seal the lid, and observe the leaflets plump back up within 24 hours.",
      },
      {
        num: "04",
        heading: "Companion Tropical Flora",
        detail:
          "Pair moss with dwarf tropical companions that share identical moisture needs: miniature Fittonias (Pink Wave, Forest Green), Dwarf Boston Ferns, Peperomia prostrata (String of Turtles), and Anubias nana on wood crevices.",
      },
    ],
    proTip:
      "If moss turns dark brown or black at the very bottom, it indicates the substrate is waterlogged. Tilt the vessel slightly and siphon out standing water from the false bottom.",
    dos: [
      "Keep substrate consistently cool and barely moist",
      "Use pure distilled or clean collected rainwater",
      "Snip off brown tips to stimulate fresh green fronds",
      "Provide 8–10 hours of soft ambient LED or indirect light",
    ],
    donts: [
      "Never let moss sit in stagnant submerged mud",
      "Never expose delicate mosses to hot direct heating vents",
      "Never fertilize moss with heavy commercial chemical plant foods",
      "Avoid packing moss tightly; allow air gaps around cushions",
    ],
  },
  {
    id: "miniature-hardscaping-composition",
    title: "Art of Miniature Hardscaping: Dragon Stone, River Rock & Driftwood",
    subtitle: "The golden ratio in micro vessels, stone preparation, and creating dramatic depth",
    category: "Fish & Aquascaping",
    readTime: "5 min read",
    image: TERRARIUM_IMAGES.mountainBowl,
    featured: false,
    excerpt:
      "Crafting dramatic geological focal points: cleaning clay pores in Dragon Stone, boiling driftwood to control tannins, and establishing sloping perspective.",
    overview:
      "Hardscape forms the permanent skeleton of any enduring biotope. The arrangement of ancient stone ridges and weathered driftwood branches dictates water flow, shadow play, and root anchorage.",
    keyTakeaways: [
      "Slope substrate from low in the front (1 inch) to high in the back (3 inches) for forced depth.",
      "Dragon Stone (Ohko) is inert and does not alter water pH or hardness.",
      "Boil new driftwood for 60 minutes to sterilize and release dark wood tannins.",
      "Use plant cyanoacrylate gel to anchor live mosses permanently onto rock faces.",
    ],
    steps: [
      {
        num: "01",
        heading: "The Golden Ratio Focal Point",
        detail:
          "Avoid centering your largest stone directly in the middle of the glass. Position your dominant mountain stone roughly 1/3 from the left or right edge. This asymmetrical composition creates natural harmony.",
      },
      {
        num: "02",
        heading: "Preparing Natural Stone",
        detail:
          "Dragon Stone features deep cavernous clay pockets. Before placement, scrub thoroughly with an old toothbrush under warm running water to flush out loose silt that could cloud your water.",
      },
      {
        num: "03",
        heading: "Wood Preparation & Tannin Management",
        detail:
          "Natural Spider Wood and Malaysian Driftwood release beneficial humic tannins that lightly tint water golden. If crystal-clear water is desired, boil the wood in a large pot for 1 hour before styling.",
      },
      {
        num: "04",
        heading: "Fixing Flora to Hardscape",
        detail:
          "Apply a pin-sized dot of plant-safe cyanoacrylate gel to the back of an Anubias rhizome or moss tuft. Press gently against the rock crevice for 15 seconds. It cures instantly under moisture.",
      },
    ],
    proTip:
      "Always take a photo with your phone and view it in black-and-white. If the stones show high contrast between highlights and shadows, your composition will look stunning once planted.",
    dos: [
      "Create high back-slopes to add three-dimensional depth",
      "Soak driftwood until fully waterlogged so it sinks naturally",
      "Use inert stones (Dragon stone, Lava rock, Slate)",
      "Leave open negative space for light and water flow",
    ],
    donts: [
      "Never use limestone or marble; they leach calcium and alter pH",
      "Never place sharp stone edges pressing against thin glass walls",
      "Avoid stacking heavy rocks without a stable base foundation",
      "Don't cover 100% of the hardscape; leave dramatic stone visible",
    ],
  },
  {
    id: "springtails-bio-cleaners",
    title: "Beneficial Micro-Cleaners: Springtails & The Living Cleanup Crew",
    subtitle: "Harnessing nature's microscopic janitors to eat mold, aerate soil, and cycle nutrients",
    category: "Terrariums",
    readTime: "4 min read",
    image: TERRARIUM_IMAGES.jarLandscape,
    featured: false,
    excerpt:
      "Why every closed jar needs Folsomia candida springtails. How these tiny harmless organisms eliminate white mold, aerate soil, and eliminate stale odors.",
    overview:
      "Springtails (Collembola) are minuscule (1mm), wingless organisms that inhabit healthy forest floors worldwide. In a sealed terrarium, they are the unsung heroes that prevent mold outbreaks and sustain soil vitality.",
    keyTakeaways: [
      "Springtails eat mold, decaying plant tissues, and fungal spores; they never harm live plants.",
      "They reproduce naturally inside the vessel, matching their population to available waste.",
      "If a fallen leaf begins to show white fuzz, springtails devour it within 48 to 72 hours.",
      "They require continuous high humidity; keeping the lid sealed preserves their habitat.",
    ],
    steps: [
      {
        num: "01",
        heading: "How Springtails Protect Your Vessel",
        detail:
          "Whenever high humidity meets stagnant organic matter, fungal mold spores germinate. Springtails perceive fungal hyphae as their primary food source, continually grazing the moss and glass to keep it spotless.",
      },
      {
        num: "02",
        heading: "Identifying Healthy Colony Activity",
        detail:
          "Look closely at the soil boundary or the surface of the charcoal layer. You will spot tiny white specks hopping playfully. When disturbed, their spring-like furcula launches them a few millimeters away.",
      },
      {
        num: "03",
        heading: "Colony Maintenance",
        detail:
          "Under ordinary conditions, springtails require no supplemental feeding. The natural shed of older moss leaves provides abundant sustenance. If you ever notice the colony dwindling, drop a single grain of uncooked white rice on the soil as a feast.",
      },
      {
        num: "04",
        heading: "Safety for Humans and Pets",
        detail:
          "Springtails cannot bite, sting, or survive outside the high humidity of the terrarium jar. If one ever escapes, it desiccates and vanishes within minutes on household carpet or drywall.",
      },
    ],
    proTip:
      "Every single closed terrarium shipped from AquaTerra Studio arrives pre-seeded with an active, mature colony of 30+ springtails already acclimated to the soil layer.",
    dos: [
      "Maintain high humidity so the micro-cleaners flourish",
      "Allow them 48 hours to clear natural white mold patches",
      "Ensure charcoal layer remains moist at all times",
      "Welcome them as an indicator of supreme biological health",
    ],
    donts: [
      "Never spray insect repellents or chemical bug killers nearby",
      "Never introduce wild garden soil containing pests or parasites",
      "Never dump synthetic chemical fertilizers into the jar",
      "Avoid letting the substrate dry out completely",
    ],
  },
];

const CATEGORIES = ["All Guides", "Terrariums", "Fish & Aquascaping", "Maintenance", "Botanicals"] as const;

const DIAGNOSTIC_MATRIX = [
  {
    signal: "Glass is fogged with dense droplets all day long",
    cause: "Excess moisture locked in false bottom",
    fix: "Wipe interior glass with lint-free paper and leave cork open for 2–3 hours.",
  },
  {
    signal: "Cushion moss turns pale or crisp to the touch",
    cause: "Insufficient humidity in foliage canopy",
    fix: "Apply 2–3 fine mist sprays of distilled water, seal lid, and monitor next morning.",
  },
  {
    signal: "Fuzzy white mold appears on decaying twig",
    cause: "Natural breakdown of organic matter",
    fix: "Allow the springtail colony 48 hours to feast, or pluck the rotting twig with tweezers.",
  },
  {
    signal: "Aquarium water appears cloudy or milky white",
    cause: "Bacterial bloom during new tank cycling",
    fix: "Do not panic or change 100% water; reduce feeding and wait 3–4 days for bacteria to settle.",
  },
  {
    signal: "Green micro-algae film coats the glass wall",
    cause: "Excess light exposure (>8 hours or direct sun)",
    fix: "Move vessel away from window, reduce photoperiod to 6 hours, and wipe with magnetic blade.",
  },
];

export default function GuidePage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Guides");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGuide, setSelectedGuide] = useState<GuideArticle | null>(null);

  // Filtered guides based on category and search query
  const filteredGuides = useMemo(() => {
    return GUIDES_DATA.filter((guide) => {
      const matchesCategory =
        activeCategory === "All Guides" || guide.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Featured Hero Guide (first featured or first result)
  const heroGuide = useMemo(() => {
    return GUIDES_DATA.find((g) => g.featured) || GUIDES_DATA[0];
  }, []);

  return (
    <div className="min-h-screen bg-white">
      
      {/* ======================================================== */}
      {/* 1. TOP HEADER BANNER (Light, Clean AnonVote Style)       */}
      {/* ======================================================== */}
      <section className="border-b border-zinc-100/90 py-12 sm:py-16 bg-[#fafafa]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>STUDIO FIELD GUIDES & MANUALS</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-semibold text-zinc-950 tracking-tight leading-tight">
              Botanical Care, Fish Biotopes & Studio Manuals
            </h1>
            
            <p className="text-sm sm:text-base text-zinc-500 font-normal leading-relaxed">
              Step-by-step masterclasses on balancing closed terrarium humidity, cultivating tabletop freshwater aquascapes, caring for micro-cleaners, and glass cleaning protocols.
            </p>
          </div>

          {/* Search Bar & Stats Pill */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides, moss tips, fish care, cleaning..."
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-zinc-200/80 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Total Manuals Counter */}
            <div className="flex items-center space-x-2 text-xs font-mono text-zinc-500">
              <span className="px-2.5 py-1 rounded-full bg-white border border-zinc-200/80 font-bold text-zinc-900 shadow-2xs">
                {GUIDES_DATA.length} Manuals
              </span>
              <span>Available in Studio Archive</span>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. CATEGORY FILTER PILLS SWITCHER                        */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#f4f4f6] p-1.5 rounded-full border border-zinc-200/80 inline-flex items-center gap-1 overflow-x-auto max-w-full scrollbar-none shadow-2xs">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === "All Guides"
                ? GUIDES_DATA.length
                : GUIDES_DATA.filter((g) => g.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="relative px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition-colors cursor-pointer select-none whitespace-nowrap flex items-center space-x-1.5"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGuidePill"
                    className="absolute inset-0 bg-[#18181b] rounded-full shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    isActive ? "text-white font-medium" : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  {cat}
                </span>
                <span
                  className={`relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-zinc-800 text-zinc-300" : "bg-zinc-200/80 text-zinc-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. FEATURED SPOTLIGHT HERO GUIDE (When viewing All)      */}
      {/* ======================================================== */}
      {activeCategory === "All Guides" && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-[#f4f4f6] rounded-[32px] p-6 sm:p-10 border border-zinc-200/70 shadow-xs hover:border-zinc-300 transition-all duration-300 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Image with Rounded Aspect */}
              <div className="lg:col-span-5 relative aspect-[4/3] rounded-[24px] overflow-hidden bg-white border border-zinc-200/60 shadow-2xs">
                <Image
                  src={resolveImageAsset(heroGuide.image)}
                  alt={heroGuide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-zinc-900 text-[10px] font-bold font-mono uppercase tracking-wider border border-zinc-200/60 shadow-2xs flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-[#f87171]" />
                    <span>FEATURED MASTERCLASS</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Guide Info */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center space-x-3 text-xs text-zinc-500 font-mono">
                  <span className="px-2.5 py-0.5 rounded-md bg-white border border-zinc-200 font-bold text-zinc-800">
                    {heroGuide.category}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{heroGuide.readTime}</span>
                  </span>
                  <span>·</span>
                  <span className="text-emerald-700 font-semibold font-sans">Lab Tested</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight leading-snug">
                  {heroGuide.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {heroGuide.excerpt}
                </p>

                {/* Key Highlights Checklist */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {heroGuide.keyTakeaways.slice(0, 4).map((takeaway, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-zinc-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2 leading-tight">{takeaway}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-4 flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedGuide(heroGuide)}
                    className="px-6 py-3 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center space-x-2 cursor-pointer active:scale-[0.98]"
                  >
                    <span>Read Complete Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-zinc-400">
                    4 Practical Sections + Troubleshooting
                  </span>
                </div>

              </div>

            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 4. MAIN GUIDES BLOG GRID (Clean 3-Column Bento Cards)    */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {filteredGuides.length === 0 ? (
          <div className="bg-[#f4f4f6] rounded-[32px] p-12 text-center border border-zinc-200/60 space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mx-auto text-zinc-400 shadow-2xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">No field guides found</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              We couldn&apos;t find any guides matching &ldquo;{searchQuery}&rdquo;. Try another term like &ldquo;moss&rdquo;, &ldquo;fish&rdquo;, or &ldquo;humidity&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All Guides");
              }}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredGuides.map((guide) => (
              <article
                key={guide.id}
                className="bg-[#f4f4f6] rounded-[32px] p-6 sm:p-7 border border-zinc-200/70 shadow-2xs hover:shadow-xs hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Container */}
                  <div className="aspect-[16/10] rounded-[22px] overflow-hidden relative bg-white border border-zinc-200/60 shadow-2xs flex-shrink-0">
                    <Image
                      src={resolveImageAsset(guide.image)}
                      alt={guide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-zinc-900 text-[10px] font-bold font-mono uppercase tracking-wider border border-zinc-200/60 shadow-2xs">
                        {guide.category}
                      </span>
                    </div>
                  </div>

                  {/* Metadata Tagline */}
                  <div className="mt-5 flex items-center space-x-2 text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      <span>{guide.readTime}</span>
                    </span>
                    <span>·</span>
                    <span>Studio Protocol</span>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="mt-2.5 space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight leading-snug group-hover:text-zinc-800 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">
                      {guide.excerpt}
                    </p>
                  </div>

                  {/* Quick Highlight Pills */}
                  <div className="mt-4 pt-3.5 border-t border-zinc-200/60 space-y-1.5">
                    {guide.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-[11px] text-zinc-600">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Read Action Button */}
                <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedGuide(guide)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-zinc-950 hover:text-emerald-700 transition-colors group-hover:translate-x-0.5 duration-200 cursor-pointer"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono text-zinc-400">Step-by-step</span>
                </div>
              </article>
            ))}
          </div>
        )}

      </section>

      {/* ======================================================== */}
      {/* 5. DIAGNOSTIC MATRIX / SIGNAL AUDIT TABLE                */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-[32px] p-7 sm:p-10 border border-zinc-200/70 shadow-xs space-y-6">
          
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
              <span>DIAGNOSTIC MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
              Troubleshooting Common Signals & Imbalances
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Quick identification audit for early biological signals before any damage occurs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-400 uppercase text-[10px] font-bold">
                  <th className="py-3 px-4">Observation / Signal</th>
                  <th className="py-3 px-4">Root Biological Cause</th>
                  <th className="py-3 px-4">Corrective Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {DIAGNOSTIC_MATRIX.map((item, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-zinc-900 min-w-[220px]">
                      {item.signal}
                    </td>
                    <td className="py-4 px-4 text-zinc-600 min-w-[200px]">
                      {item.cause}
                    </td>
                    <td className="py-4 px-4 text-emerald-800 font-sans font-medium min-w-[240px]">
                      {item.fix}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. PERSONALIZED BOTANICAL CONSULTATION BANNER            */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="pastel-aura-canvas rounded-[32px] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-zinc-200/60">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-zinc-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>DIRECT CRAFTSMAN CONSULTATION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
              Have a question about your specific jar or biotope?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-xl leading-relaxed">
              Snap a clear photo of your terrarium or aquarium and send it directly to our studio team. We inspect moisture, lighting angles, and moss health free of charge.
            </p>
          </div>
          
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center space-x-2 cursor-pointer flex-shrink-0 active:scale-[0.98]"
          >
            <span>Ask a Studio Specialist</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. FULL-SCREEN IN-DEPTH GUIDE READER MODAL               */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedGuide && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            
            {/* Darkened Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGuide(null)}
              className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs"
            />

            {/* Modal Sheet Container */}
            <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-3xl bg-white rounded-[32px] border border-zinc-200/80 shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
              >
                
                {/* Sticky Reader Header */}
                <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 border-b border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-zinc-100 border border-zinc-200/70 text-[10px] font-mono font-bold text-zinc-700">
                      {selectedGuide.category}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{selectedGuide.readTime}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedGuide(null)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                    aria-label="Close guide reader"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable Reader Content */}
                <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
                  
                  {/* Article Title & Subtitle */}
                  <div className="space-y-3">
                    <h2 className="text-2xl sm:text-4xl font-bold text-zinc-950 tracking-tight leading-tight">
                      {selectedGuide.title}
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-500 font-normal leading-relaxed">
                      {selectedGuide.subtitle}
                    </p>
                  </div>

                  {/* Header Image */}
                  <div className="aspect-[16/9] rounded-[24px] overflow-hidden relative bg-zinc-100 border border-zinc-200/60 shadow-2xs">
                    <Image
                      src={resolveImageAsset(selectedGuide.image)}
                      alt={selectedGuide.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Overview Intro */}
                  <div className="bg-[#f4f4f6] rounded-2xl p-5 sm:p-6 border border-zinc-200/70 text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
                    <p className="font-semibold text-zinc-950 mb-1 text-xs uppercase tracking-wider font-mono">
                      Field Overview
                    </p>
                    {selectedGuide.overview}
                  </div>

                  {/* Key Takeaways Box */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-zinc-950 uppercase tracking-wider font-mono">
                      Key Takeaways & Core Rules
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedGuide.keyTakeaways.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white border border-zinc-200/70 shadow-2xs flex items-start space-x-2 text-xs text-zinc-800"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-sm font-bold text-zinc-950 uppercase tracking-wider font-mono">
                      Step-by-Step Practical Implementation
                    </h4>
                    <div className="space-y-3">
                      {selectedGuide.steps.map((step) => (
                        <div
                          key={step.num}
                          className="p-5 rounded-2xl bg-[#fafafa] border border-zinc-200/60 space-y-2"
                        >
                          <div className="flex items-center space-x-2.5">
                            <span className="w-6 h-6 rounded-lg bg-zinc-900 text-white text-[11px] font-mono font-bold flex items-center justify-center">
                              {step.num}
                            </span>
                            <h5 className="text-sm font-bold text-zinc-900 tracking-tight">
                              {step.heading}
                            </h5>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed pl-8">
                            {step.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Studio Pro-Tip Box */}
                  <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1.5">
                    <div className="flex items-center space-x-2 text-amber-900 text-xs font-bold font-mono uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Studio Insider Pro-Tip</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                      {selectedGuide.proTip}
                    </p>
                  </div>

                  {/* Do's and Don'ts Table */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-sm font-bold text-zinc-950 uppercase tracking-wider font-mono">
                      Best Practices: Do&apos;s & Don&apos;ts
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Dos */}
                      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-2">
                        <p className="text-xs font-bold text-emerald-900 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Recommended Practice</span>
                        </p>
                        <ul className="space-y-1.5 text-xs text-emerald-950">
                          {selectedGuide.dos.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Don'ts */}
                      <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/70 space-y-2">
                        <p className="text-xs font-bold text-rose-900 flex items-center space-x-1.5">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>What to Avoid</span>
                        </p>
                        <ul className="space-y-1.5 text-xs text-rose-950">
                          {selectedGuide.donts.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-rose-600 font-bold">✕</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-mono text-zinc-400">
                      AquaTerra Botanical Studio · Verified Care Protocol
                    </p>
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <Link
                        href="/shop"
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-semibold text-center hover:bg-zinc-800 transition-colors shadow-xs"
                      >
                        Explore Compatible Specimens
                      </Link>
                      <button
                        onClick={() => setSelectedGuide(null)}
                        className="px-4 py-2.5 rounded-xl bg-zinc-100 text-zinc-700 text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
