// One-off: normalize the client-provided logo files in Downloads/nk-logos
// into transparent, trimmed PNGs under public/client-logos.
// Edge flood-fill removes only the outer white background so white artwork
// inside a logo (e.g. the Checkers wordmark) survives.
import sharp from "sharp";
import path from "node:path";

const SRC = "C:/Users/swaga/Downloads/nk-logos";
const OUT = "C:/Users/swaga/nk-redesign-website/public/client-logos";

const JOBS = [
  { file: "Ace_Hardware_Logo.svg", out: "ace-hardware.png", flood: false, density: 300 },
  { file: "carquest-auto-parts-logo-vector.png", out: "carquest.png", flood: true },
  { file: "Checkers-0.webp", out: "checkers.png", flood: true },
  { file: "Columbia-Logo-2011-present.jpg", out: "columbia.png", flood: true },
  { file: "Dairy-Queen-Logo.png", out: "dairy-queen.png", flood: false },
  { file: "IHOP_logo.svg.png", out: "ihop.png", flood: false },
  { file: "the-ups-store-logo-png_seeklogo-383417.png", out: "ups-store.png", flood: false },
  { file: "21272DA8BDDA3B5D6C89AD7164549C89.jpeg", out: "dunbrooke.png", flood: true },
];

const NEAR_WHITE = 242;

function floodTransparent(data, width, height) {
  // BFS from every border pixel that is near-white; clear alpha as we go.
  const visited = new Uint8Array(width * height);
  const queue = [];
  const isWhite = (i) =>
    data[i * 4] >= NEAR_WHITE && data[i * 4 + 1] >= NEAR_WHITE && data[i * 4 + 2] >= NEAR_WHITE;
  for (let x = 0; x < width; x++) {
    queue.push(x, (height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    queue.push(y * width, y * width + width - 1);
  }
  while (queue.length) {
    const i = queue.pop();
    if (visited[i] || !isWhite(i)) continue;
    visited[i] = 1;
    data[i * 4 + 3] = 0;
    const x = i % width;
    const y = (i / width) | 0;
    if (x > 0) queue.push(i - 1);
    if (x < width - 1) queue.push(i + 1);
    if (y > 0) queue.push(i - width);
    if (y < height - 1) queue.push(i + width);
  }
}

for (const job of JOBS) {
  const srcPath = path.join(SRC, job.file);
  let image = sharp(srcPath, job.density ? { density: job.density } : undefined);
  const meta = await image.metadata();
  // Downscale oversized sources before pixel work.
  if (meta.width > 1200) image = image.resize({ width: 1200 });
  image = image.ensureAlpha();

  if (job.flood) {
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
    floodTransparent(data, info.width, info.height);
    image = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
  }

  await image.trim().png().toFile(path.join(OUT, job.out));
  const outMeta = await sharp(path.join(OUT, job.out)).metadata();
  console.log(job.out, `${outMeta.width}x${outMeta.height}`);
}
