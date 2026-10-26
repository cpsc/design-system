import * as React from "react"
import { cn } from "cn"

function Container({
  title,
  titleAction,
  headerClassName,
  contentClassName,
  variant = "default",
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode
  /** `list`: rows edge to edge, a hairline between them; each row brings its own padding. */
  variant?: "default" | "list"
  titleAction?: React.ReactNode
  headerClassName?: string
  contentClassName?: string
}) {
  return (
    <section
      data-slot="container"
      data-variant={variant}
      className={cn("overflow-hidden rounded-lg border border-main bg-surface-frame", className)}
      {...props}
    >
      <div
        data-slot="container-header"
        className={cn("flex items-center justify-between gap-x-2 px-4 py-2.5", headerClassName)}
      >
        <div className="flex min-w-0 items-center gap-x-1.5 text-xs font-medium text-secondary">
          {title}
        </div>
        {titleAction === undefined ? null : <div className="flex-none">{titleAction}</div>}
      </div>
      <div
        data-slot="container-content"
        className={cn(
          "rounded-t-lg border-t border-main bg-card",
          variant === "list" ? "flex flex-col divide-y divide-main" : "p-4",
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  )
}

export { Container }
