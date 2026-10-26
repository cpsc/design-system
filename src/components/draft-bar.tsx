import { cn } from "cn"
import type { ReactNode } from "react"

/** Edits gathered into one pending plan: how many, what they touch, and Review / Discard.
 * Place it at the bottom of the scrolling region it belongs to; it sticks there. */
function DraftBar({
  label,
  detail,
  blocked,
  actions,
  className,
  ...props
}: Omit<React.ComponentProps<"section">, "children"> & {
  label: ReactNode
  detail?: ReactNode
  /** Why the plan cannot be reviewed yet; shown instead of `detail`. */
  blocked?: ReactNode
  actions: ReactNode
}) {
  return (
    <section
      data-slot="draft-bar"
      aria-live="polite"
      className={cn(
        "sticky bottom-3 z-10 flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-v2-border bg-surface-raised px-4 py-2.5 shadow-lg",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-progress" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="type-body font-medium text-main">{label}</span>
        {blocked === undefined || blocked === null ? (
          detail === undefined ? null : (
            <span className="truncate text-xs text-secondary">{detail}</span>
          )
        ) : (
          <span className="text-xs text-warn-strong">{blocked}</span>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">{actions}</div>
    </section>
  )
}

export { DraftBar }
