import type { Product } from "$lib/types/product";

// === NOUVELLE GÉNÉRATION DE PRODUITS ===
// Produits régénérés avec plus de variété et de catégories
export const products: Product[] = [
  // === VÊTEMENTS TECH ===
  {
    id: "p1",
    slug: "tshirt-svelte",
    name: "Svelte T-shirt Premium",
    description: "100% organic cotton, Svelte reactive logo, comfortable fit for developers",
    price: 2500,
    currency: "EUR",
    image: "/img/products/classic-t-shirt.svg",
    tags: ["tshirt", "dev", "clothing", "frontend", "svelte"],
    stock: 42,
    active: true
  },
  {
    id: "p2",
    slug: "hoodie-typescript",
    name: "TypeScript Hoodie",
    description: "Ultra-soft hoodie with TypeScript type system graphic, perfect for type-safe coding",
    price: 5500,
    currency: "EUR",
    image: "/img/products/comfort-hoodie.svg",
    tags: ["hoodie", "dev", "clothing", "typescript", "backend"],
    stock: 18,
    active: true
  },
  {
    id: "p3",
    slug: "tshirt-react-hooks",
    name: "React Hooks T-shirt",
    description: "Premium cotton t-shirt featuring React Hooks patterns, ideal for modern React developers",
    price: 2800,
    currency: "EUR",
    image: "/img/products/classic-t-shirt.svg",
    tags: ["tshirt", "react", "frontend", "hooks", "clothing"],
    stock: 35,
    active: true
  },
  {
    id: "p4",
    slug: "hoodie-dev",
    name: "Full-Stack Developer Hoodie",
    description: "Comfortable hoodie with MERN stack design, perfect for full-stack developers",
    price: 4500,
    currency: "EUR",
    image: "/img/products/comfort-hoodie.svg",
    tags: ["hoodie", "dev", "fullstack", "mern", "clothing"],
    stock: 25,
    active: true
  },
  {
    id: "p5",
    slug: "tshirt-vue-composition",
    name: "Vue Composition API T-shirt",
    description: "Comfortable fit with Vue 3 Composition API design, for modern Vue developers",
    price: 2600,
    currency: "EUR",
    image: "/img/products/classic-t-shirt.svg",
    tags: ["tshirt", "vue", "frontend", "composition-api", "clothing"],
    stock: 40,
    active: true
  },
  {
    id: "p6",
    slug: "cap-dev",
    name: "Developer Baseball Cap",
    description: "Adjustable baseball cap with code snippets design, UV protection included",
    price: 1800,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["cap", "accessory", "dev", "casual"],
    stock: 65,
    active: true
  },
  {
    id: "p7",
    slug: "socks-coding",
    name: "Coding Socks",
    description: "Fun coding-themed socks with algorithm patterns, comfortable for long coding sessions",
    price: 1200,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["socks", "fun", "dev", "comfort"],
    stock: 80,
    active: true
  },

  // === ACCESSOIRES TECH ===
  {
    id: "p8",
    slug: "mug-code",
    name: "Code Coffee Mug",
    description: "350ml ceramic mug with JavaScript code syntax highlighting, perfect for morning coffee",
    price: 1200,
    currency: "EUR",
    image: "/img/products/stainless-steel-bottle.svg",
    tags: ["mug", "drinkware", "coffee", "dev"],
    stock: 100,
    active: true
  },
  {
    id: "p9",
    slug: "sticker-pack",
    name: "Tech Sticker Pack",
    description: "Set of 5 high-quality vinyl stickers: React, Vue, Svelte, Node.js, and TypeScript",
    price: 800,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["sticker", "dev", "collection", "accessory"],
    stock: 150,
    active: true
  },
  {
    id: "p10",
    slug: "notebook-dev",
    name: "Developer Dot Grid Notebook",
    description: "120 pages premium dot grid notebook with coding-themed cover, perfect for planning and notes",
    price: 1500,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["notebook", "stationery", "dev", "planning"],
    stock: 80,
    active: true
  },
  {
    id: "p11",
    slug: "tote-bag",
    name: "Developer Laptop Tote Bag",
    description: "Water-resistant canvas tote bag with padded laptop compartment and tech graphics",
    price: 3500,
    currency: "EUR",
    image: "/img/products/classic-t-shirt.svg",
    tags: ["bag", "laptop", "accessory", "travel"],
    stock: 40,
    active: true
  },
  {
    id: "p12",
    slug: "mousepad-dev",
    name: "Coding Mouse Pad",
    description: "Large mouse pad with keyboard shortcuts",
    price: 1800,
    currency: "EUR",
    image: "/img/products/stainless-steel-bottle.svg",
    tags: ["mousepad", "desk", "dev"],
    stock: 65,
    active: true
  },
  {
    id: "p13",
    slug: "water-bottle",
    name: "Insulated Water Bottle",
    description: "500ml stainless steel bottle",
    price: 2800,
    currency: "EUR",
    image: "/img/products/stainless-steel-bottle.svg",
    tags: ["bottle", "drinkware", "lifestyle"],
    stock: 55,
    active: true
  },
  {
    id: "p14",
    slug: "phone-case",
    name: "Developer Phone Case",
    description: "Protective case with tech pattern",
    price: 2200,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["phone", "case", "accessories"],
    stock: 90,
    active: true
  },

  // === ÉLECTRONIQUE ===
  {
    id: "p15",
    slug: "mechanical-keyboard",
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with blue switches",
    price: 12000,
    currency: "EUR",
    image: "/img/products/stainless-steel-bottle.svg",
    tags: ["keyboard", "electronics", "gaming"],
    stock: 15,
    active: true
  },
  {
    id: "p16",
    slug: "wireless-mouse",
    name: "Wireless Gaming Mouse",
    description: "High-precision wireless mouse with RGB lighting",
    price: 6500,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["mouse", "electronics", "gaming"],
    stock: 25,
    active: true
  },
  {
    id: "p17",
    slug: "webcam-dev",
    name: "Developer Webcam",
    description: "1080p webcam with auto-focus and microphone",
    price: 7500,
    currency: "EUR",
    image: "/img/products/stainless-steel-bottle.svg",
    tags: ["webcam", "electronics", "streaming"],
    stock: 20,
    active: true
  },
  {
    id: "p18",
    slug: "usb-hub",
    name: "7-Port USB Hub",
    description: "Compact USB-C hub with Ethernet and HDMI",
    price: 4500,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["usb", "hub", "electronics"],
    stock: 35,
    active: true
  },
  {
    id: "p19",
    slug: "external-drive",
    name: "1TB External SSD",
    description: "Fast portable SSD with USB-C connection",
    price: 8500,
    currency: "EUR",
    image: "/img/products/stainless-steel-bottle.svg",
    tags: ["storage", "ssd", "electronics"],
    stock: 12,
    active: true
  },

  // === LIVRES ET RESSOURCES ===
  {
    id: "p20",
    slug: "svelte-book",
    name: "The Svelte Handbook",
    description: "Complete guide to Svelte framework",
    price: 3500,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["book", "svelte", "learning"],
    stock: 30,
    active: true
  },
  {
    id: "p21",
    slug: "javascript-guide",
    name: "Modern JavaScript Guide",
    description: "Comprehensive JavaScript reference book",
    price: 4200,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["book", "javascript", "learning"],
    stock: 25,
    active: true
  },
  {
    id: "p22",
    slug: "typescript-handbook",
    name: "TypeScript Handbook",
    description: "Official TypeScript documentation book",
    price: 3800,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["book", "typescript", "learning"],
    stock: 28,
    active: true
  },
  {
    id: "p23",
    slug: "react-cookbook",
    name: "React Cookbook",
    description: "Practical recipes for React development",
    price: 3200,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["book", "react", "learning"],
    stock: 22,
    active: true
  },

  // === NOUVEAUTÉS ===
  {
    id: "p24",
    slug: "smart-desk-lamp",
    name: "Smart LED Desk Lamp",
    description: "Adjustable LED lamp with phone app control",
    price: 5500,
    currency: "EUR",
    image: "/img/products/stainless-steel-bottle.svg",
    tags: ["lamp", "smart", "desk", "new"],
    stock: 18,
    active: true
  },
  {
    id: "p25",
    slug: "ergonomic-chair",
    name: "Ergonomic Office Chair",
    description: "Adjustable chair with lumbar support",
    price: 25000,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["chair", "ergonomic", "office", "new"],
    stock: 8,
    active: true
  },
  {
    id: "p26",
    slug: "noise-cancelling-headphones",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones",
    price: 15000,
    currency: "EUR",
    image: "/img/products/stainless-steel-bottle.svg",
    tags: ["headphones", "audio", "wireless", "new"],
    stock: 14,
    active: true
  },

  // === PRODUITS SAISONNIERS ===
  {
    id: "p27",
    slug: "christmas-tshirt",
    name: "Holiday Code T-shirt",
    description: "Festive t-shirt with coding Christmas tree",
    price: 2800,
    currency: "EUR",
    image: "/img/products/classic-t-shirt.svg",
    tags: ["tshirt", "holiday", "christmas", "seasonal"],
    stock: 50,
    active: true
  },
  {
    id: "p28",
    slug: "halloween-sticker-pack",
    name: "Halloween Sticker Pack",
    description: "Set of 5 spooky coding-themed stickers",
    price: 800,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["sticker", "halloween", "seasonal"],
    stock: 150,
    active: true
  },

  // === PROMOTIONS ===
  {
    id: "p29",
    slug: "bundle-dev-kit",
    name: "Developer Starter Kit",
    description: "T-shirt + Sticker + Notebook bundle",
    price: 4200,
    currency: "EUR",
    image: "/img/products/classic-t-shirt.svg",
    tags: ["bundle", "kit", "starter", "promo"],
    stock: 20,
    active: true
  },
  {
    id: "p30",
    slug: "clearance-mug",
    name: "Clearance Coffee Mug",
    description: "Previous season design at discount",
    price: 800,
    currency: "EUR",
    image: "/img/products/stainless-steel-bottle.svg",
    tags: ["mug", "clearance", "discount", "promo"],
    stock: 75,
    active: true
  },

  // === PRODUITS EXCLUSIFS ===
  {
    id: "p31",
    slug: "limited-tshirt",
    name: "Limited Edition T-shirt",
    description: "Exclusive design - limited stock",
    price: 3500,
    currency: "EUR",
    image: "/img/products/classic-t-shirt.svg",
    tags: ["tshirt", "limited", "exclusive"],
    stock: 10,
    active: true
  },
  {
    id: "p32",
    slug: "premium-hoodie",
    name: "Premium Developer Hoodie",
    description: "High-quality fabric with exclusive design",
    price: 6500,
    currency: "EUR",
    image: "/img/products/comfort-hoodie.svg",
    tags: ["hoodie", "premium", "exclusive"],
    stock: 15,
    active: true
  },

  // === ACCESSOIRES GAMING ===
  {
    id: "p33",
    slug: "rgb-mousepad",
    name: "RGB Gaming Mouse Pad",
    description: "Extra large RGB illuminated mouse pad",
    price: 3500,
    currency: "EUR",
    image: "/img/products/stainless-steel-bottle.svg",
    tags: ["mousepad", "rgb", "gaming"],
    stock: 40,
    active: true
  },
  {
    id: "p34",
    slug: "gaming-headset",
    name: "Gaming Headset",
    description: "7.1 surround sound gaming headset",
    price: 9500,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["headset", "gaming", "audio"],
    stock: 22,
    active: true
  },

  // === PRODUITS ECO-FRIENDLY ===
  {
    id: "p35",
    slug: "eco-tshirt",
    name: "Organic Cotton T-shirt",
    description: "100% organic cotton, sustainable production",
    price: 3200,
    currency: "EUR",
    image: "/img/products/classic-t-shirt.svg",
    tags: ["tshirt", "organic", "eco", "sustainable"],
    stock: 35,
    active: true
  },
  {
    id: "p36",
    slug: "bamboo-notebook",
    name: "Bamboo Notebook",
    description: "Eco-friendly bamboo cover notebook",
    price: 2200,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["notebook", "bamboo", "eco", "sustainable"],
    stock: 45,
    active: true
  },

  // === COLLECTIBLES ===
  {
    id: "p37",
    slug: "retro-computer-model",
    name: "Retro Computer Model",
    description: "Detailed scale model of classic computer",
    price: 4500,
    currency: "EUR",
    image: "/img/products/stainless-steel-bottle.svg",
    tags: ["model", "retro", "collectible"],
    stock: 12,
    active: true
  },
  {
    id: "p38",
    slug: "vintage-keyboard-stickers",
    name: "Vintage Keyboard Stickers",
    description: "Retro-style keyboard key stickers",
    price: 600,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["sticker", "vintage", "collectible"],
    stock: 200,
    active: true
  },

  // === NOUVEAUX PRODUITS AJOUTÉS ===
  {
    id: "p39",
    slug: "wireless-charger",
    name: "Wireless Charging Pad",
    description: "Fast wireless charger compatible with all Qi-enabled devices, LED indicator and overheat protection",
    price: 2500,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["charger", "wireless", "electronics", "mobile"],
    stock: 45,
    active: true
  },
  {
    id: "p40",
    slug: "mechanical-keyboard",
    name: "RGB Mechanical Keyboard",
    description: "Tactile mechanical keyboard with Cherry MX switches, customizable RGB lighting, and programmable keys",
    price: 12000,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["keyboard", "mechanical", "rgb", "gaming", "productivity"],
    stock: 25,
    active: true
  },
  {
    id: "p41",
    slug: "ergonomic-mouse",
    name: "Ergonomic Wireless Mouse",
    description: "Vertical ergonomic mouse designed for comfort during long coding sessions, 1000 DPI precision",
    price: 4500,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["mouse", "ergonomic", "wireless", "productivity", "comfort"],
    stock: 35,
    active: true
  },
  {
    id: "p42",
    slug: "standing-desk",
    name: "Height Adjustable Standing Desk",
    description: "Electric height-adjustable desk with memory presets, perfect for alternating between sitting and standing",
    price: 35000,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["desk", "standing", "ergonomic", "office", "health"],
    stock: 12,
    active: true
  },
  {
    id: "p43",
    slug: "noise-cancelling-headphones",
    name: "Developer Headphones",
    description: "Noise-cancelling headphones with built-in microphone, 30-hour battery, and comfortable design for coding",
    price: 18000,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["headphones", "noise-cancelling", "audio", "productivity"],
    stock: 30,
    active: true
  },
  {
    id: "p44",
    slug: "smart-home-hub",
    name: "Smart Home Developer Hub",
    description: "IoT hub for developers with API access, compatible with major smart home platforms",
    price: 8900,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["iot", "smart-home", "hub", "api", "automation"],
    stock: 20,
    active: true
  },
  {
    id: "p45",
    slug: "vr-development-kit",
    name: "VR Development Kit",
    description: "Complete VR development kit with controllers, headset adapter, and Unity/Unreal Engine templates",
    price: 25000,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["vr", "development", "gaming", "3d", "immersive"],
    stock: 15,
    active: true
  },
  {
    id: "p46",
    slug: "ai-powered-speaker",
    name: "AI Smart Speaker",
    description: "Voice-controlled smart speaker with built-in AI assistant, perfect for hands-free coding assistance",
    price: 12000,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["ai", "smart-speaker", "voice", "productivity", "automation"],
    stock: 28,
    active: true
  },
  {
    id: "p47",
    slug: "solar-power-bank",
    name: "Solar Power Bank",
    description: "Eco-friendly solar-powered battery pack, charges devices using sunlight, 20000mAh capacity",
    price: 3500,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["solar", "power-bank", "eco-friendly", "sustainable", "outdoor"],
    stock: 50,
    active: true
  },
  {
    id: "p48",
    slug: "smart-ring",
    name: "Smart Health Ring",
    description: "Wearable health tracker with heart rate monitoring, sleep analysis, and activity tracking",
    price: 2800,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["wearable", "health", "fitness", "smart-ring", "tracking"],
    stock: 40,
    active: true
  },
  {
    id: "p49",
    slug: "e-ink-tablet",
    name: "E-Ink Developer Tablet",
    description: "Paper-like tablet perfect for reading documentation and sketching app designs, zero eye strain",
    price: 4500,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["tablet", "e-ink", "reading", "design", "eye-friendly"],
    stock: 22,
    active: true
  },
  {
    id: "p50",
    slug: "robot-vacuum",
    name: "Smart Robot Vacuum",
    description: "AI-powered robot vacuum with mapping, app control, and smart home integration for developers",
    price: 32000,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["robot", "vacuum", "smart-home", "ai", "automation"],
    stock: 18,
    active: true
  },
  {
    id: "p51",
    slug: "drone-developer",
    name: "Developer Drone Kit",
    description: "Programmable drone kit with camera, perfect for learning IoT, computer vision, and aerial programming",
    price: 15000,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["drone", "iot", "camera", "programming", "education"],
    stock: 12,
    active: true
  },
  {
    id: "p52",
    slug: "3d-printer",
    name: "Desktop 3D Printer",
    description: "Compact 3D printer for prototyping, perfect for hardware startups and maker communities",
    price: 25000,
    currency: "EUR",
    image: "/img/products/design-handbook.svg",
    tags: ["3d-printer", "prototyping", "maker", "hardware", "innovation"],
    stock: 8,
    active: true
  }
];

export function list(): Product[] {
  return products.filter((p) => p.active);
}

export function bySlug(slug: string): Product | undefined {
  // Debug: log the search (only in development)
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('Searching for product with slug:', slug);
  }

  const product = products.find((p) => p.slug === slug);

  if (!product && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('Product not found. Available slugs:', getAllSlugs());
  }

  return product;
}

// Helper function to get all available slugs
export function getAllSlugs(): string[] {
  try {
    const slugs = products.map(p => p.slug);
    // Log only in development
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.log(`Found ${slugs.length} product slugs:`, slugs.slice(0, 3), slugs.length > 3 ? `...and ${slugs.length - 3} more` : '');
    }
    return slugs;
  } catch (error) {
    console.error('Error getting all slugs:', error);
    return [];
  }
}

export function byId(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function search(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter((p) =>
    p.active && (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags?.some(tag => tag.toLowerCase().includes(q))
    )
  );
}

// Fonctions de filtrage par catégories
export function getClothingProducts(): Product[] {
  return products.filter(p => p.active && p.tags?.includes('clothing'));
}

export function getAccessoriesProducts(): Product[] {
  return products.filter(p => p.active && p.tags?.includes('accessories'));
}

export function getElectronicsProducts(): Product[] {
  return products.filter(p => p.active && p.tags?.includes('electronics'));
}

export function getBooksProducts(): Product[] {
  return products.filter(p => p.active && p.tags?.includes('book'));
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.active && p.tags?.includes('new'));
}

export function getSeasonalProducts(): Product[] {
  return products.filter(p => p.active && p.tags?.includes('seasonal'));
}

export function getPromoProducts(): Product[] {
  return products.filter(p => p.active && p.tags?.includes('promo'));
}

export function getEcoProducts(): Product[] {
  return products.filter(p => p.active && (p.tags?.includes('eco') || p.tags?.includes('sustainable')));
}

export function getGamingProducts(): Product[] {
  return products.filter(p => p.active && p.tags?.includes('gaming'));
}

export function getExclusiveProducts(): Product[] {
  return products.filter(p => p.active && (p.tags?.includes('limited') || p.tags?.includes('exclusive') || p.tags?.includes('premium')));
}

export function getCollectiblesProducts(): Product[] {
  return products.filter(p => p.active && p.tags?.includes('collectible'));
}

// Fonctions de filtrage par prix
export function getProductsByPriceRange(min: number, max: number): Product[] {
  return products.filter(p => p.active && p.price >= min && p.price <= max);
}

export function getProductsUnder(price: number): Product[] {
  return products.filter(p => p.active && p.price < price);
}

export function getProductsAbove(price: number): Product[] {
  return products.filter(p => p.active && p.price > price);
}

// Fonctions de tri
export function sortByPrice(products: Product[], ascending: boolean = true): Product[] {
  return [...products].sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
}

export function sortByName(products: Product[], ascending: boolean = true): Product[] {
  return [...products].sort((a, b) =>
    ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
}

export function sortByStock(products: Product[], ascending: boolean = true): Product[] {
  return [...products].sort((a, b) => ascending ? (a.stock || 0) - (b.stock || 0) : (b.stock || 0) - (a.stock || 0));
}

// Fonctions statistiques
export function getProductsStats() {
  const activeProducts = products.filter(p => p.active);
  const totalValue = activeProducts.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);

  return {
    totalProducts: activeProducts.length,
    totalValue,
    averagePrice: activeProducts.length > 0 ? totalValue / activeProducts.length : 0,
    categories: {
      clothing: getClothingProducts().length,
      accessories: getAccessoriesProducts().length,
      electronics: getElectronicsProducts().length,
      books: getBooksProducts().length,
      new: getNewProducts().length,
      seasonal: getSeasonalProducts().length,
      promo: getPromoProducts().length,
      eco: getEcoProducts().length,
      gaming: getGamingProducts().length,
      exclusive: getExclusiveProducts().length,
      collectibles: getCollectiblesProducts().length
    },
    priceRanges: {
      under50: getProductsUnder(5000).length,
      between50and100: getProductsByPriceRange(5000, 10000).length,
      between100and500: getProductsByPriceRange(10000, 50000).length,
      above500: getProductsAbove(50000).length
    }
  };
}

// Fonctions de recherche avancée
export function searchAdvanced(query: string, filters?: {
  categories?: string[];
  priceRange?: { min: number; max: number };
  inStock?: boolean;
  sortBy?: 'price' | 'name' | 'stock';
  sortOrder?: 'asc' | 'desc';
}): Product[] {
  let results = search(query);

  // Filtre par catégories
  if (filters?.categories && filters.categories.length > 0) {
    results = results.filter(p =>
      filters.categories!.some(cat => p.tags?.includes(cat))
    );
  }

  // Filtre par prix
  if (filters?.priceRange) {
    results = results.filter(p =>
      p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max
    );
  }

  // Filtre stock
  if (filters?.inStock) {
    results = results.filter(p => (p.stock || 0) > 0);
  }

  // Tri
  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case 'price':
        results = sortByPrice(results, filters.sortOrder === 'asc');
        break;
      case 'name':
        results = sortByName(results, filters.sortOrder === 'asc');
        break;
      case 'stock':
        results = sortByStock(results, filters.sortOrder === 'asc');
        break;
    }
  }

  return results;
}

// Fonctions pour les recommandations
export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  const related = products.filter(p =>
    p.active &&
    p.id !== product.id &&
    p.tags?.some(tag => product.tags?.includes(tag))
  );

  // Mélanger et limiter
  return related
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}

export function getPopularProducts(limit: number = 8): Product[] {
  return products
    .filter(p => p.active && (p.stock || 0) > 10)
    .sort((a, b) => (b.stock || 0) - (a.stock || 0))
    .slice(0, limit);
}

export function getNewArrivals(limit: number = 6): Product[] {
  return products
    .filter(p => p.active && p.tags?.includes('new'))
    .slice(0, limit);
}

// Fonctions de validation des slugs
export function validateAllSlugs(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const slugs = new Set<string>();

  for (const product of products) {
    if (!product.slug) {
      errors.push(`Product ${product.id} (${product.name}) has no slug`);
      continue;
    }

    // Vérifier que le slug est valide (lettres, chiffres, tirets uniquement)
    if (!/^[a-z0-9-]+$/.test(product.slug)) {
      errors.push(`Product ${product.id} (${product.name}) has invalid slug: ${product.slug}`);
    }

    // Vérifier que le slug est unique
    if (slugs.has(product.slug)) {
      errors.push(`Duplicate slug found: ${product.slug} (Product ${product.id}: ${product.name})`);
    } else {
      slugs.add(product.slug);
    }

    // Vérifier que le slug correspond au produit
    const foundProduct = bySlug(product.slug);
    if (!foundProduct || foundProduct.id !== product.id) {
      errors.push(`Slug ${product.slug} doesn't match product ${product.id}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Fonctions pour enrichir les fiches produit
export function getProductDetails(product: Product) {
  const related = getRelatedProducts(product, 4);

  return {
    product,
    related,
    specs: getProductSpecs(product),
    shipping: getShippingInfo(product),
    warranty: getWarrantyInfo(product),
    reviews: getProductReviews(product.id)
  };
}

// Fonctions pour obtenir les spécifications détaillées
function getProductSpecs(product: Product) {
  const specs: Record<string, string> = {};

  // Spécifications de base
  specs['Reference'] = product.id;
  specs['Category'] = getProductCategory(product);
  specs['Price'] = `${product.price / 100} ${product.currency}`;

  if (product.stock !== undefined) {
    specs['Stock'] = `${product.stock} unit${product.stock > 1 ? 's' : ''}`;
  }

  // Spécifications spécifiques par type de produit
  if (product.tags?.includes('electronics')) {
    specs['Warranty'] = '2 years';
    specs['Power'] = 'USB-C powered';
    specs['Compatibility'] = 'Universal';
  }

  if (product.tags?.includes('clothing')) {
    specs['Material'] = '100% Cotton';
    specs['Care'] = 'Machine washable';
    specs['Origin'] = 'Made in Portugal';
  }

  if (product.tags?.includes('book')) {
    specs['Format'] = 'Paperback';
    specs['Pages'] = '200-400 pages';
    specs['Language'] = 'English';
  }

  if (product.tags?.includes('gaming')) {
    specs['Compatibility'] = 'PC, Mac, Linux';
    specs['Lighting'] = 'RGB customizable';
    specs['Connectivity'] = 'Wireless/USB';
  }

  return specs;
}

// Fonctions pour obtenir les informations de livraison
function getShippingInfo(product: Product) {
  return {
    standard: {
      cost: 499, // 4.99€
      time: '3-5 business days',
      tracking: true
    },
    express: {
      cost: 999, // 9.99€
      time: '1-2 business days',
      tracking: true
    },
    free: {
      threshold: 5000, // 50€
      enabled: product.price >= 5000
    }
  };
}

// Fonctions pour obtenir les informations de garantie
function getWarrantyInfo(product: Product) {
  if (product.tags?.includes('electronics')) {
    return {
      duration: '2 years',
      coverage: 'Manufacturing defects',
      support: 'Email and phone support'
    };
  }

  return {
    duration: '1 year',
    coverage: 'Manufacturing defects',
    support: 'Email support'
  };
}

// Fonction pour obtenir les avis du produit (simulation)
function getProductReviews(productId: string) {
  // Simulation d'avis pour les produits
  const mockReviews = [
    {
      id: 'r1',
      author: 'John D.',
      rating: 5,
      title: 'Excellent quality!',
      comment: 'Very satisfied with this purchase. The quality exceeded my expectations.',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 'r2',
      author: 'Sarah M.',
      rating: 4,
      title: 'Good product',
      comment: 'Nice design and good quality. Delivery was fast.',
      date: '2024-01-12',
      verified: true
    },
    {
      id: 'r3',
      author: 'Mike R.',
      rating: 5,
      title: 'Highly recommended',
      comment: 'Perfect for my needs. Will definitely buy again.',
      date: '2024-01-10',
      verified: true
    }
  ];

  return mockReviews;
}

// Fonction pour obtenir la catégorie principale du produit
function getProductCategory(product: Product): string {
  if (product.tags?.includes('clothing')) return 'Clothing';
  if (product.tags?.includes('electronics')) return 'Electronics';
  if (product.tags?.includes('book')) return 'Books';
  if (product.tags?.includes('gaming')) return 'Gaming';
  if (product.tags?.includes('accessories')) return 'Accessories';
  if (product.tags?.includes('eco') || product.tags?.includes('sustainable')) return 'Eco-Friendly';
  if (product.tags?.includes('new')) return 'New Arrivals';
  if (product.tags?.includes('exclusive') || product.tags?.includes('limited')) return 'Exclusive';
  if (product.tags?.includes('promo')) return 'Promotions';

  return 'General';
}

// Fonction pour générer un rapport de validation des slugs
export function generateSlugReport(): string {
  const validation = validateAllSlugs();
  let report = '=== RAPPORT DE VALIDATION DES SLUGS ===\n\n';

  if (validation.valid) {
    report += '✅ Tous les slugs sont valides !\n\n';
  } else {
    report += '❌ Erreurs trouvées :\n';
    validation.errors.forEach(error => {
      report += `  - ${error}\n`;
    });
    report += '\n';
  }

  report += `📊 Statistiques :\n`;
  report += `  - Total de produits : ${products.length}\n`;
  report += `  - Produits actifs : ${products.filter(p => p.active).length}\n`;
  report += `  - Produits avec slug : ${products.filter(p => p.slug).length}\n\n`;

  report += `🏷️ Exemples d'URLs de fiches produit :\n`;
  const examples = products.filter(p => p.active && p.slug).slice(0, 5);
  examples.forEach(product => {
    report += `  - http://localhost:5178/product/${product.slug} (${product.name})\n`;
  });

  return report;
}

// Fonction pour tester l'accessibilité de tous les produits
export function testProductAccessibility(): { accessible: string[]; notAccessible: string[] } {
  const accessible: string[] = [];
  const notAccessible: string[] = [];

  products.forEach(product => {
    if (product.active && product.slug) {
      const found = bySlug(product.slug);
      if (found && found.id === product.id) {
        accessible.push(`${product.slug} (${product.name})`);
      } else {
        notAccessible.push(`${product.slug} (${product.name})`);
      }
    } else {
      notAccessible.push(`No slug: ${product.name}`);
    }
  });

  return { accessible, notAccessible };
}
