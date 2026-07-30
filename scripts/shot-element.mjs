// Screenshot a selector on the preview site (reduced-motion forced so GSAP
// reveals render in final state).
import puppeteer from "puppeteer-core";

const [url, selector, out, wait = "2500"] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--force-prefers-reduced-motion", "--window-size=1456,1100"],
  defaultViewport: { width: 1440, height: 1000 },
});
const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await page.waitForSelector(selector, { timeout: 30000 });
await page.evaluate((sel) => document.querySelector(sel).scrollIntoView({ block: "center" }), selector);
await new Promise((r) => setTimeout(r, Number(wait)));
const el = await page.$(selector);
await el.screenshot({ path: out });
console.log("saved", out);
await browser.close();
