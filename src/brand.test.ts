import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { Logo, Mark } from "./components/brand"

const read = (path: string) => readFileSync(resolve(import.meta.dirname, "..", path), "utf8")
const paths = (svg: string) => [...svg.matchAll(/<path d="([^"]+)"/g)].map((match) => match[1])

describe("the brand matches the vendored artwork", () => {
  test.each([
    ["Logo", Logo, "vendor/zeabur/logo-with-text.svg"],
    ["Mark", Mark, "vendor/zeabur/logo.svg"],
  ] as const)("%s draws the file's paths", (_, component, file) => {
    const drawn = paths(read(file))
    expect(drawn).not.toEqual([])
    expect(paths(renderToStaticMarkup(h(component)))).toEqual(drawn)
  })

  test("the mask utilities inline the files unchanged", () => {
    const utilities = read("src/utilities.css")
    for (const file of ["vendor/zeabur/logo-with-text.svg", "vendor/zeabur/logo.svg"]) {
      const encoded = Buffer.from(read(file)).toString("base64")
      expect(utilities).toContain(`data:image/svg+xml;base64,${encoded}`)
    }
  })
})
