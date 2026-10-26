import { cva } from "class-variance-authority"

export const separatorVariants = cva(
  "shrink-0 bg-v2-separator data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
)
