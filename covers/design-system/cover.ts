import type { Cover } from "../render.ts"

export default {
  product: "Design System",
  headline: "Build pages that look like Zeabur, light and dark.",
  tagline:
    "Each colour, size and motion is a token in <code>src/tokens.css</code>. The components use only tokens, and <code>bun run lint</code> fails on a raw colour.",
  alt: "Zeabur Design System: build pages that look like Zeabur, light and dark; a status colour defined once for both themes and used by name in a component",
  sources: ["../../src/tokens.css", "../../src/variants/badge.ts"],
} satisfies Cover
