import { cn } from "cn"
import type { ReactNode } from "react"

/** A plain-language name, followed by the exact technical name it stands for. */
function Term({
  detail,
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & { detail?: ReactNode }) {
  return (
    <span
      data-slot="term"
      className={cn("inline-flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-0.5", className)}
      {...props}
    >
      <span className="min-w-0">{children}</span>
      {detail === undefined || detail === null ? null : <TermDetail>{detail}</TermDetail>}
    </span>
  )
}

function TermDetail({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      data-slot="term-detail"
      translate="no"
      className={cn(
        "inline-flex w-fit shrink-0 items-center rounded-sm bg-muted px-1 font-mono type-nano font-normal text-tertiary",
        className,
      )}
      {...props}
    />
  )
}

export { Term, TermDetail }
