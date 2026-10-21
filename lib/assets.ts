/** Central image configuration for the homepage and legacy store records. */

const TERRARIUM_BASE = "/images/terreriums";

export const TERRARIUM_IMAGES = {
  sunlightBowl: `${TERRARIUM_BASE}/0a2fe810fce8f693f4a610543d741470.jpg`,
  woodlandTank: `${TERRARIUM_BASE}/0ebd25dbf195a4653893506c176842ed.jpg`,
  greenHaze: `${TERRARIUM_BASE}/1bc08d6c1304def838178b71e7b9e483.jpg`,
  bottleGarden: `${TERRARIUM_BASE}/22c4b9228f3ef5eb10dd1f24b97a8525.jpg`,
  waterfallTank: `${TERRARIUM_BASE}/7534f4467b6d0535c0c2034b543c8a2c.jpg`,
  mossBowl: `${TERRARIUM_BASE}/861885c305078725c49155ea27e8fc90.jpg`,
  jarLandscape: `${TERRARIUM_BASE}/9f13757d8076f656838fae997fc328bc.jpg`,
  stoneTank: `${TERRARIUM_BASE}/b0d89c565900942e26480170b5f46169.jpg`,
  floralVase: `${TERRARIUM_BASE}/c5e347b84e7fe6e8beed1580299f2bb2.jpg`,
  mountainBowl: `${TERRARIUM_BASE}/c7657663c1d032ff2dfa9f797c13046a.jpg`,
  bonsaiDome: `${TERRARIUM_BASE}/def99547305e1e1818cf74a58e141b74.jpg`,
  windowCloche: `${TERRARIUM_BASE}/ea1bd2e41acdf08812f361402cb7bc6d.jpg`,
  storyJar: `${TERRARIUM_BASE}/f4b126d0497d3632d4879e6598f3ebc9.jpg`,
} as const;

const LEGACY_IMAGE_MAP: Record<string, string> = {
  "/images/image1.png": TERRARIUM_IMAGES.stoneTank,
  "/images/image2.png": TERRARIUM_IMAGES.bottleGarden,
  "/images/image3.png": TERRARIUM_IMAGES.mossBowl,
  "/images/image4.png": TERRARIUM_IMAGES.waterfallTank,
  "/images/image5.png": TERRARIUM_IMAGES.mountainBowl,
  "/images/image6.png": TERRARIUM_IMAGES.storyJar,
  "/images/image7.png": TERRARIUM_IMAGES.windowCloche,
  "/images/image8.png": TERRARIUM_IMAGES.sunlightBowl,
  "/images/image9.png": TERRARIUM_IMAGES.bonsaiDome,
  "/images/image10.png": TERRARIUM_IMAGES.mossBowl,
  "/images/image11.png": TERRARIUM_IMAGES.storyJar,
  "/images/image12.png": TERRARIUM_IMAGES.floralVase,
  "/images/image13.png": TERRARIUM_IMAGES.woodlandTank,
  "/images/image14.png": TERRARIUM_IMAGES.bottleGarden,
  "/images/image15.png": TERRARIUM_IMAGES.stoneTank,
  "/images/image16.png": TERRARIUM_IMAGES.sunlightBowl,
  "/images/image17.png": TERRARIUM_IMAGES.jarLandscape,
  "/images/image18.png": TERRARIUM_IMAGES.waterfallTank,
  "/images/image19.png": TERRARIUM_IMAGES.mountainBowl,
  "/images/image20.png": TERRARIUM_IMAGES.windowCloche,
  "/images/image21.png": TERRARIUM_IMAGES.bonsaiDome,
};

export function resolveImageAsset(src: string | null | undefined) {
  if (!src) return TERRARIUM_IMAGES.sunlightBowl;
  return LEGACY_IMAGE_MAP[src] ?? src;
}

export const ASSETS = {
  hero: {
    aquarium: "/images/hero-aquarium.webp",
    fish1: "/images/hero-fish-1.png",
    fish2: "/images/hero-fish-2.png",
    plants: "/images/hero-plants.png",
    driftwood: "/images/hero-driftwood.png",
    substrate: "/images/hero-substrate.png",
  },
  categories: {
    terrarium: TERRARIUM_IMAGES.stoneTank,
    aquaticPlants: TERRARIUM_IMAGES.bottleGarden,
    fish: TERRARIUM_IMAGES.mossBowl,
    aquascaping: TERRARIUM_IMAGES.waterfallTank,
  },
  build: {
    environment: TERRARIUM_IMAGES.mountainBowl,
    inhabitants: TERRARIUM_IMAGES.storyJar,
    result: TERRARIUM_IMAGES.windowCloche,
  },
  products: {
    nanoAquarium: TERRARIUM_IMAGES.sunlightBowl,
    mossForest: TERRARIUM_IMAGES.bonsaiDome,
    bettaKit: TERRARIUM_IMAGES.mossBowl,
    beginnerBundle: TERRARIUM_IMAGES.storyJar,
    rarePlants: TERRARIUM_IMAGES.floralVase,
    shrimpEcosystem: TERRARIUM_IMAGES.woodlandTank,
  },
  plantSpotlight: {
    detail: TERRARIUM_IMAGES.bottleGarden,
  },
  fish: {
    collection: TERRARIUM_IMAGES.stoneTank,
  },
  gallery: {
    g1: TERRARIUM_IMAGES.sunlightBowl,
    g2: TERRARIUM_IMAGES.jarLandscape,
    g3: TERRARIUM_IMAGES.waterfallTank,
    g4: TERRARIUM_IMAGES.mountainBowl,
    g5: TERRARIUM_IMAGES.windowCloche,
    g6: TERRARIUM_IMAGES.bonsaiDome,
  },
  misc: {
    seabedSilhouette: "/images/seabed-silhouette.png",
    logoMark: "/images/logo-mark.svg",
  },
} as const;

export type ProductCareLevel = "Beginner" | "Easy" | "Moderate" | "Advanced";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  care: ProductCareLevel;
  size?: "sm" | "md" | "lg";
}

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "sunlit-moss-bowl",
    name: "Sunlit Moss Bowl",
    category: "Terrarium",
    description: "An open glass bowl planted with moss, fern, river stone, and a quiet miniature bench.",
    price: "₹3,499",
    image: ASSETS.products.nanoAquarium,
    care: "Easy",
    size: "lg",
  },
  {
    id: "bonsai-waterfall-dome",
    name: "Bonsai Waterfall Dome",
    category: "Signature Terrarium",
    description: "A sculptural bonsai composition under glass with layered groundcover.",
    price: "₹7,999",
    image: ASSETS.products.mossForest,
    care: "Beginner",
    size: "md",
  },
  {
    id: "moss-island-bowl",
    name: "Moss Island Bowl",
    category: "Terrarium",
    description: "A low-profile moss island designed for desks and softly lit rooms.",
    price: "₹2,999",
    image: ASSETS.products.bettaKit,
    care: "Easy",
    size: "md",
  },
  {
    id: "forest-story-jar",
    name: "Forest Story Jar",
    category: "Terrarium",
    description: "A miniature forest assembled with live groundcover, bark, and stone.",
    price: "₹3,699",
    image: ASSETS.products.beginnerBundle,
    care: "Beginner",
    size: "sm",
  },
  {
    id: "botanical-vase-garden",
    name: "Botanical Vase Garden",
    category: "Botanical Edition",
    description: "A tall planting study with moss, fern, and flowering texture.",
    price: "₹4,599",
    image: ASSETS.products.rarePlants,
    care: "Advanced",
    size: "md",
  },
  {
    id: "woodland-lamp-terrarium",
    name: "Woodland Lamp Terrarium",
    category: "Forest Edition",
    description: "A shaded woodland composition with layered rock, moss, and waterfall detail.",
    price: "₹4,299",
    image: ASSETS.products.shrimpEcosystem,
    care: "Moderate",
    size: "sm",
  },
];
