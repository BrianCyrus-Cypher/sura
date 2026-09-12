export const ASSET_URLS = {
  street: "/manus-storage/nairobi-street-editorial_5f3f7e9e.jpg",
  home: "/manus-storage/heritage-interior_a317739d.jpg",
  portrait: "/manus-storage/nairobi-fashion-portrait_558e87d6.jpg",
} as const;

export type VendorType = "thrift" | "tailor" | "home_studio" | "stylist" | "creative";
export type BudgetTier = "considered" | "signature" | "statement";

export type DemoService = {
  title: string;
  category: string;
  priceFromKes: number;
  priceToKes: number;
  leadTime: string;
};

export type DemoVendor = {
  id: number;
  slug: string;
  name: string;
  type: VendorType;
  city: string;
  county: string;
  neighbourhood: string;
  locationText: string;
  description: string;
  pointOfView: string;
  priceFloorKes: number;
  priceCeilingKes: number;
  budgetTier: BudgetTier;
  aestheticTags: string[];
  lifestyleTags: string[];
  portfolio: string[];
  socialHandle: string;
  socialUrl: string;
  services: DemoService[];
  isDemo: true;
};

export type BuildItem = {
  id: number;
  vendorId?: number;
  label: string;
  category: string;
  estimatedCostKes: number;
  note: string;
};

export type DemoBuild = {
  id: number;
  slug: string;
  title: string;
  city: string;
  county: string;
  lifestyle: string;
  aesthetic: string;
  priority: string;
  totalMinKes: number;
  totalMaxKes: number;
  headline: string;
  rationale: string;
  heroImageUrl: string;
  items: BuildItem[];
  isDemo: true;
};

export type MatchBrief = {
  budgetKes: number;
  city: string;
  lifestyle: string;
  aesthetic: string;
  aestheticMix?: string[];
  priority: string;
};

export const demoVendors: DemoVendor[] = [
  {
    id: 1,
    slug: "ember-thread-atelier",
    name: "Ember & Thread Atelier",
    type: "tailor",
    city: "Nairobi",
    county: "Nairobi",
    neighbourhood: "Kilimani",
    locationText: "Kilimani, Nairobi",
    description: "A considered made-to-measure studio for silhouettes that feel quiet, deliberate, and easy to repeat.",
    pointOfView: "Tailoring with a relaxed East African proportion and a love of strong natural fabrics.",
    priceFloorKes: 3500,
    priceCeilingKes: 18000,
    budgetTier: "signature",
    aestheticTags: ["Soft Power", "Heritage Modern", "Comfort Official"],
    lifestyleTags: ["Creative Work", "Celebration", "Everyday"],
    portfolio: [ASSET_URLS.portrait, ASSET_URLS.street],
    socialHandle: "@emberandthread.demo",
    socialUrl: "https://instagram.com",
    services: [
      { title: "Signature shirt", category: "Tailoring", priceFromKes: 3500, priceToKes: 6000, leadTime: "5–7 days" },
      { title: "Wide-leg trouser", category: "Tailoring", priceFromKes: 5200, priceToKes: 8500, leadTime: "7–10 days" },
      { title: "Event co-ord", category: "Occasion", priceFromKes: 9500, priceToKes: 18000, leadTime: "10–14 days" },
    ],
    isDemo: true,
  },
  {
    id: 2,
    slug: "circle-eight-thrift",
    name: "Circle Eight Thrift",
    type: "thrift",
    city: "Nairobi",
    county: "Nairobi",
    neighbourhood: "Ngara",
    locationText: "Ngara, Nairobi",
    description: "A sharp-eyed thrift edit for denim, outerwear, and well-worn pieces with a second life worth styling.",
    pointOfView: "High/low outfit building that lets one outstanding find set the direction.",
    priceFloorKes: 900,
    priceCeilingKes: 6800,
    budgetTier: "considered",
    aestheticTags: ["Thrift Remix", "Comfort Official", "Soft Power"],
    lifestyleTags: ["Everyday", "Creative Work", "Campus"],
    portfolio: [ASSET_URLS.street, ASSET_URLS.portrait],
    socialHandle: "@circleeight.demo",
    socialUrl: "https://instagram.com",
    services: [
      { title: "Denim & trouser edit", category: "Thrift", priceFromKes: 900, priceToKes: 2800, leadTime: "Same day" },
      { title: "Outerwear edit", category: "Thrift", priceFromKes: 1800, priceToKes: 5200, leadTime: "Same day" },
      { title: "One-hour sourcing appointment", category: "Styling", priceFromKes: 1500, priceToKes: 1500, leadTime: "Book ahead" },
    ],
    isDemo: true,
  },
  {
    id: 3,
    slug: "northline-makers",
    name: "Northline Makers",
    type: "home_studio",
    city: "Nairobi",
    county: "Nairobi",
    neighbourhood: "Westlands",
    locationText: "Westlands, Nairobi",
    description: "A small-space home studio making layered storage, soft furnishings, and objects that work hard without looking busy.",
    pointOfView: "Warm timber, tactile textiles, and a clear place for everything.",
    priceFloorKes: 2200,
    priceCeilingKes: 26000,
    budgetTier: "signature",
    aestheticTags: ["Heritage Modern", "Soft Power", "Coastal Ease"],
    lifestyleTags: ["Home Refresh", "Hosting", "New Move"],
    portfolio: [ASSET_URLS.home, ASSET_URLS.street],
    socialHandle: "@northline.demo",
    socialUrl: "https://instagram.com",
    services: [
      { title: "Cushion pairing", category: "Home", priceFromKes: 2200, priceToKes: 4800, leadTime: "3–5 days" },
      { title: "Entryway storage piece", category: "Home", priceFromKes: 9000, priceToKes: 16000, leadTime: "10–14 days" },
      { title: "One-room direction session", category: "Consultation", priceFromKes: 3500, priceToKes: 3500, leadTime: "Book ahead" },
    ],
    isDemo: true,
  },
  {
    id: 4,
    slug: "kanga-matter-studio",
    name: "Kanga Matter Studio",
    type: "tailor",
    city: "Mombasa",
    county: "Mombasa",
    neighbourhood: "Old Town",
    locationText: "Old Town, Mombasa",
    description: "A colour-rich studio with light layers, hand-finished touches, and a celebratory sense of proportion.",
    pointOfView: "Ease first: pieces that move through a warm day and still arrive with presence.",
    priceFloorKes: 2800,
    priceCeilingKes: 15500,
    budgetTier: "signature",
    aestheticTags: ["Coastal Ease", "Heritage Modern", "Soft Power"],
    lifestyleTags: ["Celebration", "Everyday", "Creative Work"],
    portfolio: [ASSET_URLS.portrait, ASSET_URLS.home],
    socialHandle: "@kangamatter.demo",
    socialUrl: "https://instagram.com",
    services: [
      { title: "Lightweight set", category: "Tailoring", priceFromKes: 6800, priceToKes: 11000, leadTime: "7–10 days" },
      { title: "Statement shirt", category: "Tailoring", priceFromKes: 2800, priceToKes: 5200, leadTime: "5–7 days" },
      { title: "Occasion dress", category: "Occasion", priceFromKes: 9500, priceToKes: 15500, leadTime: "10–14 days" },
    ],
    isDemo: true,
  },
  {
    id: 5,
    slug: "kijani-corner",
    name: "Kijani Corner",
    type: "home_studio",
    city: "Kisumu",
    county: "Kisumu",
    neighbourhood: "Milimani",
    locationText: "Milimani, Kisumu",
    description: "A home refresh studio for rooms that balance easy hosting, local craft, and everyday restoration.",
    pointOfView: "Layered, useful objects and natural colour stories without visual noise.",
    priceFloorKes: 1600,
    priceCeilingKes: 22000,
    budgetTier: "considered",
    aestheticTags: ["Heritage Modern", "Coastal Ease", "Soft Power"],
    lifestyleTags: ["Home Refresh", "Hosting", "New Move"],
    portfolio: [ASSET_URLS.home, ASSET_URLS.portrait],
    socialHandle: "@kijanicorner.demo",
    socialUrl: "https://instagram.com",
    services: [
      { title: "Tabletop refresh", category: "Home", priceFromKes: 1600, priceToKes: 4500, leadTime: "3–5 days" },
      { title: "Curtain and fabric plan", category: "Home", priceFromKes: 6500, priceToKes: 12000, leadTime: "7–10 days" },
      { title: "Living room reset", category: "Consultation", priceFromKes: 5000, priceToKes: 22000, leadTime: "10–14 days" },
    ],
    isDemo: true,
  },
  {
    id: 6,
    slug: "line-and-light",
    name: "Line & Light Studio",
    type: "stylist",
    city: "Nairobi",
    county: "Nairobi",
    neighbourhood: "Parklands",
    locationText: "Parklands, Nairobi",
    description: "A personal styling edit for people who want fewer decisions and a wardrobe with more range.",
    pointOfView: "Clear outfit formulas, better repeats, and intentional finishing details.",
    priceFloorKes: 2500,
    priceCeilingKes: 14000,
    budgetTier: "signature",
    aestheticTags: ["Soft Power", "Thrift Remix", "Comfort Official"],
    lifestyleTags: ["Creative Work", "Everyday", "Celebration"],
    portfolio: [ASSET_URLS.street, ASSET_URLS.portrait],
    socialHandle: "@lineandlight.demo",
    socialUrl: "https://instagram.com",
    services: [
      { title: "Wardrobe direction call", category: "Styling", priceFromKes: 2500, priceToKes: 2500, leadTime: "Book ahead" },
      { title: "Outfit plan", category: "Styling", priceFromKes: 4500, priceToKes: 7000, leadTime: "3–5 days" },
      { title: "Guided sourcing day", category: "Styling", priceFromKes: 8500, priceToKes: 14000, leadTime: "Book ahead" },
    ],
    isDemo: true,
  },
  {
    id: 7,
    slug: "soko-mpya-thrift",
    name: "Soko Mpya Thrift",
    type: "thrift",
    city: "Nakuru",
    county: "Nakuru",
    neighbourhood: "CBD",
    locationText: "CBD, Nakuru",
    description: "A curated thrift corner in the heart of Nakuru — denim, basics, and unexpected finds at honest prices.",
    pointOfView: "Budget-first styling that proves good taste does not require a big spend.",
    priceFloorKes: 500,
    priceCeilingKes: 4500,
    budgetTier: "considered",
    aestheticTags: ["Thrift Remix", "Comfort Official"],
    lifestyleTags: ["Campus", "Everyday", "Creative Work"],
    portfolio: [ASSET_URLS.street, ASSET_URLS.home],
    socialHandle: "@sokompya.demo",
    socialUrl: "https://instagram.com",
    services: [
      { title: "Denim & basics edit", category: "Thrift", priceFromKes: 500, priceToKes: 2200, leadTime: "Same day" },
      { title: "Campus outfit bundle", category: "Thrift", priceFromKes: 1500, priceToKes: 3500, leadTime: "Same day" },
      { title: "One-hour style session", category: "Styling", priceFromKes: 800, priceToKes: 800, leadTime: "Book ahead" },
    ],
    isDemo: true,
  },
  {
    id: 8,
    slug: "rift-valley-craft",
    name: "Rift Valley Craft",
    type: "home_studio",
    city: "Nakuru",
    county: "Nakuru",
    neighbourhood: "Panorama",
    locationText: "Panorama, Nakuru",
    description: "Handcrafted home accents and soft furnishings inspired by the Rift Valley landscape and local materials.",
    pointOfView: "Natural textures, warm tones, and objects that connect the home to the land.",
    priceFloorKes: 1200,
    priceCeilingKes: 18000,
    budgetTier: "considered",
    aestheticTags: ["Heritage Modern", "Comfort Official", "Soft Power"],
    lifestyleTags: ["Home Refresh", "New Move", "Hosting"],
    portfolio: [ASSET_URLS.home, ASSET_URLS.portrait],
    socialHandle: "@riftvalleycraft.demo",
    socialUrl: "https://instagram.com",
    services: [
      { title: "Handwoven basket set", category: "Home", priceFromKes: 1200, priceToKes: 3500, leadTime: "3–5 days" },
      { title: "Cushion and throw pair", category: "Home", priceFromKes: 3000, priceToKes: 6500, leadTime: "5–7 days" },
      { title: "Room direction session", category: "Consultation", priceFromKes: 2500, priceToKes: 2500, leadTime: "Book ahead" },
    ],
    isDemo: true,
  },
  {
    id: 9,
    slug: "coast-drip-studio",
    name: "Coast Drip Studio",
    type: "creative",
    city: "Mombasa",
    county: "Mombasa",
    neighbourhood: "Nyali",
    locationText: "Nyali, Mombasa",
    description: "A creative studio blending streetwear sensibility with coastal ease — custom prints, graphic tees, and limited drops.",
    pointOfView: "Visual storytelling through wearable pieces that carry a local message.",
    priceFloorKes: 1800,
    priceCeilingKes: 12000,
    budgetTier: "considered",
    aestheticTags: ["Coastal Ease", "Thrift Remix", "Soft Power"],
    lifestyleTags: ["Everyday", "Celebration", "Creative Work"],
    portfolio: [ASSET_URLS.portrait, ASSET_URLS.street],
    socialHandle: "@coastdrip.demo",
    socialUrl: "https://instagram.com",
    services: [
      { title: "Custom graphic tee", category: "Creative", priceFromKes: 1800, priceToKes: 3500, leadTime: "3–5 days" },
      { title: "Limited print run", category: "Creative", priceFromKes: 5000, priceToKes: 9000, leadTime: "7–10 days" },
      { title: "Brand direction session", category: "Consultation", priceFromKes: 3500, priceToKes: 3500, leadTime: "Book ahead" },
    ],
    isDemo: true,
  },
  {
    id: 10,
    slug: "lake-side-tailors",
    name: "Lake Side Tailors",
    type: "tailor",
    city: "Kisumu",
    county: "Kisumu",
    neighbourhood: "Kondele",
    locationText: "Kondele, Kisumu",
    description: "A neighbourhood tailor known for sharp alterations, custom shirts, and occasion wear with a lakeside confidence.",
    pointOfView: "Precision tailoring that respects fabric, proportion, and the person wearing it.",
    priceFloorKes: 2000,
    priceCeilingKes: 14000,
    budgetTier: "considered",
    aestheticTags: ["Heritage Modern", "Comfort Official", "Soft Power"],
    lifestyleTags: ["Celebration", "Everyday", "Creative Work"],
    portfolio: [ASSET_URLS.portrait, ASSET_URLS.street],
    socialHandle: "@lakesidetailors.demo",
    socialUrl: "https://instagram.com",
    services: [
      { title: "Custom shirt", category: "Tailoring", priceFromKes: 2000, priceToKes: 4000, leadTime: "5–7 days" },
      { title: "Occasion suit", category: "Tailoring", priceFromKes: 8000, priceToKes: 14000, leadTime: "10–14 days" },
      { title: "Alteration service", category: "Tailoring", priceFromKes: 500, priceToKes: 2500, leadTime: "Same day" },
    ],
    isDemo: true,
  },
];

export const demoBuilds: DemoBuild[] = [
  {
    id: 101,
    slug: "the-nairobi-after-five",
    title: "The Nairobi After Five",
    city: "Nairobi",
    county: "Nairobi",
    lifestyle: "Creative Work",
    aesthetic: "Soft Power",
    priority: "Polish",
    totalMinKes: 9400,
    totalMaxKes: 12600,
    headline: "A flexible evening look built around one precise line and one good second-hand find.",
    rationale: "The weight sits in the trouser and finish. The rest is clean enough to repeat with a tee, a shirt, or a light jacket.",
    heroImageUrl: ASSET_URLS.street,
    items: [
      { id: 1001, vendorId: 2, label: "Structured second-hand overshirt", category: "Layer", estimatedCostKes: 2800, note: "Use texture to bring dimension without adding fuss." },
      { id: 1002, vendorId: 1, label: "Wide-leg tailored trouser", category: "Foundation", estimatedCostKes: 5200, note: "A high-repeat silhouette that lifts simple tops." },
      { id: 1003, vendorId: 6, label: "Finishing edit", category: "Styling", estimatedCostKes: 1400, note: "A focused accessory and shoe direction." },
    ],
    isDemo: true,
  },
  {
    id: 102,
    slug: "the-thrift-remix-weekend",
    title: "The Thrift Remix Weekend",
    city: "Nairobi",
    county: "Nairobi",
    lifestyle: "Everyday",
    aesthetic: "Thrift Remix",
    priority: "Value",
    totalMinKes: 5200,
    totalMaxKes: 8200,
    headline: "A playful, low-pressure edit that starts with one unexpected vintage layer.",
    rationale: "The plan keeps most of the spend in pieces with personality, while the styling direction protects the whole look from feeling accidental.",
    heroImageUrl: ASSET_URLS.portrait,
    items: [
      { id: 1004, vendorId: 2, label: "Vintage outerwear find", category: "Statement", estimatedCostKes: 3400, note: "Look for colour, scale, or a strong shoulder." },
      { id: 1005, vendorId: 2, label: "Denim or trouser base", category: "Foundation", estimatedCostKes: 1900, note: "Keep the base grounded and easy to wear." },
      { id: 1006, vendorId: 6, label: "One-hour styling direction", category: "Styling", estimatedCostKes: 1500, note: "Turn the finds into three repeatable outfits." },
    ],
    isDemo: true,
  },
  {
    id: 103,
    slug: "the-one-room-reset",
    title: "The One-Room Reset",
    city: "Nairobi",
    county: "Nairobi",
    lifestyle: "Home Refresh",
    aesthetic: "Heritage Modern",
    priority: "Warmth",
    totalMinKes: 14800,
    totalMaxKes: 21500,
    headline: "A small-space reset with warmth in the right places, not objects everywhere.",
    rationale: "The sequence begins with texture and lighting, then adds one practical storage or surface piece that makes the room easier to live in.",
    heroImageUrl: ASSET_URLS.home,
    items: [
      { id: 1007, vendorId: 3, label: "Textile and cushion pairing", category: "Texture", estimatedCostKes: 4200, note: "A limited palette makes the room feel composed." },
      { id: 1008, vendorId: 3, label: "Entryway or side storage piece", category: "Function", estimatedCostKes: 9800, note: "Choose one object that handles the daily clutter." },
      { id: 1009, vendorId: 3, label: "One-room direction session", category: "Plan", estimatedCostKes: 3500, note: "Decide what belongs before you buy." },
    ],
    isDemo: true,
  },
  {
    id: 104,
    slug: "the-coastal-celebration",
    title: "The Coastal Celebration",
    city: "Mombasa",
    county: "Mombasa",
    lifestyle: "Celebration",
    aesthetic: "Coastal Ease",
    priority: "Presence",
    totalMinKes: 10800,
    totalMaxKes: 16500,
    headline: "A light, celebratory silhouette with colour that carries itself.",
    rationale: "The spend concentrates on one tailored piece with a clear line, while the rest creates movement and finishing texture.",
    heroImageUrl: ASSET_URLS.portrait,
    items: [
      { id: 1010, vendorId: 4, label: "Lightweight tailored set", category: "Foundation", estimatedCostKes: 7800, note: "Let the fabric do the work in warm weather." },
      { id: 1011, vendorId: 4, label: "Statement shirt or wrap", category: "Layer", estimatedCostKes: 3000, note: "A single saturated tone keeps the look memorable." },
      { id: 1012, vendorId: 4, label: "Finishing alteration", category: "Finish", estimatedCostKes: 1200, note: "The last adjustment is what makes the plan feel personal." },
    ],
    isDemo: true,
  },
  {
    id: 105,
    slug: "the-kisumu-hosting-corner",
    title: "The Kisumu Hosting Corner",
    city: "Kisumu",
    county: "Kisumu",
    lifestyle: "Hosting",
    aesthetic: "Heritage Modern",
    priority: "Function",
    totalMinKes: 8700,
    totalMaxKes: 15000,
    headline: "A useful, welcoming corner that can move from weekday pause to an easy gathering.",
    rationale: "The plan gives the room a simple anchor, a textural layer, and a practical surface to work around.",
    heroImageUrl: ASSET_URLS.home,
    items: [
      { id: 1013, vendorId: 5, label: "Tabletop refresh", category: "Layer", estimatedCostKes: 2600, note: "Start with a small moment people naturally gather around." },
      { id: 1014, vendorId: 5, label: "Curtain and fabric plan", category: "Warmth", estimatedCostKes: 6100, note: "Use fabric to shift the room’s atmosphere quickly." },
      { id: 1015, vendorId: 5, label: "Living-room direction session", category: "Plan", estimatedCostKes: 5000, note: "Clarify the order of changes before investing further." },
    ],
    isDemo: true,
  },
  {
    id: 106,
    slug: "the-campus-week-starter",
    title: "The Campus Week Starter",
    city: "Nakuru",
    county: "Nakuru",
    lifestyle: "Campus",
    aesthetic: "Comfort Official",
    priority: "Value",
    totalMinKes: 3200,
    totalMaxKes: 5800,
    headline: "A clean, repeatable campus rotation built on one good base and one smart layer.",
    rationale: "The spend stays low by focusing on pieces that mix with what you already own. Nothing here is a one-use buy.",
    heroImageUrl: ASSET_URLS.portrait,
    items: [
      { id: 1016, vendorId: 7, label: "Denim base pair", category: "Foundation", estimatedCostKes: 1400, note: "A solid denim that repeats with every top you own." },
      { id: 1017, vendorId: 7, label: "Two-piece top rotation", category: "Layer", estimatedCostKes: 1800, note: "One plain, one character — covers the whole week." },
      { id: 1018, vendorId: 7, label: "One-hour campus style session", category: "Styling", estimatedCostKes: 800, note: "Turn five pieces into ten outfit options." },
    ],
    isDemo: true,
  },
  {
    id: 107,
    slug: "the-nakuru-home-soft-reset",
    title: "The Nakuru Home Soft Reset",
    city: "Nakuru",
    county: "Nakuru",
    lifestyle: "Home Refresh",
    aesthetic: "Comfort Official",
    priority: "Warmth",
    totalMinKes: 6500,
    totalMaxKes: 12000,
    headline: "A gentle room refresh using texture, light, and one practical new piece.",
    rationale: "Start with what you can feel — fabric, lighting, surface — and let the room shift before adding anything else.",
    heroImageUrl: ASSET_URLS.home,
    items: [
      { id: 1019, vendorId: 8, label: "Cushion and throw pair", category: "Texture", estimatedCostKes: 3500, note: "Warm tones that shift the room's mood instantly." },
      { id: 1020, vendorId: 8, label: "Woven basket set", category: "Function", estimatedCostKes: 2500, note: "A beautiful way to handle the daily clutter." },
      { id: 1021, vendorId: 8, label: "Room direction session", category: "Plan", estimatedCostKes: 2500, note: "Know what to change next before spending more." },
    ],
    isDemo: true,
  },
  {
    id: 108,
    slug: "the-mombasa-everyday-coastal",
    title: "The Mombasa Everyday Coastal",
    city: "Mombasa",
    county: "Mombasa",
    lifestyle: "Everyday",
    aesthetic: "Coastal Ease",
    priority: "Function",
    totalMinKes: 4800,
    totalMaxKes: 8200,
    headline: "A relaxed everyday kit built for coastal heat — light layers, easy movement, real wear.",
    rationale: "The plan stays light in weight and spend, with one custom piece that makes the whole rotation feel intentional.",
    heroImageUrl: ASSET_URLS.street,
    items: [
      { id: 1022, vendorId: 9, label: "Custom graphic tee", category: "Statement", estimatedCostKes: 2200, note: "One piece with personality anchors the rotation." },
      { id: 1023, vendorId: 2, label: "Lightweight trouser or short", category: "Foundation", estimatedCostKes: 2000, note: "Breathable fabric that works with everything." },
      { id: 1024, vendorId: 9, label: "Brand direction session", category: "Styling", estimatedCostKes: 1500, note: "Define your visual language across the whole wardrobe." },
    ],
    isDemo: true,
  },
  {
    id: 109,
    slug: "the-kisumu-creative-occassion",
    title: "The Kisumu Creative Occasion",
    city: "Kisumu",
    county: "Kisumu",
    lifestyle: "Celebration",
    aesthetic: "Heritage Modern",
    priority: "Presence",
    totalMinKes: 9200,
    totalMaxKes: 15500,
    headline: "A sharp, considered occasion look that carries local craft and modern proportion.",
    rationale: "The spend centres on one well-tailored piece. Everything else supports the line without competing with it.",
    heroImageUrl: ASSET_URLS.portrait,
    items: [
      { id: 1025, vendorId: 10, label: "Custom occasion shirt", category: "Foundation", estimatedCostKes: 3200, note: "A clean collar and proportion that hold the look." },
      { id: 1026, vendorId: 10, label: "Tailored trouser", category: "Foundation", estimatedCostKes: 4500, note: "The silhouette that gives the look its presence." },
      { id: 1027, vendorId: 10, label: "Fitting and finish alteration", category: "Finish", estimatedCostKes: 1500, note: "The last step that makes everything feel like yours." },
    ],
    isDemo: true,
  },
];

const normalize = (value: string) => value.trim().toLowerCase();

export function fuzzyAestheticMatch(customAesthetic: string, tag: string) {
  const customWords = normalize(customAesthetic).split(/\s+/).filter((word) => word.length > 2);
  const tagWords = normalize(tag).split(/\s+/).filter((word) => word.length > 2);
  if (tagWords.some((word) => normalize(customAesthetic).includes(word))) return true;
  if (customWords.length === 0) return false;
  return customWords.some((word) => tagWords.includes(word));
}

export function filterDemoVendors(filters: {
  search?: string;
  city?: string;
  county?: string;
  type?: string;
  budgetTier?: string;
  aesthetic?: string;
}) {
  const search = normalize(filters.search ?? "");
  return demoVendors.filter((vendor) => {
    const matchesSearch = !search || [vendor.name, vendor.description, vendor.neighbourhood, vendor.type]
      .some((field) => normalize(field).includes(search));
    const matchesGeography = !filters.county
      ? !filters.city || filters.city === "All cities" || vendor.city === filters.city
      : filters.county === "All counties" || vendor.county === filters.county;
    const matchesType = !filters.type || filters.type === "All categories" || vendor.type === filters.type;
    const matchesTier = !filters.budgetTier || filters.budgetTier === "All ranges" || vendor.budgetTier === filters.budgetTier;
    const matchesAesthetic = !filters.aesthetic || filters.aesthetic === "All aesthetics"
      || vendor.aestheticTags.some((tag) => tag === filters.aesthetic || fuzzyAestheticMatch(filters.aesthetic!, tag));
    return matchesSearch && matchesGeography && matchesType && matchesTier && matchesAesthetic;
  });
}

export function getVendorBySlug(slug: string) {
  return demoVendors.find((vendor) => vendor.slug === slug);
}

function buildScore(build: DemoBuild, brief: MatchBrief) {
  const cityScore = build.city === brief.city ? 5 : build.county === brief.city ? 3 : 0;
  const lifestyleScore = build.lifestyle === brief.lifestyle ? 4 : 0;
  const aestheticScore = build.aesthetic === brief.aesthetic ? 4 : 0;
  const mixScore = brief.aestheticMix?.includes(build.aesthetic) ? 1.5 : 0;
  const priorityScore = build.priority === brief.priority ? 2 : 0;
  const centre = (build.totalMinKes + build.totalMaxKes) / 2;
  const budgetDistance = Math.abs(centre - brief.budgetKes) / Math.max(brief.budgetKes, 1);
  return cityScore + lifestyleScore + aestheticScore + mixScore + priorityScore - budgetDistance;
}

export function getBuildRecommendation(brief: MatchBrief) {
  const withinBudget = demoBuilds.filter((build) => build.totalMinKes <= brief.budgetKes);
  const candidates = withinBudget.length > 0 ? withinBudget : demoBuilds;
  const build = [...candidates].sort((a, b) => buildScore(b, brief) - buildScore(a, brief))[0] ?? demoBuilds[0];
  const selectedVendors = Array.from(new Set(build.items.map((item) => item.vendorId).filter(Boolean)))
    .map((vendorId) => demoVendors.find((vendor) => vendor.id === vendorId))
    .filter((vendor): vendor is DemoVendor => Boolean(vendor));
  const gap = Math.max(0, build.totalMinKes - brief.budgetKes);
  const mix = Array.from(new Set((brief.aestheticMix ?? []).filter(Boolean))).slice(0, 5);
  return {
    build,
    selectedVendors,
    withinBudget: gap === 0,
    budgetGapKes: gap,
    transparencyNote: gap === 0
      ? `This indicative plan begins at KES ${build.totalMinKes.toLocaleString()} and stays inside your stated spend.`
      : `This is the closest current demonstration plan. It begins KES ${gap.toLocaleString()} above your stated spend, so use it as a direction and trim the first layer before committing.`,
    personalisationNote: mix.length
      ? `Your active direction leads this plan, with ${mix.join(" · ")} held as a wider expression lens. This adjusts the order of relevance, not the demo vendors, prices, or availability.`
      : "Your active direction leads this plan. Save an expression mix to add wider creative cues across future SURA planning.",
  };
}
