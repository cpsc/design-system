import { cva } from "class-variance-authority"

export const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded border border-transparent px-1.5 leading-none font-medium whitespace-nowrap transition-colors has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-invalid:border-destructive [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/85",
        secondary: "bg-surface-frame text-secondary [a]:hover:text-main",
        destructive: "bg-fail-soft text-fail-strong [a]:hover:bg-fail-soft/80",
        outline: "border-v2-border text-secondary [a]:hover:bg-v2-surface-hover",
        ghost: "text-secondary hover:bg-v2-surface-hover hover:text-main",
        link: "text-brand underline-offset-4 hover:underline",
        ok: "bg-ok-soft text-ok-strong",
        progress: "bg-progress-soft text-progress-strong",
        warn: "bg-warn-soft text-warn-strong",
        fail: "bg-fail-soft text-fail-strong",
        idle: "bg-idle-soft text-idle-strong",
      },
      size: {
        // The size's text is set here only: `cn` does not merge a `type-*` role with `text-xs`.
        default: "type-nano",
        sm: "h-4.5 px-1 type-nano",
        lg: "h-6 gap-1.5 px-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
