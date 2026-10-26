import type { Cover } from "../render.ts"

export default {
  product: "Identity",
  headline: "<s>admin.conf</s>Sign in to Kubernetes with a passkey.",
  tagline:
    "<code>kubectl</code> opens your browser, you touch your fingerprint reader, and you get a token valid for ten minutes.",
  alt: "Zeabur Identity: admin.conf crossed out; sign in to Kubernetes with a passkey",
  // The admin.conf lines are kubeadm's and not in this repository, so they are not quoted.
  sources: ["../../../identity/docs/get-started.md", "../../../identity/README.md"],
} satisfies Cover
