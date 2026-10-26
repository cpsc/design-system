import { describe, expect, test } from "bun:test"

import { pageViewTransition } from "./page-transition"

describe("pageViewTransition", () => {
  const from = { pathname: "/a" }

  test("another path is typed page", () => {
    expect(pageViewTransition.types({ fromLocation: from, pathChanged: true })).toEqual(["page"])
  })

  test("the same path, or the first load, has none", () => {
    expect(pageViewTransition.types({ fromLocation: from, pathChanged: false })).toBe(false)
    expect(pageViewTransition.types({ fromLocation: undefined, pathChanged: true })).toBe(false)
  })
})
