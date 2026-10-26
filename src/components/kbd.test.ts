import { describe, expect, test } from "bun:test"

import { shortcutKeys } from "./kbd"

describe("shortcutKeys", () => {
  test("a modifier symbol is its own key", () => {
    expect(shortcutKeys("⌘K")).toEqual(["⌘", "K"])
    expect(shortcutKeys("⌥⇧P")).toEqual(["⌥", "⇧P"])
    expect(shortcutKeys("⌃Enter")).toEqual(["⌃", "Enter"])
  })

  test("words apart are keys", () => {
    expect(shortcutKeys("Ctrl K")).toEqual(["Ctrl", "K"])
    expect(shortcutKeys("  Ctrl   Shift  P ")).toEqual(["Ctrl", "Shift", "P"])
  })

  test("a single key stays whole", () => {
    expect(shortcutKeys("K")).toEqual(["K"])
    expect(shortcutKeys("Esc")).toEqual(["Esc"])
    expect(shortcutKeys("⌘")).toEqual(["⌘"])
  })

  test("nothing is no key", () => {
    expect(shortcutKeys("")).toEqual([])
    expect(shortcutKeys("   ")).toEqual([])
  })
})
