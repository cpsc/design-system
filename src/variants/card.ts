import { cva } from "class-variance-authority"

export const cardVariants = cva(
  "group/card flex flex-col gap-4 overflow-hidden rounded-xl border border-v2-border bg-card py-4 text-card-foreground card-padding has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 data-[variant=list]:gap-0 data-[variant=list]:divide-y data-[variant=list]:divide-v2-border data-[variant=list]:py-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
)

export const cardHeaderVariants = cva(
  "group/card-header @container/card-header grid auto-rows-min items-start gap-0.5 px-(--card-px) group-data-[variant=list]/card:py-3.5 has-data-[slot=card-action]:grid-cols-action has-data-[slot=card-description]:grid-rows-header [.border-b]:pb-4",
)

export const cardTitleVariants = cva(
  "text-sm leading-5 font-medium text-main group-data-[size=sm]/card:type-body",
)

export const cardDescriptionVariants = cva("type-body text-secondary")

export const cardActionVariants = cva(
  "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
)

export const cardContentVariants = cva("px-(--card-px) group-data-[variant=list]/card:px-0")

export const cardFooterVariants = cva(
  "flex items-center gap-2 border-t border-v2-border bg-v2-surface-hover px-(--card-px) py-3",
)
