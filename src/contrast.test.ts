import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const tokens = readFileSync(resolve(import.meta.dirname, "tokens.css"), "utf8")

function value(name: string) {
  const match = new RegExp(`--${name}:\\s*([^;]+);`).exec(tokens)
  if (!match) throw new Error(`no --${name}`)
  return match[1]!.trim()
}

// Returns the light and the dark colour of a token as [r, g, b].
function rgb(name: string): [number[], number[]] {
  const raw = value(name)
  const both = /^light-dark\((.*)\)$/.exec(raw)
  if (both) {
    const [light, dark] = both[1]!.split(/,(?![^(]*\))/).map((part) => colour(part.trim()))
    return [light!, dark!]
  }
  return [colour(raw), colour(raw)]
}

function colour(raw: string): number[] {
  const hex = /^#([0-9a-f]{6})$/i.exec(raw)
  if (hex) return [0, 2, 4].map((at) => parseInt(hex[1]!.slice(at, at + 2), 16))
  const palette = /^rgb\(var\(--([\w-]+)\)\)$/.exec(raw)
  if (palette) return value(palette[1]!).split(",").map(Number)
  throw new Error(`cannot read ${raw}`)
}

function luminance(channels: number[]) {
  const [r, g, b] = channels.map((channel) => {
    const c = channel / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!
}

function ratio(a: number[], b: number[]) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (high! + 0.05) / (low! + 0.05)
}

const white = [255, 255, 255]

test("white text on each destructive stop is 4.5:1 or more", () => {
  for (const stop of [
    "destructive-from",
    "destructive-to",
    "destructive-hover-from",
    "destructive-hover-to",
  ])
    for (const background of rgb(stop)) expect(ratio(white, background)).toBeGreaterThanOrEqual(4.5)
})

test("fail-strong text on each secondary-destructive stop is 4.5:1 or more", () => {
  const [light, dark] = rgb("fail-strong")
  for (const stop of [
    "secondary-from",
    "secondary-to",
    "secondary-danger-from",
    "secondary-danger-to",
  ]) {
    const [onLight, onDark] = rgb(stop)
    expect(ratio(light, onLight)).toBeGreaterThanOrEqual(4.5)
    expect(ratio(dark, onDark)).toBeGreaterThanOrEqual(4.5)
  }
})
