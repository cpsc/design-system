import { cva } from "class-variance-authority"

export const inputVariants = cva(
  "w-full min-w-0 rounded-md border border-input bg-transparent text-main transition-input duration-150 outline-none placeholder:text-tertiary focus:border-ring focus:ring-1 focus:ring-ring/20 disabled:cursor-not-allowed disabled:bg-v2-surface-active disabled:text-secondary read-only:cursor-default read-only:bg-v2-surface-active read-only:text-secondary read-only:focus:border-input read-only:focus:ring-0 aria-invalid:border-destructive aria-invalid:focus:ring-destructive/20 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-main",
  {
    variants: {
      size: {
        default: "h-control-md px-3 py-1.5 text-base sm:text-sm",
        sm: "h-control-xs px-2 py-0.5 text-xs",
        lg: "h-control-lg px-3 py-2 text-base sm:text-sm",
      },
      mono: { true: "type-mono", false: "" },
      endSlot: { true: "pr-10", false: "" },
      tone: {
        none: "",
        success:
          "border-ok/40 bg-ok-soft text-ok-strong read-only:bg-ok-soft read-only:text-ok-strong disabled:bg-ok-soft disabled:text-ok-strong",
        warn: "border-warn/40 bg-warn-soft text-warn-strong read-only:bg-warn-soft read-only:text-warn-strong disabled:bg-warn-soft disabled:text-warn-strong",
        error:
          "border-fail/40 bg-fail-soft text-fail-strong read-only:bg-fail-soft read-only:text-fail-strong disabled:bg-fail-soft disabled:text-fail-strong",
        info: "border-progress/40 bg-progress-soft text-progress-strong read-only:bg-progress-soft read-only:text-progress-strong disabled:bg-progress-soft disabled:text-progress-strong",
      },
    },
    defaultVariants: { size: "default", mono: false, endSlot: false, tone: "none" },
  },
)
