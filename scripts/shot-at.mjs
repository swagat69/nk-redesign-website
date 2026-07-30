// Screenshot one selector at a given viewport width.
// Usage: node scripts/shot-at.mjs <url> <selector> <width> <out> [wait]
import puppeteer from "puppeteer-core";

const [url, selector, widthStr, out, wait = "2000"] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--force-prefers-reduced-motion", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: Number(widthStr), height: 950, deviceScaleFactor: 1 });
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.querySelectorAll("img").forEach((im) => (im.loading = "eager")));
await page.waitForSelector(selector, { timeout: 30000 });
await page.evaluate((sel) => document.querySelector(sel).scrollIntoView({ block: "center" }), selector);
await new Promise((r) => setTimeout(r, Number(wait)));
const el = await page.$(selector);
await el.screenshot({ path: out });
console.log("saved", out);
await browser.close();
