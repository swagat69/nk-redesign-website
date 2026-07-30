// Screenshot full pages at multiple viewport widths for a responsive audit.
// Usage: node scripts/shot-responsive.mjs <baseUrl> <outDir>
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const [baseUrl = "http://127.0.0.1:4173", outDir = "C:/Users/swaga/AppData/Local/Temp/resp"] =
  process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });

const ROUTES = ["/", "/portfolio", "/capabilities", "/about", "/blog", "/contact"];
const WIDTHS = [390, 768, 1024, 1440];

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--force-prefers-reduced-motion", "--hide-scrollbars"],
});

for (const width of WIDTHS) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  for (const route of ROUTES) {
    const name = route === "/" ? "home" : route.slice(1);
    await page.goto(baseUrl + route, { waitUntil: "networkidle0", timeout: 60000 });
    // Force-eager all images, then scroll through to settle lazy loads/reveals.
    await page.evaluate(async () => {
      document.querySelectorAll("img").forEach((im) => (im.loading = "eager"));
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
    // Detect horizontal overflow: any element wider than the viewport.
    const overflow = await page.evaluate(() => {
      const bad = [];
      const vw = document.documentElement.clientWidth;
      document.querySelectorAll("body *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 1 && (r.right > vw + 1 || r.left < -1)) {
          const cls = typeof el.className === "string" ? el.className.slice(0, 80) : "";
          bad.push(`${el.tagName.toLowerCase()}.${cls} [${Math.round(r.left)}..${Math.round(r.right)}]`);
        }
      });
      return { scrollW: document.documentElement.scrollWidth, vw, bad: bad.slice(0, 12) };
    });
    if (overflow.scrollW > overflow.vw + 1) {
      console.log(`OVERFLOW ${name}@${width}: scrollW=${overflow.scrollW} vw=${overflow.vw}`);
      overflow.bad.forEach((b) => console.log("   ", b));
    }
    await page.screenshot({ path: `${outDir}/${name}-${width}.png`, fullPage: true });
    console.log(`shot ${name}-${width}`);
  }
  await page.close();
}
await browser.close();
console.log("done");
