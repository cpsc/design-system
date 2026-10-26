import { cva } from "class-variance-authority"

export const fieldVariants = cva("group/field flex min-w-0 flex-col gap-1.5")

export const fieldLabelVariants = cva(
  "w-fit type-body font-medium text-main data-disabled:opacity-50",
)

export const fieldDescriptionVariants = cva("type-body text-secondary")

export const fieldErrorVariants = cva("text-xs leading-4 text-destructive")
