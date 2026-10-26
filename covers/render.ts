// bun render.ts <cover> [--out <dir>] [--previews <dir>]: covers/README.md.

import { mkdir, readFile, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { parseArgs } from "node:util"
import { chromium } from "playwright-core"
import sharp from "sharp"

export interface Cover {
  product?: string
  headline: string
  tagline: string
  alt: string
  sources: string[]
}

const root = dirname(fileURLToPath(import.meta.url))
const ds = resolve(root, "..")

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { out: { type: "string" }, previews: { type: "string" } },
})
const name = positionals[0]
if (!name) {
  console.error("usage: bun render.ts <cover> [--out <dir>] [--previews <dir>]")
  process.exit(2)
}
const dir = join(root, name)
const cover: Cover = (await import(join(dir, "cover.ts"))).default
const previews = resolve(values.previews ?? join(root, ".build", name))
const out = resolve(values.out ?? previews)
await mkdir(previews, { recursive: true })
await mkdir(out, { recursive: true })

const mark = (await readFile(join(ds, "vendor/zeabur/logo.svg"), "utf8"))
  .replace(/ width="32" height="32"/, ' aria-hidden="true"')
  .replace('fill="#19181B"', 'fill="currentColor"')
  .replace('fill="#6300FF"', 'fill="var(--logo-violet)"')
  .replace('fill="#EE430E"', 'fill="var(--mark-orangered)"')

const wordmark = (await readFile(join(ds, "vendor/zeabur/logo-with-text.svg"), "utf8"))
  .replace(/ width="563" height="107"/, ' class="wordmark" role="img" aria-label="Zeabur"')
  .replaceAll('fill="white"', 'fill="currentColor"')
  .replace('fill="#6300FF"', 'fill="var(--logo-violet)"')
  .replace('fill="#FF4400"', 'fill="var(--logo-orangered)"')
if (!wordmark.includes('class="wordmark"')) throw new Error("logo-with-text.svg: size changed")

const illustration = (await readFile(join(dir, "illustration.html"), "utf8"))
  .replaceAll('src="./', `src="${pathToFileURL(dir).href}/`)
  .replaceAll("<zeabur-mark></zeabur-mark>", mark)
const cssFile = join(dir, "illustration.css")
const illustrationCss = existsSync(cssFile) ? await readFile(cssFile, "utf8") : ""

const avoid: [RegExp, string, string][] = [
  [
    /<(\w+)[^>]*>\s*<\/\1>\s*<\1[^>]*>\s*<\/\1>\s*<\1[^>]*>\s*<\/\1>/,
    "html",
    "three empty dots: window chrome",
  ],
  [/class="[^"]*\b(window|titlebar|traffic|chrome|toolbar)/i, "html", "window chrome"],
  [/class="[^"]*\b(card|button|btn|badge|pill|toast|modal)\b/i, "html", "a mock UI kit"],
  [/…|\.\.\./, "html", "a progress line no tool printed"],
  [/<ph-icon\b/, "html", "decorative icons"],
  [/box-shadow|drop-shadow|backdrop-filter/, "css", "floating cards"],
  [/gradient\(/, "css", "a gradient wash or glow"],
  [/border-radius/, "css", "rounded cards"],
  [/rotate|transform/, "css", "tilted props"],
]
const problems = avoid
  .filter(([re, where]) => re.test(where === "html" ? illustration : illustrationCss))
  .map(([, where, why]) => `illustration.${where}: ${why}`)
if (problems.length) {
  console.error(`${name}: refused, see covers/README.md "What we avoid, and why"`)
  for (const problem of problems) console.error(`  ${problem}`)
  process.exit(1)
}

const collapse = (text: string) => text.replace(/\s+/g, " ").trim()
const sources = await Promise.all(
  cover.sources.map(async (path) => collapse(await readFile(resolve(dir, path), "utf8"))),
)
const href = (path: string) => pathToFileURL(join(ds, path)).href

function page(theme: "light" | "dark"): string {
  return `<!doctype html>
<html lang="en" class="${theme}">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="${href("src/fonts.css")}">
<link rel="stylesheet" href="${href("src/tokens.css")}">
<link rel="stylesheet" href="${href("covers/template/cover.css")}">
${illustrationCss ? `<style>${illustrationCss}</style>` : ""}
</head>
<body>
<div class="gutter top"></div><div class="gutter bottom"></div>
<div class="gutter left"></div><div class="gutter right"></div>
<div class="column">
  <div class="lockup">${wordmark}${cover.product ? `<span>${cover.product}</span>` : ""}</div>
  <div class="message">
    <h1 class="headline">${cover.headline}</h1>
    <p class="tagline">${cover.tagline}</p>
  </div>
</div>
<div class="cell"><div class="ill">${illustration}</div></div>
<div class="rule h" style="top: 48px"></div><div class="rule h" style="top: 591px"></div>
<div class="rule v" style="left: 48px"></div><div class="rule v" style="left: 1231px"></div>
<div class="rule v" style="left: 688px; top: 48px; bottom: 48px"></div>
<div class="cross" style="left: 48.5px; top: 48.5px"></div>
<div class="cross" style="left: 1231.5px; top: 48.5px"></div>
<div class="cross" style="left: 48.5px; top: 591.5px"></div>
<div class="cross" style="left: 1231.5px; top: 591.5px"></div>
<div class="cross" style="left: 688.5px; top: 48.5px"></div>
<div class="cross" style="left: 688.5px; top: 591.5px"></div>
</body>
</html>`
}

const build = join(root, ".build", name)
await mkdir(build, { recursive: true })
// Chromium from nixpkgs: flake.nix sets PLAYWRIGHT_BROWSERS_PATH.
const browser = await chromium.launch({ channel: "chromium" })
try {
  for (const theme of ["light", "dark"] as const) {
    const file = join(build, `${theme}.html`)
    await writeFile(file, page(theme))
    for (const scale of theme === "dark" ? [2, 1] : [2]) {
      const tab = await browser.newPage({
        viewport: { width: 1280, height: 640 },
        deviceScaleFactor: scale,
        colorScheme: theme,
      })
      await tab.goto(pathToFileURL(file).href)
      await tab.evaluate(() => document.fonts.ready)
      const quotes: string[] = await tab.evaluate(() =>
        [...document.querySelectorAll("[data-quote]")].map((el) => el.textContent ?? ""),
      )
      const invented = quotes.filter((quote) => !sources.some((s) => s.includes(collapse(quote))))
      if (invented.length) {
        console.error(
          `${name}: quoted but not in sources: ${invented.map((q) => JSON.stringify(q)).join(", ")}`,
        )
        process.exit(1)
      }
      const overflow = await tab.evaluate(() =>
        [...document.querySelectorAll(".column *")]
          .filter(
            (el) =>
              el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow !== "hidden",
          )
          .filter((el) => !(el instanceof SVGElement))
          .map((el) => `${el.tagName.toLowerCase()}.${el.className}`),
      )
      if (overflow.length) console.warn(`${name} ${theme}: overflowing ${overflow.join(", ")}`)
      const png = await tab.screenshot({ type: "png" })
      await tab.close()
      if (scale === 1) {
        await writeFile(join(previews, "social-preview.png"), png)
        continue
      }
      await writeFile(join(previews, `cover-${theme}.png`), png)
      await sharp(png)
        .resize({ width: 830 })
        .png()
        .toFile(join(previews, `cover-${theme}-github.png`))
      const avif = await sharp(png).avif({ quality: 62, effort: 9 }).toBuffer()
      await writeFile(join(out, `cover-${theme}.avif`), avif)
      console.log(`${join(out, `cover-${theme}.avif`)}  ${(avif.length / 1024).toFixed(1)} KiB`)
    }
  }
} finally {
  await browser.close()
}
console.log(`previews: ${previews}`)
