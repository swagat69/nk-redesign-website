// Centralized Unsplash imagery for the apparel manufacturing site.
// Helper builds a cropped, auto-formatted URL at a given size.

const base = "https://images.unsplash.com/photo-";

export function img(id: string, w = 1200, h = 800): string {
  if (id.startsWith("/")) return import.meta.env.BASE_URL.replace(/\/$/, "") + id;
  if (id.startsWith("http")) return id;
  return `${base}${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

export const PHOTO = {
  factoryFloor: "1741176505800-caaa3a52631a", // workers sewing in large factory
  factoryGroup: "1577894947058-cfdae4276bef", // group working in a factory
  sewingWorkshop: "/old-site/factory-sewing-floor.jpg", // NK sewing floor with workers (old site)
  fabricWarehouse: "/old-site/freight-containers.jpg", // freight containers logistics (old site)
  boutiqueRacks: "/old-site/nk-polos-rack.jpg", // NK polos hanging on rack (old site)
  shirtsRack: "/old-site/nk-red-shirt.jpg", // NK red premium casual shirt (old site)
  storeInterior: "1441986300917-64674bd600d8", // clothes store interior
  foldedShirts: "1562157873-818bc0726f68", // folded colored shirts
  crewShirt: "/old-site/taco-bell-tee.jpg", // NK-made Taco Bell tee (old site)
  comfortTees: "/old-site/nk-knit-colors.jpg", // NK knit color range (old site)
  cuttingFabric: "/old-site/fabric-swatches.jpg", // fabric swatches on table (old site)
  hoodieModel: "1564557287817-3785e38ec1f5", // grey hoodie model
  hoodieStairs: "1578768079052-aa76e52ff62e", // brown hoodie staircase
  chefApron: "1574966740637-12c84035a4f2", // chef in apron
  embroidery: "/old-site/embroidery-machine.jpg", // embroidery machine with thread spools (old site)
  sewingMachine: "1557462987-dd1c191266f0", // sewing machine
} as const;
