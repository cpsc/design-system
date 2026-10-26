import type { Cover } from "../render.ts"

export default {
  product: "Builder",
  headline: "Push a commit, get an image digest.",
  tagline:
    "A Kubernetes operator builds each new commit with BuildKit, from your Dockerfile or with Railpack, and writes the image to <code>status.latestImage</code>.",
  alt: "Zeabur Builder: push a commit, get an image digest; a Build for a Git repository and the status field that holds the image it built",
  sources: [
    "../../../builder/deploy/examples/builds.yaml",
    "../../../builder/crates/zeabur-builder-api/src/build.rs",
  ],
} satisfies Cover
