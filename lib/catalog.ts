import { TERRARIUM_IMAGES } from "./assets";

export interface StoreProduct {
  id: string;
  name: string;
  series: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  is_featured: boolean;
  is_limited: boolean;
  created_at: string;
  care_level: "Beginner" | "Easy" | "Moderate" | "Advanced";
  size: string;
}

const createdAt = "2026-07-01T00:00:00.000Z";

export const LOCAL_CATALOG: StoreProduct[] = [
  { id: "sunlit-moss-bowl", name: "Sunlit Moss Bowl", series: "Studio Terrariums", category: "Terrariums", description: "A warm, open glass bowl planted with moss, fern, river stone, and a quiet miniature bench.", price: 3499, image_url: TERRARIUM_IMAGES.sunlightBowl, stock: 12, is_featured: true, is_limited: false, created_at: createdAt, care_level: "Beginner", size: "28 cm bowl" },
  { id: "woodland-lamp-terrarium", name: "Woodland Lamp Terrarium", series: "Forest Editions", category: "Terrariums", description: "A shaded woodland composition with layered rock, moss, and a low waterfall profile.", price: 4299, image_url: TERRARIUM_IMAGES.woodlandTank, stock: 7, is_featured: true, is_limited: false, created_at: createdAt, care_level: "Easy", size: "30 x 30 cm" },
  { id: "green-haze-vivarium", name: "Green Haze Vivarium", series: "Collector Series", category: "Terrariums", description: "A vertically composed forest floor for compact spaces and high-humidity planting.", price: 5799, image_url: TERRARIUM_IMAGES.greenHaze, stock: 4, is_featured: false, is_limited: true, created_at: createdAt, care_level: "Moderate", size: "24 x 38 cm" },
  { id: "stairway-bottle-garden", name: "Stairway Bottle Garden", series: "Story Jars", category: "Terrariums", description: "Layered moss and stone rise through a tall bottle garden with a sculpted path detail.", price: 3899, image_url: TERRARIUM_IMAGES.bottleGarden, stock: 10, is_featured: true, is_limited: false, created_at: createdAt, care_level: "Easy", size: "18 x 34 cm" },
  { id: "fern-fall-terrarium", name: "Fern Fall Terrarium", series: "Waterfall Series", category: "Aquascape Kits", description: "A framed fern landscape with stone hardscape and a gentle recirculating waterfall layout.", price: 6999, image_url: TERRARIUM_IMAGES.waterfallTank, stock: 5, is_featured: true, is_limited: true, created_at: createdAt, care_level: "Moderate", size: "32 x 42 cm" },
  { id: "moss-island-bowl", name: "Moss Island Bowl", series: "Open Bowls", category: "Terrariums", description: "A low-profile moss island designed for desks, sideboards, and softly lit rooms.", price: 2999, image_url: TERRARIUM_IMAGES.mossBowl, stock: 16, is_featured: false, is_limited: false, created_at: createdAt, care_level: "Beginner", size: "24 cm bowl" },
  { id: "layered-jar-landscape", name: "Layered Jar Landscape", series: "Story Jars", category: "Terrariums", description: "A sealed jar ecosystem with textured stone, moss, and a winding miniature stairway.", price: 4199, image_url: TERRARIUM_IMAGES.jarLandscape, stock: 8, is_featured: false, is_limited: false, created_at: createdAt, care_level: "Easy", size: "19 x 32 cm" },
  { id: "stone-garden-cube", name: "Stone Garden Cube", series: "Studio Terrariums", category: "Aquascape Kits", description: "An architectural glass cube arranged with mountain stone, moss, and compact tropical planting.", price: 6499, image_url: TERRARIUM_IMAGES.stoneTank, stock: 6, is_featured: true, is_limited: false, created_at: createdAt, care_level: "Moderate", size: "35 x 35 cm" },
  { id: "botanical-vase-garden", name: "Botanical Vase Garden", series: "Botanical Editions", category: "Aquatic Plants", description: "A tall planting study with moss, fern, and flowering texture for bright indoor spaces.", price: 4599, image_url: TERRARIUM_IMAGES.floralVase, stock: 9, is_featured: false, is_limited: false, created_at: createdAt, care_level: "Moderate", size: "20 x 42 cm" },
  { id: "mountain-glass-bowl", name: "Mountain Glass Bowl", series: "Collector Series", category: "Terrariums", description: "A dramatic open bowl built around weathered stone and a dense carpet of living moss.", price: 5299, image_url: TERRARIUM_IMAGES.mountainBowl, stock: 3, is_featured: true, is_limited: true, created_at: createdAt, care_level: "Advanced", size: "30 cm bowl" },
  { id: "bonsai-waterfall-dome", name: "Bonsai Waterfall Dome", series: "Signature Builds", category: "Terrariums", description: "A sculptural bonsai composition under glass with a compact watercourse and layered groundcover.", price: 7999, image_url: TERRARIUM_IMAGES.bonsaiDome, stock: 2, is_featured: true, is_limited: true, created_at: createdAt, care_level: "Advanced", size: "34 cm dome" },
  { id: "window-bonsai-cloche", name: "Window Bonsai Cloche", series: "Signature Builds", category: "Terrariums", description: "A calm bonsai cloche made for filtered window light and slower, considered interiors.", price: 7499, image_url: TERRARIUM_IMAGES.windowCloche, stock: 4, is_featured: false, is_limited: true, created_at: createdAt, care_level: "Moderate", size: "28 x 40 cm" },
  { id: "forest-story-jar", name: "Forest Story Jar", series: "Story Jars", category: "Terrariums", description: "A playful miniature forest assembled with live groundcover, bark, stone, and small scene details.", price: 3699, image_url: TERRARIUM_IMAGES.storyJar, stock: 11, is_featured: false, is_limited: false, created_at: createdAt, care_level: "Easy", size: "20 x 34 cm" },
];

export function getLocalProduct(id: string) {
  return LOCAL_CATALOG.find((product) => product.id === id);
}
