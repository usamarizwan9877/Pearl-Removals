/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — Pearl Removals homepage copy.
 *  Brand: midnight navy · pearl white · seafoam · champagne gold.
 *  Tagline: "Move well. Arrive happy."
 *
 *  ⚠ PLACEHOLDERS: every value in `contact` (and anything marked
 *  TODO) must be replaced with Pearl Removals' real details
 *  before the site goes live.
 * ─────────────────────────────────────────────────────────────
 */
import heroRoom from "@/public/images/hero-room.jpg";
import roomBoxes from "@/public/images/room-boxes.jpg";
import packingBox from "@/public/images/packing-box.jpg";
import lutonVan from "@/public/images/luton-van.jpg";
import lutonVanRear from "@/public/images/luton-van-rear.jpg";
import panelVan from "@/public/images/panel-van.jpg";
import brandKit from "@/public/images/brand-kit.jpg";
import businessCards from "@/public/images/business-cards.jpg";

export type Title = { pre?: string; gold: string; post?: string; breakBeforeGold?: boolean };
export type Link = { label: string; href: string };

export const brand = { name: "Pearl Removals", tagline: "Move well. Arrive happy." };

/* TODO: replace with Pearl Removals' real contact details */
export const contact = {
  phoneDisplay: "[Phone number]",
  phoneHref: "/#quote",
  whatsappHref: "/#quote",
  email: "[Email address]",
  address: "[Business address]",
  hours: "[Opening hours]",
  facebook: "/#",
  instagram: "/#",
};

export const seo = {
  title: "Pearl Removals | Move well. Arrive happy.",
  description:
    "Calm, careful home removals, business moves and packing support from Pearl Removals. Plan your move and get a tailored quote.",
  url: "https://usamarizwan9877.github.io/Pearl-Removals", // TODO: real domain
};

/* ── Navigation (single-page anchors) ────────────────────── */
export type NavItem = Link & { children?: (Link & { icon: string })[] };
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Our Services",
    href: "/#services",
    children: [
      { label: "Home Removals", href: "/#services", icon: "home" },
      { label: "Business Moves", href: "/#services", icon: "building" },
      { label: "Packing Support", href: "/#services", icon: "package" },
      { label: "Get a Quote", href: "/#quote", icon: "receipt" },
    ],
  },
  { label: "Moving Guide", href: "/#process" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#quote" },
];
export const headerCta: Link = { label: "Plan Your Move", href: "/#quote" };

/* ── Hero ────────────────────────────────────────────────── */
export const hero = {
  eyebrow: "Move well. Arrive happy.",
  lines: ["A new chapter", "starts with a", "smooth move."],
  body: "From the first box to the final room, Pearl Removals plans and handles your move with quiet care — so you can look forward to what comes next.",
  cta: { label: "Plan Your Move", href: "/#quote" },
  secondary: { label: "Our Services", href: "/#services" },
  image: { src: heroRoom, alt: "Bright living room with Pearl Removals boxes ready for moving day" },
  strip: [
    { title: "Home Removals", icon: "home", href: "/#services" },
    { title: "Business Moves", icon: "building", href: "/#services" },
    { title: "Packing Support", icon: "package", href: "/#services" },
  ],
};

export const trustBar = [
  { title: "Careful Handling", text: "Wrapped, protected, placed" },
  { title: "Clear Quotes", text: "Tailored to your move" },
  { title: "Planned Properly", text: "A move plan you can trust" },
  { title: "Friendly Team", text: "Uniformed & courteous" },
];

/* ── Services ────────────────────────────────────────────── */
export const services = {
  eyebrow: "Our Services",
  title: { pre: "Moves made ", gold: "calm & simple" } as Title,
  intro: "Whether it's your family home, your workplace or simply the packing, every Pearl move is planned around you and handled with the same quiet care.",
  cta: "Get a Quote",
  viewAll: { label: "Plan Your Move", href: "/#quote" },
  items: [
    {
      title: "Home Removals",
      text: "Flats, houses and family homes moved with care — furniture wrapped, rooms labelled and everything placed exactly where you want it.",
      href: "/#quote",
      img: { src: roomBoxes, alt: "Packed Pearl Removals boxes in a bright new home" },
      icon: "home",
    },
    {
      title: "Business Moves",
      text: "Office and commercial relocations planned around your working day, keeping disruption low and your team ready to work.",
      href: "/#quote",
      img: { src: panelVan, alt: "Pearl Removals branded van outside a modern office" },
      icon: "building",
    },
    {
      title: "Packing Support",
      text: "Professional packing with quality materials — room by room, clearly labelled and ready for the road.",
      href: "/#quote",
      img: { src: packingBox, alt: "Box sealed with Pearl Removals branded tape" },
      icon: "package",
    },
  ],
};

/* ── About ───────────────────────────────────────────────── */
export const about = {
  eyebrow: "About Pearl Removals",
  title: { pre: "Look for the pearl — ", gold: "it means you're in good hands", breakBeforeGold: true } as Title,
  body: "At Pearl Removals we believe moving should feel calm, not chaotic. Our uniformed team arrives prepared, wraps and protects your belongings properly, and keeps you informed from the first quote to the final box. Every van, every piece of tape and every member of the team carries the same promise: move well, arrive happy.",
  cta: { label: "Plan Your Move", href: "/#quote" },
  img: { src: brandKit, alt: "Pearl Removals uniforms, stationery, blankets and packaging" },
  badge: { title: "Uniformed team", text: "Recognisable & professional" },
};

/* ── Why choose us ───────────────────────────────────────── */
export const why = {
  eyebrow: "Why Pearl",
  title: { pre: "The calm way to ", gold: "move", post: " home or business" } as Title,
  intro: "Considered planning, careful hands and clear communication — the small details that make a big day feel easy.",
  items: [
    { title: "Careful Handling", icon: "shield", text: "Furniture blankets, wrapping and padding as standard, so your belongings arrive just as they left." },
    { title: "Clear, Tailored Quotes", icon: "receipt", text: "Tell us about your move and we'll come back with a quote built around exactly what you need." },
    { title: "Planned Properly", icon: "calendar", text: "A clear move plan with timings agreed in advance, so you always know what happens next." },
    { title: "Friendly, Uniformed Team", icon: "home", text: "Courteous, recognisable movers who treat your home or workplace with respect." },
    { title: "Packing Made Easy", icon: "package", text: "From a few fragile items to a full house, we can pack, label and unpack for you." },
    { title: "Home & Business", icon: "building", text: "One trusted team for family homes, flats, offices and commercial premises." },
  ],
};

/* ── Process ─────────────────────────────────────────────── */
export const process = {
  eyebrow: "Moving Guide",
  title: { pre: "A simple, ", gold: "assured", post: " process" } as Title,
  intro: "Three clear steps from first enquiry to the moment you settle in.",
  steps: [
    { title: "Get a Quote", text: "Tell us where you're moving from and to, your preferred date and what's coming with you. We'll prepare a tailored quote." },
    { title: "Plan Your Move", text: "We agree timings, packing and any special items with you, so moving day runs to a clear, calm plan." },
    { title: "Settle In", text: "We move, unload and place everything room by room — then leave you to enjoy your new chapter." },
  ],
};

/* ── What's included ─────────────────────────────────────── */
export const included = {
  title: { pre: "Everything taken care of, ", gold: "box by box", breakBeforeGold: true } as Title,
  body: "Every Pearl move includes careful loading and unloading, protective wrapping for furniture, secure transport and a friendly team who place everything where you want it. Add professional packing, dismantling and reassembly whenever you need a little more help.",
};

/* ── Fleet / brand ───────────────────────────────────────── */
export const fleet = {
  eyebrow: "On the road",
  title: { pre: "Spot the pearl, ", gold: "know you're in safe hands" } as Title,
  intro: "From the vans on your street to the tape on your boxes, everything carries the same calm promise — so you always know who's looking after your belongings.",
  /* Showcase tabs — the first image of each is the large view */
  tabs: [
    {
      key: "luton", label: "Luton vans", short: "For full home moves", icon: "truck",
      text: "Spacious Luton vans for houses and larger moves — loaded carefully, strapped securely and wrapped in pearl-white and midnight-navy livery.",
      points: ["Room for a full home", "Blankets & straps on board", "Clean, well-kept fleet"],
      img: { src: lutonVan, alt: "Pearl Removals Luton van outside a period townhouse" },
    },
    {
      key: "van", label: "Compact vans", short: "For flats, offices & smaller moves", icon: "building",
      text: "Nimble panel vans for flats, single items and business moves — easy to park, quick to load and just as carefully handled.",
      points: ["Ideal for city streets", "Great for office moves", "Same careful team"],
      img: { src: panelVan, alt: "Pearl Removals panel van outside a modern building" },
    },
    {
      key: "kit", label: "Our kit", short: "Uniforms, blankets & packaging", icon: "package",
      text: "Uniformed movers, branded blankets, quality boxes and Pearl tape — the small details that keep your belongings protected and your move organised.",
      points: ["Uniformed, recognisable team", "Quality packing materials", "Clearly labelled boxes"],
      img: { src: brandKit, alt: "Pearl Removals uniforms, blankets, stationery and packaging" },
    },
  ],
  /* Scrolling brand strip */
  strip: [
    { src: lutonVanRear, alt: "Rear doors of a Pearl Removals van reading Move well. Arrive happy.", caption: "Move well. Arrive happy." },
    { src: packingBox, alt: "Box sealed with Pearl Removals branded tape", caption: "Sealed with care" },
    { src: businessCards, alt: "Pearl Removals business cards", caption: "Your moving consultant" },
    { src: roomBoxes, alt: "Pearl Removals boxes in a bright new home", caption: "Settled in" },
  ],
};

/* ── Areas we serve ──────────────────────────────────────
 * TODO: TEMPORARY — copied from the Royals Removals areas until
 * Pearl Removals confirms its base and the areas it covers.
 * The first item is the hub at the centre of the map. To add an
 * area, also give it a map position in AreasSection.tsx (SPOTS).
 */
export const areas = {
  eyebrow: "Coverage",
  title: { pre: "Areas We ", gold: "Serve" } as Title,
  intro: "We cover Birmingham and the surrounding towns and cities across the West Midlands, bringing the same calm, careful service wherever you're moving.",
  items: [
    ["Birmingham", "birmingham"], ["Dudley", "dudley"], ["Sandwell", "sandwell"], ["Walsall", "walsall"],
    ["Wolverhampton", "wolverhampton"], ["Solihull", "solihull"], ["Coventry", "coventry"], ["Lichfield", "lichfield"],
    ["Redditch", "redditch"], ["Bromsgrove", "bromsgrove"], ["Wythall", "wythall"], ["Walmley", "walmley"],
    ["Four Oaks", "four-oaks"], ["Hollywood", "hollywood"], ["Boldmere", "boldmere"], ["Barnt Green", "barnt-green"],
    ["Droitwich Spa", "droitwich-spa"], ["Alcester", "alcester"], ["Tamworth", "tamworth"], ["Cannock", "cannock"],
    ["Royal Leamington Spa", "royal-leamington-spa"], ["Nuneaton", "nuneaton"],
  ].map(([label, slug]) => ({ label, slug, href: "/#quote" })),
  viewAll: { label: "Not listed? Ask us", href: "/#quote" },
};

/* ── Quote ───────────────────────────────────────────────── */
export const quote = {
  eyebrow: "Get a Quote",
  title: { pre: "Tell us about ", gold: "your move" } as Title,
  intro: "Three quick steps — about two minutes — and we'll come back with a quote tailored to your move.",
  promises: [
    { icon: "receipt", title: "No obligation", text: "A clear, tailored quote — no pressure to book." },
    { icon: "calendar", title: "Planned around you", text: "Dates, timings and extras agreed up front." },
    { icon: "shield", title: "Careful from day one", text: "Wrapping and protection included as standard." },
  ],
  wizard: [
    { label: "Your move", hint: "Where and when" },
    { label: "Your home", hint: "Size and extras" },
    { label: "Your details", hint: "How we reach you" },
  ],
  types: [
    { value: "Home removal", icon: "home" },
    { value: "Business move", icon: "building" },
    { value: "Packing support", icon: "package" },
    { value: "Not sure yet", icon: "pearl" },
  ],
  sizes: ["Studio / 1 bed", "2 bedrooms", "3 bedrooms", "4+ bedrooms", "Small office", "Larger premises"],
  extras: ["Packing service", "Dismantling & reassembly", "Fragile or special items", "Help unpacking"],
  fields: {
    from: "Moving from (postcode)",
    to: "Moving to (postcode)",
    date: "Preferred move date",
    flexible: "My dates are flexible",
    type: "Type of move",
    size: "Size of move",
    extras: "Anything extra? (optional)",
    name: "Your name",
    phone: "Phone number",
    email: "Email address",
    contact: "Best way to reach you",
    notes: "Anything we should know? (optional)",
  },
  contactPrefs: ["Phone", "Email", "Either"],
  next: "Continue",
  back: "Back",
  submit: "Get My Quote",
  review: "Your move at a glance",
  successTitle: "Thank you — your request is in.",
  success: "We'll be in touch with your tailored quote soon.",
  privacy: "Your details are only used to prepare your quote.",
  steps: ["Get a quote", "Plan your move", "Settle in"],
};

/* ── FAQ ─────────────────────────────────────────────────── */
export const faq = {
  eyebrow: "Questions",
  title: { pre: "Frequently Asked ", gold: "Questions" } as Title,
  items: [
    { q: "How do I get a quote?", a: "Use the quote form on this page — tell us where you're moving from and to, your preferred date and the type of move. We'll get back to you with a quote tailored to your move." },
    { q: "Do you move both homes and businesses?", a: "Yes. We handle flats, houses and family homes as well as office and commercial relocations, planned around your timings." },
    { q: "Can you pack everything for me?", a: "Absolutely. Our packing support ranges from a few fragile items to a full home, using quality materials with every box clearly labelled by room." },
    { q: "How far in advance should I book?", a: "As early as you can, especially for weekends and month-ends — but get in touch whatever your timeline and we'll do our best to help." },
    { q: "What happens on moving day?", a: "Our uniformed team arrives at the agreed time, protects your furniture and floors, loads carefully, and unloads and places everything room by room at your new home." },
    { q: "Can you dismantle and reassemble furniture?", a: "Yes — let us know when you request your quote and we'll include dismantling and reassembly in your move plan." },
  ],
};

/* ── Final CTA ───────────────────────────────────────────── */
export const finalCta = {
  title: { pre: "Move well. ", gold: "Arrive happy." } as Title,
  body: "Your new chapter deserves a calm start. Tell us about your move and we'll plan the rest together.",
  cta: { label: "Get a Quote", href: "/#quote" },
  img: { src: lutonVan, alt: "Pearl Removals van ready for moving day" },
};

/* ── Footer ──────────────────────────────────────────────── */
export const footer = {
  tagline: "Calm, careful removals for homes and businesses. Move well. Arrive happy.",
  services: [
    { label: "Home Removals", href: "/#services" },
    { label: "Business Moves", href: "/#services" },
    { label: "Packing Support", href: "/#services" },
    { label: "Get a Quote", href: "/#quote" },
  ],
  company: [
    { label: "About Us", href: "/#about" },
    { label: "Moving Guide", href: "/#process" },
    { label: "Areas We Serve", href: "/#areas" },
    { label: "FAQs", href: "/#faqs" },
    { label: "Contact", href: "/#quote" },
  ],
  quote: { label: "Plan Your Move", href: "/#quote" },
  copyright: "© 2026 Pearl Removals. All rights reserved.",
  legal: [
    { label: "Privacy Policy", href: "/#" },
    { label: "Terms & Conditions", href: "/#" },
  ],
};
