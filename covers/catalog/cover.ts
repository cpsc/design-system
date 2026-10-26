import type { Cover } from "../render.ts"

export default {
  product: "Catalog",
  headline: "Which chart,<br>which version,<br>which values,<br>and why.",
  tagline:
    "CI installs and measures every component. Each release is a signed bundle that Zeabur reads to suggest what a cluster is missing.",
  alt: "Zeabur Catalog: which chart, which version, which values, and why, for each Kubernetes component, installed and measured in CI",
  sources: [
    "../../../catalog/components/ingress/traefik.yaml",
    "../../../catalog/measurements/ingress/traefik.json",
  ],
} satisfies Cover
