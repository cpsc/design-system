import { cn } from "cn"
import type { ReactNode } from "react"

function PageHeader({
  title,
  badges,
  actions,
  description,
  size = "title",
  className,
  children,
}: {
  title: ReactNode
  badges?: ReactNode
  actions?: ReactNode
  description?: ReactNode
  size?: "title" | "name"
  className?: string
  children?: ReactNode
}) {
  return (
    <header data-slot="page-header" className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex min-h-9 flex-wrap items-center gap-x-3 gap-y-2">
        <h1
          className={cn("min-w-0 truncate text-main", size === "name" ? "type-name" : "type-title")}
        >
          {title}
        </h1>
        {badges}
        {actions === undefined ? null : (
          <div className="ml-auto flex max-w-full shrink-0 flex-wrap items-center justify-end gap-2">
            {actions}
          </div>
        )}
      </div>
      {description === undefined ? null : (
        <p className="max-w-prose type-body text-secondary">{description}</p>
      )}
      {children}
    </header>
  )
}

export { PageHeader }
