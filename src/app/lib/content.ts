import { PHOTO } from "./images";

export const STATS = [
  {
    label: "22+ years",
    body: "Operating since 2000 with owner led manufacturing experience.",
  },
  {
    label: "100+ customers",
    body: "Apparel collections created for brands, retailers, organizations, and communities across a wide range of styles and occasions.",
  },
  {
    label: "100% success rate",
    body: "Daily production checks and 100% inspection before shipped goods leave the floor.",
  },
  {
    label: "Sustainability badge",
    body: "Ethical factories, sustainable materials, and eco friendly packaging options.",
  },
];

export const PROCESS = [
  {
    id: "consultation",
    title: "Communication",
    body: "Customers and NK staff stay fully aligned on product requirements, specifications, quantities, target pricing, and preferred shipping methods, with 24/7 support throughout the process.",
  },
  {
    id: "sampling",
    title: "Quote & proto sample",
    body: "Pricing is built around quantity and shipping method, then proto samples are produced from the approved details.",
  },
  {
    id: "inspection",
    title: "First run approval & QC",
    body: "First run production samples are sent for approval, then NK checks the work from fabric through final shipment.",
  },
  {
    id: "production",
    title: "Purchase order & production",
    body: "Following approval and receipt of the purchase order, production begins with daily communication and progress updates through final delivery.",
  },
  {
    id: "delivery",
    title: "Delivery",
    body: "Ocean or air freight, U.S. customs, and local transportation are coordinated without extra NK markup.",
  },
];

export const CAPABILITIES = [
  {
    id: "design",
    eyebrow: "Design",
    title: "Design & Prototyping",
    summary:
      "Detailed communication, quoting, fabric selection, proto samples, and first run approvals before bulk production.",
    points: [
      "Specs, quantity, and shipment mode reviewed before quoting",
      "Proto samples produced from customer provided details",
      "First run production samples sent before full production",
      "Custom fabric development available when required",
    ],
    photo: PHOTO.cuttingFabric,
  },
  {
    id: "manufacturing",
    eyebrow: "Factory",
    title: "Manufacturing & Customization",
    summary:
      "Cut and sew, uniforms, tees, shirts, pants, belts, socks, chef coats, aprons, shorts, overalls, private labels, and custom ranges.",
    points: [
      "Uniforms in knitted or woven fabrics, from jackets to undergarments",
      "Tee shirts, polos, dress shirts, uniform shirts, pants, and shorts",
      "Belts, socks, chef coats, aprons, overalls, and accessories",
      "100% customized private label and merchant based lines",
    ],
    photo: PHOTO.embroidery,
  },
  {
    id: "logistics",
    eyebrow: "Logistics",
    title: "Logistics & Quality Assurance",
    summary:
      "Ocean and air freight, customs support, local transport, zero markup logistics, daily inspections, and Maximum Quality Control.",
    points: [
      "Competitive ocean and air freight arranged through close provider relationships",
      "U.S. customs and local transportation coordinated door to door",
      "No extra NK charge for logistics support",
      "100% inspection rather than small random end checks",
    ],
    photo: PHOTO.fabricWarehouse,
  },
  {
    id: "sustainability",
    eyebrow: "Ethics",
    title: "Sustainability & Ethics",
    summary:
      "Sustainable materials, ethical factories, careful packaging, and shipping designed to protect the finished goods.",
    points: [
      "High grade polyester, sustainable crops, and custom fabric sourcing",
      "Factories selected for ethical practices and waste reduction",
      "Eco friendly packaging materials where appropriate",
      "Shipping planned to minimize delays and protect product quality",
    ],
    photo: "/old-site/cotton-field.jpg",
  },
];

export type ProductGroup = "denim" | "non-denim";

export type ProductItem = {
  id: string;
  name: string;
  group: ProductGroup;
  category: string;
  photo: string;
  blurb: string;
  madeFrom: string;
  detail: string;
  finish: string;
  customization: string;
  featured?: boolean;
};

export const PRODUCTS: ProductItem[] = [
  {
    id: "uniforms",
    name: "Customized Uniforms",
    group: "non-denim",
    category: "uniforms",
    photo: "/old-site/uniform-vest.jpg",
    blurb: "",
    madeFrom: "Cotton/poly twill, poplin, pique, fleece, or buyer specified fabric.",
    detail: "Built around approved samples, size sets, trims, labels, and packaging requirements.",
    finish: "Embroidery, screen print, woven labels, patches, or clean institutional finishing.",
    customization: "Color, fit, logo placement, pocketing, trims, care labels, and packing.",
  },
  {
    id: "trail-life-uniforms",
    name: "Trail Life customized uniforms",
    group: "non-denim",
    category: "uniforms",
    photo: "/old-site/trail-life-uniform-shirt.jpg",
    blurb: "A real product line example from NK's long running uniform work.",
    madeFrom: "Uniform ready woven and knit fabrics selected by use case and durability needs.",
    detail: "Repeat production with consistent sizing, trims, and brand presentation.",
    finish: "Custom decoration, reinforced seams, and buyer approved garment presentation.",
    customization: "Badges, labels, colors, measurements, packaging, and replenishment runs.",
    featured: true,
  },
  {
    id: "tees-polos",
    name: "Custom Polos",
    group: "non-denim",
    category: "knitwear",
    photo: "/old-site/nk-polos-rack.jpg",
    blurb: "Custom polos and branded knit collections from NK's live product gallery.",
    madeFrom: "Cotton jersey, cotton/poly blends, pique, interlock, or performance knits.",
    detail: "Cut and sew knitwear with neck rib, sleeve options, plackets, and custom sizing.",
    finish: "Screen print, embroidery, heat transfer, wash treatments, or soft retail finishing.",
    customization: "Fabric weight, collar, sleeve, logo method, neck label, hangtag, and polybag.",
    featured: true,
  },
  {
    id: "taco-bell-tee",
    name: "Taco Bell's Tee",
    group: "non-denim",
    category: "knitwear",
    photo: PHOTO.crewShirt,
    blurb: "Branded tee work shown in NK's live product gallery.",
    madeFrom: "Soft cotton or cotton/poly jersey selected for print clarity and hand feel.",
    detail: "Branded knit work with buyer artwork, approved fit, and repeatable sizing.",
    finish: "Screen print or transfer decoration with retail ready folding and packing.",
    customization: "Artwork placement, neck label, size run, fabric color, and packaging.",
  },
  {
    id: "full-sleeves-tee",
    name: "Customized Full Sleeves Tee",
    group: "non-denim",
    category: "knitwear",
    photo: "/old-site/full-sleeves-tee.jpg",
    blurb: "Long sleeve branded tee from NK's original product gallery.",
    madeFrom: "Soft cotton jersey selected for drape, print clarity, and everyday wear.",
    detail: "Full sleeve knit construction with rib collar, approved fit, and repeat sizing.",
    finish: "Screen print and transfer artwork with retail ready folding and packing.",
    customization: "Artwork, sleeve length, neck label, fabric color, size run, and packaging.",
  },
  {
    id: "sleeves-tee",
    name: "Customized Sleeves Tee",
    group: "non-denim",
    category: "knitwear",
    photo: "/old-site/sleeves-tee.jpg",
    blurb: "Customized crew tee shown front and back in NK's product gallery.",
    madeFrom: "Cotton or cotton/poly jersey tuned for a soft hand feel.",
    detail: "Crew neck tee with buyer artwork placements and consistent grading.",
    finish: "Front and back print placements with soft garment wash options.",
    customization: "Print method, placement, neck label, colors, and size scale.",
  },
  {
    id: "red-casual-shirt",
    name: "Red Premium Casual Shirt",
    group: "non-denim",
    category: "wovens",
    photo: "/old-site/nk-red-shirt.jpg",
    blurb: "NK made premium casual shirt in red, from the original product line.",
    madeFrom: "Yarn dyed cotton twill with a soft brushed hand.",
    detail: "Button down collar, front pocket, and single button cuffs to approved specs.",
    finish: "Garment wash and pressing for a retail ready presentation.",
    customization: "Color, buttons, collar, cuff, labels, and packaging.",
  },
  {
    id: "black-casual-shirt",
    name: "Black Premium Casual Shirt",
    group: "non-denim",
    category: "wovens",
    photo: "/old-site/nk-black-shirt.jpg",
    blurb: "NK made premium casual shirt in black with the branded NK neck label.",
    madeFrom: "Cotton twill built for structure and everyday durability.",
    detail: "Button down collar, chest pocket, and clean topstitch detailing.",
    finish: "Soft wash, pressing, and folded retail presentation.",
    customization: "Colorways, buttons, pocket, labels, hangtags, and folding.",
  },
  {
    id: "outerwear",
    name: "Outerwear",
    group: "non-denim",
    category: "outerwear",
    photo: PHOTO.hoodieStairs,
    blurb: "Hoodies, jackets, and layered streetwear pieces.",
    madeFrom: "Fleece, French terry, softshell, woven shell fabric, or padded constructions.",
    detail: "Hoods, zippers, drawcords, rib trims, pockets, lining, and paneling to spec.",
    finish: "Embroidery, patches, screen print, garment wash, or structured outerwear finishing.",
    customization: "Weight, lining, closure, pocketing, trims, decoration, and packing.",
    featured: true,
  },
  {
    id: "pants-jeans",
    name: "Denim Pants Collection",
    group: "denim",
    category: "bottoms",
    photo: "/product-pdfs/denim-authentic-meteorite.webp",
    blurb: "Straight, easy, and authentic fit denim pants from the client denim capsule.",
    madeFrom: "99% cotton / 1% elastane denim for comfort, durability, and everyday wear.",
    detail: "Includes straight pants, easy pants, and authentic fit silhouettes with scalable production specs.",
    finish: "Meteonite, Van Horn, DK Manning, Sky Captain, Dwight Wash, Blue Van Horn, and Marin wash directions.",
    customization: "Fit block, wash shade, hardware, topstitching, pocketing, patches, labels, and packing.",
    featured: true,
  },
  {
    id: "denim-jackets",
    name: "Straight Fit Denim",
    group: "denim",
    category: "bottoms",
    photo: "/product-pdfs/denim-straight-sky-captain.webp",
    blurb: "A cleaner denim fit family for modern retail and uniform adjacent ranges.",
    madeFrom: "99% cotton / 1% elastane denim, including F-WVN-1942 and LTM-11083-BKOD style directions.",
    detail: "Straight leg construction with approved measurements, five pocket details, and buyer fit standards.",
    finish: "Black, meteorite, and refined vintage wash effects for a commercially versatile denim look.",
    customization: "Rise, inseam, leg opening, wash effect, thread color, rivets, trims, labels, and carton plan.",
    featured: true,
  },
  {
    id: "denim-cargo",
    name: "Authentic & Easy Fit Denim",
    group: "denim",
    category: "bottoms",
    photo: "/product-pdfs/denim-easy-dk-manning.webp",
    blurb: "Relaxed denim silhouettes with seasonal wash depth and buyer ready comfort.",
    madeFrom: "99% cotton / 1% elastane denim across F-WVN-1914 and F-WVN-1916 style directions.",
    detail: "Authentic and easy fit pants with relaxed silhouettes, pocketing, belt loops, and approved grading.",
    finish: "Washed black, indigo, Van Horn, and subtle distressed effects for street inspired styling.",
    customization: "Silhouette, pocket map, wash standard, trims, rivets, labels, hangtags, and size range.",
  },
  {
    id: "shorts",
    name: "Chino Shorts",
    group: "non-denim",
    category: "bottoms",
    photo: "/product-pdfs/non-denim-hemp-short.webp",
    blurb: "Men's chino shorts from the non denim capsule, covering hemp, ripstop, canvas, and stretch twill.",
    madeFrom: "80% cotton / 20% hemp twill; 100% cotton ripstop or canvas; 98% cotton / 2% elastane twill.",
    detail: "Documented twill, ripstop, and canvas constructions with GSM ranges around 185 to 390.",
    finish: "Beige, black, camel, olive, pale khaki, and navy color directions from the PDF range.",
    customization: "Inseam, waistband, pocketing, fabric weight, stretch level, labels, and packing.",
  },
  {
    id: "chino-pants",
    name: "Chino Pants",
    group: "non-denim",
    category: "bottoms",
    photo: "/product-pdfs/non-denim-chino-ombre.webp",
    blurb: "Formal, jogger, and straight fit chinos from the non denim range.",
    madeFrom: "98% cotton / 2% elastane twill, stretch poly blends, matt weave, and herringbone.",
    detail: "Includes twill, cavalry twill, herringbone, 2/2 matt weave, and stretch constructions by style.",
    finish: "Sand, olive, ombre blue, silver birch, sea green, black, cognac, wet stone, khaki, and navy.",
    customization: "Fit, pocketing, waistband, stretch, weave, color, GSM target, trims, labels, and folding.",
    featured: true,
  },
  {
    id: "denim-pants",
    name: "Denim Pants",
    group: "denim",
    category: "bottoms",
    photo: "/old-site/denim-pants.jpg",
    blurb: "Denim pants photographed on NK's own production floor.",
    madeFrom: "Cotton denim with heavy stitch detailing and shaped pockets.",
    detail: "Live factory shot from the original NK product gallery.",
    finish: "Deep indigo and washed effects applied in line during production.",
    customization: "Wash, pocket shape, stitch color, rivets, labels, and packing.",
  },
  {
    id: "casual-everyday-pants",
    name: "Casual Everyday Pants",
    group: "non-denim",
    category: "bottoms",
    photo: "/old-site/casual-everyday-pants.jpg",
    blurb: "Knit everyday pants shown in NK's original color range.",
    madeFrom: "Combed cotton and cotton/poly knit with striped rib waistbands.",
    detail: "Pull on knit construction across red, grey, cream, navy, and white.",
    finish: "Knit in waistband stripes with a soft washed hand feel.",
    customization: "Waistband stripe, colorway, rib depth, labels, and packing.",
  },
  {
    id: "chef-coats-aprons",
    name: "Chef Coats & Aprons",
    group: "non-denim",
    category: "uniforms",
    photo: PHOTO.chefApron,
    blurb: "Chef coats and aprons built in fabrics selected for service environments.",
    madeFrom: "Cotton/poly twill, canvas, duck, drill, or washable service weight fabrics.",
    detail: "Adjustable ties, pockets, reinforced corners, button closure, and service ready fit.",
    finish: "Embroidery, stain resistant finish, clean pressing, and bulk ready packaging.",
    customization: "Pocket count, tie length, logo, color blocking, labels, and size run.",
  },
  {
    id: "socks",
    name: "Socks",
    group: "non-denim",
    category: "accessories",
    photo: PHOTO.foldedShirts,
    blurb: "Socks and soft accessories sourced to match each collection.",
    madeFrom: "Cotton, polyester, nylon, spandex, terry, or performance yarn blends.",
    detail: "Crew, ankle, compression, rib, cushion, and jacquard options by collection need.",
    finish: "Knit in artwork, embroidery, banding, hangtag, or retail ready pair packing.",
    customization: "Yarn blend, height, cushioning, logo method, packaging, and size scale.",
  },
  {
    id: "belts-accessories",
    name: "TL Belts & Accessories",
    group: "non-denim",
    category: "accessories",
    photo: "/old-site/tl-belt.jpg",
    blurb: "Belts, TL style uniform belts, caps, trims, and finishing accessories.",
    madeFrom: "Webbing, canvas, leather alternatives, metal hardware, woven trims, or custom parts.",
    detail: "Accessory ranges planned to match uniform kits and private label apparel runs.",
    finish: "Logo application, edge finishing, hardware selection, and kit ready packing.",
    customization: "Buckle, webbing color, length, label, packaging, and carton sorting.",
  },
  {
    id: "overalls",
    name: "Chino Cargo Series",
    group: "non-denim",
    category: "bottoms",
    photo: "/product-pdfs/non-denim-cargo-herringbone.webp",
    blurb: "Cargo chino and cargo jogger options from the non denim PDF range.",
    madeFrom: "100% CMIA HIP cotton herringbone, 98% cotton / 2% spandex twill, 98% cotton / 2% elastane twill, and 100% cotton canvas.",
    detail: "Cargo pocketing, jogger options, twill and canvas constructions, and documented style level colorways.",
    finish: "Military green, Gul Grey, sand, olive, and fawn directions with production ready finishing.",
    customization: "Cargo pocket map, waistband, cuffs, trims, GSM target, color, labels, and carton sorting.",
  },
  {
    id: "private-label",
    name: "Custom & Private Label",
    group: "non-denim",
    category: "private-label",
    photo: PHOTO.storeInterior,
    blurb: "Merchant apparel and full package private label from concept to shelf.",
    madeFrom: "Buyer directed fabrics across knit, woven, denim, fleece, and accessory ranges.",
    detail: "Full package development from reference, tech pack, sample, production, QC, and shipment.",
    finish: "Retail folding, branded trims, hangtags, care labels, and carton level organization.",
    customization: "Pattern, grading, labels, trims, decoration, packing method, and delivery plan.",
  },
];

export const PRODUCT_PAGE_FILTERS = [
  { id: "all", label: "All" },
  { id: "denim", label: "Denim" },
  { id: "non-denim", label: "Non denim" },
  { id: "uniforms", label: "Uniforms" },
  { id: "knitwear", label: "Knitwear" },
  { id: "wovens", label: "Wovens" },
  { id: "outerwear", label: "Outerwear" },
  { id: "bottoms", label: "Bottoms" },
  { id: "accessories", label: "Accessories" },
  { id: "private-label", label: "Private Label" },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((product) => product.featured);

export const DIFFERENTIATORS = [
  {
    title: "Family owned since 2000",
    body: "A U.S. based, family owned partner serving American and European customers with 24/7 support from dedicated local and overseas teams.",
  },
  {
    title: "Zero markup logistics",
    body: "Ocean or air freight, U.S. customs, and local transportation are coordinated without extra NK markup.",
  },
  {
    title: "Maximum Quality Control",
    body: "NK checks production from fabric through final shipment, rejecting work that does not meet the agreed standard.",
  },
  {
    title: "Sustainable & ethical",
    body: "Audited factories, fair conditions, and low impact materials available on request.",
  },
  {
    title: "End to end partnership",
    body: "NK takes responsibility throughout the process and works closely with customers to resolve any product concerns and achieve a satisfactory outcome.",
  },
  {
    title: "Global offices",
    body: "Customers receive U.S. and overseas support, regular progress updates, and dedicated team members available to assist as needed.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Trail Life has been a long running uniform relationship built on trust and quality products.",
    name: "Trail Life uniforms",
    role: "Customized uniforms",
    industry: "Uniforms",
  },
  {
    quote:
      "Taco Bell tee work and custom knit collections show NK's ability to support recognizable branded merchandise.",
    name: "Taco Bell tee",
    role: "Branded knitwear",
    industry: "Merchant apparel",
  },
  {
    quote:
      "Dollar General appears among NK's trusted buyer proof, reinforcing the company's U.S. retail credibility.",
    name: "Dollar General proof",
    role: "Buyer credibility",
    industry: "Retail",
  },
];

export const CLIENTS = [
  "Trail Life",
  "Taco Bell",
  "Dollar General",
  "U.S. uniform buyers",
  "Merchant apparel",
  "Private label",
  "Streetwear",
  "Hospitality apparel",
];
