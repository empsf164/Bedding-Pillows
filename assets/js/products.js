/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Product Database & Utilities
 */

const NESTORA_PRODUCTS = [
  {
    id: "nestora-cloud-linen-sheet-set",
    name: "CloudLinen™ French Flax Sheet Set",
    slug: "cloudlinen-sheet-set",
    category: "sheets",
    categoryName: "Bed Sheets",
    collection: "luxury",
    collectionName: "The Quiet Luxury Collection",
    price: 185,
    originalPrice: 220,
    rating: 4.9,
    reviewCount: 428,
    badge: "Bestseller",
    badgeType: "bestseller",
    shortDesc: "100% certified French flax linen. Pre-washed for cloud-like softness from day one.",
    description: "Crafted from 100% organic French flax, our CloudLinen™ Sheet Set offers unmatched breathability, a relaxed lived-in drape, and year-round thermal regulation. Pre-washed with natural pumice stones for immediate velvety softness.",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Warm Ivory", code: "#F6F2EA" },
      { name: "Soft Linen", code: "#EDE6D8" },
      { name: "Muted Sage", code: "#8DA08A" },
      { name: "Deep Charcoal", code: "#2C2824" }
    ],
    sizes: ["Twin", "Full", "Queen", "King", "Cal King"],
    material: "100% French Flax Linen",
    fillType: "None (Woven)",
    firmness: "N/A",
    cooling: "Ultra Breathable",
    threadCount: "175 GSM (Linen Weight)",
    care: "Machine wash cold on gentle cycle. Tumble dry low or line dry.",
    origin: "Woven in Guimarães, Portugal",
    warranty: "10-Year Craftsmanship Guarantee"
  },
  {
    id: "nestora-serene-cooling-pillow",
    name: "SereneCool™ Ergonomic Latex Pillow",
    slug: "serenecool-latex-pillow",
    category: "pillows",
    categoryName: "Cooling Pillows",
    collection: "cooling",
    collectionName: "The Cooling Collection",
    price: 95,
    originalPrice: 120,
    rating: 4.8,
    reviewCount: 312,
    badge: "Cooling",
    badgeType: "cooling",
    shortDesc: "Natural ventilated Talalay latex with phase-change cooling cover. Ideal for hot sleepers.",
    description: "Engineered with open-cell natural Talalay latex core and micro-ventilated channels that continuously circulate air. The removable Tencel™ cover features Japanese phase-change cooling yarn for refreshing coolness all night long.",
    images: [
      "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Crisp White", code: "#FFFFFF" },
      { name: "Glacier Sage", code: "#D8E2DC" }
    ],
    sizes: ["Standard", "Queen", "King"],
    material: "100% Natural Talalay Latex + Tencel™ Cover",
    fillType: "Solid Ventilated Latex",
    firmness: "Medium",
    cooling: "Active Phase-Change Cooling",
    threadCount: "350 TC Jacquard Cover",
    care: "Removable cover machine washable at 30°C. Spot clean core.",
    origin: "Engineered in Milan, Italy",
    warranty: "5-Year Shape Retention Warranty"
  },
  {
    id: "nestora-hotel-percale-duvet",
    name: "Grand Hotel 400TC Percale Duvet Set",
    slug: "hotel-percale-duvet-set",
    category: "duvet",
    categoryName: "Duvet Covers",
    collection: "hotel",
    collectionName: "Hotel Comfort Collection",
    price: 160,
    originalPrice: 195,
    rating: 4.95,
    reviewCount: 540,
    badge: "5-Star Hotel",
    badgeType: "bestseller",
    shortDesc: "Crisp, matte organic long-staple cotton with clean marrow stitch border.",
    description: "Recreate the crisp, cool comfort of a five-star boutique suite. Woven from 100% organic GOTS-certified long-staple combed cotton in a breathable one-over-one percale weave.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Classic White", code: "#FFFFFF" },
      { name: "Warm Ivory", code: "#F6F2EA" },
      { name: "Oxford Sand", code: "#E8DFD1" }
    ],
    sizes: ["Twin", "Full/Queen", "King/Cal King"],
    material: "100% GOTS Organic Long-Staple Cotton",
    fillType: "None (Cover)",
    firmness: "N/A",
    cooling: "Crisp & Cool",
    threadCount: "400 Thread Count Percale",
    care: "Machine wash warm, tumble dry medium. Iron for hotel crisp finish.",
    origin: "Crafted in Aegean, Turkey",
    warranty: "5-Year Guarantee"
  },
  {
    id: "nestora-down-cloud-pillow",
    name: "Royal Goose Down Dual-Chamber Pillow",
    slug: "royal-goose-down-pillow",
    category: "pillows",
    categoryName: "Down & Feather",
    collection: "luxury",
    collectionName: "The Quiet Luxury Collection",
    price: 135,
    originalPrice: 165,
    rating: 4.9,
    reviewCount: 280,
    badge: "Pure Down",
    badgeType: "bestseller",
    shortDesc: "RDS-certified Hungarian white goose down outer with resilient feather core.",
    description: "The ultimate dual-chamber architecture: 800-fill-power hypoallergenic white goose down on the outer perimeter for sublime cloud softness, paired with an inner core of supportive feathers.",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Pure Snow", code: "#FFFFFF" }
    ],
    sizes: ["Standard", "Queen", "King"],
    material: "RDS Hungarian Goose Down + 100% Organic Sateen Shell",
    fillType: "800 Fill Power Goose Down & Feather Core",
    firmness: "Medium-Soft",
    cooling: "Balanced Breathability",
    threadCount: "500 TC Down-Proof Sateen",
    care: "Dry clean or professional gentle laundering recommended.",
    origin: "Handcrafted in Bavaria, Germany",
    warranty: "10-Year Loft Retention Guarantee"
  },
  {
    id: "nestora-waffle-quilt-coverlet",
    name: "Waffle Texture Stonewashed Quilt",
    slug: "waffle-stonewashed-quilt",
    category: "quilts",
    categoryName: "Quilts & Blankets",
    collection: "essentials",
    collectionName: "Everyday Essentials",
    price: 145,
    originalPrice: 175,
    rating: 4.85,
    reviewCount: 198,
    badge: "New Arrival",
    badgeType: "new",
    shortDesc: "Deep honeycomb waffle texture. Layered warmth with lightweight tactile drape.",
    description: "Stonewashed for an exceptionally dimensional texture, this heavyweight waffle quilt provides breathable warmth without weight. Ideal as a stand-alone top layer in summer or a cozy mid-layer in winter.",
    images: [
      "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Natural Sand", code: "#D8C8B0" },
      { name: "Earthy Taupe", code: "#8C7E72" },
      { name: "Forest Sage", code: "#5E6D5B" }
    ],
    sizes: ["Full/Queen", "King/Cal King"],
    material: "100% Organic Turkish Combed Cotton",
    fillType: "Pure Cotton Batting",
    firmness: "N/A",
    cooling: "All-Season Breathable",
    threadCount: "380 GSM Waffle Weave",
    care: "Machine wash cold, gentle cycle. Tumble dry low.",
    origin: "Denizli, Turkey",
    warranty: "3-Year Guarantee"
  },
  {
    id: "nestora-all-season-down-comforter",
    name: "All-Season European Down Comforter",
    slug: "all-season-down-comforter",
    category: "comforters",
    categoryName: "Comforters",
    collection: "luxury",
    collectionName: "The Quiet Luxury Collection",
    price: 240,
    originalPrice: 295,
    rating: 4.96,
    reviewCount: 390,
    badge: "Award Winner",
    badgeType: "bestseller",
    shortDesc: "Baffle-box construction with 750 fill power European down. Zero cold spots.",
    description: "Featuring a 3D baffle-box design that keeps the down evenly distributed without shifting or flattening. Encased in ultra-soft 400TC organic cotton sateen shell with 8 corner loops.",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Cloud White", code: "#FAFAF9" }
    ],
    sizes: ["Twin", "Full/Queen", "King/Cal King"],
    material: "European White Down + 100% Organic Sateen",
    fillType: "750 Fill Power Hypoallergenic Down",
    firmness: "N/A",
    cooling: "Thermal Regulating",
    threadCount: "400 TC Sateen",
    care: "Machine wash cold in front load machine or dry clean.",
    origin: "Handcrafted in Austria",
    warranty: "10-Year Guarantee"
  },
  {
    id: "nestora-side-sleeper-contour-pillow",
    name: "ContourEase™ Ergonomic Side-Sleeper Pillow",
    slug: "contourease-side-sleeper-pillow",
    category: "pillows",
    categoryName: "Side Sleeper",
    collection: "essentials",
    collectionName: "Everyday Essentials",
    price: 88,
    originalPrice: 110,
    rating: 4.78,
    reviewCount: 245,
    badge: "Ergonomic",
    badgeType: "organic",
    shortDesc: "Shoulder contour cut-out aligns spine and relieves neck pressure for side sleepers.",
    description: "Specifically contoured to cradle the head and accommodate the shoulder slope. Features responsive memory foam infused with soothing herbal bamboo charcoal for natural odor resistance.",
    images: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Oatmeal Grey", code: "#D5D1CB" },
      { name: "Linen White", code: "#F5F3EF" }
    ],
    sizes: ["Standard", "Queen"],
    material: "Bamboo Charcoal Memory Foam + Bamboo Viscose Cover",
    fillType: "Contoured High-Density Viscoelastic Foam",
    firmness: "Firm / Supportive",
    cooling: "Balanced",
    threadCount: "300 TC Knitted Fabric",
    care: "Machine wash outer cover at 40°C. Wipe inner core.",
    origin: "Designed in Sweden",
    warranty: "5-Year Guarantee"
  },
  {
    id: "nestora-organic-bamboo-sateen-sheets",
    name: "Silky Bamboo Lyocell Sateen Sheet Set",
    slug: "bamboo-lyocell-sheet-set",
    category: "sheets",
    categoryName: "Bed Sheets",
    collection: "sustainable",
    collectionName: "Sustainable Collection",
    price: 155,
    originalPrice: 185,
    rating: 4.88,
    reviewCount: 360,
    badge: "Eco-Friendly",
    badgeType: "organic",
    shortDesc: "Silky smooth closed-loop bamboo lyocell. Naturally hypoallergenic and cool.",
    description: "Made in a zero-waste closed-loop process from organically grown bamboo. Feels softer than 1000-thread-count Egyptian cotton with natural temperature-regulating micro-channels.",
    images: [
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Pale Sage", code: "#D2DDD0" },
      { name: "Dune Sand", code: "#EAE0D3" },
      { name: "Midnight Charcoal", code: "#2B2A29" }
    ],
    sizes: ["Twin", "Full", "Queen", "King", "Cal King"],
    material: "100% Organic Bamboo Lyocell",
    fillType: "None (Woven)",
    firmness: "N/A",
    cooling: "Cooling & Silky",
    threadCount: "300 TC (Equivalent to 1000 TC Cotton)",
    care: "Gentle cycle in cold water. Low heat tumble dry.",
    origin: "Eco-Certified Facility, Portugal",
    warranty: "5-Year Guarantee"
  },
  {
    id: "nestora-botanical-tencel-pillowcase-pair",
    name: "Pure Silk & Tencel™ Pillowcase Pair",
    slug: "silk-tencel-pillowcases",
    category: "pillowcases",
    categoryName: "Pillowcases",
    collection: "luxury",
    collectionName: "The Quiet Luxury Collection",
    price: 65,
    originalPrice: 80,
    rating: 4.92,
    reviewCount: 175,
    badge: "Hair & Skin Care",
    badgeType: "bestseller",
    shortDesc: "Gentle on hair and delicate facial skin. Reduces morning bedhead and friction lines.",
    description: "A decadent blend of 6A grade Mulberry silk and Eucalyptus Tencel™. Features an invisible French envelope closure and delicate French seam detailing.",
    images: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Pearl Champagne", code: "#F4EFE6" },
      { name: "Blush Stone", code: "#EADFD5" },
      { name: "Silver Sage", code: "#DCE3DC" }
    ],
    sizes: ["Standard", "Queen", "King"],
    material: "50% Grade 6A Mulberry Silk, 50% Eucalyptus Tencel™",
    fillType: "None (Pillowcase Pair)",
    firmness: "N/A",
    cooling: "Silky Cool",
    threadCount: "22 Momme / 400 TC",
    care: "Hand wash or gentle machine wash inside mesh laundry bag.",
    origin: "Hand-finished in Lyon, France",
    warranty: "2-Year Guarantee"
  },
  {
    id: "nestora-breathable-mattress-protector",
    name: "PureShield™ Waterproof Bamboo Mattress Protector",
    slug: "waterproof-bamboo-mattress-protector",
    category: "bedding",
    categoryName: "Mattress Protectors",
    collection: "essentials",
    collectionName: "Everyday Essentials",
    price: 75,
    originalPrice: 95,
    rating: 4.86,
    reviewCount: 220,
    badge: "Protection",
    badgeType: "organic",
    shortDesc: "100% noiseless waterproof barrier. Breathable bamboo jacquard top.",
    description: "Engineered with a breathable micro-porous polyurethane membrane that blocks liquids, allergens, and dust mites while maintaining quiet airflow. Fits mattresses up to 18 inches deep.",
    images: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Crisp White", code: "#FFFFFF" }
    ],
    sizes: ["Twin", "Full", "Queen", "King", "Cal King"],
    material: "Bamboo Jacquard + TPU Waterproof Membrane",
    fillType: "None",
    firmness: "N/A",
    cooling: "Breathable Protection",
    threadCount: "320 GSM Knit",
    care: "Machine wash hot. Tumble dry low.",
    origin: "Spain",
    warranty: "10-Year Waterproof Warranty"
  },
  {
    id: "nestora-chunky-knit-weighted-blanket",
    name: "Hand-Knit Organic Cotton Weighted Blanket",
    slug: "hand-knit-weighted-blanket",
    category: "blankets",
    categoryName: "Blankets",
    collection: "luxury",
    collectionName: "The Quiet Luxury Collection",
    price: 210,
    originalPrice: 250,
    rating: 4.93,
    reviewCount: 165,
    badge: "Handmade",
    badgeType: "bestseller",
    shortDesc: "15 lbs of gentle deep-touch pressure. Open-loop knit prevents overheating.",
    description: "Crafted entirely by hand using layer upon layer of organic cotton yarn. Free of artificial glass beads or plastic pellets — the soothing weight comes entirely from pure natural fibers.",
    images: [
      "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Linen Cream", code: "#F7F3EB" },
      { name: "Smoky Sage", code: "#788776" },
      { name: "Earthy Clay", code: "#C48A73" }
    ],
    sizes: ["Standard Throw (15 lbs)", "Full/Queen (20 lbs)"],
    material: "100% GOTS Certified Organic Cotton",
    fillType: "100% Cotton Knitted Core (No beads)",
    firmness: "N/A",
    cooling: "Open Breathable Loops",
    threadCount: "Heavy Gauge Yarn",
    care: "Dry clean or commercial front-load washer gentle cycle.",
    origin: "Artisanal Guild, Portugal",
    warranty: "3-Year Guarantee"
  },
  {
    id: "nestora-adjustable-down-alt-pillow",
    name: "CustomLoft™ Adjustable Microfiber Pillow",
    slug: "customloft-adjustable-pillow",
    category: "pillows",
    categoryName: "Sleeping Pillows",
    collection: "essentials",
    collectionName: "Everyday Essentials",
    price: 68,
    originalPrice: 85,
    rating: 4.75,
    reviewCount: 290,
    badge: "Adjustable",
    badgeType: "new",
    shortDesc: "Add or remove micro-fill to dial in your exact height and support level.",
    description: "No more guessing your pillow height. Unzip the inner casing and adjust the silken micro-gel clusters until your head, neck, and spine rest in effortless ergonomic harmony.",
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Snow White", code: "#FFFFFF" }
    ],
    sizes: ["Standard", "Queen", "King"],
    material: "Siliconized Micro-cluster Down Alternative + 100% Cotton Percale",
    fillType: "Adjustable Gel Microfiber",
    firmness: "Adjustable (Soft to Firm)",
    cooling: "Balanced Airflow",
    threadCount: "300 TC Cotton Percale",
    care: "Machine wash cold, tumble dry low with dryer balls.",
    origin: "USA",
    warranty: "3-Year Guarantee"
  }
];

// Helper Functions
function getProductById(id) {
  return NESTORA_PRODUCTS.find(p => p.id === id || p.slug === id);
}

function formatPrice(amount) {
  return `$${amount.toLocaleString()}`;
}

function getRatingStars(rating) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) {
    html += '<i class="bi bi-star-fill"></i>';
  }
  if (hasHalf) {
    html += '<i class="bi bi-star-half"></i>';
  }
  const empty = 5 - full - (hasHalf ? 1 : 0);
  for (let i = 0; i < empty; i++) {
    html += '<i class="bi bi-star"></i>';
  }
  return html;
}
