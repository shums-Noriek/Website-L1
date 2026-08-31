/**
 * Every string on the landing page.
 *
 * Copy marked `PLACEHOLDER` is not in the Figma file — the design only
 * carries finished copy for the hero, intro, "Who We Are", the Vision
 * band, the two "Edge" cards and the CIVIL & MEP offering. Swap the
 * placeholders when the real content lands.
 */

export const nav = {
  left: [
    { label: "Home", href: "#top" },
    { label: "Services", href: "#offerings" },
    { label: "Portfolio", href: "#projects" },
  ],
  right: [
    { label: "About", href: "#who-we-are" },
    { label: "Our Process", href: "#vision" },
    { label: "Contact Us", href: "#contact" },
  ],
};

export const hero = {
  eyebrow: "The Future of Luxury Living",
  title: "Interiors",
  tagline: "Reimagined, Reinvented & Redefined",
};

export const intro = {
  script: "Luxury",
  heading: ["Interior", "Designers", "in Bangalore"],
  body: "Noriek is a premier luxury interior design and build in Bangalore, creating distinctive, thoughtfully crafted homes for discerning homeowners. From concept to completion, our tech-driven approach brings together exceptional design, meticulous execution, and refined craftsmanship to create interiors that are as enduring as they are beautiful.",
  emphasis: "luxury interior design",
};

export const marquee = [
  { src: "/images/strip-1.webp", alt: "Fluted walnut panelling washed in warm light" },
  { src: "/images/strip-2.webp", alt: "Marble coffee table styled with greenery and ceramics" },
  { src: "/images/strip-3.webp", alt: "Curved bouclé sofa with a woven throw" },
  { src: "/images/strip-4.webp", alt: "Solid walnut dining chairs against sheer curtains" },
  { src: "/images/strip-5.webp", alt: "Potted olive tree against a warm textured plaster wall" },
];

export const whoWeAre = {
  script: "We",
  headingBefore: "Who",
  headingAfter: "Are",
  bodyLead:
    "Noriek brings together international design, technology, structured processes, and meticulous execution to create a more predictable and seamless home-building experience. Noriek exists to bring trust, structure, technology, and accountability to an industry that has traditionally lacked them.",
  bodyTrail:
    "As one of the best emerging Interior Design & Build companies, we blend international design sensibilities with impeccable Indian craftsmanship, creating spaces that are as functional as they are extraordinary.",
  images: {
    topRight: { src: "/images/who-we-are-1.webp", alt: "Dark fluted sideboard and bouclé lounge chair" },
    bottomLeft: { src: "/images/who-we-are-2.webp", alt: "Curved bouclé sofa with a marble coffee table" },
  },
};

export const vision = {
  script: "The",
  heading: "Noriek Vision",
  image: { src: "/images/vision-pavilion-band.webp", alt: "Glass pavilion residence, fully furnished interior visible through the facade" },
  paragraphs: [
    "The interiors industry is largely unorganised and unstructured.",
    "Noriek was not built overnight, nor did it come from an unrelated industry. It is the result of more than a decade of on-ground experience, research, understanding of industry challenges, and deep expertise in interiors.",
    "Noriek exists to bring trust, structure, technology, and accountability to an industry that has traditionally lacked them.",
  ],
};

export const edge = {
  script: "The",
  heading: "Noriek Edge",
  cards: [
    {
      number: "01",
      title: "Inhouse Execution",
      image: { src: "/images/edge-01.webp", alt: "Craftsman assembling bespoke cabinetry in the Noriek workshop" },
      body: "We craft bespoke kitchens and wardrobe systems, combining refined design, premium finishes, and precision manufacturing. Every piece is made to measure and complemented by premium German and Italian hardware and accessories — bringing together exceptional functionality, craftsmanship, and enduring elegance.",
    },
    {
      number: "02",
      title: "Specialist over Generalist",
      image: { src: "/images/edge-02.webp", alt: "Designers reviewing technical drawings and material samples" },
      body: "Noriek brings structure to a fragmented vendor ecosystem. Our 1,500+ skilled execution partner network is carefully vetted for craftsmanship, experience, and specialised expertise.",
    },
  ],
};

export const offerings = {
  script: "Our",
  heading: "Offerings",
  items: [
    {
      number: "01",
      label: "Civil & MEP",
      image: { src: "/images/offering-civil-mep.webp", alt: "Home under construction with exposed MEP services" },
      body: "Build with confidence from the inside out. We manage the critical technical core of your home; structural modifications, precision plumbing, and advanced electrical systems with the same rigour we bring to every finish you see.",
    },
    {
      number: "02",
      label: "Full Home Interiors",
      image: { src: "/images/offering-full-home.webp", alt: "Double-height living room with fireplace, curved sofa and a dining area beyond" },
      body: "From a serene luxury bedroom interior design to expansive living and dining spaces, our comprehensive interior solutions cover design development through final execution, ensuring every corner of your home reflects global elegance tailored for you.",
    },
    {
      number: "03",
      label: "Bespoke Furniture & Furnishing",
      image: { src: "/images/offering-furniture.webp", alt: "Curved cream sectional, walnut coffee table and cognac lounge chairs" },
      body: "Crafted exclusively for you, our custom furnishings seamlessly integrate with your interior vision, offering unparalleled quality, unique designs, and a personalized touch to every room.",
    },
    {
      number: "04",
      label: "Smart Innovations",
      image: { src: "/images/offering-smart.webp", alt: "Bedroom at dusk with a wall-mounted smart-home panel, integrated lighting and AV" },
      body: "Future-proof your living. Our tech suite includes integrated AV systems, architectural & decorative lighting, and smart home automation, blending high-end luxury with effortless functionality.",
    },
    {
      number: "05",
      label: "Styling & Celebration",
      image: { src: "/images/offering-styling.webp", alt: "Candlelit dining table styled for a celebration with florals and full place settings" },
      body: "The final layer of curation that turns a house into a true luxury house interior. We meticulously style your spaces with curated art, textiles, and decor elements, preparing your home to be celebrated, photographed, and lived in from the moment you step inside.",
    },
  ],
};

export const projects = {
  script: "Our",
  heading: "Projects",
  caption: "Build with confidence from the inside out. We manage the critical technical core of your home.",
  items: [
    { name: "Prestige Ferns Residency", image: { src: "/images/project-1.webp", alt: "Dark kitchen with a marble island and cluster of glass pendants" } },
    { name: "Sobha Daffodil", image: { src: "/images/project-2.webp", alt: "Living room with a curved bouclé sofa beside a linear fireplace" } },
    { name: "La Palazzo", image: { src: "/images/project-3.webp", alt: "Bedroom with fluted walnut headboard wall and warm cove lighting" } },
    { name: "Salarpuria Serenity", image: { src: "/images/project-4.webp", alt: "Bright minimal living room with an olive tree and travertine table" } },
  ],
};

export const cta = {
  heading: "Ready to transform your space?",
  button: "Book a private consultation",
  href: "#contact",
  image: { src: "/images/cta-band.webp", alt: "Sunlit contemporary living room with an olive tree and low walnut console" },
};

export const footer = {
  address: [
    "#111, 2nd Floor, 27th Main Road, near NIFT College,",
    "Sector 2, HSR Layout, Bengaluru, Karnataka 560102",
  ],
  columns: [
    {
      title: "Company",
      links: [
        { label: "Services", href: "#offerings" },
        { label: "Portfolio", href: "#projects" },
        { label: "About Us", href: "#who-we-are" },
      ],
    },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/noriek_living/", icon: "instagram" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61593216907715", icon: "facebook" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/noriek-living", icon: "linkedin" },
  ],
  legal: "© 2026 APS Dezigns Pvt Ltd. All rights reserved.",
};
